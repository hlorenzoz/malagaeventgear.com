/**
 * sanitize.ts: final ASCII-punctuation pass over a whole `KeywordsFile` (CLAUDE.md rule 12).
 * Applied ONCE, in `sync.ts` and `ingest-ubersuggest.ts`, right before schema validation and the
 * write to disk, so no individual importer has to remember to call `toAscii()` on every
 * free-text field it produces. A source like Google autocomplete or GSC's export routinely
 * returns curly quotes, em dashes and ellipses. This is the one place that guarantees none of
 * them reach `keywords.json`.
 */

import { toAscii } from "./normalize";
import type { KeywordsFile } from "./schema";

function cleanNullable(text: string | null): string | null {
  return text === null ? null : toAscii(text);
}

export function sanitizeKeywordsFile(file: KeywordsFile): KeywordsFile {
  return {
    ...file,
    keywords: file.keywords.map((k) => ({
      ...k,
      keyword: toAscii(k.keyword),
      topic: cleanNullable(k.topic),
      reason: cleanNullable(k.reason),
      notes: toAscii(k.notes),
    })),
    faqs: file.faqs.map((f) => ({
      ...f,
      question: toAscii(f.question),
      reason: cleanNullable(f.reason),
    })),
    aiPrompts: file.aiPrompts.map((p) => ({
      ...p,
      prompt: toAscii(p.prompt),
      reason: cleanNullable(p.reason),
    })),
  };
}
