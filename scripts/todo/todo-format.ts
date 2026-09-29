/**
 * todo-format.ts: the task format of TODO.txt, pure (no I/O). A task is a delimited block:
 *
 *   === TAREA #T0041 ===
 *   Estado / Prioridad / Título / Anotada / [Hecha] / Origen / [Nota]
 *   ---
 *   free description, verbatim
 *   === FIN #T0041 ===
 *
 * `parseTodo` also accepts the old style people and agents still append (a `-- <glyphs> <title>
 * (anotado YYYY-MM-DD)` line whose description runs until the next header) and loose text outside
 * any block. `resolveTasks` normalizes both into tasks, `renderTodo` writes the ordered file.
 * The description is never rewritten: only metadata is derived.
 */

export const ESTADOS = ['pendiente', 'en curso', 'bloqueada', 'hecha'] as const;
export const PRIORIDADES = ['alta', 'media', 'baja'] as const;
export type Estado = (typeof ESTADOS)[number];
export type Prioridad = (typeof PRIORIDADES)[number];

export interface Task {
	/** `#T0041`, or '' for a task that has none yet (see `assignIds`). */
	id: string;
	estado: Estado;
	prioridad: Prioridad;
	titulo: string;
	/** YYYY-MM-DD or `sin fecha`. */
	anotada: string;
	/** YYYY-MM-DD, only meaningful when `estado` is `hecha`. */
	hecha?: string;
	origen: string;
	nota?: string;
	/** Verbatim description lines (no leading or trailing blank lines). */
	descripcion: string[];
}

export interface LooseChunk {
	lines: string[];
	/** How many tasks were parsed before this chunk (keeps the original order). */
	before: number;
}

export interface ParsedTodo {
	header: string[];
	tasks: Task[];
	loose: LooseChunk[];
}

export const MANAGED_MARKER = '== OPORTUNIDADES DE CONTENIDO (agente content-strategist) ==';
export const NO_DATE = 'sin fecha';
export const DEFAULT_PRIORITY_NOTE = 'prioridad por defecto';

export const HEADER_LINES = [
	'# TODO.txt: lista de tareas del proyecto, ordenada por `just todo-organize`.',
	'# Cada tarea es un bloque delimitado, con estos campos en este orden:',
	'#   === TAREA #T0041 ===',
	'#   Estado: pendiente | en curso | bloqueada | hecha',
	'#   Prioridad: alta | media | baja',
	'#   Título: una línea',
	'#   Anotada: YYYY-MM-DD (o "sin fecha")',
	'#   Hecha: YYYY-MM-DD (solo si está hecha, opcional)',
	'#   Origen: usuario | migrada | content-strategist (plan YYYY-MM-DD, ítem N)',
	'#   Nota: opcional, una línea',
	'#   ---',
	'#   descripción libre, tal cual, en las líneas que hagan falta',
	'#   === FIN #T0041 ===',
	'# Para agregar una tarea sin id se puede escribir a la antigua: una línea',
	'# "-- ❌ Título (anotado YYYY-MM-DD)" y debajo la descripción. El organizador le pone',
	'# id, estado y prioridad. Las hechas van al final, las nuevas y sin terminar arriba.',
	'# Las tareas de content-strategist quedan "bloqueada" (sección BLOQUEADAS) mientras falte',
	'# traducir algún post publicado a los 12 idiomas, y vuelven solas a "pendiente" al terminar.'
];

const TAREA_RE = /^=== TAREA (#T\d{4}) ===\s*$/;
const FIN_RE = /^=== FIN (#T\d{4}) ===\s*$/;
const SECTION_RE = /^== (PENDIENTES|BLOQUEADAS|HECHAS) ==\s*$/;
const ANY_SECTION_RE = /^== .+ ==\s*$/;
const LEGACY_RE = /^-- (.*)$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const FIELD_RE = /^(Estado|Prioridad|Título|Anotada|Hecha|Origen|Nota): ?(.*)$/;

const isBlank = (l: string) => l.trim() === '';

function trimBlankEdges(lines: string[]): string[] {
	let s = 0;
	let e = lines.length;
	while (s < e && isBlank(lines[s])) s++;
	while (e > s && isBlank(lines[e - 1])) e--;
	return lines.slice(s, e);
}

const firstLineTitle = (lines: string[]) =>
	(lines.find((l) => !isBlank(l)) ?? '').trim().slice(0, 90);

/** Pure: a legacy `-- ...` header plus its description lines as a task. */
export function legacyToTask(headerText: string, rawDescription: string[], origen: string): Task {
	const descripcion = trimBlankEdges(rawDescription);
	const m = /^((?:[✅❌]\s*)*)(.*)$/su.exec(headerText)!;
	const glyphs = m[1].trim();
	let title = m[2].trim();

	let anotada = NO_DATE;
	let hechaDate: string | undefined;
	const paren = /\s*\(([^()]*)\)\s*$/.exec(title);
	if (paren && /anotado/i.test(paren[1])) {
		anotada = /\d{4}-\d{2}-\d{2}/.exec(paren[1])?.[0] ?? NO_DATE;
		hechaDate = /(?:HECHO|RESUELTO)\s+(\d{4}-\d{2}-\d{2})/i.exec(paren[1])?.[1];
		title = title.slice(0, paren.index).trim();
	}

	const ok = glyphs.includes('✅');
	const bad = glyphs.includes('❌');
	const estado: Estado = ok && !bad ? 'hecha' : 'pendiente';
	const notes: string[] = [];
	if (ok === bad) notes.push(`estado por confirmar (tenía "${glyphs}")`);
	if (!title) {
		title = firstLineTitle(descripcion);
		notes.push('título tomado de la primera línea');
	}
	if (estado !== 'hecha') notes.push(DEFAULT_PRIORITY_NOTE);

	const task: Task = {
		id: '',
		estado,
		prioridad: 'media',
		titulo: title,
		anotada,
		origen,
		descripcion
	};
	if (estado === 'hecha' && hechaDate) task.hecha = hechaDate;
	if (notes.length) task.nota = notes.join(', ');
	return task;
}

/** Pure: a chunk of text outside any block as a task to review. */
export function looseToTask(chunk: LooseChunk, origen: string): Task {
	return {
		id: '',
		estado: 'pendiente',
		prioridad: 'media',
		titulo: firstLineTitle(chunk.lines),
		anotada: NO_DATE,
		origen,
		nota: `texto sin estructura, revisar, ${DEFAULT_PRIORITY_NOTE}`,
		descripcion: trimBlankEdges(chunk.lines)
	};
}

function blockToTask(id: string, meta: string[], desc: string[]): Task {
	const f = new Map<string, string>();
	for (const line of meta) {
		if (isBlank(line)) continue;
		const m = FIELD_RE.exec(line);
		if (!m) throw new Error(`TODO.txt ${id}: línea de metadatos no reconocida: "${line}"`);
		f.set(m[1], m[2].trim());
	}
	const need = (k: string) => {
		const v = f.get(k);
		if (!v) throw new Error(`TODO.txt ${id}: falta el campo ${k}`);
		return v;
	};
	const estado = need('Estado') as Estado;
	if (!ESTADOS.includes(estado)) throw new Error(`TODO.txt ${id}: Estado inválido "${estado}"`);
	const prioridad = need('Prioridad') as Prioridad;
	if (!PRIORIDADES.includes(prioridad))
		throw new Error(`TODO.txt ${id}: Prioridad inválida "${prioridad}"`);
	const anotada = need('Anotada');
	if (anotada !== NO_DATE && !DATE_RE.test(anotada))
		throw new Error(`TODO.txt ${id}: Anotada inválida "${anotada}"`);
	const hecha = f.get('Hecha');
	if (hecha && !DATE_RE.test(hecha)) throw new Error(`TODO.txt ${id}: Hecha inválida "${hecha}"`);

	const task: Task = {
		id,
		estado,
		prioridad,
		titulo: need('Título'),
		anotada,
		origen: need('Origen'),
		descripcion: trimBlankEdges(desc)
	};
	if (hecha) task.hecha = hecha;
	const nota = f.get('Nota');
	if (nota) task.nota = nota;
	return task;
}

export function parseTodo(text: string): ParsedTodo {
	const lines = text.replace(/\r\n/g, '\n').split('\n');
	const header: string[] = [];
	const tasks: Task[] = [];
	const loose: LooseChunk[] = [];

	let legacy: { header: string; lines: string[] } | null = null;
	let chunk: string[] | null = null;
	let block: { id: string; phase: 'meta' | 'desc'; meta: string[]; desc: string[] } | null = null;
	let managed = false;
	let started = false;

	const flush = () => {
		if (legacy) tasks.push(legacyToTask(legacy.header, legacy.lines, 'usuario'));
		if (chunk) loose.push({ lines: chunk, before: tasks.length });
		legacy = null;
		chunk = null;
	};

	for (const line of lines) {
		if (block) {
			if (TAREA_RE.test(line)) throw new Error(`TODO.txt ${block.id}: bloque sin cerrar`);
			const fin = FIN_RE.exec(line);
			if (fin) {
				if (fin[1] !== block.id)
					throw new Error(`TODO.txt ${block.id}: cierra con ${fin[1]}, no con su propio id`);
				tasks.push(blockToTask(block.id, block.meta, block.desc));
				block = null;
			} else if (block.phase === 'meta') {
				if (line === '---') block.phase = 'desc';
				else block.meta.push(line);
			} else block.desc.push(line);
			continue;
		}

		if (!started && (isBlank(line) || line.startsWith('#'))) {
			if (line.startsWith('#')) header.push(line);
			continue;
		}
		started = true;

		const tarea = TAREA_RE.exec(line);
		if (tarea) {
			flush();
			managed = false;
			block = { id: tarea[1], phase: 'meta', meta: [], desc: [] };
			continue;
		}
		if (SECTION_RE.test(line)) {
			flush();
			managed = false;
			continue;
		}
		if (line.trimEnd() === MANAGED_MARKER) {
			flush();
			managed = true;
			continue;
		}
		if (managed) {
			if (!ANY_SECTION_RE.test(line)) continue;
			managed = false;
		}
		const lg = LEGACY_RE.exec(line);
		if (lg) {
			flush();
			legacy = { header: lg[1], lines: [] };
			continue;
		}
		if (legacy) {
			legacy.lines.push(line);
		} else if (isBlank(line)) {
			flush();
		} else {
			(chunk ??= []).push(line);
		}
	}
	if (block) throw new Error(`TODO.txt ${block.id}: bloque sin cerrar`);
	flush();

	const seen = new Set<string>();
	for (const t of tasks) {
		if (!t.id) continue;
		if (seen.has(t.id)) throw new Error(`TODO.txt: id duplicado ${t.id}`);
		seen.add(t.id);
	}
	return { header, tasks, loose };
}

/** Pure: every task in the original order (loose chunks turned into tasks). `origen` is used
 *  for legacy entries and loose text only, a task in the new format keeps its own. */
export function resolveTasks(parsed: ParsedTodo, origen: string): Task[] {
	const legacyOrigin = (t: Task): Task => (t.id ? t : { ...t, origen });
	const out: Task[] = [];
	let li = 0;
	parsed.tasks.forEach((t, i) => {
		while (li < parsed.loose.length && parsed.loose[li].before <= i) {
			out.push(looseToTask(parsed.loose[li++], origen));
		}
		out.push(legacyOrigin(t));
	});
	while (li < parsed.loose.length) out.push(looseToTask(parsed.loose[li++], origen));
	return out;
}

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

function renderBlock(t: Task): string[] {
	const out = [
		`=== TAREA ${t.id} ===`,
		`Estado: ${t.estado}`,
		`Prioridad: ${t.prioridad}`,
		`Título: ${t.titulo}`,
		`Anotada: ${t.anotada}`
	];
	if (t.estado === 'hecha' && t.hecha) out.push(`Hecha: ${t.hecha}`);
	out.push(`Origen: ${t.origen}`);
	if (t.nota) out.push(`Nota: ${t.nota}`);
	out.push('---', ...t.descripcion, `=== FIN ${t.id} ===`);
	return out;
}

/** Pure: the whole ordered file (ends with one newline). */
export function renderTodo(tasks: Task[]): string {
	const sorted = sortTasks(tasks);
	const section = (title: string, list: Task[]): string[] => {
		const out = [title];
		for (const t of list) out.push('', ...renderBlock(t));
		return out;
	};
	const blocked = sorted.filter((t) => t.estado === 'bloqueada');
	const lines = [
		...HEADER_LINES,
		'',
		...section(
			'== PENDIENTES ==',
			sorted.filter((t) => t.estado !== 'hecha' && t.estado !== 'bloqueada')
		),
		'',
		...(blocked.length ? [...section('== BLOQUEADAS ==', blocked), ''] : []),
		...section(
			'== HECHAS ==',
			sorted.filter((t) => t.estado === 'hecha')
		)
	];
	return lines.join('\n') + '\n';
}
