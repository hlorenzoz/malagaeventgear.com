import { test, expect } from '@playwright/test';
import { revealLazyContent } from './support/lazy';

// The in-post image marquee mounts its <img> track only when it scrolls near the
// viewport (ImageMarquee.svelte IntersectionObserver — an LCP optimization), so
// each test reveals lazy content before asserting on the images.
test.describe('Blog Posts Image Marquee E2E', () => {
	test('Wedding blog post renders the correct wedding image marquee', async ({ page }) => {
		await page.goto('/blog/all-in-one-wedding-rental-packages/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		// Check that the marquee container is present in the DOM
		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Check that it contains wedding images (e.g. wedding_reception_decor)
		const image = marquee.locator('img[src*="wedding"]').first();
		await expect(image).toBeVisible();
	});

	test('Corporate blog post renders the correct corporate/MICE image marquee', async ({ page }) => {
		await page.goto('/blog/audio-visual-rental-for-corporate-meetings/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Check that it contains corporate/meeting/MICE images
		const image = marquee.locator('img[src*="corporate-event"], img[src*="mice_event"], img[src*="meeting"]').first();
		await expect(image).toBeVisible();
	});

	test('General blog post renders the correct general/eco image marquee', async ({ page }) => {
		await page.goto('/blog/do-you-offer-delivery-and-setup-for-sound-equipment-in-malaga-spain/');
		await page.waitForLoadState('networkidle');
		await revealLazyContent(page);

		const marquee = page.locator('.prose .marquee-container');
		await expect(marquee.first()).toBeVisible();

		// Check that it contains general/eco images (e.g., sound-system, lighting)
		const image = marquee.locator('img[src*="sound-system"], img[src*="lighting-sound"], img[src*="tennis"]').first();
		await expect(image).toBeVisible();
	});
});
