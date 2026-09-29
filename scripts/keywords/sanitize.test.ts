/**
 * sanitize.test.ts: final ASCII-punctuation pass over a whole keywords.json (CLAUDE.md rule
 * 12), applied once in sync.ts/ingest-ubersuggest.ts right before writing, so no importer has to
 * remember to call toAscii() on every free-text field it touches.
 */
import { describe, it, expect } from 'vitest';
import { sanitizeKeywordsFile } from './sanitize';
import type { KeywordsFile } from './schema';

function file(overrides: Partial<KeywordsFile> = {}): KeywordsFile {
	return {
		version: 1,
		updated: '2026-09-29',
		meta: { lastWeeklyRun: null, lastMonthlyRun: null },
		keywords: [],
		faqs: [],
		aiPrompts: [],
		...overrides
	};
}

describe('sanitizeKeywordsFile', () => {
	it('ASCII-fies keyword, topic, reason and notes on every keyword entry', () => {
		const input = file({
			keywords: [
				{
					id: 'x',
					keyword: 'what’s included',
					locale: 'en',
					cluster: 'c',
					topic: 'audio—visual',
					intent: null,
					url: null,
					status: 'rejected',
					reason: '“no fit”',
					metrics: {
						volume: null,
						difficulty: null,
						cpc: null,
						gsc: null,
						ubersuggest: null
					},
					research: null,
					opportunity: null,
					opportunityReason: null,
					sources: [],
					firstSeen: '2026-09-29',
					lastResearched: null,
					notes: 'note…'
				}
			]
		});
		const clean = sanitizeKeywordsFile(input);
		expect(clean.keywords[0].keyword).toBe("what's included");
		expect(clean.keywords[0].topic).toBe('audio-visual');
		expect(clean.keywords[0].reason).toBe('"no fit"');
		expect(clean.keywords[0].notes).toBe('note...');
	});

	it('ASCII-fies question on every faq entry', () => {
		const input = file({
			faqs: [
				{
					id: 'f',
					question: 'What’s included?',
					keywordId: 'x',
					cluster: 'c',
					url: null,
					status: 'idea',
					reason: null,
					source: 'post',
					firstSeen: '2026-09-29'
				}
			]
		});
		expect(sanitizeKeywordsFile(input).faqs[0].question).toBe("What's included?");
	});

	it('ASCII-fies prompt on every aiPrompt entry', () => {
		const input = file({
			aiPrompts: [
				{
					id: 'p',
					prompt: 'best rental—malaga',
					keywordId: 'x',
					cluster: 'c',
					url: null,
					status: 'idea',
					reason: null,
					source: 'ubersuggest-ai-prompt-ideas',
					visibility: null,
					firstSeen: '2026-09-29'
				}
			]
		});
		expect(sanitizeKeywordsFile(input).aiPrompts[0].prompt).toBe('best rental-malaga');
	});

	it('leaves an already-ASCII file untouched', () => {
		const input = file();
		expect(sanitizeKeywordsFile(input)).toEqual(input);
	});
});
