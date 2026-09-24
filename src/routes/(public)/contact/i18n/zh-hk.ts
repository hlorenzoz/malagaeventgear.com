import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: '聯絡我們及視聽器材報價 | MEG',
		description:
			'聯絡Malaga Event Gear，索取音響、燈光及熒幕租借報價，24小時全天候技術支援。'
	},
	schema: {
		name: '聯絡我們 | Malaga Event Gear',
		description:
			'聯絡Malaga Event Gear的技術團隊，索取音響、燈光及熒幕租借的度身訂造報價。'
	},
	whatsappLinkText: '傳送訊息給我們',
	messages: {
		// {pack} / {category} are replaced with the uppercased query-param value.
		packIntro: '您好，我有興趣預約以下套餐：{pack}。請告知可預約狀況及詳情。',
		categoryIntro:
			'您好，我有興趣預約以下類別的器材：{category}。期待收到您的報價。'
	},
	errors: {
		pastDate: '請選擇今日之後的活動日期。'
	},
	form: {
		namePlaceholder: '全名',
		emailPlaceholder: '電郵地址',
		phonePlaceholder: '電話',
		messagePlaceholder: '訊息'
	}
} satisfies Copy;
