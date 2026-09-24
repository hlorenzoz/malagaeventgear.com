// @ts-nocheck
/**
 * File access of the blog build tooling (Node only), kept apart from scripts/blog-sources.ts so
 * that file typechecks with the app (svelte-check has no Node types, and this is the only part
 * that needs them). Same pattern as vite-blog-meta.mjs.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { parseFaqs } from './faq-parser.mjs';
import { parseToc } from './toc-parser.mjs';

/** @type {string} */
export const BLOG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/blog');

/**
 * Sorted `.svx` file names directly inside `dir` (never recursive), [] when it does not exist.
 * @param {string} dir
 * @returns {string[]}
 */
export function listSvx(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { withFileTypes: true })
		.filter((e) => e.isFile() && e.name.endsWith('.svx'))
		.map((e) => e.name)
		.sort();
}

/**
 * @param {...string} parts
 * @returns {string}
 */
export function joinPath(...parts) {
	return resolve(...parts);
}

/**
 * Frontmatter as the app sees it, and the body. gray-matter parses an unquoted YAML date to a
 * Date and the virtual module serializes it with JSON.stringify, so the app gets the ISO
 * string: the JSON round trip does the same here.
 * @param {string} path
 * @returns {{ data: unknown, body: string }}
 */
export function readPost(path) {
	const { data, content } = matter(readFileSync(path, 'utf8'));
	return { data: JSON.parse(JSON.stringify(data)), body: content };
}

/**
 * FAQ pairs of a body, with the parser of the English cache (post-faqs.json).
 * @param {string} body
 * @returns {{ question: string, answer: string }[]}
 */
export function extractFaqs(body) {
	return parseFaqs(body);
}

/**
 * ToC entries of a body, with the parser of the English cache (post-toc.json).
 * @param {string} body
 * @returns {{ id: string, text: string, level: 2 | 3 }[]}
 */
export function extractToc(body) {
	return parseToc(body);
}
