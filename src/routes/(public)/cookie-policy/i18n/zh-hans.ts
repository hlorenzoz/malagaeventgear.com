import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Cookie政策 - Malaga Event Gear（MEG）',
		description: '了解Malaga Event Gear如何使用Cookie及跟踪技术，以优化网站可用性并分析网站表现。'
	},
	hero: {
		badge: '追踪与可用性',
		title: 'Cookie政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whatAreCookies: {
		title: '什么是Cookie？',
		body: 'Cookie是您访问我们网站时存储在您设备上的小型文本文件。它们有助于网站更高效地运行，使我们能够保存您的语言偏好设置（例如英语/西班牙语），并为我们的团队提供匿名分析数据。'
	},
	categories: {
		title: '我们使用的Cookie类别',
		items: [
			{
				title: '必要及技术性Cookie',
				body: '对基本导航、安全性及语言偏好设置的持续运行至关重要，无法关闭。'
			},
			{
				title: '分析及性能Cookie',
				body: '我们使用Google Analytics与Google Search Console监测流量、诊断瓶颈、搜索查询参数及网站速度。所收集的全部数据均严格采用聚合及匿名化处理。'
			},
			{
				title: '第三方验证Cookie',
				body: '为展示直接来自Google My Business验证的真实客户评价，我们集成了Trustindex。Trustindex可能会设置Cookie，以动态追踪并验证评价小工具。'
			}
		]
	},
	managing: {
		title: '管理您的偏好设置',
		body: '您可以通过浏览器的个人设置轻松拒绝或屏蔽Cookie。但请注意，限制所有Cookie可能会影响您使用某些高级功能，例如表单自动填写或语言选择的持久保存。'
	}
} satisfies Copy;

export default copy;
