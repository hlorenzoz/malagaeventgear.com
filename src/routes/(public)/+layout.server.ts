import { getCategoriesForLocale } from '$lib/data/blog';
import { localeFromPath } from '$lib/i18n/locale-path';
import { getAlternates } from '$lib/i18n/router';
import { englishPathOf } from '$lib/i18n/routing';
import type { LayoutServerLoad } from './$types';

// Server-only: serializa solo el array de categorías (≈6 objetos pequeños) para el Footer,
// sin arrastrar $lib/data/blog (frontmatter de todos los posts) al bundle cliente del layout.
// También resuelve el idioma de la URL y las versiones publicadas de esta página en cada idioma
// (hreflang y selector de idioma). Eso carga los mapas de TODOS los idiomas, por eso vive acá y
// no en el cliente: el cliente solo recibe la lista ya resuelta.
export const load: LayoutServerLoad = async ({ url, route, params }) => {
	const enPath = englishPathOf(route.id, params as Record<string, string>);
	const locale = localeFromPath(url.pathname);
	return {
		// Footer: only the categories with published posts in THIS locale, with their localized name.
		categories: await getCategoriesForLocale(locale),
		locale,
		enPath,
		alternates: enPath ? await getAlternates(enPath) : []
	};
};
