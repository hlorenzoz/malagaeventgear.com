import { getAllPosts, getCategories, getAuthors } from '$lib/data/blog';
import { packages } from '$lib/data/packages';
import { STATIC_SITEMAP_PAGES, getStaticPageFreshness } from '$lib/utils/sitemap';
import { buildSiteMap } from '$lib/data/site-map';

// Prerender: el mapa deriva de contenido estático (frontmatter + catálogo), no de la request.
export const prerender = true;

export function load() {
	return {
		view: buildSiteMap({
			posts: getAllPosts(),
			packages,
			categories: getCategories(),
			authors: getAuthors(),
			staticPages: STATIC_SITEMAP_PAGES,
			pageFreshness: getStaticPageFreshness()
		})
	};
}
