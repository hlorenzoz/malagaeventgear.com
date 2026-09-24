import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Datenschutzerklärung | Malaga Event Gear (MEG)',
		description:
			'Lesen Sie die offizielle Datenschutzerklärung von Malaga Event Gear. Erfahren Sie, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen.'
	},
	hero: {
		badge: 'Datenschutzhinweise',
		title: 'Datenschutzerklärung',
		effectiveDate: 'Gültig ab: 16. Oktober 2025'
	},
	whoWeAre: {
		title: 'Wer wir sind',
		body: 'Unsere Website ist unter https://malagaeventgear.com erreichbar. Bei Malaga Event Gear (MEG) verpflichten wir uns, Ihre personenbezogenen Daten zu schützen und transparente Informationen zur Datennutzung bereitzustellen.'
	},
	infoCollected: {
		title: 'Informationen, die wir erheben, und ihr Zweck',
		intro:
			'Wir erheben und verarbeiten personenbezogene Daten, wenn Sie unseren üblichen Geschäftsablauf nutzen (z. B. wenn Sie über unser Kontaktformular ein Angebot anfordern):',
		table: {
			headers: {
				category: 'Datenkategorie',
				purpose: 'Verarbeitungszweck'
			},
			rows: [
				{
					category: 'Kontaktdaten',
					purpose:
						'Name, E-Mail, Telefon oder WhatsApp-ID, um Details zu klären, die Logistik zu koordinieren und Ihre Buchung zu bestätigen. Kommunikation auf Englisch oder Spanisch.'
				},
				{
					category: 'Veranstaltungslogistik',
					purpose:
						'Genauer Ort und Zeitpunkt der Veranstaltung, um Lieferung, individuellen Technikaufbau und Abholung zu koordinieren.'
				},
				{
					category: 'Finanzdaten',
					purpose:
						'Zahlungsinformationen, die während der Buchung verarbeitet werden. Wir garantieren, dass alle Zahlungstransaktionen zu 100 % sicher sind.'
				}
			]
		}
	},
	reviews: {
		title: 'Bewertungen & sozialer Nachweis',
		body: 'Wir zeigen die Gesamtbewertung AUSGEZEICHNET auf Grundlage verifizierter Bewertungen aus Google My Business. Die Verifizierung der Bewertungen erfolgt dynamisch über Trustindex, wodurch sichergestellt wird, dass die ursprüngliche Quelle aller Kundenbewertungen echt und unverändert ist.'
	},
	retention: {
		title: 'Datenspeicherung & Rechte',
		body: 'Wir speichern Ihre personenbezogenen Daten nur so lange, wie es zur Erbringung Ihrer beauftragten audiovisuellen Leistungen oder zur Einhaltung gesetzlicher Vorgaben erforderlich ist. Sie haben gemäß DSGVO jederzeit das volle Recht, Ihre personenbezogenen Daten einzusehen, zu berichtigen, deren Verarbeitung zu widersprechen oder deren Löschung zu verlangen, indem Sie sich an unseren Datenschutzverantwortlichen wenden.'
	}
} satisfies Copy;
