/**
 * batches.ts: the one reader of the committed Ubersuggest daily batches
 * (`.agents/context/keywords/ubersuggest/YYYY-MM-DD.json`), oldest first.
 *
 * `strict` throws on the first bad file (sync and the report log: a bad batch must fail loudly).
 * `tolerant` skips it and says which (the task organizer: a batch that another session is still
 * writing must not break `content-plan-apply`).
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { KeywordBatchSchema, type KeywordBatch } from './batch.schema';

export const BATCH_DIR = join('.agents', 'context', 'keywords', 'ubersuggest');
const BATCH_FILENAME_RE = /^\d{4}-\d{2}-\d{2}\.json$/;

export const isBatchFilename = (name: string): boolean => BATCH_FILENAME_RE.test(name);

export interface ParsedBatches {
	batches: KeywordBatch[];
	skipped: { name: string; error: string }[];
}

/** Pure: validates the files and returns the batches oldest first. */
export function parseBatchFiles(
	files: { name: string; raw: string }[],
	mode: 'strict' | 'tolerant',
): ParsedBatches {
	const batches: KeywordBatch[] = [];
	const skipped: ParsedBatches['skipped'] = [];
	for (const { name, raw } of [...files]
		.filter((f) => isBatchFilename(f.name))
		.sort((a, b) => a.name.localeCompare(b.name))) {
		try {
			batches.push(KeywordBatchSchema.parse(JSON.parse(raw)));
		} catch (e) {
			const error = (e as Error).message;
			if (mode === 'strict') throw new Error(`batch ${name}: ${error}`);
			skipped.push({ name, error });
		}
	}
	return { batches, skipped };
}

/** I/O: reads every batch file of a directory (default: the repo's). */
export function readBatches(
	mode: 'strict' | 'tolerant',
	dir: string = join(process.cwd(), BATCH_DIR),
): ParsedBatches {
	if (!existsSync(dir)) return { batches: [], skipped: [] };
	const files = readdirSync(dir)
		.filter(isBatchFilename)
		.map((name) => ({ name, raw: readFileSync(join(dir, name), 'utf8') }));
	return parseBatchFiles(files, mode);
}
