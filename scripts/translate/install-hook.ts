#!/usr/bin/env bun
/**
 * install-hook.ts: puts the translations guard (commit-guard.ts) in `.git/hooks/pre-commit`.
 *
 *   bun scripts/translate/install-hook.ts      (`just hooks-install`)
 *
 * `.git/hooks` is not versioned, so a fresh clone has no guard until this runs once. It appends a
 * marked block and leaves whatever the hook already has (the GGA block) untouched. Idempotent: it
 * replaces its own block, never stacks a second one.
 */
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export const GUARD_START = '# ======== TRANSLATIONS GUARD START ========';
export const GUARD_END = '# ======== TRANSLATIONS GUARD END ========';

const BLOCK = [
	GUARD_START,
	'# An English post is committed together with its 12 translations (scripts/translate/commit-guard.ts)',
	'bun scripts/translate/commit-guard.ts || exit 1',
	GUARD_END
].join('\n');

/** The hook content with the guard block in it, once. Pure. */
export function withGuardBlock(current: string): string {
	const start = current.indexOf(GUARD_START);
	const end = current.indexOf(GUARD_END);
	if (start !== -1 && end > start) {
		return `${current.slice(0, start)}${BLOCK}${current.slice(end + GUARD_END.length)}`;
	}
	const base = current.trim().length > 0 ? current.replace(/\s+$/, '') : '#!/usr/bin/env bash';
	return `${base}\n\n${BLOCK}\n`;
}

function main(): void {
	const r = Bun.spawnSync(['git', 'rev-parse', '--git-path', 'hooks/pre-commit'], { stdout: 'pipe', stderr: 'pipe' });
	if (r.exitCode !== 0) {
		console.error('[hooks-install] not a git repository');
		process.exit(1);
	}
	const path = r.stdout.toString().trim();
	const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
	const next = withGuardBlock(current);
	mkdirSync(dirname(path), { recursive: true });
	if (next !== current) writeFileSync(path, next);
	chmodSync(path, 0o755);
	console.log(next === current ? `[hooks-install] ${path} already has the guard` : `[hooks-install] guard installed in ${path}`);
}

if (import.meta.main) main();
