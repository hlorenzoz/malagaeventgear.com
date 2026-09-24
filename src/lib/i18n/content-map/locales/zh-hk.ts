import type { LocaleContentMap } from '../schema';

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
		'/gdpr/': { path: '/私隱條例/', keyword: '私隱條例', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookie政策/', keyword: '網站Cookie政策', status: 'propuesta' },
		'/thank-you/': { path: '/多謝/' }
	},
	segments: { category: '分類', author: '作者' },
	packages: {
		eco: { slug: '慳錢套餐', keyword: '馬拉加 小型派對音響燈光套餐', status: 'propuesta' },
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
		'audio-visual-rental': { slug: '音響器材租賃', name: '音響器材租賃' },
		'corporate-enterprise': { slug: '商業活動', name: '商業活動' },
		events: { slug: '活動', name: '活動' },
		gadgets: { slug: '電子產品', name: '電子產品' },
		news: { slug: '新聞', name: '新聞' },
		weddings: { slug: '婚宴', name: '婚宴' }
	},
	posts: {}
} satisfies LocaleContentMap;
