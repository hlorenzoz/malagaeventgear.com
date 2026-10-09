import { describe, expect, it } from 'vitest';
import { formatNumber, formatRating } from './format';

describe('formatNumber', () => {
	it('groups thousands the way each language writes them', () => {
		expect(formatNumber(1000, 'en')).toBe('1,000');
		expect(formatNumber(1000, 'de')).toBe('1.000');
		expect(formatNumber(1000, 'zh-hans')).toBe('1,000');
	});

	it('never emits a no break space (CLAUDE.md rule 12)', () => {
		// French and the Nordic languages group with a narrow no break space in Intl.
		for (const locale of ['fr', 'sv', 'nb'] as const) {
			expect(formatNumber(1000, locale)).toBe('1 000');
		}
	});
});

describe('formatRating', () => {
	it('keeps one decimal, written the way the page language writes it', () => {
		expect(formatRating(5, 'en')).toBe('5.0');
		expect(formatRating(4.8, 'en')).toBe('4.8');
		expect(formatRating(5, 'de')).toBe('5,0');
		expect(formatRating(4.86, 'fr')).toBe('4,9');
		expect(formatRating(5, 'zh-hans')).toBe('5.0');
	});
});
