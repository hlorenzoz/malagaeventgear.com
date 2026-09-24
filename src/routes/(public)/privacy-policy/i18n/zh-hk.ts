import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: '私隱政策 - Malaga Event Gear (MEG)',
		description:
			'閱讀Malaga Event Gear官方私隱政策，了解我們如何收集、處理及保障您的個人資料。'
	},
	hero: {
		badge: '私隱披露事項',
		title: '私隱政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whoWeAre: {
		title: '關於我們',
		body: '我們的網站地址為https://malagaeventgear.com。Malaga Event Gear（MEG）致力保障您的個人資料，並就資料使用作出透明披露。'
	},
	infoCollected: {
		title: '我們收集的資料及用途',
		intro:
			'當您透過我們既有的業務流程與我們互動時（例如透過查詢表格申請報價），我們會收集並處理個人資料：',
		table: {
			headers: {
				category: '資料類別',
				purpose: '處理目的'
			},
			rows: [
				{
					category: '聯絡資料',
					purpose:
						'姓名、電郵、電話或WhatsApp帳號，用於確定細節、協調物流及確認預約。溝通以英語或西班牙語進行。'
				},
				{
					category: '活動物流資料',
					purpose:
						'活動的準確地點及時間，用於協調運送、度身訂造器材搭建及取回。'
				},
				{
					category: '財務資料',
					purpose:
						'預約期間處理的付款資料。我們保證所有付款交易皆100%安全。'
				}
			]
		}
	},
	reviews: {
		title: '評價及社會認證',
		body: '我們展示的優異評級，是根據已驗證的Google My Business評價得出。評價驗證由Trustindex動態處理，確保所有客戶評價均來自真實且未經竄改的原始來源。'
	},
	retention: {
		title: '資料保留及您的權利',
		body: '我們保留您的個人資料，僅限於完成您所預約的視聽服務或遵守法律規定所需的期間。根據GDPR，您隨時有權查閱、更正、反對處理或要求刪除您的個人紀錄，只需聯絡我們的資料管控人即可。'
	}
} satisfies Copy;
