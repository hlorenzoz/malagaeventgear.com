import { describe, it, expect } from 'vitest';
import { siteFaqToFaqs, type SiteFaqInput } from './site-faq';

const TODAY = '2026-09-29';

describe('siteFaqToFaqs', () => {
	it('produces one answered faq per item, pointing at /faq/', () => {
		const items: SiteFaqInput[] = [
			{
				id: 'what-is-meg',
				category: 'services',
				question: 'What is MEG?',
				answer: 'x'
			}
		];
		const [entry] = siteFaqToFaqs(items, TODAY);
		expect(entry).toMatchObject({
			id: 'what-is-meg',
			question: 'What is MEG?',
			url: '/faq/',
			status: 'answered',
			sources: { 'site-faq': { firstSeen: TODAY, lastSeen: TODAY } },
			cluster: 'site-faq',
			keywordId: 'faq-services'
		});
	});

	it('uses the normalized question as id, so the same question from another source is one entry', () => {
		const items: SiteFaqInput[] = [
			{ id: 'a', category: 'booking', question: 'q1', answer: 'a1' },
			{ id: 'b', category: 'contact', question: 'q2', answer: 'a2' }
		];
		const faqs = siteFaqToFaqs(items, TODAY);
		expect(faqs.map((f) => f.id)).toEqual(['q1', 'q2']);
	});
});
