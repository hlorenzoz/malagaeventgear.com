/**
 * importers/pop.ts: keyword entries from the PageOptimizer Pro reverse-silo CSV (plan, importers
 * table row "pop"). Reuses `parseCsvLine` and `slugFromUrl` from `scripts/backfill-silo-meta.ts`
 * (plan: "reuse, do not reimplement") rather than re-parsing the CSV by hand.
 *
 * Status mapping (plan, "Diseño" 1): POP `published/scheduled/draft/blank` -> keywords.json
 * `published/planned/draft/idea`.
 *
 * Honesty guard (not explicitly in the plan, added here): the CSV is a stale historical plan
 * (`keyword-silo-map.md` documents ~30 wedding-decor rows it once proposed that were later
 * dropped from the site entirely). When a row says `published` but its Keyword URL does not
 * match any real post on disk, keeping `published` would violate the schema's own "published
 * requires url" rule with a URL that does not exist, so instead of fabricating a url or
 * silently keeping a false "published" status, the row is downgraded to `idea` with a note
 * explaining why. `scheduled`/`draft`/blank never need this: only `published` requires a url.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseCsvLine, slugFromUrl } from '../../backfill-silo-meta';
import { normalizeId } from '../normalize';
import type { KeywordEntry, KeywordStatus } from '../schema';

const CSV_PATH = join(
	process.cwd(),
	'.agents',
	'context',
	'keywords',
	'pop',
	'PageOptimizer Pro _ Reverse Silo - POP.csv'
);

export interface PopRow {
	type: 'Supporting Keyword' | 'Top-Level Keyword';
	status: string;
	topLevelKeyword: string;
	keyword: string;
	keywordUrl: string;
}

const STATUS_MAP: Record<string, KeywordStatus> = {
	published: 'published',
	scheduled: 'planned',
	draft: 'draft',
	'': 'idea'
};

/** Parses the raw CSV text into data rows only (Supporting/Top-Level Keyword), skipping the
 *  2-row header block, blank separator lines and the column-header row (line 6). */
export function parsePopRows(csv: string): PopRow[] {
	const rows: PopRow[] = [];
	for (const line of csv.split(/\r?\n/)) {
		const cols = parseCsvLine(line);
		const type = cols[0]?.trim();
		if (type !== 'Supporting Keyword' && type !== 'Top-Level Keyword') continue;
		rows.push({
			type,
			status: (cols[1] ?? '').trim().toLowerCase(),
			topLevelKeyword: (cols[5] ?? '').trim(),
			keyword: (cols[6] ?? '').trim(),
			keywordUrl: (cols[7] ?? '').trim()
		});
	}
	return rows;
}

/** Pure: no file I/O. `realSlugs` is the set of ENGLISH post slugs that actually exist on disk
 *  (from the blog importer's file listing), so a proposed-but-never-shipped POP row never gets a
 *  URL that 404s. */
export function popRowsToKeywords(
	rows: PopRow[],
	realSlugs: ReadonlySet<string>,
	today: string
): KeywordEntry[] {
	return rows
		.filter((row) => row.keyword.length > 0)
		.map((row) => {
			const slug = slugFromUrl(row.keywordUrl);
			const hasRealPost = slug !== null && realSlugs.has(slug);
			let status = STATUS_MAP[row.status] ?? 'idea';
			let notes = '';

			if (status === 'published' && !hasRealPost) {
				notes = `POP marked this "published" but no matching post exists on the site; downgraded to idea.`;
				status = 'idea';
			}

			const cluster = row.type === 'Top-Level Keyword' ? row.keyword : row.topLevelKeyword;

			return {
				id: normalizeId(row.keyword),
				keyword: row.keyword,
				locale: 'en',
				cluster: cluster || 'unassigned',
				topic: null,
				intent: null,
				url: hasRealPost ? `/blog/${slug}/` : null,
				status,
				reason: null,
				sources: { pop: { firstSeen: today, lastSeen: today } },
				opportunity: null,
				opportunityReason: null,
				firstSeen: today,
				lastResearched: null,
				notes
			};
		});
}

/** Real file read (node:fs, same pattern as scripts/backfill-silo-meta.ts). */
export function importPopKeywords(realSlugs: ReadonlySet<string>, today: string): KeywordEntry[] {
	const csv = readFileSync(CSV_PATH, 'utf8');
	return popRowsToKeywords(parsePopRows(csv), realSlugs, today);
}
