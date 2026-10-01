#!/usr/bin/env bun
/**
 * check.ts: checks the 12 translations of one post against the English source.
 *
 *   bun scripts/translate/check.ts <slug> [--post-build] [--strict] [--locale fr,de]
 *
 * Prints one row per locale and exits non-zero when anything is wrong. Keyword usage (first
 * paragraph, at least two exact occurrences, verbatim in the title) and single digit differences
 * (often spelled out) are warnings unless --strict, because translations from before those
 * lessons do not meet them. The logic lives in
 * check-lib.ts (pure, tested). With --post-build it also audits the built pages in
 * `.svelte-kit/cloudflare` (in-page anchors, heading and image counts, leaked markdown) and
 * says NEEDS BUILD when the build is older than the sources.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_MAPS } from '../../src/lib/i18n/content-map/all';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import { assertSlug, todayUtc } from './brief-lib';
import {
	auditBuiltPage,
	checkLocale,
	isBuildStale,
	pageAuditIssues,
	parsePost,
	siloRelatives,
	type LocaleReport
} from './check-lib';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BLOG = join(ROOT, 'src', 'content', 'blog');
const BUILD = join(ROOT, '.svelte-kit', 'cloudflare');

/** Built page of a post: `<locale>/<blog segment>/<post slug>/index.html` (decoded folder names). */
export function builtPostPath(
	locale: string | null,
	map: LocaleContentMap | null,
	slug: string
): string {
	if (locale === null || !map) return join(BUILD, 'blog', slug, 'index.html');
	const blog = (map.pages['/blog/']?.path ?? '/blog/').split('/').filter(Boolean);
	return join(BUILD, locale, ...blog, map.posts[slug]?.slug ?? slug, 'index.html');
}

/** English slug to `targetPage` for every English post (the silo graph, for the keyword exemption). */
function readTargetPages(): Record<string, string> {
	const targets: Record<string, string> = {};
	for (const file of readdirSync(BLOG).filter((f) => f.endsWith('.svx'))) {
		const post = parsePost(readFileSync(join(BLOG, file), 'utf8'));
		targets[file.replace(/\.svx$/, '')] = post?.values.targetPage ?? '';
	}
	return targets;
}

const mtime = (path: string): number | null => (existsSync(path) ? statSync(path).mtimeMs : null);

function printTable(reports: LocaleReport[]): void {
	const head = ['locale', 'title', 'desc', 'kw body/p1/title', 'h2/h3/img/cta/mq/q/rows', 'result'];
	const rows = reports.map((r) => [
		r.locale,
		String(r.titleLength ?? '-'),
		String(r.descriptionLength ?? '-'),
		r.keyword === null
			? '-'
			: `${r.keywordCount} ${r.keywordInFirstParagraph ? 'y' : 'n'} ${r.keywordInTitle ? 'y' : 'n'}`,
		r.structure || '-',
		r.issues.length === 0
			? r.warnings.length > 0
				? 'ok (warnings)'
				: 'ok'
			: `${r.issues.length} problem(s)`
	]);
	const widths = head.map((h, i) => Math.max(h.length, ...rows.map((row) => row[i].length)));
	const line = (cells: string[]) =>
		cells
			.map((c, i) => c.padEnd(widths[i]))
			.join('  ')
			.trimEnd();
	console.log(line(head));
	for (const row of rows) console.log(line(row));
}

function main(): void {
	const args = process.argv.slice(2);
	const postBuild = args.includes('--post-build');
	const strict = args.includes('--strict');
	const localeFlag = args.indexOf('--locale');
	const wanted =
		localeFlag >= 0
			? (args[localeFlag + 1] ?? '').split(',').filter(Boolean)
			: [...PREFIXED_LOCALES];
	const slug = args.find((a, i) => !a.startsWith('--') && (localeFlag < 0 || i !== localeFlag + 1));
	if (!slug) {
		console.error(
			'Usage: bun scripts/translate/check.ts <slug> [--post-build] [--strict] [--locale fr,de]'
		);
		process.exit(2);
	}
	try {
		assertSlug(slug);
	} catch (error) {
		console.error(`[check] ${(error as Error).message}`);
		process.exit(2);
	}
	const unknown = wanted.filter((l) => !(PREFIXED_LOCALES as readonly string[]).includes(l));
	if (unknown.length > 0) {
		console.error(`[check] unknown locale(s): ${unknown.join(', ')}`);
		process.exit(2);
	}
	const englishFile = join(BLOG, `${slug}.svx`);
	if (!existsSync(englishFile)) {
		console.error(`[check] there is no English post src/content/blog/${slug}.svx`);
		process.exit(2);
	}
	const english = readFileSync(englishFile, 'utf8');
	const today = todayUtc();
	const relatedSlugs = siloRelatives(slug, readTargetPages());

	const reports = wanted.map((locale) => {
		const file = join(BLOG, locale, `${slug}.svx`);
		return checkLocale({
			locale,
			slug,
			english,
			text: existsSync(file) ? readFileSync(file, 'utf8') : null,
			map: CONTENT_MAPS[locale as keyof typeof CONTENT_MAPS],
			today,
			relatedSlugs,
			strict
		});
	});

	if (postBuild) {
		const enPage = builtPostPath(null, null, slug);
		const enHtml = existsSync(enPage) ? readFileSync(enPage, 'utf8') : null;
		for (const report of reports) {
			const { locale } = report;
			if (report.issues.some((i) => i.startsWith('file is missing'))) continue;
			const map = CONTENT_MAPS[locale as keyof typeof CONTENT_MAPS];
			const page = builtPostPath(locale, map, slug);
			const sources = [
				mtime(englishFile),
				mtime(join(BLOG, locale, `${slug}.svx`)),
				mtime(join(ROOT, 'src', 'lib', 'i18n', 'content-map', 'locales', `${locale}.ts`))
			].filter((m): m is number => m !== null);
			if (!existsSync(page)) {
				report.issues.push(`NEEDS BUILD: built page not found (${page.replace(ROOT + '/', '')})`);
			} else if (isBuildStale(mtime(page), sources)) {
				report.issues.push(
					'NEEDS BUILD: the built page is older than its sources, run `bun run build`'
				);
			} else if (enHtml === null) {
				report.issues.push('NEEDS BUILD: the English built page is missing');
			} else {
				report.issues.push(
					...pageAuditIssues(
						locale,
						auditBuiltPage(readFileSync(page, 'utf8')),
						auditBuiltPage(enHtml)
					)
				);
			}
		}
	}

	printTable(reports);
	const failing = reports.filter((r) => r.issues.length > 0);
	for (const r of reports.filter((x) => x.issues.length > 0 || x.warnings.length > 0)) {
		console.log(`\n${r.locale}`);
		for (const issue of r.issues) console.log(`  - ${issue}`);
		for (const warning of r.warnings) console.log(`  - warning: ${warning}`);
	}
	const problems = failing.reduce((n, r) => n + r.issues.length, 0);
	const warned = reports.reduce((n, r) => n + r.warnings.length, 0);
	const note =
		warned > 0
			? ` (${warned} warning(s) about keyword usage or small numbers, --strict fails on them)`
			: '';
	console.log(
		problems === 0
			? `\nALL OK${note}`
			: `\n${problems} PROBLEM(S) in ${failing.length} locale(s)${note}`
	);
	process.exit(problems === 0 ? 0 : 1);
}

if (import.meta.main) main();
