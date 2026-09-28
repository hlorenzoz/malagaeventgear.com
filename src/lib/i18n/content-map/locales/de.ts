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
		'audio-visual-rental-for-corporate-events': {
			slug: 'av-vermietung-firmenveranstaltungen',
			keyword: 'AV-Vermietung für Firmenveranstaltungen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'av-vermietung-produkteinfuehrungen',
			keyword: 'AV-Vermietung für Produkteinführungen in Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'licht-und-buehnentechnik',
			keyword: 'Licht- und Bühnentechnik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'av-vermietung-firmenmeetings',
			keyword: 'AV-Vermietung für Firmenmeetings in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'av-vermietung-pressekonferenzen',
			keyword: 'AV-Vermietung für Pressekonferenzen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'av-vermietung-seminare',
			keyword: 'AV-Vermietung für Seminare in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'av-vermietung-messen',
			keyword: 'AV-Vermietung für Messen in Malaga',
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
		'outdoor-wedding-rental-considerations': {
			slug: 'hochzeitsverleih-im-freien',
			keyword: 'Hochzeitsverleih im Freien in Malaga',
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
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'vor-und-nachteile-hochzeitsverleih',
			keyword: 'Vor- und Nachteile des Hochzeitsverleihs',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'av-vermietung-schulungen',
			keyword: 'AV-Vermietung für Schulungen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'av-vermietung-galadinner',
			keyword: 'AV-Vermietung für Galadinner in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'av-vermietung-remote-praesentationen',
			keyword: 'AV-Vermietung für Remote-Präsentationen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'av-vermietung-virtuelle-events',
			keyword: 'AV-Vermietung für virtuelle Events in Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'audiovisuelle-produktion-progold-summit-2026-torremolinos',
			keyword: 'audiovisuelle Produktion PROGOLD SUMMIT 2026 Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'standbildschirme-ecoc-2026-malaga',
			keyword: 'Standbildschirme ECOC 2026 Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'audiovisuelle-produktion-bmotion-benahavis',
			keyword: 'audiovisuelle Produktion Bmotion Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'technischer-support-bmotion-marbella',
			keyword: 'technischer Support Bmotion Marbella',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
