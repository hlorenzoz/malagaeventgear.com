import { describe, expect, it } from 'vitest';
import { packages } from '$lib/data/packages';
import { faqs } from '$lib/data/faq';
import { STATIC_SITEMAP_PAGES, getStaticPageFreshness } from '$lib/utils/sitemap';
import { PAGE_LOCALES } from './availability';
import { LOCALES } from './locales';
import type { DataCopy } from './data-copy';

/**
 * Guard: a locale whose pages are published (PAGE_LOCALES) has ALL of its copy. The render
 * falls back to English for a missing translation, which is fine while a locale is being
 * written but would put English text on a published German page (Google: one language per
 * page). This test keeps that fallback out of production. The fix for a failure is to
 * translate, never to remove the locale from the check.
 */

const dictionaries = import.meta.glob('./messages/*.ts');
const dataFiles = import.meta.glob<DataCopy>('./data/*.ts', { eager: true, import: 'default' });
/** Page copy files (`<route>/i18n/<locale>.ts`), keys only: which pages exist in which locale. */
const pageCopyFiles = Object.keys(import.meta.glob('/src/routes/**/i18n/*.ts'));

/** Every string leaf of a value, with its path, to compare shapes between languages. */
function leaves(value: unknown, path = ''): string[] {
	if (typeof value === 'string') return [path];
	if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`));
	if (value && typeof value === 'object')
		return Object.entries(value)
			.filter(([k]) => k !== 'updated') // the translation date is not copy
			.flatMap(([k, v]) => leaves(v, `${path}.${k}`));
	return [];
}

describe('published and in-progress locales are complete', () => {
	// Every published locale, plus every locale whose translation has started (it has a UI
	// dictionary): a half translated locale must never reach a commit.
	const started = LOCALES.filter((l) => l !== 'en' && dictionaries[`./messages/${l}.ts`]);
	const published = [...new Set([...PAGE_LOCALES.filter((l) => l !== 'en'), ...started])];

	it('lists English as published', () => {
		expect(PAGE_LOCALES).toContain('en');
	});

	for (const locale of published) {
		describe(locale, () => {
			const data = dataFiles[`./data/${locale}.ts`];

			it('has a UI dictionary and a data copy file', () => {
				expect(dictionaries[`./messages/${locale}.ts`], `messages/${locale}.ts is missing`).toBeDefined();
				expect(data, `data/${locale}.ts is missing`).toBeDefined();
			});

			it('translates every package, with the same shape as the English source', () => {
				for (const pkg of packages) {
					const copy = data?.packages[pkg.slug];
					expect(copy, `${pkg.slug} is not translated to ${locale}`).toBeDefined();
					const { specIcon, highlightIcon, ...landing } = pkg.landing;
					const english = { desc: pkg.desc, includes: pkg.includes, optional: pkg.optional, seo: { title: pkg.seo.title }, landing };
					expect(leaves(copy).sort(), `${pkg.slug} (${locale}) differs from the English shape`).toEqual(leaves(english).sort());
				}
			});

			it('translates every FAQ', () => {
				for (const faq of faqs) {
					const copy = data?.faqs[faq.id];
					expect(copy?.question, `${faq.id} question (${locale})`).toBeTruthy();
					expect(copy?.answer, `${faq.id} answer (${locale})`).toBeTruthy();
				}
			});

			it('translates every page that has page copy', () => {
				for (const en of pageCopyFiles.filter((f) => f.endsWith('/i18n/en.ts'))) {
					const translated = en.replace(/en\.ts$/, `${locale}.ts`);
					expect(pageCopyFiles, `${translated} is missing`).toContain(translated);
				}
			});

			it('dates every page and package translation (CLAUDE.md §11)', () => {
				const freshness = getStaticPageFreshness(locale);
				for (const page of STATIC_SITEMAP_PAGES) {
					if (page === 'blog' || page === 'blog/categories') continue; // published with posts (Fase 4)
					expect(freshness.get(page), `${page || '/'}: i18n/${locale}.ts has no updated date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
				}
				for (const pkg of packages) {
					expect(data?.packages[pkg.slug]?.updated, `data/${locale}.ts ${pkg.slug} has no updated date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
				}
			});
		});
	}
});

describe('data copy files', () => {
	for (const [path, data] of Object.entries(dataFiles)) {
		it(`${path} only uses the {packagesWithPrices} token for the package price list`, () => {
			for (const [id, faq] of Object.entries(data.faqs)) {
				expect(faq.answer, `${path} ${id} writes the price list by hand`).not.toMatch(/Eco Pack \(/);
			}
		});
	}
});
