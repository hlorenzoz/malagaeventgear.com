/**
 * faq-seeds.test.ts: the 10 keywords the FAQ agent asks Google autocomplete about today. The
 * least recently consulted first, so 10 a day walk the whole catalog of published keywords.
 */
import { describe, it, expect } from 'vitest';
import type { FaqBatch } from './faq-batch.schema';
import type { KeywordEntry } from './schema';
import { pickFaqSeeds } from './faq-seeds';

const kw = (id: string, over: Partial<KeywordEntry> = {}) =>
	({ id, keyword: id.replace(/-/g, ' '), cluster: 'audio visual rental', status: 'published', ...over }) as KeywordEntry;

const batch = (date: string, seeds: string[]): FaqBatch => ({
	date,
	run: { status: 'ok', calls: [] },
	suggestions: seeds.map((seed) => ({ seed, phrase: `how ${seed}` }))
});

describe('pickFaqSeeds', () => {
	it('takes only published or planned keywords, never news or standalone clusters', () => {
		const out = pickFaqSeeds(
			[kw('a'), kw('b', { status: 'idea' }), kw('c', { status: 'planned' }), kw('d', { cluster: 'news' }), kw('e', { cluster: 'standalone' })],
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
