/**
 * Guard: src/lib/data/post-faqs.json and src/lib/data/post-toc.json must stay in
 * sync with the current .svx body of every post.
 *
 * Both files are generated caches (bun scripts/gen-post-faqs.ts / gen-post-toc.ts),
 * committed and read at build time by blog.ts (no Node built-ins in the edge bundle).
 * A post edit that does not re-run those two scripts leaves the caches stale: the
 * FAQPage JSON-LD and the desktop sidebar Table of Contents silently drift from the
 * real body (confirmed regression on audio-visual-rental.svx after commit 80563ac,
 * where 2 FAQ pairs and 2 whole H2 sections were missing from both caches).
 *
 * This test re-parses every .svx with the exact same pure parsers the generator
 * scripts use, and fails if the result does not match the committed JSON byte for
 * byte. The fix is always to regenerate:
 *   bun scripts/gen-post-faqs.ts && bun scripts/gen-post-toc.ts
 * Never hand-edit post-faqs.json or post-toc.json, and never widen an allowlist here.
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { parseFaqs } from './faq-parser.mjs';
import { parseToc } from './toc-parser.mjs';
import postFaqsCache from '../src/lib/data/post-faqs.json';
import postTocCache from '../src/lib/data/post-toc.json';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = resolve(ROOT, 'src/content/blog');

function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]+?---\n?/, '');
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.svx'));

describe('post-faqs.json freshness', () => {
	for (const file of files) {
		const slug = file.replace(/\.svx$/, '');
		const body = stripFrontmatter(readFileSync(resolve(BLOG_DIR, file), 'utf8'));
		const expected = parseFaqs(body);

		it(`${slug} matches the committed FAQ cache`, () => {
			const cached = (postFaqsCache as Record<string, unknown>)[slug] ?? [];
			if (expected.length === 0) {
				expect(cached).toEqual([]);
				return;
			}
			expect(
				cached,
				`post-faqs.json['${slug}'] is stale — run: bun scripts/gen-post-faqs.ts`
			).toEqual(expected);
		});
	}
});

describe('post-toc.json freshness', () => {
	for (const file of files) {
		const slug = file.replace(/\.svx$/, '');
		const body = stripFrontmatter(readFileSync(resolve(BLOG_DIR, file), 'utf8'));
		const expected = parseToc(body);

		it(`${slug} matches the committed ToC cache`, () => {
			const cached = (postTocCache as Record<string, unknown>)[slug] ?? [];
			if (expected.length === 0) {
				expect(cached).toEqual([]);
				return;
			}
			expect(
				cached,
				`post-toc.json['${slug}'] is stale — run: bun scripts/gen-post-toc.ts`
			).toEqual(expected);
		});
	}
});
