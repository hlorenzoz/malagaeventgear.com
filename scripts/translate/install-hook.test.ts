import { describe, expect, it } from 'vitest';
import { GUARD_END, GUARD_START, withGuardBlock } from './install-hook';

const GGA = '#!/usr/bin/env bash\n\n# ======== GGA START ========\n# gga run || exit 1\n# ======== GGA END ========\n';

describe('withGuardBlock', () => {
	it('appends the guard block and keeps what was there', () => {
		const out = withGuardBlock(GGA);
		expect(out.startsWith(GGA)).toBe(true);
		expect(out).toContain(GUARD_START);
		expect(out).toContain('bun scripts/translate/commit-guard.ts || exit 1');
		expect(out.trimEnd().endsWith(GUARD_END)).toBe(true);
	});

	it('is idempotent', () => {
		const once = withGuardBlock(GGA);
		expect(withGuardBlock(once)).toBe(once);
	});

	it('replaces an outdated block instead of stacking a second one', () => {
		const stale = `${GGA}\n${GUARD_START}\nold command\n${GUARD_END}\n`;
		const out = withGuardBlock(stale);
		expect(out.split(GUARD_START)).toHaveLength(2);
		expect(out).not.toContain('old command');
	});

	it('creates a runnable hook from nothing', () => {
		expect(withGuardBlock('').startsWith('#!/usr/bin/env bash')).toBe(true);
	});
});
