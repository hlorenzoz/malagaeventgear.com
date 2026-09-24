import type { Copy } from './en';

// Copia en español de /meet-the-team/. Traducción provisoria (arrastrada del selector
// en/es): se revisa a español de España en el paso de traducción de la Fase 3.
// La bio en JSON-LD (hector.personDescription) es contenido nuevo (antes solo en inglés,
// sin ternario): se traduce a español peninsular, sin voseo, por la regla del encargo.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Nuestro Equipo - Malaga Event Gear (MEG)',
		description:
			'Conocé al equipo de Malaga Event Gear. Descubrí al equipo experimentado detrás de nuestro servicio profesional y montajes sin contratiempos.'
	},
	hero: {
		badge: 'Quiénes Están Detrás',
		title: 'Nuestro Equipo',
		intro:
			'Conocé a los talentosos especialistas de Malaga Event Gear. Desde el montaje hasta la asistencia en tiempo real, garantizamos un evento sin estrés.'
	},
	technical: {
		title: 'Personal Técnico',
		subtitle: 'Ingeniería AV y Montaje',
		body: 'Técnicos audiovisuales experimentados que garantizan un montaje sin problemas y un funcionamiento impecable de todos los equipos de sonido, luces y pantallas.'
	},
	sales: {
		title: 'Equipo Comercial',
		subtitle: 'Atención al Cliente y Reservas',
		body: 'Nuestro equipo de ventas te guía en la selección del paquete ideal y te ayuda a recibir tu presupuesto personalizado para concretar tu reserva.'
	},
	hector: {
		role: 'Especialista SEO y Co-fundador',
		bio: 'Especialista en SEO que aplica su experiencia para fortalecer la presencia digital de la empresa y atraer clientes mediante estrategias de posicionamiento efectivas.',
		linkedinLabel: 'Perfil de LinkedIn',
		personDescription:
			'Hector Luis Lorenzo es especialista en SEO, con más de dos años de experiencia ayudando a marcas a crecer su visibilidad en línea. Es cofundador de Malaga Event Gear.'
	}
} satisfies Copy;
