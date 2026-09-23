import { describe, it, expect } from 'vitest';

/**
 * Guard test for the `hashed-assets-static-env` change.
 *
 * `/_app/env.js`, SvelteKit's dynamic-public-env virtual endpoint, is only generated when
 * at least one module imports `$env/dynamic/public`. That endpoint is served with no
 * Cache-Control header and cannot be reached by `_headers` or `src/hooks.server.ts` (it is
 * a runtime-generated virtual route, not a static asset or a Worker-handled request). The
 * fix is `$env/static/public`, which inlines the value into the built bundle at build time.
 * This test makes sure the import never quietly comes back.
 *
 * Sources are read with Vite's `import.meta.glob` rather than `node:fs`, per AGENTS.md §3 /
 * the pattern established in `no-hardcoded-prices.test.ts`.
 */

const sources = import.meta.glob('../../**/*.{ts,svelte}', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/**
 * Files allowed to contain the forbidden import string, with the reason why.
 *
 * Empty on purpose: after this change, there are zero legitimate uses left. If one is ever
 * reintroduced deliberately, the fix is to add it here with a comment explaining why, not to
 * weaken the scan.
 */
const ALLOWLIST: string[] = [];

/**
 * Strips block comments and whole-line comments before scanning, same rationale as
 * `no-hardcoded-prices.test.ts`: the guard exists to stop the import being USED, and a
 * comment (like this file's own docstring, or a future one explaining why it's forbidden)
 * imports nothing.
 */
function stripComments(source: string): string {
	return source
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.split('\n')
		.filter((line) => {
			const trimmed = line.trimStart();
			return !trimmed.startsWith('//') && !trimmed.startsWith('*');
		})
		.join('\n');
}

const FORBIDDEN_IMPORT = '$env/dynamic/public';

const scanned = Object.entries(sources)
	.map(([path, contents]) => [path.replace(/^(\.\.\/)+/, '').replace(/^\.\//, ''), contents] as const)
	.filter(([path]) => !ALLOWLIST.some((allowed) => path.endsWith(allowed)));

describe('no $env/dynamic/public imports outside the single allowlist', () => {
	it.each(scanned.map(([path]) => path))('%s does not import $env/dynamic/public', (path) => {
		const contents = scanned.find(([p]) => p === path)?.[1] ?? '';
		const offends = stripComments(contents).includes(FORBIDDEN_IMPORT);

		expect(
			offends,
			`${path} imports ${FORBIDDEN_IMPORT}, which forces SvelteKit to generate the ` +
				`uncacheable /_app/env.js virtual endpoint. Use $env/static/public instead.`
		).toBe(false);
	});

	it('scans a meaningful number of files', () => {
		// Guards the guard: a broken glob silently turning this suite into a no-op is
		// exactly the failure mode that lets the import back in unnoticed.
		expect(scanned.length).toBeGreaterThan(50);
	});

	it('would actually catch a violation', () => {
		expect(stripComments(`import { env } from '${FORBIDDEN_IMPORT}';`).includes(FORBIDDEN_IMPORT)).toBe(true);
		// And that a comment mentioning it does not fire.
		expect(stripComments(`// forbidden: '${FORBIDDEN_IMPORT}'`).includes(FORBIDDEN_IMPORT)).toBe(false);
	});
});
