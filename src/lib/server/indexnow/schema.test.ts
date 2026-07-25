import { describe, expect, it } from 'vitest';
import { IndexNowSubmitInputSchema } from './schema';

describe('IndexNowSubmitInputSchema', () => {
	it('accepts a valid absolute URL', () => {
		const result = IndexNowSubmitInputSchema.safeParse({
			url: 'https://malagaeventgear.com/blog/audio-visual-rental/'
		});
		expect(result.success).toBe(true);
	});

	it('rejects a missing url', () => {
		const result = IndexNowSubmitInputSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	it('rejects a non-URL string', () => {
		const result = IndexNowSubmitInputSchema.safeParse({ url: 'not-a-url' });
		expect(result.success).toBe(false);
	});

	it('rejects an empty string', () => {
		const result = IndexNowSubmitInputSchema.safeParse({ url: '' });
		expect(result.success).toBe(false);
	});
});
