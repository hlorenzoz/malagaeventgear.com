import type { Copy } from './en';

export const updated = '2026-09-30';

export default {
	backLink: '所有文章',
	titleTemplate: '{name} | 部落格 | Malaga Event Gear',
	descriptionTemplate: '閱讀Malaga Event Gear部落格中關於{name}的所有文章。',
	newsBadge: '新聞',
	readMore: '閱讀更多 →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: { gadgets: '在西班牙馬拉加為活動租借音響、螢幕與燈光的心得與經驗。' },
	post: { singular: '篇文章', plural: '篇文章' }
} satisfies Copy;
