import type { APIRequestContext } from '@playwright/test';

// Fechas de un post (YYYY-MM-DD), leidas del JSON-LD del propio post, que se deriva del
// frontmatter (publishDate / updatedDate). Los tests que dependen de la fecha de un post la
// obtienen de aca en vez de copiarla a mano: una copia se desincroniza en el siguiente
// `just post-touch` y el test falla sin que haya ninguna regresion (ya paso con post-sitemap y
// con el boton de IndexNow de /map).
// Se lee por HTTP y no con node:fs porque el proyecto no carga los tipos de Node a proposito
// (corre en Cloudflare Workers) y `bun run check` tambien valida tests/.
export async function postDates(
	request: APIRequestContext,
	slug: string
): Promise<{ published: string; modified: string }> {
	const html = await (await request.get(`/blog/${slug}/`)).text();
	const published = html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})/)?.[1];
	const modified = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})/)?.[1];
	if (!published || !modified) throw new Error(`datePublished/dateModified not found in /blog/${slug}/`);
	return { published, modified };
}
