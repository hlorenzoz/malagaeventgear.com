import { describe, expect, it } from 'vitest';
import { needsIndexNow } from './map-indexnow-eligibility';

const NOW = new Date('2026-07-25T00:00:00Z');

describe('needsIndexNow', () => {
	it('false when there is no updated date', () => {
		expect(needsIndexNow(NOW, undefined, undefined)).toBe(false);
	});

	it('true when updated within the window and never submitted', () => {
		expect(needsIndexNow(NOW, '2026-07-24', undefined)).toBe(true);
	});

	it('false when updated OUTSIDE the window, regardless of submission state', () => {
		// This is the reported bug: a post updated months ago should not clutter the list.
		expect(needsIndexNow(NOW, '2026-02-17', undefined)).toBe(false);
	});

	it('false right at the window boundary (exactly N days old, still within)', () => {
		expect(needsIndexNow(NOW, '2026-07-22', undefined, 3)).toBe(true);
		expect(needsIndexNow(NOW, '2026-07-21', undefined, 3)).toBe(false);
	});

	it('true when within window and the last submission predates the update', () => {
		expect(needsIndexNow(NOW, '2026-07-24', '2026-07-20')).toBe(true);
	});

	it('false when within window but already submitted after the update', () => {
		expect(needsIndexNow(NOW, '2026-07-24', '2026-07-25')).toBe(false);
	});

	it('normalizes YAML unquoted-date strings (ISO datetime) on both sides', () => {
		// The bug this test locks in: gray-matter parses an unquoted YAML date into a Date,
		// which serializes with a time+Z suffix. Comparing that raw against a plain
		// YYYY-MM-DD string must not produce a false positive/negative for the same day.
		expect(needsIndexNow(NOW, '2026-07-24T00:00:00.000Z', '2026-07-24')).toBe(false);
		expect(needsIndexNow(NOW, '2026-07-24', '2026-07-24T00:00:00.000Z')).toBe(false);
	});

	it('respects a custom window size', () => {
		expect(needsIndexNow(NOW, '2026-07-18', undefined, 7)).toBe(true);
		expect(needsIndexNow(NOW, '2026-07-18', undefined, 3)).toBe(false);
	});
});
