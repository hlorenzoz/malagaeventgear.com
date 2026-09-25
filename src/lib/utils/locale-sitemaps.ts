import { getAvailability } from '$lib/i18n/availability';
import { loadBlogAvailability } from '$lib/i18n/blog-availability';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n/locales';

/**
 * The child sitemaps of each locale (`page-sitemap-de.xml`, `post-sitemap-de.xml`...), the one
 * source for both sides of the index: sitemap_index.xml lists exactly these, and each
 * `*-sitemap-[locale].xml` route prerenders exactly these (its `entries`). A locale with no URL
 * of a kind gets no sitemap of that kind: it is neither built nor listed. Server only (it loads
 * every locale's blog availability).
 */
export type LocaleSitemapKind = 'page' | 'post' | 'category' | 'author';

const KINDS: readonly LocaleSitemapKind[] = ['page', 'post', 'category', 'author'];

async function kindsOf(locale: Locale): Promise<LocaleSitemapKind[]> {
	const blog = await loadBlogAvailability(locale);
	const published: Record<LocaleSitemapKind, boolean> = {
		page: getAvailability(locale).pages,
		post: (blog?.posts.length ?? 0) > 0,
		category: (blog?.categories.length ?? 0) > 0,
		author: (blog?.authors.length ?? 0) > 0
	};
	return KINDS.filter((kind) => published[kind]);
}

/** Prefixed locales that publish a sitemap of this kind, in locale order. */
export async function localesWithSitemap(kind: LocaleSitemapKind): Promise<Locale[]> {
	const kinds = await Promise.all(PREFIXED_LOCALES.map(kindsOf));
	return PREFIXED_LOCALES.filter((_, i) => kinds[i].includes(kind));
}

/** Every locale sitemap file, locale by locale, page sitemap first (the index order). */
export async function localeSitemapFiles(): Promise<string[]> {
	const kinds = await Promise.all(PREFIXED_LOCALES.map(kindsOf));
	return PREFIXED_LOCALES.flatMap((locale, i) => kinds[i].map((kind) => `${kind}-sitemap-${locale}.xml`));
}
