import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: 'Alle indlæg',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Læs alle indlæg om {name} fra Malaga Event Gears blog.',
	newsBadge: 'Nyheder',
	readMore: 'Læs mere →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets: 'Noter og erfaringer fra udlejning af lyd, skærme og lys til events i Malaga, Spanien.'
	},
	post: { singular: 'indlæg', plural: 'indlæg' }
} satisfies Copy;

export default copy;
