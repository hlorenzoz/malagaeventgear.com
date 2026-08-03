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
import { KNOWN_SILO_CYCLE_DEBT } from '$lib/data/silo-cycle-debt';

export const SILO_ROLES = ['pillar', 'supporting', 'both', 'news', 'standalone'] as const;
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
	updated?: string;
}
export interface PackageNode {
	name: string;
	url: string;
	price: number;
	updated?: string;
}
export interface SiloChild {
	key: string;
	url: string;
	updated?: string;
	publishDate?: string;
}
export interface SiloNode {
	key: string;
	url: string;
	updated?: string;
	publishDate?: string;
	kids: SiloChild[];
}
export interface TaxonomyNode {
	name: string;
	url: string;
	count: number;
	updated?: string;
}

export interface SiteMapView {
	counts: {
		pages: number;
		packages: number;
		posts: number;
		pillars: number;
		supporting: number;
		news: number;
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
	news: SiloChild[];
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
	/** Ruta (sin barras) -> `contentUpdated`, del mismo `meta.ts` que alimenta page-sitemap.xml. */
	pageFreshness?: ReadonlyMap<string, string>;
}

// --- Validación del reverse silo (dientes que antes tenía el guard) --------

/**
 * Regex de links internos a otro post del blog dentro del cuerpo markdown: `](/blog/<slug>/)`.
 * No matchea `/blog/category/<slug>/` ni `/blog/author/<slug>/` porque el segmento capturado
 * no puede contener otra barra antes del `/)` de cierre.
 */
const BLOG_LINK_RE = /\]\(\/blog\/([a-z0-9-]+)\/\)/g;

/**
 * Extrae, deduplicados, los slugs de otros posts linkeados desde el cuerpo markdown de un post
 * (excluye auto-referencias). Usado para construir el grafo de interlinking lateral entre
 * siblings de un mismo silo, algo que el frontmatter (`siloRole`/`targetPage`) no expresa.
 */
export function extractBlogLinks(body: string, ownSlug: string): string[] {
	const found = new Set<string>();
	for (const m of body.matchAll(BLOG_LINK_RE)) {
		if (m[1] !== ownSlug) found.add(m[1]);
	}
	return [...found];
}

/**
 * Componentes fuertemente conexas de un grafo dirigido (Tarjan). Un nodo aislado o una cadena
 * lineal produce solo componentes de tamaño 1 (sin interés); una componente de tamaño >= 2
 * significa que esos nodos son mutuamente alcanzables entre sí, es decir, hay al menos un
 * ciclo entre ellos. Se prefiere sobre enumerar ciclos simples uno por uno: un grafo con un
 * grupo de nodos densamente enlazado entre sí puede tener cientos de ciclos simples distintos
 * (cada camino de recorrido produce uno "nuevo"), pero siempre la MISMA componente - por eso
 * la componente es la unidad estable para trackear como "deuda conocida" en un baseline.
 */
export function findStronglyConnectedComponents(graph: Map<string, string[]>): string[][] {
	let index = 0;
	const indices = new Map<string, number>();
	const lowlink = new Map<string, number>();
	const onStack = new Set<string>();
	const stack: string[] = [];
	const components: string[][] = [];

	function strongconnect(v: string) {
		indices.set(v, index);
		lowlink.set(v, index);
		index++;
		stack.push(v);
		onStack.add(v);

		for (const w of graph.get(v) ?? []) {
			if (!indices.has(w)) {
				strongconnect(w);
				lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
			} else if (onStack.has(w)) {
				lowlink.set(v, Math.min(lowlink.get(v)!, indices.get(w)!));
			}
		}

		if (lowlink.get(v) === indices.get(v)) {
			const component: string[] = [];
			let w: string;
			do {
				w = stack.pop()!;
				onStack.delete(w);
				component.push(w);
			} while (w !== v);
			components.push(component);
		}
	}

	for (const node of graph.keys()) {
		if (!indices.has(node)) strongconnect(node);
	}

	return components;
}

/**
 * Valida los posts contra el contrato de reverse silo. Devuelve la lista de violaciones
 * (vacía = OK). Opera sobre BlogPost (url ya derivada), no sobre el frontmatter crudo.
 *
 * Además de siloRole/targetPage, detecta ciclos NUEVOS en el grafo de interlinking lateral
 * (`blogLinks`, si el caller lo provee - ver `extractBlogLinks`): la regla "cadena, no
 * todos-con-todos" (AGENTS.md) exige que los siblings de un silo se linkeen en cadena hacia el
 * pilar, nunca formando un circuito. Sin `blogLinks` este chequeo simplemente no encuentra
 * ciclos (no rompe callers que no lo proveen). "Nuevos" porque el sitio real tiene deuda
 * preexistente (ver `silo-cycle-debt.ts`) que este chequeo NO exige resolver de una - solo
 * evita que un componente NUEVO (no listado en el baseline) se cuele sin ser notado.
 */
export function validateSiloGraph(posts: (BlogPost & { blogLinks?: string[] })[]): string[] {
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

		if (role === 'news' && p.targetPage !== '/') {
			errors.push(`${where}: siloRole "news" debe apuntar al home ('/'), no a "${p.targetPage}"`);
		}
	}

	const linkGraph = new Map<string, string[]>();
	for (const p of posts) linkGraph.set(p.slug, p.blogLinks ?? []);
	const knownDebt = new Set(KNOWN_SILO_CYCLE_DEBT);
	for (const component of findStronglyConnectedComponents(linkGraph)) {
		// Un par reciproco entre 2 siblings adyacentes ES la cadena esperada (AGENTS.md
		// "cadena, no todos-con-todos"), no un error. Solo una componente de 3+ nodos indica
		// que el interlinking lateral dejó de ser una cadena y se volvió una malla.
		if (component.length < 3) continue;
		const signature = [...component].sort().join('|');
		if (knownDebt.has(signature)) continue; // deuda preexistente ya documentada, no bloquea
		errors.push(
			`ciclo de interlinking detectado entre siblings (grupo de ${component.length} nodos): ${[...component].sort().join(', ')}`
		);
	}

	return errors;
}

// --- Construcción del view-model -------------------------------------------

function byUrl<T extends { url: string }>(a: T, b: T): number {
	return a.url.localeCompare(b.url);
}

/**
 * Normaliza una fecha a su parte `YYYY-MM-DD`, descartando el resto.
 *
 * Gotcha de YAML (documentado en AGENTS.md): una fecha SIN comillas en el frontmatter
 * (`updatedDate: 2025-12-10`) se parsea como `Date` y termina serializada como
 * `2025-12-10T00:00:00.000Z`, mientras que una fecha entre comillas queda como el string
 * plano `2025-12-10`. Comparar ambas formas sin normalizar produce un orden incorrecto
 * para el mismo día calendario (el string con hora siempre ordena después). Mismo patrón
 * que ya usa `maxUpdatedDate` en blog-pipeline.ts.
 */
export function dateOnly(date: string): string {
	return date.split('T')[0];
}

/**
 * Ordena los hijos de un silo por frescura: los que nunca se actualizaron
 * (sin `updated`) van primero; el resto asciende por fecha, así lo más
 * reciente queda al final. Empates: por URL, para un orden estable.
 */
export function byUpdatedAsc<T extends { url: string; updated?: string }>(a: T, b: T): number {
	if (!a.updated && !b.updated) return byUrl(a, b);
	if (!a.updated) return -1;
	if (!b.updated) return 1;
	return dateOnly(a.updated).localeCompare(dateOnly(b.updated)) || byUrl(a, b);
}

function buildSilos(
	posts: BlogPost[]
): { silos: SiloNode[]; news: SiloChild[]; standalone: SiloChild[] } {
	const pillars = posts
		.filter((p) => p.siloRole === 'pillar' || p.siloRole === 'both')
		.sort(byUrl);

	const silos: SiloNode[] = pillars.map((pillar) => {
		const kids = posts
			.filter((p) => p.targetPage === pillar.url)
			.map((k) => ({
				key: k.keyword || k.slug,
				url: k.url,
				updated: k.updatedDate,
				publishDate: k.publishDate
			}))
			.sort(byUpdatedAsc);
		return {
			key: pillar.keyword || pillar.slug,
			url: pillar.url,
			updated: pillar.updatedDate,
			publishDate: pillar.publishDate,
			kids
		};
	});

	const news: SiloChild[] = posts
		.filter((p) => p.siloRole === 'news')
		.sort(byUrl)
		.map((p) => ({
			key: p.keyword || p.slug,
			url: p.url,
			updated: p.updatedDate,
			publishDate: p.publishDate
		}));

	const standalone: SiloChild[] = posts
		.filter((p) => p.siloRole === 'standalone')
		.sort(byUrl)
		.map((p) => ({
			key: p.keyword || p.slug,
			url: p.url,
			updated: p.updatedDate,
			publishDate: p.publishDate
		}));

	return { silos, news, standalone };
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
	if (view.news.length) {
		lines.push(mmLine(3, 'News'));
		for (const p of view.news) lines.push(mmLine(4, mmLabel(p.key)));
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
	const { posts, packages, categories, authors, staticPages, pageFreshness = new Map() } = input;

	const corePages: PageNode[] = staticPages
		.filter((r) => !HUB_PAGES.has(r) && !LEGAL_PAGES.has(r) && !UTILITY_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r), updated: pageFreshness.get(r) }));
	const legalPages: PageNode[] = staticPages
		.filter((r) => LEGAL_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r), updated: pageFreshness.get(r) }));
	const utilityPages: PageNode[] = staticPages
		.filter((r) => UTILITY_PAGES.has(r))
		.map((r) => ({ label: pageLabel(r), url: pageUrl(r), updated: pageFreshness.get(r) }));

	const packageNodes: PackageNode[] = packages.map((pk) => ({
		name: pk.name,
		url: pk.route,
		price: pk.price,
		updated: pk.updated
	}));

	const { silos, news, standalone } = buildSilos(posts);

	const categoryNodes: TaxonomyNode[] = categories.map((c) => ({
		name: c.name,
		url: `/blog/category/${c.slug}/`,
		count: c.count,
		updated: c.lastmod
	}));
	const authorNodes: TaxonomyNode[] = authors.map((a) => ({
		name: a.name,
		url: `/blog/author/${a.slug}/`,
		count: a.count,
		updated: a.lastmod
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
			news: news.length,
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
		news,
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
