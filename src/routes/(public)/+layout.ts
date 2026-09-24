import { loadMessages } from '$lib/i18n.svelte';
import { loadContentMap } from '$lib/i18n/router';
import { loadDataCopy } from '$lib/i18n/data-copy';
import type { LayoutLoad } from './$types';

// Every public page is prerendered, in every locale. A localized URL that was not generated
// (content not published in that locale) is not served: prerendered routes are not SSR
// fallbacks, so the request 404s instead of rendering English content under a locale prefix.
export const prerender = true;

// The dictionary, the content map and the package/FAQ copy of the CURRENT locale only, each
// its own lazy chunk: a page never downloads the other 13 languages.
export const load: LayoutLoad = async ({ data }) => {
	const [messages, contentMap, dataCopy] = await Promise.all([
		loadMessages(data.locale),
		data.locale === 'en' ? Promise.resolve(null) : loadContentMap(data.locale),
		loadDataCopy(data.locale)
	]);
	return { ...data, messages, contentMap, dataCopy };
};
