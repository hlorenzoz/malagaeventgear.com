import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Devis location audiovisuel Malaga | MEG',
		description:
			"Contactez Malaga Event Gear pour un devis de location de son, d'éclairage et d'écrans à Malaga. Assistance technique 24h/24 et 7j/7."
	},
	schema: {
		name: 'Contact - Malaga Event Gear',
		description:
			"Contactez l'équipe technique de Malaga Event Gear pour demander un devis sur mesure pour la location de son, d'éclairage et d'écrans."
	},
	whatsappLinkText: 'Envoyez-nous un message',
	messages: {
		packIntro: 'Bonjour, je suis intéressé(e) par la réservation du forfait : {pack}. Merci de me communiquer la disponibilité et les détails.',
		categoryIntro:
			"Bonjour, je suis intéressé(e) par la réservation de matériel de la catégorie : {category}. Dans l'attente de votre devis."
	},
	errors: {
		pastDate: "Veuillez choisir une date d'événement postérieure à aujourd'hui."
	},
	form: {
		namePlaceholder: 'Nom complet',
		emailPlaceholder: 'Adresse e-mail',
		phonePlaceholder: 'Téléphone',
		messagePlaceholder: 'Message'
	}
} satisfies Copy;

export default copy;
