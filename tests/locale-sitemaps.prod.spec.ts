import { test, expect, type APIRequestContext } from '@playwright/test';
import { PREFIXED_LOCALES } from '../src/lib/i18n/locales';

/**
 * Every locale's sitemaps list EXACTLY the pages the build published in that locale, as the
 * real Worker serves them (`bun run preview`). It runs against the build, not the dev server,
 * because the failure it guards only existed there: `/page-sitemap-de.xml` was answered from
 * the Cloudflare adapter's response cache with the list of a previous build, without
 * `/de/blog/` and `/de/blog/kategorien/`, while every unit test and the dev server were green.
 *
 * - Published pages: the build's own list of prerendered paths (the `prerendered` set of the
 *   adapter manifest the Worker is bundled with), minus the `noindex` ones. That covers pages,
 *   packages and, from Fase 4 on, the blog index, the categories page, each category page, the
 *   author page and each post of the locale.
 * - The locale's sitemaps (`page-`, `post-`, `category-`, `author-sitemap-<locale>.xml`)
 *   together list exactly that set: nothing published is missing, nothing unpublished listed.
 * - sitemap_index.xml lists exactly the sitemaps the build wrote, and each is served as a
 *   build file: no shared cache TTL (`s-maxage`) a runtime cache could keep past a deploy.
 * - Every sitemap URL answers 200 itself, not through a redirect.
 *
 * The build output is read through the manifest module and HTTP, not node:fs: the project does
 * not load the Node types on purpose (it runs on Workers) and `bun run check` covers tests/.
 */

const SITE = 'https://malagaeventgear.com';
// A variable specifier, so the type checker does not follow it into the server bundle.
const MANIFEST = new URL('../.svelte-kit/cloudflare-tmp/manifest.js', import.meta.url).href;

let prerendered: string[] = [];

test.beforeAll(async () => {
	try {
		prerendered = [...((await import(/* @vite-ignore */ MANIFEST)) as { prerendered: Set<string> }).prerendered];
	} catch {
		throw new Error('NEEDS BUILD: run `bun run build` (no .svelte-kit/cloudflare-tmp/manifest.js)');
	}
});

const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/** Decoded site path of an absolute sitemap URL. */
function sitePath(url: string): string {
	expect(url.startsWith(`${SITE}/`), `${url} is not on ${SITE}`).toBe(true);
	return decodeURI(new URL(url).pathname);
}

async function get(request: APIRequestContext, path: string) {
	return request.get(encodeURI(path), { maxRedirects: 0 });
}

/** The body of a sitemap, checked to be a build file the Worker's cache would not keep. */
async function sitemap(request: APIRequestContext, path: string): Promise<string> {
	const response = await get(request, path);
	expect(response.status(), path).toBe(200);
	expect(response.headers()['content-type'], path).toContain('xml');
	expect(response.headers()['cache-control'] ?? '', `${path} carries a shared cache TTL`).not.toMatch(/s-maxage/);
	return response.text();
}

/** Status of each path, in batches: hundreds of parallel requests make the preview drop connections. */
async function statuses(request: APIRequestContext, paths: string[]): Promise<Map<string, { status: number; body: string }>> {
	const result = new Map<string, { status: number; body: string }>();
	for (let i = 0; i < paths.length; i += 20) {
		await Promise.all(
			paths.slice(i, i + 20).map(async (path) => {
				const response = await get(request, path);
				result.set(path, { status: response.status(), body: response.status() === 200 ? await response.text() : '' });
			})
		);
	}
	return result;
}

test('sitemap_index.xml lists exactly the sitemaps the build wrote', async ({ request }) => {
	const built = prerendered.filter((path) => /-sitemap(-[a-z-]+)?\.xml$/.test(path)).sort();
	const listed = locs(await sitemap(request, '/sitemap_index.xml')).map(sitePath);
	expect([...listed].sort()).toEqual(built);
	for (const locale of PREFIXED_LOCALES) {
		expect(listed, `sitemap_index.xml lists no page sitemap for ${locale}`).toContain(`/page-sitemap-${locale}.xml`);
	}
	for (const path of listed) await sitemap(request, path);
});

for (const locale of PREFIXED_LOCALES) {
	test(`${locale}: its sitemaps list exactly its published pages, and each answers 200`, async ({ request }) => {
		const counts: Record<string, number> = {};
		const listed: string[] = [];
		for (const path of prerendered.filter((p) => p.endsWith(`-sitemap-${locale}.xml`))) {
			const urls = locs(await sitemap(request, path)).map(sitePath);
			counts[path.slice(1).replace(`-sitemap-${locale}.xml`, '')] = urls.length;
			listed.push(...urls);
		}
		expect(listed.length, `${locale}: a URL is listed twice`).toBe(new Set(listed).size);

		const pages = prerendered.filter((path) => path.startsWith(`/${locale}/`) && path.endsWith('/'));
		const served = await statuses(request, [...new Set([...pages, ...listed])]);
		const published = pages
			.filter((path) => !/<meta name="robots" content="[^"]*noindex/.test(served.get(path)?.body ?? ''))
			.sort();

		expect([...listed].sort(), `${locale}: sitemaps vs published pages`).toEqual(published);
		const failing = listed.filter((path) => served.get(path)?.status !== 200);
		expect(failing, `${locale}: sitemap URLs not answering 200`).toEqual([]);

		const summary = `${locale}: ${JSON.stringify(counts)} = ${listed.length} URLs (${pages.length} pages built)`;
		test.info().annotations.push({ type: 'counts', description: summary });
		console.log(summary);
	});
}
