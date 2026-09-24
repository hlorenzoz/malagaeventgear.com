import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Cookie政策 | Malaga Event Gear（MEG）',
		description:
			'本網站Cookie政策說明Malaga Event Gear如何使用Cookie與追蹤技術，以優化網站使用體驗並分析效能。'
	},
	hero: {
		badge: '追蹤與使用體驗',
		title: 'Cookie政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whatAreCookies: {
		title: '什麼是Cookie？',
		body: 'Cookie是您瀏覽本網站時，儲存在您裝置上的小型文字檔案。它們能協助網站更有效率地運作，讓我們記住您選擇的淺色或深色主題，並為我們的團隊提供匿名分析資料。'
	},
	categories: {
		title: '我們使用的Cookie類別',
		items: [
			{
				title: '必要與技術性Cookie',
				body: '對於基本瀏覽、安全性以及記住您的淺色或深色主題至關重要，無法關閉。'
			},
			{
				title: '分析與效能Cookie',
				body: '我們使用Google Analytics與Google Search Console監控流量、診斷問題、搜尋關鍵字參數與網站速度。所有蒐集的資料皆嚴格採用彙整與去識別化處理。'
			},
			{
				title: '第三方驗證Cookie',
				body: '為呈現直接從Google我的商家驗證的真實客戶評論，我們整合了Trustindex。Trustindex可能會放置Cookie，以動態追蹤並驗證評論小工具。'
			}
		]
	},
	managing: {
		title: '管理您的偏好設定',
		body: '您可以透過瀏覽器設定輕鬆拒絕或封鎖Cookie。但請注意，限制所有Cookie可能會影響您使用進階功能，例如自動填寫表單或記住您的淺色或深色主題。'
	}
} satisfies Copy;
