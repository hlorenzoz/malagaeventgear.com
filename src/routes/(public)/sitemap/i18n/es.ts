import type { Copy } from './en';

// Copia en español de /sitemap/. Traducción provisoria (arrastrada del selector en/es): se
// revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Mapa del Sitio - Malaga Event Gear (MEG)',
		description:
			'Explorá el mapa del sitio de Malaga Event Gear. Encontrá enlaces a todos nuestros servicios de alquiler de equipos audiovisuales y de iluminación.'
	},
	hero: {
		badge: 'Directorio de la Web',
		title: 'Mapa del Sitio',
		intro:
			'Explorá nuestro directorio completo de páginas estáticas, paquetes de eventos especializados y contenido del blog.'
	},
	portals: {
		heading: 'Portales Principales',
		home: 'Página de Inicio',
		pricing: 'Precios y Paquetes',
		equipment: 'Catálogo de Equipos',
		contact: 'Reservar / Contacto'
	},
	packages: {
		heading: 'Paquetes de Eventos'
	},
	legal: {
		heading: 'Información y Legales',
		about: 'Sobre Nuestra Agencia',
		team: 'Nuestro Equipo de Expertos',
		faq: 'Preguntas Frecuentes',
		terms: 'Términos del Servicio',
		privacy: 'Política de Privacidad',
		cookies: 'Política de Cookies',
		gdpr: 'Cumplimiento del RGPD'
	},
	blog: {
		heading: 'Blog',
		categoriesHeading: 'Categorías',
		allPosts: 'Todos los Posts',
		authorsHeading: 'Autores',
		recentHeading: 'Posts Recientes',
		viewAll: 'Ver todos →'
	}
} satisfies Copy;
