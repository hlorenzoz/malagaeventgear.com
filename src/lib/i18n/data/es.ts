import type { DataCopy } from '../data-copy';

// Spanish copy of the package catalog and the FAQ (English source: packages.ts, faq.ts).
// `{packagesWithPrices}` is filled in at render time from the catalog: never write prices here.
export default {
	packages: {
		eco: {
			desc: 'Ideal para fiestas privadas o eventos pequeños de hasta 50 personas. Incluye configuración básica de sonido e iluminación.',
			includes: [
				'2 Altavoces activos de alta calidad con soportes',
				'1 Micrófono dinámico de cable',
				'2 Barras de luz con focos LED RGBW',
				'Cableado estético y montaje profesional'
			],
			optional: [
				'Proyector y pantalla de proyección (+50€)',
				'Máquina de humo/niebla profesional (+20€)'
			],
			seo: {
				title: 'Eco Pack Alquiler de Sonido e Iluminación | Malaga Event Gear'
			},
			landing: {
				badge: 'Eventos Pequeños y Fiestas',
				rateLabel: 'Tarifa Todo Incluido Asequible',
				vatNote: '(+21% IVA) - Montaje y transporte incluidos',
				specTitle: 'Hasta 50 Personas',
				specBody: 'Perfecto para villas, jardines y salas privadas.',
				highlightTitle: 'Servicio Libre de Estrés',
				highlightBody: 'Operamos como un modelo exclusivo de entrega y montaje directo. Llevamos los equipos, los instalamos profesionalmente, probamos el sonido y las luces, y retiramos todo después del evento.',
				includesLabel: 'Qué Incluye',
				optionalLabel: 'Extras Opcionales',
				ctaHeading: 'Asegurá tu Reserva Hoy',
				ctaBody: 'Completá nuestra solicitud rápida de presupuesto técnico para consultar disponibilidad del paquete en tu fecha. ¡Respondemos lo antes posible!',
				ctaButton: 'Reservar Este Paquete'
			}
		},
		wedding: {
			desc: 'Diseñado a la perfección para celebraciones mágicas e inolvidables. Incluye sistema acústico profesional de alta gama, luces ambientales románticas y micrófonos inalámbricos para discursos emotivos.',
			includes: [
				'Sistema de sonido acústico PA activo de alta gama para hasta 80 invitados',
				'Guirnaldas de luces LED cálidas para iluminación ambiental romántica',
				'Micrófonos inalámbricos profesionales para discursos y anuncios',
				'Transporte en Málaga y áreas cercanas',
				'Montaje estético profesional y cableado limpio',
				'Asistencia técnica y control en directo durante todo el evento',
				'Desmontaje rápido post-evento y recogida logística'
			],
			optional: [
				'Máquina de humo/niebla profesional (+20€)'
			],
			seo: {
				title: 'Pack Bodas Sonido e Iluminación Romántica | Malaga Event Gear'
			},
			landing: {
				badge: 'Nuestro Pack de Celebración Más Elegido',
				rateLabel: 'Tarifa Todo Incluido Premium',
				vatNote: '(+21% IVA) - Montaje y técnico incluidos',
				specTitle: 'Hasta 80 Personas',
				specBody: 'Perfecto para villas hermosas, fincas y hoteles de boda.',
				highlightTitle: 'Técnico en Vivo en el Sitio',
				highlightBody: 'No te preocupes por acoples de micrófonos o fallos visuales. Este paquete incluye soporte técnico y monitoreo en directo durante el banquete y los discursos.',
				includesLabel: 'Servicios Premium Incluidos',
				ctaHeading: 'Hacé tu Celebración Mágica',
				ctaBody: 'Las reservas de bodas se completan rápidamente. Asegurá tu fecha con nuestro equipo técnico hoy para garantizar el mejor sonido e iluminación romántica en tu gran día.',
				ctaButton: 'Reservar Este Pack Bodas'
			}
		},
		'product-presentation': {
			desc: 'Diseñado para presentaciones corporativas, exhibiciones en concesionarios y lanzamientos de productos con alto impacto visual.',
			includes: [
				'1 Pantalla de proyección frontal con soporte estable',
				'1 Proyector láser Full HD (5000 lúmenes) para imágenes nítidas',
				'Sistema de sonido para el lugar con 2 altavoces y mesa de mezclas',
				'1 Micrófono inalámbrico de mano premium para oradores'
			],
			seo: {
				title: 'Pack Lanzamiento de Productos Proyección y Audio | Malaga Event Gear'
			},
			landing: {
				badge: 'Soluciones Corporativas de Alto Impacto Visual',
				rateLabel: 'Tarifa Plana de Pack Lanzamientos',
				vatNote: '(+21% IVA) - Proyector láser y pantalla incluidos',
				specTitle: 'Láser de Alto Brillo',
				specBody: 'Proyector HD de 5000 lúmenes ideal para salas iluminadas.',
				highlightTitle: 'Branding Corporativo Impecable',
				highlightBody: 'Maximizá la atención de tu lanzamiento en concesionario, rueda de prensa en hotel o exhibición de producto. Nuestro montaje alinea un detalle gráfico impecable con amplificación de voz de alto rendimiento.',
				includesLabel: 'Qué Incluye',
				note: {
					title: 'Soporte de Conexión y Montaje',
					body: 'Proporcionamos todos los adaptadores necesarios (HDMI, USB-C) e interfaces de audio para conectar tus laptops, tablets o reproductores corporativos sin problemas.'
				},
				ctaHeading: 'Elevá el Lanzamiento de tu Producto',
				ctaBody: 'Dale a tu audiencia la claridad visual y el sonido profesional que merecen. Contactá a nuestro equipo técnico hoy para confirmar disponibilidad.',
				ctaButton: 'Reservar Este Pack Lanzamientos'
			}
		},
		'basic-mice': {
			desc: 'Configuración audiovisual esencial y de alto rendimiento para pequeñas reuniones ejecutivas, conferencias y discursos de hasta 40 invitados.',
			includes: [
				'Pantalla de proyección de 2x2m con proyector de 3000 lúmenes de alto brillo',
				'Sistema de refuerzo de sonido básico y cristalino para hasta 40 personas',
				'1 Micrófono de cuello de cisne profesional para atril/podio',
				'Transporte logístico, montaje y cableado estético'
			],
			optional: [
				'Asistente técnico especializado en directo en el sitio (+240€/día)'
			],
			seo: {
				title: 'Pack MICE Básico Equipamiento de Reuniones | Malaga Event Gear'
			},
			landing: {
				badge: 'Paquetes de Reunión Ejecutiva Esenciales',
				rateLabel: 'Tarifa Plana de Reuniones Corporativas',
				vatNote: '(+21% IVA) - Montaje y transporte incluidos',
				specTitle: 'Hasta 40 Personas',
				specBody: 'Diseñado para salas de juntas, salones privados y suites de hotel.',
				highlightTitle: 'Inteligibilidad de Voz Clara',
				highlightBody: 'La configuración de micrófono de cuello de cisne profesional garantiza una claridad absoluta para discursos de junta directiva, anuncios de prensa o paneles de inversores.',
				includesLabel: 'Qué Incluye',
				optionalLabel: 'Soporte Opcional',
				ctaHeading: 'Planificá tu Reunión Ejecutiva',
				ctaBody: 'Coordiná una logística audiovisual corporativa fluida con Malaga Event Gear. Conectate con nuestros expertos para asegurar una experiencia de sala de juntas profesional.',
				ctaButton: 'Reservar Pack MICE Básico'
			}
		},
		mice: {
			desc: 'Solución corporativa MICE completa con pantalla de gran formato, refuerzo de sonido activo premium, micrófonos inalámbricos para atril y soporte de técnico en directo dedicado.',
			includes: [
				'Pantalla LED de alta definición premium de 60 pulgadas con soporte de diseño',
				'Altavoces activos profesionales y sistema de sonido de alto rendimiento',
				'1 Micrófono de cuello de cisne + 1 micrófono inalámbrico de mano',
				'1 Técnico audiovisual en vivo especializado dedicado (hasta 6 horas de soporte continuo)',
				'Entrega logística, configuración de cableado a medida y desmontaje post-evento'
			],
			optional: [
				'Hora adicional de soporte técnico audiovisual en vivo (+40€/h)',
				'Atril moderno de metacrilato/acrílico premium (+50€)',
				'Tarimas de escenario modulares / plataformas (+35€ por metro cuadrado)'
			],
			seo: {
				title: 'Pack MICE Corporativo con Pantalla LED y Técnico | Malaga Event Gear'
			},
			landing: {
				badge: 'Experiencia MICE Corporativa Premium',
				rateLabel: 'Tarifa Corporativa Todo Incluido',
				vatNote: '(+21% IVA) - Pantalla LED, sonido y técnico en directo incluidos',
				specTitle: 'Pantalla LED de 60 Pulgadas',
				specBody: 'Pantalla de gran formato en alta definición para visuales corporativos de impacto.',
				highlightTitle: 'Técnico en Directo Dedicado',
				highlightBody: 'Un técnico audiovisual especializado opera tu evento durante hasta 6 horas continuas, garantizando sonido, visuales y gestión de micrófonos impecables durante tu cumbre, conferencia o lanzamiento.',
				includesLabel: 'Servicios Premium Incluidos',
				optionalLabel: 'Extras Opcionales',
				ctaHeading: 'Potenciá tu Evento Corporativo',
				ctaBody: 'Brindá una experiencia corporativa impecable con audiovisual premium y soporte técnico dedicado. Contactá a nuestro equipo hoy para confirmar disponibilidad en tu fecha.',
				ctaButton: 'Reservar Paquete MICE'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: '¿Qué es Malaga Event Gear (MEG) y qué servicios ofrece?',
			answer: 'Malaga Event Gear (MEG) es una empresa con sede en Málaga, España, especializada en el alquiler de equipos profesionales audiovisuales, de iluminación y de eventos. Ofrecemos sistemas de sonido, proyectores, pantallas, escenarios, asistencia técnica, máquinas de humo, soluciones de iluminación y micrófonos — además de servicios especializados como refuerzo de sonido en vivo, y traducción simultánea y sistemas de votación interactiva gestionados a través de un proveedor subcontratado.'
		},
		'event-types': {
			question: '¿Qué tipos de eventos cubre Malaga Event Gear (MEG)?',
			answer: 'Cubrimos celebraciones personales como bodas y fiestas privadas; encuentros profesionales como eventos corporativos, reuniones, conferencias y presentaciones de producto; y eventos de mayor escala como congresos, ferias y exposiciones, siempre con soluciones audiovisuales a medida.'
		},
		'service-areas': {
			question: '¿Dónde ofrece sus servicios Malaga Event Gear (MEG)?',
			answer: 'Aunque "Málaga" está en nuestro nombre, nuestros servicios van mucho más allá de la ciudad. Operamos principalmente en la Costa del Sol — incluyendo Málaga capital, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmádena y Estepona. También atendemos Sevilla y Granada, aunque Granada normalmente requiere reservas superiores a 400 € por la distancia de traslado fuera de la provincia.'
		},
		'what-makes-unique': {
			question: '¿Qué hace única a Malaga Event Gear (MEG) frente a otras empresas de alquiler audiovisual?',
			answer: 'MEG se diferencia por un enfoque centrado en el cliente y simplificado: un técnico dedicado en sitio en cada reserva, equipamiento de marcas premium y precios transparentes y todo incluido. Avanzamos hacia una experiencia de reserva 100% online con precios fijos estandarizados y transacciones totalmente transparentes.'
		},
		'booking-process': {
			question: '¿Cómo funciona el proceso de reserva con Malaga Event Gear?',
			answer: 'Nuestro flujo de trabajo optimizado tiene cuatro pasos: 1. Elegí tu paquete. 2. Solicitá tu presupuesto con nuestro formulario rápido. 3. Nuestro equipo te contacta para detallar y confirmar la reserva. 4. Disfrutá de un evento sin complicaciones mientras nos encargamos de la entrega, montaje profesional, calibración y desmontaje. Tené en cuenta que los servicios deben contratarse con al menos 24 horas de antelación.'
		},
		'popular-packages': {
			question: '¿Cuáles son algunos de los paquetes populares de Malaga Event Gear?',
			answer: 'Nuestros paquetes prediseñados más populares incluyen el {packagesWithPrices}, cada uno con distinto equipamiento y prestaciones. Visitá nuestra página de Precios para ver el detalle completo de lo que incluye cada uno.'
		},
		'language-hours': {
			question: '¿En qué idioma se comunican con los clientes y cuál es su horario de atención?',
			answer: 'Malaga Event Gear (MEG) se comunica con los clientes principalmente en inglés, y todos los servicios se ofrecen en inglés para atender a nuestra clientela internacional. Estamos disponibles las 24 horas, los 7 días de la semana, para montajes técnicos y control en vivo de eventos.'
		},
		'contact-info': {
			question: '¿Cómo pueden contactar con Malaga Event Gear (MEG) y qué información deben facilitar?',
			answer: 'Podés contactarnos por teléfono al 666 346 911, por WhatsApp o por email. Para darte un presupuesto preciso, indicanos la fecha del evento, la ubicación, el número estimado de invitados y el tipo de equipo o paquete que te interesa. Visitá nuestra página de Contacto para más detalles.'
		},
		'delivery-setup': {
			question: '¿Ofrecen entrega y montaje de equipos de sonido e iluminación?',
			answer: 'Sí. MEG ofrece entrega completa, montaje profesional y desmontaje post-evento para todos los alquileres de sonido e iluminación. Nuestro servicio incluye transporte, instalación, ocultación de cableado, pruebas de sonido/iluminación y asistencia técnica opcional en sitio en Málaga, Marbella, Fuengirola, Torremolinos, Estepona y zonas cercanas.'
		},
		'vat-pricing': {
			question: '¿Los precios de los paquetes incluyen IVA?',
			answer: 'No, las tarifas indicadas no incluyen IVA. Como se detalla con (+21% IVA) junto a cada precio, se aplicará el 21% de IVA español sobre el valor base del paquete. Tu presupuesto final detallará por separado el precio neto y el IVA correspondiente con total transparencia.'
		},
		'on-site-technician': {
			question: '¿Proporcionan un técnico en sitio durante el evento?',
			answer: 'Sí. Varios paquetes —como el Wedding Pack y el MICE Pack completo— incluyen un técnico en directo dedicado que se encarga del control técnico y el soporte de ingeniería durante todo tu evento. En los paquetes donde no está incluido (por ejemplo el Basic MICE Pack), la asistencia técnica en sitio se puede añadir como opción desde 240 € por día.'
		},
		'equipment-brands': {
			question: '¿Con qué marcas de equipos trabajan?',
			answer: 'Usamos marcas profesionales premium de confianza en la industria de eventos en vivo, incluyendo Audix, HK Audio y Martin, entre otras. Esto garantiza un rendimiento de sonido e iluminación fiable y de alta fidelidad en cada reserva.'
		},
		'delivery-only': {
			question: '¿Ofrecen recogida por cuenta propia o el servicio es solo con entrega?',
			answer: 'Operamos bajo un modelo exclusivo de entrega — no hay opción de recogida por cuenta propia. Esto garantiza que cada sistema llegue transportado, instalado y calibrado profesionalmente por nuestro equipo, para que el equipo funcione exactamente como debe en tu evento.'
		},
		'streaming-recording': {
			question: '¿Ofrecen transmisión en vivo y grabación multicámara?',
			answer: 'No. No ofrecemos cámaras, codificadores de transmisión, producción de video multicámara ni un servicio de grabación. Nosotros aportamos el sonido, la pantalla y la iluminación de la sala; para un evento híbrido o virtual, tú aportas tu portátil, tu software de transmisión y tu conexión a internet.'
		},
		'translation-voting': {
			question: '¿Proporcionan traducción simultánea o sistemas de votación interactiva?',
			answer: 'Sí, ofrecemos traducción simultánea y sistemas de votación interactiva, aunque no con equipamiento propio: ambos los gestionamos a través de un proveedor subcontratado para eventos corporativos y de nivel congreso. Indicanos tus necesidades al solicitar el presupuesto. No ofrecemos video wall; nuestra pantalla de gran formato es un panel plano único de 60 pulgadas.'
		},
		'large-scale-events': {
			question: '¿Pueden gestionar congresos, ferias y exposiciones de gran escala?',
			answer: 'Por supuesto. Además de bodas y reuniones corporativas, equipamos eventos de mayor escala como congresos, ferias y exposiciones con soluciones audiovisuales a medida — combinando refuerzo de sonido, pantallas de gran formato, video walls, escenarios y personal técnico dedicado según haga falta.'
		},
		'notice-time': {
			question: '¿Con cuánta antelación mínima se debe hacer una reserva?',
			answer: 'Todos los alquileres de equipos y servicios técnicos deben contratarse con un mínimo de 24 horas de antelación para garantizar la programación y la disponibilidad logística. Para eventos grandes o complejos, recomendamos reservar lo antes posible para asegurar tu fecha.'
		},
		'minimum-order-granada': {
			question: '¿Hay un pedido mínimo para el servicio fuera de la Costa del Sol?',
			answer: 'Dentro de la Costa del Sol no hay un mínimo especial. Para destinos más lejanos y fuera de la provincia, como Granada, requerimos un valor de alquiler superior a 400 € para cubrir el traslado logístico de un día. Sevilla también está cubierta — contactanos para confirmar las condiciones de tu ubicación concreta.'
		},
		'customize-package': {
			question: '¿Puedo personalizar o ampliar un paquete según mis necesidades?',
			answer: 'Sí. Cada paquete se puede ampliar con complementos como proyectores y pantallas, máquinas de humo profesionales, micrófonos adicionales, atriles de acrílico premium, tarimas de escenario modulares y horas extra de técnico en directo. Contanos tus necesidades al solicitar el presupuesto y armamos la configuración perfecta para tu evento.'
		}
	}
} satisfies DataCopy;
