import { describe, expect, it } from 'vitest';
import { postCtaCopy, railPrice } from './post-cta-copy';
import { getPackageBySlug, renderTokens, formatPrice, formatVat } from '$lib/data/packages';
import en from '$lib/i18n/messages/en';
import de from '$lib/i18n/messages/de';
import zhHans from '$lib/i18n/messages/zh-hans';

/**
 * The package CTA of a post (PostCTA, also inside the body through InlineCTA) and the package
 * rail read their copy from the page language's dictionary: package names untranslated, prices
 * through formatPrice and the VAT through {vat} (never literals, CLAUDE.md §7).
 */
const wedding = getPackageBySlug('wedding')!;
const eco = getPackageBySlug('eco')!;

describe('postCtaCopy', () => {
	it('English reads as before', () => {
		const copy = postCtaCopy(wedding, renderTokens(en, 'en'), 'en');
		expect(copy.headline).toBe('Planning a wedding in Malaga?');
		expect(copy.subline).toBe('Get the Wedding Pack: professional sound and romantic lighting for your special day.');
		expect(copy.price).toEqual({ before: 'From ', amount: formatPrice(wedding.price, 'en'), after: '' });
		expect(copy.vat).toBe(`(+${formatVat('en')} VAT)`);
		expect(copy.view).toBe('View the Wedding Pack');
		expect(copy.quote).toBe('Get a free quote');
		expect(copy.aria).toBe('Event package suggestion');
	});

	it('German: own copy, untranslated package name, German price and VAT', () => {
		const copy = postCtaCopy(wedding, renderTokens(de, 'de'), 'de');
		expect(copy.headline).toBe('Sie planen eine Hochzeit in Malaga?');
		expect(copy.subline).toContain('Wedding Pack');
		expect(copy.price).toEqual({ before: 'Ab ', amount: formatPrice(wedding.price, 'de'), after: '' });
		expect(copy.vat).toBe(`(zzgl. ${formatVat('de')} MwSt.)`);
		expect(copy.view).toBe('Zum Wedding Pack');
	});

	it('Chinese puts the price first, and fills the guest limit from the catalog', () => {
		const copy = postCtaCopy(eco, renderTokens(zhHans, 'zh-hans'), 'zh-hans');
		expect(copy.price).toEqual({ before: '', amount: formatPrice(eco.price, 'zh-hans'), after: '起' });
		expect(copy.subline).toContain(`${eco.maxGuests}位`);
		expect(copy.subline).toContain('Eco Pack');
	});

	it('an unknown package falls back to the eco copy', () => {
		const copy = postCtaCopy({ ...eco, slug: 'unknown' }, renderTokens(en, 'en'), 'en');
		expect(copy.headline).toBe('Planning a private event?');
	});

	it('never leaves a placeholder behind in any language', () => {
		for (const [locale, messages] of [['en', en], ['de', de], ['zh-hans', zhHans]] as const) {
			for (const slug of ['eco', 'wedding', 'product-presentation', 'basic-mice', 'mice']) {
				const copy = postCtaCopy(getPackageBySlug(slug)!, renderTokens(messages, locale), locale);
				expect(JSON.stringify(copy), `${locale} ${slug}`).not.toMatch(/\{(name|price|guests|vat)\}/);
			}
		}
	});
});

describe('railPrice', () => {
	it('formats the rail price in the page language', () => {
		expect(railPrice(eco, renderTokens(en, 'en'), 'en')).toBe(`from ${formatPrice(eco.price, 'en')}`);
		expect(railPrice(eco, renderTokens(de, 'de'), 'de')).toBe(`ab ${formatPrice(eco.price, 'de')}`);
		expect(railPrice(eco, renderTokens(zhHans, 'zh-hans'), 'zh-hans')).toBe(`${formatPrice(eco.price, 'zh-hans')}起`);
	});
});
