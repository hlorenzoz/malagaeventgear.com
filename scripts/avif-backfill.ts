#!/usr/bin/env bun
/**
 * avif-backfill.ts - genera el AVIF de las variantes WebP ya subidas a R2 que no lo tienen.
 *
 * Las imagenes migradas de WordPress son solo WebP. Por cada variante WebP del manifest sin
 * `avifUrl`: descarga el WebP del CDN, lo codifica a AVIF con sharp, lo sube a R2 con la MISMA
 * clave y extension `.avif`, comprueba que el CDN lo sirve como image/avif y escribe `avifUrl`
 * en la entrada WebP (nunca una entrada AVIF aparte: rehype-blog-images agrupa por base).
 * El plugin ya emite `<picture>` con `<source type="image/avif">` solo, sin cambios de codigo.
 *
 * Uso:
 *   bun scripts/avif-backfill.ts --dry-run          # lista lo pendiente, no descarga ni sube
 *   bun scripts/avif-backfill.ts --limit 5          # procesa solo 5 (lote de prueba)
 *   bun scripts/avif-backfill.ts --id 1264          # solo las variantes del wpId 1264
 *   bun scripts/avif-backfill.ts                    # todo lo pendiente
 *
 * Idempotente y reanudable: una variante con `avifUrl` se salta, y el manifest se guarda cada
 * SAVE_EVERY variantes, asi que cortar el proceso solo pierde el lote en curso.
 * Un AVIF mas grande que el WebP se descarta (no mejora nada) y la variante queda sin `avifUrl`.
 *
 * Requisitos para subir: wrangler logueado en la cuenta cc26ab18... (igual que post-images.ts).
 * Env: AVIF_QUALITY=50, CONCURRENCY=4, SAVE_EVERY=25.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { Manifest, MediaEntry } from './migrate-wp/types';

const CDN_BASE = 'https://cdn.malagaeventgear.com';

/** Misma clave, extension .avif. Solo acepta claves .webp. */
export function avifKeyFor(webpKey: string): string {
	if (!/\.webp$/i.test(webpKey)) throw new Error(`not a webp key: ${webpKey}`);
	return webpKey.replace(/\.webp$/i, '.avif');
}

export function avifUrlFor(webpKey: string): string {
	return `${CDN_BASE}/${avifKeyFor(webpKey)}`;
}

export interface PickOptions {
	limit?: number;
	onlyId?: number;
}

/**
 * Entradas WebP sin avifUrl, en el orden del manifest, una por r2Key. El manifest puede traer la
 * misma r2Key dos veces (clave de URL y clave de ruta): si alguna ya tiene AVIF, la r2Key no esta
 * pendiente, y applyAvif marca todas.
 */
export function pickPending(manifest: Manifest, opts: PickOptions = {}): MediaEntry[] {
	const entries = Object.values(manifest.media).filter((e) => /\.webp$/i.test(e.r2Key));
	const haveAvif = new Set(entries.filter((e) => e.avifUrl).map((e) => e.r2Key));
	const seen = new Set<string>();
	const out: MediaEntry[] = [];
	for (const e of entries) {
		if (haveAvif.has(e.r2Key) || seen.has(e.r2Key)) continue;
		if (opts.onlyId !== undefined && e.wpId !== opts.onlyId) continue;
		seen.add(e.r2Key);
		out.push(e);
	}
	return opts.limit === undefined ? out : out.slice(0, opts.limit);
}

/** Copia el avifUrl de una entrada a sus gemelas (misma r2Key). Devuelve cuantas cambio. */
export function propagateAvif(manifest: Manifest): number {
	const entries = Object.values(manifest.media).filter((e) => /\.webp$/i.test(e.r2Key));
	const avifByKey = new Map(entries.filter((e) => e.avifUrl).map((e) => [e.r2Key, e.avifUrl]));
	let changed = 0;
	for (const e of entries) {
		const url = avifByKey.get(e.r2Key);
		if (url && !e.avifUrl) {
			e.avifUrl = url;
			changed++;
		}
	}
	return changed;
}

/** Escribe avifUrl en TODAS las entradas WebP con esa r2Key. Devuelve false si no hay ninguna. */
export function applyAvif(manifest: Manifest, webpKey: string): boolean {
	const entries = Object.values(manifest.media).filter((e) => e.r2Key === webpKey);
	for (const e of entries) e.avifUrl = avifUrlFor(webpKey);
	return entries.length > 0;
}

async function fetchOk(url: string, init?: RequestInit): Promise<Response> {
	const res = await fetch(url, { signal: AbortSignal.timeout(45_000), ...init });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res;
}

async function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes('--dry-run');
	const num = (flag: string) => {
		const i = args.indexOf(flag);
		return i >= 0 ? Number(args[i + 1]) : undefined;
	};
	const limit = num('--limit');
	const onlyId = num('--id');
	const quality = Number(process.env.AVIF_QUALITY ?? 50);
	const concurrency = Number(process.env.CONCURRENCY ?? 4);
	const saveEvery = Number(process.env.SAVE_EVERY ?? 25);

	const { readManifest, writeManifest } = await import('./migrate-wp/manifest');
	const manifest = readManifest();
	const twins = dryRun ? 0 : propagateAvif(manifest);
	if (twins > 0) writeManifest(manifest);
	const pending = pickPending(manifest, { limit, onlyId });
	console.log(`[avif-backfill] pendientes: ${pending.length}${dryRun ? ' (dry-run)' : ''}`);
	if (dryRun) {
		for (const e of pending.slice(0, 10)) console.log(`  ${e.r2Key} -> ${avifKeyFor(e.r2Key)}`);
		if (pending.length > 10) console.log(`  ... y ${pending.length - 10} mas`);
		return;
	}
	if (pending.length === 0) return;

	const sharp = (await import('sharp')).default;
	const { uploadToR2 } = await import('./migrate-wp/r2-uploader');
	const tmp = mkdtempSync(join(tmpdir(), 'avif-backfill-'));
	let done = 0;
	let skipped = 0;
	const failed: string[] = [];
	let sinceSave = 0;
	let next = 0;

	const work = async () => {
		while (next < pending.length) {
			const e = pending[next++];
			const key = e.r2Key;
			try {
				const webp = Buffer.from(await (await fetchOk(e.cdnUrl)).arrayBuffer());
				const avif = await sharp(webp).avif({ quality }).toBuffer();
				if (avif.length >= webp.length) {
					skipped++;
					console.log(`[avif-backfill] skip (avif ${avif.length} >= webp ${webp.length}): ${key}`);
					continue;
				}
				const file = join(tmp, `${next}-${Math.random().toString(36).slice(2)}.avif`);
				writeFileSync(file, avif);
				await uploadToR2(avifKeyFor(key), file, false);
				const head = await fetchOk(avifUrlFor(key), { method: 'HEAD' });
				if (!/image\/avif/.test(head.headers.get('content-type') ?? '')) {
					throw new Error(`CDN content-type ${head.headers.get('content-type')}`);
				}
				applyAvif(manifest, key);
				done++;
				if (++sinceSave >= saveEvery) {
					writeManifest(manifest);
					sinceSave = 0;
					console.log(`[avif-backfill] guardado: ${done} hechas, ${failed.length} fallidas`);
				}
			} catch (err) {
				failed.push(key);
				console.error(`[avif-backfill] FALLO ${key}: ${(err as Error).message}`);
			}
		}
	};

	try {
		await Promise.all(Array.from({ length: concurrency }, work));
	} finally {
		writeManifest(manifest);
		rmSync(tmp, { recursive: true, force: true });
	}
	console.log(`[avif-backfill] hechas ${done}, descartadas por tamano ${skipped}, fallidas ${failed.length}`);
	if (failed.length) process.exitCode = 1;
}

if (import.meta.main) await main();
