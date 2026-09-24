import { describe, expect, it } from 'vitest';
import type { LocaleContentMap } from './content-map/schema';
import { buildRouteTable, englishPathOf, localizePath, type Availability } from './routing';
import { breadcrumbTrail } from './breadcrumbs';

const map: LocaleContentMap = {
	pages: {
		'/': { path: '/', keyword: 'k', status: 'propuesta' },
		'/about-us/': { path: '/ueber-uns/', keyword: 'k', status: 'propuesta' },
		'/packages/': { path: '/pakete/', keyword: 'k', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'k', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/kategorien/', keyword: 'k', status: 'propuesta' }
	},
	segments: { category: 'kategorie', author: 'autor' },
	packages: { wedding: { slug: 'hochzeit', keyword: 'k', status: 'propuesta' } },
	categories: { weddings: { slug: 'hochzeiten', name: 'Hochzeiten' } },
	posts: {
		'sound-system-rental': { slug: 'tonanlage-mieten', keyword: 'k', status: 'propuesta' },
		'not-yet-translated': { slug: 'noch-nicht', keyword: 'k', status: 'propuesta' }
	}
};

const published: Availability = {
	pages: true,
	posts: new Set(['sound-system-rental']),
	categories: new Set(['weddings']),
	authors: new Set(['hector-luis-lorenzo'])
};

const nothing: Availability = { pages: false, posts: new Set(), categories: new Set(), authors: new Set() };

describe('localizePath', () => {
	it('localizes static pages, packages, posts, categories and authors', () => {
		expect(localizePath('/', map, published)).toBe('/');
		expect(localizePath('/about-us/', map, published)).toBe('/ueber-uns/');
		expect(localizePath('/packages/wedding/', map, published)).toBe('/pakete/hochzeit/');
		expect(localizePath('/blog/sound-system-rental/', map, published)).toBe('/blog/tonanlage-mieten/');
		expect(localizePath('/blog/category/weddings/', map, published)).toBe('/blog/kategorie/hochzeiten/');
		expect(localizePath('/blog/author/hector-luis-lorenzo/', map, published)).toBe('/blog/autor/hector-luis-lorenzo/');
	});

	it('returns null for content that is mapped but not published in the locale', () => {
		expect(localizePath('/blog/not-yet-translated/', map, published)).toBeNull();
		expect(localizePath('/about-us/', map, nothing)).toBeNull();
		expect(localizePath('/packages/wedding/', map, nothing)).toBeNull();
	});

	it('does not publish blog listing pages in a locale without translated posts', () => {
		expect(localizePath('/blog/', map, { ...published, posts: new Set() })).toBeNull();
		expect(localizePath('/blog/categories/', map, { ...published, posts: new Set() })).toBeNull();
		expect(localizePath('/blog/', map, published)).toBe('/blog/');
	});

	it('returns null for unmapped routes', () => {
		expect(localizePath('/map/', map, published)).toBeNull();
		expect(localizePath('/packages/unknown/', map, published)).toBeNull();
	});
});

describe('buildRouteTable', () => {
	it('maps every published localized path back to its English route', () => {
		const table = buildRouteTable(map, published);
		expect(table.get('/ueber-uns/')).toBe('/about-us/');
		expect(table.get('/pakete/hochzeit/')).toBe('/packages/wedding/');
		expect(table.get('/blog/tonanlage-mieten/')).toBe('/blog/sound-system-rental/');
		expect(table.get('/blog/kategorie/hochzeiten/')).toBe('/blog/category/weddings/');
	});

	it('leaves out unpublished content and English slugs under the prefix', () => {
		const table = buildRouteTable(map, published);
		expect(table.has('/blog/noch-nicht/')).toBe(false);
		expect(table.has('/about-us/')).toBe(false);
	});

	it('never maps two English routes to the same localized path', () => {
		const table = buildRouteTable(map, published);
		const values = [...table.values()];
		expect(new Set(values).size).toBe(values.length);
	});
});

describe('englishPathOf', () => {
	it('rebuilds the English path from the route id and params', () => {
		expect(englishPathOf('/(public)', {})).toBe('/');
		expect(englishPathOf('/(public)/about-us', {})).toBe('/about-us/');
		expect(englishPathOf('/(public)/packages/[slug]', { slug: 'eco' })).toBe('/packages/eco/');
		expect(englishPathOf('/(public)/blog/category/[category]', { category: 'news' })).toBe('/blog/category/news/');
	});

	it('returns null without a route or with a missing param', () => {
		expect(englishPathOf(null, {})).toBeNull();
		expect(englishPathOf('/(public)/packages/[slug]', {})).toBeNull();
	});
});

describe('breadcrumbTrail', () => {
	it('names crumbs from the dictionary and localizes their paths', () => {
		const trail = breadcrumbTrail('/packages/wedding/', {
			names: { home: 'Startseite', packages: 'Pakete' },
			localize: (p) => `/de${localizePath(p, map, published)}`,
			leafName: 'Wedding Pack'
		});
		expect(trail).toEqual([
			{ name: 'Startseite', path: '/de/', navigable: true },
			{ name: 'Pakete', path: '/de/pakete/', navigable: true },
			{ name: 'Wedding Pack', path: '/de/pakete/hochzeit/', navigable: true }
		]);
	});

	it('keeps section segments without an index page as plain text', () => {
		const trail = breadcrumbTrail('/blog/category/news/');
		expect(trail.map((c) => c.navigable)).toEqual([true, true, false, true]);
	});

	it('falls back to the capitalized slug without a dictionary', () => {
		expect(breadcrumbTrail('/meet-the-team/').at(-1)?.name).toBe('Meet The Team');
	});
});
