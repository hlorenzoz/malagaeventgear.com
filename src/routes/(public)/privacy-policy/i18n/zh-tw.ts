import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: '隱私權政策 - Malaga Event Gear（MEG）',
		description:
			'閱讀Malaga Event Gear的正式隱私權政策，了解我們如何蒐集、處理及保護您的個人資訊。'
	},
	hero: {
		badge: '隱私權揭露',
		title: '隱私權政策',
		effectiveDate: '生效日期：2025年10月16日'
	},
	whoWeAre: {
		title: '我們是誰',
		body: '我們的網站網址為https://malagaeventgear.com。Malaga Event Gear（MEG）致力於保護您的個人資訊，並就資料使用提供透明的揭露。'
	},
	infoCollected: {
		title: '我們蒐集的資訊與用途',
		intro:
			'當您使用我們既有的業務流程時（例如透過我們的詢問表單申請報價），我們會蒐集並處理個人資料：',
		table: {
			headers: {
				category: '資料類別',
				purpose: '處理目的'
			},
			rows: [
				{
					category: '聯絡資訊',
					purpose:
						'姓名、電子郵件、電話或WhatsApp帳號，用於確定細節、協調物流及確認您的預約，以英語或西班牙語進行。'
				},
				{
					category: '活動物流資訊',
					purpose:
						'活動的確切地點與時間，用於協調運送、客製化設備搭建與收回。'
				},
				{
					category: '財務資料',
					purpose:
						'預約期間處理的付款資訊。我們保證所有付款交易皆100%安全。'
				}
			]
		}
	},
	reviews: {
		title: '評論與社群證明',
		body: '我們展示根據Google我的商家已驗證評論所得出的「優異」評等。評論驗證透過Trustindex動態處理，確保所有客戶推薦的原始來源真實且未經竄改。'
	},
	retention: {
		title: '資料保存與權利',
		body: '我們僅在完成您所預約的影音服務或遵循法律規定所需的期間內，保存您的個人資料。您依GDPR享有完整權利，可隨時聯絡我們的資料控管人，查閱、更正、反對或要求刪除您的個人紀錄。'
	}
} satisfies Copy;
