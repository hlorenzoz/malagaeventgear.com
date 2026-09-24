import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Équipement',
		packages: 'Forfaits',
		blog: 'Blog',
		contact: 'Contact',
		bookNow: 'Réserver',
		blogInEnglish: 'Blog (en anglais)',
		language: 'Langue',
		breadcrumbs: "Fil d'Ariane",
		brand: 'Malaga Event Gear',
		toggleTheme: 'Changer le thème de couleur',
		openMenu: 'Ouvrir le menu de navigation'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Nous répondons en anglais ou en espagnol.',
		legalTranslation:
			'Ceci est une traduction. En cas de divergence avec la version anglaise, la version anglaise prévaut.',
		readEnglish: 'Lire la version anglaise'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Accueil',
		packages: 'Forfaits',
		blog: 'Blog',
		categories: 'Catégories',
		category: 'Catégorie',
		author: 'Auteur',
		contact: 'Contact',
		'about-us': 'À propos',
		faq: 'FAQ',
		'privacy-policy': 'Politique de confidentialité',
		'terms-of-service': 'Conditions générales',
		'cookie-policy': 'Politique de cookies',
		gdpr: 'RGPD',
		'meet-the-team': 'Notre équipe',
		equipment: 'Équipement',
		sitemap: 'Plan du site',
		'thank-you': 'Merci'
	},
	// Hero
	hero: {
		span: "Pour tous types d'événements",
		titlePart1: 'Location de matériel audiovisuel',
		titleGradient: 'pour vos événements',
		titlePart2: 'à Malaga',
		subtitle:
			"Profitez d'un son cristallin et d'un éclairage spectaculaire grâce à notre matériel haut de gamme. Idéal pour les mariages, les événements d'entreprise et les fêtes exclusives sur la Costa del Sol.",
		viewPricing: 'Voir les tarifs',
		contactUs: 'Nous contacter'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Une installation sans faute',
		card1Text:
			'Un support technique dédié pour que votre événement se déroule parfaitement du début à la fin, en toute tranquillité.',
		card2Title: '#2 Des forfaits sur mesure',
		card2Text:
			"Des forfaits de location flexibles, conçus pour s'adapter parfaitement à la taille, au lieu et au budget de chaque événement.",
		card3Title: '#3 Une technologie de pointe',
		card3Text:
			"Profitez d'un matériel audiovisuel à la pointe de la technologie qui sublime la qualité visuelle et sonore de votre production."
	},
	// Overview (At a Glance, answer-engine optimization)
	overview: {
		badge: "En un coup d'œil",
		sellQ: 'Que proposons-nous ?',
		sellA:
			'Nous louons du matériel audiovisuel haut de gamme (systèmes de son professionnels, éclairage scénique, vidéoprojecteurs et écrans) pour des événements dans toute la région de Malaga et sur la Costa del Sol, avec livraison, installation et assistance technique sur place incluses.',
		whoQ: 'À qui nous adressons-nous ?',
		whoA:
			'Aux couples qui préparent leur mariage, aux entreprises qui organisent des conférences et des événements professionnels, et à toute personne qui organise une fête ou une célébration privée et souhaite un son et un éclairage parfaits sans acheter le matériel.',
		costQ: 'Quel est le tarif ?',
		costA:
			'des forfaits à prix fixe sans frais cachés, adaptés à la taille de votre événement, ainsi que des devis sur mesure pour les productions plus importantes.',
		costFrom: 'À partir de',
		howQ: 'Comment ça se passe ?',
		howA:
			'Quatre étapes simples : choisissez votre forfait, demandez un devis, nous confirmons et préparons votre matériel, puis notre équipe livre et installe tout le jour de votre événement.'
	},
	// Impact
	impact: {
		title: 'Notre impact en chiffres',
		years: "Années d'expérience",
		clients: 'Clients satisfaits',
		satisfaction: 'Taux de satisfaction'
	},
	// Categories
	categories: {
		badge: 'Matériel haut de gamme',
		title: 'Catégories disponibles',
		soundTitle: 'Systèmes de son',
		soundText:
			"Un son haute fidélité cristallin, idéal pour un mariage intimiste comme pour une grande conférence d'entreprise. Nous travaillons avec les meilleures marques pour garantir la plus haute fidélité acoustique.",
		lightTitle: 'Éclairage',
		lightText: "Des solutions d'éclairage dynamiques pour créer l'ambiance parfaite dans votre lieu de réception.",
		visualTitle: 'Vidéoprojecteurs et écrans',
		visualText: 'Des visuels nets et haute définition pour des présentations à fort impact visuel.',
		fxTitle: 'Effets spéciaux et machines à fumée',
		fxText:
			'Créez une ambiance spectaculaire lors de votre événement grâce à nos effets spéciaux et machines à fumée de qualité professionnelle.',
		bookEquipment: 'Voir les forfaits'
	},
	// Pricing
	pricing: {
		badge: 'Tarifs transparents',
		title: 'Des forfaits sur mesure pour chaque événement',
		subtitle:
			"Choisissez parmi nos forfaits de location flexibles, conçus pour s'adapter parfaitement à la taille et au budget de chaque événement. Nous simplifions l'organisation !",
		includes: 'Inclus :',
		includedServices: 'Services inclus :',
		optional: 'En option :',
		check: 'Vérifier la disponibilité',
		mostPopular: 'Le plus demandé',
		from: 'À partir de',
		plusVat: '(+21% TVA)',
		plusVatShort: '(+TVA)',
		bookPack: 'Réserver'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtres',
		clearAll: 'Tout effacer',
		resetFilters: 'Réinitialiser les filtres',
		showingResults: '{visible} forfaits affichés sur {total}',
		noResults: 'Aucun forfait ne correspond à vos filtres. Essayez de supprimer certains critères !',
		openFilters: 'Filtres',
		done: 'Afficher les résultats',
		purpose: "Type d'événement",
		capacity: "Taille de l'événement",
		price: 'Budget',
		equipment: 'Matériel inclus',
		extras: 'Options supplémentaires',
		sortBy: 'Trier par',
		party: 'Fêtes',
		wedding: 'Mariages',
		corporate: 'Entreprise',
		presentation: 'Présentations',
		meeting: 'Réunions',
		small: "Petit (jusqu'à 50 invités)",
		medium: 'Moyen (51 à 80 invités)',
		large: 'Grand (80 invités et plus)',
		priceLow: "Jusqu'à 300 €",
		priceMid: '300 € à 500 €',
		priceHigh: '500 € et plus',
		transport: 'Transport et installation',
		screen: 'Écran / affichage',
		sound: 'Système de son',
		microphone: 'Microphones',
		lighting: "Éclairage d'ambiance",
		technician: 'Technicien sur place',
		projector: 'Vidéoprojecteur',
		smokeMachine: 'Machine à fumée',
		technicalAssistant: 'Assistant technique',
		lectern: 'Pupitre',
		staging: 'Plateaux de scène',
		recommended: 'Recommandé',
		priceAsc: 'Prix : croissant',
		priceDesc: 'Prix : décroissant'
	},
	// Contact
	contact: {
		badge: 'Réponse immédiate, 24h/24 et 7j/7',
		title: 'Contactez-nous',
		subtitle:
			"Prêt à sublimer votre événement ? Contactez notre équipe technique pour recevoir un devis sur mesure, vérifier la disponibilité du matériel et obtenir des conseils d'experts.",
		detailsTitle: 'Coordonnées',
		phone: 'Téléphone',
		whatsapp: 'WhatsApp',
		email: 'E-mail',
		location: 'Adresse',
		hours: "Horaires d'ouverture",
		hoursText: 'Support technique et logistique 24 heures sur 24, 7 jours sur 7.',
		reqTitle: 'Demander un devis',
		formName: 'Nom complet *',
		formEmail: 'Adresse e-mail *',
		formPhone: 'Téléphone de contact',
		formDate: "Date de l'événement",
		formType: "Type d'événement",
		formTypeWedding: 'Mariage / Célébration',
		formTypeCorporate: "Événement d'entreprise",
		formTypeParty: 'Fête privée',
		formTypeMice: 'Conférence / MICE',
		formTypeOther: "Autre type d'événement",
		formMessage: "Détails de l'événement et besoins techniques *",
		formSubmit: 'Envoyer la demande',
		formSubmitting: 'Envoi en cours...',
		formRequiredError: 'Veuillez remplir tous les champs obligatoires.',
		formErrorSubmit:
			"Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer ou nous écrire directement par e-mail.",
		formErrorTurnstile: 'La vérification de sécurité a échoué. Veuillez réessayer.',
		formErrorRateLimited: 'Trop de tentatives. Veuillez patienter quelques minutes puis réessayer.',
		lockedFieldNote: "Généré automatiquement à partir d'une erreur : ce champ ne peut pas être modifié.",
		errorPrefillMessage:
			"Bonjour, j'ai soumis une demande de forfait sur votre site mais l'e-mail de confirmation n'a pas pu être envoyé. Pourriez-vous confirmer la bonne réception de ma demande ? Référence : {ref}",
		errorDetailsHeader: 'Détails soumis :',
		errorDetailSource: 'URL du formulaire',
		errorDetailName: 'Nom',
		errorDetailEmail: 'E-mail',
		errorDetailPhone: 'Téléphone',
		errorDetailDate: "Date de l'événement",
		errorDetailPackage: 'Forfait',
		errorDetailComments: 'Commentaires',
		successTitle: 'Devis demandé !',
		successText1: 'Bonjour',
		successText2:
			"nous avons bien reçu votre demande. Notre équipe technique à Malaga va l'examiner et vous contactera par e-mail (",
		successText3: ') dans les plus brefs délais.',
		successButton: 'Envoyer une autre demande',
		faqTitle: 'Questions fréquentes'
	},
	// Packages Showcase
	packages: {
		badge: 'Forfaits populaires',
		title: 'Choisissez votre forfait idéal',
		subtitle: "Adaptés à chaque occasion. Tous nos forfaits incluent le transport, l'installation et le support technique sur place.",
		enquire: 'Demander un devis'
	},
	// How It Works
	process: {
		badge: 'Comment ça marche',
		title: 'Votre événement en 4 étapes simples',
		s1Title: 'Choisissez votre forfait',
		s1Desc: 'Parcourez nos forfaits et choisissez celui qui correspond à la taille et au style de votre événement.',
		s2Title: 'Demandez un devis',
		s2Desc: 'Remplissez notre formulaire rapide. Nous répondons dans les plus brefs délais avec toutes les disponibilités.',
		s3Title: 'Confirmez et planifiez',
		s3Desc: "Notre équipe confirme la logistique, l'accès au lieu et chaque détail technique.",
		s4Title: 'Profitez de votre événement',
		s4Desc: "Nous nous occupons de l'installation, animons l'événement et rangeons tout à la fin. Zéro stress pour vous."
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Tarifs transparents',
		title: 'Des tarifs simples, tout compris',
		subtitle: 'Aucun frais caché. Transport, installation et support technique toujours inclus.',
		viewAll: 'Voir tous les forfaits'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Questions courantes'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Avis clients',
		title: "Des histoires vraies d'événements réels",
		subtitle: 'Avis Google vérifiés de nos clients sur toute la Costa del Sol.',
		ratingLabel: 'EXCELLENT',
		basedOn: 'Basé sur {n} avis',
		poweredBy: 'Nos derniers avis',
		readMore: 'Lire la suite',
		readLess: 'Réduire',
		seeAll: 'Voir tous les avis',
		prevAria: 'Avis précédent',
		nextAria: 'Avis suivant',
		outOfFiveStars: 'sur 5 étoiles'
	},
	// Lead capture form
	leadForm: {
		title: 'Réservez votre date',
		subtitle: 'Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.',
		nameLabelInput: 'Nom complet *',
		emailLabelInput: 'Adresse e-mail *',
		phoneLabelInput: 'Téléphone / WhatsApp *',
		eventDateLabel: "Date de l'événement *",
		commentsLabel: 'Questions ou commentaires',
		commentsPlaceholder: "Parlez-nous de votre événement : lieu, nombre d'invités, besoins particuliers...",
		submitBtn: 'Vérifier la disponibilité',
		submitting: 'Envoi en cours...',
		errorRequired: 'Ce champ est obligatoire.',
		errorEmail: 'Veuillez saisir une adresse e-mail valide.',
		errorPhone: 'Veuillez saisir un numéro de téléphone valide.',
		errorDateFuture: "La date de l'événement doit être future.",
		errorMinLength: 'Doit contenir au moins 2 caractères.',
		errorMaxLength: 'Maximum 1000 caractères autorisés.',
		errorHoneypot: 'Spam détecté.',
		noCardRequired: 'Aucune carte bancaire requise pour vérifier la disponibilité',
		quickResponseNote: 'Réponse dans les plus brefs délais',
		errorSubmit: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
		errorTurnstile: 'La vérification de sécurité a échoué. Veuillez réessayer.',
		errorRateLimited: 'Trop de tentatives. Veuillez patienter quelques minutes puis réessayer.',
		emailFailTitle: "Nous n'avons pas pu envoyer votre confirmation",
		emailFailBody:
			"Votre demande a été enregistrée, mais notre système d'e-mail n'a pas réussi à l'envoyer. Merci de contacter notre équipe directement pour ne pas perdre votre demande.",
		emailFailAction: "Contacter l'équipe",
		emailFailDismiss: 'Fermer',
		countryCode: 'Indicatif du pays',
		responseTime: 'Nous répondons dans les plus brefs délais',
		trustBadge: 'Déjà plus de 500 événements réalisés à Malaga'
	},
	// Thank-you page
	thankYou: {
		headline: 'Merci ! Votre demande est en route.',
		subheadline: 'Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.',
		responseTime: 'Réponse estimée : dans les plus brefs délais',
		backToPackages: 'Voir tous les forfaits',
		whatsappCta: 'Ou contactez-nous dès maintenant sur WhatsApp',
		leadLabel: 'Référence'
	},
	// Gallery
	gallery: {
		titleHome: 'Nos événements en images',
		titlePackage: 'Précédents événements {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Localisation et profil Google',
		title: 'Retrouvez-nous sur Google',
		subtitle: 'Consultez notre profil Google Business officiel ou notre emplacement à Malaga.',
		viewOnGoogle: 'Voir sur Google Maps',
		mapTitle: 'Malaga Event Gear - Profil Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Location haut de gamme de son, éclairage et écrans pour des événements exclusifs à Malaga et sur la Costa del Sol. Matériel à la pointe de la technologie et support technique sur mesure.',
		usefulLinks: 'Liens utiles',
		home: 'Accueil',
		packages: 'Forfaits',
		blog: 'Blog',
		news: 'Actualités',
		categories: 'Catégories',
		aboutUs: 'À propos',
		meetTheTeam: 'Notre équipe',
		contactUs: 'Nous contacter',
		termsOfService: 'Conditions générales',
		privacyPolicy: 'Politique de confidentialité',
		cookiePolicy: 'Politique de cookies',
		gdpr: 'RGPD',
		faq: 'FAQ',
		sitemap: 'Plan du site',
		servicePackages: 'Forfaits de service',
		localAddress: 'Adresse locale',
		listings: 'Fiches et annuaires',
		onlinePresence: 'Présence en ligne',
		moreInformation: 'Plus d\'informations',
		moreInfoText:
			'Besoin de plus de détails ? Contactez-nous pour en savoir plus sur nos locations de matériel événementiel, nos tarifs et nos disponibilités.',
		tel: 'Tél',
		clickToChat: 'Cliquer pour discuter',
		emails: 'E-mails',
		forHire: 'Pour les locations',
		forContact: 'Pour nous contacter',
		forLegal: 'Pour les questions légales',
		allRightsReserved: 'Tous droits réservés.',
		developedBy: 'Développé par',
		lorenzozTitle: 'Lorenzoz Agency : agence de développement web et de solutions pour entreprises',
		mailAriaLabel: 'Envoyer un e-mail',
		callAriaLabel: 'Appeler Malaga Event Gear : {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Actualités',
		byAuthor: 'Par',
		updated: 'Mis à jour',
		shareInlineLabel: 'Partager :',
		shareSidebarLabel: 'PARTAGER',
		shareDrawerTitle: 'Partager cet article',
		copiedShort: 'Copié !',
		copiedExclaim: 'Copié !',
		copyShort: 'Copier le lien',
		copyLink: 'Copier le lien',
		shareOnAria: 'Partager sur {network}',
		copyLinkAria: 'Copier le lien dans le presse-papiers',
		openSharingAria: 'Ouvrir les options de partage',
		closeSharingAria: 'Fermer les options de partage',
		tweetLabel: 'Tweeter',
		tweetAria: 'Tweeter cette sélection',
		packagesSidebarAria: 'Barre latérale des forfaits événementiels',
		tocSidebarAria: 'Barre latérale de la table des matières'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Discuter avec nous'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Page introuvable',
		genericHeading: "Une erreur s'est produite",
		notFoundBody: "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou contactez-nous.",
		genericBody:
			"Nous avons rencontré un problème lors du traitement de votre demande. Retournez à l'accueil ou contactez-nous et nous réglerons cela.",
		contactUs: 'Nous contacter',
		backHome: "Retour à l'accueil"
	}
} satisfies Messages;

export default t;
