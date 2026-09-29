/**
 * normalize.ts: pure text helpers for keywords.json. No I/O, no Zod: safe to unit test with
 * tiny fixtures (plan section 4).
 */

/**
 * The stable `id` of a keyword: lowercase, accents kept (this is not a URL slug, "Málaga" stays
 * "málaga" so a human reading keywords.json still recognizes the word), punctuation dropped,
 * whitespace collapsed to single hyphens. Two phrases that only differ by case or spacing produce
 * the same id, which is what makes `merge.ts`'s upsert-by-id idempotent across sources.
 */
export function normalizeId(text: string): string {
	return toAscii(text)
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

/**
 * ASCII-only punctuation (CLAUDE.md rule 12). Applied to every piece of free text that enters
 * keywords.json from an external source (Google autocomplete, Ubersuggest, a batch file) before
 * it is written: those sources routinely return curly quotes, dashes and ellipses.
 */
export function toAscii(text: string): string {
	return text
		.replace(/[‘’]/g, "'")
		.replace(/[“”]/g, '"')
		.replace(/\s*—\s*/g, '-') // em dash
		.replace(/–/g, '-') // en dash (range or joiner)
		.replace(/…/g, '...')
		.replace(/ /g, ' ');
}
