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
