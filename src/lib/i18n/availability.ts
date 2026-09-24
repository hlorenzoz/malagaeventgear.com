import type { Locale } from './locales';
import type { Availability } from './routing';

/**
 * Locales whose static pages and packages are published. Pages ship all at once per locale
 * (Fase 3), so this is a per locale switch, guarded by a test that every page has its copy.
 * Posts are published one by one and their availability comes from the translation files.
 */
export const PAGE_LOCALES: readonly Locale[] = ['en'];

const EMPTY: ReadonlySet<string> = new Set();

export function getAvailability(locale: Locale): Availability {
	return {
		pages: PAGE_LOCALES.includes(locale),
		posts: EMPTY,
		categories: EMPTY,
		authors: EMPTY
	};
}
