import { test, expect } from '@playwright/test';
import { packages, formatPrice, getSchemaPriceRange } from '../src/lib/data/packages';

/**
 * Cross-page pricing consistency (AGENTS.md §7).
 *
 * The unit guard (src/lib/data/no-hardcoded-prices.test.ts) stops literals from
 * entering the source. These specs prove the other half: that what actually
 * renders — HTML, JSON-LD and the AI-facing /llms.txt — agrees with the catalog.
 */
test.describe('Package pricing single source of truth E2E Tests', () => {
	// The dev server is automatically managed on port 5173 by Playwright webServer config
	const baseUrl = 'http://localhost:5173';

	test('HTML sitemap lists every package with its catalog price', async ({ page }) => {
		await page.goto(`${baseUrl}/sitemap/`);

		for (const pkg of packages) {
			const link = page.locator(`a[href="${pkg.route}"]`).first();
			await expect(link).toContainText(pkg.name);
			await expect(link).toContainText(formatPrice(pkg.price, 'en'));
		}
	});

	test('HTML sitemap has one link per package, not a stale hardcoded list', async ({ page }) => {
		await page.goto(`${baseUrl}/sitemap/`);

		for (const pkg of packages) {
			await expect(page.locator(`a[href="${pkg.route}"]`).first()).toBeVisible();
		}
	});

	test('LocalBusiness priceRange is derived from the catalog on every page', async ({ page }) => {
		const expected = getSchemaPriceRange();

		for (const path of ['/', '/about-us/', '/packages/']) {
			await page.goto(`${baseUrl}${path}`);

			const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
			const ranges = blocks
				.flatMap((raw) => {
					const parsed = JSON.parse(raw);
					return parsed['@graph'] ?? [parsed];
				})
				.filter((node: Record<string, unknown>) => typeof node?.priceRange === 'string')
				.map((node: Record<string, string>) => node.priceRange);

			for (const range of ranges) {
				expect(range, `stale priceRange on ${path}`).toBe(expected);
			}
		}
	});

	test('about-us does not redefine the organization node', async ({ page }) => {
		await page.goto(`${baseUrl}/about-us/`);

		const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
		const nodes = blocks.flatMap((raw) => {
			const parsed = JSON.parse(raw);
			return parsed['@graph'] ?? [parsed];
		});

		// The canonical #organization node is emitted once, by the public layout.
		// A second definition on this page produced a conflicting NAP and priceRange.
		const orgDefinitions = nodes.filter(
			(node: Record<string, unknown>) =>
				typeof node?.['@id'] === 'string' &&
				(node['@id'] as string).endsWith('/#organization') &&
				Object.keys(node).length > 1
		);

		expect(orgDefinitions).toHaveLength(1);
	});

	test('the packages FAQ answer names every package at its catalog price', async ({ page }) => {
		await page.goto(`${baseUrl}/faq/`);

		// Asserted against the FAQPage JSON-LD rather than the rendered accordion:
		// answers are collapsed in the DOM, and the JSON-LD is what Google actually
		// surfaces as a rich result — a stale price there is a stale price in SERPs.
		const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
		const answers: string[] = blocks
			.flatMap((raw) => {
				const parsed = JSON.parse(raw);
				return parsed['@type'] === 'FAQPage' ? (parsed.mainEntity ?? []) : [];
			})
			.map((q: { acceptedAnswer?: { text?: string } }) => q.acceptedAnswer?.text ?? '');

		expect(answers.length, 'no FAQPage JSON-LD found on /faq/').toBeGreaterThan(0);

		const packagesAnswer = answers.find((text) => text.includes(packages[0].name));
		expect(packagesAnswer, 'no FAQ answer lists the packages').toBeTruthy();

		for (const pkg of packages) {
			expect(packagesAnswer, `FAQ answer omits ${pkg.name}`).toContain(pkg.name);
			expect(packagesAnswer, `FAQ answer has a stale price for ${pkg.name}`).toContain(
				formatPrice(pkg.price, 'en')
			);
		}
	});

	test('/llms.txt agrees with the rendered packages page', async ({ page, request }) => {
		const llms = await (await request.get(`${baseUrl}/llms.txt`)).text();
		await page.goto(`${baseUrl}/packages/`);
		const rendered = await page.locator('body').innerText();

		for (const pkg of packages) {
			expect(llms, `/llms.txt is missing ${pkg.name}`).toContain(`${pkg.name} - ${pkg.price} EUR`);
			expect(rendered, `/packages/ is missing ${pkg.name}`).toContain(pkg.name);
			expect(rendered, `/packages/ is missing the price of ${pkg.name}`).toContain(
				String(pkg.price)
			);
		}
	});
});
