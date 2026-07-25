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

/**
 * 0 = updated and not (yet) marked handled since that update -> needs GSC attention.
 * 1 = never updated -> no signal either way.
 * 2 = updated and already marked handled since that update.
 */
export function gscTier(kid: SiloChild, gscMarked: Record<string, string>): GscTier {
	if (!kid.updated) return 1;
	const markedAt = gscMarked[kid.url];
	if (!markedAt || dateOnly(markedAt) < dateOnly(kid.updated)) return 0;
	return 2;
}

/** Sorts by GSC tier first, falling back to the same date order used at build time. */
export function byGscTier(gscMarked: Record<string, string>) {
	return (a: SiloChild, b: SiloChild): number => {
		const diff = gscTier(a, gscMarked) - gscTier(b, gscMarked);
		if (diff !== 0) return diff;
		return byUpdatedAsc(a, b);
	};
}
