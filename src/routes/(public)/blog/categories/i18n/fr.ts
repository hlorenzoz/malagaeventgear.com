import type { Copy } from './en';

export const updated = '2026-09-30';

const copy = {
	seo: {
		title: 'Catégories du blog | Malaga Event Gear',
		description:
			"Parcourez toutes les catégories du blog Malaga Event Gear : mariages, location audiovisuelle, événements d'entreprise, gadgets et actualités."
	},
	intro:
		"Le blog de Malaga Event Gear classe ses guides par thème : événements, mariages, location audiovisuelle, entreprises, organisation d'événements, gadgets et actualités. Choisissez une catégorie pour voir tous ses articles.",
	descriptions: {
		events:
			'Des guides pour organiser et animer des événements à Malaga, en Espagne, des fêtes privées aux conférences, et le matériel qui va avec.',
		'audio-visual-rental':
			'Comment fonctionne la location audiovisuelle, quoi vérifier avant de réserver et comment adapter sonorisation, écrans et éclairage à votre événement.',
		weddings:
			"Des idées de sonorisation, d'éclairage et de matériel pour les mariages à Malaga, en Espagne, avec des conseils pour choisir et préparer votre location.",
		news: "Les actualités de Malaga Event Gear : les événements pour lesquels nous avons fourni du matériel et les annonces de l'entreprise.",
		'corporate-enterprise':
			"Des guides audiovisuels pour les événements d'entreprise, réunions et conférences, des micros et écrans à l'assistance technique.",
		gadgets:
			"Notes et enseignements tirés de la location de sonorisation, d'écrans et d'éclairage pour des événements à Malaga, en Espagne."
	},
	schemaName: 'Catégories du blog | Malaga Event Gear',
	itemListLabel: 'Catégories du blog',
	backLink: 'Tous les articles',
	heading: 'Catégories',
	categoriesLabel: 'catégories',
	allPosts: 'Tous les articles',
	post: { singular: 'article', plural: 'articles' }
} satisfies Copy;

export default copy;
