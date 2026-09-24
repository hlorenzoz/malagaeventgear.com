import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Veranstaltungstechnik Angebot anfordern Malaga | MEG',
		description:
			'Kontaktieren Sie Malaga Event Gear für ein Angebot zur Miete von Beschallung, Licht und Leinwänden. Technischer Support rund um die Uhr.'
	},
	schema: {
		name: 'Kontakt | Malaga Event Gear',
		description:
			'Kontaktieren Sie das technische Team von Malaga Event Gear für individuelle Angebote zur Miete von Beschallung, Licht und Leinwänden.'
	},
	whatsappLinkText: 'Schreiben Sie uns',
	messages: {
		packIntro: 'Hallo, ich interessiere mich für das Pack: {pack}. Bitte teilen Sie mir die Verfügbarkeit und Details mit.',
		categoryIntro:
			'Hallo, ich interessiere mich für Technik aus der Kategorie: {category}. Ich freue mich auf Ihr Angebot.'
	},
	errors: {
		pastDate: 'Bitte wählen Sie ein Veranstaltungsdatum nach heute.'
	},
	form: {
		namePlaceholder: 'Vollständiger Name',
		emailPlaceholder: 'E-Mail-Adresse',
		phonePlaceholder: 'Telefon',
		messagePlaceholder: 'Nachricht'
	}
} satisfies Copy;
