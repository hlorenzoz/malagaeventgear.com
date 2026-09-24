import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Personvernerklæring | Malaga Event Gear (MEG)',
		description:
			'Les den offisielle personvernerklæringen til Malaga Event Gear. Lær hvordan vi samler inn, behandler og beskytter dine personopplysninger.'
	},
	hero: {
		badge: 'Personvernopplysninger',
		title: 'Personvernerklæring',
		effectiveDate: 'Gjeldende fra: 16. oktober 2025'
	},
	whoWeAre: {
		title: 'Hvem vi er',
		body: 'Nettadressen vår er https://malagaeventgear.com. Hos Malaga Event Gear (MEG) er vi forpliktet til å beskytte personopplysningene dine og gi åpne opplysninger om bruken av data.'
	},
	infoCollected: {
		title: 'Informasjon vi samler inn og formålet',
		intro:
			'Vi samler inn og behandler personopplysninger når du bruker vår etablerte arbeidsflyt (for eksempel når du ber om et tilbud via kontaktskjemaet vårt):',
		table: {
			headers: {
				category: 'Datakategori',
				purpose: 'Formål med behandlingen'
			},
			rows: [
				{
					category: 'Kontaktopplysninger',
					purpose:
						'Navn, e-post, telefon eller WhatsApp-ID for å fastsette detaljer, koordinere logistikk og bekrefte bookingen din. Foregår på engelsk eller spansk.'
				},
				{
					category: 'Logistikk for arrangementet',
					purpose: 'Nøyaktig sted og tidspunkt for arrangementet, for å koordinere levering, skreddersydd installasjon av utstyr og henting.'
				},
				{
					category: 'Finansielle data',
					purpose: 'Betalingsinformasjon som behandles ved booking. Vi garanterer at alle betalingstransaksjoner er 100 % sikre.'
				}
			]
		}
	},
	reviews: {
		title: 'Anmeldelser og sosialt bevis',
		body: 'Vi viser en UTMERKET vurdering basert på verifiserte Google My Business-anmeldelser. Verifiseringen av anmeldelsene håndteres dynamisk via Trustindex, som sikrer at den opprinnelige kilden til alle kundeanmeldelser er ekte og uendret.'
	},
	retention: {
		title: 'Lagring av data og dine rettigheter',
		body: 'Vi lagrer personopplysningene dine kun så lenge det er nødvendig for å gjennomføre de avtalte lyd- og bildetjenestene, eller for å overholde lovpålagte krav. Etter GDPR har du til enhver tid rett til innsyn, retting, å protestere mot behandlingen og å be om sletting av personopplysningene dine ved å kontakte den behandlingsansvarlige hos oss.'
	}
} satisfies Copy;
