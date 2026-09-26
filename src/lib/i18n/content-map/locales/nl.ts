import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'audiovisuele apparatuur huren Malaga', status: 'propuesta' },
		'/about-us/': { path: '/over-ons/', keyword: 'verhuurbedrijf AV-apparatuur Malaga', status: 'propuesta' },
		'/contact/': { path: '/contact/', keyword: 'offerte AV-apparatuur Malaga', status: 'propuesta' },
		'/equipment/': { path: '/apparatuur/', keyword: 'geluids- en lichtapparatuur huren', status: 'propuesta' },
		'/packages/': { path: '/pakketten/', keyword: 'evenementenpakketten prijzen Malaga', status: 'propuesta' },
		'/faq/': { path: '/veelgestelde-vragen/', keyword: 'apparatuur huren veelgestelde vragen', status: 'propuesta' },
		'/meet-the-team/': { path: '/ons-team/', keyword: 'technisch team Malaga', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'evenemententechniek blog', status: 'propuesta' },
		'/blog/categories/': {
			path: '/blog/categorieen/',
			keyword: 'blog categorieën evenemententechniek',
			status: 'propuesta'
		},
		'/sitemap/': { path: '/sitemap/', keyword: 'sitemap Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/privacybeleid/', keyword: 'privacybeleid Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': {
			path: '/algemene-voorwaarden/',
			keyword: 'algemene voorwaarden Malaga Event Gear',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/avg/', keyword: 'AVG Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/cookiebeleid/', keyword: 'cookiebeleid Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/bedankt/' }
	},
	segments: { category: 'categorie', author: 'auteur' },
	packages: {
		eco: { slug: 'eco-pakket', keyword: 'geluidsset huren feest Malaga', status: 'propuesta' },
		wedding: { slug: 'trouw-pakket', keyword: 'bruiloft geluid en licht huren', status: 'propuesta' },
		'product-presentation': {
			slug: 'productpresentatie-pakket',
			keyword: 'beamer en scherm huren presentatie',
			status: 'propuesta'
		},
		'basic-mice': { slug: 'mice-basis-pakket', keyword: 'vergaderapparatuur huren Malaga', status: 'propuesta' },
		mice: { slug: 'mice-pakket', keyword: 'congrestechniek huren Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'av-verhuur', name: 'AV-verhuur' },
		'corporate-enterprise': { slug: 'zakelijk', name: 'Zakelijk & bedrijven' },
		events: { slug: 'evenementen', name: 'Evenementen' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'nieuws', name: 'Nieuws' },
		weddings: { slug: 'bruiloften', name: 'Bruiloften' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'audiovisuele-verhuur',
			keyword: 'audiovisuele verhuur Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'licht-en-podiumtechniek',
			keyword: 'licht- en podiumtechniek Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'verhuur-audiovisuele-apparatuur',
			keyword: 'verhuur audiovisuele apparatuur Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'headset-dasspeldmicrofoon-huren',
			keyword: 'headset en dasspeldmicrofoon huren Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'podiumverlichting-huren',
			keyword: 'podiumverlichting huren Malaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'uplighting-huren',
			keyword: 'uplighting huren Malaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'podiumverlichting-bruiloft',
			keyword: 'podiumverlichting voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'rookmachine-huren',
			keyword: 'rookmachine huren Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'verhuur-voor-bruiloften',
			keyword: 'verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'geluid-trouwceremonie',
			keyword: 'geluid voor de trouwceremonie in Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'verhuur-bruiloft-online-boeken',
			keyword: 'verhuur voor bruiloften online boeken in Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'verhuur-bruiloften-bij-mij-in-de-buurt',
			keyword: 'verhuur voor bruiloften bij mij in de buurt',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'besparen-op-verhuur-voor-bruiloften',
			keyword: 'besparen op verhuur voor bruiloften',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'vragen-stellen-bij-verhuur-voor-bruiloften',
			keyword: 'vragen stellen bij verhuur voor bruiloften',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
