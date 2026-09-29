#!/usr/bin/env bun
/**
 * organize.ts: `just todo-organize`. Reads TODO.txt (task blocks, legacy `-- ` entries and loose
 * text), normalizes everything into tasks, upserts the content-strategist tasks from the
 * committed plans, applies the priorities a plan proposes, closes the tasks keywords.json shows
 * as done, blocks the content-strategist tasks while posts are still untranslated, sorts
 * (pendientes by priority, then bloqueadas, hechas last) and writes the file back.
 *
 * Usage: `bun scripts/todo/organize.ts [--file <path>] [--dry-run] [--needs-priority]
 *   [--keywords <path>] [--today YYYY-MM-DD]`
 *   --dry-run          print the summary, write nothing
 *   --needs-priority   print compact JSON of the open tasks that still have the default priority
 *
 * Another session edits TODO.txt while this runs: the write is atomic (temp file + rename) and
 * only happens when the file's mtime did not change since it was read. It re-reads and retries
 * once, then exits 1 without writing. The description of a task is never rewritten, and the
 * result is checked line by line before writing (nothing may be lost).
 */

import { existsSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readCommittedPlans } from '../keywords/importers/content-plan';
import type { ContentPlan } from '../keywords/plan.schema';
import { readTranslationBacklog } from '../keywords/new-post-quota';
import {
	applyPriorities,
	applyTranslationGate,
	autoComplete,
	upsertPlanTasks,
	type KeywordStatus
} from './plan-tasks';
import {
	DEFAULT_PRIORITY_NOTE,
	MANAGED_MARKER,
	assignIds,
	parseTodo,
	renderTodo,
	resolveTasks,
	type Task
} from './todo-format';

export interface OrganizeCtx {
	plans: ContentPlan[];
	keywords: KeywordStatus[];
	today: string;
	/** Origen of legacy entries and loose text (`usuario`, or `migrada` for the one time migration). */
	origen: string;
	/** Every published English post is translated to the 12 languages (gate of the
	 *  content-strategist tasks, see `applyTranslationGate`). */
	translationsDone: boolean;
}

export interface OrganizeResult {
	output: string;
	/** The organized tasks, sorted like the output. */
	tasks: Task[];
	/** Every task before priorities and auto-complete, with ids: what verifyNoLoss compares. */
	inputTasks: Task[];
}

/** Pure: the whole pipeline on the text of TODO.txt. */
export function organizeText(text: string, ctx: OrganizeCtx): OrganizeResult {
	const resolved = resolveTasks(parseTodo(text), ctx.origen);
	const inputTasks = assignIds(upsertPlanTasks(resolved, ctx.plans));
	const prioritized = applyPriorities(inputTasks, ctx.plans);
	const completed = autoComplete(prioritized, ctx.plans, ctx.keywords, ctx.today);
	const output = renderTodo(applyTranslationGate(completed, ctx.translationsDone));
	return { output, tasks: parseTodo(output).tasks, inputTasks };
}

const contentLines = (t: Task) => t.descripcion.filter((l) => l.trim() !== '');

/** Pure: what got lost. Every id of `inputTasks` must be in `output`, and every non-empty
 *  description line must be there, in order, inside the same task. Empty list means nothing lost. */
export function verifyNoLoss(inputTasks: Task[], output: string): string[] {
	const byId = new Map(parseTodo(output).tasks.map((t) => [t.id, t]));
	const problems: string[] = [];
	for (const t of inputTasks) {
		const out = byId.get(t.id);
		if (!out) {
			problems.push(`${t.id}: la tarea "${t.titulo}" no está en el resultado`);
			continue;
		}
		const have = contentLines(out);
		let from = 0;
		for (const line of contentLines(t)) {
			const at = have.indexOf(line, from);
			if (at < 0) problems.push(`${t.id}: falta la línea "${line}"`);
			else from = at + 1;
		}
	}
	return problems;
}

/** Pure, independent of the parser: the non-empty lines of an old style TODO.txt (minus legacy
 *  `-- ` headers and the managed section) that no task description in `output` has. */
export function missingLegacyLines(original: string, output: string): string[] {
	const have = new Map<string, number>();
	for (const t of parseTodo(output).tasks) {
		for (const l of contentLines(t)) have.set(l, (have.get(l) ?? 0) + 1);
	}
	const missing: string[] = [];
	let managed = false;
	for (const line of original.replace(/\r\n/g, '\n').split('\n')) {
		if (line.trimEnd() === MANAGED_MARKER) {
			managed = true;
			continue;
		}
		if (managed) {
			if (!/^== .+ ==\s*$/.test(line) && !/^=== TAREA /.test(line)) continue;
			managed = false;
		}
		if (line.trim() === '' || line.startsWith('-- ')) continue;
		const left = have.get(line) ?? 0;
		if (left > 0) have.set(line, left - 1);
		else missing.push(line);
	}
	return missing;
}

export interface NeedsPriorityItem {
	id: string;
	titulo: string;
	estado: string;
	anotada: string;
	descripcion: string[];
}

/** Pure: open tasks that still carry the default priority, for the agent. */
export function needsPriority(tasks: Task[]): NeedsPriorityItem[] {
	return tasks
		.filter((t) => t.estado !== 'hecha' && t.nota?.includes(DEFAULT_PRIORITY_NOTE))
		.map((t) => ({
			id: t.id,
			titulo: t.titulo,
			estado: t.estado,
			anotada: t.anotada,
			descripcion: contentLines(t).slice(0, 3)
		}));
}

export function localToday(now = new Date()): string {
	const p = (n: number) => String(n).padStart(2, '0');
	return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function readKeywordStatuses(path: string): KeywordStatus[] {
	if (!existsSync(path)) {
		console.error(`[todo-organize] ${path} no existe, no se cierra ninguna tarea por cobertura`);
		return [];
	}
	const data = JSON.parse(readFileSync(path, 'utf8')) as { keywords: KeywordStatus[] };
	return data.keywords.map((k) => ({ id: k.id, status: k.status, url: k.url ?? null }));
}

/** Writes `text` to `file` atomically, only when its mtime is still `expectedMtimeMs`.
 *  Returns false (and writes nothing) when another session changed the file. */
export function writeIfUnchanged(file: string, text: string, expectedMtimeMs: number): boolean {
	if (statSync(file).mtimeMs !== expectedMtimeMs) return false;
	const tmp = `${file}.organize-${process.pid}.tmp`;
	writeFileSync(tmp, text, 'utf8');
	if (statSync(file).mtimeMs !== expectedMtimeMs) return false;
	renameSync(tmp, file);
	return true;
}

export function tally<T>(items: T[], key: (t: T) => string): string {
	const m = new Map<string, number>();
	for (const i of items) m.set(key(i), (m.get(key(i)) ?? 0) + 1);
	return [...m].map(([k, n]) => `${k}: ${n}`).join(', ');
}

export const originKind = (t: Task) =>
	t.origen.startsWith('content-strategist') ? 'content-strategist' : t.origen;

function flag(argv: string[], name: string): string | undefined {
	const i = argv.indexOf(name);
	return i >= 0 ? argv[i + 1] : undefined;
}

function run(argv: string[]): number {
	const file = flag(argv, '--file') ?? join(process.cwd(), 'TODO.txt');
	const ctxBase = {
		plans: readCommittedPlans(),
		keywords: readKeywordStatuses(flag(argv, '--keywords') ?? join(process.cwd(), 'keywords.json')),
		today: flag(argv, '--today') ?? localToday(),
		origen: 'usuario',
		translationsDone: readTranslationBacklog().complete
	};

	for (let attempt = 0; attempt < 2; attempt++) {
		const mtime = statSync(file).mtimeMs;
		const before = readFileSync(file, 'utf8');
		const result = organizeText(before, ctxBase);

		if (argv.includes('--needs-priority')) {
			console.log(JSON.stringify(needsPriority(result.inputTasks)));
			return 0;
		}
		const lost = verifyNoLoss(result.inputTasks, result.output);
		if (lost.length > 0) {
			console.error(
				`[todo-organize] se perdería contenido, no se escribe nada:\n${lost.join('\n')}`
			);
			return 1;
		}
		const ids = new Set(parseTodo(before).tasks.map((t) => t.id));
		const summary = [
			`tareas: ${result.tasks.length} (${tally(result.tasks, (t) => t.estado)})`,
			`origen: ${tally(result.tasks, originKind)}`,
			`ids nuevos: ${result.tasks.filter((t) => !ids.has(t.id)).length}`,
			`líneas: ${before.split('\n').length} -> ${result.output.split('\n').length}`
		];
		if (result.output === before) {
			console.log(`[todo-organize] sin cambios. ${summary.join('. ')}`);
			return 0;
		}
		if (argv.includes('--dry-run')) {
			console.log(`[todo-organize] dry run, no se escribe. ${summary.join('. ')}`);
			return 0;
		}
		if (writeIfUnchanged(file, result.output, mtime)) {
			console.log(`[todo-organize] ${file} ordenado. ${summary.join('. ')}`);
			return 0;
		}
		console.error('[todo-organize] TODO.txt cambió mientras se ordenaba, se reintenta');
	}
	console.error('[todo-organize] TODO.txt sigue cambiando, no se escribió nada');
	return 1;
}

if (import.meta.main) process.exit(run(process.argv.slice(2)));
