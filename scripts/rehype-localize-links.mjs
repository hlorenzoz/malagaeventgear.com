/**
 * rehype plugin (build time): internal links of a TRANSLATED post point to the same content in
 * the post's language when it is published there (Fase 4).
 *
 * Translators keep every internal link in its ENGLISH form (`/blog/<en-slug>/`,
 * `/packages/eco/`, `/contact/`). This plugin reads the locale from the file path
 * (`src/content/blog/<locale>/<en-slug>.svx`) and rewrites each link with that locale's table
 * (English path to localized path). Content not published in the locale keeps its English URL,
 * so a link never points to a page that does not exist. English posts are never touched.
 *
 * A link to a SECTION of another post keeps the English fragment in the source
 * (`/blog/<en-slug>/#what-we-dont-offer`). When that post is published in the locale, its
 * headings have translated ids, so the fragment is mapped with the post's heading id table
 * (English h2/h3 id to translated id, aligned by position, scripts/heading-ids.ts). A fragment
 * the table does not know (structures that do not align, or not a heading) is kept as it is:
 * scripts/translated-post-anchors.test.ts fails the suite if it then misses the target page.
 *
 * The tables are computed by scripts/vite-blog-meta.mjs with `localizePath` (the one routing
 * implementation) and shared on `globalThis.__megLocalizedLinks` and
 * `globalThis.__megHeadingIds`, because svelte.config.js loads this file without Vite and
 * cannot import the TypeScript routing code. Without a table (a tool that compiles .svx outside
 * the Vite build) links are left as they are.
 */
import { visit } from 'unist-util-visit';

const SITE = /^https?:\/\/(?:www\.)?malagaeventgear\.com(?=\/|$)/i;
const TRANSLATION = /\/content\/blog\/([^/]+)\/[^/]+\.svx$/;

/**
 * Localized href for an English internal href, or the href unchanged. Pure.
 * @param {unknown} href
 * @param {Record<string, string> | undefined} table English path to localized path
 * @param {Record<string, Record<string, string>>} [headingIds] English post path to its
 *   English heading id to translated heading id, for the posts published in the locale
 */
export function localizeHref(href, table, headingIds) {
	if (typeof href !== 'string' || !table) return href;
	const site = href.match(SITE);
	const local = site ? href.slice(site[0].length) || '/' : href;
	if (!local.startsWith('/') || local.startsWith('//')) return href;

	const cut = local.search(/[?#]/);
	const path = cut === -1 ? local : local.slice(0, cut);
	const key = table[path] !== undefined || path.endsWith('/') ? path : `${path}/`;
	const localized = table[key];
	if (!localized) return href;

	const suffix = cut === -1 ? '' : local.slice(cut);
	const hash = suffix.indexOf('#');
	if (hash === -1) return localized + suffix;
	const fragment = suffix.slice(hash + 1);
	const ids = headingIds?.[key];
	const translated = ids && (ids[fragment] ?? ids[safeDecode(fragment)]);
	return localized + suffix.slice(0, hash + 1) + (translated ?? fragment);
}

/** @param {string} value */
function safeDecode(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

export function rehypeLocalizeLinks() {
	return (tree, file) => {
		const filename = file?.filename ?? file?.path ?? '';
		const locale = filename.replace(/\\/g, '/').match(TRANSLATION)?.[1];
		if (!locale) return;
		const table = globalThis.__megLocalizedLinks?.[locale];
		if (!table) return;
		const headingIds = globalThis.__megHeadingIds?.[locale];
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a' || !node.properties) return;
			node.properties.href = localizeHref(node.properties.href, table, headingIds);
		});
	};
}
