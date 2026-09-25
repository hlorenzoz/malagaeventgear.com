import { test, expect } from '@playwright/test';
import de from '../src/lib/i18n/data/de';
import fr from '../src/lib/i18n/data/fr';
import zhHans from '../src/lib/i18n/data/zh-hans';
import deMap from '../src/lib/i18n/content-map/locales/de';
import zhHansMap from '../src/lib/i18n/content-map/locales/zh-hans';

/**
 * The gallery (src/lib/data/gallery.ts) feeds the image carousel of the home, equipment,
 * packages, package and team pages and of most blog posts. Its alt text is written in English,
 * so a translated page must serve the alt of ITS language (CLAUDE.md, "Reglas de traduccion":
 * every text of an image is translated), looked up by the image src in the locale's data file.
 * Needs a real build, hence a .prod spec.
 */

const GALLERY: Record<'de' | 'fr' | 'zh-hans', Record<string, string>> = { de: de.gallery, fr: fr.gallery, 'zh-hans': zhHans.gallery };

function decode(text: string): string {
	return text
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'")
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&');
}

function expectLocalized(locale: keyof typeof GALLERY, images: { src: string; alt: string }[], where: string) {
	expect(images.length, `${where}: the carousel rendered no images`).toBeGreaterThan(0);
	for (const { src, alt } of images) {
		const expected = GALLERY[locale][src];
		expect(expected, `${where}: ${src} is not a gallery image with a ${locale} alt`).toBeTruthy();
		expect(alt, `${where}: wrong alt for ${src}`).toBe(expected);
	}
}

for (const [path, locale] of [
	['/de/', 'de'],
	['/fr/', 'fr'],
	['/zh-hans/', 'zh-hans']
] as const) {
	test(`every carousel on ${path} serves the ${locale} alt of each image`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		// Each carousel mounts when it scrolls near the viewport (IntersectionObserver): bring
		// every one into view and wait for its images before reading them.
		const carousels = page.locator('.marquee-container');
		const count = await carousels.count();
		expect(count, `${path}: no carousel on the page`).toBeGreaterThan(0);
		for (let i = 0; i < count; i++) {
			await carousels.nth(i).scrollIntoViewIfNeeded();
			await expect(carousels.nth(i).locator('.marquee-item img').first()).toBeAttached();
		}
		const images = await page
			.locator('.marquee-item img')
			.evaluateAll((nodes) => nodes.map((node) => ({ src: node.getAttribute('src') ?? '', alt: node.getAttribute('alt') ?? '' })));
		expectLocalized(locale, images, path);
	});
}

for (const [locale, blog, map] of [
	['de', 'blog', deMap],
	['zh-hans', '博客', zhHansMap]
] as const) {
	test(`the ${locale} post that renders its carousel on the server serves the ${locale} alt in the HTML`, async ({ request }) => {
		// wedding-rentals mounts its carousel without deferring, so the images are in the HTML.
		const slug = map.posts['wedding-rentals']?.slug;
		expect(slug, `wedding-rentals is not in the ${locale} content map`).toBeTruthy();
		const response = await request.get(encodeURI(`/${locale}/${blog}/${slug}/`));
		expect(response.status()).toBe(200);
		const html = await response.text();
		const images = [...html.matchAll(/class="marquee-item[^"]*"[^>]*>\s*<img([^>]*)>/g)].map((m) => ({
			src: decode(/\ssrc="([^"]*)"/.exec(m[1])?.[1] ?? ''),
			alt: decode(/\salt="([^"]*)"/.exec(m[1])?.[1] ?? '')
		}));
		expectLocalized(locale, images, `${locale} wedding-rentals`);
	});
}
