/**
 * importers/ubersuggest-csv.ts: keyword entries from the headerless legacy Ubersuggest export
 * (`.agents/context/keywords/google-ads/malagaeventgear.com - Keyword Stats ... - Ubersuggest.csv`,
 * 29 rows, one phrase per line, no header, plan importers table row "ubersuggest-csv"). It lives
 * in the `google-ads/` folder because it was exported alongside the Keyword Stats data, but it is
 * a distinct source from `importers/google-ads.ts`.
 *
 * Same "already audited, closed 2026-08-06" treatment: a relevant phrase enters as `covered`
 * with `url: null`, never a fresh `idea`.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId } from '../normalize';
import { checkRelevance } from '../relevance';
import type { KeywordEntry } from '../schema';

const GOOGLE_ADS_DIR = join(process.cwd(), '.agents', 'context', 'keywords', 'google-ads');
const AUDIT_NOTE =
	'Covered per the Google Ads / Ubersuggest keyword audit closed 2026-08-06 (engram: google_ads_keyword_audit_2026-08-06): already served by existing content, no new post needed.';

/** No header row at all: every non-empty line is a phrase. */
export function parseHeaderlessPhrases(csv: string): string[] {
	return csv
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter((l) => l.length > 0);
}

/** Pure: no file I/O. */
export function ubersuggestCsvPhrasesToKeywords(
	phrases: string[],
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	return phrases.map((keyword) => {
		const relevance = checkRelevance(keyword, serviceAreas);
		return {
			id: normalizeId(keyword),
			keyword,
			locale: 'en',
			cluster: 'unassigned',
			topic: null,
			intent: null,
			url: null,
			status: relevance.relevant ? 'covered' : 'rejected',
			reason: relevance.relevant ? null : `out-of-market or no-fit query (${relevance.reason})`,
			metrics: {
				volume: null,
				difficulty: null,
				cpc: null,
				gsc: null,
				ubersuggest: null
			},
			research: null,
			opportunity: null,
			opportunityReason: null,
			sources: [{ name: 'ubersuggest-csv', seen: today }],
			firstSeen: today,
			lastResearched: null,
			notes: relevance.relevant ? AUDIT_NOTE : ''
		};
	});
}

/** Real file read (node:fs). Finds the one headerless "...Ubersuggest.csv" file in the same
 *  folder as the Google Ads exports. Returns [] if it is ever moved/renamed rather than throwing,
 *  since this source is a closed one-time audit, not something the daily agent depends on. */
export function importUbersuggestCsvKeywords(
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	const file = readdirSync(GOOGLE_ADS_DIR).find((f) => f.endsWith('Ubersuggest.csv'));
	if (!file) return [];
	const phrases = parseHeaderlessPhrases(readFileSync(join(GOOGLE_ADS_DIR, file), 'utf8'));
	return ubersuggestCsvPhrasesToKeywords(phrases, serviceAreas, today);
}
