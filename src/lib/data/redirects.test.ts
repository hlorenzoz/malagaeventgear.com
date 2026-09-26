import { describe, expect, it } from 'vitest';
import { packages } from '$lib/data/packages';
import { STATIC_SITEMAP_PAGES } from '$lib/utils/sitemap';
import { slugify } from '$lib/utils/slugify';
import { buildPostsFromGlob } from './blog-pipeline';
import { englishGlob } from './blog-files.testutil';

/**
 * Guard: every 301 in _redirects lands on a page that exists. A redirect to a missing page is
 * worse than a plain 404: Google follows the hop and still finds nothing. It happened with the
 * WordPress categories "expirience" and "useful", redirected to blog categories that no post
 * uses (found in the GSC "Page with redirect" review, 2026-09-26). _redirects is read with
 * import.meta.glob, never node:fs (CLAUDE.md, tests that read project files).
 */

const raw = Object.values(
	import.meta.glob('/_redirects', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
)[0];

const rules = raw
	.split('\n')
	.map((line) => line.trim())
	.filter((line) => line && !line.startsWith('#'))
	.map((line) => {
		const [from, to, status] = line.split(/\s+/);
		return { from, to, status };
	});

const posts = buildPostsFromGlob(englishGlob, new Date());
const postPaths = new Set(posts.map((post) => `/blog/${post.slug}/`));
const categoryPaths = new Set(posts.flatMap((post) => post.categories.map((name) => `/blog/category/${slugify(name)}/`)));
const authorPaths = new Set(posts.map((post) => `/blog/author/${slugify(post.author)}/`));
const packagePaths = new Set(packages.map((pkg) => pkg.route));
const pagePaths = new Set(STATIC_SITEMAP_PAGES.map((page) => (page ? `/${page}/` : '/')));

function exists(path: string): boolean {
	return [postPaths, categoryPaths, authorPaths, packagePaths, pagePaths].some((set) => set.has(path));
}

describe('_redirects', () => {
	it('has rules to check', () => {
		expect(rules.length).toBeGreaterThan(100);
	});

	it('only uses permanent redirects', () => {
		for (const rule of rules) expect(rule.status, `${rule.from} -> ${rule.to}`).toBe('301');
	});

	it('sends every rule to a page that exists', () => {
		const broken = rules.filter((rule) => !exists(rule.to)).map((rule) => `${rule.from} -> ${rule.to}`);
		expect(broken, 'these redirects end in a 404').toEqual([]);
	});

	it('never redirects a URL to itself', () => {
		for (const rule of rules) expect(rule.to, rule.from).not.toBe(rule.from);
	});
});
