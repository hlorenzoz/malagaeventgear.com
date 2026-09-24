import type { Copy } from './en';

// Copia en español de /packages/[slug]/. `benefits`, `faqs`, `popularBadge`, `itemsIncludedSuffix`
// y `faqSectionTitle` son el texto en/es que ya existía en +page.svelte como ternarios
// `i18n.lang === 'en' ? ... : ...`: se traslada tal cual (voseo incluido), sin reescribirlo,
// tal como indica CLAUDE.md ("revisión a español de España en la Fase 3"). `stickyBarAriaLabel`
// es texto nuevo y ya está en español peninsular.
export const updated = '2026-09-24';

export default {
    benefits: {
        delivery: 'Transporte y montaje gratis (Málaga y Costa del Sol)',
        brands: 'Equipos de marca premium (HK Audio, Audix, Midas)',
        support: 'Soporte técnico in situ disponible'
    },
    faqs: {
        delivery: {
            q: '¿El transporte y montaje están incluidos en el precio?',
            a: 'Sí, para paquetes premium (como el {wedding} y el {mice}), el transporte, montaje profesional del cableado y desmontaje en Málaga y cercanías está incluido. Para packs estándar, se puede aplicar un pequeño cargo logístico según la ubicación exacta.'
        },
        areas: {
            q: '¿Qué zonas de Andalucía cubren?',
            a: 'Damos servicio diario a Málaga capital, Marbella y toda la Costa del Sol. También cubrimos Sevilla y Granada (para pedidos mayores de 400€). No ofrecemos opción de recogida local ya que operamos bajo un modelo exclusivo de entrega a domicilio.'
        },
        rain: {
            q: '¿Qué pasa si llueve en un evento al aire libre?',
            a: 'Si tu evento es al aire libre, requerimos una zona techada (carpas, pérgolas) para proteger los equipos eléctricos. En caso de lluvia sin techo, coordinaremos con vos para trasladar el montaje bajo techo. La seguridad y protección de los equipos eléctricos es nuestra prioridad.'
        },
        technician: {
            q: '¿Qué pasa si necesito un técnico durante el evento?',
            a: 'Nuestros paquetes premium (como el {wedding} y el {mice}) ya incluyen asistencia y monitoreo técnico en directo. Para otros paquetes, podés solicitar que un ingeniero de sonido/iluminación se quede en el recinto para garantizar tranquilidad absoluta.'
        }
    },
    popularBadge: 'Más Popular',
    itemsIncludedSuffix: 'elementos incluidos',
    faqSectionTitle: 'Preguntas Frecuentes',
    stickyBarAriaLabel: 'Barra fija de llamada a la acción'
} satisfies Copy;
