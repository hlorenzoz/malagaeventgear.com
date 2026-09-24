import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Offerte AV Apparatuur Malaga | Contact MEG',
		description:
			'Neem contact op met Malaga Event Gear voor een offerte op maat voor geluid, verlichting en schermverhuur. 24 uur per dag technische ondersteuning.'
	},
	schema: {
		name: 'Contact | Malaga Event Gear',
		description:
			'Neem contact op met het technisch team van Malaga Event Gear voor offertes op maat voor geluid, verlichting en schermverhuur.'
	},
	whatsappLinkText: 'Stuur ons een bericht',
	messages: {
		packIntro: 'Hoi, ik ben geïnteresseerd in het pakket: {pack}. Laat me weten wat de beschikbaarheid en details zijn.',
		categoryIntro:
			'Hoi, ik ben geïnteresseerd in apparatuur uit de categorie: {category}. Ik hoor graag jullie offerte.'
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
