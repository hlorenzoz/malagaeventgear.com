import { describe, it, expect } from 'vitest';
import { rehypeBlogImages } from './rehype-blog-images.mjs';
import { PROSE_SIZES } from '../src/lib/utils/blog-image-sizes.js';

/**
 * rehype-blog-images serves AVIF to the browsers that support it, WebP to the rest.
 *
 * When the manifest has an AVIF sibling (`avifUrl`) for the variants of an image, the
 * enriched <img> is wrapped in <picture> with a <source type="image/avif">. The browser
 * picks the first source whose type it supports, so the choice happens in the browser,
 * with no JavaScript and no user agent sniffing. The <img> keeps the WebP srcset as the
 * fallback.
 */

const CDN = 'https://cdn.example.com/blog';

type Hast = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Hast[]; value?: string };

const img = (src: string): Hast => ({ type: 'element', tagName: 'img', properties: { src, alt: 'Stage' }, children: [] })
const p = (...children: Hast[]): Hast => ({ type: 'element', tagName: 'p', properties: {}, children })
const root = (...children: Hast[]): Hast => ({ type: 'root', children })

/** One manifest entry per WebP rung, optionally with its AVIF sibling. */
function entry(id: number, base: string, w: number, h: number, withAvif: boolean, caption = '') {
	const suffix = w === 2048 ? '' : `-${w}x${h}`
	const r2Url = `${CDN}/${id}/${base}${suffix}.webp`
	return {
		r2Url,
		width: w,
		height: h,
		alt: 'Stage',
		title: '',
		caption,
		...(withAvif ? { avifUrl: r2Url.replace(/\.webp$/, '.avif') } : {})
	}
}

function manifestOf(...entries: ReturnType<typeof entry>[]) {
	return { media: Object.fromEntries(entries.map((e) => [e.r2Url, e])) }
}

const RUNGS: [number, number][] = [
	[400, 300],
	[768, 576],
	[1024, 768],
	[2048, 1536]
]

const run = (tree: Hast, manifest: unknown) => {
	rehypeBlogImages({ manifest })(tree)
	return tree
}

describe('rehypeBlogImages: AVIF with a WebP fallback', () => {
	it('wraps an image that has AVIF variants in <picture> with an AVIF <source>', () => {
		const manifest = manifestOf(...RUNGS.map(([w, h]) => entry(1, 'stage', w, h, true)))
		const tree = run(root(p(img(`${CDN}/1/stage.webp`))), manifest)

		const picture = tree.children![0].children![0]
		expect(picture.tagName).toBe('picture')

		const [source, fallback] = picture.children!
		expect(source.tagName).toBe('source')
		expect(source.properties!.type).toBe('image/avif')
		expect(source.properties!.srcset).toBe(
			`${CDN}/1/stage-400x300.avif 400w, ${CDN}/1/stage-768x576.avif 768w, ${CDN}/1/stage-1024x768.avif 1024w, ${CDN}/1/stage.avif 2048w`
		)
		expect(source.properties!.sizes).toBe(PROSE_SIZES)

		expect(fallback.tagName).toBe('img')
		expect(fallback.properties!.srcset).toContain(`${CDN}/1/stage-768x576.webp 768w`)
		expect(fallback.properties!.srcset).not.toContain('.avif')
		expect(fallback.properties!.src).toBe(`${CDN}/1/stage-1024x768.webp`)
		expect(fallback.properties!.width).toBe(1024)
		expect(fallback.properties!.height).toBe(768)
		expect(fallback.properties!.loading).toBe('lazy')
	})

	it('leaves an image without AVIF variants as a plain <img>', () => {
		const manifest = manifestOf(...RUNGS.map(([w, h]) => entry(2, 'mic', w, h, false)))
		const tree = run(root(p(img(`${CDN}/2/mic.webp`))), manifest)

		const node = tree.children![0].children![0]
		expect(node.tagName).toBe('img')
		expect(node.properties!.srcset).toContain(`${CDN}/2/mic-768x576.webp 768w`)
	})

	it('lists only the rungs that have an AVIF sibling in the AVIF source', () => {
		// A rung added later with cwebp (gen-400-variants.ts) has WebP only.
		const manifest = manifestOf(
			entry(3, 'hall', 400, 300, false),
			entry(3, 'hall', 768, 576, true),
			entry(3, 'hall', 2048, 1536, true)
		)
		const tree = run(root(p(img(`${CDN}/3/hall.webp`))), manifest)

		const [source, fallback] = tree.children![0].children![0].children!
		expect(source.properties!.srcset).toBe(`${CDN}/3/hall-768x576.avif 768w, ${CDN}/3/hall.avif 2048w`)
		expect(fallback.properties!.srcset).toContain(`${CDN}/3/hall-400x300.webp 400w`)
	})

	it('keeps <picture> inside the <figure> of a captioned image', () => {
		const manifest = manifestOf(...RUNGS.map(([w, h]) => entry(4, 'gala', w, h, true, 'Gala dinner')))
		const tree = run(root(p(img(`${CDN}/4/gala.webp`))), manifest)

		const figure = tree.children![0]
		expect(figure.tagName).toBe('figure')
		const [picture, caption] = figure.children!
		expect(picture.tagName).toBe('picture')
		expect(picture.children![1].tagName).toBe('img')
		expect(caption.tagName).toBe('figcaption')
		expect(caption.children![0].value).toBe('Gala dinner')
	})

	it('never nests a <picture> inside another one', () => {
		const manifest = manifestOf(...RUNGS.map(([w, h]) => entry(5, 'dj', w, h, true)))
		const tree = run(root(p(img(`${CDN}/5/dj.webp`))), manifest)
		rehypeBlogImages({ manifest })(tree)

		const picture = tree.children![0].children![0]
		expect(picture.tagName).toBe('picture')
		expect(picture.children!.filter((c) => c.tagName === 'picture')).toEqual([])
		expect(picture.children!.filter((c) => c.tagName === 'source')).toHaveLength(1)
	})
})
