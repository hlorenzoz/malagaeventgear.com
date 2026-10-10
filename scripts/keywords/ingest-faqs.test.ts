/**
 * ingest-faqs.test.ts: turns the raw autocomplete phrases of a FAQ batch into faqs (questions) and
 * keywords (everything else), through the same relevance filter as every other source.
 */
import { describe, it, expect } from 'vitest';
import type { FaqBatch } from './faq-batch.schema';
import { faqBatchToKeywordBatch, isQuestion, seedProblems } from './ingest-faqs';

const AREAS = ['Malaga', 'Marbella'];
const fb = (phrases: [string, string][]): FaqBatch => ({
	date: '2026-10-01',
	run: { status: 'ok', calls: [] },
	seeds: [...new Set(phrases.map(([seed]) => seed))],
	suggestions: phrases.map(([seed, phrase]) => ({ seed, phrase }))
});

describe('seedProblems', () => {
	const known = new Set(['projector-rental', 'sound-system-rental']);
	const batch = (over: Partial<FaqBatch>): FaqBatch => ({
		date: '2026-10-11',
		run: { status: 'ok', calls: [] },
		seeds: [],
		suggestions: [],
		...over
	});

	it('accepts a batch whose seeds are ids of the keyword catalog', () => {
		expect(
			seedProblems(batch({ seeds: ['projector-rental', 'sound-system-rental'] }), known)
		).toEqual([]);
	});

	it('rejects a batch with no seeds: the rotation would hand out the same seeds tomorrow', () => {
		expect(seedProblems(batch({ run: { status: 'partial', calls: [] } }), known)).toHaveLength(1);
	});

	it('lets an aborted run through with no seeds: nothing was asked', () => {
		expect(seedProblems(batch({ run: { status: 'aborted', calls: [] } }), known)).toEqual([]);
	});

	it('rejects a seed that is not a keyword id, such as the keyword text the tool was called with', () => {
		const problems = seedProblems(
			batch({ seeds: ['projector-rental', 'projector rental'] }),
			known
		);
		expect(problems).toHaveLength(1);
		expect(problems[0]).toContain('projector rental');
	});

	it('rejects a suggestion whose seed is not listed in seeds', () => {
		const problems = seedProblems(
			batch({
				seeds: ['projector-rental'],
				suggestions: [{ seed: 'sound-system-rental', phrase: 'how much' }]
			}),
			known
		);
		expect(problems).toHaveLength(1);
	});
});

describe('isQuestion', () => {
	it('is true when the first word is a question word, ignoring case', () => {
		for (const q of [
			'how much is a projector',
			'What size screen',
			'Can I rent a mic',
			'is sound hire cheap',
			'where to hire pa'
		])
			expect(isQuestion(q)).toBe(true);
	});

	it('is false for a plain phrase, even one that contains a question word later', () => {
		expect(isQuestion('sound system hire how much')).toBe(false);
		expect(isQuestion('projector rental malaga')).toBe(false);
		expect(isQuestion('however')).toBe(false);
	});
});

describe('faqBatchToKeywordBatch', () => {
	it('sends questions to faqs with their seed and the rest to keywords, all as google-autocomplete', () => {
		const out = faqBatchToKeywordBatch(
			fb([
				['sound system rental', 'how much does sound system rental cost'],
				['sound system rental', 'sound system rental malaga']
			]),
			AREAS
		);
		expect(out.faqs).toEqual([
			{
				question: 'how much does sound system rental cost',
				keyword: 'sound system rental',
				source: 'google-autocomplete'
			}
		]);
		expect(out.keywords).toEqual([
			{ keyword: 'sound system rental malaga', source: 'google-autocomplete' }
		]);
		expect(out.aiPrompts).toEqual([]);
	});

	it('moves what the relevance filter rejects to discarded, for questions too', () => {
		const out = faqBatchToKeywordBatch(
			fb([['sound system rental', 'how to rent a sound system in dubai']]),
			AREAS
		);
		expect(out.faqs).toEqual([]);
		expect(out.discarded).toHaveLength(1);
		expect(out.discarded[0].text).toMatch(/dubai/);
	});

	it('keeps date and run status, and keeps one faq per seed for a phrase two seeds suggested (the merge unions the seeds)', () => {
		const out = faqBatchToKeywordBatch(
			fb([
				['a', 'how to hire a pa'],
				['b', 'how to hire a pa']
			]),
			AREAS
		);
		expect(out.date).toBe('2026-10-01');
		expect(out.run.status).toBe('ok');
		expect(out.faqs).toHaveLength(2);
	});
});
