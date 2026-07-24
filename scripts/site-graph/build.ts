/**
 * site-graph/build.ts - Logica pura del grafo de reverse silo del sitio.
 *
 * Sin I/O: recibe los registros de posts (leidos de disco por read.ts) y produce
 * (a) la validacion del grafo (dientes del guard) y (b) el mapa Markdown determinista.
 *
 * El mapa NO lleva timestamp: su contenido es funcion pura de la metadata de silo, para
 * que el guard pueda regenerarlo y compararlo byte a byte (staleness check).
 */

export const SILO_ROLES = ['pillar', 'supporting', 'both', 'standalone'] as const;
export type SiloRole = (typeof SILO_ROLES)[number];

/** Un post tal como se lee del frontmatter (campos de silo pueden faltar -> los valida el guard). */
export interface PostRecord {
	slug: string;
	title: string;
	draft: boolean;
	keyword?: string;
	siloRole?: string;
	targetPage?: string;
	updatedDate?: string;
	categories: string[];
}

/** URL canonica derivada del slug (misma regla que blog-pipeline.ts). */
export function postUrl(slug: string): string {
	return `/blog/${slug}/`;
}

/**
 * Valida los registros contra el contrato de reverse silo.
 * Devuelve la lista de violaciones (vacia = OK). Los fixtures ya vienen excluidos por el reader.
 */
export function validateGraph(records: PostRecord[]): string[] {
	const errors: string[] = [];
	const urls = new Set(records.map((r) => postUrl(r.slug)));
	urls.add('/'); // homepage es un target valido para los pilares

	for (const r of records) {
		const where = postUrl(r.slug);

		if (!r.siloRole) {
			errors.push(`${where}: falta siloRole`);
			continue;
		}
		if (!SILO_ROLES.includes(r.siloRole as SiloRole)) {
			errors.push(`${where}: siloRole invalido "${r.siloRole}"`);
			continue;
		}

		const role = r.siloRole as SiloRole;

		if (role === 'supporting' || role === 'both') {
			if (!r.targetPage) {
				errors.push(`${where}: siloRole "${role}" sin targetPage (no alimenta ningun pilar)`);
			} else if (r.targetPage === '/') {
				errors.push(
					`${where}: siloRole "${role}" apunta al home '/', debe apuntar a un pilar (/blog/<pilar>/)`
				);
			} else if (!urls.has(r.targetPage)) {
				errors.push(`${where}: targetPage "${r.targetPage}" no resuelve a ningun nodo existente`);
			}
		}

		if (role === 'pillar' && r.targetPage && r.targetPage !== '/') {
			errors.push(`${where}: un pilar debe apuntar al home ('/'), no a "${r.targetPage}"`);
		}
	}

	return errors;
}

// --- Rendering (determinista) ----------------------------------------------

function byUrl(a: PostRecord, b: PostRecord): number {
	return postUrl(a.slug).localeCompare(postUrl(b.slug));
}

function safeId(index: number): string {
	return `n${index}`;
}

/** Diagrama Mermaid: cada post apunta a su targetPage; los pilares al home; standalone sueltos. */
function renderMermaid(records: PostRecord[]): string {
	const sorted = [...records].sort(byUrl);
	const idByUrl = new Map<string, string>();
	sorted.forEach((r, i) => idByUrl.set(postUrl(r.slug), safeId(i)));

	const lines: string[] = ['```mermaid', 'graph TD', '  home["/ (homepage)"]'];

	for (const r of sorted) {
		const id = idByUrl.get(postUrl(r.slug))!;
		const label = (r.keyword || r.slug).replace(/"/g, "'");
		// r.siloRole should always be set (validateGraph gates the generator), but the guard's
		// staleness test renders raw records, so fall back to '?' instead of emitting 'undefined'.
		lines.push(`  ${id}["${label} (${r.siloRole ?? '?'})"]`);
	}
	for (const r of sorted) {
		const id = idByUrl.get(postUrl(r.slug))!;
		if (!r.targetPage) continue; // standalone: nodo suelto, sin arista
		const target = r.targetPage === '/' ? 'home' : idByUrl.get(r.targetPage);
		if (target) lines.push(`  ${id} --> ${target}`);
	}

	lines.push('```');
	return lines.join('\n');
}

/** Arbol por silo: cada pilar con sus supporting colgando. */
function renderTrees(records: PostRecord[]): string {
	const pillars = records
		.filter((r) => r.siloRole === 'pillar' || r.siloRole === 'both')
		.sort(byUrl);
	const blocks: string[] = [];

	for (const pillar of pillars) {
		const purl = postUrl(pillar.slug);
		const children = records.filter((r) => r.targetPage === purl).sort(byUrl);
		const head = `### ${pillar.keyword || pillar.slug}  (${purl})`;
		const items = children.map((c) => `- ${c.keyword || c.slug}  (${postUrl(c.slug)})`);
		blocks.push([head, ...(items.length ? items : ['- (sin supporting posts todavia)'])].join('\n'));
	}

	return blocks.join('\n\n');
}

function renderStandalone(records: PostRecord[]): string {
	const loose = records.filter((r) => r.siloRole === 'standalone').sort(byUrl);
	if (!loose.length) return '_(ninguno)_';
	return loose.map((r) => `- ${r.slug}  (${postUrl(r.slug)})`).join('\n');
}

function renderTable(records: PostRecord[]): string {
	const rows = [...records].sort(byUrl).map((r) => {
		const url = postUrl(r.slug);
		return `| ${url} | ${r.siloRole ?? '-'} | ${r.targetPage || '-'} | ${r.keyword || '-'} | ${r.updatedDate || '-'} |`;
	});
	return ['| URL | Role | Target | Keyword | Updated |', '| --- | --- | --- | --- | --- |', ...rows].join(
		'\n'
	);
}

/** Documento Markdown completo. Determinista: sin fechas ni orden dependiente del FS. */
export function renderMap(records: PostRecord[]): string {
	const counts = { pillar: 0, supporting: 0, both: 0, standalone: 0 };
	for (const r of records) {
		if (r.siloRole && r.siloRole in counts) counts[r.siloRole as keyof typeof counts]++;
	}

	return [
		'# Site structure map (reverse silo)',
		'',
		'GENERATED FILE - do not edit by hand. Regenerate with `just site-map`.',
		'Single source of truth: the silo metadata in each post frontmatter',
		'(`keyword`, `siloRole`, `targetPage`). See AGENTS.md "Reverse Silo del Blog".',
		'',
		'## Summary',
		'',
		`- pillars: ${counts.pillar}`,
		`- supporting: ${counts.supporting}`,
		`- both (pillar + supporter): ${counts.both}`,
		`- standalone: ${counts.standalone}`,
		`- total nodes: ${records.length}`,
		'',
		'## Graph',
		'',
		renderMermaid(records),
		'',
		'## Silos (tree)',
		'',
		renderTrees(records),
		'',
		'## Standalone (not in any silo)',
		'',
		renderStandalone(records),
		'',
		'## All nodes',
		'',
		renderTable(records),
		''
	].join('\n');
}
