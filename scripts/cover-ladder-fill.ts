#!/usr/bin/env bun
/**
 * cover-ladder-fill.ts - anade tamanos intermedios (768, 1024, 1536 px) a las portadas cuya
 * escalera responsive solo tiene el original y una miniatura (p. ej. 400w y 2560w).
 *
 * Sin rungs intermedios el navegador de un movil baja el original de 2560 px (Lighthouse:
 * "Improve image delivery", ~73 KiB sobrantes en el hero del post). Por cada portada de
 * cover-thumbs.json con un original ancho y huecos en la escalera: descarga el original del CDN,
 * lo redimensiona con sharp, codifica WebP y AVIF, sube ambos a R2 con claves NUEVAS
 * (`<base>-WxH.webp|avif`, nada se pisa) y anade la entrada WebP al manifest con su `avifUrl`
 * (misma forma que post-images.ts). Despues se regenera cover-thumbs.json.
 *
 * Uso:
 *   bun scripts/cover-ladder-fill.ts --dry-run     # lista que anadiria
 *   bun scripts/cover-ladder-fill.ts               # sube y escribe el manifest
 *   bun scripts/gen-cover-thumbs.ts                # despues, para que las portadas usen los rungs
 * Idempotente: una escalera que ya tiene un rung de 600 a 1100 px no se toca.
 * Requisitos para subir: wrangler logueado en la cuenta cc26ab18... Env: WEBP_QUALITY=82, AVIF_QUALITY=50.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { MediaEntry } from './migrate-wp/types';

const TARGETS = [768, 1024, 1536];
const CDN_BASE = 'https://cdn.malagaeventgear.com';

/**
 * Anchos de TARGETS que caben sin ampliar el original, SOLO si la escalera no tiene ningun rung
 * entre 600 y 1100 px: con uno (p. ej. 700w) el movil ya no baja el original de 2560 px.
 */
export function rungsToAdd(have: number[], original: number): number[] {
	if (have.some((h) => h >= 600 && h <= 1100)) return [];
	return TARGETS.filter((w) => w < original);
}

export function rungHeight(origW: number, origH: number, w: number): number {
	return Math.round((origH * w) / origW);
}

/** `blog/1/foto.webp` + 768x574 -> `blog/1/foto-768x574.webp`. */
export function rungKey(originalKey: string, w: number, h: number): string {
	return originalKey.replace(/\.webp$/i, `-${w}x${h}.webp`);
}

async function main() {
	const dryRun = process.argv.includes('--dry-run');
	const webpQ = Number(process.env.WEBP_QUALITY ?? 82);
	const avifQ = Number(process.env.AVIF_QUALITY ?? 50);
	const { readManifest, writeManifest } = await import('./migrate-wp/manifest');
	const { readFileSync } = await import('node:fs');
	const covers = JSON.parse(readFileSync('src/lib/data/cover-thumbs.json', 'utf8')) as Record<
		string,
		{ srcset?: string; width?: number; height?: number }
	>;
	const manifest = readManifest();
	const entries = Object.values(manifest.media);
	const plan: { orig: MediaEntry; widths: number[] }[] = [];
	for (const [url, c] of Object.entries(covers)) {
		if (!c.srcset || !c.width || !c.height) continue;
		const orig = entries.find((e) => e.r2Url === url);
		if (!orig) continue;
		const have = c.srcset.split(', ').map((s) => Number(s.split(' ')[1].replace('w', '')));
		const widths = rungsToAdd(have, c.width);
		if (widths.length) plan.push({ orig, widths });
	}
	console.log(
		`[cover-ladder-fill] portadas a completar: ${plan.length}${dryRun ? ' (dry-run)' : ''}`
	);
	for (const { orig, widths } of plan) console.log(`  ${orig.r2Key}: +${widths.join(', +')}`);
	if (dryRun || plan.length === 0) return;

	const sharp = (await import('sharp')).default;
	const { uploadToR2 } = await import('./migrate-wp/r2-uploader');
	const tmp = mkdtempSync(join(tmpdir(), 'cover-ladder-'));
	let added = 0;
	try {
		for (const { orig, widths } of plan) {
			const res = await fetch(orig.cdnUrl, { signal: AbortSignal.timeout(60_000) });
			if (!res.ok) throw new Error(`${res.status} ${orig.cdnUrl}`);
			const src = Buffer.from(await res.arrayBuffer());
			for (const w of widths) {
				const h = rungHeight(orig.width as number, orig.height as number, w);
				const key = rungKey(orig.r2Key, w, h);
				const webp = await sharp(src).resize({ width: w }).webp({ quality: webpQ }).toBuffer();
				const avif = await sharp(src).resize({ width: w }).avif({ quality: avifQ }).toBuffer();
				const fW = join(tmp, `${w}.webp`);
				const fA = join(tmp, `${w}.avif`);
				writeFileSync(fW, webp);
				writeFileSync(fA, avif);
				await uploadToR2(key, fW, false);
				await uploadToR2(key.replace(/\.webp$/, '.avif'), fA, false);
				const head = await fetch(`${CDN_BASE}/${key.replace(/\.webp$/, '.avif')}`, {
					method: 'HEAD'
				});
				if (!/image\/avif/.test(head.headers.get('content-type') ?? '')) {
					throw new Error(`CDN content-type for ${key}: ${head.headers.get('content-type')}`);
				}
				const url = `${CDN_BASE}/${key}`;
				manifest.media[key] = {
					...orig,
					r2Key: key,
					r2Url: url,
					cdnUrl: url,
					fileName: key.split('/').pop() as string,
					fileSize: webp.length,
					width: w,
					height: h,
					mimeType: 'image/webp',
					avifUrl: `${CDN_BASE}/${key.replace(/\.webp$/, '.avif')}`
				} as MediaEntry;
				added++;
				writeManifest(manifest);
				console.log(`[cover-ladder-fill] ${key}: webp ${webp.length} avif ${avif.length}`);
			}
		}
	} finally {
		rmSync(tmp, { recursive: true, force: true });
	}
	console.log(`[cover-ladder-fill] rungs anadidos: ${added}`);
}

if (import.meta.main) await main();
