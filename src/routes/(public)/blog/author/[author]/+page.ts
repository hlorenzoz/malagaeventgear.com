import { error } from '@sveltejs/kit';
import { getAuthors, getAuthorsForLocale, getPostsByAuthorForLocale } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
	getAuthors().map((a) => ({ author: a.slug }));

// An author with no published post in the locale 404s, as in English.
export const load: PageLoad = async ({ params, parent }) => {
	const { locale } = await parent();
	const posts = await getPostsByAuthorForLocale(locale, params.author);
	if (posts.length === 0) {
		error(404, 'Author not found');
	}
	// Find the Author object for display name (ADR-011)
	const authorMeta = (await getAuthorsForLocale(locale)).find((a) => a.slug === params.author);
	return {
		posts,
		author: params.author,
		authorMeta,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
	};
};
