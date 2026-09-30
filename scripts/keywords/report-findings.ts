/**
 * report-findings.ts: turns the committed batches into report views. Pure, no I/O.
 *
 * The agent only copies data from Ubersuggest into `batch.report` (and `rank`, `aiPrompts`).
 * Every finding, and its stable key, is derived here, so one issue is one finding whatever the
 * wording or the count of the day. The key never carries a count, a date or a position.
 */

import type { KeywordBatch, ReportKind } from './batch.schema';
import { normalizeId, toAscii } from './normalize';

export type ViewKind = ReportKind | 'legacy-weekly';

export interface Finding {
	/** Stable across days: same issue, same key. */
	key: string;
	title: string;
	/** Description lines for the task. */
	detail: string[];
}

export interface ReportView {
	date: string;
	kind: ViewKind;
	status: 'ok' | 'partial' | 'failed';
	/** True only when the tool answered in full: only then may a missing finding close a task. */
	complete: boolean;
	summary: string[];
	findings: Finding[];
}

const LINE_MAX = 140;

/** Pure: third party text as one ASCII line of bounded length that cannot open a task block. */
export function oneLine(text: string): string {
	let s = toAscii(text).replace(/\s+/g, ' ').trim();
	s = s.replace(/^=+\s*/, '');
	return s.length > LINE_MAX ? `${s.slice(0, LINE_MAX - 3)}...` : s;
}

const STRIKING_MIN = 4;
const STRIKING_MAX = 20;
const COMPETITOR_CAP = 10;

interface RankPoint {
	date: string;
	rank: KeywordBatch['rank'];
}

export interface RankDrop {
	keyword: string;
	kind: 'lost' | 'drop';
	from: number;
	to: number | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const BASELINE_DAYS = 90;
const BASELINE_MAX_POSITION = 30;

/** Pure: keywords that lost ground in the latest rank report. Baseline = best position in the
 *  90 days before it, and only when that was 30 or better. `lost` if the keyword no longer ranks,
 *  `drop` from 10 places down (3 when the baseline was in the top 10). */
export function rankDrops(history: RankPoint[]): RankDrop[] {
	const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
	const latest = sorted.at(-1);
	if (!latest) return [];
	const since = Date.parse(latest.date) - BASELINE_DAYS * DAY_MS;
	const before = sorted.slice(0, -1).filter((p) => Date.parse(p.date) >= since);
	const out: RankDrop[] = [];
	for (const now of latest.rank) {
		let base: number | null = null;
		for (const p of before) {
			for (const r of p.rank) {
				if (r.keyword === now.keyword && r.position !== null) {
					base = base === null ? r.position : Math.min(base, r.position);
				}
			}
		}
		if (base === null || base > BASELINE_MAX_POSITION) continue;
		if (now.position === null) {
			out.push({ keyword: now.keyword, kind: 'lost', from: base, to: null });
		} else if (now.position - base >= (base <= 10 ? 3 : 10)) {
			out.push({ keyword: now.keyword, kind: 'drop', from: base, to: now.position });
		}
	}
	return out;
}

function seoFindings(report: NonNullable<KeywordBatch['report']>): Finding[] {
	return report.seo.map((s) => {
		const meta = [s.impact && `impacto ${s.impact}`, s.effort && `esfuerzo ${s.effort}`]
			.filter(Boolean)
			.join(', ');
		if (s.type === 'SITE_AUDIT') {
			const pages = s.count !== undefined ? ` (${s.count} paginas)` : '';
			return {
				key: `site-audit/${normalizeId(s.subtype.replace(/_/g, ' '))}`,
				title: oneLine(`Arreglar la auditoria: ${s.subtype}${pages}`),
				detail: [oneLine(`Ubersuggest SEO Opportunities, SITE_AUDIT ${s.subtype}. ${meta}`)],
			};
		}
		if (s.keyword) {
			return {
				key: `keyword/${normalizeId(s.subtype.replace(/_/g, ' '))}/${normalizeId(s.keyword)}`,
				title: oneLine(`Oportunidad de keyword "${s.keyword}" (${s.subtype})`),
				detail: [oneLine(`Ubersuggest SEO Opportunities, ${s.type} ${s.subtype}. ${meta}`)],
			};
		}
		return {
			key: `other/${normalizeId(s.type)}/${normalizeId(s.subtype.replace(/_/g, ' '))}`,
			title: oneLine(`Oportunidad de SEO: ${s.type} ${s.subtype}`),
			detail: [oneLine(meta)],
		};
	});
}

function aiFindings(batch: KeywordBatch): { findings: Finding[]; notEvaluated: number } {
	const findings: Finding[] = [];
	let notEvaluated = 0;
	for (const p of batch.aiPrompts) {
		if (p.source !== 'ubersuggest-brand' || !p.visibility) continue;
		const v = p.visibility;
		const evaluated = v.evaluated ?? (v.brands?.length ?? 0) > 0;
		if (!evaluated) notEvaluated++;
		else if (!v.mentioned) {
			findings.push({
				key: normalizeId(p.prompt),
				title: oneLine(`IA: no aparecemos en "${p.prompt}"`),
				detail: [
					oneLine(
						`Marcas que si aparecen: ${(v.brands ?? []).slice(0, 6).join(', ') || 'ninguna'}`,
					),
				],
			});
		}
	}
	return { findings, notEvaluated };
}

function domainFindings(batch: KeywordBatch): Finding[] {
	return batch.rank
		.filter((r) => r.position !== null && r.position >= STRIKING_MIN && r.position <= STRIKING_MAX)
		.map((r) => ({
			key: normalizeId(r.keyword),
			title: oneLine(
				`Subir "${r.keyword}" (posicion ${r.position})${r.rankingUrl ? ` en ${r.rankingUrl}` : ''}`,
			),
			detail: [oneLine(`Posicion ${r.position} el ${r.asOf}: a distancia de golpe del top 3.`)],
		}));
}

function competitorFindings(report: NonNullable<KeywordBatch['report']>): Finding[] {
	const volume = (v: unknown) => (typeof v === 'number' ? v : 0);
	return [...report.rows]
		.sort((a, b) => volume(b.values.volume) - volume(a.values.volume))
		.slice(0, COMPETITOR_CAP)
		.map((r) => ({
			key: `competitor/${normalizeId(r.label)}`,
			title: oneLine(`Keyword de la competencia "${r.label}"`),
			detail: [
				oneLine(
					`${String(r.values.competitor ?? 'un competidor')} rankea en la posicion ${String(r.values.position ?? '?')}, volumen ${String(r.values.volume ?? 'sin medir')}.`,
				),
			],
		}));
}

function rankTrackingFindings(batches: KeywordBatch[], date: string): Finding[] {
	const history = batches.filter((b) => b.date <= date && b.rank.length > 0);
	return rankDrops(history.map((b) => ({ date: b.date, rank: b.rank }))).map((d) => ({
		key: `rank/${normalizeId(d.keyword)}`,
		title: oneLine(
			d.kind === 'lost'
				? `Recuperar "${d.keyword}": dejo de rankear (era ${d.from})`
				: `Recuperar "${d.keyword}": cayo de ${d.from} a ${d.to}`,
		),
		detail: [oneLine(`Base: mejor posicion de los ultimos ${BASELINE_DAYS} dias.`)],
	}));
}

/** Pure: one view per batch that ran a report (or the old weekly block), oldest first. */
export function reportViews(batches: KeywordBatch[]): ReportView[] {
	const views: ReportView[] = [];
	for (const b of [...batches].sort((x, y) => x.date.localeCompare(y.date))) {
		if (!b.report) {
			if (b.run.weeklyRun) {
				views.push({
					date: b.date,
					kind: 'legacy-weekly',
					status: 'partial',
					complete: false,
					summary: [`${b.rank.length} filas de ranking, ${b.aiPrompts.length} prompts de IA`],
					findings: [],
				});
			}
			continue;
		}
		const r = b.report;
		let findings: Finding[] = [];
		const summary = [...r.summary];
		if (r.kind === 'seo-opportunities') findings = seoFindings(r);
		else if (r.kind === 'ai-visibility') {
			const ai = aiFindings(b);
			findings = ai.findings;
			if (ai.notEvaluated > 0) summary.push(`${ai.notEvaluated} prompts sin evaluar (sin datos)`);
		} else if (r.kind === 'domain-keywords') findings = domainFindings(b);
		else if (r.kind === 'competitor-keywords') findings = competitorFindings(r);
		else if (r.kind === 'rank-tracking') findings = rankTrackingFindings(batches, b.date);
		views.push({
			date: b.date,
			kind: r.kind,
			status: r.status,
			complete: r.status === 'ok',
			summary,
			findings,
		});
	}
	return views;
}
