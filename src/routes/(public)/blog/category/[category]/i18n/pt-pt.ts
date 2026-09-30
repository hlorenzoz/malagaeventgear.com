import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Todas as publicações',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate:
		'Publicações do blogue da Malaga Event Gear sobre {name}: guias e dicas sobre aluguer audiovisual e equipamento de eventos em Málaga, Espanha.',
	newsBadge: 'Notícias',
	readMore: 'Ler mais →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets: 'Notas e lições do aluguer de som, ecrãs e iluminação para eventos em Málaga, Espanha.'
	},
	post: { singular: 'publicação', plural: 'publicações' }
} satisfies Copy;
