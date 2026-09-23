import { describe, it, expect } from 'vitest';

/**
 * Guard test for the `hashed-package-image-variants` change.
 *
 * Two images are dual-use: a stable literal `static/` path feeds an external contract
 * (og:image/twitter:image for the hero, og:image + JSON-LD + sitemap image:loc for
 * mice.webp), while a second, physically separate copy under `src/lib/assets/` is the
 * one Vite hashes and imports for the in-page render. The two copies must never drift.
 *
 * Read with `?inline` (base64 data URL), not `?raw`: Vite's `?raw` decodes the file as
 * UTF-8, which is lossy for arbitrary binary webp bytes. `?inline` forces a lossless
 * data-URL encoding regardless of file size, which is what makes it safe to compare here.
 *
 * `import.meta.glob` reaching from `src/lib/data/` out to `../../../static/...` is new for
 * this repo, but safe: Vite/Vitest's default `fs.allow` covers the whole project root, and
 * `static/` is a project-root sibling of `src/`, not outside the root.
 */

const staticCopies = import.meta.glob('../../../static/{hero-stage.webp,images/packages/mice.webp}', {
	query: '?inline',
	import: 'default',
	eager: true
}) as Record<string, string>;

const assetCopies = import.meta.glob('../assets/{hero-stage.webp,packages/mice.webp}', {
	query: '?inline',
	import: 'default',
	eager: true
}) as Record<string, string>;

const pairs: [string, string][] = [
	['../../../static/hero-stage.webp', '../assets/hero-stage.webp'],
	['../../../static/images/packages/mice.webp', '../assets/packages/mice.webp']
];

describe('dual-use image byte parity (static/ vs src/lib/assets/)', () => {
	it.each(pairs)('%s is byte-identical to %s', (staticKey, assetKey) => {
		expect(staticCopies[staticKey], `missing ${staticKey}`).toBeDefined();
		expect(assetCopies[assetKey], `missing ${assetKey}`).toBeDefined();
		expect(assetCopies[assetKey]).toBe(staticCopies[staticKey]);
	});
});
