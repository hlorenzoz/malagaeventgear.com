import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Politique de confidentialité | Malaga Event Gear (MEG)',
		description:
			'Consultez la politique de confidentialité officielle de Malaga Event Gear. Découvrez comment nous collectons, traitons et protégeons vos données personnelles.'
	},
	hero: {
		badge: 'Informations sur la confidentialité',
		title: 'Politique de confidentialité',
		effectiveDate: "Date d'entrée en vigueur : 16 octobre 2025"
	},
	whoWeAre: {
		title: 'Qui sommes-nous',
		body: "L'adresse de notre site est https://malagaeventgear.com. Chez Malaga Event Gear (MEG), nous nous engageons à protéger vos données personnelles et à fournir des informations transparentes sur leur utilisation."
	},
	infoCollected: {
		title: 'Informations collectées et finalité',
		intro:
			'Nous collectons et traitons des données personnelles lorsque vous interagissez avec notre processus commercial habituel (par exemple, lorsque vous demandez un devis via notre formulaire de contact) :',
		table: {
			headers: {
				category: 'Catégorie de données',
				purpose: 'Finalité du traitement'
			},
			rows: [
				{
					category: 'Coordonnées',
					purpose:
						'Nom, e-mail, téléphone ou identifiant WhatsApp pour finaliser les détails, coordonner la logistique et confirmer votre réservation. Effectué uniquement en anglais.'
				},
				{
					category: "Logistique de l'événement",
					purpose:
						"Lieu et heure précis de l'événement pour coordonner la livraison, l'installation sur mesure du matériel et la reprise."
				},
				{
					category: 'Données financières',
					purpose:
						'Informations de paiement traitées lors des réservations. Nous garantissons que toutes les transactions de paiement sont sécurisées à 100 %.'
				}
			]
		}
	},
	reviews: {
		title: 'Avis et preuve sociale',
		body: "Nous affichons une note EXCELLENT basée sur des avis Google Business vérifiés. La vérification des avis est gérée dynamiquement via Trustindex, garantissant que la source d'origine de tous les témoignages clients est authentique et non modifiée."
	},
	retention: {
		title: 'Conservation des données et droits',
		body: "Nous conservons vos données personnelles uniquement le temps nécessaire à l'exécution de vos services audiovisuels contractés ou pour respecter nos obligations légales. Conformément au RGPD, vous disposez à tout moment du droit plein d'accéder à vos données personnelles, de les rectifier, de vous y opposer ou d'en demander la suppression, en contactant notre responsable du traitement des données."
	}
} satisfies Copy;

export default copy;
