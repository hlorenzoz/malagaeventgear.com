import loaders from 'virtual:blog-availability';
import type { BlogAvailability } from './availability';
import type { Locale } from './locales';

/**
 * What a locale's blog publishes, computed at build time (scripts/vite-blog-meta.mjs) and
 * loaded as that locale's own small chunk. Null for English (its blog is the source) and for a
 * locale without translations. Kept out of availability.ts so that module stays loadable
 * outside Vite (vitest, Playwright).
 */
export async function loadBlogAvailability(locale: Locale): Promise<BlogAvailability | null> {
	const loader = locale === 'en' ? undefined : loaders[locale];
	return loader ? loader() : null;
}
