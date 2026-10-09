import { test, expect } from '@playwright/test';

// "Our Impact in Numbers" on the home page. The three figures used to be typed by hand
// (27+, 2,500+, +95%) and contradicted /about-us/. They now come from siteConfig and from
// the Google reviews data, formatted for the page language.
test.describe('Home impact cards', () => {
	test('show the founding year, the client count and the Google rating', async ({ page }) => {
		await page.goto('/');
		const section = page.locator('[data-testid="impact-section"]');
		await expect(section).toContainText('Since');
		await expect(section).toContainText('1996');
		await expect(section).toContainText('In the audiovisual industry');
		await expect(section).toContainText('1,000+');
		await expect(section).toContainText(/\d\.\d\s*Google rating \(\d+ reviews\)/);
	});

	test('no longer show the hand typed figures', async ({ page }) => {
		await page.goto('/');
		const section = page.locator('[data-testid="impact-section"]');
		await expect(section).not.toContainText('27+');
		await expect(section).not.toContainText('2,500+');
		await expect(section).not.toContainText('95%');
	});

	test('write the figures the German way on the German home page', async ({ page }) => {
		await page.goto('/de/');
		const section = page.locator('[data-testid="impact-section"]');
		await expect(section).toContainText('Seit');
		await expect(section).toContainText('1996');
		await expect(section).toContainText('1.000+');
		await expect(section).toContainText(/\d,\d\s*Google-Bewertung \(\d+ Rezensionen\)/);
	});
});
