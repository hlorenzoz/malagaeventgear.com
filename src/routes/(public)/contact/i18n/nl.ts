import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Offerte AV-apparatuur Malaga | Contact MEG',
		description:
			'Neem contact op met Malaga Event Gear voor een offerte op maat voor de huur van geluid, verlichting en schermen. Technische ondersteuning, 24 uur per dag, 7 dagen per week.'
	},
	schema: {
		name: 'Contact | Malaga Event Gear',
		description:
			'Neem contact op met het technisch team van Malaga Event Gear voor offertes op maat voor de huur van geluid, verlichting en schermen.'
	},
	whatsappLinkText: 'Stuur ons een bericht',
	messages: {
		packIntro: 'Hoi, ik wil graag het volgende pakket boeken: {pack}. Kunnen jullie me de beschikbaarheid en de details laten weten?',
		categoryIntro:
			'Hoi, ik wil graag apparatuur huren uit de categorie: {category}. Ik zie jullie offerte graag tegemoet.'
	},
	errors: {
		pastDate: 'Kies een evenementdatum na vandaag.'
	},
	form: {
		namePlaceholder: 'Volledige naam',
		emailPlaceholder: 'E-mailadres',
		phonePlaceholder: 'Telefoon',
		messagePlaceholder: 'Bericht'
	}
} satisfies Copy;

export default copy;
