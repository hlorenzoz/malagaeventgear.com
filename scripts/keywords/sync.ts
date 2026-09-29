#!/usr/bin/env bun
/**
 * sync.ts: runs every static-file importer, merges the result into the existing root
 * `keywords.json` (if any) and writes it back, sorted and stably formatted (plan, "Diseño" 2,
 * `sync.ts` row). This is the ONLY script allowed to write `keywords.json` from these sources.
 * `ingest-ubersuggest.ts` is the only other writer, for the daily agent's batch file.
 *
 * Usage: `bun scripts/keywords/sync.ts` (also `just keywords-sync`).
 *
 * Idempotent by construction: every importer is a pure function of "today" plus files already
 * committed to the repo, `merge.ts` is upsert-by-id, and the final array is always sorted by id
 * before writing, so running this twice on the same day produces byte-identical output.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  KeywordsFileSchema,
  type KeywordEntry,
  type FaqEntry,
  type KeywordsFile,
} from "./schema";
import { mergeFaq, mergeKeyword } from "./merge";
import { scoreOpportunity } from "./score";
import { sanitizeKeywordsFile } from "./sanitize";
import { importBlogKeywords } from "./importers/blog";
import { importPostFaqs, type PostInfo } from "./importers/post-faqs";
import { importSiteFaqs } from "./importers/site-faq";
import { importPopKeywords } from "./importers/pop";
import { importGscKeywords } from "./importers/gsc";
import { importGoogleAdsKeywords } from "./importers/google-ads";
import { importUbersuggestCsvKeywords } from "./importers/ubersuggest-csv";
import { importGbpKeywords } from "./importers/gbp";
import { importResearchMd } from "./importers/research-md";

const OUTPUT_PATH = join(process.cwd(), "keywords.json");

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugFromBlogUrl(url: string): string {
  return url.replace(/^\/blog\//, "").replace(/\/$/, "");
}

function readExisting(): KeywordsFile | null {
  if (!existsSync(OUTPUT_PATH)) return null;
  return KeywordsFileSchema.parse(
    JSON.parse(readFileSync(OUTPUT_PATH, "utf8")),
  );
}

function upsertAll<T extends { id: string }>(
  byId: Map<string, T>,
  incoming: T[],
  merge: (existing: T | undefined, incoming: T) => T,
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

export async function runSync(
  serviceAreas: readonly string[],
): Promise<SyncSummary> {
  const runDate = today();
  const existing = readExisting();

  const keywordsById = new Map<string, KeywordEntry>(
    existing?.keywords.map((k) => [k.id, k]) ?? [],
  );
  const faqsById = new Map<string, FaqEntry>(
    existing?.faqs.map((f) => [f.id, f]) ?? [],
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

  const popEntries = importPopKeywords(realSlugs, runDate);
  const gbpEntries = importGbpKeywords(realSlugs, postClusterBySlug, runDate);
  const research = importResearchMd(postInfoBySlug, runDate);
  const googleAdsEntries = importGoogleAdsKeywords(serviceAreas, runDate);
  const ubersuggestCsvEntries = importUbersuggestCsvKeywords(
    serviceAreas,
    runDate,
  );
  const gscEntries = await importGscKeywords(serviceAreas, runDate);

  const perSource: Record<string, number> = {
    blog: blogEntries.length,
    "pop-csv": popEntries.length,
    "gbp-content-map": gbpEntries.length,
    "research-md": research.keywords.length,
    "google-ads": googleAdsEntries.length,
    "ubersuggest-csv": ubersuggestCsvEntries.length,
    gsc: gscEntries.length,
  };

  for (const batch of [
    blogEntries,
    popEntries,
    gbpEntries,
    research.keywords,
    googleAdsEntries,
    ubersuggestCsvEntries,
    gscEntries,
  ]) {
    upsertAll(keywordsById, batch, mergeKeyword);
  }

  const postFaqEntries = importPostFaqs(postInfoBySlug, runDate);
  const siteFaqEntries = await importSiteFaqs(runDate);
  perSource["post-faqs"] = postFaqEntries.length;
  perSource["site-faq"] = siteFaqEntries.length;
  perSource["research-paa"] = research.faqs.length;

  for (const batch of [postFaqEntries, siteFaqEntries, research.faqs]) {
    upsertAll(faqsById, batch, mergeFaq);
  }

  const keywords = [...keywordsById.values()]
    .map((k) => ({ ...k, ...scoreOpportunity(k.metrics) }))
    .sort((a, b) => a.id.localeCompare(b.id));
  const faqs = [...faqsById.values()].sort((a, b) => a.id.localeCompare(b.id));
  const aiPrompts = existing?.aiPrompts ?? [];

  const file: KeywordsFile = {
    version: 1,
    updated: runDate,
    meta: existing?.meta ?? { lastWeeklyRun: null, lastMonthlyRun: null },
    keywords,
    faqs,
    aiPrompts,
  };

  const validated = KeywordsFileSchema.parse(sanitizeKeywordsFile(file));
  writeFileSync(OUTPUT_PATH, JSON.stringify(validated, null, 2) + "\n", "utf8");

  const keywordsByStatus: Record<string, number> = {};
  for (const k of validated.keywords)
    keywordsByStatus[k.status] = (keywordsByStatus[k.status] ?? 0) + 1;
  const faqsByStatus: Record<string, number> = {};
  for (const f of validated.faqs)
    faqsByStatus[f.status] = (faqsByStatus[f.status] ?? 0) + 1;

  return {
    perSource,
    keywordsByStatus,
    faqsByStatus,
    totalKeywords: validated.keywords.length,
    totalFaqs: validated.faqs.length,
    totalAiPrompts: validated.aiPrompts.length,
  };
}

if (import.meta.main) {
  const { siteConfig } = await import("../../src/lib/data/site");
  const summary = await runSync(siteConfig.serviceAreas);
  console.log(`\n[keywords:sync] wrote ${OUTPUT_PATH}\n`);
  console.log("per source:", summary.perSource);
  console.log("keywords by status:", summary.keywordsByStatus);
  console.log("faqs by status:", summary.faqsByStatus);
  console.log(
    `\ntotals: ${summary.totalKeywords} keywords, ${summary.totalFaqs} faqs, ${summary.totalAiPrompts} aiPrompts\n`,
  );
}
