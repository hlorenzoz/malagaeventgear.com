import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'GDPR合規聲明 | Malaga Event Gear（MEG）',
		description:
			'了解Malaga Event Gear如何依據歐盟《通用數據保障條例》（GDPR），為視聽器材租借業務保障您的個人資料。'
	},
	hero: {
		badge: '歐盟法規',
		title: 'GDPR合規聲明',
		effectiveDateLine: 'Malaga Event Gear（MEG） | 生效日期：2025年10月16日'
	},
	commitment: {
		title: 'GDPR承諾',
		body: '由於Malaga Event Gear（MEG）位於西班牙馬拉加，我們嚴格遵守《通用數據保障條例》（GDPR，(EU) 2016/679號規例），規範個人資料的收集、處理及保存。'
	},
	processing: {
		title: '個人資料處理詳情',
		headers: {
			category: '資料類別',
			legalBasis: '法律依據',
			purpose: '使用目的'
		},
		rows: [
			{
				category: '身分及聯絡資料',
				legalBasis: '履行合約',
				purpose:
					'用於溝通、確定預約細節，並以英語或西班牙語透過電郵、電話或WhatsApp傳送報價詳情。'
			},
			{
				category: '活動地點及時間安排',
				legalBasis: '履行合約',
				purpose: '協調運送、度身訂造專業搭建及拆卸物流所必需。'
			},
			{
				category: '付款資料',
				legalBasis: '履行合約及保安',
				purpose:
					'用於完成安全交易。我們保證所有結賬付款皆100%安全。'
			}
		]
	},
	rights: {
		title: 'GDPR下的資料當事人權利',
		intro: '根據GDPR，您對我們處理的個人資料擁有以下權利：',
		items: [
			{
				label: '查閱權：',
				body: '您可要求確認並取得我們保存的全部個人紀錄副本。'
			},
			{
				label: '更正權：',
				body: '您可要求更新不完整或不準確的資料。'
			},
			{
				label: '刪除權：',
				body: '您可要求刪除您的個人紀錄。'
			},
			{
				label: '限制處理權：',
				body: '您可在特定條件下，要求我們限制處理您的資料。'
			}
		]
	},
	rightsPortal: {
		title: '行使您的GDPR權利',
		body: '請在下方選擇相應操作，系統將自動向我們的資料合規團隊發出您的私隱請求。',
		buttons: {
			access: '申請資料查閱',
			rectification: '申請資料更正',
			erasure: '申請資料刪除'
		},
		actions: {
			access: '資料查閱',
			rectification: '資料更正',
			erasure: '資料刪除'
		},
		status: {
			prefix: '您提交的',
			middle: '請求已送出。請電郵至 ',
			suffix: ' 以完成驗證程序。'
		}
	}
} satisfies Copy;
