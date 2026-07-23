import { describe, it, expect } from 'vitest';
import {
	packages,
	getPackageBySlug,
	CURRENCY,
	CURRENCY_SYMBOL,
	VAT_RATE,
	formatPrice,
	getPriceRange,
	formatPriceRange,
	getSchemaPriceRange,
	getPackageLabels,
	getHomepageShowcasePackages,
	HOMEPAGE_SHOWCASE_SLUGS
} from './packages';

/**
 * Contract tests for the pricing Single Source of Truth (AGENTS.md §7).
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

	describe('formatPrice', () => {
		it('puts the symbol before the amount in English', () => {
			expect(formatPrice(290, 'en')).toBe('€290');
		});

		it('puts the symbol after the amount in Spanish', () => {
			expect(formatPrice(290, 'es')).toBe('290 €');
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
			expect(formatPriceRange('es')).toBe(`${min} € - ${max} €`);
		});

		it('builds the schema.org priceRange from the real catalog bounds', () => {
			const { min, max } = getPriceRange();
			expect(getSchemaPriceRange()).toBe(`${min}€ - ${max}€`);
		});
	});

	describe('getPackageLabels', () => {
		it('emits one label per package, localized', () => {
			const labels = getPackageLabels('es');
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
