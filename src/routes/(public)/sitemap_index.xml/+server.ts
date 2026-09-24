import type { RequestHandler } from './$types';
import { siteConfig } from '$lib/data/site';
import { getAvailability } from '$lib/i18n/availability';
import { PREFIXED_LOCALES } from '$lib/i18n/locales';
import { SITEMAP_HEADERS } from '$lib/utils/sitemap';

// English sitemaps first, then one child per published locale. A locale with nothing published
// gets no entry (an empty sitemap is never emitted). One sitemap per locale lets GSC report
// indexing coverage per language.
const ENGLISH_SITEMAPS = ['post-sitemap.xml', 'page-sitemap.xml', 'category-sitemap.xml', 'author-sitemap.xml'];

export const GET: RequestHandler = async () => {
	const localeSitemaps = PREFIXED_LOCALES.flatMap((locale) =>
		getAvailability(locale).pages ? [`page-sitemap-${locale}.xml`] : []
	);

	const entries = [...ENGLISH_SITEMAPS, ...localeSitemaps]
		.map((file) => `	<sitemap>\n		<loc>${siteConfig.url}/${file}</loc>\n	</sitemap>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

	return new Response(xml, { headers: SITEMAP_HEADERS });
};
