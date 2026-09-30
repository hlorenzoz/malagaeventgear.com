import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Alla inlägg',
	titleTemplate: '{name} | Blogg | Malaga Event Gear',
	descriptionTemplate:
		'Läs alla inlägg i Malaga Event Gears blogg i kategorin {name}: guider, tips och nyheter om AV-uthyrning och eventutrustning i Malaga, Spanien.',
	newsBadge: 'Nyheter',
	readMore: 'Läs mer →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Anteckningar och lärdomar från uthyrning av ljud, skärmar och ljus till evenemang i Malaga, Spanien.'
	},
	post: { singular: 'inlägg', plural: 'inlägg' }
} satisfies Copy;
