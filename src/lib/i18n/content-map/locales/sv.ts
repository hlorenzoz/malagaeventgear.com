import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'hyra eventteknik Malaga', status: 'propuesta' },
		'/about-us/': { path: '/om-oss/', keyword: 'uthyrningsföretag AV-utrustning Malaga', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'offert eventteknik Malaga', status: 'propuesta' },
		'/equipment/': { path: '/utrustning/', keyword: 'hyra ljud- och ljusutrustning', status: 'propuesta' },
		'/packages/': { path: '/paket/', keyword: 'eventpaket priser Malaga', status: 'propuesta' },
		'/faq/': { path: '/vanliga-fragor/', keyword: 'vanliga frågor om att hyra eventteknik', status: 'propuesta' },
		'/meet-the-team/': { path: '/vart-team/', keyword: 'eventtekniker Malaga', status: 'propuesta' },
		'/blog/': { path: '/blogg/', keyword: 'eventteknik blogg', status: 'propuesta' },
		'/blog/categories/': { path: '/blogg/kategorier/', keyword: 'bloggkategorier eventteknik', status: 'propuesta' },
		'/sitemap/': { path: '/webbplatskarta/', keyword: 'webbplatskarta Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/integritetspolicy/', keyword: 'integritetspolicy Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': {
			path: '/allmanna-villkor/',
			keyword: 'allmänna villkor Malaga Event Gear',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/gdpr/', keyword: 'GDPR Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookiepolicy/', keyword: 'cookiepolicy Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/tack/' }
	},
	segments: { category: 'kategori', author: 'forfattare' },
	packages: {
		eco: { slug: 'eco-paket', keyword: 'hyra billigt festpaket Malaga', status: 'propuesta' },
		wedding: { slug: 'brollop-paket', keyword: 'hyra ljud och ljus till bröllop', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktpresentation-paket',
			keyword: 'hyra projektor och duk till presentation',
			status: 'propuesta'
		},
		'basic-mice': { slug: 'mice-grund-paket', keyword: 'hyra konferensutrustning för mindre möten', status: 'propuesta' },
		mice: { slug: 'mice-paket', keyword: 'hyra kongressteknik Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'av-uthyrning', name: 'AV-uthyrning' },
		'corporate-enterprise': { slug: 'foretag', name: 'Företag och näringsliv' },
		events: { slug: 'evenemang', name: 'Evenemang' },
		gadgets: { slug: 'prylar', name: 'Prylar' },
		news: { slug: 'nyheter', name: 'Nyheter' },
		weddings: { slug: 'brollop', name: 'Bröllop' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'av-uthyrning-malaga',
			keyword: 'AV-uthyrning Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'av-uthyrning-konferenser',
			keyword: 'AV-uthyrning för konferenser Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'av-uthyrning-foretagsevenemang',
			keyword: 'AV-uthyrning för företagsevenemang i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'av-uthyrning-produktlanseringar',
			keyword: 'AV-uthyrning för produktlanseringar i Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'ljus-och-scenteknik',
			keyword: 'ljus- och scenteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'av-uthyrning-foretagsmoten',
			keyword: 'AV-uthyrning för företagsmöten i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'av-uthyrning-presskonferenser',
			keyword: 'AV-uthyrning för presskonferenser i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'av-uthyrning-seminarier',
			keyword: 'AV-uthyrning för seminarier i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'av-uthyrning-massor',
			keyword: 'AV-uthyrning för mässor i Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'uthyrning-av-audiovisuell-utrustning',
			keyword: 'uthyrning av audiovisuell utrustning Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'hyra-mygga-och-headset',
			keyword: 'hyra mygga och headset Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'hyra-scenbelysning',
			keyword: 'hyra scenbelysning Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'hyra-uplighting',
			keyword: 'hyra uplighting Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'scenbelysning-brollop',
			keyword: 'scenbelysning för bröllop i Malaga',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: 'belysningsideer-brollop',
			keyword: 'belysningsidéer till bröllop i Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'hyra-rokmaskin',
			keyword: 'hyra rökmaskin Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'uthyrning-till-brollop',
			keyword: 'uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'how-to-choose-wedding-rentals': {
			slug: 'sa-valjer-du-ratt-uthyrning-till-brollop',
			keyword: 'så väljer du rätt uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'ljud-till-vigseln',
			keyword: 'ljud till vigseln i Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'uthyrning-utomhusbrollop',
			keyword: 'uthyrning till utomhusbröllop i Malaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'uthyrning-inomhusbrollop',
			keyword: 'uthyrning till inomhusbröllop i Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'det-viktigaste-uthyrning-brollop-malaga',
			keyword: 'det viktigaste vid uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'fa-ut-mest-av-din-brollopsuthyrning',
			keyword: 'få ut mest av din bröllopsuthyrning i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'boka-brollopsuthyrning-online',
			keyword: 'boka bröllopsuthyrning online i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'uthyrning-brollop-nara-mig',
			keyword: 'uthyrning till bröllop nära mig',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: 'hallbar-uthyrning-brollop-malaga',
			keyword: 'hållbar uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'spara-pengar-pa-uthyrning-till-brollop',
			keyword: 'spara pengar på uthyrning till bröllop',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'fragor-att-stalla-vid-uthyrning-till-brollop',
			keyword: 'frågor att ställa vid uthyrning till bröllop',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'for-och-nackdelar-uthyrning-brollop',
			keyword: 'för- och nackdelar med uthyrning till bröllop',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'helhetspaket-uthyrning-till-brollop',
			keyword: 'helhetspaket för uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'jamfora-offerter-uthyrning-till-brollop',
			keyword: 'jämföra offerter för uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'senaste-trenderna-uthyrning-till-brollop',
			keyword: 'senaste trenderna inom uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'andringar-i-sista-minuten-uthyrning-till-brollop',
			keyword: 'ändringar i sista minuten vid uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'skadeskydd-uthyrning-till-brollop',
			keyword: 'skadeskydd vid uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'nar-du-ska-boka-uthyrning-till-brollop',
			keyword: 'när du ska boka uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'vaderplanering-uthyrning-till-brollop',
			keyword: 'väderplanering vid uthyrning till bröllop i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'av-uthyrning-utbildningar',
			keyword: 'AV-uthyrning för utbildningar i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'av-uthyrning-galamiddagar',
			keyword: 'AV-uthyrning för galamiddagar i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'av-uthyrning-distanspresentationer',
			keyword: 'AV-uthyrning för distanspresentationer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'av-uthyrning-virtuella-evenemang',
			keyword: 'AV-uthyrning för virtuella evenemang i Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'audiovisuell-produktion-progold-summit-2026-torremolinos',
			keyword: 'audiovisuell produktion PROGOLD SUMMIT 2026 Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'monterskarmar-ecoc-2026-malaga',
			keyword: 'monterskärmar ECOC 2026 Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'audiovisuell-produktion-bmotion-benahavis',
			keyword: 'audiovisuell produktion Bmotion Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'teknisk-support-bmotion-marbella',
			keyword: 'teknisk support Bmotion Marbella',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'av-uthyrning-brollop',
			keyword: 'AV-uthyrning för bröllop i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'av-uthyrning-idrottsevenemang',
			keyword: 'AV-uthyrning för idrottsevenemang i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'av-uthyrning-mindre-foretag',
			keyword: 'AV-uthyrning för mindre företag i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'av-uthyrning-religiosa-evenemang',
			keyword: 'AV-uthyrning för religiösa evenemang i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'av-uthyrning-utomhusevenemang',
			keyword: 'AV-uthyrning för utomhusevenemang i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'av-uthyrning-musikframtraedanden',
			keyword: 'AV-uthyrning för musikframträdanden i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'av-uthyrning-valgorenhetsevenemang',
			keyword: 'AV-uthyrning för välgörenhetsevenemang i Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
