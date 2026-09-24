import type { Locale } from './locales';
import type { Availability } from './routing';

/**
 * Locales whose static pages and packages are published. Pages ship all at once per locale
 * (Fase 3), so this is a per locale switch, guarded by a test that every page has its copy.
 * Posts are published one by one and their availability comes from the translation files.
 */
export const PAGE_LOCALES: readonly Locale[] = ['en', 'fr', 'it', 'de', 'nl', 'pt-pt', 'pt-br', 'sv', 'da', 'nb', 'zh-hans', 'zh-tw', 'zh-hk'];

/**
 * What a locale's blog publishes, as English identifiers. Computed at build time from the
 * translation files (`blogAvailabilityOf` in blog-pipeline.ts, served per locale by the
 * `virtual:blog-availability` module) and passed in, so this module stays pure and loads
 * anywhere (app, tests, Playwright).
 */
export interface BlogAvailability {
	/** English slugs of the posts with a published translation. */
	posts: readonly string[];
	/** English category slugs with at least one published translated post. */
	categories: readonly string[];
	/** Author slugs with at least one published translated post. */
	authors: readonly string[];
}

export const NO_BLOG: BlogAvailability = { posts: [], categories: [], authors: [] };

// `i18n.href` asks for every link on a page: build the sets once per blog data and locale.
const cache = new WeakMap<BlogAvailability, Map<Locale, Availability>>();

export function getAvailability(locale: Locale, blog: BlogAvailability | null = NO_BLOG): Availability {
	const b = blog ?? NO_BLOG;
	let byLocale = cache.get(b);
	if (!byLocale) cache.set(b, (byLocale = new Map()));
	let available = byLocale.get(locale);
	if (!available) {
		available = {
			pages: PAGE_LOCALES.includes(locale),
			posts: new Set(b.posts),
			categories: new Set(b.categories),
			authors: new Set(b.authors)
		};
		byLocale.set(locale, available);
	}
	return available;
}
