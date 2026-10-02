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
 *
 * A published, fresh translation can still be out of structure: a killed run once left `fr` with
 * only its dates bumped and no FAQ, and the status said complete because it only looked at
 * publication and dates. So it also compares each translation with its English post (FAQ entries,
 * overview and highlights sections, the same `structureMismatches` as post-structure.test.ts).
 */
import { findStaleTranslations } from '../../src/lib/data/blog-pipeline';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { BLOG_DIR, computeBlogState } from '../blog-sources';
import { BLOG_STRUCTURE } from '../blog-structure';
import { joinPath, readPost } from '../blog-files.mjs';
import { structureMismatches } from '../post-structure.mjs';
import { readTranslationBacklog } from '../keywords/new-post-quota';

export interface StatusRow {
	slug: string;
	/** The English publishDate (YYYY-MM-DD): the oldest posts come first. */
	publishDate: string;
	missing: string[];
	stale: string[];
	/** Locales that publish the post but whose structure differs from the English one. */
	structure: string[];
}

export interface StatusSummary {
	posts: number;
	locales: number;
	/** posts x locales. */
	pairs: number;
	missing: number;
	stale: number;
	/** posts x locales published with a structure that differs from the English post. */
	structure: number;
	incompletePosts: number;
	complete: boolean;
}

/**
 * Pure. `translatedByLocale` lists the English slugs each locale publishes, `staleKeys` the
 * `<locale>/<slug>` pairs whose translation is older than the English post and `structureKeys`
 * those whose structure differs from it. Only incomplete posts are returned.
 */
export function computeStatus(
	english: { slug: string; publishDate: string }[],
	translatedByLocale: Record<string, string[]>,
	staleKeys: string[],
	locales: readonly string[],
	structureKeys: string[] = []
): StatusRow[] {
	const stale = new Set(staleKeys);
	const structure = new Set(structureKeys);
	const published = Object.fromEntries(
		locales.map((l) => [l, new Set(translatedByLocale[l] ?? [])])
	);
	return english
		.map((post) => ({
			slug: post.slug,
			publishDate: post.publishDate.slice(0, 10),
			missing: locales.filter((l) => !published[l].has(post.slug)),
			stale: locales.filter((l) => published[l].has(post.slug) && stale.has(`${l}/${post.slug}`)),
			structure: locales.filter(
				(l) => published[l].has(post.slug) && structure.has(`${l}/${post.slug}`)
			)
		}))
		.filter((row) => row.missing.length > 0 || row.stale.length > 0 || row.structure.length > 0)
		.sort((a, b) => a.publishDate.localeCompare(b.publishDate) || a.slug.localeCompare(b.slug));
}

/**
 * Pure. The `<locale>/<slug>` pairs whose structure differs from the English post. `read` returns
 * a body (`'en'` for the English post) or null when there is no file, and such a pair is skipped:
 * a missing translation is already reported as missing. `compare` lists the differences.
 */
export function findStructureProblems(
	slugs: readonly string[],
	locales: readonly string[],
	read: (locale: string, slug: string) => string | null,
	compare: (english: string, translated: string, locale: string) => string[]
): string[] {
	const keys: string[] = [];
	for (const slug of slugs) {
		const en = read('en', slug);
		if (en === null) continue;
		for (const locale of locales) {
			const tr = read(locale, slug);
			if (tr !== null && compare(en, tr, locale).length > 0) keys.push(`${locale}/${slug}`);
		}
	}
	return keys;
}

export function summarize(posts: number, locales: number, rows: StatusRow[]): StatusSummary {
	const missing = rows.reduce((n, r) => n + r.missing.length, 0);
	const stale = rows.reduce((n, r) => n + r.stale.length, 0);
	const structure = rows.reduce((n, r) => n + r.structure.length, 0);
	return {
		posts,
		locales,
		pairs: posts * locales,
		missing,
		stale,
		structure,
		incompletePosts: rows.length,
		complete: missing === 0 && stale === 0 && structure === 0
	};
}

export function formatStatus(rows: StatusRow[], summary: StatusSummary): string[] {
	if (summary.complete)
		return [
			`complete: ${summary.posts} posts x ${summary.locales} locales, nothing missing, stale or out of structure`
		];
	const cell = (xs: string[]) => (xs.length > 0 ? xs.join(', ') : '-');
	const withStructure = summary.structure > 0;
	const table = rows.map((r) => [
		r.slug,
		r.publishDate,
		cell(r.missing),
		cell(r.stale),
		...(withStructure ? [cell(r.structure)] : [])
	]);
	const head = ['post', 'published', 'missing', 'stale', ...(withStructure ? ['structure'] : [])];
	const widths = head.map((h, i) => Math.max(h.length, ...table.map((row) => row[i].length)));
	// The last column is never padded, so no line ends in spaces.
	const line = (cells: string[]) =>
		cells.map((c, i) => (i === cells.length - 1 ? c : c.padEnd(widths[i]))).join('  ');
	const counts = withStructure
		? `${summary.missing} missing, ${summary.stale} stale, ${summary.structure} out of structure`
		: `${summary.missing} missing, ${summary.stale} stale`;
	return [
		line(head),
		...table.map(line),
		`${summary.posts} posts x ${summary.locales} locales: ${counts} (${summary.incompletePosts} posts incomplete)`,
		...(withStructure
			? ['structure: run `just post-translate-check <slug>` to see what differs (FAQ entries, overview, highlights)']
			: [])
	];
}

/** The body of a post (`'en'` for the English one), or null when the file is not there. */
function readBody(locale: string, slug: string): string | null {
	const file =
		locale === 'en' ? joinPath(BLOG_DIR, `${slug}.svx`) : joinPath(BLOG_DIR, locale, `${slug}.svx`);
	try {
		return readPost(file).body;
	} catch {
		return null;
	}
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
	const structureKeys = findStructureProblems(
		state.english.map((p) => p.slug),
		locales,
		readBody,
		(english, translated, locale) =>
			structureMismatches(english, BLOG_STRUCTURE.en, translated, BLOG_STRUCTURE[locale as keyof typeof BLOG_STRUCTURE])
	);
	const rows = computeStatus(state.english, translated, staleKeys, locales, structureKeys);
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
