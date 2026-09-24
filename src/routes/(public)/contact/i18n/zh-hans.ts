import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: '马拉加视听设备租赁报价咨询 | MEG',
		description: '联系Malaga Event Gear，申请音响、灯光及屏幕租赁报价，我们提供24小时技术支持。'
	},
	schema: {
		name: '联系我们 - Malaga Event Gear',
		description: '联系Malaga Event Gear技术团队，申请音响、灯光及屏幕租赁的定制报价。'
	},
	whatsappLinkText: '给我们发消息',
	messages: {
		packIntro: '您好，我有意预订套餐：{pack}。请告知可预订情况及详细信息。',
		categoryIntro: '您好，我有意预订「{category}」类别的设备，期待您的报价。'
	},
	errors: {
		pastDate: '请选择今天之后的活动日期。'
	},
	form: {
		namePlaceholder: '姓名',
		emailPlaceholder: '电子邮箱',
		phonePlaceholder: '电话',
		messagePlaceholder: '留言内容'
	}
} satisfies Copy;

export default copy;
