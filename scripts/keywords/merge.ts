/**
 * merge.ts: pure upsert logic for the three keywords.json collections.
 *
 * The one rule every function here protects: an entry that is no longer "idea" (for keywords) or
 * "idea" (for faqs/aiPrompts) has its identity fields (status, url, reason, cluster) LOCKED. A
 * lower-confidence source (a raw autocomplete phrase, a stale POP row) can still add its own
 * per-source stats and freshen research, but it can never move a decided entry backward or
 * silently change what it points to. "El blog publicado siempre gana" (CLAUDE.md).
 *
 * `sources` merges per SOURCE KEY (2026-09-29 redesign): a keyword tracked by both Google Ads and
 * Ubersuggest keeps both entries side by side, and re-ingesting the same source only ever touches
 * its own key. When one side provides `stats` twice for the same source (e.g. the 2025 and the
 * 2026 Google Ads files), the stats with the newer `asOf` win ENTIRELY, never merged field by
 * field, so a reading can never end up part-2025/part-2026.
 *
 * `opportunity`/`opportunityReason` are NEVER carried through a merge: they are always recomputed
 * as a final pass over the whole file (`score.ts`, applied in `sync.ts` / `ingest-ubersuggest.ts`),
 * so the field can never drift out of sync with `sources`.
 */

import type { AiPromptEntry, FaqEntry, FaqSources, KeywordEntry, Sources } from './schema';
import { FAQ_SOURCE_KEYS, SOURCE_KEYS } from './schema';

function minDate(a: string, b: string): string {
	return a <= b ? a : b;
}

function maxDate(a: string, b: string): string {
	return a >= b ? a : b;
}

function maxDateOrNull(a: string | null, b: string | null): string | null {
	if (!a) return b;
	if (!b) return a;
	return a >= b ? a : b;
}

interface GenericSourceEntry {
	firstSeen: string;
	lastSeen: string;
	via?: string[];
	stats?: { asOf: string } | null;
}

/** Merges one source's own entry: dates widen, `via` unions (sorted, deduped), and `stats` (when
 *  the source has any) is replaced wholesale by whichever side has the newer `asOf`, never
 *  merged field by field. */
function mergeSourceEntry(existing: GenericSourceEntry, incoming: GenericSourceEntry) {
	const merged: GenericSourceEntry = {
		...existing,
		firstSeen: minDate(existing.firstSeen, incoming.firstSeen),
		lastSeen: maxDate(existing.lastSeen, incoming.lastSeen)
	};
	if (existing.via || incoming.via) {
		merged.via = [...new Set([...(existing.via ?? []), ...(incoming.via ?? [])])].sort();
	}
	if ('stats' in existing || 'stats' in incoming) {
		const e = existing.stats ?? null;
		const i = incoming.stats ?? null;
		merged.stats = !i ? e : !e ? i : i.asOf >= e.asOf ? i : e;
	}
	return merged;
}

/** Unions two `sources` records key by key. A key present on only one side passes through
 *  untouched; a key present on both is merged with `mergeSourceEntry`. */
export function mergeSources(existing: Sources, incoming: Sources): Sources {
	const merged: Sources = { ...existing };
	for (const key of SOURCE_KEYS) {
		const e = existing[key];
		const i = incoming[key];
		if (!i) continue;
		(merged as Record<string, unknown>)[key] = !e
			? i
			: mergeSourceEntry(e as GenericSourceEntry, i as GenericSourceEntry);
	}
	return merged;
}

/**
 * Upserts a keyword entry. With no existing entry, the incoming one is returned as-is (its own
 * `opportunity`/`opportunityReason` are still zeroed, see module docs). With an existing entry,
 * identity fields (`status`, `url`, `reason`, `cluster`) are kept from `existing` unless it is
 * still `idea`, in which case `incoming`'s proposal wins.
 */
export function mergeKeyword(
	existing: KeywordEntry | undefined,
	incoming: KeywordEntry
): KeywordEntry {
	if (!existing) return { ...incoming, opportunity: null, opportunityReason: null };

	const identityLocked = existing.status !== 'idea';

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
		sources: mergeSources(existing.sources, incoming.sources),
		opportunity: null,
		opportunityReason: null,
		firstSeen: minDate(existing.firstSeen, incoming.firstSeen),
		lastResearched: maxDateOrNull(existing.lastResearched, incoming.lastResearched),
		// Protected together with status/url/reason once identity is locked (an empty string is
		// still a deliberate value here, not "unset", so `||` would wrongly let incoming notes
		// leak in).
		notes: identityLocked ? existing.notes : incoming.notes || existing.notes
	};
}

const union = (a: string[] = [], b: string[] = []) => [...new Set([...a, ...b])].sort();

/** Pure: unions two FAQ `sources` key by key. Dates widen, `seeds` and `urls` union (sorted),
 *  `stats` is replaced wholesale by the side with the newer `asOf`. */
export function mergeFaqSources(existing: FaqSources, incoming: FaqSources): FaqSources {
	const merged: Record<string, unknown> = { ...existing };
	for (const key of FAQ_SOURCE_KEYS) {
		const e = existing[key] as Record<string, unknown> | undefined;
		const i = incoming[key] as Record<string, unknown> | undefined;
		if (!i) continue;
		if (!e) {
			merged[key] = i;
			continue;
		}
		const out: Record<string, unknown> = {
			...e,
			firstSeen: minDate(e.firstSeen as string, i.firstSeen as string),
			lastSeen: maxDate(e.lastSeen as string, i.lastSeen as string)
		};
		if ('seeds' in e || 'seeds' in i) out.seeds = union(e.seeds as string[], i.seeds as string[]);
		if ('urls' in e || 'urls' in i) out.urls = union(e.urls as string[], i.urls as string[]);
		if ('stats' in e || 'stats' in i) {
			const es = (e.stats ?? null) as { asOf: string } | null;
			const is = (i.stats ?? null) as { asOf: string } | null;
			out.stats = !is ? es : !es ? is : is.asOf >= es.asOf ? is : es;
		}
		merged[key] = out;
	}
	return merged as FaqSources;
}

/** Same identity-lock rule as `mergeKeyword`, applied to a FAQ entry (`status`/`url`/`reason`
 *  locked once it leaves `idea`). `sources` merges per source key. */
export function mergeFaq(existing: FaqEntry | undefined, incoming: FaqEntry): FaqEntry {
	if (!existing) return incoming;

	const identityLocked = existing.status !== 'idea';

	return {
		id: existing.id,
		question: existing.question || incoming.question,
		keywordId: existing.keywordId || incoming.keywordId,
		cluster: identityLocked ? existing.cluster : incoming.cluster,
		url: identityLocked ? existing.url : incoming.url,
		status: identityLocked ? existing.status : incoming.status,
		reason: identityLocked ? existing.reason : incoming.reason,
		sources: mergeFaqSources(existing.sources, incoming.sources)
	};
}

/** Same identity-lock rule again, plus `visibility` (AI Search Visibility snapshot) always takes
 *  the freshest side, since it is a point-in-time reading, not a decision. */
export function mergeAiPrompt(
	existing: AiPromptEntry | undefined,
	incoming: AiPromptEntry
): AiPromptEntry {
	if (!existing) return incoming;

	const identityLocked = existing.status !== 'idea';
	const visibility =
		incoming.visibility &&
		(!existing.visibility || incoming.visibility.asOf >= existing.visibility.asOf)
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
		firstSeen: minDate(existing.firstSeen, incoming.firstSeen)
	};
}
