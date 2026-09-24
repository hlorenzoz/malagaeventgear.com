import type { Copy } from './en';

// Copia en español de /faq/. Traducción provisoria (arrastrada del selector en/es): se
// revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Preguntas Frecuentes - Malaga Event Gear (MEG)',
		description:
			'Encontrá respuestas claras en la sección de Preguntas Frecuentes de Malaga Event Gear sobre el alquiler de equipos audiovisuales profesionales.'
	},
	hero: {
		badge: 'Consultas Comunes',
		title: 'Preguntas Frecuentes',
		intro:
			'Todo lo que necesitás saber sobre nuestros alquileres audiovisuales profesionales, entregas, montajes y flujo de reservas.'
	},
	filters: {
		all: 'Todas',
		services: 'Servicios y Equipos',
		logistics: 'Logística y Áreas',
		booking: 'Reservas y Plazos',
		contact: 'Contacto'
	}
} satisfies Copy;
