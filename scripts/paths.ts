/**
 * paths.ts: the single place that names the project's data files.
 *
 * The generated and working data files live in `.agents/data/`, not in the repo root:
 * - `keywords.json`: the keyword map, written only by the scripts in `scripts/keywords/`.
 * - `TODO.txt`: the task list, ordered by `scripts/todo/organize.ts`.
 *
 * Scripts run standalone with bun from the repo root (also under launchd, whose
 * `WorkingDirectory` is the repo), so `process.cwd()` is the repo root. Every script builds
 * its path through these helpers so a future move changes this file and nothing else.
 */
import { join } from 'node:path';

export const DATA_DIR = join('.agents', 'data');

export const keywordsPath = (cwd: string = process.cwd()): string =>
	join(cwd, DATA_DIR, 'keywords.json');

export const todoPath = (cwd: string = process.cwd()): string => join(cwd, DATA_DIR, 'TODO.txt');
