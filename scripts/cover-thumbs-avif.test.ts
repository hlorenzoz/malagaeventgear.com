/**
 * Guard: cover-thumbs.json `avifSrcset` mirrors the WebP `srcset` (same widths, same order),
 * every URL in it is the `avifUrl` the manifest recorded for that variant, and it only exists
 * when the whole ladder has AVIF. Regenerate with `bun scripts/gen-cover-thumbs.ts`.
 */
import { describe, it, expect } from 'vitest';
import coverThumbs from '../src/lib/data/cover-thumbs.json';
import manifest from './migrate-wp/manifest.json';

type Cover = { srcset?: string; avifSrcset?: string };
const covers = Object.entries(coverThumbs as Record<string, Cover>);
const avifUrls = new Set(
	Object.values((manifest as { media: Record<string, { avifUrl?: string }> }).media)
		.map((e) => e.avifUrl)
		.filter(Boolean)
);
const parse = (s: string) => s.split(', ').map((x) => x.split(' '));

describe('cover-thumbs.json avifSrcset', () => {
	it('exists for at least some covers (the AVIF backfill ran)', () => {
		expect(covers.filter(([, c]) => c.avifSrcset).length).toBeGreaterThan(20);
	});

	it.each(covers.filter(([, c]) => c.avifSrcset))('%s mirrors its WebP srcset', (url, c) => {
		const webp = parse(c.srcset ?? '');
		const avif = parse(c.avifSrcset as string);
		expect(
			avif.map((v) => v[1]),
			`${url} widths`
		).toEqual(webp.map((v) => v[1]));
		for (const [u] of avif) {
			expect(u.endsWith('.avif'), `${u} extension`).toBe(true);
			expect(avifUrls.has(u), `${u} is a manifest avifUrl`).toBe(true);
		}
	});
});
