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
 * Sorted names of the folders directly inside `dir`, [] when it does not exist.
 * @param {string} dir
 * @returns {string[]}
 */
export function listDirs(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { withFileTypes: true })
		.filter((e) => e.isDirectory())
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
	// Passing options turns off gray-matter's cache, which stores a file BEFORE parsing it: a YAML
	// error would throw once and then come back as empty frontmatter on the next read.
	const { data, content } = matter(readFileSync(path, 'utf8'), {});
	return { data: JSON.parse(JSON.stringify(data)), body: content };
}

const DATA_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/lib/data');

/**
 * FAQ pairs and ToC entries of every ENGLISH post, from the committed caches (post-faqs.json and
 * post-toc.json, kept fresh by scripts/post-faqs-toc-cache-freshness.test.ts). Served one small
 * chunk per post by `virtual:blog-extras/<slug>`, so only that post's page downloads them.
 * @returns {Record<string, { faqs?: { question: string, answer: string }[], toc?: { id: string, text: string, level: 2 | 3 }[] }>}
 */
export function readEnglishExtras() {
	const faqs = JSON.parse(readFileSync(resolve(DATA_DIR, 'post-faqs.json'), 'utf8'));
	const toc = JSON.parse(readFileSync(resolve(DATA_DIR, 'post-toc.json'), 'utf8'));
	/** @type {Record<string, any>} */
	const extras = {};
	for (const slug of new Set([...Object.keys(faqs), ...Object.keys(toc)])) {
		const entry = {};
		if (faqs[slug]?.length) entry.faqs = faqs[slug];
		if (toc[slug]?.length) entry.toc = toc[slug];
		if (entry.faqs || entry.toc) extras[slug] = entry;
	}
	return extras;
}

/**
 * FAQ pairs of a body, with the parser of the English cache (post-faqs.json).
 * @param {string} body
 * @param {Parameters<typeof parseFaqs>[1]} [words] structural words of the post's locale
 * @returns {{ question: string, answer: string }[]}
 */
export function extractFaqs(body, words) {
	return parseFaqs(body, words);
}

/**
 * ToC entries of a body, with the parser of the English cache (post-toc.json).
 * @param {string} body
 * @param {Parameters<typeof parseToc>[1]} [words] structural words of the post's locale
 * @returns {{ id: string, text: string, level: 2 | 3 }[]}
 */
export function extractToc(body, words) {
	return parseToc(body, words);
}
