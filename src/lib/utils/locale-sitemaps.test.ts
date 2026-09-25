import { describe, expect, it, vi } from 'vitest';
import { PAGE_LOCALES } from '$lib/i18n/availability';

/**
 * Which child sitemaps each locale publishes. sitemap_index.xml lists exactly these, and the
 * prerender builds exactly these (the `entries` of each `*-sitemap-[locale].xml` route), so
 * the index never points at a sitemap that was not built and no sitemap is built unlisted.
 */

vi.mock('virtual:blog-availability', () => ({
	default: {
		de: () =>
			Promise.resolve({ posts: ['event-technology-service'], categories: ['events'], authors: ['hector-luis-lorenzo'] }),
		// A translation file exists, but nothing is published yet (draft, future date).
		fr: () => Promise.resolve({ posts: [], categories: [], authors: [] })
	}
}));

const { localeSitemapFiles, localesWithSitemap } = await import('./locale-sitemaps');

describe('localesWithSitemap', () => {
	it('builds a page sitemap for every published locale except English (it has its own)', async () => {
		expect(await localesWithSitemap('page')).toEqual(PAGE_LOCALES.filter((l) => l !== 'en'));
	});

	it('builds the blog sitemaps only for locales that publish that kind of URL', async () => {
		expect(await localesWithSitemap('post')).toEqual(['de']);
		expect(await localesWithSitemap('category')).toEqual(['de']);
		expect(await localesWithSitemap('author')).toEqual(['de']);
	});
});

describe('localeSitemapFiles', () => {
	it('lists each locale sitemap once, page sitemap first, in locale order', async () => {
		const files = await localeSitemapFiles();
		const expected = PAGE_LOCALES.filter((l) => l !== 'en').flatMap((l) =>
			l === 'de'
				? ['page-sitemap-de.xml', 'post-sitemap-de.xml', 'category-sitemap-de.xml', 'author-sitemap-de.xml']
				: [`page-sitemap-${l}.xml`]
		);
		expect(files).toEqual(expected);
	});

	it('lists exactly what localesWithSitemap builds', async () => {
		const built = (
			await Promise.all(
				(['page', 'post', 'category', 'author'] as const).map(async (kind) =>
					(await localesWithSitemap(kind)).map((locale) => `${kind}-sitemap-${locale}.xml`)
				)
			)
		).flat();
		expect(new Set(await localeSitemapFiles())).toEqual(new Set(built));
	});
});
