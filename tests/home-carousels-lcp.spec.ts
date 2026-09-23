import { test, expect } from '@playwright/test';

// Los carruseles del home arrancan con overflow-x:hidden y se vuelven scrolleables recien
// cuando el navegador registro el LCP (src/lib/utils/after-lcp.ts), para que su scroll de
// snap no corte el registro de LCP (NO_LCP en PageSpeed). La carrera en si la cubren los
// tests unitarios del helper. Aca se verifica el estado final: despues de cargar, los
// carruseles SI terminan siendo scrolleables y las flechas funcionan.
test.describe('Home carousels enable scrolling after LCP', () => {
	test('packages carousel becomes scrollable after load', async ({ page }) => {
		await page.goto('/');
		const track = page.getByTestId('packages-carousel-track');
		await expect(track).toHaveClass(/overflow-x-auto/, { timeout: 10_000 });
		await expect(track).not.toHaveClass(/overflow-x-hidden/);
	});

	test('latest posts rows become scrollable after load', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('load');
		const rows = page.locator('section div.snap-x');
		const count = await rows.count();
		for (let i = 0; i < count; i++) {
			const row = rows.nth(i);
			if ((await row.getAttribute('data-testid')) === 'packages-carousel-track') continue;
			await expect(row).toHaveClass(/overflow-x-auto/, { timeout: 10_000 });
		}
	});

	test('packages carousel arrows scroll the track', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');
		const track = page.getByTestId('packages-carousel-track');
		await track.scrollIntoViewIfNeeded();
		await expect(track).toHaveClass(/overflow-x-auto/, { timeout: 10_000 });
		const next = page.getByRole('button', { name: /next/i }).first();
		if (!(await next.isVisible())) test.skip(true, 'track does not overflow at this viewport');
		const before = await track.evaluate((el) => el.scrollLeft);
		await next.click();
		await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before);
	});
});
