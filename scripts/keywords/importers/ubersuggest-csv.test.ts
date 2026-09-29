/**
 * ubersuggest-csv.test.ts: unit tests for the pure transform of the headerless legacy
 * Ubersuggest export (`.agents/context/keywords/google-ads/*Ubersuggest.csv`, 29 rows, one phrase
 * per line, no header). Same "already audited, closed 2026-08-06" treatment as google-ads.ts.
 */
import { describe, it, expect } from 'vitest';
import { ubersuggestCsvPhrasesToKeywords, parseHeaderlessPhrases } from './ubersuggest-csv';

const TODAY = '2026-09-29';
const serviceAreas = ['Malaga', 'Marbella'];

describe('parseHeaderlessPhrases', () => {
	it('treats every non empty line as a phrase, with no header to skip', () => {
		const csv = 'sound systems for hire\nwhat is audio visual equipment\n\n';
		expect(parseHeaderlessPhrases(csv)).toEqual([
			'sound systems for hire',
			'what is audio visual equipment'
		]);
	});
});

describe('ubersuggestCsvPhrasesToKeywords', () => {
	it('marks a relevant phrase covered with a citing note and source ubersuggest-csv', () => {
		const [entry] = ubersuggestCsvPhrasesToKeywords(
			['sound systems for hire'],
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('covered');
		expect(entry.url).toBeNull();
		expect(entry.notes).toMatch(/2026-08-06/);
		expect(entry.sources).toEqual({
			ubersuggest: { firstSeen: TODAY, lastSeen: TODAY, via: ['csv'], stats: null }
		});
	});

	it('rejects an out of market phrase', () => {
		const [entry] = ubersuggestCsvPhrasesToKeywords(
			['audio visual rental dubai'],
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('rejected');
	});
});
