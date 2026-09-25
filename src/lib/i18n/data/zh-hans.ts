import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: '马拉加小型派对音响灯光套餐，适合最多50位宾客的私人派对或小型活动，包含稳定的基础音响与氛围灯光。',
			includes: [
				'2台高品质有源音箱及支架',
				'1支有线动圈麦克风',
				'2条配备RGBW LED聚光灯的灯排',
				'美观走线与专业搭建'
			],
			optional: ['投影仪及投影幕布（+{price:projectorScreen}）', '专业烟雾机（+{price:smokeMachine}）'],
			seo: { title: 'Eco Pack：马拉加小型派对音响灯光租赁 | MEG' },
			landing: {
				badge: '小型活动与派对',
				rateLabel: '超值全包价格',
				vatNote: '（另加{vat}增值税），含搭建与运输费用',
				specTitle: '最多50位宾客',
				specBody: '完美适合别墅、花园及私人场地。',
				highlightTitle: '省心无忧服务',
				highlightBody:
					'我们仅提供配送与现场搭建服务，不设自提。我们的团队会运送设备、专业安装并测试音响与灯光，活动结束后统一收回。',
				includesLabel: '套餐包含',
				optionalLabel: '可选附加项目',
				ctaHeading: '立即锁定预订',
				ctaBody: '填写快速报价申请表，查询您活动当天的套餐可用情况，我们会尽快回复！',
				ctaButton: '预订此套餐'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: '马拉加婚礼音响灯光麦克风套餐，专为梦幻难忘的婚礼庆典精心打造，配备专业高端音响系统、浪漫氛围灯光及无线麦克风，让动人致辞清晰动听。',
			includes: [
				'高端有源PA音响系统，适用于最多80位宾客',
				'星光灯串/暖色LED灯带，营造浪漫氛围灯光',
				'专业无线麦克风，用于致辞与宣布环节',
				'马拉加及周边地区运输服务',
				'专业美观的搭建与走线',
				'活动期间现场技术控制与工程支持',
				'活动结束后快速拆卸与物流回收'
			],
			optional: ['专业烟雾机（+{price:smokeMachine}）'],
			seo: { title: 'Wedding Pack：马拉加婚礼音响与浪漫灯光 | MEG' },
			landing: {
				badge: '我们最受欢迎的庆典套餐',
				rateLabel: '高端全包价格',
				vatNote: '（另加{vat}增值税），含搭建与现场技术支持',
				specTitle: '最多80位宾客',
				specBody: '完美适合唯美别墅、庄园及婚礼酒店。',
				highlightTitle: '现场技术人员全程支持',
				highlightBody:
					'无需担心麦克风啸叫或画面问题。本套餐提供全程现场技术监控，并在宴会与致辞期间随时调整音效。',
				includesLabel: '高端配置内容',
				ctaHeading: '让您的庆典绽放光彩',
				ctaBody: '婚礼档期十分抢手，请尽快联系我们的技术团队锁定日期，为您的特别一天预留顶级音效与浪漫灯光。',
				ctaButton: '预订Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: '马拉加新品发布投影仪屏幕套餐，专为企业演示、经销商展示及产品发布会打造，呈现震撼的视觉效果。',
			includes: [
				'1块配稳固支架的前投投影幕布',
				'1台高亮度投影仪（5000流明），画面清晰锐利',
				'场地音响系统，配2只音箱及调音台',
				'1支高端无线手持麦克风，供演讲者使用'
			],
			seo: { title: 'Product Presentation Pack：投影与音响租赁 | MEG' },
			landing: {
				badge: '高视觉冲击力企业方案',
				rateLabel: '发布会套餐一口价',
				vatNote: '（另加{vat}增值税），含投影仪与投影幕布',
				specTitle: '高亮度投影仪',
				specBody: '5000流明投影仪，即使在明亮场地也能清晰投放。',
				highlightTitle: '完美呈现企业品牌形象',
				highlightBody:
					'让经销商发布会、酒店新闻发布会或产品展示吸引最多关注。我们的专业搭建兼顾清晰细腻的画面与高性能的语音扩声。',
				includesLabel: '套餐包含',
				note: {
					title: '搭建与连接支持',
					body: '我们提供全部必要的转接头（HDMI、USB-C）及音频接口，轻松连接您的笔记本电脑、平板或播放设备。'
				},
				ctaHeading: '提升您的产品展示效果',
				ctaBody: '为您的观众带来清晰画面与专业音效体验。立即联系我们的技术团队确认档期。',
				ctaButton: '预订此发布会套餐'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: '马拉加小型企业会议设备套餐，为最多40位宾客的高管会议、小型会议及演示活动提供必备的高性能视听配置。',
			includes: [
				'2x2米投影幕布，配3000流明高亮度投影仪',
				'基础高清扩声系统，适用于最多40人',
				'1支专业鹅颈麦克风，适用于讲台/讲桌',
				'物流运输、现场搭建及美观走线'
			],
			optional: ['专属现场技术助理（+{price:technicianDay}/天）'],
			seo: { title: 'Basic MICE Pack：企业会议视听设备 | MEG' },
			landing: {
				badge: '高管会议必备套餐',
				rateLabel: '企业会议一口价',
				vatNote: '（另加{vat}增值税），含搭建与运输',
				specTitle: '最多40位宾客',
				specBody: '专为董事会议室、私人厅堂及酒店套房设计。',
				highlightTitle: '清晰无杂音的语音效果',
				highlightBody:
					'专业鹅颈麦克风配置确保董事发言、新闻发布或投资人座谈会音质清晰，无回声或啸叫。',
				includesLabel: '套餐包含',
				optionalLabel: '可选支持服务',
				ctaHeading: '规划您的高管会议',
				ctaBody: '让Malaga Event Gear为您统筹顺畅的企业视听物流。立即联系我们的专家，打造专业的会议室体验。',
				ctaButton: '预订Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: '马拉加大型会展音响投影套餐，为企业提供全面的会展解决方案，配备大尺寸显示屏、高端有源扩声系统、无线讲台麦克风及专属现场技术支持。',
			includes: [
				'高端60英寸高清LED显示屏，配设计款支架',
				'专业有源音箱及高性能音响系统',
				'1支鹅颈麦克风+1支无线手持麦克风',
				'1名专属视听技术人员（连续支持最长6小时）',
				'物流配送、定制走线搭建及活动后拆卸'
			],
			optional: [
				'额外现场技术支持时长（+{price:technicianHour}/小时）',
				'高端亚克力现代讲台（+{price:lectern}）',
				'模块化舞台搭建（+{price:stagingPerSqm}/平方米）'
			],
			seo: { title: 'MICE Pack：会展音响与LED显示屏 | MEG' },
			landing: {
				badge: '高端企业会展体验',
				rateLabel: '企业全包价格',
				vatNote: '（另加{vat}增值税），含LED显示屏、音响及现场技术人员',
				specTitle: '60英寸LED显示屏',
				specBody: '高清大尺寸显示屏，呈现震撼的企业视觉效果。',
				highlightTitle: '专属现场技术人员',
				highlightBody:
					'专业视听技术人员将全程为您的活动提供最长6小时的连续支持，确保峰会、会议或产品发布会期间音效、画面与麦克风管理万无一失。',
				includesLabel: '高端配置内容',
				optionalLabel: '可选附加项目',
				ctaHeading: '为您的企业活动注入强大支持',
				ctaBody: '借助高端视听设备与专属技术支持，呈现完美的企业活动体验。立即联系我们确认您活动当天的档期。',
				ctaButton: '预订MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Malaga Event Gear（MEG）是什么？他们提供哪些服务？',
			answer:
				'Malaga Event Gear（MEG）是一家总部位于西班牙马拉加的公司，专注于提供专业视听、灯光及活动设备租赁服务。我们提供音响系统、投影仪、屏幕、舞台、技术协助、一台烟雾机、灯光方案及麦克风，并提供现场扩声等专项服务，以及通过合作伙伴分包安排的同声传译与互动投票系统。'
		},
		'event-types': {
			question: 'Malaga Event Gear（MEG）可以承接哪些类型的活动？',
			answer:
				'我们承接婚礼、私人派对等个人庆典活动，企业活动、会议、专题研讨会及产品发布会等专业聚会，以及大型会议、展销会及展览等大型活动，并始终提供量身定制的视听解决方案。'
		},
		'service-areas': {
			question: 'Malaga Event Gear（MEG）的服务范围覆盖哪些地区？',
			answer:
				'虽然公司名称中含有「马拉加」，但我们的服务范围远不止这座城市。我们主要在整个太阳海岸提供服务，包括马拉加市区、马贝拉、Coín、Ronda、Mijas、Nerja、Torremolinos、Fuengirola、Benalmadena及Estepona。我们也服务塞维利亚与格拉纳达，不过由于格拉纳达路途较远、跨省运输，通常要求预订金额超过{price:outOfProvinceMinimum}。'
		},
		'what-makes-unique': {
			question: '与其他视听设备租赁公司相比，Malaga Event Gear（MEG）有何独特之处？',
			answer:
				'MEG以客户为中心的高效服务模式脱颖而出：每笔预订均由我们自己的团队负责配送与专业搭建，Wedding Pack和MICE Pack还包含现场技术人员，选用高端品牌设备，并提供透明的全包价格。我们正逐步实现100%线上预订体验，采用统一的固定价格与完全透明的交易流程。'
		},
		'booking-process': {
			question: 'Malaga Event Gear的预订流程是怎样的？',
			answer:
				'我们的预订流程简单顺畅，共四个步骤。1. 选择您的套餐。2. 通过快速咨询表单申请报价。3. 我们的团队与您联系，确认细节并完成预订。4. 尽享无忧活动，配送、专业搭建、调试及拆卸均由我们全程负责。请注意，所有服务须至少提前24小时预订。'
		},
		'popular-packages': {
			question: 'Malaga Event Gear有哪些热门套餐？',
			answer:
				'我们最受欢迎的预设套餐包括{packagesWithPrices}，每款套餐配备不同的设备与功能。欢迎访问我们的价格页面，查看每款套餐的详细内容。'
		},
		'language-hours': {
			question: 'MEG使用什么语言与客户沟通？营业时间是怎样的？',
			answer:
				'Malaga Event Gear（MEG）使用英语和西班牙语与客户沟通。我们每周7天、每天24小时提供技术搭建与现场活动监控服务。'
		},
		'contact-info': {
			question: '客户应如何联系Malaga Event Gear（MEG）？需要提供哪些信息？',
			answer:
				'您可以拨打电话666 346 911、通过WhatsApp或电子邮件联系我们。为了获得准确报价，请提供活动日期、地点、预计宾客人数以及您感兴趣的设备或套餐类型。更多详情请查看「联系我们」页面。'
		},
		'delivery-setup': {
			question: '你们是否提供音响与灯光设备的配送和搭建服务？',
			answer:
				'是的。MEG为所有音响及灯光租赁提供全程配送、专业搭建及活动后拆卸服务。我们的服务涵盖运输、安装、隐藏走线、音响/灯光测试，并可在马拉加、马贝拉、Fuengirola、Torremolinos、Estepona及周边地区提供可选的现场技术协助。'
		},
		'vat-pricing': {
			question: '套餐价格是否含增值税？',
			answer:
				'不含。所列价格均不包含增值税。正如价格旁标注的（另加{vat}增值税）所示，将在套餐价格基础上加收西班牙标准{vat}的增值税（IVA）。您的最终报价将100%透明地列明净价与增值税明细。'
		},
		'on-site-technician': {
			question: '活动期间是否提供现场技术人员？',
			answer:
				'是的。部分套餐（例如Wedding Pack及完整版MICE Pack）已包含专属现场技术人员，全程负责技术控制与工程支持。对于未包含此项服务的套餐（例如Basic MICE Pack），可选择额外添加现场技术协助，价格从每天{price:technicianDay}起。'
		},
		'equipment-brands': {
			question: '你们使用哪些设备品牌？',
			answer:
				'我们选用现场活动行业信赖的高端专业品牌，音响方面采用Audix与HK Audio，灯光方面采用Eurolite与ADJ，烟雾机采用Martin。这确保每笔预订都能获得可靠的高保真音效与灯光表现。'
		},
		'delivery-only': {
			question: '你们是否提供自提服务，还是仅提供配送？',
			answer:
				'我们仅提供配送服务，不提供自提选项。这确保每一套系统都由我们的团队专业运输、安装并调试，使设备在您的活动中发挥应有的效果。'
		},
		'streaming-recording': {
			question: '你们是否提供直播或多机位录制服务？',
			answer:
				'这不在我们的自有设备之内。摄像机、拍摄与直播都不属于我们的自有库存，因此我们自己不做多机位制作。我们负责场地的音响、屏幕与灯光，如需举办混合或虚拟活动，通常请自行准备笔记本电脑、直播软件及网络连接。如果您的活动需要摄制团队或直播方案，请告诉我们，我们可以询问合作供应商能否提供，前提是确实有合适的供应商。'
		},
		'translation-voting': {
			question: '你们是否提供同声传译或互动投票系统？',
			answer:
				'是的，我们可提供同声传译与互动投票系统，但并非使用自有设备：这两项服务均通过合作伙伴分包安排，适用于企业及大会级活动。申请报价时请告知我们您的具体需求。我们不提供LED拼接视频墙，我们的大尺寸显示屏为单块60英寸平板显示屏。'
		},
		'large-scale-events': {
			question: '你们能否承接大型大会、展销会及展览活动？',
			answer:
				'当然可以。除婚礼与企业会议外，我们还为大会、展销会及展览等大型活动提供量身定制的视听解决方案，可根据需求组合扩声系统、大尺寸显示屏、舞台及专属技术人员。'
		},
		'notice-time': {
			question: '预订所需的最短提前通知时间是多久？',
			answer:
				'所有活动设备租赁及技术服务均须至少提前24小时预订，以确保档期与物流安排。对于大型或复杂活动，建议尽早预订以确保档期。'
		},
		'minimum-order-granada': {
			question: '太阳海岸以外地区的服务是否有最低消费要求？',
			answer:
				'在太阳海岸范围内没有特别的最低消费要求。对于格拉纳达等跨省的较远地区，我们要求最低租赁金额超过{price:outOfProvinceMinimum}，以覆盖单日往返的物流成本。我们也服务塞维利亚地区，具体条件请联系我们确认。'
		},
		'customize-package': {
			question: '我可以根据自身需求定制或扩展套餐吗？',
			answer:
				'当然可以。每款套餐都可以添加投影仪与投影幕布、一台专业Martin Magnum 650烟雾机、额外麦克风、高端亚克力讲台、模块化舞台搭建及额外现场技术人员时长等附加项目。申请报价时请告知我们您的需求，我们将为您的活动量身打造完美配置。'
		}
	},
	gallery: {
		'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp': '婚礼仪式细节',
		'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp': '优雅的婚宴布置',
		'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp': '海滩婚礼餐桌摆设与装饰',
		'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp': '浪漫的婚礼餐桌布置',
		'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp': '柔和灯光下的晚间婚宴餐桌',
		'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp': '美丽的海滩婚礼仪式布置',
		'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp': '室内婚礼仪式大厅布置',
		'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp': '热带海滩婚礼仪式拱门',
		'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp': '摆放座椅的热带海滩婚礼通道',
		'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp': '马拉加国际活动的视听租赁系统',
		'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp': '虚拟及混合活动的视听设备布置',
		'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp': '专业协会会议音响租赁',
		'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp': '社区会议音响布置',
		'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp': 'MICE活动舞台上的音响与灯光',
		'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp': '大型会议音响系统租赁',
		'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp': 'Hotel Alfonso XIII会议舞台布置',
		'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp': 'Volvo企业MICE活动视听布置',
		'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp': '户外活动中的亚克力讲台',
		'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp': '专业显示屏、投影仪及音响系统租赁',
		'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp': '令人惊艳的活动灯光与音响安装',
		'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp': '活动屏幕的灯光与音响',
		'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp': '网球锦标赛体育音响布置',
		'https://cdn.malagaeventgear.com/blog/1191/billie-jean-king-cup-2024-celebration-lights-sound-600x450.webp': '体育奖杯庆典的灯光与音响',
		'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp': 'DJ音响与麦克风系统布置',
		'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp': '专业活动灯光与投影幕布',
		'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp': '舞台、音响、视觉及定制布置',
		'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp': '演唱会灯光、麦克风及音响租赁',
		'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp': '户外派对及活动音响系统租赁',
		'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp': '现场乐队活动的音响与灯光租赁',
		'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp': '马拉加ECOC 2026展会上，一个参展商展位上一字排开安装的五块显示屏',
		'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp': 'ECOC 2026展会上为一家参展商安装的三块展位屏幕',
		'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp': '已布置完成、装好显示屏的ECOC 2026参展商展位',
		'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp': '马拉加ECOC 2026展会上安装的展位显示屏',
		'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp': 'ECOC 2026参展商展位上的技术演示屏幕',
		'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp': '马拉加ECOC 2026上实时播放产品内容的展位屏幕',
		'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp': 'ECOC 2026参展商团队在马拉加FYCMA调试各自的展位',
		'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp': 'ECOC 2026上，参展商将笔记本电脑连接到展位屏幕',
		'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp': 'ECOC 2026相邻参展商展位上的显示屏',
		'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp': '马拉加FYCMA的ECOC 2026展厅布展现场',
		'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp': 'ECOC 2026展会上，参观者站在展位显示屏旁'
	}
} satisfies DataCopy;
