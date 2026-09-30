/**
 * batch.schema.ts: Zod schema for the daily Ubersuggest batch file, written by the
 * ubersuggest-analyst agent to `.agents/context/keywords/ubersuggest/YYYY-MM-DD.json` (plan,
 * "Diseño" 3b, 3b table row "Las mutaciones van por scripts deterministas"). The agent NEVER
 * touches `keywords.json` directly: it produces one of these, and `ingest-ubersuggest.ts`
 * validates it through this schema before merging anything in. If a batch fails this schema,
 * `ingest` exits non-zero and nothing is written or committed.
 */

import { z } from 'zod';

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

const metricValue = z.object({
	value: z.number(),
	source: z.string().min(1),
	asOf: dateOnly
});

const batchMetrics = z
	.object({
		volume: metricValue.nullable(),
		difficulty: metricValue.nullable(),
		cpc: metricValue.nullable()
	})
	.partial();

const batchSerp = z.object({
	localPack: z.boolean().optional(),
	aiOverview: z.boolean().optional(),
	top: z.array(z.string()).optional(),
	asOf: dateOnly
});

const batchContentIdea = z.object({
	url: z.string(),
	estVisits: z.number().nullable().optional()
});

const batchResearch = z
	.object({
		serp: batchSerp.optional(),
		contentIdeas: z.array(batchContentIdea).optional(),
		titleIdeas: z.array(z.string()).optional()
	})
	.partial();

const batchVisibility = z.object({
	mentioned: z.boolean(),
	/** True when Ubersuggest actually ran the prompt (brand_prompts `total_answers` > 0). A prompt
	 *  with 0 answers is "not evaluated", never "we do not appear". */
	evaluated: z.boolean().optional(),
	position: z.number().nullable().optional(),
	brands: z.array(z.string()).optional(),
	provider: z.string().nullable().optional(),
	asOf: dateOnly
});

/** A candidate keyword the agent found today (Keyword Ideas, Google Suggestions, Domain
 *  Keywords, Rank Tracking, SEO Opportunities). `cluster`/`intent` are the agent's best guess,
 *  never authoritative: `ingest-ubersuggest.ts` runs `relevance.ts`/`seed-mappings.ts` and
 *  `merge.ts`'s identity lock the same way every other source does. */
export const BatchKeywordSchema = z.object({
	keyword: z.string().min(1),
	cluster: z.string().min(1).nullable().optional(),
	intent: z
		.enum(['informational', 'commercial', 'transactional', 'navigational'])
		.nullable()
		.optional(),
	metrics: batchMetrics.optional(),
	source: z.string().min(1)
});

/** A phrase from Google Suggestions that IS a question (who/what/how/why/can/is/does/where/when/
 *  which, plan section 3): always `source: 'google-autocomplete'`, never labeled PAA. */
export const BatchFaqSchema = z.object({
	question: z.string().min(1),
	keyword: z.string().min(1).nullable().optional(),
	source: z.literal('google-autocomplete')
});

/** An "AI Prompt Idea" (industry_prompts) or an already-tracked AI Visibility prompt
 *  (brand_prompts). */
export const BatchAiPromptSchema = z.object({
	prompt: z.string().min(1),
	keyword: z.string().min(1).nullable().optional(),
	source: z.enum(['ubersuggest-ai-prompt-ideas', 'ubersuggest-brand']),
	visibility: batchVisibility.nullable().optional()
});

/** A phrase dropped by `relevance.ts` before it ever reached `keywords`/`faqs`/`aiPrompts`,
 *  kept here, in the raw batch, for audit. Never written to keywords.json (plan: "Lo descartado
 *  queda en el lote crudo con su motivo, nunca en keywords.json"). */
export const BatchDiscardedSchema = z.object({
	text: z.string().min(1),
	reason: z.string().min(1)
});

export const BatchRankSchema = z.object({
	keyword: z.string().min(1),
	position: z.number().nullable(),
	/** Position in the previous report, when the tool gives it. */
	previousPosition: z.number().nullable().optional(),
	rankingUrl: z.string().nullable(),
	asOf: dateOnly
});

/** One MCP call the agent made today, logged for audit (never raw secrets/tokens in `args`). */
export const BatchCallSchema = z.object({
	tool: z.string().min(1),
	args: z.string().optional(),
	outcome: z.enum(['ok', 'empty', 'failed', 'quota']).optional()
});

/** A step the agent chose not to run today (e.g. quota exhausted), and why: the agent logs this
 *  instead of silently doing nothing (plan: "Contexto headless explicito"). */
export const BatchSkippedSchema = z.object({
	step: z.string().min(1),
	reason: z.string().min(1)
});

export const BatchRunSchema = z.object({
	status: z.enum(['ok', 'partial', 'aborted']),
	reason: z.string().optional(),
	quotaBefore: z.record(z.string(), z.number()).optional(),
	quotaAfter: z.record(z.string(), z.number()).optional(),
	calls: z.array(BatchCallSchema).default([]),
	skipped: z.array(BatchSkippedSchema).default([]),
	/** Set true the day this run also executed the weekly (Monday-cadence) Ubersuggest sections
	 *  (Domain Keywords, Rank Tracking, SEO Opportunities, AI Search Visibility): see plan
	 *  section 3. `ingest-ubersuggest.ts` bumps `keywords.json`'s `meta.lastWeeklyRun` from this,
	 *  so a Mac asleep on Monday does not silently skip the week. */
	weeklyRun: z.boolean().optional(),
	/** Same idea for the monthly `keyword_metrics` (SD/intent) section. */
	monthlyRun: z.boolean().optional()
});

export const REPORT_KINDS = [
	'seo-opportunities',
	'ai-visibility',
	'domain-keywords',
	'competitor-keywords',
	'rank-tracking',
	'backlinks',
	'top-pages'
] as const;
export type ReportKind = (typeof REPORT_KINDS)[number];

/** One SEO Opportunities finding, copied as-is from `seo_opportunities` (the agent never words it). */
export const BatchSeoFindingSchema = z.object({
	type: z.string().min(1),
	subtype: z.string().min(1),
	keyword: z.string().min(1).optional(),
	count: z.number().optional(),
	impact: z.string().optional(),
	effort: z.string().optional()
});

/** A generic row for report kinds that have no measured shape yet. */
export const BatchReportRowSchema = z.object({
	label: z.string().min(1),
	values: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
});

/** The report of the day (rotation, see `report-of-day.ts`): copied data, never findings or tasks. */
export const BatchReportSchema = z.object({
	kind: z.enum(REPORT_KINDS),
	status: z.enum(['ok', 'partial', 'failed']),
	reason: z.string().optional(),
	summary: z.array(z.string()).default([]),
	metrics: z.record(z.string(), z.number()).default({}),
	seoCounts: z.record(z.string(), z.number()).default({}),
	seo: z.array(BatchSeoFindingSchema).default([]),
	rows: z.array(BatchReportRowSchema).default([])
});

export const KeywordBatchSchema = z.object({
	date: dateOnly,
	run: BatchRunSchema,
	keywords: z.array(BatchKeywordSchema).default([]),
	faqs: z.array(BatchFaqSchema).default([]),
	aiPrompts: z.array(BatchAiPromptSchema).default([]),
	/** Research (SERP/content ideas/title ideas) keyed by the keyword text it was gathered for. */
	research: z.record(z.string(), batchResearch).default({}),
	rank: z.array(BatchRankSchema).default([]),
	discarded: z.array(BatchDiscardedSchema).default([]),
	report: BatchReportSchema.optional()
});

export type KeywordBatch = z.infer<typeof KeywordBatchSchema>;
