import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Protection des données RGPD - Malaga Event Gear',
		description:
			"Découvrez comment Malaga Event Gear protège vos données personnelles conformément au Règlement général sur la protection des données (RGPD) pour ses locations audiovisuel."
	},
	hero: {
		badge: 'Réglementation européenne',
		title: 'Conformité RGPD',
		effectiveDateLine: "Malaga Event Gear (MEG) | Date d'entrée en vigueur : 16 octobre 2025"
	},
	commitment: {
		title: 'Notre engagement RGPD',
		body: "Malaga Event Gear (MEG) étant basée à Malaga, en Espagne, nous respectons strictement le Règlement général sur la protection des données (RGPD) (règlement (UE) 2016/679) concernant la collecte, le traitement et la conservation des données personnelles."
	},
	processing: {
		title: 'Détails du traitement des données personnelles',
		headers: {
			category: 'Catégorie de données',
			legalBasis: 'Base légale',
			purpose: "Finalité d'utilisation"
		},
		rows: [
			{
				category: 'Identité et contact',
				legalBasis: 'Exécution du contrat',
				purpose:
					'Pour communiquer, finaliser les spécificités de la réservation et envoyer les détails du devis par e-mail, téléphone ou WhatsApp, en anglais.'
			},
			{
				category: "Lieu et horaire de l'événement",
				legalBasis: 'Exécution du contrat',
				purpose: "Indispensable pour coordonner la livraison, l'installation professionnelle sur mesure et la logistique de démontage."
			},
			{
				category: 'Données de paiement',
				legalBasis: 'Exécution du contrat et sécurité',
				purpose:
					'Pour finaliser les transactions en toute sécurité. Nous garantissons que tous les paiements sont sécurisés à 100 %.'
			}
		]
	},
	rights: {
		title: 'Vos droits en tant que personne concernée par le RGPD',
		intro: 'En vertu du RGPD, vous disposez des droits suivants concernant les données personnelles que nous traitons :',
		items: [
			{
				label: "Droit d'accès :",
				body: 'Vous pouvez demander la confirmation et une copie de toutes les données personnelles que nous conservons.'
			},
			{
				label: 'Droit de rectification :',
				body: 'Vous pouvez demander la mise à jour de données incomplètes ou inexactes.'
			},
			{
				label: "Droit à l'effacement :",
				body: 'Vous pouvez demander la suppression de vos données personnelles.'
			},
			{
				label: 'Droit à la limitation :',
				body: 'Vous pouvez demander la limitation du traitement sous certaines conditions.'
			}
		]
	},
	rightsPortal: {
		title: 'Exercer vos droits RGPD',
		body: 'Sélectionnez une action ci-dessous pour envoyer automatiquement votre demande à notre équipe de conformité des données.',
		buttons: {
			access: "Demander l'accès aux données",
			rectification: 'Demander la rectification des données',
			erasure: 'Demander la suppression des données'
		},
		status: {
			prefix: 'Votre demande de ',
			middle: ' a été lancée. Merci de nous écrire à ',
			suffix: ' pour finaliser la vérification.'
		}
	}
} satisfies Copy;

export default copy;
