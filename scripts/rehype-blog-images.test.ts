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

/**
 * A TRANSLATED post (`src/content/blog/<locale>/<en-slug>.svx`) never gets the English text of
 * the manifest: its alt is the one written in the markdown, and its caption is the markdown
 * image title (`![alt](url "caption")`). English posts keep the manifest alt and caption.
 */
describe('rehypeBlogImages: translated posts keep their own alt and caption', () => {
	const DE = { filename: '/repo/src/content/blog/de/wedding-rentals.svx' }
	const EN = { filename: '/repo/src/content/blog/wedding-rentals.svx' }
	const manifest = manifestOf(...RUNGS.map(([w, h]) => entry(3, 'gala', w, h, false, 'Gala dinner')))
	const titled = (src: string, alt: string, title?: string): Hast => ({
		type: 'element',
		tagName: 'img',
		properties: { src, alt, ...(title ? { title } : {}) },
		children: []
	})
	const runFile = (tree: Hast, file: unknown) => {
		rehypeBlogImages({ manifest })(tree, file)
		return tree
	}

	it('takes the figcaption from the markdown title, never the English manifest caption', () => {
		const tree = runFile(root(p(titled(`${CDN}/3/gala.webp`, 'Galadinner am Meer', 'Galadinner in Marbella'))), DE)
		const figure = tree.children![0]
		expect(figure.tagName).toBe('figure')
		const [image, caption] = figure.children!
		expect(caption.tagName).toBe('figcaption')
		expect(caption.children![0].value).toBe('Galadinner in Marbella')
		expect(image.properties!.alt).toBe('Galadinner am Meer')
		expect(image.properties!.title).toBeUndefined() // the caption is not repeated as a tooltip
		expect(image.properties!.srcset).toContain('gala-768x576.webp') // still responsive
	})

	it('adds no caption and no English alt when the markdown has none', () => {
		const tree = runFile(root(p(titled(`${CDN}/3/gala.webp`, ''))), DE)
		const para = tree.children![0]
		expect(para.tagName).toBe('p')
		expect(JSON.stringify(para)).not.toContain('Gala dinner')
		expect(para.children![0].properties!.alt).toBe('')
	})

	it('keeps the manifest caption and alt in English posts', () => {
		const tree = runFile(root(p(titled(`${CDN}/3/gala.webp`, ''))), EN)
		const figure = tree.children![0]
		expect(figure.tagName).toBe('figure')
		expect(figure.children![1].children![0].value).toBe('Gala dinner')
		expect(figure.children![0].properties!.alt).toBe('Stage')
	})
})
