import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Cookiepolitik - Malaga Event Gear (MEG)',
		description:
			'Forstå, hvordan Malaga Event Gear bruger cookies og sporingsteknologier til at optimere hjemmesidens brugervenlighed og analysere ydeevne.'
	},
	hero: {
		badge: 'Sporing og brugervenlighed',
		title: 'Cookiepolitik',
		effectiveDate: 'Ikrafttrædelsesdato: 16. oktober 2025'
	},
	whatAreCookies: {
		title: 'Hvad er cookies?',
		body: 'Cookies er små tekstfiler, der placeres på din enhed, når du besøger vores hjemmeside. De hjælper hjemmesiden med at fungere mere effektivt, gør det muligt for os at huske, om du har valgt lyst eller mørkt tema og giver vores team anonyme analysedata.'
	},
	categories: {
		title: 'Kategorier af cookies, vi bruger',
		items: [
			{
				title: 'Nødvendige og tekniske cookies',
				body: 'Helt afgørende for grundlæggende navigation, sikkerhed og at huske dit valg af lyst eller mørkt tema. De kan ikke slås fra.'
			},
			{
				title: 'Analyse- og ydeevnecookies',
				body: 'Vi bruger Google Analytics og Google Search Console til at overvåge trafik, diagnosticere flaskehalse, søgeparametre og sidehastighed. Alle indsamlede data er strengt aggregerede og pseudonymiserede.'
			},
			{
				title: 'Verifikationscookies fra tredjepart',
				body: 'For at vise autentiske kundeudtalelser verificeret direkte fra Google Virksomhedsprofil integrerer vi Trustindex. Trustindex kan placere cookies for dynamisk at spore og validere anmeldelseswidgets.'
			}
		]
	},
	managing: {
		title: 'Administrer dine præferencer',
		body: 'Du kan nemt afvise eller blokere cookies via dine egne browserindstillinger. Bemærk dog, at begrænsning af alle cookies kan påvirke din adgang til avancerede funktioner, såsom automatisk udfyldning af formularer eller dit gemte valg af lyst eller mørkt tema.'
	}
} satisfies Copy;

export default copy;
