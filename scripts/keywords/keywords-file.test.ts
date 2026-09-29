/**
 * keywords-file.test.ts: guards over the real, committed root `keywords.json` (plan, section
 * 4 "Guards"). Reads project files via `import.meta.glob` (never `node:fs`, per CLAUDE.md
 * "Tests que leen archivos del proyecto"), unlike the importer scripts themselves which run
 * standalone under bun and use node:fs (same pattern as scripts/backfill-silo-meta.ts).
 *
 * Most invariants (unique ids, `rejected` requires `reason`, `published` requires `url`,
 * `difficulty` only from ubersuggest) are already enforced by `KeywordsFileSchema.superRefine`
 * (see schema.test.ts): parsing the real file here re-proves those hold for the actual data, not
 * just for hand-built fixtures.
 */
import { describe, it, expect } from 'vitest';
import matter from 'gray-matter';
import { KeywordsFileSchema } from './schema';
import { normalizeId } from './normalize';
import { BlogPostSchema } from '../../src/lib/types/blog';

const rawKeywordsFile = import.meta.glob('/keywords.json', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const rawPosts = import.meta.glob('/src/content/blog/*.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function loadKeywordsFile() {
	const raw = rawKeywordsFile['/keywords.json'];
	if (!raw) throw new Error('keywords.json not found: run `just keywords-sync` first');
	return KeywordsFileSchema.parse(JSON.parse(raw));
}

describe('keywords.json: schema and invariants', () => {
	it('validates against KeywordsFileSchema (unique ids, rejected/reason, published/url, difficulty/ubersuggest)', () => {
		expect(() => loadKeywordsFile()).not.toThrow();
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
		}
	);
});
