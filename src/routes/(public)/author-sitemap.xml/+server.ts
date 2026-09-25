import { getAuthors } from '$lib/data/blog';
import { siteConfig } from '$lib/data/site';
import { SITEMAP_HEADERS, urlsetXml, type SitemapUrl } from '$lib/utils/sitemap';
import type { RequestHandler } from './$types';

// Built with the site, like every page (see SITEMAP_HEADERS).
export const prerender = true;

export const GET: RequestHandler = async () => {
	const urls: SitemapUrl[] = getAuthors().map((author) => ({
		loc: `${siteConfig.url}/blog/author/${author.slug}/`,
		lastmod: author.lastmod
	}));

	return new Response(urlsetXml(urls), { headers: SITEMAP_HEADERS });
};
