/**
 * site-map.ts — Modelo de datos del mapa COMPLETO del sitio (para la ruta /map).
 *
 * Función pura y determinista: recibe posts, paquetes, categorías y autores (todo derivado
 * del contenido) y produce (a) la validación del reverse silo del blog y (b) el view-model
 * que consume /map/+page.svelte, incluido el diagrama Mermaid del árbol completo.
 *
 * Reemplaza al viejo artefacto `.agents/site-structure-map.md`: ya no hay archivo generado
 * ni guard de staleness — /map deriva en vivo desde el frontmatter (fuente única de verdad:
 * `keyword` / `siloRole` / `targetPage` en cada post, más el catálogo de paquetes).
 */

import type { BlogPost, Category, Author } from '$lib/types/blog';
import type { EventPackage } from '$lib/data/packages';

export const SILO_ROLES = ['pillar', 'supporting', 'both', 'standalone'] as const;
export type SiloRole = (typeof SILO_ROLES)[number];

/** Etiquetas legibles para las páginas estáticas (clave = ruta sin barras, '' = home). */
const PAGE_LABELS: Record<string, string> = {
	'': 'Home',
	'about-us': 'About Us',
	'meet-the-team': 'Meet the Team',
	'equipment': 'Equipment',
	'contact': 'Contact',
	'faq': 'FAQ',
	'privacy-policy': 'Privacy Policy',
	'terms-of-service': 'Terms of Service',
	'gdpr': 'GDPR',
	'cookie-policy': 'Cookie Policy',
	'sitemap': 'Sitemap',
	'blog/categories': 'Blog Categories',
	'packages': 'Packages',
	'blog': 'Blog'
};

// Rutas que son "hubs" (secciones con hijos propios): no se listan como páginas sueltas.
const HUB_PAGES = new Set(['packages', 'blog', 'blog/categories']);
const LEGAL_PAGES = new Set(['privacy-policy', 'terms-of-service', 'gdpr', 'cookie-policy']);
const UTILITY_PAGES = new Set(['sitemap']);

function pageLabel(route: string): string {
	return PAGE_LABELS[route] ?? route;
}
function pageUrl(route: string): string {
	return route === '' ? '/' : `/${route}/`;
}

// --- Tipos del view-model --------------------------------------------------

export interface PageNode {
	label: string;
	url: string;
}
export interface PackageNode {
	name: string;
	url: string;
	price: number;
}
export interface SiloChild {
	key: string;
	url: string;
	updated?: string;
}
export interface SiloNode {
	key: string;
	url: string;
	updated?: string;
	kids: SiloChild[];
}
export interface TaxonomyNode {
	name: string;
	url: string;
	count: number;
}

export interface SiteMapView {
	counts: {
		pages: number;
		packages: number;
		posts: number;
		pillars: number;
		supporting: number;
		standalone: number;
		categories: number;
		authors: number;
		total: number;
	};
	corePages: PageNode[];
	legalPages: PageNode[];
	utilityPages: PageNode[];
	packages: PackageNode[];
	silos: SiloNode[];
	standalone: SiloChild[];
	categories: TaxonomyNode[];
	authors: TaxonomyNode[];
	mermaid: string;
}

export interface SiteMapInput {
	posts: BlogPost[];
	packages: EventPackage[];
	categories: Category[];
	authors: Author[];
	staticPages: readonly string[];
}

// --- Validación del reverse silo (dientes que antes tenía el guard) --------

/**
 * Valida los posts contra el contrato de reverse silo. Devuelve la lista de violaciones
 * (vacía = OK). Opera sobre BlogPost (url ya derivada), no sobre el frontmatter crudo.
 */
export function validateSiloGraph(posts: BlogPost[]): string[] {
	const errors: string[] = [];
	const urls = new Set(posts.map((p) => p.url));
	urls.add('/'); // el home es un target válido para los pilares

	for (const p of posts) {
		const where = p.url;

		if (!p.siloRole) {
			errors.push(`${where}: falta siloRole`);
			continue;
		}
		if (!SILO_ROLES.includes(p.siloRole as SiloRole)) {
			errors.push(`${where}: siloRole inválido "${p.siloRole}"`);
			continue;
		}

		const role = p.siloRole as SiloRole;

		if (role === 'supporting' || role === 'both') {
			if (!p.targetPage) {
				errors.push(`${where}: siloRole "${role}" sin targetPage (no alimenta ningún pilar)`);
			} else if (p.targetPage === '/') {
				errors.push(
					`${where}: siloRole "${role}" apunta al home '/', debe apuntar a un pilar (/blog/<pilar>/)`
				);
			} else if (!urls.has(p.targetPage)) {
				errors.push(`${where}: targetPage "${p.targetPage}" no resuelve a ningún nodo existente`);
			}
		}

		if (role === 'pillar' && p.targetPage && p.targetPage !== '/') {
			errors.push(`${where}: un pilar debe apuntar al home ('/'), no a "${p.targetPage}"`);
		}
	}

	return errors;
}

// --- Construcción del view-model -------------------------------------------

function byUrl<T extends { url: string }>(a: T, b: T): number {
	return a.url.localeCompare(b.url);
}

/**
 * Ordena los hijos de un silo por frescura: los que nunca se actualizaron
 * (sin `updated`) van primero; el resto asciende por fecha, así lo más
 * reciente queda al final. Empates: por URL, para un orden estable.
 */
function byUpdatedAsc<T extends { url: string; updated?: string }>(a: T, b: T): number {
	if (!a.updated && !b.updated) return byUrl(a, b);
	if (!a.updated) return -1;
	if (!b.updated) return 1;
	return a.updated.localeCompare(b.updated) || byUrl(a, b);
}

function buildSilos(posts: BlogPost[]): { silos: SiloNode[]; standalone: SiloChild[] } {
	const pillars = posts
		.filter((p) => p.siloRole === 'pillar' || p.siloRole === 'both')
		.sort(byUrl);

	const silos: SiloNode[] = pillars.map((pillar) => {
		const kids = posts
			.filter((p) => p.targetPage === pillar.url)
			.map((k) => ({ key: k.keyword || k.slug, url: k.url, updated: k.updatedDate }))
			.sort(byUpdatedAsc);
		return { key: pillar.keyword || pillar.slug, url: pillar.url, updated: pillar.updatedDate, kids };
	});

	const standalone: SiloChild[] = posts
		.filter((p) => p.siloRole === 'standalone')
		.sort(byUrl)
		.map((p) => ({ key: p.keyword || p.slug, url: p.url, updated: p.updatedDate }));

	return { silos, standalone };
}

/**
 * Sanea una etiqueta para un nodo de Mermaid mindmap. En mindmap la jerarquía es por
 * indentación y el texto va crudo: los paréntesis/llaves/corchetes se interpretan como
 * sintaxis de forma del nodo, así que se neutralizan. Los saltos de línea también.
 */
function mmLabel(s: string): string {
	return s
		.replace(/[()[\]{}]/g, '·')
		.replace(/["`]/g, "'")
		.replace(/\s*[\r\n]+\s*/g, ' ')
		.trim();
}

/** Una línea del mindmap al nivel `depth` (2 espacios por nivel). */
function mmLine(depth: number, text: string): string {
	return '  '.repeat(depth) + text;
}

/**
 * Mindmap Mermaid del sitio completo: la raíz es el sitio, y de ella cuelgan Pages,
 * Packages y Blog; el blog se abre en sus silos (pilar → supporting), standalone,
 * categorías y autores. La jerarquía se expresa por indentación (contrato del mindmap).
 */
function renderMindmap(view: Omit<SiteMapView, 'mermaid'>): string {
	const lines: string[] = ['mindmap', mmLine(1, 'root((MEG · malagaeventgear.com))')];

	// Pages
	lines.push(mmLine(2, 'Pages'));
	for (const p of view.corePages) {
		if (p.url === '/') continue;
		lines.push(mmLine(3, mmLabel(p.label)));
	}
	if (view.legalPages.length) {
		lines.push(mmLine(3, 'Legal'));
		for (const p of view.legalPages) lines.push(mmLine(4, mmLabel(p.label)));
	}
	for (const p of view.utilityPages) lines.push(mmLine(3, mmLabel(p.label)));

	// Packages
	lines.push(mmLine(2, 'Packages'));
	for (const pk of view.packages) lines.push(mmLine(3, mmLabel(pk.name)));

	// Blog
	lines.push(mmLine(2, 'Blog'));
	for (const s of view.silos) {
		lines.push(mmLine(3, `${mmLabel(s.key)} · pillar`));
		for (const k of s.kids) lines.push(mmLine(4, mmLabel(k.key)));
	}
	if (view.standalone.length) {
		lines.push(mmLine(3, 'Standalone'));
		for (const p of view.standalone) lines.push(mmLine(4, mmLabel(p.key)));
	}
	if (view.categories.length) {
		lines.push(mmLine(3, 'Categories'));
		for (const c of view.categories) lines.push(mmLine(4, mmLabel(c.name)));
	}
	if (view.authors.length) {
		lines.push(mmLine(3, 'Authors'));
		for (const a of view.authors) lines.push(mmLine(4, mmLabel(a.name)));
	}

	return lines.join('\n');
}

/** Arma el view-model completo del mapa del sitio a partir de las fuentes de contenido. */
export function buildSiteMap(input: SiteMapInput): SiteMapView {
	const { posts, packages, categories, authors, staticPages } = input;

	const corePages: PageNode[] = staticPages
		.filter((r) => !HUB_PAGES.has(r) && !LEGAL_PAGES.has(r) && !UTILITY_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r) }));
	const legalPages: PageNode[] = staticPages
		.filter((r) => LEGAL_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r) }));
	const utilityPages: PageNode[] = staticPages
		.filter((r) => UTILITY_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r) }));

	const packageNodes: PackageNode[] = packages.map((pk) => ({
		name: pk.name,
		url: pk.route,
		price: pk.price
	}));

	const { silos, standalone } = buildSilos(posts);

	const categoryNodes: TaxonomyNode[] = categories.map((c) => ({
		name: c.name,
		url: `/blog/category/${c.slug}/`,
		count: c.count
	}));
	const authorNodes: TaxonomyNode[] = authors.map((a) => ({
		name: a.name,
		url: `/blog/author/${a.slug}/`,
		count: a.count
	}));

	const pillars = silos.length;
	const supporting = silos.reduce((n, s) => n + s.kids.length, 0);

	const partial: Omit<SiteMapView, 'mermaid'> = {
		counts: {
			pages: corePages.length + legalPages.length + utilityPages.length + 2, // +2 hubs (packages, blog)
			packages: packageNodes.length,
			posts: posts.length,
			pillars,
			supporting,
			standalone: standalone.length,
			categories: categoryNodes.length,
			authors: authorNodes.length,
			total: 0
		},
		corePages,
		legalPages,
		utilityPages,
		packages: packageNodes,
		silos,
		standalone,
		categories: categoryNodes,
		authors: authorNodes
	};

	partial.counts.total =
		partial.counts.pages +
		partial.counts.packages +
		partial.counts.posts +
		partial.counts.categories +
		partial.counts.authors;

	return { ...partial, mermaid: renderMindmap(partial) };
}
