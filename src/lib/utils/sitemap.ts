/**
 * Helpers compartidos por los endpoints de sitemap.
 *
 * Frescura (CLAUDE.md §11): la fecha de <lastmod> vive AL LADO del contenido, nunca
 * como un timestamp de build. Para las paginas estaticas eso significa un `meta.ts`
 * colocado junto a cada ruta (`export const contentUpdated = 'YYYY-MM-DD'`); para los
 * paquetes, el campo `updated` del catalogo. Emitir `new Date()` esta prohibido: le
 * ensena a los crawlers que el campo no significa nada.
 */

import type { Locale } from '$lib/i18n/locales';

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
 * Fecha de cada TRADUCCION de pagina: `export const updated` de `<ruta>/i18n/<locale>.ts`,
 * al lado de la copia traducida (CLAUDE.md §11). Solo se importa ese export. Los `en.ts` quedan
 * AFUERA: no exportan `updated` (la fecha inglesa vive en meta.ts), y un named import que no
 * existe rompe el modulo en el navegador (SyntaxError en dev, lo que mato la hidratacion de /map).
 */
const translationDates = import.meta.glob(['/src/routes/**/i18n/*.ts', '!/src/routes/**/i18n/en.ts'], {
	eager: true,
	import: 'updated'
}) as Record<string, string | undefined>;

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

/**
 * Mapa `ruta -> fecha de contenido` de un idioma. En ingles es `contentUpdated` del meta.ts. En
 * otro idioma es el `updated` de `<ruta>/i18n/<locale>.ts`: cada traduccion tiene su propia
 * fecha, al lado de su copia (CLAUDE.md §11), y nunca hereda la del ingles.
 */
export function getStaticPageFreshness(locale: Locale = 'en'): ReadonlyMap<string, string> {
	if (locale === 'en') return staticPageFreshness;
	const map = new Map<string, string>();
	const suffix = `/i18n/${locale}.ts`;
	for (const [path, date] of Object.entries(translationDates)) {
		if (!date || !path.endsWith(suffix)) continue;
		const i = path.indexOf(PUBLIC_PREFIX);
		if (i === -1) continue;
		map.set(path.slice(i + PUBLIC_PREFIX.length, -suffix.length), date);
	}
	return map;
}

/** English route path of a `STATIC_SITEMAP_PAGES` entry (`''` is the home, `/`). */
export function staticPageEnPath(page: string): string {
	return page ? `/${page}/` : '/';
}

export interface SitemapUrl {
	/** Absolute URL, already percent encoded. */
	loc: string;
	lastmod?: string;
	/** Absolute image URL. Only `image:loc`: Google no longer reads image captions or titles. */
	image?: string;
}

/** A `<urlset>` document. Every `<loc>` must already be absolute and encoded. */
export function urlsetXml(urls: SitemapUrl[]): string {
	const body = urls
		.map(({ loc, lastmod, image }) => {
			const lastmodBlock = lastmod ? `\n		<lastmod>${toLastmod(lastmod)}</lastmod>` : '';
			const imageBlock = image ? `\n		<image:image>\n			<image:loc>${image}</image:loc>\n		</image:image>` : '';
			return `	<url>\n		<loc>${loc}</loc>${lastmodBlock}${imageBlock}\n	</url>`;
		})
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;
}

export const SITEMAP_HEADERS = {
	'Content-Type': 'application/xml; charset=utf-8',
	'Cache-Control': 'public, max-age=3600, s-maxage=86400',
	'X-Content-Type-Options': 'nosniff'
} as const;
