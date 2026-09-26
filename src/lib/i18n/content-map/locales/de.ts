import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'Veranstaltungstechnik mieten Malaga', status: 'propuesta' },
		'/about-us/': {
			path: '/ueber-uns/',
			keyword: 'Verleihfirma für Veranstaltungstechnik Malaga',
			status: 'propuesta'
		},
		'/contact/': {
			path: '/kontakt/',
			keyword: 'Veranstaltungstechnik Angebot anfordern Malaga',
			status: 'propuesta'
		},
		'/equipment/': { path: '/ausruestung/', keyword: 'Ton- und Lichttechnik mieten Malaga', status: 'propuesta' },
		'/packages/': { path: '/pakete/', keyword: 'Eventtechnik Pakete Preise Malaga', status: 'propuesta' },
		'/faq/': { path: '/haeufige-fragen/', keyword: 'Veranstaltungstechnik mieten Fragen', status: 'propuesta' },
		'/meet-the-team/': { path: '/unser-team/', keyword: 'Veranstaltungstechniker Malaga', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'Eventtechnik Blog Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/kategorien/', keyword: 'Blog Kategorien Eventtechnik', status: 'propuesta' },
		'/sitemap/': { path: '/sitemap/', keyword: 'Sitemap Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/datenschutz/', keyword: 'Datenschutzerklärung Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': { path: '/agb/', keyword: 'AGB Malaga Event Gear', status: 'propuesta' },
		'/gdpr/': { path: '/dsgvo/', keyword: 'DSGVO Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookie-richtlinie/', keyword: 'Cookie-Richtlinie Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/danke/' }
	},
	segments: { category: 'kategorie', author: 'autor' },
	packages: {
		eco: { slug: 'eco-paket', keyword: 'Partyanlage mieten Malaga', status: 'propuesta' },
		wedding: { slug: 'hochzeits-paket', keyword: 'Hochzeitstechnik mieten Malaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktpraesentation-paket',
			keyword: 'Beamer Leinwand mieten Produktpräsentation',
			status: 'propuesta'
		},
		'basic-mice': { slug: 'mice-basis-paket', keyword: 'Tagungstechnik mieten Malaga', status: 'propuesta' },
		mice: { slug: 'mice-paket', keyword: 'Kongresstechnik mieten Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'av-verleih', name: 'AV-Verleih' },
		'corporate-enterprise': { slug: 'unternehmen', name: 'Unternehmen & Business' },
		events: { slug: 'veranstaltungen', name: 'Veranstaltungen' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'neuigkeiten', name: 'Neuigkeiten' },
		weddings: { slug: 'hochzeiten', name: 'Hochzeiten' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'av-vermietung-malaga',
			keyword: 'AV-Vermietung Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'av-vermietung-konferenzen',
			keyword: 'AV-Vermietung für Konferenzen Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'licht-und-buehnentechnik',
			keyword: 'Licht- und Bühnentechnik Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'av-technik-verleih',
			keyword: 'AV-Technik-Verleih Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'headset-ansteckmikrofon-mieten',
			keyword: 'Headset und Ansteckmikrofon mieten Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'buehnenbeleuchtung-mieten',
			keyword: 'Bühnenbeleuchtung mieten Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'uplighting-mieten',
			keyword: 'Uplighting mieten Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'buehnenbeleuchtung-hochzeit',
			keyword: 'Bühnenbeleuchtung für Hochzeiten in Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'nebelmaschine-mieten',
			keyword: 'Nebelmaschine mieten Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'hochzeitsverleih',
			keyword: 'Hochzeitsverleih in Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'tontechnik-trauung',
			keyword: 'Tontechnik für die Trauung in Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'hochzeitsverleih-online-buchen',
			keyword: 'Hochzeitsverleih online buchen in Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'hochzeitsverleih-in-meiner-naehe',
			keyword: 'Hochzeitsverleih in meiner Nähe',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'kosten-beim-hochzeitsverleih-sparen',
			keyword: 'Kosten beim Hochzeitsverleih sparen',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'fragen-an-den-hochzeitsverleih',
			keyword: 'Fragen an den Hochzeitsverleih',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
