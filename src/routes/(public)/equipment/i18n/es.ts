import type { Copy } from './en';

// Copia en español de /equipment/. `hero`, `featured` (excepto `imageAlt`), `catalog`, `audio`,
// `lighting`, `visuals.desc` y `effects` (excepto `imageAlt`) son el texto en/es que ya existía
// en +page.svelte como ternarios `i18n.lang === 'en' ? ... : ...`: se traslada tal cual, sin
// reescribirlo, tal como indica CLAUDE.md ("revisión a español de España en la Fase 3"). Los
// `imageAlt` y `seo`/`schema` son texto nuevo y ya están en español peninsular.
export const updated = '2026-09-24';

export default {
    seo: {
        title: 'Catálogo Premium de Alquiler de Equipos Audiovisuales | MEG',
        description:
            'Explora nuestro inventario de sistemas de sonido profesionales, iluminación dinámica, proyectores de alta definición y efectos especiales. Equipamiento premium en Málaga.'
    },
    schema: {
        listName: 'Catálogo de Alquiler de Equipos Audiovisuales - Malaga Event Gear'
    },
    hero: {
        badge: 'Tecnología de Punta',
        titlePart1: 'Elevá tu Evento con',
        titlePart2: 'Equipos Premium',
        subtitle:
            'Explorá nuestro catálogo de sonido de alta fidelidad, iluminación espectacular y efectos especiales. Tenemos las herramientas perfectas para hacer tu celebración inolvidable.'
    },
    featured: {
        imageAlt: 'Montaje del Pack Audiovisual MICE para reuniones',
        badge: 'Pack Destacado',
        desc: 'Ideal para conferencias y eventos corporativos. El MICE Pack incluye una pantalla LED de 60 pulgadas, equipamiento audiovisual premium, micrófonos de mesa e inalámbricos, y hasta 6 horas de asistencia técnica en sitio para asegurar una presentación impecable.',
        spec1: 'Pantalla LED de 60"',
        spec2: 'Audio Inalámbrico',
        spec3: 'Soporte Técnico Incluido',
        spec4: 'Sonido Premium',
        cta: 'Solicitar Info'
    },
    catalog: {
        title: 'Categorías Técnicas',
        subtitle: 'Explorá nuestro inventario para cubrir las necesidades técnicas de tu producción.'
    },
    audio: {
        imageAlt: 'Equipo profesional de alquiler de sonido',
        desc: 'Sistemas line array, altavoces activos, consolas de mezcla digital y micrófonos inalámbricos Audix para máxima fidelidad acústica.'
    },
    lighting: {
        imageAlt: 'Equipo de alquiler de iluminación espectacular para eventos',
        desc: 'Focos LED RGBW, iluminación escénica especial y un kit de uplighting inalámbrico para crear ambientes románticos o energéticos.'
    },
    visuals: {
        imageAlt: 'Proyectores HD y equipo de alquiler de pantallas',
        desc: 'Proyectores de hasta 5.000 lúmenes, pantallas de proyección y un panel de 60 pulgadas para ofrecer a tu público una experiencia visual nítida.'
    },
    effects: {
        imageAlt: 'Máquina de humo profesional para eventos',
        title: 'Efectos Especiales',
        desc: 'Una máquina de humo profesional Martin Magnum 650 que da ambiente y hace visibles los haces de luz en la pista de baile.'
    }
} satisfies Copy;
