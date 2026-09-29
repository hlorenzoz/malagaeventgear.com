/**
 * importers/post-faqs.ts: FAQ entries from `src/lib/data/post-faqs.json` (plan, importers table
 * row "post-faqs"): FAQ pairs already extracted from published post bodies at build time. Every
 * one of these is already live on its post's page, so it always enters as `status: 'answered'`.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeId } from "../normalize";
import type { FaqEntry } from "../schema";

export interface PostInfo {
  /** The post's own keyword id, e.g. `normalizeId(post.keyword)`. */
  keywordId: string;
  cluster: string;
}

export type PostFaqsData = Record<
  string,
  { question: string; answer: string }[]
>;

/** Pure: no file I/O. `postInfo` comes from the blog importer's already-resolved clusters, so
 *  this module never re-derives silo metadata. A slug missing from `postInfo` (should not happen
 *  for a real post-faqs.json, since every key is a real published slug) falls back to
 *  cluster 'unassigned' and a slug-derived keywordId rather than throwing, so a temporarily
 *  out-of-sync cache does not abort the whole sync. */
export function postFaqsToFaqs(
  data: PostFaqsData,
  postInfo: Record<string, PostInfo>,
  today: string,
): FaqEntry[] {
  const faqs: FaqEntry[] = [];
  for (const [slug, items] of Object.entries(data)) {
    const info = postInfo[slug] ?? { keywordId: slug, cluster: "unassigned" };
    for (const item of items) {
      faqs.push({
        id: `${slug}--${normalizeId(item.question)}`,
        question: item.question,
        keywordId: info.keywordId,
        cluster: info.cluster,
        url: `/blog/${slug}/`,
        status: "answered",
        reason: null,
        source: "post",
        firstSeen: today,
      });
    }
  }
  return faqs;
}

/** Real file read (node:fs, same pattern as scripts/backfill-silo-meta.ts). */
export function importPostFaqs(
  postInfo: Record<string, PostInfo>,
  today: string,
): FaqEntry[] {
  const path = join(process.cwd(), "src", "lib", "data", "post-faqs.json");
  const data: PostFaqsData = JSON.parse(readFileSync(path, "utf8"));
  return postFaqsToFaqs(data, postInfo, today);
}
