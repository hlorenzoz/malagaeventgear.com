#!/usr/bin/env bun
/**
 * backfill-silo-meta.ts - Rellena la metadata de reverse silo en los posts .svx
 * a partir del CSV de PageOptimizer Pro.
 *
 * Uso:
 *   bun scripts/backfill-silo-meta.ts --dry-run   # muestra el plan, no escribe
 *   bun scripts/backfill-silo-meta.ts             # aplica los cambios
 *
 * Reglas (ver AGENTS.md "Reverse Silo del Blog"):
 *  - Filas "Supporting Keyword" del CSV -> siloRole: supporting; keyword = col Keyword;
 *    targetPage = col Top-level page link traducida de raiz vieja a /blog/<pilar>/.
 *  - Filas "Top-Level Keyword" + el pilar AV del bloque cabecera (audio-visual-rental) ->
 *    siloRole: pillar; targetPage: '/'.
 *  - Posts fuera del CSV -> siloRole: standalone; targetPage: ''; keyword = slug de-hyphenado.
 *  - Fixtures de test se EXCLUYEN por completo (no reciben metadata de silo).
 *
 * El CSV es el PLAN intencional con URLs RAIZ ANTIGUAS (/<slug>/); la estructura actual es
 * /blog/<slug>/ con redirects. Este script traduce al esquema actual.
 *
 * Idempotente: reemplaza las lineas keyword/siloRole/targetPage si ya existen.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const CSV_PATH = join(
	ROOT,
	'.agents',
	'context',
	'keywords',
	'pop',
	'PageOptimizer Pro _ Reverse Silo - POP.csv'
);

// Fixtures de test: nunca reciben metadata de silo.
const FIXTURES = new Set(['draft-post-test-fixture', 'future-post-test-fixture']);

const DRY_RUN = process.argv.includes('--dry-run');

export type SiloRole = 'pillar' | 'supporting' | 'both' | 'standalone';
export interface SiloMeta {
	keyword: string;
	siloRole: SiloRole;
	targetPage: string;
}

// --- CSV helpers -----------------------------------------------------------

/** Parser de una linea CSV con soporte de campos entrecomillados. */
export function parseCsvLine(line: string): string[] {
	const out: string[] = [];
	let cur = '';
	let inQuotes = false;
	for (let i = 0; i < line.length; i++) {
		const c = line[i];
		if (inQuotes) {
			if (c === '"') {
				if (line[i + 1] === '"') {
					cur += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				cur += c;
			}
		} else if (c === '"') {
			inQuotes = true;
		} else if (c === ',') {
			out.push(cur);
			cur = '';
		} else {
			cur += c;
		}
	}
	out.push(cur);
	return out;
}

/** Extrae el slug de una URL (ultimo segmento). Devuelve null si es basura. */
export function slugFromUrl(u: string): string | null {
	const s = u
		.trim()
		.replace(/^https?:\/\/[^/]+\//, '')
		.replace(/\/+$/, '');
	if (!s || s.includes('#REF') || !/^[a-z0-9-]+$/.test(s)) return null;
	return s;
}

/** Traduce el Top-level page link (raiz vieja) al esquema actual. */
export function translateTarget(u: string): string {
	const path = u.trim().replace(/^https?:\/\/[^/]+/, '');
	if (path === '' || path === '/') return '/'; // homepage
	const slug = path.replace(/^\//, '').replace(/\/+$/, '');
	if (!/^[a-z0-9-]+$/.test(slug)) return '/'; // fallback seguro ante glitches
	return `/blog/${slug}/`;
}

// --- Build the slug -> meta map from the CSV -------------------------------

function buildCsvMap(): Map<string, SiloMeta> {
	const map = new Map<string, SiloMeta>();
	const lines = readFileSync(CSV_PATH, 'utf8').split(/\r?\n/);

	// Bloque cabecera: el pilar AV se declara en las filas 1-2, no como fila de datos.
	map.set('audio-visual-rental', {
		keyword: 'audio visual rental',
		siloRole: 'pillar',
		targetPage: '/'
	});

	for (const line of lines) {
		const row = parseCsvLine(line);
		const type = row[0]?.trim();
		if (type !== 'Supporting Keyword' && type !== 'Top-Level Keyword') continue;

		const keyword = row[6]?.trim() ?? '';
		const slug = slugFromUrl(row[7] ?? '');
		if (!slug || !keyword) continue;

		const siloRole: SiloRole = type === 'Top-Level Keyword' ? 'pillar' : 'supporting';
		const targetPage =
			siloRole === 'pillar' ? '/' : translateTarget(row[8] ?? '');

		// El bloque cabecera ya fijo el pilar AV; no lo pisamos con una fila de datos.
		if (!map.has(slug)) {
			map.set(slug, { keyword, siloRole, targetPage });
		}
	}

	return map;
}

/**
 * Resuelve la metadata de un slug: la del CSV si existe, si no el fallback standalone
 * (keyword = slug de-hyphenado, sin target). Puro dado el mapa (los fixtures se filtran fuera).
 */
export function resolveMeta(slug: string, csvMap: Map<string, SiloMeta>): SiloMeta {
	return (
		csvMap.get(slug) ?? {
			keyword: slug.replace(/-/g, ' '),
			siloRole: 'standalone',
			targetPage: ''
		}
	);
}

// --- Frontmatter upsert ----------------------------------------------------

/** Inserta o reemplaza keyword/siloRole/targetPage en el frontmatter. */
function upsertFrontmatter(content: string, meta: SiloMeta): string {
	const re = /^---\n([\s\S]*?)\n---/;
	const m = content.match(re);
	if (!m) throw new Error('frontmatter block not found');

	const kept = m[1]
		.split('\n')
		.filter((l) => !/^(keyword|siloRole|targetPage):/.test(l))
		.join('\n')
		.replace(/\s*$/, '');

	const added = [
		`keyword: ${JSON.stringify(meta.keyword)}`,
		`siloRole: ${meta.siloRole}`,
		`targetPage: ${JSON.stringify(meta.targetPage)}`
	].join('\n');

	return content.replace(re, () => `---\n${kept}\n${added}\n---`);
}

// --- Main ------------------------------------------------------------------

function main(): void {
	const csvMap = buildCsvMap();
	const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.svx'));

	// Record completo por rol: cuenta cualquier SiloRole (incluido 'both') sin caer en NaN.
	const counts: Record<SiloRole, number> = { pillar: 0, supporting: 0, both: 0, standalone: 0 };
	let skipped = 0;
	const rows: string[] = [];

	for (const file of files) {
		const slug = file.replace(/\.svx$/, '');

		if (FIXTURES.has(slug)) {
			skipped++;
			rows.push(`  SKIP (fixture)   ${slug}`);
			continue;
		}

		const meta = resolveMeta(slug, csvMap);

		counts[meta.siloRole]++;
		rows.push(
			`  ${meta.siloRole.padEnd(11)} ${slug}  ->  target ${meta.targetPage || '(none)'}`
		);

		if (!DRY_RUN) {
			const path = join(BLOG_DIR, file);
			const updated = upsertFrontmatter(readFileSync(path, 'utf8'), meta);
			writeFileSync(path, updated, 'utf8');
		}
	}

	rows.sort();
	console.log(`\n[backfill-silo-meta] ${DRY_RUN ? 'DRY RUN' : 'APPLIED'} over ${files.length} posts\n`);
	console.log(rows.join('\n'));
	console.log(
		`\n  pillar: ${counts.pillar}  supporting: ${counts.supporting}  both: ${counts.both}  ` +
			`standalone: ${counts.standalone}  skipped(fixtures): ${skipped}\n`
	);
}

// Solo corre al ejecutarse directamente; al importar (tests) NO reescribe los .svx.
if (import.meta.main) {
	main();
}
