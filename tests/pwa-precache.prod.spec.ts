import { test, expect } from '@playwright/test';
import { LOCALES } from '../src/lib/i18n/locales';
import en from '../src/lib/i18n/messages/en';

/**
 * The service worker precaches the app shell for every visitor. Translated copy (dictionaries,
 * package and FAQ copy, page copy, content maps) must stay out of it: a visitor reading English
 * should never download the other 12 languages. They load on demand when a page in that
 * language is opened. Needs a real build, hence a .prod spec.
 */

const TRANSLATED = LOCALES.filter((locale) => locale !== 'en');

async function precachedScripts(request: import('@playwright/test').APIRequestContext) {
	const sw = await (await request.get('/sw.js')).text();
	const urls = [...sw.matchAll(/url:"([^"]+\.js)"/g)].map((m) => m[1]);
	expect(urls.length, 'sw.js lists no scripts').toBeGreaterThan(50);
	// In batches: a few hundred parallel requests make the preview server drop connections.
	const scripts: { url: string; body: string }[] = [];
	for (let i = 0; i < urls.length; i += 20) {
		const batch = urls.slice(i, i + 20);
		scripts.push(...(await Promise.all(batch.map(async (url) => ({ url, body: await (await request.get(`/${url}`)).text() })))));
	}
	return scripts;
}

test('precached scripts carry English copy but no translated copy', async ({ request }) => {
	const scripts = await precachedScripts(request);

	// The scan works: the English dictionary is part of the app shell.
	expect(scripts.some(({ body }) => body.includes(en.notices.legalTranslation))).toBe(true);

	for (const locale of TRANSLATED) {
		const messages = (await import(`../src/lib/i18n/messages/${locale}.ts`)).default;
		const marker = messages.notices.legalTranslation;
		const hits = scripts.filter(({ body }) => body.includes(marker)).map(({ url }) => url);
		expect(hits, `${locale} copy is precached`).toEqual([]);
	}
});
