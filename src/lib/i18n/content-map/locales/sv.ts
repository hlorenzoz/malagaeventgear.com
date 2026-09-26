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
		'event-technology-service': {
			slug: 'ljus-och-scenteknik',
			keyword: 'ljus- och scenteknik Malaga',
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
		'unique-wedding-ceremony-rentals': {
			slug: 'ljud-till-vigseln',
			keyword: 'ljud till vigseln i Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'boka-brollopsuthyrning-online',
			keyword: 'boka bröllopsuthyrning online i Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
