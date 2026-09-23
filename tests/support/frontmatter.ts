import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Lee una fecha (YYYY-MM-DD) del frontmatter de un post. Los tests que dependen de la fecha
// de un post la leen de aca en vez de copiarla a mano: una copia se desincroniza en el
// siguiente `just post-touch` y el test falla sin que haya ninguna regresion (ya paso con
// post-sitemap y con el boton de IndexNow de /map).
// Acepta la forma con comillas y la forma sin comillas (ver AGENTS.md, semantica de fechas).
export function postFrontmatterDate(slug: string, field: 'publishDate' | 'updatedDate'): string {
	const file = resolve(process.cwd(), 'src/content/blog', `${slug}.svx`);
	const source = readFileSync(file, 'utf8');
	const match = source.match(new RegExp(`^${field}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
	if (!match) throw new Error(`${field} not found in the frontmatter of ${file}`);
	return match[1];
}
