import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'DSGVO-Konformität | Malaga Event Gear (MEG)',
		description:
			'Erfahren Sie, wie Malaga Event Gear Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) für den Verleih von Veranstaltungstechnik schützt.'
	},
	hero: {
		badge: 'Europäische Verordnung',
		title: 'DSGVO-Konformität',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Gültig ab: 16. Oktober 2025'
	},
	commitment: {
		title: 'DSGVO-Verpflichtung',
		body: 'Da Malaga Event Gear (MEG) seinen Sitz in Málaga, Spanien, hat, halten wir uns strikt an die Datenschutz-Grundverordnung (DSGVO) (Verordnung (EU) 2016/679) hinsichtlich der Erhebung, Verarbeitung und Aufbewahrung personenbezogener Daten.'
	},
	processing: {
		title: 'Details zur Verarbeitung personenbezogener Daten',
		headers: {
			category: 'Datenkategorie',
			legalBasis: 'Rechtsgrundlage',
			purpose: 'Verwendungszweck'
		},
		rows: [
			{
				category: 'Identität & Kontakt',
				legalBasis: 'Vertragserfüllung',
				purpose:
					'Zur Kommunikation, Klärung der Buchungsdetails und zum Versand von Angebotsdetails per E-Mail, Telefon oder WhatsApp auf Englisch oder Spanisch.'
			},
			{
				category: 'Veranstaltungsort & -zeitplan',
				legalBasis: 'Vertragserfüllung',
				purpose: 'Erforderlich für die Koordination von Lieferung, individuellem, professionellem Aufbau und Abbau.'
			},
			{
				category: 'Zahlungsdaten',
				legalBasis: 'Vertragserfüllung & Sicherheit',
				purpose:
					'Zur Abwicklung sicherer Transaktionen. Wir garantieren, dass alle Zahlungen zu 100 % sicher verarbeitet werden.'
			}
		]
	},
	rights: {
		title: 'Rechte der betroffenen Personen nach der DSGVO',
		intro: 'Gemäß der DSGVO haben Sie folgende Rechte hinsichtlich der von uns verarbeiteten personenbezogenen Daten:',
		items: [
			{
				label: 'Auskunftsrecht:',
				body: 'Sie können eine Bestätigung und Kopie aller von uns gespeicherten personenbezogenen Daten anfordern.'
			},
			{
				label: 'Recht auf Berichtigung:',
				body: 'Sie können die Aktualisierung unvollständiger oder unrichtiger Daten verlangen.'
			},
			{
				label: 'Recht auf Löschung:',
				body: 'Sie können die Löschung Ihrer personenbezogenen Daten verlangen.'
			},
			{
				label: 'Recht auf Einschränkung:',
				body: 'Sie können verlangen, dass wir die Verarbeitung unter bestimmten Bedingungen einschränken.'
			}
		]
	},
	rightsPortal: {
		title: 'Üben Sie Ihre DSGVO-Rechte aus',
		body: 'Wählen Sie unten eine Aktion aus, um Ihre Datenschutzanfrage automatisch an unser Datenschutzteam zu übermitteln.',
		buttons: {
			access: 'Auskunft beantragen',
			rectification: 'Berichtigung beantragen',
			erasure: 'Löschung beantragen'
		},
		actions: {
			access: 'Auskunft',
			rectification: 'Berichtigung',
			erasure: 'Löschung'
		},
		status: {
			prefix: 'Ihr Antrag auf ',
			middle: ' wurde eingeleitet. Bitte senden Sie uns eine E-Mail an ',
			suffix: ', um die Verifizierung abzuschließen.'
		}
	}
} satisfies Copy;
