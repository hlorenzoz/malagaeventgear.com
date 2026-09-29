/**
 * importers/gbp.ts: keyword entries from the GBP content-map.md (244 GBP categories resolved to
 * a site status, plan importers table row "gbp"). Status mapping (plan): `covered`/`duplicate`
 * -> `covered`, `no-fit`/`conflict` -> `rejected`.
 *
 * `declared` is not named by the plan (the doc's own legend: "resolved without its own page
 * because an existing page already honestly states the scope decision by name"). Decision made
 * here, not specified upstream: map it to `covered` too, since (like `covered`/`duplicate`) the
 * intent is already resolved by existing content, just via a named "What We Don't Offer" bullet
 * rather than a dedicated FAQ/section. The doc currently uses only these 5 statuses (no `pending`,
 * `risk`, `ready`, `no-grounding` rows exist today), so nothing else needs a mapping yet. A
 * future row using one of those would fall through to the default branch below (treated as an
 * unresolved `idea`, never silently dropped).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId } from '../normalize';
import type { KeywordEntry, KeywordStatus } from '../schema';

const CONTENT_MAP_PATH = join(
	process.cwd(),
	'.agents',
	'context',
	'google-business-profile',
	'gmbeverywhere.com',
	'meg',
	'content-map.md'
);

const ROW_RE = /^\|\s*\d+\s*\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|$/;

export interface GbpRow {
	service: string;
	status: string;
	/** First slug token when the cell lists more than one, or "-" when none. */
	slug: string;
}

/** Extracts numbered data rows ("| 1 | Service | Status | Slug | Batch | Notes |"), skipping the
 *  header row (its first cell is "#", not a number) and everything else in the document. */
export function parseGbpRows(md: string): GbpRow[] {
	const rows: GbpRow[] = [];
	for (const line of md.split(/\r?\n/)) {
		const match = line.match(ROW_RE);
		if (!match) continue;
		const service = match[1].trim();
		const status = match[2].trim();
		const slugCell = match[3].trim();
		const slug = slugCell.split('/')[0].trim() || '-';
		rows.push({ service, status, slug });
	}
	return rows;
}

const STATUS_MAP: Record<string, KeywordStatus> = {
	covered: 'covered',
	duplicate: 'covered',
	declared: 'covered',
	'no-fit': 'rejected',
	conflict: 'rejected'
};

const REJECTED_REASON: Record<string, string> = {
	'no-fit':
		'GBP content-map.md: not a physical AV equipment/rental service fit for a per-event delivery-only business.',
	conflict:
		'GBP content-map.md: a published page already explicitly states MEG does not offer this.'
};

/** Pure: no file I/O. `postClusterBySlug` (from the blog importer's already-resolved clusters) is
 *  used when the row's slug is a known post, so a GBP row inherits that post's real cluster
 *  instead of a bare 'unassigned'. */
export function gbpRowsToKeywords(
	rows: GbpRow[],
	realSlugs: ReadonlySet<string>,
	postClusterBySlug: Record<string, string>,
	today: string
): KeywordEntry[] {
	return rows.map((row) => {
		const status = STATUS_MAP[row.status] ?? 'idea';
		const hasRealPost = row.slug !== '-' && realSlugs.has(row.slug);

		return {
			id: normalizeId(row.service),
			keyword: row.service.toLowerCase(),
			locale: 'en',
			cluster: hasRealPost ? (postClusterBySlug[row.slug] ?? 'unassigned') : 'unassigned',
			topic: null,
			intent: null,
			url: hasRealPost ? `/blog/${row.slug}/` : null,
			status,
			reason:
				status === 'rejected'
					? (REJECTED_REASON[row.status] ?? 'GBP content-map.md: not pursued.')
					: null,
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
			sources: [{ name: 'gbp-content-map', seen: today }],
			firstSeen: today,
			lastResearched: null,
			notes: ''
		};
	});
}

/** Real file read (node:fs). */
export function importGbpKeywords(
	realSlugs: ReadonlySet<string>,
	postClusterBySlug: Record<string, string>,
	today: string
): KeywordEntry[] {
	const md = readFileSync(CONTENT_MAP_PATH, 'utf8');
	return gbpRowsToKeywords(parseGbpRows(md), realSlugs, postClusterBySlug, today);
}
