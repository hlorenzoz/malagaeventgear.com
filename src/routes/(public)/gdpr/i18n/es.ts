import type { Copy } from './en';

// Copia en español de /gdpr/. Traducción provisoria (arrastrada del selector en/es): se revisa
// a español de España en el paso de traducción de la Fase 3. Excepción: "legalBasis" nunca
// estuvo traducido en el selector original (quedaba en inglés en ambos idiomas), así que acá
// se traduce por primera vez, directamente a español de España peninsular (nunca voseo), como
// indica la instrucción de la tarea para literales English-only.
export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Cumplimiento del RGPD - Malaga Event Gear (MEG)',
		description:
			'Comprendé cómo Malaga Event Gear protege tus datos personales de acuerdo con el Reglamento General de Protección de Datos (RGPD).'
	},
	hero: {
		badge: 'Regulación Europea',
		title: 'Cumplimiento del RGPD',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Fecha de Vigencia: 16 de Octubre de 2025'
	},
	commitment: {
		title: 'Compromiso con el RGPD',
		body: 'Dado que Malaga Event Gear (MEG) tiene su sede en Málaga, España, cumplimos estrictamente con el Reglamento General de Protección de Datos (RGPD) (Reglamento (UE) 2016/679) en lo que respecta a la recopilación, procesamiento y retención de datos personales.'
	},
	processing: {
		title: 'Detalles de Procesamiento de Datos Personales',
		headers: {
			category: 'Categoría de Datos',
			legalBasis: 'Base Legal',
			purpose: 'Finalidad de Uso'
		},
		rows: [
			{
				category: 'Identidad y Contacto',
				legalBasis: 'Cumplimiento del contrato',
				purpose:
					'Para comunicarse, finalizar especificaciones de reserva y enviar presupuestos por email, teléfono o WhatsApp en inglés.'
			},
			{
				category: 'Ubicación y Horario del Evento',
				legalBasis: 'Cumplimiento del contrato',
				purpose: 'Esencial para coordinar la entrega, el montaje profesional personalizado y la retirada.'
			},
			{
				category: 'Datos de Pago',
				legalBasis: 'Cumplimiento del contrato y seguridad',
				purpose:
					'Para finalizar transacciones seguras. Garantizamos que todos los pagos de compra son 100% seguros.'
			}
		]
	},
	rights: {
		title: 'Derechos del Interesado bajo el RGPD',
		intro: 'Bajo el RGPD, tenés los siguientes derechos con respecto a los datos personales que procesamos:',
		items: [
			{
				label: 'Derecho de Acceso:',
				body: 'Podés solicitar confirmación y copia de todos los registros personales que mantenemos.'
			},
			{
				label: 'Derecho de Rectificación:',
				body: 'Podés solicitar la actualización de datos incompletos o inexactos.'
			},
			{
				label: 'Derecho de Supresión (Derecho al Olvido):',
				body: 'Podés solicitar la eliminación de tus registros personales.'
			},
			{
				label: 'Derecho a la Limitación del Tratamiento:',
				body: 'Podés solicitar que limitemos el procesamiento bajo ciertas condiciones.'
			}
		]
	},
	rightsPortal: {
		title: 'Ejercé tus Derechos del RGPD',
		body: 'Seleccioná una acción a continuación para iniciar automáticamente tu solicitud de privacidad a nuestro equipo.',
		buttons: {
			access: 'Solicitar Acceso a Datos',
			rectification: 'Solicitar Rectificación de Datos',
			erasure: 'Solicitar Eliminación de Datos'
		},
		status: {
			prefix: 'Tu solicitud de ',
			middle: ' ha sido iniciada. Por favor, escribinos a ',
			suffix: ' para completar la verificación.'
		}
	}
} satisfies Copy;
