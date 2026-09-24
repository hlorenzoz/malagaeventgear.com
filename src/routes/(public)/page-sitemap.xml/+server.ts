import type { RequestHandler } from './$types';
import { packages } from '$lib/data/packages';
import { siteConfig } from '$lib/data/site';
import {
	STATIC_SITEMAP_PAGES,
	SITEMAP_HEADERS,
	getStaticPageFreshness,
	staticPageEnPath,
	urlsetXml,
	type SitemapUrl
} from '$lib/utils/sitemap';

export const GET: RequestHandler = async () => {
	// <lastmod> comes from each page's colocated meta.ts (getStaticPageFreshness),
	// never from `new Date()`. A build timestamp teaches crawlers the field is
	// meaningless (CLAUDE.md, regla de frescura). The freshness guard
	// (src/lib/data/sitemap-freshness.test.ts) fails the suite if a route lacks its date.
	// A missing date omits <lastmod> rather than emitting a fake one.
	const freshness = getStaticPageFreshness();

	const pageUrls: SitemapUrl[] = STATIC_SITEMAP_PAGES.map((page) => ({
		loc: `${siteConfig.url}${staticPageEnPath(page)}`,
		lastmod: freshness.get(page)
	}));

	const packageUrls: SitemapUrl[] = packages.map((pkg) => ({
		loc: `${siteConfig.url}${pkg.route}`,
		lastmod: pkg.updated,
		// image:loc MUST be an absolute URL (sitemap protocol). pkg.image is a site-relative
		// path (e.g. /images/packages/eco.webp): without the prefix GSC reports "URL no válida".
		image: pkg.image ? `${siteConfig.url}${pkg.image}` : undefined
	}));

	return new Response(urlsetXml([...pageUrls, ...packageUrls]), { headers: SITEMAP_HEADERS });
};
