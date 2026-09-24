import { getAllPosts, getCategories } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
	return {
		categories: getCategories(),
		totalPosts: getAllPosts().length,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), (await parent()).locale)
	};
};
