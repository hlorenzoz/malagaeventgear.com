import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: '馬拉加 視聽器材租借', status: 'propuesta' },
		'/about-us/': { path: '/關於我們/', keyword: '馬拉加 視聽器材租借公司', status: 'propuesta' },
		'/contact/': { path: '/聯絡我們/', keyword: '馬拉加 視聽器材租借報價', status: 'propuesta' },
		'/equipment/': { path: '/器材/', keyword: '馬拉加 投影機熒幕燈光音響租借', status: 'propuesta' },
		'/packages/': { path: '/套餐/', keyword: '馬拉加 活動租借套餐價格', status: 'propuesta' },
		'/faq/': { path: '/常見問題/', keyword: '馬拉加 器材租借常見問題', status: 'propuesta' },
		'/meet-the-team/': { path: '/認識團隊/', keyword: '馬拉加 視聽器材租借團隊', status: 'propuesta' },
		'/blog/': { path: '/網誌/', keyword: '馬拉加 活動策劃網誌', status: 'propuesta' },
		'/blog/categories/': { path: '/網誌/分類/', keyword: '網誌文章分類', status: 'propuesta' },
		'/sitemap/': { path: '/網站地圖/', keyword: '網站地圖', status: 'propuesta' },
		'/privacy-policy/': { path: '/私隱政策/', keyword: '私隱政策', status: 'propuesta' },
		'/terms-of-service/': { path: '/服務條款/', keyword: '服務條款', status: 'propuesta' },
		'/gdpr/': { path: '/資料保障/', keyword: 'GDPR 資料保障', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookie政策/', keyword: '網站Cookie政策', status: 'propuesta' },
		'/thank-you/': { path: '/多謝/' }
	},
	segments: { category: '分類', author: '作者' },
	packages: {
		eco: { slug: '經濟套餐', keyword: '馬拉加 小型派對音響燈光套餐', status: 'propuesta' },
		wedding: { slug: '婚禮套餐', keyword: '馬拉加 婚禮音響燈光咪高峰套餐', status: 'propuesta' },
		'product-presentation': {
			slug: '產品發佈套餐',
			keyword: '馬拉加 新品發佈投影機熒幕套餐',
			status: 'propuesta'
		},
		'basic-mice': { slug: '基本會議套餐', keyword: '馬拉加 小型企業會議器材套餐', status: 'propuesta' },
		mice: { slug: '會展套餐', keyword: '馬拉加 大型會展音響投影套餐', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: '影音器材租借', name: '影音器材租借' },
		'corporate-enterprise': { slug: '商業活動', name: '商業活動' },
		events: { slug: '活動', name: '活動' },
		gadgets: { slug: '電子產品', name: '電子產品' },
		news: { slug: '新聞', name: '新聞' },
		weddings: { slug: '婚宴', name: '婚禮' }
	},
	posts: {
		'event-technology-service': { slug: '活動燈光舞台搭建', keyword: '馬拉加 活動燈光舞台搭建', status: 'propuesta' },
		'audiovisual-equipment-rental-service': {
			slug: '視聽設備租賃',
			keyword: '馬拉加 視聽設備租賃',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: '頭戴式領夾式咪高峰租借',
			keyword: '馬拉加 頭戴式及領夾式咪高峰租借',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: '舞台燈光租借',
			keyword: '馬拉加 舞台燈光租借',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: '上照氣氛燈租借',
			keyword: '馬拉加 上照氣氛燈租借',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: '婚禮舞台燈光',
			keyword: '馬拉加 婚禮舞台燈光',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: '煙霧機租借',
			keyword: '馬拉加 煙霧機租借',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: '婚禮器材租借',
			keyword: '馬拉加 婚禮器材租借',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: '婚禮儀式音響',
			keyword: '馬拉加 婚禮儀式音響',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: '婚禮器材租借網上預約',
			keyword: '馬拉加 婚禮器材租借網上預約',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: '附近的婚禮器材租借',
			keyword: '馬拉加 附近的婚禮器材租借',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
