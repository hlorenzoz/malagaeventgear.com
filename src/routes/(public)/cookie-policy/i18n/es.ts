import type { Copy } from './en';

// Copia en español de /cookie-policy/. Traducción provisoria (arrastrada del selector en/es):
// se revisa a español de España en el paso de traducción de la Fase 3. Nota: el selector
// original repetía el numeral dentro del string en español ("1. Cookies Esenciales...") ademas
// del numeral literal en el markup ("1. {...}"), duplicando el "1." solo en español. Acá el
// numeral vive una sola vez, en el markup, igual que en inglés.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de Cookies - Malaga Event Gear (MEG)',
		description:
			'Comprendé cómo Malaga Event Gear utiliza cookies y tecnologías de seguimiento para optimizar la usabilidad del sitio web.'
	},
	hero: {
		badge: 'Seguimiento y Usabilidad',
		title: 'Política de Cookies',
		effectiveDate: 'Fecha de Vigencia: 16 de Octubre de 2025'
	},
	whatAreCookies: {
		title: '¿Qué son las Cookies?',
		body: 'Las cookies son pequeños archivos de texto que se colocan en tu dispositivo cuando visitás nuestro sitio web. Ayudan a que el sitio funcione de manera más eficiente, nos permiten persistir tus preferencias de idioma (por ejemplo, EN/ES) y brindan datos analíticos anónimos a nuestro equipo.'
	},
	categories: {
		title: 'Categorías de Cookies que Utilizamos',
		items: [
			{
				title: 'Cookies Esenciales y Técnicas',
				body: 'Altamente esenciales para la navegación básica, la seguridad y el funcionamiento persistente de las selecciones de preferencias de idioma. No se pueden desactivar.'
			},
			{
				title: 'Cookies Analíticas y de Rendimiento',
				body: 'Utilizamos Google Analytics y Google Search Console para monitorear el tráfico, diagnosticar cuellos de botella y velocidad del sitio. Todos los datos recopilados se agregan y se seudonimizan de manera estricta.'
			},
			{
				title: 'Cookies de Verificación de Terceros',
				body: 'Para mostrar testimonios de clientes auténticos verificados directamente de Google My Business, integramos Trustindex. Trustindex puede colocar cookies para rastrear y validar dinámicamente los widgets de reseñas.'
			}
		]
	},
	managing: {
		title: 'Gestión de tus Preferencias',
		body: 'Podés rechazar o bloquear fácilmente las cookies a través de las preferencias de tu navegador. Sin embargo, tené en cuenta que restringir todas las cookies puede afectar tu acceso a funcionalidades avanzadas, como el llenado automático de formularios o las selecciones de idioma persistentes.'
	}
} satisfies Copy;
