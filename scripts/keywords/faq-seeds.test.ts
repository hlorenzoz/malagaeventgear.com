/**
 * faq-seeds.test.ts: the 10 keywords the FAQ agent asks Google autocomplete about today. The
 * least recently consulted first, so 10 a day walk the whole catalog of published keywords.
 */
import { describe, it, expect } from 'vitest';
import type { FaqBatch } from './faq-batch.schema';
import type { KeywordEntry } from './schema';
import { pickFaqSeeds } from './faq-seeds';

const kw = (id: string, over: Partial<KeywordEntry> = {}) =>
	({
		id,
		keyword: id.replace(/-/g, ' '),
		cluster: 'audio visual rental',
		status: 'published',
		...over
	}) as KeywordEntry;

const batch = (date: string, seeds: string[]): FaqBatch => ({
	date,
	run: { status: 'ok', calls: [] },
	seeds: [],
	suggestions: seeds.map((seed) => ({ seed, phrase: `how ${seed}` }))
});

describe('pickFaqSeeds', () => {
	it('takes only published or planned keywords, never news or standalone clusters', () => {
		const out = pickFaqSeeds(
			[
				kw('a'),
				kw('b', { status: 'idea' }),
				kw('c', { status: 'planned' }),
				kw('d', { cluster: 'news' }),
				kw('e', { cluster: 'standalone' })
			],
			[],
			10
		);
		expect(out.map((k) => k.id)).toEqual(['a', 'c']);
	});

	it('puts never consulted keywords first, then the least recently consulted', () => {
		const out = pickFaqSeeds(
			[kw('a'), kw('b'), kw('c')],
			[batch('2026-10-01', ['a']), batch('2026-10-03', ['b'])],
			3
		);
		expect(out.map((k) => k.id)).toEqual(['c', 'a', 'b']);
	});

	it('a seed that was consulted and returned no question is not picked again the next day', () => {
		// The rotation used to read only `suggestions`. A seed with no result left no trace, counted
		// as never consulted and came back first every day: the same 10 seeds from 2026-10-02 on.
		const empty: FaqBatch = {
			date: '2026-10-02',
			run: { status: 'partial', calls: [] },
			seeds: ['a', 'b'],
			suggestions: []
		};
		const out = pickFaqSeeds([kw('a'), kw('b'), kw('c'), kw('d')], [empty], 2);
		expect(out.map((k) => k.id)).toEqual(['c', 'd']);
	});

	it('the consulted date of a seed is the newest of its seeds and suggestions entries', () => {
		const out = pickFaqSeeds(
			[kw('a'), kw('b')],
			[
				batch('2026-10-01', ['a', 'b']),
				{ date: '2026-10-05', run: { status: 'partial', calls: [] }, seeds: ['a'], suggestions: [] }
			],
			2
		);
		expect(out.map((k) => k.id)).toEqual(['b', 'a']);
	});

	it('caps at n and is stable for equal dates (by id)', () => {
		const ks = ['d', 'c', 'b', 'a'].map((id) => kw(id));
		expect(pickFaqSeeds(ks, [], 2).map((k) => k.id)).toEqual(['a', 'b']);
	});

	it('does not mutate its input', () => {
		const ks = [kw('b'), kw('a')];
		pickFaqSeeds(ks, [], 2);
		expect(ks.map((k) => k.id)).toEqual(['b', 'a']);
	});
});
