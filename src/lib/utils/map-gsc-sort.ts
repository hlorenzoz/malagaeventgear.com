/**
 * Client-side reorder for `silo.kids` on /map: surfaces posts that were updated but not yet
 * manually resubmitted to Google Search Console (GSC has no API here — see AGENTS.md/docs on
 * IndexNow — so "submitted" can only ever be a manual signal the user records themselves by
 * clicking a post's copy-URL button).
 *
 * Pulled out of +page.svelte as plain functions so they're unit-testable without mounting
 * Svelte. Runs client-only: `gscMarked` comes from localStorage, which doesn't exist at
 * prerender time, so this never runs during the build's own `byUpdatedAsc` sort in
 * site-map.ts — it's a second, richer pass applied after mount.
 */
import { byUpdatedAsc, dateOnly, type SiloChild } from '$lib/data/site-map';

export type GscTier = 0 | 1 | 2;
export const GSC_ELIGIBLE_WINDOW_DAYS = 7;

/**
 * 0 = updated recently (within windowDays, default 7 days) and not (yet) marked handled since that update -> needs GSC attention.
 * 1 = never updated OR updated outside recency window -> no signal / normal.
 * 2 = updated recently and already marked handled since that update.
 */
export function gscTier(
	kid: SiloChild,
	gscMarked: Record<string, string>,
	now: Date = new Date(),
	windowDays: number = GSC_ELIGIBLE_WINDOW_DAYS
): GscTier {
	if (!kid.updated) return 1;

	const updatedAt = dateOnly(kid.updated);
	const ageMs = now.getTime() - new Date(`${updatedAt}T00:00:00Z`).getTime();
	const withinWindow = ageMs <= windowDays * 24 * 60 * 60 * 1000;
	if (!withinWindow) return 1;

	const markedAt = gscMarked[kid.url];
	if (!markedAt || dateOnly(markedAt) < updatedAt) return 0;
	return 2;
}

/** Sorts by GSC tier first, falling back to the same date order used at build time. */
export function byGscTier(
	gscMarked: Record<string, string>,
	now: Date = new Date(),
	windowDays: number = GSC_ELIGIBLE_WINDOW_DAYS
) {
	return (a: SiloChild, b: SiloChild): number => {
		const diff = gscTier(a, gscMarked, now, windowDays) - gscTier(b, gscMarked, now, windowDays);
		if (diff !== 0) return diff;
		return byUpdatedAsc(a, b);
	};
}
