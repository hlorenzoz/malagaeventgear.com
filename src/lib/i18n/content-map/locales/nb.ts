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
		'audio-visual-rental': {
			slug: 'av-utleie-i-malaga',
			keyword: 'AV-utleie i Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'lys-og-sceneteknikk',
			keyword: 'lys- og sceneteknikk Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'utleie-av-audiovisuelt-utstyr',
			keyword: 'utleie av audiovisuelt utstyr i Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'leie-mygg-og-headset',
			keyword: 'leie mygg og headset i Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'leie-av-scenelys',
			keyword: 'leie av scenelys i Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'leie-av-uplighting',
			keyword: 'leie av uplighting i Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'scenelys-til-bryllup',
			keyword: 'scenelys til bryllup i Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'leie-roykmaskin',
			keyword: 'leie røykmaskin i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'utleie-til-bryllup',
			keyword: 'utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'lyd-til-vielsen',
			keyword: 'lyd til vielsen i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'bestille-bryllupsutleie-pa-nett',
			keyword: 'bestille bryllupsutleie på nett i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'utleie-bryllup-naerheten-av-meg',
			keyword: 'utleie til bryllup i nærheten av meg',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'spare-penger-pa-utleie-til-bryllup',
			keyword: 'spare penger på utleie til bryllup',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'sporsmal-a-stille-ved-utleie-til-bryllup',
			keyword: 'spørsmål å stille ved utleie til bryllup',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
