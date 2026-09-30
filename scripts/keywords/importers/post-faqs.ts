/**
 * importers/post-faqs.ts: FAQ entries from `src/lib/data/post-faqs.json` (plan, importers table
 * row "post-faqs"): FAQ pairs already extracted from published post bodies at build time. Every
 * one of these is already live on its post's page, so it always enters as `status: 'answered'`.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId } from '../normalize';
import type { FaqEntry } from '../schema';

export interface PostInfo {
	/** The post's own keyword id, e.g. `normalizeId(post.keyword)`. */
	keywordId: string;
	cluster: string;
}

export type PostFaqsData = Record<string, { question: string; answer: string }[]>;

/** Pure: no file I/O. `postInfo` comes from the blog importer's already-resolved clusters, so
 *  this module never re-derives silo metadata. A slug missing from `postInfo` (should not happen
 *  for a real post-faqs.json, since every key is a real published slug) falls back to
 *  cluster 'unassigned' and a slug-derived keywordId rather than throwing, so a temporarily
 *  out-of-sync cache does not abort the whole sync. */
export function postFaqsToFaqs(
	data: PostFaqsData,
	postInfo: Record<string, PostInfo>,
	today: string
): FaqEntry[] {
	// The id is the normalized question: the same question in two posts is ONE faq that lists
	// both post urls (`sources.post.urls`), and the first post keeps `keywordId`, `cluster`, `url`.
	const byId = new Map<string, FaqEntry>();
	for (const [slug, items] of Object.entries(data)) {
		const info = postInfo[slug] ?? { keywordId: slug, cluster: 'unassigned' };
		const url = `/blog/${slug}/`;
		for (const item of items) {
			const id = normalizeId(item.question);
			const seen = byId.get(id);
			if (seen) {
				const urls = seen.sources.post!.urls;
				if (!urls.includes(url)) urls.push(url);
				continue;
			}
			byId.set(id, {
				id,
				question: item.question,
				keywordId: info.keywordId,
				cluster: info.cluster,
				url,
				status: 'answered',
				reason: null,
				sources: { post: { firstSeen: today, lastSeen: today, urls: [url] } }
			});
		}
	}
	return [...byId.values()];
}

/** Real file read (node:fs, same pattern as scripts/backfill-silo-meta.ts). */
export function importPostFaqs(postInfo: Record<string, PostInfo>, today: string): FaqEntry[] {
	const path = join(process.cwd(), 'src', 'lib', 'data', 'post-faqs.json');
	const data: PostFaqsData = JSON.parse(readFileSync(path, 'utf8'));
	return postFaqsToFaqs(data, postInfo, today);
}
