/**
 * importers/content-plan.ts: closes the loop between the daily content plan and keywords.json.
 * Every keyword named in a committed plan gets the `content-plan` source (latest plan wins), so
 * `opportunities.ts` stops proposing it again. It NEVER changes status, url or cluster: an
 * existing keyword is returned as a copy of itself plus the new source, and a keyword that does
 * not exist yet enters as a plain `idea`.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId, toAscii } from '../normalize';
import { ContentPlanSchema, type ContentPlan } from '../plan.schema';
import type { KeywordEntry, ContentPlanSource } from '../schema';

export const CONTENT_PLAN_DIR = join(
	process.cwd(),
	'.agents',
	'context',
	'keywords',
	'content-plan'
);
const PLAN_FILENAME_RE = /^\d{4}-\d{2}-\d{2}\.json$/;

/** Pure. `existing` is the current keyword map (by id) so identity fields can be copied. */
export function contentPlansToKeywords(
	plans: ContentPlan[],
	existing: Map<string, KeywordEntry>
): KeywordEntry[] {
	const byId = new Map<string, { keyword: string; cluster: string; source: ContentPlanSource }>();
	for (const plan of [...plans].sort((a, b) => a.date.localeCompare(b.date))) {
		for (const item of plan.items) {
			const targetUrl = item.targetUrl ?? (item.newPost ? `/blog/${item.newPost.slug}/` : null);
			for (const raw of item.keywords) {
				const keyword = toAscii(raw).trim();
				const id = normalizeId(keyword);
				const prev = byId.get(id);
				byId.set(id, {
					keyword,
					cluster: item.cluster,
					source: {
						firstSeen: prev?.source.firstSeen ?? plan.date,
						lastSeen: plan.date,
						stats: { asOf: plan.date, action: item.action, targetUrl, priority: item.priority }
					}
				});
			}
		}
	}

	return [...byId.entries()].map(([id, { keyword, cluster, source }]) => {
		const base = existing.get(id);
		if (base) return { ...base, sources: { 'content-plan': source } };
		return {
			id,
			keyword,
			locale: 'en',
			cluster,
			topic: null,
			intent: null,
			url: null,
			status: 'idea' as const,
			reason: null,
			sources: { 'content-plan': source },
			opportunity: null,
			opportunityReason: null,
			firstSeen: source.firstSeen,
			lastResearched: null,
			notes: ''
		};
	});
}

/** Reads every committed plan, oldest first. A malformed plan throws: never skipped silently. */
export function readCommittedPlans(dir: string = CONTENT_PLAN_DIR): ContentPlan[] {
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((f) => PLAN_FILENAME_RE.test(f))
		.sort()
		.map((file) => {
			const parsed = ContentPlanSchema.safeParse(JSON.parse(readFileSync(join(dir, file), 'utf8')));
			if (!parsed.success) throw new Error(`content-plan/${file}: ${parsed.error.message}`);
			return parsed.data;
		});
}

export function importContentPlans(existing: Map<string, KeywordEntry>): KeywordEntry[] {
	return contentPlansToKeywords(readCommittedPlans(), existing);
}
