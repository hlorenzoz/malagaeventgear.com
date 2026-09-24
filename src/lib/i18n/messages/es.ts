import type { Messages } from './en';

const es = {
	// Navigation
	nav: {
		equipment: 'Equipos',
		packages: 'Paquetes',
		blog: 'Blog',
		contact: 'Contacto',
		bookNow: 'Reservar Ahora',
		blogInEnglish: 'Blog (en inglés)',
		language: 'Idioma',
		breadcrumbs: 'Ruta de navegación',
		brand: 'Malaga Event Gear'
	},
	// Avisos de idioma (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Respondemos en inglés o en español.',
		legalTranslation: 'Esta es una traducción. Si difiere de la versión en inglés, prevalece la versión en inglés.',
		readEnglish: 'Leer la versión en inglés',
		translatedFrom: 'Traducido del {language}',
		showOriginal: 'Ver original'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Inicio',
		packages: 'Paquetes',
		blog: 'Blog',
		categories: 'Categorías',
		category: 'Categoría',
		author: 'Autor',
		contact: 'Contacto',
		'about-us': 'Sobre Nosotros',
		faq: 'FAQ',
		'privacy-policy': 'Política de Privacidad',
		'terms-of-service': 'Términos de Servicio',
		'cookie-policy': 'Política de Cookies',
		gdpr: 'RGPD',
		'meet-the-team': 'El Equipo',
		equipment: 'Equipos',
		sitemap: 'Mapa del sitio',
		'thank-you': 'Gracias'
	},
	// Hero
	hero: {
		span: 'Para Todo Tipo de Eventos',
		// Traduccion de la categoria primaria del GBP, no una frase de marketing aparte.
		titlePart1: 'Alquiler de Equipos',
		titleGradient: 'Audiovisuales',
		titlePart2: 'en Málaga',
		subtitle: 'Disfrutá de un sonido nítido y una iluminación espectacular con nuestros equipos premium. Ideal para bodas, eventos corporativos y fiestas exclusivas en la Costa del Sol.',
		viewPricing: 'Ver Precios',
		contactUs: 'Contactar'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Montaje Impecable',
		card1Text: 'Soporte técnico dedicado para asegurar que tu evento salga a la perfección de principio a fin sin preocupaciones.',
		card2Title: '#2 Paquetes a Medida',
		card2Text: 'Paquetes de alquiler flexibles diseñados para adaptarse perfectamente a cualquier tamaño de evento, lugar y presupuesto.',
		card3Title: '#3 Tecnología de Punta',
		card3Text: 'Disfrutá de equipos audiovisuales de última generación que elevan la calidad visual y acústica de tu producción.'
	},
	// Overview (De un Vistazo — answer-engine optimization)
	overview: {
		badge: 'De un Vistazo',
		sellQ: '¿Qué vendemos?',
		sellA: 'Alquilamos equipos audiovisuales premium — sistemas de sonido profesional, iluminación de escenario, proyectores y pantallas — para eventos en Málaga y la Costa del Sol, con entrega, montaje y soporte técnico in situ.',
		whoQ: '¿Para quién es?',
		whoA: 'Parejas que organizan su boda, empresas con conferencias y eventos corporativos, y cualquiera que organice una fiesta o celebración privada y quiera sonido e iluminación impecables sin comprar el equipo.',
		costQ: '¿Cuánto cuesta?',
		costA: 'paquetes de precio fijo sin costos ocultos, escalados según el tamaño del evento, más presupuestos a medida para producciones grandes.',
		costFrom: 'Desde',
		howQ: '¿Cómo funciona?',
		howA: 'Cuatro pasos simples: elegís tu paquete, pedís presupuesto, confirmamos y preparamos el equipo, y nuestro equipo entrega y monta todo el día de tu evento.'
	},
	// Impact
	impact: {
		title: 'Nuestro Impacto en Números',
		years: 'Años de Experiencia',
		clients: 'Clientes Felices',
		satisfaction: 'Tasa de Satisfacción'
	},
	// Categories
	categories: {
		badge: 'Equipos Premium',
		title: 'Categorías Disponibles',
		soundTitle: 'Sistemas de Sonido',
		soundText: 'Sonido de alta fidelidad cristalino, ideal para bodas íntimas o grandes conferencias corporativas. Trabajamos con marcas líderes para asegurar la mayor fidelidad acústica.',
		lightTitle: 'Iluminación',
		lightText: 'Soluciones de iluminación dinámica para crear el ambiente perfecto en tu espacio.',
		visualTitle: 'Proyectores y Pantallas',
		visualText: 'Visuales nítidos de alta definición para presentaciones de gran impacto visual.',
		fxTitle: 'Efectos Especiales y Máquinas de Humo',
		fxText: 'Creá una atmósfera increíble en tu evento con nuestros efectos especiales y máquinas de humo de grado profesional.',
		bookEquipment: 'Reservar Paquetes'
	},
	// Pricing
	pricing: {
		badge: 'Precios Transparentes',
		title: 'Paquetes a Medida para Cada Evento',
		subtitle: 'Elegí entre nuestros paquetes de alquiler flexibles diseñados para adaptarse a la perfección al presupuesto y dimensión de tu evento.',
		includes: 'Incluye:',
		includedServices: 'Servicios Incluidos:',
		optional: 'Opcional:',
		check: 'Consultar Disponibilidad',
		mostPopular: 'Más Popular',
		from: 'Desde',
		plusVat: '(+21% IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Reservar'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtros',
		clearAll: 'Limpiar todo',
		resetFilters: 'Reiniciar Filtros',
		showingResults: 'Mostrando {visible} de {total} paquetes',
		noResults: 'Ningún paquete coincide con tus filtros. ¡Probá quitando algunas selecciones!',
		openFilters: 'Filtros',
		done: 'Ver resultados',
		purpose: 'Tipo de Evento',
		capacity: 'Escala del Evento',
		price: 'Presupuesto',
		equipment: 'Equipamiento Incluido',
		extras: 'Extras Opcionales',
		sortBy: 'Ordenar Por',
		party: 'Fiestas',
		wedding: 'Bodas',
		corporate: 'Corporativo',
		presentation: 'Presentaciones',
		meeting: 'Reuniones',
		small: 'Pequeño (hasta 50 invitados)',
		medium: 'Mediano (51–80 invitados)',
		large: 'Grande (80+ invitados)',
		priceLow: 'Hasta 300€',
		priceMid: '300€ – 500€',
		priceHigh: '500€ en adelante',
		transport: 'Transporte y Montaje',
		screen: 'Pantalla / Display',
		sound: 'Sistema de Sonido',
		microphone: 'Micrófonos',
		lighting: 'Iluminación Ambiental',
		technician: 'Técnico en Directo',
		projector: 'Proyector',
		smokeMachine: 'Máquina de Humo',
		technicalAssistant: 'Asistente Técnico',
		lectern: 'Atril',
		staging: 'Tarima / Escenario',
		recommended: 'Recomendado',
		priceAsc: 'Precio: Menor a Mayor',
		priceDesc: 'Precio: Mayor a Menor'
	},
	// Contact
	contact: {
		badge: 'Respuesta Inmediata 24/7',
		title: 'Ponete en Contacto',
		subtitle: '¿Listo para elevar tu evento? Contactá a nuestro equipo técnico para recibir presupuestos personalizados, consultar disponibilidad de equipos y recibir asesoramiento experto.',
		detailsTitle: 'Detalles de Contacto',
		phone: 'Teléfono',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Ubicación',
		hours: 'Horario de Atención',
		hoursText: 'Soporte técnico y logística las 24 horas, los 7 días de la semana.',
		reqTitle: 'Solicitar Presupuesto',
		formName: 'Nombre Completo *',
		formEmail: 'Correo Electrónico *',
		formPhone: 'Teléfono de Contacto',
		formDate: 'Fecha del Evento',
		formType: 'Tipo de Evento',
		formTypeWedding: 'Boda / Celebración',
		formTypeCorporate: 'Evento Corporativo',
		formTypeParty: 'Fiesta Privada',
		formTypeMice: 'Conferencia / MICE',
		formTypeOther: 'Otro tipo de evento',
		formMessage: 'Detalles del Evento y Requerimientos Técnicos *',
		formSubmit: 'Enviar Solicitud',
		formSubmitting: 'Enviando...',
		formRequiredError: 'Por favor, completá todos los campos obligatorios.',
		formErrorSubmit: 'Algo salió mal al enviar tu solicitud. Por favor intentá de nuevo o escribinos directamente.',
		formErrorTurnstile: 'Falló la verificación de seguridad. Por favor intentá de nuevo.',
		formErrorRateLimited: 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.',
		lockedFieldNote: 'Generado automáticamente por un error — este campo no se puede editar.',
		errorPrefillMessage:
			'Hola, envié una solicitud de paquete en su sitio web pero el correo de confirmación no se pudo enviar. ¿Podrían confirmarme que recibieron mi consulta? Referencia: {ref}',
		errorDetailsHeader: 'Datos enviados:',
		errorDetailSource: 'URL del formulario',
		errorDetailName: 'Nombre',
		errorDetailEmail: 'Correo',
		errorDetailPhone: 'Teléfono',
		errorDetailDate: 'Fecha del evento',
		errorDetailPackage: 'Paquete',
		errorDetailComments: 'Comentarios',
		successTitle: '¡Presupuesto Solicitado!',
		successText1: 'Hola',
		successText2: 'recibimos tu solicitud con éxito. Nuestro equipo técnico en Málaga la evaluará y te contactará por email (',
		successText3: ') lo antes posible.',
		successButton: 'Enviar otra solicitud',
		faqTitle: 'Preguntas Frecuentes'
	},
	// Packages Showcase — ver comentario en el bloque EN.
	packages: {
		badge: 'Packs Destacados',
		title: 'Elegí Tu Pack Ideal',
		subtitle: 'Personalizados para cada ocasión. Todos incluyen transporte, montaje y soporte técnico en sitio.',
		enquire: 'Solicitar Presupuesto'
	},
	// How It Works
	process: {
		badge: 'Cómo Funciona',
		title: 'Tu Evento en 4 Pasos Simples',
		s1Title: 'Elegí Tu Pack',
		s1Desc: 'Explorá nuestros paquetes y elegí el que mejor se adapta al tamaño y estilo de tu evento.',
		s2Title: 'Solicitá Presupuesto',
		s2Desc: 'Completá nuestro formulario rápido. Respondemos lo antes posible con disponibilidad completa.',
		s3Title: 'Confirmamos & Planificamos',
		s3Desc: 'Nuestro equipo confirma la logística, el acceso al lugar y cada detalle técnico.',
		s4Title: 'Disfrutá Tu Evento',
		s4Desc: 'Nos encargamos del montaje, el show y el desmontaje. Cero estrés para vos.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Precios Transparentes',
		title: 'Precios Simples y Todo Incluido',
		subtitle: 'Sin costos ocultos. Transporte, montaje y soporte técnico siempre incluidos.',
		viewAll: 'Ver Todos los Packs'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Preguntas Frecuentes'
	},
	// Testimonials (reseñas de Google)
	testimonials: {
		badge: 'Reseñas de Clientes',
		title: 'Historias Reales de Eventos Reales',
		subtitle: 'Reseñas verificadas de Google de clientes en toda la Costa del Sol.',
		ratingLabel: 'EXCELENTE',
		basedOn: 'Basado en {n} reseñas',
		poweredBy: 'Mostrando nuestras últimas reseñas',
		readMore: 'Leer más',
		readLess: 'Leer menos',
		seeAll: 'Ver todas las reseñas',
		prevAria: 'Reseña anterior',
		nextAria: 'Reseña siguiente',
		outOfFiveStars: 'de 5 estrellas'
	},
	// Lead capture form
	leadForm: {
		title: 'Asegurá la Fecha de tu Evento',
		subtitle: 'Completá el formulario y te respondemos lo antes posible.',
		nameLabelInput: 'Nombre Completo *',
		emailLabelInput: 'Correo Electrónico *',
		phoneLabelInput: 'Teléfono / WhatsApp *',
		eventDateLabel: 'Fecha del Evento *',
		commentsLabel: 'Preguntas o Comentarios',
		commentsPlaceholder: 'Contanos sobre tu evento — espacio, cantidad de invitados, requerimientos especiales...',
		submitBtn: 'Verificar Disponibilidad',
		submitting: 'Enviando...',
		errorRequired: 'Este campo es obligatorio.',
		errorEmail: 'Por favor ingresá un correo electrónico válido.',
		errorPhone: 'Por favor ingresá un número de teléfono válido.',
		errorDateFuture: 'La fecha del evento debe ser en el futuro.',
		errorMinLength: 'Debe tener al menos 2 caracteres.',
		errorMaxLength: 'Máximo 1000 caracteres permitidos.',
		errorHoneypot: 'Spam detectado.',
		noCardRequired: 'No se requiere tarjeta de crédito para consultar',
		quickResponseNote: 'Respuesta lo antes posible',
		errorSubmit: 'Algo salió mal. Por favor intentá de nuevo o contactanos directamente.',
		errorTurnstile: 'Falló la verificación de seguridad. Por favor intentá de nuevo.',
		errorRateLimited: 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.',
		emailFailTitle: 'No pudimos enviar tu confirmación',
		emailFailBody: 'Tu solicitud quedó guardada, pero nuestro sistema de correo no pudo enviarla. Por favor contactá al equipo directamente para que no perdamos tu consulta.',
		emailFailAction: 'Contactar al equipo',
		emailFailDismiss: 'Cerrar',
		countryCode: 'Código de País',
		responseTime: 'Respondemos lo antes posible',
		trustBadge: 'Confiado por más de 500 eventos en Málaga'
	},
	// Thank-you page
	thankYou: {
		headline: '¡Gracias! Tu solicitud está en camino.',
		subheadline: 'Recibimos tu consulta y te responderemos lo antes posible.',
		responseTime: 'Respuesta esperada: lo antes posible',
		backToPackages: 'Ver todos los paquetes',
		whatsappCta: 'O contactanos ahora por WhatsApp',
		leadLabel: 'Referencia'
	},
	// Gallery
	gallery: {
		titleHome: 'Nuestros Eventos en Acción',
		titlePackage: 'Eventos Anteriores de {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Ubicación y Perfil de Google',
		title: 'Encontranos en Google',
		subtitle: 'Visitá nuestro perfil oficial de Google Business o mirá nuestra ubicación en Málaga.',
		viewOnGoogle: 'Ver en Google Maps',
		mapTitle: 'Malaga Event Gear - Perfil de Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Alquiler de equipos premium de sonido, iluminación y pantallas para eventos exclusivos en Málaga y la Costa del Sol. Equipamiento de vanguardia y soporte técnico a medida.',
		usefulLinks: 'Enlaces Útiles',
		home: 'Inicio',
		packages: 'Paquetes',
		blog: 'Blog',
		news: 'Noticias',
		categories: 'Categorías',
		aboutUs: 'Sobre Nosotros',
		meetTheTeam: 'Nuestro Equipo',
		contactUs: 'Contáctanos',
		termsOfService: 'Términos del Servicio',
		privacyPolicy: 'Política de Privacidad',
		cookiePolicy: 'Política de Cookies',
		gdpr: 'RGPD',
		faq: 'Preguntas Frecuentes',
		sitemap: 'Mapa del Sitio',
		servicePackages: 'Paquetes de Servicios',
		localAddress: 'Dirección Local',
		listings: 'Directorios',
		onlinePresence: 'Presencia Online',
		moreInformation: 'Más Información',
		moreInfoText: '¿Necesitás más detalles? Contactanos para info sobre alquiler de equipos, precios y disponibilidad.',
		tel: 'Tel',
		clickToChat: 'Chateá Ahora',
		emails: 'Correos',
		forHire: 'Para alquiler',
		forContact: 'Para contacto',
		forLegal: 'Para legal',
		allRightsReserved: 'Todos los derechos reservados.',
		developedBy: 'Desarrollado por',
		lorenzozTitle: 'Lorenzoz Agency: agencia de desarrollo web y soluciones para negocios',
		mailAriaLabel: 'Enviar correo',
		callAriaLabel: 'Llamar a Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Noticias',
		byAuthor: 'Por',
		updated: 'Actualizado',
		shareInlineLabel: 'Compartir:',
		shareSidebarLabel: 'COMPARTIR',
		shareDrawerTitle: 'Compartir publicación',
		copiedShort: 'Copiado!',
		copiedExclaim: '¡Copiado!',
		copyShort: 'Copiar',
		copyLink: 'Copiar link',
		shareOnAria: 'Compartir en {network}',
		copyLinkAria: 'Copiar enlace al portapapeles',
		openSharingAria: 'Abrir opciones para compartir',
		closeSharingAria: 'Cerrar opciones para compartir',
		tweetLabel: 'Twittear',
		tweetAria: 'Twittear esta selección',
		packagesSidebarAria: 'Barra lateral de paquetes del evento',
		tocSidebarAria: 'Barra lateral de tabla de contenidos'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chateá con nosotros'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Página no encontrada',
		genericHeading: 'Algo salió mal',
		notFoundBody: 'La página que buscás no existe o se movió. Probá desde el inicio o escribinos.',
		genericBody: 'Tuvimos un problema procesando tu solicitud. Volvé al inicio o contactanos y lo resolvemos.',
		contactUs: 'Contactanos',
		backHome: 'Ir al inicio'
	}
} satisfies Messages;

export default es;
