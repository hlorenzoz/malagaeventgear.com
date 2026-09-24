import { test, expect } from '@playwright/test';
import { PUBLISHED_LOCALES, localized } from './support/i18n';

test.describe('Breadcrumbs Visual & Navigation E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Start from the home page
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('should NOT render visible breadcrumbs on the Home page', async ({ page }) => {
		const breadcrumbs = page.locator('nav[aria-label="Breadcrumbs"]');
		await expect(breadcrumbs).not.toBeAttached();
	});

	test('should render breadcrumbs on inner pages with correct nesting and trailing-slash URLs', async ({ page }) => {
		// Go to Packages index
		await page.goto('/packages/');
		await page.waitForLoadState('networkidle');

		const breadcrumbs = page.locator('nav[aria-label="Breadcrumbs"]');
		await expect(breadcrumbs).toBeVisible();

		// Check Home link
		const homeLink = breadcrumbs.locator('a[href="/"]');
		await expect(homeLink).toBeVisible();
		await expect(homeLink).toContainText(/Home|Inicio/);

		// Check current page active label
		const activeLabel = breadcrumbs.locator('span[aria-current="page"]');
		await expect(activeLabel).toBeVisible();
		await expect(activeLabel).toContainText(/Packages|Paquetes/);

		// Go to a specific package page
		await page.goto('/packages/wedding/');
		await page.waitForLoadState('networkidle');

		await expect(breadcrumbs).toBeVisible();

		// Verify parent link is clickable and ends strictly with trailing slash
		const parentLink = breadcrumbs.locator('a[href="/packages/"]');
		await expect(parentLink).toBeVisible();
		await expect(parentLink).toContainText(/Packages|Paquetes/);

		// Verify leaf node is highlighted correctly
		const currentLabel = breadcrumbs.locator('span[aria-current="page"]');
		await expect(currentLabel).toBeVisible();
		await expect(currentLabel).toContainText(/Wedding|Bodas/);
	});

	test('breadcrumbs follow the URL locale: translated names and localized links', async ({ page }) => {
		// The language comes from the URL (no client toggle). Skips while only English is live.
		const locale = PUBLISHED_LOCALES[0];
		test.skip(!locale, 'no published locale besides English');
		const packages = (await localized(locale, '/packages/'))!;
		const wedding = (await localized(locale, '/packages/wedding/'))!;
		await page.goto(wedding);

		const breadcrumbs = page.locator('nav[aria-label]').filter({ has: page.locator('span[aria-current="page"]') });
		await expect(breadcrumbs.locator(`a[href="${await localized(locale, '/')}"]`)).toBeVisible();
		const parent = breadcrumbs.locator(`a[href="${packages}"]`);
		await expect(parent).toBeVisible();
		await expect(parent).not.toHaveText('Packages');
		// The package NAME is never translated (CLAUDE.md, "Idiomas soportados").
		await expect(breadcrumbs.locator('span[aria-current="page"]')).toHaveText('Wedding Pack');
	});
});
