import { describe, expect, it } from 'vitest';
import { computeStatus, formatStatus, summarize } from './status';

const LOCALES = ['fr', 'de', 'zh-hk'];
const english = [
	{ slug: 'old-post', publishDate: '2026-01-01' },
	{ slug: 'new-post', publishDate: '2026-09-01' },
	{ slug: 'done-post', publishDate: '2026-05-01' }
];

describe('computeStatus', () => {
	it('lists, per incomplete post, the missing and the stale locales, oldest English post first', () => {
		const translated = {
			fr: ['old-post', 'done-post'],
			de: ['done-post'],
			'zh-hk': ['old-post', 'new-post', 'done-post']
		};
		const rows = computeStatus(english, translated, ['zh-hk/old-post', 'fr/done-post'], LOCALES);
		expect(rows).toEqual([
			{ slug: 'old-post', publishDate: '2026-01-01', missing: ['de'], stale: ['zh-hk'] },
			{ slug: 'done-post', publishDate: '2026-05-01', missing: [], stale: ['fr'] },
			{ slug: 'new-post', publishDate: '2026-09-01', missing: ['fr', 'de'], stale: [] }
		]);
	});

	it('is empty when everything is translated and fresh', () => {
		const all = Object.fromEntries(LOCALES.map((l) => [l, english.map((p) => p.slug)]));
		expect(computeStatus(english, all, [], LOCALES)).toEqual([]);
	});

	it('keeps the locale order of the site, not alphabetical', () => {
		const rows = computeStatus([english[0]], {}, [], LOCALES);
		expect(rows[0].missing).toEqual(['fr', 'de', 'zh-hk']);
	});
});

describe('summarize', () => {
	it('counts posts, locales, missing and stale pairs', () => {
		const rows = computeStatus(
			english,
			{ fr: ['old-post'], de: [], 'zh-hk': [] },
			['fr/old-post'],
			LOCALES
		);
		expect(summarize(english.length, LOCALES.length, rows)).toEqual({
			posts: 3,
			locales: 3,
			pairs: 9,
			missing: 8,
			stale: 1,
			incompletePosts: 3,
			complete: false
		});
	});
	it('is complete without missing or stale', () => {
		expect(summarize(77, 12, [])).toMatchObject({
			complete: true,
			missing: 0,
			stale: 0,
			pairs: 924
		});
	});
});

describe('formatStatus', () => {
	it('prints a table and a summary line', () => {
		const rows = computeStatus(
			english,
			{ fr: ['old-post'], de: [], 'zh-hk': [] },
			['fr/old-post'],
			LOCALES
		);
		const lines = formatStatus(rows, summarize(3, 3, rows));
		expect(lines[0]).toMatch(/^post\s+published\s+missing\s+stale$/);
		expect(lines.some((l) => l.startsWith('old-post'))).toBe(true);
		expect(lines.at(-1)).toBe('3 posts x 3 locales: 8 missing, 1 stale (3 posts incomplete)');
	});
	it('prints only the complete summary when nothing is pending', () => {
		expect(formatStatus([], summarize(77, 12, []))).toEqual([
			'complete: 77 posts x 12 locales, nothing missing or stale'
		]);
	});
});
