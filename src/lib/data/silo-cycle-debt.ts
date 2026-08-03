/**
 * silo-cycle-debt.ts — baseline de deuda preexistente de interlinking lateral entre siblings.
 *
 * `validateSiloGraph` (site-map.ts) detecta componentes fuertemente conexas (Tarjan) de 3+
 * nodos en el grafo de links `/blog/<slug>/` dentro del cuerpo de cada post: eso significa
 * que ese grupo de siblings se linkea en malla, no en cadena (AGENTS.md "cadena, no
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
		'audio-visual-rental-for-charity-fundraisers',
		'audio-visual-rental-for-conferences',
		'audio-visual-rental-for-corporate-events',
		'audio-visual-rental-for-corporate-meetings',
		'audio-visual-rental-for-gala-dinners',
		'audio-visual-rental-for-music-performances',
		'audio-visual-rental-for-outdoor-events',
		'audio-visual-rental-for-press-conferences',
		'audio-visual-rental-for-product-launches',
		'audio-visual-rental-for-religious-events',
		'audio-visual-rental-for-remote-presentations',
		'audio-visual-rental-for-seminars',
		'audio-visual-rental-for-small-businesses',
		'audio-visual-rental-for-sports-events',
		'audio-visual-rental-for-training-sessions',
		'audio-visual-rental-for-virtual-events',
		'audio-visual-rental-for-weddings',
		'audiovisual-equipment-rental-service',
		'av-cable-management',
		'av-equipment-consultations',
		'av-system-troubleshooting',
		'av-technician-hire',
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
		'outdoor-wedding-rental-considerations',
		'projector-rental',
		'pros-and-cons-of-wedding-rentals',
		'protecting-your-wedding-rental-items',
		'questions-to-ask-wedding-rental-companies',
		'sound-system-rental',
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
