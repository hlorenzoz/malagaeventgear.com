import { describe, it, expect } from 'vitest';
import { LOCALES } from './locales';
import type { Messages } from './messages/en';

/**
 * Guard for the "Our Impact in Numbers" cards of the home page. They used to be typed by hand
 * (`27+`, `2,500+`, `+95%`) and contradicted `siteConfig` and `/about-us/`. Every figure now
 * comes from a source: the founding year and the client count from `siteConfig`, the rating
 * and the review count from the Google reviews data.
 */

const dictionaries = import.meta.glob<{ default: Messages }>('./messages/*.ts', { eager: true });
const home = import.meta.glob('/src/routes/*/+page.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;
// The route group has parentheses, which a glob pattern reads as syntax: match by key instead.
const source = home['/src/routes/(public)/+page.svelte'];

describe('home impact cards', () => {
	it('carry no hand typed figure', () => {
		expect(source).toBeDefined();
		expect(source).not.toMatch(/>\s*27\+\s*</);
		expect(source).not.toMatch(/2,500\+/);
		expect(source).not.toMatch(/\+95%/);
	});

	it('read each figure from its source', () => {
		expect(source).toContain('siteConfig.foundingYear');
		expect(source).toContain('siteConfig.clientCount');
		expect(source).toContain('getReviewsMeta()');
	});

	it.each(LOCALES)('%s has the three labels with their tokens', (locale) => {
		const impact = dictionaries[`./messages/${locale}.ts`].default.impact;
		expect(impact.since).toContain('{year}');
		expect(impact.industry.length).toBeGreaterThan(0);
		expect(impact.clients.length).toBeGreaterThan(0);
		expect(impact.rating).toContain('{n}');
		expect(impact.rating).toContain('Google');
		expect(impact).not.toHaveProperty('satisfaction');
		expect(impact).not.toHaveProperty('years');
	});
});
