import { describe, it, expect } from 'vitest';
import { ContentPlanSchema, type ContentPlan } from '../keywords/plan.schema';
import { itemOrigin, planTasks } from './plan-tasks';
import type { Task } from './todo-format';
import {
	parseNextArgs,
	parseOrigin,
	parseTaskTitle,
	planFilePath,
	selectTasks,
	type PlanLookup
} from './next-task';

const task = (over: Partial<Task>): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'contenido',
	titulo: 'Pregunta FAQ en /blog/tv-screen-rental/: "How big?"',
	anotada: '2026-09-29',
	origen: 'content-strategist (plan 2026-09-29, ítem 1)',
	descripcion: ['Archivo: src/content/blog/tv-screen-rental.svx'],
	...over
});

const PLAN: ContentPlan = ContentPlanSchema.parse({
	date: '2026-09-29',
	run: { status: 'ok', candidatesReviewed: 3 },
	items: [
		{
			keywords: ['how big'],
			cluster: 'audio visual rental',
			action: 'add-faq',
			priority: 'high',
			evidence: 'gsc 10 impr',
			reason: 'gap',
			targetUrl: '/blog/tv-screen-rental/',
			file: 'src/content/blog/tv-screen-rental.svx',
			question: 'How big?',
			brief: 'say it'
		},
		{
			keywords: ['booking'],
			cluster: 'audio visual rental',
			action: 'add-section',
			priority: 'medium',
			evidence: 'ads 90/mo',
			reason: 'gap',
			targetUrl: '/blog/sound-system-rental/',
			file: 'src/content/blog/sound-system-rental.svx',
			headingLevel: 2,
			heading: 'Booking and Service Area',
			after: 'Pricing',
			brief: 'cover it'
		}
	]
});

const lookup =
	(plans: Record<string, ContentPlan | null>): PlanLookup =>
	(date) =>
		date in plans ? plans[date] : null;

describe('parseTaskTitle', () => {
	it('reads an add-section title with its level, url, slug and heading', () => {
		expect(parseTaskTitle('Nueva sección H3 en /blog/sound-system-rental/: "Line Array"')).toEqual({
			kind: 'add-section',
			level: 3,
			url: '/blog/sound-system-rental/',
			slug: 'sound-system-rental',
			heading: 'Line Array'
		});
	});

	it('reads an add-faq title and keeps inner quotes of the question', () => {
		expect(parseTaskTitle('Pregunta FAQ en /blog/a-b/: "What is a "goose" neck?"')).toEqual({
			kind: 'add-faq',
			url: '/blog/a-b/',
			slug: 'a-b',
			question: 'What is a "goose" neck?'
		});
	});

	it('refuses a new post, saying why', () => {
		const parsed = parseTaskTitle('Post nuevo /blog/some-post/: Some Post');
		expect(parsed).toEqual({ skip: expect.stringContaining('cover image') });
	});

	it('refuses a title that no template of the content-strategist generated', () => {
		const parsed = parseTaskTitle('Copia del sitio: el mínimo de 400 euros');
		expect(parsed).toEqual({ skip: expect.stringContaining('not a content-strategist title') });
	});

	it('parses exactly the titles that plan-tasks generates', () => {
		const tasks = planTasks(PLAN).map((t) => parseTaskTitle(t.titulo));
		expect(tasks.map((t) => ('skip' in t ? 'skip' : t.kind))).toEqual(['add-faq', 'add-section']);
	});
});

describe('parseOrigin', () => {
	it('reads the plan date and the 1-based item of a content-strategist origin', () => {
		expect(parseOrigin(itemOrigin('2026-10-01', 9))).toEqual({ date: '2026-10-01', item: 9 });
	});

	it('returns null for any other origin', () => {
		expect(parseOrigin('migrada')).toBeNull();
		expect(parseOrigin('content-strategist (plan 2026-10-01, descartes)')).toBeNull();
	});
});

describe('planFilePath', () => {
	it('names the dated plan under the content-plan folder', () => {
		expect(planFilePath('2026-09-29')).toBe(
			'.agents/context/keywords/content-plan/2026-09-29.json'
		);
	});
});

describe('selectTasks', () => {
	it('keeps only open pendiente contenido tasks, by priority, then oldest anotada, then id', () => {
		const tasks = [
			task({ id: '#T0005', prioridad: 'baja', anotada: '2026-09-01' }),
			task({ id: '#T0004', prioridad: 'alta', anotada: '2026-10-01' }),
			task({ id: '#T0003', prioridad: 'alta', anotada: '2026-09-29' }),
			task({ id: '#T0002', prioridad: 'alta', anotada: '2026-09-29' }),
			task({ id: '#T0006', estado: 'bloqueada', prioridad: 'alta' }),
			task({ id: '#T0007', estado: 'en curso', prioridad: 'alta' }),
			task({ id: '#T0008', tipo: 'seo-tecnico', prioridad: 'alta' }),
			task({ id: '#T0009', estado: 'hecha', hecha: '2026-09-30', prioridad: 'alta' })
		];
		const { queue, skipped } = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 10 });
		expect(queue.map((q) => q.id)).toEqual(['#T0002', '#T0003', '#T0004', '#T0005']);
		expect(skipped).toEqual([]);
	});

	it('puts a task with no date last inside its priority', () => {
		const tasks = [
			task({ id: '#T0001', prioridad: 'alta', anotada: 'sin fecha' }),
			task({ id: '#T0002', prioridad: 'alta', anotada: '2026-09-29' })
		];
		const { queue } = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 10 });
		expect(queue.map((q) => q.id)).toEqual(['#T0002', '#T0001']);
	});

	it('limits the queue to max and exposes the first as next', () => {
		const tasks = [task({ id: '#T0001' }), task({ id: '#T0002' }), task({ id: '#T0003' })];
		const out = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 2 });
		expect(out.queue).toHaveLength(2);
		expect(out.next).toEqual(out.queue[0]);
	});

	it('resolves the plan item with its evidence, keywords and brief', () => {
		const { next } = selectTasks([task({})], lookup({ '2026-09-29': PLAN }), { max: 1 });
		expect(next).toMatchObject({
			id: '#T0001',
			prioridad: 'media',
			kind: 'add-faq',
			slug: 'tv-screen-rental',
			url: '/blog/tv-screen-rental/',
			question: 'How big?',
			origen: 'content-strategist (plan 2026-09-29, ítem 1)',
			planFile: '.agents/context/keywords/content-plan/2026-09-29.json',
			planItemNumber: 1,
			descripcion: ['Archivo: src/content/blog/tv-screen-rental.svx']
		});
		expect(next?.planItem).toMatchObject({
			evidence: 'gsc 10 impr',
			keywords: ['how big'],
			brief: 'say it'
		});
	});

	it('carries the heading and level of an add-section task', () => {
		const t = task({
			id: '#T0002',
			titulo: 'Nueva sección H2 en /blog/sound-system-rental/: "Booking and Service Area"',
			origen: itemOrigin('2026-09-29', 2)
		});
		const { next } = selectTasks([t], lookup({ '2026-09-29': PLAN }), { max: 1 });
		expect(next).toMatchObject({
			kind: 'add-section',
			level: 2,
			heading: 'Booking and Service Area',
			slug: 'sound-system-rental'
		});
	});

	it('skips, with the reason, a new post, a hand written task and a task of another origin', () => {
		const tasks = [
			task({ id: '#T0001', titulo: 'Post nuevo /blog/x/: X', origen: itemOrigin('2026-09-29', 1) }),
			task({ id: '#T0002', titulo: 'Copia del sitio: algo', origen: 'migrada' }),
			task({ id: '#T0003', origen: 'usuario' })
		];
		const { queue, skipped } = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 5 });
		expect(queue).toEqual([]);
		expect(skipped.map((s) => s.id)).toEqual(['#T0001', '#T0002', '#T0003']);
		expect(skipped[0].reason).toContain('cover image');
		expect(skipped[1].reason).toContain('not a content-strategist title');
		expect(skipped[2].reason).toContain('no content plan');
	});

	it('skips a task whose plan file is missing or whose item is out of range or does not match', () => {
		const tasks = [
			task({ id: '#T0001', origen: itemOrigin('2026-01-01', 1) }),
			task({ id: '#T0002', origen: itemOrigin('2026-09-29', 9) }),
			task({ id: '#T0003', origen: itemOrigin('2026-09-29', 2) })
		];
		const { queue, skipped } = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 5 });
		expect(queue).toEqual([]);
		expect(skipped[0].reason).toContain('plan file');
		expect(skipped[1].reason).toContain('item 9');
		expect(skipped[2].reason).toContain('does not match');
	});

	it('--task selects that one task whatever its place in the order', () => {
		const tasks = [
			task({ id: '#T0001', prioridad: 'alta' }),
			task({ id: '#T0002', prioridad: 'baja' })
		];
		const out = selectTasks(tasks, lookup({ '2026-09-29': PLAN }), { max: 1, taskId: '#T0002' });
		expect(out.error).toBeUndefined();
		expect(out.next?.id).toBe('#T0002');
		expect(out.queue.map((q) => q.id)).toEqual(['#T0002']);
	});

	it('--task errors with the reason when the task is not implementable', () => {
		const tasks = [
			task({ id: '#T0001', estado: 'bloqueada' }),
			task({ id: '#T0002', tipo: 'seo-tecnico' }),
			task({ id: '#T0003', titulo: 'Post nuevo /blog/x/: X' })
		];
		const plans = lookup({ '2026-09-29': PLAN });
		expect(selectTasks(tasks, plans, { max: 1, taskId: '#T0001' }).error).toContain('bloqueada');
		expect(selectTasks(tasks, plans, { max: 1, taskId: '#T0002' }).error).toContain('seo-tecnico');
		expect(selectTasks(tasks, plans, { max: 1, taskId: '#T0003' }).error).toContain('cover image');
		expect(selectTasks(tasks, plans, { max: 1, taskId: '#T0099' }).error).toContain('#T0099');
	});

	it('returns next null when nothing is implementable', () => {
		const out = selectTasks([], lookup({}), { max: 1 });
		expect(out).toEqual({ next: null, queue: [], skipped: [] });
	});
});

describe('parseNextArgs', () => {
	it('defaults to one task and no id', () => {
		expect(parseNextArgs([])).toEqual({ max: 1 });
	});

	it('reads --task and --max, and ignores --dry-run', () => {
		expect(parseNextArgs(['--task', '#T0036', '--max', '3', '--dry-run'])).toEqual({
			max: 3,
			taskId: '#T0036'
		});
	});

	it('throws on a bad id, a bad max or an unknown flag', () => {
		expect(() => parseNextArgs(['--task', 'T36'])).toThrow(/#Tnnnn/);
		expect(() => parseNextArgs(['--max', '0'])).toThrow(/--max/);
		expect(() => parseNextArgs(['--bogus'])).toThrow(/--bogus/);
	});
});
