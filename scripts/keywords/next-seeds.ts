#!/usr/bin/env bun
/**
 * next-seeds.ts: picks the N seed keywords for today's Ubersuggest research run (plan,
 * "Diseño" 2, `next-seeds.ts` row). Prints JSON on stdout: `just keywords-seeds` /
 * `bun scripts/keywords/next-seeds.ts [n]`. The output also carries today's agenda (`planRun`), so
 * the agent never has to open the 1.7 MB `keywords.json` to know which cadences are due.
 *
 * Pool: `published` or `planned` keywords only (an `idea` has no real page behind it yet, a
 * `rejected`/`covered`/`draft` one is not worth spending the day's Ubersuggest quota on).
 * Never-researched keywords come first (an empty pipeline stage matters more than refreshing an
 * old number), then the oldest `lastResearched` date. Rotates by `cluster` so one cluster with
 * many keywords does not monopolize every day's seeds.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  KeywordsFileSchema,
  type KeywordEntry,
  type KeywordsFile,
} from "./schema";

const KEYWORDS_PATH = join(process.cwd(), "keywords.json");
const DEFAULT_N = 3;

const SEEDABLE_STATUSES = new Set<KeywordEntry["status"]>([
  "published",
  "planned",
]);

/** A news or standalone post's keyword is its headline, not a search term: seeding Ubersuggest
 *  with it spends the free quota on phrases nobody searches. */
const UNSEEDABLE_CLUSTERS = new Set(["news", "standalone"]);

/** Pure: given the pool, returns up to `n` seeds. */
export function pickNextSeeds(
  pool: KeywordEntry[],
  n: number = DEFAULT_N,
): KeywordEntry[] {
  const candidates = pool
    .filter(
      (k) =>
        SEEDABLE_STATUSES.has(k.status) && !UNSEEDABLE_CLUSTERS.has(k.cluster),
    )
    .slice()
    .sort((a, b) => {
      if (!a.lastResearched && !b.lastResearched)
        return a.id.localeCompare(b.id);
      if (!a.lastResearched) return -1;
      if (!b.lastResearched) return 1;
      return (
        a.lastResearched.localeCompare(b.lastResearched) ||
        a.id.localeCompare(b.id)
      );
    });

  const seeds: KeywordEntry[] = [];
  const usedClusters = new Set<string>();

  // First pass: one per cluster, in priority order, so no cluster is picked twice before
  // every other cluster present in the (sorted-by-priority) candidate list has had a turn.
  for (const candidate of candidates) {
    if (seeds.length >= n) break;
    if (usedClusters.has(candidate.cluster)) continue;
    usedClusters.add(candidate.cluster);
    seeds.push(candidate);
  }

  // Second pass: if there are fewer distinct clusters than `n`, fill the rest by priority order.
  if (seeds.length < n) {
    for (const candidate of candidates) {
      if (seeds.length >= n) break;
      if (seeds.includes(candidate)) continue;
      seeds.push(candidate);
    }
  }

  return seeds;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Pure: which cadences are due today. Weekly means 7 days since the last weekly run, not
 *  "Monday": a Mac asleep on Monday must not skip the week. Monthly means a new calendar month. */
export function planRun(meta: KeywordsFile["meta"], today: string) {
  const weeklyDue =
    !meta.lastWeeklyRun ||
    Date.parse(today) - Date.parse(meta.lastWeeklyRun) >= WEEK_MS;
  const monthlyDue =
    !meta.lastMonthlyRun ||
    meta.lastMonthlyRun.slice(0, 7) !== today.slice(0, 7);
  return { today, weeklyDue, monthlyDue };
}

if (import.meta.main) {
  const n = Number(process.argv[2]) || DEFAULT_N;
  const file = KeywordsFileSchema.parse(
    JSON.parse(readFileSync(KEYWORDS_PATH, "utf8")),
  );
  const seeds = pickNextSeeds(file.keywords, n);
  const today = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Madrid",
  });
  const plan = planRun(file.meta, today);
  console.log(
    JSON.stringify(
      {
        ...plan,
        seeds: seeds.map((s) => ({
          id: s.id,
          keyword: s.keyword,
          cluster: s.cluster,
        })),
      },
      null,
      2,
    ),
  );
}
