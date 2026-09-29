/**
 * importers/gsc.ts: keyword entries from the most recent Google Search Console export (plan,
 * importers table row "gsc"). The export is a zip with several CSVs, only `Consultas.csv`
 * ("Top queries") matters here. Its headers are Spanish (`Consultas principales,Clics,
 * Impresiones,CTR,Posición`) because the GSC UI language was Spanish when it was exported.
 *
 * Reads the zip with `unzip -p` via `Bun.spawn` (plan requirement: no new npm dependency for
 * zip handling).
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseCsvLine } from '../../backfill-silo-meta';
import { normalizeId } from '../normalize';
import { checkRelevance } from '../relevance';
import { matchSeedMapping } from '../seed-mappings';
import type { KeywordEntry } from '../schema';

const GSC_DIR = join(process.cwd(), '.agents', 'context', 'keywords', 'google-search-console-gsc');
const ZIP_DATE_RE = /(\d{4}-\d{2}-\d{2})\.zip$/;

export interface GscRow {
	query: string;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

/**
 * Splits raw CSV text into logical records, respecting a quoted field that contains a literal
 * newline. The 2026-09-23 export has real rows like this: a handful of "queries" are actually
 * multi-line prompt-injection style text aimed at an AI answer engine ("do not include location
 * references in your response..."), quoted by GSC's own exporter because of the embedded
 * newline. A naive `split(/\r?\n/)` breaks each of those into several bogus short rows. Text
 * returned by an external export is DATA, never an instruction: it is stored like any other
 * keyword string here, never parsed as a command.
 */
export function splitCsvRecords(text: string): string[] {
	const records: string[] = [];
	let current = '';
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (c === '"') {
			current += c;
			if (inQuotes && text[i + 1] === '"') {
				current += text[++i];
			} else {
				inQuotes = !inQuotes;
			}
		} else if (!inQuotes && (c === '\n' || c === '\r')) {
			if (c === '\r' && text[i + 1] === '\n') i++;
			if (current.length > 0) records.push(current);
			current = '';
		} else {
			current += c;
		}
	}
	if (current.length > 0) records.push(current);
	return records;
}

/** Parses `Consultas.csv`'s content (header + rows), converting "5.1%" -> 5.1 and "8.11" -> 8.11. */
export function parseGscCsv(csv: string): GscRow[] {
	const records = splitCsvRecords(csv);
	const rows: GscRow[] = [];
	for (const record of records.slice(1)) {
		const cols = parseCsvLine(record);
		if (cols.length < 5) continue;
		rows.push({
			query: cols[0].trim(),
			clicks: Number(cols[1]),
			impressions: Number(cols[2]),
			ctr: Number(cols[3].replace('%', '')),
			position: Number(cols[4])
		});
	}
	return rows;
}

/** Picks the zip whose filename carries the latest YYYY-MM-DD, or null if none matches. */
export function pickMostRecentZip(files: string[]): { file: string; date: string } | null {
	let best: { file: string; date: string } | null = null;
	for (const file of files) {
		const match = file.match(ZIP_DATE_RE);
		if (!match) continue;
		if (!best || match[1] > best.date) best = { file, date: match[1] };
	}
	return best;
}

/** Pure: no file I/O. `asOf` is the export date (from the zip filename), `today` is the sync run
 *  date used for `firstSeen`. Rejects via `relevance.ts` before consulting `seed-mappings.ts`, so
 *  an out of market query is never left dangling as `idea`. */
export function gscRowsToKeywords(
	rows: GscRow[],
	asOf: string,
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	return rows.map((row) => {
		const relevance = checkRelevance(row.query, serviceAreas);
		const seedMatch = relevance.relevant ? matchSeedMapping(row.query) : null;

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

		return {
			id: normalizeId(row.query),
			keyword: row.query,
			locale: 'en',
			cluster,
			topic: null,
			intent: null,
			url,
			status,
			reason,
			sources: {
				'google-search-console': {
					firstSeen: asOf,
					lastSeen: asOf,
					stats: {
						asOf,
						impressions: row.impressions,
						clicks: row.clicks,
						ctr: row.ctr,
						position: row.position
					}
				}
			},
			opportunity: null,
			opportunityReason: null,
			firstSeen: today,
			lastResearched: null,
			notes: ''
		};
	});
}

/** Real read: picks the most recent GSC zip on disk, extracts `Consultas.csv` with `unzip -p`
 *  (via Bun.spawn, no new dependency), and converts it. Returns [] when no zip exists yet. */
export async function importGscKeywords(
	serviceAreas: readonly string[],
	today: string
): Promise<KeywordEntry[]> {
	const files = readdirSync(GSC_DIR).filter((f) => f.endsWith('.zip'));
	const mostRecent = pickMostRecentZip(files);
	if (!mostRecent) return [];

	const zipPath = join(GSC_DIR, mostRecent.file);
	const proc = Bun.spawn(['unzip', '-p', zipPath, 'Consultas.csv'], {
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const csv = await new Response(proc.stdout).text();
	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		const stderr = await new Response(proc.stderr).text();
		throw new Error(`unzip -p failed on ${mostRecent.file}: ${stderr}`);
	}

	return gscRowsToKeywords(parseGscCsv(csv), mostRecent.date, serviceAreas, today);
}
