#!/usr/bin/env bun
/**
 * ingest-ubersuggest.ts: validates and merges one daily Ubersuggest batch file into the root
 * `keywords.json`. This and `sync.ts` are the ONLY two scripts allowed to write `keywords.json`.
 * The ubersuggest-analyst agent never touches the file directly: it writes a batch matching
 * `batch.schema.ts`, and this script does the actual mutation, after validating and re-applying
 * the same relevance/seed-mapping rules every other source goes through (a batch the agent wrote
 * is still just data here, never trusted blindly).
 *
 * Every reading the batch carries (`keywords[].metrics`, `rank`, `research`) lands under ONE
 * source key, `sources.ubersuggest`, regardless of which MCP call produced it: `via` records
 * which section(s) contributed (`suggestions`, `domain`, `project`, `seo-opportunities`,
 * `competitor:<domain>`, `serp`, `content-ideas`, `title-ideas`), so the provenance is never lost
 * even though the stats collapse into one place. The one exception is `google-autocomplete`
 * (Google Suggestions results relayed through the Ubersuggest MCP): it gets its OWN source key,
 * since it is a distinct signal (raw autocomplete text, never a metric) from everything else
 * Ubersuggest measures.
 *
 * Usage: `bun scripts/keywords/ingest-ubersuggest.ts <path-to-batch.json>` (also
 * `just keywords-ingest <file>`). Exits non-zero, writing nothing, if the batch fails
 * `KeywordBatchSchema` or the merged result fails `KeywordsFileSchema`.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { KeywordBatchSchema, type KeywordBatch } from './batch.schema';
import {
	KeywordsFileSchema,
	type AiPromptEntry,
	type FaqEntry,
	type KeywordEntry,
	type KeywordsFile,
	type UbersuggestStats
} from './schema';
import { mergeAiPrompt, mergeFaq, mergeKeyword } from './merge';
import { scoreOpportunity } from './score';
import { sanitizeKeywordsFile } from './sanitize';
import { normalizeId } from './normalize';
import { checkRelevance } from './relevance';
import { matchSeedMapping } from './seed-mappings';
import { keywordsPath } from '../paths';

const OUTPUT_PATH = keywordsPath();

const UBERSUGGEST_PREFIX = 'ubersuggest-';

/** "ubersuggest-suggestions" -> "suggestions", "ubersuggest-csv" -> "csv", "competitor:x" stays
 *  as-is: `via` names the SECTION, dropping the redundant "ubersuggest-" prefix. */
function viaSection(sourceName: string): string {
	return sourceName.startsWith(UBERSUGGEST_PREFIX)
		? sourceName.slice(UBERSUGGEST_PREFIX.length)
		: sourceName;
}

/** Creates the entry's `sources.ubersuggest`/`sources['google-autocomplete']` sub-object on first
 *  contact, or widens it (dates, `via`) on a later contact from a different section. */
function ensureSource(entry: KeywordEntry, sourceName: string, today: string): void {
	if (sourceName === 'google-autocomplete') {
		const existing = entry.sources['google-autocomplete'];
		entry.sources['google-autocomplete'] = existing
			? { firstSeen: existing.firstSeen, lastSeen: today }
			: { firstSeen: today, lastSeen: today };
		return;
	}
	const section = viaSection(sourceName);
	const existing = entry.sources.ubersuggest;
	if (!existing) {
		entry.sources.ubersuggest = { firstSeen: today, lastSeen: today, via: [section], stats: null };
		return;
	}
	entry.sources.ubersuggest = {
		...existing,
		lastSeen: today,
		via: existing.via.includes(section) ? existing.via : [...existing.via, section].sort()
	};
}

/** Merges partial ubersuggest stats fields (volume/difficulty/cpc, rank position, or research)
 *  onto whatever `sources.ubersuggest.stats` already holds, bumping `asOf` to the reading's own
 *  date. Never called for an entry whose only source is `google-autocomplete`. */
function patchUbersuggestStats(
	entry: KeywordEntry,
	patch: Partial<UbersuggestStats>,
	asOf: string
): void {
	if (!entry.sources.ubersuggest) return;
	const current = entry.sources.ubersuggest.stats ?? { asOf };
	entry.sources.ubersuggest = {
		...entry.sources.ubersuggest,
		stats: { ...current, ...patch, asOf }
	};
}

/**
 * Pure: converts `batch.keywords` and `batch.rank` into keyword entries, keyed by normalized id
 * so a keyword appearing in both (e.g. an already-tracked project keyword with a fresh rank
 * reading) merges into ONE entry rather than two. Every new keyword starts `idea`: the agent
 * never decides status/url/cluster, this function re-derives them the same deterministic way
 * `gsc.ts` does (relevance first, then seed-mappings), never trusting whatever `cluster` field
 * the agent's batch entry happened to guess.
 */
export function batchToKeywords(
	batch: KeywordBatch,
	serviceAreas: readonly string[],
	today: string
): KeywordEntry[] {
	const byId = new Map<string, KeywordEntry>();

	function baseEntry(keyword: string, sourceName: string): KeywordEntry {
		const id = normalizeId(keyword);
		let entry = byId.get(id);
		if (!entry) {
			const relevance = checkRelevance(keyword, serviceAreas);
			const seedMatch = relevance.relevant ? matchSeedMapping(keyword) : null;

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

			entry = {
				id,
				keyword,
				locale: 'en',
				cluster,
				topic: null,
				intent: null,
				url,
				status,
				reason,
				sources: {},
				opportunity: null,
				opportunityReason: null,
				firstSeen: today,
				lastResearched: today,
				notes: ''
			};
			byId.set(id, entry);
		}
		ensureSource(entry, sourceName, today);
		return entry;
	}

	for (const bk of batch.keywords) {
		const entry = baseEntry(bk.keyword, bk.source);
		if (bk.intent && !entry.intent) entry.intent = bk.intent;
		if (bk.metrics) {
			patchUbersuggestStats(
				entry,
				{
					...(bk.metrics.volume ? { volume: bk.metrics.volume.value } : {}),
					...(bk.metrics.difficulty ? { difficulty: bk.metrics.difficulty.value } : {}),
					...(bk.metrics.cpc ? { cpc: bk.metrics.cpc.value } : {})
				},
				today
			);
		}
	}

	for (const r of batch.rank) {
		const entry = baseEntry(r.keyword, 'ubersuggest-project');
		patchUbersuggestStats(entry, { position: r.position, rankingUrl: r.rankingUrl }, r.asOf);
	}

	for (const [keyword, research] of Object.entries(batch.research)) {
		const id = normalizeId(keyword);
		const entry = byId.get(id);
		if (!entry) continue; // research is only ever attached to a keyword already in this batch
		ensureSource(entry, 'ubersuggest-research', today);
		patchUbersuggestStats(
			entry,
			{
				...(research.serp ? { serp: research.serp } : {}),
				...(research.contentIdeas ? { contentIdeas: research.contentIdeas } : {}),
				...(research.titleIdeas ? { titleIdeas: research.titleIdeas } : {})
			},
			today
		);
		// "ubersuggest-research" is not a real MCP section name: replace it with the specific
		// section(s) this research reading actually came from.
		const via = new Set(entry.sources.ubersuggest!.via.filter((v) => v !== 'research'));
		if (research.serp) via.add('serp');
		if (research.contentIdeas) via.add('content-ideas');
		if (research.titleIdeas) via.add('title-ideas');
		entry.sources.ubersuggest = { ...entry.sources.ubersuggest!, via: [...via].sort() };
	}

	return [...byId.values()];
}

/** Pure: one idea faq per google-autocomplete question. A missing seed `keyword` falls back to
 *  the question itself as keywordId/'unassigned' cluster rather than throwing. */
export function batchToFaqs(batch: KeywordBatch, today: string): FaqEntry[] {
	return batch.faqs.map((bf) => {
		const keywordId = bf.keyword ? normalizeId(bf.keyword) : normalizeId(bf.question);
		return {
			id: normalizeId(bf.question),
			question: bf.question,
			keywordId,
			cluster: 'unassigned',
			url: null,
			status: 'idea',
			reason: null,
			sources: {
				'google-autocomplete': { firstSeen: today, lastSeen: today, seeds: [keywordId] }
			}
		};
	});
}

/** Pure: one idea aiPrompt per AI Prompt Idea / tracked brand prompt. Visibility is carried as a
 *  point in time reading, it never changes `status` by itself (the agent only discovers). */
export function batchToAiPrompts(batch: KeywordBatch, today: string): AiPromptEntry[] {
	return batch.aiPrompts.map((bp) => {
		const keywordId = bp.keyword ? normalizeId(bp.keyword) : normalizeId(bp.prompt);
		return {
			id: `ubersuggest--${normalizeId(bp.prompt)}`,
			prompt: bp.prompt,
			keywordId,
			cluster: 'unassigned',
			url: null,
			status: 'idea',
			reason: null,
			source: bp.source,
			visibility: bp.visibility ?? null,
			firstSeen: today
		};
	});
}

function upsertAll<T extends { id: string }>(
	byId: Map<string, T>,
	incoming: T[],
	merge: (existing: T | undefined, incoming: T) => T
): void {
	for (const entry of incoming) byId.set(entry.id, merge(byId.get(entry.id), entry));
}

export interface IngestResult {
	file: KeywordsFile;
	addedKeywords: number;
	addedFaqs: number;
	addedAiPrompts: number;
	discarded: number;
}

/** Pure core of the ingest: given the already-validated batch and the existing file (or none),
 *  returns the merged, scored, sanitized, schema-valid result. Never touches disk. */
export function ingestBatch(
	batch: KeywordBatch,
	existing: KeywordsFile | null,
	serviceAreas: readonly string[],
	today: string
): IngestResult {
	const keywordsById = new Map<string, KeywordEntry>(
		existing?.keywords.map((k) => [k.id, k]) ?? []
	);
	const faqsById = new Map<string, FaqEntry>(existing?.faqs.map((f) => [f.id, f]) ?? []);
	const aiPromptsById = new Map<string, AiPromptEntry>(
		existing?.aiPrompts.map((p) => [p.id, p]) ?? []
	);

	const beforeKeywords = keywordsById.size;
	const beforeFaqs = faqsById.size;
	const beforePrompts = aiPromptsById.size;

	upsertAll(keywordsById, batchToKeywords(batch, serviceAreas, today), mergeKeyword);
	upsertAll(faqsById, batchToFaqs(batch, today), mergeFaq);
	upsertAll(aiPromptsById, batchToAiPrompts(batch, today), mergeAiPrompt);

	const keywords = [...keywordsById.values()]
		.map((k) => ({ ...k, ...scoreOpportunity(k.sources) }))
		.sort((a, b) => a.id.localeCompare(b.id));
	const faqs = [...faqsById.values()].sort((a, b) => a.id.localeCompare(b.id));
	const aiPrompts = [...aiPromptsById.values()].sort((a, b) => a.id.localeCompare(b.id));

	const meta = existing?.meta ?? { lastWeeklyRun: null, lastMonthlyRun: null };
	const file: KeywordsFile = {
		version: 1,
		updated: today,
		meta: {
			lastWeeklyRun: batch.run.weeklyRun ? batch.date : meta.lastWeeklyRun,
			lastMonthlyRun: batch.run.monthlyRun ? batch.date : meta.lastMonthlyRun
		},
		keywords,
		faqs,
		aiPrompts
	};

	return {
		file: KeywordsFileSchema.parse(sanitizeKeywordsFile(file)),
		addedKeywords: keywords.length - beforeKeywords,
		addedFaqs: faqs.length - beforeFaqs,
		addedAiPrompts: aiPrompts.length - beforePrompts,
		discarded: batch.discarded.length
	};
}

if (import.meta.main) {
	const batchPath = process.argv[2];
	if (!batchPath) {
		console.error('Usage: bun scripts/keywords/ingest-ubersuggest.ts <path-to-batch.json>');
		process.exit(1);
	}

	const rawBatch = JSON.parse(readFileSync(batchPath, 'utf8'));
	const parsedBatch = KeywordBatchSchema.safeParse(rawBatch);
	if (!parsedBatch.success) {
		console.error(`[ingest-ubersuggest] invalid batch ${batchPath}:`);
		console.error(parsedBatch.error.format());
		process.exit(1);
	}

	const existing = existsSync(OUTPUT_PATH)
		? KeywordsFileSchema.parse(JSON.parse(readFileSync(OUTPUT_PATH, 'utf8')))
		: null;

	const { siteConfig } = await import('../../src/lib/data/site');
	const today = new Date().toISOString().slice(0, 10);
	const result = ingestBatch(parsedBatch.data, existing, siteConfig.serviceAreas, today);

	writeFileSync(OUTPUT_PATH, JSON.stringify(result.file, null, 2) + '\n', 'utf8');
	console.log(
		`[ingest-ubersuggest] ${batchPath}: +${result.addedKeywords} keywords, +${result.addedFaqs} faqs, ` +
			`+${result.addedAiPrompts} aiPrompts, ${result.discarded} discarded (already excluded from keywords.json)`
	);
}
