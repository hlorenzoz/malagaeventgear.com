import { getCategories } from '$lib/data/blog';
import { siteConfig } from '$lib/data/site';
import { SITEMAP_HEADERS, urlsetXml, type SitemapUrl } from '$lib/utils/sitemap';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const urls: SitemapUrl[] = getCategories().map((cat) => ({
		loc: `${siteConfig.url}/blog/category/${cat.slug}/`,
		lastmod: cat.lastmod
	}));

	return new Response(urlsetXml(urls), { headers: SITEMAP_HEADERS });
};
