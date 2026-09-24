import type { LocaleContentMap } from './content-map/schema';

/**
 * Pure routing between English route paths and localized paths. No I/O here: the content map
 * and what is published in each locale are passed in, so this is testable without a build.
 */

export interface Availability {
	/** Static pages and packages are published in this locale (they ship all at once). */
	pages: boolean;
	/** English slugs of the posts that have a published translation in this locale. */
	posts: ReadonlySet<string>;
	/** English category slugs that have at least one translated post in this locale. */
	categories: ReadonlySet<string>;
	/** Author slugs with at least one translated post in this locale. Not translated. */
	authors: ReadonlySet<string>;
}

const PACKAGE = /^\/packages\/([^/]+)\/$/;
const CATEGORY = /^\/blog\/category\/([^/]+)\/$/;
const AUTHOR = /^\/blog\/author\/([^/]+)\/$/;
const POST = /^\/blog\/([^/]+)\/$/;

/** Blog listing pages only exist in a locale that has translated posts. */
const BLOG_PAGES = new Set(['/blog/', '/blog/categories/']);

/**
 * Returns the unprefixed localized path for an English route path, or null when that content
 * is not published in the locale. A null result means: link to the English page instead.
 */
export function localizePath(enPath: string, map: LocaleContentMap, available: Availability): string | null {
	const page = map.pages[enPath];
	if (page) {
		if (BLOG_PAGES.has(enPath)) return available.posts.size > 0 ? page.path : null;
		return available.pages ? page.path : null;
	}

	const blog = map.pages['/blog/']?.path;
	const packages = map.pages['/packages/']?.path;

	let m = enPath.match(PACKAGE);
	if (m) {
		const pkg = map.packages[m[1]];
		return available.pages && pkg && packages ? `${packages}${pkg.slug}/` : null;
	}
	m = enPath.match(CATEGORY);
	if (m) {
		const cat = map.categories[m[1]];
		return available.categories.has(m[1]) && cat && blog ? `${blog}${map.segments.category}/${cat.slug}/` : null;
	}
	m = enPath.match(AUTHOR);
	if (m) {
		return available.authors.has(m[1]) && blog ? `${blog}${map.segments.author}/${m[1]}/` : null;
	}
	m = enPath.match(POST);
	if (m) {
		const post = map.posts[m[1]];
		return available.posts.has(m[1]) && post && blog ? `${blog}${post.slug}/` : null;
	}
	return null;
}

/**
 * English route path of the page being rendered, from its SvelteKit route id and params
 * (`/(public)/packages/[slug]` + `{ slug: 'eco' }` gives `/packages/eco/`). Null when there
 * is no route (404) or a param is missing.
 */
export function englishPathOf(routeId: string | null, params: Record<string, string>): string | null {
	if (!routeId) return null;
	let missing = false;
	const path = routeId
		.split('/')
		.filter((segment) => segment && !/^\(.+\)$/.test(segment))
		.map((segment) =>
			segment.replace(/\[\[?(?:\.\.\.)?([^\]=]+)(?:=[^\]]+)?\]\]?/g, (_, name: string) => {
				const value = params[name];
				if (value === undefined) missing = true;
				return value ?? '';
			})
		)
		.join('/');
	if (missing) return null;
	return path === '' ? '/' : `/${path}/`;
}

/** Every English route path the map knows about, for building the reverse table. */
export function knownEnglishPaths(map: LocaleContentMap, available: Availability): string[] {
	return [
		...Object.keys(map.pages),
		...Object.keys(map.packages).map((s) => `/packages/${s}/`),
		...Object.keys(map.categories).map((s) => `/blog/category/${s}/`),
		...[...available.authors].map((s) => `/blog/author/${s}/`),
		...Object.keys(map.posts).map((s) => `/blog/${s}/`)
	];
}

/** Reverse table: unprefixed localized path to English route path, published content only. */
export function buildRouteTable(map: LocaleContentMap, available: Availability): Map<string, string> {
	const table = new Map<string, string>();
	for (const enPath of knownEnglishPaths(map, available)) {
		const localized = localizePath(enPath, map, available);
		if (localized !== null) table.set(localized, enPath);
	}
	return table;
}
