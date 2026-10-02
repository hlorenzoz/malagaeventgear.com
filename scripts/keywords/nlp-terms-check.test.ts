/**
 * nlp-terms-check.test.ts: the validator the orchestrator trusts instead of the researcher's own
 * report. It checks the path, the content against the schema and the match between the two.
 */
import { describe, it, expect } from 'vitest';
import { checkNlpTermsFile, isNlpTermsPath } from './nlp-terms-check';

const PATH = '.agents/context/keywords/nlp-terms/2026-10-02-T0041.json';

const file = {
	date: '2026-10-02',
	taskId: '#T0041',
	slug: 'sound-system-rental',
	searchTerm: 'sound system rental',
	status: 'ok',
	serp: {
		query: 'sound system rental',
		localized: false,
		results: [
			{ rank: 1, url: 'https://example.com/1', title: 'Hire' },
			{ rank: 2, url: 'https://example.com/2', title: 'Hire' }
		]
	},
	terms: [
		{ term: 'wireless microphone', kind: 'related', seenIn: 1 },
		{ term: 'how much does it cost', kind: 'question', seenIn: 2 },
		{ term: 'PA speakers', kind: 'entity', seenIn: 2 },
		{ term: 'mixing desk', kind: 'entity', seenIn: 2 }
	]
};

describe('isNlpTermsPath', () => {
	it('accepts only the dated task file under nlp-terms', () => {
		expect(isNlpTermsPath(PATH)).toBe(true);
		for (const bad of [
			'.agents/context/keywords/nlp-terms/2026-10-02.json',
			'.agents/context/keywords/faqs/2026-10-02-T0041.json',
			'.agents/context/keywords/nlp-terms/../x/2026-10-02-T0041.json',
			'/tmp/.agents/context/keywords/nlp-terms/2026-10-02-T0041.json',
			'.agents/context/keywords/nlp-terms/2026-10-02-T41.json'
		]) {
			expect(isNlpTermsPath(bad), bad).toBe(false);
		}
	});
});

describe('checkNlpTermsFile', () => {
	it('returns a compact summary with the most corroborated terms first', () => {
		const r = checkNlpTermsFile(PATH, JSON.stringify(file));
		expect(r.ok).toBe(true);
		if (!r.ok) return;
		expect(r.summary.taskId).toBe('#T0041');
		expect(r.summary.sources).toEqual(['https://example.com/1', 'https://example.com/2']);
		expect(r.summary.terms.map((t) => t.term)).toEqual([
			'mixing desk',
			'PA speakers',
			'how much does it cost',
			'wireless microphone'
		]);
	});

	it('fails on a path that is not the dated task file', () => {
		const r = checkNlpTermsFile('notes.json', JSON.stringify(file));
		expect(r.ok).toBe(false);
		if (!r.ok) expect(r.errors[0]).toMatch(/path/);
	});

	it('fails when the task id or date in the content differ from the file name', () => {
		const other = checkNlpTermsFile(PATH, JSON.stringify({ ...file, taskId: '#T0042' }));
		expect(other.ok).toBe(false);
		const old = checkNlpTermsFile(PATH, JSON.stringify({ ...file, date: '2026-10-01' }));
		expect(old.ok).toBe(false);
		if (!old.ok) expect(old.errors.join(' ')).toMatch(/date/);
	});

	it('fails on invalid JSON and on a schema violation, naming the field', () => {
		const bad = checkNlpTermsFile(PATH, '{ not json');
		expect(bad.ok).toBe(false);
		if (!bad.ok) expect(bad.errors[0]).toMatch(/JSON/);
		const schema = checkNlpTermsFile(
			PATH,
			JSON.stringify({ ...file, terms: [{ term: 'https://x.example', kind: 'related', seenIn: 1 }] })
		);
		expect(schema.ok).toBe(false);
		if (!schema.ok) expect(schema.errors.join(' ')).toMatch(/terms/);
	});

	it('a failed file is valid but the summary says there are no terms to use', () => {
		const failed = {
			...file,
			status: 'failed',
			reason: 'WebFetch denied',
			serp: { ...file.serp, results: [] },
			terms: []
		};
		const r = checkNlpTermsFile(PATH, JSON.stringify(failed));
		expect(r.ok).toBe(true);
		if (r.ok) {
			expect(r.summary.status).toBe('failed');
			expect(r.summary.terms).toEqual([]);
			expect(r.summary.reason).toBe('WebFetch denied');
		}
	});
});
