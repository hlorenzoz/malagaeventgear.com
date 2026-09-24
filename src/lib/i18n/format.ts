import { LOCALE_META, type Locale } from './locales';

/**
 * A number written the way the page language writes it (`1,000` in English, `1.000` in German).
 * Intl groups some languages with a no break space, and CLAUDE.md §12 allows plain spaces only.
 * Prices have their own helper, `formatPrice` in packages.ts.
 */
export function formatNumber(value: number, locale: Locale): string {
	return new Intl.NumberFormat(LOCALE_META[locale].intl).format(value).replace(/[  ]/g, ' ');
}
