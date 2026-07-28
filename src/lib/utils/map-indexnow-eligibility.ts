/**
 * Eligibility rule for the IndexNow submit button on /map: only surface RECENTLY updated
 * nodes that have not yet been (re)submitted. Showing every node that ever had an `updated`
 * date and lacks a submission turns the list into noise (the entire historical backlog),
 * not an actionable "what changed and needs pushing" view.
 *
 * Pulled out of +page.svelte as a plain, injectable-clock function so it's unit-testable
 * without mounting Svelte or depending on the real wall clock.
 */
import { dateOnly } from '$lib/data/site-map';

export const INDEXNOW_ELIGIBLE_WINDOW_DAYS = 7;

export function needsIndexNow(
	now: Date,
	updated: string | undefined,
	lastSubmittedAt: string | undefined,
	windowDays: number = INDEXNOW_ELIGIBLE_WINDOW_DAYS
): boolean {
	if (!updated) return false;

	const updatedAt = dateOnly(updated);
	const ageMs = now.getTime() - new Date(`${updatedAt}T00:00:00Z`).getTime();
	const withinWindow = ageMs <= windowDays * 24 * 60 * 60 * 1000;
	if (!withinWindow) return false;

	return !lastSubmittedAt || dateOnly(lastSubmittedAt) < updatedAt;
}
