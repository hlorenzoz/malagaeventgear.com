import { PAGE_LOCALES, getAvailability } from '../../src/lib/i18n/availability';
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import { encodePath, withLocale } from '../../src/lib/i18n/locale-path';
import { LOCALE_META, LOCALES, type Locale } from '../../src/lib/i18n/locales';
import { localizePath } from '../../src/lib/i18n/routing';

// Idiomas publicados, leidos de la misma fuente que el sitio (PAGE_LOCALES). Los tests de
// idioma recorren esta lista: mientras solo el ingles este publicado, se saltean solos.
export const PUBLISHED_LOCALES = PAGE_LOCALES.filter((l): l is Exclude<Locale, 'en'> => l !== 'en');
export const UNPUBLISHED_LOCALES = LOCALES.filter((l) => !PAGE_LOCALES.includes(l));
export { LOCALE_META, type Locale };

export async function contentMap(locale: Locale): Promise<LocaleContentMap> {
	return (await import(`../../src/lib/i18n/content-map/locales/${locale}.ts`)).default;
}

/** Site path (percent encoded) of an English route in a locale, or null when unpublished. */
export async function localized(locale: Locale, enPath: string): Promise<string | null> {
	if (locale === 'en') return enPath;
	const path = localizePath(enPath, await contentMap(locale), getAvailability(locale));
	return path === null ? null : encodePath(withLocale(locale, path));
}

/** `hreflang -> href` pairs of a page's <head>, read from raw HTML (no JavaScript). */
export function hreflangLinks(html: string): Map<string, string> {
	const links = new Map<string, string>();
	for (const [, attrs] of html.matchAll(/<link([^>]*rel="alternate"[^>]*)>/g)) {
		const lang = attrs.match(/hreflang="([^"]+)"/)?.[1];
		const href = attrs.match(/href="([^"]+)"/)?.[1];
		if (lang && href) links.set(lang, href);
	}
	return links;
}

export function canonicalOf(html: string): string | undefined {
	return html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
}

export function htmlLangOf(html: string): string | undefined {
	return html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
}
