/**
 * Tests para la logica pura de avif-backfill.ts (sin sharp, sin fs, sin R2).
 * El orquestador corre solo tras `import.meta.main`.
 */
import { describe, it, expect } from 'vitest';
import { avifKeyFor, avifUrlFor, pickPending, applyAvif, propagateAvif } from './avif-backfill';
import type { Manifest, MediaEntry } from './migrate-wp/types';

const entry = (over: Partial<MediaEntry>): MediaEntry =>
	({
		wpId: 1,
		r2Key: 'blog/1/foto-400x267.webp',
		r2Url: 'https://cdn.malagaeventgear.com/blog/1/foto-400x267.webp',
		cdnUrl: 'https://cdn.malagaeventgear.com/blog/1/foto-400x267.webp',
		fileName: 'foto-400x267.webp',
		mimeType: 'image/webp',
		...over
	}) as MediaEntry;

const manifest = (entries: MediaEntry[]): Manifest =>
	({
		cdnBase: 'https://cdn.malagaeventgear.com',
		generatedAt: '',
		media: Object.fromEntries(entries.map((e) => [e.r2Key, e]))
	}) as unknown as Manifest;

describe('avifKeyFor', () => {
	it('keeps the same key and only swaps the extension', () => {
		expect(avifKeyFor('blog/1008/proyector-400x267.webp')).toBe('blog/1008/proyector-400x267.avif');
		expect(avifKeyFor('blog/3084/2026.05.20-PROGOLD-2.webp')).toBe('blog/3084/2026.05.20-PROGOLD-2.avif');
	});

	it('is case insensitive on the extension and refuses a non webp key', () => {
		expect(avifKeyFor('blog/1/a.WEBP')).toBe('blog/1/a.avif');
		expect(() => avifKeyFor('blog/1/a.jpg')).toThrow();
	});
});

describe('avifUrlFor', () => {
	it('builds the CDN url of the sibling avif', () => {
		expect(avifUrlFor('blog/1/foto-400x267.webp')).toBe(
			'https://cdn.malagaeventgear.com/blog/1/foto-400x267.avif'
		);
	});
});

describe('pickPending', () => {
	it('returns only webp entries with no avifUrl, in manifest order', () => {
		const a = entry({ r2Key: 'blog/1/a.webp' });
		const done = entry({ r2Key: 'blog/2/b.webp', avifUrl: 'https://x/blog/2/b.avif' });
		const png = entry({ r2Key: 'blog/3/c.png', mimeType: 'image/png' });
		const d = entry({ r2Key: 'blog/4/d.webp' });
		expect(pickPending(manifest([a, done, png, d])).map((e) => e.r2Key)).toEqual([
			'blog/1/a.webp',
			'blog/4/d.webp'
		]);
	});

	it('honours a limit and an id filter', () => {
		const list = [1, 2, 3].map((n) => entry({ wpId: n, r2Key: `blog/${n}/x.webp` }));
		expect(pickPending(manifest(list), { limit: 2 })).toHaveLength(2);
		expect(pickPending(manifest(list), { onlyId: 3 }).map((e) => e.wpId)).toEqual([3]);
	});
});

describe('duplicate r2Key entries (url key and path key in the manifest)', () => {
	it('applyAvif marks every entry that shares the r2Key', () => {
		const a = entry({ r2Key: 'blog/1/a.webp' });
		const dup = entry({ r2Key: 'blog/1/a.webp' });
		const m = manifest([a]);
		m.media['https://cdn.malagaeventgear.com/blog/1/a.webp'] = dup;
		applyAvif(m, 'blog/1/a.webp');
		expect(a.avifUrl).toBeDefined();
		expect(dup.avifUrl).toBeDefined();
	});

	it('pickPending returns an r2Key once and skips a key whose twin already has avif', () => {
		const a = entry({ r2Key: 'blog/1/a.webp' });
		const dup = entry({ r2Key: 'blog/1/a.webp' });
		const done = entry({ r2Key: 'blog/2/b.webp', avifUrl: 'https://x/blog/2/b.avif' });
		const doneTwin = entry({ r2Key: 'blog/2/b.webp' });
		const m = manifest([a, done]);
		m.media['https://cdn.malagaeventgear.com/blog/1/a.webp'] = dup;
		m.media['https://cdn.malagaeventgear.com/blog/2/b.webp'] = doneTwin;
		expect(pickPending(m).map((e) => e.r2Key)).toEqual(['blog/1/a.webp']);
	});
});

describe('propagateAvif', () => {
	it('copies avifUrl onto the twin entries of the same r2Key and reports how many changed', () => {
		const withAvif = entry({ r2Key: 'blog/1/a.webp', avifUrl: 'https://x/blog/1/a.avif' });
		const twin = entry({ r2Key: 'blog/1/a.webp' });
		const alone = entry({ r2Key: 'blog/2/b.webp' });
		const m = manifest([withAvif, alone]);
		m.media['https://cdn.malagaeventgear.com/blog/1/a.webp'] = twin;
		expect(propagateAvif(m)).toBe(1);
		expect(twin.avifUrl).toBe('https://x/blog/1/a.avif');
		expect(alone.avifUrl).toBeUndefined();
		expect(propagateAvif(m)).toBe(0);
	});
});

describe('applyAvif', () => {
	it('sets avifUrl on the webp entry and never adds an entry', () => {
		const a = entry({ r2Key: 'blog/1/a.webp' });
		const m = manifest([a]);
		applyAvif(m, 'blog/1/a.webp');
		expect(m.media['blog/1/a.webp'].avifUrl).toBe('https://cdn.malagaeventgear.com/blog/1/a.avif');
		expect(Object.keys(m.media)).toEqual(['blog/1/a.webp']);
	});
});
