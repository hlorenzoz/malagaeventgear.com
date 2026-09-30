/**
 * faqs-query.test.ts: filters the FAQ registry without opening keywords.json (1.7 MB) by hand.
 */
import { describe, it, expect } from 'vitest';
import type { FaqEntry } from './schema';
import { filterFaqs, parseFaqFilterArgs } from './faqs-query';

const d = (s: string) => ({ firstSeen: s, lastSeen: s });
const faq = (id: string, over: Partial<FaqEntry> = {}): FaqEntry => ({
	id,
	question: `Q ${id}?`,
	keywordId: 'k1',
	cluster: 'c',
	url: null,
	status: 'idea',
	reason: null,
	sources: { 'google-autocomplete': { ...d('2026-10-01'), seeds: ['k1'] } },
	...over
});

const ALL = [
	faq('a'),
	faq('b', { keywordId: 'k2', status: 'answered', sources: { post: { ...d('2026-09-01'), urls: ['/blog/x/'] } } }),
	faq('c', { sources: { 'google-autocomplete': { ...d('2026-09-15'), seeds: ['k1'] }, 'site-faq': d('2026-09-15') } })
];

describe('filterFaqs', () => {
	it('returns everything for an empty filter', () => {
		expect(filterFaqs(ALL, {}).map((f) => f.id)).toEqual(['a', 'b', 'c']);
	});

	it('filters by keyword id, status and source key, and combines them', () => {
		expect(filterFaqs(ALL, { keyword: 'k2' }).map((f) => f.id)).toEqual(['b']);
		expect(filterFaqs(ALL, { status: 'idea' }).map((f) => f.id)).toEqual(['a', 'c']);
		expect(filterFaqs(ALL, { source: 'site-faq' }).map((f) => f.id)).toEqual(['c']);
		expect(filterFaqs(ALL, { status: 'idea', source: 'google-autocomplete' }).map((f) => f.id)).toEqual(['a', 'c']);
	});

	it('filters by since: any source seen on or after that date', () => {
		expect(filterFaqs(ALL, { since: '2026-09-20' }).map((f) => f.id)).toEqual(['a']);
	});
});

describe('parseFaqFilterArgs', () => {
	it('reads --keyword, --status, --source and --since', () => {
		expect(parseFaqFilterArgs(['--keyword', 'k1', '--status', 'idea', '--source', 'post', '--since', '2026-09-01'])).toEqual({
			keyword: 'k1',
			status: 'idea',
			source: 'post',
			since: '2026-09-01'
		});
	});

	it('rejects a bad status, a bad source, a bad date, an unknown flag or a flag without value', () => {
		expect(() => parseFaqFilterArgs(['--status', 'casi'])).toThrow(/idea/);
		expect(() => parseFaqFilterArgs(['--source', 'blog'])).toThrow(/post/);
		expect(() => parseFaqFilterArgs(['--since', 'ayer'])).toThrow(/YYYY-MM-DD/);
		expect(() => parseFaqFilterArgs(['--foo', 'x'])).toThrow(/--foo/);
		expect(() => parseFaqFilterArgs(['--status'])).toThrow(/--status/);
	});
});
