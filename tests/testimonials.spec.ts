import { test, expect } from '@playwright/test';
import { revealLazyContent } from './support/lazy';

// The reviews are part of the HTML the server sends, not content that only exists after
// JavaScript runs and the visitor scrolls: a crawler that does not scroll must still read them.
test.describe('Testimonials in the served HTML', () => {
	test('the home page HTML carries every review, in its original language', async ({ request }) => {
		const html = await (await request.get('/')).text();
		const cards = html.match(/data-testid="testimonial-card"/g) ?? [];
		expect(cards.length).toBeGreaterThanOrEqual(7);
		expect(html).toContain('Anna Wisser');
		expect(html).toContain('Ting Ting Yu');
		expect(html).toMatch(/<p[^>]*lang="es"/);
		expect(html).toMatch(/<p[^>]*lang="zh"/);
	});

	test('a translated home page quotes the same reviews, untranslated', async ({ request }) => {
		const en = await (await request.get('/')).text();
		const de = await (await request.get('/de/')).text();
		const quote = (html: string) =>
			html.match(/data-testid="testimonial-text"[^>]*>([^<]{20,})/)?.[1];
		expect(quote(de)).toBeDefined();
		expect(quote(de)).toBe(quote(en));
	});
});

// Section order on the home page (user request, 2026-10-09): pricing, then the client reviews,
// then the partner for group hotel bookings.
test.describe('Home page section order', () => {
	test('client reviews follow the pricing section and come before the partner section', async ({
		page
	}) => {
		await page.goto('/');
		const order = await page.evaluate(() => {
			const pricing = document.querySelector('[data-testid="packages-carousel-track"]');
			const reviews = document.querySelector('[data-testid="testimonials"]');
			const partner = document.querySelector('[data-testid="partner-tge"]');
			if (!pricing || !reviews || !partner) return null;
			const before = (a: Element, b: Element) =>
				Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
			return {
				pricingThenReviews: before(pricing, reviews),
				reviewsThenPartner: before(reviews, partner)
			};
		});
		expect(order).toEqual({ pricingThenReviews: true, reviewsThenPartner: true });
	});
});

test.describe('Testimonials Section (Google Reviews) E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		// The testimonials block is server rendered. Other below the fold sections of the
		// home page still mount lazily and change the page height, so walk the page once
		// before asserting on positions.
		await revealLazyContent(page);
	});

	test('should render the testimonials section below the fold on the home page', async ({
		page
	}) => {
		const section = page.locator('[data-testid="testimonials"]');
		await expect(section).toBeAttached();
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();
	});

	test('should display the aggregate rating block with the total review count', async ({
		page
	}) => {
		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		const meta = section.locator('[data-testid="reviews-meta"]');
		await expect(meta).toBeVisible();
		// Aggregate count from reviews.generated.json meta.totalCount = 8
		await expect(meta).toContainText('8');
	});

	test('should render one card per seeded testimonial', async ({ page }) => {
		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		const cards = section.locator('[data-testid="testimonial-card"]');
		// 7 text reviews are curated (the 8th Google review has media only, no text)
		await expect(cards).toHaveCount(7);

		// Authors from the curated data must be present
		await expect(section.getByText('Anna Wisser')).toBeVisible();
		await expect(section.getByText('Gines de Biedma')).toBeVisible();
		await expect(section.getByText('Dániel Gombár')).toBeVisible();
	});

	test('should expose the rating as an accessible label on each card', async ({ page }) => {
		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		const firstStars = section.locator('[data-testid="rating-stars"]').first();
		await expect(firstStars).toHaveAttribute('aria-label', /5/);
	});

	test('should expand and collapse a long review with the Read more toggle', async ({ page }) => {
		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		// The Dániel Gombár review is long enough to be clamped
		const card = section.locator('[data-testid="testimonial-card"]', {
			hasText: 'exceeded my expectations'
		});
		const toggle = card.locator('[data-testid="read-more"]');
		await expect(toggle).toBeVisible();

		await expect(card).toHaveAttribute('data-expanded', 'false');
		await toggle.click();
		await expect(card).toHaveAttribute('data-expanded', 'true');
		await toggle.click();
		await expect(card).toHaveAttribute('data-expanded', 'false');
	});

	test('should link "See all reviews" to the Google My Business profile', async ({ page }) => {
		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		const seeAll = section.locator('[data-testid="see-all-reviews"]');
		await expect(seeAll).toBeVisible();
		await expect(seeAll).toHaveAttribute(
			'href',
			'https://www.google.com/maps?cid=1378227528097734863'
		);
		await expect(seeAll).toHaveAttribute('target', '_blank');
	});

	test('should advance the carousel with the next control', async ({ page }) => {
		// Force a narrow viewport so the track overflows and scrolling is meaningful
		// (on wide desktops the seed cards fit without overflow).
		await page.setViewportSize({ width: 390, height: 800 });

		const section = page.locator('[data-testid="testimonials"]');
		await section.scrollIntoViewIfNeeded();

		const next = section.locator('[data-testid="carousel-next"]');
		const prev = section.locator('[data-testid="carousel-prev"]');
		await expect(next).toBeVisible();
		await expect(prev).toBeVisible();

		const track = section.locator('[data-testid="carousel-track"]');
		// Guard: the track must actually be scrollable for this assertion to be valid.
		const scrollable = await track.evaluate((el) => el.scrollWidth > el.clientWidth);
		expect(scrollable).toBe(true);

		const before = await track.evaluate((el) => el.scrollLeft);
		await next.click();
		// Allow the smooth scroll to settle
		await page.waitForTimeout(600);
		const after = await track.evaluate((el) => el.scrollLeft);
		expect(after).toBeGreaterThan(before);
	});
});
