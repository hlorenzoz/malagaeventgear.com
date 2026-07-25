import { z } from 'zod';

export const IndexNowSubmitInputSchema = z.object({
	url: z.string().min(1, 'required').url('invalid-url')
});

export type IndexNowSubmitInput = z.infer<typeof IndexNowSubmitInputSchema>;
