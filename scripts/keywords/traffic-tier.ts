#!/usr/bin/env bun
/**
 * traffic-tier.ts: the site's Avalanche traffic tier (PageOptimizer Pro), computed from the daily
 * chart of the latest Search Console export. See `.agents/context/pop/avalanche-content-theory.md`.
 *
 * Method: take the highest and the lowest DAILY IMPRESSIONS of the export period (3 months),
 * average them, and find the row of the tier chart that contains the value. Impressions, not
 * clicks: POP switched on 2024-03-21.
 *
 * Usage: `bun scripts/keywords/traffic-tier.ts`, also `just keywords-tier`. Prints JSON.
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseCsvLine } from '../backfill-silo-meta';
import { pickMostRecentZip } from './importers/gsc';

export interface TierRow {
	level: number;
	min: number;
	max: number;
}

/**
 * The 18 levels of the POP chart. Ranges are half open: `[min, max)`. A value equal to a range's
 * upper bound belongs to the NEXT level (100 is Level 100, not Level 50). Above the last upper
 * bound the value stays at the top level.
 */
export const TIER_CHART: readonly TierRow[] = [
	{ level: 0, min: 0, max: 10 },
	{ level: 10, min: 10, max: 20 },
	{ level: 20, min: 20, max: 50 },
	{ level: 50, min: 50, max: 100 },
	{ level: 100, min: 100, max: 200 },
	{ level: 200, min: 200, max: 500 },
	{ level: 500, min: 500, max: 1000 },
	{ level: 1000, min: 1000, max: 1500 },
	{ level: 1500, min: 1500, max: 2000 },
	{ level: 2000, min: 2000, max: 3000 },
	{ level: 3000, min: 3000, max: 4000 },
	{ level: 4000, min: 4000, max: 5000 },
	{ level: 5000, min: 5000, max: 7500 },
	{ level: 7500, min: 7500, max: 10000 },
	{ level: 10000, min: 10000, max: 12500 },
	{ level: 12500, min: 12500, max: 15000 },
	{ level: 15000, min: 15000, max: 25000 },
	{ level: 25000, min: 25000, max: 50000 }
];

export interface Tier {
	value: number;
	low: number;
	high: number;
	level: number;
	range: { min: number; max: number };
}

export type AvalancheFit = 'in-tier' | 'below' | 'above' | 'unknown';

/** Pure: (max + min) / 2 of the daily impressions, located in the chart. */
export function computeTier(dailyImpressions: number[]): Tier {
	if (dailyImpressions.length === 0) throw new Error('computeTier: no daily data');
	const high = Math.max(...dailyImpressions);
	const low = Math.min(...dailyImpressions);
	const value = (high + low) / 2;
	const row = TIER_CHART.find((r) => value >= r.min && value < r.max) ?? TIER_CHART.at(-1)!;
	return { value, low, high, level: row.level, range: { min: row.min, max: row.max } };
}

/** Pure: where a monthly volume sits against the tier. No volume means unknown, never a guess. */
export function avalancheFit(volume: number | null, tier: Pick<Tier, 'range'>): AvalancheFit {
	if (volume == null) return 'unknown';
	if (volume < tier.range.min) return 'below';
	if (volume >= tier.range.max) return 'above';
	return 'in-tier';
}

/** Pure: parses `Fecha,Clics,Impresiones,CTR,Posición` (the GSC daily chart). */
export function parseDailyChart(csv: string): { impressions: number[]; from: string; to: string } {
	const rows = csv
		.split(/\r?\n/)
		.slice(1)
		.filter((l) => l.trim() !== '')
		.map(parseCsvLine)
		.filter((c) => c.length >= 3 && Number.isFinite(Number(c[2])));
	if (rows.length === 0) throw new Error('parseDailyChart: no data rows');
	const dates = rows.map((c) => c[0].trim()).sort();
	return {
		impressions: rows.map((c) => Number(c[2])),
		from: dates[0],
		to: dates[dates.length - 1]
	};
}

export interface TierReport extends Tier {
	export: string;
	period: { from: string; to: string };
	days: number;
	metric: 'impressions';
}

/** Pure: the CLI output. */
export function summarizeTier(
	exportDate: string,
	chart: { impressions: number[]; from: string; to: string }
): TierReport {
	const t = computeTier(chart.impressions);
	return {
		export: exportDate,
		period: { from: chart.from, to: chart.to },
		days: chart.impressions.length,
		low: t.low,
		high: t.high,
		value: t.value,
		level: t.level,
		range: t.range,
		metric: 'impressions'
	};
}

const GSC_DIR = join(process.cwd(), '.agents', 'context', 'keywords', 'google-search-console-gsc');

/** Real read: latest GSC zip, daily chart extracted with `unzip -p` (the entry is `Gráfico.csv`
 *  but its name comes out garbled, so the wildcard `*fico.csv` is the reliable match). */
export async function readTrafficTier(dir: string = GSC_DIR): Promise<TierReport> {
	const latest = pickMostRecentZip(readdirSync(dir).filter((f) => f.endsWith('.zip')));
	if (!latest) throw new Error(`no GSC zip in ${dir}`);
	const proc = Bun.spawn(['unzip', '-p', join(dir, latest.file), '*fico.csv'], {
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const csv = await new Response(proc.stdout).text();
	if ((await proc.exited) !== 0) {
		throw new Error(`unzip -p failed on ${latest.file}: ${await new Response(proc.stderr).text()}`);
	}
	return summarizeTier(latest.date, parseDailyChart(csv));
}

if (import.meta.main) {
	console.log(JSON.stringify(await readTrafficTier()));
}
