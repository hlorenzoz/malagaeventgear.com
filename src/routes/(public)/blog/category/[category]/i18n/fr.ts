import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Tous les articles',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Lisez tous les articles sur {name} du blog Malaga Event Gear.',
	newsBadge: 'Actualités',
	readMore: 'Lire la suite →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			"Notes et enseignements tirés de la location de sonorisation, d'écrans et d'éclairage pour des événements à Malaga, en Espagne."
	},
	post: { singular: 'article', plural: 'articles' }
} satisfies Copy;

export default copy;
