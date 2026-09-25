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
import { BLOG_DIR, extractFaqs, extractToc, joinPath, listDirs, listSvx, readPost } from './blog-files.mjs';
import { malformedTranslationFiles } from '../src/lib/data/translation-audit.ts';
import { BlogPostSchema } from '../src/lib/types/blog.ts';
import { BLOG_STRUCTURE } from './blog-structure.ts';
import {
	zodIssues,
	blogAvailabilityOf,
	buildLocalizedPosts,
	buildPostsFromGlob,
	type GlobResult,
	type TranslationGlob
} from '../src/lib/data/blog-pipeline.ts';
import type { BlogPost } from '../src/lib/types/blog.ts';
import { getAvailability, type BlogAvailability } from '../src/lib/i18n/availability.ts';
import { CONTENT_MAPS } from '../src/lib/i18n/content-map/all.ts';
import type { LocaleContentMap } from '../src/lib/i18n/content-map/schema.ts';
import { encodePath, withLocale } from '../src/lib/i18n/locale-path.ts';
import { PREFIXED_LOCALES, type Locale } from '../src/lib/i18n/locales.ts';
import { knownEnglishPaths, localizePath } from '../src/lib/i18n/routing.ts';

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
 * the English caches and the locale's structural words (its FAQ heading, its table of contents
 * and testimonials headings: messages, `blogStructure`). Computed at build time from the body
 * itself, so there is no committed cache to go stale. The frontmatter ships as one chunk per
 * locale and each post's FAQ and ToC as its own chunk (scripts/vite-blog-meta.mjs).
 */
export function readTranslations(locale: Locale, dir = BLOG_DIR): TranslationGlob {
	const map: TranslationGlob = {};
	const words = BLOG_STRUCTURE[locale];
	for (const file of listSvx(joinPath(dir, locale))) {
		const { data, body } = readPost(joinPath(dir, locale, file));
		map[`../../content/blog/${locale}/${file}`] = { metadata: data, faqs: extractFaqs(body, words), toc: extractToc(body, words) };
	}
	return map;
}

/** Frontmatter only of the posts in a folder that is not a locale (to report them). */
function readFrontmatter(folder: string, dir: string): TranslationGlob {
	const map: TranslationGlob = {};
	for (const file of listSvx(joinPath(dir, folder))) {
		map[`../../content/blog/${folder}/${file}`] = { metadata: readPost(joinPath(dir, folder, file)).data };
	}
	return map;
}

export interface LocaleBlogState {
	translations: TranslationGlob;
	posts: BlogPost[];
	availability: BlogAvailability;
}

export interface BlogState {
	/** The English frontmatter the app reads (`virtual:blog-meta`), valid files only. */
	englishMeta: GlobResult;
	english: BlogPost[];
	/** Only locales with at least one (valid) translation file. */
	locales: Partial<Record<Prefixed, LocaleBlogState>>;
}

/**
 * The blog as the build publishes it.
 *
 * Without `onProblems` (the build) it THROWS on any malformed post, English or translated, with
 * one line per file: the Cloudflare build runs `bun run build`, not the test suite, so a broken
 * file must stop the build instead of silently dropping a post or a locale's blog.
 * With `onProblems` (`vite dev`, `vite preview`) it reports the same lines there and leaves out
 * ONLY the bad files, so one broken draft never stops the dev server.
 * A stale translation is not malformed: the test suite guards it (post-freshness.test.ts).
 */
export function computeBlogState({
	dir = BLOG_DIR,
	now = new Date(),
	maps = CONTENT_MAPS,
	onProblems
}: {
	dir?: string;
	now?: Date;
	maps?: Partial<Record<Prefixed, LocaleContentMap>>;
	onProblems?: (problems: string[]) => void;
} = {}): BlogState {
	const problems: string[] = [];
	const allEnglish = readEnglishMeta(dir);
	const englishMeta: GlobResult = {};
	for (const [path, module] of Object.entries(allEnglish)) {
		const parsed = BlogPostSchema.safeParse(module.metadata);
		if (parsed.success) englishMeta[path] = module;
		else problems.push(`src/content/blog/${path.split('/').pop()}: invalid frontmatter (${zodIssues(parsed.error)})`);
	}

	// Every folder, not only the locale ones, so a translation in a wrong folder is reported.
	const all: TranslationGlob = {};
	for (const folder of listDirs(dir)) {
		const known = (PREFIXED_LOCALES as readonly string[]).includes(folder);
		Object.assign(all, known ? readTranslations(folder as Locale, dir) : readFrontmatter(folder, dir));
	}
	const malformed = malformedTranslationFiles(allEnglish, all, maps);
	problems.push(...malformed.map((m) => m.problem));
	if (problems.length > 0) {
		if (!onProblems) {
			throw new Error(`Malformed blog posts (fix each file):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
		}
		onProblems(problems);
		for (const { path } of malformed) delete all[path];
	}

	const english = buildPostsFromGlob(englishMeta, now);
	const locales: BlogState['locales'] = {};
	for (const locale of PREFIXED_LOCALES) {
		const prefix = `../../content/blog/${locale}/`;
		const translations = Object.fromEntries(Object.entries(all).filter(([path]) => path.startsWith(prefix)));
		if (Object.keys(translations).length === 0) continue;
		const posts = buildLocalizedPosts(locale, english, translations, maps[locale] ?? null, now);
		locales[locale] = { translations, posts, availability: blogAvailabilityOf(posts) };
	}
	return { englishMeta, english, locales };
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
