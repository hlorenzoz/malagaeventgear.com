import { page } from '$app/state';
import en, { type Messages } from '$lib/i18n/messages/en';
import { DEFAULT_LOCALE, isLocale, type Locale } from '$lib/i18n/locales';
import { getAvailability } from '$lib/i18n/availability';
import type { LocaleContentMap } from '$lib/i18n/content-map/schema';
import { encodePath, withLocale } from '$lib/i18n/locale-path';
import { localizePath } from '$lib/i18n/routing';

/**
 * UI dictionary access. The locale comes from the URL (CLAUDE.md, "Internacionalización"):
 * `(public)/+layout.server.ts` derives it and `(public)/+layout.ts` loads that locale's
 * dictionary into `page.data`. Reading from `page` (request scoped on the server) instead of a
 * module level variable keeps concurrent requests of different locales from leaking into each
 * other. Outside the public layout (root error page) it falls back to English.
 *
 * `i18n.t` is a GETTER: `i18n.t.nav.blog`, never `i18n.t('nav.blog')`.
 */

/** Kept as an alias so existing `Language` imports keep compiling. */
export type Language = Locale;

const loaders = import.meta.glob<Messages>('./i18n/messages/*.ts', { import: 'default' });

/** Loads a locale's dictionary as its own chunk, so a page only downloads its own language. */
export async function loadMessages(locale: Locale): Promise<Messages> {
	if (locale === DEFAULT_LOCALE) return en;
	const loader = loaders[`./i18n/messages/${locale}.ts`];
	return loader ? loader() : en;
}

export const i18n = {
	get lang(): Locale {
		const locale = page.data?.locale;
		return typeof locale === 'string' && isLocale(locale) ? locale : DEFAULT_LOCALE;
	},
	get t(): Messages {
		return (page.data?.messages as Messages | undefined) ?? en;
	},
	/**
	 * Internal link for an ENGLISH route path (`/packages/eco/`, `/contact/#form`) in the current
	 * locale. When that content is not published in this locale it returns the English path, so
	 * a link never points to a URL that does not exist.
	 */
	href(enPath: string): string {
		const locale = this.lang;
		const map = page.data?.contentMap as LocaleContentMap | null | undefined;
		if (locale === DEFAULT_LOCALE || !map) return enPath;
		const cut = enPath.search(/[?#]/);
		const path = cut === -1 ? enPath : enPath.slice(0, cut);
		const suffix = cut === -1 ? '' : enPath.slice(cut);
		const localized = localizePath(path, map, getAvailability(locale));
		return localized === null ? enPath : encodePath(withLocale(locale, localized)) + suffix;
	}
};
