import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: '马拉加 视听设备租赁', status: 'propuesta' },
		'/about-us/': { path: '/关于我们/', keyword: '马拉加 视听设备租赁公司', status: 'propuesta' },
		'/contact/': { path: '/联系我们/', keyword: '马拉加 视听设备租赁报价', status: 'propuesta' },
		'/equipment/': { path: '/设备/', keyword: '马拉加 投影仪屏幕灯光设备租赁', status: 'propuesta' },
		'/packages/': { path: '/套餐/', keyword: '马拉加 活动租赁套餐价格', status: 'propuesta' },
		'/faq/': { path: '/常见问题/', keyword: '马拉加 设备租赁常见问题', status: 'propuesta' },
		'/meet-the-team/': { path: '/认识团队/', keyword: '马拉加 视听设备租赁团队', status: 'propuesta' },
		'/blog/': { path: '/博客/', keyword: '马拉加 活动策划博客', status: 'propuesta' },
		'/blog/categories/': { path: '/博客/分类/', keyword: '博客文章分类', status: 'propuesta' },
		'/sitemap/': { path: '/网站地图/', keyword: '网站地图', status: 'propuesta' },
		'/privacy-policy/': { path: '/隐私政策/', keyword: '隐私政策', status: 'propuesta' },
		'/terms-of-service/': { path: '/服务条款/', keyword: '服务条款', status: 'propuesta' },
		'/gdpr/': { path: '/数据保护/', keyword: '数据保护政策', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookie政策/', keyword: '网站Cookie政策', status: 'propuesta' },
		'/thank-you/': { path: '/谢谢/' }
	},
	segments: { category: '分类', author: '作者' },
	packages: {
		eco: { slug: '经济套餐', keyword: '马拉加 小型派对音响灯光套餐', status: 'propuesta' },
		wedding: { slug: '婚礼套餐', keyword: '马拉加 婚礼音响灯光麦克风套餐', status: 'propuesta' },
		'product-presentation': {
			slug: '产品发布套餐',
			keyword: '马拉加 新品发布投影仪屏幕套餐',
			status: 'propuesta'
		},
		'basic-mice': { slug: '基础会议套餐', keyword: '马拉加 小型企业会议设备套餐', status: 'propuesta' },
		mice: { slug: '会展套餐', keyword: '马拉加 大型会展音响投影套餐', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: '音视频租赁', name: '音视频设备租赁' },
		'corporate-enterprise': { slug: '企业活动', name: '企业活动' },
		events: { slug: '活动', name: '活动' },
		gadgets: { slug: '数码产品', name: '数码产品' },
		news: { slug: '新闻', name: '新闻' },
		weddings: { slug: '婚礼', name: '婚礼' }
	},
	posts: {
		'sound-system-rental': {
			slug: '音响系统租赁',
			keyword: '马拉加 音响系统租赁',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: '投影仪租赁',
			keyword: '马拉加 投影仪租赁',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: '电视屏幕租赁',
			keyword: '马拉加 电视屏幕租赁',
			status: 'propuesta'
		},
		'av-technician-hire': {
			slug: '视听技术人员租用',
			keyword: '马拉加 视听技术人员租用',
			status: 'propuesta'
		},
		'technical-support-for-events': {
			slug: '活动现场技术支持',
			keyword: '马拉加 活动现场技术支持',
			status: 'propuesta'
		},
		'stage-monitor-rental': {
			slug: '舞台监听音箱租赁',
			keyword: '马拉加 舞台监听音箱租赁',
			status: 'propuesta'
		},
		'video-switcher-rental': {
			slug: '视频切换器租赁',
			keyword: '马拉加 视频切换器租赁',
			status: 'propuesta'
		},
		'audio-system-calibration': {
			slug: '音响系统调校',
			keyword: '马拉加 音响系统调校',
			status: 'propuesta'
		},
		'audio-visual-rental': { slug: '活动视听租赁', keyword: '马拉加 活动视听租赁', status: 'propuesta' },
		'audio-visual-rental-for-conferences': { slug: '会议视听租赁', keyword: '马拉加 会议视听租赁', status: 'propuesta' },
		'audio-visual-rental-for-corporate-events': {
			slug: '企业活动视听租赁',
			keyword: '马拉加 企业活动视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: '新品发布会视听租赁',
			keyword: '马拉加 新品发布会视听租赁',
			status: 'propuesta'
		},
		'event-technology-service': { slug: '活动灯光舞台搭建', keyword: '马拉加 活动灯光舞台搭建', status: 'propuesta' },
		'audio-visual-rental-for-corporate-meetings': {
			slug: '董事会视听租赁',
			keyword: '马拉加 董事会视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: '新闻发布会视听租赁',
			keyword: '马拉加 新闻发布会视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: '研讨会视听租赁',
			keyword: '马拉加 研讨会视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: '展会视听租赁',
			keyword: '马拉加 展会视听租赁',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: '视听设备出租',
			keyword: '马拉加 视听设备出租',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: '头戴式领夹式麦克风租赁',
			keyword: '马拉加 头戴式与领夹式麦克风租赁',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: '舞台灯光租赁',
			keyword: '马拉加 舞台灯光租赁',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: '地面投光灯租赁',
			keyword: '马拉加 地面投光灯租赁',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: '婚礼舞台灯光',
			keyword: '马拉加 婚礼舞台灯光',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: '婚礼灯光创意',
			keyword: '马拉加 婚礼灯光创意',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: '烟雾机租赁',
			keyword: '马拉加 烟雾机租赁',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: '婚礼设备租赁',
			keyword: '马拉加 婚礼设备租赁',
			status: 'propuesta'
		},
		'how-to-choose-wedding-rentals': {
			slug: '如何选择婚礼设备租赁方案',
			keyword: '马拉加 如何选择婚礼设备租赁方案',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: '婚礼仪式音响',
			keyword: '马拉加 婚礼仪式音响',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: '户外婚礼设备租赁',
			keyword: '马拉加 户外婚礼设备租赁',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: '室内婚礼设备租赁',
			keyword: '马拉加 室内婚礼设备租赁',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: '婚礼设备租赁必备清单',
			keyword: '马拉加 婚礼设备租赁必备清单',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: '充分利用婚礼设备租赁',
			keyword: '在马拉加充分利用婚礼设备租赁',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: '婚礼设备租赁在线预订',
			keyword: '马拉加 婚礼设备租赁在线预订',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: '附近的婚礼设备租赁',
			keyword: '马拉加 附近的婚礼设备租赁',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: '环保婚礼设备租赁',
			keyword: '马拉加 环保婚礼设备租赁',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: '婚礼设备租赁省钱技巧',
			keyword: '马拉加 婚礼设备租赁省钱技巧',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: '婚礼设备租赁必问问题',
			keyword: '马拉加 婚礼设备租赁必问问题',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: '婚礼设备租赁优缺点',
			keyword: '马拉加 婚礼设备租赁优缺点',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: '婚礼设备租赁一站式套餐',
			keyword: '马拉加 婚礼设备租赁一站式套餐',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: '如何比较婚礼设备租赁报价',
			keyword: '马拉加 如何比较婚礼设备租赁报价',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: '婚礼设备租赁最新趋势',
			keyword: '马拉加 婚礼设备租赁最新趋势',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: '婚礼设备租赁临时变更',
			keyword: '马拉加 婚礼设备租赁临时变更',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: '婚礼设备租赁损坏保障',
			keyword: '马拉加 婚礼设备租赁损坏保障',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: '婚礼设备租赁预订时间表',
			keyword: '马拉加 婚礼设备租赁预订时间表',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: '婚礼设备租赁天气规划',
			keyword: '马拉加 婚礼设备租赁天气规划',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: '培训视听租赁',
			keyword: '马拉加 培训视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: '晚宴视听租赁',
			keyword: '马拉加 晚宴视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: '远程演示视听租赁',
			keyword: '马拉加 远程演示视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: '线上活动视听租赁',
			keyword: '马拉加 线上活动视听租赁',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: '托雷莫利诺斯2026年峰会视听制作',
			keyword: '托雷莫利诺斯PROGOLD SUMMIT 2026视听制作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: '光通信展2026展位屏幕安装',
			keyword: '马拉加ECOC 2026展位屏幕',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: '贝纳阿维斯活动视听制作',
			keyword: '贝纳阿维斯Bmotion视听制作',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: '马贝拉活动技术支持',
			keyword: '马贝拉Bmotion技术支持',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: '婚礼视听租赁',
			keyword: '马拉加 婚礼视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: '体育赛事视听租赁',
			keyword: '马拉加 体育赛事视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: '中小企业视听租赁',
			keyword: '马拉加 中小企业视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: '宗教活动视听租赁',
			keyword: '马拉加 宗教活动视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: '户外活动视听租赁',
			keyword: '马拉加 户外活动视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: '音乐演出视听租赁',
			keyword: '马拉加 音乐演出视听租赁',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: '慈善筹款活动视听租赁',
			keyword: '马拉加 慈善筹款活动视听租赁',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: '附近的活动视听租赁',
			keyword: '马拉加 附近的活动视听租赁',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: '附近的音视频租赁',
			keyword: '马拉加 附近的音视频租赁',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: '视听租赁如何运作',
			keyword: '马拉加 视听租赁如何运作',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: '如何定制活动视听租赁套餐',
			keyword: '马拉加 如何定制活动视听租赁套餐',
			status: 'propuesta'
		},
		'av-equipment-consultations': {
			slug: '视听租赁咨询',
			keyword: '马拉加 视听租赁咨询',
			status: 'propuesta'
		},
		'av-cable-management': {
			slug: '视听线缆管理',
			keyword: '马拉加 视听线缆管理',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: '活动视听租赁的好处',
			keyword: '马拉加 活动视听租赁的好处',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: '活动视听租赁常见错误',
			keyword: '马拉加 活动视听租赁常见错误',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: '活动视听租赁公司怎么选',
			keyword: '马拉加 活动视听租赁公司怎么选',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: '老牌活动视听租赁公司',
			keyword: '马拉加 老牌活动视听租赁公司',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
