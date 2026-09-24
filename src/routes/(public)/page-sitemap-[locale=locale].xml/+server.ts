import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { packages } from '$lib/data/packages';
import { siteConfig } from '$lib/data/site';
import { getAvailability } from '$lib/i18n/availability';
import { encodePath } from '$lib/i18n/locale-path';
import type { Locale } from '$lib/i18n/locales';
import { localizeTo } from '$lib/i18n/router';
import {
	STATIC_SITEMAP_PAGES,
	SITEMAP_HEADERS,
	getStaticPageFreshness,
	staticPageEnPath,
	urlsetXml,
	type SitemapUrl
} from '$lib/utils/sitemap';

/**
 * Pages and packages of one locale (`/page-sitemap-de.xml`). Only published URLs, each with
 * the date of ITS translation (CLAUDE.md §11). No hreflang here: it lives in the <head> only,
 * one method as Google recommends. A locale without published pages has no sitemap (404).
 */
export const GET: RequestHandler = async ({ params }) => {
	const locale = params.locale as Locale;
	if (!getAvailability(locale).pages) error(404, 'Not found');

	const freshness = getStaticPageFreshness(locale);
	const urls: SitemapUrl[] = [];

	for (const page of STATIC_SITEMAP_PAGES) {
		const path = await localizeTo(locale, staticPageEnPath(page));
		if (path) urls.push({ loc: `${siteConfig.url}${encodePath(path)}`, lastmod: freshness.get(page) });
	}
	for (const pkg of packages) {
		const path = await localizeTo(locale, pkg.route);
		if (!path) continue;
		urls.push({
			loc: `${siteConfig.url}${encodePath(path)}`,
			lastmod: pkg.localeUpdated?.[locale],
			image: pkg.image ? `${siteConfig.url}${pkg.image}` : undefined
		});
	}

	if (urls.length === 0) error(404, 'Not found');
	return new Response(urlsetXml(urls), { headers: SITEMAP_HEADERS });
};
