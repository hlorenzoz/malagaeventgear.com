import { describe, it, expect } from 'vitest';
import { buildOpportunities, formatEvidence } from './opportunities';
import type { AiPromptEntry, FaqEntry, KeywordEntry, KeywordsFile } from './schema';

function kw(id: string, over: Partial<KeywordEntry> = {}): KeywordEntry {
	return {
		id,
		keyword: id.replace(/-/g, ' '),
		locale: 'en',
		cluster: 'audio visual rental',
		topic: null,
		intent: null,
		url: null,
		status: 'idea',
		reason: null,
		sources: {},
		opportunity: null,
		opportunityReason: null,
		firstSeen: '2026-09-01',
		lastResearched: null,
		notes: '',
		...over
	};
}

const gsc = (impressions: number, position: number) => ({
	'google-search-console': {
		firstSeen: '2026-09-01',
		lastSeen: '2026-09-01',
		stats: { asOf: '2026-09-23', impressions, clicks: 1, ctr: 0.01, position }
	}
});
const ads = (n: number) => ({
	'google-ads': {
		firstSeen: '2026-09-01',
		lastSeen: '2026-09-01',
		stats: {
			asOf: '2026-09-29',
			period: null,
			currency: null,
			avgMonthlySearches: n,
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
});
const uber = (volume: number, difficulty: number) => ({
	ubersuggest: {
		firstSeen: '2026-09-01',
		lastSeen: '2026-09-01',
		via: [],
		stats: { asOf: '2026-09-29', volume, difficulty }
	}
});
const planned = {
	'content-plan': {
		firstSeen: '2026-09-28',
		lastSeen: '2026-09-28',
		stats: {
			asOf: '2026-09-28',
			action: 'skip' as const,
			targetUrl: null,
			priority: 'low' as const
		}
	}
};

function file(
	keywords: KeywordEntry[],
	faqs: FaqEntry[] = [],
	aiPrompts: AiPromptEntry[] = []
): KeywordsFile {
	return {
		version: 1,
		updated: '2026-09-29',
		meta: { lastWeeklyRun: null, lastMonthlyRun: null },
		keywords,
		faqs,
		aiPrompts
	};
}

const faq = (id: string, keywordId: string, status: FaqEntry['status'] = 'idea'): FaqEntry => ({
	id,
	question: `Question ${id}?`,
	keywordId,
	cluster: 'audio visual rental',
	url: null,
	status,
	reason: null,
	source: 'google-autocomplete',
	firstSeen: '2026-09-01'
});

describe('formatEvidence', () => {
	it('summarizes every source that measured the keyword on one line', () => {
		const line = formatEvidence({ ...ads(320), ...gsc(137, 19.91), ...uber(90, 24) });
		expect(line).toBe('google-ads 320/mo, gsc pos 19.91 137 impr, ubersuggest vol 90 diff 24');
	});

	it('says there is no data instead of inventing any', () => {
		expect(formatEvidence({})).toBe('no measured data');
	});
});

describe('buildOpportunities', () => {
	it('keeps only idea keywords without a content-plan source', () => {
		const out = buildOpportunities(
			file([
				kw('a-one'),
				kw('b-planned', { sources: planned }),
				kw('c-published', { status: 'published', url: '/x/' }),
				kw('d-rejected', { status: 'rejected', reason: 'x' })
			]),
			20
		);
		expect(out.candidates.map((c) => c.id)).toEqual(['a-one']);
		expect(out.totals.candidates).toBe(1);
	});

	it('ranks by opportunity, then GSC impressions, then Google Ads, then Ubersuggest volume', () => {
		const out = buildOpportunities(
			file([
				kw('low-ads', { opportunity: 'low', sources: ads(999) }),
				kw('none-null'),
				kw('high-uber', { opportunity: 'high', sources: uber(500, 10) }),
				kw('high-gsc', { opportunity: 'high', sources: gsc(200, 12) }),
				kw('high-ads', { opportunity: 'high', sources: ads(400) }),
				kw('medium', { opportunity: 'medium', sources: gsc(9999, 20) })
			]),
			20
		);
		expect(out.candidates.map((c) => c.id)).toEqual([
			'high-gsc',
			'high-ads',
			'high-uber',
			'medium',
			'low-ads',
			'none-null'
		]);
	});

	it('honors the limit but reports the full remaining total', () => {
		const out = buildOpportunities(file([kw('a-a'), kw('b-b'), kw('c-c')]), 2);
		expect(out.candidates).toHaveLength(2);
		expect(out.totals).toMatchObject({ candidates: 3, returned: 2 });
	});

	it('links idea faqs and ai prompts to their candidate as plain text', () => {
		const prompt: AiPromptEntry = {
			id: 'p1',
			prompt: 'How do I rent a lectern?',
			keywordId: 'a-one',
			cluster: 'x',
			url: null,
			status: 'idea',
			reason: null,
			source: 'ubersuggest',
			visibility: null,
			firstSeen: '2026-09-01'
		};
		const out = buildOpportunities(
			file([kw('a-one')], [faq('f1', 'a-one'), faq('f2', 'a-one', 'answered')], [prompt]),
			5
		);
		expect(out.candidates[0].faqs).toEqual(['Question f1?']);
		expect(out.candidates[0].aiPrompts).toEqual(['How do I rent a lectern?']);
	});

	it('lists idea faqs of keywords that are not candidates as newFaqs, capped at 10', () => {
		const faqs = Array.from({ length: 12 }, (_, i) => faq(`f${i}`, 'pub'));
		const out = buildOpportunities(
			file(
				[kw('pub', { status: 'published', url: '/blog/x/' }), kw('a-one')],
				[...faqs, faq('own', 'a-one')]
			),
			5
		);
		expect(out.newFaqs).toHaveLength(10);
		expect(out.newFaqs.every((f) => f.keywordId === 'pub')).toBe(true);
		expect(out.totals.newFaqs).toBe(12);
	});
});
