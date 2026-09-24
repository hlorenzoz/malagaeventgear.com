import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: '視聽器材與活動策劃網誌 | Malaga Event Gear',
		description:
			'閱讀專業見解，內容涵蓋高保真音效、浪漫婚禮燈光、會議投影機搭建，以及馬拉加的專業活動器材資訊。'
	},
	schema: {
		name: '視聽器材與活動網誌 | MEG',
		description:
			'為馬拉加及太陽海岸提供專業技術指南、視聽器材租借建議及婚禮策劃心得。'
	},
	hero: {
		badge: '知識與靈感',
		titlePrefix: 'Malaga Event Gear',
		titleHighlight: '技術網誌',
		intro:
			'我們分享專業見解、音效藍圖及視覺佈局指南，讓您在太陽海岸舉辦的企業峰會、婚禮或慶典，技術上零失誤。'
	},
	empty: '暫時未有文章，請稍後再瀏覽！',
	newsBadge: '新聞',
	readMore: '閱讀全文 →',
	// Decorative thematic clusters covered by the blog. Order matches the icon list in
	// +page.svelte (favorite, business, speaker, highlight, videocam, celebration).
	clustersHeading: '我們涵蓋的核心主題',
	clusters: ['婚禮', '企業視聽', '音響聲學', '舞台燈光', '投影', '私人派對'],
	cta: {
		advice: '索取技術建議',
		packages: '瀏覽套餐'
	}
} satisfies Copy;
