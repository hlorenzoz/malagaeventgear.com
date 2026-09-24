import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Conditions générales | Malaga Event Gear (MEG)',
		description:
			'Consultez les conditions générales officielles des locations Malaga Event Gear. Découvrez nos règles de réservation, de paiement et de service sécurisé.'
	},
	hero: {
		badge: 'Cadre juridique',
		title: 'Conditions générales',
		effectiveDate: "Date d'entrée en vigueur : 16 octobre 2025"
	},
	intro: {
		title: 'Introduction et acceptation des conditions',
		body: "En accédant aux services fournis par Malaga Event Gear (MEG) ou en les utilisant, vous acceptez d'être lié par les présentes conditions générales. Malaga Event Gear propose la location professionnelle de matériel de son, d'éclairage et d'événementiel pour diverses occasions, notamment les mariages, les fêtes privées, les événements d'entreprise, les réunions et les conférences MICE."
	},
	scope: {
		title: 'Étendue des services et prestations',
		p1: "Nous sommes spécialisés dans les systèmes de sonorisation PA actifs haute fidélité, les solutions d'éclairage professionnelles (barres LED, un projecteur Fresnel à zoom et un kit d'éclairage d'ambiance sans fil), les vidéoprojecteurs à forte luminosité, les microphones (filaires, sans fil, col de cygne), les machines à fumée et les plateaux de scène.",
		p2: "Beaucoup de nos forfaits, comme le Wedding Pack et le MICE Pack, incluent le transport, l'installation professionnelle, l'assistance technique en direct sur place et le démontage après l'événement, pour une expérience totalement sans stress."
	},
	limits: {
		title: 'Limites géographiques et opérationnelles',
		p1: "Nos services sont principalement concentrés dans la province de Malaga et sur la Costa del Sol (y compris Malaga capitale, Marbella, Fuengirola, Torremolinos, Estepona, Séville et les zones voisines). Le service à Grenade n'est disponible que pour les forfaits supérieurs à {price:outOfProvinceMinimum}, en raison des frais de déplacement hors province sur une seule journée.",
		p2: "Malaga Event Gear est ouvert 7 jours sur 7, de 8h00 à 20h00 pour les demandes commerciales, et 24 heures sur 24 et 7 jours sur 7 pour la logistique technique et l'assistance à l'installation.",
		p3: 'Afin de garantir une précision technique absolue pour notre clientèle internationale, toute communication, documentation et réservation via notre interface se fait en anglais ou en espagnol.'
	},
	booking: {
		title: 'Réservation, tarification et sécurité',
		p1: "Toute prestation de service doit être contractée avec un préavis minimum de 24 heures. Pour finaliser une réservation, le client doit fournir le lieu et l'heure précis de l'événement.",
		p2: "Tous les prix indiqués sur notre site sont affichés hors TVA (+21 %). Nous garantissons que toutes les transactions de paiement sont sécurisées à 100 % et traitées via des passerelles financières fiables."
	},
	obligations: {
		title: 'Obligations du client et responsabilité du matériel',
		body: "Le client est responsable de garantir l'accès au lieu et la disponibilité des prises électriques nécessaires au lieu et à l'heure prévus. Le client reconnaît qu'il loue du matériel professionnel haut de gamme et doit garantir la sécurité et l'intégrité physique de l'équipement pendant toute la durée de la location convenue."
	}
} satisfies Copy;

export default copy;
