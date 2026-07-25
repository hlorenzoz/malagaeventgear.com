/**
 * Guard: every real blog cover image in src/lib/data/cover-thumbs.json carries its
 * own full-size width/height.
 *
 * og:image:width/height/type were never emitted for ANY blog post (SeoHead.svelte only
 * renders them `{#if img.width}`, and BlogPost.svelte passed `images: [{ url, alt }]`
 * with no dimensions). gen-cover-thumbs.ts now looks up the exact-URL manifest entry and
 * attaches { width, height } alongside { thumb, srcset }. This test fails if a future
 * edit to gen-cover-thumbs.ts (or a hand-edit of the committed JSON) drops those fields
 * for a cover that the manifest can actually resolve.
 *
 * Fixture covers under blog-media/fixtures/ (used by test-only posts, not real content)
 * are intentionally excluded — they have no manifest entry and are not real R2 assets.
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import coverThumbs from '../src/lib/data/cover-thumbs.json';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = resolve(ROOT, 'src/content/blog');
const MANIFEST = resolve(ROOT, 'scripts/migrate-wp/manifest.json');

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as {
	media: Record<string, { r2Url: string }>;
};
const manifestUrls = new Set(Object.values(manifest.media).map((e) => e.r2Url));

function coverImageOf(file: string): string | null {
	const raw = readFileSync(resolve(BLOG_DIR, file), 'utf8');
	const m = raw.match(/^coverImage:\s*(.+)$/m);
	return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.svx'));

describe('cover-thumbs.json width/height', () => {
	it('audio-visual-rental.svx cover reports its real 2048x1153 size', () => {
		const info = (coverThumbs as Record<string, { width?: number; height?: number }>)[
			'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup.webp'
		];
		expect(info?.width).toBe(2048);
		expect(info?.height).toBe(1153);
	});

	for (const file of files) {
		const cover = coverImageOf(file);
		if (!cover || !manifestUrls.has(cover)) continue; // fixture/non-manifest cover, skip

		it(`${file} coverImage has width+height in cover-thumbs.json`, () => {
			const info = (coverThumbs as Record<string, { width?: number; height?: number }>)[cover];
			expect(info, `cover-thumbs.json is missing an entry for ${cover}`).toBeDefined();
			expect(
				info?.width,
				`cover-thumbs.json['${cover}'].width is missing — run: bun scripts/gen-cover-thumbs.ts`
			).toBeTypeOf('number');
			expect(
				info?.height,
				`cover-thumbs.json['${cover}'].height is missing — run: bun scripts/gen-cover-thumbs.ts`
			).toBeTypeOf('number');
		});
	}
});
