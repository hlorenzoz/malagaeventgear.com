/**
 * migrate-faqs.test.ts: one-shot migration of the FAQ shape (2026-09-30). The old file has
 * `source` and `firstSeen` per faq and an id that carries the source. The new shape has a
 * `sources` record and the normalized question as id. Migrating in place keeps every keyword
 * that only lives in the current keywords.json (a full rebuild would drop them).
 */
import { describe, it, expect } from 'vitest';
import { migrateLegacyFaqs } from './migrate-faqs';

const old = (over: Record<string, unknown>) => ({
	id: 'x',
	question: 'What is MEG?',
	keywordId: 'k',
	cluster: 'c',
	url: null,
	status: 'idea',
	reason: null,
	source: 'google-autocomplete',
	firstSeen: '2026-09-29',
	...over
});

describe('migrateLegacyFaqs', () => {
	it('leaves a file that is already in the new shape untouched', () => {
		const file = { keywords: [], faqs: [{ id: 'a', sources: { post: {} } }] };
		expect(migrateLegacyFaqs(file)).toBe(file);
	});

	it('maps each old source to its key, with the normalized question as id', () => {
		const out = migrateLegacyFaqs({
			faqs: [
				old({ id: 'ubersuggest--what-is-meg', source: 'google-autocomplete' }),
				old({ id: 'p--q2', question: 'Q two?', source: 'post', status: 'answered', url: '/blog/a/' }),
				old({ id: 'f', question: 'Q three?', source: 'site-faq', status: 'answered', url: '/faq/' }),
				old({ id: 'r', question: 'Q four?', source: 'research-paa' })
			]
		}) as { faqs: Record<string, unknown>[] };
		const by = Object.fromEntries(out.faqs.map((f) => [f.id as string, f]));
		expect(by['what-is-meg'].sources).toEqual({
			'google-autocomplete': { firstSeen: '2026-09-29', lastSeen: '2026-09-29', seeds: ['k'] }
		});
		expect(by['q-two'].sources).toEqual({
			post: { firstSeen: '2026-09-29', lastSeen: '2026-09-29', urls: ['/blog/a/'] }
		});
		expect(Object.keys(by['q-three'].sources as object)).toEqual(['site-faq']);
		expect(Object.keys(by['q-four'].sources as object)).toEqual(['research']);
		expect('source' in by['what-is-meg']).toBe(false);
	});

	it('collapses two old faqs with the same question into one entry with both sources', () => {
		const out = migrateLegacyFaqs({
			faqs: [
				old({ id: 'p--a', source: 'post', status: 'answered', url: '/blog/a/' }),
				old({ id: 'ubersuggest--a', source: 'google-autocomplete' })
			]
		}) as { faqs: { id: string; status: string; sources: object }[] };
		expect(out.faqs).toHaveLength(1);
		expect(out.faqs[0].status).toBe('answered');
		expect(Object.keys(out.faqs[0].sources).sort()).toEqual(['google-autocomplete', 'post']);
	});
});
