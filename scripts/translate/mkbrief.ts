#!/usr/bin/env bun
/**
 * mkbrief.ts: builds the translator brief of one post.
 *
 *   bun scripts/translate/mkbrief.ts <slug> [--out path]
 *
 * brief-base.md (placeholders filled, today in UTC) + special/<slug>.md when it exists + the
 * standard tail. Prints to stdout unless --out is given. Pure logic in brief-lib.ts.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertSlug, buildBrief, todayUtc } from './brief-lib';

const HERE = dirname(fileURLToPath(import.meta.url));

function main(): void {
	const args = process.argv.slice(2);
	const outIndex = args.indexOf('--out');
	const out = outIndex >= 0 ? args[outIndex + 1] : undefined;
	if (outIndex >= 0 && !out) {
		console.error('[mkbrief] --out needs a path');
		process.exit(1);
	}
	const slug = args.find((a, i) => !a.startsWith('--') && (outIndex < 0 || i !== outIndex + 1));
	if (!slug) {
		console.error('Usage: bun scripts/translate/mkbrief.ts <slug> [--out path]');
		process.exit(1);
	}
	try {
		assertSlug(slug);
	} catch (error) {
		console.error(`[mkbrief] ${(error as Error).message}`);
		process.exit(1);
	}
	const postFile = join(HERE, '..', '..', 'src', 'content', 'blog', `${slug}.svx`);
	if (!existsSync(postFile)) {
		console.error(`[mkbrief] there is no English post src/content/blog/${slug}.svx`);
		process.exit(1);
	}
	const specialFile = join(HERE, 'special', `${slug}.md`);
	const brief = buildBrief({
		base: readFileSync(join(HERE, 'brief-base.md'), 'utf8'),
		special: existsSync(specialFile) ? readFileSync(specialFile, 'utf8') : null,
		slug,
		today: todayUtc()
	});
	if (out) {
		writeFileSync(out, brief, 'utf8');
		console.error(`[mkbrief] ${brief.length} characters -> ${out}`);
	} else {
		process.stdout.write(brief);
	}
}

if (import.meta.main) main();
