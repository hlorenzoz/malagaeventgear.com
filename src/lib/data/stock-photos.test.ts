import { describe, expect, it } from 'vitest';
import { STOCK_PHOTO_IDS } from './gallery';

/**
 * A generic stock photo is never presented as MEG's work (CLAUDE.md "Honestidad"). For every
 * post, English and translated, each image whose CDN id is in STOCK_PHOTO_IDS must (1) carry a
 * caption, the paragraph right after it, that says it is illustrative in the post's language, and
 * (2) not sit under a section heading that presents photos as delivered work.
 */

const posts = import.meta.glob('../../content/blog/**/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

/** "Illustrative" in each site language, as the captions write it. */
const ILLUSTRATIVE = /il+ustra|symbolbild|示意/i;
/** Section headings that present their photos as real, delivered MEG work (English source). */
const DELIVERED_HEADING = /^##\s+.*(Real (Setups|Weddings|Events)|We've Delivered|Our Recent Event Setups|Setups We've)/i;

interface StockUse {
	file: string;
	line: number;
	caption: string;
	heading: string;
}

function stockUses(file: string, body: string): StockUse[] {
	const lines = body.split('\n');
	const uses: StockUse[] = [];
	let heading = '';
	lines.forEach((line, i) => {
		if (line.startsWith('## ')) heading = line;
		const image = /!\[[^\]]*\]\(https:\/\/cdn\.malagaeventgear\.com\/blog\/(\d+)\/[^)\s]*(?:\s+"([^"]*)")?\)/.exec(line);
		if (!image || !STOCK_PHOTO_IDS.includes(image[1])) return;
		// The caption is the markdown title ("...") or the next paragraph when it is plain text.
		let caption = image[2] ?? '';
		if (!caption) {
			let j = i + 1;
			while (j < lines.length && lines[j].trim() === '') j++;
			const next = lines[j] ?? '';
			if (next && !next.startsWith('![') && !next.startsWith('#') && !next.startsWith('<') && !next.startsWith('-')) caption = next;
		}
		uses.push({ file: file.replace('../../content/blog/', ''), line: i + 1, caption, heading });
	});
	return uses;
}

const uses = Object.entries(posts).flatMap(([file, body]) => stockUses(file, body));

describe('stock photos are never presented as MEG work', () => {
	it('finds the stock photos in the blog (guards the guard)', () => {
		expect(uses.length).toBeGreaterThan(20);
	});

	it('every stock photo has a caption that says it is illustrative', () => {
		const bad = uses.filter((u) => !ILLUSTRATIVE.test(u.caption)).map((u) => `${u.file}:${u.line}`);
		expect(bad, 'stock photo without an illustrative caption').toEqual([]);
	});

	it('no stock photo sits under a heading that presents photos as delivered work', () => {
		const bad = uses.filter((u) => DELIVERED_HEADING.test(u.heading)).map((u) => `${u.file}:${u.line} under "${u.heading}"`);
		expect(bad, 'stock photo inside a "real / delivered" section').toEqual([]);
	});
});
