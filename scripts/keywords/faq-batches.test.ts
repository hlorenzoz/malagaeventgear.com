/**
 * faq-batches.test.ts: the reader of the committed FAQ batches (`.agents/context/keywords/faqs/`).
 */
import { describe, it, expect } from 'vitest';
import { parseFaqBatchFiles } from './faq-batches';

const ok = (date: string) => JSON.stringify({ date, run: { status: 'ok' } });

describe('parseFaqBatchFiles', () => {
	it('returns the batches oldest first and ignores files that are not batches', () => {
		const out = parseFaqBatchFiles([
			{ name: '2026-10-02.json', raw: ok('2026-10-02') },
			{ name: 'README.md', raw: 'x' },
			{ name: '2026-10-01.json', raw: ok('2026-10-01') }
		]);
		expect(out.map((b) => b.date)).toEqual(['2026-10-01', '2026-10-02']);
	});

	it('throws naming the file when a batch is invalid', () => {
		expect(() => parseFaqBatchFiles([{ name: '2026-10-01.json', raw: '{}' }])).toThrow(/2026-10-01\.json/);
	});
});
