/**
 * plan.schema.ts: Zod contract of the daily content plan written by the `content-strategist`
 * agent to `.agents/context/keywords/content-plan/YYYY-MM-DD.json`. The agent prompt
 * (`.claude/agents/content-strategist.md`) depends on this exact shape, so any change here is a
 * change to that prompt too.
 *
 * The plan is a DECISION record, never content: it says which page gets a section, an FAQ or a
 * new post, with the evidence and the reason. `plan-to-todo.ts` renders it into TODO.txt and
 * `importers/content-plan.ts` attaches it to keywords.json as the `content-plan` source.
 */

import { z } from 'zod';

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

/** The pillar urls of the reverse silo (CLAUDE.md "Los silos de MEG"). A new post always funnels
 *  into one of them. */
export const PILLAR_URLS = [
	'/blog/audio-visual-rental/',
	'/blog/wedding-rentals/',
	'/blog/audiovisual-equipment-rental-service/',
	'/blog/event-technology-service/',
	'/blog/stage-lighting-rental/'
] as const;

export const PlanActionSchema = z.enum(['add-section', 'new-post', 'add-faq', 'skip']);
export type PlanAction = z.infer<typeof PlanActionSchema>;

export const PlanPrioritySchema = z.enum(['high', 'medium', 'low']);
export type PlanPriority = z.infer<typeof PlanPrioritySchema>;

/** Avalanche (POP) fit of the item's keyword against the site's traffic tier, copied by the agent
 *  from `just content-candidates`. */
export const AvalancheFitSchema = z.enum(['in-tier', 'below', 'above', 'unknown']);
export type AvalancheFitValue = z.infer<typeof AvalancheFitSchema>;

const headingLevelSchema = z.union([z.literal(2), z.literal(3)]);

export const NewPostPlanSchema = z.object({
	slug: z
		.string()
		.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase words joined by hyphens'),
	title: z.string().min(1),
	keyword: z.string().min(1),
	targetPage: z.enum(PILLAR_URLS),
	prevSibling: z.string().nullable().optional(),
	nextSibling: z.string().nullable().optional(),
	outline: z.array(z.object({ level: headingLevelSchema, text: z.string().min(1) })),
	brief: z.string().min(1)
});
export type NewPostPlan = z.infer<typeof NewPostPlanSchema>;

const BLOG_URL_RE = /^\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/;
const BLOG_FILE_RE = /^src\/content\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\.svx$/;

export const PlanItemSchema = z
	.object({
		keywords: z.array(z.string().min(1)).min(1),
		cluster: z.string().min(1),
		action: PlanActionSchema,
		priority: PlanPrioritySchema,
		evidence: z.string().min(1),
		avalancheFit: AvalancheFitSchema.optional(),
		reason: z.string().min(1),
		targetUrl: z.string().optional(),
		file: z.string().optional(),
		headingLevel: headingLevelSchema.optional(),
		heading: z.string().min(1).optional(),
		after: z.string().min(1).optional(),
		brief: z.string().min(1).optional(),
		question: z.string().min(1).optional(),
		newPost: NewPostPlanSchema.optional()
	})
	.superRefine((item, ctx) => {
		const need = (field: keyof typeof item) => {
			if (item[field] === undefined) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: [field],
					message: `action "${item.action}" requires ${field}`
				});
			}
		};
		if (item.action === 'add-section') {
			for (const f of ['targetUrl', 'file', 'headingLevel', 'heading', 'brief'] as const) need(f);
		}
		if (item.action === 'add-faq') {
			for (const f of ['targetUrl', 'file', 'question'] as const) need(f);
		}
		if (item.action === 'new-post') need('newPost');

		if (item.targetUrl !== undefined || item.file !== undefined) {
			const urlSlug = item.targetUrl ? BLOG_URL_RE.exec(item.targetUrl)?.[1] : undefined;
			const fileSlug = item.file ? BLOG_FILE_RE.exec(item.file)?.[1] : undefined;
			if (item.targetUrl !== undefined && !urlSlug) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['targetUrl'],
					message: 'targetUrl must look like /blog/<slug>/'
				});
			}
			if (item.file !== undefined && !fileSlug) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['file'],
					message: 'file must look like src/content/blog/<slug>.svx'
				});
			}
			if (urlSlug && fileSlug && urlSlug !== fileSlug) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['file'],
					message: `file "${item.file}" does not match targetUrl "${item.targetUrl}"`
				});
			}
		}
	});
export type PlanItem = z.infer<typeof PlanItemSchema>;

export const ContentPlanSchema = z.object({
	date: dateOnly,
	run: z.object({
		status: z.enum(['ok', 'partial', 'aborted']),
		reason: z.string().optional(),
		candidatesReviewed: z.number().int().min(0),
		tier: z.object({ level: z.number(), value: z.number(), export: z.string().min(1) }).optional()
	}),
	items: z.array(PlanItemSchema)
});
export type ContentPlan = z.infer<typeof ContentPlanSchema>;
