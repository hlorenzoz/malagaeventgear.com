import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'GDPR合規聲明 - Malaga Event Gear（MEG）',
		description:
			'了解Malaga Event Gear如何依據歐盟一般資料保護規則（GDPR），為影音設備租賃保障您的個人資料，這是我們的個資保護政策。'
	},
	hero: {
		badge: '歐盟法規',
		title: 'GDPR合規聲明',
		effectiveDateLine: 'Malaga Event Gear（MEG） | 生效日期：2025年10月16日'
	},
	commitment: {
		title: 'GDPR承諾',
		body: '由於Malaga Event Gear（MEG）位於西班牙馬拉加，我們嚴格遵守《一般資料保護規則》（GDPR，(EU) 2016/679號規則），規範個人資料的蒐集、處理與保存。'
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
				category: '身分與聯絡資訊',
				legalBasis: '履行契約',
				purpose:
					'用於溝通、確定預約細節，並以英語或西班牙語透過電子郵件、電話或WhatsApp傳送報價詳情。'
			},
			{
				category: '活動地點與時程',
				legalBasis: '履行契約',
				purpose: '協調運送、客製化專業搭建與拆卸物流所必需。'
			},
			{
				category: '付款資料',
				legalBasis: '履行契約與安全性',
				purpose:
					'用於完成安全交易。我們保證所有結帳付款皆100%安全。'
			}
		]
	},
	rights: {
		title: 'GDPR下的資料主體權利',
		intro: '依據GDPR，您對我們處理的個人資料擁有以下權利：',
		items: [
			{
				label: '查閱權：',
				body: '您可要求確認並取得我們所保存全部個人紀錄的副本。'
			},
			{
				label: '更正權：',
				body: '您可要求更新不完整或不正確的資料。'
			},
			{
				label: '刪除權：',
				body: '您可要求刪除您的個人紀錄。'
			},
			{
				label: '限制處理權：',
				body: '您可在特定條件下要求我們限制資料處理。'
			}
		]
	},
	rightsPortal: {
		title: '行使您的GDPR權利',
		body: '請在下方選擇操作，系統將自動向我們的資料合規團隊發出您的隱私權請求。',
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
			middle: '請求已送出。請寄送電子郵件至 ',
			suffix: ' 以完成驗證程序。'
		}
	}
} satisfies Copy;
