#!/usr/bin/env bun
/**
 * todo.ts: read and change the task list without editing TODO.json by hand.
 *
 *   just todo-list [--estado E] [--prioridad P] [--tipo T] [--origen texto] [--texto texto]
 *   just todo-add --titulo "..." [--prioridad P] [--tipo T] [--desc "..."] [--desc-file ruta]
 *   just todo-set <#Txxxx> [--estado E] [--prioridad P] [--tipo T] [--add-nota "..."]
 *
 * `--file <ruta>` (before the subcommand arguments) points to another file. The operations are
 * pure and tested (`todo-ops.ts`). A write is atomic and only happens when the file did not change
 * since it was read (another session may be editing it): it re-reads and retries once, then
 * exits 1 without writing. A file that does not validate is never written.
 */

import { readFileSync, statSync } from 'node:fs';
import { localToday, writeIfUnchanged } from './organize';
import { todoPath } from '../paths';
import { addTask, filterTasks, formatTable, parseAddArgs, parseFilterArgs, parseSetArgs, setTask } from './todo-ops';
import { parseTodoJson, renderTodoJson } from './todo-json';
import type { Task } from './todo-format';

/** Pure: the `--file <ruta>` pair removed from the arguments, and its value. */
export function takeFileFlag(args: string[]): { file: string | undefined; rest: string[] } {
	const i = args.indexOf('--file');
	if (i < 0) return { file: undefined, rest: args };
	return { file: args[i + 1], rest: [...args.slice(0, i), ...args.slice(i + 2)] };
}

function change(file: string, edit: (tasks: Task[]) => Task[]): number {
	for (let attempt = 0; attempt < 2; attempt++) {
		const mtime = statSync(file).mtimeMs;
		const { tasks } = parseTodoJson(readFileSync(file, 'utf8'));
		const next = edit(tasks);
		if (writeIfUnchanged(file, renderTodoJson(next, localToday()), mtime)) return 0;
		console.error('[todo] TODO.json cambió mientras se editaba, se reintenta');
	}
	console.error('[todo] TODO.json sigue cambiando, no se escribió nada');
	return 1;
}

function run(argv: string[]): number {
	const [command, ...afterCommand] = argv;
	const { file: fileFlag, rest } = takeFileFlag(afterCommand);
	const file = fileFlag ?? todoPath();
	try {
		if (command === 'list') {
			const { tasks } = parseTodoJson(readFileSync(file, 'utf8'));
			console.log(formatTable(filterTasks(tasks, parseFilterArgs(rest))));
			return 0;
		}
		if (command === 'add') {
			const input = parseAddArgs(rest, (p) => readFileSync(p, 'utf8'));
			let id = '';
			const code = change(file, (tasks) => {
				const out = addTask(tasks, input, localToday());
				id = out.find((t) => !tasks.some((o) => o.id === t.id))!.id;
				return out;
			});
			if (code === 0) console.log(`[todo] tarea ${id} agregada: ${input.titulo}`);
			return code;
		}
		if (command === 'set') {
			const { id, patch } = parseSetArgs(rest);
			const code = change(file, (tasks) => setTask(tasks, id, patch, localToday()));
			if (code === 0) console.log(`[todo] ${id} actualizada`);
			return code;
		}
		console.error('uso: todo.ts (list | add | set) [argumentos], ver el encabezado del archivo');
		return 2;
	} catch (e) {
		console.error(`[todo] ${(e as Error).message}`);
		return 1;
	}
}

if (import.meta.main) process.exit(run(process.argv.slice(2)));
