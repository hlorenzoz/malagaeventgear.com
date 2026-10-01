#!/usr/bin/env bun
/**
 * next-task.ts: which open task `just todo-implement` should implement next. Read only: it never
 * writes TODO.json or any plan.
 *
 *   just todo-next [--task #T0036] [--max N]
 *
 * An IMPLEMENTABLE task is `pendiente`, `contenido`, and carries one of the titles the
 * content-strategist generates (`plan-to-todo.ts`, `itemTitle`): `Nueva seccion H2/H3 en
 * /blog/<slug>/: "<heading>"` (add-section) or `Pregunta FAQ en /blog/<slug>/: "<question>"`
 * (add-faq), and its origin points to an item of a committed content plan. `Post nuevo` tasks
 * are NOT implementable in v1 (a new post needs a cover image in R2 and its silo links).
 * Order: prioridad (alta, media, baja), oldest `anotada` first (no date last), id.
 *
 * Output (JSON): { next, queue, skipped } or, for `--task` on a task that cannot be implemented,
 * { error } with exit 1. `queue` holds the first `--max` tasks (default 1), `next` is queue[0].
 */

import { existsSync, readFileSync } from 'node:fs';
import { ContentPlanSchema, type ContentPlan, type PlanItem } from '../keywords/plan.schema';
import { todoPath } from '../paths';
import { parseTodoJson } from './todo-json';
import type { Prioridad, Task } from './todo-format';

export const PLAN_DIR = '.agents/context/keywords/content-plan';

export const planFilePath = (date: string): string => `${PLAN_DIR}/${date}.json`;

export type ParsedTitle =
	| { kind: 'add-section'; level: 2 | 3; url: string; slug: string; heading: string }
	| { kind: 'add-faq'; url: string; slug: string; question: string }
	| { skip: string };

const SECTION_RE = /^Nueva sección H([23]) en (\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/): "(.+)"$/;
const FAQ_RE = /^Pregunta FAQ en (\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/): "(.+)"$/;
const NEW_POST_RE = /^Post nuevo \/blog\//;

export const NEW_POST_REASON =
	'a new post is not implementable in v1: it needs a cover image in R2 and its reverse silo links';

/** Pure: the task kind and its parts from a generated title, or why it is not implementable. */
export function parseTaskTitle(titulo: string): ParsedTitle {
	const section = SECTION_RE.exec(titulo);
	if (section) {
		return {
			kind: 'add-section',
			level: Number(section[1]) as 2 | 3,
			url: section[2],
			slug: section[3],
			heading: section[4]
		};
	}
	const faq = FAQ_RE.exec(titulo);
	if (faq) return { kind: 'add-faq', url: faq[1], slug: faq[2], question: faq[3] };
	if (NEW_POST_RE.test(titulo)) return { skip: NEW_POST_REASON };
	return { skip: 'not a content-strategist title (Nueva seccion / Pregunta FAQ)' };
}

const ORIGIN_RE = /^content-strategist \(plan (\d{4}-\d{2}-\d{2}), ítem (\d+)\)$/;

/** Pure: the plan date and the 1-based item an Origen points to, or null. */
export function parseOrigin(origen: string): { date: string; item: number } | null {
	const m = ORIGIN_RE.exec(origen);
	return m ? { date: m[1], item: Number(m[2]) } : null;
}

/** Reads a plan by date: null when the file is missing or invalid. */
export type PlanLookup = (date: string) => ContentPlan | null;

export interface NextTask {
	id: string;
	prioridad: Prioridad;
	kind: 'add-section' | 'add-faq';
	slug: string;
	url: string;
	level?: 2 | 3;
	heading?: string;
	question?: string;
	origen: string;
	planFile: string;
	/** 1-based, as in the Origen. */
	planItemNumber: number;
	/** The matching item of the plan: evidence, keywords, reason, brief, after... */
	planItem: PlanItem;
	descripcion: string[];
}

export interface Skipped {
	id: string;
	titulo: string;
	reason: string;
}

export interface Selection {
	next: NextTask | null;
	queue: NextTask[];
	skipped: Skipped[];
	/** Only with `taskId`, when that task cannot be implemented. */
	error?: string;
}

export interface SelectOptions {
	max: number;
	taskId?: string;
}

const PRIO_RANK: Record<Prioridad, number> = { alta: 0, media: 1, baja: 2 };
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Oldest first, a task with no date last. */
const oldestFirst = (a: string, b: string): number => {
	const da = DATE_RE.test(a) ? a : '9999-99-99';
	const db = DATE_RE.test(b) ? b : '9999-99-99';
	return da < db ? -1 : da > db ? 1 : 0;
};

const byOrder = (a: Task, b: Task): number =>
	PRIO_RANK[a.prioridad] - PRIO_RANK[b.prioridad] ||
	oldestFirst(a.anotada, b.anotada) ||
	(a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** Pure: the task as implementable, or the reason it is not. */
function resolveTask(t: Task, plans: PlanLookup): NextTask | { skip: string } {
	const parsed = parseTaskTitle(t.titulo);
	if ('skip' in parsed) return parsed;
	const origin = parseOrigin(t.origen);
	if (!origin) return { skip: `no content plan item in the origin "${t.origen}"` };
	const plan = plans(origin.date);
	if (!plan) return { skip: `plan file ${planFilePath(origin.date)} is missing or invalid` };
	const planItem = plan.items[origin.item - 1];
	if (!planItem) {
		return { skip: `plan ${origin.date} has no item ${origin.item} (${plan.items.length} items)` };
	}
	const matches =
		parsed.kind === 'add-section'
			? planItem.action === 'add-section' &&
				planItem.heading === parsed.heading &&
				planItem.targetUrl === parsed.url
			: planItem.action === 'add-faq' &&
				planItem.question === parsed.question &&
				planItem.targetUrl === parsed.url;
	if (!matches) {
		return { skip: `plan ${origin.date} item ${origin.item} does not match the task title` };
	}
	return {
		id: t.id,
		prioridad: t.prioridad,
		...parsed,
		origen: t.origen,
		planFile: planFilePath(origin.date),
		planItemNumber: origin.item,
		planItem,
		descripcion: t.descripcion
	};
}

/** Pure: the next implementable tasks. With `taskId` only that task, or an `error` saying why not. */
export function selectTasks(tasks: Task[], plans: PlanLookup, opts: SelectOptions): Selection {
	if (opts.taskId) {
		const t = tasks.find((x) => x.id === opts.taskId);
		if (!t) return { next: null, queue: [], skipped: [], error: `task ${opts.taskId} not found` };
		if (t.estado !== 'pendiente') {
			return failure(t, `its estado is ${t.estado}, only pendiente tasks are implemented`);
		}
		if (t.tipo !== 'contenido') {
			return failure(t, `its tipo is ${t.tipo}, only contenido tasks are implemented`);
		}
		const r = resolveTask(t, plans);
		if ('skip' in r) return failure(t, r.skip);
		return { next: r, queue: [r], skipped: [] };
	}
	const candidates = tasks
		.filter((t) => t.estado === 'pendiente' && t.tipo === 'contenido')
		.sort(byOrder);
	const queue: NextTask[] = [];
	const skipped: Skipped[] = [];
	for (const t of candidates) {
		const r = resolveTask(t, plans);
		if ('skip' in r) skipped.push({ id: t.id, titulo: t.titulo, reason: r.skip });
		else if (queue.length < opts.max) queue.push(r);
	}
	return { next: queue[0] ?? null, queue, skipped };
}

function failure(t: Task, reason: string): Selection {
	return {
		next: null,
		queue: [],
		skipped: [],
		error: `task ${t.id} is not implementable: ${reason}`
	};
}

/** Pure: `--task #Tnnnn`, `--max N` (default 1). `--dry-run` is accepted and ignored, so the
 *  same arguments serve `just todo-implement --dry-run`. Anything else throws. */
export function parseNextArgs(args: string[]): SelectOptions {
	const opts: SelectOptions = { max: 1 };
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === '--dry-run') continue;
		if (a === '--task') {
			const id = args[++i];
			if (!id || !/^#T\d{4}$/.test(id)) throw new Error('--task needs an id like #Tnnnn');
			opts.taskId = id;
		} else if (a === '--max') {
			const n = Number(args[++i]);
			if (!Number.isInteger(n) || n < 1) throw new Error('--max needs a whole number of 1 or more');
			opts.max = n;
		} else {
			throw new Error(`unknown argument ${a}. Usage: next-task.ts [--task #Tnnnn] [--max N]`);
		}
	}
	return opts;
}

/** Reads `.agents/context/keywords/content-plan/<date>.json`, null when missing or invalid. */
function readPlan(date: string): ContentPlan | null {
	const file = planFilePath(date);
	if (!existsSync(file)) return null;
	try {
		const parsed = ContentPlanSchema.safeParse(JSON.parse(readFileSync(file, 'utf8')));
		return parsed.success ? parsed.data : null;
	} catch {
		return null;
	}
}

function main(argv: string[]): number {
	try {
		const opts = parseNextArgs(argv);
		const { tasks } = parseTodoJson(readFileSync(todoPath(), 'utf8'));
		const out = selectTasks(tasks, readPlan, opts);
		if (out.error) {
			console.error(JSON.stringify({ error: out.error }));
			return 1;
		}
		console.log(JSON.stringify(out, null, 2));
		return 0;
	} catch (e) {
		console.error(`[todo-next] ${(e as Error).message}`);
		return 1;
	}
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));
