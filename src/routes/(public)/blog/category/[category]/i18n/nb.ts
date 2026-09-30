import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Alle innlegg',
	titleTemplate: '{name} | Blogg | Malaga Event Gear',
	descriptionTemplate:
		'Alle innlegg på bloggen til Malaga Event Gear om {name}: veiledninger, tips og nyheter om utleie av AV-utstyr og arrangementsutstyr i Malaga, Spania.',
	newsBadge: 'Nyheter',
	readMore: 'Les mer →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Notater og erfaringer fra utleie av lyd, skjermer og lys til arrangementer i Malaga, Spania.'
	},
	post: { singular: 'innlegg', plural: 'innlegg' }
} satisfies Copy;
