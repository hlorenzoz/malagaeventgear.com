import { getPostsForLocale, getCategoriesForLocale } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

export const prerender = true;
// Not hydrated: no SvelteKit JS on a direct load. Its interactive pieces run from
// src/lib/no-csr/enhance.js, injected by +page.svelte.
export const csr = false;

export const load: PageLoad = async ({ parent }) => {
	const { locale } = await parent();
	return {
		categories: await getCategoriesForLocale(locale),
		totalPosts: (await getPostsForLocale(locale)).length,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
	};
};
