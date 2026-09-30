/**
 * report-log.ts: `.agents/data/ubersuggest.json`, the dated record of the daily Ubersuggest
 * reports. Generated from the committed batches (`just keywords-report-log`), never edited by
 * hand and never written by the agent. Deterministic: `updated` is the newest batch date, so
 * regenerating it with the same batches gives the same bytes.
 */

import { z } from 'zod';
import type { KeywordBatch } from './batch.schema';
import { reportViews, type ReportView } from './report-findings';

export const REPORT_LOG_VERSION = 1;

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const EntrySchema = z.strictObject({
	date: dateOnly,
	kind: z.string().min(1),
	status: z.enum(['ok', 'partial', 'failed']),
	reason: z.string().optional(),
	calls: z.array(z.strictObject({ tool: z.string(), outcome: z.string().optional() })),
	summary: z.array(z.string()),
	findings: z.array(z.strictObject({ key: z.string(), title: z.string() })),
	discovered: z.strictObject({ keywords: z.number(), aiPrompts: z.number() })
});

export const ReportLogSchema = z.strictObject({
	version: z.literal(REPORT_LOG_VERSION),
	updated: dateOnly.nullable(),
	reports: z.array(EntrySchema)
});

export type ReportLog = z.infer<typeof ReportLogSchema>;

/** Pure: the log from every committed batch, newest entry first. */
export function buildReportLog(batches: KeywordBatch[]): ReportLog {
	const byDate = new Map(batches.map((b) => [b.date, b]));
	const entries = reportViews(batches).map((v: ReportView) => {
		const b = byDate.get(v.date)!;
		return {
			date: v.date,
			kind: v.kind,
			status: v.status,
			...(b.report?.reason ? { reason: b.report.reason } : {}),
			calls: b.run.calls.map((c) => ({ tool: c.tool, ...(c.outcome ? { outcome: c.outcome } : {}) })),
			summary: v.summary,
			findings: v.findings.map((f) => ({ key: f.key, title: f.title })),
			discovered: { keywords: b.keywords.length, aiPrompts: b.aiPrompts.length }
		};
	});
	entries.sort((a, b) => b.date.localeCompare(a.date));
	const updated = batches.map((b) => b.date).sort().at(-1) ?? null;
	return { version: REPORT_LOG_VERSION, updated, reports: entries };
}

/** Pure: the file contents. */
export function renderReportLog(log: ReportLog): string {
	return `${JSON.stringify(ReportLogSchema.parse(log), null, '\t')}\n`;
}
