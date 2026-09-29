import { describe, it, expect } from 'vitest';
import {
	parseTodo,
	renderTodo,
	sortTasks,
	resolveTasks,
	looseToTask,
	assignIds,
	HEADER_LINES,
	type Task
} from './todo-format';

const task = (over: Partial<Task> = {}): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	titulo: 'Algo',
	anotada: '2026-09-29',
	origen: 'usuario',
	descripcion: ['linea uno'],
	...over
});

describe('renderTodo and parseTodo (new format)', () => {
	it('renders header, both sections, and one blank line between blocks', () => {
		const out = renderTodo([
			task({ id: '#T0001', titulo: 'A' }),
			task({ id: '#T0002', titulo: 'B', estado: 'hecha', hecha: '2026-10-02' })
		]);
		const lines = out.split('\n');
		expect(lines.slice(0, HEADER_LINES.length)).toEqual(HEADER_LINES);
		expect(out).toContain('\n== PENDIENTES ==\n\n=== TAREA #T0001 ===\nEstado: pendiente\n');
		expect(out).toContain('=== FIN #T0001 ===\n\n== HECHAS ==\n\n=== TAREA #T0002 ===\n');
		expect(out).toContain('Hecha: 2026-10-02\n');
		expect(out.endsWith('=== FIN #T0002 ===\n')).toBe(true);
	});

	it('keeps field order and omits Hecha and Nota when absent', () => {
		const out = renderTodo([task({ nota: 'una nota' })]);
		expect(out).toContain(
			'=== TAREA #T0001 ===\nEstado: pendiente\nPrioridad: media\nTítulo: Algo\nAnotada: 2026-09-29\nOrigen: usuario\nNota: una nota\n---\nlinea uno\n=== FIN #T0001 ==='
		);
		const body = renderTodo([task()]).slice(HEADER_LINES.join('\n').length);
		expect(body).not.toContain('Nota:');
		expect(body).not.toContain('Hecha:');
	});

	it('round trips, keeping description lines verbatim (glyphs, blanks, indentation)', () => {
		const t = task({
			descripcion: [
				'✅ hecho',
				'',
				'   ❌ pendiente con sangría',
				'--- no es separador',
				'-- ❌ tampoco'
			]
		});
		const parsed = parseTodo(renderTodo([t]));
		expect(parsed.tasks).toEqual([t]);
		expect(parsed.loose).toEqual([]);
	});

	it('is idempotent', () => {
		const once = renderTodo([task(), task({ id: '#T0002', estado: 'hecha' })]);
		const again = renderTodo(parseTodo(once).tasks);
		expect(again).toBe(once);
	});

	it('handles an empty description', () => {
		const t = task({ descripcion: [] });
		expect(parseTodo(renderTodo([t])).tasks).toEqual([t]);
	});

	it('throws on an unknown field, a bad estado, or an unclosed block', () => {
		const good = renderTodo([task()]);
		expect(() => parseTodo(good.replace('\nEstado: pendiente', '\nEstado: casi'))).toThrow(
			/#T0001/
		);
		expect(() => parseTodo(good.replace('\nOrigen:', '\nFoo:'))).toThrow(/#T0001/);
		expect(() => parseTodo(good.replace('=== FIN #T0001 ===', ''))).toThrow(/#T0001/);
		expect(() => parseTodo(good.replace('\nAnotada: 2026-09-29', '\nAnotada: ayer'))).toThrow(
			/#T0001/
		);
	});

	it('accepts "sin fecha" as Anotada', () => {
		const t = task({ anotada: 'sin fecha' });
		expect(parseTodo(renderTodo([t])).tasks[0].anotada).toBe('sin fecha');
	});

	it('rejects duplicate ids', () => {
		const out = renderTodo([task(), task()]);
		expect(() => parseTodo(out)).toThrow(/duplicad/i);
	});
});

describe('sortTasks', () => {
	it('orders pendientes by priority, en curso first, newest anotada, then id; hechas last', () => {
		const list = [
			task({ id: '#T0001', prioridad: 'baja' }),
			task({ id: '#T0002', prioridad: 'alta', anotada: '2026-09-01' }),
			task({ id: '#T0003', prioridad: 'alta', anotada: '2026-09-20' }),
			task({ id: '#T0004', prioridad: 'alta', estado: 'en curso', anotada: '2026-08-01' }),
			task({ id: '#T0005', prioridad: 'media', anotada: 'sin fecha' }),
			task({ id: '#T0006', prioridad: 'media', anotada: '2026-09-02' }),
			task({ id: '#T0007', prioridad: 'alta', anotada: '2026-09-20' }),
			task({ id: '#T0008', estado: 'hecha', prioridad: 'alta', hecha: '2026-09-10' }),
			task({ id: '#T0009', estado: 'hecha', hecha: '2026-09-25' }),
			task({ id: '#T0010', estado: 'hecha', anotada: 'sin fecha' }),
			task({ id: '#T0011', estado: 'hecha', anotada: '2026-09-28' })
		];
		expect(sortTasks(list).map((t) => t.id)).toEqual([
			'#T0004',
			'#T0003',
			'#T0007',
			'#T0002',
			'#T0006',
			'#T0005',
			'#T0001',
			'#T0009',
			'#T0008',
			'#T0011',
			'#T0010'
		]);
	});

	it('does not mutate its input', () => {
		const list = [task({ id: '#T0002', prioridad: 'baja' }), task({ id: '#T0001' })];
		sortTasks(list);
		expect(list[0].id).toBe('#T0002');
	});
});

describe('legacy entries', () => {
	const legacy = [
		'-- ❌ Comments',
		'',
		'Hace falta algo.',
		'  ✅ sub item',
		'',
		'',
		'-- ✅ Sitemaps (anotado y HECHO 2026-09-25)',
		'',
		'Cuerpo dos.',
		'',
		'-- ❌ ✅ Ambos',
		'texto',
		'',
		'-- Sin glifos',
		'texto',
		'',
		'-- ❌ Con fecha (anotado 2026-09-26, revisado el mismo día)',
		'texto',
		''
	].join('\n');

	it('parses headers, glyph states, title, dates and descriptions', () => {
		const { tasks } = parseTodo(legacy);
		expect(tasks).toHaveLength(5);
		expect(tasks[0]).toMatchObject({
			id: '',
			estado: 'pendiente',
			prioridad: 'media',
			titulo: 'Comments',
			anotada: 'sin fecha',
			origen: 'usuario',
			descripcion: ['', 'Hace falta algo.', '  ✅ sub item'].slice(1)
		});
		expect(tasks[0].nota).toBe('prioridad por defecto');
		expect(tasks[1]).toMatchObject({
			estado: 'hecha',
			titulo: 'Sitemaps',
			anotada: '2026-09-25',
			hecha: '2026-09-25',
			descripcion: ['Cuerpo dos.']
		});
		expect(tasks[1].nota).toBeUndefined();
		expect(tasks[2]).toMatchObject({ estado: 'pendiente', titulo: 'Ambos' });
		expect(tasks[2].nota).toBe('estado por confirmar (tenía "❌ ✅"), prioridad por defecto');
		expect(tasks[3].nota).toBe('estado por confirmar (tenía ""), prioridad por defecto');
		expect(tasks[4]).toMatchObject({ titulo: 'Con fecha', anotada: '2026-09-26' });
	});

	it('leaves a hecha date empty when the paren has no HECHO date', () => {
		const t = parseTodo('-- ✅ Algo (anotado 2026-09-01)\ncuerpo\n').tasks[0];
		expect(t.hecha).toBeUndefined();
		expect(t.anotada).toBe('2026-09-01');
	});

	it('takes the RESUELTO date as Hecha', () => {
		const t = parseTodo('-- ✅ Algo (anotado y RESUELTO 2026-09-25)\ncuerpo\n').tasks[0];
		expect(t.hecha).toBe('2026-09-25');
	});

	it('uses the first description line as title when the header has none', () => {
		const long = 'x'.repeat(120);
		const t = parseTodo(`-- ❌ ✅\n\n${long}\notra\n`).tasks[0];
		expect(t.titulo).toBe('x'.repeat(90));
		expect(t.nota).toContain('título tomado de la primera línea');
		expect(t.nota).toContain('estado por confirmar');
		expect(t.descripcion).toEqual([long, 'otra']);
	});

	it('keeps parentheses that are not (anotado ...) in the title', () => {
		const t = parseTodo('-- ❌ Orden (decisión del usuario, 2026-09-26)\nx\n').tasks[0];
		expect(t.titulo).toBe('Orden (decisión del usuario, 2026-09-26)');
		expect(t.anotada).toBe('sin fecha');
	});

	it('ends a legacy description at a task header, TAREA block or section line', () => {
		const text = [
			'-- ❌ Uno',
			'a',
			'== PENDIENTES ==',
			'-- ❌ Dos',
			'b',
			renderTodo([task({ id: '#T0007' })]),
			'-- ❌ Tres',
			'c'
		].join('\n');
		const { tasks } = parseTodo(text);
		expect(tasks.map((t) => t.titulo)).toEqual(['Uno', 'Dos', 'Algo', 'Tres']);
		expect(tasks[0].descripcion).toEqual(['a']);
		expect(tasks[2].id).toBe('#T0007');
	});

	it('drops the managed section of the old content-strategist entry', () => {
		const text = [
			'-- ❌ Uno',
			'a',
			'',
			'== OPORTUNIDADES DE CONTENIDO (agente content-strategist) ==',
			'nota',
			'',
			'-- ❌ Oportunidades de contenido del 2026-09-29 (agente content-strategist)',
			'1. algo'
		].join('\n');
		const { tasks } = parseTodo(text);
		expect(tasks.map((t) => t.titulo)).toEqual(['Uno']);
	});

	it('ignores the generated header comment lines', () => {
		const out = renderTodo([task()]);
		const parsed = parseTodo(out);
		expect(parsed.header).toEqual(HEADER_LINES);
		expect(parsed.loose).toEqual([]);
	});
});

describe('loose text', () => {
	it('collects contiguous chunks outside blocks, remembering their position', () => {
		const text = [
			renderTodo([task({ id: '#T0001' })]),
			'Recordar revisar X',
			'y también Y',
			'',
			'Otra cosa suelta'
		].join('\n');
		const parsed = parseTodo(text);
		expect(parsed.tasks).toHaveLength(1);
		expect(parsed.loose).toEqual([
			{ lines: ['Recordar revisar X', 'y también Y'], before: 1 },
			{ lines: ['Otra cosa suelta'], before: 1 }
		]);
	});

	it('turns a chunk into a task with defaults and a review note', () => {
		const t = looseToTask({ lines: ['Recordar revisar X', 'más'], before: 0 }, 'usuario');
		expect(t).toMatchObject({
			id: '',
			estado: 'pendiente',
			prioridad: 'media',
			titulo: 'Recordar revisar X',
			anotada: 'sin fecha',
			origen: 'usuario',
			descripcion: ['Recordar revisar X', 'más']
		});
		expect(t.nota).toBe('texto sin estructura, revisar, prioridad por defecto');
	});

	it('resolveTasks keeps the original order of tasks and loose chunks', () => {
		const text = 'Suelto antes\n\n-- ❌ Legacy\ncuerpo\n';
		const parsed = parseTodo(text);
		expect(resolveTasks(parsed, 'migrada').map((t) => t.titulo)).toEqual([
			'Suelto antes',
			'Legacy'
		]);
		expect(resolveTasks(parsed, 'migrada')[0].origen).toBe('migrada');
	});

	it('resolveTasks keeps the origin of new-format tasks and only defaults legacy ones', () => {
		const text = renderTodo([task({ origen: 'migrada' })]) + '-- ❌ Nueva\nx\n';
		const tasks = resolveTasks(parseTodo(text), 'usuario');
		expect(tasks.map((t) => t.origen)).toEqual(['migrada', 'usuario']);
	});
});

describe('assignIds', () => {
	it('gives new ids after the max, never reusing, in order', () => {
		const list = [
			task({ id: '#T0005' }),
			task({ id: '', titulo: 'a' }),
			task({ id: '#T0002' }),
			task({ id: '', titulo: 'b' })
		];
		expect(assignIds(list).map((t) => t.id)).toEqual(['#T0005', '#T0006', '#T0002', '#T0007']);
	});

	it('starts at T0001 for an empty set', () => {
		expect(assignIds([task({ id: '' })])[0].id).toBe('#T0001');
	});
});

describe('rule 12', () => {
	it('the generated header uses only ASCII punctuation', () => {
		expect(HEADER_LINES.join('\n')).not.toMatch(/[—–‘’“”…;]/);
	});
});
