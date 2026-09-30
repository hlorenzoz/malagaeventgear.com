/**
 * todo-json.ts: TODO.json, the task list as validated JSON. Pure (no I/O): `parseTodoJson` turns
 * the text into tasks and `renderTodoJson` writes them back, sorted like `sortTasks`.
 *
 * The file is written by scripts (`organize.ts`, `todo.ts`) and edited by hand, so the schema is
 * strict: an unknown key, a bad enum value or a duplicated id throws a message that starts with
 * `TODO.json`, and nothing is written. That is the whole point of moving off the text format.
 *
 * The in memory `Task` keeps a single `nota` string and `anotada` as `sin fecha`. The file has
 * `notas` (the same note split on ", ", lossless) and `anotada`/`hecha` as a date or null.
 */

import { z } from 'zod';
import {
	ESTADOS,
	NO_DATE,
	PRIORIDADES,
	TIPOS,
	sortTasks,
	type Task
} from './todo-format';

export const TODO_FILE_VERSION = 1;

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'debe ser YYYY-MM-DD');

const TaskJsonSchema = z
	.object({
		id: z.string().regex(/^#T\d{4}$/, 'debe ser #T seguido de 4 dígitos'),
		estado: z.enum(ESTADOS),
		prioridad: z.enum(PRIORIDADES),
		tipo: z.enum(TIPOS),
		titulo: z.string().min(1),
		anotada: dateOnly.nullable(),
		hecha: dateOnly.nullable(),
		origen: z.string().min(1),
		notas: z.array(z.string().min(1)),
		descripcion: z.array(z.string())
	})
	.strict();

const TodoFileSchema = z
	.object({
		version: z.literal(TODO_FILE_VERSION),
		updated: dateOnly,
		tasks: z.array(TaskJsonSchema)
	})
	.strict();

type TaskJson = z.infer<typeof TaskJsonSchema>;

const NOTE_SEPARATOR = ', ';

function toJson(t: Task): TaskJson {
	return {
		id: t.id,
		estado: t.estado,
		prioridad: t.prioridad,
		tipo: t.tipo,
		titulo: t.titulo,
		anotada: t.anotada === NO_DATE ? null : t.anotada,
		hecha: t.estado === 'hecha' && t.hecha ? t.hecha : null,
		origen: t.origen,
		notas: t.nota ? t.nota.split(NOTE_SEPARATOR) : [],
		descripcion: t.descripcion
	};
}

function fromJson(j: TaskJson): Task {
	const task: Task = {
		id: j.id,
		estado: j.estado,
		prioridad: j.prioridad,
		tipo: j.tipo,
		titulo: j.titulo,
		anotada: j.anotada ?? NO_DATE,
		origen: j.origen,
		descripcion: j.descripcion
	};
	if (j.hecha) task.hecha = j.hecha;
	if (j.notas.length > 0) task.nota = j.notas.join(NOTE_SEPARATOR);
	return task;
}

const issuePath = (path: (string | number)[]) => path.join('.') || '(raíz)';

/** Pure: the text of TODO.json as tasks. Throws an Error starting with `TODO.json` when the file
 *  is not valid JSON, does not match the schema or repeats an id. */
export function parseTodoJson(text: string): { updated: string; tasks: Task[] } {
	let raw: unknown;
	try {
		raw = JSON.parse(text);
	} catch (e) {
		throw new Error(`TODO.json: no es JSON válido (${(e as Error).message})`);
	}
	const parsed = TodoFileSchema.safeParse(raw);
	if (!parsed.success) {
		const detail = parsed.error.issues
			.slice(0, 5)
			.map((i) => `${issuePath(i.path)}: ${i.message}`)
			.join('; ');
		throw new Error(`TODO.json: ${detail}`);
	}
	const seen = new Set<string>();
	for (const t of parsed.data.tasks) {
		if (seen.has(t.id)) throw new Error(`TODO.json: id duplicado ${t.id}`);
		seen.add(t.id);
	}
	return { updated: parsed.data.updated, tasks: sortTasks(parsed.data.tasks.map(fromJson)) };
}

/** Pure: the whole file, tasks sorted, 2 space indent and one final newline. */
export function renderTodoJson(tasks: Task[], updated: string): string {
	const file = {
		version: TODO_FILE_VERSION,
		updated,
		tasks: sortTasks(tasks).map(toJson)
	};
	return JSON.stringify(file, null, 2) + '\n';
}
