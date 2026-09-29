/**
 * score.ts: pure opportunity scoring (plan, `score.ts` row). `opportunity` is NEVER set by an
 * importer or the agent: it is always recomputed here from `metrics`, so the field can never
 * drift out of sync with the numbers that justify it.
 *
 * Two independent signals, checked in this priority order:
 *   1. GSC: a query already showing impressions, ranking positions 8-30 ("banda accionable" per
 *      keyword-silo-map.md), is a real, observed near-miss: worth closing content or on-page
 *      gaps. Position 1-7 has little left to gain from this signal, position 31+ is too deep to
 *      call "actionable" from GSC alone (matches keyword-silo-map.md's own read of the export).
 *   2. Ubersuggest volume + difficulty: used only when there is no GSC signal (a keyword with no
 *      real search console history yet, e.g. a fresh Ubersuggest suggestion).
 * Thresholds live ONLY here, never hardcoded again in an importer or the agent prompt.
 */

import type { Metrics, Opportunity } from './schema';

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

function scoreFromGsc(gsc: NonNullable<Metrics['gsc']>): ScoreResult | null {
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

function scoreFromVolume(
	volume: NonNullable<Metrics['volume']>,
	difficulty: Metrics['difficulty']
): ScoreResult | null {
	const sd = difficulty?.value ?? null;
	if (volume.value >= VOLUME_HIGH && sd !== null && sd <= DIFFICULTY_LOW) {
		return {
			opportunity: 'high',
			opportunityReason: `volume ${volume.value} with low difficulty ${sd}`
		};
	}
	if (volume.value >= VOLUME_MEDIUM && (sd === null || sd <= DIFFICULTY_MEDIUM)) {
		return {
			opportunity: 'medium',
			opportunityReason: `volume ${volume.value}${sd !== null ? ` with difficulty ${sd}` : ''}`
		};
	}
	return {
		opportunity: 'low',
		opportunityReason: `volume ${volume.value}${sd !== null ? ` with difficulty ${sd}` : ' (no difficulty data)'}`
	};
}

/** Pure: given only `metrics`, returns the opportunity level and a short human-readable reason,
 *  or both `null` when there is nothing to score yet. */
export function scoreOpportunity(metrics: Metrics): ScoreResult {
	if (metrics.gsc) {
		const gscScore = scoreFromGsc(metrics.gsc);
		if (gscScore) return gscScore;
	}
	if (metrics.volume) {
		return scoreFromVolume(metrics.volume, metrics.difficulty);
	}
	return { opportunity: null, opportunityReason: null };
}
