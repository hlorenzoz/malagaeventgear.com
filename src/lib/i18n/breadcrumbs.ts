/**
 * Breadcrumb trail of a page, shared by the visible breadcrumbs and the BreadcrumbList JSON-LD
 * so both always say the same thing, in the same language, with the same URLs.
 *
 * It works on the ENGLISH route path (the route's identity), then names each crumb from the
 * locale's dictionary and localizes each URL, so a German page gets German names and German
 * URLs without a second implementation.
 */

export interface Crumb {
	name: string;
	/** Site path of the crumb (localized when that page is published in the locale). */
	path: string;
	/** False for section segments that have no index page (`/blog/category/`). */
	navigable: boolean;
}

export interface TrailOptions {
	/** Crumb names keyed by English path segment (`about-us`), plus `home`. */
	names?: Record<string, string>;
	/** English route path to site path in the current locale. Identity by default. */
	localize?: (enPath: string) => string;
	/** Real title of the page (post title, package name), used for the last crumb. */
	leafName?: string;
}

// Accumulated paths that are NOT real pages (no index route exists), so they must never be
// links: the prerender crawler would follow them and fail the build with a 404.
const NON_NAVIGABLE_PATHS = new Set(['/blog/author/', '/blog/category/']);

export function capitalizeSlug(segment: string): string {
	return segment
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function breadcrumbTrail(enPath: string, options: TrailOptions = {}): Crumb[] {
	const { names = {}, localize = (p: string) => p, leafName } = options;
	const trail: Crumb[] = [{ name: names.home ?? 'Home', path: localize('/'), navigable: true }];
	const segments = enPath.split('/').filter(Boolean);

	segments.forEach((segment, index) => {
		const enAccumulated = `/${segments.slice(0, index + 1).join('/')}/`;
		const isLast = index === segments.length - 1;
		const navigable = !NON_NAVIGABLE_PATHS.has(enAccumulated);
		trail.push({
			name: isLast && leafName ? leafName : (names[segment] ?? capitalizeSlug(segment)),
			path: navigable ? localize(enAccumulated) : enAccumulated,
			navigable
		});
	});

	return trail;
}

/**
 * Real name of the page for the last crumb, from the route data: the post title (localized on a
 * translation), the package name (never translated) or the category name (localized from the
 * content map). Undefined falls back to the capitalized slug.
 */
export function breadcrumbLeaf(
	data: { post?: { title?: string }; pkg?: { name?: string }; categoryMeta?: { name?: string } } | undefined
): string | undefined {
	return data?.post?.title ?? data?.pkg?.name ?? data?.categoryMeta?.name ?? undefined;
}
