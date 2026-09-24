import type { Copy } from './en';

// Copia en español de /blog/author/[author]/. Traducción provisoria (arrastrada del
// selector en/es): se revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	backLink: 'Todos los artículos',
	headingPrefix: 'Artículos de',
	titleTemplate: 'Artículos de {name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Todos los artículos de {name} en el blog de Malaga Event Gear.',
	newsBadge: 'Noticias',
	readMore: 'Leer Más →',
	post: { singular: 'artículo', plural: 'artículos' }
} satisfies Copy;
