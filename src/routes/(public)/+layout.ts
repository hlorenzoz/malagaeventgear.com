import { loadMessages } from '$lib/i18n.svelte';
import { loadContentMap } from '$lib/i18n/router';
import { loadDataCopy } from '$lib/i18n/data-copy';
import { loadBlogAvailability } from '$lib/i18n/blog-availability';
import { renderTokens } from '$lib/data/packages';
import type { LayoutLoad } from './$types';

// Every public page is prerendered, in every locale. A localized URL that was not generated
// (content not published in that locale) is not served: prerendered routes are not SSR
// fallbacks, so the request 404s instead of rendering English content under a locale prefix.
export const prerender = true;

// The dictionary, the content map, the package/FAQ copy and what the blog publishes (English
// slugs, for `i18n.href`) of the CURRENT locale only, each its own lazy chunk: a page never
// downloads the other 12 languages.
export const load: LayoutLoad = async ({ data }) => {
	const [messages, contentMap, dataCopy, blogAvailability] = await Promise.all([
		loadMessages(data.locale),
		data.locale === 'en' ? Promise.resolve(null) : loadContentMap(data.locale),
		loadDataCopy(data.locale),
		loadBlogAvailability(data.locale)
	]);
	// Catalog tokens ({price:key}, {vat}) are rendered here once, in the page language.
	return { ...data, messages: renderTokens(messages, data.locale), contentMap, dataCopy, blogAvailability };
};
