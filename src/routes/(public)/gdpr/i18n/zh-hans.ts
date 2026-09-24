import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'GDPR数据保护合规 | Malaga Event Gear（MEG）',
		description: '了解Malaga Event Gear在提供视听设备租赁服务时，如何依据《通用数据保护条例》（GDPR）保护您的个人数据。'
	},
	hero: {
		badge: '欧盟法规',
		title: 'GDPR合规',
		effectiveDateLine: 'Malaga Event Gear（MEG） | 生效日期：2025年10月16日'
	},
	commitment: {
		title: 'GDPR承诺',
		body: '由于Malaga Event Gear（MEG）总部位于西班牙马拉加，我们在个人数据的收集、处理及保留方面严格遵守《通用数据保护条例》（GDPR，欧盟法规2016/679）。'
	},
	processing: {
		title: '个人数据处理详情',
		headers: {
			category: '数据类别',
			legalBasis: '法律依据',
			purpose: '使用目的'
		},
		rows: [
			{
				category: '身份与联系方式',
				legalBasis: '合同履行',
				purpose: '用于沟通、确定预订细节，并通过电子邮箱、电话或WhatsApp以英语或西班牙语发送报价信息。'
			},
			{
				category: '活动地点与日程',
				legalBasis: '合同履行',
				purpose: '用于协调配送、定制专业搭建及拆卸物流，属于必要用途。'
			},
			{
				category: '支付数据',
				legalBasis: '合同履行与安全保障',
				purpose: '用于完成安全交易。我们保证所有结账支付均100%安全。'
			}
		]
	},
	rights: {
		title: 'GDPR下的数据主体权利',
		intro: '根据GDPR，您对我们处理的个人数据享有以下权利：',
		items: [
			{
				label: '访问权：',
				body: '您可以要求我们确认并提供我们所保存的全部个人记录副本。'
			},
			{
				label: '更正权：',
				body: '您可以要求更正不完整或不准确的数据。'
			},
			{
				label: '删除权：',
				body: '您可以要求删除您的个人记录。'
			},
			{
				label: '限制处理权：',
				body: '您可以在特定条件下要求我们限制对数据的处理。'
			}
		]
	},
	rightsPortal: {
		title: '行使您的GDPR权利',
		body: '请在下方选择操作，系统将自动向我们的数据合规团队发出您的隐私请求。',
		buttons: {
			access: '申请数据访问',
			rectification: '申请数据更正',
			erasure: '申请数据删除'
		},
		actions: {
			access: '数据访问',
			rectification: '数据更正',
			erasure: '数据删除'
		},
		status: {
			prefix: '您提交的',
			middle: '请求已发起。请发送电子邮件至 ',
			suffix: ' 以完成验证。'
		}
	}
} satisfies Copy;

export default copy;
