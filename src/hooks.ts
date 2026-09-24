import type { Reroute } from '@sveltejs/kit';
import { safeDecode, splitLocale } from '$lib/i18n/locale-path';
import { resolveLocalizedPath } from '$lib/i18n/router';

/**
 * Maps a localized URL (`/de/ueber-uns/`) to the English route that renders it (`/about-us/`).
 * The page still sees the ORIGINAL url, so it knows its locale. A path that is not published
 * in that locale is returned unchanged: no route starts with a locale prefix, so it 404s.
 */
export const reroute: Reroute = async ({ url }) => {
	const { locale, rest } = splitLocale(url.pathname);
	if (locale === 'en') return;
	return (await resolveLocalizedPath(locale, safeDecode(rest))) ?? url.pathname;
};
