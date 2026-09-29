/**
 * importers/google-ads.ts: keyword entries from `.agents/context/keywords/google-ads/`, three
 * distinct sources sharing one folder:
 *
 * 1. 12 theme CSVs (a plain "Keyword"/"Keywords" header, one phrase per line) plus the legacy
 *    2025-09-01 bucketed volume export ("... Keywords.csv"). These ~908 phrases were already
 *    audited and closed (engram: "Google Ads keyword audit closed 2026-08-06", 0 new posts
 *    needed, every phrase was already covered by existing content). A relevant phrase therefore
 *    enters as `covered` with `url: null` and a note citing that audit, never as a fresh `idea`.
 *    `merge.ts`'s identity lock protects any entry that happens to share an id with an already
 *    `published` keyword, so this importer does not need to special-case that overlap itself.
 * 2. The full "Keyword Stats <date> at <time>.csv" export (UTF-16LE, tab separated, one row per
 *    keyword with the whole Google Ads Keyword Planner column set), the most recent one being
 *    2026-09-29's. UNLIKE (1), this is treated as a fresh, unaudited source: it goes through
 *    `relevance.ts`/`seed-mappings.ts` exactly like the GSC importer, so a new keyword from this
 *    file enters as `idea` (or `covered`/`rejected` when a seed mapping applies), never
 *    auto-`covered`. `merge.ts`'s identity lock still protects any id that overlaps an already
 *    audited/covered or published entry.
 * 3. The headerless "... Ubersuggest.csv" file in the same folder is a DIFFERENT source
 *    (`importers/ubersuggest-csv.ts`), even though it shares a directory.
 *
 * `avgMonthlySearches`/full stats always land under `sources['google-ads']`, never under
 * `sources.ubersuggest`: Google Ads' "Competition" column is PAID ad competition, not SEO
 * difficulty (`score.ts` only ever reads `difficulty` from `sources.ubersuggest.stats`).
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId } from '../normalize';
import { checkRelevance } from '../relevance';
import { matchSeedMapping } from '../seed-mappings';
import type { GoogleAdsStats, KeywordEntry } from '../schema';

const GOOGLE_ADS_DIR = join(process.cwd(), '.agents', 'context', 'keywords', 'google-ads');
const VOLUME_ASOF = '2025-09-01'; // date in the legacy "Keyword Stats 2025-09-01 ..." filename
const AUDIT_NOTE =
	'Covered per the Google Ads / Ubersuggest keyword audit closed 2026-08-06 (engram: google_ads_keyword_audit_2026-08-06): already served by existing content, no new post needed.';

// --- 1. theme phrase lists + legacy 2025-09-01 volume export (already audited, covered) --------

export interface GoogleAdsPhraseList {
	topic: string;
	phrases: string[];
}

function auditedBaseEntry(
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
		sources: { 'google-ads': { firstSeen: today, lastSeen: today, stats: null } },
		opportunity: null,
		opportunityReason: null,
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
			entries.push(auditedBaseEntry(phrase, list.topic, serviceAreas, today));
		}
	}
	return entries;
}

export interface GoogleAdsVolumeRow {
	keyword: string;
	volume: number;
}

/** Pure: no file I/O. Same covered/rejected logic, plus the bucketed volume stat, dated by the
 *  export's own filename date (2025-09-01), not the sync run date, so a rebuild is stable. */
export function googleAdsVolumeRowsToKeywords(
	rows: GoogleAdsVolumeRow[],
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	return rows.map((row) => {
		const entry = auditedBaseEntry(row.keyword, null, serviceAreas, today);
		if (entry.status === 'rejected') return entry;
		const stats: GoogleAdsStats = {
			asOf: VOLUME_ASOF,
			period: null,
			currency: null,
			avgMonthlySearches: row.volume,
			threeMonthChange: null,
			yoyChange: null,
			competition: null,
			competitionIndex: null,
			topOfPageBidLow: null,
			topOfPageBidHigh: null,
			adImpressionShare: null,
			organicImpressionShare: null,
			organicAveragePosition: null,
			monthlySearches: {}
		};
		return {
			...entry,
			sources: {
				'google-ads': { firstSeen: VOLUME_ASOF, lastSeen: VOLUME_ASOF, stats }
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

// --- 2. the full "Keyword Stats <date> at <time>.csv" export (unaudited, fresh) -----------------

export interface GoogleAdsStatsRow {
	keyword: string;
	currency: string | null;
	avgMonthlySearches: number | null;
	threeMonthChange: number | null;
	yoyChange: number | null;
	competition: string | null;
	competitionIndex: number | null;
	topOfPageBidLow: number | null;
	topOfPageBidHigh: number | null;
	adImpressionShare: number | null;
	organicImpressionShare: number | null;
	organicAveragePosition: number | null;
	monthlySearches: Record<string, number>;
}

export interface GoogleAdsStatsFile {
	period: { from: string; to: string } | null;
	rows: GoogleAdsStatsRow[];
}

const MONTH_FULL: Record<string, string> = {
	january: '01',
	february: '02',
	march: '03',
	april: '04',
	may: '05',
	june: '06',
	july: '07',
	august: '08',
	september: '09',
	october: '10',
	november: '11',
	december: '12'
};

const MONTH_ABBR: Record<string, string> = {
	jan: '01',
	feb: '02',
	mar: '03',
	apr: '04',
	may: '05',
	jun: '06',
	jul: '07',
	aug: '08',
	sep: '09',
	oct: '10',
	nov: '11',
	dec: '12'
};

/** "1 September 2025 - 31 August 2026" -> { from: "2025-09", to: "2026-08" }. Pure text parsing,
 *  no Date object (avoids locale/timezone surprises for a value that is only ever a YYYY-MM). */
export function parseGoogleAdsPeriod(line: string): { from: string; to: string } | null {
	const match = line.match(/^\d+\s+([A-Za-z]+)\s+(\d{4})\s*-\s*\d+\s+([A-Za-z]+)\s+(\d{4})\s*$/);
	if (!match) return null;
	const [, fromMonth, fromYear, toMonth, toYear] = match;
	const from = MONTH_FULL[fromMonth.toLowerCase()];
	const to = MONTH_FULL[toMonth.toLowerCase()];
	if (!from || !to) return null;
	return { from: `${fromYear}-${from}`, to: `${toYear}-${to}` };
}

/** "0%" -> 0, "-33%" -> -33, " --" / "--" / "" -> null (Ads prints "--" for a suppressed value,
 *  sometimes with a leading space). */
function parsePercent(cell: string): number | null {
	const trimmed = cell.trim();
	if (trimmed === '' || trimmed === '--') return null;
	const value = Number(trimmed.replace(/%$/, ''));
	return Number.isFinite(value) ? value : null;
}

/** "" -> null, otherwise a plain number (commas stripped defensively). */
function parseNum(cell: string): number | null {
	const trimmed = cell.trim();
	if (trimmed === '' || trimmed === '--') return null;
	const value = Number(trimmed.replace(/,/g, ''));
	return Number.isFinite(value) ? value : null;
}

/** "Searches: Sep 2025" -> "2025-09", or null when the header cell does not match. */
function monthColumnKey(header: string): string | null {
	const match = header.match(/^Searches:\s*([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
	if (!match) return null;
	const month = MONTH_ABBR[match[1].toLowerCase()];
	return month ? `${match[2]}-${month}` : null;
}

/**
 * Pure: parses the already-decoded (UTF-16LE -> string, BOM stripped) text of a "Keyword Stats
 * <date> at <time>.csv" export: line 1 is a title, line 2 the reporting period, line 3 the header,
 * then one tab-separated row per keyword. Header-driven (looks columns up by name) rather than by
 * fixed position, so a harmless column reorder in a future export does not silently misread data.
 */
export function parseGoogleAdsStatsCsv(text: string): GoogleAdsStatsFile {
	const lines = text.split(/\r?\n/);
	const period = lines[1] ? parseGoogleAdsPeriod(lines[1]) : null;
	const header = (lines[2] ?? '').split('\t').map((h) => h.trim());
	const col = (name: string) => header.indexOf(name);

	const iKeyword = col('Keyword');
	const iCurrency = col('Currency');
	const iAvg = col('Avg. monthly searches');
	const i3mo = col('Three month change');
	const iYoy = col('YoY change');
	const iCompetition = col('Competition');
	const iCompetitionIdx = col('Competition (indexed value)');
	const iBidLow = col('Top of page bid (low range)');
	const iBidHigh = col('Top of page bid (high range)');
	const iAdShare = col('Ad impression share');
	const iOrganicShare = col('Organic impression share');
	const iOrganicPos = col('Organic average position');

	const monthColumns = header
		.map((h, i) => ({ i, key: monthColumnKey(h) }))
		.filter((c): c is { i: number; key: string } => c.key !== null);

	const rows: GoogleAdsStatsRow[] = [];
	for (const line of lines.slice(3)) {
		if (line.trim() === '') continue;
		const cols = line.split('\t');
		const keyword = (cols[iKeyword] ?? '').trim();
		if (!keyword) continue;

		const monthlySearches: Record<string, number> = {};
		for (const { i, key } of monthColumns) {
			const value = parseNum(cols[i] ?? '');
			if (value !== null) monthlySearches[key] = value;
		}

		rows.push({
			keyword,
			currency: (cols[iCurrency] ?? '').trim() || null,
			avgMonthlySearches: parseNum(cols[iAvg] ?? ''),
			threeMonthChange: parsePercent(cols[i3mo] ?? ''),
			yoyChange: parsePercent(cols[iYoy] ?? ''),
			competition: (cols[iCompetition] ?? '').trim() || null,
			competitionIndex: parseNum(cols[iCompetitionIdx] ?? ''),
			topOfPageBidLow: parseNum(cols[iBidLow] ?? ''),
			topOfPageBidHigh: parseNum(cols[iBidHigh] ?? ''),
			adImpressionShare: parsePercent(cols[iAdShare] ?? ''),
			organicImpressionShare: parsePercent(cols[iOrganicShare] ?? ''),
			organicAveragePosition: parseNum(cols[iOrganicPos] ?? ''),
			monthlySearches
		});
	}

	return { period, rows };
}

/** Pure: no file I/O. Same relevance/seed-mapping treatment as the GSC importer (unlike the
 *  audited theme lists above): a relevant, unmapped keyword enters as `idea`, never auto-`covered`. */
export function googleAdsStatsRowsToKeywords(
	rows: GoogleAdsStatsRow[],
	asOf: string,
	period: { from: string; to: string } | null,
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	return rows.map((row) => {
		const relevance = checkRelevance(row.keyword, serviceAreas);
		const seedMatch = relevance.relevant ? matchSeedMapping(row.keyword) : null;

		let status: KeywordEntry['status'] = 'idea';
		let cluster = 'unassigned';
		let url: string | null = null;
		let reason: string | null = null;

		if (!relevance.relevant) {
			status = 'rejected';
			reason = `out-of-market or no-fit query (${relevance.reason})`;
		} else if (seedMatch) {
			status = seedMatch.status;
			cluster = seedMatch.cluster;
			url = seedMatch.url;
			reason = seedMatch.status === 'rejected' ? (seedMatch.reason ?? null) : null;
		}

		const stats: GoogleAdsStats = {
			asOf,
			period,
			currency: row.currency,
			avgMonthlySearches: row.avgMonthlySearches,
			threeMonthChange: row.threeMonthChange,
			yoyChange: row.yoyChange,
			competition: row.competition,
			competitionIndex: row.competitionIndex,
			topOfPageBidLow: row.topOfPageBidLow,
			topOfPageBidHigh: row.topOfPageBidHigh,
			adImpressionShare: row.adImpressionShare,
			organicImpressionShare: row.organicImpressionShare,
			organicAveragePosition: row.organicAveragePosition,
			monthlySearches: row.monthlySearches
		};

		return {
			id: normalizeId(row.keyword),
			keyword: row.keyword,
			locale: 'en',
			cluster,
			topic: null,
			intent: null,
			url,
			status,
			reason,
			sources: { 'google-ads': { firstSeen: asOf, lastSeen: asOf, stats } },
			opportunity: null,
			opportunityReason: null,
			firstSeen: today,
			lastResearched: null,
			notes: ''
		};
	});
}

/** Extracts the YYYY-MM-DD from a "... Keyword Stats <date> at <time>....csv" filename. */
function statsFileDate(file: string): string | null {
	const match = file.match(/Keyword Stats (\d{4}-\d{2}-\d{2}) at/);
	return match ? match[1] : null;
}

/** Picks the most recent full stats export on disk (excludes the legacy "... Keywords.csv" and
 *  "... Ubersuggest.csv" files, which are different sources handled elsewhere). */
export function pickMostRecentStatsFile(files: string[]): { file: string; date: string } | null {
	let best: { file: string; date: string } | null = null;
	for (const file of files) {
		if (!file.includes('Keyword Stats')) continue;
		if (file.endsWith('Keywords.csv') || file.endsWith('Ubersuggest.csv')) continue;
		const date = statsFileDate(file);
		if (!date) continue;
		if (!best || date > best.date) best = { file, date };
	}
	return best;
}

/** Real file read: decodes the UTF-16LE export (stripping the BOM) with `TextDecoder`, same
 *  approach the CLAUDE.md task brief specifies. */
function readUtf16LeCsv(path: string): string {
	const bytes = new Uint8Array(readFileSync(path));
	const withoutBom = bytes[0] === 0xff && bytes[1] === 0xfe ? bytes.slice(2) : bytes;
	return new TextDecoder('utf-16le').decode(withoutBom);
}

/** Real file read (node:fs). Reads all three google-ads sources: the audited theme lists, the
 *  audited legacy volume export, and the most recent unaudited full stats export. */
export function importGoogleAdsKeywords(
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	const files = readdirSync(GOOGLE_ADS_DIR);

	const themeFiles = files.filter(
		(f) => f.startsWith('Google Ads Keyword Research') && f.endsWith('.csv')
	);
	const lists: GoogleAdsPhraseList[] = themeFiles.map((file) => ({
		topic: themeFromFilename(file),
		phrases: readPhraseFile(join(GOOGLE_ADS_DIR, file))
	}));

	const volumeFile = files.find((f) => f.includes('Keyword Stats') && f.endsWith('Keywords.csv'));
	const volumeRows: GoogleAdsVolumeRow[] = volumeFile
		? readFileSync(join(GOOGLE_ADS_DIR, volumeFile), 'utf8')
				.split(/\r?\n/)
				.slice(1)
				.map((l) => l.split(','))
				.filter((cols) => cols.length >= 2 && cols[0].trim().length > 0)
				.map((cols) => ({ keyword: cols[0].trim(), volume: Number(cols[1]) }))
		: [];

	const statsFile = pickMostRecentStatsFile(files);
	const statsEntries: KeywordEntry[] = statsFile
		? (() => {
				const text = readUtf16LeCsv(join(GOOGLE_ADS_DIR, statsFile.file));
				const parsed = parseGoogleAdsStatsCsv(text);
				return googleAdsStatsRowsToKeywords(
					parsed.rows,
					statsFile.date,
					parsed.period,
					serviceAreas,
					today
				);
			})()
		: [];

	return [
		...googleAdsPhrasesToKeywords(lists, serviceAreas, today),
		...googleAdsVolumeRowsToKeywords(volumeRows, serviceAreas, today),
		...statsEntries
	];
}
