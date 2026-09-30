/**
 * faq-batches.ts: the reader of the committed FAQ batches
 * (`.agents/context/keywords/faqs/YYYY-MM-DD.json`), oldest first. Strict: a bad batch fails
 * loudly, so `sync.ts` never silently forgets FAQs it could replay.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { isBatchFilename } from './batches';
import { FaqBatchSchema, type FaqBatch } from './faq-batch.schema';

export const FAQ_BATCH_DIR = join('.agents', 'context', 'keywords', 'faqs');

/** Pure: validates the files and returns the batches oldest first. */
export function parseFaqBatchFiles(files: { name: string; raw: string }[]): FaqBatch[] {
	return [...files]
		.filter((f) => isBatchFilename(f.name))
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(({ name, raw }) => {
			try {
				return FaqBatchSchema.parse(JSON.parse(raw));
			} catch (e) {
				throw new Error(`faq batch ${name}: ${(e as Error).message}`);
			}
		});
}

/** I/O: every FAQ batch of a directory (default: the repo's). */
export function readFaqBatches(dir: string = join(process.cwd(), FAQ_BATCH_DIR)): FaqBatch[] {
	if (!existsSync(dir)) return [];
	return parseFaqBatchFiles(
		readdirSync(dir)
			.filter(isBatchFilename)
			.map((name) => ({ name, raw: readFileSync(join(dir, name), 'utf8') }))
	);
}
