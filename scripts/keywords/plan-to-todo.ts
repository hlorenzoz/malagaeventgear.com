#!/usr/bin/env bun
/**
 * plan-to-todo.ts: renders a validated daily content plan (`plan.schema.ts`) as one TODO.txt
 * entry, in Spanish like the rest of the file, and inserts it into the managed section.
 *
 * Usage: `bun scripts/keywords/plan-to-todo.ts <plan.json> [--todo <path>] [--check]`
 *   --check   only validate the plan (exit 1 when invalid), touch nothing
 *   --todo    another TODO file (default ./TODO.txt), used for dry runs
 *
 * TODO.txt is edited by other sessions at the same time, so this script reads and writes it in
 * one quick synchronous step, and only ever replaces its own entry (same date) or inserts a new
 * one right below the section header. Nothing else in the file is rewritten. It is never
 * committed by the content plan flow (`just content-plan-commit`).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ContentPlanSchema, type ContentPlan, type PlanItem } from './plan.schema';

export const MARKER = '== OPORTUNIDADES DE CONTENIDO (agente content-strategist) ==';
export const MARKER_NOTE =
	'Entradas generadas por just content-plan-apply. Cada corrida reemplaza la entrada de su fecha y no toca nada más.';

const PRIORITY_WORD = { high: 'alta', medium: 'media', low: 'baja' } as const;
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;
const FIT_WORD = {
	'in-tier': 'dentro del tier',
	below: 'debajo del tier',
	above: 'encima del tier',
	unknown: 'sin volumen'
} as const;
const RUN_STATUS_WORD = { ok: 'correcta', partial: 'parcial', aborted: 'abortada' } as const;

function headerLine(date: string, glyph = '❌'): string {
	return `-- ${glyph} Oportunidades de contenido del ${date} (agente content-strategist)`;
}

function slugUrl(item: PlanItem): string {
	return item.file ? `${item.targetUrl} (${item.file})` : String(item.targetUrl);
}

function siblingClause(prev?: string | null, next?: string | null): string {
	if (prev && next) return `, entre ${prev} y ${next}`;
	if (prev) return `, después de ${prev}`;
	if (next) return `, antes de ${next}`;
	return '';
}

function renderItem(item: PlanItem, n: number): string[] {
	const tag = `${n}. [${PRIORITY_WORD[item.priority]}]`;
	const fit = item.avalancheFit ? `, ${FIT_WORD[item.avalancheFit]}` : '';
	const keywords = `   Keywords: ${item.keywords.join(', ')} (${item.evidence})${fit}`;
	const why = `   Por qué: ${item.reason}`;

	if (item.action === 'add-section') {
		const anchor = item.after
			? `, ${item.headingLevel === 3 ? 'dentro de' : 'después de'} "${item.after}"`
			: '';
		return [
			`${tag} Nueva sección H${item.headingLevel} en ${slugUrl(item)}${anchor}:`,
			`   "${item.heading}"`,
			keywords,
			`   Qué cubrir: ${item.brief}`,
			why
		];
	}
	if (item.action === 'new-post') {
		const p = item.newPost!;
		return [
			`${tag} Post nuevo /blog/${p.slug}/ en el silo "${item.cluster}" (target ${p.targetPage}${siblingClause(p.prevSibling, p.nextSibling)}):`,
			`   Título: ${p.title}. Keyword: ${p.keyword}`,
			`   Estructura: ${p.outline.map((o) => `H${o.level} ${o.text}`).join(', ')}`,
			keywords,
			`   Qué cubrir: ${p.brief}`,
			why
		];
	}
	return [`${tag} Pregunta FAQ en ${slugUrl(item)}: "${item.question}"`, keywords, why];
}

/** Pure: the whole entry (no trailing newline). Actions by priority (stable), skips last. */
export function renderPlanEntry(plan: ContentPlan): string {
	const actionable = plan.items
		.filter((i) => i.action !== 'skip')
		.map((item, idx) => ({ item, idx }))
		.sort(
			(a, b) => PRIORITY_ORDER[a.item.priority] - PRIORITY_ORDER[b.item.priority] || a.idx - b.idx
		)
		.map((x) => x.item);
	const skipped = plan.items.filter((i) => i.action === 'skip');

	const lines: string[] = [
		headerLine(plan.date),
		'',
		'Generado por .claude/agents/content-strategist.md desde keywords.json. Plan completo:',
		`.agents/context/keywords/content-plan/${plan.date}.json. Cada cambio va en los 13 idiomas en el mismo`,
		'cambio (reglas 1 y 2 de idioma), mueve updatedDate (regla 11) y respeta el inventario real y el',
		'posicionamiento de CLAUDE.md.'
	];
	if (plan.run.tier) {
		const t = plan.run.tier;
		lines.push(
			`Tier de tráfico (Avalanche, POP): Level ${t.level} (${t.value} impresiones diarias de media, export ${t.export}). Prioridad: keywords dentro del tier.`
		);
	}
	lines.push('');
	if (plan.run.status !== 'ok') {
		const why = plan.run.reason ? ` (${plan.run.reason})` : '';
		lines.push(`Estado de la corrida: ${RUN_STATUS_WORD[plan.run.status]}${why}`, '');
	}
	if (actionable.length === 0) lines.push('Sin cambios de contenido propuestos hoy.');
	actionable.forEach((item, i) => lines.push(...renderItem(item, i + 1)));
	if (skipped.length > 0) {
		lines.push(
			'',
			`Descartadas hoy: ${skipped.map((s) => `${s.keywords[0]} (${s.reason})`).join(', ')}`
		);
	}
	return lines.join('\n');
}

/**
 * Pure: puts the plan's entry in the managed section. Same date already there: its body is
 * replaced (a status glyph a person changed on the header is kept). Otherwise the entry goes
 * right below the section header, above older entries. No section yet: it is created at the end.
 */
export function upsertPlanEntry(todo: string, plan: ContentPlan): string {
	const entry = renderPlanEntry(plan).split('\n');
	const lines = todo.split('\n');

	const headerRe = new RegExp(
		`^-- .*Oportunidades de contenido del ${plan.date} \\(agente content-strategist\\)\\s*$`
	);
	const s = lines.findIndex((l) => headerRe.test(l));
	if (s >= 0) {
		let e = lines.findIndex((l, i) => i > s && /^(-- |== )/.test(l));
		if (e < 0) e = lines.length;
		const body = [lines[s], ...entry.slice(1)];
		const replacement = e < lines.length ? [...body, '', ''] : [...body, ''];
		return [...lines.slice(0, s), ...replacement, ...lines.slice(e)].join('\n');
	}

	const m = lines.indexOf(MARKER);
	if (m < 0) {
		const kept = [...lines];
		while (kept.length && kept[kept.length - 1] === '') kept.pop();
		return [...kept, '', '', MARKER, MARKER_NOTE, '', '', ...entry, ''].join('\n');
	}
	let p = m + 1;
	if (lines[p] === MARKER_NOTE) p++;
	let q = p;
	while (q < lines.length && lines[q] === '') q++;
	const tail = lines.slice(q);
	const inserted = ['', '', ...entry];
	return [...lines.slice(0, p), ...inserted, ...(tail.length ? ['', '', ...tail] : [''])].join(
		'\n'
	);
}

function main(argv: string[]) {
	const args = argv.filter((a) => !a.startsWith('--'));
	const todoIdx = argv.indexOf('--todo');
	const todoPath = todoIdx >= 0 ? argv[todoIdx + 1] : join(process.cwd(), 'TODO.txt');
	const planPath = args.find((a) => a !== todoPath);
	if (!planPath) {
		console.error('usage: plan-to-todo.ts <plan.json> [--todo <path>] [--check]');
		process.exit(2);
	}
	const parsed = ContentPlanSchema.safeParse(JSON.parse(readFileSync(planPath, 'utf8')));
	if (!parsed.success) {
		console.error(`[content-plan] invalid plan ${planPath}:\n${parsed.error.message}`);
		process.exit(1);
	}
	if (argv.includes('--check')) {
		console.log(`[content-plan] ${planPath} is valid (${parsed.data.items.length} items)`);
		return;
	}
	// One quick read-modify-write: another session may edit this file at the same time.
	writeFileSync(todoPath, upsertPlanEntry(readFileSync(todoPath, 'utf8'), parsed.data), 'utf8');
	console.log(`[content-plan] TODO entry for ${parsed.data.date} written to ${todoPath}`);
}

if (import.meta.main) main(process.argv.slice(2));
