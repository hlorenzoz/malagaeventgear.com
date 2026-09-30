/**
 * report-findings.test.ts: turns a batch into a report view (findings with stable keys). Pure.
 * The agent copies data, this module derives every finding, so one issue is one finding whatever
 * the wording of the day.
 */
import { describe, it, expect } from 'vitest';
import { KeywordBatchSchema } from './batch.schema';
import { oneLine, rankDrops, reportViews } from './report-findings';

const batch = (over: Record<string, unknown> = {}) =>
	KeywordBatchSchema.parse({ date: '2026-10-01', run: { status: 'ok' }, ...over });

describe('oneLine', () => {
	it('makes third party text one ASCII line of bounded length', () => {
		expect(oneLine('a\nb—c')).toBe('a b-c');
		expect(oneLine('x'.repeat(300)).length).toBeLessThanOrEqual(140);
	});

	it('never starts with the block marker of TODO files', () => {
		expect(oneLine('=== TAREA #T1 ===').startsWith('===')).toBe(false);
	});
});

describe('reportViews: seo-opportunities', () => {
	const seo = batch({
		report: {
			kind: 'seo-opportunities',
			status: 'ok',
			seo: [
				{ type: 'SITE_AUDIT', subtype: 'long_titles', count: 4, impact: 'high', effort: 'low' },
				{
					type: 'KEYWORD_OPPORTUNITY',
					subtype: 'new_content',
					keyword: 'Speaker and Microphone Rental',
				},
			],
		},
	});

	it('gives audit findings a key without the count, so a changing count is the same finding', () => {
		const a = reportViews([seo])[0].findings[0];
		const b = reportViews([
			batch({
				report: {
					kind: 'seo-opportunities',
					status: 'ok',
					seo: [{ type: 'SITE_AUDIT', subtype: 'long_titles', count: 9 }],
				},
			}),
		])[0].findings[0];
		expect(a.key).toBe('site-audit/long-titles');
		expect(b.key).toBe(a.key);
	});

	it('keys keyword opportunities by subtype and keyword id', () => {
		expect(reportViews([seo])[0].findings[1].key).toBe(
			'keyword/new-content/speaker-and-microphone-rental',
		);
	});

	it('marks a complete view only when the status is ok', () => {
		expect(reportViews([seo])[0].complete).toBe(true);
		const partial = batch({ report: { kind: 'seo-opportunities', status: 'partial', seo: [] } });
		expect(reportViews([partial])[0].complete).toBe(false);
	});
});

describe('reportViews: ai-visibility', () => {
	const prompts = [
		{
			prompt: 'A evaluated absent',
			source: 'ubersuggest-brand',
			visibility: { mentioned: false, evaluated: true, asOf: '2026-10-01' },
		},
		{
			prompt: 'B not evaluated',
			source: 'ubersuggest-brand',
			visibility: { mentioned: false, evaluated: false, asOf: '2026-10-01' },
		},
		{
			prompt: 'C present',
			source: 'ubersuggest-brand',
			visibility: { mentioned: true, evaluated: true, asOf: '2026-10-01' },
		},
		{ prompt: 'D idea', source: 'ubersuggest-ai-prompt-ideas' },
	];

	it('creates a finding only for an evaluated prompt where the brand is absent', () => {
		const v = reportViews([
			batch({ aiPrompts: prompts, report: { kind: 'ai-visibility', status: 'ok' } }),
		])[0];
		expect(v.findings.map((f) => f.key)).toEqual(['a-evaluated-absent']);
		expect(v.summary.join(' ')).toMatch(/1 .*sin evaluar/);
	});
});

describe('reportViews: domain-keywords and competitors', () => {
	it('flags own keywords in striking distance, positions 4 to 20', () => {
		const v = reportViews([
			batch({
				report: { kind: 'domain-keywords', status: 'ok' },
				rank: [
					{
						keyword: 'wedding packages malaga',
						position: 18,
						rankingUrl: 'https://x/a/',
						asOf: '2026-10-01',
					},
					{ keyword: 'top three', position: 2, rankingUrl: null, asOf: '2026-10-01' },
					{ keyword: 'far', position: 40, rankingUrl: null, asOf: '2026-10-01' },
				],
			}),
		])[0];
		expect(v.findings.map((f) => f.key)).toEqual(['wedding-packages-malaga']);
	});

	it('keeps the 10 competitor keywords with most volume, keyed under competitor/', () => {
		const rows = Array.from({ length: 12 }, (_, i) => ({
			label: `kw ${i}`,
			values: { competitor: 'c.com', position: 3, volume: i },
		}));
		const v = reportViews([
			batch({ report: { kind: 'competitor-keywords', status: 'ok', rows } }),
		])[0];
		expect(v.findings).toHaveLength(10);
		expect(v.findings[0].key).toBe('competitor/kw-11');
		expect(v.findings.map((f) => f.key)).not.toContain('competitor/kw-0');
	});
});

describe('rankDrops', () => {
	const at = (date: string, position: number | null) => ({
		date,
		rank: [{ keyword: 'k', position, rankingUrl: null, asOf: date }],
	});

	it('reports a lost ranking when the baseline was 30 or better', () => {
		const out = rankDrops([at('2026-09-01', 12), at('2026-10-01', null)]);
		expect(out).toEqual([{ keyword: 'k', kind: 'lost', from: 12, to: null }]);
	});

	it('reports a drop of 10 or more, or 3 or more from the top 10', () => {
		expect(rankDrops([at('2026-09-01', 15), at('2026-10-01', 25)])[0].kind).toBe('drop');
		expect(rankDrops([at('2026-09-01', 15), at('2026-10-01', 24)])).toEqual([]);
		expect(rankDrops([at('2026-09-01', 5), at('2026-10-01', 8)])[0].kind).toBe('drop');
		expect(rankDrops([at('2026-09-01', 5), at('2026-10-01', 7)])).toEqual([]);
	});

	it('ignores keywords whose baseline was worse than 30', () => {
		expect(rankDrops([at('2026-09-01', 45), at('2026-10-01', null)])).toEqual([]);
	});

	it('uses the best position of the last 90 days as baseline', () => {
		const out = rankDrops([at('2026-08-01', 4), at('2026-09-01', 9), at('2026-10-01', 9)]);
		expect(out[0]).toMatchObject({ from: 4, to: 9 });
	});

	it('ignores a baseline older than 90 days', () => {
		expect(rankDrops([at('2026-05-01', 3), at('2026-10-01', 20)])).toEqual([]);
	});
});

describe('reportViews: legacy weekly batch', () => {
	it('adapts a batch with weeklyRun and no report into one legacy view', () => {
		const v = reportViews([
			batch({
				run: { status: 'partial', weeklyRun: true },
				rank: [{ keyword: 'k', position: 8, rankingUrl: null, asOf: '2026-10-01' }],
			}),
		]);
		expect(v).toHaveLength(1);
		expect(v[0].kind).toBe('legacy-weekly');
		expect(v[0].complete).toBe(false);
	});

	it('gives no view to a batch with neither a report nor a weekly run', () => {
		expect(reportViews([batch()])).toEqual([]);
	});
});
