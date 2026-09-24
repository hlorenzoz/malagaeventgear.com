import { z } from 'zod';
import type { Locale } from '../i18n/locales';

/**
 * Zod schema for blog post frontmatter.
 * This is the authoritative schema for the data layer.
 * The existing BlogPostFrontmatterSchema in seo.ts is kept as-is for backward compat.
 */
export const BlogPostSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	author: z.string().min(1, 'Author is required'),
	// slug is derived from filename — injected by the data layer, not from frontmatter
	slug: z.string().min(1).optional(),
	// publishDate: plain YYYY-MM-DD or ISO 8601 with offset
	publishDate: z
		.string()
		.datetime({ offset: true })
		.or(z.string().date()),
	// updatedDate: last significant modification. Same validation as publishDate
	// (plain YYYY-MM-DD or ISO 8601 with offset), but optional.
	// Written by `just post-touch <slug>` (scripts/post-touch.ts). Consumed by:
	//   - post-sitemap.xml <lastmod>            (src/routes/(public)/post-sitemap.xml/+server.ts)
	//   - Article/NewsArticle JSON-LD dateModified + og:updated_time (src/lib/layouts/BlogPost.svelte)
	//   - the visible "Updated" date on the post   (src/lib/layouts/BlogPost.svelte)
	//   - category / author page lastmod           (maxLastmod in src/lib/data/blog-pipeline.ts)
	//   - the live site map at /map                 (src/lib/data/site-map.ts)
	// Bump only on a real content change, never on a build (CLAUDE.md 11).
	updatedDate: z
		.string()
		.datetime({ offset: true })
		.or(z.string().date())
		.optional(),
	excerpt: z.string().min(10),
	coverImage: z.string().url(),
	categories: z.array(z.string()).default([]),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().optional().default(false),
	// --- Reverse silo metadata (see CLAUDE.md "Reverse Silo del Blog") ---
	// keyword: the POP target keyword phrase. By convention it matches the slug under
	// /blog/, except a few near-me posts whose slug carries a location suffix.
	keyword: z.string().optional(),
	// siloRole: this node's role in the reverse silo.
	//   pillar     -> target page of its cluster (links up to the homepage)
	//   supporting -> feeds a pillar (links down to it + laterally to siblings)
	//   both       -> pillar of its cluster AND supporter of a higher target
	//   news       -> news/press post, targets the homepage directly (not a silo cluster)
	//   standalone -> not part of any silo (corporate, migration posts)
	siloRole: z.enum(['pillar', 'supporting', 'both', 'news', 'standalone']).optional(),
	// targetPage: the URL this node links up to. pillar -> '/', supporting -> its pillar
	// (e.g. '/blog/audio-visual-rental/'), news -> '/'. Empty for standalone.
	targetPage: z.string().optional()
});

/** Plain YYYY-MM-DD or ISO 8601 with offset, as in BlogPostSchema. */
const postDate = z.string().datetime({ offset: true }).or(z.string().date());

/**
 * Frontmatter of a TRANSLATED post (`src/content/blog/<locale>/<en-slug>.svx`, Fase 4).
 * Only what is translated lives here. Everything else (coverImage, categories, tags, author,
 * siloRole, targetPage) is derived from the English post, and the keyword and slug come from
 * the locale's content map (the single source for both), so `.strict()` rejects them: a
 * repeated field would be a second truth that drifts.
 */
export const TranslatedPostSchema = z
	.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(10, 'Description must be at least 10 characters'),
		excerpt: z.string().min(10),
		// Date THIS translation was published (never the English date).
		publishDate: postDate,
		// Last real change of THIS translation.
		updatedDate: postDate.optional(),
		// The English `updatedDate ?? publishDate` that was translated (YYYY-MM-DD). A newer
		// English post fails the freshness guard (CLAUDE.md, "Reglas mandatorias de idioma" 2).
		sourceUpdated: z.string().date(),
		draft: z.boolean().optional().default(false)
	})
	.strict();

export type TranslatedPostFrontmatter = z.infer<typeof TranslatedPostSchema>;

export type BlogPostFrontmatter = z.infer<typeof BlogPostSchema>;

/** Role of a page/post in the reverse silo. */
export type SiloRole = NonNullable<BlogPostFrontmatter['siloRole']>;

/**
 * BlogPost extends frontmatter with the slug derived from the .svx filename.
 * The compiled component is NOT carried here — it is loaded lazily per-route via
 * getPostComponentLoader(slug) so listing pages don't bundle every post body.
 */
export type BlogPost = BlogPostFrontmatter & {
	// The ENGLISH slug (the .svx filename), also on a translation: it is the post's identity
	// for every lookup (i18n.href, package rules, cover thumbs), in every locale.
	slug: string;
	// Canonical site path of this version, derived in blog-pipeline.ts: '/blog/' + slug + '/'
	// in English, the percent encoded localized path from the content map in other locales.
	// NOT stored in frontmatter.
	url: string;
	// Responsive cover variants attached from cover-thumbs.json (frontmatter coverImage
	// stays the full-size image, used for og:image). thumb = ~768px <img src> fallback;
	// srcset = all R2 variants so the browser picks the right size per DPR/viewport.
	coverImageThumb?: string;
	coverImageSrcset?: string;
	// Full-size coverImage's own pixel dimensions (NOT a variant's), attached from
	// cover-thumbs.json. Feeds og:image:width/height in BlogPost.svelte so social
	// crawlers don't have to fetch the image to know its aspect ratio.
	coverImageWidth?: number;
	coverImageHeight?: number;
	// FAQ pairs extracted from the post body at build time (gen-post-faqs.ts).
	// Populated from src/lib/data/post-faqs.json — absent for posts with no FAQ section.
	faqs?: { question: string; answer: string }[];
	// Table of Contents entries extracted from the post body at build time (gen-post-toc.ts).
	// Populated from src/lib/data/post-toc.json — absent for posts with no headings.
	toc?: { id: string; text: string; level: 2 | 3 }[];
	// Locale of this version (Fase 4). Absent on English posts.
	locale?: Locale;
	// Translations only: the English date that was translated (see TranslatedPostSchema).
	sourceUpdated?: string;
	// Derived from categories: true when any category slugifies to 'news'.
	// Populated in blog-pipeline.ts alongside other derived fields.
	isNews: boolean;
};

/**
 * A blog category derived from published posts.
 */
export interface Category {
	name: string;   // display name (e.g. "Event Planning")
	slug: string;   // URL-safe (e.g. "event-planning")
	count: number;  // number of published posts in this category
	lastmod: string; // max(updated ?? publishDate) across posts in category
}

/**
 * A blog author derived from published posts.
 */
export interface Author {
	name: string;   // display name (e.g. "Hector Lorenzo")
	slug: string;   // URL-safe (e.g. "hector-lorenzo")
	count: number;  // number of published posts by this author
	lastmod: string; // max(updated ?? publishDate) across posts by author
}
