import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	backLink: 'Alle berichten',
	// {name} wordt vervangen door de weergavenaam van de categorie op de pagina.
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Lees alle berichten over {name} op de blog van Malaga Event Gear.',
	newsBadge: 'Nieuws',
	readMore: 'Lees meer →',
	post: { singular: 'bericht', plural: 'berichten' }
} satisfies Copy;

export default copy;
