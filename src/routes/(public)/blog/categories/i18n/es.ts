import type { Copy } from './en';

// Copia en español de /blog/categories/. Traducción provisoria (arrastrada del selector
// en/es): se revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Categorías del Blog | Malaga Event Gear',
		description:
			'Explora todas las categorías del blog de Malaga Event Gear: bodas, alquiler audiovisual, eventos corporativos, gadgets y noticias.'
	},
	schemaName: 'Categorías del Blog | Malaga Event Gear',
	itemListLabel: 'Categorías del Blog',
	backLink: 'Todos los artículos',
	heading: 'Categorías',
	categoriesLabel: 'categorías',
	allPosts: 'Todos los Posts',
	post: { singular: 'artículo', plural: 'artículos' }
} satisfies Copy;
