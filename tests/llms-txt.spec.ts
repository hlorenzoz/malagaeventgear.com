import { test, expect } from '@playwright/test';
import { packages, withPrices } from '../src/lib/data/packages';
import { faqs } from '../src/lib/data/faq';
import reviews from '../src/lib/data/reviews.json' with { type: 'json' };
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
			'## Guides',
			'## Company News and Past Events',
			'## Frequently Asked Questions',
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

	test('should answer every FAQ from faq.ts, with catalog tokens rendered', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		for (const item of faqs) {
			expect(text).toContain(item.question);
			expect(text).toContain(withPrices(item.answer, 'en'));
		}
		// A raw token would be quoted to customers as is.
		expect(text).not.toMatch(/\{price:|\{vat\}|\{clients\}|\{packagesWithPrices\}/);
	});

	test('should price every optional extra from PRICE_POINTS', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		for (const pkg of packages) {
			for (const extra of pkg.optional ?? []) expect(text.toLowerCase()).toContain(withPrices(extra, 'en').toLowerCase());
		}
	});

	test('should list the five pillar guides of the blog', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		for (const slug of [
			'audio-visual-rental',
			'wedding-rentals',
			'audiovisual-equipment-rental-service',
			'event-technology-service',
			'stage-lighting-rental'
		]) {
			expect(text).toContain(`${siteConfig.url}/blog/${slug}/`);
		}
	});

	test('should list every News post, the only published source of past events', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		// CLAUDE.md, Posicionamiento rule 4: Experience comes only from the blog's News posts.
		for (const slug of [
			'7-years-of-support-for-neighborhood-council-community-meeting-in-malaga-spain',
			'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella',
			'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos',
			'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis',
			'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga',
			'news-malaga-event-gear-unveils-new-rebranded-website'
		]) {
			expect(text).toContain(`${siteConfig.url}/blog/${slug}/`);
		}
	});

	test('should separate the own inventory from what MEG sources through suppliers', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		// CLAUDE.md, Posicionamiento: two layers, and a hedge instead of a promise of availability.
		expect(text).toContain('Integral event solutions');
		expect(text).toContain('own inventory');
		expect(text).toContain('suppliers, if there is one');
		expect(text).toContain('quoted on request');
		expect(text).toContain('subcontracted partner');
	});

	test('should state the real Google rating and review count', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		expect(text).toContain(`${reviews.meta.averageRating} out of 5 from ${reviews.meta.totalCount} Google reviews`);
	});

	test('should not claim what MEG does not offer or publish', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		// No HD or laser projector, no deposits or cancellations FAQ (CLAUDE.md, Honestidad).
		expect(text).not.toMatch(/HD projector|laser projector|deposits|cancellations/i);
		expect(text).toContain('24/7');
	});

	test('should follow CLAUDE.md rule 12 punctuation', async ({ request }) => {
		const text = await (await request.get(`${baseUrl}/llms.txt`)).text();
		expect(text).not.toMatch(/[\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u00A0]/);
		expect(text).not.toMatch(/\w; \w/);
		// No English style hyphenated compounds in the prose written by the endpoint.
		expect(text).not.toMatch(/\b(all-inclusive|delivery-only|deep-dives|hands-on|write-ups|Wedding-specific|delivery-and-setup|Machine-readable|Human-readable)\b/i);
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
