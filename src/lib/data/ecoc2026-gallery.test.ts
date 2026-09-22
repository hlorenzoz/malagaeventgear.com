/**
 * Guards for the ECOC 2026 event shots in the gallery.
 *
 * Two decisions here are easy to undo by accident and expensive to notice:
 *
 * 1. `blog/3095` (ecoc2026-malaga-spain-8) is EXCLUDED because its published variants
 *    came out rotated 90 degrees (the source EXIF orientation was not applied on
 *    encode). Adding it back without re-uploading it rotated puts a sideways photo in
 *    the home marquee and in the news post carousel.
 * 2. Every shot needs a real alt. The marquee renders bare <img> tags, so an empty alt
 *    is a silent a11y hole that no build step catches.
 */
import { describe, it, expect } from 'vitest';
import { galleryImages, ecoc2026GalleryImages, getImagesForPackage } from './gallery';

describe('ecoc2026GalleryImages', () => {
	it('excludes the rotated source (blog/3095)', () => {
		const rotated = ecoc2026GalleryImages.filter((img) => img.src.includes('/blog/3095/'));
		expect(rotated).toEqual([]);
	});

	it('gives every shot a non-empty alt', () => {
		for (const img of ecoc2026GalleryImages) {
			expect(img.alt.trim().length, `empty alt for ${img.src}`).toBeGreaterThan(0);
		}
	});

	it('points every shot at the CDN ECOC variants', () => {
		for (const img of ecoc2026GalleryImages) {
			expect(img.src).toMatch(
				/^https:\/\/cdn\.malagaeventgear\.com\/blog\/\d+\/ecoc2026-malaga-spain-\d+-600x450\.webp$/
			);
		}
	});

	it('has no duplicate sources', () => {
		const srcs = ecoc2026GalleryImages.map((img) => img.src);
		expect(new Set(srcs).size).toBe(srcs.length);
	});

	it('is spread into galleryImages so the home marquee shows it', () => {
		for (const img of ecoc2026GalleryImages) {
			expect(galleryImages, `missing from galleryImages: ${img.src}`).toContainEqual(img);
		}
	});

	it('is categorised corporate, so the MICE rails pick it up', () => {
		for (const img of ecoc2026GalleryImages) {
			expect(img.category).toBe('corporate');
		}
		const mice = getImagesForPackage('mice');
		for (const img of ecoc2026GalleryImages) {
			expect(mice).toContainEqual(img);
		}
	});

	it('never leaks into the wedding rail', () => {
		const wedding = getImagesForPackage('wedding');
		expect(wedding.filter((img) => img.src.includes('ecoc2026'))).toEqual([]);
	});
});
