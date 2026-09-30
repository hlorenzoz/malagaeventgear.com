import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Tutti gli articoli',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate:
		'Tutti gli articoli del blog di Malaga Event Gear su {name}: guide, consigli e novità su noleggio audiovisivi e attrezzature per eventi a Malaga, in Spagna.',
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
