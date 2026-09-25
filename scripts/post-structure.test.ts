/**
 * Guard (Fase 4): a published translation keeps the structure of its English post, the same
 * number of FAQ entries, overview sections and highlights sections. A translation that wrote its
 * FAQ heading with a word the build does not recognize would silently lose the accordion and
 * the FAQPage data: this fails the suite instead. The fix is to use the locale's words
 * (`blogStructure` in src/lib/i18n/messages/<locale>.ts) or translate the missing section.
 */
import { describe, expect, it } from 'vitest';
import { postStructure, structureMismatches } from './post-structure.mjs';
import { BLOG_STRUCTURE } from './blog-structure.ts';
import { computeBlogState, BLOG_DIR } from './blog-sources.ts';
import { joinPath, readPost } from './blog-files.mjs';

const EN = BLOG_STRUCTURE.en;
const DE = BLOG_STRUCTURE.de;

const english = `Intro.\n\n## Brief Overview\n\nText.\n\n## Key Highlights\n\n- A\n\n## Section\n\n### Not a question\n\nText.\n\n## FAQs\n\n### One?\n\nA.\n\n### Two?\n\nB.\n`;

describe('postStructure', () => {
	it('counts FAQ entries, overview and highlights sections in the locale words', () => {
		expect(postStructure(english, EN)).toEqual({ faqs: 2, overview: 1, highlights: 1 });
		const german = english
			.replace('Brief Overview', 'Überblick')
			.replace('Key Highlights', 'Das Wichtigste')
			.replace('## FAQs', '## Häufig gestellte Fragen');
		expect(postStructure(german, DE)).toEqual({ faqs: 2, overview: 1, highlights: 1 });
	});
});

const germanBase = english.replace('Brief Overview', 'Kurzüberblick').replace('Key Highlights', 'Das Wichtigste');

describe('structureMismatches', () => {
	it('passes a translation with the same structure', () => {
		const german = english.replace('Brief Overview', 'Kurzüberblick').replace('Key Highlights', 'Das Wichtigste');
		expect(structureMismatches(english, EN, german, DE)).toEqual([]);
	});

	it('flags a translation that lost its FAQ (unrecognized heading) or a section', () => {
		const lost = germanBase.replace('## FAQs', '## Fragen und Antworten').replace('## Kurzüberblick', '## Einleitung');
		expect(structureMismatches(english, EN, lost, DE)).toEqual([
			'faqs: 0 in the translation, 2 in English',
			'overview: 0 in the translation, 1 in English'
		]);
	});

	it('flags a missing FAQ entry', () => {
		const shorter = germanBase.replace('### Two?\n\nB.\n', '');
		expect(structureMismatches(english, EN, shorter, DE)).toEqual(['faqs: 1 in the translation, 2 in English']);
	});
});

describe('published translations', () => {
	const state = computeBlogState();
	const cases = Object.entries(state.locales).flatMap(([locale, s]) => (s?.posts ?? []).map((p) => [locale, p.slug] as const));

	it.each(cases.length > 0 ? cases : [['(none)', '(no translated post yet)'] as const])(
		'%s/%s keeps the structure of its English post',
		(locale, slug) => {
			if (locale === '(none)') return;
			const en = readPost(joinPath(BLOG_DIR, `${slug}.svx`)).body;
			const tr = readPost(joinPath(BLOG_DIR, locale, `${slug}.svx`)).body;
			expect(structureMismatches(en, EN, tr, BLOG_STRUCTURE[locale as keyof typeof BLOG_STRUCTURE])).toEqual([]);
		}
	);
});
