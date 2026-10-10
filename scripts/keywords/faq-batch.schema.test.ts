/**
 * faq-batch.schema.test.ts: the only shape the faq-researcher agent may write.
 */
import { describe, it, expect } from 'vitest';
import { FaqBatchSchema } from './faq-batch.schema';

const base = { date: '2026-10-01', run: { status: 'ok' } };

describe('FaqBatchSchema', () => {
	it('accepts raw suggestions with their seed', () => {
		const b = FaqBatchSchema.parse({
			...base,
			suggestions: [
				{ seed: 'sound-system-rental', phrase: 'how much does sound system rental cost' }
			]
		});
		expect(b.suggestions).toHaveLength(1);
		expect(b.run.calls).toEqual([]);
	});

	it('defaults suggestions to empty and keeps calls with an outcome', () => {
		const b = FaqBatchSchema.parse({
			...base,
			run: { status: 'partial', calls: [{ tool: 'google_suggestions', outcome: 'failed' }] }
		});
		expect(b.suggestions).toEqual([]);
		expect(b.run.calls[0].outcome).toBe('failed');
	});

	it('keeps the ids of every seed consulted, also the ones that returned nothing', () => {
		const b = FaqBatchSchema.parse({ ...base, seeds: ['audio-visual-rental', 'projector-rental'] });
		expect(b.seeds).toEqual(['audio-visual-rental', 'projector-rental']);
		expect(b.suggestions).toEqual([]);
	});

	it('defaults seeds to empty, so the batches written before the field existed stay valid', () => {
		expect(FaqBatchSchema.parse(base).seeds).toEqual([]);
		expect(() => FaqBatchSchema.parse({ ...base, seeds: [''] })).toThrow();
	});

	it('rejects a bad date, an empty phrase, an unknown key or a classification the agent must not make', () => {
		expect(() => FaqBatchSchema.parse({ ...base, date: '01/10/2026' })).toThrow();
		expect(() =>
			FaqBatchSchema.parse({ ...base, suggestions: [{ seed: 'a', phrase: '' }] })
		).toThrow();
		expect(() =>
			FaqBatchSchema.parse({ ...base, suggestions: [{ seed: 'a', phrase: 'x', isQuestion: true }] })
		).toThrow();
	});
});
