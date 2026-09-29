/**
 * seed-mappings.ts: the 8 clusters mapped to a silo and the 8 clusters deliberately NOT
 * pursued, transcribed from `.agents/context/keywords/keyword-silo-map.md` (2026-09-24 GSC
 * export analysis) as substring patterns (plan, "Diseño" 2). Used by the GSC importer to assign
 * cluster/url to a raw Search Console query without re-deriving the analysis that document
 * already did.
 *
 * A phrase that matches neither list is NOT silently dropped: it stays `idea`/`unassigned` so a
 * human decides later (plan: "Lo que no matchea queda en idea/unassigned").
 */

export interface SeedMapping {
  cluster: string;
  url: string | null;
  /** Case-insensitive substrings. Any one match is enough. */
  patterns: string[];
  status: "covered" | "rejected";
  reason?: string;
}

/** The 8 rows of "Clusters mapeados a un silo" in keyword-silo-map.md. */
export const MAPPED_CLUSTERS: SeedMapping[] = [
  {
    cluster: "audio visual rental",
    url: "/blog/audio-visual-rental/",
    patterns: [
      "audio visual rental services",
      "av equipment hire",
      "audiovisual services for events",
    ],
    status: "covered",
  },
  {
    cluster: "audio visual rental",
    url: "/blog/sound-system-rental/",
    patterns: [
      "sound equipment rental",
      "speaker and microphone rental",
      "hire speakers for party",
    ],
    status: "covered",
  },
  {
    cluster: "audio visual rental",
    url: "/blog/tv-screen-rental/",
    patterns: [
      "rent tv screen",
      "tv screen hire",
      "55 inch screen hire",
      "hire tv screens for exhibitions",
    ],
    status: "covered",
  },
  {
    cluster: "stage lighting equipment supplier",
    url: "/blog/stage-lighting-rental/",
    patterns: [
      "stage lighting",
      "uplighting",
      "rent lighting equipment near me",
    ],
    status: "covered",
  },
  {
    // No queries in the 2026-09-23 GSC export (0 impressions). Demand comes from the Google
    // Ads CSVs instead (keyword-silo-map.md: "Demanda viene del CSV de Google Ads, NO de GSC").
    // Patterns here are the generic smoke/fog phrases the post itself targets, deliberately
    // excluding "gender reveal" (that exact phrase is a rejected cluster below: colored smoke
    // is pyrotechnics, not the glycol machine MEG stocks).
    cluster: "stage lighting equipment supplier",
    url: "/blog/smoke-machine-rental/",
    patterns: [
      "smoke machine hire",
      "hire smoke machine",
      "fog machine rental",
      "smoke machine rental",
    ],
    status: "covered",
  },
  {
    cluster: "wedding rentals",
    url: "/blog/wedding-rentals/",
    patterns: [
      "wedding rental trends",
      "how to find wedding rentals",
      "audiovisual wedding",
    ],
    status: "covered",
  },
  {
    cluster: "event technology service",
    url: "/blog/event-technology-service/",
    patterns: ["mice events malaga", "event av spain"],
    status: "covered",
  },
  {
    // "Sin consultas propias" in the source doc: no example query has its own impressions yet.
    // Patterns are inferred from the post's own topic (trade shows/exhibition stands), not
    // copied from an observed query: documented as an explicit decision (no GSC evidence).
    cluster: "audio visual rental",
    url: "/blog/audio-visual-rental-for-trade-shows/",
    patterns: [
      "trade show av rental",
      "exhibition stand av",
      "av rental for trade show",
    ],
    status: "covered",
  },
];

/** The 8 rows of "Clusters deliberadamente NO perseguidos" in keyword-silo-map.md. */
export const REJECTED_CLUSTERS: SeedMapping[] = [
  {
    cluster: "wedding rentals",
    url: null,
    patterns: [
      "spain wedding packages all inclusive",
      "spain wedding packages",
      "wedding packages spain",
      "spanish wedding packages",
    ],
    status: "rejected",
    reason:
      "Wedding-planner intent (venue, catering, photographer), not AV rental. MEG rents audiovisual equipment, not full wedding planning.",
  },
  {
    cluster: "wedding rentals",
    url: null,
    patterns: ["all inclusive barcelona wedding packages"],
    status: "rejected",
    reason: "Barcelona. MEG operates in Malaga and Granada, not Barcelona.",
  },
  {
    cluster: "wedding rentals",
    url: null,
    patterns: ["hiring tents for weddings"],
    status: "rejected",
    reason:
      "No tents in the real inventory (Equipamiento.csv). No honest angle to write this.",
  },
  {
    cluster: "wedding rentals",
    url: null,
    patterns: ["alquiler mobiliario bodas malaga"],
    status: "rejected",
    reason:
      "Furniture rental. No tables, chairs or linens in the real inventory.",
  },
  {
    cluster: "audio visual rental",
    url: null,
    patterns: ["alquiler pantalla led en feria malaga"],
    status: "rejected",
    reason:
      "LED video wall. MEG has one 60-inch flat panel, not a modular tiled wall.",
  },
  {
    cluster: "stage lighting equipment supplier",
    url: null,
    patterns: ["gender reveal smoke machine"],
    status: "rejected",
    reason:
      "Colored smoke for a gender reveal is pyrotechnics, not the glycol smoke machine MEG stocks.",
  },
  {
    cluster: "unassigned",
    url: null,
    patterns: [
      "eventraciones malaga",
      "dispositivos espectaculos andalucia",
      "10 juin 2027",
      "in arabic",
    ],
    status: "rejected",
    reason: 'Noise. "eventracion" is a medical term (hernia), not events.',
  },
  {
    cluster: "unassigned",
    url: null,
    patterns: [
      "rent cdj 3000 near me",
      "base dj malaga",
      "dj equipment near me",
    ],
    status: "rejected",
    reason:
      "DJ equipment. Not in the real inventory (the Eco Pack DJ brings their own gear).",
  },
];

/**
 * Returns the first matching mapping, rejected patterns checked before mapped ones (a deliberate
 * rejection always wins over a broader coverage pattern it happens to overlap with, e.g. "gender
 * reveal smoke machine" contains "smoke machine"). `null` when nothing matches.
 */
export function matchSeedMapping(phrase: string): SeedMapping | null {
  const normalized = phrase.toLowerCase();
  for (const mapping of REJECTED_CLUSTERS) {
    if (mapping.patterns.some((p) => normalized.includes(p))) return mapping;
  }
  for (const mapping of MAPPED_CLUSTERS) {
    if (mapping.patterns.some((p) => normalized.includes(p))) return mapping;
  }
  return null;
}
