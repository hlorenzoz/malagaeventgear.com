import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Cookiebeleid | Malaga Event Gear (MEG)',
		description:
			'Lees hoe Malaga Event Gear cookies en trackingtechnologieën gebruikt om de bruikbaarheid van de website te optimaliseren en de prestaties te analyseren.'
	},
	hero: {
		badge: 'Tracking & bruikbaarheid',
		title: 'Cookiebeleid',
		effectiveDate: 'Ingangsdatum: 16 oktober 2025'
	},
	whatAreCookies: {
		title: 'Wat zijn cookies?',
		body: 'Cookies zijn kleine tekstbestanden die op je apparaat worden geplaatst wanneer je onze website bezoekt. Ze zorgen dat de website efficiënter werkt, maken het mogelijk om je lichte of donkere thema te onthouden, en leveren anonieme analytische gegevens aan ons team.'
	},
	categories: {
		title: 'Categorieën cookies die we gebruiken',
		items: [
			{
				title: 'Essentiële & technische cookies',
				body: 'Essentieel voor de basisnavigatie, beveiliging en het onthouden van je lichte of donkere thema. Deze kunnen niet worden uitgeschakeld.'
			},
			{
				title: 'Analytische & prestatiecookies',
				body: 'We gebruiken Google Analytics en Google Search Console om verkeer, technische knelpunten, zoekopdrachten en sitesnelheid te monitoren. Alle verzamelde gegevens worden strikt geaggregeerd en gepseudonimiseerd.'
			},
			{
				title: 'Cookies van externe verificatiepartijen',
				body: 'Om echte klantbeoordelingen te tonen die rechtstreeks via ons Google Bedrijfsprofiel zijn geverifieerd, gebruiken we Trustindex. Trustindex kan cookies plaatsen om reviewwidgets dynamisch bij te houden en te valideren.'
			}
		]
	},
	managing: {
		title: 'Je voorkeuren beheren',
		body: 'Je kunt cookies eenvoudig weigeren of blokkeren via de instellingen van je browser. Let op: het blokkeren van alle cookies kan invloed hebben op geavanceerde functies, zoals het automatisch invullen van formulieren of het onthouden van je lichte of donkere thema.'
	}
} satisfies Copy;

export default copy;
