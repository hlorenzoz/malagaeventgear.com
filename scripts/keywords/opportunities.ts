#!/usr/bin/env bun
/**
 * opportunities.ts: the content strategist's daily input. Prints, as compact JSON, today's best
 * content candidates so the agent never opens the ~2.5 MB `keywords.json`.
 *
 * Usage: `bun scripts/keywords/opportunities.ts [--limit N]` (default 20), also
 * `just content-candidates [n]`.
 *
 * A candidate is a keyword still `idea` that no plan has looked at yet (no `content-plan`
 * source). Avalanche (POP): the traffic tier of the latest GSC export is computed here, each
 * candidate gets its monthly `volume` and an `avalancheFit`. The tier only ORDERS the work, it
 * never filters it: keywords ABOVE the tier are listed too, as the last group (counted in
 * `totals.aboveTier`), because every relevant keyword ends up as content sooner or later.
 * Ranking: fit (in-tier, below, unknown, above), then `opportunity` (high, medium, low, null), GSC impressions, Google
 * Ads average monthly searches, Ubersuggest volume, then id for a stable order. Only measured
 * numbers are shown: a keyword with none says "no measured data", never a guess. The output also
 * carries today's `newPostQuota` (`new-post-quota.ts`): how many new posts the plan may propose.
 */

import { readFileSync } from 'node:fs';
import { KeywordsFileSchema, type KeywordEntry, type KeywordsFile, type Sources } from './schema';
import {
	avalancheFit,
	readTrafficTier,
	type AvalancheFit,
	type Tier,
	type TierReport
} from './traffic-tier';
import { newPostQuota, readTranslationBacklog } from './new-post-quota';
import { keywordsPath } from '../paths';

const DEFAULT_LIMIT = 20;
const NEW_FAQS_CAP = 10;

const FIT_RANK: Record<AvalancheFit, number> = { 'in-tier': 3, below: 2, unknown: 1, above: 0 };

/** Pure: monthly volume of a keyword and the source it came from (ubersuggest first). */
export function volumeOf(sources: Sources): {
	volume: number | null;
	source: 'ubersuggest' | 'google-ads' | null;
} {
	const uber = sources.ubersuggest?.stats?.volume;
	if (uber != null) return { volume: uber, source: 'ubersuggest' };
	const ads = sources['google-ads']?.stats?.avgMonthlySearches;
	if (ads != null) return { volume: ads, source: 'google-ads' };
	return { volume: null, source: null };
}

function fitOf(k: KeywordEntry, tier: Tier | null): AvalancheFit {
	return tier ? avalancheFit(volumeOf(k.sources).volume, tier) : 'unknown';
}

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

function compareKeywords(a: KeywordEntry, b: KeywordEntry, tier: Tier | null = null): number {
	const x = signalOf(a);
	const y = signalOf(b);
	return (
		FIT_RANK[fitOf(b, tier)] - FIT_RANK[fitOf(a, tier)] ||
		y.opportunity - x.opportunity ||
		y.gscImpressions - x.gscImpressions ||
		y.adsVolume - x.adsVolume ||
		y.uberVolume - x.uberVolume ||
		a.id.localeCompare(b.id)
	);
}

/** Pure: one line with every measured number, source by source. */
export function formatEvidence(
	sources: Sources,
	fit: AvalancheFit = 'unknown',
	tierLevel: number | null = null
): string {
	const parts: string[] = [];
	const fitNote =
		fit !== 'unknown' && tierLevel != null
			? ` (${fit === 'in-tier' ? 'in' : fit} tier ${tierLevel})`
			: '';
	const usedSource = volumeOf(sources).source;
	const ads = sources['google-ads']?.stats?.avgMonthlySearches;
	if (ads != null) parts.push(`google-ads ${ads}/mo${usedSource === 'google-ads' ? fitNote : ''}`);
	const gsc = sources['google-search-console']?.stats;
	if (gsc) parts.push(`gsc pos ${gsc.position} ${gsc.impressions} impr`);
	const uber = sources.ubersuggest?.stats;
	if (uber && (uber.volume != null || uber.difficulty != null)) {
		const bits = [
			uber.volume != null ? `vol ${uber.volume}` : null,
			uber.difficulty != null ? `diff ${uber.difficulty}` : null
		].filter(Boolean);
		parts.push(`ubersuggest ${bits.join(' ')}${usedSource === 'ubersuggest' ? fitNote : ''}`);
	}
	return parts.length ? parts.join(', ') : 'no measured data';
}

export interface Candidate {
	id: string;
	keyword: string;
	cluster: string;
	opportunity: KeywordEntry['opportunity'];
	volume: number | null;
	volumeSource: 'ubersuggest' | 'google-ads' | null;
	avalancheFit: AvalancheFit;
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
	tier: (Tier & Partial<TierReport>) | null;
	tierError?: string;
	candidates: Candidate[];
	newFaqs: NewFaq[];
	totals: { candidates: number; returned: number; newFaqs: number; aboveTier: number };
}

/** Pure ranking over an already validated file. */
export function buildOpportunities(
	file: KeywordsFile,
	limit: number = DEFAULT_LIMIT,
	tier: (Tier & Partial<TierReport>) | null = null,
	tierError?: string
): OpportunitiesOutput {
	const all = file.keywords.filter((k) => k.status === 'idea' && !k.sources['content-plan']);
	const unplanned = [...all].sort((a, b) => compareKeywords(a, b, tier));
	const aboveTier = unplanned.filter((k) => fitOf(k, tier) === 'above').length;
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

	const candidates: Candidate[] = top.map((k) => {
		const { volume, source } = volumeOf(k.sources);
		const fit = fitOf(k, tier);
		return {
			id: k.id,
			keyword: k.keyword,
			cluster: k.cluster,
			opportunity: k.opportunity,
			volume,
			volumeSource: source,
			avalancheFit: fit,
			evidence: formatEvidence(k.sources, fit, tier?.level ?? null),
			faqs: (faqsByKeyword.get(k.id) ?? []).map((f) => f.question),
			aiPrompts: (promptsByKeyword.get(k.id) ?? []).map((p) => p.prompt)
		};
	});

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
		tier,
		...(tierError ? { tierError } : {}),
		candidates,
		newFaqs: pendingFaqs
			.slice(0, NEW_FAQS_CAP)
			.map((f) => ({ id: f.id, question: f.question, keywordId: f.keywordId, cluster: f.cluster })),
		totals: {
			candidates: unplanned.length,
			returned: candidates.length,
			newFaqs: pendingFaqs.length,
			aboveTier
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
	let tier: Awaited<ReturnType<typeof readTrafficTier>> | null = null;
	let tierError: string | undefined;
	try {
		tier = await readTrafficTier();
	} catch (e) {
		tierError = e instanceof Error ? e.message : String(e);
	}
	const file = KeywordsFileSchema.parse(
		JSON.parse(readFileSync(keywordsPath(), 'utf8'))
	);
	const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' });
	const backlog = readTranslationBacklog();
	console.log(
		JSON.stringify({
			...buildOpportunities(file, parseLimit(process.argv.slice(2)), tier, tierError),
			newPostQuota: { ...newPostQuota(today, backlog), backlog }
		})
	);
}
