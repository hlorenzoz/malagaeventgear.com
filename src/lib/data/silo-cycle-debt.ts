/**
 * silo-cycle-debt.ts: deuda conocida de enlaces entre hermanos del reverse silo.
 *
 * La regla (CLAUDE.md, "Reverse Silo del Blog"): los posts de soporte de un silo se enlazan en
 * CADENA, cada uno con su hermano anterior y el siguiente, nunca todos con todos. Hermanos son
 * los posts de soporte con el mismo `targetPage`. `validateSiloGraph` (site-map.ts) mide por
 * cada post `[recíprocos, salientes]`: con cuántos hermanos se enlaza en los dos sentidos y a
 * cuántos enlaza en total. El máximo de una cadena es 2 en los dos números. No cuentan el
 * enlace al pilar, los posts News ni los posts de otro silo.
 *
 * Los silos audio visual rental y wedding rentals llevan años enlazados en malla como
 * "artículos relacionados". Limpiarlos es reescribir enlaces en decenas de posts y en sus 12
 * traducciones: es trabajo de contenido, no de este guard. Este archivo anota, por cada post
 * que hoy supera el límite, su número actual. El guard exige que coincida EXACTO:
 *
 * - Si un post de la lista suma otro hermano, falla. Un post nuevo se encadena a un hermano que
 *   tenga lugar (menos de 2), no a uno de esta lista.
 * - Si un post de la lista mejora, falla hasta bajar su entrada (o quitarla si ya no supera el
 *   límite). Así la lista solo se achica y nunca queda con holgura.
 * - Un post que no está acá cumple el límite de una cadena, sin excepción.
 * - Una entrada que ya no hace falta (el guard pasa sin ella) también falla: se quita.
 * - NUNCA se agrega un post nuevo a esta lista para poner el test en verde. Un post de la lista
 *   queda fuera del chequeo de forma de la cadena.
 *
 * Historia: hasta el 2026-10-10 este archivo guardaba la FIRMA de la componente fuertemente
 * conexa de la malla (71 posts al final). Todo hermano nuevo enlazado con un post de la malla
 * le cambiaba la firma y obligaba a regenerarla a mano (2026-09-25, 2026-10-07, 2026-10-08 y
 * 2026-10-09). La tarea #T0118 la cambió por esta lista por post. El historial de la firma está
 * en git.
 *
 * Generado el 2026-10-10 desde los posts ingleses reales: 41 posts (18 de 42 en audio visual
 * rental y 15 de 20 en wedding rentals superan los 2 hermanos recíprocos, y 7 más solo los
 * enlaces salientes, más smoke-machine-rental, anotado abajo).
 */
export type SiloLinkDebt = Readonly<Record<string, readonly [reciprocal: number, out: number]>>;

export const KNOWN_SILO_LINK_DEBT: SiloLinkDebt = {
	'all-in-one-wedding-rental-packages': [2, 4],
	'audio-visual-hire-near-me-in-malaga-spain': [1, 3],
	'audio-visual-rental-for-conferences': [4, 4],
	'audio-visual-rental-for-corporate-events': [3, 6],
	'audio-visual-rental-for-corporate-meetings': [6, 8],
	'audio-visual-rental-for-gala-dinners': [4, 4],
	'audio-visual-rental-for-music-performances': [3, 3],
	'audio-visual-rental-for-outdoor-events': [4, 4],
	'audio-visual-rental-for-press-conferences': [3, 3],
	'audio-visual-rental-for-product-launches': [4, 5],
	'audio-visual-rental-for-remote-presentations': [3, 3],
	'audio-visual-rental-for-seminars': [2, 3],
	'audio-visual-rental-for-small-businesses': [3, 3],
	'audio-visual-rental-for-trade-shows': [1, 4],
	'audio-visual-rental-for-training-sessions': [3, 3],
	'audio-visual-rental-for-virtual-events': [3, 3],
	'av-equipment-consultations': [1, 3],
	'av-system-troubleshooting': [2, 4],
	'av-technician-hire': [4, 6],
	'essential-items-for-wedding-rentals': [6, 9],
	'how-audio-visual-rental-works': [4, 5],
	'how-to-choose-wedding-rentals': [7, 7],
	'how-to-compare-wedding-rental-quotes': [3, 3],
	'indoor-wedding-rental-essentials': [5, 6],
	'latest-trends-in-wedding-rentals': [4, 4],
	'lighting-ideas-for-wedding-rentals': [5, 6],
	'making-the-most-of-wedding-rentals': [4, 5],
	'managing-last-minute-wedding-rental-changes': [7, 7],
	'outdoor-wedding-rental-considerations': [9, 10],
	'projector-rental': [4, 4],
	'protecting-your-wedding-rental-items': [3, 4],
	'questions-to-ask-wedding-rental-companies': [3, 3],
	// Dentro del límite, pero su segundo enlace (a stage-uplighting) va en un solo sentido y cierra
	// la cadena de 3 del silo stage lighting. Es un enlace de contexto, no un vecino de la cadena.
	'smoke-machine-rental': [1, 2],
	'sound-system-rental': [3, 3],
	'technical-support-for-events': [3, 5],
	'timeline-for-booking-wedding-rentals': [5, 6],
	'tips-for-reducing-wedding-rental-costs': [4, 5],
	'tv-screen-rental': [3, 3],
	'unique-wedding-ceremony-rentals': [4, 5],
	'weather-considerations-for-outdoor-rentals': [3, 3],
	'wedding-rentals-near-me': [1, 3]
};
