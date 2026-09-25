/**
 * Structure of a post body in its locale's words (Fase 4): how many FAQ entries, overview
 * sections and highlights sections the build will recognize. A published translation must keep
 * its English post's structure (guarded by post-structure.test.ts), so a heading written with a
 * word the build does not know never silently drops the FAQ accordion and its FAQPage data.
 */
import { isStructuralHeading } from './blog-structure-words.mjs';
import { parseFaqs } from './faq-parser.mjs';

/**
 * @typedef {{ faqHeadings: readonly string[], overviewHeadings: readonly string[], highlightsHeadings: readonly string[] }} Words
 */

/**
 * @param {string} body raw markdown body (after frontmatter)
 * @param {Words} words structural words of the post's locale
 * @returns {{ faqs: number, overview: number, highlights: number }}
 */
export function postStructure(body, words) {
	const h2 = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
	return {
		faqs: parseFaqs(body, words).length,
		overview: h2.filter((t) => isStructuralHeading(t, words.overviewHeadings)).length,
		highlights: h2.filter((t) => isStructuralHeading(t, words.highlightsHeadings)).length
	};
}

/**
 * Differences between an English post and its translation, one line each, empty when equal.
 * @param {string} englishBody
 * @param {Words} englishWords
 * @param {string} translatedBody
 * @param {Words} translatedWords
 * @returns {string[]}
 */
export function structureMismatches(englishBody, englishWords, translatedBody, translatedWords) {
	const en = postStructure(englishBody, englishWords);
	const tr = postStructure(translatedBody, translatedWords);
	return /** @type {const} */ (['faqs', 'overview', 'highlights'])
		.filter((k) => en[k] !== tr[k])
		.map((k) => `${k}: ${tr[k]} in the translation, ${en[k]} in English`);
}
