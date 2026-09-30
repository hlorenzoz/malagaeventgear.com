/**
 * report-tasks.ts: the Ubersuggest side of TODO.json, pure. Turns report views into tasks (one per
 * finding, Origen `ubersuggest (<kind>, <key>)` with no date so a finding that repeats is ONE
 * task), closes the tasks whose finding is gone, and reopens the ones that come back.
 *
 * Closing needs a COMPLETE view: a cut answer or a quota error never closes anything.
 * Competitor keywords are never closed by absence (a competitor can stop ranking and the gap is
 * still ours), only when keywords.json shows the keyword as covered or published.
 */

import type { ReportKind } from '../keywords/batch.schema';
import type { ReportView, ViewKind } from '../keywords/report-findings';
import type { KeywordStatus } from './plan-tasks';
import type { Prioridad, Task, Tipo } from './todo-format';

const ORIGIN_PREFIX = 'ubersuggest (';
export const REPORT_CLOSE_NOTE = 'cerrada por el reporte de ubersuggest';
export const REOPEN_LOCK = 'no reabrir';
const REOPEN_AFTER_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

export const reportOrigin = (kind: string, key: string) => `${ORIGIN_PREFIX}${kind}, ${key})`;

const TASK_KINDS: ReadonlySet<ViewKind> = new Set<ReportKind>([
	'seo-opportunities',
	'ai-visibility',
	'domain-keywords',
	'competitor-keywords',
	'rank-tracking'
]);

const HIGH_PRIORITY: ReadonlySet<ViewKind> = new Set<ReportKind>([
	'seo-opportunities',
	'ai-visibility',
	'domain-keywords',
	'competitor-keywords'
]);

function tipoOf(kind: ViewKind, key: string): Tipo {
	if (kind === 'ai-visibility') return 'visibilidad-ia';
	if (kind === 'seo-opportunities') return key.startsWith('site-audit/') ? 'seo-tecnico' : 'keywords';
	return 'keywords';
}

const DUPLICATE_LINE =
	'El content-strategist puede planificar esta keyword tambien: cuando keywords.json la marque covered o published, se cierran las dos.';

const isCovered = (statuses: Map<string, KeywordStatus>, id: string) => {
	const k = statuses.get(id);
	return k?.status === 'covered' || k?.status === 'published';
};

/** Pure: the fresh tasks (without ids) of every view, oldest first. */
export function reportTasks(views: ReportView[], keywords: KeywordStatus[]): Task[] {
	const statuses = new Map(keywords.map((k) => [k.id, k]));
	const out: Task[] = [];
	for (const v of [...views].sort((a, b) => a.date.localeCompare(b.date))) {
		if (!TASK_KINDS.has(v.kind)) continue;
		for (const f of v.findings) {
			if (v.kind === 'competitor-keywords' && isCovered(statuses, f.key.replace('competitor/', ''))) continue;
			const dup = v.kind === 'competitor-keywords' || v.kind === 'domain-keywords' ? [DUPLICATE_LINE] : [];
			out.push({
				id: '',
				estado: 'pendiente',
				prioridad: (HIGH_PRIORITY.has(v.kind) ? 'alta' : 'media') satisfies Prioridad,
				tipo: tipoOf(v.kind, f.key),
				titulo: f.title,
				anotada: v.date,
				origen: reportOrigin(v.kind, f.key),
				descripcion: [...f.detail, `Reporte ${v.kind} de ubersuggest del ${v.date}.`, ...dup]
			});
		}
	}
	return out;
}

const parseOrigin = (origen: string): { kind: string; key: string } | null => {
	if (!origen.startsWith(ORIGIN_PREFIX) || !origen.endsWith(')')) return null;
	const inner = origen.slice(ORIGIN_PREFIX.length, -1);
	const at = inner.indexOf(', ');
	return at < 0 ? null : { kind: inner.slice(0, at), key: inner.slice(at + 2) };
};

/** The keyword id a finding key ends in, for the kinds that also close by coverage. */
const coverageId = (kind: string, key: string): string | null => {
	if (kind === 'competitor-keywords') return key.replace('competitor/', '');
	if (kind === 'seo-opportunities' && key.startsWith('keyword/')) return key.split('/').at(-1) ?? null;
	return null;
};

const addNota = (t: Task, note: string): Task => ({ ...t, nota: t.nota ? `${t.nota}, ${note}` : note });

/** Pure: closes tasks whose finding vanished from a complete view (or is now covered), and
 *  reopens done tasks whose finding is back 7 days or more after Hecha. */
export function syncReportTasks(
	tasks: Task[],
	views: ReportView[],
	keywords: KeywordStatus[],
	today: string
): Task[] {
	const statuses = new Map(keywords.map((k) => [k.id, k]));
	const latest = (kind: string, onlyComplete: boolean) =>
		[...views]
			.filter((v) => v.kind === kind && (!onlyComplete || v.complete))
			.sort((a, b) => b.date.localeCompare(a.date))[0];

	return tasks.map((t) => {
		const ref = parseOrigin(t.origen);
		if (!ref) return t;
		const covId = coverageId(ref.kind, ref.key);
		if (t.estado === 'hecha') {
			const seen = latest(ref.kind, false);
			if (!seen || !seen.findings.some((f) => f.key === ref.key)) return t;
			if (t.nota?.includes(REOPEN_LOCK) || !t.hecha) return t;
			if (Date.parse(seen.date) - Date.parse(t.hecha) < REOPEN_AFTER_DAYS * DAY_MS) return t;
			const { hecha: _drop, ...rest } = t;
			return addNota({ ...rest, estado: 'pendiente' }, `reabierta por ubersuggest el ${seen.date}`);
		}
		const covered = covId !== null && isCovered(statuses, covId);
		const complete = latest(ref.kind, true);
		const gone =
			ref.kind !== 'competitor-keywords' &&
			complete !== undefined &&
			!complete.findings.some((f) => f.key === ref.key);
		if (!covered && !gone) return t;
		return addNota({ ...t, estado: 'hecha', hecha: today }, REPORT_CLOSE_NOTE);
	});
}
