import { page } from '$app/state';
import enSource, { type Messages } from '$lib/i18n/messages/en';
import { renderTokens } from '$lib/data/packages';
import { DEFAULT_LOCALE, LOCALE_META, isLocale, type Locale } from '$lib/i18n/locales';
import { getAvailability } from '$lib/i18n/availability';
import type { LocaleContentMap } from '$lib/i18n/content-map/schema';
import { encodePath, withLocale } from '$lib/i18n/locale-path';
import { localizePath } from '$lib/i18n/routing';
import { siteConfig } from '$lib/data/site';

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

// English fallback for pages outside (public), with its catalog tokens rendered like a loaded dictionary.
const en = renderTokens(enSource, 'en');

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
	},
	/**
	 * True when this locale has blog posts to list. A page must never list English post titles
	 * in another language (Google: one language per page), so every post listing on a
	 * translated page hides while its locale has no translated posts (Fase 4).
	 */
	get postsPublished(): boolean {
		const locale = this.lang;
		return locale === DEFAULT_LOCALE || getAvailability(locale).posts.size > 0;
	},
	/** Absolute URL of an English route in the current locale (JSON-LD `url`, `@id`). */
	absolute(enPath: string): string {
		return `${siteConfig.url}${this.href(enPath)}`;
	},
	/**
	 * Glue a template puts between two runs of copy. Latin scripts separate words with a space,
	 * Chinese does not, so a hardcoded ' ' or ', ' in markup leaves a gap in a Chinese heading.
	 */
	get space(): string {
		return LOCALE_META[this.lang].script === 'latin' ? ' ' : '';
	},
	get comma(): string {
		return LOCALE_META[this.lang].script === 'latin' ? ', ' : '，';
	},
	get stop(): string {
		return LOCALE_META[this.lang].script === 'latin' ? '.' : '。';
	}
};
