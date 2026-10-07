#!/usr/bin/env bun
/**
 * commit-guard.ts: a commit never publishes an English post without its 12 translations.
 *
 *   bun scripts/translate/commit-guard.ts
 *
 * Runs from the pre-commit hook (`just hooks-install`). It looks at the INDEX, not the working
 * tree: for every English post (`src/content/blog/<slug>.svx`) added or modified by the commit
 * and not a draft, each of the 12 locales must have its translation in the index, not a draft and
 * not older than the English post (`sourceUpdated` >= `updatedDate ?? publishDate`).
 *
 * Why: the English post of `outdoor-movie-screen-and-projector-rental` was committed and deployed
 * before its translations, so the live page had no hreflang and no language selector (CLAUDE.md,
 * "Reglas mandatorias de idioma", rules 1 and 2). A draft English post is exempt, `post-new`
 * creates one before any translation exists.
 *
 * `git commit --no-verify` skips it, the recipes that use that flag never touch a blog post.
 */
import matter from 'gray-matter';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';

const ENGLISH_POST = /^src\/content\/blog\/([^/]+)\.svx$/;

/** Frontmatter as the app sees it (an unquoted YAML date becomes its ISO string), or null. */
export function parseFrontmatter(raw: string): Record<string, unknown> | null {
	if (!raw.startsWith('---')) return null;
	try {
		const data = JSON.parse(JSON.stringify(matter(raw).data)) as unknown;
		return data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
	} catch {
		return null;
	}
}

const day = (value: unknown): string | null =>
	typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : null;

/**
 * Pure. `changed` are the paths the commit adds or modifies, `read` returns the content of a
 * path in the index (null when it is not there). One message per problem, `<locale>/<slug>: ...`.
 */
export function guardProblems(changed: string[], read: (path: string) => string | null): string[] {
	const problems: string[] = [];
	for (const path of changed) {
		const slug = path.match(ENGLISH_POST)?.[1];
		if (!slug) continue;
		const raw = read(path);
		const en = raw === null ? null : parseFrontmatter(raw);
		if (en?.draft === true) continue;
		const lastChange = day(en?.updatedDate) ?? day(en?.publishDate);
		if (!lastChange) {
			problems.push(`${slug}: the English post has no readable frontmatter (publishDate)`);
			continue;
		}
		for (const locale of PREFIXED_LOCALES) {
			const translated = read(`src/content/blog/${locale}/${slug}.svx`);
			if (translated === null) {
				problems.push(`${locale}/${slug}: no translation in the commit`);
				continue;
			}
			const fm = parseFrontmatter(translated);
			if (fm?.draft === true) {
				problems.push(`${locale}/${slug}: the translation is still a draft`);
				continue;
			}
			const source = day(fm?.sourceUpdated);
			if (!source) {
				problems.push(`${locale}/${slug}: the translation has no readable sourceUpdated`);
			} else if (source < lastChange) {
				problems.push(
					`${locale}/${slug}: stale, it translates the English of ${source} but the English post changed on ${lastChange}`
				);
			}
		}
	}
	return problems;
}

export function formatGuardFailure(problems: string[]): string {
	return [
		'[translations guard] commit refused: an English post goes out with its 12 translations in the SAME commit.',
		'',
		...problems.map((p) => `  - ${p}`),
		'',
		'Translate first, commit after. For a post of the content flow: `just post-translate-finish <slug>`',
		'(checks, tests, build and a single commit of the English post and its translations).',
		'A post that is not ready stays `draft: true`.'
	].join('\n');
}

function git(args: string[]): { code: number; out: string } {
	const r = Bun.spawnSync(['git', ...args], { stdout: 'pipe', stderr: 'pipe' });
	return { code: r.exitCode, out: r.stdout.toString() };
}

function main(): void {
	const changed = git(['diff', '--cached', '--name-only', '--diff-filter=AM']).out
		.split('\n')
		.filter((l) => l.trim().length > 0);
	const read = (path: string): string | null => {
		const r = git(['show', `:${path}`]);
		return r.code === 0 ? r.out : null;
	};
	const problems = guardProblems(changed, read);
	if (problems.length > 0) {
		console.error(formatGuardFailure(problems));
		process.exit(1);
	}
}

if (import.meta.main) main();
