import { getAllPosts, getCategories, getAuthors } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// Provide top 20 most-recent posts, all categories, and all authors for the HTML sitemap.
	// The full listing is available via the XML sitemaps.
	const posts = getAllPosts().slice(0, 20);
	const categories = getCategories();
	const authors = getAuthors();
	return {
		posts,
		categories,
		authors,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), (await parent()).locale)
	};
};
