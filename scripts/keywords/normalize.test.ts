import { describe, it, expect } from "vitest";
import { normalizeId, toAscii } from "./normalize";

describe("normalizeId", () => {
  it("lowercases and hyphenates a plain phrase", () => {
    expect(normalizeId("Audio Visual Rental")).toBe("audio-visual-rental");
  });

  it("collapses repeated whitespace before hyphenating", () => {
    expect(normalizeId("audio   visual  rental")).toBe("audio-visual-rental");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeId("  audio visual rental  ")).toBe("audio-visual-rental");
  });

  it("strips punctuation that is not a letter, digit or space", () => {
    expect(normalizeId("audio visual rental: what's included?")).toBe(
      "audio-visual-rental-whats-included",
    );
  });

  it("keeps accented letters (Malaga, not ASCII-folded)", () => {
    expect(normalizeId("sonido Málaga")).toBe("sonido-málaga");
  });

  it("is stable for two phrases that only differ by case and spacing", () => {
    expect(normalizeId("Sound System Rental")).toBe(
      normalizeId("sound   system rental"),
    );
  });
});

describe("toAscii", () => {
  it("replaces curly single quotes with a straight quote", () => {
    expect(toAscii("what’s included")).toBe("what's included");
  });

  it("replaces curly double quotes with straight quotes", () => {
    expect(toAscii("“hello”")).toBe('"hello"');
  });

  it("replaces an em dash with a comma like pause (space-hyphen-space becomes plain hyphen)", () => {
    expect(toAscii("audio—visual")).toBe("audio-visual");
  });

  it('replaces an en dash used as a range with "to"', () => {
    expect(toAscii("8–30")).toBe("8-30");
  });

  it("collapses an ellipsis character to three dots", () => {
    expect(toAscii("rental…")).toBe("rental...");
  });

  it("replaces a non-breaking space with a normal space", () => {
    expect(toAscii("audio visual")).toBe("audio visual");
  });

  it("leaves plain ASCII untouched", () => {
    expect(toAscii("sound system rental")).toBe("sound system rental");
  });
});
