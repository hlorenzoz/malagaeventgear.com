import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Todos os posts',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Leia todos os posts sobre {name} no blog da Malaga Event Gear.',
	newsBadge: 'Notícias',
	readMore: 'Ler mais →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets: 'Notas e lições da locação de som, telas e iluminação para eventos em Málaga, Espanha.'
	},
	post: { singular: 'post', plural: 'posts' }
} satisfies Copy;
