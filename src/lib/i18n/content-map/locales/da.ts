import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'leje AV-udstyr Malaga', status: 'propuesta' },
		'/about-us/': { path: '/om-os/', keyword: 'AV-udlejningsfirma Malaga', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'kontakt udlejning AV-udstyr Malaga', status: 'propuesta' },
		'/equipment/': { path: '/udstyr/', keyword: 'leje lyd- og lysudstyr Malaga', status: 'propuesta' },
		'/packages/': { path: '/pakker/', keyword: 'udlejningspakker til events Malaga', status: 'propuesta' },
		'/faq/': { path: '/faq/', keyword: 'ofte stillede spørgsmål udstyrsudlejning Malaga', status: 'propuesta' },
		'/meet-the-team/': { path: '/mod-teamet/', keyword: 'lydteknikere Malaga', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog om udstyrsudlejning Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/kategorier/', keyword: 'blogkategorier Malaga Event Gear', status: 'propuesta' },
		'/sitemap/': { path: '/sitemap/', keyword: 'sitemap Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/privatlivspolitik/', keyword: 'privatlivspolitik Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': {
			path: '/vilkar-og-betingelser/',
			keyword: 'vilkår og betingelser udstyrsudlejning',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/gdpr/', keyword: 'GDPR databeskyttelse Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookiepolitik/', keyword: 'cookiepolitik Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/tak/' }
	},
	segments: { category: 'kategori', author: 'forfatter' },
	packages: {
		eco: { slug: 'eco-pakke', keyword: 'leje lyd og lys til lille fest Malaga', status: 'propuesta' },
		wedding: { slug: 'bryllupspakke', keyword: 'leje lyd og lys til bryllup Malaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktlancering-pakke',
			keyword: 'leje projektor til produktlancering Malaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-basis-pakke',
			keyword: 'AV-udstyr til mindre erhvervsmøder Malaga',
			status: 'propuesta'
		},
		mice: { slug: 'mice-pakke', keyword: 'AV-udstyr til konferencer Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'udlejning-av-udstyr', name: 'Udlejning af AV-udstyr' },
		'corporate-enterprise': { slug: 'erhverv-virksomheder', name: 'Erhverv og virksomheder' },
		events: { slug: 'begivenheder', name: 'Begivenheder' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'nyheder', name: 'Nyheder' },
		weddings: { slug: 'bryllupper', name: 'Bryllupper' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'av-udlejning-malaga',
			keyword: 'AV-udlejning Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'lys-og-sceneteknik',
			keyword: 'lys- og sceneteknik Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'udlejning-af-audiovisuelt-udstyr',
			keyword: 'udlejning af audiovisuelt udstyr Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'leje-headset-og-knaphulsmikrofon',
			keyword: 'leje headset og knaphulsmikrofon Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'leje-af-scenelys',
			keyword: 'leje af scenelys Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'leje-af-uplighting',
			keyword: 'leje af uplighting Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'scenelys-til-bryllup',
			keyword: 'scenelys til bryllup i Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'leje-rogmaskine',
			keyword: 'leje røgmaskine Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'udlejning-til-bryllup',
			keyword: 'udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'lyd-til-vielsen',
			keyword: 'lyd til vielsen i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'book-bryllupsudlejning-online',
			keyword: 'book bryllupsudlejning online i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'udlejning-bryllup-naerheden-af-mig',
			keyword: 'udlejning til bryllup i nærheden af mig',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'spare-penge-pa-udlejning-til-bryllup',
			keyword: 'spare penge på udlejning til bryllup',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'sporgsmal-at-stille-ved-udlejning-til-bryllup',
			keyword: 'spørgsmål at stille ved udlejning til bryllup',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
