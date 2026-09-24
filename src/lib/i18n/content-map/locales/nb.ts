import type { LocaleContentMap } from '../schema';

export default {
	pages: {
		'/': { path: '/', keyword: 'leie av-utstyr Malaga', status: 'propuesta' },
		'/about-us/': { path: '/om-oss/', keyword: 'av-utstyr utleiefirma Malaga', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'kontakt utleie av-utstyr Malaga', status: 'propuesta' },
		'/equipment/': { path: '/utstyr/', keyword: 'leie lyd- og lysutstyr Malaga', status: 'propuesta' },
		'/packages/': { path: '/pakker/', keyword: 'utleiepakker til arrangement Malaga', status: 'propuesta' },
		'/faq/': { path: '/ofte-stilte-sporsmal/', keyword: 'ofte stilte spørsmål utstyrsutleie Malaga', status: 'propuesta' },
		'/meet-the-team/': { path: '/mot-teamet/', keyword: 'lydteknikere Malaga', status: 'propuesta' },
		'/blog/': { path: '/blogg/', keyword: 'blogg om utstyrsutleie Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blogg/kategorier/', keyword: 'bloggkategorier Malaga Event Gear', status: 'propuesta' },
		'/sitemap/': { path: '/nettstedskart/', keyword: 'nettstedskart Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': {
			path: '/personvernerklaering/',
			keyword: 'personvernerklæring Malaga Event Gear',
			status: 'propuesta'
		},
		'/terms-of-service/': {
			path: '/vilkar-og-betingelser/',
			keyword: 'vilkår og betingelser utstyrsutleie',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/gdpr/', keyword: 'GDPR personvern Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookieerklaering/', keyword: 'cookieerklæring Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/takk/' }
	},
	segments: { category: 'kategori', author: 'forfatter' },
	packages: {
		eco: { slug: 'eco-pakke', keyword: 'leie lyd og lys til liten fest Malaga', status: 'propuesta' },
		wedding: { slug: 'bryllupspakke', keyword: 'leie bryllupsutstyr lyd og lys Malaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktlansering-pakke',
			keyword: 'leie prosjektor til produktlansering Malaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-grunnpakke',
			keyword: 'av-utstyr til mindre bedriftsmøter Malaga',
			status: 'propuesta'
		},
		mice: { slug: 'mice-pakke', keyword: 'av-utstyr til konferanser Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'utleie-av-utstyr', name: 'Utleie av AV-utstyr' },
		'corporate-enterprise': { slug: 'bedrift-naeringsliv', name: 'Bedrift & Næringsliv' },
		events: { slug: 'arrangementer', name: 'Arrangementer' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'nyheter', name: 'Nyheter' },
		weddings: { slug: 'bryllup', name: 'Bryllup' }
	},
	posts: {}
} satisfies LocaleContentMap;
