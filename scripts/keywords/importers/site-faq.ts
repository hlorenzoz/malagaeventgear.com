/**
 * importers/site-faq.ts: FAQ entries from `src/lib/data/faq.ts` (plan, importers table row
 * "site-faq"): the 19 answered questions on the public /faq/ page.
 *
 * These items are not tied to a specific blog post/keyword the way post-faqs.json entries are,
 * so there is no natural `keywordId` to reuse. Decision (not specified by the plan): group them
 * under a synthetic `faq-<category>` keywordId and a shared `site-faq` cluster, using the same
 * category vocabulary as `FaqCategorySchema` (services/logistics/booking/contact). This keeps
 * every faqs.json row pointing at *some* keyword id without inventing a fake blog keyword.
 */

import type { FaqEntry } from "../schema";

export interface SiteFaqInput {
  id: string;
  category: string;
  question: string;
  answer: string;
}

/** Pure: no file I/O. */
export function siteFaqToFaqs(
  items: SiteFaqInput[],
  today: string,
): FaqEntry[] {
  return items.map((item) => ({
    id: item.id,
    question: item.question,
    keywordId: `faq-${item.category}`,
    cluster: "site-faq",
    url: "/faq/",
    status: "answered",
    reason: null,
    source: "site-faq",
    firstSeen: today,
  }));
}

/** Real read of the site FAQ catalog (a plain TS module import, not file parsing: faq.ts already
 *  exports its finished, token-rendered `faqs` array). */
export async function importSiteFaqs(today: string): Promise<FaqEntry[]> {
  const { faqs } = await import("../../../src/lib/data/faq");
  return siteFaqToFaqs(faqs, today);
}
