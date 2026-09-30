import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Tous les articles',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate:
		'Tous les articles du blog Malaga Event Gear sur {name} : guides et conseils sur la location audiovisuelle et le matériel événementiel à Malaga, en Espagne.',
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
