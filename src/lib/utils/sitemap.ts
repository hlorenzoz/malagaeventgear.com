/**
 * Helpers compartidos por los endpoints de sitemap.
 *
 * Frescura (AGENTS.md §11): la fecha de <lastmod> vive AL LADO del contenido, nunca
 * como un timestamp de build. Para las paginas estaticas eso significa un `meta.ts`
 * colocado junto a cada ruta (`export const contentUpdated = 'YYYY-MM-DD'`); para los
 * paquetes, el campo `updated` del catalogo. Emitir `new Date()` esta prohibido: le
 * ensena a los crawlers que el campo no significa nada.
 */

/** Convierte una fecha `YYYY-MM-DD` (o ISO) al formato `<lastmod>` con offset UTC. */
export function toLastmod(dateStr: string): string {
	const d = dateStr.split('T')[0]; // descarta la parte horaria si viene
	return `${d}T00:00:00+00:00`;
}

/**
 * Rutas publicas estaticas incluidas en page-sitemap.xml. Path sin barra inicial ni
 * final (`''` = home). Es la lista de rutas del sitemap; cada una DEBE tener su
 * `meta.ts` con `contentUpdated` (lo garantiza el guard sitemap-freshness.test.ts).
 */
export const STATIC_SITEMAP_PAGES = [
	'',
	'about-us',
	'contact',
	'faq',
	'privacy-policy',
	'terms-of-service',
	'gdpr',
	'cookie-policy',
	'meet-the-team',
	'sitemap',
	'equipment',
	'packages',
	'blog',
	'blog/categories'
] as const;

/**
 * Fecha de contenido por ruta, recolectada de los `meta.ts` colocados junto a cada
 * pagina. El glob NO puede llevar el grupo `(public)` en el patron: picomatch trata los
 * parentesis como un grupo extglob y no matchea nada. Se globea todo `meta.ts` bajo
 * `routes/` y luego se acepta SOLO lo que este dentro de `(public)/` (el sitemap publico
 * no lista rutas de otros grupos), recortando el prefijo hasta ese grupo. Cualquier
 * `meta.ts` fuera de `(public)` se ignora en vez de mapearse a una clave espuria.
 */
const PUBLIC_PREFIX = '/(public)/';

const metaModules = import.meta.glob('/src/routes/**/meta.ts', {
	eager: true
}) as Record<string, { contentUpdated?: string }>;

/**
 * Mapa `ruta -> contentUpdated` derivado de los meta.ts publicos. Se computa una sola vez
 * al cargar el modulo: el glob es eager y el resultado es puro y determinista, asi que no
 * hay razon para reconstruirlo en cada request de page-sitemap.xml.
 */
const staticPageFreshness: ReadonlyMap<string, string> = (() => {
	const map = new Map<string, string>();
	for (const [path, mod] of Object.entries(metaModules)) {
		if (!mod?.contentUpdated) continue;
		const i = path.indexOf(PUBLIC_PREFIX);
		if (i === -1) continue; // solo los meta.ts bajo (public)/ alimentan el sitemap publico
		const route = path.slice(i + PUBLIC_PREFIX.length).replace(/\/?meta\.ts$/, '');
		map.set(route, mod.contentUpdated);
	}
	return map;
})();

/** Mapa `ruta -> contentUpdated` (calculado una vez al cargar el modulo). */
export function getStaticPageFreshness(): ReadonlyMap<string, string> {
	return staticPageFreshness;
}
