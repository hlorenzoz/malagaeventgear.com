/**
 * paths.test.ts: unit tests for the single module that names the project's data files.
 *
 * The data files (`keywords.json`, the task list) live in `.agents/data/`, not in the repo root.
 * Every script builds its path through this module, so a future move changes one file.
 */
import { describe, it, expect } from 'vitest';
import { join } from 'node:path';
import { DATA_DIR, keywordsPath, todoPath } from './paths';

describe('paths', () => {
	it('keeps the data files under .agents/data', () => {
		expect(DATA_DIR).toBe(join('.agents', 'data'));
	});

	it('resolves keywords.json against the given working directory', () => {
		expect(keywordsPath('/repo')).toBe(join('/repo', '.agents', 'data', 'keywords.json'));
	});

	it('resolves the task list against the given working directory', () => {
		expect(todoPath('/repo')).toBe(join('/repo', '.agents', 'data', 'TODO.json'));
	});

	it('defaults to the current working directory', () => {
		expect(keywordsPath()).toBe(join(process.cwd(), '.agents', 'data', 'keywords.json'));
		expect(todoPath()).toBe(join(process.cwd(), '.agents', 'data', 'TODO.json'));
	});

	it('never points at the repo root', () => {
		expect(keywordsPath('/repo')).not.toBe(join('/repo', 'keywords.json'));
		expect(todoPath('/repo')).not.toBe(join('/repo', 'TODO.json'));
	});
});
