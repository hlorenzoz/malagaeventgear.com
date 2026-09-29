/**
 * Unit tests for the keywords.json Zod schema (sources-per-source redesign, 2026-09-29): a
 * keyword's `sources` is a record keyed by source name, each with its own `firstSeen`/`lastSeen`
 * (and `via`/`stats` where that source has them). No metric value lives outside `sources`.
 */
import { describe, it, expect } from 'vitest';
import {
	KeywordsFileSchema,
	KeywordEntrySchema,
	FaqEntrySchema,
	AiPromptEntrySchema,
	GoogleAdsStatsSchema,
	UbersuggestStatsSchema
} from './schema';

function baseKeyword(overrides: Partial<Record<string, unknown>> = {}) {
	return {
		id: 'audio-visual-rental',
		keyword: 'audio visual rental',
		locale: 'en',
		cluster: 'audio visual rental',
		topic: null,
		intent: null,
		url: '/blog/audio-visual-rental/',
		status: 'published',
		reason: null,
		sources: { blog: { firstSeen: '2026-09-29', lastSeen: '2026-09-29' } },
		opportunity: null,
		opportunityReason: null,
		firstSeen: '2026-09-29',
		lastResearched: null,
		notes: '',
		...overrides
	};
}

function baseFile(overrides: Partial<Record<string, unknown>> = {}) {
	return {
		version: 1,
		updated: '2026-09-29',
		meta: { lastWeeklyRun: null, lastMonthlyRun: null },
		keywords: [],
		faqs: [],
		aiPrompts: [],
		...overrides
	};
}

describe('KeywordEntrySchema', () => {
	it('accepts a minimal valid published keyword', () => {
		expect(KeywordEntrySchema.safeParse(baseKeyword()).success).toBe(true);
	});

	it('rejects status=published without a url', () => {
		const result = KeywordEntrySchema.safeParse(baseKeyword({ status: 'published', url: null }));
		expect(result.success).toBe(false);
	});

	it('rejects status=rejected without a reason', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({ status: 'rejected', reason: null, url: null })
		);
		expect(result.success).toBe(false);
	});

	it('accepts status=rejected with a reason', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({ status: 'rejected', reason: 'no fit', url: null })
		);
		expect(result.success).toBe(true);
	});

	it('rejects an unknown status', () => {
		const result = KeywordEntrySchema.safeParse(baseKeyword({ status: 'bogus' }));
		expect(result.success).toBe(false);
	});

	it('accepts a full google-ads source with stats', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({
				sources: {
					'google-ads': {
						firstSeen: '2026-09-29',
						lastSeen: '2026-09-29',
						stats: {
							asOf: '2026-09-29',
							period: { from: '2025-09', to: '2026-08' },
							currency: 'EUR',
							avgMonthlySearches: 320,
							threeMonthChange: 0,
							yoyChange: -33,
							competition: 'Medium',
							competitionIndex: 41,
							topOfPageBidLow: 0.47,
							topOfPageBidHigh: 2.41,
							adImpressionShare: null,
							organicImpressionShare: null,
							organicAveragePosition: null,
							monthlySearches: { '2025-09': 480, '2026-08': 260 }
						}
					}
				}
			})
		);
		expect(result.success).toBe(true);
	});

	it('accepts a google-ads source that only listed the phrase (stats: null)', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({
				sources: {
					'google-ads': { firstSeen: '2026-09-29', lastSeen: '2026-09-29', stats: null }
				}
			})
		);
		expect(result.success).toBe(true);
	});

	it('accepts an ubersuggest source with via and stats', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({
				sources: {
					ubersuggest: {
						firstSeen: '2026-09-29',
						lastSeen: '2026-09-29',
						via: ['suggestions', 'domain', 'competitor:avhirespain.com'],
						stats: {
							asOf: '2026-09-29',
							volume: 90,
							difficulty: 12,
							cpc: 1.2,
							position: 14,
							rankingUrl: '/blog/audio-visual-rental/'
						}
					}
				}
			})
		);
		expect(result.success).toBe(true);
	});

	it('accepts a google-search-console source with stats', () => {
		const result = KeywordEntrySchema.safeParse(
			baseKeyword({
				sources: {
					'google-search-console': {
						firstSeen: '2026-09-23',
						lastSeen: '2026-09-23',
						stats: { asOf: '2026-09-23', impressions: 631, clicks: 9, ctr: 1.4, position: 9.5 }
					}
				}
			})
		);
		expect(result.success).toBe(true);
	});
});

describe('GoogleAdsStatsSchema', () => {
	it('accepts a legacy volume-only row (everything else null)', () => {
		const result = GoogleAdsStatsSchema.safeParse({
			asOf: '2025-09-01',
			period: null,
			currency: null,
			avgMonthlySearches: 50000,
			threeMonthChange: null,
			yoyChange: null,
			competition: null,
			competitionIndex: null,
			topOfPageBidLow: null,
			topOfPageBidHigh: null,
			adImpressionShare: null,
			organicImpressionShare: null,
			organicAveragePosition: null,
			monthlySearches: {}
		});
		expect(result.success).toBe(true);
	});
});

describe('UbersuggestStatsSchema', () => {
	it('accepts a minimal reading with only asOf', () => {
		expect(UbersuggestStatsSchema.safeParse({ asOf: '2026-09-29' }).success).toBe(true);
	});
});

describe('FaqEntrySchema', () => {
	function baseFaq(overrides: Partial<Record<string, unknown>> = {}) {
		return {
			id: 'faq-1',
			question: 'What is MEG?',
			keywordId: 'audio-visual-rental',
			cluster: 'audio visual rental',
			url: '/blog/audio-visual-rental/',
			status: 'answered',
			reason: null,
			source: 'post',
			firstSeen: '2026-09-29',
			...overrides
		};
	}

	it('accepts a minimal valid answered faq', () => {
		expect(FaqEntrySchema.safeParse(baseFaq()).success).toBe(true);
	});

	it('rejects status=rejected without a reason', () => {
		const result = FaqEntrySchema.safeParse(
			baseFaq({ status: 'rejected', reason: null, url: null })
		);
		expect(result.success).toBe(false);
	});
});

describe('AiPromptEntrySchema', () => {
	function basePrompt(overrides: Partial<Record<string, unknown>> = {}) {
		return {
			id: 'prompt-1',
			prompt: 'best audio visual rental in malaga',
			keywordId: 'audio-visual-rental',
			cluster: 'audio visual rental',
			url: null,
			status: 'idea',
			reason: null,
			source: 'ubersuggest-ai-prompt-ideas',
			visibility: null,
			firstSeen: '2026-09-29',
			...overrides
		};
	}

	it('accepts a minimal valid idea prompt', () => {
		expect(AiPromptEntrySchema.safeParse(basePrompt()).success).toBe(true);
	});

	it('rejects status=rejected without a reason', () => {
		const result = AiPromptEntrySchema.safeParse(basePrompt({ status: 'rejected', reason: null }));
		expect(result.success).toBe(false);
	});
});

describe('KeywordsFileSchema', () => {
	it('accepts an empty but well formed file', () => {
		expect(KeywordsFileSchema.safeParse(baseFile()).success).toBe(true);
	});

	it('rejects duplicate keyword ids', () => {
		const result = KeywordsFileSchema.safeParse(
			baseFile({ keywords: [baseKeyword(), baseKeyword()] })
		);
		expect(result.success).toBe(false);
	});

	it('rejects duplicate faq ids', () => {
		const faq = {
			id: 'faq-1',
			question: 'q',
			keywordId: 'audio-visual-rental',
			cluster: 'audio visual rental',
			url: null,
			status: 'idea',
			reason: null,
			source: 'post',
			firstSeen: '2026-09-29'
		};
		const result = KeywordsFileSchema.safeParse(baseFile({ faqs: [faq, faq] }));
		expect(result.success).toBe(false);
	});

	it('rejects duplicate aiPrompt ids', () => {
		const prompt = {
			id: 'p-1',
			prompt: 'x',
			keywordId: 'audio-visual-rental',
			cluster: 'audio visual rental',
			url: null,
			status: 'idea',
			reason: null,
			source: 'ubersuggest-ai-prompt-ideas',
			visibility: null,
			firstSeen: '2026-09-29'
		};
		const result = KeywordsFileSchema.safeParse(baseFile({ aiPrompts: [prompt, prompt] }));
		expect(result.success).toBe(false);
	});

	it('accepts a well formed non empty file', () => {
		const result = KeywordsFileSchema.safeParse(baseFile({ keywords: [baseKeyword()] }));
		expect(result.success).toBe(true);
	});
});
