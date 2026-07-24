/**
 * site-graph/read.ts - Lee el frontmatter de los posts .svx desde disco.
 *
 * Usa gray-matter (mismo parser de frontmatter que el resto del pipeline). Excluye los
 * fixtures de test. Devuelve PostRecord[] para que build.ts valide y renderice.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { PostRecord } from './build';

// Fixtures de test: no son contenido real, no entran al grafo.
const FIXTURES = new Set(['draft-post-test-fixture', 'future-post-test-fixture']);

/** YAML sin comillas convierte fechas a Date; normalizamos a YYYY-MM-DD. */
function normalizeDate(v: unknown): string | undefined {
	if (v == null) return undefined;
	if (v instanceof Date) return v.toISOString().slice(0, 10);
	return String(v);
}

export function readPosts(blogDir: string): PostRecord[] {
	const files = readdirSync(blogDir).filter((f) => f.endsWith('.svx'));
	const records: PostRecord[] = [];

	for (const file of files) {
		const slug = file.replace(/\.svx$/, '');
		if (FIXTURES.has(slug)) continue;

		const fm = matter(readFileSync(join(blogDir, file), 'utf8')).data as Record<string, unknown>;

		records.push({
			slug,
			title: String(fm.title ?? slug),
			draft: fm.draft === true,
			keyword: fm.keyword != null ? String(fm.keyword) : undefined,
			siloRole: fm.siloRole != null ? String(fm.siloRole) : undefined,
			targetPage: fm.targetPage != null ? String(fm.targetPage) : undefined,
			updatedDate: normalizeDate(fm.updatedDate),
			categories: Array.isArray(fm.categories) ? fm.categories.map(String) : []
		});
	}

	return records;
}
