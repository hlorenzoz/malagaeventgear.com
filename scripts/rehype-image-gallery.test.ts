import { describe, it, expect } from 'vitest';
import { rehypeImageGallery } from './rehype-image-gallery.mjs';
import { GALLERY_SIZES, PROSE_SIZES } from '../src/lib/utils/blog-image-sizes.js';

/**
 * rehype-image-gallery runs after rehype-blog-images, which wraps images with AVIF variants
 * in <picture>. The gallery has to treat <p><picture></p> as a standalone image, and the
 * gallery `sizes` has to reach the AVIF <source> too, not only the <img>: the browser picks
 * the variant from the <source> it uses.
 */

type Hast = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Hast[]; value?: string };

const img = (src: string): Hast => ({
	type: 'element',
	tagName: 'img',
	properties: { src, srcset: `${src} 768w`, sizes: PROSE_SIZES },
	children: []
})
const picture = (src: string): Hast => ({
	type: 'element',
	tagName: 'picture',
	properties: {},
	children: [
		{
			type: 'element',
			tagName: 'source',
			properties: { type: 'image/avif', srcset: `${src.replace('.webp', '.avif')} 768w`, sizes: PROSE_SIZES },
			children: []
		},
		img(src)
	]
})
const p = (...children: Hast[]): Hast => ({ type: 'element', tagName: 'p', properties: {}, children })
const text = (value: string): Hast => ({ type: 'text', value })

describe('rehypeImageGallery with <picture> images', () => {
	it('groups standalone <picture> images into one gallery', () => {
		const tree: Hast = { type: 'root', children: [p(picture('a.webp')), p(text('Text')), p(picture('b.webp'))] }
		rehypeImageGallery()(tree)

		const gallery = tree.children![0]
		expect(gallery.properties!.className).toEqual(['img-gallery'])
		expect(gallery.children).toHaveLength(2)
		expect(gallery.children![0].children![0].tagName).toBe('picture')
	})

	it('groups a mix of <picture> and plain <img> images', () => {
		const tree: Hast = { type: 'root', children: [p(picture('a.webp')), p(img('b.webp'))] }
		rehypeImageGallery()(tree)

		const slides = tree.children![0].children!
		expect(slides.map((s) => s.children![0].tagName)).toEqual(['picture', 'img'])
	})

	it('sets the gallery sizes on the AVIF <source> and on the <img>', () => {
		const tree: Hast = { type: 'root', children: [p(picture('a.webp')), p(picture('b.webp'))] }
		rehypeImageGallery()(tree)

		for (const slide of tree.children![0].children!) {
			const [source, fallback] = slide.children![0].children!
			expect(source.properties!.sizes).toBe(GALLERY_SIZES)
			expect(fallback.properties!.sizes).toBe(GALLERY_SIZES)
		}
	})

	it('treats a captioned <figure> with a <picture> as a standalone image', () => {
		const captioned: Hast = {
			type: 'element',
			tagName: 'figure',
			properties: {},
			children: [picture('a.webp'), { type: 'element', tagName: 'figcaption', properties: {}, children: [text('Caption')] }]
		}
		const tree: Hast = { type: 'root', children: [captioned, p(picture('b.webp'))] }
		rehypeImageGallery()(tree)

		const slides = tree.children![0].children!
		expect(slides).toHaveLength(2)
		expect(slides[0].children!.map((c) => c.tagName)).toEqual(['picture', 'figcaption'])
		expect(slides[0].children![0].children![0].properties!.sizes).toBe(GALLERY_SIZES)
	})
})
