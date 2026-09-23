import { describe, it, expect } from 'vitest';
import { packages } from './packages';
import { packageImageVariant, type PackageImageVariant } from '$lib/assets/package-images';

/**
 * Exhaustiveness guard for the `hashed-package-image-variants` change.
 *
 * Every package declared in packages.ts must resolve a thumb/mobile/desktop hashed
 * variant, so a new or renamed package cannot silently 404 an in-page image in
 * production. `packageImageVariant` already throws loudly at call time if a variant is
 * missing; this test is what actually catches that before it ever reaches a page.
 */

const VARIANTS: PackageImageVariant[] = ['thumb', 'thumb-sm', 'mobile', 'desktop'];

const cases = packages.flatMap((pkg) => VARIANTS.map((variant) => [pkg.slug, variant] as const));

describe('every package resolves a full set of hashed image variants', () => {
	it.each(cases)('%s has a %s variant', (slug, variant) => {
		expect(() => packageImageVariant(`/images/packages/${slug}.webp`, variant)).not.toThrow();
	});

	it('covers a meaningful number of packages', () => {
		expect(packages.length).toBeGreaterThan(0);
		expect(cases.length).toBe(packages.length * VARIANTS.length);
	});
});
