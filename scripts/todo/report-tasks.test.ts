/**
 * report-tasks.test.ts: tasks derived from the Ubersuggest report views. Pure. One finding is one
 * task (Origen `ubersuggest (<kind>, <key>)`, no date), so a finding that repeats never duplicates.
 */
import { describe, it, expect } from 'vitest';
import type { ReportView } from '../keywords/report-findings';
import type { Task } from './todo-format';
import { reportOrigin, reportTasks, syncReportTasks } from './report-tasks';

const view = (over: Partial<ReportView> & { keys?: string[] }): ReportView => ({
	date: '2026-10-01',
	kind: 'seo-opportunities',
	status: 'ok',
	complete: true,
	summary: [],
	findings: (over.keys ?? []).map((key) => ({ key, title: `T ${key}`, detail: [`d ${key}`] })),
	...over
});

const task = (over: Partial<Task>): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'alta',
	tipo: 'seo-tecnico',
	titulo: 'x',
	anotada: '2026-10-01',
	origen: reportOrigin('seo-opportunities', 'site-audit/a'),
	descripcion: ['d'],
	...over
});

describe('reportOrigin', () => {
	it('has no date inside', () => {
		expect(reportOrigin('ai-visibility', 'k')).toBe('ubersuggest (ai-visibility, k)');
	});
});

describe('reportTasks', () => {
	it('creates one pending task per finding with kind priority, tipo and the view date', () => {
		const out = reportTasks(
			[view({ keys: ['site-audit/long-titles', 'keyword/new-content/x'] })],
			[]
		);
		expect(out.map((t) => [t.origen, t.tipo, t.prioridad, t.estado, t.anotada])).toEqual([
			['ubersuggest (seo-opportunities, site-audit/long-titles)', 'seo-tecnico', 'alta', 'pendiente', '2026-10-01'],
			['ubersuggest (seo-opportunities, keyword/new-content/x)', 'keywords', 'alta', 'pendiente', '2026-10-01']
		]);
	});

	it('uses visibilidad-ia for AI findings and alta for the four priority kinds', () => {
		for (const kind of ['ai-visibility', 'domain-keywords', 'competitor-keywords'] as const) {
			expect(reportTasks([view({ kind, keys: ['k'] })], [])[0].prioridad).toBe('alta');
		}
		expect(reportTasks([view({ kind: 'ai-visibility', keys: ['k'] })], [])[0].tipo).toBe('visibilidad-ia');
		expect(reportTasks([view({ kind: 'rank-tracking', keys: ['k'] })], [])[0].prioridad).toBe('media');
	});

	it('gives no tasks to backlinks, top-pages or the legacy view', () => {
		for (const kind of ['backlinks', 'top-pages', 'legacy-weekly'] as const) {
			expect(reportTasks([view({ kind, keys: ['k'] })], [])).toEqual([]);
		}
	});

	it('skips a competitor keyword that keywords.json already covers or publishes', () => {
		const out = reportTasks(
			[view({ kind: 'competitor-keywords', keys: ['competitor/a', 'competitor/b'] })],
			[{ id: 'a', status: 'covered', url: '/x/' }]
		);
		expect(out.map((t) => t.origen)).toEqual(['ubersuggest (competitor-keywords, competitor/b)']);
	});

	it('mentions the report and the finding in the description', () => {
		const t = reportTasks([view({ keys: ['k'] })], [])[0];
		expect(t.descripcion.join('\n')).toMatch(/d k/);
		expect(t.descripcion.join('\n')).toMatch(/2026-10-01/);
	});
});

describe('syncReportTasks', () => {
	it('closes a task when a COMPLETE later view of its kind no longer has the finding', () => {
		const out = syncReportTasks([task({})], [view({ date: '2026-10-08', keys: [] })], [], '2026-10-08');
		expect(out[0]).toMatchObject({ estado: 'hecha', hecha: '2026-10-08' });
	});

	it('never closes on an incomplete view', () => {
		const partial = view({ date: '2026-10-08', complete: false, status: 'partial', keys: [] });
		expect(syncReportTasks([task({})], [partial], [], '2026-10-08')[0].estado).toBe('pendiente');
	});

	it('keeps the task while the latest complete view still has the finding', () => {
		const out = syncReportTasks([task({})], [view({ keys: ['site-audit/a'] })], [], '2026-10-01');
		expect(out[0].estado).toBe('pendiente');
	});

	it('does not touch tasks of other origins or kinds without a view', () => {
		const other = task({ origen: 'usuario' });
		const noView = task({ origen: reportOrigin('domain-keywords', 'k') });
		const out = syncReportTasks([other, noView], [view({ keys: [] })], [], '2026-10-08');
		expect(out).toEqual([other, noView]);
	});

	it('closes a competitor task only when keywords.json covers or publishes it, not by absence', () => {
		const t = task({ origen: reportOrigin('competitor-keywords', 'competitor/a') });
		const absent = view({ kind: 'competitor-keywords', date: '2026-10-08', keys: [] });
		expect(syncReportTasks([t], [absent], [], '2026-10-08')[0].estado).toBe('pendiente');
		const covered = syncReportTasks([t], [absent], [{ id: 'a', status: 'published', url: '/blog/a/' }], '2026-10-08');
		expect(covered[0]).toMatchObject({ estado: 'hecha', hecha: '2026-10-08' });
	});

	it('reopens a done task when the finding is back 7 days or more after Hecha, with a note', () => {
		const done = task({ estado: 'hecha', hecha: '2026-10-01' });
		const back = view({ date: '2026-10-08', keys: ['site-audit/a'] });
		const out = syncReportTasks([done], [back], [], '2026-10-08')[0];
		expect(out.estado).toBe('pendiente');
		expect('hecha' in out).toBe(false);
		expect(out.nota).toMatch(/reabierta/);
	});

	it('does not reopen before 7 days, nor a task marked no reabrir', () => {
		const done = task({ estado: 'hecha', hecha: '2026-10-05' });
		const back = view({ date: '2026-10-08', keys: ['site-audit/a'] });
		expect(syncReportTasks([done], [back], [], '2026-10-08')[0].estado).toBe('hecha');
		const locked = task({ estado: 'hecha', hecha: '2026-09-01', nota: 'no reabrir' });
		expect(syncReportTasks([locked], [back], [], '2026-10-08')[0].estado).toBe('hecha');
	});

	it('does not mutate its input', () => {
		const input = [task({})];
		const copy = JSON.stringify(input);
		syncReportTasks(input, [view({ date: '2026-10-08', keys: [] })], [], '2026-10-08');
		expect(JSON.stringify(input)).toBe(copy);
	});
});
