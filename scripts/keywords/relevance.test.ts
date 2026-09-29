/**
 * relevance.ts unit tests. Fixtures are the REAL noise/signal examples verified in the plan
 * (2026-09-29 Ubersuggest suggestions for "audio visual rental"), not invented ones.
 */
import { describe, it, expect } from "vitest";
import { checkRelevance } from "./relevance";

const serviceAreas = [
  "Malaga",
  "Marbella",
  "Costa del Sol",
  "Sevilla",
  "Granada",
];

describe("checkRelevance: passes generic and in region phrases", () => {
  it("passes a generic phrase with no place name", () => {
    expect(
      checkRelevance("audio visual rental near me", serviceAreas).relevant,
    ).toBe(true);
  });

  it("passes a generic cost/comparison phrase", () => {
    expect(
      checkRelevance("audio visual rental cost", serviceAreas).relevant,
    ).toBe(true);
  });

  it("passes a phrase naming a real service area", () => {
    expect(
      checkRelevance("sound system hire marbella", serviceAreas).relevant,
    ).toBe(true);
  });

  it('passes plain "malaga" even though Malaga WA and Malaga Colombia exist (documented limit)', () => {
    expect(
      checkRelevance("audio visual rental malaga", serviceAreas).relevant,
    ).toBe(true);
  });
});

describe("checkRelevance: drops out of market cities and countries", () => {
  const outOfMarket = [
    "audio visual rental los angeles",
    "audio visual rental in dubai",
    "audio visual rental calgary",
    "audio visual rental in bangalore",
    "audio visual rental cape town",
    "audio visual rental gurgaon",
    "audio visual rental in delhi",
    "audio visual rental penang",
    "audio visual rental texas",
    "audio visual rental san antonio",
    "audio visual rental atlanta",
    "audio visual rental jaipur",
    "audio visual rental ireland",
  ];

  it.each(outOfMarket)('rejects "%s" with a reason', (phrase) => {
    const result = checkRelevance(phrase, serviceAreas);
    expect(result.relevant).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});

describe("checkRelevance: drops no-fit intents", () => {
  const noFit = [
    "naics code for audio visual rental",
    "audio visual rental hsn code",
    "audio visual rental business for sale",
    "abacus audio visual rental llc",
    "audio visual rental jobs",
    "audio visual technician salary",
  ];

  it.each(noFit)('rejects "%s" with a reason', (phrase) => {
    const result = checkRelevance(phrase, serviceAreas);
    expect(result.relevant).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});
