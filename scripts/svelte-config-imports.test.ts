/**
 * svelte.config.js is loaded by SvelteKit with a plain Node `import()`, not through Vite or
 * esbuild. Node only runs TypeScript natively from 22.18 on, so a `.ts` anywhere in its import
 * graph would fail the whole build (ERR_UNKNOWN_FILE_EXTENSION) on an older Node, such as a
 * build image we do not control. This walks every relative import reachable from
 * svelte.config.js and fails on any `.ts` file: data those plugins need comes from vite.config.ts
 * on `globalThis` (see scripts/blog-structure-words.mjs).
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = resolve(import.meta.dirname, '..');

/** Relative module specifiers of a JS source (static and dynamic imports, re-exports). */
function relativeImports(source: string): string[] {
	const specs = new Set<string>();
	const patterns = [
		/\bimport\s+(?:[^'"]*?\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/g,
		/\bexport\s+[^'"]*?\s+from\s+['"](\.{1,2}\/[^'"]+)['"]/g,
		/\bimport\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g
	];
	for (const re of patterns) for (const m of source.matchAll(re)) specs.add(m[1]);
	return [...specs];
}

function walk(entry: string): { files: string[]; tsImports: string[] } {
	const seen = new Set<string>();
	const tsImports: string[] = [];
	const queue = [entry];
	while (queue.length > 0) {
		const file = queue.shift()!;
		if (seen.has(file)) continue;
		seen.add(file);
		for (const spec of relativeImports(readFileSync(file, 'utf8'))) {
			const target = resolve(dirname(file), spec);
			if (/\.(ts|mts|cts)$/.test(target) || (!/\.[cm]?js$|\.json$/.test(target) && existsSync(`${target}.ts`))) {
				tsImports.push(`${file.slice(ROOT.length + 1)} -> ${spec}`);
				continue;
			}
			if (/\.[cm]?js$/.test(target) && existsSync(target)) queue.push(target);
		}
	}
	return { files: [...seen], tsImports };
}

describe('the svelte.config.js import graph', () => {
	const graph = walk(resolve(ROOT, 'svelte.config.js'));

	it('reaches the blog rehype plugins (the walk works)', () => {
		expect(graph.files.some((f) => f.endsWith('scripts/rehype-faq-accordion.mjs'))).toBe(true);
		expect(graph.files.some((f) => f.endsWith('scripts/blog-structure-words.mjs'))).toBe(true);
	});

	it('imports no TypeScript file (Node loads it without Vite)', () => {
		expect(graph.tsImports).toEqual([]);
	});
});
