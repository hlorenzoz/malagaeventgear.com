import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	backLink: '所有文章',
	titleTemplate: '{name} | 博客 | Malaga Event Gear',
	descriptionTemplate:
		'阅读Malaga Event Gear博客中「{name}」分类的所有文章：西班牙马拉加视听设备租赁与活动设备的指南、技巧和最新动态。',
	newsBadge: '新闻',
	readMore: '阅读更多 →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: { gadgets: '在西班牙马拉加为活动租赁音响、屏幕和灯光的心得与经验。' },
	post: { singular: '篇文章', plural: '篇文章' }
} satisfies Copy;

export default copy;
