/**
 * migrate-faqs.ts: one-shot, pure migration of the FAQ shape (2026-09-30), from a flat `source` and
 * `firstSeen` plus a source-prefixed id, to a `sources` record and the normalized question as id.
 * `sync.ts` applies it to the existing keywords.json instead of rebuilding from scratch, because a
 * rebuild drops the keywords that only live in the current file (ideas from an older GSC export).
 * Safe to delete once every checkout has been migrated.
 */

import { mergeFaq } from './merge';
import { normalizeId } from './normalize';
import type { FaqEntry, FaqSources } from './schema';

interface LegacyFaq {
	id: string;
	question: string;
	keywordId: string;
	cluster: string;
	url: string | null;
	status: FaqEntry['status'];
	reason: string | null;
	source: string;
	firstSeen: string;
}

function sourcesOf(f: LegacyFaq): FaqSources {
	const base = { firstSeen: f.firstSeen, lastSeen: f.firstSeen };
	switch (f.source) {
		case 'post':
			return { post: { ...base, urls: f.url ? [f.url] : [] } };
		case 'site-faq':
			return { 'site-faq': base };
		case 'research-paa':
			return { research: base };
		default:
			return { 'google-autocomplete': { ...base, seeds: [f.keywordId] } };
	}
}

/** Pure: the file with every legacy faq converted, or the same object when none is legacy. */
export function migrateLegacyFaqs<T extends { faqs?: unknown }>(file: T): T {
	const faqs = file.faqs;
	if (!Array.isArray(faqs) || !faqs.some((f) => f && typeof f === 'object' && 'source' in f)) {
		return file;
	}
	const byId = new Map<string, FaqEntry>();
	for (const raw of faqs as LegacyFaq[]) {
		const id = normalizeId(raw.question);
		const entry: FaqEntry = {
			id,
			question: raw.question,
			keywordId: raw.keywordId,
			cluster: raw.cluster,
			url: raw.url,
			status: raw.status,
			reason: raw.reason,
			sources: sourcesOf(raw)
		};
		byId.set(id, mergeFaq(byId.get(id), entry));
	}
	return { ...file, faqs: [...byId.values()] };
}
