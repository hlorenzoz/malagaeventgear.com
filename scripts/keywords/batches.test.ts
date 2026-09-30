/**
 * batches.test.ts: the shared reader of the committed Ubersuggest batches. Strict for `sync.ts`
 * and the report log (a bad batch must fail loudly), tolerant for the task organizer (a batch
 * half written by another session must not break `content-plan-apply`).
 */
import { describe, it, expect } from 'vitest';
import { parseBatchFiles, isBatchFilename } from './batches';

const ok = (date: string) => JSON.stringify({ date, run: { status: 'ok' } });

describe('isBatchFilename', () => {
	it('accepts only YYYY-MM-DD.json', () => {
		expect(isBatchFilename('2026-09-30.json')).toBe(true);
		expect(isBatchFilename('notes.json')).toBe(false);
		expect(isBatchFilename('2026-09-30.json.bak')).toBe(false);
	});
});

describe('parseBatchFiles', () => {
	it('returns the batches oldest first, whatever the input order', () => {
		const out = parseBatchFiles(
			[
				{ name: '2026-09-30.json', raw: ok('2026-09-30') },
				{ name: '2026-09-29.json', raw: ok('2026-09-29') },
			],
			'strict',
		);
		expect(out.batches.map((b) => b.date)).toEqual(['2026-09-29', '2026-09-30']);
		expect(out.skipped).toEqual([]);
	});

	it('ignores files that are not batches', () => {
		const out = parseBatchFiles([{ name: 'README.md', raw: 'x' }], 'strict');
		expect(out.batches).toEqual([]);
	});

	it('throws in strict mode on invalid JSON or a schema error, naming the file', () => {
		expect(() => parseBatchFiles([{ name: '2026-09-30.json', raw: '{' }], 'strict')).toThrow(
			/2026-09-30\.json/,
		);
		expect(() => parseBatchFiles([{ name: '2026-09-30.json', raw: '{}' }], 'strict')).toThrow(
			/2026-09-30\.json/,
		);
	});

	it('skips and reports a bad file in tolerant mode', () => {
		const out = parseBatchFiles(
			[
				{ name: '2026-09-29.json', raw: ok('2026-09-29') },
				{ name: '2026-09-30.json', raw: '{' },
			],
			'tolerant',
		);
		expect(out.batches.map((b) => b.date)).toEqual(['2026-09-29']);
		expect(out.skipped).toHaveLength(1);
		expect(out.skipped[0].name).toBe('2026-09-30.json');
	});
});
