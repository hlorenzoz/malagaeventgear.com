import { getPostsForLocale, getCategoriesForLocale, getAuthorsForLocale } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// Provide top 20 most recent posts, all categories, and all authors for the HTML sitemap,
	// of THIS locale only (empty lists hide the blog section). The full listing is available
	// via the XML sitemaps.
	const { locale } = await parent();
	const [posts, categories, authors] = await Promise.all([
		getPostsForLocale(locale),
		getCategoriesForLocale(locale),
		getAuthorsForLocale(locale)
	]);
	return {
		posts: posts.slice(0, 20),
		categories,
		authors,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
	};
};
