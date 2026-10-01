import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { englishDateOf, formatPending, pendingTranslations, syncSteps } from './sync';

const dirs: string[] = [];
function blogDir(files: Record<string, string>): string {
	const dir = mkdtempSync(join(tmpdir(), 'sync-test-'));
	dirs.push(dir);
	for (const [path, content] of Object.entries(files)) {
		const full = join(dir, path);
		mkdirSync(join(full, '..'), { recursive: true });
		writeFileSync(full, content);
	}
	return dir;
}
afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })));

const translation = (sourceUpdated: string) =>
	`---\ntitle: "t"\nsourceUpdated: "${sourceUpdated}"\n---\n\nBody\n`;

describe('englishDateOf', () => {
	it('is updatedDate, else publishDate, as YYYY-MM-DD', () => {
		expect(englishDateOf({ publishDate: '2026-01-02', updatedDate: '2026-05-06' })).toBe(
			'2026-05-06'
		);
		expect(englishDateOf({ publishDate: '2026-01-02T00:00:00.000Z' })).toBe('2026-01-02');
	});
	it('throws without any date', () => {
		expect(() => englishDateOf({})).toThrow(/publishDate/);
	});
});

describe('pendingTranslations', () => {
	it('splits the locales into stale (older sourceUpdated) and missing (no file)', () => {
		const dir = blogDir({
			'fr/p.svx': translation('2026-09-01'),
			'de/p.svx': translation('2026-10-01'),
			'it/p.svx': translation('2026-10-01')
		});
		const pending = pendingTranslations('p', '2026-10-01', dir);
		expect(pending.stale).toEqual(['fr']);
		expect(pending.missing).toEqual([
			'nl',
			'pt-pt',
			'pt-br',
			'sv',
			'da',
			'nb',
			'zh-hans',
			'zh-tw',
			'zh-hk'
		]);
	});
	it('is empty when all 12 are fresh', () => {
		const files: Record<string, string> = {};
		for (const l of [
			'fr',
			'it',
			'de',
			'nl',
			'pt-pt',
			'pt-br',
			'sv',
			'da',
			'nb',
			'zh-hans',
			'zh-tw',
			'zh-hk'
		]) {
			files[`${l}/p.svx`] = translation('2026-10-01');
		}
		expect(pendingTranslations('p', '2026-10-01', blogDir(files))).toEqual({
			stale: [],
			missing: []
		});
	});
});

describe('formatPending', () => {
	it('names the stale and the missing locales and what to do', () => {
		const lines = formatPending('p', '2026-10-01', { stale: ['fr'], missing: ['de', 'it'] });
		const text = lines.join('\n');
		expect(text).toContain('stale: fr');
		expect(text).toContain('missing: de, it');
		expect(text).toContain('sourceUpdated');
		expect(text).toContain('2026-10-01');
	});
	it('says so when nothing is pending', () => {
		expect(formatPending('p', '2026-10-01', { stale: [], missing: [] }).join('\n')).toMatch(
			/all 12 translations are up to date/
		);
	});
});

describe('syncSteps', () => {
	it('runs post-touch, then the FAQ cache, then the ToC cache, in that order', () => {
		expect(syncSteps('p').map((s) => s.args.join(' '))).toEqual([
			'scripts/post-touch.ts p',
			'scripts/gen-post-faqs.ts',
			'scripts/gen-post-toc.ts'
		]);
	});
});
