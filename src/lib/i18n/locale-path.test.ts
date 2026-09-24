import { describe, expect, it } from 'vitest';
import { encodePath, localeFromPath, splitLocale, withLocale } from './locale-path';
import { LOCALES, LOCALE_META, PREFIXED_LOCALES } from './locales';

describe('splitLocale', () => {
	it('treats the root and unprefixed paths as English', () => {
		expect(splitLocale('/')).toEqual({ locale: 'en', rest: '/' });
		expect(splitLocale('/about-us/')).toEqual({ locale: 'en', rest: '/about-us/' });
	});

	it('detects every prefixed locale by its whole first segment', () => {
		for (const locale of PREFIXED_LOCALES) {
			expect(splitLocale(`/${locale}/`)).toEqual({ locale, rest: '/' });
			expect(splitLocale(`/${locale}/x/y/`)).toEqual({ locale, rest: '/x/y/' });
		}
	});

	it('handles a locale root without the trailing slash', () => {
		expect(splitLocale('/de')).toEqual({ locale: 'de', rest: '/' });
	});

	it('does not mistake an English slug that starts with a locale code for that locale', () => {
		// _redirects:170 source. A startsWith('/es') check would classify it as Spanish.
		expect(localeFromPath('/essential-items-for-wedding-rentals/')).toBe('en');
		expect(localeFromPath('/blog/essential-items-for-wedding-rentals/')).toBe('en');
		expect(localeFromPath('/da-something/')).toBe('en');
		expect(localeFromPath('/zh/')).toBe('en');
		expect(localeFromPath('/pt/')).toBe('en');
	});

	it('is case sensitive: URL prefixes are lowercase only', () => {
		expect(localeFromPath('/DE/')).toBe('en');
	});
});

describe('withLocale', () => {
	it('leaves English paths unprefixed and prefixes the rest', () => {
		expect(withLocale('en', '/about-us/')).toBe('/about-us/');
		expect(withLocale('de', '/ueber-uns/')).toBe('/de/ueber-uns/');
		expect(withLocale('zh-hans', '/')).toBe('/zh-hans/');
	});
});

describe('encodePath', () => {
	it('percent encodes Chinese slugs and is idempotent', () => {
		const encoded = encodePath('/zh-hans/关于我们/');
		expect(encoded).toBe('/zh-hans/%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC/');
		expect(encodePath(encoded)).toBe(encoded);
	});

	it('leaves ASCII paths untouched', () => {
		expect(encodePath('/de/ueber-uns/')).toBe('/de/ueber-uns/');
	});
});

describe('LOCALE_META', () => {
	it('has an entry for every locale', () => {
		expect(Object.keys(LOCALE_META).sort()).toEqual([...LOCALES].sort());
	});

	it('uses hreflang values Google accepts: never a bare country code', () => {
		const valid = /^(x-default|[a-z]{2}(-(Hans|Hant))?(-[A-Z]{2})?)$/;
		for (const meta of Object.values(LOCALE_META)) {
			for (const value of meta.hreflang) expect(value).toMatch(valid);
		}
	});

	it('assigns every hreflang value to exactly one locale', () => {
		const all = Object.values(LOCALE_META).flatMap((m) => m.hreflang);
		expect(new Set(all).size).toBe(all.length);
	});

	it('marks English as x-default', () => {
		expect(LOCALE_META.en.hreflang).toContain('x-default');
	});
});
