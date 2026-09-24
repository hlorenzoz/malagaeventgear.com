import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	benefits: {
		delivery: '免费搭建与配送（马拉加及太阳海岸）',
		brands: '高端品牌（HK Audio、Audix、Midas）',
		support: '提供现场技术支持'
	},
	faqs: {
		delivery: {
			q: '套餐价格是否包含配送与搭建服务？',
			a: '是的，对于高端套餐（例如{wedding}及{mice}），在马拉加市区及其周边地区提供全程专业配送、走线搭建及拆卸服务。对于标准套餐，是否收取少量物流费用则取决于您活动的具体地点。'
		},
		areas: {
			q: '你们在安达卢西亚覆盖哪些地区？',
			a: '我们每天为马拉加市区、马贝拉及整个太阳海岸提供服务，也服务塞维利亚与格拉纳达（订单金额需超过400€）。由于我们仅提供配送服务，目前不提供自提选项。'
		},
		rain: {
			q: '如果户外活动遇到下雨怎么办？',
			a: '如果您的活动在户外举办，我们要求提供遮蔽区域（如帐篷、凉亭）以保护电气设备。若遇雨天且无遮蔽，我们会协助您将设备转移至室内。宾客安全及高压设备的保护始终是我们的首要考量。'
		},
		technician: {
			q: '如果活动期间我需要技术人员该怎么办？',
			a: '我们的高端套餐（例如{wedding}及{mice}）已包含现场技术监控。对于其他套餐，您可以申请专属音响/灯光工程师驻场，为您带来省心无忧的体验。'
		}
	},
	popularBadge: '最受欢迎',
	itemsIncludedSuffix: '项内容',
	faqSectionTitle: '常见问题',
	stickyBarAriaLabel: '悬浮行动按钮'
} satisfies Copy;

export default copy;
