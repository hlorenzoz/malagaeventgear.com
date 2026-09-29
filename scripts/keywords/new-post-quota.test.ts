import { describe, it, expect } from 'vitest';
import { checkNewPostQuota, newPostQuota, translationBacklog } from './new-post-quota';
import type { ContentPlan, PlanItem } from './plan.schema';

const LOCALES = ['fr', 'de'];

describe('translationBacklog', () => {
	it('counts every published English post missing in each locale', () => {
		const b = translationBacklog(['a', 'b', 'c'], { fr: ['a', 'b', 'c'], de: ['a'] }, LOCALES);
		expect(b).toEqual({ englishPosts: 3, locales: 2, missing: 2, complete: false });
	});

	it('is complete when every locale has every post', () => {
		const b = translationBacklog(['a', 'b'], { fr: ['a', 'b'], de: ['b', 'a'] }, LOCALES);
		expect(b.complete).toBe(true);
		expect(b.missing).toBe(0);
	});

	it('treats a locale without a folder as missing everything', () => {
		const b = translationBacklog(['a', 'b'], { fr: ['a', 'b'] }, LOCALES);
		expect(b.missing).toBe(2);
		expect(b.complete).toBe(false);
	});

	it('ignores translations of posts that are not published in English', () => {
		const b = translationBacklog(['a'], { fr: ['a', 'old'], de: ['a'] }, LOCALES);
		expect(b.complete).toBe(true);
	});
});

describe('newPostQuota', () => {
	const done = translationBacklog(['a'], { fr: ['a'], de: ['a'] }, LOCALES);
	const pending = translationBacklog(['a'], { fr: ['a'] }, LOCALES);

	it('stays at 1 while the translation backlog is open, whatever the day', () => {
		expect(newPostQuota('2026-09-29', pending).limit).toBe(1);
		expect(newPostQuota('2026-09-30', pending).limit).toBe(1);
		expect(newPostQuota('2026-09-29', pending).reason).toMatch(/1 translation/);
	});

	it('alternates 1 and 2 day by day once every post is translated', () => {
		const days = ['2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02'];
		const limits = days.map((d) => newPostQuota(d, done).limit);
		for (let i = 1; i < limits.length; i++) expect(limits[i]).not.toBe(limits[i - 1]);
		expect(new Set(limits)).toEqual(new Set([1, 2]));
	});

	it('keeps alternating across a month boundary with 31 days', () => {
		expect(newPostQuota('2026-10-31', done).limit).not.toBe(newPostQuota('2026-11-01', done).limit);
	});
});

describe('checkNewPostQuota', () => {
	const item = (action: PlanItem['action']) => ({ action }) as PlanItem;
	const plan = (actions: PlanItem['action'][]) =>
		({ date: '2026-09-29', items: actions.map(item) }) as unknown as ContentPlan;

	it('accepts a plan within the quota', () => {
		expect(checkNewPostQuota(plan(['new-post', 'add-faq']), { limit: 1, reason: 'r' })).toBeNull();
		expect(checkNewPostQuota(plan(['new-post', 'new-post']), { limit: 2, reason: 'r' })).toBeNull();
	});

	it('rejects a plan with more new posts than the quota, and says why', () => {
		const error = checkNewPostQuota(plan(['new-post', 'new-post']), { limit: 1, reason: 'backlog' });
		expect(error).toMatch(/2 new-post items, the limit for 2026-09-29 is 1/);
		expect(error).toMatch(/backlog/);
	});
});
