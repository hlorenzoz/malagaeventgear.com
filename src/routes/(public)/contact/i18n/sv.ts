import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Kontakta oss för offert på eventteknik i Malaga',
		description:
			'Kontakta Malaga Event Gear för att begära offert på ljud-, ljus- och dukuthyrning. Teknisk support dygnet runt.'
	},
	schema: {
		name: 'Kontakta oss | Malaga Event Gear',
		description:
			'Kontakta det tekniska teamet på Malaga Event Gear för att begära skräddarsydda offerter på ljud-, ljus- och dukuthyrning.'
	},
	whatsappLinkText: 'Skicka oss ett meddelande',
	messages: {
		packIntro: 'Hej, jag är intresserad av att boka paketet: {pack}. Vänligen meddela mig tillgänglighet och detaljer.',
		categoryIntro:
			'Hej, jag är intresserad av att boka utrustning från kategorin: {category}. Jag ser fram emot er offert.'
	},
	errors: {
		pastDate: 'Välj ett evenemangsdatum efter idag.'
	},
	form: {
		namePlaceholder: 'Fullständigt namn',
		emailPlaceholder: 'E-postadress',
		phonePlaceholder: 'Telefon',
		messagePlaceholder: 'Meddelande'
	}
} satisfies Copy;
