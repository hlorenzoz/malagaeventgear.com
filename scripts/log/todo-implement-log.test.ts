import { describe, expect, it } from 'vitest';
import type { Task } from '../todo/todo-format';
import {
	buildEndEntries,
	buildStartEntry,
	parseClaudeResult,
	parseCommits,
	taskIds,
	taskOutcome
} from './todo-implement-log';

const task = (over: Partial<Task>): Task => ({
	id: '#T0037',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'contenido',
	titulo: 'Pregunta FAQ en /blog/tv-screen-rental/: "Can MEG source an LED video wall?"',
	anotada: '2026-09-29',
	origen: 'content-strategist (plan 2026-09-29, item 10)',
	descripcion: [],
	...over
});

describe('taskIds', () => {
	it('takes the id passed with --task', () => {
		expect(taskIds(['--task', '#T0036'], { queue: [{ id: '#T0043' }] })).toEqual(['#T0036']);
	});

	it('takes the queue of todo-next when no task is passed', () => {
		expect(taskIds(['--max', '2'], { queue: [{ id: '#T0043' }, { id: '#T0051' }] })).toEqual([
			'#T0043',
			'#T0051'
		]);
	});

	it('is empty when there is nothing to read', () => {
		expect(taskIds([], null)).toEqual([]);
		expect(taskIds([], { queue: 'x' })).toEqual([]);
	});
});

describe('parseClaudeResult', () => {
	it('reads the fields of the claude json output', () => {
		const out = JSON.stringify({
			type: 'result',
			subtype: 'success',
			is_error: false,
			total_cost_usd: 5.0312,
			duration_ms: 1680000,
			num_turns: 212,
			result: 'x'
		});
		expect(parseClaudeResult(out)).toEqual({
			isError: false,
			costUsd: 5.0312,
			durationMs: 1680000,
			turns: 212,
			subtype: 'success'
		});
	});

	it('returns null for text that is not json', () => {
		expect(parseClaudeResult('')).toBeNull();
		expect(parseClaudeResult('boom')).toBeNull();
	});
});

describe('parseCommits', () => {
	it('splits git log lines into hash and subject, oldest first', () => {
		const out = '86f051f chore(keywords): sync\n76a95f2 feat(blog): translate x\n';
		expect(parseCommits(out)).toEqual([
			{ hash: '76a95f2', subject: 'feat(blog): translate x' },
			{ hash: '86f051f', subject: 'chore(keywords): sync' }
		]);
	});

	it('is empty for empty output', () => {
		expect(parseCommits('')).toEqual([]);
	});
});

describe('taskOutcome', () => {
	it('task-done for a hecha task, with its date and title', () => {
		const o = taskOutcome(task({ estado: 'hecha', hecha: '2026-10-02' }), '#T0037');
		expect(o.event).toBe('task-done');
		expect(o.detail).toContain('task=#T0037');
		expect(o.detail).toContain('hecha=2026-10-02');
		expect(o.detail).toContain('titulo=');
	});

	it('task-blocked for a bloqueada task, with its note', () => {
		const o = taskOutcome(
			task({ estado: 'bloqueada', nota: 'bloqueada por todo-implementer 2026-10-02: ya cubierta' }),
			'#T0037'
		);
		expect(o.event).toBe('task-blocked');
		expect(o.detail).toContain('nota="bloqueada por todo-implementer 2026-10-02: ya cubierta"');
	});

	it('task-skipped for anything else, with the state it ended in', () => {
		const o = taskOutcome(task({ estado: 'en curso' }), '#T0037');
		expect(o.event).toBe('task-skipped');
		expect(o.detail).toContain('estado="en curso"');
	});

	it('task-skipped when the task is not in TODO.json', () => {
		const o = taskOutcome(undefined, '#T0099');
		expect(o.event).toBe('task-skipped');
		expect(o.detail).toContain('task=#T0099');
		expect(o.detail).toContain('not found');
	});
});

describe('buildStartEntry', () => {
	it('is a run-start with the args, the budget and the tasks', () => {
		const e = buildStartEntry({ args: ['--task', '#T0036'], budget: '30', ids: ['#T0036'] });
		expect(e).toEqual({
			mode: 'demanda',
			actor: 'todo-implementer',
			event: 'run-start',
			detail: 'args="--task #T0036" budget_usd=30 tasks=#T0036'
		});
	});

	it('writes none when there are no args or tasks', () => {
		const e = buildStartEntry({ args: [], budget: '30', ids: [] });
		expect(e.detail).toBe('args=none budget_usd=30 tasks=none');
	});
});

describe('buildEndEntries', () => {
	const claude = {
		isError: false,
		costUsd: 5.03,
		durationMs: 28 * 60_000,
		turns: 212,
		subtype: 'success'
	};

	it('logs one outcome per task, then the run-end with cost, minutes, turns and commits', () => {
		const entries = buildEndEntries({
			ids: ['#T0037'],
			tasks: [task({ estado: 'hecha', hecha: '2026-10-02' })],
			claude,
			exitCode: 0,
			seconds: 1700,
			commits: [
				{ hash: '8e18ea3', subject: 'feat(blog): tv-screen-rental add FAQ' },
				{ hash: '76a95f2', subject: 'feat(blog): translate tv-screen-rental' }
			]
		});
		expect(entries.map((e) => e.event)).toEqual(['task-done', 'run-end']);
		expect(entries.every((e) => e.mode === 'demanda' && e.actor === 'todo-implementer')).toBe(true);
		const end = entries[1].detail as string;
		expect(end).toContain('is_error=false');
		expect(end).toContain('exit=0');
		expect(end).toContain('cost_usd=5.03');
		expect(end).toContain('minutes=28.0');
		expect(end).toContain('turns=212');
		expect(end).toContain('commits=8e18ea3,76a95f2');
	});

	it('uses the wall clock minutes when claude gave no output', () => {
		const entries = buildEndEntries({
			ids: [],
			tasks: [],
			claude: null,
			exitCode: 1,
			seconds: 90,
			commits: []
		});
		expect(entries).toHaveLength(1);
		const end = entries[0].detail as string;
		expect(end).toContain('is_error=unknown');
		expect(end).toContain('exit=1');
		expect(end).toContain('minutes=1.5');
		expect(end).toContain('commits=none');
		expect(end).not.toContain('cost_usd');
	});
});
