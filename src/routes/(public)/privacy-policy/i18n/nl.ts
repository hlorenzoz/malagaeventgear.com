import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Privacybeleid | Malaga Event Gear (MEG)',
		description:
			'Lees het officiële privacybeleid van Malaga Event Gear. Ontdek hoe wij je persoonsgegevens verzamelen, verwerken en beschermen.'
	},
	hero: {
		badge: 'Privacyverklaringen',
		title: 'Privacybeleid',
		effectiveDate: 'Ingangsdatum: 16 oktober 2025'
	},
	whoWeAre: {
		title: 'Wie we zijn',
		body: 'Ons websiteadres is https://malagaeventgear.com. Bij Malaga Event Gear (MEG) zetten we ons in om je persoonsgegevens te beschermen en transparante toelichtingen te geven over het gebruik van gegevens.'
	},
	infoCollected: {
		title: 'Welke gegevens we verzamelen en waarom',
		intro:
			'We verzamelen en verwerken persoonsgegevens wanneer je gebruikmaakt van onze vaste werkwijze (bijvoorbeeld wanneer je een offerte aanvraagt via ons contactformulier):',
		table: {
			headers: {
				category: 'Gegevenscategorie',
				purpose: 'Verwerkingsdoel'
			},
			rows: [
				{
					category: 'Contactgegevens',
					purpose:
						'Naam, e-mail, telefoon of WhatsApp-ID om de details vast te leggen, de logistiek te coördineren en je boeking te bevestigen. In het Engels of het Spaans.'
				},
				{
					category: 'Evenementlogistiek',
					purpose:
						'Precieze locatie en tijdstip om levering, opbouw op maat en het ophalen van apparatuur te coördineren.'
				},
				{
					category: 'Financiële gegevens',
					purpose:
						'Betalingsinformatie die tijdens boekingen wordt verwerkt. We garanderen dat alle betalingstransacties 100% veilig zijn.'
				}
			]
		}
	},
	reviews: {
		title: 'Reviews & sociaal bewijs',
		body: 'We tonen de beoordeling UITSTEKEND op basis van geverifieerde reviews op ons Google Bedrijfsprofiel. De verificatie van reviews verloopt dynamisch via Trustindex, wat garandeert dat de oorspronkelijke bron van alle klantbeoordelingen echt en ongewijzigd is.'
	},
	retention: {
		title: 'Gegevensbewaring & rechten',
		body: 'We bewaren je persoonsgegevens alleen zolang als nodig is om de audiovisuele diensten die je bij ons hebt afgenomen af te ronden of te voldoen aan wettelijke verplichtingen. Je hebt onder de AVG volledig recht op inzage, rectificatie, bezwaar of verwijdering van je persoonsgegevens, op elk moment, door contact op te nemen met onze verwerkingsverantwoordelijke.'
	}
} satisfies Copy;

export default copy;
