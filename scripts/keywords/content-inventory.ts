#!/usr/bin/env bun
/**
 * content-inventory.ts: the content strategist's map of what the English blog already says.
 * Prints compact JSON: one entry per published English post with its url, keyword, silo role,
 * target, cluster, H2/H3 headings in order and FAQ questions. Fixtures and drafts are left out.
 * Lets the agent run the cannibalization check ("is this already a section somewhere?") without
 * reading 77 posts.
 *
 * Usage: `bun scripts/keywords/content-inventory.ts [--cluster <cluster>]`, also
 * `just content-inventory [cluster]`.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BlogPostSchema } from '../../src/lib/types/blog';
import { blogPostsToKeywords, type BlogPostInput } from './importers/blog';
// @ts-expect-error: blog-files.mjs is @ts-nocheck (Node-only helper), no type declarations.
import { BLOG_DIR, listSvx, readPost } from '../blog-files.mjs';

export interface InventoryPostInput extends BlogPostInput {
	body: string;
}

export interface InventoryPost {
	slug: string;
	url: string;
	keyword: string;
	siloRole: BlogPostInput['siloRole'];
	targetPage: string;
	cluster: string;
	headings: { level: 2 | 3; text: string }[];
	faqs: string[];
}

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*$/;
const TOC_HEADING_RE = /^table of contents$/i;

/** Pure: H2 and H3 of a markdown body, in order (fenced code is not scanned). */
function headingsOf(body: string): { level: 2 | 3; text: string }[] {
	const out: { level: 2 | 3; text: string }[] = [];
	let fenced = false;
	for (const line of body.split('\n')) {
		if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
		if (fenced) continue;
		const m = HEADING_RE.exec(line);
		if (!m || TOC_HEADING_RE.test(m[2])) continue;
		out.push({ level: m[1].length as 2 | 3, text: m[2] });
	}
	return out;
}

/** Pure. `faqsBySlug` is `post-faqs.json`. Sorted by slug for a stable output. */
export function buildInventory(
	posts: InventoryPostInput[],
	faqsBySlug: Record<string, { question: string }[]>,
	cluster?: string
): InventoryPost[] {
	const clusters = new Map(blogPostsToKeywords(posts, '2000-01-01').map((e) => [e.url, e.cluster]));
	return posts
		.filter((p) => !p.draft)
		.map((p) => {
			const faqs = (faqsBySlug[p.slug] ?? []).map((f) => f.question);
			const asked = new Set(faqs);
			return {
				slug: p.slug,
				url: `/blog/${p.slug}/`,
				keyword: p.keyword,
				siloRole: p.siloRole,
				targetPage: p.targetPage,
				cluster: clusters.get(`/blog/${p.slug}/`) ?? 'unassigned',
				headings: headingsOf(p.body).filter((h) => !(h.level === 3 && asked.has(h.text))),
				faqs
			};
		})
		.filter((p) => !cluster || p.cluster === cluster)
		.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Pure: `--cluster a b`, `--cluster=a b` or a bare `a b` all mean the cluster "a b" (a cluster is
 *  a keyword phrase, and just passes each word as its own argument). No arguments means all. */
export function parseCluster(argv: string[]): string | undefined {
	const words = argv.flatMap((a) => {
		if (a === '--cluster') return [];
		if (a.startsWith('--cluster=')) return [a.slice('--cluster='.length)];
		return [a];
	});
	const cluster = words.join(' ').trim();
	return cluster || undefined;
}

function readPosts(): InventoryPostInput[] {
	const files = listSvx(BLOG_DIR).filter(
		(f: string) => !f.replace(/\.svx$/, '').endsWith('-test-fixture')
	);
	return files.map((file: string) => {
		const { data, body } = readPost(join(BLOG_DIR, file));
		const fm = BlogPostSchema.parse(data);
		return {
			slug: file.replace(/\.svx$/, ''),
			keyword: fm.keyword ?? '',
			siloRole: fm.siloRole ?? 'standalone',
			targetPage: fm.targetPage ?? '',
			draft: fm.draft ?? false,
			body
		};
	});
}

if (import.meta.main) {
	const cluster = parseCluster(process.argv.slice(2));
	const faqs = JSON.parse(readFileSync(join(process.cwd(), 'src/lib/data/post-faqs.json'), 'utf8'));
	console.log(JSON.stringify(buildInventory(readPosts(), faqs, cluster)));
}
