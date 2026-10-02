#!/usr/bin/env bun
/**
 * todo-implement-log.ts: writes the activity log lines (`agent-log.ts`, mode demanda) of a
 * `just todo-implement` run. The recipe calls it twice around the headless claude run:
 *
 *   bun scripts/log/todo-implement-log.ts start --next <todo-next.json> --budget <usd> -- <args>
 *   bun scripts/log/todo-implement-log.ts end --next <todo-next.json> --out <claude.json> \
 *        --exit <code> --start-head <hash> --seconds <n> -- <args>
 *
 * `start` records the run-start. `end` records one task-done, task-blocked or task-skipped per
 * task (the id passed with --task, or the queue `just todo-next` selected before the run, read
 * from TODO.json AFTER the run) and then the run-end with is_error, exit code, cost, minutes,
 * turns and the commits made since the run started. It never fails: logging must not change the
 * recipe's exit code. Env `TODO_JSON_FILE` points to another TODO.json (tests, simulations).
 */

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Task } from '../todo/todo-format';
import { parseTodoJson } from '../todo/todo-json';
import { appendAgentLog, type LogEntry } from './agent-log';
import { formatMinutes } from './step-summary';

const ACTOR = 'todo-implementer';

export interface ClaudeResult {
	isError: boolean;
	costUsd: number | null;
	durationMs: number | null;
	turns: number | null;
	subtype: string | null;
}

export interface Commit {
	hash: string;
	subject: string;
}

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);

/** Pure: the task ids of the run. `--task` wins, otherwise the queue `just todo-next` printed. */
export function taskIds(args: string[], next: unknown): string[] {
	const i = args.indexOf('--task');
	if (i >= 0 && args[i + 1]) return [args[i + 1]];
	const queue =
		typeof next === 'object' && next !== null ? (next as { queue?: unknown }).queue : null;
	if (!Array.isArray(queue)) return [];
	return queue.flatMap((q) =>
		typeof q === 'object' && q !== null && typeof (q as { id?: unknown }).id === 'string'
			? [(q as { id: string }).id]
			: []
	);
}

/** Pure: the fields of `claude -p --output-format json`, or null when it is not that json. */
export function parseClaudeResult(text: string): ClaudeResult | null {
	try {
		const j: unknown = JSON.parse(text);
		if (typeof j !== 'object' || j === null) return null;
		const o = j as Record<string, unknown>;
		return {
			isError: o.is_error === true,
			costUsd: num(o.total_cost_usd),
			durationMs: num(o.duration_ms),
			turns: num(o.num_turns),
			subtype: typeof o.subtype === 'string' ? o.subtype : null
		};
	} catch {
		return null;
	}
}

/** Pure: `git log <start>..HEAD --format="%h %s"` (newest first) into commits, oldest first. */
export function parseCommits(output: string): Commit[] {
	return output
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean)
		.map((l) => {
			const [hash, ...rest] = l.split(' ');
			return { hash, subject: rest.join(' ') };
		})
		.reverse();
}

/** Pure: the event of one task after the run, from its final estado in TODO.json. */
export function taskOutcome(t: Task | undefined, id: string): Pick<LogEntry, 'event' | 'detail'> {
	if (!t) return { event: 'task-skipped', detail: `task=${id} estado=not found in TODO.json` };
	const titulo = `titulo="${t.titulo.replace(/"/g, "'")}"`;
	if (t.estado === 'hecha') {
		return { event: 'task-done', detail: `task=${id} hecha=${t.hecha ?? 'sin fecha'} ${titulo}` };
	}
	if (t.estado === 'bloqueada') {
		const nota = t.nota ? ` nota="${t.nota.replace(/"/g, "'")}"` : '';
		return { event: 'task-blocked', detail: `task=${id}${nota} ${titulo}` };
	}
	return { event: 'task-skipped', detail: `task=${id} estado="${t.estado}" ${titulo}` };
}

/** Pure: the run-start entry. */
export function buildStartEntry(i: { args: string[]; budget: string; ids: string[] }): LogEntry {
	return {
		mode: 'demanda',
		actor: ACTOR,
		event: 'run-start',
		detail: `args=${i.args.length ? `"${i.args.join(' ')}"` : 'none'} budget_usd=${i.budget} tasks=${i.ids.length ? i.ids.join(',') : 'none'}`
	};
}

/** Pure: the task outcomes and then the run-end. */
export function buildEndEntries(i: {
	ids: string[];
	tasks: Task[];
	claude: ClaudeResult | null;
	exitCode: number;
	seconds: number;
	commits: Commit[];
}): LogEntry[] {
	const entries: LogEntry[] = i.ids.map((id) => ({
		mode: 'demanda',
		actor: ACTOR,
		...taskOutcome(
			i.tasks.find((t) => t.id === id),
			id
		)
	}));
	const c = i.claude;
	const ms = c?.durationMs ?? i.seconds * 1000;
	const parts = [
		`is_error=${c ? c.isError : 'unknown'}`,
		`exit=${i.exitCode}`,
		c?.costUsd != null ? `cost_usd=${c.costUsd.toFixed(2)}` : '',
		`minutes=${formatMinutes(ms)}`,
		c?.turns != null ? `turns=${c.turns}` : '',
		c?.subtype ? `subtype=${c.subtype}` : '',
		`commits=${i.commits.length ? i.commits.map((x) => x.hash).join(',') : 'none'}`
	].filter(Boolean);
	entries.push({ mode: 'demanda', actor: ACTOR, event: 'run-end', detail: parts.join(' ') });
	return entries;
}

// ---- I/O below ----

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function readJson(file: string | undefined): unknown {
	try {
		return file ? JSON.parse(readFileSync(file, 'utf8')) : null;
	} catch {
		return null;
	}
}

function flag(argv: string[], name: string): string | undefined {
	const i = argv.indexOf(`--${name}`);
	return i >= 0 ? argv[i + 1] : undefined;
}

function main(): void {
	const argv = process.argv.slice(2);
	const cmd = argv[0];
	const sep = argv.indexOf('--');
	const args = sep >= 0 ? argv.slice(sep + 1) : [];
	const flags = sep >= 0 ? argv.slice(0, sep) : argv;
	const ids = taskIds(args, readJson(flag(flags, 'next')));
	if (cmd === 'start') {
		appendAgentLog(buildStartEntry({ args, budget: flag(flags, 'budget') ?? '?', ids }));
		return;
	}
	if (cmd !== 'end') {
		console.error('Usage: todo-implement-log.ts start|end --next <file> [...] -- <args>');
		return;
	}
	let tasks: Task[] = [];
	try {
		const file = process.env.TODO_JSON_FILE || join(ROOT, '.agents', 'data', 'TODO.json');
		tasks = parseTodoJson(readFileSync(file, 'utf8')).tasks;
	} catch {
		/* unreadable TODO.json: every task is logged as not found */
	}
	let out = '';
	try {
		out = readFileSync(flag(flags, 'out') ?? '', 'utf8');
	} catch {
		/* no claude output */
	}
	const start = flag(flags, 'start-head');
	let commits: Commit[] = [];
	if (start) {
		const r = Bun.spawnSync(['git', 'log', `${start}..HEAD`, '--format=%h %s'], {
			cwd: ROOT,
			stdout: 'pipe',
			stderr: 'pipe'
		});
		if (r.exitCode === 0) commits = parseCommits(r.stdout.toString());
	}
	for (const entry of buildEndEntries({
		ids,
		tasks,
		claude: parseClaudeResult(out),
		exitCode: Number(flag(flags, 'exit')) || 0,
		seconds: Number(flag(flags, 'seconds')) || 0,
		commits
	})) {
		appendAgentLog(entry);
	}
}

if (import.meta.main) {
	try {
		main();
	} catch (e) {
		console.error(`[agent-log] ${e instanceof Error ? e.message : String(e)}`);
	}
}
