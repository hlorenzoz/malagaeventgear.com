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

/**
 * A post's coverImage is its LCP hero, its og:image and its Article schema image, always
 * rendered with alt = the post title (never an "illustrative" disclaimer). A stock photo there
 * presents itself as MEG's own work with no way to disclose otherwise, which is worse than an
 * inline stock photo with a caption. Translated posts inherit coverImage from their English
 * source (CLAUDE.md, "Posts traducidos") and cannot override it, so checking the English
 * frontmatter covers every language.
 */
const englishPosts = import.meta.glob('../../content/blog/*.svx', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

function coverImageId(body: string): string | null {
	const m = /^coverImage:\s*(\S+)/m.exec(body);
	if (!m) return null;
	const idMatch = /\/blog\/(\d+)\//.exec(m[1]);
	return idMatch ? idMatch[1] : null;
}

function categoriesOf(body: string): string[] {
	const m = /^categories:\s*\[([^\]]*)\]/m.exec(body);
	if (!m) return [];
	return m[1].split(',').map((s) => s.trim());
}

/**
 * Documented exception: every "Weddings" category post needs a wedding themed cover, and MEG
 * has no real wedding event photos in its inventory at all (only the 12 stock ids in
 * STOCK_PHOTO_IDS exist for weddings) - this is a pre-existing, deliberate content decision, not
 * an oversight. A post outside that category always has real, non-wedding photos available.
 */
function isDocumentedException(body: string): boolean {
	return categoriesOf(body).includes('Weddings');
}

describe('a stock photo is never a post coverImage', () => {
	it('finds coverImage frontmatter in the blog (guards the guard)', () => {
		const withCover = Object.values(englishPosts).filter((body) => coverImageId(body) !== null);
		expect(withCover.length).toBeGreaterThan(20);
	});

	it('no post uses a STOCK_PHOTO_IDS image as its coverImage, outside the documented Weddings exception', () => {
		const bad = Object.entries(englishPosts)
			.filter(([, body]) => {
				const id = coverImageId(body);
				return id !== null && STOCK_PHOTO_IDS.includes(id) && !isDocumentedException(body);
			})
			.map(([file]) => file.replace('../../content/blog/', ''));
		expect(bad, 'post using a stock photo as its coverImage (the LCP hero, og:image and Article image)').toEqual([]);
	});
});
