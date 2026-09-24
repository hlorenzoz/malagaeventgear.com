import type { Copy } from './en';

// Copia en español de /privacy-policy/. Traducción provisoria (arrastrada del selector en/es):
// se revisa a español de España en el paso de traducción de la Fase 3.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de Privacidad - Malaga Event Gear (MEG)',
		description:
			'Leé la Política de Privacidad oficial de Malaga Event Gear. Aprendé cómo recopilamos, procesamos y protegemos tu información personal.'
	},
	hero: {
		badge: 'Declaraciones de Privacidad',
		title: 'Política de Privacidad',
		effectiveDate: 'Fecha de Vigencia: 16 de Octubre de 2025'
	},
	whoWeAre: {
		title: 'Quiénes Somos',
		body: 'Nuestra dirección web es https://malagaeventgear.com. En Malaga Event Gear (MEG), nos comprometemos a proteger tu información personal y a proporcionar declaraciones transparentes sobre el uso de datos.'
	},
	infoCollected: {
		title: 'Información que Recopilamos y Finalidad',
		intro:
			'Recopilamos y procesamos datos personales cuando interactuás con nuestro flujo de negocio establecido (por ejemplo, cuando solicitás tu presupuesto a través de nuestro formulario):',
		table: {
			headers: {
				category: 'Categoría de Datos',
				purpose: 'Finalidad del Procesamiento'
			},
			rows: [
				{
					category: 'Datos de Contacto',
					purpose:
						'Nombre, email, teléfono o WhatsApp para coordinar la logística y confirmar tu reserva. Realizado únicamente en inglés.'
				},
				{
					category: 'Logística del Evento',
					purpose:
						'Localización (ubicación) y Horario exactos para coordinar la entrega, el montaje personalizado de los equipos y la retirada.'
				},
				{
					category: 'Datos Financieros',
					purpose:
						'Información de pago procesada durante las reservas. Garantizamos que todas las transacciones de pago son 100% seguras.'
				}
			]
		}
	},
	reviews: {
		title: 'Reseñas y Prueba Social',
		body: 'Mostramos una calificación de EXCELENTE basada en reseñas verificadas de Google My Business. La verificación de las reseñas se gestiona de forma dinámica a través de Trustindex, lo que garantiza que la fuente original de todos los testimonios de los clientes sea genuina e inalterada.'
	},
	retention: {
		title: 'Retención de Datos y Derechos',
		body: 'Retenemos tus datos personales únicamente durante el tiempo necesario para completar los servicios audiovisuales contratados o cumplir con los mandatos legales. Tenés plenos derechos bajo el RGPD para acceder, rectificar, oponerte o solicitar la eliminación de tus registros personales en cualquier momento poniéndote en contacto con nuestro Responsable de Datos.'
	}
} satisfies Copy;
