import { test, expect, type Page } from '@playwright/test';
import de from '../src/lib/i18n/data/de';
import deMap from '../src/lib/i18n/content-map/locales/de';

/**
 * Blog posts are not hydrated (`csr = false` in blog/[slug]/+page.ts): a direct load ships no
 * SvelteKit JS and one small script (src/lib/no-csr/post-enhance.js) drives the interactive
 * pieces from the server rendered markup. A post reached by client side navigation from a
 * hydrated page is rendered by Svelte instead, and there the script must not run.
 */

const POST = '/blog/audio-visual-rental-for-conferences/';

declare global {
	interface Window {
		__megPostEnhanced?: boolean;
		__navMarker?: number;
		__swRegistrations?: unknown[][];
	}
}

/**
 * Opens /blog/ (hydrated) and follows a link to `path` without a document reload: SvelteKit's
 * router intercepts clicks on any same origin anchor, so an injected link is a real client nav.
 */
async function clientNavigateToPost(page: Page, path = POST): Promise<void> {
	await page.goto('/blog/');
	await page.waitForLoadState('networkidle');
	await page.evaluate((href) => {
		window.__navMarker = 1;
		document
			.querySelector('main')!
			.insertAdjacentHTML('afterbegin', `<a id="client-nav-link" href="${href}">post</a>`);
	}, path);
	await page.locator('#client-nav-link').click();
	await page.waitForURL(`**${path}`);
	await page.waitForLoadState('networkidle');
	// Same document: the marker survives only a client side navigation.
	expect(await page.evaluate(() => window.__navMarker)).toBe(1);
}

test.describe('post without hydration (S1, S2)', () => {
	test('a post ships no SvelteKit JS', async ({ request }) => {
		const html = await (await request.get(POST)).text();
		expect(html).not.toContain('kit.start');
		expect(html).not.toMatch(/\/_app\/immutable\/(entry|chunks|nodes)\//);
		expect(html).not.toContain('modulepreload');
	});

	// No page of the site registers a service worker (verified on the baseline a0128d83), so a post
	// must not start doing it: one visit would install a Workbox precache over the whole site.
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
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await page.waitForLoadState('load');
		expect(await page.evaluate(() => window.__swRegistrations)).toEqual([]);
	});

	test('the enhancement script does not run after client side navigation', async ({ page }) => {
		await clientNavigateToPost(page);
		// The script tag reaches the page through {@html}, which never executes scripts.
		await expect(page.locator('head script[src*="post-enhance"]')).toHaveCount(1);
		expect(await page.evaluate(() => window.__megPostEnhanced)).toBeUndefined();
	});
});

/** Theme toggle (S3): flips data-theme, stores it under `theme`, shows the icon and logo that match. */
async function expectThemeToggle(page: Page): Promise<void> {
	const html = page.locator('html');
	const toggle = page.locator('header [data-theme-toggle]');
	const logo = page.locator('header img[data-logo-light]');
	for (let i = 0; i < 2; i++) {
		const next = (await html.getAttribute('data-theme')) === 'light' ? 'dark' : 'light';
		await toggle.click();
		await expect(html).toHaveAttribute('data-theme', next);
		expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(next);
		// The button offers the opposite theme: a sun on dark, a moon on light.
		await expect(
			toggle.locator(next === 'dark' ? '.theme-icon-light' : '.theme-icon-dark')
		).toBeVisible();
		await expect(
			toggle.locator(next === 'dark' ? '.theme-icon-dark' : '.theme-icon-light')
		).toBeHidden();
		const expectedLogo = await logo.getAttribute(
			next === 'dark' ? 'data-logo-light' : 'data-logo-dark'
		);
		await expect(logo).toHaveAttribute('src', expectedLogo!);
	}
}

/** Mobile menu (S3): the button opens and closes the panel and reports it with aria-expanded. */
async function expectMobileMenu(page: Page): Promise<void> {
	const button = page.locator('header [data-menu-toggle]');
	const panel = page.locator(`#${await button.getAttribute('aria-controls')}`);
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(panel).toBeHidden();
	await expect(button.locator('.menu-icon-open')).toBeVisible();
	await button.click();
	await expect(button).toHaveAttribute('aria-expanded', 'true');
	await expect(panel).toBeVisible();
	await expect(panel.locator('a').first()).toBeVisible();
	await expect(button.locator('.menu-icon-close')).toBeVisible();
	await expect(button.locator('.menu-icon-open')).toBeHidden();
	await button.click();
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(panel).toBeHidden();
}

/** Header transform after scrolling to `y` (the header hides with translateY(-100%)). */
async function headerTransformAfterScroll(page: Page, y: number): Promise<string> {
	await page.evaluate((top) => window.scrollTo(0, top), y);
	await page.waitForTimeout(200);
	return page
		.locator('header')
		.first()
		.evaluate((el) => (el as HTMLElement).style.transform);
}

async function expectHideOnScroll(page: Page): Promise<void> {
	await headerTransformAfterScroll(page, 0);
	expect(await headerTransformAfterScroll(page, 1200)).toBe('translateY(-100%)');
	expect(await headerTransformAfterScroll(page, 600)).toBe('translateY(0px)');
}

test.describe('header on a post (S3)', () => {
	test('direct load: theme toggle', async ({ page }) => {
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await expectThemeToggle(page);
	});

	test('direct load: follows a system color scheme change until a theme is saved', async ({
		page
	}) => {
		const html = page.locator('html');
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
		await expect(html).toHaveAttribute('data-theme', 'dark');
		await page.emulateMedia({ colorScheme: 'light' });
		await expect(html).toHaveAttribute('data-theme', 'light');
		await page.emulateMedia({ colorScheme: 'dark' });
		await expect(html).toHaveAttribute('data-theme', 'dark');
		// The toggle saves a theme: from then on the system is ignored, as in TopNavBar.
		await page.locator('header [data-theme-toggle]').click();
		await expect(html).toHaveAttribute('data-theme', 'light');
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.emulateMedia({ colorScheme: 'light' });
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.waitForTimeout(200);
		await expect(html).toHaveAttribute('data-theme', 'light');
	});

	test('direct load: mobile menu', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 740 });
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await expectMobileMenu(page);
	});

	test('direct load: header hides on scroll down and shows on scroll up', async ({ page }) => {
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await expectHideOnScroll(page);
	});

	test('client navigation: theme toggle, mobile menu and hide on scroll', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 740 });
		await clientNavigateToPost(page);
		await expectThemeToggle(page);
		await expectMobileMenu(page);
		await expectHideOnScroll(page);
	});

	test('hydrated home: theme toggle and mobile menu as before, header never hides', async ({
		page
	}) => {
		await page.setViewportSize({ width: 375, height: 740 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await expectThemeToggle(page);
		await expectMobileMenu(page);
		await headerTransformAfterScroll(page, 0);
		expect(await headerTransformAfterScroll(page, 1200)).toBe('translateY(0px)');
	});
});

/** Copy link: the button shows its "copied" state and tooltip, then reverts after 2 s. */
async function expectCopyLink(page: Page, testId: string, tooltip: string): Promise<void> {
	await page.evaluate(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: async (text: string) =>
					((window as unknown as { __copied: string }).__copied = text)
			},
			configurable: true
		});
	});
	const button = page.getByTestId(testId);
	await button.scrollIntoViewIfNeeded();
	await button.click();
	await expect(button.locator(tooltip)).toBeVisible();
	expect(await page.evaluate(() => (window as unknown as { __copied: string }).__copied)).toMatch(
		/^https:\/\/malagaeventgear\.com\/blog\//
	);
	await expect(button.locator(tooltip)).toBeHidden({ timeout: 4000 });
}

/** Sharing options: the mobile button opens the drawer, the close button closes it. */
async function expectShareDrawer(page: Page): Promise<void> {
	const fab = page.getByTestId('share-fab');
	await expect(fab).toHaveClass(/opacity-0/);
	await page.locator('[data-testid="testimonial-card"]').first().scrollIntoViewIfNeeded();
	await expect(fab).toHaveClass(/opacity-100/);
	await fab.click();
	const drawer = page.getByTestId('share-drawer-overlay');
	await expect(drawer).toBeVisible();
	await page.locator('.share-drawer-close').dispatchEvent('click');
	await expect(drawer).toBeHidden();
}

/** Desktop share bar: hidden while the top share bar is on screen, shown once it scrolls away. */
async function expectStickyShareBar(page: Page): Promise<void> {
	const sidebar = page.getByTestId('share-sidebar');
	await expect(sidebar).toHaveClass(/opacity-0/);
	await page.locator('[data-testid="testimonial-card"]').first().scrollIntoViewIfNeeded();
	await expect(sidebar).toHaveClass(/opacity-100/);
	await expect(sidebar).toHaveAttribute('aria-hidden', 'false');
	await page.evaluate(() => window.scrollTo(0, 0));
	await expect(sidebar).toHaveClass(/opacity-0/);
}

/** Table of contents: the link of the section on screen is marked active. */
async function expectTocHighlight(page: Page): Promise<void> {
	const links = page.locator('nav.toc-desktop a[href^="#"]');
	const href = await links.nth(3).getAttribute('href');
	await page
		.locator(href!)
		.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100));
	const link = page.locator(`nav.toc-desktop a[href="${href}"]`);
	await expect(link).toHaveClass(/toc-desktop-link--active/);
	await expect(link).toHaveAttribute('aria-current', 'true');
	await expect(page.locator('nav.toc-desktop a.toc-desktop-link--active')).toHaveCount(1);
}

/** Click to tweet: selecting body text shows the tweet button, clearing the selection hides it. */
async function expectClickToTweet(page: Page): Promise<void> {
	const tooltip = page.getByTestId('click-to-tweet-tooltip');
	await expect(tooltip).toBeHidden();
	await page.evaluate(() => {
		const text = document.querySelector('.prose p')!.firstChild!;
		const range = document.createRange();
		range.setStart(text, 0);
		range.setEnd(text, 30);
		getSelection()!.removeAllRanges();
		getSelection()!.addRange(range);
	});
	await expect(tooltip).toBeVisible();
	const [popup] = await Promise.all([
		page.waitForEvent('popup'),
		page.getByTestId('click-to-tweet-button').click()
	]);
	expect(popup.url()).toContain('intent/tweet');
	expect(popup.url()).toContain('url=https%3A%2F%2Fmalagaeventgear.com%2Fblog%2F');
	await expect(tooltip).toBeHidden();
}

/** Deferred gallery carousel: empty while far from the viewport, mounted when it nears it. */
async function expectDeferredMarquee(page: Page): Promise<{ src: string; alt: string }[]> {
	const marquee = page.locator('.prose .marquee-container').first();
	await expect(marquee.locator('.marquee-item img')).toHaveCount(0);
	await marquee.scrollIntoViewIfNeeded();
	await expect(marquee.locator('.marquee-item img').first()).toBeVisible();
	return marquee
		.locator('.marquee-item img')
		.evaluateAll((nodes) =>
			nodes.map((n) => ({ src: n.getAttribute('src') ?? '', alt: n.getAttribute('alt') ?? '' }))
		);
}

test.describe('post interactions (S4)', () => {
	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-write']);
	});

	test('direct load, desktop: copy link (top and sidebar), sticky share bar, table of contents, click to tweet', async ({
		page
	}) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await expectStickyShareBar(page);
		await expectCopyLink(page, 'copy-link-button', '.copy-tooltip');
		await page.locator('[data-testid="testimonial-card"]').first().scrollIntoViewIfNeeded();
		await expectCopyLink(page, 'copy-link-sidebar', '.copy-tooltip-sidebar');
		await expectTocHighlight(page);
		await page.evaluate(() => window.scrollTo(0, 0));
		await expectClickToTweet(page);
	});

	test('direct load, mobile: sharing options drawer', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		await expectShareDrawer(page);
	});

	test('client navigation, desktop: copy link, sticky share bar, table of contents, click to tweet', async ({
		page
	}) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await clientNavigateToPost(page);
		await expectStickyShareBar(page);
		await expectCopyLink(page, 'copy-link-button', '.copy-tooltip');
		await expectTocHighlight(page);
		await page.evaluate(() => window.scrollTo(0, 0));
		await expectClickToTweet(page);
	});

	test('client navigation, mobile: sharing options drawer', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await clientNavigateToPost(page);
		await expectShareDrawer(page);
	});
});

test.describe('reviews on a post (S5)', () => {
	test('direct load: every review is readable without JS (own scroll, nothing clamped behind a button)', async ({
		page
	}) => {
		await page.goto(POST);
		const texts = page.locator('[data-testid="reviews-strip"] [data-testid="testimonial-text"]');
		expect(await texts.count()).toBeGreaterThan(0);
		await expect(page.getByTestId('read-more')).toHaveCount(0);
		for (const overflow of await texts.evaluateAll((nodes) =>
			nodes.map((n) => getComputedStyle(n).overflowY)
		)) {
			expect(overflow).toBe('auto');
		}
	});
});

test.describe('gallery carousel on a post (S6)', () => {
	test('direct load: a deferred carousel mounts when it nears the viewport', async ({ page }) => {
		await page.goto(POST);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		const images = await expectDeferredMarquee(page);
		expect(images.length).toBeGreaterThan(0);
	});

	test('direct load: a translated post mounts its deferred carousel with the alt of its language', async ({
		page
	}) => {
		const slug = deMap.posts['audio-visual-rental-for-conferences']?.slug;
		await page.goto(`/de/blog/${slug}/`);
		await page.waitForFunction(() => window.__megPostEnhanced === true);
		const images = await expectDeferredMarquee(page);
		for (const { src, alt } of images)
			expect(alt, src).toBe(de.gallery[src as keyof typeof de.gallery]);
	});

	test('direct load: a server rendered carousel is in the HTML as before', async ({ request }) => {
		const html = await (
			await request.get('/blog/weather-considerations-for-outdoor-rentals/')
		).text();
		expect(html).toMatch(/class="marquee-item[^"]*"[^>]*>\s*<img/);
	});

	test('client navigation: a deferred carousel mounts when it nears the viewport', async ({
		page
	}) => {
		await clientNavigateToPost(page);
		const images = await expectDeferredMarquee(page);
		expect(images.length).toBeGreaterThan(0);
	});
});
