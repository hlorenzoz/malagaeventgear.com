#!/usr/bin/env bun
/**
 * migrate.ts: one time conversion of the old style TODO.txt into task blocks (`todo-format.ts`).
 * Ids go T0001.. in the original order and Origen is `migrada`. The old managed section
 * `== OPORTUNIDADES DE CONTENIDO ==` is not migrated as text: its tasks are regenerated from the
 * committed plans. Same pipeline as `organize.ts`.
 *
 * Usage: `bun scripts/todo/migrate.ts (--out <path> | --write) [--file <path>] [--keywords <path>]`
 *   --out    write the result to another file (TODO.txt is never touched)
 *   --write  overwrite TODO.txt (only when it did not change while migrating)
 *
 * Nothing may be lost: every non-empty line of the original (except legacy `-- ` headers and the
 * managed section) must be in the output, in order inside its task, otherwise it exits 1.
 */

import { readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { readCommittedPlans } from '../keywords/importers/content-plan';
import { keywordsPath, todoPath } from '../paths';
import {
	localToday,
	missingLegacyLines,
	organizeText,
	originKind,
	readKeywordStatuses,
	tally,
	verifyNoLoss,
	writeIfUnchanged
} from './organize';

function flag(argv: string[], name: string): string | undefined {
	const i = argv.indexOf(name);
	return i >= 0 ? argv[i + 1] : undefined;
}

function run(argv: string[]): number {
	const file = flag(argv, '--file') ?? todoPath();
	const out = flag(argv, '--out');
	if (!out && !argv.includes('--write')) {
		console.error('usage: migrate.ts (--out <path> | --write) [--file <path>] [--keywords <path>]');
		return 2;
	}
	const mtime = statSync(file).mtimeMs;
	const original = readFileSync(file, 'utf8');
	const result = organizeText(original, {
		plans: readCommittedPlans(),
		keywords: readKeywordStatuses(flag(argv, '--keywords') ?? keywordsPath()),
		today: localToday(),
		origen: 'migrada'
	});

	const lost = [
		...missingLegacyLines(original, result.output).map((l) => `línea perdida: "${l}"`),
		...verifyNoLoss(result.inputTasks, result.output)
	];
	if (lost.length > 0) {
		console.error(`[todo-migrate] se perdería contenido, no se escribe nada:\n${lost.join('\n')}`);
		return 1;
	}

	if (out) {
		const tmp = `${out}.tmp`;
		writeFileSync(tmp, result.output, 'utf8');
		renameSync(tmp, out);
	} else if (!writeIfUnchanged(file, result.output, mtime)) {
		console.error('[todo-migrate] TODO.txt cambió mientras se migraba, no se escribió nada');
		return 1;
	}

	console.log(`[todo-migrate] ${out ?? file} escrito. Sin pérdida: cada línea del original está.`);
	console.log(`tareas: ${result.tasks.length}`);
	console.log(`por estado: ${tally(result.tasks, (t) => t.estado)}`);
	console.log(`por origen: ${tally(result.tasks, originKind)}`);
	const noted = result.tasks.filter((t) => t.nota);
	console.log(`tareas con Nota (${noted.length}):`);
	for (const t of noted) console.log(`${t.id} [${t.estado}] ${t.titulo} => ${t.nota}`);
	return 0;
}

process.exit(run(process.argv.slice(2)));
