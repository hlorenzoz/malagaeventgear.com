/**
 * todo-ops.ts: the pure operations behind `just todo-list`, `todo-add` and `todo-set`, so the task
 * list can be read and changed without editing TODO.json by hand. No I/O: `todo.ts` reads and
 * writes the file. Nothing here mutates its input.
 */

import {
	ESTADOS,
	PRIORIDADES,
	TIPOS,
	assignIds,
	sortTasks,
	type Estado,
	type Prioridad,
	type Task,
	type Tipo
} from './todo-format';

export interface TaskFilter {
	estado?: Estado;
	prioridad?: Prioridad;
	tipo?: Tipo;
	/** A piece of the Origen, ignoring case. */
	origen?: string;
	/** A piece of the title, ignoring case. */
	texto?: string;
}

const has = (haystack: string, needle: string) => haystack.toLowerCase().includes(needle.toLowerCase());

/** Pure: the tasks that match every filter, sorted like the file. */
export function filterTasks(tasks: Task[], f: TaskFilter): Task[] {
	return sortTasks(
		tasks.filter(
			(t) =>
				(!f.estado || t.estado === f.estado) &&
				(!f.prioridad || t.prioridad === f.prioridad) &&
				(!f.tipo || t.tipo === f.tipo) &&
				(!f.origen || has(t.origen, f.origen)) &&
				(!f.texto || has(t.titulo, f.texto))
		)
	);
}

function enumValue<T extends string>(flag: string, value: string, valid: readonly T[]): T {
	if (!(valid as readonly string[]).includes(value)) {
		throw new Error(`${flag}: valor inválido "${value}". Válidos: ${valid.join(', ')}`);
	}
	return value as T;
}

/** Pure: the flags of `todo-list` as a filter. Throws with the valid values on a bad enum value. */
export function parseFilterArgs(argv: string[]): TaskFilter {
	const f: TaskFilter = {};
	for (let i = 0; i < argv.length; i += 2) {
		const flag = argv[i];
		const value = argv[i + 1];
		if (value === undefined || value.startsWith('--')) throw new Error(`${flag} requiere un valor`);
		if (flag === '--estado') f.estado = enumValue(flag, value, ESTADOS);
		else if (flag === '--prioridad') f.prioridad = enumValue(flag, value, PRIORIDADES);
		else if (flag === '--tipo') f.tipo = enumValue(flag, value, TIPOS);
		else if (flag === '--origen') f.origen = value;
		else if (flag === '--texto') f.texto = value;
		else throw new Error(`flag desconocido ${flag}`);
	}
	return f;
}

const TITLE_MAX = 80;

/** Pure: a plain text table, one line per task, and the count at the end. */
export function formatTable(tasks: Task[]): string {
	const cut = (s: string) => (s.length > TITLE_MAX ? `${s.slice(0, TITLE_MAX - 3)}...` : s);
	const rows = tasks.map((t) => [t.id, t.estado, t.prioridad, t.tipo, t.anotada, cut(t.titulo)]);
	const head = ['id', 'estado', 'prioridad', 'tipo', 'anotada', 'título'];
	const all = [head, ...rows];
	const widths = head.map((_, c) => Math.max(...all.map((r) => r[c].length)));
	const line = (r: string[]) => r.map((cell, c) => cell.padEnd(widths[c])).join('  ').trimEnd();
	return [...all.map(line), '', `${tasks.length} tareas`].join('\n');
}

export interface NewTask {
	titulo: string;
	prioridad?: Prioridad;
	tipo?: Tipo;
	descripcion?: string[];
}

/** Pure: the list plus a new pending task by the user, with the next id and today as Anotada. */
export function addTask(tasks: Task[], input: NewTask, today: string): Task[] {
	const titulo = input.titulo.trim();
	if (titulo === '' || /[\r\n]/.test(titulo)) {
		throw new Error('el título es obligatorio y va en una sola línea');
	}
	const fresh: Task = {
		id: '',
		estado: 'pendiente',
		prioridad: input.prioridad ?? 'media',
		tipo: input.tipo ?? 'otro',
		titulo,
		anotada: today,
		origen: 'usuario',
		descripcion: input.descripcion ?? []
	};
	return assignIds([...tasks, fresh]);
}

export interface TaskPatch {
	estado?: Estado;
	prioridad?: Prioridad;
	tipo?: Tipo;
	/** Appended to the existing nota with a comma. */
	addNota?: string;
}

/** Pure: the list with one task changed. `hecha` moves with the estado: a task that becomes hecha
 *  gets today (an already done task keeps its date), and one that is reopened loses it. */
export function setTask(tasks: Task[], id: string, patch: TaskPatch, today: string): Task[] {
	if (!tasks.some((t) => t.id === id)) throw new Error(`${id}: no existe esa tarea`);
	if (
		patch.estado === undefined &&
		patch.prioridad === undefined &&
		patch.tipo === undefined &&
		patch.addNota === undefined
	) {
		throw new Error('nada que cambiar: indicar --estado, --prioridad, --tipo o --add-nota');
	}
	return tasks.map((t) => {
		if (t.id !== id) return t;
		const { hecha: _drop, ...rest } = t;
		const next: Task = { ...rest };
		if (patch.prioridad) next.prioridad = patch.prioridad;
		if (patch.tipo) next.tipo = patch.tipo;
		if (patch.addNota) next.nota = t.nota ? `${t.nota}, ${patch.addNota}` : patch.addNota;
		const estado = patch.estado ?? t.estado;
		next.estado = estado;
		if (estado === 'hecha') next.hecha = t.estado === 'hecha' && t.hecha ? t.hecha : today;
		return next;
	});
}

/** Pure: the tokens as `--flag value` pairs. Throws on a flag without value or not in `known`. */
function flagPairs(tokens: string[], known: readonly string[]): Map<string, string> {
	const out = new Map<string, string>();
	for (let i = 0; i < tokens.length; i += 2) {
		const flag = tokens[i];
		if (!known.includes(flag)) throw new Error(`flag desconocido ${flag}`);
		const value = tokens[i + 1];
		if (value === undefined || value.startsWith('--')) throw new Error(`${flag} requiere un valor`);
		out.set(flag, value);
	}
	return out;
}

const trimBlankEdges = (lines: string[]): string[] => {
	let s = 0;
	let e = lines.length;
	while (s < e && lines[s].trim() === '') s++;
	while (e > s && lines[e - 1].trim() === '') e--;
	return lines.slice(s, e);
};

/** Pure (the file read is injected): the flags of `todo-add` as a new task. */
export function parseAddArgs(argv: string[], readText: (path: string) => string): NewTask {
	const f = flagPairs(argv, ['--titulo', '--prioridad', '--tipo', '--desc', '--desc-file']);
	const titulo = f.get('--titulo');
	if (titulo === undefined) throw new Error('--titulo es obligatorio');
	const task: NewTask = { titulo, descripcion: [] };
	const prioridad = f.get('--prioridad');
	if (prioridad) task.prioridad = enumValue('--prioridad', prioridad, PRIORIDADES);
	const tipo = f.get('--tipo');
	if (tipo) task.tipo = enumValue('--tipo', tipo, TIPOS);
	const lines: string[] = [];
	const desc = f.get('--desc');
	if (desc) lines.push(...desc.replace(/\r\n/g, '\n').split('\n'));
	const descFile = f.get('--desc-file');
	if (descFile) lines.push(...readText(descFile).replace(/\r\n/g, '\n').split('\n'));
	task.descripcion = trimBlankEdges(lines);
	return task;
}

/** Pure: the flags of `todo-set` as the id (with or without `#`) and the patch. */
export function parseSetArgs(argv: string[]): { id: string; patch: TaskPatch } {
	const [rawId, ...rest] = argv;
	const idMatch = rawId ? /^#?(T\d{4})$/.exec(rawId) : null;
	if (!idMatch) throw new Error('falta el id de la tarea, por ejemplo #T0007');
	const f = flagPairs(rest, ['--estado', '--prioridad', '--tipo', '--add-nota']);
	const patch: TaskPatch = {};
	const estado = f.get('--estado');
	if (estado) patch.estado = enumValue('--estado', estado, ESTADOS);
	const prioridad = f.get('--prioridad');
	if (prioridad) patch.prioridad = enumValue('--prioridad', prioridad, PRIORIDADES);
	const tipo = f.get('--tipo');
	if (tipo) patch.tipo = enumValue('--tipo', tipo, TIPOS);
	const nota = f.get('--add-nota');
	if (nota) patch.addNota = nota;
	return { id: `#${idMatch[1]}`, patch };
}
