import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'location de matériel audiovisuel à Malaga', status: 'propuesta' },
		'/about-us/': { path: '/a-propos/', keyword: 'agence de location audiovisuel à Malaga', status: 'propuesta' },
		'/contact/': { path: '/contact/', keyword: 'devis location audiovisuel Malaga', status: 'propuesta' },
		'/equipment/': { path: '/materiel/', keyword: 'catalogue matériel audiovisuel Malaga', status: 'propuesta' },
		'/packages/': { path: '/forfaits/', keyword: 'tarifs location matériel audiovisuel Malaga', status: 'propuesta' },
		'/faq/': { path: '/faq/', keyword: 'questions fréquentes location audiovisuel', status: 'propuesta' },
		'/meet-the-team/': { path: '/notre-equipe/', keyword: 'équipe technique Malaga Event Gear', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog location audiovisuel et événements Malaga', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/categories/', keyword: 'catégories du blog événementiel', status: 'propuesta' },
		'/sitemap/': { path: '/plan-du-site/', keyword: 'plan du site Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': {
			path: '/politique-de-confidentialite/',
			keyword: 'politique de confidentialité Malaga Event Gear',
			status: 'propuesta'
		},
		'/terms-of-service/': { path: '/conditions-generales/', keyword: 'conditions générales Malaga Event Gear', status: 'propuesta' },
		'/gdpr/': { path: '/rgpd/', keyword: 'protection des données RGPD Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/politique-de-cookies/', keyword: 'politique de cookies Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/merci/' }
	},
	segments: { category: 'categorie', author: 'auteur' },
	packages: {
		eco: { slug: 'eco', keyword: 'location sonorisation et éclairage pas cher Malaga', status: 'propuesta' },
		wedding: { slug: 'mariage', keyword: 'location sonorisation et éclairage mariage Malaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'presentation-produit',
			keyword: 'location vidéoprojecteur et écran Malaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-basique',
			keyword: "location audiovisuel réunion d'entreprise Malaga",
			status: 'propuesta'
		},
		mice: { slug: 'mice', keyword: 'location audiovisuel congrès et conférences Malaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'location-audiovisuel', name: 'Location audiovisuelle' },
		'corporate-enterprise': { slug: 'entreprises', name: 'Entreprises' },
		events: { slug: 'evenements', name: 'Événements' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'actualites', name: 'Actualités' },
		weddings: { slug: 'mariages', name: 'Mariages' }
	},
	posts: {
		'sound-system-rental': {
			slug: 'location-sonorisation-malaga',
			keyword: 'location de sonorisation à Malaga',
			status: 'propuesta'
		},
		'projector-rental': {
			slug: 'location-videoprojecteur-malaga',
			keyword: 'location de vidéoprojecteur à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental': {
			slug: 'location-audiovisuelle-evenements-malaga',
			keyword: 'location audiovisuelle pour événements à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'equipement-audiovisuel-conference',
			keyword: 'équipement audiovisuel pour une conférence à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'location-audiovisuelle-evenements-entreprise',
			keyword: "location audiovisuelle pour événements d'entreprise à Malaga",
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'prestataire-technique-evenementiel',
			keyword: 'prestataire technique événementiel Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'equipement-audiovisuel-lancement-produit',
			keyword: 'équipement audiovisuel pour un lancement de produit à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'equipement-audiovisuel-reunion-entreprise',
			keyword: "équipement audiovisuel pour une réunion d'entreprise à Malaga",
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'equipement-audiovisuel-conference-presse',
			keyword: 'équipement audiovisuel pour une conférence de presse à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'equipement-audiovisuel-seminaire',
			keyword: 'équipement audiovisuel pour un séminaire à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'equipement-audiovisuel-salon-professionnel',
			keyword: 'équipement audiovisuel pour un salon professionnel à Malaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'loueur-materiel-audiovisuel',
			keyword: 'loueur de matériel audiovisuel à Malaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'location-micro-cravate-serre-tete',
			keyword: 'location micro cravate et serre-tête à Malaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'location-eclairage-scenique',
			keyword: "location d'éclairage scénique à Malaga",
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'location-uplighting',
			keyword: "location d'uplighting à Malaga",
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'eclairage-scenique-mariage',
			keyword: 'éclairage scénique pour mariage à Malaga',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: 'idees-eclairage-mariage',
			keyword: "idées d'éclairage pour un mariage à Malaga",
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'location-machine-a-fumee',
			keyword: 'location de machine à fumée à Malaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'location-materiel-mariage',
			keyword: 'location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'essentiel-location-materiel-mariage',
			keyword: "l'essentiel pour la location de matériel pour mariage à Malaga",
			status: 'propuesta'
		},
		'how-to-choose-wedding-rentals': {
			slug: 'comment-choisir-sa-location-de-materiel-pour-mariage',
			keyword: 'comment choisir sa location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'sonorisation-ceremonie-mariage',
			keyword: 'sonorisation de cérémonie de mariage à Malaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'location-materiel-mariage-plein-air',
			keyword: 'location de matériel pour mariage en plein air à Malaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'location-materiel-mariage-interieur',
			keyword: 'location de matériel pour mariage en intérieur à Malaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'tirer-le-meilleur-parti-de-votre-location-de-materiel-pour-mariage',
			keyword: 'tirer le meilleur parti de votre location de matériel pour mariage',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'location-materiel-mariage-en-ligne',
			keyword: 'location de matériel pour mariage en ligne à Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'location-materiel-mariage-pres-de-chez-moi',
			keyword: 'location de matériel pour mariage près de chez moi',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: 'location-materiel-mariage-ecoresponsable',
			keyword: 'location de matériel pour mariage écoresponsable à Malaga',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'reduire-cout-location-materiel-mariage',
			keyword: 'réduire le coût de la location de matériel pour mariage',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'questions-a-poser-pour-la-location-de-materiel-pour-mariage',
			keyword: 'questions à poser pour la location de matériel pour mariage',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'avantages-inconvenients-location-materiel-mariage',
			keyword: 'avantages et inconvénients de la location de matériel pour mariage',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'location-materiel-mariage-tout-compris',
			keyword: 'location de matériel pour mariage tout compris à Malaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'comparer-devis-location-materiel-mariage',
			keyword: 'comparer les devis de location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'tendances-location-materiel-mariage',
			keyword: 'tendances de la location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'modifier-location-materiel-mariage-dernier-moment',
			keyword: 'modifier au dernier moment la location de matériel pour mariage',
			status: 'propuesta'
		},
		'protecting-your-wedding-rental-items': {
			slug: 'proteger-location-materiel-mariage',
			keyword: 'protéger votre location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'timeline-for-booking-wedding-rentals': {
			slug: 'quand-reserver-location-materiel-mariage',
			keyword: 'quand réserver la location de matériel pour mariage à Malaga',
			status: 'propuesta'
		},
		'weather-considerations-for-outdoor-rentals': {
			slug: 'meteo-location-materiel-mariage-exterieur',
			keyword: 'météo et location de matériel pour mariage en extérieur à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'equipement-audiovisuel-formation',
			keyword: 'équipement audiovisuel pour une formation à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'equipement-audiovisuel-diner-de-gala',
			keyword: 'équipement audiovisuel pour un dîner de gala à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'location-audiovisuelle-presentation-a-distance',
			keyword: 'location audiovisuelle pour présentations à distance à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'location-audiovisuelle-evenements-virtuels',
			keyword: 'location audiovisuelle pour événements virtuels à Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'production-audiovisuelle-progold-summit-2026-torremolinos',
			keyword: 'production audiovisuelle du PROGOLD SUMMIT 2026 à Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'ecrans-de-stand-ecoc-2026-malaga',
			keyword: 'écrans de stand ECOC 2026 à Malaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'production-audiovisuelle-bmotion-benahavis',
			keyword: 'production audiovisuelle Bmotion à Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'support-technique-bmotion-marbella',
			keyword: 'support technique Bmotion à Marbella',
			status: 'propuesta'
		},
		'audio-visual-rental-for-weddings': {
			slug: 'location-audiovisuelle-mariage',
			keyword: 'location audiovisuelle pour mariage à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-sports-events': {
			slug: 'location-audiovisuelle-evenements-sportifs',
			keyword: 'location audiovisuelle pour événements sportifs à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-small-businesses': {
			slug: 'location-audiovisuelle-petites-entreprises',
			keyword: 'location audiovisuelle pour petites entreprises à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-religious-events': {
			slug: 'location-audiovisuelle-evenements-religieux',
			keyword: 'location audiovisuelle pour événements religieux à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-outdoor-events': {
			slug: 'location-audiovisuelle-evenements-exterieur',
			keyword: 'location audiovisuelle pour événements en extérieur à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-music-performances': {
			slug: 'location-audiovisuelle-concerts-spectacles',
			keyword: 'location audiovisuelle pour concerts et spectacles à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-charity-fundraisers': {
			slug: 'location-audiovisuelle-evenements-caritatifs',
			keyword: 'location audiovisuelle pour événements caritatifs à Malaga',
			status: 'propuesta'
		},
		'audio-visual-hire-near-me-in-malaga-spain': {
			slug: 'location-audiovisuelle-pres-de-chez-moi',
			keyword: 'location audiovisuelle près de chez moi',
			status: 'propuesta'
		},
		'audio-video-rental-near-me-in-malaga-spain': {
			slug: 'location-audio-et-video-pres-de-chez-moi',
			keyword: 'location audio et vidéo près de chez moi',
			status: 'propuesta'
		},
		'how-audio-visual-rental-works': {
			slug: 'comment-fonctionne-la-location-audiovisuelle',
			keyword: 'comment fonctionne la location audiovisuelle à Malaga',
			status: 'propuesta'
		},
		'how-to-customize-av-rental-packages': {
			slug: 'personnaliser-forfait-location-audiovisuelle',
			keyword: 'personnaliser un forfait de location audiovisuelle à Malaga',
			status: 'propuesta'
		},
		'benefits-of-audio-visual-rental': {
			slug: 'avantages-location-audiovisuelle',
			keyword: 'avantages de la location audiovisuelle à Malaga',
			status: 'propuesta'
		},
		'common-av-rental-mistakes': {
			slug: 'erreurs-courantes-location-audiovisuelle',
			keyword: 'erreurs courantes de location audiovisuelle à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-companies': {
			slug: 'entreprises-location-audiovisuelle',
			keyword: 'entreprises de location audiovisuelle à Malaga',
			status: 'propuesta'
		},
		'audio-visual-rental-company': {
			slug: 'entreprise-location-audiovisuelle-malaga',
			keyword: 'entreprise de location audiovisuelle à Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
