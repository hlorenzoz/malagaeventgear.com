import { describe, it, expect } from 'vitest';
import {
	toLastmod,
	STATIC_SITEMAP_PAGES,
	getStaticPageFreshness
} from '$lib/utils/sitemap';
import { packages } from '$lib/data/packages';

/**
 * Guard de frescura del sitemap (AGENTS.md §11).
 *
 * page-sitemap.xml solia emitir `new Date()` como <lastmod> de todas las paginas
 * estaticas y paquetes: un "build timestamp" prohibido, porque le ensena a Google que
 * el campo no significa nada. Ahora la fecha vive AL LADO del contenido (meta.ts por
 * ruta, `updated` por paquete). Este guard falla si alguien agrega una ruta o un
 * paquete sin declarar su fecha, o si el formato es invalido. La solucion siempre es
 * declarar la fecha, nunca ampliar un allowlist.
 */

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

describe('toLastmod', () => {
	it('formatea YYYY-MM-DD al formato <lastmod> con offset UTC', () => {
		expect(toLastmod('2026-06-14')).toBe('2026-06-14T00:00:00+00:00');
	});

	it('tolera una entrada con parte horaria y la descarta', () => {
		expect(toLastmod('2026-06-14T13:37:00+02:00')).toBe('2026-06-14T00:00:00+00:00');
	});
});

describe('frescura de paginas estaticas', () => {
	const freshness = getStaticPageFreshness();

	it('toda ruta de STATIC_SITEMAP_PAGES tiene una fecha declarada en su meta.ts', () => {
		const missing = STATIC_SITEMAP_PAGES.filter((route) => !freshness.has(route));
		expect(missing, `rutas sin meta.ts/contentUpdated: ${missing.join(', ')}`).toEqual([]);
	});

	it('cada contentUpdated es una fecha YYYY-MM-DD valida', () => {
		for (const route of STATIC_SITEMAP_PAGES) {
			const value = freshness.get(route)!;
			expect(value, `ruta '${route || '<home>'}'`).toMatch(DATE_ONLY);
			expect(Number.isNaN(Date.parse(value)), `ruta '${route || '<home>'}'`).toBe(false);
		}
	});

	it('no declara ninguna fecha en el futuro (no es un timestamp de build)', () => {
		const today = new Date().toISOString().split('T')[0];
		for (const route of STATIC_SITEMAP_PAGES) {
			expect(freshness.get(route)! <= today, `ruta '${route || '<home>'}'`).toBe(true);
		}
	});
});

describe('frescura de paquetes', () => {
	it('todo paquete declara `updated` en formato YYYY-MM-DD valido', () => {
		for (const pkg of packages) {
			expect(pkg.updated, `paquete '${pkg.slug}'`).toMatch(DATE_ONLY);
			expect(Number.isNaN(Date.parse(pkg.updated)), `paquete '${pkg.slug}'`).toBe(false);
		}
	});
});
