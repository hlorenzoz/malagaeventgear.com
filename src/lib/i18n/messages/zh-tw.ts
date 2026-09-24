import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: '設備',
		packages: '方案',
		blog: '部落格',
		contact: '聯絡我們',
		bookNow: '立即預約',
		blogInEnglish: '部落格（英文版）',
		language: '語言',
		breadcrumbs: '麵包屑導覽',
		brand: 'Malaga Event Gear',
		toggleTheme: '切換色彩主題',
		openMenu: '開啟導覽選單'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: '我們僅提供英語或西班牙語回覆。',
		legalTranslation: '本文為翻譯版本。如與英文版本有出入，以英文版本為準。',
		readEnglish: '查看英文版本'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: '首頁',
		packages: '方案',
		blog: '部落格',
		categories: '分類',
		category: '分類',
		author: '作者',
		contact: '聯絡我們',
		'about-us': '關於我們',
		faq: '常見問題',
		'privacy-policy': '隱私權政策',
		'terms-of-service': '服務條款',
		'cookie-policy': 'Cookie政策',
		gdpr: 'GDPR',
		'meet-the-team': '認識團隊',
		equipment: '設備',
		sitemap: '網站地圖',
		'thank-you': '感謝您'
	},
	// Hero
	hero: {
		span: '適用於各類型活動',
		titlePart1: '馬拉加影音設備',
		titleGradient: '出租',
		titlePart2: '服務',
		subtitle: '透過我們的頂級設備，體驗清晰音效與絢麗燈光，完美適合太陽海岸的婚禮、企業活動及尊榮派對。',
		viewPricing: '查看價格',
		contactUs: '聯絡我們'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 完美搭建',
		card1Text: '專屬技術支援全程陪伴，確保您的活動從頭到尾順利無憂。',
		card2Title: '#2 客製化方案',
		card2Text: '彈性租賃方案，完美貼合各種活動規模、場地與預算。',
		card3Title: '#3 尖端科技',
		card3Text: '盡享最先進的影音設備，全面提升您活動製作的視覺與音效品質。'
	},
	// Overview (At a Glance, answer-engine optimization)
	overview: {
		badge: '一覽重點',
		sellQ: '我們提供什麼服務？',
		sellA: '我們為馬拉加及太陽海岸地區的各類活動提供頂級影音設備租賃服務，包含專業音響系統、舞台燈光、投影機與螢幕，並提供運送、搭建及現場技術支援。',
		whoQ: '適合哪些人？',
		whoA: '適合籌備婚禮的新人、舉辦會議與企業活動的公司，以及希望擁有完美音效與燈光又不必購買設備的派對或私人慶祝活動主辦人。',
		costQ: '費用是多少？',
		costA: '固定價格方案，無隱藏費用，依活動規模調整；大型製作另提供客製化報價。',
		costFrom: '起價',
		howQ: '服務流程如何進行？',
		howA: '只需四個簡單步驟：選擇方案、申請報價，我們確認並準備設備，活動當天由團隊負責運送與搭建。'
	},
	// Impact
	impact: {
		title: '我們的成果數據',
		years: '年經驗',
		clients: '滿意客戶',
		satisfaction: '滿意度'
	},
	// Categories
	categories: {
		badge: '頂級設備',
		title: '可選設備類別',
		soundTitle: '音響系統',
		soundText: '清晰逼真的高保真音效，無論是溫馨婚禮或大型企業會議都能完美呈現。我們選用頂尖品牌，確保最佳聲學品質。',
		lightTitle: '燈光',
		lightText: '多變的燈光方案，為您的活動場地營造完美氛圍。',
		visualTitle: '投影機與螢幕',
		visualText: '清晰高畫質視覺效果，為簡報活動帶來震撼視覺衝擊。',
		fxTitle: '特殊效果與煙霧機',
		fxText: '透過我們專業級的特殊效果與煙霧機，為您的活動打造驚艷氛圍。',
		bookEquipment: '預約方案'
	},
	// Pricing
	pricing: {
		badge: '透明定價',
		title: '為每場活動量身打造的方案',
		subtitle: '從我們彈性的租賃方案中挑選，完美貼合任何活動規模與預算。讓籌備活動變得簡單！',
		includes: '包含項目：',
		includedServices: '包含服務：',
		optional: '選配項目：',
		check: '查詢可預約狀態',
		mostPopular: '最受歡迎',
		from: '起價',
		plusVat: '（另加{vat}加值稅）',
		plusVatShort: '（另計加值稅）',
		bookPack: '預約'
	},
	// Packages filters (e-commerce)
	filters: {
		title: '篩選條件',
		clearAll: '清除全部',
		resetFilters: '重設篩選',
		showingResults: '顯示 {total} 個方案中的 {visible} 個',
		noResults: '沒有符合篩選條件的方案，請試著清除部分選項！',
		openFilters: '篩選條件',
		done: '顯示結果',
		purpose: '活動類型',
		capacity: '活動規模',
		price: '預算',
		equipment: '包含設備',
		extras: '選配加購',
		sortBy: '排序方式',
		party: '派對',
		wedding: '婚禮',
		corporate: '企業活動',
		presentation: '簡報活動',
		meeting: '會議',
		small: '小型（最多50位賓客）',
		medium: '中型（51至80位賓客）',
		large: '大型（80位以上賓客）',
		priceLow: '{price:budgetLow}以下',
		priceMid: '{price:budgetLow}至{price:budgetHigh}',
		priceHigh: '{price:budgetHigh}以上',
		transport: '運送與搭建',
		screen: '螢幕／投影幕',
		sound: '音響系統',
		microphone: '麥克風',
		lighting: '氛圍燈光',
		technician: '現場技術人員',
		projector: '投影機',
		smokeMachine: '煙霧機',
		technicalAssistant: '技術助理',
		lectern: '講台',
		staging: '舞台搭建',
		recommended: '推薦',
		priceAsc: '價格：由低到高',
		priceDesc: '價格：由高到低'
	},
	// Contact
	contact: {
		badge: '24/7 即時回覆',
		title: '聯絡我們',
		subtitle: '準備好提升您的活動了嗎？聯絡我們的技術團隊，取得客製化報價、查詢設備可預約狀態，並獲得專業建議。',
		detailsTitle: '聯絡資訊',
		phone: '電話',
		whatsapp: 'WhatsApp',
		email: '電子郵件',
		location: '地點',
		hours: '營業時間',
		hoursText: '技術支援與物流服務全年無休，每天24小時提供。',
		reqTitle: '申請報價',
		formName: '姓名 *',
		formEmail: '電子郵件地址 *',
		formPhone: '聯絡電話',
		formDate: '活動日期',
		formType: '活動類型',
		formTypeWedding: '婚禮／慶祝活動',
		formTypeCorporate: '企業活動',
		formTypeParty: '私人派對',
		formTypeMice: '會議／MICE活動',
		formTypeOther: '其他類型活動',
		formMessage: '活動細節與技術需求 *',
		formSubmit: '送出申請',
		formSubmitting: '傳送中...',
		formRequiredError: '請填寫所有必填欄位。',
		formErrorSubmit: '送出您的申請時發生問題，請重試或直接寄信給我們。',
		formErrorTurnstile: '安全驗證失敗，請重試。',
		formErrorRateLimited: '請求次數過多，請稍候幾分鐘後再試。',
		lockedFieldNote: '此欄位由錯誤訊息自動產生，無法編輯。',
		errorPrefillMessage:
			'您好，我先前在您的網站提交了方案申請，但確認信寄送失敗。可以請您確認是否已收到我的詢問嗎？參考編號：{ref}',
		errorDetailsHeader: '已提交的詳細資訊：',
		errorDetailSource: '表單網址',
		errorDetailName: '姓名',
		errorDetailEmail: '電子郵件',
		errorDetailPhone: '電話',
		errorDetailDate: '活動日期',
		errorDetailPackage: '方案',
		errorDetailComments: '備註',
		successTitle: '報價申請已送出！',
		successText1: '您好',
		successText2: '我們已成功收到您的申請。馬拉加的技術團隊將進行評估，並盡快透過電子郵件（',
		successText3: '）與您聯絡。',
		successButton: '送出另一則申請',
		faqTitle: '常見問題'
	},
	// Packages Showcase
	packages: {
		badge: '精選方案',
		title: '選擇最適合您的方案',
		subtitle: '為每種場合量身打造。所有方案均包含運送、搭建及現場技術支援。',
		enquire: '取得報價'
	},
	// How It Works
	process: {
		badge: '服務流程',
		title: '四個簡單步驟完成您的活動',
		s1Title: '選擇方案',
		s1Desc: '瀏覽我們的方案，挑選最符合活動規模與風格的一款。',
		s2Title: '申請報價',
		s2Desc: '填寫簡短表單，我們會盡快回覆並告知完整的可預約狀態。',
		s3Title: '確認並規劃',
		s3Desc: '我們的團隊確認物流、場地進出安排及每項技術細節。',
		s4Title: '享受您的活動',
		s4Desc: '我們負責搭建、執行與收尾，讓您零壓力享受活動。'
	},
	// Pricing Preview
	pricingPreview: {
		badge: '透明定價',
		title: '簡單、一價全包的定價',
		subtitle: '沒有隱藏費用，運送、搭建及技術支援一律包含在內。',
		viewAll: '查看所有方案'
	},
	// FAQ
	faq: {
		badge: '常見問題',
		title: '常見問題'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: '客戶評價',
		title: '來自真實活動的真實故事',
		subtitle: '來自太陽海岸各地客戶的已驗證Google評論。',
		ratingLabel: '優異',
		basedOn: '根據 {n} 則評論',
		poweredBy: '顯示我們的最新評論',
		readMore: '閱讀更多',
		readLess: '收合內容',
		seeAll: '查看所有評論',
		prevAria: '上一則評論',
		nextAria: '下一則評論',
		outOfFiveStars: '滿分5顆星'
	},
	// Lead capture form
	leadForm: {
		title: '搶先預留您的活動日期',
		subtitle: '填寫表單，我們會盡快與您聯繫。',
		nameLabelInput: '姓名 *',
		emailLabelInput: '電子郵件地址 *',
		phoneLabelInput: '電話／WhatsApp *',
		eventDateLabel: '活動日期 *',
		commentsLabel: '問題或備註',
		commentsPlaceholder: '請告訴我們您的活動資訊：場地、賓客人數、特殊需求...',
		submitBtn: '查詢日期可預約狀態',
		submitting: '傳送中...',
		errorRequired: '此欄位為必填。',
		errorEmail: '請輸入有效的電子郵件地址。',
		errorPhone: '請輸入有效的電話號碼。',
		errorDateFuture: '活動日期必須為未來日期。',
		errorMinLength: '至少需輸入2個字元。',
		errorMaxLength: '最多可輸入1000個字元。',
		errorHoneypot: '偵測到垃圾訊息。',
		noCardRequired: '查詢可預約狀態無需信用卡',
		quickResponseNote: '我們會盡快回覆',
		errorSubmit: '發生錯誤，請重試或直接與我們聯絡。',
		errorTurnstile: '安全驗證失敗，請重試。',
		errorRateLimited: '請求次數過多，請稍候幾分鐘後再試。',
		emailFailTitle: '確認信寄送失敗',
		emailFailBody: '您的申請已儲存，但我們的郵件系統寄送失敗。請直接與我們的團隊聯絡，以免遺漏您的詢問。',
		emailFailAction: '聯絡團隊',
		emailFailDismiss: '關閉',
		countryCode: '國碼',
		responseTime: '我們會盡快回覆',
		trustBadge: '超過500場馬拉加活動的信賴之選'
	},
	// Thank-you page
	thankYou: {
		headline: '感謝您！您的申請已送出。',
		subheadline: '我們已收到您的詢問，將盡快與您聯繫。',
		responseTime: '預期回覆時間：盡快回覆',
		backToPackages: '瀏覽所有方案',
		whatsappCta: '或立即透過WhatsApp與我們聯繫',
		leadLabel: '參考編號'
	},
	// Gallery
	gallery: {
		titleHome: '我們的活動實錄',
		titlePackage: '過往{pack}活動'
	},
	// Google Map / Profile
	googleMap: {
		badge: '地點與Google商家檔案',
		title: '在Google上找到我們',
		subtitle: '造訪我們官方的Google商家檔案，或查看我們在馬拉加的位置。',
		viewOnGoogle: '在Google地圖上查看',
		mapTitle: 'Malaga Event Gear | Google商家檔案'
	},
	// Footer
	footer: {
		brandSubtitle:
			'為馬拉加及太陽海岸的尊榮活動提供頂級音響、燈光及螢幕租賃服務。最先進的設備搭配客製化技術支援。',
		usefulLinks: '實用連結',
		home: '首頁',
		packages: '方案',
		blog: '部落格',
		news: '新聞',
		categories: '分類',
		aboutUs: '關於我們',
		meetTheTeam: '認識團隊',
		contactUs: '聯絡我們',
		termsOfService: '服務條款',
		privacyPolicy: '隱私權政策',
		cookiePolicy: 'Cookie政策',
		gdpr: 'GDPR',
		faq: '常見問題',
		sitemap: '網站地圖',
		servicePackages: '服務方案',
		localAddress: '公司地址',
		listings: '商家列表',
		onlinePresence: '線上據點',
		moreInformation: '更多資訊',
		moreInfoText: '需要更多細節嗎？歡迎聯絡我們，了解活動設備租賃、價格與可預約狀態。',
		tel: '電話',
		clickToChat: '點擊開始對話',
		emails: '電子郵件',
		forHire: '租賃詢問',
		forContact: '一般聯絡',
		forLegal: '法律事務',
		allRightsReserved: '版權所有。',
		developedBy: '開發者',
		lorenzozTitle: 'Lorenzoz Agency：網站開發與商業解決方案公司',
		mailAriaLabel: '寄送電子郵件',
		callAriaLabel: '致電 Malaga Event Gear：{phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: '新聞',
		byAuthor: '作者',
		updated: '更新於',
		shareInlineLabel: '分享本文：',
		shareSidebarLabel: '分享本文',
		shareDrawerTitle: '分享這篇文章',
		copiedShort: '已複製！',
		copiedExclaim: '已複製！',
		copyShort: '複製連結',
		copyLink: '複製連結',
		shareOnAria: '分享至{network}',
		copyLinkAria: '複製連結至剪貼簿',
		openSharingAria: '開啟分享選項',
		closeSharingAria: '關閉分享選項',
		tweetLabel: '推文',
		tweetAria: '推文分享選取的文字',
		packagesSidebarAria: '活動方案側邊欄',
		tocSidebarAria: '目錄側邊欄'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: '與我們聊聊'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: '找不到頁面',
		genericHeading: '發生錯誤',
		notFoundBody: '您要找的頁面不存在或已移動。請從首頁重新瀏覽，或與我們聯絡。',
		genericBody: '處理您的請求時發生問題。請返回首頁或與我們聯絡，我們會協助您解決。',
		contactUs: '聯絡我們',
		backHome: '返回首頁'
	}
} satisfies Messages;

export default t;
