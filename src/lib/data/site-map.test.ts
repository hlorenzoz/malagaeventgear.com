/**
 * Tests de site-map.ts.
 *
 * (1) Dientes del reverse silo: todos los posts reales (.svx) declaran metadata válida.
 *     Reemplaza al viejo guard de scripts/site-graph — la validación sobrevive, la
 *     comparación byte-a-byte del artefacto committeado ya no (el mapa deriva en vivo en /map).
 * (2) View-model determinista y bien formado a partir de fixtures sintéticos.
 */
import { describe, it, expect } from 'vitest';
import matter from 'gray-matter';
import type { BlogPost, Category, Author } from '$lib/types/blog';
import type { EventPackage } from '$lib/data/packages';
import { validateSiloGraph, buildSiteMap, extractBlogLinks, findStronglyConnectedComponents } from './site-map';

// Contenido real leído con import.meta.glob (?raw) — no node:fs (AGENTS.md §3). No podemos
// importar $lib/data/blog en un unit test: arrastra el módulo virtual `virtual:blog-meta`.
const rawPosts = import.meta.glob('../../content/blog/*.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const FIXTURES = new Set(['draft-post-test-fixture', 'future-post-test-fixture']);

/**
 * BlogPost mínimos (campos de silo + url + blogLinks) desde el frontmatter y cuerpo real de
 * cada .svx. `blogLinks` alimenta el chequeo de ciclos de interlinking lateral dentro de
 * `validateSiloGraph` (ver `extractBlogLinks`).
 */
function realPosts(): (BlogPost & { blogLinks: string[] })[] {
	const s = (v: unknown) => (v == null ? undefined : String(v));
	return Object.entries(rawPosts)
		.map(([path, src]) => ({ slug: path.split('/').pop()!.replace(/\.svx$/, ''), src }))
		.filter(({ slug }) => !FIXTURES.has(slug))
		.map(({ slug, src }) => {
			const parsed = matter(src);
			const fm = parsed.data as Record<string, unknown>;
			return {
				slug,
				url: `/blog/${slug}/`,
				siloRole: s(fm.siloRole),
				targetPage: s(fm.targetPage),
				keyword: s(fm.keyword),
				blogLinks: extractBlogLinks(parsed.content, slug)
			} as BlogPost & { blogLinks: string[] };
		});
}

describe('validateSiloGraph', () => {
	it('every non-fixture post declares valid reverse silo metadata, and has no NEW interlinking cycles', () => {
		// Reemplaza al viejo guard de scripts/site-graph: los dientes de validación sobreviven;
		// la comparación byte-a-byte del artefacto committeado ya no aplica (el mapa deriva en vivo).
		// La deuda preexistente de interlinking en malla (ver silo-cycle-debt.ts) ya está
		// filtrada dentro de validateSiloGraph - este assert solo falla ante un ciclo NUEVO.
		expect(validateSiloGraph(realPosts())).toEqual([]);
	});

	it('flags a supporting post that points at the homepage instead of a pillar', () => {
		const posts = [
			{ slug: 'p', url: '/blog/p/', siloRole: 'supporting', targetPage: '/' }
		] as BlogPost[];
		expect(validateSiloGraph(posts)[0]).toContain('apunta al home');
	});

	it('flags a targetPage that resolves to no node', () => {
		const posts = [
			{ slug: 'p', url: '/blog/p/', siloRole: 'supporting', targetPage: '/blog/ghost/' }
		] as BlogPost[];
		expect(validateSiloGraph(posts)[0]).toContain('no resuelve');
	});

	it('flags a news post that does not target the homepage', () => {
		const posts = [
			{ slug: 'p', url: '/blog/p/', siloRole: 'news', targetPage: '/blog/audio-visual-rental/' }
		] as BlogPost[];
		expect(validateSiloGraph(posts)[0]).toContain('debe apuntar al home');
	});

	it('accepts a news post targeting the homepage', () => {
		const posts = [{ slug: 'p', url: '/blog/p/', siloRole: 'news', targetPage: '/' }] as BlogPost[];
		expect(validateSiloGraph(posts)).toEqual([]);
	});

	it('flags a cycle in the sibling interlinking graph', () => {
		const posts = [
			{ slug: 'a', url: '/blog/a/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['b'] },
			{ slug: 'b', url: '/blog/b/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['c'] },
			{ slug: 'c', url: '/blog/c/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['a'] },
			{ slug: 'pillar', url: '/blog/pillar/', siloRole: 'pillar', targetPage: '/', blogLinks: [] }
		] as (BlogPost & { blogLinks: string[] })[];
		const errors = validateSiloGraph(posts);
		expect(errors.some((e) => e.includes('ciclo de interlinking'))).toBe(true);
	});

	it('accepts a chain (no cycle) in the sibling interlinking graph', () => {
		const posts = [
			{ slug: 'a', url: '/blog/a/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['b'] },
			{ slug: 'b', url: '/blog/b/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: [] },
			{ slug: 'pillar', url: '/blog/pillar/', siloRole: 'pillar', targetPage: '/', blogLinks: [] }
		] as (BlogPost & { blogLinks: string[] })[];
		expect(validateSiloGraph(posts)).toEqual([]);
	});

	it('does NOT flag a reciprocal 2-node edge between adjacent siblings (that IS the expected chain)', () => {
		const posts = [
			{ slug: 'a', url: '/blog/a/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['b'] },
			{ slug: 'b', url: '/blog/b/', siloRole: 'supporting', targetPage: '/blog/pillar/', blogLinks: ['a'] },
			{ slug: 'pillar', url: '/blog/pillar/', siloRole: 'pillar', targetPage: '/', blogLinks: [] }
		] as (BlogPost & { blogLinks: string[] })[];
		expect(validateSiloGraph(posts)).toEqual([]);
	});
});

describe('extractBlogLinks', () => {
	it('extracts internal blog post links, deduplicated, excluding self-references', () => {
		const body = `See [Sibling A](/blog/sibling-a/) and again [Sibling A](/blog/sibling-a/). Also [Self](/blog/self/) and [Sibling B](/blog/sibling-b/).`;
		expect(extractBlogLinks(body, 'self')).toEqual(['sibling-a', 'sibling-b']);
	});

	it('does not match category or author archive links', () => {
		const body = `[Category](/blog/category/wedding/) and [Author](/blog/author/hector/).`;
		expect(extractBlogLinks(body, 'x')).toEqual([]);
	});
});

describe('findStronglyConnectedComponents', () => {
	it('finds a simple 3-node cycle as one component', () => {
		const graph = new Map([
			['a', ['b']],
			['b', ['c']],
			['c', ['a']]
		]);
		const components = findStronglyConnectedComponents(graph).filter((c) => c.length > 1);
		expect(components.length).toBe(1);
		expect(new Set(components[0])).toEqual(new Set(['a', 'b', 'c']));
	});

	it('finds no multi-node components in a DAG', () => {
		const graph = new Map([
			['a', ['b', 'c']],
			['b', ['c']],
			['c', []]
		]);
		const components = findStronglyConnectedComponents(graph).filter((c) => c.length > 1);
		expect(components).toEqual([]);
	});

	it('reports a 2-node reciprocal edge as its own component too (pure graph theory - validateSiloGraph decides what to do with size-2)', () => {
		const graph = new Map([
			['a', ['b']],
			['b', ['a']]
		]);
		const components = findStronglyConnectedComponents(graph).filter((c) => c.length > 1);
		expect(components.length).toBe(1);
		expect(new Set(components[0])).toEqual(new Set(['a', 'b']));
	});

	it('collapses a densely meshed cluster into ONE component, not many overlapping simple-cycle paths', () => {
		// Este es el caso real que motivó preferir SCC sobre enumerar ciclos simples: un DFS
		// ingenuo sobre un cluster así reporta docenas de "ciclos" distintos (un camino por
		// cada orden de recorrido posible), pero es siempre el mismo grupo de nodos.
		const graph = new Map([
			['a', ['b', 'c']],
			['b', ['c', 'd']],
			['c', ['d', 'a']],
			['d', ['a', 'b']]
		]);
		const components = findStronglyConnectedComponents(graph).filter((c) => c.length > 1);
		expect(components.length).toBe(1);
		expect(new Set(components[0])).toEqual(new Set(['a', 'b', 'c', 'd']));
	});
});

// --- Fixtures sintéticos para el view-model --------------------------------

function post(slug: string, siloRole: string, targetPage?: string, keyword?: string, dates?: { publishDate?: string; updatedDate?: string }): BlogPost {
	return {
		slug,
		url: `/blog/${slug}/`,
		siloRole,
		targetPage,
		keyword: keyword ?? slug,
		publishDate: dates?.publishDate ?? '2026-07-20',
		updatedDate: dates?.updatedDate
	} as BlogPost;
}

const FIXTURE_INPUT = {
	posts: [
		post('av-rental', 'pillar', '/', 'audio visual rental', { publishDate: '2026-07-01', updatedDate: '2026-07-25' }),
		post('av-conferences', 'supporting', '/blog/av-rental/', 'av for conferences', { publishDate: '2026-07-22' }),
		post('news-item', 'news', '/', undefined, { publishDate: '2026-07-24' }),
		post('corporate-item', 'standalone', undefined, undefined, { publishDate: '2026-07-15' })
	],
	packages: [
		{ name: 'Eco Pack', route: '/packages/eco/', price: 290, updated: '2026-05-31' },
		{ name: 'Wedding Pack', route: '/packages/wedding/', price: 650, updated: '2026-05-31' }
	] as EventPackage[],
	categories: [{ name: 'Weddings', slug: 'weddings', count: 3, lastmod: '2026-07-25' }] as Category[],
	authors: [{ name: 'Hector Lorenzo', slug: 'hector-lorenzo', count: 5, lastmod: '2026-07-25' }] as Author[],
	staticPages: ['', 'about-us', 'contact', 'privacy-policy', 'sitemap', 'packages', 'blog'] as const,
	pageFreshness: new Map([
		['', '2026-01-01'],
		['about-us', '2026-02-02']
	])
};

describe('buildSiteMap', () => {
	it('groups static pages into core / legal / utility (hubs excluded)', () => {
		const v = buildSiteMap(FIXTURE_INPUT);
		expect(v.corePages.map((p) => p.url)).toEqual(['/', '/about-us/', '/contact/']);
		expect(v.legalPages.map((p) => p.url)).toEqual(['/privacy-policy/']);
		expect(v.utilityPages.map((p) => p.url)).toEqual(['/sitemap/']);
	});

	it('funnels supporting posts under their pillar and separates news from standalone', () => {
		const v = buildSiteMap(FIXTURE_INPUT);
		expect(v.counts.pillars).toBe(1);
		expect(v.counts.supporting).toBe(1);
		expect(v.counts.news).toBe(1);
		expect(v.counts.standalone).toBe(1);
		expect(v.silos[0].kids.map((k) => k.url)).toEqual(['/blog/av-conferences/']);
		expect(v.news.map((s) => s.url)).toEqual(['/blog/news-item/']);
		expect(v.standalone.map((s) => s.url)).toEqual(['/blog/corporate-item/']);
	});

	it('includes packages, categories and authors in the model', () => {
		const v = buildSiteMap(FIXTURE_INPUT);
		expect(v.packages.map((p) => p.url)).toEqual(['/packages/eco/', '/packages/wedding/']);
		expect(v.categories[0].url).toBe('/blog/category/weddings/');
		expect(v.categories[0].updated).toBe('2026-07-25');
		expect(v.authors[0].url).toBe('/blog/author/hector-lorenzo/');
		expect(v.authors[0].updated).toBe('2026-07-25');
	});

	it('carries `updated` (updatedDate) and `publishDate` on posts', () => {
		const v = buildSiteMap(FIXTURE_INPUT);
		expect(v.corePages.find((p) => p.url === '/')?.updated).toBe('2026-01-01');
		expect(v.corePages.find((p) => p.url === '/about-us/')?.updated).toBe('2026-02-02');
		expect(v.corePages.find((p) => p.url === '/contact/')?.updated).toBeUndefined();
		expect(v.packages.find((p) => p.url === '/packages/eco/')?.updated).toBe('2026-05-31');
		expect(v.silos[0].updated).toBe('2026-07-25'); // updatedDate
		expect(v.silos[0].kids[0].updated).toBeUndefined(); // no updatedDate -> undefined (renders — never)
		expect(v.silos[0].kids[0].publishDate).toBe('2026-07-22'); // carried for IndexNow eligibility
	});

	it('defaults pageFreshness to empty when omitted, leaving pages without `updated`', () => {
		const { pageFreshness: _omit, ...withoutFreshness } = FIXTURE_INPUT;
		const v = buildSiteMap(withoutFreshness);
		expect(v.corePages.every((p) => p.updated === undefined)).toBe(true);
	});

	it('emits a mermaid mindmap with root, pillar, a package and the blog branch', () => {
		const { mermaid } = buildSiteMap(FIXTURE_INPUT);
		expect(mermaid).toMatch(/^mindmap\n/);
		expect(mermaid).toContain('root((MEG · malagaeventgear.com))');
		expect(mermaid).toContain('audio visual rental · pillar');
		expect(mermaid).toContain('Eco Pack');
		expect(mermaid).toContain('Blog');
	});

	it('neutralises parentheses in node labels so mindmap shape syntax is not triggered', () => {
		const input = {
			...FIXTURE_INPUT,
			posts: [post('p', 'standalone', undefined, 'gear (av) rental')]
		};
		const { mermaid } = buildSiteMap(input);
		expect(mermaid).toContain('gear ·av· rental');
		expect(mermaid).not.toContain('gear (av) rental');
	});

	it('is deterministic (pure function of its inputs)', () => {
		expect(buildSiteMap(FIXTURE_INPUT).mermaid).toBe(buildSiteMap(FIXTURE_INPUT).mermaid);
	});
});
