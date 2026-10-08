import { test, expect } from '@playwright/test';

/**
 * Contrast of the "Core Clusters We Cover" heading on /blog/.
 *
 * The heading sits on top of a blue ambient glow. Lighthouse (axe) blends the glow at its
 * opacity over the page background and ignores the blur, so the heading has to reach WCAG AA
 * (4.5:1) against that blended color, in both themes.
 */

const AA_NORMAL_TEXT = 4.5;

for (const theme of ['light', 'dark'] as const) {
	test(`clusters heading reaches WCAG AA over its glow (${theme} theme)`, async ({ page }) => {
		await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
		await page.goto('/blog/');
		await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

		const section = page.locator('[data-testid="blog-clusters"]');
		await section.scrollIntoViewIfNeeded();

		const ratio = await section.evaluate((el) => {
			const rgb = (value: string) => (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
			const luminance = (color: number[]) => {
				const [r, g, b] = color.map((v) => {
					const c = v / 255;
					return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
				});
				return 0.2126 * r + 0.7152 * g + 0.0722 * b;
			};

			const heading = el.querySelector('h2') as HTMLElement;
			const glow = el.querySelector('.pointer-events-none') as HTMLElement;
			const page = document.querySelector('.bg-background') as HTMLElement;

			const text = rgb(getComputedStyle(heading).color);
			const glowColor = rgb(getComputedStyle(glow).backgroundColor);
			const alpha = Number(getComputedStyle(glow).opacity);
			const base = rgb(getComputedStyle(page).backgroundColor);
			const background = glowColor.map((v, i) => v * alpha + base[i] * (1 - alpha));

			const [hi, lo] = [luminance(text), luminance(background)].sort((a, b) => b - a);
			return (hi + 0.05) / (lo + 0.05);
		});

		expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
	});
}
