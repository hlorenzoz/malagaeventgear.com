import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Alle berichten',
	// {name} wordt vervangen door de weergavenaam van de categorie op de pagina.
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate:
		'Alle berichten op de blog van Malaga Event Gear over {name}: gidsen, tips en updates over audiovisuele verhuur en evenementenapparatuur in Malaga, Spanje.',
	newsBadge: 'Nieuws',
	readMore: 'Lees meer →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Notities en lessen uit het verhuren van geluid, schermen en licht voor evenementen in Malaga, Spanje.'
	},
	post: { singular: 'bericht', plural: 'berichten' }
} satisfies Copy;

export default copy;
