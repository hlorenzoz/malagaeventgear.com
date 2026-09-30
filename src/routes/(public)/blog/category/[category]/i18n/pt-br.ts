import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Todos os posts',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate:
		'Posts do blog da Malaga Event Gear sobre {name}: guias e dicas sobre locação audiovisual e equipamento de eventos em Málaga, Espanha.',
	newsBadge: 'Notícias',
	readMore: 'Ler mais →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets: 'Notas e lições da locação de som, telas e iluminação para eventos em Málaga, Espanha.'
	},
	post: { singular: 'post', plural: 'posts' }
} satisfies Copy;
