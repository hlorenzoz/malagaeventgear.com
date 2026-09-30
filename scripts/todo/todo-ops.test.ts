/**
 * todo-ops.test.ts: the pure operations behind `just todo-list`, `todo-add` and `todo-set`, so the
 * task list can be read and changed without editing TODO.json by hand.
 */
import { describe, it, expect } from 'vitest';
import type { Task } from './todo-format';
import {
	addTask,
	filterTasks,
	formatTable,
	parseAddArgs,
	parseFilterArgs,
	parseSetArgs,
	setTask
} from './todo-ops';

const task = (over: Partial<Task> = {}): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'otro',
	titulo: 'Un titulo',
	anotada: '2026-09-20',
	origen: 'usuario',
	descripcion: ['a'],
	...over
});

const LIST: Task[] = [
	task({ id: '#T0001', prioridad: 'alta', tipo: 'seo-tecnico', titulo: 'Arreglar titulos largos' }),
	task({ id: '#T0002', prioridad: 'media', tipo: 'contenido', origen: 'ubersuggest (seo, x)' }),
	task({ id: '#T0003', estado: 'bloqueada', prioridad: 'alta', tipo: 'contenido' }),
	task({ id: '#T0004', estado: 'hecha', hecha: '2026-09-25', tipo: 'seo-tecnico' })
];

describe('filterTasks', () => {
	it('returns everything for an empty filter, sorted like the file', () => {
		expect(filterTasks(LIST, {}).map((t) => t.id)).toEqual(['#T0001', '#T0003', '#T0002', '#T0004']);
	});

	it('filters by estado, prioridad and tipo, and combines them', () => {
		expect(filterTasks(LIST, { estado: 'hecha' }).map((t) => t.id)).toEqual(['#T0004']);
		expect(filterTasks(LIST, { prioridad: 'alta' }).map((t) => t.id)).toEqual(['#T0001', '#T0003']);
		expect(filterTasks(LIST, { tipo: 'contenido' }).map((t) => t.id)).toEqual(['#T0003', '#T0002']);
		expect(filterTasks(LIST, { prioridad: 'alta', tipo: 'contenido' }).map((t) => t.id)).toEqual([
			'#T0003'
		]);
	});

	it('filters by a piece of the origen and by a piece of the title, ignoring case', () => {
		expect(filterTasks(LIST, { origen: 'ubersuggest' }).map((t) => t.id)).toEqual(['#T0002']);
		expect(filterTasks(LIST, { texto: 'TITULOS' }).map((t) => t.id)).toEqual(['#T0001']);
	});

	it('does not mutate its input', () => {
		const copy = LIST.map((t) => t.id);
		filterTasks(LIST, { tipo: 'contenido' });
		expect(LIST.map((t) => t.id)).toEqual(copy);
	});
});

describe('parseFilterArgs', () => {
	it('reads the filters from the flags', () => {
		expect(
			parseFilterArgs([
				'--estado',
				'pendiente',
				'--prioridad',
				'alta',
				'--tipo',
				'contenido',
				'--origen',
				'ubersuggest',
				'--texto',
				'hola'
			])
		).toEqual({
			estado: 'pendiente',
			prioridad: 'alta',
			tipo: 'contenido',
			origen: 'ubersuggest',
			texto: 'hola'
		});
	});

	it('rejects a value that is not in the enum, listing the valid ones', () => {
		expect(() => parseFilterArgs(['--tipo', 'cosas'])).toThrow(/seo-tecnico/);
		expect(() => parseFilterArgs(['--estado', 'casi'])).toThrow(/pendiente/);
		expect(() => parseFilterArgs(['--prioridad', 'urgente'])).toThrow(/alta/);
	});

	it('rejects a flag without a value', () => {
		expect(() => parseFilterArgs(['--tipo'])).toThrow(/--tipo/);
	});
});

describe('formatTable', () => {
	it('prints one line per task with id, estado, prioridad, tipo, date and title', () => {
		const out = formatTable(LIST.slice(0, 1));
		expect(out).toContain('#T0001');
		expect(out).toContain('pendiente');
		expect(out).toContain('alta');
		expect(out).toContain('seo-tecnico');
		expect(out).toContain('2026-09-20');
		expect(out).toContain('Arreglar titulos largos');
	});

	it('cuts a long title, and says how many tasks there are', () => {
		const out = formatTable([task({ titulo: 'x'.repeat(200) })]);
		expect(out).not.toContain('x'.repeat(120));
		expect(formatTable(LIST)).toMatch(/4 tareas/);
		expect(formatTable([])).toMatch(/0 tareas/);
	});

	it('shows "sin fecha" for a task without date', () => {
		expect(formatTable([task({ anotada: 'sin fecha' })])).toContain('sin fecha');
	});
});

describe('addTask', () => {
	it('adds a pending task by the user with the next id, today as date and the given fields', () => {
		const out = addTask(
			LIST,
			{ titulo: 'Nueva', prioridad: 'alta', tipo: 'negocio', descripcion: ['l1', 'l2'] },
			'2026-10-01'
		);
		const t = out.find((x) => x.titulo === 'Nueva')!;
		expect(t).toEqual({
			id: '#T0005',
			estado: 'pendiente',
			prioridad: 'alta',
			tipo: 'negocio',
			titulo: 'Nueva',
			anotada: '2026-10-01',
			origen: 'usuario',
			descripcion: ['l1', 'l2']
		});
		expect(out).toHaveLength(LIST.length + 1);
	});

	it('defaults to media, otro and an empty description', () => {
		const t = addTask([], { titulo: 'X' }, '2026-10-01')[0];
		expect(t).toMatchObject({ id: '#T0001', prioridad: 'media', tipo: 'otro', descripcion: [] });
	});

	it('never reuses an id, even one left by a deleted task', () => {
		const out = addTask([task({ id: '#T0007' })], { titulo: 'X' }, '2026-10-01');
		expect(out.at(-1)!.id).toBe('#T0008');
	});

	it('rejects an empty title or one with a line break', () => {
		expect(() => addTask([], { titulo: '   ' }, '2026-10-01')).toThrow(/título/);
		expect(() => addTask([], { titulo: 'a\nb' }, '2026-10-01')).toThrow(/título/);
	});

	it('does not mutate its input', () => {
		const n = LIST.length;
		addTask(LIST, { titulo: 'X' }, '2026-10-01');
		expect(LIST).toHaveLength(n);
	});
});

describe('setTask', () => {
	it('changes prioridad and tipo, leaving the rest alone', () => {
		const out = setTask(LIST, '#T0002', { prioridad: 'baja', tipo: 'keywords' }, '2026-10-01');
		const t = out.find((x) => x.id === '#T0002')!;
		expect(t).toMatchObject({ prioridad: 'baja', tipo: 'keywords', titulo: 'Un titulo' });
		expect(out.find((x) => x.id === '#T0001')).toEqual(LIST[0]);
	});

	it('marks a task hecha with today as Hecha, and clears Hecha when it is reopened', () => {
		const done = setTask(LIST, '#T0002', { estado: 'hecha' }, '2026-10-01');
		expect(done.find((x) => x.id === '#T0002')).toMatchObject({ estado: 'hecha', hecha: '2026-10-01' });
		const reopened = setTask(done, '#T0002', { estado: 'pendiente' }, '2026-10-02');
		const t = reopened.find((x) => x.id === '#T0002')!;
		expect(t.estado).toBe('pendiente');
		expect('hecha' in t).toBe(false);
	});

	it('keeps the Hecha date of a task that is already hecha', () => {
		const out = setTask(LIST, '#T0004', { estado: 'hecha' }, '2026-10-05');
		expect(out.find((x) => x.id === '#T0004')!.hecha).toBe('2026-09-25');
	});

	it('appends a note with a comma, or sets it when there is none', () => {
		const first = setTask(LIST, '#T0002', { addNota: 'no reabrir' }, '2026-10-01');
		expect(first.find((x) => x.id === '#T0002')!.nota).toBe('no reabrir');
		const second = setTask(first, '#T0002', { addNota: 'otra' }, '2026-10-01');
		expect(second.find((x) => x.id === '#T0002')!.nota).toBe('no reabrir, otra');
	});

	it('throws on an unknown id, naming it', () => {
		expect(() => setTask(LIST, '#T0099', { estado: 'hecha' }, '2026-10-01')).toThrow(/#T0099/);
	});

	it('throws when the patch changes nothing to set', () => {
		expect(() => setTask(LIST, '#T0001', {}, '2026-10-01')).toThrow(/nada/);
	});

	it('does not mutate its input', () => {
		const before = JSON.stringify(LIST);
		setTask(LIST, '#T0001', { prioridad: 'baja' }, '2026-10-01');
		expect(JSON.stringify(LIST)).toBe(before);
	});
});

describe('parseAddArgs', () => {
	const files: Record<string, string> = { 'desc.txt': '\nlinea 1\n\nlinea 3\n\n' };
	const read = (p: string) => {
		if (!(p in files)) throw new Error(`no existe ${p}`);
		return files[p];
	};

	it('reads titulo, prioridad and tipo', () => {
		expect(parseAddArgs(['--titulo', 'Hola', '--prioridad', 'alta', '--tipo', 'negocio'], read)).toEqual({
			titulo: 'Hola',
			prioridad: 'alta',
			tipo: 'negocio',
			descripcion: []
		});
	});

	it('takes the description from --desc, split by line', () => {
		expect(parseAddArgs(['--titulo', 'x', '--desc', 'uno\ndos'], read).descripcion).toEqual(['uno', 'dos']);
	});

	it('takes the description from --desc-file without the blank edges, keeping inner blanks', () => {
		expect(parseAddArgs(['--titulo', 'x', '--desc-file', 'desc.txt'], read).descripcion).toEqual([
			'linea 1',
			'',
			'linea 3'
		]);
	});

	it('requires a title, and rejects a bad enum value or an unknown flag', () => {
		expect(() => parseAddArgs(['--prioridad', 'alta'], read)).toThrow(/--titulo/);
		expect(() => parseAddArgs(['--titulo', 'x', '--tipo', 'cosas'], read)).toThrow(/seo-tecnico/);
		expect(() => parseAddArgs(['--titulo', 'x', '--foo', 'y'], read)).toThrow(/--foo/);
	});
});

describe('parseSetArgs', () => {
	it('reads the id and the patch', () => {
		expect(
			parseSetArgs(['#T0007', '--estado', 'hecha', '--prioridad', 'baja', '--tipo', 'keywords', '--add-nota', 'no reabrir'])
		).toEqual({
			id: '#T0007',
			patch: { estado: 'hecha', prioridad: 'baja', tipo: 'keywords', addNota: 'no reabrir' }
		});
	});

	it('accepts the id without the hash, and requires it', () => {
		expect(parseSetArgs(['T0007', '--estado', 'hecha']).id).toBe('#T0007');
		expect(() => parseSetArgs(['--estado', 'hecha'])).toThrow(/id/);
		expect(() => parseSetArgs(['nope', '--estado', 'hecha'])).toThrow(/id/);
	});

	it('rejects a bad enum value or an unknown flag', () => {
		expect(() => parseSetArgs(['#T0001', '--estado', 'casi'])).toThrow(/pendiente/);
		expect(() => parseSetArgs(['#T0001', '--foo', 'x'])).toThrow(/--foo/);
	});
});

describe('takeFileFlag', () => {
	it('removes --file and its value from anywhere in the arguments', async () => {
		const { takeFileFlag } = await import('./todo');
		expect(takeFileFlag(['--tipo', 'x', '--file', 'a.json', '--estado', 'y'])).toEqual({
			file: 'a.json',
			rest: ['--tipo', 'x', '--estado', 'y']
		});
		expect(takeFileFlag(['--tipo', 'x'])).toEqual({ file: undefined, rest: ['--tipo', 'x'] });
	});
});
