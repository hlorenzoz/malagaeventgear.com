/**
 * category-intros.test.ts: the two thin, indexable blog listing pages (the categories index and the
 * Gadgets category) carry a short real introduction in every language (Ubersuggest audit,
 * 2026-09-30, content_count_words). Nothing here pads: it is one plain sentence pair per page.
 */
import { describe, it, expect } from 'vitest';
import { LOCALES } from '$lib/i18n/locales';

type IndexCopy = { intro: string };
type CategoryCopy = { intros: Record<string, string> };

const index = import.meta.glob('/src/routes/**/blog/categories/i18n/*.ts', {
	eager: true
}) as Record<string, { default: IndexCopy; updated?: string }>;
const category = import.meta.glob('/src/routes/**/blog/category/**/i18n/*.ts', {
	eager: true
}) as Record<string, { default: CategoryCopy; updated?: string }>;

const byLocale = <T>(mods: Record<string, T>) =>
	Object.fromEntries(
		Object.entries(mods).map(([p, m]) => [p.split('/').pop()!.replace('.ts', ''), m])
	);

const indexByLocale = byLocale(index);
const categoryByLocale = byLocale(category);
const ALL = [...LOCALES] as string[];

describe('category page introductions', () => {
	it('exist for the 13 locales', () => {
		expect(ALL).toHaveLength(13);
		for (const l of ALL) {
			expect(indexByLocale[l], `categories i18n ${l}`).toBeDefined();
			expect(categoryByLocale[l], `category i18n ${l}`).toBeDefined();
		}
	});

	it('the categories index has an introduction in every locale', () => {
		for (const l of ALL) {
			const intro = indexByLocale[l].default.intro;
			expect(intro?.length, `${l} intro`).toBeGreaterThan(40);
		}
	});

	it('the Gadgets category has an introduction in every locale', () => {
		for (const l of ALL) {
			const intro = categoryByLocale[l].default.intros?.gadgets;
			expect(intro?.length, `${l} gadgets intro`).toBeGreaterThan(20);
		}
	});

	it('follows rule 12: ASCII punctuation, and full width punctuation only in Chinese', () => {
		const zh = new Set(['zh-hans', 'zh-tw', 'zh-hk']);
		for (const l of ALL) {
			const texts = [
				indexByLocale[l].default.intro,
				categoryByLocale[l].default.intros?.gadgets ?? ''
			];
			for (const t of texts) {
				expect(t, l).not.toMatch(/[—–‘’“”… «»„]/);
				if (!zh.has(l)) expect(t, l).not.toContain(';');
			}
		}
	});

	it('moves the freshness date of each translated page that changed', () => {
		for (const l of ALL.filter((x) => x !== 'en')) {
			expect(indexByLocale[l].updated, `categories ${l}`).toBe('2026-09-30');
			expect(categoryByLocale[l].updated, `category ${l}`).toBe('2026-09-30');
		}
	});
});

describe('category page meta descriptions (Bing Webmaster, 2026-09-30: too short)', () => {
	const maps = import.meta.glob('/src/lib/i18n/content-map/locales/*.ts', {
		eager: true
	}) as Record<string, { default: { categories: Record<string, { name: string }> } }>;
	const namesOf = (l: string) =>
		Object.values(maps[`/src/lib/i18n/content-map/locales/${l}.ts`].default.categories).map(
			(c) => c.name
		);
	type Tpl = { descriptionTemplate: string };
	const tpl = (l: string) => (categoryByLocale[l].default as unknown as Tpl).descriptionTemplate;

	it('every locale template renders a description of a useful length for every category', () => {
		const zh = new Set(['zh-hans', 'zh-tw', 'zh-hk']);
		for (const l of ALL.filter((x) => x !== 'en')) {
			for (const name of namesOf(l)) {
				const d = tpl(l).replace('{name}', name);
				const [min, max] = zh.has(l) ? [55, 110] : [130, 175];
				expect(d.length, `${l} ${name}: ${d}`).toBeGreaterThanOrEqual(min);
				expect(d.length, `${l} ${name}: ${d}`).toBeLessThanOrEqual(max);
			}
		}
	});

	it('the English template renders 130 to 175 characters for the English category names', () => {
		for (const name of [
			'Events',
			'Audio Visual Rental',
			'Weddings',
			'News',
			'Corporate & Enterprise',
			'Event Planning',
			'Gadgets'
		]) {
			const d = tpl('en').replace('{name}', name);
			expect(d.length, d).toBeGreaterThanOrEqual(130);
			expect(d.length, d).toBeLessThanOrEqual(175);
		}
	});

	it('keeps the {name} token exactly once and follows rule 12', () => {
		for (const l of ALL) {
			const t = tpl(l);
			expect(t.split('{name}').length - 1, l).toBe(1);
			expect(t, l).not.toMatch(/[—–‘’“”… «»„]/);
		}
	});
});

describe('category card descriptions on the categories index (Ubersuggest low word count)', () => {
	const SLUGS = [
		'events',
		'audio-visual-rental',
		'weddings',
		'news',
		'corporate-enterprise',
		'gadgets'
	];
	type Desc = { descriptions: Record<string, string> };
	const desc = (l: string) => (indexByLocale[l].default as unknown as Desc).descriptions;

	it('every locale describes each published category, in its own words', () => {
		const zh = new Set(['zh-hans', 'zh-tw', 'zh-hk']);
		for (const l of ALL) {
			for (const s of SLUGS) {
				const t = desc(l)?.[s];
				expect(t?.length, `${l} ${s}`).toBeGreaterThan(zh.has(l) ? 15 : 60);
			}
		}
	});

	it('does not repeat one description under two categories in the same locale', () => {
		for (const l of ALL) {
			const texts = SLUGS.map((s) => desc(l)[s]);
			expect(new Set(texts).size, l).toBe(texts.length);
		}
	});

	it('follows rule 12: ASCII punctuation, and no semicolons outside Chinese', () => {
		const zh = new Set(['zh-hans', 'zh-tw', 'zh-hk']);
		for (const l of ALL) {
			for (const s of SLUGS) {
				const t = desc(l)[s];
				expect(t, `${l} ${s}`).not.toMatch(/[—–‘’“”… «»„]/);
				if (!zh.has(l)) expect(t, `${l} ${s}`).not.toContain(';');
			}
		}
	});
});
