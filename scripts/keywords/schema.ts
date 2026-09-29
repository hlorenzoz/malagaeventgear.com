/**
 * schema.ts: Zod schema for the root `keywords.json` (plan:
 * ~/.claude/plans/lo-otro-necesito-hacer-delightful-bunny.md, section "Diseño" 1).
 *
 * Same pattern as `src/lib/data/packages.ts` / `src/lib/i18n/content-map/schema.ts`: one Zod
 * object per collection entry, validated end to end by `KeywordsFileSchema`. No script or agent
 * ever hand-edits `keywords.json`: every write goes through `sync.ts` / `ingest-ubersuggest.ts`,
 * which both parse their output through this schema before writing.
 */

import { z } from 'zod';

/** A plain YYYY-MM-DD date, never a full ISO timestamp: keywords.json only tracks days. */
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

/**
 * Keyword lifecycle. Mapped from each source's own vocabulary (see importers/*.ts):
 *   idea:      discovered, not evaluated
 *   planned:   a URL is decided, content not written yet
 *   draft:     content written, not published (draft: true in frontmatter)
 *   published: its own URL satisfies the intent (a live, non-draft post/page)
 *   covered:   another URL already satisfies it (a section, an FAQ, a sibling post)
 *   rejected:  deliberately not pursued (reason is mandatory)
 */
export const KeywordStatusSchema = z.enum([
	'idea',
	'planned',
	'draft',
	'published',
	'covered',
	'rejected'
]);
export type KeywordStatus = z.infer<typeof KeywordStatusSchema>;

/** Same lifecycle vocabulary as keywords, reused for faqs and aiPrompts (parity, not a copy). */
export const ContentStatusSchema = z.enum(['idea', 'planned', 'answered', 'rejected']);
export type ContentStatus = z.infer<typeof ContentStatusSchema>;

export const IntentSchema = z.enum([
	'informational',
	'commercial',
	'transactional',
	'navigational'
]);
export type Intent = z.infer<typeof IntentSchema>;

export const OpportunitySchema = z.enum(['high', 'medium', 'low']);
export type Opportunity = z.infer<typeof OpportunitySchema>;

/** A single dated metric value with its source. `difficulty` may ONLY come from ubersuggest
 *  (CLAUDE.md "Honestidad": no other source in this repo measures search difficulty). */
const metricValueSchema = z.object({
	value: z.number(),
	source: z.string().min(1),
	asOf: dateOnly
});

const gscMetricSchema = z.object({
	impressions: z.number(),
	clicks: z.number(),
	position: z.number(),
	asOf: dateOnly
});

const ubersuggestPositionSchema = z.object({
	position: z.number().nullable(),
	rankingUrl: z.string().nullable(),
	asOf: dateOnly
});

export const MetricsSchema = z.object({
	volume: metricValueSchema.nullable(),
	difficulty: metricValueSchema.nullable(),
	cpc: metricValueSchema.nullable(),
	gsc: gscMetricSchema.nullable(),
	ubersuggest: ubersuggestPositionSchema.nullable()
});
export type Metrics = z.infer<typeof MetricsSchema>;

const serpResearchSchema = z.object({
	localPack: z.boolean().optional(),
	aiOverview: z.boolean().optional(),
	top: z.array(z.string()).optional(),
	asOf: dateOnly
});

const contentIdeaSchema = z.object({
	url: z.string(),
	estVisits: z.number().nullable().optional()
});

export const ResearchSchema = z.object({
	serp: serpResearchSchema.optional(),
	contentIdeas: z.array(contentIdeaSchema).optional(),
	titleIdeas: z.array(z.string()).optional()
});
export type Research = z.infer<typeof ResearchSchema>;

const sourceRefSchema = z.object({
	name: z.string().min(1),
	seen: dateOnly
});
export type SourceRef = z.infer<typeof sourceRefSchema>;

/** One keyword entry. `.superRefine` enforces the cross-field honesty rules from the plan:
 *  a rejected entry must say why, a published entry must point somewhere real, and a difficulty
 *  score must be traceable to the one tool in this repo that measures it. */
export const KeywordEntrySchema = z
	.object({
		id: z.string().min(1),
		keyword: z.string().min(1),
		locale: z.string().min(2),
		cluster: z.string().min(1),
		topic: z.string().nullable(),
		intent: IntentSchema.nullable(),
		url: z.string().nullable(),
		status: KeywordStatusSchema,
		reason: z.string().nullable(),
		metrics: MetricsSchema,
		research: ResearchSchema.nullable(),
		opportunity: OpportunitySchema.nullable(),
		opportunityReason: z.string().nullable(),
		sources: z.array(sourceRefSchema),
		firstSeen: dateOnly,
		lastResearched: dateOnly.nullable(),
		notes: z.string()
	})
	.superRefine((entry, ctx) => {
		if (entry.status === 'rejected' && !entry.reason) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['reason'],
				message: 'status "rejected" requires a reason'
			});
		}
		if (entry.status === 'published' && !entry.url) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['url'],
				message: 'status "published" requires a url'
			});
		}
		if (entry.metrics.difficulty && entry.metrics.difficulty.source !== 'ubersuggest') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['metrics', 'difficulty', 'source'],
				message: 'difficulty may only be sourced from ubersuggest'
			});
		}
	});
export type KeywordEntry = z.infer<typeof KeywordEntrySchema>;

/** A FAQ question, satisfied (or not yet) by a URL. Same rejected/reason parity as keywords. */
export const FaqEntrySchema = z
	.object({
		id: z.string().min(1),
		question: z.string().min(1),
		keywordId: z.string().min(1),
		cluster: z.string().min(1),
		url: z.string().nullable(),
		status: ContentStatusSchema,
		reason: z.string().nullable(),
		source: z.string().min(1),
		firstSeen: dateOnly
	})
	.superRefine((entry, ctx) => {
		if (entry.status === 'rejected' && !entry.reason) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['reason'],
				message: 'status "rejected" requires a reason'
			});
		}
	});
export type FaqEntry = z.infer<typeof FaqEntrySchema>;

const visibilitySchema = z.object({
	mentioned: z.boolean(),
	position: z.number().nullable(),
	brands: z.array(z.string()),
	provider: z.string().nullable(),
	asOf: dateOnly
});

/** An "AI Prompt Idea" from Ubersuggest: what people ask an AI assistant about the keyword. */
export const AiPromptEntrySchema = z
	.object({
		id: z.string().min(1),
		prompt: z.string().min(1),
		keywordId: z.string().min(1),
		cluster: z.string().min(1),
		url: z.string().nullable(),
		status: ContentStatusSchema,
		reason: z.string().nullable(),
		source: z.string().min(1),
		visibility: visibilitySchema.nullable(),
		firstSeen: dateOnly
	})
	.superRefine((entry, ctx) => {
		if (entry.status === 'rejected' && !entry.reason) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['reason'],
				message: 'status "rejected" requires a reason'
			});
		}
	});
export type AiPromptEntry = z.infer<typeof AiPromptEntrySchema>;

/** Tracks the last run of the weekly/monthly Ubersuggest sections (see plan section 3), so a
 *  Mac that was asleep on Monday does not skip the week: ingest-ubersuggest.ts checks the date
 *  gap here rather than the day of the week. */
export const MetaSchema = z.object({
	lastWeeklyRun: dateOnly.nullable(),
	lastMonthlyRun: dateOnly.nullable()
});
export type KeywordsMeta = z.infer<typeof MetaSchema>;

function uniqueIds(label: string) {
	return (items: { id: string }[], ctx: z.RefinementCtx) => {
		const seen = new Set<string>();
		for (const item of items) {
			if (seen.has(item.id)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `duplicate ${label} id "${item.id}"`
				});
			}
			seen.add(item.id);
		}
	};
}

export const KeywordsFileSchema = z.object({
	version: z.literal(1),
	updated: dateOnly,
	meta: MetaSchema,
	keywords: z.array(KeywordEntrySchema).superRefine(uniqueIds('keyword')),
	faqs: z.array(FaqEntrySchema).superRefine(uniqueIds('faq')),
	aiPrompts: z.array(AiPromptEntrySchema).superRefine(uniqueIds('aiPrompt'))
});
export type KeywordsFile = z.infer<typeof KeywordsFileSchema>;
