#!/usr/bin/env bun
/**
 * status.ts: which translations of which published English posts are missing or stale.
 *
 *   bun scripts/translate/status.ts [--json]
 *
 * Built on the same pieces the build and the content planner use: computeBlogState (what the
 * build publishes), findStaleTranslations (blog-pipeline, the freshness rule of post-freshness
 * .test.ts) and readTranslationBacklog (scripts/keywords/new-post-quota.ts, the count that caps
 * new posts). A malformed file is reported and left out, as in `vite dev`.
 */
import { findStaleTranslations } from '../../src/lib/data/blog-pipeline';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { computeBlogState } from '../blog-sources';
import { readTranslationBacklog } from '../keywords/new-post-quota';

export interface StatusRow {
	slug: string;
	/** The English publishDate (YYYY-MM-DD): the oldest posts come first. */
	publishDate: string;
	missing: string[];
	stale: string[];
}

export interface StatusSummary {
	posts: number;
	locales: number;
	/** posts x locales. */
	pairs: number;
	missing: number;
	stale: number;
	incompletePosts: number;
	complete: boolean;
}

/**
 * Pure. `translatedByLocale` lists the English slugs each locale publishes, `staleKeys` the
 * `<locale>/<slug>` pairs whose translation is older than the English post. Only incomplete
 * posts are returned.
 */
export function computeStatus(
	english: { slug: string; publishDate: string }[],
	translatedByLocale: Record<string, string[]>,
	staleKeys: string[],
	locales: readonly string[]
): StatusRow[] {
	const stale = new Set(staleKeys);
	const published = Object.fromEntries(
		locales.map((l) => [l, new Set(translatedByLocale[l] ?? [])])
	);
	return english
		.map((post) => ({
			slug: post.slug,
			publishDate: post.publishDate.slice(0, 10),
			missing: locales.filter((l) => !published[l].has(post.slug)),
			stale: locales.filter((l) => published[l].has(post.slug) && stale.has(`${l}/${post.slug}`))
		}))
		.filter((row) => row.missing.length > 0 || row.stale.length > 0)
		.sort((a, b) => a.publishDate.localeCompare(b.publishDate) || a.slug.localeCompare(b.slug));
}

export function summarize(posts: number, locales: number, rows: StatusRow[]): StatusSummary {
	const missing = rows.reduce((n, r) => n + r.missing.length, 0);
	const stale = rows.reduce((n, r) => n + r.stale.length, 0);
	return {
		posts,
		locales,
		pairs: posts * locales,
		missing,
		stale,
		incompletePosts: rows.length,
		complete: missing === 0 && stale === 0
	};
}

export function formatStatus(rows: StatusRow[], summary: StatusSummary): string[] {
	if (summary.complete)
		return [
			`complete: ${summary.posts} posts x ${summary.locales} locales, nothing missing or stale`
		];
	const cell = (xs: string[]) => (xs.length > 0 ? xs.join(', ') : '-');
	const table = rows.map((r) => [r.slug, r.publishDate, cell(r.missing), cell(r.stale)]);
	const head = ['post', 'published', 'missing', 'stale'];
	const widths = head.map((h, i) => Math.max(h.length, ...table.map((row) => row[i].length)));
	// The last column is never padded, so no line ends in spaces.
	const line = (cells: string[]) =>
		cells.map((c, i) => (i === cells.length - 1 ? c : c.padEnd(widths[i]))).join('  ');
	return [
		line(head),
		...table.map(line),
		`${summary.posts} posts x ${summary.locales} locales: ${summary.missing} missing, ${summary.stale} stale (${summary.incompletePosts} posts incomplete)`
	];
}

function main(): void {
	const json = process.argv.includes('--json');
	const warnings: string[] = [];
	const state = computeBlogState({ onProblems: (problems) => warnings.push(...problems) });
	const locales = [...PREFIXED_LOCALES];
	const translated: Record<string, string[]> = {};
	const staleKeys: string[] = [];
	for (const locale of locales) {
		const posts = state.locales[locale]?.posts ?? [];
		translated[locale] = posts.map((p) => p.slug);
		staleKeys.push(...findStaleTranslations(posts, state.english));
	}
	const rows = computeStatus(state.english, translated, staleKeys, locales);
	const summary = summarize(state.english.length, locales.length, rows);

	// Cross check with the count that caps new posts: it reads the raw files, the rest what the build publishes.
	const backlog = readTranslationBacklog();
	const crossCheck =
		backlog.missing === summary.missing
			? null
			: `the content planner counts ${backlog.missing} missing translations (raw files) and this list ${summary.missing} (what the build publishes): a translation with a future publishDate or a malformed file explains the difference`;

	if (json) {
		console.log(JSON.stringify({ summary, posts: rows, warnings, crossCheck }, null, 2));
		return;
	}
	for (const w of warnings) console.log(`warning: ${w}`);
	for (const line of formatStatus(rows, summary)) console.log(line);
	if (crossCheck) console.log(`note: ${crossCheck}`);
}

if (import.meta.main) main();
