import { describe, expect, it } from 'vitest';
import { LOCALES, type Locale } from '$lib/i18n/locales';
import { TGE_APP_IMAGE, tgeUrl } from './partners';

/**
 * Top Group Express (TGE) partner block of the home page (task #T0076).
 *
 * The manifest is read with import.meta.glob, never node:fs (CLAUDE.md, tests that read
 * project files).
 */
const manifestRaw = Object.values(
	import.meta.glob('/scripts/migrate-wp/manifest.json', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>
)[0];

// The decision per locale. A locale added to LOCALES without a line here fails the suite:
// which TGE language version it links to is a decision, never a silent default.
const EXPECTED: Record<Locale, string> = {
	en: 'https://topgroupexpress.com/en',
	fr: 'https://topgroupexpress.com/fr',
	it: 'https://topgroupexpress.com/it',
	de: 'https://topgroupexpress.com/en',
	nl: 'https://topgroupexpress.com/en',
	'pt-pt': 'https://topgroupexpress.com/en',
	'pt-br': 'https://topgroupexpress.com/en',
	sv: 'https://topgroupexpress.com/en',
	da: 'https://topgroupexpress.com/en',
	nb: 'https://topgroupexpress.com/en',
	'zh-hans': 'https://topgroupexpress.com/zh',
	'zh-tw': 'https://topgroupexpress.com/zh',
	'zh-hk': 'https://topgroupexpress.com/zh'
};

function srcsetEntries(srcset: string): { url: string; descriptor: string }[] {
	return srcset.split(', ').map((entry) => {
		const [url, descriptor] = entry.split(' ');
		return { url, descriptor };
	});
}

describe('tgeUrl', () => {
	it('has a decision for every site locale', () => {
		expect(Object.keys(EXPECTED).sort()).toEqual([...LOCALES].sort());
	});

	it.each(LOCALES.map((locale) => [locale]))('%s links to its TGE language version', (locale) => {
		expect(tgeUrl(locale)).toBe(EXPECTED[locale]);
	});
});

describe('TGE_APP_IMAGE', () => {
	const webp = srcsetEntries(TGE_APP_IMAGE.webpSrcset);
	const avif = srcsetEntries(TGE_APP_IMAGE.avifSrcset);

	it('reads the image manifest', () => {
		expect(manifestRaw.length).toBeGreaterThan(0);
	});

	it('lists the same width ladder in WebP and AVIF', () => {
		const ladder = ['400w', '600w', '768w', '1024w', '1536w'];
		expect(webp.map((e) => e.descriptor)).toEqual(ladder);
		expect(avif.map((e) => e.descriptor)).toEqual(ladder);
	});

	it('uses the right extension in each srcset', () => {
		for (const { url } of webp) expect(url.endsWith('.webp')).toBe(true);
		for (const { url } of avif) expect(url.endsWith('.avif')).toBe(true);
	});

	it('serves every variant over https from the CDN, and the manifest lists each one', () => {
		for (const { url } of [...webp, ...avif, { url: TGE_APP_IMAGE.src }]) {
			expect(url.startsWith('https://cdn.malagaeventgear.com/blog/3107/')).toBe(true);
			// Quoted, so a prefix of a longer URL never counts as listed
			expect(manifestRaw.includes(`"${url}"`), `${url} is not in the manifest`).toBe(true);
		}
	});

	it('declares each width descriptor from the file name', () => {
		for (const { url, descriptor } of [...webp, ...avif]) {
			const width = url.match(/-(\d+)x\d+\.(?:webp|avif)$/)?.[1];
			expect(`${width}w`).toBe(descriptor);
		}
	});

	it('declares the intrinsic size of its src variant', () => {
		expect(TGE_APP_IMAGE.src).toBe(
			'https://cdn.malagaeventgear.com/blog/3107/tge-app-1024x642.webp'
		);
		expect(TGE_APP_IMAGE.src.endsWith(`-${TGE_APP_IMAGE.width}x${TGE_APP_IMAGE.height}.webp`)).toBe(
			true
		);
		expect(TGE_APP_IMAGE.width).toBe(1024);
		expect(TGE_APP_IMAGE.height).toBe(642);
	});

	it('declares the sizes of the two column layout', () => {
		expect(TGE_APP_IMAGE.sizes).toBe('(min-width: 1024px) 560px, calc(100vw - 2rem)');
	});
});
