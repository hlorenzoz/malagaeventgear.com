/**
 * importers/plan-coverage.ts: closes the loop for PLANNED content only. A keyword goes
 * `idea` -> `covered` when a committed content plan item lists it with action `add-section` or
 * `add-faq`, and the target post now really has what the plan asked for: an H2/H3 that contains
 * the item's `heading` (normalized), or a FAQ question equal to the item's `question`
 * (normalized, from post-faqs.json). url = the item's targetUrl. Source key `blog`, no stats.
 *
 * A phrase that merely shows up in some heading proves nothing (brand terms, generic terms), so
 * a keyword that was never planned is never touched. A `new-post` item needs nothing here: the
 * blog importer marks its keyword `published` once the post exists (see importers/blog.test.ts).
 * Only `idea` keywords change: any other status is locked by merge.ts.
 */

import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { BlogPostSchema } from '../../../src/lib/types/blog';
import { normalizeId } from '../normalize';
import type { ContentPlan } from '../plan.schema';
import type { KeywordEntry } from '../schema';
import { readCommittedPlans } from './content-plan';
// @ts-expect-error: blog-files.mjs is @ts-nocheck (Node-only helper), no type declarations.
import { BLOG_DIR, listSvx, readPost, extractToc } from '../../blog-files.mjs';

export interface CoveragePost {
	slug: string;
	/** H2 and H3 texts. */
	headings: string[];
	/** FAQ questions (post-faqs.json). */
	faqs: string[];
}

const norm = (text: string) => `-${normalizeId(text)}-`;

/** Pure. Returns one full copy of each newly covered idea keyword, ready for `mergeKeyword`. */
export function planCoverage(
	plans: ContentPlan[],
	posts: CoveragePost[],
	keywords: KeywordEntry[],
	today: string
): KeywordEntry[] {
	const postBySlug = new Map(posts.map((p) => [p.slug, p]));
	const byId = new Map(keywords.map((k) => [k.id, k]));
	const out = new Map<string, KeywordEntry>();

	for (const plan of [...plans].sort((a, b) => a.date.localeCompare(b.date))) {
		for (const item of plan.items) {
			if ((item.action !== 'add-section' && item.action !== 'add-faq') || !item.targetUrl) continue;
			const post = postBySlug.get(item.targetUrl.replace(/^\/blog\/|\/$/g, ''));
			if (!post) continue;
			const done =
				item.action === 'add-section'
					? !!item.heading && post.headings.some((h) => norm(h).includes(norm(item.heading!)))
					: !!item.question && post.faqs.some((q) => norm(q) === norm(item.question!));
			if (!done) continue;
			for (const raw of item.keywords) {
				const k = byId.get(normalizeId(raw));
				if (!k || k.status !== 'idea') continue;
				out.set(k.id, {
					...k,
					url: item.targetUrl,
					status: 'covered',
					sources: { blog: { firstSeen: today, lastSeen: today } }
				});
			}
		}
	}
	return [...out.values()];
}

/** Every non-fixture, non-draft English post: its H2/H3 headings and its FAQ questions. */
export function readCoveragePosts(): CoveragePost[] {
	const faqs = JSON.parse(
		readFileSync(join(process.cwd(), 'src/lib/data/post-faqs.json'), 'utf8')
	) as Record<string, { question: string }[]>;
	return listSvx(BLOG_DIR)
		.filter((f: string) => !f.replace(/\.svx$/, '').endsWith('-test-fixture'))
		.map((file: string) => {
			const slug = file.replace(/\.svx$/, '');
			const { data, body } = readPost(join(BLOG_DIR, file));
			return { draft: BlogPostSchema.parse(data).draft ?? false, slug, body };
		})
		.filter((p: { draft: boolean }) => !p.draft)
		.map((p: { slug: string; body: string }) => ({
			slug: p.slug,
			headings: (extractToc(p.body) as { text: string }[]).map((t) => t.text),
			faqs: (faqs[p.slug] ?? []).map((f) => f.question)
		}));
}

export function importPlanCoverage(keywords: KeywordEntry[], today: string): KeywordEntry[] {
	const plans = readCommittedPlans();
	if (plans.length === 0) return [];
	return planCoverage(plans, readCoveragePosts(), keywords, today);
}
