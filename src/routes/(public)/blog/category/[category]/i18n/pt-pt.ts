import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Todas as publicações',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Leia todas as publicações sobre {name} no blog da Malaga Event Gear.',
	newsBadge: 'Notícias',
	readMore: 'Ler mais →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets: 'Notas e lições do aluguer de som, ecrãs e iluminação para eventos em Málaga, Espanha.'
	},
	post: { singular: 'publicação', plural: 'publicações' }
} satisfies Copy;
