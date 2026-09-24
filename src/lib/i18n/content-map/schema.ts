import { z } from 'zod';

/**
 * Per locale content map: the single source of truth for each locale's slugs and target
 * keywords (CLAUDE.md, "Internacionalización (i18n)"). Keys are ALWAYS the English identifiers
 * (route path, package slug, category slug, post slug). The English locale has no file: its
 * paths are the keys themselves.
 *
 * `status` is 'propuesta' until the keyword is validated with real search data for that
 * country. There is no per language volume data in the repo, so nothing starts as 'validada'.
 */
export const keywordStatus = z.enum(['propuesta', 'validada']);

const keywordFields = {
	keyword: z.string().trim().min(1),
	status: keywordStatus
};

/** A path segment or slug: no slashes, no spaces, lowercase. */
const slug = z
	.string()
	.min(1)
	.refine((s) => !/[\s/A-Z]/.test(s), 'slug must be lowercase, without spaces or slashes');

/** A full unprefixed path such as `/ueber-uns/` or `/blog/kategorien/`. */
const path = z
	.string()
	.refine((p) => p.startsWith('/') && p.endsWith('/'), 'path must start and end with /')
	.refine((p) => !/[\sA-Z]/.test(p), 'path must be lowercase, without spaces');

export const localeContentMapSchema = z.object({
	/**
	 * Static pages, keyed by their English route path (`/about-us/`). The keyword is optional
	 * only because `noindex` pages (`/thank-you/`) have none. The guard requires it on every
	 * indexable page.
	 */
	pages: z.record(
		z.string(),
		z.object({ path, keyword: keywordFields.keyword.optional(), status: keywordStatus.optional() })
	),
	/** Segments of dynamic blog routes that have no page of their own. */
	segments: z.object({ category: slug, author: slug }),
	/** Packages, keyed by the English package slug. Package NAMES are never translated. */
	packages: z.record(z.string(), z.object({ slug, ...keywordFields })),
	/** Blog categories, keyed by the English category slug. */
	categories: z.record(z.string(), z.object({ slug, name: z.string().trim().min(1) })),
	/** Blog posts, keyed by the English post slug. */
	posts: z.record(z.string(), z.object({ slug, ...keywordFields }))
});

export type LocaleContentMap = z.infer<typeof localeContentMapSchema>;
