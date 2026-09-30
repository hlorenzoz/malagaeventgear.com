import { describe, expect, it } from 'vitest';
import { decideDailyRun, isLockStale, type GuardInput } from './daily-guard';

const base: GuardInput = {
	today: '2026-09-30',
	hour: 10,
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

	it('skips before 09:00', () => {
		const d = decideDailyRun({ ...base, hour: 8 });
		expect(d.runResearch || d.runFaqs || d.runPlan).toBe(false);
		expect(d.reason).toContain('09:00');
	});

	it('runs at exactly 09:00', () => {
		expect(decideDailyRun({ ...base, hour: 9 }).runResearch).toBe(true);
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
		const d = decideDailyRun({ ...base, lockHeld: true, hour: 3, online: false });
		expect(d.reason).toContain('lock');
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
