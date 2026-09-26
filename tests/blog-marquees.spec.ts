import { test, expect } from '@playwright/test';
import { revealLazyContent } from './support/lazy';
import { getImagesForPackage } from '../src/lib/data/gallery';

// The in-post image marquee mounts its <img> track only when it scrolls near the
// viewport (ImageMarquee.svelte IntersectionObserver, an LCP optimization), so
// each test reveals lazy content before asserting on the images.
//
// The expected images are derived from gallery.ts by category (getImagesForPackage), the same
// stable criterion the post itself uses to build its <ImageMarquee>, instead of hardcoded file
// name fragments: a category move or a photo swap in gallery.ts never silently breaks this test
// (or worse, passes for the wrong reason) the way a fragile "img[src*='corporate-event']"
// selector would.
function basenameOf(src: string): string {
	return src.split('/').pop()!.replace(/\.[a-z0-9]+$/i, '');
}

function selectorFor(images: { src: string }[]): string {
	expect(images.length, 'expected at least one gallery image for this category').toBeGreaterThan(0);
	return images.map((img) => `img[src*="${basenameOf(img.src)}"]`).join(', ');
}

test.describe('Blog Posts Image Marquee E2E', () => {
	test('Wedding blog post renders the correct wedding image marquee', async ({ page }) => {
		await page.goto('/blog/all-in-one-wedding-rental-packages/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		// Check that the marquee container is present in the DOM
		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Matches the wedding category images this post's own <ImageMarquee> requests
		// (the post excludes 1636, 1635 and 1628 - already shown inline in its body).
		const expected = getImagesForPackage('wedding', ['/1636/', '/1635/', '/1628/']);
		const image = marquee.locator(selectorFor(expected)).first();
		await expect(image).toBeVisible();
	});

	test('Corporate blog post renders the correct corporate/MICE image marquee', async ({ page }) => {
		await page.goto('/blog/audio-visual-rental-for-corporate-meetings/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Matches the corporate category images this post's own <ImageMarquee> requests
		// (the post excludes 1269, 1284, 1276 and 1267 - already shown inline in its body).
		const expected = getImagesForPackage('basic-mice', ['/1269/', '/1284/', '/1276/', '/1267/']);
		const image = marquee.locator(selectorFor(expected)).first();
		await expect(image).toBeVisible();
	});

	test('General blog post renders the correct general/eco image marquee', async ({ page }) => {
		// El post original se consolido en how-audio-visual-rental-works (a034386, 301 en _redirects).
		await page.goto('/blog/how-audio-visual-rental-works/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Matches the general + party (eco) category images this post's own <ImageMarquee> requests.
		const expected = getImagesForPackage('eco');
		const image = marquee.locator(selectorFor(expected)).first();
		await expect(image).toBeVisible();
	});
});
