import { describe, expect, it } from 'vitest';
import { breadcrumbLeaf, breadcrumbTrail } from './breadcrumbs';

/**
 * The last crumb is the page's real name, in the page language, in the visible breadcrumbs and
 * the BreadcrumbList JSON-LD alike: a post title, a package name, a category name (localized
 * from the content map, never the capitalized English slug on a German page).
 */
describe('breadcrumbLeaf', () => {
	it('uses the post title, the package name or the category name, in that order', () => {
		expect(breadcrumbLeaf({ post: { title: 'Hochzeit' } })).toBe('Hochzeit');
		expect(breadcrumbLeaf({ pkg: { name: 'Eco Pack' } })).toBe('Eco Pack');
		expect(breadcrumbLeaf({ categoryMeta: { name: 'Hochzeiten' } })).toBe('Hochzeiten');
		expect(breadcrumbLeaf({})).toBeUndefined();
		expect(breadcrumbLeaf(undefined)).toBeUndefined();
	});

	it('names a German category page by its German name', () => {
		const trail = breadcrumbTrail('/blog/category/weddings/', { leafName: breadcrumbLeaf({ categoryMeta: { name: 'Hochzeiten' } }) });
		expect(trail.at(-1)?.name).toBe('Hochzeiten');
	});
});
