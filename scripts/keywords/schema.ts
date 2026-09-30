/**
 * schema.ts: Zod schema for `.agents/data/keywords.json` (2026-09-29 sources-per-source redesign,
 * replacing the earlier flat `metrics` + `sources: SourceRef[]` shape).
 *
 * Same pattern as `src/lib/data/packages.ts` / `src/lib/i18n/content-map/schema.ts`: one Zod
 * object per collection entry, validated end to end by `KeywordsFileSchema`. No script or agent
 * ever hand-edits `keywords.json`: every write goes through `sync.ts` / `ingest-ubersuggest.ts`,
 * which both parse their output through this schema before writing.
 *
 * A keyword's `sources` is ONE record keyed by source, never an array: a keyword seen by three
 * sources has exactly one entry per source, and re-ingesting the same source updates only its own
 * key. `difficulty` may ONLY ever appear inside `sources.ubersuggest.stats` (no other source in
 * this repo measures search difficulty, CLAUDE.md "Honestidad"), a structural guarantee: no other
 * source's stats schema even has a `difficulty` field.
 *
 * No metric value ever lives outside `sources` (user decision, 2026-09-29): there is no top level
 * `metrics` and no derived top level `summary` either. A content writer (or `score.ts`) reads
 * volume/difficulty/cpc straight from the source that measured them, e.g.
 * `sources.ubersuggest.stats.volume` or `sources['google-ads'].stats.avgMonthlySearches`. Only
 * `opportunity`/`opportunityReason` stay at the top level, computed by `score.ts` from `sources`.
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

// --- per-source stats shapes -----------------------------------------------------------------

/** "1 September 2025" / "31 August 2026" collapsed to their YYYY-MM. */
const monthPeriodSchema = z.object({ from: z.string(), to: z.string() });

/** One Google Ads "Keyword Stats" export row. Every field nullable except `asOf`: the plain
 *  2-column legacy export (2025-09-01, `Keyword,Avg. monthly searches`) only ever fills
 *  `avgMonthlySearches`, everything else stays null on that row, never a fabricated 0. */
export const GoogleAdsStatsSchema = z.object({
	asOf: dateOnly,
	period: monthPeriodSchema.nullable(),
	currency: z.string().nullable(),
	avgMonthlySearches: z.number().nullable(),
	threeMonthChange: z.number().nullable(),
	yoyChange: z.number().nullable(),
	/** "Medium"/"Low"/"Unknown"/... — Google Ads PAID competition, never SEO difficulty. */
	competition: z.string().nullable(),
	competitionIndex: z.number().nullable(),
	topOfPageBidLow: z.number().nullable(),
	topOfPageBidHigh: z.number().nullable(),
	adImpressionShare: z.number().nullable(),
	organicImpressionShare: z.number().nullable(),
	organicAveragePosition: z.number().nullable(),
	/** "YYYY-MM" -> searches. Only the months the export actually reported, never a filled-in 0. */
	monthlySearches: z.record(z.string(), z.number())
});
export type GoogleAdsStats = z.infer<typeof GoogleAdsStatsSchema>;

/** One row of the most recent GSC "Consultas.csv" export. */
export const GoogleSearchConsoleStatsSchema = z.object({
	asOf: dateOnly,
	impressions: z.number(),
	clicks: z.number(),
	ctr: z.number(),
	position: z.number()
});
export type GoogleSearchConsoleStats = z.infer<typeof GoogleSearchConsoleStatsSchema>;

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

/** Everything Ubersuggest can return for one keyword, across every MCP section (`via` says
 *  which). All optional/nullable: a batch only ever fills what that day's calls returned. */
export const UbersuggestStatsSchema = z.object({
	asOf: dateOnly,
	locId: z.number().nullable().optional(),
	volume: z.number().nullable().optional(),
	difficulty: z.number().nullable().optional(),
	paidDifficulty: z.number().nullable().optional(),
	cpc: z.number().nullable().optional(),
	position: z.number().nullable().optional(),
	rankingUrl: z.string().nullable().optional(),
	serp: serpResearchSchema.optional(),
	contentIdeas: z.array(contentIdeaSchema).optional(),
	titleIdeas: z.array(z.string()).optional()
});
export type UbersuggestStats = z.infer<typeof UbersuggestStatsSchema>;

// --- per-source entry shapes -------------------------------------------------------------------

const googleAdsSourceSchema = z.object({
	firstSeen: dateOnly,
	lastSeen: dateOnly,
	/** null when this source only ever listed the phrase (the audited theme lists), never
	 *  fabricated stats. */
	stats: GoogleAdsStatsSchema.nullable()
});
export type GoogleAdsSource = z.infer<typeof googleAdsSourceSchema>;

const gscSourceSchema = z.object({
	firstSeen: dateOnly,
	lastSeen: dateOnly,
	stats: GoogleSearchConsoleStatsSchema.nullable()
});
export type GoogleSearchConsoleSource = z.infer<typeof gscSourceSchema>;

/** `via` names which Ubersuggest MCP section(s) contributed, e.g. "suggestions", "domain",
 *  "project", "seo-opportunities", "csv", "competitor:avhirespain.com". */
const ubersuggestSourceSchema = z.object({
	firstSeen: dateOnly,
	lastSeen: dateOnly,
	via: z.array(z.string()).default([]),
	stats: UbersuggestStatsSchema.nullable()
});
export type UbersuggestSource = z.infer<typeof ubersuggestSourceSchema>;

/** The daily content plan (`plan.schema.ts`) that looked at this keyword: what the content
 *  strategist decided (`action`), where (`targetUrl`) and how urgent. Latest plan wins. It never
 *  moves the keyword's status: that stays with `sync.ts`/`merge.ts`. */
const contentPlanSourceSchema = z.object({
	firstSeen: dateOnly,
	lastSeen: dateOnly,
	stats: z
		.object({
			asOf: dateOnly,
			action: z.enum(['add-section', 'new-post', 'add-faq', 'skip']),
			targetUrl: z.string().nullable(),
			priority: OpportunitySchema
		})
		.nullable()
});
export type ContentPlanSource = z.infer<typeof contentPlanSourceSchema>;

/** blog / pop / gbp / research / google-autocomplete: no numeric stats of their own, just "this
 *  source has seen this keyword, between these dates". */
const simpleSourceSchema = z.object({
	firstSeen: dateOnly,
	lastSeen: dateOnly
});
export type SimpleSource = z.infer<typeof simpleSourceSchema>;

export const SourcesSchema = z.object({
	'google-ads': googleAdsSourceSchema.optional(),
	'google-search-console': gscSourceSchema.optional(),
	ubersuggest: ubersuggestSourceSchema.optional(),
	'google-autocomplete': simpleSourceSchema.optional(),
	blog: simpleSourceSchema.optional(),
	pop: simpleSourceSchema.optional(),
	gbp: simpleSourceSchema.optional(),
	research: simpleSourceSchema.optional(),
	'content-plan': contentPlanSourceSchema.optional()
});
export type Sources = z.infer<typeof SourcesSchema>;
export type SourceKey = keyof Sources;

export const SOURCE_KEYS: SourceKey[] = [
	'google-ads',
	'google-search-console',
	'ubersuggest',
	'google-autocomplete',
	'blog',
	'pop',
	'gbp',
	'research',
	'content-plan'
];

/** One keyword entry. `.superRefine` enforces the cross-field honesty rules: a rejected entry
 *  must say why, and a published entry must point somewhere real. No check is needed for
 *  difficulty's provenance: only `UbersuggestStatsSchema` has a `difficulty` field at all, so
 *  `sources.ubersuggest.stats` is the only place it could ever come from, by construction. */
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
		sources: SourcesSchema,
		opportunity: OpportunitySchema.nullable(),
		opportunityReason: z.string().nullable(),
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
	});
export type KeywordEntry = z.infer<typeof KeywordEntrySchema>;

const faqSourceBase = z.object({ firstSeen: dateOnly, lastSeen: dateOnly });

/** Where a FAQ question was seen, one record per source (2026-09-30, same idea as the keywords'
 *  `sources`): a question a post answers and Google also suggests is ONE entry with two keys. */
export const FaqSourcesSchema = z.strictObject({
	/** Google autocomplete suggested it. `seeds` are the ids of the keywords searched. */
	'google-autocomplete': faqSourceBase.extend({ seeds: z.array(z.string()) }).optional(),
	/** Ubersuggest measured the question as a keyword (never invented: no reading, no key). */
	ubersuggest: faqSourceBase
		.extend({
			stats: z
				.object({
					asOf: dateOnly,
					volume: z.number().nullable(),
					difficulty: z.number().nullable(),
					cpc: z.number().nullable()
				})
				.nullable()
		})
		.optional(),
	/** A blog post answers it, `urls` are the posts. */
	post: faqSourceBase.extend({ urls: z.array(z.string()) }).optional(),
	'site-faq': faqSourceBase.optional(),
	research: faqSourceBase.optional()
});
export type FaqSources = z.infer<typeof FaqSourcesSchema>;
export const FAQ_SOURCE_KEYS = [
	'google-autocomplete',
	'ubersuggest',
	'post',
	'site-faq',
	'research'
] as const;

/** A FAQ question, satisfied (or not yet) by a URL. Same rejected/reason parity as keywords.
 *  Its provenance is `sources`, a record with one key per source that saw the question. */
export const FaqEntrySchema = z
	.strictObject({
		id: z.string().min(1),
		question: z.string().min(1),
		keywordId: z.string().min(1),
		cluster: z.string().min(1),
		url: z.string().nullable(),
		status: ContentStatusSchema,
		reason: z.string().nullable(),
		sources: FaqSourcesSchema
	})
	.superRefine((entry, ctx) => {
		if (entry.status === 'rejected' && !entry.reason) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['reason'],
				message: 'status "rejected" requires a reason'
			});
		}
		if (Object.keys(entry.sources).length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['sources'],
				message: 'a faq needs at least one source'
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

/** Tracks the last run of the weekly/monthly Ubersuggest sections, derived from the committed
 *  batch files (see `sync.ts`), so a Mac that was asleep on Monday does not skip the week. */
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
