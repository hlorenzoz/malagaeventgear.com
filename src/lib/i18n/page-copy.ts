import type { Locale } from './locales';

/**
 * Page specific copy, colocated with its page: `src/routes/(public)/<page>/i18n/<locale>.ts`.
 * `en.ts` is the source and exports `type Copy`. Every other locale exports
 * `default {...} satisfies Copy` plus `updated` (YYYY-MM-DD), the date of THAT translation,
 * which feeds the locale sitemap (CLAUDE.md §11). The page's `+page.ts` loads only the
 * current locale:
 *
 *   export const load: PageLoad = async ({ parent }) => ({
 *     copy: await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), (await parent()).locale)
 *   });
 *
 * A missing locale falls back to English, which the completeness guard forbids for every
 * PUBLISHED locale.
 */
export async function loadPageCopy<T>(
	loaders: Record<string, () => Promise<unknown>>,
	locale: Locale
): Promise<T> {
	const loader = loaders[`./i18n/${locale}.ts`] ?? loaders['./i18n/en.ts'];
	if (!loader) throw new Error('page copy: ./i18n/en.ts is missing');
	return ((await loader()) as { default: T }).default;
}
