import { describe, expect, it } from 'vitest';
import { formatNumber } from './format';

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
