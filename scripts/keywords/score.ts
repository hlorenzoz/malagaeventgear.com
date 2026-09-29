/**
 * score.ts: derives `opportunity`/`opportunityReason`, the only two fields on a keyword entry
 * that are ever computed rather than sourced. Every metric value lives inside `sources` (user
 * decision, 2026-09-29: no top level `metrics`, no derived top level `summary` either), so this
 * reads volume/difficulty straight off the source that measured them, never from a cached copy.
 *
 * `opportunity` is NEVER set by an importer or the agent: it is always recomputed here from
 * `sources`, so the field can never drift out of sync with the numbers that justify it. Two
 * independent signals, checked in this priority order:
 *   1. GSC: a query already showing impressions, ranking positions 8-30 ("banda accionable" per
 *      keyword-silo-map.md), is a real, observed near-miss: worth closing content or on-page
 *      gaps. Position 1-7 has little left to gain from this signal, position 31+ is too deep to
 *      call "actionable" from GSC alone (matches keyword-silo-map.md's own read of the export).
 *   2. Volume + difficulty: used only when there is no GSC signal (a keyword with no real search
 *      console history yet). Volume prefers `sources.ubersuggest.stats.volume`; when Ubersuggest
 *      has no reading, it falls back to `sources['google-ads'].stats.avgMonthlySearches`.
 *      Difficulty can ONLY ever come from `sources.ubersuggest.stats.difficulty`: Google Ads'
 *      "Competition" column is PAID ad competition, not SEO difficulty (CLAUDE.md "Honestidad",
 *      no invented metric), and no other source's stats schema even has a `difficulty` field.
 * Thresholds live ONLY here, never hardcoded again in an importer or the agent prompt.
 */

import type { Opportunity, Sources } from './schema';

export interface ScoreResult {
	opportunity: Opportunity | null;
	opportunityReason: string | null;
}

const GSC_BAND_MIN = 8;
const GSC_BAND_MAX = 30;
const GSC_HIGH_IMPRESSIONS = 100;
const GSC_MEDIUM_IMPRESSIONS = 20;

const VOLUME_HIGH = 300;
const VOLUME_MEDIUM = 100;
const DIFFICULTY_LOW = 30;
const DIFFICULTY_MEDIUM = 50;

function scoreFromGsc(
	gsc: NonNullable<NonNullable<Sources['google-search-console']>['stats']>
): ScoreResult | null {
	if (gsc.position < GSC_BAND_MIN || gsc.position > GSC_BAND_MAX || gsc.impressions <= 0) {
		return null;
	}
	const level: Opportunity =
		gsc.impressions >= GSC_HIGH_IMPRESSIONS
			? 'high'
			: gsc.impressions >= GSC_MEDIUM_IMPRESSIONS
				? 'medium'
				: 'low';
	return {
		opportunity: level,
		opportunityReason: `gsc: position ${gsc.position} with ${gsc.impressions} impressions`
	};
}

function scoreFromVolume(volume: number, difficulty: number | null): ScoreResult {
	if (volume >= VOLUME_HIGH && difficulty !== null && difficulty <= DIFFICULTY_LOW) {
		return {
			opportunity: 'high',
			opportunityReason: `volume ${volume} with low difficulty ${difficulty}`
		};
	}
	if (volume >= VOLUME_MEDIUM && (difficulty === null || difficulty <= DIFFICULTY_MEDIUM)) {
		return {
			opportunity: 'medium',
			opportunityReason: `volume ${volume}${difficulty !== null ? ` with difficulty ${difficulty}` : ''}`
		};
	}
	return {
		opportunity: 'low',
		opportunityReason: `volume ${volume}${difficulty !== null ? ` with difficulty ${difficulty}` : ' (no difficulty data)'}`
	};
}

/** Pure: given only `sources`, returns the opportunity level and a short human-readable reason,
 *  or both `null` when there is nothing to score yet. */
export function scoreOpportunity(sources: Sources): ScoreResult {
	const gsc = sources['google-search-console']?.stats;
	if (gsc) {
		const gscScore = scoreFromGsc(gsc);
		if (gscScore) return gscScore;
	}

	const ubersuggest = sources.ubersuggest?.stats;
	const googleAds = sources['google-ads']?.stats;
	const volume = ubersuggest?.volume ?? googleAds?.avgMonthlySearches ?? null;
	if (volume != null) {
		return scoreFromVolume(volume, ubersuggest?.difficulty ?? null);
	}

	return { opportunity: null, opportunityReason: null };
}
