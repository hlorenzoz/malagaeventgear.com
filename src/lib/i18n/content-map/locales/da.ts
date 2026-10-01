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
		'sound-system-rental': {
			slug: 'leje-lydanlaeg',
			keyword: 'leje lydanlæg i Malaga',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: 'leje-projektor',
			keyword: 'leje projektor i Malaga',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: 'leje-tv-skaerm',
			keyword: 'leje tv-skærm i Malaga',
			status: 'propuesta'
		},
		'av-technician-hire': {
			slug: 'leje-av-tekniker',
			keyword: 'leje en AV-tekniker i Malaga',
			status: 'propuesta'
		},
		'technical-support-for-events': {
			slug: 'teknisk-support-events',
			keyword: 'teknisk support til events i Malaga',
			status: 'propuesta'
		},
		'stage-monitor-rental': {
			slug: 'leje-af-scenemonitor',
			keyword: 'leje af scenemonitor i Malaga',
			status: 'propuesta'
		},
		'video-switcher-rental': {
			slug: 'leje-videoswitcher',
			keyword: 'leje videoswitcher i Malaga',
			status: 'propuesta'
		},
		'audio-system-calibration': {
			slug: 'kalibrering-lydanlaeg',
			keyword: 'kalibrering af lydanlæg i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental': {
			slug: 'av-udlejning-malaga',
			keyword: 'AV-udlejning Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'konferenceteknik',
			keyword: 'konferenceteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'av-udlejning-firmaevents',
			keyword: 'AV-udlejning til firmaevents i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'produktlanceringsteknik',
			keyword: 'produktlanceringsteknik Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'lys-og-sceneteknik',
			keyword: 'lys- og sceneteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'modeteknik',
			keyword: 'mødeteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'av-udlejning-pressemoder',
			keyword: 'AV-udlejning til pressemøder i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'seminarteknik',
			keyword: 'seminarteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'messeteknik',
			keyword: 'messeteknik Malaga',
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
		'lighting-ideas-for-wedding-rentals': {
			slug: 'lysideer-bryllup',
			keyword: 'lysidéer til bryllup i Malaga',
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
		'how-to-choose-wedding-rentals': {
			slug: 'sadan-vaelger-du-den-rigtige-udlejning-til-bryllup',
			keyword: 'sådan vælger du den rigtige udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'lyd-til-vielsen',
			keyword: 'lyd til vielsen i Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'udlejning-udendors-bryllup',
			keyword: 'udlejning til udendørs bryllup i Malaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'udlejning-indendors-bryllup',
			keyword: 'udlejning til indendørs bryllup i Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'det-vigtigste-udlejning-bryllup-malaga',
			keyword: 'det vigtigste ved udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'fa-mest-muligt-ud-af-din-bryllupsudlejning',
			keyword: 'få mest muligt ud af din bryllupsudlejning i Malaga',
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
		'eco-friendly-wedding-rental-options': {
			slug: 'baeredygtig-udlejning-bryllup-malaga',
			keyword: 'bæredygtig udlejning til bryllup i Malaga',
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
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'fordele-og-ulemper-udlejning-bryllup',
			keyword: 'fordele og ulemper ved udlejning til bryllup',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'udlejning-bryllup-helhedspakke',
			keyword: 'udlejning til bryllup som helhedspakke i Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'sammenligne-tilbud-udlejning-til-bryllup',
			keyword: 'sammenligne tilbud på udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'seneste-trends-udlejning-til-bryllup',
			keyword: 'seneste trends inden for udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'aendringer-i-sidste-ojeblik-udlejning-til-bryllup',
			keyword: 'ændringer i sidste øjeblik ved udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'skadesbeskyttelse-udlejning-til-bryllup',
			keyword: 'skadesbeskyttelse ved udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'hvornar-du-skal-booke-udlejning-til-bryllup',
			keyword: 'hvornår du skal booke udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'vejrplanlaegning-udlejning-til-bryllup',
			keyword: 'vejrplanlægning ved udlejning til bryllup i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'kursusteknik',
			keyword: 'kursusteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'gallamiddagsteknik',
			keyword: 'gallamiddagsteknik Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'av-udlejning-fjernpraesentationer',
			keyword: 'AV-udlejning til fjernpræsentationer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'av-udlejning-virtuelle-events',
			keyword: 'AV-udlejning til virtuelle events i Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'audiovisuel-produktion-progold-summit-2026-torremolinos',
			keyword: 'audiovisuel produktion PROGOLD SUMMIT 2026 Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'standskaerme-ecoc-2026-malaga',
			keyword: 'standskærme ECOC 2026 Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'audiovisuel-produktion-bmotion-benahavis',
			keyword: 'audiovisuel produktion Bmotion Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'teknisk-support-bmotion-marbella',
			keyword: 'teknisk support Bmotion Marbella',
			status: 'propuesta'
		},
		'7-years-of-support-for-neighborhood-council-community-meeting-in-malaga-spain': {
			slug: 'neighborhood-councils-borgermoede-malaga',
			keyword: 'Neighborhood Councils borgermøde i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'av-udlejning-bryllupper',
			keyword: 'AV-udlejning til bryllupper i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'av-udlejning-sportsevents',
			keyword: 'AV-udlejning til sportsevents i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'av-udlejning-mindre-virksomheder',
			keyword: 'AV-udlejning til mindre virksomheder i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'av-udlejning-religiose-arrangementer',
			keyword: 'AV-udlejning til religiøse arrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'av-udlejning-udendors-arrangementer',
			keyword: 'AV-udlejning til udendørs arrangementer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'av-udlejning-musikoptraedener',
			keyword: 'AV-udlejning til musikoptrædener i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'av-udlejning-velgorenhedsevents',
			keyword: 'AV-udlejning til velgørenhedsevents i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-art-exhibitions': {
			slug: 'av-udlejning-kunstudstillinger',
			keyword: 'AV-udlejning til kunstudstillinger i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-private-parties': {
			slug: 'av-udlejning-privatfester',
			keyword: 'AV-udlejning til privatfester i Malaga',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: 'av-udlejning-i-naerheden-af-mig',
			keyword: 'AV-udlejning i nærheden af mig',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: 'lyd-og-videoudlejning-i-naerheden-af-mig',
			keyword: 'lyd- og videoudlejning i nærheden af mig',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: 'sadan-fungerer-av-udlejning',
			keyword: 'sådan fungerer AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: 'tilpasse-pakker-til-av-udlejning',
			keyword: 'tilpasse pakker til AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'av-equipment-consultations': {
			slug: 'radgivning-av-udlejning',
			keyword: 'rådgivning om AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'av-cable-management': {
			slug: 'kabelhandtering-til-av',
			keyword: 'kabelhåndtering til AV i Malaga',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: 'fordele-ved-av-udlejning',
			keyword: 'fordele ved AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: 'almindelige-fejl-ved-av-udlejning',
			keyword: 'almindelige fejl ved AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: 'av-udlejningsfirmaer',
			keyword: 'AV-udlejningsfirmaer i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: 'av-udlejningsvirksomhed-malaga',
			keyword: 'AV-udlejningsvirksomhed i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-safety-guidelines': {
			slug: 'sikkerhedsretningslinjer-av-udlejning-malaga',
			keyword: 'sikkerhedsretningslinjer for AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-planning-timeline': {
			slug: 'tidsplan-for-av-udlejning',
			keyword: 'tidsplan for AV-udlejning i Malaga',
			status: 'propuesta'
		},
		'av-system-troubleshooting': {
			slug: 'fejlfinding-pa-av-systemer',
			keyword: 'fejlfinding på AV-systemer i Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
