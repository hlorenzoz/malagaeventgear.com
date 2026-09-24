import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Cookieerklæring - Malaga Event Gear (MEG)',
		description:
			'Se hvordan Malaga Event Gear bruker cookies og sporingsteknologi for å optimalisere bruken av nettsiden og analysere ytelsen.'
	},
	hero: {
		badge: 'Sporing og brukervennlighet',
		title: 'Cookieerklæring',
		effectiveDate: 'Gjeldende fra: 16. oktober 2025'
	},
	whatAreCookies: {
		title: 'Hva er cookies?',
		body: 'Cookies er små tekstfiler som lagres på enheten din når du besøker nettsiden vår. De gjør at nettsiden fungerer mer effektivt, lar oss huske om du har valgt lyst eller mørkt tema, og gir teamet vårt anonym analysedata.'
	},
	categories: {
		title: 'Kategorier av cookies vi bruker',
		items: [
			{
				title: 'Essensielle og tekniske cookies',
				body: 'Helt nødvendige for grunnleggende navigasjon, sikkerhet og lagring av valget ditt av lyst eller mørkt tema. Disse kan ikke slås av.'
			},
			{
				title: 'Analyse- og ytelsescookies',
				body: 'Vi bruker Google Analytics og Google Search Console for å overvåke trafikk, diagnostisere flaskehalser, søkeord og sidehastighet. All innsamlet data er strengt aggregert og pseudonymisert.'
			},
			{
				title: 'Tredjeparts verifiseringscookies',
				body: 'For å vise ekte kundeomtaler verifisert direkte fra Google My Business, bruker vi Trustindex. Trustindex kan plassere cookies for å spore og dynamisk validere anmeldelsesmoduler.'
			}
		]
	},
	managing: {
		title: 'Administrer preferansene dine',
		body: 'Du kan enkelt avslå eller blokkere cookies gjennom innstillingene i nettleseren din. Merk at det å begrense alle cookies kan påvirke tilgangen din til avanserte funksjoner, som automatisk utfylling av skjemaer eller det lagrede valget ditt av lyst eller mørkt tema.'
	}
} satisfies Copy;
