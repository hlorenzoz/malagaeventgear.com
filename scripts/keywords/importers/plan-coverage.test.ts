import { describe, it, expect } from 'vitest';
import { planCoverage, type CoveragePost } from './plan-coverage';
import { mergeKeyword } from '../merge';
import type { ContentPlan } from '../plan.schema';
import type { KeywordEntry } from '../schema';

const TODAY = '2026-09-29';

function kw(keyword: string, over: Partial<KeywordEntry> = {}): KeywordEntry {
	return {
		id: keyword.toLowerCase().replace(/\s+/g, '-'),
		keyword,
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

const post = (over: Partial<CoveragePost> = {}): CoveragePost => ({
	slug: 'sound-system-rental',
	headings: ['What Is Included', 'Lectern Rental for Speakers'],
	faqs: ['Can I rent a lectern?'],
	...over
});

const base = {
	keywords: ['lectern rental', 'podium hire'],
	cluster: 'audio visual rental',
	priority: 'high' as const,
	evidence: 'e',
	reason: 'r'
};

const section: ContentPlan['items'][number] = {
	...base,
	action: 'add-section',
	targetUrl: '/blog/sound-system-rental/',
	file: 'src/content/blog/sound-system-rental.svx',
	headingLevel: 2,
	heading: 'Lectern Rental',
	brief: 'b'
};
const faq: ContentPlan['items'][number] = {
	...base,
	action: 'add-faq',
	targetUrl: '/blog/sound-system-rental/',
	file: 'src/content/blog/sound-system-rental.svx',
	question: 'Can I rent a lectern?'
};

const plan = (...items: ContentPlan['items']): ContentPlan => ({
	date: '2026-09-28',
	run: { status: 'ok', candidatesReviewed: 5 },
	items
});

const keywords = [kw('lectern rental'), kw('podium hire')];

describe('planCoverage', () => {
	it('covers every keyword of an add-section item once the post has that heading', () => {
		const out = planCoverage([plan(section)], [post()], keywords, TODAY);
		expect(out.map((e) => e.id).sort()).toEqual(['lectern-rental', 'podium-hire']);
		for (const e of out) {
			expect(e.status).toBe('covered');
			expect(e.url).toBe('/blog/sound-system-rental/');
			expect(e.sources.blog).toEqual({ firstSeen: TODAY, lastSeen: TODAY });
		}
	});

	it('does nothing while the heading is not in the post yet', () => {
		expect(
			planCoverage([plan(section)], [post({ headings: ['What Is Included'] })], keywords, TODAY)
		).toEqual([]);
	});

	it('normalizes case and punctuation when matching the heading', () => {
		const p = post({ headings: ['LECTERN, RENTAL: what?'] });
		expect(planCoverage([plan(section)], [p], keywords, TODAY)).toHaveLength(2);
	});

	it('covers an add-faq item when the post has the question in post-faqs', () => {
		expect(planCoverage([plan(faq)], [post()], keywords, TODAY)).toHaveLength(2);
		expect(planCoverage([plan(faq)], [post({ faqs: [] })], keywords, TODAY)).toEqual([]);
	});

	it('ignores new-post and skip items and posts other than the target', () => {
		const other = post({ slug: 'other-post' });
		expect(planCoverage([plan(section)], [other], keywords, TODAY)).toEqual([]);
		expect(planCoverage([plan({ ...section, action: 'skip' })], [post()], keywords, TODAY)).toEqual(
			[]
		);
	});

	it('never covers an unplanned keyword that merely appears in a heading', () => {
		const stray = [kw('sound system rental'), kw('audio visual')];
		const p = post({ headings: ['Sound System Rental', 'Audio Visual'] });
		expect(planCoverage([plan(section)], [p], stray, TODAY)).toEqual([]);
	});

	it('only touches keywords that are still idea', () => {
		const decided = [kw('lectern rental', { status: 'rejected', reason: 'x' })];
		expect(planCoverage([plan(section)], [post()], decided, TODAY)).toEqual([]);
	});

	it('merges into the existing idea keeping its cluster', () => {
		const idea = keywords[0];
		const [entry] = planCoverage([plan(section)], [post()], [idea], TODAY);
		const merged = mergeKeyword(idea, entry);
		expect(merged.status).toBe('covered');
		expect(merged.cluster).toBe('audio visual rental');
	});
});
