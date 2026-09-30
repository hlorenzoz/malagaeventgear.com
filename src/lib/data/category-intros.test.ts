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
