import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: '设备',
		packages: '套餐',
		blog: '博客',
		contact: '联系我们',
		bookNow: '立即预订',
		blogInEnglish: '博客（英文）',
		language: '语言',
		breadcrumbs: '面包屑导航',
		brand: 'Malaga Event Gear',
		toggleTheme: '切换颜色主题',
		openMenu: '打开导航菜单'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: '我们仅提供英语或西班牙语回复。',
		legalTranslation: '本文为翻译版本。如与英文版本有出入，以英文版本为准。',
		readEnglish: '查看英文版本'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: '首页',
		packages: '套餐',
		blog: '博客',
		categories: '分类',
		category: '分类',
		author: '作者',
		contact: '联系我们',
		'about-us': '关于我们',
		faq: '常见问题',
		'privacy-policy': '隐私政策',
		'terms-of-service': '服务条款',
		'cookie-policy': 'Cookie政策',
		gdpr: 'GDPR',
		'meet-the-team': '认识团队',
		equipment: '设备',
		sitemap: '网站地图',
		'thank-you': '感谢您'
	},
	// Hero
	hero: {
		span: '适用于各类活动',
		titlePart1: '马拉加视听设备',
		titleGradient: '租赁',
		titlePart2: '服务',
		subtitle: '体验我们优质设备带来的清晰音效与绚丽灯光，是太阳海岸婚礼、企业活动及高端派对的理想之选。',
		viewPricing: '查看价格',
		contactUs: '联系我们'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 完美搭建',
		card1Text: '专业技术支持全程护航，确保您的活动从开始到结束都顺利无忧。',
		card2Title: '#2 定制套餐',
		card2Text: '灵活的租赁套餐，完美适配各种活动规模、场地与预算。',
		card3Title: '#3 前沿科技',
		card3Text: '尽享尖端视听设备，全面提升您活动的视觉与音效品质。'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: '一目了然',
		sellQ: '我们提供什么服务？',
		sellA: '我们为马拉加及太阳海岸地区的各类活动提供优质视听设备租赁服务，包括专业音响系统、舞台灯光、投影仪和屏幕，并提供配送、搭建及现场技术支持。',
		whoQ: '适合哪些人群？',
		whoA: '适合筹备婚礼的新人、举办会议和企业活动的公司，以及希望获得完美音效与灯光效果而无需购买设备的派对或私人庆典主办方。',
		costQ: '费用是多少？',
		costA: '固定价格套餐，不含任何隐藏费用，价格根据您的活动规模灵活调整。大型活动还可获得专属定制报价。',
		costFrom: '起价',
		howQ: '服务流程是怎样的？',
		howA: '仅需四个简单步骤：选择套餐、申请报价，我们确认并准备设备，活动当天由我们的团队完成配送与搭建。'
	},
	// Impact
	impact: {
		title: '我们的成就数据',
		years: '年行业经验',
		clients: '满意客户',
		satisfaction: '客户满意度'
	},
	// Categories
	categories: {
		badge: '优质设备',
		title: '可选设备类别',
		soundTitle: '音响系统',
		soundText: '清晰逼真的高保真音效，无论是温馨婚礼还是大型企业会议均能完美呈现。我们选用顶级品牌设备，确保最佳声学效果。',
		lightTitle: '灯光',
		lightText: '灵活多变的灯光方案，为您的活动场地营造完美氛围。',
		visualTitle: '投影仪与屏幕',
		visualText: '清晰高清的视觉画面，为演示活动带来震撼视觉效果。',
		fxTitle: '特效与烟雾机',
		fxText: '借助我们专业级的特效与烟雾机设备，为您的活动打造惊艳氛围。',
		bookEquipment: '预订套餐'
	},
	// Pricing
	pricing: {
		badge: '透明定价',
		title: '为每场活动量身定制的套餐',
		subtitle: '从我们灵活的租赁套餐中挑选，完美适配任意活动规模与预算。让筹备活动变得简单！',
		includes: '包含内容：',
		includedServices: '已含服务：',
		optional: '可选项目：',
		check: '查询可预订日期',
		mostPopular: '最受欢迎',
		from: '起价',
		plusVat: '（另加{vat}增值税）',
		plusVatShort: '（另加增值税）',
		bookPack: '预订'
	},
	// Packages filters (e-commerce)
	filters: {
		title: '筛选',
		clearAll: '清除全部',
		resetFilters: '重置筛选',
		showingResults: '正在显示 {total} 个套餐中的 {visible} 个',
		noResults: '没有符合筛选条件的套餐，请尝试清除部分筛选项！',
		openFilters: '筛选',
		done: '显示结果',
		purpose: '活动类型',
		capacity: '活动规模',
		price: '预算',
		equipment: '包含设备',
		extras: '可选附加项目',
		sortBy: '排序方式',
		party: '派对',
		wedding: '婚礼',
		corporate: '企业活动',
		presentation: '演示活动',
		meeting: '会议',
		small: '小型（50位宾客以内）',
		medium: '中型（51至80位宾客）',
		large: '大型（80位宾客以上）',
		priceLow: '{price:budgetLow}以内',
		priceMid: '{price:budgetLow}至{price:budgetHigh}',
		priceHigh: '{price:budgetHigh}以上',
		transport: '运输与搭建',
		screen: '屏幕/显示设备',
		sound: '音响系统',
		microphone: '麦克风',
		lighting: '氛围灯光',
		technician: '现场技术人员',
		projector: '投影仪',
		smokeMachine: '烟雾机',
		technicalAssistant: '技术助理',
		lectern: '讲台',
		staging: '舞台搭建',
		recommended: '推荐',
		priceAsc: '价格：从低到高',
		priceDesc: '价格：从高到低'
	},
	// Contact
	contact: {
		badge: '24/7即时响应',
		title: '联系我们',
		subtitle: '准备好提升您的活动品质了吗？联系我们的技术团队，获取定制报价、查询设备可用情况并获得专业建议。',
		detailsTitle: '联系方式',
		phone: '电话',
		whatsapp: 'WhatsApp',
		email: '电子邮箱',
		location: '地址',
		hours: '营业时间',
		hoursText: '技术支持与物流服务全年无休，每天24小时提供。',
		reqTitle: '申请报价',
		formName: '姓名 *',
		formEmail: '电子邮箱 *',
		formPhone: '联系电话',
		formDate: '活动日期',
		formType: '活动类型',
		formTypeWedding: '婚礼/庆典',
		formTypeCorporate: '企业活动',
		formTypeParty: '私人派对',
		formTypeMice: '会议/会展',
		formTypeOther: '其他类型活动',
		formMessage: '活动详情与技术需求 *',
		formSubmit: '发送申请',
		formSubmitting: '发送中...',
		formRequiredError: '请填写所有必填字段。',
		formErrorSubmit: '发送申请时出现问题，请重试或直接发送邮件联系我们。',
		formErrorTurnstile: '安全验证失败，请重试。',
		formErrorRateLimited: '请求次数过多，请稍等几分钟后重试。',
		lockedFieldNote: '此字段根据错误信息自动生成，无法编辑。',
		errorPrefillMessage:
			'您好，我在您的网站上提交了套餐预订申请，但确认邮件未能成功发送。能否请您确认已收到我的咨询？参考编号：{ref}',
		errorDetailsHeader: '已提交的信息：',
		errorDetailSource: '表单网址',
		errorDetailName: '姓名',
		errorDetailEmail: '电子邮箱',
		errorDetailPhone: '电话',
		errorDetailDate: '活动日期',
		errorDetailPackage: '套餐',
		errorDetailComments: '备注',
		successTitle: '报价申请已提交！',
		successText1: '您好',
		successText2: '我们已成功收到您的申请。马拉加的技术团队将进行评估，并尽快通过电子邮件（',
		successText3: '）与您取得联系。',
		successButton: '提交新的申请',
		faqTitle: '常见问题'
	},
	// Packages Showcase
	packages: {
		badge: '精选套餐',
		title: '选择最适合您的套餐',
		subtitle: '为各类场合量身定制，所有套餐均含运输、搭建及现场技术支持。',
		enquire: '获取报价'
	},
	// How It Works
	process: {
		badge: '服务流程',
		title: '四步轻松完成您的活动',
		s1Title: '选择套餐',
		s1Desc: '浏览我们的套餐，选择最适合您活动规模与风格的方案。',
		s2Title: '申请报价',
		s2Desc: '填写简短表单，我们会尽快回复并告知设备可用情况。',
		s3Title: '确认与规划',
		s3Desc: '我们的团队将确认物流安排、场地准入及各项技术细节。',
		s4Title: '尽享活动',
		s4Desc: '我们负责搭建、执行及活动后的收尾工作，让您全程无忧。'
	},
	// Pricing Preview
	pricingPreview: {
		badge: '透明定价',
		title: '简单透明的全包价格',
		subtitle: '无隐藏费用，运输、搭建及技术支持均已包含在内。',
		viewAll: '查看全部套餐'
	},
	// FAQ
	faq: {
		badge: '常见问题',
		title: '常见问题解答'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: '客户评价',
		title: '真实活动，真实好评',
		subtitle: '来自太阳海岸各地客户的Google认证真实评价。',
		ratingLabel: '卓越评价',
		basedOn: '基于 {n} 条评价',
		poweredBy: '展示我们的最新评价',
		readMore: '阅读更多',
		readLess: '收起',
		seeAll: '查看全部评价',
		prevAria: '上一条评价',
		nextAria: '下一条评价',
		outOfFiveStars: '满分5星'
	},
	// Lead capture form
	leadForm: {
		title: '锁定您的活动档期',
		subtitle: '请填写表单，我们会尽快与您联系。',
		nameLabelInput: '姓名 *',
		emailLabelInput: '电子邮箱 *',
		phoneLabelInput: '电话/WhatsApp *',
		eventDateLabel: '活动日期 *',
		commentsLabel: '问题或备注',
		commentsPlaceholder: '请告诉我们您的活动详情，例如场地、宾客人数、特殊需求等',
		submitBtn: '查询日期是否可预订',
		submitting: '发送中...',
		errorRequired: '此字段为必填项。',
		errorEmail: '请输入有效的电子邮箱地址。',
		errorPhone: '请输入有效的电话号码。',
		errorDateFuture: '活动日期必须晚于今天。',
		errorMinLength: '至少需输入2个字符。',
		errorMaxLength: '最多允许输入1000个字符。',
		errorHoneypot: '检测到垃圾信息。',
		noCardRequired: '查询可预订情况无需提供信用卡信息',
		quickResponseNote: '我们会尽快回复',
		errorSubmit: '出现问题，请重试或直接联系我们。',
		errorTurnstile: '安全验证失败，请重试。',
		errorRateLimited: '请求次数过多，请稍等几分钟后重试。',
		emailFailTitle: '确认邮件发送失败',
		emailFailBody: '您的申请已保存，但我们的邮件系统未能成功发送确认邮件。请直接联系我们的团队，以免您的咨询被遗漏。',
		emailFailAction: '联系团队',
		emailFailDismiss: '关闭',
		countryCode: '国家区号',
		responseTime: '我们会尽快回复',
		trustBadge: '已获马拉加500多场活动的信赖'
	},
	// Thank-you page
	thankYou: {
		headline: '感谢您！您的申请正在处理中。',
		subheadline: '我们已收到您的咨询，会尽快与您联系。',
		responseTime: '预计回复时间：尽快回复',
		backToPackages: '浏览全部套餐',
		whatsappCta: '或立即通过WhatsApp联系我们',
		leadLabel: '参考编号'
	},
	// Gallery
	gallery: {
		titleHome: '活动实况回顾',
		titlePackage: '往期 {pack} 活动'
	},
	// Google Map / Profile
	googleMap: {
		badge: '位置与Google商家资料',
		title: '在Google上找到我们',
		subtitle: '访问我们的Google商家资料，或查看我们在马拉加的位置。',
		viewOnGoogle: '在Google地图中查看',
		mapTitle: 'Malaga Event Gear | Google商家资料'
	},
	// Footer
	footer: {
		brandSubtitle: '为马拉加及太阳海岸的高端活动提供优质音响、灯光及屏幕租赁服务，配备尖端设备与定制技术支持。',
		usefulLinks: '常用链接',
		home: '首页',
		packages: '套餐',
		blog: '博客',
		news: '新闻',
		categories: '分类',
		aboutUs: '关于我们',
		meetTheTeam: '认识团队',
		contactUs: '联系我们',
		termsOfService: '服务条款',
		privacyPolicy: '隐私政策',
		cookiePolicy: 'Cookie政策',
		gdpr: 'GDPR',
		faq: '常见问题',
		sitemap: '网站地图',
		servicePackages: '服务套餐',
		localAddress: '本地地址',
		listings: '商家列表',
		onlinePresence: '线上渠道',
		moreInformation: '了解更多',
		moreInfoText: '需要更多信息？欢迎联系我们，了解活动设备租赁、价格及可预订情况。',
		tel: '电话',
		clickToChat: '点击开始聊天',
		emails: '邮箱',
		forHire: '租赁咨询',
		forContact: '联系咨询',
		forLegal: '法律事务',
		allRightsReserved: '版权所有。',
		developedBy: '开发者',
		lorenzozTitle: 'Lorenzoz Agency：网站开发与商业解决方案公司',
		mailAriaLabel: '发送邮件',
		callAriaLabel: '致电Malaga Event Gear：{phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: '新闻',
		byAuthor: '作者',
		updated: '更新于',
		shareInlineLabel: '分享：',
		shareSidebarLabel: '分享本文',
		shareDrawerTitle: '分享这篇文章',
		copiedShort: '已复制！',
		copiedExclaim: '已复制！',
		copyShort: '复制链接',
		copyLink: '复制链接',
		shareOnAria: '分享至{network}',
		copyLinkAria: '复制链接到剪贴板',
		openSharingAria: '打开分享选项',
		closeSharingAria: '关闭分享选项',
		tweetLabel: '发推文',
		tweetAria: '发推文分享所选内容',
		packagesSidebarAria: '活动套餐侧边栏',
		tocSidebarAria: '目录侧边栏'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: '与我们聊天'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: '页面未找到',
		genericHeading: '出现错误',
		notFoundBody: '您访问的页面不存在或已被移动。请返回首页或联系我们。',
		genericBody: '处理您的请求时出现问题。请返回首页或联系我们，我们会尽快为您解决。',
		contactUs: '联系我们',
		backHome: '返回首页'
	}
} satisfies Messages;

export default t;
