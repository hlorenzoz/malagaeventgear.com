/**
 * faq-batch.schema.ts: the daily FAQ batch, written by the faq-researcher agent to
 * `.agents/context/keywords/faqs/YYYY-MM-DD.json`. The agent only copies the raw Google
 * autocomplete phrases with the seed that produced each one: it does not classify them, decide
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
	suggestions: z
		.array(z.strictObject({ seed: z.string().min(1), phrase: z.string().min(1) }))
		.default([])
});

export type FaqBatch = z.infer<typeof FaqBatchSchema>;
