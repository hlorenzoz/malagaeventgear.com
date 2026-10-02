import { describe, expect, it } from 'vitest';
import { computeStatus, findStructureProblems, formatStatus, summarize } from './status';

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
			{ slug: 'old-post', publishDate: '2026-01-01', missing: ['de'], stale: ['zh-hk'], structure: [] },
			{ slug: 'done-post', publishDate: '2026-05-01', missing: [], stale: ['fr'], structure: [] },
			{ slug: 'new-post', publishDate: '2026-09-01', missing: ['fr', 'de'], stale: [], structure: [] }
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

	// 2026-10-02: a killed run left fr with only its dates bumped and no FAQ, and the status said
	// "complete" because it only looked at publication and dates.
	it('flags a fresh, published translation whose structure differs from the English post', () => {
		const all = Object.fromEntries(LOCALES.map((l) => [l, english.map((p) => p.slug)]));
		const rows = computeStatus(english, all, [], LOCALES, ['fr/done-post', 'zh-hk/done-post']);
		expect(rows).toEqual([
			{ slug: 'done-post', publishDate: '2026-05-01', missing: [], stale: [], structure: ['fr', 'zh-hk'] }
		]);
	});

	it('does not report a structure problem for a locale that has no translation at all', () => {
		const rows = computeStatus([english[0]], { fr: [], de: [], 'zh-hk': [] }, [], LOCALES, ['fr/old-post']);
		expect(rows[0].missing).toEqual(['fr', 'de', 'zh-hk']);
		expect(rows[0].structure).toEqual([]);
	});
});

describe('findStructureProblems', () => {
	const bodies: Record<string, string> = {
		'en/a': 'EN-A',
		'en/b': 'EN-B',
		'fr/a': 'FR-A-short',
		'fr/b': 'EN-B',
		'de/a': 'EN-A'
	};
	const read = (locale: string, slug: string) => bodies[`${locale}/${slug}`] ?? null;
	// Fake comparison: a translation matches when its text starts with the English one.
	const compare = (en: string, tr: string) => (tr.startsWith(en) ? [] : [`differs: ${tr} vs ${en}`]);

	it('returns the locale/slug pairs whose structure differs', () => {
		expect(findStructureProblems(['a', 'b'], ['fr', 'de'], read, compare)).toEqual(['fr/a']);
	});

	it('skips a pair with no translation file and an English post that cannot be read', () => {
		expect(findStructureProblems(['b'], ['de'], read, compare)).toEqual([]);
		expect(findStructureProblems(['zz'], ['fr'], read, compare)).toEqual([]);
	});

	it('is empty when everything matches', () => {
		expect(findStructureProblems(['b'], ['fr'], read, compare)).toEqual([]);
	});
});

describe('summarize', () => {
	it('counts posts, locales, missing, stale and structure pairs', () => {
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
			structure: 0,
			incompletePosts: 3,
			complete: false
		});
	});
	it('is complete without missing, stale or structure problems', () => {
		expect(summarize(77, 12, [])).toMatchObject({
			complete: true,
			missing: 0,
			stale: 0,
			structure: 0,
			pairs: 924
		});
	});
	it('is NOT complete when only the structure differs', () => {
		const all = Object.fromEntries(LOCALES.map((l) => [l, english.map((p) => p.slug)]));
		const rows = computeStatus(english, all, [], LOCALES, ['fr/done-post']);
		expect(summarize(3, 3, rows)).toMatchObject({
			complete: false,
			missing: 0,
			stale: 0,
			structure: 1,
			incompletePosts: 1
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
	it('adds a structure column and count only when some translation is out of structure', () => {
		const all = Object.fromEntries(LOCALES.map((l) => [l, english.map((p) => p.slug)]));
		const rows = computeStatus(english, all, [], LOCALES, ['fr/done-post']);
		const lines = formatStatus(rows, summarize(3, 3, rows));
		expect(lines[0]).toMatch(/^post\s+published\s+missing\s+stale\s+structure$/);
		expect(lines.some((l) => l.startsWith('done-post') && l.endsWith('fr'))).toBe(true);
		expect(lines.at(-2)).toBe(
			'3 posts x 3 locales: 0 missing, 0 stale, 1 out of structure (1 posts incomplete)'
		);
		expect(lines.at(-1)).toContain('just post-translate-check <slug>');
	});
	it('prints only the complete summary when nothing is pending', () => {
		expect(formatStatus([], summarize(77, 12, []))).toEqual([
			'complete: 77 posts x 12 locales, nothing missing, stale or out of structure'
		]);
	});
});
