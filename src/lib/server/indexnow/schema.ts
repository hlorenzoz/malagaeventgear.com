import { z } from 'zod';

export const IndexNowSubmitInputSchema = z.union([
	z.object({
		url: z.string().min(1, 'required').url('invalid-url')
	}),
	z.object({
		urls: z.array(z.string().min(1, 'required').url('invalid-url')).min(1, 'at-least-one-url').max(100, 'max-100-urls')
	})
]);

export type IndexNowSubmitInput = z.infer<typeof IndexNowSubmitInputSchema>;

