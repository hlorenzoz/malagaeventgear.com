/**
 * gbp.test.ts: unit tests for the GBP content-map.md importer (plan, importers table row
 * "gbp"). Status mapping (plan): covered/duplicate -> covered, no-fit/conflict -> rejected.
 * `declared` is not named by the plan. Decision made here (documented in gbp.ts): map it to
 * `covered` too, since it means the intent is already resolved by an existing page.
 */
import { describe, it, expect } from 'vitest';
import { parseGbpRows, gbpRowsToKeywords } from './gbp';

const TODAY = '2026-09-29';

describe('parseGbpRows', () => {
	it('extracts numbered data rows, ignoring the header and legend text', () => {
		const md = [
			'# Content Map',
			'',
			'| # | Service | Status | Slug (existing or proposed) | Batch | Notes |',
			'| - | ------- | ------ | ---------------------------- | ----- | ----- |',
			'| 1 | Sound system rental | covered | sound-system-rental | 1 | Published. |',
			'| 2 | Camera rental | no-fit | - | | Not offered. |'
		].join('\n');
		const rows = parseGbpRows(md);
		expect(rows).toEqual([
			{
				service: 'Sound system rental',
				status: 'covered',
				slug: 'sound-system-rental'
			},
			{ service: 'Camera rental', status: 'no-fit', slug: '-' }
		]);
	});

	it('takes the first slug when a row lists two separated by " / "', () => {
		const md =
			'| 20 | Event AV equipment rental | duplicate | audio-visual-rental / audiovisual-equipment-rental-service | | note |';
		const rows = parseGbpRows(md);
		expect(rows[0].slug).toBe('audio-visual-rental');
	});
});

describe('gbpRowsToKeywords', () => {
	const realSlugs = new Set(['sound-system-rental']);

	it('maps covered to covered, with a url when the slug is a real post', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Sound system rental',
					status: 'covered',
					slug: 'sound-system-rental'
				}
			],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.status).toBe('covered');
		expect(entry.url).toBe('/blog/sound-system-rental/');
	});

	it('maps duplicate to covered', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Stage rental',
					status: 'duplicate',
					slug: 'audiovisual-equipment-rental-service'
				}
			],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.status).toBe('covered');
	});

	it('maps no-fit to rejected with a reason', () => {
		const [entry] = gbpRowsToKeywords(
			[{ service: 'Camera rental', status: 'no-fit', slug: '-' }],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.status).toBe('rejected');
		expect(entry.reason).toBeTruthy();
	});

	it('maps conflict to rejected with a reason', () => {
		const [entry] = gbpRowsToKeywords(
			[{ service: 'DJ equipment rental', status: 'conflict', slug: '-' }],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.status).toBe('rejected');
	});

	it('maps declared to covered (documented decision, not in the plan)', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Laptop rental',
					status: 'declared',
					slug: 'audiovisual-equipment-rental-service'
				}
			],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.status).toBe('covered');
	});

	it('leaves url null when the slug is "-" or not a real post', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Something proposed',
					status: 'covered',
					slug: 'not-a-real-post'
				}
			],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.url).toBeNull();
	});

	it('uses the given cluster map when the slug resolves to a known post cluster', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Sound system rental',
					status: 'covered',
					slug: 'sound-system-rental'
				}
			],
			realSlugs,
			{ 'sound-system-rental': 'audio visual rental' },
			TODAY
		);
		expect(entry.cluster).toBe('audio visual rental');
	});

	it('tags the source as gbp-content-map', () => {
		const [entry] = gbpRowsToKeywords(
			[
				{
					service: 'Sound system rental',
					status: 'covered',
					slug: 'sound-system-rental'
				}
			],
			realSlugs,
			{},
			TODAY
		);
		expect(entry.sources).toEqual([{ name: 'gbp-content-map', seen: TODAY }]);
	});
});
