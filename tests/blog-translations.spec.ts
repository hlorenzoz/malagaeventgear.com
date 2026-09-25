import { test, expect } from '@playwright/test';
import en from '../src/lib/i18n/messages/en';
import { LOCALE_META, PUBLISHED_LOCALES, localized, translatedPosts } from './support/i18n';

/**
 * Translated posts (Fase 4), checked on the served HTML: one language per page. The chrome the
 * build and the post layout add (ToC, FAQ accordion, package CTA and rail) is in the post's
 * language, the FAQ section becomes the accordion and FAQPage data, the breadcrumb ends with the
 * localized title, the CTA suggests the SAME package as the English post at the locale's price,
 * and no English image caption or tag leaks in. Skips itself while no post is translated.
 */

// English chrome that must never appear on a translated post page.
const ENGLISH_CHROME = [
	en.blogStructure.inThisArticle,
	en.blogStructure.tocAria,
	en.blogStructure.faqAria,
	en.postCta.aria,
	...Object.values(en.postCta.headline),
	en.postCta.freeQuote,
	'View the ',
	en.packagesRail.title,
	`aria-label="${en.packagesRail.aria}"`,
	// The English VAT note, whatever the rate: " VAT)"
	en.pricing.plusVat.split('{vat}')[1]
];

const jsonLd = (html: string) =>
	[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
		const json = JSON.parse(m[1]);
		return Array.isArray(json) ? json : [json];
	});
const figcaptions = (html: string) => [...html.matchAll(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g)].map((m) => m[1].trim());
const ctaHref = (html: string) => html.match(/href="([^"]+)"[^>]*data-testid="post-cta-primary"/)?.[1];
const ctaPrice = (html: string) => html.match(/class="post-cta-price[^"]*">[\s\S]*?<strong[^>]*>([^<]+)<\/strong>/)?.[1];

function formatEuros(amount: number, locale: keyof typeof LOCALE_META): string {
	// Mirrors formatPrice (packages.ts): Intl in the page language, plain spaces (CLAUDE.md §12).
	return new Intl.NumberFormat(LOCALE_META[locale].intl, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
		.format(amount)
		.replace(/[\u00a0\u202f]/g, ' ');
}

for (const locale of PUBLISHED_LOCALES) {
	for (const post of translatedPosts(locale)) {
		test.describe(`${locale}/${post.slug}`, () => {
			let html = '';
			let english = '';
			test.beforeAll(async ({ request }) => {
				html = await (await request.get(post.url)).text();
				english = await (await request.get(`/blog/${post.slug}/`)).text();
			});

			test('has no English chrome', () => {
				for (const text of ENGLISH_CHROME) expect(html, `"${text}" on ${post.url}`).not.toContain(text);
			});

			test('keeps the FAQ of its English post: localized accordion and FAQPage data', () => {
				// Measured on the English page, never on the translation: a translation that lost its
				// FAQ (a heading the build does not recognize) must fail here, not skip.
				const englishFaq = jsonLd(english).find((n) => n['@type'] === 'FAQPage');
				test.skip(!englishFaq, 'the English post has no FAQ section');
				const faqPage = jsonLd(html).find((n) => n['@type'] === 'FAQPage');
				expect(faqPage?.mainEntity, 'the translation lost its FAQ').toHaveLength(englishFaq.mainEntity.length);
				expect(faqPage.mainEntity[0].name).not.toBe(englishFaq.mainEntity[0].name);
				expect(html).toMatch(/<section class="faq-section" aria-label="[^"]+">/);
				expect([...html.matchAll(/class="faq-item"/g)]).toHaveLength(englishFaq.mainEntity.length);
			});

			test('ends its breadcrumb with the localized title', () => {
				const list = jsonLd(html).find((n) => n['@type'] === 'BreadcrumbList');
				expect(list?.itemListElement.at(-1).name).toBe(post.title);
			});

			test('suggests the same package as the English post, at the locale price', async () => {
				const enHref = ctaHref(english)!;
				expect(enHref).toMatch(/^\/packages\/[^/]+\/$/);
				expect(ctaHref(html)).toBe(await localized(locale, enHref));
				const enAmount = Number(ctaPrice(english)!.replace(/\D/g, ''));
				expect(ctaPrice(html)).toBe(formatEuros(enAmount, locale));
			});

			test('prints no markdown as raw text (every image and link rendered)', () => {
				// mdsvex's parser rejects some CommonMark forms, like a parenthesized image title,
				// and prints them as text. Only the article body: that is where the markdown goes.
				const article = (html.match(/<article[\s\S]*<\/article>/)?.[0] ?? '').replace(/<(pre|code)\b[\s\S]*?<\/\1>/g, '');
				expect(article, 'raw markdown image').not.toMatch(/!\[[^[\]]*\]\(/);
				expect(article, 'raw markdown link or image target').not.toMatch(/\]\((?:https?:|\/|<a\b)/);
			});

			test('never shows an English image caption, alt or tag', () => {
				for (const caption of figcaptions(english)) expect(html, 'English figcaption').not.toContain(`>${caption}<`);
				const article = html.match(/<article[\s\S]*<\/article>/)?.[0] ?? '';
				for (const [img] of article.matchAll(/<img\b[^>]*>/g)) {
					expect(img, 'every image of a translated post has an alt').toMatch(/\balt="[^"]*\S[^"]*"/);
				}
				expect(html).not.toContain('property="article:tag"');
			});
		});
	}
}

test('the guard runs on every published translation', () => {
	// Documents the skip: with no translated post, the loop above generates no test.
	const count = PUBLISHED_LOCALES.reduce((n, l) => n + translatedPosts(l).length, 0);
	test.skip(count === 0, 'no post is translated yet');
	expect(count).toBeGreaterThan(0);
});
