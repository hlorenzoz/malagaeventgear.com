/**
 * rehype plugin (build-time): optimizes blog body <img> elements from the WP
 * migration manifest:
 *   - srcset + sizes: responsive variants (R2 already holds 300/768/1024/1536/full),
 *     so the browser downloads a size that matches the ~768px prose column instead of
 *     the full-size image (Improve image delivery / LCP).
 *   - src: a ~1024px fallback variant for non-srcset cases.
 *   - alt: WP attachment alt_text (fallback: decoded title). Fixes a11y warnings + SEO.
 *   - width/height: intrinsic dimensions → reserves space (CLS).
 *   - loading="lazy" + decoding="async": defer offscreen body images.
 *   - caption: when the manifest entry has a non-empty `caption`, wraps the <img>
 *     (inside its parent <p>) in a <figure> + <figcaption>.
 *   A translated post takes its alt and caption from its own markdown, never the manifest
 *   (see rehypeBlogImages).
 *
 * The manifest (scripts/migrate-wp/manifest.json) is read ONCE at build time in Node
 * and is NOT bundled into the client. Cover images on listing cards/hero are handled
 * separately (cover-thumbs.json); this only touches images inside post bodies.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { visit } from 'unist-util-visit';
import { PROSE_SIZES } from '../src/lib/utils/blog-image-sizes.js';
import { localeOfPostFile } from './blog-structure-words.mjs';

const NAMED = {
	amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#039': "'",
	hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘',
	ldquo: '“', rdquo: '”', nbsp: ' '
};

function decodeEntities(s) {
	if (!s) return '';
	return s
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
		.replace(/&([a-z0-9#]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);
}

const stripHtml = (s) => (s || '').replace(/<[^>]+>/g, '').trim();

// Strip any -WxH size suffix + extension → the canonical base used to group variants.
const baseOf = (url) => url.replace(/(-\d+x\d+)?\.[a-z0-9]+$/i, '');

// Measured prose column widths (see the module). Gallery items get their own, narrower
// sizes in rehype-image-gallery.mjs, which runs after this plugin.
const SIZES = PROSE_SIZES;
const FALLBACK_TARGET = 1024;

/**
 * Indexes the manifest by URL (alt, caption, dimensions) and by base (every rung of one
 * image). Each rung keeps its `avif` sibling URL when post-images.ts uploaded one: the AVIF
 * is stored as a field of the WebP entry, never as its own entry, so grouping by base never
 * mixes the two formats in one srcset.
 */
function buildIndex(manifest) {
	const byUrl = {};
	const byBase = new Map();
	for (const e of Object.values(manifest?.media ?? {})) {
		if (!e.r2Url) continue;
		byUrl[e.r2Url] = {
			alt: decodeEntities(e.alt) || decodeEntities(stripHtml(e.title)),
			caption: decodeEntities(stripHtml(e.caption || '')),
			width: e.width,
			height: e.height
		};
		const base = baseOf(e.r2Url);
		if (!byBase.has(base)) byBase.set(base, []);
		byBase.get(base).push({ url: e.r2Url, avif: e.avifUrl, width: e.width ?? 0, height: e.height ?? 0 });
	}
	for (const list of byBase.values()) list.sort((a, b) => a.width - b.width);
	return { byUrl, byBase };
}

let cache = null;
function loadIndex() {
	if (cache) return cache;
	let manifest = null;
	try {
		manifest = JSON.parse(readFileSync(resolve('scripts/migrate-wp/manifest.json'), 'utf8'));
	} catch {
		// Manifest absent (e.g. fresh checkout), the plugin becomes a no-op enricher.
	}
	cache = buildIndex(manifest);
	return cache;
}

/**
 * Wraps an enriched <img> in <picture> with an AVIF <source> listing the rungs that have an
 * AVIF sibling. The browser uses the first <source> whose type it supports and falls back to
 * the <img> (WebP srcset) otherwise: format negotiation in the browser, no JavaScript and no
 * user agent sniffing. Returns the <img> unchanged when no rung has an AVIF sibling.
 */
function withAvifSource(img, variants) {
	const avif = variants.filter((v) => v.avif);
	if (avif.length === 0) return img;
	return {
		type: 'element',
		tagName: 'picture',
		properties: {},
		children: [
			{
				type: 'element',
				tagName: 'source',
				properties: {
					type: 'image/avif',
					srcset: avif.map((v) => `${v.avif} ${v.width}w`).join(', '),
					sizes: img.properties.sizes
				},
				children: []
			},
			img
		]
	};
}

/**
 * `options.manifest` replaces the manifest file (tests).
 *
 * A TRANSLATED post (`src/content/blog/<locale>/<en-slug>.svx`, locale from the file path) never
 * gets the manifest's text, which is English: its alt is the markdown alt (`![alt](url)`, a
 * guard test requires it) and its figcaption the markdown title (`![alt](url "caption")`). The
 * responsive variants (srcset, AVIF, dimensions) are the same in every language.
 */
export function rehypeBlogImages(options = {}) {
	const { byUrl, byBase } = options.manifest ? buildIndex(options.manifest) : loadIndex();
	return (tree, file) => {
		const translated = localeOfPostFile(file?.filename ?? file?.path ?? '') !== 'en';
		// First pass: enrich <img> attributes and mark which need caption wrapping.
		// We use a custom walk to also handle the parent so we can replace <p><img></p>
		// with <figure><img><figcaption></figure>.

		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'img' || !node.properties) return;
			// Already inside a <picture> (this plugin wrapped it): never wrap it twice.
			if (parent?.type === 'element' && parent.tagName === 'picture') return;
			const src = node.properties.src;
			if (typeof src !== 'string') return;

			const meta = byUrl[src];
			// alt: ensure the attribute exists (empty = decorative → no a11y warning). Only an
			// English post falls back to the manifest alt.
			if (!node.properties.alt) node.properties.alt = (translated ? undefined : meta?.alt) ?? '';
			// Caption: the manifest's (English posts) or the markdown title (translated posts).
			let caption = meta?.caption;
			if (translated) {
				// A figure only for an image alone in its paragraph (whitespace aside): turning a
				// paragraph with text or other images into a figure would drop them. An inline
				// image keeps its title attribute instead, so the caption text is never lost.
				const alone =
					parent?.type === 'element' &&
					parent.tagName === 'p' &&
					parent.children.every((c) => c === node || (c.type === 'text' && !c.value?.trim()));
				const title = typeof node.properties.title === 'string' ? node.properties.title.trim() : '';
				caption = alone ? title : '';
				if (alone && title) delete node.properties.title;
			}
			node.properties.loading ??= 'lazy';
			node.properties.decoding ??= 'async';

			const variants = byBase.get(baseOf(src))?.filter((v) => v.width > 0);
			// The node that ends up in the tree: the <img>, or a <picture> wrapping it.
			let rendered = node;
			if (variants && variants.length > 1) {
				node.properties.srcset = variants.map((v) => `${v.url} ${v.width}w`).join(', ');
				node.properties.sizes ??= SIZES;
				// Fallback src: smallest variant ≥ target, else largest.
				const fallback =
					variants.find((v) => v.width >= FALLBACK_TARGET) ?? variants[variants.length - 1];
				node.properties.src = fallback.url;
				if (node.properties.width == null) node.properties.width = fallback.width;
				if (node.properties.height == null) node.properties.height = fallback.height;
				rendered = withAvifSource(node, variants);
			} else if (meta) {
				if (meta.width != null && node.properties.width == null) node.properties.width = meta.width;
				if (meta.height != null && node.properties.height == null)
					node.properties.height = meta.height;
			}

			// Caption wrapping: when there is a non-empty caption and the parent is a <p>, turn
			// that <p> into <figure>, holding the image and a <figcaption>. The <p> is mutated
			// in place because visit only hands us the parent, not the grandparent.
			if (caption && parent && parent.type === 'element' && parent.tagName === 'p' && index != null) {
				parent.tagName = 'figure';
				parent.properties = {};
				parent.children = [
					rendered,
					{
						type: 'element',
						tagName: 'figcaption',
						properties: {},
						children: [{ type: 'text', value: caption }]
					}
				];
				return;
			}

			if (rendered !== node && parent && index != null) parent.children[index] = rendered;
		});
	};
}
