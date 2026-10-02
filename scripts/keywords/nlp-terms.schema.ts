/**
 * nlp-terms.schema.ts: the file the `serp-term-researcher` agent writes to
 * `.agents/context/keywords/nlp-terms/YYYY-MM-DD-T####.json` (one per content task), and the
 * `post-writer` agent turns into natural vocabulary around the target keyword.
 *
 * The researcher reads competitor pages from the web, so this schema is also the barrier between
 * untrusted page text and the writer's prompt: terms are short, drawn from a closed character
 * set, never a URL, markup or a sentence, and never worded as an instruction. It is defense in
 * depth. The orchestrator still treats every term as data and `just nlp-terms-check` is what it
 * trusts, not the researcher's own report.
 */

import { z } from 'zod';

export const MAX_TERMS = 25;
const MAX_TERM_WORDS = 6;
const MAX_TERM_CHARS = 60;
const MAX_QUESTION_WORDS = 12;
const MAX_QUESTION_CHARS = 100;

/** Letters, digits, spaces and a few joiners. No `.`, `:`, `<`, `{`, backtick or `@`, so a URL,
 *  markup, a template token or a shell snippet cannot pass. */
const PLAIN_RE = /^[\p{L}\p{N}][\p{L}\p{N} '&/\-?]*$/u;

/** Words that only appear when a page tries to talk to an agent. A narrow list on purpose:
 *  `system` or `run` are real vocabulary here (sound system, run of show). */
const INSTRUCTION_RE = /\b(ignore|disregard|override|instructions?|prompts?|claude|assistant|bash|sudo|execute)\b/i;

const QUESTION_WORDS = new Set([
	'what',
	'how',
	'why',
	'when',
	'where',
	'which',
	'who',
	'can',
	'do',
	'does',
	'is',
	'are',
	'should',
	'will'
]);

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

const words = (s: string) => s.trim().split(/\s+/);

const plainText = (maxChars: number, maxWords: number) =>
	z
		.string()
		.trim()
		.min(2)
		.max(maxChars)
		.regex(PLAIN_RE, 'only letters, digits, spaces and \' & / - ?')
		.refine((s) => words(s).length <= maxWords, `at most ${maxWords} words`)
		.refine((s) => !INSTRUCTION_RE.test(s), 'reads as an instruction, not a term');

export const NlpTermKindSchema = z.enum(['entity', 'related', 'question']);
export type NlpTermKind = z.infer<typeof NlpTermKindSchema>;

export const NlpTermSchema = z
	.strictObject({
		term: z.string(),
		kind: NlpTermKindSchema,
		seenIn: z.number().int().min(1).max(3)
	})
	.superRefine((t, ctx) => {
		const rule =
			t.kind === 'question'
				? plainText(MAX_QUESTION_CHARS, MAX_QUESTION_WORDS)
				: plainText(MAX_TERM_CHARS, MAX_TERM_WORDS);
		const parsed = rule.safeParse(t.term);
		if (!parsed.success) {
			for (const issue of parsed.error.issues) {
				ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['term'], message: issue.message });
			}
		} else if (t.kind === 'question' && !QUESTION_WORDS.has(words(t.term)[0].toLowerCase())) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['term'],
				message: 'a question opens with a question word'
			});
		}
	});
export type NlpTerm = z.infer<typeof NlpTermSchema>;

const httpUrl = z
	.string()
	.max(300)
	.url()
	.refine((u) => /^https?:\/\//i.test(u), 'http or https only');

export const NlpTermsFileSchema = z
	.strictObject({
		date: dateOnly,
		taskId: z.string().regex(/^#T\d{4}$/, 'expected #Tnnnn'),
		slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase words joined by hyphens'),
		/** The post `keyword` together with the task heading or question. */
		searchTerm: z.string().trim().min(1).max(160),
		status: z.enum(['ok', 'partial', 'failed']),
		reason: z.string().max(300).optional(),
		serp: z.strictObject({
			query: z.string().trim().min(1).max(160),
			/** True only when the search tool really localized to English in Spain. Honest by default. */
			localized: z.boolean(),
			results: z
				.array(
					z.strictObject({
						rank: z.number().int().min(1).max(3),
						url: httpUrl,
						title: z.string().trim().max(160)
					})
				)
				.max(3)
		}),
		terms: z.array(NlpTermSchema).max(MAX_TERMS),
		discarded: z
			.array(z.strictObject({ term: plainText(MAX_TERM_CHARS, MAX_TERM_WORDS), reason: z.string().trim().min(1).max(160) }))
			.max(MAX_TERMS)
			.default([])
	})
	.superRefine((f, ctx) => {
		const issue = (path: (string | number)[], message: string) =>
			ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });

		if (f.status === 'ok') {
			if (f.terms.length === 0) issue(['terms'], 'status ok needs at least one term');
			if (f.serp.results.length === 0) issue(['serp', 'results'], 'status ok needs at least one result');
		} else if (!f.reason) {
			issue(['reason'], `status ${f.status} needs a reason`);
		}

		const seen = new Set<string>();
		f.terms.forEach((t, i) => {
			const key = t.term.trim().toLowerCase();
			if (seen.has(key)) issue(['terms', i, 'term'], `repeated term "${t.term}"`);
			seen.add(key);
			if (t.seenIn > f.serp.results.length) {
				issue(['terms', i, 'seenIn'], `seenIn ${t.seenIn} is more than the ${f.serp.results.length} results read`);
			}
		});
	});

export type NlpTermsFile = z.infer<typeof NlpTermsFileSchema>;
