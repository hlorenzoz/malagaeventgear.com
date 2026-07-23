import type { Page } from '@playwright/test';

/**
 * Below-the-fold sections (image marquees, the testimonials block) are mounted
 * lazily: their `IntersectionObserver` only renders the real content once the
 * placeholder scrolls near the viewport. This is a deliberate LCP optimization
 * (see ImageMarquee.svelte / LazyMount.svelte), so a real visitor never sees the
 * content until they scroll — and neither should a test that asserts on it.
 *
 * This walks the viewport down the whole page in one-screen steps, tripping every
 * IntersectionObserver along the way (each disconnects after firing once, so the
 * content stays mounted), then returns to the top. Call it after navigation and
 * before asserting on any lazily-mounted element.
 */
export async function revealLazyContent(page: Page): Promise<void> {
	await page.evaluate(async () => {
		await new Promise<void>((resolve) => {
			let y = 0;
			const step = () => {
				window.scrollTo(0, y);
				y += Math.floor(window.innerHeight * 0.9);
				if (y < document.body.scrollHeight) {
					requestAnimationFrame(step);
				} else {
					window.scrollTo(0, document.body.scrollHeight);
					// One more frame so the final IntersectionObserver callback fires.
					requestAnimationFrame(() => resolve());
				}
			};
			step();
		});
	});
	// Return to the top so subsequent scrollIntoView / visibility checks behave
	// as they would for a user who just landed on the page.
	await page.evaluate(() => window.scrollTo(0, 0));
}
