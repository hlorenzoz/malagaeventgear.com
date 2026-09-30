/**
 * keywords-file.test.ts: guards over the real, committed `.agents/data/keywords.json`. Reads project
 * files via `import.meta.glob` (never `node:fs`, per CLAUDE.md "Tests que leen archivos del
 * proyecto"), unlike the importer scripts themselves which run standalone under bun and use
 * node:fs (same pattern as scripts/backfill-silo-meta.ts).
 *
 * Most invariants (unique ids, `rejected` requires `reason`, `published` requires `url`) are
 * already enforced by `KeywordsFileSchema.superRefine` (see schema.test.ts): parsing the real
 * file here re-proves those hold for the actual data, not just for hand-built fixtures. The
 * `difficulty`-only-from-ubersuggest rule is now a STRUCTURAL guarantee (only
 * `UbersuggestStatsSchema` even has a `difficulty` field), which is exactly why this file re-reads
 * the RAW JSON text below rather than trusting the (lossy, unknown-key-stripping) parsed result:
 * a `difficulty` field accidentally written onto another source's stats would otherwise be
 * silently dropped by Zod instead of caught.
 */
import { describe, it, expect } from 'vitest';
import matter from 'gray-matter';
import { KeywordsFileSchema, SOURCE_KEYS } from './schema';
import { normalizeId } from './normalize';
import { BlogPostSchema } from '../../src/lib/types/blog';

const rawKeywordsFile = import.meta.glob('/.agents/data/keywords.json', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const rawPosts = import.meta.glob('/src/content/blog/*.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function rawText(): string {
	const raw = rawKeywordsFile['/.agents/data/keywords.json'];
	if (!raw) throw new Error('.agents/data/keywords.json not found: run `just keywords-sync` first');
	return raw;
}

function loadKeywordsFile() {
	return KeywordsFileSchema.parse(JSON.parse(rawText()));
}

describe('keywords.json: schema and invariants', () => {
	it('validates against KeywordsFileSchema (unique ids, rejected/reason, published/url)', () => {
		expect(() => loadKeywordsFile()).not.toThrow();
	});

	it('never has a difficulty field anywhere outside sources.ubersuggest.stats', () => {
		const file = JSON.parse(rawText()) as {
			keywords: { id: string; sources: Record<string, unknown> }[];
		};
		const otherSourceKeys = SOURCE_KEYS.filter((k) => k !== 'ubersuggest');
		for (const keyword of file.keywords) {
			for (const key of otherSourceKeys) {
				const source = keyword.sources[key] as { stats?: unknown } | undefined;
				const stats = source?.stats as Record<string, unknown> | null | undefined;
				if (stats && 'difficulty' in stats) {
					throw new Error(
						`keywords.json: "${keyword.id}" has a difficulty field under sources.${key}, only sources.ubersuggest.stats may carry one`
					);
				}
			}
		}
	});

	it('never has a top level metrics or summary field on any keyword (all metric values live in sources)', () => {
		const file = JSON.parse(rawText()) as { keywords: Record<string, unknown>[] };
		for (const keyword of file.keywords) {
			expect(keyword).not.toHaveProperty('metrics');
			expect(keyword).not.toHaveProperty('summary');
		}
	});
});

interface PublishedPost {
	slug: string;
	keyword: string;
	id: string;
}

function publishedPosts(): PublishedPost[] {
	const posts: PublishedPost[] = [];
	for (const [path, raw] of Object.entries(rawPosts)) {
		const slug = path
			.split('/')
			.pop()!
			.replace(/\.svx$/, '');
		if (slug.endsWith('-test-fixture')) continue;

		const { data } = matter(raw);
		const fm = BlogPostSchema.parse(JSON.parse(JSON.stringify(data)));
		if (fm.draft) continue; // only published posts are covered by this guard
		if (!fm.keyword) throw new Error(`${slug}: missing keyword in frontmatter`);

		posts.push({ slug, keyword: fm.keyword, id: normalizeId(fm.keyword) });
	}
	return posts;
}

describe('keywords.json: every published English post has its keyword tracked', () => {
	const file = loadKeywordsFile();
	const byId = new Map(file.keywords.map((k) => [k.id, k]));

	it.each(publishedPosts())(
		'"$slug" (keyword "$keyword") is published at /blog/$slug/',
		({ slug, id }) => {
			const entry = byId.get(id);
			expect(entry, `no keywords.json entry for id "${id}" (post ${slug})`).toBeDefined();
			expect(entry?.status).toBe('published');
			expect(entry?.url).toBe(`/blog/${slug}/`);
			expect(entry?.sources.blog, `"${id}" has no sources.blog entry`).toBeDefined();
		}
	);
});
