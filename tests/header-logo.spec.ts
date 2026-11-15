import { test, expect, type Page } from '@playwright/test';

/**
 * Header logo: TopNavBar renders the light and the dark logo, CSS shows the one for the current
 * data-theme and both are lazy, so the browser only downloads the visible one. Checked on a non
 * hydrated home, a non hydrated post and a hydrated page.
 */
const PAGES = ['/', '/blog/audio-visual-rental-for-conferences/', '/packages/'];
const THEMES = ['light', 'dark'] as const;

/** Logo paths, read from the footer, which always renders both logos. */
async function logoPaths(page: Page): Promise<{ light: string; dark: string }> {
	const path = async (selector: string) =>
		new URL((await page.locator(selector).getAttribute('src'))!, page.url()).pathname;
	return {
		light: await path('footer img.brand-logo--light'),
		dark: await path('footer img.brand-logo--dark')
	};
}

for (const path of PAGES) {
	for (const theme of THEMES) {
		test(`${path} on the ${theme} theme downloads only the ${theme === 'light' ? 'dark' : 'light'} logo`, async ({
			page
		}) => {
			await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
			// Images only: in dev the logo modules are also requested as JS (`?import`) on the same path.
			const requested: string[] = [];
			page.on('request', (request) => {
				if (request.resourceType() === 'image') requested.push(new URL(request.url()).pathname);
			});
			await page.goto(path);
			const visible = page.locator('header a[href] img:visible');
			await expect(visible).toHaveCount(1);
			await expect
				.poll(() =>
					visible.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
				)
				.toBe(true);
			await page.waitForLoadState('networkidle');
			const logos = await logoPaths(page);
			const wanted = theme === 'light' ? logos.dark : logos.light;
			const unwanted = theme === 'light' ? logos.light : logos.dark;
			expect(
				new URL(await visible.evaluate((img: HTMLImageElement) => img.currentSrc)).pathname
			).toBe(wanted);
			expect(requested).toContain(wanted);
			expect(requested).not.toContain(unwanted);
		});
	}

	test(`${path}: the theme toggle shows the header logo of the new theme`, async ({ page }) => {
		await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
		await page.goto(path);
		await page.waitForLoadState('networkidle');
		const logos = await logoPaths(page);
		const html = page.locator('html');
		const toggle = page.locator('header [data-theme-toggle]');
		const visible = page.locator('header a[href] img:visible');
		for (const next of ['light', 'dark'] as const) {
			await toggle.click();
			await expect(html).toHaveAttribute('data-theme', next);
			await expect(visible).toHaveCount(1);
			const src = new URL((await visible.getAttribute('src'))!, page.url()).pathname;
			expect(src).toBe(next === 'light' ? logos.dark : logos.light);
			await expect
				.poll(() =>
					visible.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
				)
				.toBe(true);
		}
	});
}
