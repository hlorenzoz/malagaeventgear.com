/**
 * report-log.test.ts: `.agents/data/ubersuggest.json`, the dated record of the daily reports. It is
 * generated from the committed batches (never edited by hand) and must be deterministic: the same
 * batches give the same bytes, so regenerating it twice never produces a diff.
 */
import { describe, it, expect } from 'vitest';
import { KeywordBatchSchema } from './batch.schema';
import { buildReportLog, renderReportLog, ReportLogSchema } from './report-log';

const batch = (over: Record<string, unknown>) =>
	KeywordBatchSchema.parse({ date: '2026-10-01', run: { status: 'ok' }, ...over });

const SEO = batch({
	date: '2026-10-01',
	run: { status: 'ok', calls: [{ tool: 'seo_opportunities', outcome: 'ok' }] },
	keywords: [{ keyword: 'a', source: 'x' }],
	report: {
		kind: 'seo-opportunities',
		status: 'ok',
		summary: ['1 finding'],
		seo: [{ type: 'SITE_AUDIT', subtype: 'long_titles', count: 3 }]
	}
});
const AI = batch({
	date: '2026-10-02',
	report: { kind: 'ai-visibility', status: 'partial', reason: 'quota' }
});

describe('buildReportLog', () => {
	it('has one entry per batch with a report, newest first', () => {
		const log = buildReportLog([SEO, AI]);
		expect(log.reports.map((r) => r.date)).toEqual(['2026-10-02', '2026-10-01']);
		expect(log.version).toBe(1);
	});

	it('skips a batch with neither a report nor a weekly run', () => {
		expect(buildReportLog([batch({ date: '2026-09-29' })]).reports).toEqual([]);
	});

	it('records kind, status, calls, summary, findings and what was discovered', () => {
		const e = buildReportLog([SEO]).reports[0];
		expect(e).toMatchObject({
			kind: 'seo-opportunities',
			status: 'ok',
			summary: ['1 finding'],
			calls: [{ tool: 'seo_opportunities', outcome: 'ok' }],
			discovered: { keywords: 1, aiPrompts: 0 }
		});
		expect(e.findings[0]).toMatchObject({ key: 'site-audit/long-titles' });
	});

	it('keeps the reason of a partial report', () => {
		expect(buildReportLog([AI]).reports[0].reason).toBe('quota');
	});

	it('takes `updated` from the newest batch, never from today', () => {
		expect(buildReportLog([SEO, AI]).updated).toBe('2026-10-02');
		expect(buildReportLog([]).updated).toBeNull();
	});

	it('names a legacy weekly batch as such', () => {
		const e = buildReportLog([batch({ run: { status: 'partial', weeklyRun: true } })]).reports[0];
		expect(e.kind).toBe('legacy-weekly');
	});
});

describe('renderReportLog', () => {
	it('is deterministic and validates against its own schema', () => {
		const a = renderReportLog(buildReportLog([SEO, AI]));
		const b = renderReportLog(buildReportLog([AI, SEO]));
		expect(a).toBe(b);
		expect(() => ReportLogSchema.parse(JSON.parse(a))).not.toThrow();
		expect(a.endsWith('\n')).toBe(true);
	});
});
