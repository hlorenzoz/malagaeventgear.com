import type { Copy } from './en';

// Copia en español de /contact/. `schema`, `whatsappLinkText`, `messages` y `errors.pastDate`
// son el texto en/es que ya existía en +page.svelte como ternarios `i18n.lang === 'en' ? ... :
// ...`: se traslada tal cual (incluidas erratas de acentuación existentes, p. ej.
// "Contactanos"), sin reescribirlo, tal como indica CLAUDE.md ("revisión a español de España en
// la Fase 3"). `seo` y `form` son texto nuevo y ya están en español peninsular.
export const updated = '2026-09-24';

export default {
    seo: {
        title: 'Contacto y Presupuestos Audiovisuales | MEG',
        description:
            'Ponte en contacto con Malaga Event Gear para solicitar presupuestos de alquiler de sonido, iluminación y pantallas. Soporte técnico 24/7.'
    },
    schema: {
        name: 'Contactanos - Malaga Event Gear',
        description:
            'Contactá al equipo técnico de Malaga Event Gear para solicitar presupuestos personalizados de alquiler de sonido, iluminación y pantallas.'
    },
    whatsappLinkText: 'Envianos un mensaje',
    messages: {
        packIntro: 'Hola, estoy interesado en reservar el Pack: {pack}. Por favor, indíquenme disponibilidad y detalles.',
        categoryIntro:
            'Hola, estoy interesado en alquilar equipos de la categoría: {category}. Quedo a la espera de su presupuesto.'
    },
    errors: {
        pastDate: 'Elegí una fecha de evento posterior a hoy.'
    },
    form: {
        namePlaceholder: 'Nombre Completo',
        emailPlaceholder: 'Correo Electrónico',
        phonePlaceholder: 'Teléfono',
        messagePlaceholder: 'Mensaje'
    }
} satisfies Copy;
