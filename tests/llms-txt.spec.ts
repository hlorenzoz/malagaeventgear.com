import { test, expect } from '@playwright/test';
import { packages } from '../src/lib/data/packages';
import { siteConfig } from '../src/lib/data/site';

test.describe('llms.txt (llmstxt.org standard) E2E Tests', () => {
	// The dev server is automatically managed on port 5173 by Playwright webServer config
	const baseUrl = 'http://localhost:5173';

	test('should serve /llms.txt as plain text with the required spec structure', async ({
		request
	}) => {
		const response = await request.get(`${baseUrl}/llms.txt`);
		expect(response.status()).toBe(200);

		const contentType = response.headers()['content-type'];
		expect(contentType).toContain('text/plain');

		const text = await response.text();

		// Spec: H1 name first, then a blockquote summary.
		expect(text.startsWith(`# ${siteConfig.brandName}`)).toBe(true);
		expect(text).toMatch(/^> .+/m);

		// Every H2 section we commit to publishing.
		for (const heading of [
			'## Docs',
			'## Packages',
			'## Blog',
			'## Key Facts',
			'## Contact',
			'## Legal',
			'## Optional'
		]) {
			expect(text).toContain(heading);
		}
	});

	test('should derive every package price, capacity and URL from packages.ts', async ({
		request
	}) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();

		for (const pkg of packages) {
			// A stale price here is quoted to customers by AI assistants as fact.
			expect(text).toContain(`${pkg.name} - ${pkg.price} EUR`);
			expect(text).toContain(`${siteConfig.url}${pkg.route}`);
			if (pkg.maxGuests) {
				expect(text).toContain(`Up to ${pkg.maxGuests} guests.`);
			}
		}
	});

	test('should list every live blog category returned by the category sitemap', async ({
		request
	}) => {
		const llms = await (await request.get(`${baseUrl}/llms.txt`)).text();
		const sitemap = await (await request.get(`${baseUrl}/category-sitemap.xml`)).text();

		const categoryUrls = [...sitemap.matchAll(/<loc>([^<]*\/blog\/category\/[^<]*)<\/loc>/g)].map(
			(m) => m[1]
		);
		expect(categoryUrls.length).toBeGreaterThan(0);

		for (const url of categoryUrls) {
			expect(llms).toContain(url);
		}
	});

	test('should expose NAP and contact data consistent with siteConfig', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();

		expect(text).toContain(siteConfig.contactPhone);
		expect(text).toContain(siteConfig.displayAddress);
		expect(text).toContain(siteConfig.emails.hire);
		expect(text).toContain(siteConfig.emails.contact);
		expect(text).toContain(siteConfig.emails.legal);
		expect(text).toContain(String(siteConfig.foundingYear));
	});

	test('should use absolute trailing-slash URLs only, never relative paths', async ({
		request
	}) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();

		const linkTargets = [...text.matchAll(/^- \[[^\]]+\]\(([^)]+)\)/gm)].map((m) => m[1]);
		expect(linkTargets.length).toBeGreaterThan(10);

		for (const url of linkTargets) {
			// Absolute: a relative path in llms.txt is unresolvable for an AI crawler.
			expect(url.startsWith(`${siteConfig.url}/`)).toBe(true);
			// Trailing slash: the site canonicalises to it, so anything else is a redirect.
			const isFile = /\.[a-z0-9]+$/i.test(url);
			if (!isFile) {
				expect(url.endsWith('/')).toBe(true);
			}
		}
	});

	test('should be referenced from robots.txt and excluded from the XML sitemaps', async ({
		request
	}) => {
		const robots = await (await request.get(`${baseUrl}/robots.txt`)).text();
		expect(robots).toContain('llms.txt');

		// llms.txt is machine guidance, not indexable content — it must not pollute sitemaps.
		const pageSitemap = await (await request.get(`${baseUrl}/page-sitemap.xml`)).text();
		expect(pageSitemap).not.toContain('llms.txt');
	});
});
