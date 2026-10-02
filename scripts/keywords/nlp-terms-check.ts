#!/usr/bin/env bun
/**
 * nlp-terms-check.ts: validates a serp-term-researcher file and prints the compact summary the
 * todo-implementer hands to post-writer (`just nlp-terms-check <file>`). The orchestrator trusts
 * this output, never the researcher's own report: the path, the schema and the match between the
 * file name and the content are all checked here. Exit 1 with the errors on stderr when invalid.
 */

import { readFileSync } from 'node:fs';
import { isAbsolute, relative } from 'node:path';
import { NlpTermsFileSchema, type NlpTerm } from './nlp-terms.schema';

const PATH_RE = /^\.agents\/context\/keywords\/nlp-terms\/(\d{4}-\d{2}-\d{2})-(T\d{4})\.json$/;

const KIND_ORDER: Record<NlpTerm['kind'], number> = { entity: 0, related: 1, question: 2 };

export interface NlpTermsSummary {
	taskId: string;
	slug: string;
	searchTerm: string;
	status: 'ok' | 'partial' | 'failed';
	reason?: string;
	localized: boolean;
	sources: string[];
	terms: Pick<NlpTerm, 'term' | 'kind' | 'seenIn'>[];
}

export type NlpTermsCheck =
	| { ok: true; summary: NlpTermsSummary }
	| { ok: false; errors: string[] };

/** Pure: is this the repo relative path of a dated task file under `nlp-terms/`. */
export function isNlpTermsPath(path: string): boolean {
	return PATH_RE.test(path);
}

/** Pure: validates the raw file content against the schema and against its own file name. */
export function checkNlpTermsFile(path: string, raw: string): NlpTermsCheck {
	const named = PATH_RE.exec(path);
	if (!named) {
		return {
			ok: false,
			errors: [`path: "${path}" is not .agents/context/keywords/nlp-terms/YYYY-MM-DD-T####.json`]
		};
	}

	let json: unknown;
	try {
		json = JSON.parse(raw);
	} catch (e) {
		return { ok: false, errors: [`JSON: ${(e as Error).message}`] };
	}

	const parsed = NlpTermsFileSchema.safeParse(json);
	if (!parsed.success) {
		return {
			ok: false,
			errors: parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
		};
	}

	const f = parsed.data;
	const errors: string[] = [];
	if (f.date !== named[1]) errors.push(`date: the file name says ${named[1]}, the content says ${f.date}`);
	if (f.taskId !== `#${named[2]}`) {
		errors.push(`taskId: the file name says #${named[2]}, the content says ${f.taskId}`);
	}
	if (errors.length > 0) return { ok: false, errors };

	const terms = f.terms
		.map(({ term, kind, seenIn }) => ({ term, kind, seenIn }))
		.sort(
			(a, b) =>
				b.seenIn - a.seenIn || KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.term.localeCompare(b.term)
		);

	return {
		ok: true,
		summary: {
			taskId: f.taskId,
			slug: f.slug,
			searchTerm: f.searchTerm,
			status: f.status,
			...(f.reason ? { reason: f.reason } : {}),
			localized: f.serp.localized,
			sources: f.serp.results.map((r) => r.url),
			terms
		}
	};
}

if (import.meta.main) {
	const arg = process.argv[2];
	if (!arg) {
		console.error('usage: just nlp-terms-check .agents/context/keywords/nlp-terms/YYYY-MM-DD-T####.json');
		process.exit(2);
	}
	const path = isAbsolute(arg) ? relative(process.cwd(), arg) : arg;
	let raw: string;
	try {
		raw = readFileSync(path, 'utf8');
	} catch (e) {
		console.error(`nlp-terms-check: cannot read ${path}: ${(e as Error).message}`);
		process.exit(1);
	}
	const result = checkNlpTermsFile(path, raw);
	if (!result.ok) {
		console.error(`nlp-terms-check: ${path} is invalid`);
		for (const error of result.errors) console.error(`  - ${error}`);
		process.exit(1);
	}
	console.log(JSON.stringify(result.summary, null, 2));
}
