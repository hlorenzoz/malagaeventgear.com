import type { RequestHandler } from './$types';
import { siteConfig } from '$lib/data/site';
import { localeSitemapFiles } from '$lib/utils/locale-sitemaps';
import { SITEMAP_HEADERS } from '$lib/utils/sitemap';

// Built with the site, like every page: a sitemap served by the Worker is kept by the adapter's
// response cache past the next deploy (see SITEMAP_HEADERS).
export const prerender = true;

// English sitemaps first, then each locale's children: its page sitemap and, once it publishes
// translated posts (Fase 4), its post, category and author sitemaps. A locale with nothing of a
// kind published gets no entry for it (an empty sitemap is never emitted), and the list comes
// from the same source that decides which locale sitemaps are built. One sitemap per locale lets
// GSC report indexing coverage per language.
const ENGLISH_SITEMAPS = ['post-sitemap.xml', 'page-sitemap.xml', 'category-sitemap.xml', 'author-sitemap.xml'];

export const GET: RequestHandler = async () => {
	const entries = [...ENGLISH_SITEMAPS, ...(await localeSitemapFiles())]
		.map((file) => `	<sitemap>\n		<loc>${siteConfig.url}/${file}</loc>\n	</sitemap>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

	return new Response(xml, { headers: SITEMAP_HEADERS });
};
