import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: '服务条款 - Malaga Event Gear（MEG）',
		description: '阅读Malaga Event Gear租赁服务的官方服务条款，了解我们在预订、付款及安全服务方面的政策。'
	},
	hero: {
		badge: '法律框架',
		title: '服务条款',
		effectiveDate: '生效日期：2025年10月16日'
	},
	intro: {
		title: '条款引言与接受声明',
		body: '访问或使用Malaga Event Gear（MEG）提供的服务，即表示您同意受本服务条款约束。Malaga Event Gear为婚礼、私人派对、企业活动、会议及MICE会展等各类场合提供专业的音响、灯光及活动设备租赁服务。'
	},
	scope: {
		title: '服务范围与内容',
		p1: '我们专注于提供高保真有源PA音响系统、专业灯光方案（LED灯光排、变焦菲涅尔聚光灯及无线地面投光灯套件）、高流明投影设备、麦克风（有线、无线、鹅颈式）、烟雾机及舞台搭建平台。',
		p2: '我们的许多套餐，例如Wedding Pack与MICE Pack，均包含运输、专业安装、现场实时技术支持及活动后拆卸服务，为您带来完全省心的体验。'
	},
	limits: {
		title: '地域及运营范围',
		p1: '我们的服务主要集中在马拉加省及太阳海岸地区（包括马拉加市区、马贝拉、Fuengirola、Torremolinos、Estepona、塞维利亚及周边地区）。由于跨省单日往返的运输成本，仅当套餐金额超过{price:outOfProvinceMinimum}时，才为格拉纳达提供服务。',
		p2: 'Malaga Event Gear每周七天营业，商务咨询时间为上午8点至晚上8点，技术物流与搭建支持则全年365天、每天24小时提供。',
		p3: '为确保面向国际客户的技术信息完全准确，所有沟通、文件及预订界面均以英语或西班牙语进行。'
	},
	booking: {
		title: '预订、价格与安全',
		p1: '所有服务均须至少提前24小时预订。为确认预订，客户须提供活动的确切地点及时间。',
		p2: '我们网站上所列的全部价格均不含增值税（另加{vat}）。我们保证所有支付交易均100%安全，并通过可信赖的金融支付网关处理。'
	},
	obligations: {
		title: '客户义务与设备责任',
		body: '客户负责确保在约定的地点及时间可以进入场地并提供必要的电源插座。客户确认所租赁的为高品质专业设备，并须在约定的租赁期间内确保设备的安全与完好。'
	}
} satisfies Copy;

export default copy;
