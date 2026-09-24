import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Evenemententechniek Blog | Malaga Event Gear',
		description:
			'Lees expertartikelen over kristalhelder geluid, romantische bruiloftverlichting, projectoropstellingen voor conferenties en professionele apparatuur in Malaga.'
	},
	schema: {
		name: 'Audiovisuele & Evenementenblog | MEG',
		description:
			'Technische gidsen, advies over AV-verhuur en tips voor bruiloftplanning in Malaga en aan de Costa del Sol.'
	},
	hero: {
		badge: 'Kennis & Inspiratie',
		titlePrefix: 'De Malaga Event Gear',
		titleHighlight: 'Evenemententechniek Blog',
		intro:
			'We delen professionele inzichten, akoestische blauwdrukken en visuele inrichtingsgidsen om jouw bedrijfstop, bruiloft of feest aan de Costa del Sol technisch vlekkeloos te maken.'
	},
	empty: 'Nog geen berichten. Kom snel terug!',
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
