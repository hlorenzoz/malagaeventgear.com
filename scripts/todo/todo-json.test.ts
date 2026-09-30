/**
 * todo-json.test.ts: unit tests for TODO.json, the task list as validated JSON (pure, no I/O).
 * The file is edited by scripts and also by hand, so a typo must fail loudly instead of being
 * dropped and lost on the next write.
 */
import { describe, it, expect } from 'vitest';
import { TIPOS, sortTasks, type Task } from './todo-format';
import { TODO_FILE_VERSION, parseTodoJson, renderTodoJson } from './todo-json';

const task = (over: Partial<Task> = {}): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'otro',
	titulo: 'Un titulo',
	anotada: '2026-09-30',
	origen: 'usuario',
	descripcion: ['linea 1', 'linea 2'],
	...over
});

const file = (tasks: unknown[], extra: Record<string, unknown> = {}) =>
	JSON.stringify({ version: TODO_FILE_VERSION, updated: '2026-09-30', tasks, ...extra });

const raw = (over: Record<string, unknown> = {}) => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'otro',
	titulo: 'Un titulo',
	anotada: '2026-09-30',
	hecha: null,
	origen: 'usuario',
	notas: [],
	descripcion: ['linea 1'],
	...over
});

describe('renderTodoJson', () => {
	it('writes version, updated and the tasks, with 2 space indent and one final newline', () => {
		const text = renderTodoJson([task()], '2026-09-30');
		expect(text.endsWith('}\n')).toBe(true);
		expect(text.endsWith('\n\n')).toBe(false);
		expect(text).toContain('\n  "version": 1,\n  "updated": "2026-09-30",\n  "tasks": [\n');
		const parsed = JSON.parse(text);
		expect(parsed.version).toBe(TODO_FILE_VERSION);
		expect(parsed.updated).toBe('2026-09-30');
	});

	it('writes the keys of a task in a fixed order', () => {
		const parsed = JSON.parse(renderTodoJson([task()], '2026-09-30'));
		expect(Object.keys(parsed.tasks[0])).toEqual([
			'id',
			'estado',
			'prioridad',
			'tipo',
			'titulo',
			'anotada',
			'hecha',
			'origen',
			'notas',
			'descripcion'
		]);
	});

	it('maps "sin fecha" to null and a missing hecha to null', () => {
		const parsed = JSON.parse(renderTodoJson([task({ anotada: 'sin fecha' })], '2026-09-30'));
		expect(parsed.tasks[0].anotada).toBeNull();
		expect(parsed.tasks[0].hecha).toBeNull();
	});

	it('writes hecha only for a done task', () => {
		const open = task({ id: '#T0001', hecha: '2026-09-29' });
		const done = task({ id: '#T0002', estado: 'hecha', hecha: '2026-09-29' });
		const parsed = JSON.parse(renderTodoJson([open, done], '2026-09-30'));
		const byId = Object.fromEntries(parsed.tasks.map((t: { id: string }) => [t.id, t]));
		expect(byId['#T0001'].hecha).toBeNull();
		expect(byId['#T0002'].hecha).toBe('2026-09-29');
	});

	it('splits the nota into notas and writes an empty list when there is none', () => {
		const parsed = JSON.parse(
			renderTodoJson(
				[
					task({ id: '#T0001', nota: 'prioridad por defecto, estado por confirmar' }),
					task({ id: '#T0002' })
				],
				'2026-09-30'
			)
		);
		const byId = Object.fromEntries(parsed.tasks.map((t: { id: string }) => [t.id, t]));
		expect(byId['#T0001'].notas).toEqual(['prioridad por defecto', 'estado por confirmar']);
		expect(byId['#T0002'].notas).toEqual([]);
	});

	it('writes the tasks in the order of sortTasks', () => {
		const tasks = [
			task({ id: '#T0001', prioridad: 'baja' }),
			task({ id: '#T0002', prioridad: 'alta' }),
			task({ id: '#T0003', estado: 'hecha', hecha: '2026-09-29' })
		];
		const parsed = JSON.parse(renderTodoJson(tasks, '2026-09-30'));
		expect(parsed.tasks.map((t: { id: string }) => t.id)).toEqual(
			sortTasks(tasks).map((t) => t.id)
		);
	});

	it('keeps every description line verbatim, blank lines and block markers included', () => {
		const descripcion = ['=== FIN #T0001 ===', '', '== HECHAS ==', '  con sangria', 'Origen: x'];
		const parsed = JSON.parse(renderTodoJson([task({ descripcion })], '2026-09-30'));
		expect(parsed.tasks[0].descripcion).toEqual(descripcion);
	});
});

describe('parseTodoJson', () => {
	it('round trips: parse(render(tasks)) gives the same tasks in sorted order', () => {
		const tasks = [
			task({ id: '#T0001', nota: 'a, b', tipo: 'contenido' }),
			task({ id: '#T0002', estado: 'hecha', hecha: '2026-09-29', anotada: 'sin fecha' }),
			task({ id: '#T0003', estado: 'bloqueada', prioridad: 'alta', tipo: 'traduccion' })
		];
		const back = parseTodoJson(renderTodoJson(tasks, '2026-09-30'));
		expect(back.updated).toBe('2026-09-30');
		expect(back.tasks).toEqual(sortTasks(tasks));
	});

	it('joins notas back into the single nota string, and omits it when empty', () => {
		const back = parseTodoJson(
			file([raw({ id: '#T0001', notas: ['uno', 'dos'] }), raw({ id: '#T0002', notas: [] })])
		);
		const byId = Object.fromEntries(back.tasks.map((t) => [t.id, t]));
		expect(byId['#T0001'].nota).toBe('uno, dos');
		expect('nota' in byId['#T0002']).toBe(false);
	});

	it('turns a null anotada into "sin fecha" and a null hecha into no hecha', () => {
		const back = parseTodoJson(file([raw({ anotada: null })]));
		expect(back.tasks[0].anotada).toBe('sin fecha');
		expect('hecha' in back.tasks[0]).toBe(false);
	});

	it('accepts every tipo of TIPOS', () => {
		for (const tipo of TIPOS) {
			expect(() => parseTodoJson(file([raw({ tipo })]))).not.toThrow();
		}
	});

	it('rejects an invalid estado, prioridad or tipo', () => {
		expect(() => parseTodoJson(file([raw({ estado: 'casi' })]))).toThrow(/TODO\.json/);
		expect(() => parseTodoJson(file([raw({ prioridad: 'urgente' })]))).toThrow(/TODO\.json/);
		expect(() => parseTodoJson(file([raw({ tipo: 'cosas' })]))).toThrow(/TODO\.json/);
	});

	it('rejects a bad id, a bad date and a missing title', () => {
		expect(() => parseTodoJson(file([raw({ id: 'T0001' })]))).toThrow(/TODO\.json/);
		expect(() => parseTodoJson(file([raw({ anotada: '30/09/2026' })]))).toThrow(/TODO\.json/);
		expect(() => parseTodoJson(file([raw({ titulo: '' })]))).toThrow(/TODO\.json/);
	});

	it('rejects a duplicated id', () => {
		expect(() => parseTodoJson(file([raw(), raw()]))).toThrow(/duplicad/);
	});

	it('rejects an unknown key, so a typo is not silently dropped', () => {
		expect(() => parseTodoJson(file([raw({ prioidad: 'alta' })]))).toThrow(/TODO\.json/);
		expect(() => parseTodoJson(file([raw()], { extra: 1 }))).toThrow(/TODO\.json/);
	});

	it('rejects text that is not JSON, naming the file', () => {
		expect(() => parseTodoJson('# TODO.txt: lista')).toThrow(/TODO\.json/);
		expect(() => parseTodoJson('')).toThrow(/TODO\.json/);
	});

	it('rejects a newer version of the file than this code knows', () => {
		expect(() =>
			parseTodoJson(JSON.stringify({ version: 2, updated: '2026-09-30', tasks: [] }))
		).toThrow(/TODO\.json/);
	});
});
