import { test, expect, type Locator, type Page } from '@playwright/test';
import en from '../src/lib/i18n/messages/en';
import de from '../src/lib/i18n/messages/de';

/**
 * Blog listings without hydration (odd/tasks/blog-listing-no-csr.md): `/blog/`, a category, the
 * author page and `/blog/categories/` ship no SvelteKit JS. Their interactive pieces run from
 * src/lib/no-csr/enhance.js on a direct load, and from Svelte after a client side navigation.
 */

declare global {
	interface Window {
		__megEnhanced?: boolean;
		__navMarker?: number;
	}
}

const LISTINGS = [
	'/blog/',
	'/de/blog/',
	'/blog/category/events/',
	'/blog/author/hector-luis-lorenzo/',
	'/blog/categories/'
];

/** Waits for the enhancement script, which only runs on a direct load of a non hydrated page. */
async function waitForEnhance(page: Page): Promise<void> {
	await page.waitForFunction(() => window.__megEnhanced === true);
}

/** Opens /packages/ (hydrated) and clicks the footer blog link, a client side navigation. */
async function clientNavigateToBlog(page: Page): Promise<void> {
	await page.goto('/packages/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => (window.__navMarker = 1));
	await page.locator('footer a[href="/blog/"]').first().click();
	await page.waitForURL((url) => url.pathname === '/blog/');
	await page.waitForLoadState('networkidle');
	// Same document: the marker survives only a client side navigation.
	expect(await page.evaluate(() => window.__navMarker)).toBe(1);
}

type Load = { name: string; open: (page: Page) => Promise<void> };

function directLoad(path: string): Load {
	return {
		name: `direct load ${path}`,
		open: async (page) => {
			await page.goto(path);
			await waitForEnhance(page);
		}
	};
}

const CLIENT_NAV: Load = { name: 'client navigation /blog/', open: clientNavigateToBlog };

test.describe('blog listings without hydration (S1, S2)', () => {
	for (const path of LISTINGS) {
		test(`${path} ships no SvelteKit JS and loads the enhancement script`, async ({ request }) => {
			const html = await (await request.get(path)).text();
			expect(html).not.toContain('kit.start');
			expect(html).not.toMatch(/\/_app\/immutable\/(entry|chunks|nodes)\//);
			expect(html).not.toContain('modulepreload');
			// Hide on scroll stays posts only: listings do not tag the script.
			expect(html).toMatch(/<script src="[^"]*enhance\.js[^"]*" defer><\/script>/);
			expect(html).not.toContain('data-hide-header-on-scroll');
		});
	}

	test('/blog/ keeps its head SEO (canonical, hreflang, Open Graph, JSON-LD)', async ({
		request
	}) => {
		const html = await (await request.get('/blog/')).text();
		const count = (pattern: RegExp) => (html.match(pattern) ?? []).length;
		// Counts measured on the hydrated build of 9eacac93, before csr = false.
		expect(count(/rel="canonical"/g)).toBe(1);
		expect(count(/hreflang=/g)).toBe(43);
		expect(count(/property="og:/g)).toBe(23);
		expect(count(/name="twitter:/g)).toBe(5);
		expect(count(/application\/ld\+json/g)).toBe(4);
		expect(html).toContain('"CollectionPage"');
	});

	test('the enhancement script does not run after client side navigation', async ({ page }) => {
		await clientNavigateToBlog(page);
		await expect(page.locator('head script[src*="enhance"]')).toHaveCount(1);
		expect(await page.evaluate(() => window.__megEnhanced)).toBeUndefined();
	});
});

test.describe('header on the blog listings (S2, S3)', () => {
	for (const load of [...LISTINGS.map(directLoad), CLIENT_NAV]) {
		test(`${load.name}: theme toggle, mobile menu, header never hides`, async ({ page }) => {
			await page.setViewportSize({ width: 390, height: 844 });
			await load.open(page);
			const html = page.locator('html');
			const toggle = page.locator('header [data-theme-toggle]');
			// Two clicks: if both Svelte and the script handled a click, the theme would not flip.
			for (let i = 0; i < 2; i++) {
				const next = (await html.getAttribute('data-theme')) === 'light' ? 'dark' : 'light';
				await toggle.click();
				await expect(html).toHaveAttribute('data-theme', next);
				expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(next);
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
 * The arrows are shown while the track overflows: next scrolls it forward, prev scrolls it back.
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

test.describe('reviews on /blog/ (S2, S3)', () => {
	const loads: { load: Load; messages: typeof en }[] = [
		{ load: directLoad('/blog/'), messages: en },
		{ load: directLoad('/de/blog/'), messages: de },
		{ load: CLIENT_NAV, messages: en }
	];
	for (const { load, messages } of loads) {
		test(`${load.name}: review arrows scroll at 390px`, async ({ page }) => {
			await page.setViewportSize({ width: 390, height: 844 });
			await load.open(page);
			const track = page.getByTestId('carousel-track');
			await track.scrollIntoViewIfNeeded();
			await expectArrowsScroll(
				track,
				page.getByTestId('carousel-next'),
				page.getByTestId('carousel-prev')
			);
		});

		test(`${load.name}: Read more expands a long review with the label of the page language`, async ({
			page
		}) => {
			await load.open(page);
			const card = page
				.locator('[data-testid="testimonial-card"]', { has: page.getByTestId('read-more') })
				.first();
			const toggle = card.getByTestId('read-more');
			const text = card.getByTestId('testimonial-text');
			await card.scrollIntoViewIfNeeded();
			await expect(toggle).toHaveText(messages.testimonials.readMore);
			await expect(text).toHaveClass(/line-clamp-4/);
			await toggle.click();
			await expect(card).toHaveAttribute('data-expanded', 'true');
			await expect(text).not.toHaveClass(/line-clamp-4/);
			await expect(toggle).toHaveText(messages.testimonials.readLess);
			await toggle.click();
			await expect(card).toHaveAttribute('data-expanded', 'false');
			await expect(toggle).toHaveText(messages.testimonials.readMore);
		});
	}
});
