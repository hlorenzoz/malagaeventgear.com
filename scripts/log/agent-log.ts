#!/usr/bin/env bun
/**
 * agent-log.ts: the monthly activity log of the agents. ONE file per month,
 * `.agents/logs/YYYY-MM.log` (Europe/Madrid month, a new file appears on the first event of each
 * month), one line per event, written by CODE and never by an LLM, so the format does not depend
 * on what an agent decides to say.
 *
 * Line (greppable, ASCII punctuation only, accents are fine, five fields):
 *
 *   YYYY-MM-DD HH:MM | auto|demanda | <actor> | <event> | <detail key=value ...>
 *
 * - time is Europe/Madrid. `auto` = the scheduled daily chain (daily-guard), `demanda` = a run the
 *   user started (todo-implement, the translation finish).
 * - the detail is one line (newlines collapsed), capped at 400 characters, never contains " | "
 *   or ";", and is `-` when empty.
 *
 * Event vocabulary (EVENTS):
 *   run-start     a run begins (steps it will run, attempt, task args, budget)
 *   run-end       a run ends (result, cost, minutes, new commits)
 *   step-done     one step of a run finished well (file produced, counts)
 *   step-failed   one step failed (reason)
 *   commit        a local commit was made (hash, subject)
 *   task-done     a TODO.json task ended `hecha`
 *   task-blocked  a task ended `bloqueada` (the note says why)
 *   task-skipped  a task was selected but not finished
 *   info          anything else worth a line (offline, attempts exhausted...)
 *
 * Logging NEVER breaks a run: `appendAgentLog` swallows every error and prints one warning to
 * stderr. Dry runs never call it. Secrets and review texts do not belong in a detail.
 *
 * CLI, for the Justfile recipes:
 *   bun scripts/log/agent-log.ts --mode demanda --actor todo-implementer --event commit --detail "..."
 *   bun scripts/log/agent-log.ts --mode auto --actor faq-researcher --event commit --last-commit
 * (`--last-commit` reads HEAD and writes `hash=... subject="..."`, `--detail` adds more pairs.)
 *
 * Env `AGENT_LOG_DIR` replaces the `.agents/logs` folder (tests never write to the real one).
 * Env `AGENT_LOG_MODE` is the default mode the recipes pass (`auto` unless a run says otherwise).
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const EVENTS = [
	'run-start',
	'run-end',
	'step-done',
	'step-failed',
	'commit',
	'task-done',
	'task-blocked',
	'task-skipped',
	'info'
] as const;
export type LogEvent = (typeof EVENTS)[number];

export const MODES = ['auto', 'demanda'] as const;
export type LogMode = (typeof MODES)[number];

export interface LogEntry {
	mode: LogMode;
	actor: string;
	event: LogEvent;
	detail?: string;
}

export interface FormatInput extends LogEntry {
	ts: Date;
}

export const MAX_DETAIL = 400;
const TZ = 'Europe/Madrid';

/** Pure: the Madrid date and time parts of an instant. */
function madridParts(ts: Date) {
	const parts = new Intl.DateTimeFormat('en-CA', {
		timeZone: TZ,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23'
	}).formatToParts(ts);
	const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
	return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour'), mi: get('minute') };
}

/** Pure: `.agents/logs/YYYY-MM.log` for the Madrid month of `date`. */
export function monthFile(date: Date): string {
	const { y, mo } = madridParts(date);
	return `.agents/logs/${y}-${mo}.log`;
}

/** Pure: ASCII punctuation, one line, no field separator, no semicolon, capped. */
export function sanitizeDetail(text: string): string {
	const clean = text
		.replace(/[\u2018\u2019]/g, "'")
		.replace(/[\u201c\u201d]/g, '"')
		.replace(/\s*\u2014\s*/g, '-')
		.replace(/\u2013/g, '-')
		.replace(/\u2026/g, '...')
		.replace(/\u2022/g, '-')
		.replace(/[\u00a0\u202f]/g, ' ')
		.replace(/\s+/g, ' ')
		.replace(/\|/g, '/')
		.replace(/;/g, ',')
		.trim();
	if (clean.length <= MAX_DETAIL) return clean;
	return `${clean.slice(0, MAX_DETAIL - 3).trimEnd()}...`;
}

const sanitizeActor = (actor: string) => actor.replace(/[^A-Za-z0-9_.:#-]+/g, '-') || 'unknown';

/** Pure: one log line (no trailing newline). Throws on an unknown event or mode. */
export function formatLine(i: FormatInput): string {
	if (!(EVENTS as readonly string[]).includes(i.event))
		throw new Error(`unknown event: ${i.event}`);
	if (!(MODES as readonly string[]).includes(i.mode)) throw new Error(`unknown mode: ${i.mode}`);
	const { y, mo, d, h, mi } = madridParts(i.ts);
	const detail = sanitizeDetail(i.detail ?? '') || '-';
	return `${y}-${mo}-${d} ${h}:${mi} | ${i.mode} | ${sanitizeActor(i.actor)} | ${i.event} | ${detail}`;
}

/** Pure: the mode from an env value (`AGENT_LOG_MODE`), or the fallback when it is not a mode. */
export function modeFromEnv(value: string | undefined, fallback: LogMode): LogMode {
	return (MODES as readonly string[]).includes(value ?? '') ? (value as LogMode) : fallback;
}

/** Pure: `hash=... subject="..." extra`. */
export function commitDetail(hash: string, subject: string, extra = ''): string {
	const base = `hash=${hash} subject="${subject.replace(/"/g, "'")}"`;
	return extra ? `${base} ${extra}` : base;
}

/** Pure: true when the month text has a line of `day` that contains `needle` (one line per day checks). */
export function hasLoggedToday(text: string, day: string, needle: string): boolean {
	return text.split('\n').some((l) => l.startsWith(`${day} `) && l.includes(needle));
}

export type CliParse =
	{ ok: true; entry: LogEntry; lastCommit: boolean } | { ok: false; error: string };

/** Pure: the CLI flags into an entry. */
export function parseCliArgs(argv: string[]): CliParse {
	const flags = new Map<string, string>();
	let lastCommit = false;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--last-commit') lastCommit = true;
		else if (a.startsWith('--')) flags.set(a.slice(2), argv[++i] ?? '');
	}
	const mode = flags.get('mode');
	const actor = flags.get('actor');
	const event = flags.get('event');
	if (!mode || !(MODES as readonly string[]).includes(mode)) {
		return { ok: false, error: `--mode must be one of ${MODES.join(', ')}` };
	}
	if (!actor) return { ok: false, error: '--actor is required' };
	if (!event || !(EVENTS as readonly string[]).includes(event)) {
		return { ok: false, error: `--event must be one of ${EVENTS.join(', ')}` };
	}
	const entry: LogEntry = { mode: mode as LogMode, actor, event: event as LogEvent };
	const detail = flags.get('detail');
	if (detail) entry.detail = detail;
	return { ok: true, entry, lastCommit };
}

// ---- I/O below ----

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** The folder of the log files: `AGENT_LOG_DIR` or `<repo>/.agents/logs`. */
export function logDir(): string {
	return process.env.AGENT_LOG_DIR || join(ROOT, '.agents', 'logs');
}

function fileOf(date: Date, dir?: string): string {
	return join(dir ?? logDir(), monthFile(date).split('/').pop() as string);
}

/** Appends one event. Never throws: a failure prints one warning and returns false. */
export function appendAgentLog(entry: LogEntry, opts: { dir?: string; now?: Date } = {}): boolean {
	try {
		const now = opts.now ?? new Date();
		const dir = opts.dir ?? logDir();
		const line = formatLine({ ...entry, ts: now });
		mkdirSync(dir, { recursive: true });
		appendFileSync(fileOf(now, dir), `${line}\n`);
		return true;
	} catch (e) {
		console.error(
			`[agent-log] could not write the log: ${e instanceof Error ? e.message : String(e)}`
		);
		return false;
	}
}

/** The text of this month's log, or '' when there is none or it cannot be read. */
export function readMonthLog(now: Date = new Date()): string {
	try {
		const file = fileOf(now);
		return existsSync(file) ? readFileSync(file, 'utf8') : '';
	} catch {
		return '';
	}
}

function main(): void {
	const parsed = parseCliArgs(process.argv.slice(2));
	if (!parsed.ok) {
		console.error(`[agent-log] ${parsed.error}`);
		console.error(
			'Usage: bun scripts/log/agent-log.ts --mode auto|demanda --actor <name> --event <event> [--detail "..."] [--last-commit]'
		);
		process.exit(2);
	}
	const entry = { ...parsed.entry };
	if (parsed.lastCommit) {
		const r = Bun.spawnSync(['git', 'log', '-1', '--format=%h%x09%s'], {
			cwd: ROOT,
			stdout: 'pipe',
			stderr: 'pipe'
		});
		const [hash, ...subject] = r.stdout.toString().trim().split('\t');
		if (r.exitCode === 0 && hash) {
			entry.detail = commitDetail(hash, subject.join('\t'), entry.detail ?? '');
		}
	}
	appendAgentLog(entry);
}

if (import.meta.main) main();
