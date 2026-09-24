import { loadPageCopy } from '$lib/i18n/page-copy';
import { getArticlePosts, getNewsPosts } from '$lib/data/blog-pipeline';
import { getPostsForLocale } from '$lib/data/blog';
import type { Copy } from './i18n/en';
import type { PageLoad } from './$types';

// La home es contenido estático (datos de build: paquetes, posts, FAQ; el idioma se resuelve en
// cliente). Prerenderizarla la sirve como HTML estático desde el edge en vez de SSR on-demand del
// Worker → TTFB más bajo y FCP/LCP más rápidos, sin cambiar el comportamiento.
export const prerender = true;

// Latest editorial content of THIS locale for the home rows (sorted by publishDate desc).
// Latest Posts excludes news to avoid overlapping with the Latest News row. An empty row hides.
export const load: PageLoad = async ({ parent }) => {
    const { locale } = await parent();
    const posts = await getPostsForLocale(locale);
    return {
        latestPosts: getArticlePosts(posts).slice(0, 5),
        latestNews: getNewsPosts(posts).slice(0, 5),
        copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), locale)
    };
};
