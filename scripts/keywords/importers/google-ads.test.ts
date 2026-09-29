/**
 * google-ads.test.ts: unit tests for the pure transforms. Per the plan, the Google Ads /
 * Ubersuggest phrase lists were already audited and closed (engram: "Google Ads keyword audit
 * closed 2026-08-06", 0 new posts needed): a plain phrase enters as `covered` with `url: null`
 * and a note citing that audit, UNLESS merge.ts's identity lock protects an already-published
 * entry with the same id (tested in merge.test.ts, not re-tested here).
 */
import { describe, it, expect } from "vitest";
import {
  googleAdsPhrasesToKeywords,
  googleAdsVolumeRowsToKeywords,
} from "./google-ads";

const TODAY = "2026-09-29";
const serviceAreas = ["Malaga", "Marbella"];

describe("googleAdsPhrasesToKeywords", () => {
  it("marks a relevant phrase as covered, with the theme as topic and a citing note", () => {
    const [entry] = googleAdsPhrasesToKeywords(
      [{ topic: "Wedding", phrases: ["wedding party rentals"] }],
      serviceAreas,
      TODAY,
    );
    expect(entry.status).toBe("covered");
    expect(entry.url).toBeNull();
    expect(entry.topic).toBe("Wedding");
    expect(entry.notes).toMatch(/2026-08-06/);
  });

  it("rejects an out of market phrase via the relevance filter instead of marking it covered", () => {
    const [entry] = googleAdsPhrasesToKeywords(
      [{ topic: "Business & Company", phrases: ["av companies dubai"] }],
      serviceAreas,
      TODAY,
    );
    expect(entry.status).toBe("rejected");
  });

  it("tags the source as google-ads", () => {
    const [entry] = googleAdsPhrasesToKeywords(
      [{ topic: "Smoke", phrases: ["hire smoke machine"] }],
      serviceAreas,
      TODAY,
    );
    expect(entry.sources).toEqual([{ name: "google-ads", seen: TODAY }]);
  });
});

describe("googleAdsVolumeRowsToKeywords", () => {
  it("attaches the bucketed volume with source google-ads and asOf 2025-09-01", () => {
    const [entry] = googleAdsVolumeRowsToKeywords(
      [{ keyword: "wedding rentals", volume: 50000 }],
      serviceAreas,
      TODAY,
    );
    expect(entry.metrics.volume).toEqual({
      value: 50000,
      source: "google-ads",
      asOf: "2025-09-01",
    });
    expect(entry.status).toBe("covered");
  });

  it("rejects an out of market keyword before attaching volume", () => {
    const [entry] = googleAdsVolumeRowsToKeywords(
      [{ keyword: "event rentals texas", volume: 500 }],
      serviceAreas,
      TODAY,
    );
    expect(entry.status).toBe("rejected");
  });
});
