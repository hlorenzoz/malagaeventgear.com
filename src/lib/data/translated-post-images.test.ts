import { describe, expect, it } from 'vitest';
import matter from 'gray-matter';
import { auditPostImages } from './image-alt-audit';

/**
 * Guard (Fase 4): every image of a TRANSLATED post renders as an image and has a non empty alt,
 * written in its language. The build never falls back to the English alt of the image manifest
 * in a translation (scripts/rehype-blog-images.mjs), so a missing alt would ship an image with
 * no text at all. The caption, when the image has one, is the markdown title:
 * `![alt](url "caption")`.
 *
 * The audit compiles the body with mdsvex and the build's markdown options, never with another
 * markdown parser: mdsvex's parser does NOT accept a parenthesized title (`![alt](url (title))`)
 * and prints that image as raw text, while a CommonMark parser would accept it and pass.
 */
const translated = import.meta.glob('/src/content/blog/*/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

describe('auditPostImages', () => {
	it('flags markdown and HTML images with no alt', async () => {
		const body = [
			'![Galadinner am Meer](https://cdn.x/a.webp "Galadinner in Marbella")',
			'![](https://cdn.x/b.webp)',
			'![  ](https://cdn.x/c.webp "Only a caption")',
			'<img src="https://cdn.x/d.webp" alt="Buehne">',
			'<img src="https://cdn.x/e.webp">',
			'<img alt="" src="https://cdn.x/f.webp" />'
		].join('\n\n');
		expect(await auditPostImages(body)).toEqual({
			withoutAlt: ['https://cdn.x/b.webp', 'https://cdn.x/c.webp', 'https://cdn.x/e.webp', 'https://cdn.x/f.webp'],
			unrendered: []
		});
	});

	it('reads images as the build does: single quoted titles, brackets in the alt, inline and in tables', async () => {
		const body = [
			"![Galadinner](https://cdn.x/a.webp 'Einfache Anfuehrungszeichen')",
			'![Buehne [Marbella] am Abend](https://cdn.x/c.webp)',
			"![](https://cdn.x/d.webp 'Nur ein Pie')",
			'Text mit ![](https://cdn.x/f.webp) im Satz.',
			'| Bild |\n| --- |\n| ![](https://cdn.x/g.webp) |'
		].join('\n\n');
		expect(await auditPostImages(body)).toEqual({
			withoutAlt: ['https://cdn.x/d.webp', 'https://cdn.x/f.webp', 'https://cdn.x/g.webp'],
			unrendered: []
		});
	});

	it('flags an image the build prints as raw text (parenthesized title), with or without alt', async () => {
		const body = [
			'![Galadinner](https://cdn.x/b.webp (Klammertitel))',
			'Hier ![](https://cdn.x/e.webp (Nur ein Pie)) im Satz.'
		].join('\n\n');
		const { unrendered } = await auditPostImages(body);
		expect(unrendered).toHaveLength(2);
		expect(unrendered[0]).toContain('https://cdn.x/b.webp');
		expect(unrendered[1]).toContain('https://cdn.x/e.webp');
	});

	it('flags it too when mdsvex wraps the long autolinked URL over several lines', async () => {
		const url = 'https://cdn.malagaeventgear.com/blog/1277/high_care_hospital_marbella_conference_setup_1-300x224.webp';
		const { unrendered } = await auditPostImages(`Hier ein Aufbau in Marbella ![Ton und Monitor fuer eine Konferenz](${url} (Konferenz in Marbella)) mitten im Satz.`);
		expect(unrendered).toHaveLength(1);
		expect(unrendered[0]).toContain(url);
	});

	it('ignores markdown written inside code', async () => {
		expect(await auditPostImages('Schreib `![alt](https://cdn.x/a.webp (pie))` so nicht.')).toEqual({ withoutAlt: [], unrendered: [] });
	});

	it('passes a body whose images all render with an alt', async () => {
		expect(await auditPostImages('Text ![Buehne](https://cdn.x/a.webp "Pie") more.')).toEqual({ withoutAlt: [], unrendered: [] });
	});
});

describe('translated posts', () => {
	it.each(Object.keys(translated).length > 0 ? Object.keys(translated) : ['(no translated post yet)'])(
		'%s: every image renders, with an alt',
		async (path) => {
			const raw = translated[path];
			if (raw === undefined) return;
			const { withoutAlt, unrendered } = await auditPostImages(matter(raw).content);
			expect(withoutAlt, `${path}: write the alt in the post's language`).toEqual([]);
			expect(unrendered, `${path}: write the title in quotes, ![alt](url "caption")`).toEqual([]);
		}
	);
});
