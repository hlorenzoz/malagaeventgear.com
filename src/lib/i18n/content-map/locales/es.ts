import type { LocaleContentMap } from '../schema';

export default {
	pages: {
		'/': { path: '/', keyword: 'alquiler de equipos audiovisuales en Málaga', status: 'propuesta' },
		'/about-us/': { path: '/sobre-nosotros/', keyword: 'empresa de alquiler audiovisual en Málaga', status: 'propuesta' },
		'/contact/': { path: '/contacto/', keyword: 'presupuesto alquiler audiovisual Málaga', status: 'propuesta' },
		'/equipment/': { path: '/equipos/', keyword: 'catálogo de alquiler de equipos audiovisuales', status: 'propuesta' },
		'/packages/': { path: '/paquetes/', keyword: 'precios alquiler equipos audiovisuales Málaga', status: 'propuesta' },
		'/faq/': { path: '/preguntas-frecuentes/', keyword: 'preguntas frecuentes alquiler audiovisual Málaga', status: 'propuesta' },
		'/meet-the-team/': { path: '/nuestro-equipo/', keyword: 'equipo técnico Malaga Event Gear', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog de alquiler audiovisual y eventos', status: 'propuesta' },
		'/blog/categories/': { path: '/blog/categorias/', keyword: 'categorías del blog de eventos', status: 'propuesta' },
		'/sitemap/': { path: '/mapa-del-sitio/', keyword: 'mapa del sitio Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': { path: '/politica-de-privacidad/', keyword: 'política de privacidad Malaga Event Gear', status: 'propuesta' },
		'/terms-of-service/': { path: '/terminos-y-condiciones/', keyword: 'términos y condiciones Malaga Event Gear', status: 'propuesta' },
		'/gdpr/': { path: '/rgpd/', keyword: 'protección de datos RGPD Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': { path: '/politica-de-cookies/', keyword: 'política de cookies Malaga Event Gear', status: 'propuesta' },
		'/thank-you/': { path: '/gracias/' }
	},
	segments: { category: 'categoria', author: 'autor' },
	packages: {
		eco: { slug: 'eco', keyword: 'alquiler de sonido y luces para fiestas en Málaga', status: 'propuesta' },
		wedding: { slug: 'boda', keyword: 'alquiler de sonido y luces para bodas en Málaga', status: 'propuesta' },
		'product-presentation': {
			slug: 'presentacion-de-producto',
			keyword: 'alquiler de proyector y pantalla para presentaciones en Málaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'mice-basico',
			keyword: 'alquiler de equipo audiovisual para reuniones de empresa en Málaga',
			status: 'propuesta'
		},
		mice: { slug: 'mice', keyword: 'alquiler audiovisual para congresos y conferencias en Málaga', status: 'propuesta' }
	},
	categories: {
		'audio-visual-rental': { slug: 'alquiler-audiovisual', name: 'Alquiler Audiovisual' },
		'corporate-enterprise': { slug: 'empresas', name: 'Corporativo y Empresas' },
		events: { slug: 'eventos', name: 'Eventos' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'noticias', name: 'Noticias' },
		weddings: { slug: 'bodas', name: 'Bodas' }
	},
	posts: {}
} satisfies LocaleContentMap;
