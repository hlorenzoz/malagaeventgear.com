/**
 * Guard del grafo de silo (patron del freshness guard).
 *
 * Falla la suite si:
 *  - algun post no-fixture tiene metadata de silo invalida (falta siloRole, targetPage roto...).
 *  - el mapa committeado (.agents/site-structure-map.md) quedo desactualizado.
 *
 * Esto le da dientes a la regla de AGENTS.md: al crear/editar contenido hay que regenerar
 * el mapa con `just site-map`. El mapa es derivado, nunca se mantiene a mano.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readPosts } from './read';
import { renderMap, validateGraph } from './build';

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const MAP = join(ROOT, '.agents', 'site-structure-map.md');

describe('site graph guard', () => {
	const records = readPosts(BLOG_DIR);

	it('every non-fixture post declares valid reverse silo metadata', () => {
		expect(validateGraph(records)).toEqual([]);
	});

	it('the committed .agents/site-structure-map.md is up to date (run `just site-map`)', () => {
		expect(existsSync(MAP), 'site-structure-map.md missing - run `just site-map`').toBe(true);
		expect(readFileSync(MAP, 'utf8')).toBe(renderMap(records));
	});
});
