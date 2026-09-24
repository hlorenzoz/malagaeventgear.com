import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: '聯絡我們索取馬拉加影音設備出租報價 | MEG',
		description:
			'與Malaga Event Gear聯繫，申請音響、燈光及螢幕租賃的報價，我們提供24/7技術支援。'
	},
	schema: {
		name: '聯絡我們 | Malaga Event Gear',
		description:
			'聯絡Malaga Event Gear的技術團隊，申請音響、燈光及螢幕租賃的客製化報價。'
	},
	whatsappLinkText: '傳送訊息給我們',
	messages: {
		packIntro: '您好，我對預約{pack}方案有興趣，請告知可預約狀態與相關細節。',
		categoryIntro:
			'您好，我對預約{category}分類的設備有興趣，期待您的報價。'
	},
	errors: {
		pastDate: '請選擇今天之後的活動日期。'
	},
	form: {
		namePlaceholder: '姓名',
		emailPlaceholder: '電子郵件地址',
		phonePlaceholder: '電話',
		messagePlaceholder: '訊息內容'
	}
} satisfies Copy;
