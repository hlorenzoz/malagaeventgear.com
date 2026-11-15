import { test, expect, type Locator, type Page } from '@playwright/test';
import en from '../src/lib/i18n/messages/en';
import de from '../src/lib/i18n/messages/de';

/**
 * Light icons (S1): the footer renders a light and a dark logo and hides one with CSS. Only the
 * visible one is downloaded.
 */
test.describe('light favicon and logos (S1)', () => {
	test('the footer downloads only the logo of the current theme', async ({ page }) => {
		// Images only: in dev the logo modules are also requested as JS (`?import`) on the same path.
		const requested: string[] = [];
		page.on('request', (request) => {
			if (request.resourceType() === 'image') requested.push(new URL(request.url()).pathname);
		});
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/packages/');
		await page.waitForLoadState('networkidle');
		const visible = page.locator('footer img.brand-logo--light');
		await visible.scrollIntoViewIfNeeded();
		await expect
			.poll(() => visible.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
			.toBe(true);
		await page.waitForLoadState('networkidle');
		const hiddenSrc = await page.locator('footer img.brand-logo--dark').getAttribute('src');
		expect(hiddenSrc).toBeTruthy();
		// On the dark theme the header shows the light logo too, so the dark one is only the footer's.
		expect(requested).not.toContain(new URL(hiddenSrc!, page.url()).pathname);
	});
});

declare global {
	interface Window {
		__megEnhanced?: boolean;
		__navMarker?: number;
		__swRegistrations?: unknown[][];
	}
}

/** Waits for the enhancement script, which only runs on a direct load of a non hydrated page. */
async function waitForEnhance(page: Page): Promise<void> {
	await page.waitForFunction(() => window.__megEnhanced === true);
}

/** Opens /packages/ (hydrated) and clicks the header logo, a client side navigation to the home. */
async function clientNavigateToHome(page: Page): Promise<void> {
	await page.goto('/packages/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => (window.__navMarker = 1));
	await page.locator('header a[href="/"]').first().click();
	await page.waitForURL((url) => url.pathname === '/');
	await page.waitForLoadState('networkidle');
	// Same document: the marker survives only a client side navigation.
	expect(await page.evaluate(() => window.__navMarker)).toBe(1);
}

type Load = { name: string; open: (page: Page) => Promise<void>; messages: typeof en };

const LOADS: Load[] = [
	{
		name: 'direct load /',
		open: async (page) => {
			await page.goto('/');
			await waitForEnhance(page);
		},
		messages: en
	},
	{
		name: 'direct load /de/',
		open: async (page) => {
			await page.goto('/de/');
			await waitForEnhance(page);
		},
		messages: de
	},
	{ name: 'client navigation /', open: clientNavigateToHome, messages: en }
];

test.describe('home without hydration (S2, S3)', () => {
	for (const path of ['/', '/de/']) {
		test(`${path} ships no SvelteKit JS and loads the enhancement script`, async ({ request }) => {
			const html = await (await request.get(path)).text();
			expect(html).not.toContain('kit.start');
			expect(html).not.toMatch(/\/_app\/immutable\/(entry|chunks|nodes)\//);
			expect(html).not.toContain('modulepreload');
			expect(html).toMatch(/<script src="[^"]*enhance\.js[^"]*" defer><\/script>/);
		});
	}

	test('the enhancement script runs on a direct load and registers no service worker', async ({
		page
	}) => {
		await page.addInitScript(() => {
			window.__swRegistrations = [];
			if ('serviceWorker' in navigator) {
				ServiceWorkerContainer.prototype.register = function (...args: unknown[]) {
					window.__swRegistrations!.push(args);
					return new Promise(() => {});
				} as typeof ServiceWorkerContainer.prototype.register;
			}
		});
		await page.goto('/');
		await waitForEnhance(page);
		await page.waitForLoadState('load');
		expect(await page.evaluate(() => window.__swRegistrations)).toEqual([]);
	});

	test('the enhancement script does not run after client side navigation', async ({ page }) => {
		await clientNavigateToHome(page);
		await expect(page.locator('head script[src*="enhance"]')).toHaveCount(1);
		expect(await page.evaluate(() => window.__megEnhanced)).toBeUndefined();
	});
});

test.describe('header on the home (S3)', () => {
	for (const load of LOADS) {
		test(`${load.name}: theme toggle, mobile menu, header never hides`, async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 740 });
			await load.open(page);
			const html = page.locator('html');
			const toggle = page.locator('header [data-theme-toggle]');
			// Both header logos are in the HTML, CSS shows the one for the current theme.
			const logo = page.locator('header a[href] img:visible');
			for (let i = 0; i < 2; i++) {
				const next = (await html.getAttribute('data-theme')) === 'light' ? 'dark' : 'light';
				await toggle.click();
				await expect(html).toHaveAttribute('data-theme', next);
				expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(next);
				await expect(logo).toHaveCount(1);
				await expect(logo).toHaveClass(
					next === 'dark' ? /header-logo--light/ : /header-logo--dark/
				);
			}
			const button = page.locator('header [data-menu-toggle]');
			const panel = page.locator('#mobile-nav-panel');
			await expect(panel).toBeHidden();
			await button.click();
			await expect(button).toHaveAttribute('aria-expanded', 'true');
			await expect(panel.locator('a').first()).toBeVisible();
			await button.click();
			await expect(panel).toBeHidden();
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.waitForTimeout(150);
			await page.evaluate(() => window.scrollTo(0, 1200));
			await page.waitForTimeout(250);
			expect(
				await page
					.locator('header')
					.first()
					.evaluate((el) => (el as HTMLElement).style.transform)
			).toBe('translateY(0px)');
		});
	}
});

/**
 * Scrolls each card of a carousel into view and checks its box ends up inside the track: a card
 * pushed to the left of a centered, overflowing flex row can never be reached.
 */
async function expectEveryCardReachable(track: Locator, cardSelector: string): Promise<void> {
	const outside = await track.evaluate(async (el, selector) => {
		const bad: number[] = [];
		const cards = [...el.querySelectorAll<HTMLElement>(selector)];
		for (const [i, card] of cards.entries()) {
			card.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
			await new Promise((r) => requestAnimationFrame(r));
			const box = card.getBoundingClientRect();
			const area = el.getBoundingClientRect();
			if (box.left < area.left - 1 || box.right > area.right + 1) bad.push(i);
		}
		return { bad, count: cards.length };
	}, cardSelector);
	expect(outside.count).toBeGreaterThan(1);
	expect(outside.bad).toEqual([]);
}

/**
 * The arrows are shown while the track overflows: next scrolls it forward, prev scrolls it back.
 * The start state of prev is not asserted: a snap track rests on its first snap point, 8 px in.
 */
async function expectArrowsScroll(track: Locator, next: Locator, prev: Locator): Promise<void> {
	await expect(next).toBeVisible();
	await expect(prev).toBeVisible();
	const start = await track.evaluate((el) => el.scrollLeft);
	await next.click();
	await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(start + 50);
	await expect(prev).toBeEnabled();
	const forward = await track.evaluate((el) => el.scrollLeft);
	await prev.click();
	await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeLessThan(forward - 50);
}

test.describe('home pieces (S4, S5)', () => {
	for (const load of LOADS) {
		test(`${load.name}: FAQ opens and closes, one answer at a time`, async ({ page }) => {
			await load.open(page);
			const questions = page.locator('[data-faq-toggle]');
			expect(await questions.count()).toBeGreaterThan(1);
			const first = questions.nth(0);
			const second = questions.nth(1);
			const answer = (q: Locator) =>
				q.getAttribute('aria-controls').then((id) => page.locator(`#${id}`));
			await first.scrollIntoViewIfNeeded();
			await expect(await answer(first)).toBeHidden();
			await first.click();
			await expect(first).toHaveAttribute('aria-expanded', 'true');
			await expect(await answer(first)).toBeVisible();
			await second.click();
			await expect(second).toHaveAttribute('aria-expanded', 'true');
			await expect(await answer(second)).toBeVisible();
			await expect(first).toHaveAttribute('aria-expanded', 'false');
			await expect(await answer(first)).toBeHidden();
			await second.click();
			await expect(second).toHaveAttribute('aria-expanded', 'false');
			await expect(await answer(second)).toBeHidden();
		});

		for (const width of [1280, 390]) {
			test(`${load.name} at ${width}px: every package card is reachable and the arrows scroll`, async ({
				page
			}) => {
				await page.setViewportSize({ width, height: 900 });
				await load.open(page);
				const track = page.getByTestId('packages-carousel-track');
				await track.scrollIntoViewIfNeeded();
				await expect(track).toHaveClass(/overflow-x-auto/, { timeout: 15_000 });
				if (width === 390)
					await expectArrowsScroll(
						track,
						page.getByTestId('packages-carousel-next'),
						page.getByTestId('packages-carousel-prev')
					);
				await expectEveryCardReachable(track, '[data-testid="package-card"]');
			});

			test(`${load.name} at ${width}px: every review card is reachable and the arrows scroll`, async ({
				page
			}) => {
				await page.setViewportSize({ width, height: 900 });
				await load.open(page);
				const track = page.getByTestId('carousel-track');
				await track.scrollIntoViewIfNeeded();
				if (width === 390)
					await expectArrowsScroll(
						track,
						page.getByTestId('carousel-next'),
						page.getByTestId('carousel-prev')
					);
				await expectEveryCardReachable(track, '[data-testid="testimonial-card"]');
			});
		}

		test(`${load.name}: Read more expands a long review with the label of the page language`, async ({
			page
		}) => {
			await load.open(page);
			const card = page
				.locator('[data-testid="testimonial-card"]', {
					has: page.getByTestId('read-more')
				})
				.first();
			const toggle = card.getByTestId('read-more');
			const text = card.getByTestId('testimonial-text');
			await card.scrollIntoViewIfNeeded();
			await expect(toggle).toHaveText(load.messages.testimonials.readMore);
			await expect(text).toHaveClass(/line-clamp-4/);
			await toggle.click();
			await expect(card).toHaveAttribute('data-expanded', 'true');
			await expect(text).not.toHaveClass(/line-clamp-4/);
			await expect(toggle).toHaveText(load.messages.testimonials.readLess);
			await toggle.click();
			await expect(card).toHaveAttribute('data-expanded', 'false');
			await expect(text).toHaveClass(/line-clamp-4/);
			await expect(toggle).toHaveText(load.messages.testimonials.readMore);
		});

		test(`${load.name}: the latest posts rows scroll on mobile`, async ({ page }) => {
			await page.setViewportSize({ width: 390, height: 844 });
			await load.open(page);
			const rows = page.locator('section div[data-scroll-after-lcp]:not([data-testid])');
			await expect(rows).toHaveCount(2);
			for (const row of await rows.all()) {
				await row.scrollIntoViewIfNeeded();
				await expect(row).toHaveClass(/overflow-x-auto/, { timeout: 15_000 });
				const moved = await row.evaluate(async (el) => {
					el.scrollLeft = 200;
					await new Promise((r) => requestAnimationFrame(r));
					return el.scrollLeft;
				});
				expect(moved).toBeGreaterThan(0);
			}
		});

		test(`${load.name}: the gallery carousels mount their images near the viewport`, async ({
			page
		}) => {
			const marquees = page.locator('[data-marquee]');
			await load.open(page);
			await expect(marquees).toHaveCount(2);
			for (let i = 0; i < 2; i++) {
				await marquees.nth(i).evaluate((el) => el.scrollIntoView({ block: 'center' }));
				await expect(marquees.nth(i).locator('.marquee-item img').first()).toBeVisible();
			}
		});
	}

	test('direct load: the gallery carousels stay empty until they near the viewport', async ({
		page
	}) => {
		await page.goto('/');
		await waitForEnhance(page);
		await expect(page.locator('[data-marquee] .marquee-item img')).toHaveCount(0);
		await expect(page.locator('[data-marquee] template[data-marquee-track]')).toHaveCount(2);
	});
});

test.describe('hydrated pages keep their behaviour (S5)', () => {
	test('a hydrated page does not emit the gallery <template> fallback', async ({ request }) => {
		const html = await (await request.get('/packages/eco/')).text();
		expect(html).toContain('data-marquee');
		expect(html).not.toContain('data-marquee-track');
	});

	test('/meet-the-team/: reviews reachable, arrows and Read more work', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/meet-the-team/');
		await page.waitForLoadState('networkidle');
		const track = page.getByTestId('carousel-track');
		await track.scrollIntoViewIfNeeded();
		await expectArrowsScroll(
			track,
			page.getByTestId('carousel-next'),
			page.getByTestId('carousel-prev')
		);
		await expectEveryCardReachable(track, '[data-testid="testimonial-card"]');
		const toggle = page.getByTestId('read-more').first();
		await toggle.scrollIntoViewIfNeeded();
		await toggle.click();
		await expect(toggle).toHaveText(en.testimonials.readLess);
	});
});
