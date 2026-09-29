/**
 * seed-mappings.test.ts: the 8 mapped clusters and 8 deliberately-rejected clusters from
 * `.agents/context/keywords/keyword-silo-map.md` (plan, "Diseño" 2, `seed-mappings.ts` row),
 * transcribed as patterns. These tests pin the real phrases the map document names, so a future
 * edit to the source doc is caught here instead of silently drifting.
 */
import { describe, it, expect } from "vitest";
import {
  MAPPED_CLUSTERS,
  REJECTED_CLUSTERS,
  matchSeedMapping,
} from "./seed-mappings";

describe("seed-mappings data shape", () => {
  it("has exactly the 8 mapped clusters from keyword-silo-map.md", () => {
    expect(MAPPED_CLUSTERS).toHaveLength(8);
    expect(MAPPED_CLUSTERS.every((m) => m.status === "covered")).toBe(true);
    expect(
      MAPPED_CLUSTERS.every((m) => m.url && m.url.startsWith("/blog/")),
    ).toBe(true);
  });

  it("has exactly the 8 rejected clusters from keyword-silo-map.md", () => {
    expect(REJECTED_CLUSTERS).toHaveLength(8);
    expect(
      REJECTED_CLUSTERS.every((m) => m.status === "rejected" && !!m.reason),
    ).toBe(true);
  });
});

describe("matchSeedMapping", () => {
  it("maps a generic AV query to the audio-visual-rental pillar", () => {
    const m = matchSeedMapping("audio visual rental services");
    expect(m?.url).toBe("/blog/audio-visual-rental/");
    expect(m?.status).toBe("covered");
  });

  it("maps a sound query to sound-system-rental", () => {
    expect(matchSeedMapping("hire speakers for party")?.url).toBe(
      "/blog/sound-system-rental/",
    );
  });

  it("maps a screen query to tv-screen-rental", () => {
    expect(matchSeedMapping("rent tv screen")?.url).toBe(
      "/blog/tv-screen-rental/",
    );
  });

  it("maps a lighting query to stage-lighting-rental", () => {
    expect(matchSeedMapping("uplighting")?.url).toBe(
      "/blog/stage-lighting-rental/",
    );
  });

  it("maps a wedding AV query to wedding-rentals", () => {
    expect(matchSeedMapping("audiovisual wedding")?.url).toBe(
      "/blog/wedding-rentals/",
    );
  });

  it("maps a MICE query to event-technology-service", () => {
    expect(matchSeedMapping("mice events malaga")?.url).toBe(
      "/blog/event-technology-service/",
    );
  });

  it('rejects "spain wedding packages all inclusive" with the wedding-planner reason', () => {
    const m = matchSeedMapping("spain wedding packages all inclusive");
    expect(m?.status).toBe("rejected");
    expect(m?.reason).toBeTruthy();
  });

  it('rejects "gender reveal smoke machine" (pyrotechnics, not a glycol machine)', () => {
    expect(matchSeedMapping("gender reveal smoke machine")?.status).toBe(
      "rejected",
    );
  });

  it("rejects DJ equipment queries", () => {
    expect(matchSeedMapping("rent cdj 3000 near me")?.status).toBe("rejected");
  });

  it("returns null for a phrase matching neither list", () => {
    expect(matchSeedMapping("completely unrelated phrase xyz")).toBeNull();
  });

  it("checks rejected patterns before mapped ones (a rejection always wins)", () => {
    // "gender reveal smoke machine" contains "smoke machine", which is also part of the
    // legitimate smoke/fog cluster: the deliberate rejection must take priority.
    expect(matchSeedMapping("gender reveal smoke machine")?.status).toBe(
      "rejected",
    );
  });
});
