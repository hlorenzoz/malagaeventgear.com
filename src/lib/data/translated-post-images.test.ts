import { describe, expect, it } from 'vitest';
import matter from 'gray-matter';
import { imagesWithoutAlt } from './translation-audit';

/**
 * Guard (Fase 4): every image of a TRANSLATED post has a non empty alt, written in its language.
 * The build never falls back to the English alt of the image manifest in a translation
 * (scripts/rehype-blog-images.mjs), so a missing alt would ship an image with no text at all.
 * The caption, when the image has one, is the markdown title: `![alt](url "caption")`.
 */
const translated = import.meta.glob('/src/content/blog/*/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

describe('imagesWithoutAlt', () => {
	it('flags markdown and HTML images with no alt', () => {
		const body = [
			'![Galadinner am Meer](https://cdn.x/a.webp "Galadinner in Marbella")',
			'![](https://cdn.x/b.webp)',
			'![  ](https://cdn.x/c.webp "Only a caption")',
			'<img src="https://cdn.x/d.webp" alt="Buehne">',
			'<img src="https://cdn.x/e.webp">',
			'<img alt="" src="https://cdn.x/f.webp" />'
		].join('\n\n');
		expect(imagesWithoutAlt(body)).toEqual(['https://cdn.x/b.webp', 'https://cdn.x/c.webp', 'https://cdn.x/e.webp', 'https://cdn.x/f.webp']);
	});

	it('passes a body whose images all have an alt', () => {
		expect(imagesWithoutAlt('Text ![Buehne](https://cdn.x/a.webp) more.')).toEqual([]);
	});
});

describe('translated posts', () => {
	it.each(Object.keys(translated).length > 0 ? Object.keys(translated) : ['(no translated post yet)'])(
		'%s: every image has an alt',
		(path) => {
			const raw = translated[path];
			if (raw === undefined) return;
			expect(imagesWithoutAlt(matter(raw).content), `${path}: write the alt in the post's language`).toEqual([]);
		}
	);
});
