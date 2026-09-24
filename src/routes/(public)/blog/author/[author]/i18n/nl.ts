import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	backLink: 'Alle berichten',
	headingPrefix: 'Berichten van',
	// {name} wordt vervangen door de weergavenaam van de auteur op de pagina.
	titleTemplate: 'Berichten van {name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Alle blogberichten van {name} bij Malaga Event Gear.',
	newsBadge: 'Nieuws',
	readMore: 'Lees meer →',
	post: { singular: 'bericht', plural: 'berichten' }
} satisfies Copy;

export default copy;
