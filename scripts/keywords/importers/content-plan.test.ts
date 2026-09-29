import { describe, it, expect } from 'vitest';
import { contentPlansToKeywords } from './content-plan';
import { mergeKeyword } from '../merge';
import type { ContentPlan } from '../plan.schema';
import type { KeywordEntry } from '../schema';

function plan(date: string, items: ContentPlan['items']): ContentPlan {
	return { date, run: { status: 'ok', candidatesReviewed: 5 }, items };
}

const sectionItem: ContentPlan['items'][number] = {
	keywords: ['Lectern Rental', 'podium hire'],
	cluster: 'audio visual rental',
	action: 'add-section',
	priority: 'high',
	evidence: 'e',
	reason: 'r',
	targetUrl: '/blog/sound-system-rental/',
	file: 'src/content/blog/sound-system-rental.svx',
	headingLevel: 2,
	heading: 'Lectern Rental',
	brief: 'b'
};

function existingEntry(over: Partial<KeywordEntry>): KeywordEntry {
	return {
		id: 'podium-hire',
		keyword: 'podium hire',
		locale: 'en',
		cluster: 'event technology service',
		topic: null,
		intent: null,
		url: null,
		status: 'idea',
		reason: null,
		sources: { 'google-ads': { firstSeen: '2026-09-01', lastSeen: '2026-09-01', stats: null } },
		opportunity: null,
		opportunityReason: null,
		firstSeen: '2026-09-01',
		lastResearched: null,
		notes: '',
		...over
	};
}

describe('contentPlansToKeywords', () => {
	it('attaches the content-plan source to every keyword of an item', () => {
		const out = contentPlansToKeywords([plan('2026-09-29', [sectionItem])], new Map());
		expect(out.map((e) => e.id).sort()).toEqual(['lectern-rental', 'podium-hire']);
		expect(out[0].sources['content-plan']).toEqual({
			firstSeen: '2026-09-29',
			lastSeen: '2026-09-29',
			stats: {
				asOf: '2026-09-29',
				action: 'add-section',
				targetUrl: '/blog/sound-system-rental/',
				priority: 'high'
			}
		});
	});

	it('creates a missing keyword as idea and never sets another status', () => {
		const [entry] = contentPlansToKeywords([plan('2026-09-29', [sectionItem])], new Map());
		expect(entry.status).toBe('idea');
		expect(entry.url).toBeNull();
		expect(entry.cluster).toBe('audio visual rental');
	});

	it('keeps the identity of an existing keyword untouched', () => {
		const existing = new Map([['podium-hire', existingEntry({ status: 'covered', url: '/x/' })]]);
		const out = contentPlansToKeywords([plan('2026-09-29', [sectionItem])], existing);
		const entry = out.find((e) => e.id === 'podium-hire')!;
		expect(entry.status).toBe('covered');
		expect(entry.url).toBe('/x/');
		const merged = mergeKeyword(existing.get('podium-hire'), entry);
		expect(merged.status).toBe('covered');
		expect(merged.cluster).toBe('event technology service');
		expect(merged.sources['google-ads']).toBeDefined();
		expect(merged.sources['content-plan']?.stats?.action).toBe('add-section');
	});

	it('does not move the cluster of an existing idea either', () => {
		const existing = new Map([['podium-hire', existingEntry({})]]);
		const out = contentPlansToKeywords([plan('2026-09-29', [sectionItem])], existing);
		const merged = mergeKeyword(
			existing.get('podium-hire'),
			out.find((e) => e.id === 'podium-hire')!
		);
		expect(merged.status).toBe('idea');
		expect(merged.cluster).toBe('event technology service');
	});

	it('lets the latest plan win and keeps the first and last dates', () => {
		const skip = { ...sectionItem, action: 'skip' as const, priority: 'low' as const };
		delete (skip as Record<string, unknown>).targetUrl;
		const out = contentPlansToKeywords(
			[plan('2026-09-30', [skip]), plan('2026-09-29', [sectionItem])],
			new Map()
		);
		const src = out.find((e) => e.id === 'lectern-rental')!.sources['content-plan']!;
		expect(src.firstSeen).toBe('2026-09-29');
		expect(src.lastSeen).toBe('2026-09-30');
		expect(src.stats).toEqual({
			asOf: '2026-09-30',
			action: 'skip',
			targetUrl: null,
			priority: 'low'
		});
	});

	it('uses the new post url as targetUrl for a new-post item', () => {
		const item: ContentPlan['items'][number] = {
			keywords: ['stage riser rental'],
			cluster: 'audio visual rental',
			action: 'new-post',
			priority: 'medium',
			evidence: 'e',
			reason: 'r',
			newPost: {
				slug: 'stage-riser-rental',
				title: 'T',
				keyword: 'stage riser rental',
				targetPage: '/blog/audio-visual-rental/',
				outline: [],
				brief: 'b'
			}
		};
		const [entry] = contentPlansToKeywords([plan('2026-09-29', [item])], new Map());
		expect(entry.sources['content-plan']?.stats?.targetUrl).toBe('/blog/stage-riser-rental/');
	});
});
