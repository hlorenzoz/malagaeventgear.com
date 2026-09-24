import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	benefits: {
		delivery: 'Livraison et installation gratuites (Malaga et Costa del Sol)',
		brands: 'Marques premium (HK Audio, Audix, Midas)',
		support: 'Assistance technique sur place disponible'
	},
	faqs: {
		delivery: {
			q: "La livraison et l'installation sont-elles incluses dans le prix du forfait ?",
			a: "Oui, pour les forfaits premium (comme le {wedding} et le {mice}), la livraison professionnelle complète, l'installation du câblage et le démontage sont inclus à Malaga et dans ses environs immédiats. Pour les forfaits standard, des frais logistiques modestes peuvent s'appliquer selon l'emplacement exact de votre événement."
		},
		areas: {
			q: 'Quelles zones couvrez-vous en Andalousie ?',
			a: "Nous desservons quotidiennement Malaga capitale, Marbella et toute la Costa del Sol. Nous desservons également Séville et Grenade (pour les commandes supérieures à 400 €). Nous ne proposons actuellement pas d'option de retrait, car nous fonctionnons uniquement selon un modèle de livraison."
		},
		rain: {
			q: "Que se passe-t-il s'il pleut lors d'un événement en extérieur ?",
			a: "Si votre événement a lieu en extérieur, nous demandons un espace couvert (tentes, pergolas) pour protéger le matériel électrique. En cas de pluie sans couverture, nous travaillerons avec vous pour déplacer le matériel à l'intérieur. La sécurité des invités et la protection du matériel haute tension sont notre priorité absolue."
		},
		technician: {
			q: "Que se passe-t-il si j'ai besoin d'un technicien pendant mon événement ?",
			a: "Nos forfaits premium (comme le {wedding} et le {mice}) incluent déjà un suivi technique sur place. Pour les autres forfaits, vous pouvez demander un ingénieur son/lumière dédié qui reste sur votre lieu de réception pour une expérience sans stress."
		}
	},
	popularBadge: 'Le plus demandé',
	itemsIncludedSuffix: 'éléments inclus',
	faqSectionTitle: 'Questions fréquentes',
	stickyBarAriaLabel: "Barre d'appel à l'action fixe"
} satisfies Copy;

export default copy;
