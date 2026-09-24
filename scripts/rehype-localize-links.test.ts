import { afterEach, describe, expect, it } from 'vitest';
import { localizeHref, rehypeLocalizeLinks } from './rehype-localize-links.mjs';

const table = {
	'/': '/de/',
	'/contact/': '/de/kontakt/',
	'/packages/eco/': '/de/pakete/eco/',
	'/blog/wedding-rentals/': '/de/blog/hochzeit-verleih/'
};

describe('localizeHref', () => {
	it('rewrites an English internal path published in the locale', () => {
		expect(localizeHref('/blog/wedding-rentals/', table)).toBe('/de/blog/hochzeit-verleih/');
		expect(localizeHref('/packages/eco/', table)).toBe('/de/pakete/eco/');
		expect(localizeHref('/', table)).toBe('/de/');
	});

	it('keeps the query and the fragment', () => {
		expect(localizeHref('/contact/#form', table)).toBe('/de/kontakt/#form');
		expect(localizeHref('/contact/?pack=eco', table)).toBe('/de/kontakt/?pack=eco');
	});

	it('accepts a path without its trailing slash', () => {
		expect(localizeHref('/contact', table)).toBe('/de/kontakt/');
	});

	it('rewrites absolute URLs of the site', () => {
		expect(localizeHref('https://malagaeventgear.com/blog/wedding-rentals/', table)).toBe('/de/blog/hochzeit-verleih/');
		expect(localizeHref('https://www.malagaeventgear.com/contact/', table)).toBe('/de/kontakt/');
	});

	it('leaves the English URL when the content is not published in the locale', () => {
		expect(localizeHref('/blog/not-translated/', table)).toBe('/blog/not-translated/');
		expect(localizeHref('https://malagaeventgear.com/blog/not-translated/', table)).toBe(
			'https://malagaeventgear.com/blog/not-translated/'
		);
	});

	it('leaves external links, anchors and other schemes alone', () => {
		for (const href of ['https://example.com/contact/', '#faq', 'mailto:a@b.c', 'tel:+34666346911', '']) {
			expect(localizeHref(href, table)).toBe(href);
		}
	});
});

describe('rehypeLocalizeLinks', () => {
	const shared = globalThis as typeof globalThis & { __megLocalizedLinks?: Record<string, Record<string, string>> };
	afterEach(() => delete shared.__megLocalizedLinks);

	const tree = () => ({
		type: 'root',
		children: [
			{ type: 'element', tagName: 'a', properties: { href: '/contact/' }, children: [] },
			{ type: 'element', tagName: 'a', properties: { href: '/blog/not-translated/' }, children: [] }
		]
	});
	const hrefs = (t: ReturnType<typeof tree>) => t.children.map((c) => c.properties.href);

	it('rewrites the links of a translated post, from the locale folder of the file', () => {
		shared.__megLocalizedLinks = { de: table };
		const t = tree();
		rehypeLocalizeLinks()(t, { filename: '/repo/src/content/blog/de/some-post.svx' });
		expect(hrefs(t)).toEqual(['/de/kontakt/', '/blog/not-translated/']);
	});

	it('never touches an English post', () => {
		shared.__megLocalizedLinks = { de: table };
		const t = tree();
		rehypeLocalizeLinks()(t, { filename: '/repo/src/content/blog/some-post.svx' });
		expect(hrefs(t)).toEqual(['/contact/', '/blog/not-translated/']);
	});

	it('leaves links as they are when the table is missing', () => {
		const t = tree();
		rehypeLocalizeLinks()(t, { filename: '/repo/src/content/blog/de/some-post.svx' });
		expect(hrefs(t)).toEqual(['/contact/', '/blog/not-translated/']);
	});
});
