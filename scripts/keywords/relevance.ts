/**
 * relevance.ts: drops out of market and no fit keyword suggestions before they ever reach
 * `keywords.json` (plan, "Filtro de relevancia"). Pure: takes the phrase and the real service
 * areas (`siteConfig.serviceAreas`, src/lib/data/site.ts), returns a verdict and, when rejected,
 * a reason for the raw batch log. Never called with a hardcoded copy of service areas:
 * `importers/*.ts` always pass the real array so a new service area is never silently dropped.
 *
 * Documented limit (plan): a plain "malaga" always passes even though Malaga, WA (Australia) and
 * Malaga, Colombia exist. This filter cannot resolve that ambiguity from the phrase alone, and
 * the plan accepts the false negative risk rather than reject a phrase that is overwhelmingly
 * about this business.
 */

export interface RelevanceResult {
  relevant: boolean;
  reason?: string;
}

// Real noise verified 2026-09-29 against Ubersuggest suggestions for "audio visual rental".
// Cities/regions/countries clearly outside Spain that the MCP's free-tier suggestions surfaced.
const OUT_OF_MARKET_PLACES = [
  "los angeles",
  "dubai",
  "calgary",
  "bangalore",
  "cape town",
  "gurgaon",
  "delhi",
  "penang",
  "texas",
  "san antonio",
  "atlanta",
  "jaipur",
  "ireland",
];

// Intents this business cannot fulfil regardless of place: employment, a business sale listing,
// or a tax/customs classification code. Matched as whole-word patterns so e.g. "salary" does not
// also reject a legitimate phrase that happens to contain a shared substring.
const NO_FIT_PATTERNS: RegExp[] = [
  /\bjobs?\b/,
  /\bsalary\b/,
  /\bfor sale\b/,
  /\bhsn code\b/,
  /\bnaics code\b/,
  /\bllc\b/,
];

function normalizeForMatch(phrase: string): string {
  return phrase.toLowerCase().trim();
}

/** True when `phrase` names a real MEG service area (case-insensitive substring match). */
function mentionsServiceArea(
  phrase: string,
  serviceAreas: readonly string[],
): boolean {
  return serviceAreas.some((area) => phrase.includes(area.toLowerCase()));
}

/**
 * Pure relevance check. `serviceAreas` should always be `siteConfig.serviceAreas` (never
 * hardcoded by a caller), so a new area added there is honored automatically.
 */
export function checkRelevance(
  phrase: string,
  serviceAreas: readonly string[],
): RelevanceResult {
  const normalized = normalizeForMatch(phrase);

  for (const pattern of NO_FIT_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        relevant: false,
        reason: `no-fit intent (matches ${pattern.source})`,
      };
    }
  }

  if (mentionsServiceArea(normalized, serviceAreas)) {
    return { relevant: true };
  }

  for (const place of OUT_OF_MARKET_PLACES) {
    if (normalized.includes(place)) {
      return {
        relevant: false,
        reason: `names an out-of-market place ("${place}")`,
      };
    }
  }

  return { relevant: true };
}
