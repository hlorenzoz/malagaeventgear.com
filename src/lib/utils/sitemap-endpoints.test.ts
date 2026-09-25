import { describe, it, expect } from 'vitest';
import { SITEMAP_HEADERS } from './sitemap';

/**
 * Guard for the XML sitemap endpoints (`src/routes/**\/*sitemap*\/+server.ts`).
 *
 * Every sitemap builds its URLs from `siteConfig.url` and answers with the shared
 * `SITEMAP_HEADERS`. Every `<urlset>` sitemap renders through `urlsetXml()`. Four endpoints
 * used to repeat the domain, the headers and the XML by hand: a domain change (or a staging
 * host) would have left them pointing at the old site while every other URL moved.
 *
 * Sources are read with Vite's `import.meta.glob`, same pattern as `no-hardcoded-prices.test.ts`.
 * The glob cannot contain the `(public)` group (picomatch reads the parentheses as an extglob),
 * so it scans every `+server.ts` and keeps the sitemap ones.
 */

const sources = import.meta.glob('../../routes/**/+server.ts', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const sitemaps = Object.entries(sources)
	.filter(([path]) => /sitemap[^/]*\.xml\/\+server\.ts$/.test(path))
	.map(([path, contents]) => [path.replace(/^(\.\.\/)+/, ''), contents] as const);

/** The index is a `<sitemapindex>`, not a `<urlset>`, so it is the one file without urlsetXml. */
const isIndex = (path: string) => path.includes('sitemap_index.xml');

describe('XML sitemap endpoints share one source for domain, headers and markup', () => {
	it.each(sitemaps.map(([path]) => path))('%s has no hardcoded site URL', (path) => {
		const contents = sitemaps.find(([p]) => p === path)?.[1] ?? '';
		expect(contents, `${path}: build URLs from siteConfig.url`).not.toMatch(/https:\/\/malagaeventgear\.com/);
	});

	it.each(sitemaps.map(([path]) => path))('%s answers with SITEMAP_HEADERS', (path) => {
		const contents = sitemaps.find(([p]) => p === path)?.[1] ?? '';
		expect(contents, `${path}: import SITEMAP_HEADERS from $lib/utils/sitemap`).toContain('SITEMAP_HEADERS');
	});

	it.each(sitemaps.filter(([path]) => !isIndex(path)).map(([path]) => path))(
		'%s renders through urlsetXml()',
		(path) => {
			const contents = sitemaps.find(([p]) => p === path)?.[1] ?? '';
			expect(contents, `${path}: render the <urlset> with urlsetXml()`).toContain('urlsetXml(');
		}
	);

	it('scans every sitemap endpoint', () => {
		// Guards the guard: index + post + page + category + author, English and per locale.
		expect(sitemaps.length).toBeGreaterThanOrEqual(9);
	});
});

/**
 * A sitemap served by the Worker at runtime goes through the Cloudflare adapter's response
 * cache (worktop `caches.default`): the Worker answers from the cache BEFORE routing, and a
 * deploy does not purge it. With `s-maxage=86400` a sitemap kept the URLs of the previous
 * build for up to a day after every push (in `wrangler pages dev` the cache even persists on
 * disk in `.wrangler/state`): `/page-sitemap-de.xml` served the list of 2026-09-24, without
 * `/de/blog/`, a day after the German blog was published. Sitemaps are a function of the
 * build, so they are built with it: prerendered, served as static files like every page.
 */
describe('XML sitemaps are built with the site, never served from a runtime cache', () => {
	it.each(sitemaps.map(([path]) => path))('%s is prerendered', (path) => {
		const contents = sitemaps.find(([p]) => p === path)?.[1] ?? '';
		expect(contents, `${path}: export const prerender = true`).toMatch(/^export const prerender = true;$/m);
	});

	it.each(sitemaps.filter(([path]) => path.includes('[locale=locale]')).map(([path]) => path))(
		'%s builds exactly the locales that publish it',
		(path) => {
			const contents = sitemaps.find(([p]) => p === path)?.[1] ?? '';
			const kind = path.match(/(page|post|category|author)-sitemap-\[locale=locale\]/)?.[1];
			expect(contents, `${path}: entries from localesWithSitemap('${kind}')`).toContain(
				`localesWithSitemap('${kind}')`
			);
			expect(contents).toMatch(/^export const entries: EntryGenerator/m);
		}
	);

	it('lists the locale sitemaps in sitemap_index.xml from the same source the prerender builds', () => {
		const contents = sitemaps.find(([p]) => isIndex(p))?.[1] ?? '';
		expect(contents).toContain('localeSitemapFiles()');
	});

	it('never lets a shared cache keep a sitemap past the deploy that built it', () => {
		const cacheControl = SITEMAP_HEADERS['Cache-Control'];
		expect(cacheControl).not.toMatch(/s-maxage/);
		expect(cacheControl).toMatch(/max-age=0\b/);
	});
});
