import { describe, it, expect } from 'vitest';
import type { ContentPlan } from '../keywords/plan.schema';
import { parseTodo } from './todo-format';
import {
	organizeText,
	verifyNoLoss,
	missingLegacyLines,
	needsPriority,
	type OrganizeCtx
} from './organize';

const plan: ContentPlan = {
	date: '2026-09-29',
	run: { status: 'ok', candidatesReviewed: 1 },
	items: [
		{
			keywords: ['lectern rental'],
			cluster: 'c',
			action: 'add-faq',
			priority: 'high',
			evidence: 'e',
			reason: 'r',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			question: 'Can I rent a lectern?'
		}
	]
};

const ctx = (over: Partial<OrganizeCtx> = {}): OrganizeCtx => ({
	plans: [],
	keywords: [],
	today: '2026-10-02',
	origen: 'usuario',
	...over
});

const LEGACY = [
	'',
	'-- ❌ Uno (anotado 2026-09-20)',
	'',
	'primera',
	'  ✅ sub item hecho',
	'',
	'-- ✅ Dos (anotado y HECHO 2026-09-25)',
	'cuerpo dos',
	'',
	'-- ❌ ✅',
	'',
	'sin título',
	'',
	'== OPORTUNIDADES DE CONTENIDO (agente content-strategist) ==',
	'ruido gestionado',
	''
].join('\n');

describe('organizeText', () => {
	it('normalizes legacy text into ordered blocks with new ids, pendientes first', () => {
		const { output, tasks } = organizeText(LEGACY, ctx({ origen: 'migrada' }));
		expect(tasks.map((t) => t.id)).toEqual(['#T0001', '#T0003', '#T0002']);
		expect(tasks.map((t) => t.estado)).toEqual(['pendiente', 'pendiente', 'hecha']);
		expect(output).toContain('Origen: migrada');
		expect(output).not.toContain('ruido gestionado');
		expect(output.indexOf('== PENDIENTES ==')).toBeLessThan(output.indexOf('== HECHAS =='));
	});

	it('is idempotent', () => {
		const first = organizeText(LEGACY, ctx()).output;
		const second = organizeText(first, ctx()).output;
		expect(second).toBe(first);
	});

	it('assigns ids to appended legacy entries after the highest, keeping existing ids', () => {
		const first = organizeText(LEGACY, ctx()).output;
		const second = organizeText(first + '\n-- ❌ Nueva (anotado 2026-10-01)\ntexto nuevo\n', ctx());
		const nueva = second.tasks.find((t) => t.titulo === 'Nueva')!;
		expect(nueva.id).toBe('#T0004');
		expect(second.tasks.find((t) => t.titulo === 'Uno')!.id).toBe('#T0001');
	});

	it('adds plan tasks with ids after the legacy ones, and completes them from keywords', () => {
		const out = organizeText(
			LEGACY,
			ctx({
				plans: [plan],
				keywords: [{ id: 'lectern-rental', status: 'covered', url: '/blog/sound-system-rental/' }]
			})
		);
		const t = out.tasks.find((x) => x.origen.startsWith('content-strategist'))!;
		expect(t.id).toBe('#T0004');
		expect(t.estado).toBe('hecha');
		expect(t.hecha).toBe('2026-10-02');
	});

	it('applies plan priorities to default-priority tasks only', () => {
		const withTodo = {
			...plan,
			todo: [{ id: '#T0001', priority: 'alta' as const, reason: 'urge' }]
		};
		const out = organizeText(LEGACY, ctx({ plans: [withTodo] }));
		const t = out.tasks.find((x) => x.id === '#T0001')!;
		expect(t.prioridad).toBe('alta');
		expect(t.nota).toContain('prioridad asignada por content-strategist el 2026-09-29: urge');
	});
});

describe('verifyNoLoss', () => {
	it('passes for the organized output and fails when a description line is gone', () => {
		const { output, inputTasks } = organizeText(LEGACY, ctx());
		expect(verifyNoLoss(inputTasks, output)).toEqual([]);
		const broken = output.replace('primera\n', '');
		expect(verifyNoLoss(inputTasks, broken).join('\n')).toContain('primera');
	});

	it('reports a missing id', () => {
		const { output, inputTasks } = organizeText(LEGACY, ctx());
		const missing = verifyNoLoss(
			inputTasks,
			output.replace(/=== TAREA #T0002 ===[\s\S]*?=== FIN #T0002 ===\n/, '')
		);
		expect(missing.join('\n')).toContain('#T0002');
	});
});

describe('missingLegacyLines', () => {
	it('is empty when every content line is in the output', () => {
		const { output } = organizeText(LEGACY, ctx());
		expect(missingLegacyLines(LEGACY, output)).toEqual([]);
	});

	it('lists a lost line, ignores legacy headers and the managed section', () => {
		const { output } = organizeText(LEGACY, ctx());
		const missing = missingLegacyLines(LEGACY, output.replace('cuerpo dos\n', ''));
		expect(missing).toEqual(['cuerpo dos']);
	});
});

describe('needsPriority', () => {
	it('lists open tasks with the default-priority note, three description lines each', () => {
		const { tasks } = organizeText(
			LEGACY.replace('== OPORTUNIDADES', '-- ❌ Larga\na\nb\nc\nd\n\n== OPORTUNIDADES'),
			ctx()
		);
		const out = needsPriority(tasks);
		expect(out.map((t) => t.titulo)).toEqual(['Uno', 'sin título', 'Larga']);
		expect(out[2]).toEqual({
			id: '#T0004',
			titulo: 'Larga',
			estado: 'pendiente',
			anotada: 'sin fecha',
			descripcion: ['a', 'b', 'c']
		});
		expect(parseTodo(organizeText(LEGACY, ctx()).output).tasks.length).toBe(3);
	});
});
