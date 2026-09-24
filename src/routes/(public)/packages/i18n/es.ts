import type { Copy } from './en';

// Copia en español de /packages/. `faqSection` es el texto en/es que ya existía en
// +page.svelte como ternarios `i18n.lang === 'en' ? ... : ...`: se traslada tal cual, sin
// reescribirlo, tal como indica CLAUDE.md ("revisión a español de España en la Fase 3"). `seo`
// y `closeFiltersAria` son texto nuevo y ya están en español peninsular.
export const updated = '2026-09-24';

export default {
    seo: {
        title: 'Tarifas y Paquetes de Alquiler a Medida | MEG',
        description:
            'Descubre nuestras tarifas transparentes y paquetes de alquiler de sonido, iluminación y pantallas a medida en Málaga. Opciones perfectas para bodas, eventos corporativos y fiestas.'
    },
    closeFiltersAria: 'Cerrar filtros',
    faqSection: {
        badge: 'Preguntas Frecuentes de Tarifas',
        title: 'Preguntas Frecuentes',
        question: '¿Los precios de los paquetes incluyen IVA?',
        answer:
            'No, las tarifas indicadas no incluyen IVA. Como se detalla con (+21% IVA) junto a cada precio, se aplicará el 21% de IVA español sobre el valor base del paquete. Tu presupuesto final detallará por separado el precio neto y el IVA correspondiente con total transparencia.'
    }
} satisfies Copy;
