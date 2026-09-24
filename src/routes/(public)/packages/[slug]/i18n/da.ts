import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	benefits: {
		delivery: 'Gratis opsætning og levering (Malaga og Costa del Sol)',
		brands: 'Premium mærker (HK Audio, Audix, Midas)',
		support: 'Teknisk support på stedet tilgængelig'
	},
	faqs: {
		delivery: {
			q: 'Er levering og opsætning inkluderet i pakkeprisen?',
			a: 'Ja, for premium pakker (som {wedding} og {mice}) er fuld professionel levering, opsætning af kabler og nedtagning i Malaga og de nærmeste forstæder inkluderet. For standardpakker kan et mindre logistisk gebyr blive tillagt afhængigt af dit events præcise placering.'
		},
		areas: {
			q: 'Hvilke områder dækker I i Andalusien?',
			a: 'Vi betjener Malaga by, Marbella og hele Costa del Sol dagligt. Vi betjener også Sevilla og Granada (til bestillinger over {price:outOfProvinceMinimum}). Vi tilbyder i øjeblikket ikke afhentning, da vi udelukkende arbejder med levering.'
		},
		rain: {
			q: 'Hvad sker der, hvis det regner ved et udendørs event?',
			a: 'Hvis dit event er udendørs, kræver vi et overdækket område (telte, pergolaer) for at beskytte det elektriske udstyr. I tilfælde af regn uden overdækning arbejder vi sammen med dig om at flytte udstyret indendørs. Gæsternes sikkerhed og beskyttelsen af højspændingsudstyret er vores højeste prioritet.'
		},
		technician: {
			q: 'Hvad sker der, hvis jeg har brug for en tekniker under mit event?',
			a: 'Vores premium pakker (som {wedding} og {mice}) inkluderer allerede teknisk overvågning på stedet. For andre pakker kan du anmode om en dedikeret lyd-/lysingeniør, der bliver på dit lokale for en stressfri oplevelse.'
		}
	},
	popularBadge: 'Mest populær',
	itemsIncludedSuffix: 'ting inkluderet',
	faqSectionTitle: 'Ofte stillede spørgsmål',
	stickyBarAriaLabel: 'Fastgjort opfordring til handling'
} satisfies Copy;

export default copy;
