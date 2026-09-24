import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: '马拉加活动策划博客 | MEG',
		description: '阅读关于高保真音响、浪漫婚礼灯光、会议投影搭建及马拉加专业活动设备的专家见解。'
	},
	schema: {
		name: '视听与活动博客 | MEG',
		description: '面向马拉加及太阳海岸地区的专业技术指南、视听设备租赁建议及婚礼策划心得。'
	},
	hero: {
		badge: '知识与灵感',
		titlePrefix: 'Malaga Event Gear',
		titleHighlight: '技术博客',
		intro:
			'我们分享专业见解、声学设计方案及视觉布局指南，助力您在太阳海岸举办的企业峰会、婚礼或庆典在技术层面尽善尽美。'
	},
	empty: '暂无文章，敬请期待！',
	newsBadge: '新闻',
	readMore: '阅读更多 →',
	clustersHeading: '核心内容板块',
	clusters: ['婚礼', '企业视听', '音响声学', '舞台灯光', '投影技术', '私人派对'],
	cta: {
		advice: '获取技术建议',
		packages: '浏览套餐'
	}
} satisfies Copy;

export default copy;
