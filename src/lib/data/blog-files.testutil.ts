/**
 * The REAL blog files for unit guards, read with import.meta.glob (?raw), never node:fs
 * (CLAUDE.md §3), and parsed like the build does (gray-matter, then a JSON round trip so an
 * unquoted YAML date becomes the same ISO string the app sees). Test code only.
 */
import matter from 'gray-matter';
import { CONTENT_MAPS } from '$lib/i18n/content-map/all';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n/locales';
import { buildLocalizedPosts, buildPostsFromGlob, type GlobResult, type TranslationGlob } from './blog-pipeline';
import type { BlogPost } from '$lib/types/blog';

const englishRaw = import.meta.glob('/src/content/blog/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const translatedRaw = import.meta.glob('/src/content/blog/*/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const data = (raw: string) => JSON.parse(JSON.stringify(matter(raw).data)) as unknown;
const key = (path: string) => path.replace(/^\/src\//, '../../');

export const englishGlob: GlobResult = Object.fromEntries(
	Object.entries(englishRaw).map(([path, raw]) => [key(path), { metadata: data(raw) }])
);

/** Frontmatter only: FAQ and ToC do not matter to the guards. */
export const translationGlob: TranslationGlob = Object.fromEntries(
	Object.entries(translatedRaw).map(([path, raw]) => [key(path), { metadata: data(raw) }])
);

/** Published posts per locale, with the same pipeline and publish rules as the build. */
export function publishedPostsByLocale(now = new Date()): Partial<Record<Locale, BlogPost[]>> {
	const english = buildPostsFromGlob(englishGlob, now);
	const result: Partial<Record<Locale, BlogPost[]>> = {};
	for (const locale of PREFIXED_LOCALES) {
		const posts = buildLocalizedPosts(locale, english, translationGlob, CONTENT_MAPS[locale], now);
		if (posts.length > 0) result[locale] = posts;
	}
	return result;
}
