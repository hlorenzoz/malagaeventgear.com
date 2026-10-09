import { test, expect } from '@playwright/test';

// Under every package CTA of a post there is a narrow strip of Google reviews (user request,
// 2026-10-08). It replaces the tall reviews block that used to close the post.
const POST = '/blog/sound-system-rental/';
const POST_DE = '/de/blog/';

test.describe('Reviews strip under the package CTAs of a post', () => {
	test('every package CTA carries the strip, with every review', async ({ page }) => {
		await page.goto(POST);
		const ctas = page.locator('[data-testid="post-cta"]');
		const count = await ctas.count();
		expect(count).toBeGreaterThanOrEqual(1);
		for (let i = 0; i < count; i++) {
			const strip = ctas.nth(i).locator('[data-testid="reviews-strip"]');
			await expect(strip).toHaveCount(1);
			expect(
				await strip.locator('[data-testid="testimonial-card"]').count()
			).toBeGreaterThanOrEqual(7);
		}
	});

	test('the strip is narrow and the tall reviews block is gone from the post', async ({ page }) => {
		await page.goto(POST);
		await expect(page.locator('[data-testid="testimonials"]')).toHaveCount(0);
		const strip = page.locator('[data-testid="reviews-strip"]').first();
		await strip.scrollIntoViewIfNeeded();
		const box = await strip.boundingBox();
		expect(box).not.toBeNull();
		expect(box!.height).toBeLessThan(260);
	});

	test('the reviews scroll sideways and do not widen the page', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 800 });
		await page.goto(POST);
		const track = page.locator('[data-testid="reviews-strip-track"]').first();
		await track.scrollIntoViewIfNeeded();
		const m = await track.evaluate((el) => ({
			scrolls: el.scrollWidth > el.clientWidth,
			pageOverflow: document.documentElement.scrollWidth > window.innerWidth
		}));
		expect(m.scrolls).toBe(true);
		expect(m.pageOverflow).toBe(false);
	});

	test('shows the Google rating and links to the Google profile', async ({ page }) => {
		await page.goto(POST);
		const strip = page.locator('[data-testid="reviews-strip"]').first();
		await expect(strip).toContainText(/Based on \d+ reviews/);
		const link = strip.locator('[data-testid="reviews-strip-link"]');
		await expect(link).toHaveAttribute(
			'href',
			'https://www.google.com/maps?cid=1378227528097734863'
		);
		await expect(link).toHaveAttribute('target', '_blank');
	});

	test('reviews are in the served HTML, in their original language', async ({ request }) => {
		const html = await (await request.get(POST)).text();
		expect(html).toContain('data-testid="reviews-strip"');
		expect(html).toContain('Anna Wisser');
		expect(html).toMatch(
			/data-testid="testimonial-text"[^>]*lang="es"|lang="es"[^>]*data-testid="testimonial-text"/
		);
	});

	test('a translated post keeps the reviews untranslated and translates the chrome', async ({
		page,
		request
	}) => {
		await page.goto(POST_DE);
		const href = await page.locator('article a[href^="/de/blog/"]').first().getAttribute('href');
		expect(href).toBeTruthy();
		const de = await (await request.get(href!)).text();
		const en = await (await request.get(POST)).text();
		expect(de).toContain('data-testid="reviews-strip"');
		expect(de).toContain('Anna Wisser');
		expect(de).toMatch(/Basierend auf \d+ Bewertungen/);
		const quote = (html: string) =>
			html.match(/data-testid="testimonial-text"[^>]*>([^<]{20,})/)?.[1];
		expect(quote(de)).toBe(quote(en));
	});
});
