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
		'sound-system-rental': {
			slug: 'leie-lydanlegg',
			keyword: 'leie lydanlegg i Malaga',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: 'leie-prosjektor',
			keyword: 'leie prosjektor i Malaga',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: 'leie-tv-skjerm',
			keyword: 'leie TV-skjerm i Malaga',
			status: 'propuesta'
		},
		'av-technician-hire': {
			slug: 'leie-av-tekniker',
			keyword: 'leie en AV-tekniker i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental': {
			slug: 'av-utleie-i-malaga',
			keyword: 'AV-utleie i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'konferanseteknikk',
			keyword: 'konferanseteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'av-utleie-bedriftsarrangementer',
			keyword: 'AV-utleie til bedriftsarrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'produktlanseringsteknikk',
			keyword: 'produktlanseringsteknikk Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'lys-og-sceneteknikk',
			keyword: 'lys- og sceneteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'moteteknikk',
			keyword: 'møteteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'av-utleie-pressekonferanser',
			keyword: 'AV-utleie til pressekonferanser i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'seminarteknikk',
			keyword: 'seminarteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'messeteknikk',
			keyword: 'messeteknikk Malaga',
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
		'lighting-ideas-for-wedding-rentals': {
			slug: 'lysideer-bryllup',
			keyword: 'lysideer til bryllup i Malaga',
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
		'how-to-choose-wedding-rentals': {
			slug: 'slik-velger-du-riktig-utleie-til-bryllup',
			keyword: 'slik velger du riktig utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'lyd-til-vielsen',
			keyword: 'lyd til vielsen i Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'utleie-utendors-bryllup',
			keyword: 'utleie til utendørs bryllup i Malaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'utleie-innendors-bryllup',
			keyword: 'utleie til innendørs bryllup i Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'det-viktigste-utleie-bryllup-malaga',
			keyword: 'det viktigste ved utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'fa-mest-mulig-ut-av-bryllupsutleien',
			keyword: 'få mest mulig ut av bryllupsutleien i Malaga',
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
		'eco-friendly-wedding-rental-options': {
			slug: 'baerekraftig-utleie-bryllup-malaga',
			keyword: 'bærekraftig utleie til bryllup i Malaga',
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
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'fordeler-og-ulemper-utleie-bryllup',
			keyword: 'fordeler og ulemper ved utleie til bryllup',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'helhetspakker-utleie-til-bryllup',
			keyword: 'helhetspakker for utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'sammenligne-tilbud-utleie-til-bryllup',
			keyword: 'sammenligne tilbud på utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'nyeste-trendene-utleie-til-bryllup',
			keyword: 'nyeste trendene innen utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'endringer-i-siste-liten-utleie-til-bryllup',
			keyword: 'endringer i siste liten ved utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'skadebeskyttelse-utleie-til-bryllup',
			keyword: 'skadebeskyttelse ved utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'nar-du-skal-bestille-utleie-til-bryllup',
			keyword: 'når du skal bestille utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'vaerplanlegging-utleie-til-bryllup',
			keyword: 'værplanlegging ved utleie til bryllup i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'kursteknikk',
			keyword: 'kursteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'gallamiddagsteknikk',
			keyword: 'gallamiddagsteknikk Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'av-utleie-fjernpresentasjoner',
			keyword: 'AV-utleie til fjernpresentasjoner i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'av-utleie-virtuelle-arrangementer',
			keyword: 'AV-utleie til virtuelle arrangementer i Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'audiovisuell-produksjon-progold-summit-2026-torremolinos',
			keyword: 'audiovisuell produksjon PROGOLD SUMMIT 2026 Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'standskjermer-ecoc-2026-malaga',
			keyword: 'standskjermer ECOC 2026 Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'audiovisuell-produksjon-bmotion-benahavis',
			keyword: 'audiovisuell produksjon Bmotion Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'teknisk-support-bmotion-marbella',
			keyword: 'teknisk support Bmotion Marbella',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'av-utleie-bryllup',
			keyword: 'AV-utleie for bryllup i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'av-utleie-idrettsarrangementer',
			keyword: 'AV-utleie til idrettsarrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'av-utleie-mindre-bedrifter',
			keyword: 'AV-utleie til mindre bedrifter i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'av-utleie-religiose-arrangementer',
			keyword: 'AV-utleie til religiøse arrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'av-utleie-utendorsarrangementer',
			keyword: 'AV-utleie til utendørsarrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'av-utleie-musikkopptredener',
			keyword: 'AV-utleie til musikkopptredener i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'av-utleie-veldedighetsarrangementer',
			keyword: 'AV-utleie til veldedighetsarrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: 'av-utleie-i-naerheten-av-meg',
			keyword: 'AV-utleie i nærheten av meg',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: 'lyd-og-videoutleie-i-naerheten-av-meg',
			keyword: 'lyd- og videoutleie i nærheten av meg',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: 'slik-fungerer-av-utleie',
			keyword: 'slik fungerer AV-utleie i Malaga',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: 'tilpasse-pakker-for-av-utleie',
			keyword: 'tilpasse pakker for AV-utleie i Malaga',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: 'fordeler-med-av-utleie',
			keyword: 'fordeler med AV-utleie i Malaga',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: 'vanlige-feil-ved-av-utleie',
			keyword: 'vanlige feil ved AV-utleie i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: 'av-utleiefirmaer',
			keyword: 'AV-utleiefirmaer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: 'av-utleiefirma-i-malaga',
			keyword: 'AV-utleiefirma i Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
