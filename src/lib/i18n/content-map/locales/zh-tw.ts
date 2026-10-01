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
		'sound-system-rental': {
			slug: '音響系統租賃',
			keyword: '馬拉加 音響系統租賃',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: '投影機租賃',
			keyword: '馬拉加 投影機租賃',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: '電視螢幕租賃',
			keyword: '馬拉加 電視螢幕租賃',
			status: 'propuesta'
		},
		'av-technician-hire': {
			slug: '影音技術人員租用',
			keyword: '馬拉加 影音技術人員租用',
			status: 'propuesta'
		},
		'technical-support-for-events': {
			slug: '活動現場技術支援',
			keyword: '馬拉加 活動現場技術支援',
			status: 'propuesta'
		},
		'stage-monitor-rental': {
			slug: '舞台監聽喇叭租賃',
			keyword: '馬拉加 舞台監聽喇叭租賃',
			status: 'propuesta'
		},
		'video-switcher-rental': {
			slug: '視訊切換器租賃',
			keyword: '馬拉加 視訊切換器租賃',
			status: 'propuesta'
		},
		'audio-system-calibration': {
			slug: '音響系統調校',
			keyword: '馬拉加 音響系統調校',
			status: 'propuesta'
		},
		'audio-visual-rental': { slug: '影音租賃', keyword: '馬拉加 影音租賃', status: 'propuesta' },
		'audio-visual-rental-for-conferences': { slug: '會議影音租賃', keyword: '馬拉加 會議影音租賃', status: 'propuesta' },
		'audio-visual-rental-for-corporate-events': {
			slug: '企業活動影音租賃',
			keyword: '馬拉加 企業活動影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: '產品發表會影音租賃',
			keyword: '馬拉加 產品發表會影音租賃',
			status: 'propuesta'
		},
		'event-technology-service': { slug: '活動燈光舞台架設', keyword: '馬拉加 活動燈光舞台架設', status: 'propuesta' },
		'audio-visual-rental-for-corporate-meetings': {
			slug: '董事會影音租賃',
			keyword: '馬拉加 董事會影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: '記者會影音租賃',
			keyword: '馬拉加 記者會影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: '研討會影音租賃',
			keyword: '馬拉加 研討會影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: '展會影音租賃',
			keyword: '馬拉加 展會影音租賃',
			status: 'propuesta'
		},
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
		'lighting-ideas-for-wedding-rentals': {
			slug: '婚禮燈光創意',
			keyword: '馬拉加 婚禮燈光創意',
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
		'how-to-choose-wedding-rentals': {
			slug: '如何選擇婚禮設備租借方案',
			keyword: '馬拉加 如何選擇婚禮設備租借方案',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: '婚禮儀式音響',
			keyword: '馬拉加 婚禮儀式音響',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: '戶外婚禮設備租借',
			keyword: '馬拉加 戶外婚禮設備租借',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: '室內婚禮設備租借',
			keyword: '馬拉加 室內婚禮設備租借',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: '婚禮設備租借必備清單',
			keyword: '馬拉加 婚禮設備租借必備清單',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: '善用婚禮設備租借',
			keyword: '在馬拉加善用婚禮設備租借',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: '婚禮設備租借線上預約',
			keyword: '馬拉加 婚禮設備租借線上預約',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: '附近的婚禮設備租借',
			keyword: '馬拉加 附近的婚禮設備租借',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: '環保婚禮設備租借',
			keyword: '馬拉加 環保婚禮設備租借',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: '婚禮設備租借省錢技巧',
			keyword: '馬拉加 婚禮設備租借省錢技巧',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: '婚禮設備租借必問問題',
			keyword: '馬拉加 婚禮設備租借必問問題',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: '婚禮設備租借優缺點',
			keyword: '馬拉加 婚禮設備租借優缺點',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: '婚禮設備租借一站式方案',
			keyword: '馬拉加 婚禮設備租借一站式方案',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: '如何比較婚禮設備租借報價',
			keyword: '馬拉加 如何比較婚禮設備租借報價',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: '婚禮設備租借最新趨勢',
			keyword: '馬拉加 婚禮設備租借最新趨勢',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: '婚禮設備租借臨時異動',
			keyword: '馬拉加 婚禮設備租借臨時異動',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: '婚禮設備租借損壞保障',
			keyword: '馬拉加 婚禮設備租借損壞保障',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: '婚禮設備租借預訂時程',
			keyword: '馬拉加 婚禮設備租借預訂時程',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: '婚禮設備租借天氣規劃',
			keyword: '馬拉加 婚禮設備租借天氣規劃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: '教育訓練影音租賃',
			keyword: '馬拉加 教育訓練影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: '晚宴影音租賃',
			keyword: '馬拉加 晚宴影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: '遠端簡報影音租賃',
			keyword: '馬拉加 遠端簡報影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: '線上活動影音租賃',
			keyword: '馬拉加 線上活動影音租賃',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: '托雷莫利諾斯2026年峰會影音製作',
			keyword: '托雷莫利諾斯PROGOLD SUMMIT 2026影音製作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: '光通訊展2026攤位螢幕安裝',
			keyword: '馬拉加ECOC 2026攤位螢幕',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: '貝納阿維斯活動影音製作',
			keyword: '貝納阿維斯Bmotion影音製作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: '馬貝拉活動技術支援',
			keyword: '馬貝拉Bmotion技術支援',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: '婚禮影音租賃',
			keyword: '馬拉加 婚禮影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: '運動賽事影音租賃',
			keyword: '馬拉加 運動賽事影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: '中小企業影音租賃',
			keyword: '馬拉加 中小企業影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: '宗教活動影音租賃',
			keyword: '馬拉加 宗教活動影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: '戶外活動影音租賃',
			keyword: '馬拉加 戶外活動影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: '音樂表演影音租賃',
			keyword: '馬拉加 音樂表演影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: '慈善募款活動影音租賃',
			keyword: '馬拉加 慈善募款活動影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-art-exhibitions': {
			slug: '藝術展覽影音租賃',
			keyword: '馬拉加 藝術展覽影音租賃',
			status: 'propuesta'
		},
		'audio-visual-rental-for-private-parties': {
			slug: '私人派對影音租賃',
			keyword: '馬拉加私人派對影音租賃',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: '附近的影音租賃',
			keyword: '馬拉加 附近的影音租賃',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: '附近的投影機螢幕租賃',
			keyword: '馬拉加 附近的投影機螢幕租賃',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: '影音租賃如何運作',
			keyword: '馬拉加 影音租賃如何運作',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: '如何客製化影音租賃方案',
			keyword: '馬拉加 如何客製化影音租賃方案',
			status: 'propuesta'
		},
		'av-equipment-consultations': {
			slug: '活動影音租賃諮詢',
			keyword: '馬拉加 活動影音租賃諮詢',
			status: 'propuesta'
		},
		'av-cable-management': {
			slug: '影音線材管理',
			keyword: '馬拉加 影音線材管理',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: '影音租賃的好處',
			keyword: '馬拉加 影音租賃的好處',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: '影音租賃常見錯誤',
			keyword: '馬拉加 影音租賃常見錯誤',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: '影音租賃公司怎麼選',
			keyword: '馬拉加 影音租賃公司怎麼選',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: '老牌影音租賃公司',
			keyword: '馬拉加 老牌影音租賃公司',
			status: 'propuesta'
		},
		'audio-visual-rental-safety-guidelines': {
			slug: '影音租賃安全指南',
			keyword: '馬拉加 影音租賃安全指南',
			status: 'propuesta'
		},
		'audio-visual-rental-planning-timeline': {
			slug: '影音租賃籌備時程',
			keyword: '馬拉加 影音租賃籌備時程',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
