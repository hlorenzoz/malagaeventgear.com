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
		'event-technology-service': {
			slug: 'prestataire-technique-evenementiel',
			keyword: 'prestataire technique événementiel Malaga',
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
		'unique-wedding-ceremony-rentals': {
			slug: 'sonorisation-ceremonie-mariage',
			keyword: 'sonorisation de cérémonie de mariage à Malaga',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'location-materiel-mariage-en-ligne',
			keyword: 'location de matériel pour mariage en ligne à Malaga',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
