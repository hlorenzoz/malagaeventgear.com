/**
 * importers/research-md.ts: `.agents/context/keywords/keyword-research-conferences-2026-09-25.md`
 * (plan, importers table row "research-md"). A hand-written research report, not a data export:
 * cluster tables (A-F), a "weak/low-evidence" paragraph, a PAA-style FAQ table, and a discarded
 * table. Every piece is parsed deterministically, nothing here re-runs or re-judges the research.
 *
 * Status from "MEG fit" (plan: "31 keywords as idea/planned per its fit label", a rule, not
 * specified verbatim by the plan, decided here): a fit that literally contains "weak" or "needs
 * business confirmation" stays `idea` (evidence is thin or a business fact is still unconfirmed).
 * A fit starting with "strong" (and not also flagged weak/unconfirmed) becomes `planned`. Anything
 * else (e.g. "medium") stays `idea`. This reproduces the plan's own count: 26 phrases across the
 * 6 cluster tables (some "Keyword" cells list 2-3 phrases separated by " / ", each becomes its own
 * entry) + 6 weak/low-evidence phrases - 1 duplicate already in the discarded table
 * ("shareholder meeting av") = 31.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeId, toAscii } from '../normalize';
import type { FaqEntry, KeywordEntry, KeywordStatus } from '../schema';

const RESEARCH_MD_PATH = join(
	process.cwd(),
	'.agents',
	'context',
	'keywords',
	'keyword-research-conferences-2026-09-25.md'
);

export interface ResearchClusterRow {
	keyword: string;
	fit: string;
}

export interface ResearchCluster {
	name: string;
	pillarUrl: string;
	rows: ResearchClusterRow[];
}

const CLUSTER_HEADING_RE = /^###\s+Cluster\s+[A-Z]:\s*(.+)$/;
const PILLAR_RE = /\*\*Pillar:\s*`([^`]+)`\*\*/;
const TABLE_ROW_RE = /^\|(.+)\|$/;

/** Splits a document into blocks starting at each "### Cluster X: ..." heading, stopping at the
 *  next "##"/"###" heading (a fresh top-level or cluster section). */
function splitIntoClusterBlocks(md: string): string[] {
	const lines = md.split(/\r?\n/);
	const blocks: string[] = [];
	let current: string[] | null = null;
	for (const line of lines) {
		if (CLUSTER_HEADING_RE.test(line)) {
			if (current) blocks.push(current.join('\n'));
			current = [line];
			continue;
		}
		if (current && /^##\s/.test(line)) {
			blocks.push(current.join('\n'));
			current = null;
			continue;
		}
		if (current) current.push(line);
	}
	if (current) blocks.push(current.join('\n'));
	return blocks;
}

/** Extracts every "### Cluster X: Name" section: its pillar url and its keyword table rows. */
export function parseResearchClusters(md: string): ResearchCluster[] {
	return splitIntoClusterBlocks(md).map((block) => {
		const lines = block.split(/\r?\n/);
		const headingMatch = lines[0].match(CLUSTER_HEADING_RE);
		const name = headingMatch ? headingMatch[1].trim() : '';
		const pillarMatch = block.match(PILLAR_RE);
		const pillarUrl = pillarMatch ? pillarMatch[1].trim() : '';

		const rows: ResearchClusterRow[] = [];
		let inTable = false;
		for (const line of lines) {
			const rowMatch = line.match(TABLE_ROW_RE);
			if (!rowMatch) continue;
			const cells = rowMatch[1].split('|').map((c) => c.trim());
			if (cells[0] === 'Keyword') {
				inTable = true;
				continue;
			}
			if (!inTable) continue;
			if (/^:?-+:?$/.test(cells[0])) continue; // markdown separator row
			rows.push({ keyword: cells[0], fit: cells[cells.length - 1] });
		}
		return { name, pillarUrl, rows };
	});
}

/** Extracts every backtick-quoted phrase from the "Weak / low-evidence items" paragraph (a "###"
 *  heading in the source document, bounded by the next "##"/"###" heading so a later section's
 *  own backtick phrases (PAA questions, discarded rows) are never swept in). */
export function parseWeakItems(md: string): string[] {
	const afterHeading = md.split(/^###\s+Weak/m)[1];
	if (!afterHeading) return [];
	const section = afterHeading.split(/^##+\s/m)[0];
	const matches = section.matchAll(/`([^`]+)`/g);
	// The source markdown hard-wraps prose at ~90 chars, sometimes inside a backtick span, so a
	// phrase can carry an embedded newline that is really just a line-wrap, not part of the text.
	return [...matches].map((m) => m[1].replace(/\s+/g, ' ').trim());
}

const PAA_TABLE_START = /^\|\s*Question\s*\|/;

/** Extracts each PAA-style question with the slug of its target post (from a `slug.svx` code
 *  span, ignoring any parenthetical note after it). */
export function parsePaaRows(md: string): { question: string; targetSlug: string }[] {
	const lines = md.split(/\r?\n/);
	const rows: { question: string; targetSlug: string }[] = [];
	let inTable = false;
	for (const line of lines) {
		if (PAA_TABLE_START.test(line)) {
			inTable = true;
			continue;
		}
		if (!inTable) continue;
		const rowMatch = line.match(TABLE_ROW_RE);
		if (!rowMatch) {
			if (line.trim() === '') inTable = false;
			continue;
		}
		const cells = rowMatch[1].split('|').map((c) => c.trim());
		if (/^:?-+:?$/.test(cells[0])) continue;
		const slugMatch = cells[2]?.match(/`([a-z0-9-]+)\.svx`/);
		if (!slugMatch) continue;
		rows.push({ question: cells[0], targetSlug: slugMatch[1] });
	}
	return rows;
}

const DISCARDED_TABLE_START = /^\|\s*Keyword\s*\|\s*Reason discarded\s*\|/;

/** Extracts each discarded phrase (kept WHOLE, never split on " / ": unlike the cluster tables,
 *  a discarded row is one rejected concept even when it lists several near-synonym phrases) with
 *  its reason. */
export function parseDiscardedRows(md: string): { text: string; reason: string }[] {
	const lines = md.split(/\r?\n/);
	const rows: { text: string; reason: string }[] = [];
	let inTable = false;
	for (const line of lines) {
		if (DISCARDED_TABLE_START.test(line)) {
			inTable = true;
			continue;
		}
		if (!inTable) continue;
		const rowMatch = line.match(TABLE_ROW_RE);
		if (!rowMatch) {
			if (line.trim() === '') inTable = false;
			continue;
		}
		const cells = rowMatch[1].split('|').map((c) => c.trim());
		if (/^:?-+:?$/.test(cells[0])) continue;
		rows.push({ text: cells[0], reason: cells[1] });
	}
	return rows;
}

/** "strong" (and not also "weak"/"needs business confirmation") -> planned, everything else
 *  stays idea. See module docs for why. */
function statusFromFit(fit: string): KeywordStatus {
	const lower = fit.toLowerCase();
	if (lower.includes('weak') || lower.includes('needs business confirmation')) return 'idea';
	if (lower.startsWith('strong')) return 'planned';
	return 'idea';
}

/** `/blog/event-technology-service/` -> `event technology service`. */
function clusterFromPillarUrl(pillarUrl: string): string {
	const match = pillarUrl.match(/^\/blog\/([a-z0-9-]+)\/$/);
	return match ? match[1].replace(/-/g, ' ') : 'unassigned';
}

function baseKeywordEntry(
	keyword: string,
	cluster: string,
	status: KeywordStatus,
	reason: string | null,
	today: string
): KeywordEntry {
	const clean = toAscii(keyword);
	return {
		id: normalizeId(clean),
		keyword: clean,
		locale: 'en',
		cluster,
		topic: null,
		intent: null,
		url: null,
		status,
		reason,
		sources: { research: { firstSeen: today, lastSeen: today } },
		opportunity: null,
		opportunityReason: null,
		firstSeen: today,
		lastResearched: null,
		notes: ''
	};
}

/** Pure: no file I/O. */
export function researchMdToKeywords(
	clusters: ResearchCluster[],
	weakItems: string[],
	discardedRows: { text: string; reason: string }[],
	today: string
): KeywordEntry[] {
	const entries: KeywordEntry[] = [];
	const discardedTexts = new Set(discardedRows.map((r) => r.text));

	for (const cluster of clusters) {
		const clusterName = clusterFromPillarUrl(cluster.pillarUrl);
		for (const row of cluster.rows) {
			const status = statusFromFit(row.fit);
			for (const phrase of row.keyword.split(' / ').map((p) => p.trim())) {
				entries.push(baseKeywordEntry(phrase, clusterName, status, null, today));
			}
		}
	}

	for (const item of weakItems) {
		if (discardedTexts.has(item)) continue; // already covered by the discarded table below
		entries.push(baseKeywordEntry(item, 'unassigned', 'idea', null, today));
	}

	for (const row of discardedRows) {
		entries.push(baseKeywordEntry(row.text, 'unassigned', 'rejected', toAscii(row.reason), today));
	}

	return entries;
}

/** Pure: no file I/O. `postInfo` (from the blog importer) resolves the target post's own keyword
 *  id and cluster. A slug missing from it falls back to itself as keywordId and 'unassigned'. */
export function researchMdToFaqs(
	paaRows: { question: string; targetSlug: string }[],
	postInfo: Record<string, { keywordId: string; cluster: string }>,
	today: string
): FaqEntry[] {
	return paaRows.map((row) => {
		const info = postInfo[row.targetSlug] ?? {
			keywordId: row.targetSlug,
			cluster: 'unassigned'
		};
		return {
			id: `research-paa--${normalizeId(row.question)}`,
			question: toAscii(row.question),
			keywordId: info.keywordId,
			cluster: info.cluster,
			url: null,
			status: 'idea',
			reason: null,
			source: 'research-paa',
			firstSeen: today
		};
	});
}

/** Real file read (node:fs). */
export function importResearchMd(
	postInfo: Record<string, { keywordId: string; cluster: string }>,
	today: string
): { keywords: KeywordEntry[]; faqs: FaqEntry[] } {
	const md = readFileSync(RESEARCH_MD_PATH, 'utf8');
	const clusters = parseResearchClusters(md);
	const weakItems = parseWeakItems(md);
	const discardedRows = parseDiscardedRows(md);
	const paaRows = parsePaaRows(md);
	return {
		keywords: researchMdToKeywords(clusters, weakItems, discardedRows, today),
		faqs: researchMdToFaqs(paaRows, postInfo, today)
	};
}
