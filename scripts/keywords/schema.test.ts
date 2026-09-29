/**
 * Unit tests for the keywords.json Zod schema. Written before schema.ts exists (strict TDD):
 * this file must fail on first run because the import target is missing, then pass once
 * schema.ts is implemented.
 */
import { describe, it, expect } from "vitest";
import {
  KeywordsFileSchema,
  KeywordEntrySchema,
  FaqEntrySchema,
  AiPromptEntrySchema,
} from "./schema";

function baseKeyword(overrides: Partial<Record<string, unknown>> = {}) {
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

function baseFile(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    version: 1,
    updated: "2026-09-29",
    meta: { lastWeeklyRun: null, lastMonthlyRun: null },
    keywords: [],
    faqs: [],
    aiPrompts: [],
    ...overrides,
  };
}

describe("KeywordEntrySchema", () => {
  it("accepts a minimal valid published keyword", () => {
    expect(KeywordEntrySchema.safeParse(baseKeyword()).success).toBe(true);
  });

  it("rejects status=published without a url", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({ status: "published", url: null }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects status=rejected without a reason", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({ status: "rejected", reason: null, url: null }),
    );
    expect(result.success).toBe(false);
  });

  it("accepts status=rejected with a reason", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({ status: "rejected", reason: "no fit", url: null }),
    );
    expect(result.success).toBe(true);
  });

  it("rejects a difficulty metric whose source is not ubersuggest", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({
        metrics: {
          volume: null,
          difficulty: { value: 22, source: "google-ads", asOf: "2026-09-29" },
          cpc: null,
          gsc: null,
          ubersuggest: null,
        },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("accepts a difficulty metric sourced from ubersuggest", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({
        metrics: {
          volume: null,
          difficulty: { value: 22, source: "ubersuggest", asOf: "2026-09-29" },
          cpc: null,
          gsc: null,
          ubersuggest: null,
        },
      }),
    );
    expect(result.success).toBe(true);
  });

  it("rejects an unknown status", () => {
    const result = KeywordEntrySchema.safeParse(
      baseKeyword({ status: "bogus" }),
    );
    expect(result.success).toBe(false);
  });
});

describe("FaqEntrySchema", () => {
  function baseFaq(overrides: Partial<Record<string, unknown>> = {}) {
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

  it("accepts a minimal valid answered faq", () => {
    expect(FaqEntrySchema.safeParse(baseFaq()).success).toBe(true);
  });

  it("rejects status=rejected without a reason", () => {
    const result = FaqEntrySchema.safeParse(
      baseFaq({ status: "rejected", reason: null, url: null }),
    );
    expect(result.success).toBe(false);
  });
});

describe("AiPromptEntrySchema", () => {
  function basePrompt(overrides: Partial<Record<string, unknown>> = {}) {
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

  it("accepts a minimal valid idea prompt", () => {
    expect(AiPromptEntrySchema.safeParse(basePrompt()).success).toBe(true);
  });

  it("rejects status=rejected without a reason", () => {
    const result = AiPromptEntrySchema.safeParse(
      basePrompt({ status: "rejected", reason: null }),
    );
    expect(result.success).toBe(false);
  });
});

describe("KeywordsFileSchema", () => {
  it("accepts an empty but well formed file", () => {
    expect(KeywordsFileSchema.safeParse(baseFile()).success).toBe(true);
  });

  it("rejects duplicate keyword ids", () => {
    const result = KeywordsFileSchema.safeParse(
      baseFile({ keywords: [baseKeyword(), baseKeyword()] }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects duplicate faq ids", () => {
    const faq = {
      id: "faq-1",
      question: "q",
      keywordId: "audio-visual-rental",
      cluster: "audio visual rental",
      url: null,
      status: "idea",
      reason: null,
      source: "post",
      firstSeen: "2026-09-29",
    };
    const result = KeywordsFileSchema.safeParse(baseFile({ faqs: [faq, faq] }));
    expect(result.success).toBe(false);
  });

  it("rejects duplicate aiPrompt ids", () => {
    const prompt = {
      id: "p-1",
      prompt: "x",
      keywordId: "audio-visual-rental",
      cluster: "audio visual rental",
      url: null,
      status: "idea",
      reason: null,
      source: "ubersuggest-ai-prompt-ideas",
      visibility: null,
      firstSeen: "2026-09-29",
    };
    const result = KeywordsFileSchema.safeParse(
      baseFile({ aiPrompts: [prompt, prompt] }),
    );
    expect(result.success).toBe(false);
  });

  it("accepts a well formed non empty file", () => {
    const result = KeywordsFileSchema.safeParse(
      baseFile({ keywords: [baseKeyword()] }),
    );
    expect(result.success).toBe(true);
  });
});
