/**
 * The structural words of ONE post body, for the rehype plugins and the FAQ/ToC parsers (Fase 4).
 *
 * The locale comes from the post path (`src/content/blog/<locale>/<en-slug>.svx`, English at the
 * root) and the words from the table vite.config.ts publishes on `globalThis.__megBlogStructure`
 * for EVERY locale, English included (scripts/blog-structure.ts, built from the `blogStructure`
 * group of each messages file, the single source).
 *
 * This module is reached from svelte.config.js, which Node loads without Vite: it must never
 * import a `.ts` file (guarded by svelte-config-imports.test.ts). So when the table is absent
 * (a tool that compiles .svx outside the Vite build, the English caches generators) English
 * falls back to the copy below, kept equal to messages/en.ts by blog-structure.test.ts. A
 * TRANSLATED post without the table fails instead: it would otherwise get English chrome and
 * lose its FAQ accordion without a word.
 */

const TRANSLATION = /\/content\/blog\/([^/]+)\/[^/]+\.svx$/;

/**
 * English structural words when the table is absent (the default of the parsers). A copy of
 * `blogStructure` in src/lib/i18n/messages/en.ts, never edited alone.
 */
export const ENGLISH_STRUCTURE = Object.freeze({
	faqHeadings: ['FAQs', 'FAQ'],
	overviewHeadings: ['Brief Overview'],
	highlightsHeadings: ['Key Highlights', 'Key Highlight'],
	testimonialsHeadings: ['Testimonials', 'Testimonial'],
	tocHeadings: ['Table of Contents'],
	inThisArticle: 'In this article',
	tocAria: 'Table of contents',
	faqAria: 'Frequently asked questions'
});

/**
 * Locale folder of a post path, or 'en' for an English root post.
 * @param {string} filename
 * @returns {string}
 */
export function localeOfPostFile(filename) {
	return filename.replace(/\\/g, '/').match(TRANSLATION)?.[1] ?? 'en';
}

/**
 * Structural words of the post a rehype plugin is transforming (its vfile).
 * @param {{ filename?: string, path?: string } | undefined} file
 * @returns {typeof ENGLISH_STRUCTURE}
 */
export function blogStructureOf(file) {
	const locale = localeOfPostFile(file?.filename ?? file?.path ?? '');
	/** @type {Record<string, typeof ENGLISH_STRUCTURE> | undefined} */
	const table = /** @type {any} */ (globalThis).__megBlogStructure;
	const words = table?.[locale];
	if (words) return words;
	if (locale === 'en') return ENGLISH_STRUCTURE;
	throw new Error(
		`No blog structure words for "${locale}" (${file?.filename}). vite.config.ts publishes them from src/lib/i18n/messages/<locale>.ts (blogStructure).`
	);
}

/**
 * True when a heading text is one of the words, compared case insensitively and trimmed.
 * @param {string} text
 * @param {readonly string[]} words
 * @returns {boolean}
 */
export function isStructuralHeading(text, words) {
	const t = text.trim().toLowerCase();
	return words.some((w) => w.toLowerCase() === t);
}
