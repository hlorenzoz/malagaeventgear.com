import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Tutti gli articoli',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Leggi tutti gli articoli su {name} dal blog di Malaga Event Gear.',
	newsBadge: 'Notizie',
	readMore: 'Leggi di più →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Appunti e lezioni dal noleggio di audio, schermi e luci per eventi a Malaga, in Spagna.'
	},
	post: { singular: 'articolo', plural: 'articoli' }
} satisfies Copy;

export default copy;
