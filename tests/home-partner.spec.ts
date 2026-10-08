import { test, expect } from '@playwright/test';

// Home page block about Top Group Express (TGE), the partner for group hotel bookings
// (task #T0076). The section is static: it is in the prerendered HTML, so no lazy mount has
// to be tripped before asserting on it.
const SECTION = '[data-testid="partner-tge"]';
const ENGLISH_TITLE = 'Hotel rooms for your group, with Top Group Express';
const TGE_LINKS = 'a[href*="topgroupexpress.com"]';

test.describe('Home partner section (Top Group Express)', () => {
	test.describe('English home', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
		});

		test('renders the section with its English title', async ({ page }) => {
			const section = page.locator(SECTION);
			await expect(section).toHaveCount(1);
			await section.scrollIntoViewIfNeeded();
			await expect(section).toBeVisible();

			const heading = section.locator('h2');
			await expect(heading).toHaveCount(1);
			await expect(heading).toHaveText(ENGLISH_TITLE);
		});

		test('has exactly one link, to the English TGE site, opened in a new tab', async ({ page }) => {
			const links = page.locator(SECTION).locator('a');
			await expect(links).toHaveCount(1);

			const link = links.first();
			await expect(link).toHaveAttribute('href', 'https://topgroupexpress.com/en');
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', /noopener/);
			// A partner with no payment: a plain link, never sponsored or nofollow
			await expect(link).not.toHaveAttribute('rel', /sponsored|nofollow/);
		});

		test('links to topgroupexpress.com only once on the whole page', async ({ page }) => {
			await expect(page.locator(TGE_LINKS)).toHaveCount(1);
		});

		test('gives the link a touch target of at least 44px', async ({ page }) => {
			const link = page.locator(SECTION).locator('a');
			await link.scrollIntoViewIfNeeded();
			const box = await link.boundingBox();
			expect(box).not.toBeNull();
			expect(box!.height).toBeGreaterThanOrEqual(44);
		});

		test('renders the app screenshot lazily, with alt text and intrinsic size', async ({
			page
		}) => {
			const image = page.locator(SECTION).locator('img');
			await expect(image).toHaveCount(1);
			await expect(image).toHaveAttribute('alt', /\S/);
			await expect(image).toHaveAttribute('width', '1024');
			await expect(image).toHaveAttribute('height', '642');
			await expect(image).toHaveAttribute('loading', 'lazy');

			const picture = page.locator(SECTION).locator('picture');
			await expect(picture.locator('source[type="image/avif"]')).toHaveCount(1);
			await expect(picture.locator('source[type="image/webp"]')).toHaveCount(1);
		});
	});

	test('German home links to the English TGE site and translates the title', async ({ page }) => {
		await page.goto('/de/');
		const section = page.locator(SECTION);
		await expect(section).toHaveCount(1);

		await expect(section.locator('a')).toHaveAttribute('href', 'https://topgroupexpress.com/en');
		const heading = section.locator('h2');
		await expect(heading).toHaveText(/\S/);
		await expect(heading).not.toHaveText(ENGLISH_TITLE);
		// The partner's name is never translated
		await expect(heading).toContainText('Top Group Express');
	});

	const localized = [
		{ path: '/fr/', href: 'https://topgroupexpress.com/fr' },
		{ path: '/it/', href: 'https://topgroupexpress.com/it' },
		{ path: '/zh-tw/', href: 'https://topgroupexpress.com/zh' }
	];

	for (const { path, href } of localized) {
		test(`${path} links to ${href}`, async ({ page }) => {
			await page.goto(path);
			const section = page.locator(SECTION);
			await expect(section).toHaveCount(1);
			await expect(section.locator('a')).toHaveAttribute('href', href);
			await expect(page.locator(TGE_LINKS)).toHaveCount(1);
			await expect(section.locator('h2')).not.toHaveText(ENGLISH_TITLE);
		});
	}
});
