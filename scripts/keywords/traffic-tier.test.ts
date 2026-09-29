import { describe, it, expect } from 'vitest';
import {
	TIER_CHART,
	avalancheFit,
	computeTier,
	parseDailyChart,
	summarizeTier,
	type Tier
} from './traffic-tier';

describe('TIER_CHART', () => {
	it('has the 18 levels of the POP chart, contiguous', () => {
		expect(TIER_CHART).toHaveLength(18);
		expect(TIER_CHART[0]).toEqual({ level: 0, min: 0, max: 10 });
		expect(TIER_CHART[17]).toEqual({ level: 25000, min: 25000, max: 50000 });
		for (let i = 1; i < TIER_CHART.length; i++) {
			expect(TIER_CHART[i].min).toBe(TIER_CHART[i - 1].max);
			expect(TIER_CHART[i].level).toBe(TIER_CHART[i].min);
		}
	});
});

describe('computeTier', () => {
	it('averages the highest and the lowest day, not the mean of all days', () => {
		const t = computeTier([8, 120, 291, 150]);
		expect(t).toMatchObject({ low: 8, high: 291, value: 149.5, level: 100 });
		expect(t.range).toEqual({ min: 100, max: 200 });
	});

	it('puts a value equal to an upper bound in the NEXT level', () => {
		expect(computeTier([100, 100]).level).toBe(100);
		expect(computeTier([50, 50]).level).toBe(50);
		expect(computeTier([9, 9]).level).toBe(0);
		expect(computeTier([10, 10]).level).toBe(10);
	});

	it('keeps values above 50000 at the top level', () => {
		expect(computeTier([90000, 100000]).level).toBe(25000);
	});

	it('rejects an empty chart instead of guessing', () => {
		expect(() => computeTier([])).toThrow();
	});
});

describe('avalancheFit', () => {
	const tier: Tier = computeTier([8, 291]);
	it('is unknown without a volume', () => {
		expect(avalancheFit(null, tier)).toBe('unknown');
	});
	it('is in-tier inside [min, max)', () => {
		expect(avalancheFit(100, tier)).toBe('in-tier');
		expect(avalancheFit(199, tier)).toBe('in-tier');
	});
	it('is below under min and above from max on', () => {
		expect(avalancheFit(90, tier)).toBe('below');
		expect(avalancheFit(0, tier)).toBe('below');
		expect(avalancheFit(200, tier)).toBe('above');
		expect(avalancheFit(5000, tier)).toBe('above');
	});
});

describe('parseDailyChart', () => {
	it('reads impressions and the period from the daily csv', () => {
		const csv =
			'Fecha,Clics,Impresiones,CTR,Posición\n2026-06-22,0,121,0%,32.9\n2026-06-23,2,145,1.38%,37\n';
		expect(parseDailyChart(csv)).toEqual({
			impressions: [121, 145],
			from: '2026-06-22',
			to: '2026-06-23'
		});
	});
	it('throws when there are no rows', () => {
		expect(() => parseDailyChart('Fecha,Clics,Impresiones,CTR,Posición\n')).toThrow();
	});
});

describe('summarizeTier', () => {
	it('builds the CLI shape', () => {
		const out = summarizeTier('2026-09-23', { impressions: [8, 291], from: 'a', to: 'b' });
		expect(out).toEqual({
			export: '2026-09-23',
			period: { from: 'a', to: 'b' },
			days: 2,
			low: 8,
			high: 291,
			value: 149.5,
			level: 100,
			range: { min: 100, max: 200 },
			metric: 'impressions'
		});
	});
});
