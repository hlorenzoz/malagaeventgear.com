import { describe, it, expect } from 'vitest';
import { siteConfig } from './site';
import { GMB_PROFILE_URL } from './testimonials';

/**
 * Guard for the Google Business Profile link: one source (`siteConfig.googleBusinessProfile`),
 * reused everywhere. Two different `share.google` short links and a hand copied one lived in
 * the code at the same time, which is why this fails the suite on any new hardcoded copy.
 *
 * Sources are read with `import.meta.glob`, like the other guards of this folder.
 * `src/content/**` is editorial copy and is not scanned.
 */

const sources = import.meta.glob('../../**/*.{ts,svelte}', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const PROFILE_URL = 'https://www.google.com/maps?cid=1378227528097734863';
const HARDCODED_PROFILE_LINK = /https:\/\/(share\.google\/|www\.google\.com\/maps\?cid=)/;

describe('Google Business Profile link', () => {
	it('is the Google Maps listing of the business', () => {
		expect(siteConfig.googleBusinessProfile).toBe(PROFILE_URL);
	});

	it('is the same link for the reviews section and llms.txt', () => {
		expect(GMB_PROFILE_URL).toBe(siteConfig.googleBusinessProfile);
	});

	it('is written only in site.ts', () => {
		const offenders = Object.entries(sources)
			.filter(([path]) => !path.includes('/content/'))
			.filter(([path]) => path !== './site.ts')
			.filter(([path]) => path !== './google-profile-link.test.ts')
			.filter(([, code]) => HARDCODED_PROFILE_LINK.test(code))
			.map(([path]) => path);
		expect(offenders).toEqual([]);
	});
});
