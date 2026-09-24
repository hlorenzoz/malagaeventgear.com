import type { Copy } from './en';

// Copia en español de /terms-of-service/. Traducción provisoria (arrastrada del selector
// en/es): se revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Términos del Servicio - Malaga Event Gear (MEG)',
		description:
			'Leé los Términos de Servicio oficiales para el alquiler en Malaga Event Gear. Entendé nuestras políticas de reservas, pagos y servicios.'
	},
	hero: {
		badge: 'Marco Legal',
		title: 'Términos del Servicio',
		effectiveDate: 'Fecha de Vigencia: 16 de Octubre de 2025'
	},
	intro: {
		title: 'Introducción y Aceptación de los Términos',
		body: 'Al acceder o utilizar los servicios proporcionados por Malaga Event Gear (MEG), aceptás estar sujeto a estos Términos de Servicio. Malaga Event Gear ofrece alquiler de equipos profesionales de sonido, iluminación y eventos para diversas ocasiones, incluyendo bodas, fiestas privadas, eventos corporativos, reuniones y conferencias MICE.'
	},
	scope: {
		title: 'Alcance del Servicio y Ofertas',
		p1: 'Nos especializamos en ofrecer sistemas PA acústicos activos de alta fidelidad, soluciones de iluminación profesional (focos wash, barras LED, cabezas móviles), proyectores de altos lúmenes, micrófonos (con cable, inalámbricos, flexo), máquinas de humo y tarimas de escenario.',
		p2: 'Muchos de nuestros paquetes, como el Pack Boda y el Pack MICE, incluyen transporte, instalación profesional, soporte técnico en vivo en el sitio y desmontaje posterior al evento para una experiencia completamente libre de estrés.'
	},
	limits: {
		title: 'Límites Geográficos y Operativos',
		p1: 'Nuestros servicios se concentran principalmente en la provincia de Málaga y la Costa del Sol (incluyendo Málaga capital, Marbella, Fuengirola, Torremolinos, Estepona, Sevilla y zonas adyacentes). El servicio a Granada está disponible únicamente para paquetes que superen los 400,00 € debido a los gastos de viaje de un día fuera de la provincia.',
		p2: 'Malaga Event Gear opera los 7 días de la semana, de 8:00 AM a 8:00 PM para consultas comerciales, y 24/7 para logística técnica y soporte de montaje.',
		p3: 'Para garantizar la absoluta precisión técnica para nuestro público internacional, toda la comunicación, documentación y reservas de la interfaz se realizan únicamente en inglés.'
	},
	booking: {
		title: 'Reservas, Precios y Seguridad',
		p1: 'Todas las prestaciones de servicios deben contratarse con un mínimo de 24 horas de antelación. Para finalizar una reserva, el cliente debe proporcionar la Localización exacta y el Horario del evento.',
		p2: 'Todos los precios indicados en nuestro sitio web se proporcionan con el IVA (+21%) no incluido. Garantizamos que todas las transacciones de pago son 100% seguras y se procesan utilizando pasarelas financieras de confianza.'
	},
	obligations: {
		title: 'Obligaciones del Cliente y Responsabilidad del Equipo',
		body: 'El cliente es responsable de garantizar el acceso al recinto y que las tomas de corriente necesarias estén disponibles en la Localización y Horario programados. El cliente reconoce que está alquilando equipos profesionales de alta calidad y debe garantizar la seguridad e integridad física de los mismos durante el período de alquiler acordado.'
	}
} satisfies Copy;
