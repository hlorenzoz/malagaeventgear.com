#!/usr/bin/env bun
/**
 * opportunities.ts: the content strategist's daily input. Prints, as compact JSON, today's best
 * content candidates so the agent never opens the ~2.5 MB `keywords.json`.
 *
 * Usage: `bun scripts/keywords/opportunities.ts [--limit N]` (default 20), also
 * `just content-candidates [n]`.
 *
 * A candidate is a keyword still `idea` that no plan has looked at yet (no `content-plan`
 * source). Ranking, in order: `opportunity` (high, medium, low, null), GSC impressions, Google
 * Ads average monthly searches, Ubersuggest volume, then id for a stable order. Only measured
 * numbers are shown: a keyword with none says "no measured data", never a guess.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { KeywordsFileSchema, type KeywordEntry, type KeywordsFile, type Sources } from './schema';

const DEFAULT_LIMIT = 20;
const NEW_FAQS_CAP = 10;

const OPPORTUNITY_RANK = { high: 3, medium: 2, low: 1 } as const;

interface Signal {
	opportunity: number;
	gscImpressions: number;
	adsVolume: number;
	uberVolume: number;
}

function signalOf(k: KeywordEntry): Signal {
	return {
		opportunity: k.opportunity ? OPPORTUNITY_RANK[k.opportunity] : 0,
		gscImpressions: k.sources['google-search-console']?.stats?.impressions ?? 0,
		adsVolume: k.sources['google-ads']?.stats?.avgMonthlySearches ?? 0,
		uberVolume: k.sources.ubersuggest?.stats?.volume ?? 0
	};
}

function compareKeywords(a: KeywordEntry, b: KeywordEntry): number {
	const x = signalOf(a);
	const y = signalOf(b);
	return (
		y.opportunity - x.opportunity ||
		y.gscImpressions - x.gscImpressions ||
		y.adsVolume - x.adsVolume ||
		y.uberVolume - x.uberVolume ||
		a.id.localeCompare(b.id)
	);
}

/** Pure: one line with every measured number, source by source. */
export function formatEvidence(sources: Sources): string {
	const parts: string[] = [];
	const ads = sources['google-ads']?.stats?.avgMonthlySearches;
	if (ads != null) parts.push(`google-ads ${ads}/mo`);
	const gsc = sources['google-search-console']?.stats;
	if (gsc) parts.push(`gsc pos ${gsc.position} ${gsc.impressions} impr`);
	const uber = sources.ubersuggest?.stats;
	if (uber && (uber.volume != null || uber.difficulty != null)) {
		const bits = [
			uber.volume != null ? `vol ${uber.volume}` : null,
			uber.difficulty != null ? `diff ${uber.difficulty}` : null
		].filter(Boolean);
		parts.push(`ubersuggest ${bits.join(' ')}`);
	}
	return parts.length ? parts.join(', ') : 'no measured data';
}

export interface Candidate {
	id: string;
	keyword: string;
	cluster: string;
	opportunity: KeywordEntry['opportunity'];
	evidence: string;
	faqs: string[];
	aiPrompts: string[];
}

export interface NewFaq {
	id: string;
	question: string;
	keywordId: string;
	cluster: string;
}

export interface OpportunitiesOutput {
	keywordsUpdated: string;
	candidates: Candidate[];
	newFaqs: NewFaq[];
	totals: { candidates: number; returned: number; newFaqs: number };
}

/** Pure ranking over an already validated file. */
export function buildOpportunities(
	file: KeywordsFile,
	limit: number = DEFAULT_LIMIT
): OpportunitiesOutput {
	const unplanned = file.keywords
		.filter((k) => k.status === 'idea' && !k.sources['content-plan'])
		.sort(compareKeywords);
	const top = unplanned.slice(0, limit);
	const topIds = new Set(top.map((k) => k.id));

	const byKeyword = <T extends { keywordId: string; status: string }>(items: T[]) => {
		const map = new Map<string, T[]>();
		for (const item of items) {
			if (item.status !== 'idea') continue;
			(map.get(item.keywordId) ?? map.set(item.keywordId, []).get(item.keywordId)!).push(item);
		}
		return map;
	};
	const faqsByKeyword = byKeyword(file.faqs);
	const promptsByKeyword = byKeyword(file.aiPrompts);

	const candidates: Candidate[] = top.map((k) => ({
		id: k.id,
		keyword: k.keyword,
		cluster: k.cluster,
		opportunity: k.opportunity,
		evidence: formatEvidence(k.sources),
		faqs: (faqsByKeyword.get(k.id) ?? []).map((f) => f.question),
		aiPrompts: (promptsByKeyword.get(k.id) ?? []).map((p) => p.prompt)
	}));

	const keywordById = new Map(file.keywords.map((k) => [k.id, k]));
	const pendingFaqs = file.faqs
		.filter((f) => f.status === 'idea' && !topIds.has(f.keywordId))
		.filter((f) => !keywordById.get(f.keywordId)?.sources['content-plan'])
		.sort((a, b) => {
			const ka = keywordById.get(a.keywordId);
			const kb = keywordById.get(b.keywordId);
			return ka && kb
				? compareKeywords(ka, kb) || a.id.localeCompare(b.id)
				: a.id.localeCompare(b.id);
		});

	return {
		keywordsUpdated: file.updated,
		candidates,
		newFaqs: pendingFaqs
			.slice(0, NEW_FAQS_CAP)
			.map((f) => ({ id: f.id, question: f.question, keywordId: f.keywordId, cluster: f.cluster })),
		totals: {
			candidates: unplanned.length,
			returned: candidates.length,
			newFaqs: pendingFaqs.length
		}
	};
}

function parseLimit(argv: string[]): number {
	const i = argv.indexOf('--limit');
	const raw = i >= 0 ? argv[i + 1] : argv.find((a) => /^\d+$/.test(a));
	const n = Number(raw);
	return Number.isInteger(n) && n > 0 ? n : DEFAULT_LIMIT;
}

if (import.meta.main) {
	const file = KeywordsFileSchema.parse(
		JSON.parse(readFileSync(join(process.cwd(), 'keywords.json'), 'utf8'))
	);
	console.log(JSON.stringify(buildOpportunities(file, parseLimit(process.argv.slice(2)))));
}
