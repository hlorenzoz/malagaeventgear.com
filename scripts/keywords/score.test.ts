import { describe, it, expect } from 'vitest';
import { scoreOpportunity } from './score';
import type { Metrics } from './schema';

function metrics(overrides: Partial<Metrics> = {}): Metrics {
	return {
		volume: null,
		difficulty: null,
		cpc: null,
		gsc: null,
		ubersuggest: null,
		...overrides
	};
}

describe('scoreOpportunity', () => {
	it('returns null with no metrics at all', () => {
		expect(scoreOpportunity(metrics())).toEqual({
			opportunity: null,
			opportunityReason: null
		});
	});

	it('is high for a GSC query in the 8-30 band with strong impressions', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 631, clicks: 9, position: 9.5, asOf: '2026-09-23' }
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/gsc/i);
	});

	it('is medium for a GSC query in the 8-30 band with modest impressions', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 40, clicks: 0, position: 20, asOf: '2026-09-23' }
			})
		);
		expect(result.opportunity).toBe('medium');
	});

	it('is low for a GSC query in the 8-30 band with very few impressions', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 5, clicks: 0, position: 15, asOf: '2026-09-23' }
			})
		);
		expect(result.opportunity).toBe('low');
	});

	it('is null for a GSC query already ranking in the top 7 (nothing to gain from this signal)', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 500, clicks: 20, position: 3, asOf: '2026-09-23' }
			})
		);
		expect(result.opportunity).toBeNull();
	});

	it('is null for a GSC query ranking worse than 30 (too deep to be an actionable gap)', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 500, clicks: 0, position: 45, asOf: '2026-09-23' }
			})
		);
		expect(result.opportunity).toBeNull();
	});

	it('is high for high volume with low difficulty', () => {
		const result = scoreOpportunity(
			metrics({
				volume: { value: 500, source: 'ubersuggest', asOf: '2026-09-29' },
				difficulty: { value: 15, source: 'ubersuggest', asOf: '2026-09-29' }
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/volumen|volume/i);
	});

	it('is medium for moderate volume with moderate difficulty', () => {
		const result = scoreOpportunity(
			metrics({
				volume: { value: 150, source: 'ubersuggest', asOf: '2026-09-29' },
				difficulty: { value: 40, source: 'ubersuggest', asOf: '2026-09-29' }
			})
		);
		expect(result.opportunity).toBe('medium');
	});

	it('is low for low volume or high difficulty', () => {
		const result = scoreOpportunity(
			metrics({
				volume: { value: 50, source: 'ubersuggest', asOf: '2026-09-29' },
				difficulty: { value: 70, source: 'ubersuggest', asOf: '2026-09-29' }
			})
		);
		expect(result.opportunity).toBe('low');
	});

	it('prefers the GSC signal over the volume/difficulty signal when both are present', () => {
		const result = scoreOpportunity(
			metrics({
				gsc: { impressions: 631, clicks: 9, position: 9.5, asOf: '2026-09-23' },
				volume: { value: 50, source: 'ubersuggest', asOf: '2026-09-29' },
				difficulty: { value: 70, source: 'ubersuggest', asOf: '2026-09-29' }
			})
		);
		expect(result.opportunity).toBe('high');
		expect(result.opportunityReason).toMatch(/gsc/i);
	});

	it('never invents an opportunity from cpc alone', () => {
		const result = scoreOpportunity(
			metrics({
				cpc: { value: 1.2, source: 'google-ads', asOf: '2025-09-01' }
			})
		);
		expect(result.opportunity).toBeNull();
	});
});
