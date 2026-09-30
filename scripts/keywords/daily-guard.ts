#!/usr/bin/env bun
/**
 * daily-guard.ts: decides whether today's keyword research, FAQ research and content plan still have to run,
 * and runs what is missing. `just keywords-daily` is this script. launchd fires it at 09:00, at
 * login (RunAtLoad) and every hour, so a Mac that was powered off or offline catches up later.
 * Most triggers do nothing and cost nothing (no Claude call).
 *
 * State is derived from the repo, not from a success file: a step is DONE when today's file
 * exists, is tracked and has no uncommitted diff. There is no backfill: several missed days mean
 * one run today.
 *
 * Chain: Ubersuggest research, then the FAQ agent, then the content plan.
 *
 * Flags: `--dry-run` prints the decision and touches nothing. `--force` ignores hour and done
 * flags (the lock and the offline check still apply) for manual runs.
 * Env `KEYWORDS_DAILY_TODAY` (YYYY-MM-DD) and `KEYWORDS_DAILY_HOUR` override the clock, for tests.
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

export const START_HOUR = 9;
export const DEFAULT_MAX_ATTEMPTS = 3;
export const LOCK_MAX_AGE_MS = 3 * 3600_000;

export interface GuardInput {
	today: string;
	hour: number;
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
	reason: string;
}

const none = (reason: string): GuardDecision => ({
	runResearch: false,
	runFaqs: false,
	runPlan: false,
	reason
});

/** Pure: what to run right now. Rules are checked in priority order. */
export function decideDailyRun(i: GuardInput): GuardDecision {
	if (i.lockHeld) return none('another run holds the lock');
	if (i.hour < START_HOUR) return none(`before ${String(START_HOUR).padStart(2, '0')}:00`);
	if (i.researchDone && i.faqsDone && i.planDone) {
		return none('research, faqs and plan already committed');
	}
	if (!i.online) return none('offline, will retry at the next trigger');
	if (i.attemptsToday >= i.maxAttempts) {
		return none(`daily attempts used up (${i.attemptsToday}/${i.maxAttempts})`);
	}
	const runPlan = !i.planDone;
	if (!i.researchDone) {
		return { runResearch: true, runFaqs: !i.faqsDone, runPlan, reason: 'research pending' };
	}
	if (!i.faqsDone) return { runResearch: false, runFaqs: true, runPlan, reason: 'faqs pending' };
	return { runResearch: false, runFaqs: false, runPlan: true, reason: 'plan pending' };
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

async function run(recipe: string): Promise<void> {
	const p = Bun.spawn(['just', recipe], { stdout: 'inherit', stderr: 'inherit' });
	await p.exited;
}

async function main(): Promise<void> {
	const argv = process.argv.slice(2);
	const dryRun = argv.includes('--dry-run');
	const force = argv.includes('--force');
	const now = new Date();
	const today =
		process.env.KEYWORDS_DAILY_TODAY ??
		new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(now);
	const hour = Number(process.env.KEYWORDS_DAILY_HOUR ?? now.getHours());

	if (!dryRun) mkdirSync(STATE_DIR, { recursive: true });
	const maxAttempts = DEFAULT_MAX_ATTEMPTS;
	const held = lockHeld(!dryRun);
	const researchDone = !force && (await isCommitted(researchFile(today)));
	const faqsDone = !force && (await isCommitted(faqsFile(today)));
	const planDone = !force && (await isCommitted(planFile(today)));
	const attemptsToday = readAttempts(today);
	const online = held ? true : await isOnline();
	const decision = decideDailyRun({
		today,
		hour: force ? START_HOUR : hour,
		researchDone,
		faqsDone,
		planDone,
		attemptsToday: force ? 0 : attemptsToday,
		maxAttempts,
		lockHeld: held,
		online
	});
	const plan = [
		decision.runResearch && 'research',
		decision.runFaqs && 'faqs',
		decision.runPlan && 'plan'
	]
		.filter(Boolean)
		.join(' + ');
	const state = `research=${researchDone ? 'done' : 'pending'} faqs=${faqsDone ? 'done' : 'pending'} plan=${planDone ? 'done' : 'pending'} attempts=${attemptsToday}/${maxAttempts}`;
	if (!plan) {
		log(today, `skip (${decision.reason}) [${state}]`);
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
		const attempts = readAttempts(today) + 1;
		writeFileSync(attemptsPath(today), String(attempts));
		log(today, `run ${plan} (${decision.reason}) attempt ${attempts}/${maxAttempts}`);
		let researchOk = researchDone;
		if (decision.runResearch) {
			await run('keywords-research');
			researchOk = await isCommitted(researchFile(today));
			log(today, `research ${researchOk ? 'done' : 'NOT done'}`);
		}
		let faqsOk = faqsDone;
		if (decision.runFaqs) {
			await run('faq-research');
			faqsOk = await isCommitted(faqsFile(today));
			log(today, `faqs ${faqsOk ? 'done' : 'NOT done'}`);
		}
		// Plan choice: if research or the FAQs are still missing and retries remain, the plan waits
		// for the next trigger, so it never runs on yesterday's data unless attempts run out.
		if (decision.runPlan && !(researchOk && faqsOk) && attempts < maxAttempts && !force) {
			log(today, 'plan deferred (research or faqs not done, retries remain)');
			return;
		}
		if (decision.runPlan) {
			await run('content-plan');
			log(today, `plan ${(await isCommitted(planFile(today))) ? 'done' : 'NOT done'}`);
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
