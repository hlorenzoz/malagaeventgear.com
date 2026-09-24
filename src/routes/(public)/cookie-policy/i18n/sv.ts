import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Cookiepolicy | Malaga Event Gear (MEG)',
		description:
			'Förstå hur Malaga Event Gear använder cookies och spårningsteknik för att optimera webbplatsens användbarhet och analysera prestanda.'
	},
	hero: {
		badge: 'Spårning och användbarhet',
		title: 'Cookiepolicy',
		effectiveDate: 'Gäller från: 16 oktober 2025'
	},
	whatAreCookies: {
		title: 'Vad är cookies?',
		body: 'Cookies är små textfiler som placeras på din enhet när du besöker vår webbplats. De hjälper webbplatsen att fungera mer effektivt, gör att vi kan komma ihåg om du valt ljust eller mörkt tema och ger vårt team anonyma analysdata.'
	},
	categories: {
		title: 'Kategorier av cookies vi använder',
		items: [
			{
				title: 'Nödvändiga och tekniska cookies',
				body: 'Absolut nödvändiga för grundläggande navigering, säkerhet och att ditt val av ljust eller mörkt tema sparas mellan besök. De kan inte stängas av.'
			},
			{
				title: 'Analys- och prestandacookies',
				body: 'Vi använder Google Analytics och Google Search Console för att övervaka trafik och sidhastighet, felsöka flaskhalsar och analysera sökfrågor. All insamlad data är strikt aggregerad och pseudonymiserad.'
			},
			{
				title: 'Verifieringscookies från tredje part',
				body: 'För att visa äkta kundrecensioner verifierade direkt från Google My Business integrerar vi Trustindex. Trustindex kan placera cookies för att spåra och dynamiskt validera recensionswidgetar.'
			}
		]
	},
	managing: {
		title: 'Hantera dina inställningar',
		body: 'Du kan enkelt avböja eller blockera cookies via inställningarna i din webbläsare. Observera dock att begränsning av alla cookies kan påverka tillgången till avancerade funktioner, till exempel automatisk ifyllnad av formulär eller ditt sparade val av ljust eller mörkt tema.'
	}
} satisfies Copy;
