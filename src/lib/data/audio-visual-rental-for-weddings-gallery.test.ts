import { describe, it, expect } from 'vitest';
import { galleryImages } from './gallery';

/**
 * The wedding gallery photos are generic stock photos (user decision 2026-09-25, CLAUDE.md
 * "Honestidad"): the section below shows them as illustrative wedding settings, never as weddings
 * MEG delivered. Its heading was "Real Setups We've Delivered" until that decision.
 *
 * Original regression guard for a specific SEO audit finding (seo-audit/malagaeventgear.com,
 * id image-mismatch-real-setups-concert-photo--blog-audio-visual-rental-for-weddings-en):
 * the "Real Setups We've Delivered" inline section of `audio-visual-rental-for-weddings.svx`
 * claimed a generic "Podium and sound system for concerts in Malaga" stock photo
 * (id 1330, not present in gallery.ts's `wedding` category at all) as a real
 * wedding delivery. It undermines the section's honesty claim.
 *
 * This file only keeps the section to wedding photos. That no stock photo is presented as
 * delivered work, anywhere in the blog, is guarded by src/lib/data/stock-photos.test.ts.
 */

const raw = import.meta.glob('../../content/blog/audio-visual-rental-for-weddings.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function loadBody(): string {
	const [, contents] = Object.entries(raw)[0] ?? [];
	if (!contents) throw new Error('audio-visual-rental-for-weddings.svx not found via import.meta.glob');
	return contents;
}

const SECTION_HEADING = '## The Settings Behind Each Hour of the Day';

/** The inline settings section: after its h2, up to the ImageMarquee div. */
function extractSection(body: string): string {
	const start = body.indexOf(SECTION_HEADING);
	const end = body.indexOf('<div class="my-12', start);
	return start === -1 || end === -1 ? '' : body.slice(start, end);
}

function extractSectionImageIds(body: string): string[] {
	return [...extractSection(body).matchAll(/cdn\.malagaeventgear\.com\/blog\/(\d+)\//g)].map((match) => match[1]);
}

function galleryIdsFor(category: 'wedding' | 'corporate' | 'general' | 'party'): Set<string> {
	const ids = new Set<string>();
	for (const img of galleryImages) {
		if (img.category !== category) continue;
		const match = img.src.match(/\/blog\/(\d+)\//);
		if (match) ids.add(match[1]);
	}
	return ids;
}

describe("audio-visual-rental-for-weddings.svx wedding settings section", () => {
	const weddingIds = galleryIdsFor('wedding');

	it('finds the section (guards the guard against a heading rename)', () => {
		expect(extractSectionImageIds(loadBody()).length).toBeGreaterThan(0);
	});

	it('every photo in the wedding settings section belongs to the wedding gallery category', () => {
		const usedIds = extractSectionImageIds(loadBody());
		const offenders = usedIds.filter((id) => !weddingIds.has(id));
		expect(
			offenders,
			`Non-wedding-category image id(s) ${offenders.join(', ')} used in the wedding settings section. ` +
				`Only ids in gallery.ts's 'wedding' category may appear here.`
		).toEqual([]);
	});
});
