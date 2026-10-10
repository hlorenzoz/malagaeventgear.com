/**
 * faq-batch.schema.ts: the daily FAQ batch, written by the faq-researcher agent to
 * `.agents/context/keywords/faqs/YYYY-MM-DD.json`. The agent only copies the raw Google
 * autocomplete phrases with the seed that produced each one, plus the ids of all the seeds it asked: it does not classify them, decide
 * which are questions or judge relevance. `ingest-faqs.ts` does all of that.
 */

import { z } from 'zod';

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

export const FaqBatchSchema = z.strictObject({
	date: dateOnly,
	run: z.strictObject({
		status: z.enum(['ok', 'partial', 'aborted']),
		reason: z.string().optional(),
		calls: z
			.array(
				z.strictObject({
					tool: z.string().min(1),
					args: z.string().optional(),
					outcome: z.enum(['ok', 'empty', 'failed', 'quota']).optional()
				})
			)
			.default([])
	}),
	/**
	 * The id of EVERY seed consulted in this run, also the ones that returned no question. The
	 * rotation (faq-seeds.ts) reads it: a seed with no result must still count as consulted, or it
	 * comes back first every day. Empty in the batches written before the field existed.
	 */
	seeds: z.array(z.string().min(1)).default([]),
	suggestions: z
		.array(z.strictObject({ seed: z.string().min(1), phrase: z.string().min(1) }))
		.default([])
});

export type FaqBatch = z.infer<typeof FaqBatchSchema>;
