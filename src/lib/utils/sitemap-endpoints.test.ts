import { describe, it, expect } from 'vitest';

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
		// Guards the guard: index + post + page + page per locale + category + author.
		expect(sitemaps.length).toBeGreaterThanOrEqual(6);
	});
});
