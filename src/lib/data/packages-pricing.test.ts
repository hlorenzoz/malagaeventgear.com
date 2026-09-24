import { describe, it, expect } from 'vitest';
import {
	packages,
	getPackageBySlug,
	CURRENCY,
	CURRENCY_SYMBOL,
	VAT_RATE,
	formatPrice,
	withPrices,
	renderTokens,
	PRICE_POINTS,
	getPriceRange,
	formatPriceRange,
	getSchemaPriceRange,
	getPackageLabels,
	getHomepageShowcasePackages,
	HOMEPAGE_SHOWCASE_SLUGS
} from './packages';

/**
 * Contract tests for the pricing Single Source of Truth (CLAUDE.md §7).
 *
 * These deliberately assert BEHAVIOUR (min == cheapest package, es puts the symbol
 * last) rather than literal prices, so a legitimate price change does not break
 * them — only a broken derivation does.
 */
describe('pricing single source of truth', () => {
	describe('constants', () => {
		it('denominates every package in the declared currency', () => {
			expect(CURRENCY).toBe('EUR');
			expect(CURRENCY_SYMBOL).toBe('€');
		});

		it('declares Spanish VAT as a fraction, not a percentage', () => {
			expect(VAT_RATE).toBeGreaterThan(0);
			expect(VAT_RATE).toBeLessThan(1);
			expect(Math.round(VAT_RATE * 100)).toBe(21);
		});
	});

	describe('withPrices', () => {
		it('renders each {price:key} token from PRICE_POINTS with formatPrice in the page language', () => {
			expect(withPrices('Projector (+{price:projectorScreen})', 'en')).toBe(`Projector (+${formatPrice(PRICE_POINTS.projectorScreen, 'en')})`);
			expect(withPrices('Projector (+{price:projectorScreen})', 'de')).toBe(`Projector (+${PRICE_POINTS.projectorScreen} €)`);
			expect(withPrices('{price:budgetLow} à {price:budgetHigh}', 'fr')).toBe(`${PRICE_POINTS.budgetLow} € à ${PRICE_POINTS.budgetHigh} €`);
		});

		it('follows PRICE_POINTS, so a price changes in one place for every language', () => {
			for (const [key, amount] of Object.entries(PRICE_POINTS)) {
				expect(withPrices(`{price:${key}}`, 'de')).toBe(formatPrice(amount, 'de'));
			}
		});

		it('fails loudly on a key that does not exist, instead of publishing the token', () => {
			expect(() => withPrices('{price:unicorn}', 'en')).toThrow(/Unknown price token/);
			expect(() => withPrices('{price:50}', 'en')).toThrow(/Unknown price token/);
		});

		it('leaves text without tokens untouched', () => {
			expect(withPrices('No prices here.', 'de')).toBe('No prices here.');
		});
	});

	describe('the {vat} token', () => {
		it('renders VAT_RATE as a percentage in the page language', () => {
			expect(withPrices('(+{vat} VAT)', 'en')).toBe(`(+${Math.round(VAT_RATE * 100)}% VAT)`);
			expect(withPrices('(+{vat} TVA)', 'fr')).toBe(`(+${Math.round(VAT_RATE * 100)} % TVA)`);
			expect(withPrices('（另加{vat}增值税）', 'zh-hans')).toBe(`（另加${Math.round(VAT_RATE * 100)}%增值税）`);
		});
	});

	describe('renderTokens', () => {
		it('renders every string of a copy object, arrays and nesting included', () => {
			const copy = { a: 'From {price:technicianDay}', b: ['(+{vat})', 'plain'], c: { d: '{price:lectern}' }, n: 3 };
			expect(renderTokens(copy, 'en')).toEqual({
				a: `From ${formatPrice(PRICE_POINTS.technicianDay, 'en')}`,
				b: [`(+${Math.round(VAT_RATE * 100)}%)`, 'plain'],
				c: { d: formatPrice(PRICE_POINTS.lectern, 'en') },
				n: 3
			});
		});
	});

	describe('formatPrice', () => {
		it('puts the symbol before the amount in English', () => {
			expect(formatPrice(290, 'en')).toBe('€290');
		});

		it('follows Intl for other locales, with plain spaces only (CLAUDE.md §12)', () => {
			expect(formatPrice(290, 'de')).toBe('290 €');
			expect(formatPrice(290, 'fr')).toBe('290 €');
			expect(formatPrice(290, 'zh-hans')).toBe('€290');
			expect(formatPrice(290, 'de')).not.toMatch(/[\u00a0\u202f]/);
		});

		it('defaults to the English convention', () => {
			expect(formatPrice(650)).toBe(formatPrice(650, 'en'));
		});
	});

	describe('getPriceRange', () => {
		it('returns the cheapest and most expensive package prices', () => {
			const prices = packages.map((p) => p.price);
			const { min, max } = getPriceRange();

			expect(min).toBe(Math.min(...prices));
			expect(max).toBe(Math.max(...prices));
		});

		it('bounds every package price within the range', () => {
			const { min, max } = getPriceRange();
			for (const pkg of packages) {
				expect(pkg.price).toBeGreaterThanOrEqual(min);
				expect(pkg.price).toBeLessThanOrEqual(max);
			}
		});
	});

	describe('range formatting', () => {
		it('builds the human range from the real catalog bounds', () => {
			const { min, max } = getPriceRange();
			expect(formatPriceRange('en')).toBe(`€${min} - €${max}`);
			expect(formatPriceRange('de')).toBe(`${min} € - ${max} €`);
		});

		it('builds the schema.org priceRange from the real catalog bounds', () => {
			const { min, max } = getPriceRange();
			expect(getSchemaPriceRange()).toBe(`${min}€ - ${max}€`);
		});
	});

	describe('getPackageLabels', () => {
		it('emits one label per package, localized', () => {
			const labels = getPackageLabels('de');
			expect(labels).toHaveLength(packages.length);

			for (const { pkg, label } of labels) {
				expect(label).toBe(`${pkg.name} (${pkg.price} €)`);
			}
		});
	});

	describe('homepage showcase', () => {
		it('resolves every showcase slug to a real package', () => {
			const showcase = getHomepageShowcasePackages();
			expect(showcase).toHaveLength(HOMEPAGE_SHOWCASE_SLUGS.length);

			for (const pkg of showcase) {
				expect(getPackageBySlug(pkg.slug)).toBeDefined();
			}
		});
	});

	describe('catalog integrity', () => {
		it('gives every package a positive price', () => {
			for (const pkg of packages) {
				expect(pkg.price).toBeGreaterThan(0);
			}
		});

		it('gives every package a nav icon so listings never render blank', () => {
			for (const pkg of packages) {
				expect(pkg.navIcon).toBeTruthy();
			}
		});

		it('keeps route consistent with slug', () => {
			for (const pkg of packages) {
				expect(pkg.route).toBe(`/packages/${pkg.slug}/`);
			}
		});
	});
});
