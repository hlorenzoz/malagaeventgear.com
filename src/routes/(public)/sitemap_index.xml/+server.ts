import type { RequestHandler } from './$types';
import { siteConfig } from '$lib/data/site';
import { getAvailability } from '$lib/i18n/availability';
import { loadBlogAvailability } from '$lib/i18n/blog-availability';
import { PREFIXED_LOCALES } from '$lib/i18n/locales';
import { SITEMAP_HEADERS } from '$lib/utils/sitemap';

// English sitemaps first, then each locale's children: its page sitemap and, once it publishes
// translated posts (Fase 4), its post, category and author sitemaps. A locale with nothing of a
// kind published gets no entry for it (an empty sitemap is never emitted). One sitemap per locale lets GSC report
// indexing coverage per language.
const ENGLISH_SITEMAPS = ['post-sitemap.xml', 'page-sitemap.xml', 'category-sitemap.xml', 'author-sitemap.xml'];

export const GET: RequestHandler = async () => {
	const localeSitemaps = (
		await Promise.all(
			PREFIXED_LOCALES.map(async (locale) => {
				const blog = await loadBlogAvailability(locale);
				return [
					getAvailability(locale).pages && `page-sitemap-${locale}.xml`,
					blog && blog.posts.length > 0 && `post-sitemap-${locale}.xml`,
					blog && blog.categories.length > 0 && `category-sitemap-${locale}.xml`,
					blog && blog.authors.length > 0 && `author-sitemap-${locale}.xml`
				].filter((file): file is string => typeof file === 'string');
			})
		)
	).flat();

	const entries = [...ENGLISH_SITEMAPS, ...localeSitemaps]
		.map((file) => `	<sitemap>\n		<loc>${siteConfig.url}/${file}</loc>\n	</sitemap>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

	return new Response(xml, { headers: SITEMAP_HEADERS });
};
