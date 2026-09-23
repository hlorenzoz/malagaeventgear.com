#!/usr/bin/env bun
/**
 * Generates square WebP thumbnails for each package image, in two sizes:
 *   <slug>-thumb.webp    160x160, 2x of the 80px PostCTA slot
 *   <slug>-thumb-sm.webp  96x96,  2x of the 48px PackagesRail slot
 * Both go into the srcset of each thumbnail, so the browser picks the right one by slot and DPR.
 *
 * Why: packages.ts `image` points at the full /images/packages/<slug>.webp (800x800, 70-120 KiB),
 * but PackagesRail (about 48px) and PostCTA (80px) render it tiny, wasting ~225 KiB per blog post.
 * 160px = 80px display x 2 DPR, crisp on retina, ~5-8 KiB each.
 *
 * Idempotent: regenerates the thumb each run (cheap). Source must be a square <slug>.webp.
 * Run: `bun scripts/gen-package-thumbs.ts`  (needs cwebp)
 */
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../static/images/packages');
// Thumbs are written here (Vite-imported hashed source), not back into DIR. DIR stays the
// read-only scan target for the base <slug>.webp source images.
const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/lib/assets/packages');
const THUMBS = [
	{ suffix: '-thumb', size: 160 },
	{ suffix: '-thumb-sm', size: 96 }
] as const;

// Source images: <slug>.webp, excluding the existing -mobile/-desktop/-thumb variants.
const sources = readdirSync(DIR).filter(
	(f) => f.endsWith('.webp') && !/-(mobile|desktop|thumb|thumb-sm)\.webp$/.test(f)
);

async function cwebpResize(input: string, output: string, size: number): Promise<void> {
	const proc = Bun.spawn(
		['cwebp', '-quiet', '-resize', String(size), String(size), '-q', '82', input, '-o', output],
		{ stderr: 'inherit' }
	);
	const code = await proc.exited;
	if (code !== 0) throw new Error(`cwebp failed (${code}) for ${input}`);
}

let made = 0;
for (const file of sources) {
	const input = resolve(DIR, file);
	for (const { suffix, size } of THUMBS) {
		const name = file.replace('.webp', `${suffix}.webp`);
		await cwebpResize(input, resolve(OUT_DIR, name), size);
		made++;
		console.log(`[thumb] ${file} -> ${name} (${size}x${size})`);
	}
}

console.log(`[thumb] DONE - ${made} thumbnails generated in ${OUT_DIR}`);
