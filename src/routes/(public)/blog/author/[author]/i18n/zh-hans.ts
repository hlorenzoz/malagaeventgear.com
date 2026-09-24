import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	backLink: '所有文章',
	headingPrefix: '作者',
	titleTemplate: '{name} 的文章 | 博客 | Malaga Event Gear',
	descriptionTemplate: '{name} 在Malaga Event Gear发布的所有博客文章。',
	newsBadge: '新闻',
	readMore: '阅读更多 →',
	post: { singular: '篇文章', plural: '篇文章' }
} satisfies Copy;

export default copy;
