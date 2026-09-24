import type { Copy } from './en';

// Copia en español de la home. `faqSection` y `posts` son el texto en/es que ya existía en
// +page.svelte como ternarios `i18n.lang === 'en' ? ... : ...`: se traslada tal cual (voseo
// incluido), sin reescribirlo, tal como indica CLAUDE.md ("revisión a español de España en la
// Fase 3"). `seo` y las descripciones de imagen son texto nuevo y ya están en español peninsular.
export const updated = '2026-09-24';

export default {
    seo: {
        title: 'Alquiler de Equipos Audiovisuales en Málaga | MEG',
        description:
            'Malaga Event Gear (MEG) ofrece alquiler de sistemas de sonido, iluminación espectacular, proyectores y pantallas para bodas, eventos corporativos y fiestas en Málaga.'
    },
    hero: {
        imageAlt: 'Escenario de evento premium con iluminación audiovisual profesional en la Costa del Sol'
    },
    categories: {
        soundImageAlt: 'Alquiler de sistema de sonido profesional',
        lightImageAlt: 'Alquiler de iluminación espectacular para eventos',
        visualImageAlt: 'Alquiler de proyectores y equipos visuales HD'
    },
    faqSection: {
        moreQuestions: '¿Tenés más preguntas?',
        seeAllFaqs: 'Ver todas las preguntas frecuentes'
    },
    posts: {
        latestTitle: 'Últimos Artículos',
        latestViewAll: 'Ver todos los artículos',
        newsTitle: 'Últimas Noticias',
        newsViewAll: 'Ver todas las noticias'
    }
} satisfies Copy;
