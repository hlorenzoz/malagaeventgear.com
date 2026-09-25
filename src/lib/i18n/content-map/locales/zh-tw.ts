import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: '馬拉加 影音設備出租', status: 'propuesta' },
		'/about-us/': { path: '/關於我們/', keyword: '馬拉加 影音設備出租公司', status: 'propuesta' },
		'/contact/': { path: '/聯絡我們/', keyword: '馬拉加 影音設備出租報價', status: 'propuesta' },
		'/equipment/': { path: '/設備/', keyword: '馬拉加 投影機螢幕燈光音響出租', status: 'propuesta' },
		'/packages/': { path: '/方案/', keyword: '馬拉加 活動出租方案價格', status: 'propuesta' },
		'/faq/': { path: '/常見問題/', keyword: '馬拉加 設備出租常見問題', status: 'propuesta' },
		'/meet-the-team/': { path: '/認識團隊/', keyword: '馬拉加 影音設備出租團隊', status: 'propuesta' },
		'/blog/': { path: '/部落格/', keyword: '馬拉加 活動企劃部落格', status: 'propuesta' },
		'/blog/categories/': { path: '/部落格/分類/', keyword: '部落格文章分類', status: 'propuesta' },
		'/sitemap/': { path: '/網站地圖/', keyword: '網站地圖', status: 'propuesta' },
		'/privacy-policy/': { path: '/隱私權政策/', keyword: '隱私權政策', status: 'propuesta' },
		'/terms-of-service/': { path: '/服務條款/', keyword: '服務條款', status: 'propuesta' },
		'/gdpr/': { path: '/個資保護/', keyword: '個資保護政策', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookie政策/', keyword: '網站Cookie政策', status: 'propuesta' },
		'/thank-you/': { path: '/謝謝/' }
	},
	segments: { category: '分類', author: '作者' },
	packages: {
		eco: { slug: '經濟方案', keyword: '馬拉加 小型派對音響燈光方案', status: 'propuesta' },
		wedding: { slug: '婚禮方案', keyword: '馬拉加 婚禮音響燈光麥克風方案', status: 'propuesta' },
		'product-presentation': {
			slug: '產品發表方案',
			keyword: '馬拉加 新品發表投影機螢幕方案',
			status: 'propuesta'
		},
		'basic-mice': { slug: '基礎會議方案', keyword: '馬拉加 小型企業會議設備方案', status: 'propuesta' },
		mice: { slug: '會展方案', keyword: '馬拉加 大型會展音響投影方案', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: '影音租賃', name: '影音設備租賃' },
		'corporate-enterprise': { slug: '企業活動', name: '企業活動' },
		events: { slug: '活動', name: '活動' },
		gadgets: { slug: '科技小物', name: '科技小物' },
		news: { slug: '新聞', name: '新聞' },
		weddings: { slug: '婚禮', name: '婚禮' }
	},
	posts: {
		'event-technology-service': { slug: '活動燈光舞台架設', keyword: '馬拉加 活動燈光舞台架設', status: 'propuesta' },
		'audiovisual-equipment-rental-service': {
			slug: '影音器材租借',
			keyword: '馬拉加 影音器材租借',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: '頭戴式領夾式麥克風租賃',
			keyword: '馬拉加 頭戴式與領夾式麥克風租賃',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: '舞台燈光出租',
			keyword: '馬拉加 舞台燈光出租',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: '上照燈出租',
			keyword: '馬拉加 上照燈出租',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: '婚禮舞台燈光',
			keyword: '馬拉加 婚禮舞台燈光',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: '煙霧機出租',
			keyword: '馬拉加 煙霧機出租',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: '婚禮設備租借',
			keyword: '馬拉加 婚禮設備租借',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: '婚禮儀式音響',
			keyword: '馬拉加 婚禮儀式音響',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
