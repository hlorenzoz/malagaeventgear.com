import { error } from '@sveltejs/kit';
import { getPostSlugs, getLocalizedPost, getPostComponentLoaderForLocale, getPostExtras } from '$lib/data/blog';
import type { EntryGenerator, PageLoad } from './$types';
import type { Component } from 'svelte';

export const prerender = true;

// Uses getPostSlugs() — the dedicated slug-list accessor (S-03 consistency).
// All slug-enumeration callers use this single source of truth from blog.ts.
export const entries: EntryGenerator = () =>
	getPostSlugs().map((slug) => ({ slug }));

// Entries stay English: the crawler reaches each translation through the language switcher of
// the English post, like every localized page. `params.slug` is always the ENGLISH slug (the
// reroute hook maps a localized URL to the English route), and the locale comes from the URL.
export const load: PageLoad = async ({ params, parent }) => {
	const { locale } = await parent();
	const post = await getLocalizedPost(locale, params.slug);
	const loader = getPostComponentLoaderForLocale(locale, params.slug);
	if (!post || !loader) {
		error(404, 'Post not found');
	}
	// Lazily load ONLY this post's compiled body (code-split chunk), and its own FAQ and ToC
	// (never downloaded by listings, see getPostExtras).
	const [component, extras] = await Promise.all([loader() as Promise<Component>, getPostExtras(locale, params.slug)]);
	return { post: { ...post, ...extras }, component };
};
