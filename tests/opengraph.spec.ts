import { test, expect } from '@playwright/test';
import { LOCALE_META, PUBLISHED_LOCALES, localized } from './support/i18n';

test.describe('OpenGraph & Twitter Card Meta E2E Validation Tests', () => {

	test('1. should inject default OpenGraph and Twitter tags on Home page', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Basic SEO
		await expect(page).toHaveTitle('Audio Visual Equipment Hire Service in Malaga | MEG');
		
		// OpenGraph Core
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'Audio Visual Equipment Hire Service in Malaga | MEG');
		await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /Malaga Event Gear/);
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://malagaeventgear.com/');
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
		await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Malaga Event Gear');
		
		// Locale: English, with one alternate per OTHER published language (none while only English is live)
		await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
		await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(PUBLISHED_LOCALES.length);

		// Home now references its own hero image as og:image (not the brand fallback)
		const heroImg = 'https://malagaeventgear.com/hero-stage.webp';
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', heroImg);
		await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1024');
		await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '768');

		// Twitter Cards
		await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', heroImg);
	});

	test('2. a localized page carries its own og:locale and og:url', async ({ page }) => {
		// The locale comes from the URL now (no client toggle). Skips while only English is live.
		const locale = PUBLISHED_LOCALES[0];
		test.skip(!locale, 'no published locale besides English');
		const path = (await localized(locale, '/'))!;
		await page.goto(path);
		await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', LOCALE_META[locale].ogLocale);
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://malagaeventgear.com${path}`);
		await expect(page.locator('meta[property="og:locale:alternate"][content="en_US"]')).toHaveCount(1);
	});

	test('3. should inject specific package image on wedding package page', async ({ page }) => {
		await page.goto('/packages/wedding/');
		await page.waitForLoadState('networkidle');

		// Core package details in OpenGraph
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://malagaeventgear.com/packages/wedding/');
		
		// Image overrides with absolute path
		const expectedImg = 'https://malagaeventgear.com/images/packages/wedding.webp';
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', expectedImg);
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', expectedImg);
	});

	test('4. should inject featured mice image on equipment page', async ({ page }) => {
		await page.goto('/equipment/');
		await page.waitForLoadState('networkidle');

		// Equipment catalog image override
		const expectedImg = 'https://malagaeventgear.com/images/packages/mice.webp';
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', expectedImg);
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', expectedImg);
	});
});
