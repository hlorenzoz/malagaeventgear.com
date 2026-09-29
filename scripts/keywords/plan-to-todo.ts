#!/usr/bin/env bun
/**
 * plan-to-todo.ts: the Spanish rendering of one content plan item (`plan.schema.ts`) as a TODO.txt
 * task title and description, plus the plan validator used by `just content-plan-apply`.
 * The pure renderers are shared with `scripts/todo/plan-tasks.ts`, which turns a plan into tasks
 * and `scripts/todo/organize.ts`, which writes them (this script no longer touches TODO.txt).
 *
 * Usage: `bun scripts/keywords/plan-to-todo.ts --check <plan.json>` (exit 1 when invalid, also when
 * the plan has more `new-post` items than the day's quota, see `new-post-quota.ts`)
 */

import { readFileSync } from 'node:fs';
import { ContentPlanSchema, type ContentPlan, type PlanItem } from './plan.schema';
import { checkNewPostQuota, newPostQuota, readTranslationBacklog } from './new-post-quota';

/** Items that are not `skip` a plan may carry (skips never count). */
export const MAX_ITEMS = 8;

/** Pure: null when the plan has at most MAX_ITEMS items that are not skip, otherwise the error. */
export function checkItemCap(plan: ContentPlan): string | null {
	const count = plan.items.filter((i) => i.action !== 'skip').length;
	return count <= MAX_ITEMS ? null : `${count} items that are not skip, the limit is ${MAX_ITEMS}`;
}

export const ITEM_RULE_LINE =
	'Cada cambio va en los 13 idiomas en el mismo cambio y mueve updatedDate.';

const FIT_WORD = {
	'in-tier': 'dentro del tier',
	below: 'debajo del tier',
	above: 'encima del tier',
	unknown: 'sin volumen'
} as const;

function siblingClause(prev?: string | null, next?: string | null): string {
	if (prev && next) return `, entre ${prev} y ${next}`;
	if (prev) return `, después de ${prev}`;
	if (next) return `, antes de ${next}`;
	return '';
}

const oneLine = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Pure: the task title of a non-skip item. */
export function itemTitle(item: PlanItem): string {
	if (item.action === 'add-section') {
		return oneLine(`Nueva sección H${item.headingLevel} en ${item.targetUrl}: "${item.heading}"`);
	}
	if (item.action === 'new-post') {
		const p = item.newPost!;
		return oneLine(`Post nuevo /blog/${p.slug}/: ${p.title}`);
	}
	return oneLine(`Pregunta FAQ en ${item.targetUrl}: "${item.question}"`);
}

/** Pure: the description lines of a non-skip item (no tier line, no closing rule line). */
export function renderItemBody(item: PlanItem): string[] {
	const fit = item.avalancheFit ? `, ${FIT_WORD[item.avalancheFit]}` : '';
	const keywords = `Keywords: ${item.keywords.join(', ')} (${item.evidence})${fit}`;
	const why = `Por qué: ${item.reason}`;

	if (item.action === 'add-section') {
		const lines = [`Archivo: ${item.file}`];
		if (item.after) {
			lines.push(
				`Ubicación: ${item.headingLevel === 3 ? 'dentro de' : 'después de'} "${item.after}"`
			);
		}
		return [...lines, keywords, `Qué cubrir: ${item.brief}`, why];
	}
	if (item.action === 'new-post') {
		const p = item.newPost!;
		return [
			`Silo: "${item.cluster}"`,
			`Keyword: ${p.keyword}`,
			`Estructura: ${p.outline.map((o) => `H${o.level} ${o.text}`).join(', ')}`,
			keywords,
			`Qué cubrir: ${p.brief}`,
			why,
			`Enlaces: hacia arriba a ${p.targetPage}${siblingClause(p.prevSibling, p.nextSibling)}`
		];
	}
	const faqBrief = item.brief ? [`Qué cubrir: ${item.brief}`] : [];
	return [`Archivo: ${item.file}`, keywords, ...faqBrief, why];
}

/** Pure: the Avalanche line of a plan, or null when the run carries no tier. */
export function tierLine(plan: ContentPlan): string | null {
	const t = plan.run.tier;
	if (!t) return null;
	return `Tier de tráfico (Avalanche, POP): Level ${t.level} (${t.value} impresiones diarias de media, export ${t.export}).`;
}

function main(argv: string[]) {
	const planPath = argv.find((a) => !a.startsWith('--'));
	if (!planPath || !argv.includes('--check')) {
		console.error('usage: plan-to-todo.ts --check <plan.json>');
		process.exit(2);
	}
	const parsed = ContentPlanSchema.safeParse(JSON.parse(readFileSync(planPath, 'utf8')));
	if (!parsed.success) {
		console.error(`[content-plan] invalid plan ${planPath}:\n${parsed.error.message}`);
		process.exit(1);
	}
	const quotaError =
		checkItemCap(parsed.data) ??
		checkNewPostQuota(parsed.data, newPostQuota(parsed.data.date, readTranslationBacklog()));
	if (quotaError) {
		console.error(`[content-plan] invalid plan ${planPath}: ${quotaError}`);
		process.exit(1);
	}
	console.log(`[content-plan] ${planPath} is valid (${parsed.data.items.length} items)`);
}

if (import.meta.main) main(process.argv.slice(2));
