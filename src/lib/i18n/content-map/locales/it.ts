import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'noleggio attrezzature audiovisive a Malaga', status: 'propuesta' },
		'/about-us/': { path: '/chi-siamo/', keyword: 'azienda di noleggio audiovisivi a Malaga', status: 'propuesta' },
		'/contact/': { path: '/contatti/', keyword: 'preventivo noleggio audiovisivi Malaga', status: 'propuesta' },
		'/equipment/': { path: '/attrezzature/', keyword: 'catalogo noleggio attrezzature audiovisive', status: 'propuesta' },
		'/packages/': { path: '/pacchetti/', keyword: 'prezzi noleggio audiovisivi Malaga', status: 'propuesta' },
		'/faq/': { path: '/domande-frequenti/', keyword: 'domande frequenti noleggio audiovisivi', status: 'propuesta' },
		'/meet-the-team/': { path: '/il-nostro-team/', keyword: 'tecnici audiovisivi Malaga Event Gear', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog noleggio audiovisivi ed eventi Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/categorie/', keyword: 'categorie del blog eventi', status: 'propuesta' },
		'/sitemap/': { path: '/mappa-del-sito/', keyword: 'mappa del sito Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/informativa-privacy/', keyword: 'informativa privacy Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': { path: '/termini-e-condizioni/', keyword: 'termini e condizioni Malaga Event Gear', status: 'propuesta' },
		'/gdpr/': { path: '/gdpr/', keyword: 'protezione dati GDPR Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/informativa-cookie/', keyword: 'informativa cookie Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/grazie/' }
	},
	segments: { category: 'categoria', author: 'autore' },
	packages: {
		eco: { slug: 'eco', keyword: 'noleggio audio e luci economico Malaga', status: 'propuesta' },
		wedding: { slug: 'matrimonio', keyword: 'noleggio audio e luci per matrimoni Malaga', status: 'propuesta' },
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
		mice: { slug: 'mice', keyword: 'noleggio audiovisivi per congressi e conferenze Malaga', status: 'propuesta' }
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
		'event-technology-service': {
			slug: 'luci-e-palco-per-eventi',
			keyword: 'luci e palco per eventi Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
