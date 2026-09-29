import { describe, it, expect } from 'vitest';
import { ContentPlanSchema, PILLAR_URLS } from './plan.schema';

const base = {
	keywords: ['lectern rental'],
	cluster: 'audio visual rental',
	priority: 'high' as const,
	evidence: 'google-ads 320/mo',
	reason: 'no section covers it'
};

function plan(items: unknown[], run: Record<string, unknown> = {}) {
	return {
		date: '2026-09-29',
		run: { status: 'ok', candidatesReviewed: 20, ...run },
		items
	};
}

const section = {
	...base,
	action: 'add-section',
	targetUrl: '/blog/sound-system-rental/',
	file: 'src/content/blog/sound-system-rental.svx',
	headingLevel: 2,
	heading: 'Lectern Rental',
	after: 'What Is Included',
	brief: 'Cover the lectern with gooseneck microphone.'
};

describe('ContentPlanSchema', () => {
	it('accepts a complete plan with every action', () => {
		const result = ContentPlanSchema.safeParse(
			plan([
				section,
				{
					...base,
					action: 'add-faq',
					targetUrl: '/blog/sound-system-rental/',
					file: 'src/content/blog/sound-system-rental.svx',
					question: 'Can I rent a lectern?'
				},
				{
					...base,
					action: 'new-post',
					newPost: {
						slug: 'lectern-rental',
						title: 'Lectern Rental',
						keyword: 'lectern rental',
						targetPage: PILLAR_URLS[0],
						prevSibling: null,
						outline: [{ level: 2, text: 'What is a lectern' }],
						brief: 'Explain it.'
					}
				},
				{ ...base, action: 'skip', reason: 'venue noise' }
			])
		);
		expect(result.success).toBe(true);
	});

	it('exposes the 5 pillar urls of the reverse silo', () => {
		expect(PILLAR_URLS).toHaveLength(5);
		expect(PILLAR_URLS).toContain('/blog/stage-lighting-rental/');
	});

	it('rejects a malformed date, an empty keywords list and an unknown action', () => {
		expect(ContentPlanSchema.safeParse({ ...plan([]), date: '29/09/2026' }).success).toBe(false);
		expect(ContentPlanSchema.safeParse(plan([{ ...section, keywords: [] }])).success).toBe(false);
		expect(ContentPlanSchema.safeParse(plan([{ ...section, action: 'rewrite' }])).success).toBe(
			false
		);
	});

	it('requires the section fields for add-section', () => {
		for (const missing of ['targetUrl', 'file', 'headingLevel', 'heading', 'brief']) {
			const item: Record<string, unknown> = { ...section };
			delete item[missing];
			expect(ContentPlanSchema.safeParse(plan([item])).success, missing).toBe(false);
		}
	});

	it('requires targetUrl, file and question for add-faq', () => {
		const faq = {
			...base,
			action: 'add-faq',
			targetUrl: '/blog/a/',
			file: 'src/content/blog/a.svx',
			question: 'Q?'
		};
		expect(ContentPlanSchema.safeParse(plan([faq])).success).toBe(true);
		expect(ContentPlanSchema.safeParse(plan([{ ...faq, question: undefined }])).success).toBe(
			false
		);
		expect(ContentPlanSchema.safeParse(plan([{ ...faq, file: undefined }])).success).toBe(false);
	});

	it('requires newPost for new-post and a pillar url as its targetPage', () => {
		const post = {
			slug: 'x-post',
			title: 'X',
			keyword: 'x',
			targetPage: '/blog/audio-visual-rental/',
			outline: [],
			brief: 'b'
		};
		const item = { ...base, action: 'new-post', newPost: post };
		expect(ContentPlanSchema.safeParse(plan([item])).success).toBe(true);
		expect(ContentPlanSchema.safeParse(plan([{ ...item, newPost: undefined }])).success).toBe(
			false
		);
		expect(
			ContentPlanSchema.safeParse(
				plan([{ ...item, newPost: { ...post, targetPage: '/blog/sound-system-rental/' } }])
			).success
		).toBe(false);
	});

	it('rejects a file that does not match targetUrl', () => {
		const bad = { ...section, file: 'src/content/blog/other-post.svx' };
		expect(ContentPlanSchema.safeParse(plan([bad])).success).toBe(false);
	});

	it('lets a skip item carry only the common fields', () => {
		expect(ContentPlanSchema.safeParse(plan([{ ...base, action: 'skip' }])).success).toBe(true);
	});

	it('accepts partial and aborted runs with a reason', () => {
		expect(
			ContentPlanSchema.safeParse(plan([], { status: 'aborted', reason: 'no candidates' })).success
		).toBe(true);
	});
});
