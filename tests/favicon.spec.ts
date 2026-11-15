import { test, expect } from '@playwright/test';

/**
 * Google asks for a square favicon of at least 8x8 px and recommends larger than 48x48
 * (.agents/context/seo/search/docs/appearance/favicon-in-search.md). The PNG favicon is 96x96.
 */
test.describe('favicon for Google Search', () => {
	test('/favicon.png is a 96x96 PNG', async ({ request }) => {
		const response = await request.get('/favicon.png');
		expect(response.status()).toBe(200);
		const body = await response.body();
		// PNG signature, then the IHDR chunk: width and height are big endian at bytes 16 and 20.
		expect(body.subarray(1, 4).toString('ascii')).toBe('PNG');
		expect(body.subarray(12, 16).toString('ascii')).toBe('IHDR');
		expect(body.readUInt32BE(16)).toBe(96);
		expect(body.readUInt32BE(20)).toBe(96);
	});

	test('the home links the PNG favicon with sizes="96x96"', async ({ request }) => {
		const html = await (await request.get('/')).text();
		const link = html.match(/<link[^>]*type="image\/png"[^>]*>/)?.[0] ?? '';
		expect(link).toContain('rel="icon"');
		expect(link).toContain('href="/favicon.png"');
		expect(link).toContain('sizes="96x96"');
	});
});
