/**
 * merge.test.ts: unit tests for the pure upsert logic (plan, `merge.ts`). The one rule every
 * test in this file protects: once a keyword/faq/aiPrompt is no longer "idea", a lower-confidence
 * source can add metrics and sources, but can NEVER move it back, change its url, or overwrite
 * its notes/reason. "El blog publicado siempre gana."
 */
import { describe, it, expect } from "vitest";
import { mergeKeyword, mergeFaq, mergeAiPrompt } from "./merge";
import type { KeywordEntry, FaqEntry, AiPromptEntry } from "./schema";

function keyword(overrides: Partial<KeywordEntry> = {}): KeywordEntry {
  return {
    id: "audio-visual-rental",
    keyword: "audio visual rental",
    locale: "en",
    cluster: "audio visual rental",
    topic: null,
    intent: null,
    url: "/blog/audio-visual-rental/",
    status: "published",
    reason: null,
    metrics: {
      volume: null,
      difficulty: null,
      cpc: null,
      gsc: null,
      ubersuggest: null,
    },
    research: null,
    opportunity: null,
    opportunityReason: null,
    sources: [{ name: "blog", seen: "2026-09-29" }],
    firstSeen: "2026-09-29",
    lastResearched: null,
    notes: "",
    ...overrides,
  };
}

describe("mergeKeyword: no existing entry", () => {
  it("returns the incoming entry unchanged when there is nothing to merge into", () => {
    const incoming = keyword();
    expect(mergeKeyword(undefined, incoming)).toEqual(incoming);
  });
});

describe("mergeKeyword: protecting a non idea entry", () => {
  const published = keyword({
    status: "published",
    url: "/blog/audio-visual-rental/",
    notes: "do not touch",
  });

  it("never downgrades status away from published", () => {
    const incoming = keyword({
      status: "idea",
      url: null,
      cluster: "unassigned",
    });
    const merged = mergeKeyword(published, incoming);
    expect(merged.status).toBe("published");
  });

  it("never overwrites the url of a non idea entry", () => {
    const incoming = keyword({
      status: "idea",
      url: "/blog/some-other-page/",
      cluster: "unassigned",
    });
    const merged = mergeKeyword(published, incoming);
    expect(merged.url).toBe("/blog/audio-visual-rental/");
  });

  it("never overwrites notes of a non idea entry", () => {
    const incoming = keyword({
      notes: "a lower-confidence source guessed something",
    });
    const merged = mergeKeyword(published, incoming);
    expect(merged.notes).toBe("do not touch");
  });

  it("never fills in notes on a non idea entry even when its own notes are empty", () => {
    // notes is protected together with status/url/reason (plan: "NUNCA pisa status/url/notes
    // de una entrada que no este en idea"), not merely "protected when non-empty": an empty
    // string is falsy in JS and an earlier version of this merge used `existing.notes ||
    // incoming.notes`, which let an incoming note leak into an already-published entry.
    const publishedNoNotes = keyword({ status: "published", notes: "" });
    const incoming = keyword({ notes: "covered per some audit" });
    expect(mergeKeyword(publishedNoNotes, incoming).notes).toBe("");
  });

  it("never overwrites the reason of a rejected entry", () => {
    const rejected = keyword({
      status: "rejected",
      url: null,
      reason: "no fit in inventory",
    });
    const incoming = keyword({ status: "idea", url: null, reason: null });
    const merged = mergeKeyword(rejected, incoming);
    expect(merged.status).toBe("rejected");
    expect(merged.reason).toBe("no fit in inventory");
  });
});

describe("mergeKeyword: upgrading an idea entry", () => {
  it("lets an idea entry be promoted by an incoming source", () => {
    const idea = keyword({ status: "idea", url: null, cluster: "unassigned" });
    const incoming = keyword({
      status: "planned",
      url: "/blog/new-post/",
      cluster: "wedding rentals",
    });
    const merged = mergeKeyword(idea, incoming);
    expect(merged.status).toBe("planned");
    expect(merged.url).toBe("/blog/new-post/");
    expect(merged.cluster).toBe("wedding rentals");
  });
});

describe("mergeKeyword: metrics take the freshest asOf per field", () => {
  it("replaces an older volume metric with a newer one", () => {
    const existing = keyword({
      metrics: {
        volume: { value: 500, source: "google-ads", asOf: "2025-09-01" },
        difficulty: null,
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const incoming = keyword({
      metrics: {
        volume: { value: 880, source: "ubersuggest", asOf: "2026-09-29" },
        difficulty: null,
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const merged = mergeKeyword(existing, incoming);
    expect(merged.metrics.volume).toEqual({
      value: 880,
      source: "ubersuggest",
      asOf: "2026-09-29",
    });
  });

  it("keeps the existing metric when the incoming one is older", () => {
    const existing = keyword({
      metrics: {
        volume: { value: 880, source: "ubersuggest", asOf: "2026-09-29" },
        difficulty: null,
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const incoming = keyword({
      metrics: {
        volume: { value: 500, source: "google-ads", asOf: "2025-09-01" },
        difficulty: null,
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const merged = mergeKeyword(existing, incoming);
    expect(merged.metrics.volume?.value).toBe(880);
  });

  it("never drops an existing metric field just because incoming does not have it", () => {
    const existing = keyword({
      metrics: {
        volume: { value: 880, source: "ubersuggest", asOf: "2026-09-29" },
        difficulty: null,
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const incoming = keyword({
      metrics: {
        volume: null,
        difficulty: { value: 22, source: "ubersuggest", asOf: "2026-09-30" },
        cpc: null,
        gsc: null,
        ubersuggest: null,
      },
    });
    const merged = mergeKeyword(existing, incoming);
    expect(merged.metrics.volume?.value).toBe(880);
    expect(merged.metrics.difficulty?.value).toBe(22);
  });
});

describe("mergeKeyword: sources, firstSeen, lastResearched", () => {
  it("unions sources by name and keeps the latest seen date per source", () => {
    const existing = keyword({
      sources: [{ name: "blog", seen: "2026-09-20" }],
    });
    const incoming = keyword({
      sources: [
        { name: "blog", seen: "2026-09-29" },
        { name: "pop-csv", seen: "2026-09-29" },
      ],
    });
    const merged = mergeKeyword(existing, incoming);
    expect(merged.sources).toEqual(
      expect.arrayContaining([
        { name: "blog", seen: "2026-09-29" },
        { name: "pop-csv", seen: "2026-09-29" },
      ]),
    );
    expect(merged.sources).toHaveLength(2);
  });

  it("keeps the earliest firstSeen", () => {
    const existing = keyword({ firstSeen: "2026-08-05" });
    const incoming = keyword({ firstSeen: "2026-09-29" });
    expect(mergeKeyword(existing, incoming).firstSeen).toBe("2026-08-05");
  });

  it("keeps the latest lastResearched, treating null as unset", () => {
    const existing = keyword({ lastResearched: "2026-09-01" });
    const incoming = keyword({ lastResearched: "2026-09-29" });
    expect(mergeKeyword(existing, incoming).lastResearched).toBe("2026-09-29");
  });

  it("takes an incoming lastResearched when existing has none", () => {
    const existing = keyword({ lastResearched: null });
    const incoming = keyword({ lastResearched: "2026-09-29" });
    expect(mergeKeyword(existing, incoming).lastResearched).toBe("2026-09-29");
  });
});

describe("mergeKeyword: opportunity is always recomputed elsewhere, never carried by merge", () => {
  it("always returns null/null for opportunity, regardless of what either side carried", () => {
    const existing = keyword({
      opportunity: "high",
      opportunityReason: "stale reason",
    });
    const incoming = keyword({
      opportunity: "low",
      opportunityReason: "other stale reason",
    });
    const merged = mergeKeyword(existing, incoming);
    expect(merged.opportunity).toBeNull();
    expect(merged.opportunityReason).toBeNull();
  });
});

// --- faqs --------------------------------------------------------------------------------

function faq(overrides: Partial<FaqEntry> = {}): FaqEntry {
  return {
    id: "faq-1",
    question: "What is MEG?",
    keywordId: "audio-visual-rental",
    cluster: "audio visual rental",
    url: "/blog/audio-visual-rental/",
    status: "answered",
    reason: null,
    source: "post",
    firstSeen: "2026-09-29",
    ...overrides,
  };
}

describe("mergeFaq", () => {
  it("never downgrades an answered faq back to idea", () => {
    const existing = faq({ status: "answered" });
    const incoming = faq({
      status: "idea",
      url: null,
      source: "google-autocomplete",
    });
    expect(mergeFaq(existing, incoming).status).toBe("answered");
  });

  it("lets an idea faq be promoted", () => {
    const existing = faq({ status: "idea", url: null });
    const incoming = faq({
      status: "answered",
      url: "/blog/audio-visual-rental/",
    });
    const merged = mergeFaq(existing, incoming);
    expect(merged.status).toBe("answered");
    expect(merged.url).toBe("/blog/audio-visual-rental/");
  });

  it("returns the incoming faq unchanged when there is no existing entry", () => {
    const incoming = faq();
    expect(mergeFaq(undefined, incoming)).toEqual(incoming);
  });
});

// --- aiPrompts -----------------------------------------------------------------------------

function prompt(overrides: Partial<AiPromptEntry> = {}): AiPromptEntry {
  return {
    id: "prompt-1",
    prompt: "best audio visual rental in malaga",
    keywordId: "audio-visual-rental",
    cluster: "audio visual rental",
    url: null,
    status: "idea",
    reason: null,
    source: "ubersuggest-ai-prompt-ideas",
    visibility: null,
    firstSeen: "2026-09-29",
    ...overrides,
  };
}

describe("mergeAiPrompt", () => {
  it("replaces visibility with the freshest incoming snapshot", () => {
    const existing = prompt({
      visibility: {
        mentioned: false,
        position: null,
        brands: [],
        provider: "openai",
        asOf: "2026-09-01",
      },
    });
    const incoming = prompt({
      visibility: {
        mentioned: true,
        position: 2,
        brands: ["MEG"],
        provider: "openai",
        asOf: "2026-09-29",
      },
    });
    const merged = mergeAiPrompt(existing, incoming);
    expect(merged.visibility).toEqual({
      mentioned: true,
      position: 2,
      brands: ["MEG"],
      provider: "openai",
      asOf: "2026-09-29",
    });
  });

  it("keeps existing visibility when incoming has none", () => {
    const existing = prompt({
      visibility: {
        mentioned: true,
        position: 1,
        brands: ["MEG"],
        provider: "openai",
        asOf: "2026-09-01",
      },
    });
    const incoming = prompt({ visibility: null });
    expect(mergeAiPrompt(existing, incoming).visibility?.asOf).toBe(
      "2026-09-01",
    );
  });

  it("never downgrades status away from answered", () => {
    const existing = prompt({
      status: "answered",
      url: "/blog/audio-visual-rental/",
    });
    const incoming = prompt({ status: "idea", url: null });
    expect(mergeAiPrompt(existing, incoming).status).toBe("answered");
  });
});
