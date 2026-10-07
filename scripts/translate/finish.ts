#!/usr/bin/env bun
/**
 * finish.ts: closes the translation of one post.
 *
 *   bun scripts/translate/finish.ts <slug> [--no-commit] [--message "feat(blog): <slug> ..."]
 *
 * 1. check.ts <slug>                       the 12 translations against the English
 * 2. bunx vitest run scripts src/lib       the full suite
 * 3. bun run build
 * 4. per locale post-sitemap counts        printed, and each sitemap must exist and have URLs
 * 5. check.ts <slug> --post-build          in-page anchors of the built pages
 * 6. ONE LOCAL commit of ONLY src/content/blog (the English post AND its 12 translations),
 *    src/lib/i18n/content-map, src/lib/data/post-faqs.json, src/lib/data/post-toc.json,
 *    .agents/CHANGELOG.md and .agents/context/keywords/nlp-terms. Nothing of the post is
 *    committed before this step: the pre-commit guard (commit-guard.ts) refuses an English post
 *    without its translations.
 *
 * It stops at the first failing step. It refuses to start, and again before committing, when
 * anything is already staged (so it can never sweep another session's work into the commit).
 * It never pushes and adds no attribution to the message. --no-commit stops after step 5.
 *
 * Activity log (`scripts/log/agent-log.ts`): the commit is recorded as a `commit` event and a
 * failed step as `step-failed`, actor `post-translator`, mode `demanda` unless the env var
 * `AGENT_LOG_MODE` says `auto`. Logging never changes the outcome of this script.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { appendAgentLog, commitDetail, modeFromEnv } from '../log/agent-log';
import { assertSlug } from './brief-lib';

/**
 * The only paths the commit may contain. The English post and its 12 translations go in ONE commit
 * (a commit that publishes the English post alone is refused by commit-guard.ts), so the changelog
 * entry and the SERP terms file of the content task are part of it.
 */
export const COMMIT_PATHS = [
	'src/content/blog',
	'src/lib/i18n/content-map',
	'src/lib/data/post-faqs.json',
	'src/lib/data/post-toc.json',
	'.agents/CHANGELOG.md',
	'.agents/context/keywords/nlp-terms'
];

/**
 * The commit message: by default the one of a brand new translation. A content change (a new
 * section or FAQ) passes its own with `--message`, which must be a conventional commit and carry
 * no attribution (CLAUDE.md).
 */
export function commitMessage(slug: string, custom?: string): string {
	if (custom === undefined) return `feat(blog): translate ${slug} into the 12 site languages`;
	const message = custom.trim();
	if (!/^(feat|fix|docs|chore|refactor|test)(\([a-z0-9-]+\))?: \S/.test(message)) {
		throw new Error(`--message must be a conventional commit ("feat(blog): <slug> ..."), got "${message}"`);
	}
	if (/co-authored-by|generated with|🤖/i.test(message)) {
		throw new Error('--message must not carry attribution (no Co-Authored-By, no "Generated with")');
	}
	return message;
}

/** Lines of `git ... --name-only` output. */
export function nameList(output: string): string[] {
	return output.split('\n').filter((l) => l.trim().length > 0);
}

/** Null when the index is empty, otherwise why the script refuses to run. */
export function stagedRefusal(staged: string[]): string | null {
	if (staged.length === 0) return null;
	const shown =
		staged.slice(0, 5).join(', ') + (staged.length > 5 ? ` (+${staged.length - 5})` : '');
	return `${staged.length} file(s) already staged (${shown}): commit or unstage them first, this script only commits the translation paths`;
}

/** Files that are not under one of the commit paths. */
export function outsideCommitPaths(files: string[]): string[] {
	return files.filter((f) => !COMMIT_PATHS.some((p) => f === p || f.startsWith(`${p}/`)));
}

/** The git commands of the local commit, in order. There is no push. */
export function commitCommands(slug: string, message?: string): string[][] {
	return [
		['git', 'add', '--', ...COMMIT_PATHS],
		['git', 'commit', '-m', commitMessage(slug, message)]
	];
}

/** Detail of the `commit` event of the activity log. */
export function commitLogDetail(
	slug: string,
	hash: string,
	subject: string,
	files: number
): string {
	return `slug=${slug} ${commitDetail(hash, subject, `files=${files}`)}`;
}

export function countLocs(xml: string): number {
	return (xml.match(/<loc>/g) ?? []).length;
}

export function formatSitemapCounts(counts: Record<string, number | null>): string {
	return Object.entries(counts)
		.map(([locale, n]) => `${locale}:${n === null ? 'missing' : n}`)
		.join(' ');
}

export function sitemapProblems(counts: Record<string, number | null>): string[] {
	const problems: string[] = [];
	for (const [locale, n] of Object.entries(counts)) {
		if (n === null) problems.push(`post-sitemap-${locale}.xml is missing from the build`);
		else if (n === 0) problems.push(`post-sitemap-${locale}.xml has no URLs`);
	}
	return problems;
}

/** The last `n` lines of a text, without a trailing blank. */
export function tailLines(text: string, n: number): string {
	return text.replace(/\s+$/, '').split('\n').slice(-n).join('\n');
}

// ---------------------------------------------------------------------------

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CHECK = join('scripts', 'translate', 'check.ts');

let currentSlug: string | null = null;

/** One line of the monthly activity log. Never throws. */
function alog(event: 'commit' | 'step-failed', detail: string): void {
	appendAgentLog({
		mode: modeFromEnv(process.env.AGENT_LOG_MODE, 'demanda'),
		actor: 'post-translator',
		event,
		detail
	});
}

function fail(message: string): never {
	console.error(`\n[finish] ${message}`);
	if (currentSlug) alog('step-failed', `slug=${currentSlug} step=finish reason="${message}"`);
	process.exit(1);
}

/** Runs a command, streaming nothing: shows the tail of its output, all of it when it fails. */
function runQuiet(label: string, cmd: string[], tail = 12): void {
	console.log(`\n== ${label}`);
	const r = Bun.spawnSync(cmd, { cwd: ROOT, stdout: 'pipe', stderr: 'pipe' });
	const out = `${r.stdout.toString()}${r.stderr.toString()}`;
	if (r.exitCode !== 0) {
		console.error(out);
		fail(`${label} failed (exit ${r.exitCode}), nothing was committed`);
	}
	console.log(tailLines(out, tail));
}

/** Runs a command and returns its output (git state queries). */
function git(args: string[]): string {
	const r = Bun.spawnSync(['git', ...args], { cwd: ROOT, stdout: 'pipe', stderr: 'pipe' });
	if (r.exitCode !== 0) fail(`git ${args.join(' ')} failed: ${r.stderr.toString().trim()}`);
	return r.stdout.toString();
}

function main(): void {
	const args = process.argv.slice(2);
	const noCommit = args.includes('--no-commit');
	const messageAt = args.indexOf('--message');
	const message = messageAt >= 0 ? args[messageAt + 1] : undefined;
	if (messageAt >= 0 && !message) {
		console.error('[finish] --message needs a value');
		process.exit(2);
	}
	const slug = args.find((a, i) => !a.startsWith('--') && i !== messageAt + 1);
	if (!slug) {
		console.error('Usage: bun scripts/translate/finish.ts <slug> [--no-commit] [--message "feat(blog): <slug> ..."]');
		process.exit(2);
	}
	try {
		assertSlug(slug);
	} catch (error) {
		console.error(`[finish] ${(error as Error).message}`);
		process.exit(2);
	}
	if (!existsSync(join(ROOT, 'src', 'content', 'blog', `${slug}.svx`))) {
		console.error(`[finish] there is no English post src/content/blog/${slug}.svx`);
		process.exit(2);
	}
	currentSlug = slug;
	try {
		commitMessage(slug, message);
	} catch (error) {
		console.error(`[finish] ${(error as Error).message}`);
		process.exit(2);
	}
	if (!noCommit) {
		const refusal = stagedRefusal(nameList(git(['diff', '--cached', '--name-only'])));
		if (refusal) fail(`refusing to run: ${refusal}`);
	}

	runQuiet('check', ['bun', CHECK, slug], 40);
	runQuiet('vitest run scripts src/lib', ['bunx', 'vitest', 'run', 'scripts', 'src/lib'], 8);
	runQuiet('build', ['bun', 'run', 'build'], 6);

	console.log('\n== post sitemaps');
	const counts: Record<string, number | null> = {};
	for (const locale of PREFIXED_LOCALES) {
		const file = join(ROOT, '.svelte-kit', 'cloudflare', `post-sitemap-${locale}.xml`);
		counts[locale] = existsSync(file) ? countLocs(readFileSync(file, 'utf8')) : null;
	}
	console.log(formatSitemapCounts(counts));
	const sitemapIssues = sitemapProblems(counts);
	if (sitemapIssues.length > 0) fail(sitemapIssues.join('; '));

	runQuiet('check --post-build', ['bun', CHECK, slug, '--post-build'], 40);

	if (noCommit) {
		console.log('\n[finish] --no-commit: everything passed, nothing was committed');
		return;
	}

	console.log('\n== commit (local, no push)');
	const [add, commit] = commitCommands(slug, message);
	// The index may have changed during the long steps above.
	const refusal = stagedRefusal(nameList(git(['diff', '--cached', '--name-only'])));
	if (refusal) fail(`refusing to commit: ${refusal}`);
	git(add.slice(1));
	const staged = nameList(git(['diff', '--cached', '--name-only']));
	const stray = outsideCommitPaths(staged);
	if (stray.length > 0) {
		git(['reset', '-q']);
		fail(
			`unexpected staged file(s) outside the translation paths, index reset: ${stray.join(', ')}`
		);
	}
	if (staged.length === 0) fail('there is nothing to commit under the translation paths');
	git(commit.slice(1));
	console.log(tailLines(git(['log', '--oneline', '-1']), 1));
	const [hash, ...subject] = git(['log', '-1', '--format=%h%x09%s']).trim().split('\t');
	alog('commit', commitLogDetail(slug, hash, subject.join('\t'), staged.length));
	console.log(`${staged.length} file(s) committed. Not pushed.`);
}

if (import.meta.main) main();
