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
		'audio-visual-rental': { slug: '活動視聽租借', keyword: '馬拉加 活動視聽租借', status: 'propuesta' },
		'audio-visual-rental-for-conferences': { slug: '會議視聽租借', keyword: '馬拉加 會議視聽租借', status: 'propuesta' },
		'audio-visual-rental-for-corporate-events': {
			slug: '企業活動視聽租借',
			keyword: '馬拉加 企業活動視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: '產品發佈會視聽租借',
			keyword: '馬拉加 產品發佈會視聽租借',
			status: 'propuesta'
		},
		'event-technology-service': { slug: '活動燈光舞台搭建', keyword: '馬拉加 活動燈光舞台搭建', status: 'propuesta' },
		'audio-visual-rental-for-corporate-meetings': {
			slug: '董事會視聽租借',
			keyword: '馬拉加 董事會視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: '記者會視聽租借',
			keyword: '馬拉加 記者會視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: '研討會視聽租借',
			keyword: '馬拉加 研討會視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: '展覽視聽租借',
			keyword: '馬拉加 展覽視聽租借',
			status: 'propuesta'
		},
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
		'lighting-ideas-for-wedding-rentals': {
			slug: '婚禮燈光構思',
			keyword: '馬拉加 婚禮燈光構思',
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
		'how-to-choose-wedding-rentals': {
			slug: '如何選擇婚禮器材租借方案',
			keyword: '馬拉加 如何選擇婚禮器材租借方案',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: '婚禮儀式音響',
			keyword: '馬拉加 婚禮儀式音響',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: '戶外婚禮器材租借',
			keyword: '馬拉加 戶外婚禮器材租借',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: '室內婚禮器材租借',
			keyword: '馬拉加 室內婚禮器材租借',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: '婚禮器材租借必備清單',
			keyword: '馬拉加 婚禮器材租借必備清單',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: '善用婚禮器材租借',
			keyword: '在馬拉加善用婚禮器材租借',
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
		},
		'eco-friendly-wedding-rental-options': {
			slug: '環保婚禮器材租借',
			keyword: '馬拉加 環保婚禮器材租借',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: '婚禮器材租借省錢貼士',
			keyword: '馬拉加 婚禮器材租借省錢貼士',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: '婚禮器材租借必問問題',
			keyword: '馬拉加 婚禮器材租借必問問題',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: '婚禮器材租借優缺點',
			keyword: '馬拉加 婚禮器材租借優缺點',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: '婚禮器材租借一站式套餐',
			keyword: '馬拉加 婚禮器材租借一站式套餐',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: '如何比較婚禮器材租借報價',
			keyword: '馬拉加 如何比較婚禮器材租借報價',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: '婚禮器材租借最新趨勢',
			keyword: '馬拉加 婚禮器材租借最新趨勢',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: '婚禮器材租借臨時更改',
			keyword: '馬拉加 婚禮器材租借臨時更改',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: '婚禮器材租借損壞保障',
			keyword: '馬拉加 婚禮器材租借損壞保障',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: '婚禮器材租借預訂時間表',
			keyword: '馬拉加 婚禮器材租借預訂時間表',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: '婚禮器材租借天氣規劃',
			keyword: '馬拉加 婚禮器材租借天氣規劃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: '培訓視聽租借',
			keyword: '馬拉加 培訓視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: '晚宴視聽租借',
			keyword: '馬拉加 晚宴視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: '遠端簡報視聽租借',
			keyword: '馬拉加 遠端簡報視聽租借',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: '網上活動視聽租借',
			keyword: '馬拉加 網上活動視聽租借',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: '托雷莫利諾斯2026年峰會視聽製作',
			keyword: '托雷莫利諾斯PROGOLD SUMMIT 2026視聽製作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: '光通訊展2026展位熒幕安裝',
			keyword: '馬拉加ECOC 2026展位熒幕',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: '貝納阿維斯活動視聽製作',
			keyword: '貝納阿維斯Bmotion視聽製作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: '馬貝拉活動技術支援',
			keyword: '馬貝拉Bmotion技術支援',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: '婚禮視聽租借',
			keyword: '馬拉加 婚禮視聽租借',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
