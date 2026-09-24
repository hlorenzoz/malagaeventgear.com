import { DEFAULT_LOCALE, PREFIXED_LOCALES, type Locale } from './locales.ts';

export interface SplitPath {
	locale: Locale;
	/** The path without the locale prefix, always starting with `/`. */
	rest: string;
}

/**
 * Splits a pathname into its locale and the rest of the path.
 *
 * The locale is detected by the WHOLE first segment, never by a string prefix:
 * `/essential-items-for-wedding-rentals/` starts with `/es` and is English.
 */
export function splitLocale(pathname: string): SplitPath {
	const first = pathname.split('/')[1] ?? '';
	const locale = PREFIXED_LOCALES.find((l) => l === first);
	if (!locale) return { locale: DEFAULT_LOCALE, rest: pathname };
	const rest = pathname.slice(first.length + 1);
	return { locale, rest: rest === '' ? '/' : rest };
}

export function localeFromPath(pathname: string): Locale {
	return splitLocale(pathname).locale;
}

/** Joins a locale and an unprefixed path (`/about-us/`) into a site path (`/de/about-us/`). */
export function withLocale(locale: Locale, rest: string): string {
	return locale === DEFAULT_LOCALE ? rest : `/${locale}${rest}`;
}

/**
 * Percent encodes the non ASCII characters of a path (Chinese slugs), as Google recommends
 * for URLs. ASCII paths come back unchanged, and an already encoded path is not encoded twice.
 */
export function encodePath(path: string): string {
	return encodeURI(safeDecode(path));
}

export function safeDecode(path: string): string {
	try {
		return decodeURI(path);
	} catch {
		return path;
	}
}
