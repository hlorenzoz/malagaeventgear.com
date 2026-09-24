import type { Copy } from './en';

// Copia en español de /blog/. Traducción provisoria (arrastrada del selector en/es): se
// revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Blog Experto de Audiovisuales y Eventos | Malaga Event Gear',
		description:
			'Leé consejos expertos sobre sonido de alta fidelidad, iluminación romántica para bodas, configuraciones de proyectores de congresos y equipos para eventos en Málaga.'
	},
	schema: {
		name: 'Blog Audiovisual y de Eventos | MEG',
		description:
			'Guías técnicas expertas, consejos de alquiler audiovisual e ideas de planificación de bodas para Málaga y la Costa del Sol.'
	},
	hero: {
		badge: 'Conocimiento e Inspiración',
		titlePrefix: 'El Blog de',
		titleHighlight: 'Malaga Event Gear',
		intro:
			'Compartimos ideas profesionales, planos acústicos y guías de diseño visual para que tu congreso corporativo, boda o fiesta en la Costa del Sol sea técnicamente impecable.'
	},
	empty: '¡Aún no hay artículos. Volvé pronto!',
	newsBadge: 'Noticias',
	readMore: 'Leer Más →',
	clustersHeading: 'Temáticas Principales que Cubrimos',
	clusters: ['Bodas', 'MICE Corporativo', 'Acústica y Sonido', 'Luces Escénicas', 'Proyección Láser', 'Fiestas Privadas'],
	cta: {
		advice: 'Asesoramiento Técnico Gratis',
		packages: 'Explorar Paquetes'
	}
} satisfies Copy;
