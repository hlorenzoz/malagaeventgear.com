#!/usr/bin/env bun
/**
 * sync.ts: what to run after editing an English post, in one command.
 *
 *   bun scripts/translate/sync.ts <slug>
 *
 * 1. scripts/post-touch.ts <slug>   bumps `updatedDate` (what `just post-touch` does)
 * 2. scripts/gen-post-faqs.ts       refreshes src/lib/data/post-faqs.json
 * 3. scripts/gen-post-toc.ts        refreshes src/lib/data/post-toc.json
 * 4. prints the translations of this post that are now stale or missing (they must get the
 *    same edit in the same change, CLAUDE.md "Reglas mandatorias de idioma", rule 2).
 */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { BLOG_DIR, readPost } from '../blog-files.mjs';
import { translationsNeedingUpdate } from '../post-touch';
import { assertSlug } from './brief-lib';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface SyncStep {
	label: string;
	/** Arguments of `bun`, relative to the repo root. */
	args: string[];
}

export function syncSteps(slug: string): SyncStep[] {
	return [
		{ label: 'post-touch', args: ['scripts/post-touch.ts', slug] },
		{ label: 'post-faqs.json', args: ['scripts/gen-post-faqs.ts'] },
		{ label: 'post-toc.json', args: ['scripts/gen-post-toc.ts'] }
	];
}

/** The date translations must record in `sourceUpdated`: `updatedDate ?? publishDate`, YYYY-MM-DD. */
export function englishDateOf(data: { publishDate?: unknown; updatedDate?: unknown }): string {
	const raw = data.updatedDate ?? data.publishDate;
	if (typeof raw !== 'string')
		throw new Error('the English frontmatter has neither updatedDate nor publishDate');
	return raw.slice(0, 10);
}

export interface Pending {
	/** Translated, but from an older English version. */
	stale: string[];
	/** No translation file at all. */
	missing: string[];
}

/** Reuses post-touch's `translationsNeedingUpdate` for the stale ones. */
export function pendingTranslations(
	slug: string,
	englishDate: string,
	dir: string = BLOG_DIR
): Pending {
	const stale = translationsNeedingUpdate(slug, englishDate, dir);
	const missing = PREFIXED_LOCALES.filter((l) => !existsSync(join(dir, l, `${slug}.svx`)));
	return { stale: PREFIXED_LOCALES.filter((l) => stale.includes(l)), missing };
}

export function formatPending(slug: string, englishDate: string, pending: Pending): string[] {
	if (pending.stale.length === 0 && pending.missing.length === 0) {
		return [`${slug}: all 12 translations are up to date with the English of ${englishDate}`];
	}
	const lines = [`${slug}: English version ${englishDate}`];
	if (pending.stale.length > 0) lines.push(`  stale: ${pending.stale.join(', ')}`);
	if (pending.missing.length > 0) lines.push(`  missing: ${pending.missing.join(', ')}`);
	lines.push(
		`  Apply the same edit in each of them, in its language, and set its sourceUpdated to "${englishDate}".`
	);
	return lines;
}

function main(): void {
	const slug = process.argv.slice(2).find((a) => !a.startsWith('--'));
	if (!slug) {
		console.error('Usage: bun scripts/translate/sync.ts <slug>');
		process.exit(2);
	}
	try {
		assertSlug(slug);
	} catch (error) {
		console.error(`[sync] ${(error as Error).message}`);
		process.exit(2);
	}
	const file = join(BLOG_DIR, `${slug}.svx`);
	if (!existsSync(file)) {
		console.error(`[sync] there is no English post src/content/blog/${slug}.svx`);
		process.exit(2);
	}
	for (const step of syncSteps(slug)) {
		console.log(`\n== ${step.label}`);
		const result = Bun.spawnSync(['bun', ...step.args], {
			cwd: ROOT,
			stdout: 'inherit',
			stderr: 'inherit'
		});
		if (result.exitCode !== 0) {
			console.error(`[sync] ${step.label} failed (exit ${result.exitCode}), stopping`);
			process.exit(result.exitCode ?? 1);
		}
	}
	console.log('');
	const date = englishDateOf(
		readPost(file).data as { publishDate?: unknown; updatedDate?: unknown }
	);
	for (const line of formatPending(slug, date, pendingTranslations(slug, date))) console.log(line);
}

if (import.meta.main) main();
