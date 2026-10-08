import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'noleggio attrezzature audiovisive a Malaga', status: 'propuesta' },
		'/about-us/': {
			path: '/chi-siamo/',
			keyword: 'azienda di noleggio audiovisivi a Malaga',
			status: 'propuesta'
		},
		'/contact/': {
			path: '/contatti/',
			keyword: 'preventivo noleggio audiovisivi Malaga',
			status: 'propuesta'
		},
		'/equipment/': {
			path: '/attrezzature/',
			keyword: 'catalogo noleggio attrezzature audiovisive',
			status: 'propuesta'
		},
		'/packages/': {
			path: '/pacchetti/',
			keyword: 'prezzi noleggio audiovisivi Malaga',
			status: 'propuesta'
		},
		'/faq/': {
			path: '/domande-frequenti/',
			keyword: 'domande frequenti noleggio audiovisivi',
			status: 'propuesta'
		},
		'/meet-the-team/': {
			path: '/il-nostro-team/',
			keyword: 'tecnici audiovisivi Malaga Event Gear',
			status: 'propuesta'
		},
		'/blog/': {
			path: '/blog/',
			keyword: 'blog noleggio audiovisivi ed eventi Malaga',
			status: 'propuesta'
		},
		'/blog/categories/': {
			path: '/blog/categorie/',
			keyword: 'categorie del blog eventi',
			status: 'propuesta'
		},
		'/sitemap/': {
			path: '/mappa-del-sito/',
			keyword: 'mappa del sito Malaga Event Gear',
			status: 'propuesta'
		},
		'/privacy-policy/': {
			path: '/informativa-privacy/',
			keyword: 'informativa privacy Malaga Event Gear',
			status: 'propuesta'
		},
		'/terms-of-service/': {
			path: '/termini-e-condizioni/',
			keyword: 'termini e condizioni Malaga Event Gear',
			status: 'propuesta'
		},
		'/gdpr/': {
			path: '/gdpr/',
			keyword: 'protezione dati GDPR Malaga Event Gear',
			status: 'propuesta'
		},
		'/cookie-policy/': {
			path: '/informativa-cookie/',
			keyword: 'informativa cookie Malaga Event Gear',
			status: 'propuesta'
		},
		'/thank-you/': { path: '/grazie/' }
	},
	segments: { category: 'categoria', author: 'autore' },
	packages: {
		eco: { slug: 'eco', keyword: 'noleggio audio e luci economico Malaga', status: 'propuesta' },
		wedding: {
			slug: 'matrimonio',
			keyword: 'noleggio audio e luci per matrimoni Malaga',
			status: 'propuesta'
		},
		'product-presentation': {
			slug: 'presentazione-prodotto',
			keyword: 'noleggio proiettore e schermo per presentazioni Malaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-base',
			keyword: 'noleggio audiovisivi per riunioni aziendali Malaga',
			status: 'propuesta'
		},
		mice: {
			slug: 'mice',
			keyword: 'noleggio audiovisivi per congressi e conferenze Malaga',
			status: 'propuesta'
		}
	},
	categories: {
		'audio-visual-rental': { slug: 'noleggio-audiovisivi', name: 'Noleggio audiovisivi' },
		'corporate-enterprise': { slug: 'aziende', name: 'Aziende' },
		events: { slug: 'eventi', name: 'Eventi' },
		gadgets: { slug: 'gadget', name: 'Gadget' },
		news: { slug: 'notizie', name: 'Notizie' },
		weddings: { slug: 'matrimoni', name: 'Matrimoni' }
	},
	posts: {
		'sound-system-rental': {
			slug: 'noleggio-impianto-audio-malaga',
			keyword: 'noleggio impianto audio a Malaga',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: 'noleggio-proiettore-malaga',
			keyword: 'noleggio proiettore a Malaga',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: 'noleggio-schermo-tv-malaga',
			keyword: 'noleggio schermo TV a Malaga',
			status: 'propuesta'
		},
		'av-technician-hire': {
			slug: 'noleggio-tecnico-audiovisivo-malaga',
			keyword: 'noleggio di un tecnico audiovisivo a Malaga',
			status: 'propuesta'
		},
		'technical-support-for-events': {
			slug: 'supporto-tecnico-eventi-malaga',
			keyword: 'supporto tecnico per eventi a Malaga',
			status: 'propuesta'
		},
		'stage-monitor-rental': {
			slug: 'noleggio-monitor-da-palco-malaga',
			keyword: 'noleggio monitor da palco a Malaga',
			status: 'propuesta'
		},
		'video-switcher-rental': {
			slug: 'noleggio-switcher-video-malaga',
			keyword: 'noleggio switcher video a Malaga',
			status: 'propuesta'
		},
		'audio-system-calibration': {
			slug: 'calibrazione-impianto-audio-malaga',
			keyword: "calibrazione dell'impianto audio a Malaga",
			status: 'propuesta'
		},
		'audio-visual-rental': {
			slug: 'noleggio-audiovisivo',
			keyword: 'noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'attrezzatura-audiovisiva-conferenze',
			keyword: 'attrezzatura audiovisiva per conferenze a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'noleggio-audiovisivo-eventi-aziendali',
			keyword: 'noleggio audiovisivo per eventi aziendali a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'attrezzatura-audiovisiva-lancio-prodotto',
			keyword: 'attrezzatura audiovisiva per il lancio di un prodotto a Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'luci-e-palco-per-eventi',
			keyword: 'luci e palco per eventi Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'attrezzatura-audiovisiva-riunioni-aziendali',
			keyword: 'attrezzatura audiovisiva per riunioni aziendali a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'attrezzatura-audiovisiva-conferenza-stampa',
			keyword: 'attrezzatura audiovisiva per conferenze stampa a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'attrezzatura-audiovisiva-seminari',
			keyword: 'attrezzatura audiovisiva per seminari a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'attrezzatura-audiovisiva-fiere',
			keyword: 'attrezzatura audiovisiva per fiere a Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'servizio-noleggio-audio-video',
			keyword: 'servizio di noleggio audio video a Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'noleggio-microfoni-lavalier-archetto',
			keyword: 'noleggio microfoni lavalier e ad archetto a Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'noleggio-luci-da-palco',
			keyword: 'noleggio luci da palco a Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'noleggio-uplighting',
			keyword: 'noleggio uplighting a Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'illuminazione-scenica-matrimoni',
			keyword: 'illuminazione scenica per matrimoni a Malaga',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: 'idee-illuminazione-matrimonio',
			keyword: 'idee di illuminazione per il matrimonio a Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'noleggio-macchina-del-fumo',
			keyword: 'noleggio macchina del fumo a Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'noleggio-attrezzature-matrimoni',
			keyword: 'noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'how-to-choose-wedding-rentals': {
			slug: 'come-scegliere-il-noleggio-attrezzature-per-matrimoni',
			keyword: 'come scegliere il noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'impianto-audio-cerimonia-matrimonio',
			keyword: 'impianto audio per cerimonia di matrimonio a Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'noleggio-attrezzature-matrimoni-allaperto',
			keyword: "noleggio attrezzature per matrimoni all'aperto a Malaga",
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'noleggio-attrezzature-matrimoni-al-chiuso',
			keyword: 'noleggio attrezzature per matrimoni al chiuso a Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'elementi-essenziali-noleggio-attrezzature-matrimoni',
			keyword: 'elementi essenziali per il noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'sfruttare-al-meglio-il-noleggio-attrezzature-per-matrimoni',
			keyword: 'sfruttare al meglio il noleggio attrezzature per matrimoni',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'noleggio-attrezzature-matrimonio-online',
			keyword: 'noleggio attrezzature per matrimonio online a Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'noleggio-attrezzature-matrimoni-vicino-a-me',
			keyword: 'noleggio attrezzature per matrimoni vicino a me',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: 'noleggio-attrezzature-matrimoni-ecosostenibile',
			keyword: 'noleggio attrezzature per matrimoni ecosostenibile a Malaga',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'risparmiare-noleggio-attrezzature-matrimonio',
			keyword: 'risparmiare sul noleggio di attrezzature per matrimonio',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'domande-sul-noleggio-attrezzature-matrimoni',
			keyword: 'domande sul noleggio attrezzature per matrimoni',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'pro-e-contro-noleggio-attrezzature-matrimonio',
			keyword: 'pro e contro del noleggio di attrezzature per matrimonio',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'noleggio-attrezzature-matrimoni-tutto-incluso',
			keyword: 'noleggio attrezzature per matrimoni tutto incluso a Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'confrontare-preventivi-noleggio-attrezzature-matrimoni',
			keyword: 'confrontare i preventivi di noleggio attrezzature per matrimoni',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'tendenze-noleggio-attrezzature-matrimoni',
			keyword: 'tendenze del noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'cambi-last-minute-noleggio-attrezzature-matrimoni',
			keyword: 'cambi last minute al noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'protezione-danni-noleggio-attrezzature-matrimoni',
			keyword: 'protezione danni nel noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'quando-prenotare-noleggio-attrezzature-matrimoni',
			keyword: 'quando prenotare il noleggio attrezzature per matrimoni a Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'meteo-noleggio-attrezzature-matrimoni-in-esterna',
			keyword: 'meteo e noleggio attrezzature per matrimoni in esterna a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'attrezzatura-audiovisiva-formazione',
			keyword: 'attrezzatura audiovisiva per la formazione a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'attrezzatura-audiovisiva-cena-di-gala',
			keyword: 'attrezzatura audiovisiva per una cena di gala a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'noleggio-audiovisivo-presentazioni-da-remoto',
			keyword: 'noleggio audiovisivo per presentazioni da remoto a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'noleggio-audiovisivo-eventi-virtuali',
			keyword: 'noleggio audiovisivo per eventi virtuali a Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos':
			{
				slug: 'produzione-audiovisiva-progold-summit-2026-torremolinos',
				keyword: 'produzione audiovisiva PROGOLD SUMMIT 2026 a Torremolinos',
				status: 'propuesta'
			},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'schermi-stand-ecoc-2026-malaga',
			keyword: 'schermi per stand ECOC 2026 a Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'produzione-audiovisiva-bmotion-benahavis',
			keyword: 'produzione audiovisiva Bmotion a Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella':
			{
				slug: 'supporto-tecnico-bmotion-marbella',
				keyword: 'supporto tecnico Bmotion a Marbella',
				status: 'propuesta'
			},
		'news-malaga-event-gear-unveils-new-rebranded-website': {
			slug: 'nuovo-sito-malaga-event-gear',
			keyword: 'nuovo sito di Malaga Event Gear',
			status: 'propuesta'
		},
		'7-years-of-support-for-neighborhood-council-community-meeting-in-malaga-spain': {
			slug: 'riunione-neighborhood-council-malaga',
			keyword: 'riunione comunitaria del Neighborhood Council a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'noleggio-audiovisivo-matrimoni',
			keyword: 'noleggio audiovisivo per matrimoni a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'noleggio-audiovisivo-eventi-sportivi',
			keyword: 'noleggio audiovisivo per eventi sportivi a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'noleggio-audiovisivo-piccole-imprese',
			keyword: 'noleggio audiovisivo per piccole imprese a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'noleggio-audiovisivo-eventi-religiosi',
			keyword: 'noleggio audiovisivo per eventi religiosi a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'noleggio-audiovisivo-eventi-allaperto',
			keyword: "noleggio audiovisivo per eventi all'aperto a Malaga",
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'noleggio-audiovisivo-spettacoli-musicali',
			keyword: 'noleggio audiovisivo per spettacoli musicali a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'noleggio-audiovisivo-eventi-beneficenza',
			keyword: 'noleggio audiovisivo per eventi di beneficenza a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-art-exhibitions': {
			slug: 'noleggio-audiovisivo-mostre-darte',
			keyword: "noleggio audiovisivo per mostre d'arte a Malaga",
			status: 'propuesta'
		},
		'audio-visual-rental-for-private-parties': {
			slug: 'noleggio-audiovisivo-feste-private',
			keyword: 'noleggio audiovisivo per feste private a Malaga',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: 'noleggio-audiovisivo-vicino-a-me',
			keyword: 'noleggio audiovisivo vicino a me',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: 'noleggio-audio-video-vicino-a-me',
			keyword: 'noleggio audio video vicino a me',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: 'come-funziona-il-noleggio-audiovisivo',
			keyword: 'come funziona il noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: 'personalizzare-pacchetto-noleggio-audiovisivo',
			keyword: 'personalizzare un pacchetto di noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'av-equipment-consultations': {
			slug: 'consulenza-noleggio-audiovisivo-malaga',
			keyword: 'consulenza sul noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'av-cable-management': {
			slug: 'gestione-cavi-audiovisivi-malaga',
			keyword: 'gestione dei cavi audiovisivi a Malaga',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: 'vantaggi-noleggio-audiovisivo',
			keyword: 'vantaggi del noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: 'errori-comuni-noleggio-audiovisivo',
			keyword: 'errori comuni nel noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: 'aziende-noleggio-audiovisivo',
			keyword: 'aziende di noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: 'societa-noleggio-audiovisivo-malaga',
			keyword: 'società di noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-safety-guidelines': {
			slug: 'linee-guida-sicurezza-noleggio-audiovisivo-malaga',
			keyword: 'linee guida di sicurezza per il noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-planning-timeline': {
			slug: 'tempistiche-pianificazione-noleggio-audiovisivo',
			keyword: 'tempistiche di pianificazione del noleggio audiovisivo a Malaga',
			status: 'propuesta'
		},
		'av-system-troubleshooting': {
			slug: 'risoluzione-problemi-sistemi-audiovisivi-malaga',
			keyword: 'risoluzione dei problemi dei sistemi audiovisivi a Malaga',
			status: 'propuesta'
		},
		'what-renting-av-gear-in-malaga-taught-me-about-smart-business': {
			slug: 'noleggiare-audiovisivi-a-malaga-mi-ha-insegnato-a-fare-impresa',
			keyword: 'noleggiare audiovisivi a Malaga mi ha insegnato a fare impresa',
			status: 'propuesta'
		},
		'outdoor-movie-screen-and-projector-rental': {
			slug: 'noleggio-schermo-cinema-allaperto-malaga',
			keyword: "noleggio schermo per cinema all'aperto a Malaga",
			status: 'propuesta'
		},
		'billie-jean-king-cup-2024-sound-and-lighting': {
			slug: 'audio-luci-billie-jean-king-cup-2024-malaga',
			keyword: 'Billie Jean King Cup 2024 a Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
