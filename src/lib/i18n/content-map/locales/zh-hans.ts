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
		'event-technology-service': { slug: '活动灯光舞台搭建', keyword: '马拉加 活动灯光舞台搭建', status: 'propuesta' },
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
		}
	}
} satisfies LocaleContentMap;
