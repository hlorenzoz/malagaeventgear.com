/**
 * Localized structural headings of a post body (Fase 4). Each locale names its FAQ, overview,
 * highlights, testimonials and table of contents sections, and the chrome the build adds, in
 * its messages file (`blogStructure`). The rehype plugins and the FAQ/ToC parsers read the
 * words of the POST's locale (from its path), so a translated post gets its FAQ accordion,
 * FAQPage data, cards and ToC in its own language, and English works exactly as before.
 */
import { compile } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { BLOG_REHYPE_PLUGINS } from './blog-rehype-plugins.mjs';
import { BLOG_STRUCTURE, publishBlogStructure } from './blog-structure.ts';
import { ENGLISH_STRUCTURE, blogStructureOf } from './blog-structure-words.mjs';
import { parseFaqs } from './faq-parser.mjs';
import { parseToc } from './toc-parser.mjs';
import { LOCALES } from '../src/lib/i18n/locales.ts';

const EN_FILE = '/repo/src/content/blog/a.svx';
const DE_FILE = '/repo/src/content/blog/de/a.svx';
const ZH_FILE = '/repo/src/content/blog/zh-hans/a.svx';

async function render(markdown: string, filename: string): Promise<string> {
	const out = await compile(markdown, { filename, remarkPlugins: [remarkGfm], rehypePlugins: BLOG_REHYPE_PLUGINS, smartypants: false });
	// One line, one space between attributes: mdsvex wraps long tags over several lines.
	return (out?.code ?? '').replace(/\s+/g, ' ').replace(/ >/g, '>');
}

const body = (w: { overview: string; highlights: string; toc: string; testimonials: string; faq: string }) => `
## ${w.overview}

Intro text.

## ${w.highlights}

- One point

## ${w.toc}

- [Section](#section)

## Section

Section text.

## ${w.testimonials}

## ${w.faq}

### Question one?

Answer one.

### Question two?

Answer two.
`;

const EN_WORDS = { overview: 'Brief Overview', highlights: 'Key Highlights', toc: 'Table of Contents', testimonials: 'Testimonials', faq: 'FAQs' };
const DE_WORDS = { overview: 'Überblick', highlights: 'Die wichtigsten Punkte', toc: 'Inhaltsverzeichnis', testimonials: 'Kundenstimmen', faq: 'Häufig gestellte Fragen' };
const ZH_WORDS = { overview: '概述', highlights: '要点', toc: '目录', testimonials: '客户评价', faq: '常见问题' };

describe('the table of structural words', () => {
	it('has every locale, with non empty, trimmed words', () => {
		expect(Object.keys(BLOG_STRUCTURE).sort()).toEqual([...LOCALES].sort());
		for (const [locale, s] of Object.entries(BLOG_STRUCTURE)) {
			for (const group of [s.faqHeadings, s.overviewHeadings, s.highlightsHeadings, s.testimonialsHeadings, s.tocHeadings]) {
				expect(group.length, locale).toBeGreaterThan(0);
				for (const word of group) expect(word, locale).toBe(word.trim());
			}
			for (const text of [s.inThisArticle, s.tocAria, s.faqAria]) expect(text.trim(), locale).not.toBe('');
		}
	});

	it('never uses one heading for two sections in a locale', () => {
		for (const [locale, s] of Object.entries(BLOG_STRUCTURE)) {
			const all = [s.faqHeadings, s.overviewHeadings, s.highlightsHeadings, s.testimonialsHeadings, s.tocHeadings]
				.flat()
				.map((w) => w.toLowerCase());
			expect(new Set(all).size, locale).toBe(all.length);
		}
	});

	it('accepts the natural variants of each heading, case insensitively', () => {
		const accepts = (locale: keyof typeof BLOG_STRUCTURE, group: 'faqHeadings' | 'overviewHeadings' | 'highlightsHeadings' | 'testimonialsHeadings', text: string) =>
			BLOG_STRUCTURE[locale][group].some((w) => w.toLowerCase() === text.toLowerCase());
		for (const text of ['Häufige Fragen', 'Häufig gestellte Fragen', 'FAQ', 'faq']) expect(accepts('de', 'faqHeadings', text), text).toBe(true);
		for (const locale of ['fr', 'it', 'de', 'nl', 'pt-pt', 'pt-br', 'sv', 'da', 'nb'] as const) {
			expect(accepts(locale, 'faqHeadings', 'FAQ'), `${locale} FAQ`).toBe(true);
			expect(accepts(locale, 'faqHeadings', 'FAQs'), `${locale} FAQs`).toBe(true);
		}
		expect(accepts('fr', 'faqHeadings', 'Foire aux questions')).toBe(true);
		expect(accepts('de', 'overviewHeadings', 'Überblick')).toBe(true);
		expect(accepts('de', 'highlightsHeadings', 'Die wichtigsten Punkte')).toBe(true);
		expect(accepts('it', 'overviewHeadings', 'Panoramica')).toBe(true);
		expect(accepts('zh-hans', 'faqHeadings', '常见问题解答')).toBe(true);
		for (const [locale, s] of Object.entries(BLOG_STRUCTURE)) {
			if (locale === 'en') continue;
			for (const group of [s.faqHeadings, s.overviewHeadings, s.highlightsHeadings, s.testimonialsHeadings]) {
				expect(group.length, `${locale}: ${group.join(', ')}`).toBeGreaterThan(1);
			}
		}
	});

	it('the English fallback of the plugins is exactly messages/en.ts (no drift)', () => {
		expect(ENGLISH_STRUCTURE).toEqual(BLOG_STRUCTURE.en);
	});

	it('keeps the English words the build always matched', () => {
		const en = BLOG_STRUCTURE.en;
		expect(en.faqHeadings).toEqual(['FAQs', 'FAQ']);
		expect(en.overviewHeadings).toEqual(['Brief Overview']);
		expect(en.highlightsHeadings).toEqual(['Key Highlights', 'Key Highlight']);
		expect(en.testimonialsHeadings).toEqual(['Testimonials', 'Testimonial']);
		expect(en.tocHeadings).toEqual(['Table of Contents']);
	});
});

describe('blogStructureOf', () => {
	afterEach(() => publishBlogStructure());

	it('reads the locale of the post from its path', () => {
		publishBlogStructure();
		expect(blogStructureOf({ filename: DE_FILE }).faqHeadings).toEqual(BLOG_STRUCTURE.de.faqHeadings);
		expect(blogStructureOf({ filename: EN_FILE }).faqHeadings).toEqual(BLOG_STRUCTURE.en.faqHeadings);
	});

	it('refuses to build a translated post without the table (never English chrome on it)', () => {
		delete (globalThis as { __megBlogStructure?: unknown }).__megBlogStructure;
		expect(() => blogStructureOf({ filename: DE_FILE })).toThrow(/blog structure/i);
		// English still builds: its words ship with the plugin (from messages/en.ts).
		expect(blogStructureOf({ filename: EN_FILE }).faqHeadings).toEqual(['FAQs', 'FAQ']);
	});
});

describe('the rehype pipeline', () => {
	beforeAll(() => publishBlogStructure());

	it('English posts are unchanged: FAQ accordion, cards and ToC with English chrome', async () => {
		const html = await render(body(EN_WORDS), EN_FILE);
		expect(html).toContain('<section class="faq-section" aria-label="Frequently asked questions">');
		expect(html).toContain('<details open class="faq-item">');
		expect(html).toContain('<div class="section-card">');
		expect(html).toContain('<div class="section-card section-card--highlights">');
		expect(html).toContain('aria-label="Table of contents"');
		expect(html).toContain('In this article');
		expect(html).not.toMatch(/<h2[^>]*>Table of Contents<\/h2>/);
		expect(html).not.toMatch(/<h2[^>]*>Testimonials<\/h2>/);
	});

	for (const [label, file, words, locale] of [
		['German', DE_FILE, DE_WORDS, 'de'],
		['Chinese', ZH_FILE, ZH_WORDS, 'zh-hans']
	] as const) {
		it(`a ${label} post gets the same structure in its own language, with no English chrome`, async () => {
			const s = BLOG_STRUCTURE[locale];
			const html = await render(body(words), file);
			expect(html).toContain(`<section class="faq-section" aria-label="${s.faqAria}">`);
			expect(html).toContain('<details open class="faq-item">');
			expect(html).toContain('<div class="section-card">');
			expect(html).toContain('<div class="section-card section-card--highlights">');
			expect(html).toContain(`aria-label="${s.tocAria}"`);
			expect(html).toContain(`<p class="toc-mobile-title">${s.inThisArticle}</p>`);
			expect(html).not.toMatch(new RegExp(`<h2[^>]*>${words.toc}</h2>`));
			expect(html).not.toMatch(new RegExp(`<h2[^>]*>${words.testimonials}</h2>`));
			for (const english of ['In this article', 'Table of contents', 'Frequently asked questions']) {
				expect(html).not.toContain(english);
			}
		});
	}

	it('a translated post does not treat the English words as structure (except the idiomatic FAQ)', async () => {
		const html = await render(body(EN_WORDS), DE_FILE);
		expect(html).not.toContain('section-card');
		// "FAQs" is an accepted German FAQ heading, with the German chrome
		expect(html).toContain(`<section class="faq-section" aria-label="${BLOG_STRUCTURE.de.faqAria}">`);
	});
});

describe('the FAQ and ToC parsers (FAQPage JSON-LD, ToC sidebar)', () => {
	it('read the locale words', () => {
		expect(parseFaqs(body(DE_WORDS), BLOG_STRUCTURE.de)).toEqual([
			{ question: 'Question one?', answer: 'Answer one.' },
			{ question: 'Question two?', answer: 'Answer two.' }
		]);
		const toc = parseToc(body(DE_WORDS), BLOG_STRUCTURE.de).map((e) => e.text);
		expect(toc).not.toContain('Inhaltsverzeichnis');
		expect(toc).not.toContain('Kundenstimmen');
		expect(toc).toContain('Häufig gestellte Fragen');
		expect(parseFaqs(body(ZH_WORDS), BLOG_STRUCTURE['zh-hans'])).toHaveLength(2);
	});

	it('default to English, as before', () => {
		expect(parseFaqs(body(EN_WORDS))).toHaveLength(2);
		expect(parseToc(body(EN_WORDS)).map((e) => e.text)).not.toContain('Table of Contents');
		expect(parseFaqs(body(DE_WORDS))).toEqual([]);
	});
});
