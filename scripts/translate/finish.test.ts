import { describe, expect, it } from 'vitest';
import {
	COMMIT_PATHS,
	commitCommands,
	commitMessage,
	countLocs,
	commitLogDetail,
	formatSitemapCounts,
	nameList,
	outsideCommitPaths,
	sitemapProblems,
	stagedRefusal,
	tailLines
} from './finish';

describe('commitMessage', () => {
	it('is a conventional commit with no attribution', () => {
		const msg = commitMessage('av-system-troubleshooting');
		expect(msg).toBe('feat(blog): translate av-system-troubleshooting into the 12 site languages');
		expect(msg).not.toMatch(/co-authored|generated with|claude/i);
	});
});

describe('nameList', () => {
	it('splits git name output into paths', () => {
		expect(nameList('a/b.svx\nc.ts\n\n')).toEqual(['a/b.svx', 'c.ts']);
		expect(nameList('')).toEqual([]);
	});
});

describe('stagedRefusal', () => {
	it('accepts an empty index', () => {
		expect(stagedRefusal([])).toBeNull();
	});
	it('refuses anything already staged and names it', () => {
		const msg = stagedRefusal(['Justfile', 'src/content/blog/fr/x.svx']);
		expect(msg).toMatch(/already staged/);
		expect(msg).toContain('Justfile');
	});
});

describe('outsideCommitPaths', () => {
	it('keeps only files that are not under the four translation paths', () => {
		expect(
			outsideCommitPaths([
				'src/content/blog/fr/x.svx',
				'src/content/blog/x.svx',
				'src/lib/i18n/content-map/locales/fr.ts',
				'src/lib/data/post-faqs.json',
				'src/lib/data/post-toc.json',
				'src/lib/data/other.json',
				'Justfile',
				'src/content/blogger/x.svx'
			])
		).toEqual(['src/lib/data/other.json', 'Justfile', 'src/content/blogger/x.svx']);
	});
});

describe('commitCommands', () => {
	const commands = commitCommands('p');
	it('adds only the four translation paths and commits with the message', () => {
		expect(commands[0]).toEqual(['git', 'add', '--', ...COMMIT_PATHS]);
		expect(commands.at(-1)).toEqual(['git', 'commit', '-m', commitMessage('p')]);
	});
	it('never pushes, never skips hooks, never adds everything', () => {
		const flat = commands.flat().join(' ');
		expect(flat).not.toMatch(/push|--no-verify|-A\b|--all|add \./);
	});
});

describe('sitemap counts', () => {
	const xml = (n: number) =>
		Array.from({ length: n }, (_, i) => `<url><loc>https://x/${i}/</loc></url>`).join('');
	it('counts <loc> entries and keeps null for a missing sitemap', () => {
		expect(countLocs(xml(3))).toBe(3);
		expect(countLocs('')).toBe(0);
	});
	it('formats one cell per locale', () => {
		expect(formatSitemapCounts({ fr: 12, de: null })).toBe('fr:12 de:missing');
	});
	it('reports a locale with no sitemap or an empty one', () => {
		expect(sitemapProblems({ fr: 12, de: null, it: 0 })).toEqual([
			'post-sitemap-de.xml is missing from the build',
			'post-sitemap-it.xml has no URLs'
		]);
		expect(sitemapProblems({ fr: 1 })).toEqual([]);
	});
});

describe('tailLines', () => {
	it('keeps the last lines, dropping a trailing blank', () => {
		expect(tailLines('a\nb\nc\nd\n', 2)).toBe('c\nd');
		expect(tailLines('a', 5)).toBe('a');
	});
});

describe('commitLogDetail', () => {
	it('records the slug, the hash and the number of files', () => {
		expect(commitLogDetail('tv-screen-rental', '76a95f2', 'feat(blog): translate x', 49)).toBe(
			'slug=tv-screen-rental hash=76a95f2 subject="feat(blog): translate x" files=49'
		);
	});
});
