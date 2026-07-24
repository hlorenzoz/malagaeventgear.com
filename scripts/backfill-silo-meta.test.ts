/**
 * Unit tests para los helpers puros de backfill-silo-meta.ts.
 * Importar el modulo NO debe ejecutar main() (guardado con import.meta.main).
 */
import { describe, it, expect } from 'vitest';
import {
	parseCsvLine,
	slugFromUrl,
	translateTarget,
	resolveMeta,
	type SiloMeta
} from './backfill-silo-meta';

describe('parseCsvLine', () => {
	it('splits plain comma-separated fields', () => {
		expect(parseCsvLine('a,b,c')).toEqual(['a', 'b', 'c']);
	});

	it('keeps commas inside quoted fields', () => {
		expect(parseCsvLine('a,"b,c",d')).toEqual(['a', 'b,c', 'd']);
	});

	it('unescapes doubled quotes inside a quoted field', () => {
		expect(parseCsvLine('"he said ""hi""",x')).toEqual(['he said "hi"', 'x']);
	});
});

describe('slugFromUrl', () => {
	it('extracts the last path segment', () => {
		expect(slugFromUrl('https://malagaeventgear.com/audio-visual-rental/')).toBe(
			'audio-visual-rental'
		);
	});

	it('rejects #REF! spreadsheet errors', () => {
		expect(slugFromUrl('#REF!')).toBeNull();
	});

	it('rejects empty and non-slug garbage', () => {
		expect(slugFromUrl('')).toBeNull();
		expect(slugFromUrl('https://malagaeventgear.com/Keyword')).toBeNull(); // uppercase placeholder
	});
});

describe('translateTarget', () => {
	it('maps the homepage to /', () => {
		expect(translateTarget('https://malagaeventgear.com/')).toBe('/');
	});

	it('translates an old root pillar URL to /blog/<slug>/', () => {
		expect(translateTarget('https://malagaeventgear.com/audio-visual-rental/')).toBe(
			'/blog/audio-visual-rental/'
		);
	});

	it('falls back to / on a glitchy value', () => {
		expect(translateTarget('#REF!')).toBe('/');
	});
});

describe('resolveMeta', () => {
	const map = new Map<string, SiloMeta>([
		['audio-visual-rental', { keyword: 'audio visual rental', siloRole: 'pillar', targetPage: '/' }],
		[
			'sub-hub',
			{ keyword: 'sub hub', siloRole: 'both', targetPage: '/blog/audio-visual-rental/' }
		]
	]);

	it('returns the CSV meta when the slug is present', () => {
		expect(resolveMeta('audio-visual-rental', map).siloRole).toBe('pillar');
	});

	it('preserves a "both" role from the map (no NaN in the counts path)', () => {
		expect(resolveMeta('sub-hub', map).siloRole).toBe('both');
	});

	it('falls back to standalone with a de-hyphenated keyword when absent', () => {
		const meta = resolveMeta('news-some-event-in-malaga', map);
		expect(meta.siloRole).toBe('standalone');
		expect(meta.targetPage).toBe('');
		expect(meta.keyword).toBe('news some event in malaga');
	});
});
