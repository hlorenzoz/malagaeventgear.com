import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: '專為馬拉加地區最多50位賓客的私人派對或小型活動打造的音響燈光方案，內含紮實的基本音響與氛圍燈光。',
			includes: [
				'2台高品質主動式喇叭（含腳架）',
				'1支有線動圈式麥克風',
				'2組RGBW LED聚光燈燈排',
				'美觀理線與專業搭建'
			],
			optional: ['投影機與投影幕（+{price:projectorScreen}）', '專業煙霧機（+{price:smokeMachine}）'],
			seo: { title: 'Eco Pack：馬拉加小型派對音響燈光租賃 | MEG' },
			landing: {
				badge: '小型活動與派對',
				rateLabel: '超值全包價格',
				vatNote: '（另加{vat}加值稅，已含搭建與運送）',
				specTitle: '最多50位賓客',
				specBody: '適合別墅、花園與私人廳室。',
				highlightTitle: '無壓力服務',
				highlightBody:
					'我們採純到府配送模式，直接為您搭建。我們會運送設備、專業安裝、測試音效與燈光，並在活動結束後回收所有設備。',
				includesLabel: '包含項目',
				optionalLabel: '選配加購',
				ctaHeading: '立即預留您的檔期',
				ctaBody: '填寫我們的快速技術報價申請表，查詢您的活動日期是否可預約。我們會盡快與您聯繫！',
				ctaButton: '預約此方案'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: '專為馬拉加浪漫難忘的婚禮慶典精心打造的婚禮音響燈光麥克風方案，內含高階專業音響系統、浪漫氛圍燈光，以及用於致詞的無線麥克風。',
			includes: [
				'高階主動式PA音響系統，適用最多80位賓客',
				'星星燈／暖色LED燈串，營造浪漫氛圍燈光',
				'專業無線麥克風，用於致詞與宣布事項',
				'馬拉加及周邊地區運送服務',
				'專業美觀搭建與理線',
				'活動期間現場技術控制與工程支援',
				'活動結束後迅速拆卸與物流收回'
			],
			optional: ['專業煙霧機（+{price:smokeMachine}）'],
			seo: { title: 'Wedding Pack：馬拉加婚禮音響與浪漫燈光 | MEG' },
			landing: {
				badge: '我們最受歡迎的慶典方案',
				rateLabel: '尊榮全包價格',
				vatNote: '（另加{vat}加值稅，已含搭建與現場支援）',
				specTitle: '最多80位賓客',
				specBody: '適合美麗的別墅、莊園與婚宴飯店。',
				highlightTitle: '現場駐點技術人員',
				highlightBody:
					'再也不用擔心麥克風回授或視覺問題。此方案在整場婚宴與致詞期間，提供完整的現場技術監控與音響調整。',
				includesLabel: '尊榮包含項目',
				ctaHeading: '打造您夢幻的慶典時刻',
				ctaBody:
					'婚禮預約檔期經常迅速額滿。立即與我們的技術團隊敲定日期，為您的重要一天呈現最頂級的音響與浪漫燈光。',
				ctaButton: '預約此婚禮方案'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: '專為企業簡報、經銷商展示與新品發表打造的投影機螢幕方案，帶來強烈的視覺震撼，服務範圍涵蓋馬拉加地區。',
			includes: [
				'1面附穩固腳架的前投式投影幕',
				'1台高亮度投影機（5000流明），呈現清晰畫質',
				'含2支喇叭與混音控制台的場地音響系統',
				'1支高階無線手持麥克風，供講者使用'
			],
			seo: { title: 'Product Presentation Pack：馬拉加新品發表投影音響租賃 | MEG' },
			landing: {
				badge: '高視覺衝擊力的企業解決方案',
				rateLabel: '簡報方案定額價格',
				vatNote: '（另加{vat}加值稅，已含投影機與螢幕）',
				specTitle: '高亮度投影機',
				specBody: '5000流明投影機，適合明亮場地。',
				highlightTitle: '完美呈現企業品牌形象',
				highlightBody:
					'為您的經銷商發表會、飯店記者會或新品展示爭取最大關注度。我們的專業搭建結合精細的畫面細節與高效能的語音擴音。',
				includesLabel: '包含項目',
				note: {
					title: '搭建與連接支援',
					body: '我們提供所有必要的轉接頭（HDMI、USB-C）與音訊介面，讓您的公司筆電、平板或播放裝置能夠無縫連接。'
				},
				ctaHeading: '提升您的產品展示效果',
				ctaBody: '為您的觀眾帶來應有的清晰視覺與專業音效。立即聯絡我們的技術團隊確認可預約狀態。',
				ctaButton: '預約此簡報方案'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: '專為最多40位賓客的小型高階主管會議、研討會與簡報打造的必備高效能影音設備方案，服務馬拉加地區的小型企業會議需求。',
			includes: [
				'2x2公尺投影幕，搭配高亮度3000流明投影機',
				'基本清晰擴聲系統，適用最多40人',
				'1支專業鵝頸麥克風，供講台使用',
				'物流運送、搭建與美觀理線'
			],
			optional: ['專屬現場技術助理（+{price:technicianDay}／天）'],
			seo: { title: 'Basic MICE Pack：馬拉加小型企業會議影音 | MEG' },
			landing: {
				badge: '必備高階主管會議方案',
				rateLabel: '企業會議定額價格',
				vatNote: '（另加{vat}加值稅，已含搭建與運送）',
				specTitle: '最多40位賓客',
				specBody: '適合董事會議室、私人廳室與飯店套房。',
				highlightTitle: '清晰語音辨識度',
				highlightBody:
					'專業鵝頸麥克風配置，確保董事致詞、記者會或投資人座談時擁有絕對清晰的語音，不受回音或回授干擾。',
				includesLabel: '包含項目',
				optionalLabel: '選配支援',
				ctaHeading: '規劃您的高階主管會議',
				ctaBody: '與Malaga Event Gear攜手打造流暢的企業影音物流。聯繫我們的專家，打造專業的董事會議室體驗。',
				ctaButton: '預約Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: '全方位企業MICE會展解決方案，配備大型顯示螢幕、優質主動擴聲系統、無線講台麥克風，以及專屬現場技術人員支援，適用於馬拉加的大型會展音響投影需求。',
			includes: [
				'60吋高畫質LED顯示螢幕，附設計款腳架',
				'專業主動式喇叭與高效能音響系統',
				'1支鵝頸麥克風＋1支無線手持麥克風',
				'1名專屬影音技術人員（最長連續支援6小時）',
				'物流配送、客製理線搭建與活動結束後拆卸'
			],
			optional: [
				'額外現場技術支援時數（+{price:technicianHour}／小時）',
				'高級壓克力現代講台（+{price:lectern}）',
				'模組化舞台平台／舞台搭建（每平方公尺+{price:stagingPerSqm}）'
			],
			seo: { title: 'MICE Pack：馬拉加大型會展音響投影 | MEG' },
			landing: {
				badge: '尊榮企業MICE體驗',
				rateLabel: '企業全包價格',
				vatNote: '（另加{vat}加值稅，已含LED顯示螢幕、音響與現場技術人員）',
				specTitle: '60吋LED顯示螢幕',
				specBody: '大型高畫質顯示螢幕，呈現震撼的企業視覺效果。',
				highlightTitle: '專屬現場技術人員',
				highlightBody:
					'專業影音技術人員全程執行您的活動，最長連續6小時，確保高峰會、研討會或新品發表全程音效、畫面與麥克風管理零失誤。',
				includesLabel: '尊榮包含項目',
				optionalLabel: '選配加購',
				ctaHeading: '為您的企業活動注入能量',
				ctaBody: '透過優質影音設備與專屬技術支援，打造完美的企業體驗。立即聯繫我們的團隊，確認您的活動日期可預約狀態。',
				ctaButton: '預約MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Malaga Event Gear（MEG）是什麼？他們提供哪些服務？',
			answer:
				'Malaga Event Gear（MEG）是一家位於西班牙馬拉加、專營專業影音、燈光及活動設備租賃的公司。我們提供音響系統、投影機、螢幕、舞台、技術協助、一台煙霧機、燈光解決方案與麥克風，並提供現場擴音等專業服務，以及透過合作的外包夥伴安排的同步翻譯與互動投票系統。'
		},
		'event-types': {
			question: 'Malaga Event Gear（MEG）可以承辦哪些類型的活動？',
			answer:
				'我們涵蓋婚禮、私人派對等個人慶祝活動；企業活動、會議、研討會與產品發表等專業聚會；以及大型會議、商展與展覽等大型活動，並始終提供量身打造的影音解決方案。'
		},
		'service-areas': {
			question: 'Malaga Event Gear（MEG）的服務範圍涵蓋哪些地區？',
			answer:
				'雖然公司名稱有「馬拉加」，但我們的服務範圍遠不只這座城市。我們主要服務整個太陽海岸地區，包括馬拉加市區、馬貝拉、Coín、Ronda、Mijas、Nerja、Torremolinos、Fuengirola、Benalmadena與Estepona。我們也服務塞維亞與格拉納達，不過由於前往格拉納達屬跨省長途交通，預約金額通常須超過{price:outOfProvinceMinimum}。'
		},
		'what-makes-unique': {
			question: '相較於其他影音租賃公司，Malaga Event Gear（MEG）有什麼獨特之處？',
			answer:
				'MEG以顧客為中心且流程精簡的服務方式脫穎而出：每筆預約皆由我們自己的團隊負責配送與專業架設，Wedding Pack與MICE Pack更包含現場技術人員、頂級品牌設備，以及透明的一價全包定價。我們正朝向100%線上預約體驗邁進，提供標準化固定價格與完全透明的交易流程。'
		},
		'booking-process': {
			question: 'Malaga Event Gear的預約流程是如何進行的？',
			answer:
				'我們的流程精簡且分為四個步驟：1. 選擇您的方案。2. 使用我們的快速詢問表單申請報價。3. 我們的團隊會與您聯繫，確認細節並完成預約。4. 由我們負責運送、專業搭建、設定與拆卸，讓您零壓力享受活動。請注意，所有服務至少須於24小時前預約。'
		},
		'popular-packages': {
			question: 'Malaga Event Gear提供哪些熱門方案？',
			answer:
				'我們最受歡迎的預設方案包括{packagesWithPrices}，各方案配備不同的設備與特色。歡迎造訪我們的價格頁面，查看每個方案的完整內容明細。'
		},
		'language-hours': {
			question: '他們使用什麼語言與客戶溝通？營業時間為何？',
			answer:
				'Malaga Event Gear（MEG）以英語或西班牙語與客戶溝通。我們全年無休，每天24小時提供技術搭建與活動現場監控服務。'
		},
		'contact-info': {
			question: '客戶該如何聯絡Malaga Event Gear（MEG）？需要提供哪些資訊？',
			answer:
				'您可以透過電話666 346 911、WhatsApp或電子郵件與我們聯繫。為了取得準確報價，請提供您的活動日期、地點、預計賓客人數，以及您有興趣的設備或方案類型。詳情請參閱「聯絡我們」頁面。'
		},
		'delivery-setup': {
			question: '你們提供音響與燈光設備的運送與搭建服務嗎？',
			answer:
				'是的。MEG為所有音響與燈光租賃提供完整的運送、專業搭建與活動結束後的拆卸服務。我們的服務涵蓋馬拉加、馬貝拉、Fuengirola、Torremolinos、Estepona及周邊地區的運輸、安裝、線材隱藏、音效／燈光測試，以及可選配的現場技術協助。'
		},
		'vat-pricing': {
			question: '你們的方案價格是否已含加值稅？',
			answer:
				'不含。標示的價格皆不包含加值稅。如價格旁標註的（另加{vat}加值稅）所示，將於方案價格外另加西班牙標準{vat}加值稅（IVA）。您的最終報價將完全透明地列出未稅價格與加值稅明細。'
		},
		'on-site-technician': {
			question: '活動期間你們會提供現場技術人員嗎？',
			answer:
				'會的。部分方案（例如Wedding Pack與完整版MICE Pack）已包含專屬現場技術人員，全程負責技術控制與工程支援。若方案未包含此服務（例如Basic MICE Pack），可加購現場技術協助，價格自每天{price:technicianDay}起。'
		},
		'equipment-brands': {
			question: '你們使用哪些設備品牌？',
			answer:
				'我們選用現場活動產業信賴的頂級專業品牌，包括音響方面的Audix與HK Audio、燈光方面的Eurolite與ADJ，以及煙霧機的Martin。這確保每次預約都能享有穩定可靠、高保真的音響與燈光表現。'
		},
		'delivery-only': {
			question: '你們提供自行取貨的選項，還是僅提供到府配送？',
			answer:
				'我們採純到府配送模式，不提供自行取貨選項。這確保每套系統皆由我們的團隊專業運送、安裝並校正，讓設備在您的活動中發揮應有的效果。'
		},
		'streaming-recording': {
			question: '你們提供線上直播與多機位錄影服務嗎？',
			answer:
				'這不在我們的自有設備之內。攝影機、拍攝與直播都不屬於我們的自有器材，因此我們不自行進行多機位製作。我們負責提供場地音響、螢幕與燈光；若為混合式或線上活動，通常請自行準備筆電、直播軟體與網路連線。若您的活動需要攝影團隊或直播方案，請告訴我們，我們可以詢問合作供應商能否提供，前提是確實有合適的供應商。'
		},
		'translation-voting': {
			question: '你們提供同步翻譯或互動投票系統嗎？',
			answer:
				'提供，但同步翻譯與互動投票系統並非我們的自有設備：我們會透過合作的外包夥伴，為企業及大型會議等級的活動安排這兩項服務。申請報價時請告訴我們您的需求。我們不提供LED電視牆，我們的大型顯示螢幕為單一的60吋平面面板。'
		},
		'large-scale-events': {
			question: '你們能承辦大型會議、商展與展覽嗎？',
			answer:
				'當然可以。除了婚禮與企業會議，我們也為大型會議、商展與展覽等大型活動提供量身打造的影音解決方案，依需求結合擴聲系統、大型顯示螢幕、舞台與專屬技術人員。'
		},
		'notice-time': {
			question: '預約的最短通知時間是多久？',
			answer:
				'所有活動設備租賃與技術服務皆須至少提前24小時預約，以確保排程與物流安排。若為大型或較複雜的活動，建議儘早預約，以確保您的活動日期。'
		},
		'minimum-order-granada': {
			question: '太陽海岸以外地區的服務是否有最低消費金額？',
			answer:
				'在太陽海岸地區內沒有特別的最低消費限制。對於較遠、跨省的目的地（如格拉納達），我們要求最低租賃金額須超過{price:outOfProvinceMinimum}，以涵蓋單日往返的物流成本。我們也提供塞維亞地區的服務，請與我們聯繫以確認您所在地點的具體條件。'
		},
		'customize-package': {
			question: '我可以根據自身需求客製化或延伸方案內容嗎？',
			answer:
				'可以。每個方案都可以加購項目延伸，例如投影機與螢幕、一台專業Martin Magnum 650煙霧機、額外麥克風、高級壓克力講台、模組化舞台平台，以及額外的現場技術人員時數。申請報價時請告訴我們您的需求，我們將為您的活動打造最完美的配置。'
		}
	},
	gallery: {
		'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp': '婚禮儀式細節',
		'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp': '優雅的婚宴佈置',
		'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp': '海灘婚禮餐桌擺設與裝飾',
		'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp': '浪漫的婚禮餐桌佈置',
		'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp': '柔和燈光下的晚間婚宴餐桌',
		'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp': '美麗的海灘婚禮儀式佈置',
		'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp': '室內婚禮儀式廳佈置',
		'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp': '熱帶海灘婚禮儀式拱門',
		'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp': '擺放座椅的熱帶海灘婚禮走道',
		'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp': '馬拉加國際活動的影音租賃系統',
		'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp': '虛擬與混合活動的影音佈置',
		'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp': '專業公會會議音響租賃',
		'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp': '社區會議音響佈置',
		'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp': 'MICE活動舞台上的音響與燈光',
		'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp': '大型會議音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp': 'Hotel Alfonso XIII會議舞台佈置',
		'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp': 'Volvo企業MICE活動影音佈置',
		'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp': '戶外活動中的壓克力講台',
		'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp': '專業顯示螢幕、投影機及音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp': '令人驚豔的活動燈光與音響安裝',
		'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp': '活動螢幕的燈光與音響',
		'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp': '網球錦標賽運動音響佈置',
		'https://cdn.malagaeventgear.com/blog/1191/billie-jean-king-cup-2024-celebration-lights-sound-600x450.webp': '運動獎盃慶祝活動的燈光與音響',
		'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp': 'DJ音響與麥克風系統佈置',
		'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp': '專業活動燈光與投影布幕',
		'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp': '舞台、音響、影像及客製化佈置',
		'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp': '演唱會燈光、麥克風及音響租賃',
		'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp': '戶外派對及活動音響系統租賃',
		'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp': '現場樂團活動的音響與燈光租賃',
		'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp': '馬拉加ECOC 2026展會上，一個參展商攤位上一字排開安裝的五台顯示螢幕',
		'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp': 'ECOC 2026展會上為一家參展商安裝的三台攤位螢幕',
		'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp': '已佈置完成、裝好顯示螢幕的ECOC 2026參展商攤位',
		'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp': '馬拉加ECOC 2026展會上安裝的攤位顯示螢幕',
		'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp': 'ECOC 2026參展商攤位上的技術展示螢幕',
		'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp': '馬拉加ECOC 2026上即時播放產品內容的攤位螢幕',
		'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp': 'ECOC 2026參展商團隊在馬拉加FYCMA測試並啟用各自的攤位',
		'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp': 'ECOC 2026上，參展商將筆電連接到攤位螢幕',
		'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp': 'ECOC 2026相鄰參展商攤位上的顯示螢幕',
		'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp': '馬拉加FYCMA的ECOC 2026展場佈展現場',
		'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp': 'ECOC 2026展會上，參觀者站在攤位顯示螢幕旁'
	}
} satisfies DataCopy;
