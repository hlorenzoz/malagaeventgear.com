import { describe, it, expect } from 'vitest';

/**
 * Guard against the dead legacy WordPress URL shape `malagaeventgear.com/home/...`.
 *
 * The pre-migration WordPress site served package pages under `/home/<slug>/`.
 * The current site serves them under `/packages/<slug>/` (see
 * `src/lib/data/packages.ts` -> `route`). A handful of blog posts still carry the
 * old absolute link from before the migration, and it 404s on the live site
 * (confirmed against `_redirects`: no rule rewrites `/home/*`).
 *
 * Scoped to this one dead path shape, not to absolute self-links in general:
 * `https://malagaeventgear.com/` alone (no `/home/` segment) is a legitimate,
 * live, intentional link used elsewhere in the same posts.
 */

const sources = import.meta.glob('../../content/blog/*.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const LEGACY_HOME_LINK = /malagaeventgear\.com\/home\//;

describe('no dead legacy /home/ links in blog content', () => {
	const offenders = Object.entries(sources)
		.filter(([, contents]) => LEGACY_HOME_LINK.test(contents))
		.map(([path]) => path.replace(/^.*\/content\/blog\//, ''));

	it('scans a meaningful number of posts', () => {
		expect(Object.keys(sources).length).toBeGreaterThan(50);
	});

	it('contains no `malagaeventgear.com/home/...` link in any post', () => {
		expect(
			offenders,
			`Dead legacy link found in: ${offenders.join(', ')}. Replace with the real ` +
				`/packages/<slug>/ route from src/lib/data/packages.ts.`
		).toEqual([]);
	});

	it('would actually catch a violation', () => {
		expect(LEGACY_HOME_LINK.test('[Wedding Pack](https://malagaeventgear.com/home/wedding-pack/)')).toBe(true);
		expect(LEGACY_HOME_LINK.test('[Malaga Event Gear](https://malagaeventgear.com/)')).toBe(false);
	});
});
