/**
 * Build side of the blog: reads the .svx files on disk (Node only) and runs the SAME pure
 * pipeline the app runs (src/lib/data/blog-pipeline.ts). Used by:
 *   - scripts/vite-blog-meta.mjs: the `virtual:blog-*` modules (frontmatter, per locale
 *     translations, per locale availability) and the link tables of rehype-localize-links.
 *   - Playwright (tests/support/i18n.ts): which posts each locale publishes.
 *   - The guards and scripts/post-touch.ts: translation freshness.
 *
 * English posts are the root files (`src/content/blog/<slug>.svx`). A translation lives at
 * `src/content/blog/<locale>/<en-slug>.svx` (Fase 4, CLAUDE.md "Blog Content Authoring").
 */
import { BLOG_DIR, extractFaqs, extractToc, joinPath, listSvx, readPost } from './blog-files.mjs';
import {
	blogAvailabilityOf,
	buildLocalizedPosts,
	buildPostsFromGlob,
	type GlobResult,
	type TranslationGlob
} from '../src/lib/data/blog-pipeline';
import type { BlogPost } from '../src/lib/types/blog';
import { getAvailability, type BlogAvailability } from '../src/lib/i18n/availability';
import { CONTENT_MAPS } from '../src/lib/i18n/content-map/all';
import type { LocaleContentMap } from '../src/lib/i18n/content-map/schema';
import { encodePath, withLocale } from '../src/lib/i18n/locale-path';
import { PREFIXED_LOCALES, type Locale } from '../src/lib/i18n/locales';
import { knownEnglishPaths, localizePath } from '../src/lib/i18n/routing';

export { BLOG_DIR };

type Prefixed = (typeof PREFIXED_LOCALES)[number];

/** English posts, keyed like the lazy component glob in blog.ts (`../../content/blog/<file>`). */
export function readEnglishMeta(dir = BLOG_DIR): GlobResult {
	const map: GlobResult = {};
	for (const file of listSvx(dir)) {
		map[`../../content/blog/${file}`] = { metadata: readPost(joinPath(dir, file)).data };
	}
	return map;
}

/**
 * One locale's translations with the FAQ and ToC of each body, extracted with the parsers of
 * the English caches. Computed at build time from the body itself, so there is no committed
 * cache to go stale, and each locale ships as its own chunk.
 */
export function readTranslations(locale: Locale, dir = BLOG_DIR): TranslationGlob {
	const map: TranslationGlob = {};
	for (const file of listSvx(joinPath(dir, locale))) {
		const { data, body } = readPost(joinPath(dir, locale, file));
		map[`../../content/blog/${locale}/${file}`] = { metadata: data, faqs: extractFaqs(body), toc: extractToc(body) };
	}
	return map;
}

export interface LocaleBlogState {
	translations: TranslationGlob;
	posts: BlogPost[];
	availability: BlogAvailability;
}

export interface BlogState {
	english: BlogPost[];
	/** Only locales with at least one translation file. */
	locales: Partial<Record<Prefixed, LocaleBlogState>>;
}

export function computeBlogState({
	dir = BLOG_DIR,
	now = new Date(),
	maps = CONTENT_MAPS
}: { dir?: string; now?: Date; maps?: Partial<Record<Prefixed, LocaleContentMap>> } = {}): BlogState {
	const english = buildPostsFromGlob(readEnglishMeta(dir), now);
	const locales: BlogState['locales'] = {};
	for (const locale of PREFIXED_LOCALES) {
		const translations = readTranslations(locale, dir);
		if (Object.keys(translations).length === 0) continue;
		const posts = buildLocalizedPosts(locale, english, translations, maps[locale] ?? null, now);
		locales[locale] = { translations, posts, availability: blogAvailabilityOf(posts) };
	}
	return { english, locales };
}

/**
 * English route path to localized site path (percent encoded) for everything published in a
 * locale: pages, packages, and the blog content in `blog`. Built with `localizePath`, the one
 * routing implementation. Feeds rehype-localize-links at build time.
 */
export function localizedLinkTable(locale: Locale, map: LocaleContentMap, blog: BlogAvailability): Record<string, string> {
	const available = getAvailability(locale, blog);
	const table: Record<string, string> = {};
	for (const enPath of knownEnglishPaths(map, available)) {
		const localized = localizePath(enPath, map, available);
		if (localized !== null) table[enPath] = encodePath(withLocale(locale, localized));
	}
	return table;
}

/** Link tables of every locale, for the rehype plugin (see vite-blog-meta.mjs). */
export function localizedLinkTables(state: BlogState, maps = CONTENT_MAPS): Partial<Record<Prefixed, Record<string, string>>> {
	const tables: Partial<Record<Prefixed, Record<string, string>>> = {};
	for (const locale of PREFIXED_LOCALES) {
		const map = maps[locale];
		if (map) tables[locale] = localizedLinkTable(locale, map, state.locales[locale]?.availability ?? { posts: [], categories: [], authors: [] });
	}
	return tables;
}
