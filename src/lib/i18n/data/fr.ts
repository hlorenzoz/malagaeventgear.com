import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: "Idéal pour les fêtes privées ou les petits événements jusqu'à 50 invités. Comprend une sonorisation simple mais efficace, ainsi qu'un éclairage d'ambiance.",
			includes: [
				'2 enceintes actives haut de gamme sur pieds',
				'1 microphone dynamique filaire',
				'2 barres lumineuses avec projecteurs LED RGBW',
				'Câblage soigné et installation professionnelle'
			],
			optional: ['Vidéoprojecteur et écran de projection (+{price:projectorScreen})', 'Machine à fumée professionnelle (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack : sonorisation et éclairage pas cher à Malaga | MEG' },
			landing: {
				badge: 'Petits événements et fêtes',
				rateLabel: 'Tarif tout compris abordable',
				vatNote: '(+{vat} TVA), installation et transport inclus',
				specTitle: "Jusqu'à 50 invités",
				specBody: 'Idéal pour les villas, jardins et salles privées.',
				highlightTitle: 'Un service sans stress',
				highlightBody:
					"Nous travaillons exclusivement en livraison, avec installation sur place. Nous apportons le matériel, l'installons de façon professionnelle, testons le son et les lumières, puis récupérons le tout après l'événement.",
				includesLabel: 'Ce qui est inclus',
				optionalLabel: 'Options supplémentaires',
				ctaHeading: "Réservez dès aujourd'hui",
				ctaBody:
					'Remplissez notre formulaire de demande de devis technique pour vérifier la disponibilité du forfait à votre date. Nous vous répondons dans les plus brefs délais !',
				ctaButton: 'Réserver ce forfait'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: "Pensé dans les moindres détails pour des célébrations de mariage magiques et inoubliables. Comprend un système acoustique professionnel haut de gamme, un éclairage d'ambiance romantique et des microphones sans fil pour des discours émouvants.",
			includes: [
				"Système de sonorisation PA actif haut de gamme, jusqu'à 80 invités",
				"Guirlandes lumineuses LED blanc chaud pour un éclairage d'ambiance romantique",
				'Microphones sans fil professionnels pour discours et annonces',
				'Transport à Malaga et dans les environs',
				'Installation et câblage professionnels et soignés',
				"Régie technique en direct et assistance d'un technicien sur place pendant l'événement",
				"Démontage rapide et enlèvement du matériel après l'événement"
			],
			optional: ['Machine à fumée professionnelle (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack : sonorisation et éclairage mariage à Malaga | MEG' },
			landing: {
				badge: 'Notre forfait célébration le plus demandé',
				rateLabel: 'Tarif premium tout compris',
				vatNote: '(+{vat} TVA), installation et assistance en direct incluses',
				specTitle: "Jusqu'à 80 invités",
				specBody: 'Idéal pour les belles villas, fincas et hôtels qui accueillent des mariages.',
				highlightTitle: 'Technicien en direct sur place',
				highlightBody:
					'Oubliez les larsens et les problèmes visuels. Ce forfait comprend un suivi technique complet en direct et des réglages acoustiques tout au long de votre banquet et de vos discours.',
				includesLabel: 'Prestations premium incluses',
				ctaHeading: 'Rendez votre célébration magique',
				ctaBody:
					"Les dates de mariage partent vite. Réservez votre date dès aujourd'hui avec notre équipe technique pour garantir le plus beau son et l'éclairage romantique le jour J.",
				ctaButton: 'Réserver ce Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: "Conçu pour les présentations d'entreprise, les présentations en concession et les lancements de produits à fort impact visuel.",
			includes: [
				'1 écran de projection frontale sur pied stable',
				'1 vidéoprojecteur haute luminosité (5000 lumens) pour des visuels nets',
				'Système de son de salle avec 2 enceintes et console de mixage',
				'1 microphone main sans fil premium pour les intervenants'
			],
			seo: { title: 'Product Presentation Pack : vidéoprojecteur et écran Malaga | MEG' },
			landing: {
				badge: "Solutions d'entreprise à fort impact visuel",
				rateLabel: 'Tarif fixe du forfait présentation',
				vatNote: '(+{vat} TVA), vidéoprojecteur et écran inclus',
				specTitle: 'Vidéoprojecteur haute luminosité',
				specBody: 'Vidéoprojecteur de 5000 lumens, idéal pour les salles éclairées.',
				highlightTitle: 'Une image de marque irréprochable',
				highlightBody:
					"Captez toute l'attention lors du lancement de votre concession, de votre conférence de presse en hôtel ou de la présentation de vos produits. Notre installation professionnelle allie une netteté graphique parfaite à une sonorisation de haute performance.",
				includesLabel: 'Ce qui est inclus',
				note: {
					title: 'Installation et assistance de connexion',
					body: 'Nous fournissons tous les adaptateurs nécessaires (HDMI, USB-C) et interfaces audio pour connecter facilement vos ordinateurs portables, tablettes ou lecteurs professionnels.'
				},
				ctaHeading: 'Sublimez la présentation de vos produits',
				ctaBody:
					"Offrez à votre public la clarté visuelle et le son professionnel qu'il mérite. Contactez notre équipe technique dès aujourd'hui pour confirmer la disponibilité.",
				ctaButton: 'Réserver ce forfait présentation'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: "Installation audiovisuelle essentielle et performante pour les petites réunions de direction, conférences et présentations jusqu'à 40 invités.",
			includes: [
				'Écran de projection 2x2 m avec vidéoprojecteur haute luminosité de 3000 lumens',
				"Système de sonorisation de base au son cristallin, jusqu'à 40 personnes",
				'1 microphone col de cygne professionnel pour podium ou pupitre',
				'Transport logistique, installation et câblage soigné'
			],
			optional: ['Assistant technique dédié sur place (+{price:technicianDay}/jour)'],
			seo: { title: "Basic MICE Pack : audiovisuel réunion d'entreprise Malaga | MEG" },
			landing: {
				badge: "L'essentiel pour vos réunions de direction",
				rateLabel: "Tarif fixe réunion d'entreprise",
				vatNote: '(+{vat} TVA), installation et transport inclus',
				specTitle: "Jusqu'à 40 invités",
				specBody: "Conçu pour les salles de conseil, salons privés et suites d'hôtel.",
				highlightTitle: 'Une intelligibilité vocale parfaite',
				highlightBody:
					"Notre configuration de microphone col de cygne professionnel garantit une clarté absolue pour les interventions du conseil, les annonces presse ou les panels d'investisseurs, sans écho ni larsen.",
				includesLabel: 'Ce qui est inclus',
				optionalLabel: 'Assistance en option',
				ctaHeading: 'Organisez votre réunion de direction',
				ctaBody:
					"Coordonnez une logistique audiovisuelle d'entreprise sans accroc avec Malaga Event Gear. Contactez nos experts pour garantir une expérience professionnelle en salle de conseil.",
				ctaButton: 'Réserver le Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-26',
			desc: "Solution MICE d'entreprise complète avec écran grand format, sonorisation active premium, un microphone col de cygne et un microphone main sans fil, ainsi qu'une assistance technique en direct dédiée.",
			includes: [
				'Écran LED haute définition premium de 60 pouces sur pied design',
				'Enceintes actives professionnelles et système de son haute performance',
				'1 microphone col de cygne + 1 microphone main sans fil',
				"1 technicien audiovisuel spécialisé dédié, présent en direct (jusqu'à 6 heures d'assistance continue)",
				"Livraison logistique, câblage sur mesure et démontage après l'événement"
			],
			optional: [
				"Heure supplémentaire d'assistance technique en direct (+{price:technicianHour}/h)",
				'Pupitre moderne premium en méthacrylate/acrylique (+{price:lectern})',
				'Plateaux de scène modulables (+{price:stagingPerSqm}/m²)'
			],
			seo: { title: 'MICE Pack : audiovisuel congrès et conférences à Malaga | MEG' },
			landing: {
				badge: "Expérience MICE d'entreprise premium",
				rateLabel: 'Tarif entreprise tout compris',
				vatNote: '(+{vat} TVA), écran LED, son et technicien en direct inclus',
				specTitle: 'Écran LED de 60 pouces',
				specBody: "Écran grand format haute définition pour des visuels d'entreprise percutants.",
				highlightTitle: 'Technicien en direct dédié',
				highlightBody:
					"Un technicien audiovisuel spécialisé gère votre événement jusqu'à 6 heures en continu, garantissant un son, des visuels et une gestion des microphones irréprochables tout au long de votre sommet, conférence ou lancement de produit.",
				includesLabel: 'Prestations premium incluses',
				optionalLabel: 'Options supplémentaires',
				ctaHeading: "Donnez de l'envergure à votre événement d'entreprise",
				ctaBody:
					"Offrez une expérience d'entreprise irréprochable grâce à un équipement audiovisuel premium et une assistance technique dédiée. Contactez notre équipe dès aujourd'hui pour confirmer la disponibilité à votre date.",
				ctaButton: 'Réserver le MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: "Qu'est-ce que Malaga Event Gear (MEG) et quels services propose-t-il ?",
			answer:
				"Malaga Event Gear (MEG) est une entreprise basée à Malaga, en Espagne, spécialisée dans la location de matériel audiovisuel, d'éclairage et d'événementiel professionnel. Nous proposons des systèmes de son, vidéoprojecteurs, écrans, scènes, assistance technique, une machine à fumée, solutions d'éclairage et microphones, ainsi que des services spécialisés comme le renforcement sonore en direct, sans oublier la traduction simultanée et les systèmes de vote interactif, que nous organisons avec un partenaire sous-traitant."
		},
		'event-types': {
			question: "Quels types d'événements Malaga Event Gear (MEG) peut-il prendre en charge ?",
			answer:
				"Nous couvrons les célébrations personnelles comme les mariages et les fêtes privées. Nous accompagnons aussi les rencontres professionnelles comme les événements d'entreprise, les réunions, les conférences et les présentations de produits. Nous équipons enfin les événements de plus grande envergure comme les congrès, salons et expositions, toujours avec des solutions audiovisuelles sur mesure."
		},
		'service-areas': {
			question: 'Où Malaga Event Gear (MEG) propose-t-il ses services ?',
			answer:
				'Bien que "Malaga" figure dans notre nom, nos services vont bien au-delà de la ville. Nous intervenons principalement sur toute la Costa del Sol : Malaga capitale, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena et Estepona. Nous desservons également Séville et Grenade, bien que Grenade nécessite généralement une réservation supérieure à {price:outOfProvinceMinimum} en raison de la distance de déplacement hors province.'
		},
		'what-makes-unique': {
			question: "Qu'est-ce qui rend Malaga Event Gear (MEG) unique par rapport aux autres loueurs de matériel audiovisuel ?",
			answer:
				"MEG se distingue par une approche centrée sur le client et simplifiée : la livraison et l'installation professionnelle par notre propre équipe pour chaque réservation, un technicien sur place inclus dans le Wedding Pack et le MICE Pack, du matériel de marques premium et des tarifs tout compris transparents. Nous évoluons vers une expérience de réservation 100 % en ligne, avec des tarifs fixes standardisés et des transactions totalement transparentes."
		},
		'booking-process': {
			question: 'Comment fonctionne le processus de réservation avec Malaga Event Gear ?',
			answer:
				"Notre processus simplifié comprend quatre étapes : 1. Choisissez votre forfait. 2. Demandez votre devis via notre formulaire de contact rapide. 3. Notre équipe vous contacte pour finaliser les détails et confirmer la réservation. 4. Profitez d'un événement sans souci pendant que nous gérons la livraison, l'installation professionnelle, la configuration et le démontage. Notez que les services doivent être réservés au moins 24 heures à l'avance."
		},
		'popular-packages': {
			question: 'Quels sont les forfaits populaires proposés par Malaga Event Gear ?',
			answer:
				'Nos forfaits préconçus les plus populaires sont les suivants : {packagesWithPrices}, chacun avec du matériel et des caractéristiques différentes. Consultez notre page Tarifs pour le détail complet de chaque forfait.'
		},
		'language-hours': {
			question: "Dans quelles langues MEG communique-t-il avec ses clients et quels sont ses horaires d'ouverture ?",
			answer:
				'Malaga Event Gear (MEG) communique avec ses clients en anglais et en espagnol. Nous sommes disponibles 24 heures sur 24 et 7 jours sur 7 pour les installations techniques et le suivi en direct des événements.'
		},
		'contact-info': {
			question: 'Comment les clients peuvent-ils contacter Malaga Event Gear (MEG), et quelles informations doivent-ils fournir ?',
			answer:
				"Vous pouvez nous joindre par téléphone au 666 346 911, via WhatsApp ou par e-mail. Pour obtenir un devis précis, merci de nous communiquer la date de votre événement, le lieu, le nombre d'invités prévu et le type de matériel ou de forfait qui vous intéresse. Consultez notre page Contact pour plus de détails."
		},
		'delivery-setup': {
			question: "Proposez-vous la livraison et l'installation du matériel de son et d'éclairage ?",
			answer:
				"Oui. MEG assure la livraison complète, l'installation professionnelle et le démontage après l'événement pour toutes les locations de son et d'éclairage. Notre service comprend le transport, l'installation, la dissimulation des câbles, les tests de son et de lumière, ainsi qu'une assistance technique sur place en option, à Malaga, Marbella, Fuengirola, Torremolinos, Estepona et dans les environs."
		},
		'vat-pricing': {
			question: 'Vos tarifs de forfaits incluent-ils la TVA ?',
			answer:
				"Non, les tarifs affichés n'incluent pas la TVA. Comme l'indique la mention (+{vat} TVA) à côté des tarifs, la TVA espagnole standard de {vat} (IVA) s'applique en plus du prix du forfait. Votre devis final indiquera le prix net et le détail de la TVA en toute transparence."
		},
		'on-site-technician': {
			question: "Fournissez-vous un technicien sur place pendant l'événement ?",
			answer:
				"Oui. Plusieurs forfaits, comme le Wedding Pack et le MICE Pack complet, incluent un technicien dédié en direct qui assure la régie et l'assistance technique tout au long de votre événement. Pour les forfaits où ce n'est pas inclus (par exemple le Basic MICE Pack), une assistance technique sur place peut être ajoutée en option à partir de {price:technicianDay} par jour."
		},
		'equipment-brands': {
			question: 'Avec quelles marques de matériel travaillez-vous ?',
			answer:
				"Nous utilisons des marques professionnelles haut de gamme reconnues dans le secteur de l'événementiel, dont Audix et HK Audio pour le son, Eurolite et ADJ pour l'éclairage, et Martin pour notre machine à fumée. Cela garantit un son et un éclairage fiables et haute fidélité pour chaque réservation."
		},
		'delivery-only': {
			question: 'Proposez-vous une option de retrait sur place, ou est-ce uniquement de la livraison ?',
			answer:
				"Nous fonctionnons uniquement selon un modèle de livraison : il n'existe pas d'option de retrait sur place. Cela garantit que chaque système est transporté, installé et calibré de façon professionnelle par notre équipe, afin que le matériel fonctionne exactement comme prévu lors de votre événement."
		},
		'streaming-recording': {
			question: "Proposez-vous la diffusion en direct et l'enregistrement multicaméra ?",
			answer:
				"Pas avec notre propre matériel. Les caméras, le tournage et la diffusion en direct n'en font pas partie, nous ne réalisons donc pas nous-mêmes de production multicaméra. Nous fournissons le son de la salle, l'écran et l'éclairage, et pour un événement hybride ou virtuel, vous apportez en général votre ordinateur portable, votre logiciel de diffusion et votre connexion internet. Si votre événement a besoin d'une équipe de tournage ou d'un dispositif de diffusion, dites-le-nous : nous pouvons vérifier si l'un de nos fournisseurs peut s'en charger, s'il en existe un."
		},
		'translation-voting': {
			question: 'Proposez-vous la traduction simultanée ou des systèmes de vote interactif ?',
			answer:
				"Oui, pour la traduction simultanée et les systèmes de vote interactif, même si ce n'est pas avec notre propre matériel : nous organisons les deux avec un partenaire sous-traitant pour les événements d'entreprise et de niveau congrès. Indiquez-nous vos besoins lors de votre demande de devis. Nous ne proposons pas de mur vidéo LED. Notre écran grand format est un panneau plat unique de 60 pouces."
		},
		'large-scale-events': {
			question: 'Pouvez-vous gérer des congrès, salons et expositions de grande envergure ?',
			answer:
				"Absolument. En plus des mariages et réunions d'entreprise, nous équipons des événements de plus grande envergure comme les congrès, salons et expositions avec des solutions audiovisuelles sur mesure, combinant renforcement sonore, écrans grand format, scènes et personnel technique dédié selon les besoins."
		},
		'notice-time': {
			question: 'Quel est le délai minimum pour effectuer une réservation ?',
			answer:
				"Toute location de matériel événementiel et tout service technique doivent être réservés au moins 24 heures à l'avance pour garantir la disponibilité en termes de planning et de logistique. Pour les événements importants ou complexes, nous recommandons de réserver le plus tôt possible pour sécuriser votre date."
		},
		'minimum-order-granada': {
			question: 'Existe-t-il une commande minimum pour un service en dehors de la Costa del Sol ?',
			answer:
				"Sur la Costa del Sol, il n'y a pas de minimum particulier. Pour les destinations plus éloignées et hors province, comme Grenade, nous demandons une valeur de location minimum supérieure à {price:outOfProvinceMinimum} pour couvrir le déplacement logistique en une journée. Nous desservons également Séville : contactez-nous pour confirmer les conditions propres à votre lieu."
		},
		'customize-package': {
			question: 'Puis-je personnaliser ou étendre un forfait selon mes besoins spécifiques ?',
			answer:
				"Oui. Chaque forfait peut être complété avec des options comme des vidéoprojecteurs et écrans, une machine à fumée professionnelle Martin Magnum 650, des microphones supplémentaires, des pupitres premium en acrylique, des plateaux de scène modulables et des heures de technicien en direct supplémentaires. Indiquez-nous vos besoins lors de votre demande de devis et nous construirons la configuration parfaite pour votre événement."
		}
	},
	gallery: {
		'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp': "Détails d'une cérémonie de mariage",
		'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp': "Décoration élégante d'une réception de mariage",
		'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp': 'Table de mariage sur la plage, dressée et décorée',
		'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp': 'Table de mariage dressée dans un style romantique',
		'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp': "Table du dîner d'un mariage en soirée, sous un éclairage doux",
		'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp': 'Belle installation pour une cérémonie de mariage sur la plage',
		'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp': "Aménagement d'une salle de cérémonie de mariage en intérieur",
		'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp': "Arche de cérémonie d'un mariage tropical sur la plage",
		'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp': 'Allée bordée de chaises pour un mariage tropical sur la plage',
		'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp': 'Système audiovisuel en location pour un événement international à Malaga',
		'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp': "Photo d'illustration d'une salle de conférence avec des écrans de projection et une caméra sur trépied",
		'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp': "Location de sonorisation pour la réunion d'une association professionnelle",
		'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp': 'Installation de sonorisation pour une réunion de quartier',
		'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp': "Son et éclairage sur scène lors d'un événement MICE",
		'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp': "Location de sonorisation pour un congrès de grande envergure à l'Hotel Alfonso XIII, Séville",
		'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp': "Installation de scène pour un congrès à l'Hotel Alfonso XIII, Séville",
		'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp': "Installation audiovisuelle pour un événement MICE d'entreprise de Volvo",
		'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp': "Pupitre en méthacrylate lors d'un événement en extérieur",
		'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp': "Location d'écran professionnel, de vidéoprojecteur et de sonorisation",
		'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp': "Superbe installation d'éclairage et de sonorisation pour un événement",
		'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp': 'Éclairage et son pour un événement avec écran',
		'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp': 'Sonorisation installée pour un championnat de tennis',
		'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp': 'Installation de sonorisation et de microphones pour un DJ',
		'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp': 'Éclairage événementiel professionnel et écran de projection',
		'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp': 'Scène, son, image et installation sur mesure',
		'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp': "Location d'éclairage de concert, de microphones et de sonorisation",
		'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp': "Location de sonorisation sur la terrasse de l'Hotel Alfonso XIII, Séville",
		'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp': "Location de son et d'éclairage pour des événements avec un groupe en live",
		'https://cdn.malagaeventgear.com/blog/1323/rental-audio-system-parties-events-600x448.webp': "Location d'un système audio à Malaga pour une fête sur la plage, avec équipement DJ professionnel, enceintes et une foule animée",
		'https://cdn.malagaeventgear.com/blog/1324/rent-microphone-parties-concerts-events-malaga-600x803.webp': "Performance musicale en direct lors d'un événement à Malaga, avec une chanteuse au micro professionnel et un guitariste, créant une ambiance vivante et élégante",
		'https://cdn.malagaeventgear.com/blog/1325/audio-lighting-sound-system-microphone-rental-malaga-600x803.webp': "Un DJ et un guitariste se produisent sur scène avec un équipement son et lumière professionnel lors d'un événement en extérieur dans la province de Malaga",
		'https://cdn.malagaeventgear.com/blog/1330/malaga_concert_podium_sound_system-600x803.webp': 'Podium et système de sonorisation pour un concert dans la province de Malaga',
		'https://cdn.malagaeventgear.com/blog/1787/2025-10-05-at-DJ-audio-and-microphone-system-setup-600x800.webp': "Gros plan sur un équipement de DJ professionnel avec lecteur multimédia et table de mixage lors de l'événement d'une DJ",
		'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp': "Cinq écrans installés en ligne sur un stand d'exposant à l'ECOC 2026, Malaga",
		'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp': "Trois écrans de stand installés pour un exposant au salon de l'ECOC 2026",
		'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp': "Stand d'exposant terminé à l'ECOC 2026, avec son écran installé",
		'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp': "Écran de stand installé au salon de l'ECOC 2026 à Malaga",
		'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp': "Écran de démonstration technologique sur un stand d'exposant de l'ECOC 2026",
		'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp': "Écrans de stand diffusant du contenu produit en direct à l'ECOC 2026, Malaga",
		'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp': "Équipes des exposants mettant en service leurs stands à l'ECOC 2026, FYCMA Malaga",
		'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp': "Exposants branchant leurs ordinateurs portables aux écrans de leur stand à l'ECOC 2026",
		'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp': "Écrans sur des stands d'exposants voisins à l'ECOC 2026",
		'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp': "Montage sur le salon de l'ECOC 2026 au FYCMA, Malaga",
		'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp': "Visiteurs à côté d'un écran de stand au salon de l'ECOC 2026"
	}
} satisfies DataCopy;
