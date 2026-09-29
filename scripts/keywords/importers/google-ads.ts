/**
 * importers/google-ads.ts: keyword entries from `.agents/context/keywords/google-ads/`: 12
 * theme CSVs (a plain "Keyword"/"Keywords" header, one phrase per line) plus the bucketed
 * "Keyword Stats 2025-09-01 ... Keywords.csv" volume export (plan, importers table row
 * "google-ads"). The headerless "... Ubersuggest.csv" file that lives in the same folder is a
 * DIFFERENT source (`importers/ubersuggest-csv.ts`), even though it shares a directory.
 *
 * These ~908 phrases were already audited and closed (engram: "Google Ads keyword audit closed
 * 2026-08-06", 0 new posts needed, every phrase was already covered by existing content). A
 * relevant phrase therefore enters as `covered` with `url: null` and a note citing that audit,
 * never as a fresh `idea` that would make it look like undiscovered work. `merge.ts`'s identity
 * lock (see merge.test.ts) protects any entry that happens to share an id with an already
 * `published` keyword, so this importer does not need to special-case that overlap itself.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId } from '../normalize';
import { checkRelevance } from '../relevance';
import type { KeywordEntry } from '../schema';

const GOOGLE_ADS_DIR = join(process.cwd(), '.agents', 'context', 'keywords', 'google-ads');
const VOLUME_ASOF = '2025-09-01'; // date in the "Keyword Stats 2025-09-01 ..." filename
const AUDIT_NOTE =
	'Covered per the Google Ads / Ubersuggest keyword audit closed 2026-08-06 (engram: google_ads_keyword_audit_2026-08-06): already served by existing content, no new post needed.';

export interface GoogleAdsPhraseList {
	topic: string;
	phrases: string[];
}

function baseEntry(
	keyword: string,
	topic: string | null,
	serviceAreas: readonly string[],
	today: string
): KeywordEntry {
	const relevance = checkRelevance(keyword, serviceAreas);
	return {
		id: normalizeId(keyword),
		keyword,
		locale: 'en',
		cluster: 'unassigned',
		topic,
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
		sources: [{ name: 'google-ads', seen: today }],
		firstSeen: today,
		lastResearched: null,
		notes: relevance.relevant ? AUDIT_NOTE : ''
	};
}

/** Pure: no file I/O. One entry per phrase across every theme list. */
export function googleAdsPhrasesToKeywords(
	lists: GoogleAdsPhraseList[],
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	const entries: KeywordEntry[] = [];
	for (const list of lists) {
		for (const phrase of list.phrases) {
			entries.push(baseEntry(phrase, list.topic, serviceAreas, today));
		}
	}
	return entries;
}

export interface GoogleAdsVolumeRow {
	keyword: string;
	volume: number;
}

/** Pure: no file I/O. Same covered/rejected logic, plus the bucketed volume metric. */
export function googleAdsVolumeRowsToKeywords(
	rows: GoogleAdsVolumeRow[],
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	return rows.map((row) => {
		const entry = baseEntry(row.keyword, null, serviceAreas, today);
		if (entry.status === 'rejected') return entry;
		return {
			...entry,
			metrics: {
				...entry.metrics,
				volume: { value: row.volume, source: 'google-ads', asOf: VOLUME_ASOF }
			}
		};
	});
}

/** Derives the theme name from a "Google Ads Keyword Research - MEG - <Theme>.csv" filename. */
function themeFromFilename(file: string): string {
	const match = file.match(/Google Ads Keyword Research - MEG - (.+)\.csv$/);
	return match ? match[1] : file;
}

function readPhraseFile(path: string): string[] {
	const lines = readFileSync(path, 'utf8').split(/\r?\n/);
	// First line is the header ("Keyword" or "Keywords"), every non-empty line after it is a phrase.
	return lines
		.slice(1)
		.map((l) => l.trim())
		.filter((l) => l.length > 0);
}

/** Real file read (node:fs). Skips the two "Keyword Stats" files (handled separately below) and
 *  the headerless Ubersuggest CSV (a different source, see importers/ubersuggest-csv.ts). */
export function importGoogleAdsKeywords(
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	const files = readdirSync(GOOGLE_ADS_DIR).filter(
		(f) => f.startsWith('Google Ads Keyword Research') && f.endsWith('.csv')
	);
	const lists: GoogleAdsPhraseList[] = files.map((file) => ({
		topic: themeFromFilename(file),
		phrases: readPhraseFile(join(GOOGLE_ADS_DIR, file))
	}));

	const volumeFile = readdirSync(GOOGLE_ADS_DIR).find(
		(f) => f.includes('Keyword Stats') && f.endsWith('Keywords.csv')
	);
	const volumeRows: GoogleAdsVolumeRow[] = volumeFile
		? readFileSync(join(GOOGLE_ADS_DIR, volumeFile), 'utf8')
				.split(/\r?\n/)
				.slice(1)
				.map((l) => l.split(','))
				.filter((cols) => cols.length >= 2 && cols[0].trim().length > 0)
				.map((cols) => ({ keyword: cols[0].trim(), volume: Number(cols[1]) }))
		: [];

	return [
		...googleAdsPhrasesToKeywords(lists, serviceAreas, today),
		...googleAdsVolumeRowsToKeywords(volumeRows, serviceAreas, today)
	];
}
