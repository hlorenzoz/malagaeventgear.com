import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Politique de cookies - Malaga Event Gear (MEG)',
		description:
			"Découvrez comment Malaga Event Gear utilise les cookies et les technologies de suivi pour optimiser l'utilisabilité du site et analyser ses performances."
	},
	hero: {
		badge: 'Suivi et utilisabilité',
		title: 'Politique de cookies',
		effectiveDate: "Date d'entrée en vigueur : 16 octobre 2025"
	},
	whatAreCookies: {
		title: 'Que sont les cookies ?',
		body: "Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez notre site. Ils aident le site à fonctionner plus efficacement, nous permettent de mémoriser votre thème clair ou sombre, et fournissent à notre équipe des données analytiques anonymes."
	},
	categories: {
		title: 'Catégories de cookies que nous utilisons',
		items: [
			{
				title: 'Cookies essentiels et techniques',
				body: 'Indispensables à la navigation de base, à la sécurité et à la mémorisation de votre thème clair ou sombre. Ils ne peuvent pas être désactivés.'
			},
			{
				title: 'Cookies analytiques et de performance',
				body: "Nous utilisons Google Analytics et Google Search Console pour suivre le trafic, diagnostiquer les points de blocage, analyser les paramètres des requêtes de recherche et mesurer la vitesse du site. Toutes les données collectées sont strictement agrégées et pseudonymisées."
			},
			{
				title: 'Cookies de vérification tiers',
				body: "Pour afficher des avis clients authentiques, vérifiés directement depuis Google My Business, nous intégrons Trustindex. Trustindex peut déposer des cookies pour suivre et valider dynamiquement les widgets d'avis."
			}
		]
	},
	managing: {
		title: 'Gérer vos préférences',
		body: "Vous pouvez facilement refuser ou bloquer les cookies via les préférences de votre navigateur. Veuillez toutefois noter que la restriction de tous les cookies peut affecter votre accès à certaines fonctionnalités avancées, comme le remplissage automatique des formulaires ou la mémorisation de votre thème clair ou sombre."
	}
} satisfies Copy;

export default copy;
