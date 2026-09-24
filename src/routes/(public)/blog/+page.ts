import { getPostsForLocale } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

export const prerender = true;

// A localized blog index only exists (reroute) when its locale has published posts, and it
// lists only those: never English titles on a translated page.
export const load: PageLoad = async ({ parent }) => {
	const { locale } = await parent();
	return {
		posts: await getPostsForLocale(locale),
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
	};
};
