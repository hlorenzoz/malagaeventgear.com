#!/usr/bin/env bun
/**
 * daily-guard.ts: decides whether today's keyword research, FAQ research and content plan still have to run,
 * and runs what is missing. `just keywords-daily` is this script. launchd fires it at 09:30, at
 * login (RunAtLoad) and every hour, so a Mac that was powered off or offline catches up later.
 * Most triggers do nothing and cost nothing (no Claude call).
 *
 * State is derived from the repo, not from a success file: a step is DONE when today's file
 * exists, is tracked and has no uncommitted diff. There is no backfill: several missed days mean
 * one run today.
 *
 * Chain: Ubersuggest research, then the FAQ agent, then the content plan. The steps are INDEPENDENT:
 * a failed or quota-limited research never stops the FAQs or the plan from running, and each
 * pending step is retried at the next trigger (up to the daily attempts).
 *
 * `organize` (`just todo-organize`) is a fifth, deterministic step: it needs no network and no
 * agent, so it runs on every trigger after 09:30 (offline, attempts used up, agents failed or all
 * done) unless another run holds the lock. It is idempotent and only rewrites TODO.json when
 * something changed, which is how tasks blocked by the translation backlog unblock on their own.
 *
 * Activity log (`scripts/log/agent-log.ts`, mode `auto`): a run that executes something writes
 * run-start, one step-done or step-failed per step and run-end. The hourly noise (before 09:30,
 * lock held, everything already committed, an organize that changed nothing) is NEVER logged, and
 * offline or attempts-exhausted are logged once per day. `--dry-run` never writes to the log.
 *
 * Flags: `--dry-run` prints the decision and touches nothing. `--force` ignores hour and done
 * flags (the lock and the offline check still apply) for manual runs.
 * Env `KEYWORDS_DAILY_TODAY` (YYYY-MM-DD) and `KEYWORDS_DAILY_TIME` (HH:MM) override the clock, for tests.
 */

import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { appendAgentLog, hasLoggedToday, readMonthLog, type LogEvent } from '../log/agent-log';
import {
	runEndDetail,
	stepDoneDetail,
	stepFailedDetail,
	summarizeFaqs,
	summarizePlan,
	summarizeResearch
} from '../log/step-summary';

/** Local time (minutes since midnight) before which nothing runs: 09:30, the scheduler's time. */
export const START_MINUTES = 9 * 60 + 30;
const startLabel = () =>
	`${String(Math.floor(START_MINUTES / 60)).padStart(2, '0')}:${String(START_MINUTES % 60).padStart(2, '0')}`;
export const DEFAULT_MAX_ATTEMPTS = 3;
export const LOCK_MAX_AGE_MS = 3 * 3600_000;

export interface GuardInput {
	today: string;
	/** Local time of day, in minutes since midnight. */
	minutes: number;
	researchDone: boolean;
	faqsDone: boolean;
	planDone: boolean;
	attemptsToday: number;
	maxAttempts: number;
	lockHeld: boolean;
	online: boolean;
}

export interface GuardDecision {
	runResearch: boolean;
	runFaqs: boolean;
	runPlan: boolean;
	/** Deterministic TODO.json organizer: independent of the agents, the network and the attempts. */
	runOrganize: boolean;
	reason: string;
}

const none = (reason: string, runOrganize = false): GuardDecision => ({
	runResearch: false,
	runFaqs: false,
	runPlan: false,
	runOrganize,
	reason
});

/** Pure: what to run right now. Rules are checked in priority order. */
export function decideDailyRun(i: GuardInput): GuardDecision {
	if (i.lockHeld) return none('another run holds the lock');
	if (i.minutes < START_MINUTES) return none(`before ${startLabel()}`);
	// From here on the organizer always runs: it depends on none of the conditions below.
	if (i.researchDone && i.faqsDone && i.planDone) {
		return none('research, faqs and plan already committed', true);
	}
	if (!i.online) return none('offline, will retry at the next trigger', true);
	if (i.attemptsToday >= i.maxAttempts) {
		return none(`daily attempts used up (${i.attemptsToday}/${i.maxAttempts})`, true);
	}
	const reason = !i.researchDone
		? 'research pending'
		: !i.faqsDone
			? 'faqs pending'
			: 'plan pending';
	return {
		runResearch: !i.researchDone,
		runFaqs: !i.faqsDone,
		runPlan: !i.planDone,
		runOrganize: true,
		reason
	};
}

/** Pure: the only skips worth a line in the activity log (once per day): the network is down or the
 *  daily attempts are used up while something is still pending. Everything else that skips is
 *  hourly noise and returns null. */
export function skipLogReason(i: GuardInput): 'offline' | 'attempts-exhausted' | null {
	if (i.lockHeld || i.minutes < START_MINUTES) return null;
	if (i.researchDone && i.faqsDone && i.planDone) return null;
	if (!i.online) return 'offline';
	if (i.attemptsToday >= i.maxAttempts) return 'attempts-exhausted';
	return null;
}

/** Pure: local time of day in minutes since midnight. `override` is `HH:MM` (tests and manual
 *  runs); an empty or malformed value falls back to the real clock, never to midnight. */
export function clockMinutes(override: string | undefined, now: Date): number {
	const m = /^(\d{1,2}):(\d{2})$/.exec(override ?? '');
	if (m && Number(m[1]) < 24 && Number(m[2]) < 60) return Number(m[1]) * 60 + Number(m[2]);
	return now.getHours() * 60 + now.getMinutes();
}

/** Pure: a lock is stale when its process is gone or it is older than 3 hours. */
export function isLockStale(info: { pidAlive: boolean; ageMs: number }): boolean {
	return !info.pidAlive || info.ageMs > LOCK_MAX_AGE_MS;
}

// ---- I/O below ----

const STATE_DIR = join(
	homedir(),
	'Library',
	'Application Support',
	'malagaeventgear',
	'keywords-daily'
);
const LOCK_DIR = join(STATE_DIR, 'lock');

const researchFile = (d: string) => `.agents/context/keywords/ubersuggest/${d}.json`;
const faqsFile = (d: string) => `.agents/context/keywords/faqs/${d}.json`;
const planFile = (d: string) => `.agents/context/keywords/content-plan/${d}.json`;

function log(today: string, msg: string): void {
	const time = new Date().toTimeString().slice(0, 5);
	console.log(`keywords-daily ${today} ${time}: ${msg}`);
}

async function git(args: string[]): Promise<boolean> {
	const p = Bun.spawn(['git', ...args], { stdout: 'ignore', stderr: 'ignore' });
	return (await p.exited) === 0;
}

/** Tracked and no uncommitted diff (read-only git). */
async function isCommitted(file: string): Promise<boolean> {
	return (
		(await git(['ls-files', '--error-unmatch', file])) &&
		(await git(['diff', '--quiet', '--', file]))
	);
}

function pidAlive(pid: number): boolean {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

function lockHeld(cleanup: boolean): boolean {
	if (!existsSync(LOCK_DIR)) return false;
	let pid = NaN;
	try {
		pid = Number(readFileSync(join(LOCK_DIR, 'pid'), 'utf8').trim());
	} catch {
		/* unreadable pid file counts as a dead pid */
	}
	const ageMs = Date.now() - statSync(LOCK_DIR).mtimeMs;
	if (isLockStale({ pidAlive: Number.isFinite(pid) && pidAlive(pid), ageMs })) {
		if (cleanup) rmSync(LOCK_DIR, { recursive: true, force: true });
		return false;
	}
	return true;
}

function acquireLock(): boolean {
	try {
		mkdirSync(LOCK_DIR);
	} catch {
		return false;
	}
	writeFileSync(join(LOCK_DIR, 'pid'), String(process.pid));
	lockOwned = true;
	return true;
}

const attemptsPath = (today: string) => join(STATE_DIR, `attempts-${today}`);

function readAttempts(today: string): number {
	try {
		return Number(readFileSync(attemptsPath(today), 'utf8').trim()) || 0;
	} catch {
		return 0;
	}
}

let lockOwned = false;

function pruneOldAttempts(today: string): void {
	const limit = Date.parse(today) - 7 * 86_400_000;
	for (const name of readdirSync(STATE_DIR)) {
		const m = /^attempts-(\d{4}-\d{2}-\d{2})$/.exec(name);
		if (m && Date.parse(m[1]) < limit) rmSync(join(STATE_DIR, name), { force: true });
	}
}

async function isOnline(): Promise<boolean> {
	try {
		await fetch('https://api.anthropic.com', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
		return true;
	} catch {
		return false;
	}
}

async function run(recipe: string): Promise<number> {
	const p = Bun.spawn(['just', recipe], { stdout: 'inherit', stderr: 'inherit' });
	return await p.exited;
}

/** One step of the chain: a crash or a non-zero exit is logged and never stops the next step.
 *  Returns why it failed (null when the recipe exited 0). */
async function step(today: string, label: string, recipe: string): Promise<string | null> {
	try {
		const code = await run(recipe);
		if (code !== 0) {
			log(today, `${label} exited with code ${code}`);
			return `exit code ${code}`;
		}
		return null;
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		log(today, `${label} crashed: ${msg}`);
		return `crashed: ${msg}`;
	}
}

/** One line of the monthly activity log (mode auto). Never throws. */
function alog(event: LogEvent, actor: string, detail: string): void {
	appendAgentLog({ mode: 'auto', actor, event, detail });
}

const TODO_FILE = '.agents/data/TODO.json';

function readText(file: string): string {
	try {
		return readFileSync(file, 'utf8');
	} catch {
		return '';
	}
}

interface AgentStep {
	label: string;
	actor: string;
	recipe: string;
	file: string;
	summarize: (json: unknown) => string;
}

/** Counts of the file an agent step produced, or '' when it cannot be read. */
function countsOf(s: AgentStep): string {
	try {
		return s.summarize(JSON.parse(readFileSync(s.file, 'utf8')));
	} catch {
		return '';
	}
}

/** Runs one agent step, logs its outcome and records it in `outcome`. */
async function agentStep(
	today: string,
	s: AgentStep,
	outcome: { done: string[]; failed: string[] }
): Promise<void> {
	const t0 = Date.now();
	const failure = await step(today, s.label, s.recipe);
	const committed = await isCommitted(s.file);
	log(today, `${s.label} ${committed ? 'done' : 'NOT done'}`);
	const ms = Date.now() - t0;
	if (committed) {
		outcome.done.push(s.label);
		alog('step-done', s.actor, stepDoneDetail(s.file, countsOf(s), ms));
	} else {
		outcome.failed.push(s.label);
		alog('step-failed', s.actor, stepFailedDetail(failure ?? 'file not committed', ms));
	}
}

async function main(): Promise<void> {
	const argv = process.argv.slice(2);
	const dryRun = argv.includes('--dry-run');
	const force = argv.includes('--force');
	const now = new Date();
	const today =
		process.env.KEYWORDS_DAILY_TODAY ??
		new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(now);
	const minutes = clockMinutes(process.env.KEYWORDS_DAILY_TIME, now);

	if (!dryRun) mkdirSync(STATE_DIR, { recursive: true });
	const maxAttempts = DEFAULT_MAX_ATTEMPTS;
	const held = lockHeld(!dryRun);
	const researchDone = !force && (await isCommitted(researchFile(today)));
	const faqsDone = !force && (await isCommitted(faqsFile(today)));
	const planDone = !force && (await isCommitted(planFile(today)));
	const attemptsToday = readAttempts(today);
	const online = held ? true : await isOnline();
	const guardInput: GuardInput = {
		today,
		minutes: force ? START_MINUTES : minutes,
		researchDone,
		faqsDone,
		planDone,
		attemptsToday: force ? 0 : attemptsToday,
		maxAttempts,
		lockHeld: held,
		online
	};
	const decision = decideDailyRun(guardInput);
	const agentSteps = [
		decision.runResearch && 'research',
		decision.runFaqs && 'faqs',
		decision.runPlan && 'plan'
	].filter(Boolean);
	const plan = [...agentSteps, decision.runOrganize && 'organize'].filter(Boolean).join(' + ');
	const state = `research=${researchDone ? 'done' : 'pending'} faqs=${faqsDone ? 'done' : 'pending'} plan=${planDone ? 'done' : 'pending'} attempts=${attemptsToday}/${maxAttempts}`;
	if (!plan) {
		log(today, `skip (${decision.reason}) [${state}]`);
		const why = dryRun ? null : skipLogReason(guardInput);
		if (why && !hasLoggedToday(readMonthLog(), today, `reason=${why}`)) {
			alog('info', 'daily-guard', `reason=${why} attempts=${attemptsToday}/${maxAttempts}`);
		}
		return;
	}
	if (dryRun) {
		log(today, `would run ${plan} (${decision.reason}) [${state}]`);
		return;
	}
	if (!acquireLock()) {
		log(today, 'skip (another run holds the lock)');
		return;
	}
	try {
		pruneOldAttempts(today);
		// Only a run that calls an agent spends one of the daily attempts: organize-only runs are free.
		let attempts = readAttempts(today);
		if (agentSteps.length) {
			attempts += 1;
			writeFileSync(attemptsPath(today), String(attempts));
		}
		log(
			today,
			`run ${plan} (${decision.reason})${agentSteps.length ? ` attempt ${attempts}/${maxAttempts}` : ''}`
		);
		const runStart = Date.now();
		const outcome = { done: [] as string[], failed: [] as string[] };
		if (agentSteps.length) {
			alog(
				'run-start',
				'daily-guard',
				`steps=${plan.replace(/ \+ /g, '+')} attempt=${attempts}/${maxAttempts} reason="${decision.reason}"${force ? ' forced=yes' : ''}`
			);
		}
		// The agent steps are independent: each one that is pending runs, whatever happened before it.
		if (decision.runResearch) {
			await agentStep(
				today,
				{
					label: 'research',
					actor: 'ubersuggest-analyst',
					recipe: 'keywords-research',
					file: researchFile(today),
					summarize: summarizeResearch
				},
				outcome
			);
		}
		if (decision.runFaqs) {
			await agentStep(
				today,
				{
					label: 'faqs',
					actor: 'faq-researcher',
					recipe: 'faq-research',
					file: faqsFile(today),
					summarize: summarizeFaqs
				},
				outcome
			);
		}
		if (decision.runPlan) {
			await agentStep(
				today,
				{
					label: 'plan',
					actor: 'content-strategist',
					recipe: 'content-plan',
					file: planFile(today),
					summarize: summarizePlan
				},
				outcome
			);
		}
		// Last and unconditional: it also unblocks tasks when the agents did nothing or failed.
		// It is logged when it changed TODO.json, failed, or ran inside a run that calls agents:
		// an organize that changes nothing, hour after hour, would flood the log.
		if (decision.runOrganize) {
			const t0 = Date.now();
			const before = readText(TODO_FILE);
			const failure = await step(today, 'organize', 'todo-organize');
			log(today, 'organize finished');
			const changed = before !== readText(TODO_FILE);
			const ms = Date.now() - t0;
			if (failure) {
				alog('step-failed', 'todo-organize', stepFailedDetail(failure, ms));
			} else if (changed || agentSteps.length) {
				alog(
					'step-done',
					'todo-organize',
					`file=${TODO_FILE} changed=${changed ? 'yes' : 'no'} minutes=${(ms / 60_000).toFixed(1)}`
				);
			}
		}
		if (agentSteps.length) {
			alog('run-end', 'daily-guard', runEndDetail({ ...outcome, ms: Date.now() - runStart }));
		}
	} finally {
		rmSync(LOCK_DIR, { recursive: true, force: true });
	}
}

if (import.meta.main) {
	main().catch((e) => {
		console.error(e);
		if (lockOwned) rmSync(LOCK_DIR, { recursive: true, force: true });
		process.exit(1);
	});
}
