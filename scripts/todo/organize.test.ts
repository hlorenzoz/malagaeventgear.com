import { describe, it, expect } from 'vitest';
import type { ContentPlan } from '../keywords/plan.schema';
import { type Task } from './todo-format';
import { parseTodoJson, renderTodoJson } from './todo-json';
import { organizeJson, verifyNoLoss, needsPriority, type OrganizeCtx } from './organize';

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
	translationsDone: true,
	...over
});

const task = (over: Partial<Task> = {}): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'otro',
	titulo: 'Uno',
	anotada: '2026-09-20',
	origen: 'usuario',
	descripcion: ['primera', 'segunda'],
	...over
});

/** A TODO.json text with three tasks: two open (one with the default-priority note) and one done. */
const FILE = renderTodoJson(
	[
		task({ id: '#T0001', nota: 'prioridad por defecto' }),
		task({ id: '#T0002', titulo: 'Dos', prioridad: 'alta', descripcion: ['cuerpo dos'] }),
		task({
			id: '#T0003',
			titulo: 'Tres',
			estado: 'hecha',
			hecha: '2026-09-25',
			descripcion: ['cuerpo tres']
		})
	],
	'2026-10-01'
);

/** The same file with the tasks in the wrong order, as a hand edit could leave it. */
const UNSORTED =
	JSON.stringify({ ...JSON.parse(FILE), tasks: JSON.parse(FILE).tasks.reverse() }, null, 2) + '\n';

describe('organizeJson', () => {
	it('sorts the tasks and writes valid TODO.json', () => {
		const { output, tasks } = organizeJson(UNSORTED, ctx());
		expect(tasks.map((t) => t.id)).toEqual(['#T0002', '#T0001', '#T0003']);
		expect(parseTodoJson(output).tasks.map((t) => t.id)).toEqual(['#T0002', '#T0001', '#T0003']);
	});

	it('is idempotent', () => {
		const first = organizeJson(FILE, ctx()).output;
		const second = organizeJson(first, ctx()).output;
		expect(second).toBe(first);
	});

	it('keeps `updated` when nothing changes and moves it to today when something does', () => {
		const same = organizeJson(FILE, ctx({ today: '2026-10-05' })).output;
		expect(same).toBe(FILE);
		expect(parseTodoJson(same).updated).toBe('2026-10-01');
		const changed = organizeJson(FILE, ctx({ today: '2026-10-05', plans: [plan] })).output;
		expect(parseTodoJson(changed).updated).toBe('2026-10-05');
		const sorted = organizeJson(UNSORTED, ctx({ today: '2026-10-06' })).output;
		expect(parseTodoJson(sorted).updated).toBe('2026-10-06');
	});

	it('adds plan tasks with ids after the highest one, and completes them from keywords', () => {
		const out = organizeJson(
			FILE,
			ctx({
				plans: [plan],
				keywords: [{ id: 'lectern-rental', status: 'covered', url: '/blog/sound-system-rental/' }]
			})
		);
		const t = out.tasks.find((x) => x.origen.startsWith('content-strategist'))!;
		expect(t.id).toBe('#T0004');
		expect(t.tipo).toBe('contenido');
		expect(t.estado).toBe('hecha');
		expect(t.hecha).toBe('2026-10-02');
	});

	it('applies plan priorities to default-priority tasks only', () => {
		const withTodo = {
			...plan,
			todo: [
				{ id: '#T0001', priority: 'alta' as const, reason: 'urge' },
				{ id: '#T0002', priority: 'baja' as const, reason: 'no debe aplicar' }
			]
		};
		const out = organizeJson(FILE, ctx({ plans: [withTodo] }));
		const t1 = out.tasks.find((x) => x.id === '#T0001')!;
		expect(t1.prioridad).toBe('alta');
		expect(t1.nota).toContain('prioridad asignada por content-strategist el 2026-09-29: urge');
		expect(out.tasks.find((x) => x.id === '#T0002')!.prioridad).toBe('alta');
	});

	it('does not touch a task a person wrote, even when a plan has a task for the same keyword', () => {
		const out = organizeJson(FILE, ctx({ plans: [plan] }));
		expect(out.tasks.find((x) => x.id === '#T0002')).toMatchObject({
			titulo: 'Dos',
			origen: 'usuario',
			tipo: 'otro'
		});
	});

	it('throws an error naming TODO.json when the file is not valid, and writes nothing', () => {
		expect(() => organizeJson('{ "version": 1 }', ctx())).toThrow(/TODO\.json/);
		expect(() => organizeJson('# TODO.txt: lista', ctx())).toThrow(/TODO\.json/);
	});
});

describe('verifyNoLoss', () => {
	it('passes for the organized tasks and fails when a description line is gone', () => {
		const { tasks, inputTasks } = organizeJson(FILE, ctx());
		expect(verifyNoLoss(inputTasks, tasks)).toEqual([]);
		const broken = tasks.map((t) =>
			t.id === '#T0001' ? { ...t, descripcion: t.descripcion.filter((l) => l !== 'primera') } : t
		);
		expect(verifyNoLoss(inputTasks, broken).join('\n')).toContain('primera');
	});

	it('reports a missing id', () => {
		const { tasks, inputTasks } = organizeJson(FILE, ctx());
		const missing = verifyNoLoss(
			inputTasks,
			tasks.filter((t) => t.id !== '#T0002')
		);
		expect(missing.join('\n')).toContain('#T0002');
	});

	it('requires the lines in order inside the same task', () => {
		const { tasks, inputTasks } = organizeJson(FILE, ctx());
		const swapped = tasks.map((t) =>
			t.id === '#T0001' ? { ...t, descripcion: ['segunda', 'primera'] } : t
		);
		expect(verifyNoLoss(inputTasks, swapped).length).toBeGreaterThan(0);
	});
});

describe('needsPriority', () => {
	it('lists open tasks with the default-priority note, three description lines each', () => {
		const text = renderTodoJson(
			[
				task({ id: '#T0001', nota: 'prioridad por defecto', descripcion: ['a', 'b', 'c', 'd'] }),
				task({ id: '#T0002', titulo: 'Con prioridad' }),
				task({
					id: '#T0003',
					titulo: 'Hecha',
					estado: 'hecha',
					hecha: '2026-09-25',
					nota: 'prioridad por defecto'
				})
			],
			'2026-10-01'
		);
		const out = needsPriority(organizeJson(text, ctx()).tasks);
		expect(out).toEqual([
			{
				id: '#T0001',
				titulo: 'Uno',
				estado: 'pendiente',
				anotada: '2026-09-20',
				descripcion: ['a', 'b', 'c']
			}
		]);
	});
});

describe('organizeJson translation gate', () => {
	it('adds the plan tasks as bloqueada while translations are missing', () => {
		const out = organizeJson(FILE, ctx({ plans: [plan], translationsDone: false }));
		const t = out.tasks.find((x) => x.origen.startsWith('content-strategist'))!;
		expect(t.estado).toBe('bloqueada');
	});

	it('leaves the tasks of a person alone', () => {
		const out = organizeJson(FILE, ctx({ translationsDone: false }));
		expect(out.tasks.filter((t) => t.estado === 'bloqueada')).toEqual([]);
	});
});
