import { describe, it, expect } from 'vitest';

/**
 * Guard for the special effects and lighting control facts in CLAUDE.md ("Inventario real de
 * equipamiento"): MEG owns ONE smoke machine (a Martin Magnum 650), no hazer, no low lying fog
 * machine, no confetti cannon, and its lighting runs on a foot pedal and manual aiming, never
 * DMX. English copy has claimed "smoke machines", "fog machines" and "DMX lighting cues" more
 * than once, so this test fails the suite the moment one of those claims comes back.
 *
 * Scope, English only (every translation is propagated from these sources):
 * - src/lib/i18n/messages/en.ts (UI dictionary)
 * - src/lib/data/*.ts except tests (catalog, FAQ and other data)
 * - src/routes/(public)/.../i18n/en.ts (page copy) and llms.txt
 * - src/content/blog/*.svx (English posts, translations live in subfolders)
 *
 * Files are read with import.meta.glob + ?raw, never node:fs (CLAUDE.md section 3).
 *
 * How a match is judged: the text is split into sentences, and a sentence that contains a
 * flagged term is allowed only when it is an honest negation or a question:
 * - it contains a negation word: no, not, never, nor, none, without, don't, doesn't, isn't,
 *   aren't, cannot, can't, rather than, instead of. For example "We do not stock hazers, low
 *   lying fog machines or confetti cannons" and "controlled by a foot pedal, not a DMX signal".
 * - or it ends with a question mark, because a question is not a claim. For example the FAQ
 *   heading "How many smoke machines do you have?".
 * - or it talks about what the reader or a search wants, not about what MEG stocks: it starts
 *   with "If" ("If your event genuinely needs automated, DMX driven lighting, we would rather
 *   say so now") or it is about a search ("A general search for stage lighting rental often
 *   implies DMX programmable fixtures").
 * Link targets and anchors (`](...)`) are removed first, so a slug like
 * `#is-your-stage-lighting-dmx-controlled` never counts as prose.
 *
 * If this test fails, rewrite the sentence so it is true (one smoke machine, foot pedal
 * lighting), or state the negation plainly. Do not add an allowlist.
 */

const sources = {
	...import.meta.glob('/src/lib/i18n/messages/en.ts', { query: '?raw', import: 'default', eager: true }),
	...import.meta.glob(['/src/lib/data/*.ts', '!/src/lib/data/*.test.ts'], {
		query: '?raw',
		import: 'default',
		eager: true
	}),
	...import.meta.glob('/src/routes/**/i18n/en.ts', { query: '?raw', import: 'default', eager: true }),
	...import.meta.glob('/src/routes/**/llms.txt/+server.ts', { query: '?raw', import: 'default', eager: true }),
	...import.meta.glob('/src/content/blog/*.svx', { query: '?raw', import: 'default', eager: true })
} as Record<string, string>;

/** Claims MEG cannot back with its real inventory. */
const FALSE_CLAIMS: { label: string; pattern: RegExp }[] = [
	{ label: 'more than one smoke or fog machine', pattern: /\b(smoke|fog|haze)(\s*(and|or|\/)\s*(smoke|fog|haze))?\s+machines\b/i },
	{ label: 'a hazer', pattern: /\bhazers?\b/i },
	{ label: 'a confetti cannon', pattern: /\bconfetti\s+(cannons?|launchers?|machines?|blasters?)\b/i },
	{ label: 'DMX control', pattern: /\bDMX\b/i }
];

const NEGATION =
	/\b(no|not|never|nor|none|without|don't|doesn't|isn't|aren't|cannot|can't|rather than|instead of)\b/i;

/** The reader's hypothetical need or a search's intent, not a claim about MEG's stock. */
const NOT_A_STOCK_CLAIM = /^if\b|\bsearch(es)?\b/i;

function sentences(text: string): string[] {
	return text
		.replace(/\]\([^)]*\)/g, ']')
		.split(/(?<=[.!?])\s+|\n+/)
		.map((sentence) => sentence.trim())
		.filter(Boolean);
}

function offendingSentences(text: string): string[] {
	return sentences(text).flatMap((sentence) => {
		if (sentence.endsWith('?') || NEGATION.test(sentence) || NOT_A_STOCK_CLAIM.test(sentence)) return [];
		return FALSE_CLAIMS.filter(({ pattern }) => pattern.test(sentence)).map(
			({ label }) => `${label}: "${sentence}"`
		);
	});
}

describe('no false special effects or DMX claims in English copy', () => {
	const paths = Object.keys(sources).sort();

	it('scans every English source group', () => {
		expect(paths.some((p) => p.endsWith('/messages/en.ts'))).toBe(true);
		expect(paths.some((p) => p.endsWith('/lib/data/faq.ts'))).toBe(true);
		expect(paths.some((p) => p.endsWith('/equipment/i18n/en.ts'))).toBe(true);
		expect(paths.some((p) => p.endsWith('/llms.txt/+server.ts'))).toBe(true);
		expect(paths.some((p) => p.endsWith('/blog/smoke-machine-rental.svx'))).toBe(true);
		expect(paths.some((p) => p.includes('.test.'))).toBe(false);
	});

	it.each(paths)('%s makes no false effects or DMX claim', (path) => {
		expect(offendingSentences(sources[path])).toEqual([]);
	});

	it('flags a claim and lets an honest negation or a question through', () => {
		expect(offendingSentences('We provide smoke machines and lighting.')).toHaveLength(1);
		expect(offendingSentences('Every DMX lighting cue fires as programmed.')).toHaveLength(1);
		expect(offendingSentences('Book our hazer for the stage.')).toHaveLength(1);
		expect(offendingSentences('We do not stock hazers or confetti cannons.')).toEqual([]);
		expect(offendingSentences('Controlled by a foot pedal, not a DMX signal.')).toEqual([]);
		expect(offendingSentences('How many smoke machines do you have?')).toEqual([]);
		expect(offendingSentences('If your event needs DMX driven lighting, tell us before you book.')).toEqual([]);
		expect(offendingSentences('See [the FAQ](#is-your-lighting-dmx-controlled) above.')).toEqual([]);
	});
});
