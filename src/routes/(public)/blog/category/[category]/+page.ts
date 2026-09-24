import { error } from '@sveltejs/kit';
import { getCategories, getCategoriesForLocale, getPostsByCategoryForLocale } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
	getCategories().map((c) => ({ category: c.slug }));

// `params.category` is the ENGLISH category slug in every locale (reroute maps the localized
// one). A category with no published post in the locale 404s, as in English.
export const load: PageLoad = async ({ params, parent }) => {
	const { locale } = await parent();
	const posts = await getPostsByCategoryForLocale(locale, params.category);
	if (posts.length === 0) {
		error(404, 'Category not found');
	}
	// Category object for the display name (localized) and meta
	const category = (await getCategoriesForLocale(locale)).find((c) => c.slug === params.category);
	return {
		posts,
		category: params.category,
		categoryMeta: category,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
	};
};
