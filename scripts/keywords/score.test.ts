import { describe, it, expect } from 'vitest';
import { scoreOpportunity } from './score';
import type { Sources } from './schema';

function sources(overrides: Partial<Sources> = {}): Sources {
	return { ...overrides };
}

function fullGoogleAdsStats(overrides: Partial<NonNullable<Sources['google-ads']>['stats']> = {}) {
	return {
		asOf: '2025-09-01',
		period: null,
		currency: null,
		avgMonthlySearches: null,
		threeMonthChange: null,
		yoyChange: null,
		competition: null,
		competitionIndex: null,
		topOfPageBidLow: null,
		topOfPageBidHigh: null,
		adImpressionShare: null,
		organicImpressionShare: null,
		organicAveragePosition: null,
		monthlySearches: {},
		...overrides
	};
}

describe('scoreOpportunity', () => {
	it('returns null with no sources at all', () => {
		expect(scoreOpportunity(sources())).toEqual({ opportunity: null, opportunityReason: null });
	});

	it('is high for a GSC query in the 8-30 band with strong impressions', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 631, clicks: 9, ctr: 1.4, position: 9.5 }
				}
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/gsc/i);
	});

	it('is medium for a GSC query in the 8-30 band with modest impressions', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 40, clicks: 0, ctr: 0, position: 20 }
				}
			})
		);
		expect(result.opportunity).toBe('medium');
	});

	it('is low for a GSC query in the 8-30 band with very few impressions', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 5, clicks: 0, ctr: 0, position: 15 }
				}
			})
		);
		expect(result.opportunity).toBe('low');
	});

	it('is null for a GSC query already ranking in the top 7', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 500, clicks: 20, ctr: 4, position: 3 }
				}
			})
		);
		expect(result.opportunity).toBeNull();
	});

	it('is null for a GSC query ranking worse than 30', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 500, clicks: 0, ctr: 0, position: 45 }
				}
			})
		);
		expect(result.opportunity).toBeNull();
	});

	it('is high for high ubersuggest volume with low difficulty', () => {
		const result = scoreOpportunity(
			sources({
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', volume: 500, difficulty: 15 }
				}
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/volume/i);
	});

	it('is medium for moderate volume with moderate difficulty', () => {
		const result = scoreOpportunity(
			sources({
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', volume: 150, difficulty: 40 }
				}
			})
		);
		expect(result.opportunity).toBe('medium');
	});

	it('is low for low volume or high difficulty', () => {
		const result = scoreOpportunity(
			sources({
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', volume: 50, difficulty: 70 }
				}
			})
		);
		expect(result.opportunity).toBe('low');
	});

	it('falls back to google-ads avgMonthlySearches when ubersuggest has no volume', () => {
		const result = scoreOpportunity(
			sources({
				'google-ads': {
					firstSeen: '2025-09-01',
					lastSeen: '2025-09-01',
					stats: fullGoogleAdsStats({ avgMonthlySearches: 320 })
				}
			})
		);
		expect(result.opportunity).toBe('medium');
		expect(result.opportunityReason).toMatch(/volume 320/);
	});

	it('prefers ubersuggest volume over google-ads when both are present', () => {
		const result = scoreOpportunity(
			sources({
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', volume: 90 }
				},
				'google-ads': {
					firstSeen: '2025-09-01',
					lastSeen: '2025-09-01',
					stats: fullGoogleAdsStats({ avgMonthlySearches: 320 })
				}
			})
		);
		expect(result.opportunityReason).toMatch(/volume 90/);
	});

	it('never uses google-ads competition as a difficulty signal (a low volume-only reading says so explicitly)', () => {
		const result = scoreOpportunity(
			sources({
				'google-ads': {
					firstSeen: '2025-09-01',
					lastSeen: '2025-09-01',
					stats: fullGoogleAdsStats({ avgMonthlySearches: 50, competition: 'Medium' })
				}
			})
		);
		// A google-ads-only reading (whatever "Competition" says) never carries a difficulty
		// number: the schema has no place for google-ads to supply one.
		expect(result.opportunity).toBe('low');
		expect(result.opportunityReason).toMatch(/no difficulty data/);
	});

	it('prefers the GSC signal over the volume/difficulty signal when both are present', () => {
		const result = scoreOpportunity(
			sources({
				'google-search-console': {
					firstSeen: '2026-09-23',
					lastSeen: '2026-09-23',
					stats: { asOf: '2026-09-23', impressions: 631, clicks: 9, ctr: 1.4, position: 9.5 }
				},
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', volume: 50, difficulty: 70 }
				}
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/gsc/i);
	});

	it('never invents an opportunity from cpc alone', () => {
		const result = scoreOpportunity(
			sources({
				ubersuggest: {
					firstSeen: '2026-09-29',
					lastSeen: '2026-09-29',
					via: ['suggestions'],
					stats: { asOf: '2026-09-29', cpc: 1.2 }
				}
			})
		);
		expect(result.opportunity).toBeNull();
	});
});
