/**
 * importers/blog.ts: keyword entries from published blog post frontmatter (plan, importers
 * table row "blog"). Reuses the frontmatter schema (`src/lib/types/blog.ts`, via `BlogPostSchema`)
 * and the existing file-reading helpers (`scripts/blog-files.mjs`, same ones the real blog build
 * pipeline uses) rather than re-parsing .svx by hand.
 *
 * `cluster` (plan, "Diseño" 2): the keyword of the pillar a post's `targetPage` points to, "news"
 * for a news post, "standalone" for a standalone post. A pillar/both post is its own cluster.
 */

import { join } from 'node:path';
import { BlogPostSchema } from '../../../src/lib/types/blog';
import { normalizeId } from '../normalize';
import type { KeywordEntry } from '../schema';
// @ts-expect-error: blog-files.mjs is @ts-nocheck (Node-only helper), no type declarations.
import { BLOG_DIR, listSvx, readPost } from '../../blog-files.mjs';

/** Test fixtures under src/content/blog/ that never carry silo metadata (see CLAUDE.md). */
const FIXTURE_SUFFIX = '-test-fixture';

export interface BlogPostInput {
	slug: string;
	keyword: string;
	siloRole: 'pillar' | 'supporting' | 'both' | 'news' | 'standalone';
	targetPage: string;
	draft: boolean;
}

function resolveCluster(post: BlogPostInput, byUrl: Map<string, string>): string {
	switch (post.siloRole) {
		case 'pillar':
		case 'both':
			return post.keyword;
		case 'news':
			return 'news';
		case 'standalone':
			return 'standalone';
		case 'supporting':
			return byUrl.get(post.targetPage) ?? 'unassigned';
	}
}

/** Pure: no file I/O. Unit tested with small fixtures (importers/blog.test.ts). */
export function blogPostsToKeywords(posts: BlogPostInput[], today: string): KeywordEntry[] {
	const byUrl = new Map<string, string>();
	for (const post of posts) {
		if (post.siloRole === 'pillar' || post.siloRole === 'both') {
			byUrl.set(`/blog/${post.slug}/`, post.keyword);
		}
	}

	return posts.map((post) => ({
		id: normalizeId(post.keyword),
		keyword: post.keyword,
		locale: 'en',
		cluster: resolveCluster(post, byUrl),
		topic: null,
		intent: null,
		url: `/blog/${post.slug}/`,
		status: post.draft ? 'draft' : 'published',
		reason: null,
		metrics: {
			volume: null,
			difficulty: null,
			cpc: null,
			gsc: null,
			ubersuggest: null
		},
		research: null,
		opportunity: null,
		opportunityReason: null,
		sources: [{ name: 'blog', seen: today }],
		firstSeen: today,
		lastResearched: null,
		notes: ''
	}));
}

/**
 * Reads every non-fixture `.svx` under `src/content/blog/` (English posts only: translated
 * posts under `src/content/blog/<locale>/` carry no `keyword` of their own, see CLAUDE.md
 * "Alcance por idioma") and converts them with `blogPostsToKeywords`. Never called from a test:
 * it does real file I/O (node:fs via blog-files.mjs), consistent with scripts/backfill-silo-meta.ts.
 */
export function importBlogKeywords(today: string): KeywordEntry[] {
	const files = listSvx(BLOG_DIR).filter(
		(f: string) => !f.replace(/\.svx$/, '').endsWith(FIXTURE_SUFFIX)
	);

	const posts: BlogPostInput[] = files.map((file: string) => {
		const slug = file.replace(/\.svx$/, '');
		const { data } = readPost(join(BLOG_DIR, file));
		const fm = BlogPostSchema.parse(data);
		if (!fm.keyword || !fm.siloRole) {
			throw new Error(`${slug}: missing keyword/siloRole, run scripts/backfill-silo-meta.ts first`);
		}
		return {
			slug,
			keyword: fm.keyword,
			siloRole: fm.siloRole,
			targetPage: fm.targetPage ?? '',
			draft: fm.draft ?? false
		};
	});

	return blogPostsToKeywords(posts, today);
}
