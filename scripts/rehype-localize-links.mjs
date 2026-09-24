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
 * The tables are computed by scripts/vite-blog-meta.mjs with `localizePath` (the one routing
 * implementation) and shared on `globalThis.__megLocalizedLinks`, because svelte.config.js
 * loads this file without Vite and cannot import the TypeScript routing code. Without a table
 * (a tool that compiles .svx outside the Vite build) links are left as they are.
 */
import { visit } from 'unist-util-visit';

const SITE = /^https?:\/\/(?:www\.)?malagaeventgear\.com(?=\/|$)/i;
const TRANSLATION = /\/content\/blog\/([^/]+)\/[^/]+\.svx$/;

/** Localized href for an English internal href, or the href unchanged. Pure. */
export function localizeHref(href, table) {
	if (typeof href !== 'string' || !table) return href;
	const site = href.match(SITE);
	const local = site ? href.slice(site[0].length) || '/' : href;
	if (!local.startsWith('/') || local.startsWith('//')) return href;

	const cut = local.search(/[?#]/);
	const path = cut === -1 ? local : local.slice(0, cut);
	const suffix = cut === -1 ? '' : local.slice(cut);
	const localized = table[path] ?? (path.endsWith('/') ? undefined : table[`${path}/`]);
	return localized ? localized + suffix : href;
}

export function rehypeLocalizeLinks() {
	return (tree, file) => {
		const filename = file?.filename ?? file?.path ?? '';
		const locale = filename.replace(/\\/g, '/').match(TRANSLATION)?.[1];
		if (!locale) return;
		const table = globalThis.__megLocalizedLinks?.[locale];
		if (!table) return;
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a' || !node.properties) return;
			node.properties.href = localizeHref(node.properties.href, table);
		});
	};
}
