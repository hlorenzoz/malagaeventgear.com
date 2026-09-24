import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: '免費搭建及送貨（馬拉加及太陽海岸）',
		brands: '頂級品牌（HK Audio、Audix、Midas）',
		support: '可提供現場技術支援'
	},
	faqs: {
		delivery: {
			q: '套餐價格是否已包含運送及搭建服務？',
			a: '是的，尊尚套餐（例如{wedding}及{mice}）已包含馬拉加及其鄰近地區的完整專業運送、理線搭建及拆卸服務。至於標準套餐，則可能因應您活動的實際地點，需要另收小額物流費用。'
		},
		areas: {
			q: '你們在安達魯西亞的服務範圍涵蓋哪些地區？',
			a: '我們每日服務馬拉加市中心、馬貝拉及整個太陽海岸地區，亦服務塞維利亞及格拉納達（訂單金額須超過{price:outOfProvinceMinimum}）。由於我們採用純送貨到場模式，目前不設自取服務。'
		},
		rain: {
			q: '如果戶外活動遇上下雨，會怎樣處理？',
			a: '若您的活動於戶外舉行，我們要求場地設有遮蓋範圍（例如帳篷、涼棚），以保護電子器材。如遇下雨而場地並無遮蓋，我們會與您協調把器材搬到室內。賓客安全及高壓電器材的保護，始終是我們的首要考慮。'
		},
		technician: {
			q: '如果活動期間我需要技術人員，會怎樣安排？',
			a: '我們的尊尚套餐（例如{wedding}及{mice}）已包含現場技術監控。至於其他套餐，您可要求安排專屬音響／燈光工程師駐場，為您帶來零壓力的體驗。'
		}
	},
	popularBadge: '最受歡迎',
	itemsIncludedSuffix: '項包含內容',
	faqSectionTitle: '常見問題',
	stickyBarAriaLabel: '固定行動呼籲欄'
} satisfies Copy;
