import type { RequestHandler } from './$types';
import { packages } from '$lib/data/packages';
import { toLastmod, STATIC_SITEMAP_PAGES, getStaticPageFreshness } from '$lib/utils/sitemap';

export const GET: RequestHandler = async () => {
	// Base URL of the website
	const baseUrl = 'https://malagaeventgear.com';

	// <lastmod> comes from each page's colocated meta.ts (getStaticPageFreshness),
	// never from `new Date()`. A build timestamp teaches crawlers the field is
	// meaningless (AGENTS.md, regla de frescura). The freshness guard
	// (src/lib/data/sitemap-freshness.test.ts) fails the suite if a route lacks its date.
	const freshness = getStaticPageFreshness();

	const pagesXml = STATIC_SITEMAP_PAGES.map((page) => {
		const loc = `${baseUrl}/${page}${page ? '/' : ''}`;
		const updated = freshness.get(page);
		// Omit <lastmod> rather than emit a fake date if a meta.ts is ever missing.
		const lastmodBlock = updated ? `\n		<lastmod>${toLastmod(updated)}</lastmod>` : '';
		return `	<url>
		<loc>${loc}</loc>${lastmodBlock}
	</url>`;
	}).join('\n');

	const packagesXml = packages
		.map((pkg) => {
			const loc = `${baseUrl}${pkg.route}`;
			// image:loc MUST be an absolute URL (sitemap protocol). pkg.image is a
			// site-relative path (e.g. /images/packages/eco.webp), so prefix baseUrl -
			// otherwise GSC reports "URL no válida" on every package image.
			const imageBlock = pkg.image
				? `\n		<image:image>
			<image:loc>${baseUrl}${pkg.image}</image:loc>
		</image:image>`
				: '';

			return `	<url>
		<loc>${loc}</loc>
		<lastmod>${toLastmod(pkg.updated)}</lastmod>${imageBlock}
	</url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${pagesXml}
${packagesXml}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
