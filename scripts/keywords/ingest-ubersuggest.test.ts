/**
 * ingest-ubersuggest.test.ts: unit tests for the pure batch-to-entries transform. The agent only
 * ever discovers `idea`s (it never creates content or changes status to published: it only
 * discovers), so every new keyword from a batch starts at `idea` unless `relevance.ts` or
 * `seed-mappings.ts` overrides it deterministically, exactly like every other importer. Every
 * reading a batch carries lands under `sources.ubersuggest` (or `sources['google-autocomplete']`
 * for autocomplete phrases), never a top level `metrics` field.
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

	it('attaches volume/difficulty/cpc under sources.ubersuggest.stats', () => {
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
		expect(entry.sources.ubersuggest?.stats?.volume).toBe(90);
		expect(entry.sources.ubersuggest?.stats?.difficulty).toBe(12);
	});

	it('rejects an out of market keyword via relevance.ts, even though the agent proposed it', () => {
		const b = batch({
			keywords: [{ keyword: 'av equipment hire dubai', source: 'ubersuggest-keyword-suggestions' }]
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
				{ keyword: 'gender reveal smoke machine', source: 'ubersuggest-google-suggestions' }
			]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.status).toBe('rejected');
	});

	it('attaches rank position/url under sources.ubersuggest.stats, creating an idea entry if the keyword was not already in batch.keywords', () => {
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
		expect(entry?.sources.ubersuggest?.stats?.position).toBe(14);
		expect(entry?.sources.ubersuggest?.stats?.rankingUrl).toBe('/blog/audio-visual-rental/');
		expect(entry?.sources.ubersuggest?.via).toContain('project');
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
		expect(entries[0].sources.ubersuggest?.stats?.position).toBe(14);
	});

	it('attaches research (serp/titleIdeas) to the matching keyword under sources.ubersuggest.stats', () => {
		const b = batch({
			keywords: [
				{ keyword: 'av equipment hire malaga', source: 'ubersuggest-keyword-suggestions' }
			],
			research: {
				'av equipment hire malaga': {
					serp: { localPack: true, asOf: TODAY },
					titleIdeas: ['The Complete Guide']
				}
			}
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.sources.ubersuggest?.stats?.serp?.localPack).toBe(true);
		expect(entry.sources.ubersuggest?.stats?.titleIdeas).toEqual(['The Complete Guide']);
		expect(entry.sources.ubersuggest?.via).toEqual(
			expect.arrayContaining(['keyword-suggestions', 'serp', 'title-ideas'])
		);
	});

	it('never creates a new entry from research alone (only attaches to an existing batch keyword)', () => {
		const b = batch({
			research: { 'some unseen keyword': { titleIdeas: ['x'] } }
		});
		const entries = batchToKeywords(b, serviceAreas, TODAY);
		expect(entries).toHaveLength(0);
	});

	it('tags a plain keyword suggestion with the section (prefix stripped) in sources.ubersuggest.via', () => {
		const b = batch({
			keywords: [{ keyword: 'av equipment hire malaga', source: 'ubersuggest-keyword-suggestions' }]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.sources).toEqual({
			ubersuggest: {
				firstSeen: TODAY,
				lastSeen: TODAY,
				via: ['keyword-suggestions'],
				stats: null
			}
		});
	});

	it('gives an autocomplete phrase its own source key, never sources.ubersuggest', () => {
		const b = batch({
			keywords: [{ keyword: 'wedding all in one', source: 'google-autocomplete' }]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.sources).toEqual({
			'google-autocomplete': { firstSeen: TODAY, lastSeen: TODAY }
		});
	});

	it('keeps a competitor: source as its literal via label', () => {
		const b = batch({
			keywords: [{ keyword: 'av hire company malaga', source: 'competitor:avhirespain.com' }]
		});
		const [entry] = batchToKeywords(b, serviceAreas, TODAY);
		expect(entry.sources.ubersuggest?.via).toEqual(['competitor:avhirespain.com']);
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
			faqs: [{ question: 'what is av equipment hire?', source: 'google-autocomplete' }]
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
