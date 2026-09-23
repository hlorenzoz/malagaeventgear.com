import { test, expect } from '@playwright/test';

/**
 * Dev-server-compatible checks for the `hashed-assets-static-env` change.
 *
 * This spec runs against the EXISTING default Playwright config (`bun run dev`, port 5173).
 * It cannot assert hashed `/_app/immutable/assets/*` URLs or the Cloudflare adapter's
 * immutable Cache-Control header, since those only exist in a production build's output.
 * That coverage lives in tests/asset-caching.prod.spec.ts (see playwright.prod.config.ts).
 *
 * What CAN be verified in dev mode:
 * - `/_app/env.js` is never requested, once no module imports $env/dynamic/public.
 * - The hero preload <link> and the hero <img> stay in lockstep (same srcset string).
 * - The theme toggle still swaps the nav logo.
 */

test.describe('asset caching and env config (dev)', () => {
	test('home page never requests /_app/env.js', async ({ page }) => {
		const requestUrls: string[] = [];
		page.on('request', (request) => requestUrls.push(request.url()));

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(requestUrls.filter((url) => url.includes('/_app/env.js'))).toEqual([]);
	});

	test('contact page never requests /_app/env.js', async ({ page }) => {
		// No `waitForLoadState('networkidle')` here: the Turnstile widget keeps the network
		// busy indefinitely (its own polling/iframe), so networkidle never fires on this
		// page (pre-existing, unrelated to this change). A fixed buffer after `load` is the
		// established pattern in this suite for third-party-script pages (see share.spec.ts,
		// testimonials.spec.ts).
		const requestUrls: string[] = [];
		page.on('request', (request) => requestUrls.push(request.url()));

		await page.goto('/contact/', { waitUntil: 'load' });
		await page.waitForTimeout(2000);

		expect(requestUrls.filter((url) => url.includes('/_app/env.js'))).toEqual([]);
	});

	test('hero preload imagesrcset matches the hero img srcset exactly', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const preloadSrcset = await page.locator('link[rel="preload"][as="image"]').getAttribute('imagesrcset');
		const imgSrcset = await page.locator('img[alt*="stage"]').first().getAttribute('srcset');

		expect(preloadSrcset).not.toBeNull();
		expect(imgSrcset).not.toBeNull();
		expect(preloadSrcset).toBe(imgSrcset);
	});

	test('theme toggle swaps the nav brand logo image', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const logo = page.locator('header img[alt]').first();
		const before = await logo.getAttribute('src');

		const themeToggle = page.locator('button[aria-label="Toggle color theme"]');
		await themeToggle.click();

		await expect
			.poll(async () => logo.getAttribute('src'))
			.not.toBe(before);

		const after = await logo.getAttribute('src');
		expect(after).not.toBeNull();
		expect(after).not.toBe('');
	});
});
