import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: '專為馬拉加最多50位賓客的私人派對或小型活動而設，內含紮實的基本音響與氣氛燈光。',
			includes: [
				'2個高質素主動式喇叭（連腳架）',
				'1支有線動圈式咪高峰',
				'2組RGBW LED射燈燈排',
				'美觀理線與專業搭建'
			],
			optional: ['投影機及投影幕（+{price:projectorScreen}）', '專業煙霧機（+{price:smokeMachine}）'],
			seo: { title: 'Eco Pack：馬拉加小型派對音響燈光租借 | MEG' },
			landing: {
				badge: '小型活動與派對',
				rateLabel: '超值全包價格',
				vatNote: '（另加{vat}增值稅，已含搭建及運送）',
				specTitle: '最多50位賓客',
				specBody: '適合別墅、花園及私人廳房。',
				highlightTitle: '零壓力服務',
				highlightBody:
					'我們採用純送貨到場模式，由我們直接搭建。我們會運送器材、專業安裝、測試音效與燈光，並在活動結束後回收所有器材。',
				includesLabel: '包含項目',
				optionalLabel: '選配加購',
				ctaHeading: '立即預留您的檔期',
				ctaBody: '填妥我們的快速技術報價申請表，查詢您的活動日期是否可預約。我們會盡快與您聯絡！',
				ctaButton: '預約此套餐'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: '為馬拉加浪漫難忘的婚禮而精心設計，內含高階專業音響系統、浪漫氣氛燈光，以及供致辭用的無線咪高峰。',
			includes: [
				'高階主動式PA音響系統，適用最多80位賓客',
				'星星燈／暖色LED燈串，營造浪漫氣氛燈光',
				'專業無線咪高峰，供致辭及宣布事項使用',
				'馬拉加及周邊地區運送服務',
				'專業美觀搭建與理線',
				'活動期間現場技術控制及工程支援',
				'活動結束後迅速拆卸及物流收回'
			],
			optional: ['專業煙霧機（+{price:smokeMachine}）'],
			seo: { title: 'Wedding Pack：馬拉加婚禮音響與浪漫燈光 | MEG' },
			landing: {
				badge: '我們最受歡迎的慶典套餐',
				rateLabel: '尊尚全包價格',
				vatNote: '（另加{vat}增值稅，已含搭建及現場支援）',
				specTitle: '最多80位賓客',
				specBody: '適合美麗的別墅、莊園及婚宴酒店。',
				highlightTitle: '駐場技術人員',
				highlightBody:
					'毋須再擔心咪高峰回授或視覺問題。此套餐在整場婚宴及致辭期間，提供完整的現場技術監控及音響調整。',
				includesLabel: '尊尚包含項目',
				ctaHeading: '成就您夢幻的慶典時刻',
				ctaBody:
					'婚禮預約檔期經常迅速額滿。立即聯絡我們的技術團隊預留日期，為您的重要一天呈現最頂級的音響與浪漫燈光。',
				ctaButton: '預約此婚禮套餐'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: '為企業簡報、經銷商展示及新品發佈而設的投影機熒幕套餐，帶來強烈的視覺衝擊，服務範圍涵蓋馬拉加地區。',
			includes: [
				'1面連穩固腳架的前投式投影幕',
				'1部高亮度投影機（5000流明），呈現清晰畫質',
				'含2支喇叭及混音控制台的場地音響系統',
				'1支高階無線手持咪高峰，供講者使用'
			],
			seo: { title: 'Product Presentation Pack：馬拉加新品發佈投影音響租借 | MEG' },
			landing: {
				badge: '高視覺衝擊力的企業方案',
				rateLabel: '簡報套餐定額價格',
				vatNote: '（另加{vat}增值稅，已含投影機及熒幕）',
				specTitle: '高亮度投影機',
				specBody: '5000流明投影機，適合光線充足的場地。',
				highlightTitle: '完美呈現企業品牌形象',
				highlightBody:
					'為您的經銷商發佈會、酒店記者會或新品展示爭取最大關注度。我們的專業搭建結合精細的畫面細節與高效能的語音擴音。',
				includesLabel: '包含項目',
				note: {
					title: '搭建與連接支援',
					body: '我們提供所有必要的轉接器（HDMI、USB-C）及音訊介面，讓您公司的手提電腦、平板或播放裝置能夠無縫連接。'
				},
				ctaHeading: '提升您的產品展示效果',
				ctaBody: '為您的觀眾帶來應有的清晰視覺及專業音效。立即聯絡我們的技術團隊確認可預約狀況。',
				ctaButton: '預約此簡報套餐'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: '為最多40位賓客的小型行政會議、研討會及簡報而設的必備高效能視聽器材套餐，服務馬拉加地區的小型企業會議需求。',
			includes: [
				'2x2米投影幕，配合高亮度3000流明投影機',
				'基本清晰擴音系統，適用最多40人',
				'1支專業鵝頸咪高峰，供講台使用',
				'物流運送、搭建及美觀理線'
			],
			optional: ['專屬現場技術助理（+{price:technicianDay}／日）'],
			seo: { title: 'Basic MICE Pack：馬拉加小型企業會議視聽 | MEG' },
			landing: {
				badge: '必備行政會議套餐',
				rateLabel: '企業會議定額價格',
				vatNote: '（另加{vat}增值稅，已含搭建及運送）',
				specTitle: '最多40位賓客',
				specBody: '適合董事會議室、私人廳房及酒店套房。',
				highlightTitle: '清晰語音辨識度',
				highlightBody:
					'專業鵝頸咪高峰配置，確保董事致辭、記者會或投資者座談時擁有絕對清晰的語音，不受回音或回授干擾。',
				includesLabel: '包含項目',
				optionalLabel: '選配支援',
				ctaHeading: '規劃您的行政會議',
				ctaBody: '與Malaga Event Gear攜手打造流暢的企業視聽物流安排。聯繫我們的專家，打造專業的董事會議室體驗。',
				ctaButton: '預約Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-26',
			desc: '全方位企業MICE會展方案，配備大型顯示熒幕、優質主動式擴音系統、鵝頸咪高峰及無線手持咪高峰，以及專屬現場技術人員支援，適用於馬拉加的大型會展音響投影需求。',
			includes: [
				'60吋高清LED顯示熒幕，附設計款腳架',
				'專業主動式喇叭及高效能音響系統',
				'1支鵝頸咪高峰＋1支無線手持咪高峰',
				'1名專屬視聽技術人員（最長連續支援6小時）',
				'物流配送、度身訂造理線搭建及活動結束後拆卸'
			],
			optional: [
				'額外現場技術支援時數（+{price:technicianHour}／小時）',
				'高級亞加力現代講台（+{price:lectern}）',
				'組合式舞台平台／舞台搭建（每平方米+{price:stagingPerSqm}）'
			],
			seo: { title: 'MICE Pack：馬拉加大型會展音響投影 | MEG' },
			landing: {
				badge: '尊尚企業MICE體驗',
				rateLabel: '企業全包價格',
				vatNote: '（另加{vat}增值稅，已含LED顯示熒幕、音響及現場技術人員）',
				specTitle: '60吋LED顯示熒幕',
				specBody: '大型高清顯示熒幕，呈現震撼的企業視覺效果。',
				highlightTitle: '專屬現場技術人員',
				highlightBody:
					'專業視聽技術人員全程執行您的活動，最長連續6小時，確保高峰會、研討會或新品發佈全程音效、畫面及咪高峰管理零失誤。',
				includesLabel: '尊尚包含項目',
				optionalLabel: '選配加購',
				ctaHeading: '為您的企業活動注入能量',
				ctaBody: '透過優質視聽器材及專屬技術支援，打造完美的企業體驗。立即聯繫我們的團隊，確認您的活動日期可預約狀況。',
				ctaButton: '預約MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Malaga Event Gear（MEG）是什麼公司？他們提供什麼服務？',
			answer:
				'Malaga Event Gear（MEG）是一間位於西班牙馬拉加、專營專業視聽、燈光及活動器材租借的公司。我們提供音響系統、投影機、熒幕、舞台、技術協助、一部煙霧機、燈光方案與咪高峰，並提供現場擴音等專業服務，以及透過合作的外判夥伴安排的同步傳譯及互動投票系統。'
		},
		'event-types': {
			question: 'Malaga Event Gear（MEG）可以承辦哪些類型的活動？',
			answer:
				'我們涵蓋婚禮、私人派對等個人慶祝活動；企業活動、會議、研討會及產品發佈等專業聚會；以及大會、展覽會及展銷會等大型活動，並一直提供度身訂造的視聽方案。'
		},
		'service-areas': {
			question: 'Malaga Event Gear（MEG）的服務範圍涵蓋哪些地區？',
			answer:
				'雖然公司名稱有「馬拉加」，但我們的服務範圍遠不止這個城市。我們主要服務整個太陽海岸地區，包括馬拉加市、馬貝拉、Coín、Ronda、Mijas、Nerja、Torremolinos、Fuengirola、Benalmadena及Estepona。我們亦服務塞維利亞及格拉納達，不過由於前往格拉納達屬跨省長途交通，預約金額一般須超過{price:outOfProvinceMinimum}。'
		},
		'what-makes-unique': {
			question: '相較於其他視聽租借公司，Malaga Event Gear（MEG）有什麼獨特之處？',
			answer:
				'MEG以顧客為中心且流程精簡的方式脫穎而出：每項預約皆由我們自己的團隊負責送貨及專業安裝，Wedding Pack及MICE Pack更包括駐場技術人員、頂級品牌器材，以及透明的一價全包定價。我們正朝向100%網上預約體驗邁進，提供標準化固定價格及完全透明的交易流程。'
		},
		'booking-process': {
			question: 'Malaga Event Gear的預約流程是怎樣進行的？',
			answer:
				'我們的流程精簡，分為四個步驟：1. 選擇您的套餐。2. 使用我們的快速查詢表格申請報價。3. 我們的團隊會與您聯絡，確認細節並完成預約。4. 由我們負責運送、專業搭建、設置及拆卸，讓您毫無壓力地享受活動。請注意，所有服務至少須於24小時前預約。'
		},
		'popular-packages': {
			question: 'Malaga Event Gear提供哪些熱門套餐？',
			answer:
				'我們最受歡迎的預設套餐包括{packagesWithPrices}，各套餐配備不同的器材與特色。歡迎瀏覽我們的價格頁面，查看每個套餐的完整內容明細。'
		},
		'language-hours': {
			question: '他們使用什麼語言與客戶溝通？營業時間為何？',
			answer:
				'Malaga Event Gear（MEG）以英語或西班牙語與客戶溝通。我們全年無休，每日24小時提供技術搭建及活動現場監控服務。'
		},
		'contact-info': {
			question: '客戶應如何聯絡Malaga Event Gear（MEG）？需要提供哪些資料？',
			answer:
				'您可以透過電話666 346 911、WhatsApp或電郵與我們聯絡。為取得準確報價，請提供您的活動日期、地點、預計賓客人數，以及您有興趣的器材或套餐類型。詳情請參閱「聯絡我們」頁面。'
		},
		'delivery-setup': {
			question: '你們提供音響及燈光器材的運送及搭建服務嗎？',
			answer:
				'是的。MEG為所有音響及燈光租借提供完整的運送、專業搭建及活動結束後的拆卸服務。我們的服務涵蓋馬拉加、馬貝拉、Fuengirola、Torremolinos、Estepona及周邊地區的運輸、安裝、線材隱藏、音效／燈光測試，以及可選配的現場技術協助。'
		},
		'vat-pricing': {
			question: '你們的套餐價格是否已包含增值稅？',
			answer:
				'不包含。標示的價格均不包括增值稅。如價格旁標註的（另加{vat}增值稅）所示，將於套餐價格以外另加西班牙標準{vat}增值稅（IVA）。您的最終報價將完全透明地列出未稅價格與增值稅明細。'
		},
		'on-site-technician': {
			question: '活動期間你們會提供現場技術人員嗎？',
			answer:
				'會的。部分套餐（例如Wedding Pack及完整版MICE Pack）已包含專屬現場技術人員，全程負責技術控制及工程支援。若套餐未包含此服務（例如Basic MICE Pack），可加購現場技術協助，價格由每日{price:technicianDay}起。'
		},
		'equipment-brands': {
			question: '你們使用哪些器材品牌？',
			answer:
				'我們選用現場活動業界信賴的頂級專業品牌，包括音響方面的Audix及HK Audio、燈光方面的Eurolite及ADJ，以及煙霧機的Martin。這確保每項預約都能享有穩定可靠、高保真的音響及燈光表現。'
		},
		'delivery-only': {
			question: '你們提供自行取貨的選項，還是只提供送貨到場？',
			answer:
				'我們採用純送貨到場模式，不提供自行取貨選項。這確保每套系統皆由我們的團隊專業運送、安裝並校正，讓器材在您的活動中發揮應有的效果。'
		},
		'streaming-recording': {
			question: '你們提供網上直播及多機位錄影服務嗎？',
			answer:
				'這不在我們的自有器材之內。攝影機、拍攝及直播均不屬於我們的自有器材，因此我們不會自行進行多機位製作。我們負責提供場地音響、熒幕及燈光；若為混合式或網上活動，一般請自行準備手提電腦、直播軟件及網絡連線。如您的活動需要拍攝團隊或直播方案，請告訴我們，我們可以查詢合作供應商能否提供，前提是確實有合適的供應商。'
		},
		'translation-voting': {
			question: '你們提供同步傳譯或互動投票系統嗎？',
			answer:
				'提供，但同步傳譯及互動投票系統並非我們的自有器材：我們會透過合作的外判夥伴，為企業及大會級別的活動安排這兩項服務。申請報價時請告訴我們您的需求。我們不提供LED影像牆，我們的大型顯示熒幕為單一的60吋平面顯示屏。'
		},
		'large-scale-events': {
			question: '你們能承辦大型大會、展覽會及展銷會嗎？',
			answer:
				'當然可以。除了婚禮與企業會議，我們亦為大會、展覽會及展銷會等大型活動提供度身訂造的視聽方案，按需求結合擴音系統、大型顯示熒幕、舞台及專屬技術人員。'
		},
		'notice-time': {
			question: '預約的最短通知時間是多久？',
			answer:
				'所有活動器材租借及技術服務均須至少提前24小時預約，以確保排程及物流安排。若為大型或較複雜的活動，建議儘早預約，以確保您的活動日期。'
		},
		'minimum-order-granada': {
			question: '太陽海岸以外地區的服務是否有最低消費金額？',
			answer:
				'在太陽海岸地區內沒有特別的最低消費限制。對於較遠、跨省的目的地（例如格拉納達），我們要求最低租借金額須超過{price:outOfProvinceMinimum}，以涵蓋單日往返的物流成本。我們亦提供塞維利亞地區的服務，請與我們聯絡以確認您所在地點的具體條件。'
		},
		'customize-package': {
			question: '我可以根據自身需求度身訂造或延伸套餐內容嗎？',
			answer:
				'可以。每個套餐都可以加購項目延伸，例如投影機及熒幕、一部專業Martin Magnum 650煙霧機、額外咪高峰、高級亞加力講台、組合式舞台平台，以及額外的現場技術人員時數。申請報價時請告訴我們您的需求，我們將為您的活動打造最完美的配置。'
		}
	},
	gallery: {
		'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp': '婚禮儀式細節',
		'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp': '優雅的婚宴佈置',
		'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp': '海灘婚禮餐桌擺設及裝飾',
		'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp': '浪漫的婚禮餐桌佈置',
		'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp': '柔和燈光下的晚間婚宴餐桌',
		'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp': '美麗的海灘婚禮儀式佈置',
		'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp': '室內婚禮儀式廳佈置',
		'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp': '熱帶海灘婚禮儀式拱門',
		'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp': '擺放座椅的熱帶海灘婚禮通道',
		'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp': '馬拉加國際活動的視聽租賃系統',
		'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp': '示意圖：設有投影幕及三腳架攝影機的會議廳',
		'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp': '專業團體會議音響租賃',
		'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp': '社區會議音響佈置',
		'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp': 'MICE活動舞台上的音響及燈光',
		'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp': '大型會議音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp': 'Hotel Alfonso XIII會議舞台佈置',
		'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp': 'Volvo企業MICE活動視聽佈置',
		'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp': '戶外活動中的亞加力講台',
		'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp': '專業顯示熒幕、投影機及音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp': '令人驚艷的活動燈光及音響裝置',
		'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp': '活動熒幕的燈光及音響',
		'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp': '網球錦標賽體育音響佈置',
		'https://cdn.malagaeventgear.com/blog/1191/billie-jean-king-cup-2024-celebration-lights-sound-600x450.webp': '體育獎盃慶祝活動的燈光及音響',
		'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp': 'DJ音響及咪高峰系統佈置',
		'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp': '專業活動燈光及投影幕',
		'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp': '舞台、音響、視像及度身訂造佈置',
		'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp': '演唱會燈光、咪高峰及音響租賃',
		'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp': '戶外派對及活動音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp': '現場樂隊活動的音響及燈光租賃',
		'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp': '馬拉加ECOC 2026展覽上，一個參展商展位上一字排開安裝的五部顯示熒幕',
		'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp': 'ECOC 2026展覽上為一家參展商安裝的三部展位熒幕',
		'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp': '已佈置完成、裝好顯示熒幕的ECOC 2026參展商展位',
		'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp': '馬拉加ECOC 2026展覽上安裝的展位顯示熒幕',
		'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp': 'ECOC 2026參展商展位上的技術示範熒幕',
		'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp': '馬拉加ECOC 2026上即時播放產品內容的展位熒幕',
		'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp': 'ECOC 2026參展商團隊在馬拉加FYCMA測試並啟用各自的展位',
		'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp': 'ECOC 2026上，參展商將手提電腦連接到展位熒幕',
		'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp': 'ECOC 2026相鄰參展商展位上的顯示熒幕',
		'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp': '馬拉加FYCMA的ECOC 2026展場佈展現場',
		'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp': 'ECOC 2026展覽上，參觀者站在展位顯示熒幕旁'
	}
} satisfies DataCopy;
