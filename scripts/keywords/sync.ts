#!/usr/bin/env bun
/**
 * sync.ts: rebuilds `.agents/data/keywords.json` from EVERY committed source in the repo: the static
 * importers (POP, GSC, Google Ads, GBP, blog, FAQs) AND every committed Ubersuggest daily batch
 * under `.agents/context/keywords/ubersuggest/*.json`, replayed in date order. This is the ONLY
 * script (with `ingest-ubersuggest.ts`) allowed to write `keywords.json`.
 *
 * Usage: `bun scripts/keywords/sync.ts` (also `just keywords-sync`).
 *
 * Idempotent by construction: every importer is a pure function of "today" plus files already
 * committed to the repo, each ubersuggest batch is folded in using ITS OWN `date` (never "today",
 * so a rebuild on a different day still reproduces the same `sources.ubersuggest.firstSeen`),
 * `merge.ts` is upsert-by-id, and the final array is always sorted by id before writing, so
 * running this twice on the same day produces byte-identical output.
 *
 * Because it replays every batch, running this on a fresh checkout with NO existing
 * `keywords.json` reconstructs the same file a chain of daily `ingest-ubersuggest.ts` runs would
 * have produced: the file is fully derivable from what is committed, nothing lives only in a
 * previous `keywords.json` that a rebuild could lose.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import {
	KeywordsFileSchema,
	type KeywordEntry,
	type FaqEntry,
	type AiPromptEntry,
	type KeywordsFile
} from './schema';
import { mergeFaq, mergeKeyword, mergeAiPrompt } from './merge';
import { scoreOpportunity } from './score';
import { sanitizeKeywordsFile } from './sanitize';
import { batchToAiPrompts, batchToFaqs, batchToKeywords } from './ingest-ubersuggest';
import { readBatches } from './batches';
import { importBlogKeywords } from './importers/blog';
import { importPostFaqs, type PostInfo } from './importers/post-faqs';
import { importSiteFaqs } from './importers/site-faq';
import { importPopKeywords } from './importers/pop';
import { importGscKeywords } from './importers/gsc';
import { importGoogleAdsKeywords } from './importers/google-ads';
import { importUbersuggestCsvKeywords } from './importers/ubersuggest-csv';
import { importGbpKeywords } from './importers/gbp';
import { importResearchMd } from './importers/research-md';
import { importPlanCoverage } from './importers/plan-coverage';
import { importContentPlans } from './importers/content-plan';
import { keywordsPath } from '../paths';

const OUTPUT_PATH = keywordsPath();

function today(): string {
	return new Date().toISOString().slice(0, 10);
}

function slugFromBlogUrl(url: string): string {
	return url.replace(/^\/blog\//, '').replace(/\/$/, '');
}

function readExisting(): KeywordsFile | null {
	if (!existsSync(OUTPUT_PATH)) return null;
	const parsed = KeywordsFileSchema.safeParse(JSON.parse(readFileSync(OUTPUT_PATH, 'utf8')));
	if (parsed.success) return parsed.data;
	// A keywords.json written by a previous, incompatible schema version (e.g. the 2026-09-29
	// sources-per-source migration) cannot be upserted onto: rebuild fully from sources and
	// committed batches instead of crashing. Every id it held is re-derived below, since none of
	// it was ever anything other than a computed view over the same repo files.
	console.warn(
		'[keywords:sync] existing keywords.json does not match the current schema, rebuilding fully from sources'
	);
	return null;
}

function upsertAll<T extends { id: string }>(
	byId: Map<string, T>,
	incoming: T[],
	merge: (existing: T | undefined, incoming: T) => T
): void {
	for (const entry of incoming) {
		byId.set(entry.id, merge(byId.get(entry.id), entry));
	}
}

interface SyncSummary {
	perSource: Record<string, number>;
	keywordsByStatus: Record<string, number>;
	faqsByStatus: Record<string, number>;
	totalKeywords: number;
	totalFaqs: number;
	totalAiPrompts: number;
}

export async function runSync(serviceAreas: readonly string[]): Promise<SyncSummary> {
	const runDate = today();
	const existing = readExisting();

	const keywordsById = new Map<string, KeywordEntry>(
		existing?.keywords.map((k) => [k.id, k]) ?? []
	);
	const faqsById = new Map<string, FaqEntry>(existing?.faqs.map((f) => [f.id, f]) ?? []);
	const aiPromptsById = new Map<string, AiPromptEntry>(
		existing?.aiPrompts.map((p) => [p.id, p]) ?? []
	);

	// 1. Blog first: establishes the authoritative published/draft status and cluster for every
	// real post before any other (lower-confidence) source gets a chance to propose one.
	const blogEntries = importBlogKeywords(runDate);
	const realSlugs = new Set(blogEntries.map((e) => slugFromBlogUrl(e.url!)));
	const postInfoBySlug: Record<string, PostInfo> = {};
	const postClusterBySlug: Record<string, string> = {};
	for (const entry of blogEntries) {
		const slug = slugFromBlogUrl(entry.url!);
		postInfoBySlug[slug] = { keywordId: entry.id, cluster: entry.cluster };
		postClusterBySlug[slug] = entry.cluster;
	}
	upsertAll(keywordsById, blogEntries, mergeKeyword);

	// 2. Every committed Ubersuggest batch, oldest first: the daily agent's discoveries, each
	// dated by its OWN batch.date so a rebuild is stable regardless of when it runs.
	const batches = readBatches('strict').batches;
	let lastWeeklyRun: string | null = existing?.meta.lastWeeklyRun ?? null;
	let lastMonthlyRun: string | null = existing?.meta.lastMonthlyRun ?? null;
	let batchKeywordCount = 0;
	let batchFaqCount = 0;
	let batchAiPromptCount = 0;
	for (const batch of batches) {
		const keywords = batchToKeywords(batch, serviceAreas, batch.date);
		const faqs = batchToFaqs(batch, batch.date);
		const aiPrompts = batchToAiPrompts(batch, batch.date);
		batchKeywordCount += keywords.length;
		batchFaqCount += faqs.length;
		batchAiPromptCount += aiPrompts.length;
		upsertAll(keywordsById, keywords, mergeKeyword);
		upsertAll(faqsById, faqs, mergeFaq);
		upsertAll(aiPromptsById, aiPrompts, mergeAiPrompt);
		if (batch.run.weeklyRun) lastWeeklyRun = batch.date;
		if (batch.run.monthlyRun) lastMonthlyRun = batch.date;
	}

	// 3. Every other static importer.
	const popEntries = importPopKeywords(realSlugs, runDate);
	const gbpEntries = importGbpKeywords(realSlugs, postClusterBySlug, runDate);
	const research = importResearchMd(postInfoBySlug, runDate);
	const googleAdsEntries = importGoogleAdsKeywords(serviceAreas, runDate);
	const ubersuggestCsvEntries = importUbersuggestCsvKeywords(serviceAreas, runDate);
	const gscEntries = await importGscKeywords(serviceAreas, runDate);

	const perSource: Record<string, number> = {
		blog: blogEntries.length,
		'ubersuggest-batches': batchKeywordCount,
		pop: popEntries.length,
		gbp: gbpEntries.length,
		research: research.keywords.length,
		'google-ads': googleAdsEntries.length,
		'ubersuggest-csv': ubersuggestCsvEntries.length,
		'google-search-console': gscEntries.length
	};

	for (const batch of [
		popEntries,
		gbpEntries,
		research.keywords,
		googleAdsEntries,
		ubersuggestCsvEntries,
		gscEntries
	]) {
		upsertAll(keywordsById, batch, mergeKeyword);
	}

	// 4. Closing the loop, after every keyword exists: an `idea` that a committed content plan
	// asked to add (section or FAQ) and whose target post now has it becomes `covered`, then every
	// committed plan is attached as the `content-plan` source. Neither moves a decided status
	// (merge.ts identity lock), and nothing is covered by a mere coincidental heading.
	const headingCoverage = importPlanCoverage([...keywordsById.values()], runDate);
	upsertAll(keywordsById, headingCoverage, mergeKeyword);
	const planEntries = importContentPlans(keywordsById);
	upsertAll(keywordsById, planEntries, mergeKeyword);
	perSource['plan-coverage'] = headingCoverage.length;
	perSource['content-plan'] = planEntries.length;

	const postFaqEntries = importPostFaqs(postInfoBySlug, runDate);
	const siteFaqEntries = await importSiteFaqs(runDate);
	perSource['ubersuggest-batches-faqs'] = batchFaqCount;
	perSource['ubersuggest-batches-aiPrompts'] = batchAiPromptCount;
	perSource['post-faqs'] = postFaqEntries.length;
	perSource['site-faq'] = siteFaqEntries.length;
	perSource['research-paa'] = research.faqs.length;

	for (const batch of [postFaqEntries, siteFaqEntries, research.faqs]) {
		upsertAll(faqsById, batch, mergeFaq);
	}

	const keywords = [...keywordsById.values()]
		.map((k) => ({ ...k, ...scoreOpportunity(k.sources) }))
		.sort((a, b) => a.id.localeCompare(b.id));
	const faqs = [...faqsById.values()].sort((a, b) => a.id.localeCompare(b.id));
	const aiPrompts = [...aiPromptsById.values()].sort((a, b) => a.id.localeCompare(b.id));

	const file: KeywordsFile = {
		version: 1,
		updated: runDate,
		meta: { lastWeeklyRun, lastMonthlyRun },
		keywords,
		faqs,
		aiPrompts
	};

	const validated = KeywordsFileSchema.parse(sanitizeKeywordsFile(file));
	writeFileSync(OUTPUT_PATH, JSON.stringify(validated, null, 2) + '\n', 'utf8');

	const keywordsByStatus: Record<string, number> = {};
	for (const k of validated.keywords)
		keywordsByStatus[k.status] = (keywordsByStatus[k.status] ?? 0) + 1;
	const faqsByStatus: Record<string, number> = {};
	for (const f of validated.faqs) faqsByStatus[f.status] = (faqsByStatus[f.status] ?? 0) + 1;

	return {
		perSource,
		keywordsByStatus,
		faqsByStatus,
		totalKeywords: validated.keywords.length,
		totalFaqs: validated.faqs.length,
		totalAiPrompts: validated.aiPrompts.length
	};
}

if (import.meta.main) {
	const { siteConfig } = await import('../../src/lib/data/site');
	const summary = await runSync(siteConfig.serviceAreas);
	console.log(`\n[keywords:sync] wrote ${OUTPUT_PATH}\n`);
	console.log('per source:', summary.perSource);
	console.log('keywords by status:', summary.keywordsByStatus);
	console.log('faqs by status:', summary.faqsByStatus);
	console.log(
		`\ntotals: ${summary.totalKeywords} keywords, ${summary.totalFaqs} faqs, ${summary.totalAiPrompts} aiPrompts\n`
	);
}
