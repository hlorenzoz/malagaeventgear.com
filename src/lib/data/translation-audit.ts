/**
 * Audit of the translated posts (Fase 4), pure so it runs on fixtures and on the real files
 * alike (post-freshness.test.ts, scripts/post-touch.ts). Relative imports: build tooling runs
 * it outside SvelteKit.
 */
import { TranslatedPostSchema } from '../types/blog';
import type { LocaleContentMap } from '../i18n/content-map/schema';
import {
	buildLocalizedPosts,
	buildPostsFromGlob,
	findStaleTranslations,
	lastChangeOf,
	translationPathInfo,
	type GlobResult,
	type TranslationGlob
} from './blog-pipeline';
import { PREFIXED_LOCALES } from '../i18n/locales';

/**
 * Every problem of the translation files, one message each, `<locale>/<en-slug>: ...`:
 * a folder that is not a site locale, invalid frontmatter (drafts included), no English post,
 * a non draft translation missing from the locale's content map (it would silently never
 * publish), and a PUBLISHED translation older than its English post (CLAUDE.md, "Reglas
 * mandatorias de idioma", rule 2). Empty means healthy.
 */
export function auditTranslations(
	englishGlob: GlobResult,
	translations: TranslationGlob,
	maps: Partial<Record<string, LocaleContentMap>>,
	now: Date = new Date()
): string[] {
	const problems: string[] = [];
	const englishSlugs = new Set(Object.keys(englishGlob).map((p) => p.split('/').pop()!.replace(/\.svx$/, '')));
	const english = buildPostsFromGlob(englishGlob, now);

	for (const [path, module] of Object.entries(translations)) {
		const info = translationPathInfo(path);
		if (!info) {
			const folder = path.split('/').slice(-2, -1)[0];
			problems.push(`${path}: ${folder} is not a prefixed site locale (src/lib/i18n/locales.ts)`);
			continue;
		}
		const id = `${info.locale}/${info.enSlug}`;
		if (!englishSlugs.has(info.enSlug)) {
			problems.push(`${id}: there is no English post src/content/blog/${info.enSlug}.svx`);
			continue;
		}
		const parsed = TranslatedPostSchema.safeParse(module.metadata);
		if (!parsed.success) {
			const issues = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} ${i.message}`).join(', ');
			problems.push(`${id}: invalid frontmatter (${issues})`);
			continue;
		}
		if (!parsed.data.draft && !maps[info.locale]?.posts[info.enSlug]) {
			problems.push(`${id}: missing from content-map/locales/${info.locale}.ts posts (slug and keyword)`);
		}
	}

	const englishBySlug = new Map(english.map((p) => [p.slug, p]));
	for (const locale of PREFIXED_LOCALES) {
		const published = buildLocalizedPosts(locale, english, translations, maps[locale] ?? null, now);
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
