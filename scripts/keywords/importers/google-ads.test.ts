/**
 * google-ads.test.ts: unit tests for the pure transforms. Per the plan, the Google Ads theme
 * lists and the 2025-09-01 volume export were already audited and closed (engram: "Google Ads
 * keyword audit closed 2026-08-06", 0 new posts needed): a plain phrase enters as `covered` with
 * `url: null` and a note citing that audit. The 2026-09-29 full stats export is a DIFFERENT,
 * unaudited codepath: it goes through relevance/seed-mappings exactly like GSC.
 */
import { describe, it, expect } from 'vitest';
import {
	googleAdsPhrasesToKeywords,
	googleAdsVolumeRowsToKeywords,
	googleAdsStatsRowsToKeywords,
	parseGoogleAdsStatsCsv,
	parseGoogleAdsPeriod,
	pickMostRecentStatsFile
} from './google-ads';

const TODAY = '2026-09-29';
const serviceAreas = ['Malaga', 'Marbella'];

describe('googleAdsPhrasesToKeywords', () => {
	it('marks a relevant phrase as covered, with the theme as topic and a citing note', () => {
		const [entry] = googleAdsPhrasesToKeywords(
			[{ topic: 'Wedding', phrases: ['wedding party rentals'] }],
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('covered');
		expect(entry.url).toBeNull();
		expect(entry.topic).toBe('Wedding');
		expect(entry.notes).toMatch(/2026-08-06/);
	});

	it('rejects an out of market phrase via the relevance filter instead of marking it covered', () => {
		const [entry] = googleAdsPhrasesToKeywords(
			[{ topic: 'Business & Company', phrases: ['av companies dubai'] }],
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('rejected');
	});

	it('tags the source as google-ads with stats null (phrase-only listing)', () => {
		const [entry] = googleAdsPhrasesToKeywords(
			[{ topic: 'Smoke', phrases: ['hire smoke machine'] }],
			serviceAreas,
			TODAY
		);
		expect(entry.sources).toEqual({
			'google-ads': { firstSeen: TODAY, lastSeen: TODAY, stats: null }
		});
	});
});

describe('googleAdsVolumeRowsToKeywords', () => {
	it('attaches the bucketed volume, dated 2025-09-01, under sources.google-ads', () => {
		const [entry] = googleAdsVolumeRowsToKeywords(
			[{ keyword: 'wedding rentals', volume: 50000 }],
			serviceAreas,
			TODAY
		);
		expect(entry.sources['google-ads']?.firstSeen).toBe('2025-09-01');
		expect(entry.sources['google-ads']?.stats?.avgMonthlySearches).toBe(50000);
		expect(entry.sources['google-ads']?.stats?.asOf).toBe('2025-09-01');
		expect(entry.status).toBe('covered');
	});

	it('rejects an out of market keyword before attaching volume', () => {
		const [entry] = googleAdsVolumeRowsToKeywords(
			[{ keyword: 'event rentals texas', volume: 500 }],
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('rejected');
	});
});

describe('parseGoogleAdsPeriod', () => {
	it('parses "1 September 2025 - 31 August 2026" into YYYY-MM bounds', () => {
		expect(parseGoogleAdsPeriod('1 September 2025 - 31 August 2026')).toEqual({
			from: '2025-09',
			to: '2026-08'
		});
	});

	it('returns null for an unrecognized line', () => {
		expect(parseGoogleAdsPeriod('not a period')).toBeNull();
	});
});

describe('parseGoogleAdsStatsCsv', () => {
	const SAMPLE = [
		'Keyword Stats 2026-09-29 at 10_09_49',
		'1 September 2025 - 31 August 2026',
		[
			'Keyword',
			'Currency',
			'Avg. monthly searches',
			'Three month change',
			'YoY change',
			'Competition',
			'Competition (indexed value)',
			'Top of page bid (low range)',
			'Top of page bid (high range)',
			'Ad impression share',
			'Organic impression share',
			'Organic average position',
			'In account?',
			'In plan?',
			'Searches: Sep 2025',
			'Searches: Aug 2026'
		].join('\t'),
		[
			'sound equipment rental',
			'EUR',
			'320',
			'0%',
			'-33%',
			'Medium',
			'41',
			'0.47',
			'2.41',
			'',
			'',
			'',
			'',
			'',
			'480',
			'260'
		].join('\t'),
		[
			'conference av equipment rental',
			'EUR',
			'',
			' --',
			' --',
			'Unknown',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			''
		].join('\t')
	].join('\n');

	it('parses the reporting period from line 2', () => {
		const parsed = parseGoogleAdsStatsCsv(SAMPLE);
		expect(parsed.period).toEqual({ from: '2025-09', to: '2026-08' });
	});

	it('parses a full row: percents as numbers, bids as numbers, monthly searches by YYYY-MM', () => {
		const parsed = parseGoogleAdsStatsCsv(SAMPLE);
		const row = parsed.rows.find((r) => r.keyword === 'sound equipment rental');
		expect(row).toEqual({
			keyword: 'sound equipment rental',
			currency: 'EUR',
			avgMonthlySearches: 320,
			threeMonthChange: 0,
			yoyChange: -33,
			competition: 'Medium',
			competitionIndex: 41,
			topOfPageBidLow: 0.47,
			topOfPageBidHigh: 2.41,
			adImpressionShare: null,
			organicImpressionShare: null,
			organicAveragePosition: null,
			monthlySearches: { '2025-09': 480, '2026-08': 260 }
		});
	});

	it('turns a mostly empty row (" --", "Unknown", blank cells) into nulls, never fabricated zeros', () => {
		const parsed = parseGoogleAdsStatsCsv(SAMPLE);
		const row = parsed.rows.find((r) => r.keyword === 'conference av equipment rental');
		expect(row?.avgMonthlySearches).toBeNull();
		expect(row?.threeMonthChange).toBeNull();
		expect(row?.yoyChange).toBeNull();
		expect(row?.competition).toBe('Unknown');
		expect(row?.competitionIndex).toBeNull();
		expect(row?.monthlySearches).toEqual({});
	});
});

describe('googleAdsStatsRowsToKeywords', () => {
	it('enters a new relevant, unmapped keyword as idea, never auto-covered', () => {
		const [entry] = googleAdsStatsRowsToKeywords(
			[
				{
					keyword: 'wireless conference microphone bundle malaga',
					currency: 'EUR',
					avgMonthlySearches: 90,
					threeMonthChange: null,
					yoyChange: null,
					competition: 'Low',
					competitionIndex: 10,
					topOfPageBidLow: null,
					topOfPageBidHigh: null,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			],
			'2026-09-29',
			{ from: '2025-09', to: '2026-08' },
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('idea');
		expect(entry.url).toBeNull();
		expect(entry.sources['google-ads']?.stats?.avgMonthlySearches).toBe(90);
		expect(entry.sources['google-ads']?.stats?.competition).toBe('Low');
	});

	it('rejects an out of market keyword via relevance.ts', () => {
		const [entry] = googleAdsStatsRowsToKeywords(
			[
				{
					keyword: 'audio visual rental dubai',
					currency: 'EUR',
					avgMonthlySearches: 50,
					threeMonthChange: null,
					yoyChange: null,
					competition: null,
					competitionIndex: null,
					topOfPageBidLow: null,
					topOfPageBidHigh: null,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			],
			'2026-09-29',
			null,
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('rejected');
	});

	it('resolves a seed mapped cluster/url for a relevant phrase (e.g. sound equipment rental)', () => {
		const [entry] = googleAdsStatsRowsToKeywords(
			[
				{
					keyword: 'sound equipment rental',
					currency: 'EUR',
					avgMonthlySearches: 320,
					threeMonthChange: 0,
					yoyChange: -33,
					competition: 'Medium',
					competitionIndex: 41,
					topOfPageBidLow: 0.47,
					topOfPageBidHigh: 2.41,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			],
			'2026-09-29',
			null,
			serviceAreas,
			TODAY
		);
		expect(entry.status).toBe('covered');
		expect(entry.url).toBe('/blog/sound-system-rental/');
	});

	it('dates the sources.google-ads entry by the export asOf, not the sync run date', () => {
		const [entry] = googleAdsStatsRowsToKeywords(
			[
				{
					keyword: 'av hire malaga',
					currency: 'EUR',
					avgMonthlySearches: 140,
					threeMonthChange: null,
					yoyChange: null,
					competition: null,
					competitionIndex: null,
					topOfPageBidLow: null,
					topOfPageBidHigh: null,
					adImpressionShare: null,
					organicImpressionShare: null,
					organicAveragePosition: null,
					monthlySearches: {}
				}
			],
			'2026-09-29',
			null,
			serviceAreas,
			TODAY
		);
		expect(entry.sources['google-ads']).toMatchObject({
			firstSeen: '2026-09-29',
			lastSeen: '2026-09-29'
		});
		expect(entry.firstSeen).toBe(TODAY);
	});
});

describe('pickMostRecentStatsFile', () => {
	it('picks the newest "Keyword Stats <date> at <time>....csv", excluding legacy Keywords/Ubersuggest exports', () => {
		const files = [
			'malagaeventgear.com - Keyword Stats 2025-09-01 at 15_45_54 - Keywords.csv',
			'malagaeventgear.com - Keyword Stats 2025-09-01 at 15_45_54 - Ubersuggest.csv',
			'malagaeventgear.com - Keyword Stats 2026-09-29 at 10_09_49.csv'
		];
		const picked = pickMostRecentStatsFile(files);
		expect(picked?.file).toBe('malagaeventgear.com - Keyword Stats 2026-09-29 at 10_09_49.csv');
		expect(picked?.date).toBe('2026-09-29');
	});

	it('returns null when no full stats export is present', () => {
		expect(
			pickMostRecentStatsFile([
				'malagaeventgear.com - Keyword Stats 2025-09-01 at 15_45_54 - Keywords.csv'
			])
		).toBeNull();
	});
});
