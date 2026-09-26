import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: '器材',
		packages: '套餐',
		blog: '網誌',
		contact: '聯絡我們',
		bookNow: '立即預約',
		blogInEnglish: '網誌（英文版）',
		language: '語言',
		breadcrumbs: '麵包屑導覽',
		brand: 'Malaga Event Gear',
		toggleTheme: '切換顏色主題',
		openMenu: '開啟導覽選單'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: '我們只以英語或西班牙語回覆。',
		legalTranslation: '本文為翻譯版本。如與英文版本有出入，一律以英文版本為準。',
		readEnglish: '查看英文版本'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: '首頁',
		packages: '套餐',
		blog: '網誌',
		categories: '分類',
		category: '分類',
		author: '作者',
		contact: '聯絡我們',
		'about-us': '關於我們',
		faq: '常見問題',
		'privacy-policy': '私隱政策',
		'terms-of-service': '服務條款',
		'cookie-policy': 'Cookie政策',
		gdpr: '資料保障',
		'meet-the-team': '認識團隊',
		equipment: '器材',
		sitemap: '網站地圖',
		'thank-you': '多謝'
	},
	// Hero
	hero: {
		span: '適用於各類型活動',
		titlePart1: '馬拉加視聽器材',
		titleGradient: '租借',
		titlePart2: '服務',
		subtitle: '透過我們的頂級器材，體驗清晰音效與璀璨燈光，是太陽海岸婚禮、企業活動及尊尚派對的完美之選。',
		viewPricing: '查看價格',
		contactUs: '聯絡我們'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 零失誤搭建',
		card1Text: '專屬技術支援全程陪同，確保您的活動由頭到尾順利進行，毋須憂慮。',
		card2Title: '#2 度身訂造套餐',
		card2Text: '靈活的租借套餐，完美配合各種活動規模、場地與預算。',
		card3Title: '#3 頂尖科技',
		card3Text: '享用最先進的視聽器材，全面提升活動製作的視覺與音效質素。'
	},
	// Overview (At a Glance, answer-engine optimization)
	overview: {
		badge: '一覽重點',
		sellQ: '我們提供什麼服務？',
		sellA: '我們為馬拉加及太陽海岸地區的各類活動提供頂級視聽器材租借服務，包括專業音響系統、舞台燈光、投影機與熒幕，並提供運送、搭建及現場技術支援。',
		whoQ: '適合什麼人使用？',
		whoA: '適合籌備婚禮的新人、舉辦會議與企業活動的公司，以及希望擁有完美音效與燈光，而毋須購買器材的派對或私人慶祝活動主辦人。',
		costQ: '費用是多少？',
		costA: '固定價格套餐，無隱藏收費，按活動規模調整；大型製作另提供度身訂造報價。',
		costFrom: '起價',
		howQ: '服務流程是怎樣的？',
		howA: '只需四個簡單步驟：選擇套餐、申請報價，我們確認並準備器材，活動當日由團隊負責運送及搭建。'
	},
	// Impact
	impact: {
		title: '我們的成績數字',
		years: '年經驗',
		clients: '滿意客戶',
		satisfaction: '滿意度'
	},
	// Categories
	categories: {
		badge: '頂級器材',
		title: '可供選擇的器材類別',
		soundTitle: '音響系統',
		soundText: '清晰逼真的高保真音效，無論是溫馨婚禮還是大型企業會議都能完美呈現。我們選用頂尖品牌，確保最佳音效質素。',
		lightTitle: '燈光',
		lightText: '多變的燈光方案，為您的活動場地營造完美氣氛。',
		visualTitle: '投影機與熒幕',
		visualText: '清晰高清視覺效果，為簡報活動帶來強烈視覺衝擊。',
		fxTitle: '煙霧機',
		fxText: '使用我們專業的Martin Magnum 650煙霧機，為您的舞池或舞台增添氣氛。',
		bookEquipment: '預約套餐'
	},
	// Pricing
	pricing: {
		badge: '透明定價',
		title: '為每場活動度身訂造的套餐',
		subtitle: '由我們靈活的租借套餐中挑選，完美配合任何活動規模與預算，讓籌辦活動變得簡單！',
		includes: '包含項目：',
		includedServices: '包含服務：',
		optional: '選配項目：',
		check: '查詢可預約狀況',
		mostPopular: '最受歡迎',
		from: '起價',
		plusVat: '（另加{vat}增值稅）',
		plusVatShort: '（另加增值稅）',
		bookPack: '預約'
	},
	// Packages filters (e-commerce)
	filters: {
		title: '篩選條件',
		clearAll: '清除全部',
		resetFilters: '重設篩選',
		showingResults: '顯示 {total} 個套餐中的 {visible} 個',
		noResults: '沒有符合篩選條件的套餐，不妨試試清除部分選項！',
		openFilters: '篩選條件',
		done: '顯示結果',
		purpose: '活動類型',
		capacity: '活動規模',
		price: '預算',
		equipment: '包含器材',
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
		screen: '熒幕／投影幕',
		sound: '音響系統',
		microphone: '咪高峰',
		lighting: '氣氛燈光',
		technician: '現場技術人員',
		projector: '投影機',
		smokeMachine: '煙霧機',
		technicalAssistant: '技術助理',
		lectern: '講台',
		staging: '舞台搭建',
		recommended: '推薦',
		priceAsc: '價格：由低至高',
		priceDesc: '價格：由高至低'
	},
	// Contact
	contact: {
		badge: '24小時全天候即時回覆',
		title: '聯絡我們',
		subtitle: '準備好提升您的活動水準？請聯絡我們的技術團隊，索取度身訂造報價、查詢器材可預約狀況，並獲取專業意見。',
		detailsTitle: '聯絡資料',
		phone: '電話',
		whatsapp: 'WhatsApp',
		email: '電郵',
		location: '地點',
		hours: '營業時間',
		hoursText: '技術支援與物流服務全年無休，每日24小時提供。',
		reqTitle: '申請報價',
		formName: '全名 *',
		formEmail: '電郵地址 *',
		formPhone: '聯絡電話',
		formDate: '活動日期',
		formType: '活動類型',
		formTypeWedding: '婚禮／慶祝活動',
		formTypeCorporate: '企業活動',
		formTypeParty: '私人派對',
		formTypeMice: '會議／MICE活動',
		formTypeOther: '其他類型活動',
		formMessage: '活動詳情與技術需求 *',
		formSubmit: '送出申請',
		formSubmitting: '正在傳送',
		formRequiredError: '請填妥所有必填欄位。',
		formErrorSubmit: '送出申請時發生問題，請重試或直接電郵給我們。',
		formErrorTurnstile: '安全驗證失敗，請重試。',
		formErrorRateLimited: '請求次數過多，請稍候幾分鐘後再試。',
		lockedFieldNote: '此欄位由錯誤訊息自動產生，無法編輯。',
		errorPrefillMessage:
			'您好，我早前在貴公司網站提交了套餐申請，但確認電郵未能成功寄出。可否請您確認已收到我的查詢？參考編號：{ref}',
		errorDetailsHeader: '已提交的詳細資料：',
		errorDetailSource: '表格網址',
		errorDetailName: '姓名',
		errorDetailEmail: '電郵',
		errorDetailPhone: '電話',
		errorDetailDate: '活動日期',
		errorDetailPackage: '套餐',
		errorDetailComments: '備註',
		successTitle: '報價申請已送出！',
		successText1: '您好',
		successText2: '我們已成功收到您的申請。馬拉加的技術團隊將會評估，並盡快透過電郵（',
		successText3: '）與您聯絡。',
		successButton: '送出另一則申請',
		faqTitle: '常見問題'
	},
	// Packages Showcase.
	packages: {
		badge: '精選套餐',
		title: '選擇最適合您的套餐',
		subtitle: '為每種場合度身訂造。所有套餐均包含運送、搭建及現場技術支援。',
		enquire: '索取報價'
	},
	// How It Works
	process: {
		badge: '服務流程',
		title: '四個簡單步驟成就您的活動',
		s1Title: '選擇套餐',
		s1Desc: '瀏覽我們的套餐，挑選最切合活動規模與風格的一款。',
		s2Title: '申請報價',
		s2Desc: '填妥簡短表格，我們會盡快回覆並告知完整的可預約狀況。',
		s3Title: '確認並規劃',
		s3Desc: '我們的團隊會確認物流、場地出入安排及每項技術細節。',
		s4Title: '享受您的活動',
		s4Desc: '我們負責運送、安裝及測試所有器材，並在活動結束後收回，讓您毫無壓力地享受活動。'
	},
	// Pricing Preview
	pricingPreview: {
		badge: '透明定價',
		title: '簡單、一價全包的收費',
		subtitle: '沒有隱藏收費，運送、搭建及技術支援一律已包含在內。',
		viewAll: '查看所有套餐'
	},
	// FAQ
	faq: {
		badge: '常見問題',
		title: '常見問題'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: '客戶評價',
		title: '真實活動的真實故事',
		subtitle: '來自太陽海岸各地客戶的已驗證Google評論。',
		ratingLabel: '優異',
		basedOn: '根據 {n} 則評論',
		poweredBy: '顯示我們的最新評論',
		readMore: '閱讀更多',
		readLess: '收合內容',
		seeAll: '查看所有評論',
		prevAria: '上一則評論',
		nextAria: '下一則評論',
		outOfFiveStars: '滿分5星'
	},
	// Lead capture form
	leadForm: {
		title: '預留您的活動日期',
		subtitle: '請填妥表格，我們會盡快與您聯絡。',
		nameLabelInput: '全名 *',
		emailLabelInput: '電郵地址 *',
		phoneLabelInput: '電話／WhatsApp *',
		eventDateLabel: '活動日期 *',
		commentsLabel: '問題或備註',
		commentsPlaceholder: '請告訴我們您活動的詳情：場地、賓客人數及特別需求等',
		submitBtn: '查詢日期可預約狀況',
		submitting: '正在傳送',
		errorRequired: '此欄位為必填。',
		errorEmail: '請輸入有效的電郵地址。',
		errorPhone: '請輸入有效的電話號碼。',
		errorDateFuture: '活動日期必須為未來日期。',
		errorMinLength: '至少須輸入2個字元。',
		errorMaxLength: '最多可輸入1000個字元。',
		errorHoneypot: '偵測到垃圾訊息。',
		noCardRequired: '查詢可預約狀況毋須信用卡',
		quickResponseNote: '我們會盡快回覆',
		errorSubmit: '發生錯誤，請重試或直接與我們聯絡。',
		errorTurnstile: '安全驗證失敗，請重試。',
		errorRateLimited: '請求次數過多，請稍候幾分鐘後再試。',
		emailFailTitle: '確認電郵未能寄出',
		emailFailBody: '您的申請已儲存，但我們的電郵系統寄送失敗。請直接與我們的團隊聯絡，以免遺漏您的查詢。',
		emailFailAction: '聯絡團隊',
		emailFailDismiss: '關閉',
		countryCode: '國碼',
		responseTime: '我們會盡快回覆',
		trustBadge: '深受{clients}位客戶信賴'
	},
	// Thank-you page
	thankYou: {
		headline: '多謝！您的申請已經送出。',
		subheadline: '我們已收到您的查詢，並會盡快與您聯絡。',
		responseTime: '預期回覆時間：盡快回覆',
		backToPackages: '瀏覽所有套餐',
		whatsappCta: '或立即透過WhatsApp與我們聯絡',
		leadLabel: '參考編號'
	},
	// Gallery
	gallery: {
		titleHome: '活動場景及靈感',
		titlePackage: '{pack}：場景及靈感'
	},
	// Google Map / Profile
	googleMap: {
		badge: '地點與Google商家檔案',
		title: '在Google搜尋我們',
		subtitle: '瀏覽我們官方的Google商家檔案，或查看我們在馬拉加的位置。',
		viewOnGoogle: '在Google地圖查看',
		mapTitle: 'Malaga Event Gear | Google商家檔案'
	},
	// Footer
	footer: {
		brandSubtitle:
			'為馬拉加及太陽海岸的尊尚活動，提供頂級音響、燈光及熒幕租借服務。最先進的器材，配合度身訂造的技術支援。',
		usefulLinks: '實用連結',
		home: '首頁',
		packages: '套餐',
		blog: '網誌',
		news: '新聞',
		categories: '分類',
		aboutUs: '關於我們',
		meetTheTeam: '認識團隊',
		contactUs: '聯絡我們',
		termsOfService: '服務條款',
		privacyPolicy: '私隱政策',
		cookiePolicy: 'Cookie政策',
		gdpr: '資料保障',
		faq: '常見問題',
		sitemap: '網站地圖',
		servicePackages: '服務套餐',
		localAddress: '本地地址',
		listings: '商戶名錄',
		onlinePresence: '網上據點',
		moreInformation: '更多資訊',
		moreInfoText: '想了解更多詳情？歡迎聯絡我們，查詢活動器材租借、價格及可預約狀況。',
		tel: '電話',
		clickToChat: '按此開始對話',
		emails: '電郵',
		forHire: '租借查詢',
		forContact: '一般聯絡',
		forLegal: '法律事宜',
		allRightsReserved: '版權所有。',
		developedBy: '開發者',
		lorenzozTitle: 'Lorenzoz Agency：網站開發及商業方案公司',
		mailAriaLabel: '發送電郵',
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
		tweetAria: '推文分享所選文字',
		packagesSidebarAria: '活動套餐側邊欄',
		tocSidebarAria: '目錄側邊欄'
	},
	blogStructure: {
		faqHeadings: ['常見問題', '常見問題解答', '常見問答'],
		overviewHeadings: ['概述', '簡介', '概覽'],
		highlightsHeadings: ['要點', '重點', '亮點'],
		testimonialsHeadings: ['客戶評價', '客戶評語'],
		tocHeadings: ['目錄'],
		inThisArticle: '本文內容',
		tocAria: '目錄',
		faqAria: '常見問題'
	},
	postCta: {
		aria: '為您推薦的活動套餐',
		headline: {
			wedding: '正在馬拉加籌備婚禮？',
			'basic-mice': '正在籌辦企業活動？',
			mice: '需要高端會展視聽支援？',
			'product-presentation': '要推出新產品或進行演示？',
			eco: '正在籌備私人活動？'
		},
		subline: {
			wedding: '選擇{name}：專業音響與浪漫燈光，為您的大日子增色。',
			'basic-mice': '選擇{name}：清晰的視聽設備，適合管理層會議與研討會。',
			mice: '選擇{name}：高端LED顯示屏、音響及現場技術人員。',
			'product-presentation': '選擇{name}：高亮度投影機、投影幕與音響，令演示更具感染力。',
			eco: '選擇{name}：出色的音響與氛圍燈光，適合最多{guests}位賓客的活動。'
		},
		priceFrom: '{price}起',
		viewPackage: '查看{name}',
		freeQuote: '免費索取報價'
	},
	packagesRail: {
		title: '我們的套餐',
		aria: '活動套餐',
		priceFrom: '{price}起'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: '與我們聊聊'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: '找不到頁面',
		genericHeading: '發生錯誤',
		notFoundBody: '您要找的頁面不存在或已經移動。請由首頁重新瀏覽，或與我們聯絡。',
		genericBody: '處理您的請求時發生問題。請返回首頁或與我們聯絡，我們會協助您解決。',
		contactUs: '聯絡我們',
		backHome: '返回首頁'
	}
} satisfies Messages;

export default t;
