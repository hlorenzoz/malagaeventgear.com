/**
 * ingest-ubersuggest.test.ts: unit tests for the pure batch-to-entries transform (plan,
 * `ingest-ubersuggest.ts` row: "Mergea un lote diario ... YYYY-MM-DD.json"). The agent only ever
 * discovers `idea`s (plan 3b: "Nunca crea contenido ni cambia estados a published: solo
 * descubre"), so every new keyword from a batch starts at `idea` unless `relevance.ts` or
 * `seed-mappings.ts` overrides it deterministically, exactly like every other importer.
 */
import { describe, it, expect } from 'vitest';
import { batchToKeywords, batchToFaqs, batchToAiPrompts } from './ingest-ubersuggest';
import type { KeywordBatch } from './batch.schema';

const TODAY = '2026-09-29';
const serviceAreas = ['Malaga', 'Marbella'];

function batch(overrides: Partial<KeywordBatch> = {}): KeywordBatch {
	return {
		date: '2026-09-29',
		run: { status: 'ok', calls: [], skipped: [] },
		keywords: [],
		faqs: [],
		aiPrompts: [],
		research: {},
		rank: [],
		discarded: [],
		...overrides
	};
}

describe('batchToKeywords', () => {
	it('discovers a new keyword as idea, never anything the agent is not allowed to set', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'wireless conference microphone bundle malaga',
					source: 'ubersuggest-keyword-suggestions'
				}
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.status).toBe('idea');
		expect(entry.url).toBeNull();
	});

	it('attaches volume/difficulty/cpc metrics from the batch entry', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'av equipment hire malaga',
					source: 'ubersuggest-keyword-suggestions',
					metrics: {
						volume: { value: 90, source: 'ubersuggest', asOf: TODAY },
						difficulty: { value: 12, source: 'ubersuggest', asOf: TODAY }
					}
				}
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.metrics.volume?.value).toBe(90);
		expect(entry.metrics.difficulty?.value).toBe(12);
	});

	it('rejects an out of market keyword via relevance.ts, even though the agent proposed it', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'av equipment hire dubai',
					source: 'ubersuggest-keyword-suggestions'
				}
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.status).toBe('rejected');
	});

	it('resolves a seed mapped cluster/url for a relevant phrase (e.g. rent tv screen)', () => {
		const b = batch({
			keywords: [{ keyword: 'rent tv screen', source: 'ubersuggest-google-suggestions' }]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.status).toBe('covered');
		expect(entry.url).toBe('/blog/tv-screen-rental/');
	});

	it('rejects a deliberately excluded phrase via seed-mappings (gender reveal smoke machine)', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'gender reveal smoke machine',
					source: 'ubersuggest-google-suggestions'
				}
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.status).toBe('rejected');
	});

	it('attaches rank position/url as metrics.ubersuggest, creating an idea entry if the keyword was not already in batch.keywords', () => {
		const b = batch({
			rank: [
				{
					keyword: 'audio visual rental',
					position: 14,
					rankingUrl: '/blog/audio-visual-rental/',
					asOf: TODAY
				}
			]
		});
		const entries = batchToKeywords(b, serviceAreas, TODAY);
		const entry = entries.find((e) => e.keyword === 'audio visual rental');
		expect(entry?.metrics.ubersuggest).toEqual({
			position: 14,
			rankingUrl: '/blog/audio-visual-rental/',
			asOf: TODAY
		});
	});

	it('merges rank data onto a keyword that also came from batch.keywords (same id)', () => {
		const b = batch({
			keywords: [{ keyword: 'audio visual rental', source: 'ubersuggest-project' }],
			rank: [
				{
					keyword: 'audio visual rental',
					position: 14,
					rankingUrl: '/blog/audio-visual-rental/',
					asOf: TODAY
				}
			]
		});
		const entries = batchToKeywords(b, serviceAreas, TODAY);
		expect(entries).toHaveLength(1);
		expect(entries[0].metrics.ubersuggest?.position).toBe(14);
	});

	it('attaches research to the matching keyword by normalized text', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'av equipment hire malaga',
					source: 'ubersuggest-keyword-suggestions'
				}
			],
			research: {
				'av equipment hire malaga': {
					serp: { localPack: true, asOf: TODAY },
					titleIdeas: ['The Complete Guide']
				}
			}
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.research?.serp?.localPack).toBe(true);
		expect(entry.research?.titleIdeas).toEqual(['The Complete Guide']);
	});

	it('tags sources with the batch entry own source string and today as seen date', () => {
		const b = batch({
			keywords: [
				{
					keyword: 'av equipment hire malaga',
					source: 'ubersuggest-keyword-suggestions'
				}
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.sources).toEqual([{ name: 'ubersuggest-keyword-suggestions', seen: TODAY }]);
	});
});

describe('batchToFaqs', () => {
	it('creates an idea faq per google-autocomplete question', () => {
		const b = batch({
			faqs: [
				{
					question: 'what is av equipment hire?',
					keyword: 'av equipment hire malaga',
					source: 'google-autocomplete'
				}
			]
		});
		const [faq] = batchToFaqs(b, TODAY);
		expect(faq.status).toBe('idea');
		expect(faq.source).toBe('google-autocomplete');
		expect(faq.keywordId).toBe('av-equipment-hire-malaga');
	});

	it('falls back to unassigned cluster/keywordId when no seed keyword is given', () => {
		const b = batch({
			faqs: [
				{
					question: 'what is av equipment hire?',
					source: 'google-autocomplete'
				}
			]
		});
		const [faq] = batchToFaqs(b, TODAY);
		expect(faq.cluster).toBe('unassigned');
	});
});

describe('batchToAiPrompts', () => {
	it('creates an idea aiPrompt, never answered/planned directly from a batch', () => {
		const b = batch({
			aiPrompts: [
				{
					prompt: 'best av rental in malaga',
					keyword: 'av equipment hire malaga',
					source: 'ubersuggest-ai-prompt-ideas',
					visibility: {
						mentioned: true,
						position: 2,
						brands: ['MEG'],
						provider: 'openai',
						asOf: TODAY
					}
				}
			]
		});
		const [entry] = batchToAiPrompts(b, TODAY);
		expect(entry.status).toBe('idea');
		expect(entry.visibility?.mentioned).toBe(true);
	});
});
