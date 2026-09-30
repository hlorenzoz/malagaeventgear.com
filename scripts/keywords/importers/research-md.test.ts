/**
 * research-md.test.ts: unit tests for the keyword-research-conferences-2026-09-25.md importer
 * (plan, importers table row "research-md"). Fixtures are small excerpts of the REAL document
 * structure (cluster tables, the PAA table, the discarded table), not invented shapes.
 */
import { describe, it, expect } from 'vitest';
import {
	parseResearchClusters,
	parseWeakItems,
	parsePaaRows,
	parseDiscardedRows,
	researchMdToKeywords,
	researchMdToFaqs
} from './research-md';

const TODAY = '2026-09-29';

const CLUSTER_EXCERPT = `
### Cluster A: How to plan a congress / MICE event in Malaga

**Pillar: \`/blog/event-technology-service/\`** (existing pillar, currently 0 supporting posts)

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| how to organize a congress in malaga | informational | AC | angle | already planned | strong |
| congress malaga / fycma malaga congress center | local/navigational | AC | angle | NEW | medium |
| dmc malaga | commercial/navigational | AC | angle | NEW | needs business confirmation (do not imply MEG is a DMC) |

### Cluster C: Conference microphone and lectern equipment

**Pillar: \`/blog/audiovisual-equipment-rental-service/\`** (existing pillar, currently 1 supporting post)

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| lectern rental | commercial | AC | angle | already planned | strong, real inventory |
`;

const WEAK_EXCERPT = `
### Weak / low-evidence items (kept in TODO but deprioritized here)

\`hotel in house av vs independent av supplier\`, \`conference venue technical checklist\`,
\`sales kickoff event av\`, \`shareholder meeting av\`, \`company offsite av\`, \`simultaneous
interpretation for congresses in malaga\` all returned **zero or noise-only** autocomplete
suggestions.

## 3. Question keywords (PAA style) for existing-post FAQs

| Question | Evidence | Target post (already published) |
| :--- | :--- | :--- |
| Some other question that should never leak into weak items? | AC | \`some-other-post.svx\` |
`;

const PAA_EXCERPT = `
## 3. Question keywords (PAA style) for existing-post FAQs

| Question | Evidence | Target post (already published) |
| :--- | :--- | :--- |
| What AV equipment do you need for a conference? | AC | \`audio-visual-rental-for-conferences.svx\` |
| Why does a podium sometimes have two microphones? | PAA | \`headset-lavalier-microphone-rental.svx\` (nearest published mic post) |
`;

const DISCARDED_EXCERPT = `
## 4. Discarded keywords and why

| Keyword | Reason discarded |
| :--- | :--- |
| hybrid meeting / hybrid meeting equipment / hybrid meeting setup | Requires cameras and streaming. MEG has no cameras. |
| keynote speaker (bare term) | Autocomplete is dominated by definitional/translation queries. |
`;

describe('parseResearchClusters', () => {
	it('extracts each cluster with its pillar url and rows', () => {
		const clusters = parseResearchClusters(CLUSTER_EXCERPT);
		expect(clusters).toHaveLength(2);
		expect(clusters[0].pillarUrl).toBe('/blog/event-technology-service/');
		expect(clusters[0].rows).toHaveLength(3);
		expect(clusters[0].rows[0]).toEqual({
			keyword: 'how to organize a congress in malaga',
			fit: 'strong'
		});
		expect(clusters[1].pillarUrl).toBe('/blog/audiovisual-equipment-rental-service/');
	});
});

describe('parseWeakItems', () => {
	it('extracts every backtick quoted phrase from the weak/low evidence paragraph', () => {
		const items = parseWeakItems(WEAK_EXCERPT);
		expect(items).toEqual([
			'hotel in house av vs independent av supplier',
			'conference venue technical checklist',
			'sales kickoff event av',
			'shareholder meeting av',
			'company offsite av',
			'simultaneous interpretation for congresses in malaga'
		]);
	});
});

describe('parsePaaRows', () => {
	it('extracts each question with its target post slug', () => {
		const rows = parsePaaRows(PAA_EXCERPT);
		expect(rows).toEqual([
			{
				question: 'What AV equipment do you need for a conference?',
				targetSlug: 'audio-visual-rental-for-conferences'
			},
			{
				question: 'Why does a podium sometimes have two microphones?',
				targetSlug: 'headset-lavalier-microphone-rental'
			}
		]);
	});
});

describe('parseDiscardedRows', () => {
	it('extracts each discarded phrase with its reason', () => {
		const rows = parseDiscardedRows(DISCARDED_EXCERPT);
		expect(rows).toHaveLength(2);
		expect(rows[0]).toEqual({
			text: 'hybrid meeting / hybrid meeting equipment / hybrid meeting setup',
			reason: 'Requires cameras and streaming. MEG has no cameras.'
		});
	});
});

describe('researchMdToKeywords', () => {
	const clusters = parseResearchClusters(CLUSTER_EXCERPT);
	const weakItems = parseWeakItems(WEAK_EXCERPT);
	const discardedRows = parseDiscardedRows(DISCARDED_EXCERPT);

	it('splits a "/" separated Keyword cell into individual keyword entries', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		const congressMalaga = entries.find((e) => e.keyword === 'congress malaga');
		const fycma = entries.find((e) => e.keyword === 'fycma malaga congress center');
		expect(congressMalaga).toBeDefined();
		expect(fycma).toBeDefined();
	});

	it('marks a "strong" fit as planned', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		const entry = entries.find((e) => e.keyword === 'how to organize a congress in malaga');
		expect(entry?.status).toBe('planned');
	});

	it('marks "needs business confirmation" as idea', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		const entry = entries.find((e) => e.keyword === 'dmc malaga');
		expect(entry?.status).toBe('idea');
	});

	it('sets cluster from the pillar url, de-hyphenated', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		const entry = entries.find((e) => e.keyword === 'lectern rental');
		expect(entry?.cluster).toBe('audiovisual equipment rental service');
	});

	it('adds every weak/low evidence phrase as idea', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		expect(entries.filter((e) => weakItems.includes(e.keyword))).toHaveLength(6);
		expect(entries.find((e) => e.keyword === 'sales kickoff event av')?.status).toBe('idea');
	});

	it('adds every discarded phrase as rejected with its reason', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		const entry = entries.find((e) => e.keyword === 'keynote speaker (bare term)');
		expect(entry?.status).toBe('rejected');
		expect(entry?.reason).toMatch(/definitional\/translation/);
	});

	it('tags the source as research', () => {
		const entries = researchMdToKeywords(clusters, weakItems, discardedRows, TODAY);
		expect(entries[0].sources).toEqual({ research: { firstSeen: TODAY, lastSeen: TODAY } });
	});
});

describe('researchMdToFaqs', () => {
	const paaRows = parsePaaRows(PAA_EXCERPT);
	const postInfo = {
		'audio-visual-rental-for-conferences': {
			keywordId: 'audio-visual-rental-for-conferences',
			cluster: 'audio visual rental'
		}
	};

	it('produces an idea faq per PAA question, pointing at the target post keyword', () => {
		const faqs = researchMdToFaqs(paaRows, postInfo, TODAY);
		expect(faqs).toHaveLength(2);
		expect(faqs[0]).toMatchObject({
			question: 'What AV equipment do you need for a conference?',
			keywordId: 'audio-visual-rental-for-conferences',
			cluster: 'audio visual rental',
			url: null,
			status: 'idea',
			sources: { research: { firstSeen: TODAY, lastSeen: TODAY } }
		});
	});

	it('falls back gracefully when the target slug is not in postInfo', () => {
		const faqs = researchMdToFaqs(paaRows, {}, TODAY);
		expect(faqs[1].keywordId).toBe('headset-lavalier-microphone-rental');
		expect(faqs[1].cluster).toBe('unassigned');
	});
});
