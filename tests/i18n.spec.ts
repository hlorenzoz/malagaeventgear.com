import { test, expect } from '@playwright/test';
import {
	LOCALE_META,
	PUBLISHED_LOCALES,
	UNPUBLISHED_LOCALES,
	canonicalOf,
	contentMap,
	hreflangLinks,
	htmlLangOf,
	localized
} from './support/i18n';

/**
 * Multilingual contract (CLAUDE.md, "Internacionalización"), checked on raw HTML, because
 * that is what Google reads. Every test walks the PUBLISHED locales, so it skips itself while
 * only English is live and covers every language as soon as one ships.
 */

const SITE = 'https://malagaeventgear.com';
// A static page, a dynamic package page and the home: the three routing shapes.
const SAMPLE_PAGES = ['/', '/about-us/', '/packages/wedding/'];

test.describe('English stays where it was', () => {
	test('English pages keep their URL, lang and self canonical', async ({ request }) => {
		const res = await request.get('/about-us/');
		expect(res.status()).toBe(200);
		const html = await res.text();
		expect(htmlLangOf(html)).toBe('en');
		expect(canonicalOf(html)).toBe(`${SITE}/about-us/`);
	});

	test('an English slug that starts with a locale code is still English', async ({ request }) => {
		// `essential-...` starts with "es". Segment based detection (unit tested in
		// locale-path.test.ts) keeps it English. The root 301 to it lives in Cloudflare
		// `_redirects`, which the dev server does not apply, so this checks the post itself.
		const res = await request.get('/blog/essential-items-for-wedding-rentals/');
		expect(res.status()).toBe(200);
		expect(htmlLangOf(await res.text())).toBe('en');
	});

	test('hreflang lists exactly the published locales, or nothing when only English exists', async ({ request }) => {
		const links = hreflangLinks(await (await request.get('/about-us/')).text());
		if (PUBLISHED_LOCALES.length === 0) {
			expect(links.size).toBe(0);
			return;
		}
		expect(links.get('x-default')).toBe(`${SITE}/about-us/`);
		expect(links.get('en')).toBe(`${SITE}/about-us/`);
		for (const locale of PUBLISHED_LOCALES) {
			for (const value of LOCALE_META[locale].hreflang) expect(links.has(value), value).toBe(true);
		}
	});
});

test.describe('unpublished locales are not served', () => {
	for (const locale of UNPUBLISHED_LOCALES) {
		test(`/${locale}/ is a 404`, async ({ request }) => {
			expect((await request.get(`/${locale}/`)).status()).toBe(404);
		});
	}
});

for (const locale of PUBLISHED_LOCALES) {
	test.describe(`locale ${locale}`, () => {
		for (const enPath of SAMPLE_PAGES) {
			test(`${enPath}: 200, lang, self canonical and reciprocal hreflang`, async ({ request }) => {
				const path = await localized(locale, enPath);
				expect(path, `${enPath} is not published in ${locale}`).not.toBeNull();

				const res = await request.get(path!);
				expect(res.status()).toBe(200);
				const html = await res.text();
				expect(htmlLangOf(html)).toBe(LOCALE_META[locale].htmlLang);
				// Never canonicalized to English: each language version is its own canonical.
				expect(canonicalOf(html)).toBe(`${SITE}${path}`);

				// Reciprocity: every alternate lists this page back, with the same set.
				const links = hreflangLinks(html);
				expect(links.get(LOCALE_META[locale].hreflang[0])).toBe(`${SITE}${path}`);
				for (const href of new Set(links.values())) {
					const alternate = await request.get(href.replace(SITE, ''), { maxRedirects: 0 });
					expect(alternate.status(), `${href} must answer 200 without redirect`).toBe(200);
					expect(hreflangLinks(await alternate.text())).toEqual(links);
				}
			});
		}

		test('an English slug under the locale prefix is a 404, never a duplicate', async ({ request }) => {
			const map = await contentMap(locale);
			if (map.pages['/about-us/']?.path === '/about-us/') test.skip();
			expect((await request.get(`/${locale}/about-us/`)).status()).toBe(404);
		});

		test('the locale sitemap lists its pages and the index links it', async ({ request }) => {
			const index = await (await request.get('/sitemap_index.xml')).text();
			expect(index).toContain(`${SITE}/page-sitemap-${locale}.xml`);
			const sitemap = await request.get(`/page-sitemap-${locale}.xml`);
			expect(sitemap.status()).toBe(200);
			const xml = await sitemap.text();
			for (const enPath of SAMPLE_PAGES) expect(xml).toContain(`<loc>${SITE}${await localized(locale, enPath)}</loc>`);
			expect(xml).not.toContain('xhtml:link'); // hreflang lives in the <head> only
		});

		test('the language switcher links to the published versions of the page', async ({ page }) => {
			const path = (await localized(locale, '/about-us/'))!;
			await page.goto(path);
			const switcher = page.locator('header details');
			await switcher.locator('summary').click();
			const en = switcher.locator('a[hreflang="en"]');
			await expect(en).toHaveAttribute('href', '/about-us/');
			await expect(switcher.locator(`a[aria-current="page"]`)).toHaveAttribute('hreflang', LOCALE_META[locale].htmlLang);
		});

		test('the footer lists every published language as plain links', async ({ page }) => {
			await page.goto((await localized(locale, '/about-us/'))!);
			const footer = page.getByTestId('footer-language-switcher');
			await expect(footer.locator('a[hreflang="en"]')).toHaveAttribute('href', '/about-us/');
			await expect(footer.locator('a[hreflang]')).toHaveCount(PUBLISHED_LOCALES.length + 1);
		});
	});
}
