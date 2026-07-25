import { describe, expect, it } from 'vitest';
import { gscTier, byGscTier } from './map-gsc-sort';
import type { SiloChild } from '$lib/data/site-map';

function kid(url: string, updated?: string): SiloChild {
	return { key: url, url, updated };
}

describe('gscTier', () => {
	it('tier 1: never updated', () => {
		expect(gscTier(kid('/blog/a/'), {})).toBe(1);
	});

	it('tier 0: updated, never marked', () => {
		expect(gscTier(kid('/blog/a/', '2026-06-01'), {})).toBe(0);
	});

	it('tier 0: updated, marked BEFORE the update (needs a fresh submission)', () => {
		const marked = { '/blog/a/': '2026-05-01' };
		expect(gscTier(kid('/blog/a/', '2026-06-01'), marked)).toBe(0);
	});

	it('tier 2: updated, marked AFTER the update', () => {
		const marked = { '/blog/a/': '2026-06-02' };
		expect(gscTier(kid('/blog/a/', '2026-06-01'), marked)).toBe(2);
	});
});

describe('byGscTier', () => {
	it('sorts needs-attention first, never-updated middle, handled last', () => {
		const handled = kid('/blog/handled/', '2026-06-01');
		const neverUpdated = kid('/blog/never/');
		const needsAttention = kid('/blog/needs/', '2026-06-01');
		const marked = { '/blog/handled/': '2026-06-02' };

		const sorted = [handled, neverUpdated, needsAttention].sort(byGscTier(marked));

		expect(sorted.map((k) => k.url)).toEqual([
			'/blog/needs/',
			'/blog/never/',
			'/blog/handled/'
		]);
	});

	it('falls back to the same ascending-by-date order within a tier', () => {
		const older = kid('/blog/older/', '2026-01-01');
		const newer = kid('/blog/newer/', '2026-06-01');

		const sorted = [newer, older].sort(byGscTier({}));

		expect(sorted.map((k) => k.url)).toEqual(['/blog/older/', '/blog/newer/']);
	});
});
