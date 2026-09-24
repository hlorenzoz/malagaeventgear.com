import { test, expect } from '@playwright/test';
import {
	LOCALE_META,
	PUBLISHED_LOCALES,
	blogAvailability,
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

test.describe('every price on a page is written one way', () => {
	// Copy writes {price:N} tokens and formatPrice renders them, so a page never mixes `+50€`
	// with `400 €`. Checked on the rendered text of the pages that list extras and minimums.
	for (const locale of ['en', ...PUBLISHED_LOCALES] as const) {
		test(`${locale}`, async ({ request }) => {
			for (const enPath of ['/packages/', '/packages/eco/', '/faq/', '/terms-of-service/']) {
				const html = await (await request.get((await localized(locale, enPath))!)).text();
				const text = html.split('<body')[1].replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ');
				expect(text, `${enPath}: unrendered token`).not.toContain('{price:');
				const amounts = [...text.matchAll(/€ ?\d+|\d+ ?€/g)].map((m) => m[0]);
				expect(amounts.length, `${enPath}: no prices found`).toBeGreaterThan(0);
				const shapes = new Set(amounts.map((a) => (a.startsWith('€') ? '€N' : a.includes(' ') ? 'N €' : 'N€')));
				expect([...shapes], `${enPath}: ${amounts.join(' | ')}`).toHaveLength(1);
				expect(shapes.has('N€'), `${enPath}: amount glued to the symbol`).toBe(false);
			}
		});
	}
});

for (const locale of PUBLISHED_LOCALES) {
	test.describe(`locale ${locale}`, () => {
		// Plus the locale's newest translated post, once it has one (Fase 4): same contract.
		const firstPost = blogAvailability(locale).posts[0];
		for (const enPath of [...SAMPLE_PAGES, ...(firstPost ? [`/blog/${firstPost}/`] : [])]) {
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

		test('a translated post declares its language and its own URL in the Article', async ({ request }) => {
			test.skip(!firstPost, 'no translated post in this locale yet');
			const path = (await localized(locale, `/blog/${firstPost}/`))!;
			const html = await (await request.get(path)).text();
			const article = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
				.map((m) => JSON.parse(m[1]))
				.find((n) => n['@type'] === 'BlogPosting' || n['@type'] === 'NewsArticle');
			expect(article?.inLanguage).toBe(LOCALE_META[locale].htmlLang);
			expect(article?.['@id']).toBe(`${SITE}${path}#article`);
		});

		test('structured data points at this language version, never the English URL', async ({ request }) => {
			const nodes = (html: string) =>
				[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
					const json = JSON.parse(m[1]);
					return Array.isArray(json) ? json : [json];
				});

			const pkgPath = (await localized(locale, '/packages/wedding/'))!;
			const service = nodes(await (await request.get(pkgPath)).text()).find((n) => n['@type'] === 'Service');
			expect(service?.['@id']).toBe(`${SITE}${pkgPath}#service`);
			expect(service?.offers?.url).toBe(`${SITE}${pkgPath}`);

			const contactPath = (await localized(locale, '/contact/'))!;
			const contact = nodes(await (await request.get(contactPath)).text()).find((n) => n['@type'] === 'ContactPage');
			expect(contact?.url).toBe(`${SITE}${contactPath}`);
		});

		test('navbar controls are labelled in this language', async ({ request }) => {
			const html = await (await request.get((await localized(locale, '/about-us/'))!)).text();
			const header = html.match(/<header[\s\S]*?<\/header>/)![0];
			expect(header).not.toMatch(/aria-label="(Toggle color theme|Open navigation menu|Call Malaga Event Gear)/);
		});

		test('the thank-you page sends the lead back to packages in this language', async ({ request }) => {
			const path = await localized(locale, '/thank-you/');
			expect(path, 'thank-you is published in every locale').not.toBeNull();
			const html = await (await request.get(path!)).text();
			expect(html).toContain(`href="${await localized(locale, '/packages/')}"`);
		});

		test('no translated page lists English posts (one language per page)', async ({ request }) => {
			// A translated page lists only the posts published in its locale, by their localized
			// URL. The only English blog link allowed is the navbar's labelled "Blog (in English)"
			// link to /blog/ itself (while the locale has no posts), never a post, category or author.
			const blogRoot = await localized(locale, '/blog/');
			// Every localized URL one level under the blog root: its published posts and the
			// categories index. Anything else there would be a post that is not published.
			const allowed = new Set([
				await localized(locale, '/blog/categories/'),
				...(await Promise.all(blogAvailability(locale).posts.map((slug) => localized(locale, `/blog/${slug}/`))))
			]);
			for (const enPath of ['/', '/sitemap/']) {
				const html = await (await request.get((await localized(locale, enPath))!)).text();
				const postLinks = [...html.matchAll(/href="(\/blog\/[^"]+)"/g)].map((m) => m[1]).filter((h) => h !== '/blog/');
				expect(postLinks, `${enPath} in ${locale} links English posts`).toEqual([]);
				if (!blogRoot) continue; // no posts in this locale: no localized blog URL exists
				const underRoot = [...html.matchAll(/href="([^"]+)"/g)]
					.map((m) => m[1])
					.filter((h) => h.startsWith(blogRoot) && /^[^/]+\/$/.test(h.slice(blogRoot.length)));
				for (const href of underRoot) expect(allowed, `${enPath} in ${locale} links ${href}`).toContain(href);
			}
		});

		test('the locale blog sitemaps exist only with published posts, and the index links them', async ({ request }) => {
			const blog = blogAvailability(locale);
			const index = await (await request.get('/sitemap_index.xml')).text();
			const kinds = { post: blog.posts, category: blog.categories, author: blog.authors };
			for (const [kind, published] of Object.entries(kinds)) {
				const file = `${kind}-sitemap-${locale}.xml`;
				const res = await request.get(`/${file}`);
				expect(res.status(), file).toBe(published.length > 0 ? 200 : 404);
				expect(index.includes(`${SITE}/${file}`), `index lists ${file}`).toBe(published.length > 0);
				if (kind === 'post' && published.length > 0) {
					const xml = await res.text();
					for (const slug of published) expect(xml).toContain(`<loc>${SITE}${await localized(locale, `/blog/${slug}/`)}</loc>`);
				}
			}
		});

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

		test('Chinese copy has no ASCII space or period glued between Chinese runs', async ({ page }) => {
			// Templates join copy with `i18n.space` and `i18n.stop`, which are Chinese aware. innerText
			// follows the rendered layout, so separate blocks (or flex items) never count as a gap.
			test.skip(LOCALE_META[locale].script === 'latin');
			const cjk = '\\u4e00-\\u9fff';
			const gap = new RegExp(`[${cjk}\\uff0c\\u3002\\uff1a\\uff09] +[${cjk}\\uff08]`);
			const asciiStop = new RegExp(`[${cjk}\\uff09]\\.`);
			for (const enPath of ['/', '/equipment/', '/gdpr/']) {
				await page.goto((await localized(locale, enPath))!);
				const text = await page.locator('body').innerText();
				expect(text.match(gap)?.[0], `${enPath} ASCII space`).toBeUndefined();
				expect(text.match(asciiStop)?.[0], `${enPath} ASCII period`).toBeUndefined();
			}
		});

		test('the GDPR request message names the right in this language', async ({ page }) => {
			// It used to interpolate the English action id uppercased ("ACCESS") into every locale.
			await page.goto((await localized(locale, '/gdpr/'))!);
			await page.waitForLoadState('networkidle'); // the button only works once hydrated
			await page.getByTestId('gdpr-request-access').click();
			const status = page.getByRole('status');
			await expect(status).toBeVisible();
			await expect(status).not.toContainText(/ACCESS|RECTIFICATION|ERASURE|data access/);
		});

		test('the footer lists every published language as plain links', async ({ page }) => {
			await page.goto((await localized(locale, '/about-us/'))!);
			const footer = page.getByTestId('footer-language-switcher');
			await expect(footer.locator('a[hreflang="en"]')).toHaveAttribute('href', '/about-us/');
			await expect(footer.locator('a[hreflang]')).toHaveCount(PUBLISHED_LOCALES.length + 1);
		});
	});
}
