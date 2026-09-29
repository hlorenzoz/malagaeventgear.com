import { describe, it, expect } from "vitest";
import { pickNextSeeds, planRun } from "./next-seeds";
import type { KeywordEntry } from "./schema";

const TODAY = "2026-09-29";

function keyword(overrides: Partial<KeywordEntry> = {}): KeywordEntry {
  return {
    id: "x",
    keyword: "x",
    locale: "en",
    cluster: "c",
    topic: null,
    intent: null,
    url: null,
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
    sources: [],
    firstSeen: TODAY,
    lastResearched: null,
    notes: "",
    ...overrides,
  };
}

describe("pickNextSeeds", () => {
  it("only considers published or planned keywords", () => {
    const pool = [
      keyword({ id: "a", status: "idea" }),
      keyword({ id: "b", status: "rejected", reason: "x" }),
      keyword({ id: "c", status: "published", lastResearched: null }),
    ];
    const seeds = pickNextSeeds(pool, 3);
    expect(seeds.map((s) => s.id)).toEqual(["c"]);
  });

  it("never seeds from the news or standalone clusters (their keyword is a headline, not a search term)", () => {
    const pool = [
      keyword({ id: "news-headline", cluster: "news" }),
      keyword({ id: "standalone-essay", cluster: "standalone" }),
      keyword({ id: "real-term", cluster: "audio visual rental" }),
    ];
    expect(pickNextSeeds(pool, 3).map((s) => s.id)).toEqual(["real-term"]);
  });

  it("prefers a keyword that was never researched over one researched recently", () => {
    const pool = [
      keyword({
        id: "researched-recent",
        status: "published",
        lastResearched: "2026-09-28",
      }),
      keyword({
        id: "never-researched",
        status: "published",
        lastResearched: null,
      }),
    ];
    const seeds = pickNextSeeds(pool, 1);
    expect(seeds[0].id).toBe("never-researched");
  });

  it("prefers the oldest lastResearched date among researched keywords", () => {
    const pool = [
      keyword({
        id: "recent",
        status: "planned",
        lastResearched: "2026-09-28",
      }),
      keyword({ id: "old", status: "planned", lastResearched: "2026-08-01" }),
    ];
    const seeds = pickNextSeeds(pool, 1);
    expect(seeds[0].id).toBe("old");
  });

  it("rotates by cluster: does not pick two seeds from the same cluster before every cluster has one", () => {
    const pool = [
      keyword({
        id: "a1",
        status: "published",
        cluster: "A",
        lastResearched: null,
      }),
      keyword({
        id: "a2",
        status: "published",
        cluster: "A",
        lastResearched: null,
      }),
      keyword({
        id: "b1",
        status: "published",
        cluster: "B",
        lastResearched: null,
      }),
    ];
    const seeds = pickNextSeeds(pool, 2);
    const clusters = seeds.map((s) => s.cluster);
    expect(new Set(clusters).size).toBe(2); // one from A, one from B, not a1+a2
  });

  it("defaults to 3 seeds", () => {
    const pool = Array.from({ length: 5 }, (_, i) =>
      keyword({ id: `k${i}`, cluster: `c${i}` }),
    );
    expect(pickNextSeeds(pool)).toHaveLength(3);
  });

  it("returns fewer than n when the pool is smaller", () => {
    const pool = [keyword({ id: "only-one" })];
    expect(pickNextSeeds(pool, 3)).toHaveLength(1);
  });
});

describe("planRun", () => {
  it("runs the weekly and monthly sections on the first run ever", () => {
    expect(
      planRun({ lastWeeklyRun: null, lastMonthlyRun: null }, TODAY),
    ).toEqual({
      today: TODAY,
      weeklyDue: true,
      monthlyDue: true,
    });
  });

  it("runs the weekly sections only once 7 days have passed, whatever the weekday", () => {
    expect(
      planRun({ lastWeeklyRun: "2026-09-23", lastMonthlyRun: TODAY }, TODAY)
        .weeklyDue,
    ).toBe(false);
    expect(
      planRun({ lastWeeklyRun: "2026-09-22", lastMonthlyRun: TODAY }, TODAY)
        .weeklyDue,
    ).toBe(true);
  });

  it("runs the monthly section once per calendar month", () => {
    expect(
      planRun({ lastWeeklyRun: TODAY, lastMonthlyRun: "2026-09-01" }, TODAY)
        .monthlyDue,
    ).toBe(false);
    expect(
      planRun({ lastWeeklyRun: TODAY, lastMonthlyRun: "2026-08-31" }, TODAY)
        .monthlyDue,
    ).toBe(true);
  });
});
