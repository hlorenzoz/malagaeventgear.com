import { test, expect } from '@playwright/test';

// /map has no auth and derives entirely from build-time content, so these specs mock the two
// dynamic endpoints it talks to (GET/POST /api/indexnow) rather than hitting a real D1 — the
// dev webServer here is `vite dev`, which doesn't provide Cloudflare platform bindings.
//
// `waitForLoadState('networkidle')` after every goto: /map is SSR'd, so its markup (and the
// IndexNow button) is present and "visible" to Playwright before Svelte's client bundle has
// finished hydrating and attaching event listeners. Clicking before that point is a silent
// no-op (a real DOM click with nothing listening yet) — the wait avoids that race.
//
// The IndexNow button only shows for nodes updated within the last few days (see
// map-indexnow-eligibility.ts). These specs target the audio-visual-rental PILLAR by its known
// href (see PILLAR_HREF/PILLAR_UPDATED below) rather than an arbitrary ".first()" match — both
// keeps the assertions meaningful and avoids the flakiness of a re-querying `.first()` after a
// DOM change, and (paired with a pinned clock) decouples the test from the real calendar date.
// Exhaustive coverage of the window/submission math itself lives in
// src/lib/utils/map-indexnow-eligibility.test.ts (pure function, no browser needed).

const PILLAR_HREF = '/blog/audio-visual-rental/';

// Must match `updatedDate` in src/content/blog/audio-visual-rental.svx. The button's
// eligibility window is 3 days from this date (map-indexnow-eligibility.ts) — pinning the
// browser clock to a fixed instant just inside that window means the test's pass/fail depends
// only on this constant matching the frontmatter, not on the REAL calendar date the test
// happens to run on. Without this, the test silently starts failing ~3 days after
// PILLAR_UPDATED with no actual regression (this was a confirmed code-review finding).
const PILLAR_UPDATED = '2026-07-24';
const FIXED_NOW = new Date(`${PILLAR_UPDATED}T12:00:00Z`);
FIXED_NOW.setUTCDate(FIXED_NOW.getUTCDate() + 1);

test.describe('/map — IndexNow submission button', () => {
	test('shows the button for a recently updated, never-submitted node and hides it after a successful submit', async ({
		page
	}) => {
		await page.clock.install({ time: FIXED_NOW });
		await page.route('**/api/indexnow', async (route) => {
			if (route.request().method() === 'GET') {
				return route.fulfill({ json: { ok: true, submissions: [] } });
			}
			return route.fulfill({ json: { ok: true } });
		});

		await page.goto('/map/');
		await page.waitForLoadState('networkidle');

		const indexNowBtn = page.locator(
			`a[href="${PILLAR_HREF}"] ~ span.kactions button[aria-label^="Submit to IndexNow"]`
		);

		await expect(indexNowBtn).toBeVisible();
		await indexNowBtn.click();
		await expect(indexNowBtn).toBeHidden();
	});

	test('does not show the button once GET /api/indexnow reports a fresh-enough submission', async ({
		page
	}) => {
		await page.clock.install({ time: FIXED_NOW });
		await page.route('**/api/indexnow', async (route) => {
			if (route.request().method() !== 'GET') return route.fulfill({ json: { ok: true } });
			return route.fulfill({
				json: {
					ok: true,
					submissions: [
						{
							url: `https://malagaeventgear.com${PILLAR_HREF}`,
							submittedAt: FIXED_NOW.toISOString(),
							contentUpdatedAt: PILLAR_UPDATED
						}
					]
				}
			});
		});

		await page.goto('/map/');
		await page.waitForLoadState('networkidle');

		const btn = page.locator(
			`a[href="${PILLAR_HREF}"] ~ span.kactions button[aria-label^="Submit to IndexNow"]`
		);
		await expect(btn).toHaveCount(0);
	});
});

test.describe('/map — manual GSC reorder', () => {
	test("clicking a kid's copy-URL button moves it down the list (marked handled)", async ({ page }) => {
		await page.route('**/api/indexnow', (route) => route.fulfill({ json: { ok: true, submissions: [] } }));

		await page.goto('/map/');
		await page.waitForLoadState('networkidle');

		const kids = page.locator('ul.kids').first().locator('li');
		const firstKid = kids.first();
		const firstHref = await firstKid.locator('a').getAttribute('href');

		await firstKid.locator('button[aria-label^="Copy URL"]').click();

		// Reorder is a synchronous client-side $derived driven by localStorage state, so once
		// the copy click resolves the new position is already reflected on next read.
		await expect
			.poll(async () => {
				const hrefs = await kids.locator('a').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
				return hrefs.indexOf(firstHref);
			})
			.toBeGreaterThan(0);
	});
});
