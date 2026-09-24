import { describe, expect, it } from 'vitest';
import { packages } from '$lib/data/packages';
import { STATIC_SITEMAP_PAGES, staticPageEnPath } from '$lib/utils/sitemap';
import { LOCALE_META, PREFIXED_LOCALES } from '../locales';
import { localeContentMapSchema, type LocaleContentMap } from './schema';

/**
 * Guard for the per locale content map (CLAUDE.md, "Idiomas soportados"): every locale maps
 * every page, package and category, with valid, unique slugs in the right script.
 * Posts are mapped per batch in Fase 4, so they are validated but not required here.
 */

const modules = import.meta.glob<LocaleContentMap>('./locales/*.ts', { eager: true, import: 'default' });
const maps = Object.fromEntries(
	Object.entries(modules).map(([path, map]) => [path.replace('./locales/', '').replace('.ts', ''), map])
) as Record<string, LocaleContentMap>;

/** Indexable pages (they need a keyword) plus the noindex pages a localized flow links to. */
const INDEXABLE_PAGES = STATIC_SITEMAP_PAGES.map(staticPageEnPath);
const NOINDEX_PAGES = ['/thank-you/'];

/** Blog category slugs (Fase 4 translates their posts, names and slugs are mapped up front). */
const CATEGORY_SLUGS = ['audio-visual-rental', 'corporate-enterprise', 'events', 'gadgets', 'news', 'weddings'];

const HAN = /\p{Script=Han}/u;

/**
 * Simplified and traditional forms of characters common in this site's vocabulary, index by
 * index. Not exhaustive: it catches the usual slip of writing simplified Chinese in a
 * traditional locale (or the reverse), not every possible one.
 */
const SIMPLIFIED = [...'关于们设备务会这个灯视频类队联页条隐规则场礼响业产发问题见谢录图计读说语价优馈报馆广东车运输装术师员团专庆摄览议讲厅乐声无线'];
const TRADITIONAL = [...'關於們設備務會這個燈視頻類隊聯頁條隱規則場禮響業產發問題見謝錄圖計讀說語價優饋報館廣東車運輸裝術師員團專慶攝覽議講廳樂聲無線'];
// Characters written the same in both forms would be false positives: keep only real pairs.
const SIMPLIFIED_ONLY = SIMPLIFIED.filter((ch) => !TRADITIONAL.includes(ch));
const TRADITIONAL_ONLY = TRADITIONAL.filter((ch) => !SIMPLIFIED.includes(ch));

function allSlugs(map: LocaleContentMap): string[] {
	return [
		...Object.values(map.pages).map((p) => p.path),
		map.segments.category,
		map.segments.author,
		...Object.values(map.packages).map((p) => p.slug),
		...Object.values(map.categories).map((c) => c.slug),
		...Object.values(map.posts).map((p) => p.slug)
	];
}

describe('content map', () => {
	it('has a map file for every prefixed locale and no other', () => {
		expect(Object.keys(maps).sort()).toEqual([...PREFIXED_LOCALES].sort());
	});

	for (const locale of PREFIXED_LOCALES) {
		describe(locale, () => {
			const map = maps[locale];
			if (!map) return;

			it('matches the schema', () => {
				expect(() => localeContentMapSchema.parse(map)).not.toThrow();
			});

			it('maps every indexable page with a keyword, and the noindex flow pages', () => {
				for (const page of INDEXABLE_PAGES) {
					expect(map.pages[page], `${locale} is missing ${page}`).toBeDefined();
					expect(map.pages[page]?.keyword, `${locale} ${page} has no keyword`).toBeTruthy();
				}
				for (const page of NOINDEX_PAGES) expect(map.pages[page], `${locale} is missing ${page}`).toBeDefined();
			});

			it('maps every package and every blog category', () => {
				for (const pkg of packages) expect(map.packages[pkg.slug], `${locale} is missing ${pkg.slug}`).toBeDefined();
				for (const cat of CATEGORY_SLUGS) expect(map.categories[cat], `${locale} is missing ${cat}`).toBeDefined();
			});

			it('keeps the home at the locale root and the blog under /blog/ prefix consistency', () => {
				expect(map.pages['/']?.path).toBe('/');
				expect(map.pages['/blog/categories/']?.path.startsWith(map.pages['/blog/']?.path ?? '')).toBe(true);
			});

			it('never gives two pages the same path', () => {
				const paths = Object.values(map.pages).map((p) => p.path);
				expect(new Set(paths).size).toBe(paths.length);
			});

			it('never gives two packages, categories or posts the same slug', () => {
				for (const group of [map.packages, map.categories, map.posts]) {
					const slugs = Object.values(group).map((e) => e.slug);
					expect(new Set(slugs).size).toBe(slugs.length);
				}
			});

			it('uses slugs in the right script', () => {
				const { script } = LOCALE_META[locale];
				for (const segment of allSlugs(map).flatMap((s) => s.split('/').filter(Boolean))) {
					if (script === 'latin') {
						expect(segment, `${locale}: "${segment}" must be lowercase ASCII`).toMatch(/^[a-z0-9-]+$/);
						continue;
					}
					expect(HAN.test(segment), `${locale}: "${segment}" must be written in Chinese`).toBe(true);
					// "cookie" is the one loanword Chinese writes in Latin letters (Cookie政策).
					expect(/[a-z]/i.test(segment.replace(/^cookie/, '')), `${locale}: "${segment}" mixes Latin letters`).toBe(false);
					const wrong = script === 'hans' ? TRADITIONAL_ONLY : SIMPLIFIED_ONLY;
					const hit = [...segment].find((ch) => wrong.includes(ch));
					expect(hit, `${locale}: "${segment}" uses the ${script === 'hans' ? 'traditional' : 'simplified'} form "${hit}"`).toBeUndefined();
				}
			});
		});
	}
});
