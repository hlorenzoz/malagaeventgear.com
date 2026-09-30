/**
 * plan-tasks.ts: the content-strategist side of TODO.json, pure. Turns committed content plans
 * into tasks (one per non-skip item, plus one done task for the skips), upserts them by Origen,
 * applies the priorities a plan proposes for tasks that still have the default one, and closes
 * the tasks whose keyword `keywords.json` already shows as covered or published on the target.
 */

import { normalizeId } from '../keywords/normalize';
import type { ContentPlan, PlanItem, PlanPriority } from '../keywords/plan.schema';
import { ITEM_RULE_LINE, itemTitle, renderItemBody, tierLine } from '../keywords/plan-to-todo';
import { DEFAULT_PRIORITY_NOTE, type Prioridad, type Task } from './todo-format';

export interface KeywordStatus {
	id: string;
	status: string;
	url: string | null;
}

const PRIORITY_WORD: Record<PlanPriority, Prioridad> = {
	high: 'alta',
	medium: 'media',
	low: 'baja'
};
export const PLAN_COVERAGE_NOTE = 'marcada hecha por plan-coverage';
export const TRANSLATION_GATE_NOTE = 'bloqueada hasta terminar las traducciones de todos los posts';

const ORIGIN_PREFIX = 'content-strategist (plan ';
const UBERSUGGEST_PREFIX = 'ubersuggest (';
/** The site audit fixes are the only Ubersuggest tasks that do not wait for the translations
 *  (user decision, 2026-09-30): they change titles and metadata, not content to translate. */
const UNGATED_UBERSUGGEST = 'ubersuggest (seo-opportunities, site-audit/';

/** Pure: whether the translation gate applies to a task, by its Origen. */
export const isTranslationGated = (origen: string): boolean =>
	origen.startsWith(ORIGIN_PREFIX) ||
	(origen.startsWith(UBERSUGGEST_PREFIX) && !origen.startsWith(UNGATED_UBERSUGGEST));

/** The Origen of a plan's item (1-based index in `plan.items`, stable when items are skipped). */
export const itemOrigin = (date: string, n: number) => `${ORIGIN_PREFIX}${date}, ítem ${n})`;
/** The Origen of a plan's single task with the skips. */
export const planOrigin = (date: string) => `${ORIGIN_PREFIX}${date}, descartes)`;

const targetUrlOf = (item: PlanItem) =>
	item.targetUrl ?? (item.newPost ? `/blog/${item.newPost.slug}/` : null);

/** Pure: the tasks of one plan, without ids. Items first (plan order), the skips task last. */
export function planTasks(plan: ContentPlan): Task[] {
	const tier = tierLine(plan);
	const head = tier ? [tier] : [];
	const tasks: Task[] = [];
	plan.items.forEach((item, idx) => {
		if (item.action === 'skip') return;
		tasks.push({
			id: '',
			estado: 'pendiente',
			prioridad: PRIORITY_WORD[item.priority],
			tipo: 'contenido',
			titulo: itemTitle(item),
			anotada: plan.date,
			origen: itemOrigin(plan.date, idx + 1),
			descripcion: [...head, ...renderItemBody(item), ITEM_RULE_LINE]
		});
	});
	const skips = plan.items.filter((i) => i.action === 'skip');
	if (skips.length > 0) {
		tasks.push({
			id: '',
			estado: 'hecha',
			prioridad: 'baja',
			tipo: 'contenido',
			titulo: `Descartadas por content-strategist el ${plan.date}`,
			anotada: plan.date,
			hecha: plan.date,
			origen: planOrigin(plan.date),
			descripcion: [...head, ...skips.map((s) => `${s.keywords[0]} (${s.reason})`)]
		});
	}
	return tasks;
}

/** Pure: adds the tasks whose Origen TODO.json does not have yet (key: Origen). An existing task
 *  keeps its Estado, Prioridad, Título and Nota, and only gets a description when it has none. */
export function upsertTasks(tasks: Task[], fresh: Task[]): Task[] {
	const out = [...tasks];
	const index = new Map(out.map((t, i) => [t.origen, i]));
	for (const task of fresh) {
		const at = index.get(task.origen);
		if (at === undefined) {
			index.set(task.origen, out.length);
			out.push(task);
		} else if (out[at].descripcion.length === 0) {
			out[at] = { ...out[at], descripcion: task.descripcion };
		}
	}
	return out;
}

/** Pure: the tasks of every plan, oldest plan first, upserted by Origen. */
export function upsertPlanTasks(tasks: Task[], plans: ContentPlan[]): Task[] {
	const fresh = [...plans]
		.sort((a, b) => a.date.localeCompare(b.date))
		.flatMap((plan) => planTasks(plan));
	return upsertTasks(tasks, fresh);
}

/** Pure: applies `plan.todo` priorities, oldest plan first, ONLY to tasks whose Nota still says
 *  "prioridad por defecto" (that phrase is replaced, so a task is prioritized once). */
export function applyPriorities(tasks: Task[], plans: ContentPlan[]): Task[] {
	let out = tasks;
	for (const plan of [...plans].sort((a, b) => a.date.localeCompare(b.date))) {
		for (const p of plan.todo ?? []) {
			out = out.map((t) => {
				if (t.id !== p.id || !t.nota?.includes(DEFAULT_PRIORITY_NOTE)) return t;
				return {
					...t,
					prioridad: p.priority,
					nota: t.nota.replace(
						DEFAULT_PRIORITY_NOTE,
						`prioridad asignada por content-strategist el ${plan.date}: ${p.reason}`
					)
				};
			});
		}
	}
	return out;
}

/** Pure: a plan task goes to `hecha` (Hecha = today) only when the item's first keyword is
 *  `covered` or `published` in keywords.json on the item's target url. Nothing else changes. */
export function autoComplete(
	tasks: Task[],
	plans: ContentPlan[],
	keywords: KeywordStatus[],
	today: string
): Task[] {
	const refs = new Map<string, { keywordId: string; url: string | null }>();
	for (const plan of plans) {
		plan.items.forEach((item, idx) => {
			if (item.action === 'skip') return;
			refs.set(itemOrigin(plan.date, idx + 1), {
				keywordId: normalizeId(item.keywords[0]),
				url: targetUrlOf(item)
			});
		});
	}
	const byId = new Map(keywords.map((k) => [k.id, k]));
	return tasks.map((t) => {
		if (t.estado === 'hecha') return t;
		const ref = refs.get(t.origen);
		if (!ref) return t;
		const k = byId.get(ref.keywordId);
		if (!k || (k.status !== 'covered' && k.status !== 'published') || k.url !== ref.url) return t;
		return {
			...t,
			estado: 'hecha',
			hecha: today,
			nota: t.nota ? `${t.nota}, ${PLAN_COVERAGE_NOTE}` : PLAN_COVERAGE_NOTE
		};
	});
}

const withoutGateNote = (nota?: string) =>
	nota
		?.split(', ')
		.filter((n) => n !== TRANSLATION_GATE_NOTE)
		.join(', ') || undefined;

const setNota = (t: Task, nota: string | undefined): Task => {
	const { nota: _drop, ...rest } = t;
	return nota ? { ...rest, nota } : rest;
};

/** Pure: the translation gate (user decision, 2026-09-29). While any published English post lacks
 *  a translation (`translationsDone` false), open content-strategist tasks wait as `bloqueada` with
 *  TRANSLATION_GATE_NOTE, and they go back to `pendiente` once every post is translated. Tasks from
 *  anyone else, tasks `en curso` and done tasks keep their Estado (a done task only loses the note). */
export function applyTranslationGate(tasks: Task[], translationsDone: boolean): Task[] {
	return tasks.map((t) => {
		if (!isTranslationGated(t.origen)) return t;
		const gated = t.nota?.split(', ').includes(TRANSLATION_GATE_NOTE) ?? false;
		if (t.estado === 'hecha') return gated ? setNota(t, withoutGateNote(t.nota)) : t;
		if (!translationsDone && t.estado === 'pendiente') {
			return {
				...t,
				estado: 'bloqueada',
				nota: t.nota ? `${t.nota}, ${TRANSLATION_GATE_NOTE}` : TRANSLATION_GATE_NOTE
			};
		}
		if (translationsDone && t.estado === 'bloqueada') {
			return { ...setNota(t, withoutGateNote(t.nota)), estado: 'pendiente' };
		}
		return t;
	});
}
