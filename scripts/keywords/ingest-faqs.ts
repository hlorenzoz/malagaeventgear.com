#!/usr/bin/env bun
/**
 * ingest-faqs.ts: validates and merges one daily FAQ batch (`faq-batch.schema.ts`) into
 * `.agents/data/keywords.json` (`just faqs-ingest <lote>`). The agent copies raw Google
 * autocomplete phrases with their seed. This script decides what is a question (`isQuestion`),
 * what is relevant for MEG's market (`relevance.ts`) and what goes where: questions become faqs
 * with `sources['google-autocomplete']` (the seeds that produced them), every other phrase a
 * keyword. Autocomplete is never labeled People Also Ask.
 *
 * The merge itself is `ingestBatch` of `ingest-ubersuggest.ts`: the batch is adapted to the shape
 * it already knows, so faqs, keywords and the identity lock behave exactly like every other source.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { KeywordBatchSchema, type KeywordBatch } from './batch.schema';
import { FaqBatchSchema, type FaqBatch } from './faq-batch.schema';
import { ingestBatch } from './ingest-ubersuggest';
import { checkRelevance } from './relevance';
import { KeywordsFileSchema } from './schema';
import { keywordsPath } from '../paths';

const QUESTION_WORDS = new Set([
	'who',
	'what',
	'when',
	'where',
	'why',
	'how',
	'which',
	'can',
	'is',
	'are',
	'does',
	'do',
	'should',
	'will'
]);

/** Pure: a phrase is a question when its first word is a question word. */
export function isQuestion(phrase: string): boolean {
	const first = phrase.trim().toLowerCase().split(/\s+/)[0] ?? '';
	return QUESTION_WORDS.has(first);
}

/** Pure: the FAQ batch in the shape `ingestBatch` merges. Phrases the relevance filter rejects go
 *  to `discarded` with its reason, questions included. */
export function faqBatchToKeywordBatch(batch: FaqBatch, serviceAreas: readonly string[]): KeywordBatch {
	const keywords: KeywordBatch['keywords'] = [];
	const faqs: KeywordBatch['faqs'] = [];
	const discarded: KeywordBatch['discarded'] = [];
	for (const { seed, phrase } of batch.suggestions) {
		const rel = checkRelevance(phrase, serviceAreas);
		if (!rel.relevant) {
			discarded.push({ text: phrase, reason: rel.reason ?? 'not relevant' });
		} else if (isQuestion(phrase)) {
			faqs.push({ question: phrase, keyword: seed, source: 'google-autocomplete' });
		} else {
			keywords.push({ keyword: phrase, source: 'google-autocomplete' });
		}
	}
	return KeywordBatchSchema.parse({
		date: batch.date,
		run: { status: batch.run.status, reason: batch.run.reason },
		keywords,
		faqs,
		discarded
	});
}

if (import.meta.main) {
	const batchPath = process.argv[2];
	if (!batchPath) {
		console.error('Usage: bun scripts/keywords/ingest-faqs.ts <path-to-faq-batch.json>');
		process.exit(1);
	}
	const parsed = FaqBatchSchema.safeParse(JSON.parse(readFileSync(batchPath, 'utf8')));
	if (!parsed.success) {
		console.error(`[ingest-faqs] invalid batch ${batchPath}:`);
		console.error(parsed.error.format());
		process.exit(1);
	}
	const path = keywordsPath();
	const existing = existsSync(path)
		? KeywordsFileSchema.parse(JSON.parse(readFileSync(path, 'utf8')))
		: null;
	const { siteConfig } = await import('../../src/lib/data/site');
	const result = ingestBatch(
		faqBatchToKeywordBatch(parsed.data, siteConfig.serviceAreas),
		existing,
		siteConfig.serviceAreas,
		parsed.data.date
	);
	writeFileSync(path, `${JSON.stringify(result.file, null, 2)}\n`);
	console.log(
		`[ingest-faqs] ${parsed.data.date}: +${result.addedFaqs} faqs, +${result.addedKeywords} keywords, ${result.discarded} discarded`
	);
}
