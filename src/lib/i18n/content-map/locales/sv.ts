import type { LocaleContentMap } from '../schema';

export default {
	pages: {
		'/': { path: '/', keyword: 'hyra eventteknik Malaga', status: 'propuesta' },
		'/about-us/': { path: '/om-oss/', keyword: 'uthyrningsföretag AV utrustning Malaga', status: 'propuesta' },
		'/contact/': { path: '/kontakt/', keyword: 'offert eventteknik Malaga', status: 'propuesta' },
		'/equipment/': { path: '/utrustning/', keyword: 'hyra ljud och ljusutrustning', status: 'propuesta' },
		'/packages/': { path: '/paket/', keyword: 'eventpaket priser Malaga', status: 'propuesta' },
		'/faq/': { path: '/vanliga-fragor/', keyword: 'hyra utrustning vanliga frågor', status: 'propuesta' },
		'/meet-the-team/': { path: '/vart-team/', keyword: 'tekniker team Malaga', status: 'propuesta' },
		'/blog/': { path: '/blogg/', keyword: 'eventteknik blogg', status: 'propuesta' },
		'/blog/categories/': { path: '/blogg/kategorier/', keyword: 'blogg kategorier eventteknik', status: 'propuesta' },
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
		eco: { slug: 'eco-paket', keyword: 'billigt festpaket hyra Malaga', status: 'propuesta' },
		wedding: { slug: 'brollop-paket', keyword: 'hyra ljud och ljus till bröllop', status: 'propuesta' },
		'product-presentation': {
			slug: 'produktpresentation-paket',
			keyword: 'projektor och duk hyra presentation',
			status: 'propuesta'
		},
		'basic-mice': { slug: 'mice-grund-paket', keyword: 'konferensutrustning hyra litet', status: 'propuesta' },
		mice: { slug: 'mice-paket', keyword: 'kongressteknik hyra Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'av-uthyrning', name: 'AV uthyrning' },
		'corporate-enterprise': { slug: 'foretag', name: 'Företag & Näringsliv' },
		events: { slug: 'evenemang', name: 'Evenemang' },
		gadgets: { slug: 'prylar', name: 'Prylar' },
		news: { slug: 'nyheter', name: 'Nyheter' },
		weddings: { slug: 'brollop', name: 'Bröllop' }
	},
	posts: {}
} satisfies LocaleContentMap;
