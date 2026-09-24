import { error } from '@sveltejs/kit';
import { getAuthors, getPostsByAuthor } from '$lib/data/blog';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
	getAuthors().map((a) => ({ author: a.slug }));

export const load: PageLoad = async ({ params, parent }) => {
	const posts = getPostsByAuthor(params.author);
	if (posts.length === 0) {
		error(404, 'Author not found');
	}
	// Find the Author object for display name (ADR-011)
	const authorMeta = getAuthors().find((a) => a.slug === params.author);
	return {
		posts,
		author: params.author,
		authorMeta,
		copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), (await parent()).locale)
	};
};
