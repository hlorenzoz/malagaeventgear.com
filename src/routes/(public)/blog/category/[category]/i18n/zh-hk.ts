import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: '所有文章',
	titleTemplate: '{name} | 網誌 | Malaga Event Gear',
	descriptionTemplate:
		'閱讀Malaga Event Gear網誌「{name}」分類的所有文章：西班牙馬拉加視聽器材租借與活動設備的指南、技巧及最新動態。',
	newsBadge: '新聞',
	readMore: '閱讀全文 →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: { gadgets: '在西班牙馬拉加為活動租借音響、屏幕及燈光的心得與經驗。' },
	post: { singular: '篇文章', plural: '篇文章' }
} satisfies Copy;
