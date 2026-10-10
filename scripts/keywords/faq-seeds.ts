#!/usr/bin/env bun
/**
 * faq-seeds.ts: the keywords the faq-researcher asks Google autocomplete about today
 * (`just faq-seeds [n]`, default 10). Pool: `published` or `planned` keywords, never the `news` or
 * `standalone` clusters (their keyword is a headline, not a search). Never consulted first, then
 * the least recently consulted (from the `seeds` of the committed FAQ batches, whether or not a
 * seed returned a question), so 10 a day walk the catalog.
 * Prints JSON: the agent never opens the 1.7 MB keywords.json.
 */

import { readFileSync } from 'node:fs';
import { keywordsPath } from '../paths';
import { readFaqBatches } from './faq-batches';
import type { FaqBatch } from './faq-batch.schema';
import { KeywordsFileSchema, type KeywordEntry } from './schema';

const DEFAULT_N = 10;
const SEEDABLE = new Set<KeywordEntry['status']>(['published', 'planned']);
const UNSEEDABLE_CLUSTERS = new Set(['news', 'standalone']);

/** Pure: up to `n` seeds, least recently consulted first. */
export function pickFaqSeeds(
	pool: KeywordEntry[],
	history: FaqBatch[],
	n: number = DEFAULT_N
): KeywordEntry[] {
	const lastConsulted = new Map<string, string>();
	// `seeds` lists every seed of the run. `suggestions` is read too for the batches written
	// before that field existed, which only left a trace of the seeds that returned a question.
	for (const b of history) {
		for (const seed of [...b.seeds, ...b.suggestions.map((s) => s.seed)]) {
			const prev = lastConsulted.get(seed);
			if (!prev || b.date > prev) lastConsulted.set(seed, b.date);
		}
	}
	return pool
		.filter((k) => SEEDABLE.has(k.status) && !UNSEEDABLE_CLUSTERS.has(k.cluster))
		.sort((a, b) => {
			const da = lastConsulted.get(a.id);
			const db = lastConsulted.get(b.id);
			if (!da && !db) return a.id.localeCompare(b.id);
			if (!da) return -1;
			if (!db) return 1;
			return da.localeCompare(db) || a.id.localeCompare(b.id);
		})
		.slice(0, n);
}

if (import.meta.main) {
	const n = Number(process.argv[2]) || DEFAULT_N;
	const file = KeywordsFileSchema.parse(JSON.parse(readFileSync(keywordsPath(), 'utf8')));
	const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
	const seeds = pickFaqSeeds([...file.keywords], readFaqBatches(), n);
	console.log(
		JSON.stringify({ today, seeds: seeds.map((s) => ({ id: s.id, keyword: s.keyword })) }, null, 2)
	);
}
