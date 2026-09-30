import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: 'Alle Beiträge',
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Lesen Sie alle Beiträge über {name} im Blog von Malaga Event Gear.',
	newsBadge: 'Neuigkeiten',
	readMore: 'Weiterlesen →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Notizen und Erfahrungen aus dem Verleih von Ton, Bildschirmen und Licht für Events in Malaga, Spanien.'
	},
	post: { singular: 'Beitrag', plural: 'Beiträge' }
} satisfies Copy;
