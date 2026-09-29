import { describe, it, expect } from 'vitest';
import { itemTitle, renderItemBody, tierLine, ITEM_RULE_LINE } from './plan-to-todo';
import type { ContentPlan } from './plan.schema';

const plan: ContentPlan = {
	date: '2026-09-29',
	run: { status: 'ok', candidatesReviewed: 20 },
	items: [
		{
			keywords: ['podium hire', 'lectern rental'],
			cluster: 'audio visual rental',
			action: 'add-section',
			priority: 'high',
			evidence: 'google-ads 320/mo',
			reason: 'No post covers it',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			headingLevel: 2,
			heading: 'Lectern Rental',
			after: 'What Is Included',
			brief: 'Gooseneck microphone on a lectern.'
		},
		{
			keywords: ['stage riser rental'],
			cluster: 'audio visual rental',
			action: 'new-post',
			priority: 'medium',
			evidence: 'gsc pos 19.9 137 impr',
			reason: 'Own intent',
			newPost: {
				slug: 'stage-riser-rental',
				title: 'Stage Riser Rental',
				keyword: 'stage riser rental',
				targetPage: '/blog/audio-visual-rental/',
				prevSibling: 'sound-system-rental',
				nextSibling: null,
				outline: [
					{ level: 2, text: 'What it is' },
					{ level: 3, text: 'Sizes' }
				],
				brief: 'Explain risers.'
			}
		},
		{
			keywords: ['can i rent a lectern'],
			cluster: 'audio visual rental',
			action: 'add-faq',
			priority: 'low',
			evidence: 'autocomplete',
			reason: 'Short answer',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			question: 'Can I rent a lectern?'
		},
		{
			keywords: ['dj booth hire'],
			cluster: 'x',
			action: 'skip',
			priority: 'low',
			evidence: 'e',
			reason: 'Not in our inventory'
		},
		{
			keywords: ['fog hire'],
			cluster: 'x',
			action: 'skip',
			priority: 'low',
			evidence: 'e',
			reason: 'Own page exists'
		}
	]
};

describe('itemTitle', () => {
	it('names the section, the post and the faq', () => {
		expect(itemTitle(plan.items[0])).toBe(
			'Nueva sección H2 en /blog/sound-system-rental/: "Lectern Rental"'
		);
		expect(itemTitle(plan.items[1])).toBe(
			'Post nuevo /blog/stage-riser-rental/: Stage Riser Rental'
		);
		expect(itemTitle(plan.items[2])).toBe(
			'Pregunta FAQ en /blog/sound-system-rental/: "Can I rent a lectern?"'
		);
	});
});

describe('renderItemBody', () => {
	it('renders a section with file, anchor, keywords, what to cover and why', () => {
		expect(renderItemBody(plan.items[0])).toEqual([
			'Archivo: src/content/blog/sound-system-rental.svx',
			'Ubicación: después de "What Is Included"',
			'Keywords: podium hire, lectern rental (google-ads 320/mo)',
			'Qué cubrir: Gooseneck microphone on a lectern.',
			'Por qué: No post covers it'
		]);
	});

	it('uses "dentro de" for an H3 and omits the location without an anchor', () => {
		expect(renderItemBody({ ...plan.items[0], headingLevel: 3 })[1]).toBe(
			'Ubicación: dentro de "What Is Included"'
		);
		expect(renderItemBody({ ...plan.items[0], after: undefined })).not.toContainEqual(
			expect.stringContaining('Ubicación')
		);
	});

	it('renders a new post with silo, keyword, structure and links', () => {
		expect(renderItemBody(plan.items[1])).toEqual([
			'Silo: "audio visual rental"',
			'Keyword: stage riser rental',
			'Estructura: H2 What it is, H3 Sizes',
			'Keywords: stage riser rental (gsc pos 19.9 137 impr)',
			'Qué cubrir: Explain risers.',
			'Por qué: Own intent',
			'Enlaces: hacia arriba a /blog/audio-visual-rental/, después de sound-system-rental'
		]);
	});

	it('renders a faq with keywords and reason when it has no brief', () => {
		expect(renderItemBody(plan.items[2])).toEqual([
			'Archivo: src/content/blog/sound-system-rental.svx',
			'Keywords: can i rent a lectern (autocomplete)',
			'Por qué: Short answer'
		]);
	});

	it('renders a faq brief as what to cover, since it says what the answer may claim', () => {
		expect(renderItemBody({ ...plan.items[2], brief: 'Yes, with the MICE Pack.' })).toEqual([
			'Archivo: src/content/blog/sound-system-rental.svx',
			'Keywords: can i rent a lectern (autocomplete)',
			'Qué cubrir: Yes, with the MICE Pack.',
			'Por qué: Short answer'
		]);
	});

	it('shows the Avalanche fit in Spanish on the Keywords line', () => {
		expect(renderItemBody({ ...plan.items[0], avalancheFit: 'in-tier' })[2]).toBe(
			'Keywords: podium hire, lectern rental (google-ads 320/mo), dentro del tier'
		);
		expect(renderItemBody({ ...plan.items[0], avalancheFit: 'below' })[2]).toContain(
			'debajo del tier'
		);
		expect(renderItemBody({ ...plan.items[0], avalancheFit: 'above' })[2]).toContain(
			'encima del tier'
		);
		expect(renderItemBody({ ...plan.items[0], avalancheFit: 'unknown' })[2]).toContain(
			'sin volumen'
		);
	});

	it('uses only ASCII punctuation', () => {
		const text = plan.items
			.filter((i) => i.action !== 'skip')
			.flatMap((i) => [itemTitle(i), ...renderItemBody(i)])
			.join('\n');
		expect(text).not.toMatch(/[—–‘’“”…•; ]/);
		expect(ITEM_RULE_LINE).toBe(
			'Cada cambio va en los 13 idiomas en el mismo cambio y mueve updatedDate.'
		);
	});
});

describe('tierLine', () => {
	it('is null without tier data and the Avalanche line with it', () => {
		expect(tierLine(plan)).toBeNull();
		expect(
			tierLine({
				...plan,
				run: { ...plan.run, tier: { level: 100, value: 149.5, export: '2026-09-23' } }
			})
		).toBe(
			'Tier de tráfico (Avalanche, POP): Level 100 (149.5 impresiones diarias de media, export 2026-09-23).'
		);
	});
});
