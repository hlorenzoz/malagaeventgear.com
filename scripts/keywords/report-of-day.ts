/**
 * report-of-day.ts: which Ubersuggest report runs today. The rotation picks the kind that has
 * gone longest without running (never a fixed weekday), so a day with the Mac off delays the
 * rotation by a day and skips nothing. Ties, and never-run kinds, follow `REPORT_KINDS` order.
 *
 * A retry on the same day repeats today's kind. A `failed` report counts as run, so a paid tool
 * that keeps failing cannot block the rest of the rotation.
 */

import { REPORT_KINDS, type ReportKind } from './batch.schema';

export const REPORT_TOOLS: Record<ReportKind, string[]> = {
	'seo-opportunities': ['seo_opportunities'],
	'ai-visibility': ['brand_config', 'brand_visibility_overview', 'brand_prompts'],
	'domain-keywords': ['domain_keywords'],
	'competitor-keywords': ['domain_keywords'],
	'rank-tracking': ['project_position_info'],
	backlinks: ['backlinks_overview', 'backlink_opportunity'],
	'top-pages': ['domain_top_pages', 'domain_overview', 'traffic_value'],
};

export interface ReportHistoryEntry {
	date: string;
	report?: { kind: ReportKind; status: string } | undefined;
}

export interface ReportOfDay {
	kind: ReportKind;
	tools: string[];
}

/** Pure: the report kind for `today`, from the committed batches (any order). */
export function pickReport(history: ReportHistoryEntry[], today: string): ReportOfDay {
	const lastRun = new Map<ReportKind, string>();
	for (const h of history) {
		if (!h.report) continue;
		const prev = lastRun.get(h.report.kind);
		if (!prev || h.date > prev) lastRun.set(h.report.kind, h.date);
	}
	// A kind that already ran today: a retry repeats it.
	const ranToday = REPORT_KINDS.find((k) => lastRun.get(k) === today);
	if (ranToday) return { kind: ranToday, tools: REPORT_TOOLS[ranToday] };
	let best: ReportKind = REPORT_KINDS[0];
	let bestDate: string | undefined = lastRun.get(best);
	for (const k of REPORT_KINDS.slice(1)) {
		const d = lastRun.get(k);
		if (bestDate === undefined) break;
		if (d === undefined || d < bestDate) {
			best = k;
			bestDate = d;
		}
	}
	return { kind: best, tools: REPORT_TOOLS[best] };
}
