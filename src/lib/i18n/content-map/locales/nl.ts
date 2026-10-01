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
		'sound-system-rental': {
			slug: 'geluidsinstallatie-huren-malaga',
			keyword: 'geluidsinstallatie huren in Malaga',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: 'beamer-huren',
			keyword: 'beamer huren in Malaga',
			status: 'propuesta'
		},
		'tv-screen-rental': {
			slug: 'tv-scherm-huren',
			keyword: 'tv-scherm huren in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental': {
			slug: 'audiovisuele-verhuur',
			keyword: 'audiovisuele verhuur Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'audiovisuele-verhuur-conferenties',
			keyword: 'audiovisuele verhuur voor conferenties Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'audiovisuele-verhuur-bedrijfsevenementen',
			keyword: 'audiovisuele verhuur voor bedrijfsevenementen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'audiovisuele-verhuur-productlanceringen',
			keyword: 'audiovisuele verhuur voor productlanceringen in Malaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'licht-en-podiumtechniek',
			keyword: 'licht- en podiumtechniek Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'audiovisuele-verhuur-bedrijfsvergaderingen',
			keyword: 'audiovisuele verhuur voor bedrijfsvergaderingen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'audiovisuele-verhuur-persconferenties',
			keyword: 'audiovisuele verhuur voor persconferenties in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'audiovisuele-verhuur-seminars',
			keyword: 'audiovisuele verhuur voor seminars in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'audiovisuele-verhuur-beurzen',
			keyword: 'audiovisuele verhuur voor beurzen in Malaga',
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
		'lighting-ideas-for-wedding-rentals': {
			slug: 'verlichtingsideeen-bruiloft',
			keyword: 'verlichtingsideeën voor je bruiloft in Malaga',
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
		'how-to-choose-wedding-rentals': {
			slug: 'de-juiste-verhuur-voor-bruiloften-kiezen',
			keyword: 'de juiste verhuur voor bruiloften kiezen in Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'geluid-trouwceremonie',
			keyword: 'geluid voor de trouwceremonie in Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'verhuur-buitenbruiloften',
			keyword: 'verhuur voor buitenbruiloften in Malaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'verhuur-binnenbruiloften',
			keyword: 'verhuur voor binnenbruiloften in Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'wat-je-nodig-hebt-verhuur-bruiloften-malaga',
			keyword: 'wat je echt nodig hebt bij verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'het-meeste-halen-uit-je-verhuur-voor-bruiloften',
			keyword: 'het meeste halen uit je verhuur voor bruiloften',
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
		'eco-friendly-wedding-rental-options': {
			slug: 'duurzame-verhuur-bruiloften-malaga',
			keyword: 'duurzame verhuur voor bruiloften in Malaga',
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
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'voor-en-nadelen-verhuur-bruiloften',
			keyword: 'voor- en nadelen van verhuur voor bruiloften',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'verhuur-bruiloften-totaalpakket',
			keyword: 'verhuur voor bruiloften als totaalpakket in Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'offertes-vergelijken-verhuur-bruiloften',
			keyword: 'offertes vergelijken bij verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'trends-verhuur-voor-bruiloften',
			keyword: 'trends in verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'last-minute-wijzigingen-verhuur-bruiloften',
			keyword: 'last minute wijzigingen bij verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'schadebescherming-verhuur-bruiloften',
			keyword: 'schadebescherming bij verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'wanneer-boek-je-verhuur-voor-bruiloften',
			keyword: 'wanneer boek je verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'weerplanning-verhuur-bruiloften',
			keyword: 'weerplanning bij verhuur voor bruiloften in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'audiovisuele-verhuur-trainingen',
			keyword: 'audiovisuele verhuur voor trainingen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'audiovisuele-verhuur-galadiners',
			keyword: 'audiovisuele verhuur voor galadiners in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'audiovisuele-verhuur-presentaties-op-afstand',
			keyword: 'audiovisuele verhuur voor presentaties op afstand in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'audiovisuele-verhuur-virtuele-evenementen',
			keyword: 'audiovisuele verhuur voor virtuele evenementen in Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'audiovisuele-productie-progold-summit-2026-torremolinos',
			keyword: 'audiovisuele productie PROGOLD SUMMIT 2026 Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'standschermen-ecoc-2026-malaga',
			keyword: 'standschermen ECOC 2026 Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'audiovisuele-productie-bmotion-benahavis',
			keyword: 'audiovisuele productie Bmotion Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'technische-ondersteuning-bmotion-marbella',
			keyword: 'technische ondersteuning Bmotion Marbella',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'audiovisuele-verhuur-bruiloft',
			keyword: 'audiovisuele verhuur voor een bruiloft in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'audiovisuele-verhuur-sportevenementen',
			keyword: 'audiovisuele verhuur voor sportevenementen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'audiovisuele-verhuur-kleine-bedrijven',
			keyword: 'audiovisuele verhuur voor kleine bedrijven in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'audiovisuele-verhuur-religieuze-evenementen',
			keyword: 'audiovisuele verhuur voor religieuze evenementen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'audiovisuele-verhuur-buitenevenementen',
			keyword: 'audiovisuele verhuur voor buitenevenementen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'audiovisuele-verhuur-optredens',
			keyword: 'audiovisuele verhuur voor optredens in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'audiovisuele-verhuur-benefietevenementen',
			keyword: 'audiovisuele verhuur voor benefietevenementen in Malaga',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: 'audiovisuele-verhuur-bij-mij-in-de-buurt',
			keyword: 'audiovisuele verhuur bij mij in de buurt',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: 'audio-en-videoverhuur-bij-mij-in-de-buurt',
			keyword: 'audio- en videoverhuur bij mij in de buurt',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: 'hoe-audiovisuele-verhuur-werkt',
			keyword: 'hoe audiovisuele verhuur werkt in Malaga',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: 'audiovisuele-verhuurpakketten-aanpassen',
			keyword: 'audiovisuele verhuurpakketten aanpassen in Malaga',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: 'voordelen-audiovisuele-verhuur',
			keyword: 'voordelen van audiovisuele verhuur in Malaga',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: 'veelvoorkomende-fouten-audiovisuele-verhuur',
			keyword: 'veelvoorkomende fouten bij audiovisuele verhuur in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: 'audiovisuele-verhuurbedrijven',
			keyword: 'audiovisuele verhuurbedrijven in Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: 'audiovisueel-verhuurbedrijf-malaga',
			keyword: 'audiovisueel verhuurbedrijf in Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
