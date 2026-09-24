import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: '免費搭建與運送（馬拉加及太陽海岸地區）',
		brands: '頂級品牌設備（HK Audio、Audix、Midas）',
		support: '可加購現場技術支援'
	},
	faqs: {
		delivery: {
			q: '運送與搭建是否已包含在方案價格內？',
			a: '是的，尊榮方案（例如{wedding}與{mice}）已包含在馬拉加及其鄰近郊區的完整專業運送、理線搭建與拆卸服務。標準方案則可能依活動確切地點另收少量物流費用。'
		},
		areas: {
			q: '你們在安達魯西亞的服務範圍涵蓋哪些地區？',
			a: '我們每天服務馬拉加市區、馬貝拉及整個太陽海岸地區，也服務塞維亞與格拉納達（訂單須超過{price:outOfProvinceMinimum}）。由於我們採純到府配送模式，目前不提供自取服務。'
		},
		rain: {
			q: '如果戶外活動遇到下雨怎麼辦？',
			a: '若您的活動在戶外舉行，我們要求須有遮蔽區域（帳篷、涼亭）以保護電力設備。若無遮蔽而下雨，我們會協助您將設備移至室內。賓客安全與高壓設備的保護是我們的首要考量。'
		},
		technician: {
			q: '如果活動期間需要技術人員該怎麼辦？',
			a: '我們的尊榮方案（例如{wedding}與{mice}）已包含現場技術監控。若為其他方案，您可以申請專屬音效／燈光工程師全程駐點，享受零壓力的體驗。'
		}
	},
	popularBadge: '最受歡迎',
	itemsIncludedSuffix: '項包含內容',
	faqSectionTitle: '常見問題',
	stickyBarAriaLabel: '固定式行動呼籲列'
} satisfies Copy;
