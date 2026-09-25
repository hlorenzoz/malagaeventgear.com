/**
 * Ambient types for the virtual modules provided by scripts/vite-blog-meta.mjs.
 */

/** English posts: each post's content path to its parsed frontmatter, as buildPostsFromGlob() expects. */
declare module 'virtual:blog-meta' {
	const blogMeta: Record<string, { metadata: unknown }>;
	export default blogMeta;
}

/**
 * Translated posts (Fase 4): one lazy loader per locale that has translation files. Each
 * returns that locale's modules (frontmatter only: FAQ and ToC load per post from
 * `virtual:blog-extras`), as buildLocalizedPosts() expects.
 */
declare module 'virtual:blog-translations' {
	/** ISO build time: the publish date cut shared by the app and the build tooling. */
	export const builtAt: string;
	const loaders: Partial<
		Record<string, () => Promise<import('$lib/data/blog-pipeline').TranslationGlob>>
	>;
	export default loaders;
}

/** What each locale's blog publishes (English identifiers), one lazy loader per locale. */
declare module 'virtual:blog-availability' {
	const loaders: Partial<Record<string, () => Promise<import('$lib/i18n/availability').BlogAvailability>>>;
	export default loaders;
}

/**
 * FAQ pairs and ToC entries per post, one lazy chunk per post and a small loader map per locale
 * (English from post-faqs.json and post-toc.json, translations from their body).
 */
declare module 'virtual:blog-extras' {
	type Extras = import('$lib/data/blog').PostExtras;
	const loaders: Partial<Record<string, () => Promise<Partial<Record<string, () => Promise<Extras>>>>>>;
	export default loaders;
}
