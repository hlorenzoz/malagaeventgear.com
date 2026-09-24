import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: '隐私政策 | Malaga Event Gear（MEG）',
		description: '阅读Malaga Event Gear官方隐私政策，了解我们如何收集、处理及保护您的个人信息。'
	},
	hero: {
		badge: '隐私披露',
		title: '隐私政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whoWeAre: {
		title: '关于我们',
		body: '我们的网站地址为https://malagaeventgear.com。Malaga Event Gear（MEG）致力于保护您的个人信息，并就数据使用情况提供透明的披露。'
	},
	infoCollected: {
		title: '我们收集的信息及用途',
		intro: '当您通过我们既定的业务流程与我们互动时（例如通过咨询表单申请报价），我们会收集并处理个人数据：',
		table: {
			headers: {
				category: '数据类别',
				purpose: '处理目的'
			},
			rows: [
				{
					category: '联系方式',
					purpose: '姓名、电子邮箱、电话或WhatsApp账号，用于确定细节、协调物流并确认您的预订，沟通语言为英语或西班牙语。'
				},
				{
					category: '活动物流',
					purpose: '活动的精确地点及时间，用于协调配送、定制设备搭建及回收。'
				},
				{
					category: '财务数据',
					purpose: '预订过程中处理的支付信息。我们保证所有支付交易均100%安全。'
				}
			]
		}
	},
	reviews: {
		title: '评价与社会认同',
		body: '我们展示基于Google My Business验证评价所得出的「卓越」评级。评价验证通过Trustindex动态完成，确保所有客户评价的原始来源真实且未经篡改。'
	},
	retention: {
		title: '数据保留与权利',
		body: '我们仅在完成您所签约的视听服务或遵守法律规定所需的期限内保留您的个人数据。根据GDPR，您随时有权通过联系我们的数据控制者，访问、更正、反对处理或要求删除您的个人记录。'
	}
} satisfies Copy;

export default copy;
