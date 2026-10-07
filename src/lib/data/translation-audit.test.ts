import { describe, expect, it } from 'vitest';
import { auditTranslations, malformedTranslations, missingTranslations } from './translation-audit';
import { PREFIXED_LOCALES } from '$lib/i18n/locales';
import type { GlobResult, TranslationGlob } from './blog-pipeline';
import type { LocaleContentMap } from '$lib/i18n/content-map/schema';

const NOW = new Date('2026-09-24T12:00:00Z');

const english: GlobResult = {
	'../../content/blog/a.svx': {
		metadata: {
			title: 'A',
			description: 'An English description long enough.',
			author: 'Hector Luis Lorenzo',
			publishDate: '2026-01-10',
			updatedDate: '2026-05-01',
			excerpt: 'An English excerpt long enough.',
			coverImage: 'https://cdn.malagaeventgear.com/blog/a.webp',
			categories: ['Weddings']
		}
	}
};

const map: LocaleContentMap = {
	pages: { '/blog/': { path: '/blog/', keyword: 'blog', status: 'propuesta' } },
	segments: { category: 'kategorie', author: 'autor' },
	packages: {},
	categories: {},
	posts: { a: { slug: 'a-de', keyword: 'kw', status: 'propuesta' } }
};

const fm = (extra: Record<string, unknown> = {}) => ({
	metadata: {
		title: 'Titel',
		description: 'Eine Beschreibung, lang genug.',
		excerpt: 'Ein Auszug, lang genug.',
		publishDate: '2026-09-01',
		sourceUpdated: '2026-05-01',
		...extra
	}
});

const audit = (translations: TranslationGlob, maps: Record<string, LocaleContentMap> = { de: map }) =>
	auditTranslations(english, translations, maps, NOW);

describe('auditTranslations', () => {
	it('passes a fresh, valid, mapped translation', () => {
		expect(audit({ '../../content/blog/de/a.svx': fm() })).toEqual([]);
	});

	it('flags a published translation older than its English post, as <locale>/<slug>', () => {
		expect(audit({ '../../content/blog/de/a.svx': fm({ sourceUpdated: '2026-01-10' }) })).toEqual([
			'de/a: stale, it translates the English of 2026-01-10 but the English post changed on 2026-05-01 (update it and its sourceUpdated)'
		]);
	});

	it('flags invalid frontmatter, drafts included', () => {
		const [problem] = audit({ '../../content/blog/de/a.svx': fm({ draft: true, coverImage: 'https://x.test/a.webp' }) });
		expect(problem).toMatch(/^de\/a: invalid frontmatter/);
	});

	it('flags a translation without an English post', () => {
		expect(audit({ '../../content/blog/de/gone.svx': fm() })).toEqual(['de/gone: there is no English post src/content/blog/gone.svx']);
	});

	it('flags a non draft translation missing from the content map (it would never publish)', () => {
		expect(audit({ '../../content/blog/de/a.svx': fm() }, { de: { ...map, posts: {} } })).toEqual([
			'de/a: missing from content-map/locales/de.ts posts (slug and keyword)'
		]);
		expect(audit({ '../../content/blog/de/a.svx': fm({ draft: true }) }, { de: { ...map, posts: {} } })).toEqual([]);
	});

	it('flags a folder that is not a site locale', () => {
		expect(audit({ '../../content/blog/es/a.svx': fm() })).toEqual([
			'../../content/blog/es/a.svx: es is not a prefixed site locale (src/lib/i18n/locales.ts)'
		]);
	});
});

describe('malformedTranslations (what fails the build)', () => {
	const malformed = (translations: TranslationGlob, maps: Record<string, LocaleContentMap> = { de: map }) =>
		malformedTranslations(english, translations, maps);

	it('reports invalid frontmatter, a missing English post and a missing content map entry', () => {
		expect(
			malformed({
				'../../content/blog/de/a.svx': fm({ coverImage: 'https://x.test/a.webp' }),
				'../../content/blog/de/gone.svx': fm()
			})
		).toEqual([
			"de/a: invalid frontmatter ((root) Unrecognized key(s) in object: 'coverImage')",
			'de/gone: there is no English post src/content/blog/gone.svx'
		]);
		expect(malformed({ '../../content/blog/de/a.svx': fm() }, { de: { ...map, posts: {} } })).toHaveLength(1);
	});

	it('does not fail the build for a stale translation (the test suite guards that)', () => {
		expect(malformed({ '../../content/blog/de/a.svx': fm({ sourceUpdated: '2026-01-10' }) })).toEqual([]);
	});
});

describe('missingTranslations (a published English post is published in every locale)', () => {
	const maps = { de: map, fr: { ...map, posts: { a: { slug: 'a-fr', keyword: 'kw', status: 'propuesta' as const } } } };

	it('lists every locale that does not publish a published English post', () => {
		const missing = missingTranslations(english, { '../../content/blog/de/a.svx': fm() }, maps, NOW);
		expect(missing).toContain('fr/a: not published (no translation, a draft, a future publishDate or no content map entry)');
		expect(missing.some((m) => m.startsWith('de/a:'))).toBe(false);
		expect(missing).toHaveLength(PREFIXED_LOCALES.length - 1);
	});

	it('counts a draft, a future or an unmapped translation as missing', () => {
		const t = {
			'../../content/blog/de/a.svx': fm({ draft: true }),
			'../../content/blog/fr/a.svx': fm({ publishDate: '2026-12-01' })
		};
		const missing = missingTranslations(english, t, maps, NOW);
		expect(missing.some((m) => m.startsWith('de/a:'))).toBe(true);
		expect(missing.some((m) => m.startsWith('fr/a:'))).toBe(true);
	});

	it('is empty when every locale publishes it', () => {
		const t: TranslationGlob = {};
		const all: Record<string, LocaleContentMap> = {};
		for (const locale of PREFIXED_LOCALES) {
			t[`../../content/blog/${locale}/a.svx`] = fm();
			all[locale] = map;
		}
		expect(missingTranslations(english, t, all, NOW)).toEqual([]);
	});

	it('does not ask for a translation of an English draft or future post', () => {
		const base = english['../../content/blog/a.svx'].metadata as Record<string, unknown>;
		const draft: GlobResult = { '../../content/blog/a.svx': { metadata: { ...base, draft: true } } };
		expect(missingTranslations(draft, {}, {}, NOW)).toEqual([]);
		const future: GlobResult = { '../../content/blog/a.svx': { metadata: { ...base, publishDate: '2026-12-01', updatedDate: undefined } } };
		expect(missingTranslations(future, {}, {}, NOW)).toEqual([]);
	});
});
