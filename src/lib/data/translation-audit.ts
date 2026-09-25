/**
 * Audit of the translated posts (Fase 4), pure so it runs on fixtures and on the real files
 * alike (post-freshness.test.ts, scripts/post-touch.ts). Relative imports: build tooling runs
 * it outside SvelteKit.
 */
import { TranslatedPostSchema } from '../types/blog.ts';
import type { LocaleContentMap } from '../i18n/content-map/schema.ts';
import {
	buildLocalizedPosts,
	buildPostsFromGlob,
	findStaleTranslations,
	lastChangeOf,
	translationPathInfo,
	zodIssues,
	type GlobResult,
	type TranslationGlob
} from './blog-pipeline.ts';
import { PREFIXED_LOCALES } from '../i18n/locales.ts';

/**
 * Problems that make a translation file MALFORMED, one message each, `<locale>/<en-slug>: ...`:
 * a folder that is not a site locale, invalid frontmatter (drafts included), no English post,
 * and a non draft translation missing from the locale's content map (it would silently never
 * publish). The build fails on any of them (scripts/blog-sources.ts, `computeBlogState`), so a
 * broken file never drops a post, or a whole locale's blog, without a word. Empty means valid.
 */
export function malformedTranslations(
	englishGlob: GlobResult,
	translations: TranslationGlob,
	maps: Partial<Record<string, LocaleContentMap>>
): string[] {
	return malformedTranslationFiles(englishGlob, translations, maps).map((m) => m.problem);
}

/** The same problems with the file each one belongs to, to leave it out (dev server). */
export function malformedTranslationFiles(
	englishGlob: GlobResult,
	translations: TranslationGlob,
	maps: Partial<Record<string, LocaleContentMap>>
): { path: string; problem: string }[] {
	const problems: { path: string; problem: string }[] = [];
	const englishSlugs = new Set(Object.keys(englishGlob).map((p) => p.split('/').pop()!.replace(/\.svx$/, '')));

	for (const [path, module] of Object.entries(translations)) {
		const info = translationPathInfo(path);
		if (!info) {
			const folder = path.split('/').slice(-2, -1)[0];
			problems.push({ path, problem: `${path}: ${folder} is not a prefixed site locale (src/lib/i18n/locales.ts)` });
			continue;
		}
		const id = `${info.locale}/${info.enSlug}`;
		if (!englishSlugs.has(info.enSlug)) {
			problems.push({ path, problem: `${id}: there is no English post src/content/blog/${info.enSlug}.svx` });
			continue;
		}
		const parsed = TranslatedPostSchema.safeParse(module.metadata);
		if (!parsed.success) {
			problems.push({ path, problem: `${id}: invalid frontmatter (${zodIssues(parsed.error)})` });
			continue;
		}
		if (!parsed.data.draft && !maps[info.locale]?.posts[info.enSlug]) {
			problems.push({ path, problem: `${id}: missing from content-map/locales/${info.locale}.ts posts (slug and keyword)` });
		}
	}
	return problems;
}

/**
 * Every problem of the translation files: the malformed ones above, plus a PUBLISHED
 * translation older than its English post (CLAUDE.md, "Reglas mandatorias de idioma", rule 2),
 * which the test suite guards (post-freshness.test.ts) but does not fail the build. Empty means
 * healthy.
 */
export function auditTranslations(
	englishGlob: GlobResult,
	translations: TranslationGlob,
	maps: Partial<Record<string, LocaleContentMap>>,
	now: Date = new Date()
): string[] {
	const problems = malformedTranslations(englishGlob, translations, maps);
	// Freshness only over the files that parse: a malformed one is already reported.
	const valid = Object.fromEntries(
		Object.entries(translations).filter(([, m]) => TranslatedPostSchema.safeParse(m.metadata).success)
	);
	const english = buildPostsFromGlob(englishGlob, now);
	const englishBySlug = new Map(english.map((p) => [p.slug, p]));
	for (const locale of PREFIXED_LOCALES) {
		const published = buildLocalizedPosts(locale, english, valid, maps[locale] ?? null, now);
		const stale = new Set(findStaleTranslations(published, english));
		for (const post of published.filter((p) => stale.has(`${locale}/${p.slug}`))) {
			const source = lastChangeOf(englishBySlug.get(post.slug)!);
			problems.push(
				`${locale}/${post.slug}: stale, it translates the English of ${post.sourceUpdated} but the English post changed on ${source} (update it and its sourceUpdated)`
			);
		}
	}
	return problems;
}
