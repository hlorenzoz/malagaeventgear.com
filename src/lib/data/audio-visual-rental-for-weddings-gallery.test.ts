import { describe, it, expect } from 'vitest';
import { galleryImages } from './gallery';

/**
 * Regression guard for a specific SEO audit finding (seo-audit/malagaeventgear.com,
 * id image-mismatch-real-setups-concert-photo--blog-audio-visual-rental-for-weddings-en):
 * the "Real Setups We've Delivered" inline section of `audio-visual-rental-for-weddings.svx`
 * claimed a generic "Podium and sound system for concerts in Malaga" stock photo
 * (id 1330, not present in gallery.ts's `wedding` category at all) as a real
 * wedding delivery. It undermines the section's honesty claim.
 *
 * Scoped to this one file: dozens of other, still-unrewritten wedding-topic posts
 * reuse the same generic photo in non-"delivered evidence" contexts (out of scope,
 * a separate future rewrite pass, not this audit's finding).
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

/** Extracts the inline "Real Setups" section: after its h2, up to the ImageMarquee div. */
function extractRealSetupsImageIds(body: string): string[] {
	const start = body.indexOf("## Real Setups We've Delivered");
	const end = body.indexOf('<div class="my-12', start);
	const section = start === -1 || end === -1 ? '' : body.slice(start, end);
	const ids: string[] = [];
	for (const match of section.matchAll(/cdn\.malagaeventgear\.com\/blog\/(\d+)\//g)) {
		ids.push(match[1]);
	}
	return ids;
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

describe("audio-visual-rental-for-weddings.svx 'Real Setups' inline images", () => {
	const weddingIds = galleryIdsFor('wedding');

	it('finds the section (guards the guard against a heading rename)', () => {
		expect(extractRealSetupsImageIds(loadBody()).length).toBeGreaterThan(0);
	});

	it('every inline delivered-setup photo belongs to the wedding gallery category', () => {
		const usedIds = extractRealSetupsImageIds(loadBody());
		const offenders = usedIds.filter((id) => !weddingIds.has(id));
		expect(
			offenders,
			`Non-wedding-category image id(s) ${offenders.join(', ')} used as "real setup" evidence. ` +
				`Only ids in gallery.ts's 'wedding' category may appear here.`
		).toEqual([]);
	});
});
