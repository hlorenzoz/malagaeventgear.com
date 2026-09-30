/**
 * merge.test.ts: unit tests for the pure upsert logic. The one rule every test in this file
 * protects: once a keyword/faq/aiPrompt is no longer "idea", a lower-confidence source can add
 * its own per-source stats, but can NEVER move it back, change its url, or overwrite its
 * notes/reason. "El blog publicado siempre gana."
 */
import { describe, it, expect } from 'vitest';
import { mergeKeyword, mergeFaq, mergeAiPrompt, mergeSources } from './merge';
import type { KeywordEntry, FaqEntry, AiPromptEntry, Sources } from './schema';

function keyword(overrides: Partial<KeywordEntry> = {}): KeywordEntry {
	return {
		id: 'audio-visual-rental',
		keyword: 'audio visual rental',
		locale: 'en',
		cluster: 'audio visual rental',
		topic: null,
		intent: null,
		url: '/blog/audio-visual-rental/',
		status: 'published',
		reason: null,
		sources: { blog: { firstSeen: '2026-09-29', lastSeen: '2026-09-29' } },
		opportunity: null,
		opportunityReason: null,
		firstSeen: '2026-09-29',
		lastResearched: null,
		notes: '',
		...overrides
	};
}

describe('mergeKeyword: no existing entry', () => {
	it('returns the incoming entry unchanged when there is nothing to merge into', () => {
		const incoming = keyword();
		expect(mergeKeyword(undefined, incoming)).toEqual(incoming);
	});
});

describe('mergeKeyword: protecting a non idea entry', () => {
	const published = keyword({
		status: 'published',
		url: '/blog/audio-visual-rental/',
		notes: 'do not touch'
	});

	it('never downgrades status away from published', () => {
		const incoming = keyword({ status: 'idea', url: null, cluster: 'unassigned' });
		const merged = mergeKeyword(published, incoming);
		expect(merged.status).toBe('published');
	});

	it('never overwrites the url of a non idea entry', () => {
		const incoming = keyword({
			status: 'idea',
			url: '/blog/some-other-page/',
			cluster: 'unassigned'
		});
		const merged = mergeKeyword(published, incoming);
		expect(merged.url).toBe('/blog/audio-visual-rental/');
	});

	it('never overwrites notes of a non idea entry', () => {
		const incoming = keyword({ notes: 'a lower-confidence source guessed something' });
		const merged = mergeKeyword(published, incoming);
		expect(merged.notes).toBe('do not touch');
	});

	it('never fills in notes on a non idea entry even when its own notes are empty', () => {
		const publishedNoNotes = keyword({ status: 'published', notes: '' });
		const incoming = keyword({ notes: 'covered per some audit' });
		expect(mergeKeyword(publishedNoNotes, incoming).notes).toBe('');
	});

	it('never overwrites the reason of a rejected entry', () => {
		const rejected = keyword({ status: 'rejected', url: null, reason: 'no fit in inventory' });
		const incoming = keyword({ status: 'idea', url: null, reason: null });
		const merged = mergeKeyword(rejected, incoming);
		expect(merged.status).toBe('rejected');
		expect(merged.reason).toBe('no fit in inventory');
	});
});

describe('mergeKeyword: upgrading an idea entry', () => {
	it('lets an idea entry be promoted by an incoming source', () => {
		const idea = keyword({ status: 'idea', url: null, cluster: 'unassigned' });
		const incoming = keyword({
			status: 'planned',
			url: '/blog/new-post/',
			cluster: 'wedding rentals'
		});
		const merged = mergeKeyword(idea, incoming);
		expect(merged.status).toBe('planned');
		expect(merged.url).toBe('/blog/new-post/');
		expect(merged.cluster).toBe('wedding rentals');
	});
});

describe('mergeKeyword: firstSeen, lastResearched', () => {
	it('keeps the earliest firstSeen', () => {
		const existing = keyword({ firstSeen: '2026-08-05' });
		const incoming = keyword({ firstSeen: '2026-09-29' });
		expect(mergeKeyword(existing, incoming).firstSeen).toBe('2026-08-05');
	});

	it('keeps the latest lastResearched, treating null as unset', () => {
		const existing = keyword({ lastResearched: '2026-09-01' });
		const incoming = keyword({ lastResearched: '2026-09-29' });
		expect(mergeKeyword(existing, incoming).lastResearched).toBe('2026-09-29');
	});

	it('takes an incoming lastResearched when existing has none', () => {
		const existing = keyword({ lastResearched: null });
		const incoming = keyword({ lastResearched: '2026-09-29' });
		expect(mergeKeyword(existing, incoming).lastResearched).toBe('2026-09-29');
	});
});

describe('mergeKeyword: opportunity is always recomputed elsewhere, never carried by merge', () => {
	it('always returns null/null for opportunity, regardless of what either side carried', () => {
		const existing = keyword({ opportunity: 'high', opportunityReason: 'stale reason' });
		const incoming = keyword({ opportunity: 'low', opportunityReason: 'other stale reason' });
		const merged = mergeKeyword(existing, incoming);
		expect(merged.opportunity).toBeNull();
		expect(merged.opportunityReason).toBeNull();
	});
});

// --- sources -------------------------------------------------------------------------------

describe('mergeSources', () => {
	it('keeps a source present only on one side untouched', () => {
		const existing: Sources = { blog: { firstSeen: '2026-09-20', lastSeen: '2026-09-20' } };
		const incoming: Sources = { pop: { firstSeen: '2026-09-29', lastSeen: '2026-09-29' } };
		const merged = mergeSources(existing, incoming);
		expect(merged.blog).toEqual({ firstSeen: '2026-09-20', lastSeen: '2026-09-20' });
		expect(merged.pop).toEqual({ firstSeen: '2026-09-29', lastSeen: '2026-09-29' });
	});

	it('widens firstSeen/lastSeen when the same source appears on both sides', () => {
		const existing: Sources = { blog: { firstSeen: '2026-09-20', lastSeen: '2026-09-20' } };
		const incoming: Sources = { blog: { firstSeen: '2026-09-25', lastSeen: '2026-09-29' } };
		const merged = mergeSources(existing, incoming);
		expect(merged.blog).toEqual({ firstSeen: '2026-09-20', lastSeen: '2026-09-29' });
	});

	it('unions and sorts ubersuggest via, deduping repeated sections', () => {
		const existing: Sources = {
			ubersuggest: {
				firstSeen: '2026-09-20',
				lastSeen: '2026-09-20',
				via: ['suggestions'],
				stats: null
			}
		};
		const incoming: Sources = {
			ubersuggest: {
				firstSeen: '2026-09-29',
				lastSeen: '2026-09-29',
				via: ['domain', 'suggestions'],
				stats: null
			}
		};
		const merged = mergeSources(existing, incoming);
		expect(merged.ubersuggest?.via).toEqual(['domain', 'suggestions']);
	});

	it('replaces stats wholesale with whichever side has the newer asOf, never field by field', () => {
		const existing: Sources = {
			'google-ads': {
				firstSeen: '2025-09-01',
				lastSeen: '2025-09-01',
				stats: {
					asOf: '2025-09-01',
					period: null,
					currency: null,
					avgMonthlySearches: 50000,
					threeMonthChange: null,
					yoyChange: null,
					competition: null,
					competitionIndex: null,
					topOfPageBidLow: null,
					topOfPageBidHigh: null,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			}
		};
		const incoming: Sources = {
			'google-ads': {
				firstSeen: '2026-09-29',
				lastSeen: '2026-09-29',
				stats: {
					asOf: '2026-09-29',
					period: { from: '2025-09', to: '2026-08' },
					currency: 'EUR',
					avgMonthlySearches: 320,
					threeMonthChange: 0,
					yoyChange: -33,
					competition: 'Medium',
					competitionIndex: 41,
					topOfPageBidLow: 0.47,
					topOfPageBidHigh: 2.41,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: { '2026-08': 260 }
				}
			}
		};
		const merged = mergeSources(existing, incoming);
		expect(merged['google-ads']?.stats?.avgMonthlySearches).toBe(320);
		expect(merged['google-ads']?.stats?.asOf).toBe('2026-09-29');
	});

	it('keeps existing stats when the incoming side has none (a phrase-only re-listing)', () => {
		const existing: Sources = {
			'google-ads': {
				firstSeen: '2025-09-01',
				lastSeen: '2025-09-01',
				stats: {
					asOf: '2025-09-01',
					period: null,
					currency: null,
					avgMonthlySearches: 50000,
					threeMonthChange: null,
					yoyChange: null,
					competition: null,
					competitionIndex: null,
					topOfPageBidLow: null,
					topOfPageBidHigh: null,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			}
		};
		const incoming: Sources = {
			'google-ads': { firstSeen: '2026-09-29', lastSeen: '2026-09-29', stats: null }
		};
		const merged = mergeSources(existing, incoming);
		expect(merged['google-ads']?.stats?.avgMonthlySearches).toBe(50000);
	});
});

// --- faqs --------------------------------------------------------------------------------

function faq(overrides: Partial<FaqEntry> = {}): FaqEntry {
	return {
		id: 'faq-1',
		question: 'What is MEG?',
		keywordId: 'audio-visual-rental',
		cluster: 'audio visual rental',
		url: '/blog/audio-visual-rental/',
		status: 'answered',
		reason: null,
		sources: { post: { firstSeen: '2026-09-29', lastSeen: '2026-09-29', urls: ['/blog/audio-visual-rental/'] } },
		...overrides
	};
}

describe('mergeFaq', () => {
	it('never downgrades an answered faq back to idea', () => {
		const existing = faq({ status: 'answered' });
		const incoming = faq({
			status: 'idea',
			url: null,
			sources: { 'google-autocomplete': { firstSeen: '2026-09-30', lastSeen: '2026-09-30', seeds: ['a'] } }
		});
		expect(mergeFaq(existing, incoming).status).toBe('answered');
	});

	it('lets an idea faq be promoted', () => {
		const existing = faq({ status: 'idea', url: null });
		const incoming = faq({ status: 'answered', url: '/blog/audio-visual-rental/' });
		const merged = mergeFaq(existing, incoming);
		expect(merged.status).toBe('answered');
		expect(merged.url).toBe('/blog/audio-visual-rental/');
	});

	it('returns the incoming faq unchanged when there is no existing entry', () => {
		const incoming = faq();
		expect(mergeFaq(undefined, incoming)).toEqual(incoming);
	});

	it('keeps one entry per source: a question seen by a post and by autocomplete has both', () => {
		const post = faq();
		const auto = faq({
			status: 'idea',
			url: null,
			sources: { 'google-autocomplete': { firstSeen: '2026-09-30', lastSeen: '2026-09-30', seeds: ['b', 'a'] } }
		});
		const merged = mergeFaq(post, auto);
		expect(Object.keys(merged.sources).sort()).toEqual(['google-autocomplete', 'post']);
		expect(merged.status).toBe('answered');
		expect(merged.url).toBe('/blog/audio-visual-rental/');
	});

	it('re-ingesting one source only touches its own key, widening dates and unioning seeds and urls', () => {
		const first = faq({
			sources: {
				'google-autocomplete': { firstSeen: '2026-09-30', lastSeen: '2026-09-30', seeds: ['b'] },
				post: { firstSeen: '2026-09-29', lastSeen: '2026-09-29', urls: ['/blog/b/'] }
			}
		});
		const again = faq({
			sources: {
				'google-autocomplete': { firstSeen: '2026-10-02', lastSeen: '2026-10-02', seeds: ['a', 'b'] },
				post: { firstSeen: '2026-10-02', lastSeen: '2026-10-02', urls: ['/blog/a/'] }
			}
		});
		const merged = mergeFaq(first, again).sources;
		expect(merged['google-autocomplete']).toEqual({ firstSeen: '2026-09-30', lastSeen: '2026-10-02', seeds: ['a', 'b'] });
		expect(merged.post).toEqual({ firstSeen: '2026-09-29', lastSeen: '2026-10-02', urls: ['/blog/a/', '/blog/b/'] });
	});

	it('replaces ubersuggest stats wholesale with the newer asOf', () => {
		const stat = (asOf: string, volume: number) => ({
			firstSeen: asOf,
			lastSeen: asOf,
			stats: { asOf, volume, difficulty: null, cpc: null }
		});
		const merged = mergeFaq(faq({ sources: { ubersuggest: stat('2026-09-01', 10) } }), faq({ sources: { ubersuggest: stat('2026-10-01', 30) } }));
		expect(merged.sources.ubersuggest?.stats?.volume).toBe(30);
	});
});

// --- aiPrompts -----------------------------------------------------------------------------

function prompt(overrides: Partial<AiPromptEntry> = {}): AiPromptEntry {
	return {
		id: 'prompt-1',
		prompt: 'best audio visual rental in malaga',
		keywordId: 'audio-visual-rental',
		cluster: 'audio visual rental',
		url: null,
		status: 'idea',
		reason: null,
		source: 'ubersuggest-ai-prompt-ideas',
		visibility: null,
		firstSeen: '2026-09-29',
		...overrides
	};
}

describe('mergeAiPrompt', () => {
	it('replaces visibility with the freshest incoming snapshot', () => {
		const existing = prompt({
			visibility: {
				mentioned: false,
				position: null,
				brands: [],
				provider: 'openai',
				asOf: '2026-09-01'
			}
		});
		const incoming = prompt({
			visibility: {
				mentioned: true,
				position: 2,
				brands: ['MEG'],
				provider: 'openai',
				asOf: '2026-09-29'
			}
		});
		const merged = mergeAiPrompt(existing, incoming);
		expect(merged.visibility).toEqual({
			mentioned: true,
			position: 2,
			brands: ['MEG'],
			provider: 'openai',
			asOf: '2026-09-29'
		});
	});

	it('keeps existing visibility when incoming has none', () => {
		const existing = prompt({
			visibility: {
				mentioned: true,
				position: 1,
				brands: ['MEG'],
				provider: 'openai',
				asOf: '2026-09-01'
			}
		});
		const incoming = prompt({ visibility: null });
		expect(mergeAiPrompt(existing, incoming).visibility?.asOf).toBe('2026-09-01');
	});

	it('never downgrades status away from answered', () => {
		const existing = prompt({ status: 'answered', url: '/blog/audio-visual-rental/' });
		const incoming = prompt({ status: 'idea', url: null });
		expect(mergeAiPrompt(existing, incoming).status).toBe('answered');
	});
});
