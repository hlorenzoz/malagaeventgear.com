/**
 * The structural words of ONE post body, for the rehype plugins and the FAQ/ToC parsers (Fase 4).
 *
 * The locale comes from the post path (`src/content/blog/<locale>/<en-slug>.svx`, English at the
 * root) and the words from the table vite.config.ts publishes on `globalThis.__megBlogStructure`
 * (scripts/blog-structure.ts, built from the `blogStructure` group of each messages file).
 * English ships with this module too (messages/en.ts), so English posts build exactly as before
 * in any tool. A TRANSLATED post without the table fails instead: it would otherwise get English
 * chrome and lose its FAQ accordion without a word.
 */
import en from '../src/lib/i18n/messages/en.ts';

const TRANSLATION = /\/content\/blog\/([^/]+)\/[^/]+\.svx$/;

/** English structural words (the default of the parsers). */
export const ENGLISH_STRUCTURE = en.blogStructure;

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
