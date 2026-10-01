#!/usr/bin/env bun
/**
 * add-content-map.ts: inserts the content map entries of one post, for several locales at once.
 *
 *   bun scripts/translate/add-content-map.ts <slug> --map <file.json | ->
 *
 * The JSON is `{ "fr": { "slug": "...", "keyword": "..." }, "it": { ... } }` (an optional
 * `"status": "propuesta"` is accepted, nothing else is: no keyword is validated without data).
 * Each entry is added as `posts['<slug>'] = { slug, keyword, status: 'propuesta' }` at the end of
 * the `posts` block of `src/lib/i18n/content-map/locales/<locale>.ts`. Without --map, or with
 * `--map -`, the JSON is read from stdin.
 *
 * Idempotent: an identical entry that already exists is left alone. It refuses (and writes
 * nothing for ANY locale) a different entry under an existing key, a slug that another page,
 * package, category, segment or post of that locale already uses, and a keyword equal to another
 * keyword of the locale. Containment between keywords is reported by check.ts, not refused here.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_MAPS } from '../../src/lib/i18n/content-map/all';
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import { PREFIXED_LOCALES } from '../../src/lib/i18n/locales';
import { assertSlug } from './brief-lib';
import { keywordCollisions, slugCollisions } from './check-lib';

export class MapRefusal extends Error {}

export interface MapEntry {
	slug: string;
	keyword: string;
}

/** A TypeScript string literal in the style of the content map files (prettier, single quotes). */
export function quote(value: string): string {
	const escaped = value.replace(/\\/g, '\\\\');
	if (!escaped.includes("'")) return `'${escaped}'`;
	if (!escaped.includes('"')) return `"${escaped}"`;
	return `'${escaped.replace(/'/g, "\\'")}'`;
}

/** Validates the JSON of --map. Throws on the first problem, naming the locale. */
export function parseMapInput(input: unknown): Record<string, MapEntry> {
	if (typeof input !== 'object' || input === null || Array.isArray(input)) {
		throw new MapRefusal('the map must be a JSON object of locale -> { slug, keyword }');
	}
	const out: Record<string, MapEntry> = {};
	for (const [locale, raw] of Object.entries(input)) {
		if (!(PREFIXED_LOCALES as readonly string[]).includes(locale)) {
			throw new MapRefusal(
				`unknown locale "${locale}" (expected ${PREFIXED_LOCALES.join(', ')}, English has no content map)`
			);
		}
		if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
			throw new MapRefusal(`${locale}: expected { slug, keyword }`);
		}
		const { slug, keyword, status, ...rest } = raw as Record<string, unknown>;
		if (Object.keys(rest).length > 0)
			throw new MapRefusal(`${locale}: unexpected field(s) ${Object.keys(rest).join(', ')}`);
		if (typeof slug !== 'string' || slug.length === 0 || /[\s/A-Z]/.test(slug)) {
			throw new MapRefusal(`${locale}: slug must be lowercase, without spaces or slashes`);
		}
		if (typeof keyword !== 'string' || keyword.trim().length === 0)
			throw new MapRefusal(`${locale}: keyword must not be empty`);
		if (status !== undefined && status !== 'propuesta') {
			throw new MapRefusal(
				`${locale}: status must be "propuesta" (no keyword is validated without country data)`
			);
		}
		out[locale] = { slug, keyword: keyword.trim() };
	}
	if (Object.keys(out).length === 0) throw new MapRefusal('the map is empty');
	return out;
}

/** Adds `posts[postSlug]` at the end of the posts block, keeping the file's own style. */
export function insertPostEntry(source: string, postSlug: string, entry: MapEntry): string {
	const body = `'${postSlug}': {\n\t\t\tslug: ${quote(entry.slug)},\n\t\t\tkeyword: ${quote(entry.keyword)},\n\t\t\tstatus: 'propuesta'\n\t\t}`;
	const empty = source.indexOf('\n\tposts: {}');
	if (empty >= 0) {
		const at = empty + '\n\tposts: {'.length;
		return `${source.slice(0, at)}\n\t\t${body}\n\t${source.slice(at)}`;
	}
	const open = source.indexOf('\n\tposts: {\n');
	if (open < 0)
		throw new Error('could not find the posts block ("\\n\\tposts: {") in the content map file');
	const close = source.indexOf('\n\t}', open + 1);
	if (close < 0) throw new Error('could not find the end of the posts block');
	return `${source.slice(0, close)},\n\t\t${body}${source.slice(close)}`;
}

export type InsertPlan = { kind: 'insert'; source: string } | { kind: 'present' };

/**
 * What to do for one locale. `map` is the locale's current content map (the evaluated file),
 * `source` its text. Throws MapRefusal, with the locale first, instead of writing a duplicate.
 */
export function planInsert(
	locale: string,
	source: string,
	map: LocaleContentMap,
	postSlug: string,
	entry: MapEntry
): InsertPlan {
	const existing = map.posts[postSlug];
	if (existing) {
		if (existing.slug === entry.slug && existing.keyword === entry.keyword)
			return { kind: 'present' };
		throw new MapRefusal(
			`${locale}: posts['${postSlug}'] already has a different entry (slug ${existing.slug}, keyword "${existing.keyword}")`
		);
	}
	const withEntry: LocaleContentMap = {
		...map,
		posts: { ...map.posts, [postSlug]: { ...entry, status: 'propuesta' } }
	};
	const slugUse = slugCollisions(postSlug, withEntry);
	if (slugUse.length > 0) throw new MapRefusal(`${locale}: ${slugUse[0]}`);
	const keywordUse = keywordCollisions(postSlug, withEntry).filter((m) =>
		m.endsWith('(is equal to it)')
	);
	if (keywordUse.length > 0) throw new MapRefusal(`${locale}: ${keywordUse[0]}`);
	return { kind: 'insert', source: insertPostEntry(source, postSlug, entry) };
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MAPS_DIR = join(ROOT, 'src', 'lib', 'i18n', 'content-map', 'locales');

async function readInput(path: string | undefined): Promise<unknown> {
	const text = !path || path === '-' ? await Bun.stdin.text() : readFileSync(path, 'utf8');
	try {
		return JSON.parse(text);
	} catch (error) {
		throw new MapRefusal(`the map is not valid JSON: ${(error as Error).message}`);
	}
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const mapFlag = args.indexOf('--map');
	const mapPath = mapFlag >= 0 ? args[mapFlag + 1] : undefined;
	const slug = args.find(
		(a, i) => !a.startsWith('--') && a !== '-' && (mapFlag < 0 || i !== mapFlag + 1)
	);
	if (!slug) {
		console.error('Usage: bun scripts/translate/add-content-map.ts <slug> --map <file.json | ->');
		process.exit(2);
	}
	try {
		assertSlug(slug);
		if (!existsSync(join(ROOT, 'src', 'content', 'blog', `${slug}.svx`))) {
			throw new MapRefusal(`there is no English post src/content/blog/${slug}.svx`);
		}
		const entries = parseMapInput(await readInput(mapPath));
		const plans: { locale: string; file: string; plan: InsertPlan }[] = [];
		const problems: string[] = [];
		for (const [locale, entry] of Object.entries(entries)) {
			const file = join(MAPS_DIR, `${locale}.ts`);
			try {
				plans.push({
					locale,
					file,
					plan: planInsert(
						locale,
						readFileSync(file, 'utf8'),
						CONTENT_MAPS[locale as keyof typeof CONTENT_MAPS],
						slug,
						entry
					)
				});
			} catch (error) {
				if (!(error instanceof MapRefusal)) throw error;
				problems.push(error.message);
			}
		}
		if (problems.length > 0) {
			console.error('[add-content-map] refused, nothing was written:');
			for (const p of problems) console.error(`  - ${p}`);
			process.exit(1);
		}
		for (const { locale, file, plan } of plans) {
			if (plan.kind === 'present') {
				console.log(`${locale}: already present`);
			} else {
				writeFileSync(file, plan.source, 'utf8');
				console.log(`${locale}: added posts['${slug}']`);
			}
		}
		const missing = PREFIXED_LOCALES.filter((l) => !(l in entries));
		if (missing.length > 0) console.log(`note: no entry given for ${missing.join(', ')}`);
	} catch (error) {
		console.error(`[add-content-map] ${(error as Error).message}`);
		process.exit(error instanceof MapRefusal ? 1 : 2);
	}
}

if (import.meta.main) await main();
