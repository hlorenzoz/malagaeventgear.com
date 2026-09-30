#!/usr/bin/env bun
/**
 * faqs-query.ts: `just faqs [--keyword <id>] [--status idea] [--source google-autocomplete]
 * [--since YYYY-MM-DD]`. Prints the matching FAQs of keywords.json as JSON, so nobody opens the
 * 1.7 MB file to look for a question. `--since` matches any source seen on or after the date.
 */

import { readFileSync } from 'node:fs';
import { keywordsPath } from '../paths';
import { ContentStatusSchema, FAQ_SOURCE_KEYS, KeywordsFileSchema, type FaqEntry } from './schema';

export interface FaqFilter {
	keyword?: string;
	status?: FaqEntry['status'];
	source?: (typeof FAQ_SOURCE_KEYS)[number];
	since?: string;
}

/** Pure: the faqs that match every filter, in the order of the file. */
export function filterFaqs(faqs: FaqEntry[], f: FaqFilter): FaqEntry[] {
	return faqs.filter((q) => {
		const seen = Object.values(q.sources) as { lastSeen: string }[];
		return (
			(!f.keyword || q.keywordId === f.keyword) &&
			(!f.status || q.status === f.status) &&
			(!f.source || f.source in q.sources) &&
			(!f.since || seen.some((s) => s.lastSeen >= f.since!))
		);
	});
}

/** Pure: the flags as a filter. Throws with the valid values on a bad one. */
export function parseFaqFilterArgs(argv: string[]): FaqFilter {
	const f: FaqFilter = {};
	for (let i = 0; i < argv.length; i += 2) {
		const flag = argv[i];
		const value = argv[i + 1];
		if (flag !== '--keyword' && flag !== '--status' && flag !== '--source' && flag !== '--since') {
			throw new Error(`flag desconocido ${flag}`);
		}
		if (value === undefined || value.startsWith('--')) throw new Error(`${flag} requiere un valor`);
		if (flag === '--keyword') f.keyword = value;
		else if (flag === '--status') {
			const ok = ContentStatusSchema.options as readonly string[];
			if (!ok.includes(value)) throw new Error(`--status: "${value}" no es válido. Válidos: ${ok.join(', ')}`);
			f.status = value as FaqEntry['status'];
		} else if (flag === '--source') {
			if (!(FAQ_SOURCE_KEYS as readonly string[]).includes(value)) {
				throw new Error(`--source: "${value}" no es válido. Válidos: ${FAQ_SOURCE_KEYS.join(', ')}`);
			}
			f.source = value as FaqFilter['source'];
		} else {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('--since debe ser YYYY-MM-DD');
			f.since = value;
		}
	}
	return f;
}

if (import.meta.main) {
	try {
		const filter = parseFaqFilterArgs(process.argv.slice(2));
		const file = KeywordsFileSchema.parse(JSON.parse(readFileSync(keywordsPath(), 'utf8')));
		const out = filterFaqs(file.faqs, filter).map((q) => ({
			id: q.id,
			question: q.question,
			keywordId: q.keywordId,
			cluster: q.cluster,
			status: q.status,
			url: q.url,
			sources: q.sources
		}));
		console.log(JSON.stringify(out, null, 2));
	} catch (e) {
		console.error(`[faqs] ${(e as Error).message}`);
		process.exit(1);
	}
}
