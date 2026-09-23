// Eager Vite import of every in-page-only package image derivative (thumb/mobile/desktop)
// plus the Bucket-2 dual-use copy of mice.webp, all physically under ./packages/. Base
// <slug>.webp files stay in static/ (untouched, they're packages.ts's `image` field, the
// og:image/JSON-LD/sitemap literal).
const variants = import.meta.glob('./packages/*.webp', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

// thumb = 160px (2x del slot de 80px de PostCTA), thumb-sm = 96px (2x del slot de 48px del rail).
export type PackageImageVariant = 'thumb' | 'thumb-sm' | 'mobile' | 'desktop';

/**
 * Resolves the hashed URL for an in-page-only package image derivative.
 * @param image - packages.ts's `pkg.image` (e.g. '/images/packages/eco.webp')
 * @throws if the variant file is missing under src/lib/assets/packages/, fails loud at
 *   render/prerender time instead of shipping a 404. Backstopped by the exhaustive Vitest
 *   guard (package-image-variants.test.ts) that calls this for every package x every
 *   variant, so a missing file is caught by `bun run test` before this runtime throw ever
 *   fires in production.
 */
export function packageImageVariant(image: string, variant: PackageImageVariant): string {
	const slug = image.replace('/images/packages/', '').replace('.webp', '');
	const key = `./packages/${slug}-${variant}.webp`;
	const url = variants[key];
	if (!url) {
		throw new Error(
			`packageImageVariant: missing "${variant}" for "${image}" (expected ${key} under src/lib/assets/packages/)`
		);
	}
	return url;
}

// Bucket 2 dual-use: byte-identical copy of static/images/packages/mice.webp, imported ONLY
// for the in-page desktop <source>/<img> in /equipment/+page.svelte. static/'s copy stays
// load-bearing for og:image/JSON-LD/sitemap (packages.ts). Byte parity enforced by
// src/lib/data/dual-use-image-parity.test.ts.
export const MICE_EQUIPMENT_PAGE_IMAGE = (() => {
	const url = variants['./packages/mice.webp'];
	if (!url) throw new Error('Missing dual-use copy: src/lib/assets/packages/mice.webp');
	return url;
})();
