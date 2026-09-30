/**
 * report-of-day.test.ts: the rotation picks the report kind that has gone longest without running,
 * so a Mac that was off one day delays the rotation instead of skipping a report.
 */
import { describe, it, expect } from 'vitest';
import { pickReport, REPORT_TOOLS } from './report-of-day';
import { REPORT_KINDS } from './batch.schema';

const run = (
	date: string,
	kind?: (typeof REPORT_KINDS)[number],
	status: 'ok' | 'partial' | 'failed' = 'ok',
) => ({
	date,
	report: kind ? { kind, status } : undefined,
});

describe('pickReport', () => {
	it('starts with seo-opportunities on a cold start', () => {
		expect(pickReport([], '2026-10-01').kind).toBe('seo-opportunities');
	});

	it('ignores batches without a report', () => {
		expect(pickReport([run('2026-09-30')], '2026-10-01').kind).toBe('seo-opportunities');
	});

	it('goes down the fixed order while kinds never ran', () => {
		const h = [run('2026-10-01', 'seo-opportunities')];
		expect(pickReport(h, '2026-10-02').kind).toBe('ai-visibility');
	});

	it('picks the kind that ran longest ago once all ran', () => {
		const h = REPORT_KINDS.map((k, i) => run(`2026-10-0${i + 1}`, k));
		expect(pickReport(h, '2026-10-08').kind).toBe('seo-opportunities');
	});

	it('repeats the same kind when retrying the same day', () => {
		const h = [run('2026-10-01', 'seo-opportunities'), run('2026-10-02', 'ai-visibility')];
		expect(pickReport(h, '2026-10-02').kind).toBe('ai-visibility');
	});

	it('counts a failed report as run, so a paid tool cannot block the rest', () => {
		const h = [
			run('2026-10-01', 'seo-opportunities'),
			run('2026-10-02', 'ai-visibility', 'failed'),
		];
		expect(pickReport(h, '2026-10-03').kind).toBe('domain-keywords');
	});

	it('returns the tools of the kind', () => {
		expect(pickReport([], '2026-10-01').tools).toEqual(REPORT_TOOLS['seo-opportunities']);
		expect(REPORT_TOOLS['competitor-keywords']).toContain('domain_keywords');
	});

	it('has tools for every kind', () => {
		for (const k of REPORT_KINDS) expect(REPORT_TOOLS[k].length).toBeGreaterThan(0);
	});
});
