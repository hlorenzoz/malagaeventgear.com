/**
 * merge.ts: pure upsert logic for the three keywords.json collections (plan, `merge.ts`).
 *
 * The one rule every function here protects: an entry that is no longer "idea" (for keywords)
 * or "idea" (for faqs/aiPrompts) has its identity fields (status, url, reason, cluster) LOCKED.
 * A lower-confidence source (a raw autocomplete phrase, a stale POP row) can still add metrics,
 * sources and freshen research, but it can never move a decided entry backward or silently
 * change what it points to. "El blog publicado siempre gana" (CLAUDE.md).
 *
 * `opportunity`/`opportunityReason` are NEVER carried through a merge: they are always null here.
 * The one place that computes them is `score.ts`, applied as a final pass over the whole file in
 * `sync.ts` / `ingest-ubersuggest.ts`, so the field can never drift from the metrics that justify
 * it.
 */

import type {
  AiPromptEntry,
  FaqEntry,
  KeywordEntry,
  Metrics,
  SourceRef,
} from "./schema";

type MetricField = keyof Metrics;
const METRIC_FIELDS: MetricField[] = [
  "volume",
  "difficulty",
  "cpc",
  "gsc",
  "ubersuggest",
];

/** Picks whichever side's metric has the newer `asOf`, keeps a lone side untouched. */
function mergeMetrics(existing: Metrics, incoming: Metrics): Metrics {
  const merged = { ...existing };
  for (const field of METRIC_FIELDS) {
    const e = existing[field];
    const i = incoming[field];
    if (!i) continue; // nothing new for this field
    if (!e || i.asOf >= e.asOf) {
      (merged as Record<MetricField, Metrics[MetricField]>)[field] = i;
    }
  }
  return merged;
}

/** Unions two source lists by `name`, keeping the latest `seen` date per name. */
function mergeSources(
  existing: SourceRef[],
  incoming: SourceRef[],
): SourceRef[] {
  const byName = new Map<string, SourceRef>();
  for (const s of [...existing, ...incoming]) {
    const current = byName.get(s.name);
    if (!current || s.seen > current.seen) byName.set(s.name, s);
  }
  return [...byName.values()];
}

function minDate(a: string, b: string): string {
  return a <= b ? a : b;
}

function maxDateOrNull(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a >= b ? a : b;
}

/**
 * Upserts a keyword entry. With no existing entry, the incoming one is returned as-is (its own
 * `opportunity`/`opportunityReason` are still zeroed, see module docs). With an existing entry,
 * identity fields (`status`, `url`, `reason`, `cluster`) are kept from `existing` unless it is
 * still `idea`, in which case `incoming`'s proposal wins.
 */
export function mergeKeyword(
  existing: KeywordEntry | undefined,
  incoming: KeywordEntry,
): KeywordEntry {
  if (!existing)
    return { ...incoming, opportunity: null, opportunityReason: null };

  const identityLocked = existing.status !== "idea";

  return {
    id: existing.id,
    keyword: existing.keyword || incoming.keyword,
    locale: existing.locale || incoming.locale,
    cluster: identityLocked ? existing.cluster : incoming.cluster,
    topic: existing.topic ?? incoming.topic,
    intent: existing.intent ?? incoming.intent,
    url: identityLocked ? existing.url : incoming.url,
    status: identityLocked ? existing.status : incoming.status,
    reason: identityLocked ? existing.reason : incoming.reason,
    metrics: mergeMetrics(existing.metrics, incoming.metrics),
    research: incoming.research ?? existing.research,
    opportunity: null,
    opportunityReason: null,
    sources: mergeSources(existing.sources, incoming.sources),
    firstSeen: minDate(existing.firstSeen, incoming.firstSeen),
    lastResearched: maxDateOrNull(
      existing.lastResearched,
      incoming.lastResearched,
    ),
    // Protected together with status/url/reason once identity is locked (plan: "NUNCA pisa
    // status/url/notes de una entrada que no este en idea"): an empty string is still a
    // deliberate value here, not "unset", so `||` would wrongly let incoming notes leak in.
    notes: identityLocked ? existing.notes : incoming.notes || existing.notes,
  };
}

/** Same identity-lock rule as `mergeKeyword`, applied to a FAQ entry (`status`/`url`/`reason`
 *  locked once it leaves `idea`). */
export function mergeFaq(
  existing: FaqEntry | undefined,
  incoming: FaqEntry,
): FaqEntry {
  if (!existing) return incoming;

  const identityLocked = existing.status !== "idea";

  return {
    id: existing.id,
    question: existing.question || incoming.question,
    keywordId: existing.keywordId || incoming.keywordId,
    cluster: identityLocked ? existing.cluster : incoming.cluster,
    url: identityLocked ? existing.url : incoming.url,
    status: identityLocked ? existing.status : incoming.status,
    reason: identityLocked ? existing.reason : incoming.reason,
    source: identityLocked ? existing.source : incoming.source,
    firstSeen: minDate(existing.firstSeen, incoming.firstSeen),
  };
}

/** Same identity-lock rule again, plus `visibility` (AI Search Visibility snapshot) always takes
 *  the freshest side, since it is a point-in-time reading, not a decision. */
export function mergeAiPrompt(
  existing: AiPromptEntry | undefined,
  incoming: AiPromptEntry,
): AiPromptEntry {
  if (!existing) return incoming;

  const identityLocked = existing.status !== "idea";
  const visibility =
    incoming.visibility &&
    (!existing.visibility ||
      incoming.visibility.asOf >= existing.visibility.asOf)
      ? incoming.visibility
      : existing.visibility;

  return {
    id: existing.id,
    prompt: existing.prompt || incoming.prompt,
    keywordId: existing.keywordId || incoming.keywordId,
    cluster: identityLocked ? existing.cluster : incoming.cluster,
    url: identityLocked ? existing.url : incoming.url,
    status: identityLocked ? existing.status : incoming.status,
    reason: identityLocked ? existing.reason : incoming.reason,
    source: identityLocked ? existing.source : incoming.source,
    visibility,
    firstSeen: minDate(existing.firstSeen, incoming.firstSeen),
  };
}
