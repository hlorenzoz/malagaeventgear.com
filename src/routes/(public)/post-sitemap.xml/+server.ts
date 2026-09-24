import { getAllPosts } from '$lib/data/blog';
import { siteConfig } from '$lib/data/site';
import { SITEMAP_HEADERS, urlsetXml, type SitemapUrl } from '$lib/utils/sitemap';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const urls: SitemapUrl[] = getAllPosts().map((post) => ({
		loc: `${siteConfig.url}${post.url}`,
		lastmod: post.updatedDate ?? post.publishDate,
		image: post.coverImage || undefined
	}));

	return new Response(urlsetXml(urls), { headers: SITEMAP_HEADERS });
};
