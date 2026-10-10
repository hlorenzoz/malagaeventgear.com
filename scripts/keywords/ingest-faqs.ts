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

/**
 * Pure: what is wrong with the `seeds` of a NEW batch (empty when it is fine). The rotation of
 * `faq-seeds.ts` depends on this field, so a batch that omits it, or fills it with something that
 * is not a keyword id, would hand out the same seeds again tomorrow with every step green. Only
 * an aborted run, which asked nothing, may have none. Not applied when `sync.ts` replays the
 * batches written before the field existed.
 */
export function seedProblems(batch: FaqBatch, knownIds: ReadonlySet<string>): string[] {
	const problems: string[] = [];
	if (batch.seeds.length === 0 && batch.run.status !== 'aborted')
		problems.push(
			'`seeds` is empty: list the id of every seed from `just faq-seeds` that was asked, also the ones with no question'
		);
	const unknown = batch.seeds.filter((id) => !knownIds.has(id));
	if (unknown.length)
		problems.push(
			`\`seeds\` must hold keyword ids (the \`id\` printed by \`just faq-seeds\`), not keyword text: ${unknown.join(', ')}`
		);
	const listed = new Set(batch.seeds);
	const unlisted = [...new Set(batch.suggestions.map((s) => s.seed))].filter(
		(id) => !listed.has(id)
	);
	if (unlisted.length)
		problems.push(`a suggestion names a seed that is not in \`seeds\`: ${unlisted.join(', ')}`);
	return problems;
}

/** Pure: the FAQ batch in the shape `ingestBatch` merges. Phrases the relevance filter rejects go
 *  to `discarded` with its reason, questions included. */
export function faqBatchToKeywordBatch(
	batch: FaqBatch,
	serviceAreas: readonly string[]
): KeywordBatch {
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
	const problems = seedProblems(parsed.data, new Set(existing?.keywords.map((k) => k.id) ?? []));
	if (problems.length) {
		console.error(`[ingest-faqs] invalid batch ${batchPath}:`);
		for (const p of problems) console.error(`  - ${p}`);
		process.exit(1);
	}
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
