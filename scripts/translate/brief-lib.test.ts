import { describe, expect, it } from 'vitest';
import { assertSlug, buildBrief, fillPlaceholders, standardTail, todayUtc } from './brief-lib';

describe('todayUtc', () => {
	it('formats the UTC date, not the local one', () => {
		expect(todayUtc(new Date('2026-10-01T23:30:00Z'))).toBe('2026-10-01');
		expect(todayUtc(new Date('2026-10-02T00:00:00Z'))).toBe('2026-10-02');
	});
});

describe('assertSlug', () => {
	it('accepts a post slug', () => {
		expect(() => assertSlug('av-system-troubleshooting')).not.toThrow();
		expect(() => assertSlug('7-years-of-support')).not.toThrow();
	});
	it('rejects anything that could leave the special folder', () => {
		for (const bad of ['', '../x', 'a/b', 'A-b', 'a b', '.hidden']) {
			expect(() => assertSlug(bad), bad).toThrow(/slug/);
		}
	});
});

describe('fillPlaceholders', () => {
	it('replaces every {slug} and {today}', () => {
		const out = fillPlaceholders('a {slug} b {slug} c {today} d {today}', 'my-post', '2026-10-01');
		expect(out).toBe('a my-post b my-post c 2026-10-01 d 2026-10-01');
	});
	it('leaves other braces alone', () => {
		expect(fillPlaceholders('{vat} {price:x} {slug}', 's', 'd')).toBe('{vat} {price:x} s');
	});
});

describe('standardTail', () => {
	it('carries the structure guard, the repo etiquette and today', () => {
		const tail = standardTail('2026-10-01');
		expect(tail).toContain('Structure guard');
		expect(tail).toContain('blogStructure');
		expect(tail).toContain('do NOT touch CLAUDE.md');
		expect(tail).toContain('Today is 2026-10-01 UTC');
		expect(tail).toContain('publishDate` of every translation is "2026-10-01"');
	});
	it('is ASCII punctuation only', () => {
		expect(standardTail('2026-10-01')).not.toMatch(
			/[\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u00A0]|;/
		);
	});
});

describe('buildBrief', () => {
	const base = 'Post: {slug}\npublishDate: "{today}"\n';

	it('is the base with the placeholders filled and the tail, when there is no special file', () => {
		const out = buildBrief({ base, special: null, slug: 'p', today: '2026-10-01' });
		expect(out.startsWith('Post: p\npublishDate: "2026-10-01"\n')).toBe(true);
		expect(out).toContain('Structure guard');
		expect(out).not.toContain('SPECIAL FOR THIS POST');
	});

	it('puts the special facts between the base and the tail, with {slug} filled', () => {
		const special = '- SPECIAL FOR THIS POST (`{slug}`): facts\n';
		const out = buildBrief({ base, special, slug: 'p', today: '2026-10-01' });
		const iBase = out.indexOf('Post: p');
		const iSpecial = out.indexOf('- SPECIAL FOR THIS POST (`p`)');
		const iTail = out.indexOf('Structure guard');
		expect(iBase).toBe(0);
		expect(iSpecial).toBeGreaterThan(iBase);
		expect(iTail).toBeGreaterThan(iSpecial);
	});

	it('separates the blocks with exactly one newline and ends with one', () => {
		const out = buildBrief({
			base: 'base\n\n\n',
			special: 'special',
			slug: 'p',
			today: '2026-10-01'
		});
		expect(out).toMatch(/^base\nspecial\n- Structure guard/);
		expect(out.endsWith('\n')).toBe(true);
		expect(out.endsWith('\n\n')).toBe(false);
	});

	it('refuses a base that still has a special section (it is a per post file)', () => {
		expect(() =>
			buildBrief({
				base: 'x\n- SPECIAL FOR THIS POST (`a`): y',
				special: null,
				slug: 'p',
				today: '2026-10-01'
			})
		).toThrow(/SPECIAL/);
	});
});
