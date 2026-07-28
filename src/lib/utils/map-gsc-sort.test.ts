import { describe, expect, it } from 'vitest';
import { gscTier, byGscTier } from './map-gsc-sort';
import type { SiloChild } from '$lib/data/site-map';

const NOW = new Date('2026-06-05T00:00:00Z');

function kid(url: string, updated?: string): SiloChild {
	return { key: url, url, updated };
}

describe('gscTier', () => {
	it('tier 1: never updated', () => {
		expect(gscTier(kid('/blog/a/'), {}, NOW)).toBe(1);
	});

	it('tier 0: updated within 7 days, never marked', () => {
		expect(gscTier(kid('/blog/a/', '2026-06-01'), {}, NOW)).toBe(0);
	});

	it('tier 1: updated OUTSIDE the 7-day window (e.g. months ago)', () => {
		expect(gscTier(kid('/blog/old/', '2025-12-18'), {}, NOW)).toBe(1);
		expect(gscTier(kid('/blog/old/', '2026-05-20'), {}, NOW)).toBe(1);
	});

	it('tier 0: updated within 7 days, marked BEFORE the update (needs a fresh submission)', () => {
		const marked = { '/blog/a/': '2026-05-30' };
		expect(gscTier(kid('/blog/a/', '2026-06-01'), marked, NOW)).toBe(0);
	});

	it('tier 2: updated within 7 days, marked AFTER the update', () => {
		const marked = { '/blog/a/': '2026-06-02' };
		expect(gscTier(kid('/blog/a/', '2026-06-01'), marked, NOW)).toBe(2);
	});
});

describe('byGscTier', () => {
	it('sorts needs-attention first, never-updated middle, handled last', () => {
		const handled = kid('/blog/handled/', '2026-06-01');
		const neverUpdated = kid('/blog/never/');
		const needsAttention = kid('/blog/needs/', '2026-06-01');
		const marked = { '/blog/handled/': '2026-06-02' };

		const sorted = [handled, neverUpdated, needsAttention].sort(byGscTier(marked, NOW));

		expect(sorted.map((k) => k.url)).toEqual([
			'/blog/needs/',
			'/blog/never/',
			'/blog/handled/'
		]);
	});

	it('falls back to the same ascending-by-date order within a tier', () => {
		const older = kid('/blog/older/', '2026-06-01');
		const newer = kid('/blog/newer/', '2026-06-04');

		const sorted = [newer, older].sort(byGscTier({}, NOW));

		expect(sorted.map((k) => k.url)).toEqual(['/blog/older/', '/blog/newer/']);
	});
});
