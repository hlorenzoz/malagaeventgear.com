import { describe, it, expect } from 'vitest';
import type { ContentPlan } from '../keywords/plan.schema';
import type { Task } from './todo-format';
import {
	planTasks,
	planOrigin,
	upsertPlanTasks,
	applyPriorities,
	autoComplete,
	applyTranslationGate,
	TRANSLATION_GATE_NOTE,
	type KeywordStatus
} from './plan-tasks';

const plan: ContentPlan = {
	date: '2026-09-29',
	run: {
		status: 'ok',
		candidatesReviewed: 20,
		tier: { level: 100, value: 149.5, export: '2026-09-23' }
	},
	items: [
		{
			keywords: ['podium hire'],
			cluster: 'c',
			action: 'skip',
			priority: 'low',
			evidence: 'e',
			reason: 'Own page exists'
		},
		{
			keywords: ['lectern rental', 'podium'],
			cluster: 'audio visual rental',
			action: 'add-section',
			priority: 'high',
			evidence: 'google-ads 320/mo',
			reason: 'No post covers it',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			headingLevel: 2,
			heading: 'Lectern Rental',
			brief: 'Gooseneck.'
		},
		{
			keywords: ['stage riser rental'],
			cluster: 'audio visual rental',
			action: 'new-post',
			priority: 'medium',
			evidence: 'gsc',
			reason: 'Own intent',
			newPost: {
				slug: 'stage-riser-rental',
				title: 'Stage Riser Rental',
				keyword: 'stage riser rental',
				targetPage: '/blog/audio-visual-rental/',
				outline: [{ level: 2, text: 'What it is' }],
				brief: 'Explain.'
			}
		},
		{
			keywords: ['fog hire'],
			cluster: 'c',
			action: 'skip',
			priority: 'low',
			evidence: 'e',
			reason: 'Not ours'
		},
		{
			keywords: ['can i rent a lectern'],
			cluster: 'c',
			action: 'add-faq',
			priority: 'low',
			evidence: 'autocomplete',
			reason: 'Short',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			question: 'Can I rent a lectern?'
		}
	]
};

describe('planTasks', () => {
	const tasks = planTasks(plan);

	it('makes one task per non-skip item, keyed by plan date and item index', () => {
		const items = tasks.filter((t) => t.origen !== planOrigin(plan.date));
		expect(items.map((t) => t.origen)).toEqual([
			'content-strategist (plan 2026-09-29, ítem 2)',
			'content-strategist (plan 2026-09-29, ítem 3)',
			'content-strategist (plan 2026-09-29, ítem 5)'
		]);
		expect(items.map((t) => t.prioridad)).toEqual(['alta', 'media', 'baja']);
		expect(items.every((t) => t.estado === 'pendiente' && t.anotada === '2026-09-29')).toBe(true);
		expect(items.every((t) => t.id === '')).toBe(true);
	});

	it('classifies every task of a plan as contenido', () => {
		expect(tasks.length).toBeGreaterThan(0);
		expect(tasks.every((t) => t.tipo === 'contenido')).toBe(true);
	});

	it('titles like the old renderer and ends the description with the rule line', () => {
		const t = tasks[0];
		expect(t.titulo).toBe('Nueva sección H2 en /blog/sound-system-rental/: "Lectern Rental"');
		expect(t.descripcion.at(-1)).toBe(
			'Cada cambio va en los 13 idiomas en el mismo cambio y mueve updatedDate.'
		);
		expect(t.descripcion).toContain('Por qué: No post covers it');
	});

	it('puts the tier line first in every task of a plan that has one', () => {
		for (const t of tasks) {
			expect(t.descripcion[0]).toBe(
				'Tier de tráfico (Avalanche, POP): Level 100 (149.5 impresiones diarias de media, export 2026-09-23).'
			);
		}
	});

	it('turns the skips of a plan into ONE done task with a line per skip', () => {
		const skip = tasks.find((t) => t.origen === planOrigin(plan.date))!;
		expect(skip).toMatchObject({
			estado: 'hecha',
			hecha: '2026-09-29',
			anotada: '2026-09-29',
			titulo: 'Descartadas por content-strategist el 2026-09-29'
		});
		expect(skip.descripcion).toContain('podium hire (Own page exists)');
		expect(skip.descripcion).toContain('fog hire (Not ours)');
	});

	it('makes no skip task when nothing was skipped, and no tier line without tier', () => {
		const p: ContentPlan = {
			...plan,
			run: { ...plan.run, tier: undefined },
			items: [plan.items[1]]
		};
		const t = planTasks(p);
		expect(t).toHaveLength(1);
		expect(t[0].descripcion[0]).not.toContain('Tier');
	});
});

describe('upsertPlanTasks', () => {
	it('adds the tasks of every plan', () => {
		const out = upsertPlanTasks([], [plan]);
		expect(out).toHaveLength(4);
	});

	it('never touches an existing task by origen, only fills a missing description', () => {
		const existing: Task = {
			id: '#T0007',
			estado: 'en curso',
			prioridad: 'baja',
			titulo: 'Editado por el usuario',
			anotada: '2026-09-29',
			origen: 'content-strategist (plan 2026-09-29, ítem 2)',
			nota: 'mía',
			descripcion: []
		};
		const out = upsertPlanTasks([existing], [plan]);
		expect(out).toHaveLength(4);
		const t = out.find((x) => x.id === '#T0007')!;
		expect(t).toMatchObject({
			estado: 'en curso',
			prioridad: 'baja',
			titulo: 'Editado por el usuario',
			nota: 'mía'
		});
		expect(t.descripcion.length).toBeGreaterThan(0);
		const kept = upsertPlanTasks([{ ...existing, descripcion: ['mi texto'] }], [plan]);
		expect(kept.find((x) => x.id === '#T0007')!.descripcion).toEqual(['mi texto']);
	});

	it('is idempotent', () => {
		const once = upsertPlanTasks([], [plan]).map((t, i) => ({ ...t, id: `#T000${i + 1}` }));
		expect(upsertPlanTasks(once, [plan])).toEqual(once);
	});
});

describe('applyPriorities', () => {
	const base: Task[] = [
		{
			id: '#T0001',
			estado: 'pendiente',
			prioridad: 'media',
			titulo: 'a',
			anotada: 'sin fecha',
			origen: 'usuario',
			nota: 'estado por confirmar (tenía ""), prioridad por defecto',
			descripcion: ['x']
		},
		{
			id: '#T0002',
			estado: 'pendiente',
			prioridad: 'media',
			titulo: 'b',
			anotada: '2026-09-01',
			origen: 'usuario',
			descripcion: ['y']
		}
	];
	const withTodo: ContentPlan = {
		...plan,
		todo: [
			{ id: '#T0001', priority: 'alta', reason: 'bloquea el silo' },
			{ id: '#T0002', priority: 'alta', reason: 'no debería aplicarse' },
			{ id: '#T0099', priority: 'baja', reason: 'no existe' }
		]
	};

	it('sets priority only on tasks with the default-priority note, and replaces that note', () => {
		const out = applyPriorities(base, [withTodo]);
		expect(out[0].prioridad).toBe('alta');
		expect(out[0].nota).toBe(
			'estado por confirmar (tenía ""), prioridad asignada por content-strategist el 2026-09-29: bloquea el silo'
		);
		expect(out[1]).toEqual(base[1]);
	});

	it('applies each task once, so a later plan cannot override it', () => {
		const later: ContentPlan = {
			...withTodo,
			date: '2026-09-30',
			todo: [{ id: '#T0001', priority: 'baja', reason: 'otra vez' }]
		};
		expect(applyPriorities(base, [withTodo, later])[0].prioridad).toBe('alta');
	});
});

describe('autoComplete', () => {
	const tasks = () => upsertPlanTasks([], [plan]).map((t, i) => ({ ...t, id: `#T000${i + 1}` }));
	const kw = (id: string, status: string, url: string | null): KeywordStatus => ({
		id,
		status,
		url
	});

	it('closes a plan task when its first keyword is covered or published on the target url', () => {
		const out = autoComplete(
			tasks(),
			[plan],
			[
				kw('lectern-rental', 'covered', '/blog/sound-system-rental/'),
				kw('stage-riser-rental', 'published', '/blog/stage-riser-rental/')
			],
			'2026-10-02'
		);
		const byOrigin = (n: number) =>
			out.find((t) => t.origen === `content-strategist (plan 2026-09-29, ítem ${n})`)!;
		expect(byOrigin(2)).toMatchObject({
			estado: 'hecha',
			hecha: '2026-10-02',
			nota: 'marcada hecha por plan-coverage'
		});
		expect(byOrigin(3).estado).toBe('hecha');
		expect(byOrigin(5).estado).toBe('pendiente');
	});

	it('needs the same url and a covered or published status', () => {
		const out = autoComplete(
			tasks(),
			[plan],
			[
				kw('lectern-rental', 'covered', '/blog/otro/'),
				kw('stage-riser-rental', 'idea', '/blog/stage-riser-rental/'),
				kw('can-i-rent-a-lectern', 'planned', '/blog/sound-system-rental/')
			],
			'2026-10-02'
		);
		expect(out.filter((t) => t.estado === 'hecha')).toHaveLength(1); // only the skips task
	});

	it('appends to an existing note, and never touches other tasks or done ones', () => {
		const list = tasks();
		list[0] = { ...list[0], nota: 'mía' };
		const other: Task = {
			id: '#T0050',
			estado: 'pendiente',
			prioridad: 'alta',
			titulo: 'x',
			anotada: '2026-09-01',
			origen: 'usuario',
			descripcion: ['z']
		};
		const out = autoComplete(
			[...list, other],
			[plan],
			[kw('lectern-rental', 'covered', '/blog/sound-system-rental/')],
			'2026-10-02'
		);
		expect(out.find((t) => t.id === list[0].id)!.nota).toBe('mía, marcada hecha por plan-coverage');
		expect(out.find((t) => t.id === '#T0050')).toEqual(other);
		const again = autoComplete(
			out,
			[plan],
			[kw('lectern-rental', 'covered', '/blog/sound-system-rental/')],
			'2026-10-05'
		);
		expect(again).toEqual(out);
	});
});

describe('applyTranslationGate', () => {
	const t = (over: Partial<Task>): Task => ({
		id: '#T0001',
		estado: 'pendiente',
		prioridad: 'media',
		tipo: 'contenido',
		titulo: 'x',
		anotada: '2026-09-29',
		origen: 'content-strategist (plan 2026-09-29, ítem 1)',
		descripcion: ['d'],
		...over
	});

	it('blocks pending content-strategist tasks while translations are missing, with a note', () => {
		const [out] = applyTranslationGate([t({ nota: 'prioridad por defecto' })], false);
		expect(out.estado).toBe('bloqueada');
		expect(out.nota).toBe(`prioridad por defecto, ${TRANSLATION_GATE_NOTE}`);
		expect(applyTranslationGate([out], false)).toEqual([out]);
	});

	it('unblocks them, and drops only its note, once every post is translated', () => {
		const blocked = applyTranslationGate([t({ nota: 'otra' })], false);
		const [out] = applyTranslationGate(blocked, true);
		expect(out.estado).toBe('pendiente');
		expect(out.nota).toBe('otra');
		const [bare] = applyTranslationGate(applyTranslationGate([t({})], false), true);
		expect(bare.nota).toBeUndefined();
	});

	it('never touches user tasks, tasks in progress or done tasks', () => {
		const tasks = [
			t({ id: '#T0002', origen: 'usuario' }),
			t({ id: '#T0003', estado: 'en curso' }),
			t({ id: '#T0004', estado: 'hecha', hecha: '2026-10-01' }),
			t({ id: '#T0005', origen: 'usuario', estado: 'bloqueada' })
		];
		expect(applyTranslationGate(tasks, false)).toEqual(tasks);
		expect(applyTranslationGate(tasks, true)).toEqual(tasks);
	});

	it('drops the note from a blocked task that got completed', () => {
		const [out] = applyTranslationGate(
			[t({ estado: 'hecha', hecha: '2026-10-01', nota: `${TRANSLATION_GATE_NOTE}, marcada hecha por plan-coverage` })],
			false
		);
		expect(out.nota).toBe('marcada hecha por plan-coverage');
	});
});
