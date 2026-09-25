import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { getBlogForLocale } from '$lib/data/blog';
import type { Locale } from '$lib/i18n/locales';
import { loadContentMap } from '$lib/i18n/router';
import { localesWithSitemap } from '$lib/utils/locale-sitemaps';
import { SITEMAP_HEADERS, localeBlogSitemapUrls, urlsetXml } from '$lib/utils/sitemap';

/**
 * Category sitemap of one locale (`/category-sitemap-de.xml`, Fase 4), mirroring
 * page-sitemap-[locale].xml. A locale with no category published has no sitemap (404), and
 * sitemap_index.xml does not list it.
 */
export const prerender = true;

// Only the locales that publish this sitemap are built (and listed in sitemap_index.xml).
export const entries: EntryGenerator = async () => (await localesWithSitemap('category')).map((locale) => ({ locale }));

export const GET: RequestHandler = async ({ params }) => {
	const locale = params.locale as Locale;
	const [blog, map] = await Promise.all([getBlogForLocale(locale), loadContentMap(locale)]);
	const urls = localeBlogSitemapUrls('category', locale, blog, map);
	if (urls.length === 0) error(404, 'Not found');
	return new Response(urlsetXml(urls), { headers: SITEMAP_HEADERS });
};
