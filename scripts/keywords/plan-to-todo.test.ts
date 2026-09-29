import { describe, it, expect } from 'vitest';
import { renderPlanEntry, upsertPlanEntry, MARKER, MARKER_NOTE } from './plan-to-todo';
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

describe('renderPlanEntry', () => {
	const text = renderPlanEntry(plan);
	const lines = text.split('\n');

	it('opens with the dated header and the standing rules paragraph', () => {
		expect(lines[0]).toBe(
			'-- ❌ Oportunidades de contenido del 2026-09-29 (agente content-strategist)'
		);
		expect(text).toContain('.agents/context/keywords/content-plan/2026-09-29.json');
		expect(text).toContain('reglas 1 y 2 de idioma');
	});

	it('renders each action with its priority word', () => {
		expect(text).toContain(
			'1. [alta] Nueva sección H2 en /blog/sound-system-rental/ (src/content/blog/sound-system-rental.svx), después de "What Is Included":'
		);
		expect(text).toContain('   "Lectern Rental"');
		expect(text).toContain('   Keywords: podium hire, lectern rental (google-ads 320/mo)');
		expect(text).toContain('   Qué cubrir: Gooseneck microphone on a lectern.');
		expect(text).toContain('   Por qué: No post covers it');
		expect(text).toContain(
			'2. [media] Post nuevo /blog/stage-riser-rental/ en el silo "audio visual rental" (target /blog/audio-visual-rental/, después de sound-system-rental):'
		);
		expect(text).toContain('   Título: Stage Riser Rental. Keyword: stage riser rental');
		expect(text).toContain('   Estructura: H2 What it is, H3 Sizes');
		expect(text).toContain(
			'3. [baja] Pregunta FAQ en /blog/sound-system-rental/ (src/content/blog/sound-system-rental.svx): "Can I rent a lectern?"'
		);
	});

	it('uses "dentro de" for an H3 and omits the clause without an anchor', () => {
		const h3 = {
			...plan,
			items: [
				{ ...plan.items[0], headingLevel: 3 as const },
				{ ...plan.items[0], after: undefined }
			]
		};
		const t = renderPlanEntry(h3);
		expect(t).toContain(
			'Nueva sección H3 en /blog/sound-system-rental/ (src/content/blog/sound-system-rental.svx), dentro de "What Is Included":'
		);
		expect(t).toContain(
			'2. [alta] Nueva sección H2 en /blog/sound-system-rental/ (src/content/blog/sound-system-rental.svx):'
		);
	});

	it('orders by priority and puts skips only in the final line', () => {
		const shuffled = {
			...plan,
			items: [plan.items[2], plan.items[3], plan.items[0], plan.items[1]]
		};
		const t = renderPlanEntry(shuffled);
		expect(t.indexOf('[alta]')).toBeLessThan(t.indexOf('[media]'));
		expect(t.indexOf('[media]')).toBeLessThan(t.indexOf('[baja]'));
		expect(lines[lines.length - 1]).toBe(
			'Descartadas hoy: dj booth hire (Not in our inventory), fog hire (Own page exists)'
		);
		expect(t).not.toContain('2. [baja] Descartar');
	});

	it('notes a partial or aborted run and an empty plan', () => {
		const t = renderPlanEntry({
			date: '2026-09-29',
			run: { status: 'aborted', reason: 'no candidates', candidatesReviewed: 0 },
			items: []
		});
		expect(t).toContain('Estado de la corrida: abortada (no candidates)');
		expect(t).toContain('Sin cambios de contenido propuestos hoy.');
	});

	it('uses only ASCII punctuation', () => {
		expect(text).not.toMatch(/[—–‘’“”… •;]/);
	});
});

const OTHER = '-- ✅ Otra cosa\n\nTexto previo.\n';

describe('upsertPlanEntry', () => {
	it('creates the managed section at the end when missing', () => {
		const out = upsertPlanEntry(OTHER, plan);
		expect(out.startsWith(OTHER)).toBe(true);
		const rest = out.slice(OTHER.length);
		expect(rest.startsWith(`\n\n${MARKER}\n${MARKER_NOTE}\n\n\n-- ❌ Oportunidades`)).toBe(true);
		expect(out.endsWith('\n')).toBe(true);
	});

	it('inserts a newer entry right after the section header, above older ones', () => {
		const first = upsertPlanEntry(OTHER, plan);
		const second = upsertPlanEntry(first, { ...plan, date: '2026-09-30' });
		expect(second.indexOf('del 2026-09-30')).toBeLessThan(second.indexOf('del 2026-09-29'));
		expect(second.indexOf(MARKER)).toBeLessThan(second.indexOf('del 2026-09-30'));
		expect(second.startsWith(OTHER)).toBe(true);
	});

	it('replaces the entry of the same date, idempotently, without touching the rest', () => {
		const once = upsertPlanEntry(OTHER, plan);
		const twice = upsertPlanEntry(once, plan);
		expect(twice).toBe(once);
		const changed = upsertPlanEntry(once, { ...plan, items: [plan.items[3]] });
		expect(changed).not.toContain('Lectern Rental');
		expect(changed).toContain('Descartadas hoy: dj booth hire');
		expect(changed.startsWith(OTHER)).toBe(true);
		expect(changed.match(/del 2026-09-29/g)).toHaveLength(1);
	});

	it('keeps the status glyph a person set on an existing entry', () => {
		const once = upsertPlanEntry(OTHER, plan);
		const done = once.replace('-- ❌ Oportunidades', '-- ✅ Oportunidades');
		const out = upsertPlanEntry(done, plan);
		expect(out).toContain('-- ✅ Oportunidades de contenido del 2026-09-29');
		expect(out).not.toContain('❌ Oportunidades');
	});

	it('never touches entries that follow the managed one', () => {
		const withTail = upsertPlanEntry(OTHER, plan) + '\n\n-- ❌ Cola\n\nSigue.\n';
		const out = upsertPlanEntry(withTail, { ...plan, items: [] });
		expect(out.endsWith('\n\n\n-- ❌ Cola\n\nSigue.\n')).toBe(true);
	});
});
