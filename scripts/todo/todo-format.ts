/**
 * todo-format.ts: the shared model of a task (types, enums), the default-priority note, id
 * assignment and sorting. Pure (no I/O). The file format lives in `todo-json.ts`.
 */

export const ESTADOS = ['pendiente', 'en curso', 'bloqueada', 'hecha'] as const;
export const PRIORIDADES = ['alta', 'media', 'baja'] as const;
/** What a task is about, to group and filter the list. `otro` is the default for anything unclassified. */
export const TIPOS = [
	'contenido',
	'traduccion',
	'seo-tecnico',
	'visibilidad-ia',
	'keywords',
	'link-building',
	'imagenes',
	'infraestructura',
	'diseno',
	'negocio',
	'otro'
] as const;
export type Estado = (typeof ESTADOS)[number];
export type Prioridad = (typeof PRIORIDADES)[number];
export type Tipo = (typeof TIPOS)[number];

export interface Task {
	/** `#T0041`, or '' for a task that has none yet (see `assignIds`). */
	id: string;
	estado: Estado;
	prioridad: Prioridad;
	tipo: Tipo;
	titulo: string;
	/** YYYY-MM-DD or `sin fecha`. */
	anotada: string;
	/** YYYY-MM-DD, only meaningful when `estado` is `hecha`. */
	hecha?: string;
	origen: string;
	/** Notes joined with ", " (TODO.json stores them as the list `notas`). */
	nota?: string;
	/** Verbatim description lines. */
	descripcion: string[];
}

export const NO_DATE = 'sin fecha';
export const DEFAULT_PRIORITY_NOTE = 'prioridad por defecto';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Pure: new ids (`#T` + 4 digits) after the highest one in use, in order. Never reuses. */
export function assignIds(tasks: Task[]): Task[] {
	let max = 0;
	for (const t of tasks) max = Math.max(max, Number(/^#T(\d{4})$/.exec(t.id)?.[1] ?? 0));
	return tasks.map((t) => (t.id ? t : { ...t, id: `#T${String(++max).padStart(4, '0')}` }));
}

const PRIO_RANK: Record<Prioridad, number> = { alta: 0, media: 1, baja: 2 };
const ESTADO_RANK: Record<Estado, number> = { 'en curso': 0, pendiente: 1, bloqueada: 2, hecha: 3 };
const date = (d: string | undefined) => (d && DATE_RE.test(d) ? d : '');
/** Newest first, an empty date last. */
const newestFirst = (a: string, b: string) => (a < b ? 1 : a > b ? -1 : 0);

/** Pure: pendientes and en curso first (priority, en curso before pendiente, newest Anotada,
 *  id), then hechas (newest Hecha, missing last, then newest Anotada, id). */
export function sortTasks(tasks: Task[]): Task[] {
	const pending = (t: Task) => t.estado !== 'hecha';
	const byId = (a: Task, b: Task) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
	const open = tasks
		.filter(pending)
		.sort(
			(a, b) =>
				PRIO_RANK[a.prioridad] - PRIO_RANK[b.prioridad] ||
				ESTADO_RANK[a.estado] - ESTADO_RANK[b.estado] ||
				newestFirst(date(a.anotada), date(b.anotada)) ||
				byId(a, b)
		);
	const done = tasks
		.filter((t) => !pending(t))
		.sort(
			(a, b) =>
				newestFirst(date(a.hecha), date(b.hecha)) ||
				newestFirst(date(a.anotada), date(b.anotada)) ||
				byId(a, b)
		);
	return [...open, ...done];
}
