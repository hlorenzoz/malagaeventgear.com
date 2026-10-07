import { describe, expect, it } from 'vitest';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { guardProblems, formatGuardFailure, parseFrontmatter } from './commit-guard';

const english = (extra = '') =>
	`---\ntitle: "A"\npublishDate: "2026-10-01"\n${extra}draft: false\n---\n\nBody\n`;

const translation = (extra = '') =>
	`---\ntitle: "T"\npublishDate: "2026-10-07"\nsourceUpdated: "2026-10-01"\n${extra}---\n\nBody\n`;

/** An index with the English post and `locales` translations of it. */
function index(files: Record<string, string>) {
	return (path: string) => files[path] ?? null;
}

const EN = 'src/content/blog/a.svx';
const tr = (locale: string) => `src/content/blog/${locale}/a.svx`;
const allTranslations = Object.fromEntries(PREFIXED_LOCALES.map((l) => [tr(l), translation()]));

describe('guardProblems (a commit that touches a published English post)', () => {
	it('passes when all 12 translations are in the index and fresh', () => {
		const read = index({ [EN]: english(), ...allTranslations });
		expect(guardProblems([EN], read)).toEqual([]);
	});

	it('flags every locale whose translation is not in the index', () => {
		const files: Record<string, string> = { [EN]: english(), ...allTranslations };
		delete files[tr('de')];
		delete files[tr('zh-hk')];
		expect(guardProblems([EN], index(files))).toEqual([
			'de/a: no translation in the commit',
			'zh-hk/a: no translation in the commit'
		]);
	});

	it('flags a translation older than the English post (updatedDate beats publishDate)', () => {
		const read = index({ [EN]: english('updatedDate: "2026-10-05"\n'), ...allTranslations });
		const problems = guardProblems([EN], read);
		expect(problems).toHaveLength(12);
		expect(problems[0]).toBe(
			`${PREFIXED_LOCALES[0]}/a: stale, it translates the English of 2026-10-01 but the English post changed on 2026-10-05`
		);
	});

	it('accepts a translation whose sourceUpdated matches the last English change', () => {
		const files = Object.fromEntries(PREFIXED_LOCALES.map((l) => [tr(l), translation().replace('2026-10-01', '2026-10-05')]));
		expect(guardProblems([EN], index({ [EN]: english('updatedDate: "2026-10-05"\n'), ...files }))).toEqual([]);
	});

	it('flags a draft translation, it would never publish', () => {
		const files: Record<string, string> = { [EN]: english(), ...allTranslations, [tr('fr')]: translation('draft: true\n') };
		expect(guardProblems([EN], index(files))).toEqual(['fr/a: the translation is still a draft']);
	});

	it('lets a draft English post through (post-new creates one before any translation)', () => {
		const draft = english().replace('draft: false', 'draft: true');
		expect(guardProblems([EN], index({ [EN]: draft }))).toEqual([]);
	});

	it('reads unquoted YAML dates too', () => {
		const files = Object.fromEntries(
			PREFIXED_LOCALES.map((l) => [tr(l), '---\ntitle: "T"\nsourceUpdated: 2026-10-01\n---\n'])
		);
		const en = '---\ntitle: "A"\npublishDate: 2026-10-01\n---\n';
		expect(guardProblems([EN], index({ [EN]: en, ...files }))).toEqual([]);
	});

	it('ignores files that are not an English post (translations, other content)', () => {
		expect(guardProblems([tr('de'), 'src/lib/x.ts', 'src/content/blog/de/'], index({}))).toEqual([]);
	});

	it('reports an unreadable English post instead of passing it', () => {
		expect(guardProblems([EN], index({ [EN]: 'no frontmatter at all' }))).toEqual([
			'a: the English post has no readable frontmatter (publishDate)'
		]);
	});
});

describe('parseFrontmatter', () => {
	it('returns null without frontmatter', () => {
		expect(parseFrontmatter('hello')).toBeNull();
	});
});

describe('formatGuardFailure', () => {
	it('names the rule and the fix', () => {
		const text = formatGuardFailure(['de/a: no translation in the commit']);
		expect(text).toContain('de/a: no translation in the commit');
		expect(text).toContain('12');
		expect(text).toContain('just post-translate-finish');
	});
});
