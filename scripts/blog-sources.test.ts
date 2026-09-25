/**
 * Build side of the multilingual blog (Fase 4): reading the translation folders and deriving
 * what each locale publishes. Runs on a temporary content folder, never on the real one.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { computeBlogState, localizedLinkTable, readTranslations } from './blog-sources';
import type { LocaleContentMap } from '../src/lib/i18n/content-map/schema';

const NOW = new Date('2026-09-24T12:00:00Z');
const dir = mkdtempSync(join(tmpdir(), 'meg-blog-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

function write(path: string, frontmatter: string, body = 'Body.\n') {
	mkdirSync(join(dir, path, '..'), { recursive: true });
	writeFileSync(join(dir, path), `---\n${frontmatter}\n---\n${body}`);
}

const englishFm = (title: string) => `title: "${title}"
description: "An English description long enough."
author: "Hector Luis Lorenzo"
publishDate: 2026-01-10
excerpt: "An English excerpt long enough."
coverImage: "https://cdn.malagaeventgear.com/blog/x.webp"
categories:
  - "Weddings"
siloRole: standalone`;

const deFm = (extra = '') => `title: "Titel"
description: "Eine Beschreibung, lang genug."
excerpt: "Ein Auszug, lang genug."
publishDate: "2026-09-01"
sourceUpdated: "2026-01-10"${extra ? `\n${extra}` : ''}`;

write('a.svx', englishFm('A'));
write('b.svx', englishFm('B'));
write('de/a.svx', deFm(), '## Einleitung\n\nText.\n\n## Häufige Fragen\n\n### Frage eins?\n\nAntwort eins.\n');
write('de/b.svx', deFm('draft: true'));
mkdirSync(join(dir, 'fr'), { recursive: true }); // empty locale folder

const map: LocaleContentMap = {
	pages: {
		'/': { path: '/' },
		'/blog/': { path: '/blog/', keyword: 'blog', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/kategorien/', keyword: 'k', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'kontakt', status: 'propuesta' },
		'/packages/': { path: '/pakete/', keyword: 'pakete', status: 'propuesta' }
	},
	segments: { category: 'kategorie', author: 'autor' },
	packages: { eco: { slug: 'eco', keyword: 'eco', status: 'propuesta' } },
	categories: { weddings: { slug: 'hochzeiten', name: 'Hochzeiten' } },
	posts: {
		a: { slug: 'a-de', keyword: 'kw a', status: 'propuesta' },
		b: { slug: 'b-de', keyword: 'kw b', status: 'propuesta' }
	}
};

describe('readTranslations', () => {
	it('reads one locale folder with the frontmatter, FAQ and ToC of each body, by its own FAQ heading', () => {
		const de = readTranslations('de', dir);
		const a = de['../../content/blog/de/a.svx'];
		expect(a.metadata).toMatchObject({ title: 'Titel', sourceUpdated: '2026-01-10' });
		expect(a.faqs).toEqual([{ question: 'Frage eins?', answer: 'Antwort eins.' }]);
		expect(a.toc?.map((t) => t.text)).toEqual(['Einleitung', 'Häufige Fragen', 'Frage eins?']);
		expect(Object.keys(de)).toHaveLength(2);
	});

	it('returns nothing for a locale without a folder', () => {
		expect(readTranslations('it', dir)).toEqual({});
	});
});

describe('computeBlogState', () => {
	const state = computeBlogState({ dir, now: NOW, maps: { de: map } });

	it('publishes the English posts as today', () => {
		expect(state.english.map((p) => p.slug).sort()).toEqual(['a', 'b']);
	});

	it('publishes, per locale, only the valid, non draft, mapped translations', () => {
		expect(state.locales.de?.posts.map((p) => p.url)).toEqual(['/de/blog/a-de/']);
		expect(state.locales.de?.availability).toEqual({ posts: ['a'], categories: ['weddings'], authors: ['hector-luis-lorenzo'] });
	});

	it('leaves out locales with no translation files', () => {
		expect(state.locales.fr).toBeUndefined();
		expect(state.locales.it).toBeUndefined();
	});
});

describe('localizedLinkTable', () => {
	const table = localizedLinkTable('de', map, { posts: ['a'], categories: ['weddings'], authors: ['hector-luis-lorenzo'] });

	it('maps every published English path to its localized site path', () => {
		expect(table['/contact/']).toBe('/de/kontakt/');
		expect(table['/packages/eco/']).toBe('/de/pakete/eco/');
		expect(table['/blog/a/']).toBe('/de/blog/a-de/');
		expect(table['/blog/']).toBe('/de/blog/');
		expect(table['/blog/category/weddings/']).toBe('/de/blog/kategorie/hochzeiten/');
		expect(table['/blog/author/hector-luis-lorenzo/']).toBe('/de/blog/autor/hector-luis-lorenzo/');
	});

	it('leaves out what is not published in the locale', () => {
		expect(table['/blog/b/']).toBeUndefined();
	});

	it('has no blog listing paths while the locale has no posts', () => {
		const empty = localizedLinkTable('de', map, { posts: [], categories: [], authors: [] });
		expect(empty['/blog/']).toBeUndefined();
		expect(empty['/contact/']).toBe('/de/kontakt/');
	});
});

describe('computeBlogState fails the build on a malformed post, naming the file', () => {
	function fixture(files: Record<string, string>): string {
		const root = mkdtempSync(join(tmpdir(), 'meg-blog-bad-'));
		for (const [path, content] of Object.entries(files)) {
			mkdirSync(join(root, path, '..'), { recursive: true });
			writeFileSync(join(root, path), content);
		}
		return root;
	}
	const post = (fm: string) => `---\n${fm}\n---\nBody.\n`;

	it('an invalid translation (one bad file must not silently drop a locale)', () => {
		const root = fixture({ 'a.svx': post(englishFm('A')), 'de/a.svx': post(`${deFm()}\ncoverImage: "https://x.test/a.webp"`) });
		expect(() => computeBlogState({ dir: root, now: NOW, maps: { de: map } })).toThrow(/de\/a: invalid frontmatter/);
		rmSync(root, { recursive: true, force: true });
	});

	it('a translation without an English post, or missing from the content map', () => {
		const root = fixture({ 'a.svx': post(englishFm('A')), 'de/zzz.svx': post(deFm()) });
		expect(() => computeBlogState({ dir: root, now: NOW, maps: { de: map } })).toThrow(/de\/zzz: there is no English post/);
		const unmapped = fixture({ 'a.svx': post(englishFm('A')), 'de/a.svx': post(deFm()) });
		expect(() => computeBlogState({ dir: unmapped, now: NOW, maps: { de: { ...map, posts: {} } } })).toThrow(/de\/a: missing from content-map/);
		rmSync(root, { recursive: true, force: true });
		rmSync(unmapped, { recursive: true, force: true });
	});

	it('a folder that is not a site locale', () => {
		const root = fixture({ 'a.svx': post(englishFm('A')), 'es/a.svx': post(deFm()) });
		expect(() => computeBlogState({ dir: root, now: NOW, maps: { de: map } })).toThrow(/es is not a prefixed site locale/);
		rmSync(root, { recursive: true, force: true });
	});

	it('an invalid English post', () => {
		const root = fixture({ 'a.svx': post(englishFm('A').replace(/description: .*/, 'description: "short"')) });
		expect(() => computeBlogState({ dir: root, now: NOW, maps: { de: map } })).toThrow(/src\/content\/blog\/a\.svx: invalid frontmatter/);
		rmSync(root, { recursive: true, force: true });
	});

	it('accepts an unquoted YAML sourceUpdated', () => {
		const root = fixture({ 'a.svx': post(englishFm('A')), 'de/a.svx': post(deFm().replace('sourceUpdated: "2026-01-10"', 'sourceUpdated: 2026-01-10')) });
		expect(computeBlogState({ dir: root, now: NOW, maps: { de: map } }).locales.de?.posts[0].sourceUpdated).toBe('2026-01-10');
		rmSync(root, { recursive: true, force: true });
	});
});

describe('computeBlogState with onProblems (dev and preview: report and skip only the bad file)', () => {
	function fixture(files: Record<string, string>): string {
		const root = mkdtempSync(join(tmpdir(), 'meg-blog-dev-'));
		for (const [path, content] of Object.entries(files)) {
			mkdirSync(join(root, path, '..'), { recursive: true });
			writeFileSync(join(root, path), content);
		}
		return root;
	}
	const post = (fm: string) => `---\n${fm}\n---\nBody.\n`;

	it('reports a malformed translation (a draft too) and keeps publishing the rest', () => {
		const root = fixture({
			'a.svx': post(englishFm('A')),
			'b.svx': post(englishFm('B')),
			'de/a.svx': post(deFm()),
			'de/b.svx': post(`${deFm('draft: true')}\ncoverImage: "https://x.test/a.webp"`)
		});
		const problems: string[] = [];
		const state = computeBlogState({ dir: root, now: NOW, maps: { de: map }, onProblems: (p) => problems.push(...p) });
		expect(problems).toHaveLength(1);
		expect(problems[0]).toMatch(/^de\/b: invalid frontmatter/);
		expect(state.locales.de?.posts.map((p) => p.slug)).toEqual(['a']);
		expect(Object.keys(state.locales.de?.translations ?? {})).toEqual(['../../content/blog/de/a.svx']);
		rmSync(root, { recursive: true, force: true });
	});

	it('reports a malformed English post and leaves it out of the English metadata', () => {
		const root = fixture({ 'a.svx': post(englishFm('A')), 'b.svx': post(englishFm('B').replace(/description: .*/, 'description: "short"')) });
		const problems: string[] = [];
		const state = computeBlogState({ dir: root, now: NOW, maps: { de: map }, onProblems: (p) => problems.push(...p) });
		expect(problems).toEqual([expect.stringMatching(/src\/content\/blog\/b\.svx: invalid frontmatter/)]);
		expect(state.english.map((p) => p.slug)).toEqual(['a']);
		expect(Object.keys(state.englishMeta)).toEqual(['../../content/blog/a.svx']);
		rmSync(root, { recursive: true, force: true });
	});
});
