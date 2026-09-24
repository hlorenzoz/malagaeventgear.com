import { test, expect } from '@playwright/test';

// Blog images with AVIF variants are served as <picture> with a <source type="image/avif">
// and the WebP <img> as fallback (scripts/rehype-blog-images.mjs). The browser picks the
// format it supports: Chromium supports AVIF, so it must actually download the AVIF.
// The ECOC 2026 post is the one whose gallery images were uploaded with AVIF siblings.
const AVIF_POST = '/blog/news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga/';

test.describe('Blog images negotiate AVIF with a WebP fallback', () => {
	test('gallery images are <picture> with an AVIF source and a WebP <img>', async ({ page }) => {
		await page.goto(AVIF_POST);

		const pictures = page.locator('.img-gallery picture');
		expect(await pictures.count()).toBeGreaterThan(0);

		const markup = await pictures.evaluateAll((nodes) =>
			nodes.map((picture) => {
				const source = picture.querySelector('source');
				const img = picture.querySelector('img');
				return {
					type: source?.getAttribute('type'),
					avifSrcset: source?.getAttribute('srcset') ?? '',
					sourceSizes: source?.getAttribute('sizes'),
					imgSrcset: img?.getAttribute('srcset') ?? '',
					imgSizes: img?.getAttribute('sizes')
				};
			})
		);

		for (const m of markup) {
			expect(m.type).toBe('image/avif');
			expect(m.avifSrcset).toMatch(/\.avif \d+w/);
			expect(m.avifSrcset).not.toContain('.webp');
			expect(m.imgSrcset).toMatch(/\.webp \d+w/);
			expect(m.imgSrcset).not.toContain('.avif');
			// Same slot for both formats: the gallery sizes, never the prose one.
			expect(m.sourceSizes).toBe(m.imgSizes);
		}
	});

	test('a browser that supports AVIF downloads the AVIF', async ({ page }) => {
		await page.goto(AVIF_POST);

		const img = page.locator('.img-gallery picture img').first();
		await img.scrollIntoViewIfNeeded();
		await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/\.avif$/);
	});
});
