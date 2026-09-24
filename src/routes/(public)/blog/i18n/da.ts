import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Ekspertblog om AV-udstyr og events | Malaga Event Gear',
		description:
			'Læs ekspertindsigt om lyd i topklasse, romantisk bryllupsbelysning, konferenceopsætning af projektorer og professionelt eventudstyr i Malaga.'
	},
	schema: {
		name: 'Blog om AV-udstyr og events | MEG',
		description:
			'Faglige guides, råd om AV-udlejning og indsigt i bryllupsplanlægning i Malaga og på Costa del Sol.'
	},
	hero: {
		badge: 'Viden og inspiration',
		titlePrefix: 'Malaga Event Gears',
		titleHighlight: 'tekniske blog',
		intro:
			'Vi deler faglig indsigt, akustiske planer og guides til visuelt layout, så dit virksomhedstopmøde, bryllup eller din fejring på Costa del Sol bliver teknisk fejlfri.'
	},
	empty: 'Ingen indlæg endnu. Kig forbi igen snart!',
	newsBadge: 'Nyheder',
	readMore: 'Læs mere →',
	clustersHeading: 'Emner vi dækker',
	clusters: ['Bryllupper', 'AV til virksomheder', 'Lydakustik', 'Scenebelysning', 'Projektion', 'Private fester'],
	cta: {
		advice: 'Få teknisk rådgivning',
		packages: 'Udforsk pakker'
	}
} satisfies Copy;

export default copy;
