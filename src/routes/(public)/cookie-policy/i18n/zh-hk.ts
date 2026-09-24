import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Cookie政策 - Malaga Event Gear (MEG)',
		description:
			'了解Malaga Event Gear如何使用Cookie及追蹤技術，優化網站可用性並分析網站表現。'
	},
	hero: {
		badge: '追蹤與可用性',
		title: 'Cookie政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whatAreCookies: {
		title: '什麼是Cookie？',
		body: 'Cookie是您瀏覽本網站時，儲存於您裝置上的小型文字檔案。它們有助網站更有效運作，讓我們記住您選擇的淺色或深色主題，並向我們的團隊提供匿名分析數據。'
	},
	categories: {
		title: '我們使用的Cookie類別',
		items: [
			{
				title: '必要及技術性Cookie',
				body: '對基本瀏覽、安全性及記住您的淺色或深色主題極為重要，無法關閉。'
			},
			{
				title: '分析及效能Cookie',
				body: '我們使用Google Analytics及Google Search Console監察流量、診斷瓶頸、搜尋查詢參數及網站速度。所有收集的數據均嚴格以彙總及假名化形式處理。'
			},
			{
				title: '第三方驗證Cookie',
				body: '為展示直接經Google My Business核實的真實客戶評價，我們整合了Trustindex。Trustindex可能會設置Cookie，動態追蹤及驗證評價小工具。'
			}
		]
	},
	managing: {
		title: '管理您的偏好設定',
		body: '您可透過個人瀏覽器偏好設定，輕鬆拒絕或封鎖Cookie。不過，請注意封鎖所有Cookie可能影響您使用進階功能，例如自動填寫表格或記住您的淺色或深色主題等。'
	}
} satisfies Copy;
