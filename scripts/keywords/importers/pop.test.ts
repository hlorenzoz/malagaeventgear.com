/**
 * pop.test.ts: unit tests for the POP CSV importer's pure transform. Reuses `parseCsvLine`,
 * `slugFromUrl` from scripts/backfill-silo-meta.ts (plan: "reuse, do not reimplement").
 */
import { describe, it, expect } from "vitest";
import { popRowsToKeywords, parsePopRows, type PopRow } from "./pop";

const TODAY = "2026-09-29";

function row(overrides: Partial<PopRow>): PopRow {
  return {
    type: "Supporting Keyword",
    status: "",
    topLevelKeyword: "audio visual rental",
    keyword: "comparison of av rental packages",
    keywordUrl: "https://malagaeventgear.com/comparison-of-av-rental-packages/",
    ...overrides,
  };
}

describe("popRowsToKeywords", () => {
  it("maps status published to published when the slug is a real post", () => {
    const realSlugs = new Set(["sound-system-rental"]);
    const [entry] = popRowsToKeywords(
      [
        row({
          status: "published",
          keyword: "sound system rental",
          keywordUrl: "https://malagaeventgear.com/sound-system-rental/",
        }),
      ],
      realSlugs,
      TODAY,
    );
    expect(entry.status).toBe("published");
    expect(entry.url).toBe("/blog/sound-system-rental/");
  });

  it("maps status scheduled to planned", () => {
    const [entry] = popRowsToKeywords(
      [row({ status: "scheduled" })],
      new Set(),
      TODAY,
    );
    expect(entry.status).toBe("planned");
  });

  it("maps status draft to draft", () => {
    const [entry] = popRowsToKeywords(
      [row({ status: "draft" })],
      new Set(),
      TODAY,
    );
    expect(entry.status).toBe("draft");
  });

  it("maps a blank status to idea", () => {
    const [entry] = popRowsToKeywords([row({ status: "" })], new Set(), TODAY);
    expect(entry.status).toBe("idea");
  });

  it("leaves url null when the slug does not match a real post", () => {
    const [entry] = popRowsToKeywords(
      [row({ status: "idea" })],
      new Set(),
      TODAY,
    );
    expect(entry.url).toBeNull();
  });

  it('downgrades a stale "published" row to idea when no matching post exists, and notes why', () => {
    const [entry] = popRowsToKeywords(
      [
        row({
          status: "published",
          keyword: "wedding linen rental services",
          keywordUrl:
            "https://malagaeventgear.com/wedding-linen-rental-services/",
        }),
      ],
      new Set(), // no real posts at all
      TODAY,
    );
    expect(entry.status).toBe("idea");
    expect(entry.url).toBeNull();
    expect(entry.notes).toMatch(/published.*no matching post/i);
  });

  it("sets cluster from the Top Level Keyword column for a supporting row", () => {
    const [entry] = popRowsToKeywords(
      [row({ topLevelKeyword: "wedding rentals" })],
      new Set(),
      TODAY,
    );
    expect(entry.cluster).toBe("wedding rentals");
  });

  it("sets cluster to itself for a Top-Level Keyword row", () => {
    const [entry] = popRowsToKeywords(
      [
        row({
          type: "Top-Level Keyword",
          keyword: "wedding rentals",
          topLevelKeyword: "wedding rentals",
        }),
      ],
      new Set(),
      TODAY,
    );
    expect(entry.cluster).toBe("wedding rentals");
  });

  it("tags the source as pop-csv", () => {
    const [entry] = popRowsToKeywords([row({})], new Set(), TODAY);
    expect(entry.sources).toEqual([{ name: "pop-csv", seen: TODAY }]);
  });
});

describe("parsePopRows", () => {
  it("parses only Supporting/Top-Level Keyword data rows, skipping header and blank lines", () => {
    const csv = [
      "Base domain,Top-Level Keyword,Top-level page link,,,,,,,,,",
      "https://malagaeventgear.com/,audio visual rental,https://malagaeventgear.com/audio-visual-rental/,,,,,,,,,",
      ",,,,,,,,,,,",
      "Type,Status,Publication date/time,Updated POP PageRun Score?,Indexed (GSC),Top Level Keyword,Keyword,Keyword URL,Top-level page link,Supporting-level page link 1,Supporting-level page link 2,Custom page link",
      "Supporting Keyword,published,,FALSE,FALSE,audio visual rental,sound system rental,https://malagaeventgear.com/sound-system-rental/,https://malagaeventgear.com/audio-visual-rental/,,,",
    ].join("\n");
    const rows = parsePopRows(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      type: "Supporting Keyword",
      status: "published",
      topLevelKeyword: "audio visual rental",
      keyword: "sound system rental",
      keywordUrl: "https://malagaeventgear.com/sound-system-rental/",
    });
  });
});
