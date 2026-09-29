import { describe, it, expect } from 'vitest';
import { postFaqsToFaqs, type PostInfo } from './post-faqs';

const TODAY = '2026-09-29';

describe('postFaqsToFaqs', () => {
	it('produces one answered faq per question, pointing at the post url', () => {
		const data = {
			'sound-system-rental': [
				{ question: 'What mixer do you use?', answer: 'A digital mixer.' },
				{
					question: 'Do you offer wireless mics?',
					answer: 'Yes, on some packages.'
				}
			]
		};
		const postInfo: Record<string, PostInfo> = {
			'sound-system-rental': {
				keywordId: 'sound-system-rental',
				cluster: 'audio visual rental'
			}
		};
		const faqs = postFaqsToFaqs(data, postInfo, TODAY);
		expect(faqs).toHaveLength(2);
		expect(faqs[0]).toMatchObject({
			question: 'What mixer do you use?',
			keywordId: 'sound-system-rental',
			cluster: 'audio visual rental',
			url: '/blog/sound-system-rental/',
			status: 'answered',
			source: 'post',
			firstSeen: TODAY
		});
	});

	it('gives each faq a unique id even across posts with an identical question', () => {
		const data = {
			'post-a': [{ question: 'What is included?', answer: 'x' }],
			'post-b': [{ question: 'What is included?', answer: 'y' }]
		};
		const postInfo: Record<string, PostInfo> = {
			'post-a': { keywordId: 'post-a', cluster: 'c' },
			'post-b': { keywordId: 'post-b', cluster: 'c' }
		};
		const faqs = postFaqsToFaqs(data, postInfo, TODAY);
		expect(faqs).toHaveLength(2);
		expect(faqs[0].id).not.toBe(faqs[1].id);
	});

	it('falls back to an unassigned cluster and a slug derived keywordId when a slug is unknown', () => {
		const data = { 'mystery-post': [{ question: 'q?', answer: 'a' }] };
		const faqs = postFaqsToFaqs(data, {}, TODAY);
		expect(faqs[0].cluster).toBe('unassigned');
		expect(faqs[0].keywordId).toBe('mystery-post');
	});
});
