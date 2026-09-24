import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Blog over evenemententechniek | Malaga Event Gear',
		description:
			'Lees expertartikelen over kristalhelder geluid, romantische bruiloftsverlichting, beameropstellingen voor conferenties en professionele apparatuur in Malaga.'
	},
	schema: {
		name: 'Blog over audiovisuele techniek en evenementen | MEG',
		description:
			'Technische gidsen, advies over AV-verhuur en tips voor bruiloftsplanning in Malaga en aan de Costa del Sol.'
	},
	hero: {
		badge: 'Kennis & inspiratie',
		titlePrefix: 'De technische blog van',
		titleHighlight: 'Malaga Event Gear',
		intro:
			'We delen professionele inzichten, akoestische blauwdrukken en visuele inrichtingsgidsen om jouw bedrijfstop, bruiloft of feest aan de Costa del Sol technisch vlekkeloos te maken.'
	},
	empty: 'Nog geen berichten. Kom binnenkort nog eens kijken!',
	newsBadge: 'Nieuws',
	readMore: 'Lees meer →',
	clustersHeading: 'Onze kernthema\'s',
	clusters: ['Bruiloften', 'Zakelijke AV', 'Geluidsakoestiek', 'Podiumverlichting', 'Projectie', 'Privéfeesten'],
	cta: {
		advice: 'Vraag technisch advies',
		packages: 'Bekijk pakketten'
	}
} satisfies Copy;

export default copy;
