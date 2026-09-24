/**
 * Pure blog data pipeline — testable without import.meta.glob.
 *
 * blog.ts calls these functions with the actual glob result.
 * Tests call them directly with fixture data.
 */
// Relative imports on purpose: build tooling (scripts/blog-sources.ts, loaded by vite.config.ts
// and by Playwright) runs this same pipeline outside SvelteKit, where `$lib` does not resolve.
import { BlogPostSchema, TranslatedPostSchema } from '../types/blog';
import type { BlogPost, Category, Author } from '../types/blog';
import { slugify } from '../utils/slugify';
import type { BlogAvailability } from '../i18n/availability';
import type { LocaleContentMap } from '../i18n/content-map/schema';
import { encodePath, withLocale } from '../i18n/locale-path';
import { PREFIXED_LOCALES, type Locale } from '../i18n/locales';
import { localizePath } from '../i18n/routing';

// The shape of each module entry passed to buildPostsFromGlob.
// Only `metadata` (frontmatter) is required; the compiled component (`default`)
// is loaded lazily elsewhere and is intentionally NOT used here.
export interface GlobModule {
	metadata: unknown;
	default?: unknown;
}

export type GlobResult = Record<string, GlobModule>;

/**
 * Transforms a raw import.meta.glob result into a validated, filtered, sorted BlogPost[].
 *
 * - Validates each entry against BlogPostSchema (throws on invalid frontmatter — CI gate)
 * - Excludes draft posts
 * - Excludes posts with publishDate > buildDate (evaluated at call time)
 * - Sorts by publishDate descending
 * - Derives slug from filename key
 */
export function buildPostsFromGlob(glob: GlobResult, buildDate: Date = new Date()): BlogPost[] {
	const posts: BlogPost[] = [];

	for (const [path, module] of Object.entries(glob)) {
		// Derive slug from file path: /src/content/blog/my-post.svx → my-post
		const slug = path.split('/').pop()?.replace(/\.svx$/, '') ?? '';

		// Validate frontmatter — throws ZodError on invalid data (CI gate)
		const frontmatter = BlogPostSchema.parse(module.metadata);

		// Draft filter
		if (frontmatter.draft === true) continue;

		// Future-date filter
		const pubDate = new Date(frontmatter.publishDate);
		if (pubDate > buildDate) continue;

		// Derive isNews: true when any category's slug equals 'news'
		const isNews = frontmatter.categories.some((c) => slugify(c) === 'news');

		posts.push({
			...frontmatter,
			slug,
			// Canonical path, derived from the slug (single source of truth = the filename).
			url: `/blog/${slug}/`,
			isNews
		});
	}

	// Sort by publishDate descending
	posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

	return posts;
}

/**
 * Derives Category[] from a published posts list.
 * Categories are sorted alphabetically by name.
 */
export function getCategoriesFromPosts(posts: BlogPost[]): Category[] {
	const map = new Map<string, { name: string; posts: BlogPost[] }>();

	for (const post of posts) {
		for (const categoryName of post.categories) {
			const slug = slugify(categoryName);
			if (!map.has(slug)) {
				map.set(slug, { name: categoryName, posts: [] });
			}
			map.get(slug)!.posts.push(post);
		}
	}

	const categories: Category[] = [];
	for (const [slug, { name, posts: catPosts }] of map.entries()) {
		categories.push({
			name,
			slug,
			count: catPosts.length,
			lastmod: maxLastmod(catPosts)
		});
	}

	// Sort alphabetically by name
	categories.sort((a, b) => a.name.localeCompare(b.name));
	return categories;
}

/**
 * Returns published posts whose categories[] contains the given slug.
 * The category names in frontmatter are raw display names; we slugify before comparing.
 */
export function getPostsByCategoryFromPosts(posts: BlogPost[], categorySlug: string): BlogPost[] {
	return posts.filter((p) => p.categories.some((c) => slugify(c) === categorySlug));
}

/**
 * Derives Author[] from a published posts list.
 * Authors are sorted alphabetically by name.
 * The author field in frontmatter stores the display name slug (e.g. "hector-lorenzo").
 * For display purposes, the name is stored as-is; slugify is applied for URL derivation.
 */
export function getAuthorsFromPosts(posts: BlogPost[]): Author[] {
	const map = new Map<string, { name: string; posts: BlogPost[] }>();

	for (const post of posts) {
		const slug = slugify(post.author);
		if (!map.has(slug)) {
			map.set(slug, { name: post.author, posts: [] });
		}
		map.get(slug)!.posts.push(post);
	}

	const authors: Author[] = [];
	for (const [slug, { name, posts: authorPosts }] of map.entries()) {
		authors.push({
			name,
			slug,
			count: authorPosts.length,
			lastmod: maxLastmod(authorPosts)
		});
	}

	// Sort alphabetically by name
	authors.sort((a, b) => a.name.localeCompare(b.name));
	return authors;
}

/**
 * Returns published posts by the given author slug.
 */
export function getPostsByAuthorFromPosts(posts: BlogPost[], authorSlug: string): BlogPost[] {
	return posts.filter((p) => slugify(p.author) === authorSlug);
}

/**
 * Returns only news posts (isNews === true).
 * A post is "news" when any of its categories slugifies to 'news'.
 */
export function getNewsPosts(posts: BlogPost[]): BlogPost[] {
	return posts.filter((p) => p.isNews);
}

/**
 * Returns only non-news posts (isNews === false).
 * Complement of getNewsPosts — every published post is either news or an article.
 */
export function getArticlePosts(posts: BlogPost[]): BlogPost[] {
	return posts.filter((p) => !p.isNews);
}

/**
 * Returns the most recent date (updated ?? publishDate) across a list of posts,
 * formatted as YYYY-MM-DD.
 */
function maxLastmod(posts: BlogPost[]): string {
	let max = '';
	for (const post of posts) {
		const date = (post.updatedDate ?? post.publishDate).split('T')[0]; // strip time part if any
		if (!max || date > max) max = date;
	}
	return max;
}

// ─── Fase 4: translated posts ─────────────────────────────────────────────────

/**
 * A translation module: its frontmatter plus the FAQ and ToC extracted from ITS body at build
 * time (scripts/blog-sources.ts, with the same parsers as the English caches).
 */
export interface TranslationModule {
	metadata: unknown;
	faqs?: { question: string; answer: string }[];
	toc?: { id: string; text: string; level: 2 | 3 }[];
}

/** Translations keyed by file path, which ends with `/<locale>/<en-slug>.svx`. */
export type TranslationGlob = Record<string, TranslationModule>;

/** Locale and English slug of a translation path, or null for anything else. */
export function translationPathInfo(path: string): { locale: Locale; enSlug: string } | null {
	const m = path.match(/\/([^/]+)\/([^/]+)\.svx$/);
	if (!m) return null;
	const locale = PREFIXED_LOCALES.find((l) => l === m[1]);
	return locale ? { locale, enSlug: m[2] } : null;
}

const NO_BLOG_AVAILABILITY = { pages: true, posts: new Set<string>(), categories: new Set<string>(), authors: new Set<string>() };

/**
 * The published posts of one locale. A translation is published when its frontmatter
 * validates, it is not a draft, its `publishDate` has passed, its English post is published
 * (`englishPosts` is the output of buildPostsFromGlob) and the locale's content map has the
 * post (slug and keyword live there). The result is the English post (derived fields: cover,
 * categories, author, silo) with the translated fields on top. `slug` stays the ENGLISH slug,
 * the post identity everywhere, and `url` is the localized path, built by the one routing
 * implementation (`localizePath`). Sorted like English, newest first.
 */
export function buildLocalizedPosts(
	locale: Locale,
	englishPosts: BlogPost[],
	translations: TranslationGlob,
	map: LocaleContentMap | null,
	now: Date = new Date()
): BlogPost[] {
	if (!map) return [];
	const english = new Map(englishPosts.map((p) => [p.slug, p]));
	const posts: BlogPost[] = [];

	for (const [path, module] of Object.entries(translations)) {
		const info = translationPathInfo(path);
		if (!info || info.locale !== locale) continue;
		const source = english.get(info.enSlug);
		const entry = map.posts[info.enSlug];
		if (!source || !entry) continue;

		const parsed = TranslatedPostSchema.safeParse(module.metadata);
		if (!parsed.success) continue; // the guard (post-freshness.test.ts) reports it
		const fm = parsed.data;
		if (fm.draft) continue;
		if (new Date(fm.publishDate) > now) continue;

		const localized = localizePath(`/blog/${info.enSlug}/`, map, {
			...NO_BLOG_AVAILABILITY,
			posts: new Set([info.enSlug])
		});
		if (localized === null) continue;

		posts.push({
			...source,
			title: fm.title,
			description: fm.description,
			excerpt: fm.excerpt,
			publishDate: fm.publishDate,
			updatedDate: fm.updatedDate,
			sourceUpdated: fm.sourceUpdated,
			draft: false,
			keyword: entry.keyword,
			locale,
			url: encodePath(withLocale(locale, localized)),
			faqs: module.faqs && module.faqs.length > 0 ? module.faqs : undefined,
			toc: module.toc && module.toc.length > 0 ? module.toc : undefined
		});
	}

	posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
	return posts;
}

/**
 * Categories of a locale's published posts: the English slug stays the key (routing maps it),
 * the name is the locale's from the content map. Sorted by that name.
 */
export function getLocalizedCategoriesFromPosts(posts: BlogPost[], map: LocaleContentMap | null): Category[] {
	return getCategoriesFromPosts(posts)
		.map((c) => ({ ...c, name: map?.categories[c.slug]?.name ?? c.name }))
		.sort((a, b) => a.name.localeCompare(b.name));
}

/** What a locale's published posts make available to routing, as English identifiers. */
export function blogAvailabilityOf(posts: BlogPost[]): BlogAvailability {
	return {
		posts: posts.map((p) => p.slug),
		categories: getCategoriesFromPosts(posts).map((c) => c.slug).sort(),
		authors: getAuthorsFromPosts(posts).map((a) => a.slug).sort()
	};
}

/** YYYY-MM-DD of a post's last change: `updatedDate ?? publishDate`. */
export function lastChangeOf(post: { publishDate: string; updatedDate?: string }): string {
	return (post.updatedDate ?? post.publishDate).slice(0, 10);
}

/**
 * Published translations whose `sourceUpdated` is older than their English post's last
 * change, as `<locale>/<en-slug>` (CLAUDE.md, "Reglas mandatorias de idioma", rule 2).
 */
export function findStaleTranslations(localizedPosts: BlogPost[], englishPosts: BlogPost[]): string[] {
	const english = new Map(englishPosts.map((p) => [p.slug, p]));
	return localizedPosts
		.filter((p) => {
			const source = english.get(p.slug);
			return source && p.sourceUpdated !== undefined && p.sourceUpdated < lastChangeOf(source);
		})
		.map((p) => `${p.locale}/${p.slug}`);
}
