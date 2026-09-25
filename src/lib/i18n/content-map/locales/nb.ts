import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'leie AV-utstyr i Malaga', status: 'propuesta' },
		'/about-us/': { path: '/om-oss/', keyword: 'utleiefirma for AV-utstyr i Malaga', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'kontakt for utleie av AV-utstyr i Malaga', status: 'propuesta' },
		'/equipment/': { path: '/utstyr/', keyword: 'leie lyd- og lysutstyr i Malaga', status: 'propuesta' },
		'/packages/': { path: '/pakker/', keyword: 'utleiepakker til arrangementer i Malaga', status: 'propuesta' },
		'/faq/': { path: '/ofte-stilte-sporsmal/', keyword: 'ofte stilte spørsmål om utstyrsutleie i Malaga', status: 'propuesta' },
		'/meet-the-team/': { path: '/mot-teamet/', keyword: 'lydteknikere i Malaga', status: 'propuesta' },
		'/blog/': { path: '/blogg/', keyword: 'blogg om utstyrsutleie i Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blogg/kategorier/', keyword: 'bloggkategorier Malaga Event Gear', status: 'propuesta' },
		'/sitemap/': { path: '/nettstedskart/', keyword: 'nettstedskart Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': {
			path: '/personvernerklaering/',
			keyword: 'personvernerklæring Malaga Event Gear',
			status: 'propuesta'
		},
		'/terms-of-service/': {
			path: '/vilkar-og-betingelser/',
			keyword: 'vilkår og betingelser for utstyrsutleie',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/gdpr/', keyword: 'personvern og GDPR hos Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookieerklaering/', keyword: 'cookieerklæring Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/takk/' }
	},
	segments: { category: 'kategori', author: 'forfatter' },
	packages: {
		eco: { slug: 'eco-pakke', keyword: 'leie lyd og lys til liten fest i Malaga', status: 'propuesta' },
		wedding: { slug: 'bryllupspakke', keyword: 'leie lyd og lys til bryllup i Malaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktlansering-pakke',
			keyword: 'leie prosjektor til produktlansering i Malaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-grunnpakke',
			keyword: 'AV-utstyr til mindre bedriftsmøter i Malaga',
			status: 'propuesta'
		},
		mice: { slug: 'mice-pakke', keyword: 'AV-utstyr til konferanser i Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'utleie-av-utstyr', name: 'Utleie av AV-utstyr' },
		'corporate-enterprise': { slug: 'bedrift-naeringsliv', name: 'Bedrift og næringsliv' },
		events: { slug: 'arrangementer', name: 'Arrangementer' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'nyheter', name: 'Nyheter' },
		weddings: { slug: 'bryllup', name: 'Bryllup' }
	},
	posts: {
		'event-technology-service': {
			slug: 'lys-og-sceneteknikk',
			keyword: 'lys- og sceneteknikk Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
