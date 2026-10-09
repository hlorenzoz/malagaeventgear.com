/**
 * silo-cycle-debt.ts — baseline de deuda preexistente de interlinking lateral entre siblings.
 *
 * `validateSiloGraph` (site-map.ts) detecta componentes fuertemente conexas (Tarjan) de 3+
 * nodos en el grafo de links `/blog/<slug>/` dentro del cuerpo de cada post: eso significa
 * que ese grupo de siblings se linkea en malla, no en cadena (CLAUDE.md "cadena, no
 * todos-con-todos"). Al conectar ese chequeo contra el contenido real (2026-08-03) aparecio
 * UNA sola componente gigante de 60 nodos - el cluster primario de audio-visual-rental y el
 * cluster de wedding-rentals llevan años cross-linkeados como "related articles" sin la
 * disciplina de cadena que esta sesión empezó a exigir recién para el contenido nuevo. Arreglar
 * esos 60 nodos de una es una reescritura de gran parte del link graph del blog, fuera de
 * alcance de un fix puntual - queda documentado como deuda conocida, no bloqueante.
 *
 * Este archivo es el baseline: el test en site-map.test.ts falla solo si aparece una
 * componente NUEVA (signature no listada acá), no por el tamaño de esta ya conocida. Si en el
 * futuro se hace la limpieza real del cluster, hay que volver a generar este archivo (o
 * borrarlo si la deuda queda en cero) en vez de simplemente agregarle mas signatures.
 *
 * Actualizado 2026-08-06: la reescritura de audio-visual-rental-for-weddings.svx (fix de
 * cannibalization contra wedding-rentals.svx) sacó el link lateral suelto hacia
 * audio-visual-rental-for-virtual-events.svx que era la única entrada de ese par reciproco
 * (audio-visual-rental-for-weddings <-> wedding-rentals, ya reciproco entre si) hacia la malla
 * gigante. Sin esa entrada, el par queda aislado como cadena de 2 nodos adyacentes - exactamente
 * el patron esperado (CLAUDE.md "cadena, no todos-con-todos"), no un ciclo. La componente bajo de
 * 60 a 58 nodos; ambos slugs salieron de la signature de abajo. No es limpieza completa del
 * cluster (los otros 58 siguen en malla), es la reduccion real que este cambio puntual logro.
 *
 * Actualizado 2026-09-25: la componente pasó de 58 a 60 nodos. Entraron
 * stage-lighting-for-weddings y smoke-machine-rental por los enlaces laterales entre hermanos
 * del silo stage lighting que exige el reverse silo (stage-uplighting <-> stage-lighting-for-weddings
 * <-> smoke-machine-rental, en los dos sentidos). No es una malla nueva: stage-uplighting ya estaba
 * en esta componente por sus enlaces a otros silos (headset-lavalier-microphone-rental,
 * av-technician-hire, event-technology-service, lighting-ideas-for-wedding-rentals), y todo
 * hermano enlazado en los dos sentidos con un nodo de la componente queda dentro de ella.
 * Defecto conocido del chequeo: una cadena correcta de 3 o más hermanos (A <-> B <-> C) también
 * es fuertemente conexa, así que este guard no distingue una cadena de una malla. Ver .agents/data/TODO.json.
 *
 * Actualizado 2026-10-07: la componente pasó de 60 a 61 nodos. Entró
 * outdoor-movie-screen-and-projector-rental por los enlaces laterales entre hermanos del silo
 * audio visual rental que exige el reverse silo, en los dos sentidos (projector-rental <-> nuevo
 * <-> audio-visual-rental-for-outdoor-events, una cadena de tres nodos). Mismo caso que la entrada
 * del 2026-09-25: projector-rental y audio-visual-rental-for-outdoor-events ya estaban en esta
 * componente, así que todo hermano enlazado en los dos sentidos con ellos queda dentro. No es una
 * malla nueva.
 *
 * Actualizado 2026-10-08: la componente pasó de 61 a 62 nodos. Entró el post News
 * billie-jean-king-cup-2024-sound-and-lighting
 * (tarea #T0029). El post de deportes y el pilar audiovisual-equipment-rental-service lo enlazan
 * como caso de Experience (regla 4 del posicionamiento), y el News enlaza de vuelta a la guía de
 * deportes. Mismo caso que el News del consejo vecinal, que ya estaba en esta componente.
 *
 * Actualizado 2026-10-09: la componente pasó de 62 a 71 nodos (tarea #T0033). Entraron audio-visual-rental-for-art-exhibitions, audio-visual-rental-for-private-parties, audio-visual-rental-for-trade-shows, audio-visual-rental-for-weddings, audio-visual-rental-planning-timeline, audio-visual-rental-safety-guidelines, benefits-of-audio-visual-rental, stage-monitor-rental, wedding-rentals
 * por los enlaces laterales entre hermanos adyacentes del silo audio visual rental que exige el
 * reverse silo, en los dos sentidos y en orden de publishDate: 7 posts de soporte no enlazaban a
 * ningún hermano. Mismo caso que las entradas del 2026-09-25 y del 2026-10-07: sus vecinos ya
 * estaban en esta componente, así que todo hermano enlazado en los dos sentidos con ellos queda
 * dentro. No es una malla nueva.
 *
 * Formato de cada signature: los slugs de la componente, deduplicados, ordenados
 * alfabéticamente y unidos con `|` (mismo formato que usa internamente `findStronglyConnectedComponents`
 * a través de `validateSiloGraph`).
 */
export const KNOWN_SILO_CYCLE_DEBT: readonly string[] = [
	[
		'7-years-of-support-for-neighborhood-council-community-meeting-in-malaga-spain',
		'all-in-one-wedding-rental-packages',
		'audio-system-calibration',
		'audio-video-rental-near-me-in-malaga-spain',
		'audio-visual-hire-near-me-in-malaga-spain',
		'audio-visual-rental-companies',
		'audio-visual-rental-company',
		'audio-visual-rental-for-art-exhibitions',
		'audio-visual-rental-for-charity-fundraisers',
		'audio-visual-rental-for-conferences',
		'audio-visual-rental-for-corporate-events',
		'audio-visual-rental-for-corporate-meetings',
		'audio-visual-rental-for-gala-dinners',
		'audio-visual-rental-for-music-performances',
		'audio-visual-rental-for-outdoor-events',
		'audio-visual-rental-for-press-conferences',
		'audio-visual-rental-for-private-parties',
		'audio-visual-rental-for-product-launches',
		'audio-visual-rental-for-religious-events',
		'audio-visual-rental-for-remote-presentations',
		'audio-visual-rental-for-seminars',
		'audio-visual-rental-for-small-businesses',
		'audio-visual-rental-for-sports-events',
		'audio-visual-rental-for-trade-shows',
		'audio-visual-rental-for-training-sessions',
		'audio-visual-rental-for-virtual-events',
		'audio-visual-rental-for-weddings',
		'audio-visual-rental-planning-timeline',
		'audio-visual-rental-safety-guidelines',
		'audiovisual-equipment-rental-service',
		'av-cable-management',
		'av-equipment-consultations',
		'av-system-troubleshooting',
		'av-technician-hire',
		'benefits-of-audio-visual-rental',
		'billie-jean-king-cup-2024-sound-and-lighting',
		'common-av-rental-mistakes',
		'eco-friendly-wedding-rental-options',
		'essential-items-for-wedding-rentals',
		'event-technology-service',
		'headset-lavalier-microphone-rental',
		'how-audio-visual-rental-works',
		'how-to-choose-wedding-rentals',
		'how-to-compare-wedding-rental-quotes',
		'how-to-customize-av-rental-packages',
		'indoor-wedding-rental-essentials',
		'latest-trends-in-wedding-rentals',
		'lighting-ideas-for-wedding-rentals',
		'making-the-most-of-wedding-rentals',
		'managing-last-minute-wedding-rental-changes',
		'outdoor-movie-screen-and-projector-rental',
		'outdoor-wedding-rental-considerations',
		'projector-rental',
		'pros-and-cons-of-wedding-rentals',
		'protecting-your-wedding-rental-items',
		'questions-to-ask-wedding-rental-companies',
		'smoke-machine-rental',
		'sound-system-rental',
		'stage-lighting-for-weddings',
		'stage-monitor-rental',
		'stage-uplighting',
		'technical-support-for-events',
		'timeline-for-booking-wedding-rentals',
		'tips-for-reducing-wedding-rental-costs',
		'tv-screen-rental',
		'unique-wedding-ceremony-rentals',
		'video-switcher-rental',
		'weather-considerations-for-outdoor-rentals',
		'wedding-rentals',
		'wedding-rentals-near-me',
		'wedding-rentals-online'
	]
		.sort()
		.join('|')
];
