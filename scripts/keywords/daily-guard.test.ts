import { describe, expect, it } from 'vitest';
import {
	START_MINUTES,
	clockMinutes,
	decideDailyRun,
	isLockStale,
	shouldCommitTodo,
	skipLogReason,
	type GuardInput
} from './daily-guard';

describe('shouldCommitTodo', () => {
	it('commits only when organize succeeded and TODO.json really changed', () => {
		expect(shouldCommitTodo(null, true)).toBe(true);
		expect(shouldCommitTodo(null, false)).toBe(false);
		expect(shouldCommitTodo('exit code 1', true)).toBe(false);
		expect(shouldCommitTodo('crashed: boom', false)).toBe(false);
	});
});

const base: GuardInput = {
	today: '2026-09-30',
	minutes: 10 * 60,
	researchDone: false,
	faqsDone: false,
	planDone: false,
	attemptsToday: 0,
	maxAttempts: 3,
	lockHeld: false,
	online: true
};

describe('decideDailyRun', () => {
	it('runs research and then the plan when nothing is done', () => {
		const d = decideDailyRun(base);
		expect(d.runResearch).toBe(true);
		expect(d.runPlan).toBe(true);
	});

	it('runs research, then the FAQs, then the plan when nothing is done', () => {
		const d = decideDailyRun(base);
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([true, true, true]);
	});

	it('runs the FAQs and the plan when research is done', () => {
		const d = decideDailyRun({ ...base, researchDone: true });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, true, true]);
		expect(d.reason).toContain('faqs');
	});

	it('runs only the plan when research and FAQs are done', () => {
		const d = decideDailyRun({ ...base, researchDone: true, faqsDone: true });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, false, true]);
	});

	it('runs only the FAQs when they are the only step missing', () => {
		const d = decideDailyRun({ ...base, researchDone: true, planDone: true });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, true, false]);
	});

	it('skips when everything is done', () => {
		const d = decideDailyRun({ ...base, researchDone: true, faqsDone: true, planDone: true });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, false, false]);
		expect(d.reason).toContain('already committed');
	});

	it('skips while another run holds the lock', () => {
		const d = decideDailyRun({ ...base, lockHeld: true });
		expect(d.runResearch || d.runFaqs || d.runPlan).toBe(false);
		expect(d.reason).toContain('lock');
	});

	it('skips before 09:30, including 09:29', () => {
		for (const minutes of [8 * 60, 9 * 60, 9 * 60 + 29]) {
			const d = decideDailyRun({ ...base, minutes });
			expect(d.runResearch || d.runFaqs || d.runPlan, `at ${minutes}`).toBe(false);
			expect(d.reason).toContain('09:30');
		}
	});

	it('runs at exactly 09:30', () => {
		expect(decideDailyRun({ ...base, minutes: 9 * 60 + 30 }).runResearch).toBe(true);
	});

	it('starts at 09:30, the time the scheduler fires', () => {
		expect(START_MINUTES).toBe(570);
	});

	it('skips when offline', () => {
		const d = decideDailyRun({ ...base, online: false });
		expect(d.runResearch || d.runFaqs || d.runPlan).toBe(false);
		expect(d.reason).toContain('offline');
	});

	it('skips once the daily attempts are used up', () => {
		const d = decideDailyRun({ ...base, attemptsToday: 3 });
		expect(d.runResearch || d.runFaqs || d.runPlan).toBe(false);
		expect(d.reason).toContain('attempts');
	});

	it('still runs on the last allowed attempt', () => {
		expect(decideDailyRun({ ...base, attemptsToday: 2 }).runResearch).toBe(true);
	});

	it('the lock wins over every other condition', () => {
		const d = decideDailyRun({ ...base, lockHeld: true, minutes: 3 * 60, online: false });
		expect(d.reason).toContain('lock');
	});
});

describe('decideDailyRun: organize runs independently of the agents', () => {
	it('organizes when every agent step is pending', () => {
		expect(decideDailyRun(base).runOrganize).toBe(true);
	});

	it('organizes even when everything is already done (it unblocks tasks when the translation backlog reaches 0)', () => {
		const d = decideDailyRun({ ...base, researchDone: true, faqsDone: true, planDone: true });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, false, false]);
		expect(d.runOrganize).toBe(true);
		expect(d.reason).toContain('already committed');
	});

	it('organizes when offline: it needs no network', () => {
		const d = decideDailyRun({ ...base, online: false });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, false, false]);
		expect(d.runOrganize).toBe(true);
		expect(d.reason).toContain('offline');
	});

	it('organizes once the daily attempts are used up', () => {
		const d = decideDailyRun({ ...base, attemptsToday: 3 });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([false, false, false]);
		expect(d.runOrganize).toBe(true);
		expect(d.reason).toContain('attempts');
	});

	it('does not organize while another run holds the lock', () => {
		expect(decideDailyRun({ ...base, lockHeld: true }).runOrganize).toBe(false);
	});

	it('does not organize before 09:30', () => {
		expect(decideDailyRun({ ...base, minutes: 9 * 60 + 29 }).runOrganize).toBe(false);
	});

	it('keeps the agent steps independent: a pending plan never waits for research or FAQs', () => {
		const d = decideDailyRun({ ...base, researchDone: false, faqsDone: false, planDone: false });
		expect([d.runResearch, d.runFaqs, d.runPlan]).toEqual([true, true, true]);
	});
});

describe('isLockStale', () => {
	const now = 10_000_000_000;
	it('is stale when the pid is dead', () => {
		expect(isLockStale({ pidAlive: false, ageMs: 1000 })).toBe(true);
	});
	it('is stale when older than 3 hours', () => {
		expect(isLockStale({ pidAlive: true, ageMs: 3 * 3600_000 + 1 })).toBe(true);
	});
	it('is fresh when alive and recent', () => {
		expect(isLockStale({ pidAlive: true, ageMs: 60_000 })).toBe(false);
	});
});

describe('clockMinutes', () => {
	const at = (h: number, m: number) => new Date(2026, 8, 30, h, m);

	it('reads the real clock when no override is set, or when it is empty', () => {
		expect(clockMinutes(undefined, at(15, 48))).toBe(15 * 60 + 48);
		expect(clockMinutes('', at(15, 48))).toBe(15 * 60 + 48);
	});

	it('takes an HH:MM override', () => {
		expect(clockMinutes('09:29', at(15, 48))).toBe(9 * 60 + 29);
		expect(clockMinutes('9:30', at(1, 0))).toBe(570);
	});

	it('ignores a malformed override instead of turning it into midnight', () => {
		expect(clockMinutes('abc', at(15, 48))).toBe(15 * 60 + 48);
		expect(clockMinutes('25:99', at(15, 48))).toBe(15 * 60 + 48);
	});
});

describe('skipLogReason: the only skips that reach the activity log', () => {
	it('logs offline (something is pending and the network is down)', () => {
		expect(skipLogReason({ ...base, online: false })).toBe('offline');
	});

	it('logs attempts-exhausted', () => {
		expect(skipLogReason({ ...base, attemptsToday: 3 })).toBe('attempts-exhausted');
	});

	it('does not log the hourly noise: before 09:30, lock held, or everything already committed', () => {
		expect(skipLogReason({ ...base, minutes: 9 * 60 + 29, online: false })).toBeNull();
		expect(skipLogReason({ ...base, lockHeld: true, online: false })).toBeNull();
		expect(
			skipLogReason({
				...base,
				researchDone: true,
				faqsDone: true,
				planDone: true,
				online: false
			})
		).toBeNull();
	});

	it('does not log a run that executes something', () => {
		expect(skipLogReason(base)).toBeNull();
	});
});
