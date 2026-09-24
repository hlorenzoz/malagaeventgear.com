import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Angebot für Veranstaltungstechnik in Malaga anfordern | MEG',
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
		packIntro: 'Hallo, ich möchte folgendes Paket buchen: {pack}. Bitte teilen Sie mir die Verfügbarkeit und die Details mit.',
		categoryIntro:
			'Hallo, ich möchte Technik aus folgender Kategorie mieten: {category}. Ich freue mich auf Ihr Angebot.'
	},
	errors: {
		pastDate: 'Bitte wählen Sie ein Veranstaltungsdatum ab morgen.'
	},
	form: {
		namePlaceholder: 'Vollständiger Name',
		emailPlaceholder: 'E-Mail-Adresse',
		phonePlaceholder: 'Telefon',
		messagePlaceholder: 'Nachricht'
	}
} satisfies Copy;
