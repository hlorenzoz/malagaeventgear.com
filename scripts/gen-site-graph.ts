#!/usr/bin/env bun
/**
 * gen-site-graph.ts - Genera .agents/site-structure-map.md desde la metadata de silo.
 *
 * Uso:  bun scripts/gen-site-graph.ts   (o `just site-map`)
 *
 * El mapa es un ARTEFACTO DERIVADO: la unica fuente de verdad es el frontmatter de cada
 * post (keyword/siloRole/targetPage). Nunca se edita a mano. El guard
 * (scripts/site-graph/guard.test.ts) falla si el mapa committeado quedo desactualizado.
 *
 * Aborta si algun post tiene metadata de silo invalida (mismo contrato que el guard).
 */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readPosts } from './site-graph/read';
import { renderMap, validateGraph } from './site-graph/build';

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const OUT = join(ROOT, '.agents', 'site-structure-map.md');

const records = readPosts(BLOG_DIR);
const errors = validateGraph(records);

if (errors.length) {
	console.error('[gen-site-graph] Metadata de silo invalida:');
	for (const e of errors) console.error(`  - ${e}`);
	process.exit(1);
}

writeFileSync(OUT, renderMap(records), 'utf8');
console.log(`[gen-site-graph] escrito ${OUT} (${records.length} nodos)`);
