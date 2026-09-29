/**
 * blog.test.ts: unit tests for the pure transform (plan: "blog frontmatter vía el schema de
 * src/lib/types/blog.ts"). Fixtures are small hand-built posts, never the real filesystem: the
 * real filesystem is exercised by `keywords.published-posts.test.ts` (the guard) and by actually
 * running `sync.ts`.
 */
import { describe, it, expect } from 'vitest';
import { blogPostsToKeywords, type BlogPostInput } from './blog';
import { mergeKeyword } from '../merge';
import type { KeywordEntry } from '../schema';

const TODAY = '2026-09-29';

function post(overrides: Partial<BlogPostInput>): BlogPostInput {
	return {
		slug: 'audio-visual-rental',
		keyword: 'audio visual rental',
		siloRole: 'pillar',
		targetPage: '/',
		draft: false,
		...overrides
	};
}

describe('blogPostsToKeywords', () => {
	it('gives a pillar its own keyword as its cluster', () => {
		const [entry] = blogPostsToKeywords([post({})], TODAY);
		expect(entry.cluster).toBe('audio visual rental');
		expect(entry.status).toBe('published');
		expect(entry.url).toBe('/blog/audio-visual-rental/');
	});

	it('gives a supporting post the cluster of the pillar its targetPage resolves to', () => {
		const pillar = post({
			slug: 'audio-visual-rental',
			keyword: 'audio visual rental',
			siloRole: 'pillar',
			targetPage: '/'
		});
		const supporting = post({
			slug: 'sound-system-rental',
			keyword: 'sound system rental',
			siloRole: 'supporting',
			targetPage: '/blog/audio-visual-rental/'
		});
		const [, entry] = blogPostsToKeywords([pillar, supporting], TODAY);
		expect(entry.cluster).toBe('audio visual rental');
	});

	it('gives a news post the cluster "news"', () => {
		const [entry] = blogPostsToKeywords(
			[
				post({
					slug: 'news-something',
					keyword: 'news something',
					siloRole: 'news',
					targetPage: '/'
				})
			],
			TODAY
		);
		expect(entry.cluster).toBe('news');
	});

	it('gives a standalone post the cluster "standalone"', () => {
		const [entry] = blogPostsToKeywords(
			[
				post({
					slug: 'company-post',
					keyword: 'company post',
					siloRole: 'standalone',
					targetPage: ''
				})
			],
			TODAY
		);
		expect(entry.cluster).toBe('standalone');
	});

	it('marks a draft post as status draft, not published', () => {
		const [entry] = blogPostsToKeywords([post({ draft: true })], TODAY);
		expect(entry.status).toBe('draft');
	});

	it('sets id from the normalized keyword, source "blog", and today as firstSeen', () => {
		const [entry] = blogPostsToKeywords([post({})], TODAY);
		expect(entry.id).toBe('audio-visual-rental');
		expect(entry.sources).toEqual({ blog: { firstSeen: TODAY, lastSeen: TODAY } });
		expect(entry.firstSeen).toBe(TODAY);
	});

	it('falls back to "unassigned" cluster when a supporting post targets an unknown url', () => {
		const orphan = post({
			slug: 'orphan-post',
			keyword: 'orphan post',
			siloRole: 'supporting',
			targetPage: '/blog/does-not-exist/'
		});
		const [entry] = blogPostsToKeywords([orphan], TODAY);
		expect(entry.cluster).toBe('unassigned');
	});
});

describe('closing a planned new-post item', () => {
	it('turns the idea keyword into published once the post exists with that keyword', () => {
		const idea: KeywordEntry = {
			id: 'stage-riser-rental',
			keyword: 'stage riser rental',
			locale: 'en',
			cluster: 'audio visual rental',
			topic: null,
			intent: null,
			url: null,
			status: 'idea',
			reason: null,
			sources: {
				'content-plan': {
					firstSeen: '2026-09-28',
					lastSeen: '2026-09-28',
					stats: {
						asOf: '2026-09-28',
						action: 'new-post',
						targetUrl: '/blog/stage-riser-rental/',
						priority: 'medium'
					}
				}
			},
			opportunity: null,
			opportunityReason: null,
			firstSeen: '2026-09-01',
			lastResearched: null,
			notes: ''
		};
		const [published] = blogPostsToKeywords(
			[
				post({
					slug: 'stage-riser-rental',
					keyword: 'stage riser rental',
					siloRole: 'supporting',
					targetPage: '/blog/audio-visual-rental/'
				})
			],
			TODAY
		);
		const merged = mergeKeyword(idea, published);
		expect(merged.status).toBe('published');
		expect(merged.url).toBe('/blog/stage-riser-rental/');
		expect(merged.sources['content-plan']).toBeDefined();
	});
});
