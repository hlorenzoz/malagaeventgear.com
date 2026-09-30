/**
 * batch.schema.test.ts: Zod schema for the daily Ubersuggest batch file
 * (`.agents/context/keywords/ubersuggest/YYYY-MM-DD.json`, plan section "Alcance", scope point 1).
 * This is the ONLY shape the ubersuggest-analyst agent is allowed to write. `ingest-ubersuggest.ts`
 * validates every batch through this schema before merging it into keywords.json.
 */
import { describe, it, expect } from 'vitest';
import { KeywordBatchSchema } from './batch.schema';

function minimalBatch(overrides: Partial<Record<string, unknown>> = {}) {
	return {
		date: '2026-09-29',
		run: {
			status: 'ok',
			calls: [],
			skipped: []
		},
		keywords: [],
		faqs: [],
		aiPrompts: [],
		research: {},
		rank: [],
		discarded: [],
		...overrides
	};
}

describe('KeywordBatchSchema', () => {
	it('accepts a minimal well formed batch', () => {
		expect(KeywordBatchSchema.safeParse(minimalBatch()).success).toBe(true);
	});

	it('accepts a full batch with every optional field populated', () => {
		const batch = minimalBatch({
			run: {
				status: 'partial',
				reason: 'ran out of quota',
				quotaBefore: { keywords: 20, brand_operations: 98 },
				quotaAfter: { keywords: 0, brand_operations: 90 },
				calls: [{ tool: 'keyword_suggestions', args: 'seed=audio visual rental' }],
				skipped: [{ step: 'serp_analysis', reason: 'quota exhausted' }],
				weeklyRun: true,
				monthlyRun: false
			},
			keywords: [
				{
					keyword: 'av equipment hire malaga',
					cluster: 'audio visual rental',
					intent: 'commercial',
					metrics: {
						volume: { value: 90, source: 'ubersuggest', asOf: '2026-09-29' },
						difficulty: {
							value: 12,
							source: 'ubersuggest',
							asOf: '2026-09-29'
						}
					},
					source: 'ubersuggest-keyword-suggestions'
				}
			],
			faqs: [
				{
					question: 'what is av equipment hire?',
					keyword: 'av equipment hire malaga',
					source: 'google-autocomplete'
				}
			],
			aiPrompts: [
				{
					prompt: 'best av rental in malaga',
					keyword: 'av equipment hire malaga',
					source: 'ubersuggest-ai-prompt-ideas',
					visibility: {
						mentioned: true,
						position: 2,
						brands: ['MEG'],
						provider: 'openai',
						asOf: '2026-09-29'
					}
				}
			],
			research: {
				'av equipment hire malaga': {
					serp: {
						localPack: true,
						aiOverview: false,
						top: ['https://example.com'],
						asOf: '2026-09-29'
					},
					contentIdeas: [{ url: 'https://example.com/guide', estVisits: 50 }],
					titleIdeas: ['The Complete Guide to AV Equipment Hire in Malaga']
				}
			},
			rank: [
				{
					keyword: 'av equipment hire malaga',
					position: 14,
					rankingUrl: '/blog/audio-visual-rental/',
					asOf: '2026-09-29'
				}
			],
			discarded: [{ text: 'av equipment hire dubai', reason: 'out-of-market place' }]
		});
		const result = KeywordBatchSchema.safeParse(batch);
		expect(result.success).toBe(true);
	});

	it('rejects an invalid run.status', () => {
		const batch = minimalBatch({
			run: { status: 'bogus', calls: [], skipped: [] }
		});
		expect(KeywordBatchSchema.safeParse(batch).success).toBe(false);
	});

	it('rejects a date that is not YYYY-MM-DD', () => {
		expect(KeywordBatchSchema.safeParse(minimalBatch({ date: '09/29/2026' })).success).toBe(false);
	});

	it('rejects a discarded entry missing its reason', () => {
		const batch = minimalBatch({ discarded: [{ text: 'x' }] });
		expect(KeywordBatchSchema.safeParse(batch).success).toBe(false);
	});
});

describe('KeywordBatchSchema: daily report section', () => {
	const base = { date: '2026-10-01', run: { status: 'ok' as const } };

	it('accepts a batch without a report (the batches committed before the rotation)', () => {
		expect(KeywordBatchSchema.parse(base).report).toBeUndefined();
	});

	it('accepts a typed report with seo findings and generic rows', () => {
		const parsed = KeywordBatchSchema.parse({
			...base,
			report: {
				kind: 'seo-opportunities',
				status: 'ok',
				summary: ['3 keyword opportunities'],
				metrics: { total: 3 },
				seoCounts: { SITE_AUDIT: 2 },
				seo: [{ type: 'SITE_AUDIT', subtype: 'long_titles', count: 4, impact: 'high', effort: 'low' }],
				rows: [{ label: 'x', values: { position: 4 } }]
			}
		});
		expect(parsed.report?.seo[0].subtype).toBe('long_titles');
	});

	it('defaults the report lists to empty', () => {
		const parsed = KeywordBatchSchema.parse({ ...base, report: { kind: 'backlinks', status: 'partial' } });
		expect(parsed.report).toMatchObject({ summary: [], seo: [], rows: [], metrics: {}, seoCounts: {} });
	});

	it('rejects an unknown report kind or status', () => {
		expect(() => KeywordBatchSchema.parse({ ...base, report: { kind: 'nope', status: 'ok' } })).toThrow();
		expect(() => KeywordBatchSchema.parse({ ...base, report: { kind: 'backlinks', status: 'meh' } })).toThrow();
	});

	it('accepts evaluated on a visibility, previousPosition on a rank and outcome on a call', () => {
		const parsed = KeywordBatchSchema.parse({
			...base,
			aiPrompts: [
				{
					prompt: 'p',
					source: 'ubersuggest-brand',
					visibility: { mentioned: false, evaluated: true, asOf: '2026-10-01' }
				}
			],
			rank: [{ keyword: 'k', position: 5, previousPosition: 3, rankingUrl: null, asOf: '2026-10-01' }],
			run: { status: 'ok', calls: [{ tool: 'domain_keywords', outcome: 'empty' }] }
		});
		expect(parsed.aiPrompts[0].visibility?.evaluated).toBe(true);
		expect(parsed.rank[0].previousPosition).toBe(3);
		expect(parsed.run.calls[0].outcome).toBe('empty');
	});
});

describe('the committed batches', () => {
	const files = import.meta.glob('/.agents/context/keywords/ubersuggest/*.json', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	it('still validate with the extended schema', () => {
		const entries = Object.entries(files);
		expect(entries.length).toBeGreaterThan(0);
		for (const [path, raw] of entries) {
			expect(() => KeywordBatchSchema.parse(JSON.parse(raw)), path).not.toThrow();
		}
	});
});
