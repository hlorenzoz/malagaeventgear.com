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

	describe('a section of another post (English fragment)', () => {
		const ids = { '/blog/wedding-rentals/': { 'what-we-dont-offer': 'was-wir-nicht-anbieten', lighting: 'beleuchtung' } };

		it('maps the English heading id to the translated one when the post is published in the locale', () => {
			expect(localizeHref('/blog/wedding-rentals/#what-we-dont-offer', table, ids)).toBe('/de/blog/hochzeit-verleih/#was-wir-nicht-anbieten');
			expect(localizeHref('https://malagaeventgear.com/blog/wedding-rentals/#lighting', table, ids)).toBe(
				'/de/blog/hochzeit-verleih/#beleuchtung'
			);
			expect(localizeHref('/blog/wedding-rentals#lighting', table, ids)).toBe('/de/blog/hochzeit-verleih/#beleuchtung');
			expect(localizeHref('/blog/wedding-rentals/?a=1#lighting', table, ids)).toBe('/de/blog/hochzeit-verleih/?a=1#beleuchtung');
		});

		it('keeps the fragment when it is not an English heading of that post, or the post has no id map', () => {
			expect(localizeHref('/blog/wedding-rentals/#unknown', table, ids)).toBe('/de/blog/hochzeit-verleih/#unknown');
			expect(localizeHref('/contact/#form', table, ids)).toBe('/de/kontakt/#form');
			expect(localizeHref('/blog/wedding-rentals/#lighting', table)).toBe('/de/blog/hochzeit-verleih/#lighting');
		});

		it('never maps a post that is not published in the locale (its page is English)', () => {
			const stale = { '/blog/not-translated/': { lighting: 'beleuchtung' } };
			expect(localizeHref('/blog/not-translated/#lighting', table, stale)).toBe('/blog/not-translated/#lighting');
		});
	});

	it('leaves external links, anchors and other schemes alone', () => {
		for (const href of ['https://example.com/contact/', '#faq', 'mailto:a@b.c', 'tel:+34666346911', '']) {
			expect(localizeHref(href, table)).toBe(href);
		}
	});
});

describe('rehypeLocalizeLinks', () => {
	const shared = globalThis as typeof globalThis & {
		__megLocalizedLinks?: Record<string, Record<string, string>>;
		__megHeadingIds?: Record<string, Record<string, Record<string, string>>>;
	};
	afterEach(() => {
		delete shared.__megLocalizedLinks;
		delete shared.__megHeadingIds;
	});

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

	it('maps a section fragment with the heading ids of the locale', () => {
		shared.__megLocalizedLinks = { de: table };
		shared.__megHeadingIds = { de: { '/blog/wedding-rentals/': { lighting: 'beleuchtung' } } };
		const t = { type: 'root', children: [{ type: 'element', tagName: 'a', properties: { href: '/blog/wedding-rentals/#lighting' }, children: [] }] };
		rehypeLocalizeLinks()(t, { filename: '/repo/src/content/blog/de/some-post.svx' });
		expect(t.children[0].properties.href).toBe('/de/blog/hochzeit-verleih/#beleuchtung');
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
