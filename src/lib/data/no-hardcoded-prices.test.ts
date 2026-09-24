import { describe, it, expect } from 'vitest';
import { isPricePoint, packages } from './packages';

/**
 * Guard test for CLAUDE.md §7 — "Prohibido duplicar datos".
 *
 * Scans application source for literal package prices. A unit test cannot stop a
 * developer typing `€290` into a component, but this makes the suite fail the
 * moment they do, which is the only thing that actually keeps a single source of
 * truth single.
 *
 * Sources are read with Vite's `import.meta.glob` rather than `node:fs`: this
 * project restricts `tsconfig.types` to the Cloudflare Workers definitions on
 * purpose, so Node globals are not (and should not be) typed here — the same
 * reason CLAUDE.md §3 mandates `import.meta.glob` for build-time file reads.
 *
 * Scope note: `src/content/**` (published blog prose) and `post-faqs.json`
 * (snapshots of that prose) are editorial copy with their own revision history —
 * they are excluded here and tracked separately.
 */

const sources = import.meta.glob('../../**/*.{ts,svelte}', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/**
 * Files allowed to contain price literals, with the reason why.
 *
 * Matched by path suffix: Vite returns sibling modules as `./x.ts` but distant
 * ones as `../../lib/…`, so an exact-path allowlist silently misses entries.
 */
const ALLOWLIST = [
	// The single source of truth itself.
	'lib/data/packages.ts',
	// Assert real formatting behaviour, so they must name concrete amounts.
	'packages-pricing.test.ts',
	'no-hardcoded-prices.test.ts'
];

/**
 * Strips block comments and whole-line comments before scanning.
 *
 * The guard exists to stop stale prices being RENDERED, and a comment renders
 * nothing. Several files legitimately document the old duplicated literals to
 * explain why the derivation exists — flagging those would push people toward
 * deleting the explanation rather than keeping the data single-sourced.
 *
 * Trailing comments after code are deliberately NOT stripped: erring toward a
 * false positive is cheap, missing a real one is not.
 */
function stripComments(source: string): string {
	return source
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.split('\n')
		.filter((line) => {
			const trimmed = line.trimStart();
			return !trimmed.startsWith('//') && !trimmed.startsWith('*');
		})
		.join('\n');
}

const scanned = Object.entries(sources)
	.map(([path, contents]) => [path.replace(/^(\.\.\/)+/, '').replace(/^\.\//, ''), contents] as const)
	.filter(([path]) => !path.startsWith('content/'))
	.filter(([path]) => !ALLOWLIST.some((allowed) => path.endsWith(allowed)));

describe('no hardcoded package prices outside the single source of truth', () => {
	const prices = [...new Set(packages.map((pkg) => pkg.price))];

	// `€290` / `290€` / `290 €` / `290 EUR` — the shapes a price actually takes in
	// UI copy and JSON-LD. A bare `290` is not matched: it is far too ambiguous
	// (pixel sizes, timeouts, years) to flag without drowning the suite in noise.
	const pricePattern = (price: number) =>
		new RegExp(`(€\\s*${price}\\b|\\b${price}\\s*€|\\b${price}\\s*EUR\\b)`);

	it.each(scanned.map(([path]) => path))('%s contains no literal package price', (path) => {
		const contents = scanned.find(([p]) => p === path)?.[1] ?? '';
		const offenders = prices.filter((price) => pricePattern(price).test(stripComments(contents)));

		expect(
			offenders,
			`${path} hardcodes package price(s) ${offenders.join(', ')}. ` +
				`Import from $lib/data/packages instead (formatPrice / getPriceRange / getPackageLabels).`
		).toEqual([]);
	});

	it('scans a meaningful number of files', () => {
		// Guards the guard: a broken glob silently turning this suite into a no-op
		// is exactly the failure mode that lets duplication back in.
		expect(scanned.length).toBeGreaterThan(50);
	});

	it('would actually catch a violation', () => {
		const cheapest = Math.min(...prices);
		expect(pricePattern(cheapest).test(`ecoPrice: '€${cheapest}'`)).toBe(true);
		expect(pricePattern(cheapest).test(`Eco Pack (${cheapest} €)`)).toBe(true);
		expect(pricePattern(cheapest).test(`from ${cheapest} EUR`)).toBe(true);
		// And that it does not fire on unrelated numbers.
		expect(pricePattern(cheapest).test(`width: ${cheapest}px`)).toBe(false);
	});
});

describe('copy writes every amount as a {price:N} token (CLAUDE.md §7)', () => {
	// Copy is every file a translator writes, plus the English copy in faq.ts and packages.ts.
	// A literal amount there skips formatPrice, so the same price renders as `+50€` on one line
	// and `400 €` on the next, differently in every language.
	const COPY_FILE = /(i18n\/(messages|data)\/[a-z-]+\.ts|\/i18n\/[a-z-]+\.ts|lib\/data\/(faq|packages)\.ts)$/;
	const amount = /(€\s*\d|\d\s*€|\d\s*(欧元|歐元)|\d\s*EUR\b)/;
	const copyFiles = Object.entries(sources)
		.map(([path, contents]) => [path.replace(/^(\.\.\/)+/, '').replace(/^\.\//, ''), contents] as const)
		.filter(([path]) => COPY_FILE.test(path) && !path.endsWith('.test.ts'));

	it('finds the copy files', () => {
		expect(copyFiles.length).toBeGreaterThan(200);
	});

	it.each(copyFiles.map(([path]) => path))('%s has no literal amount', (path) => {
		const lines = stripComments(copyFiles.find(([p]) => p === path)?.[1] ?? '')
			.split('\n')
			.filter((line) => amount.test(line));
		expect(lines, `${path}: write {price:N} instead of a literal amount`).toEqual([]);
	});

	it.each(copyFiles.map(([path]) => path))('%s names every amount by its PRICE_POINTS key', (path) => {
		// A token like {price:50} still hardcodes the number in every language. The number lives
		// once, in PRICE_POINTS (packages.ts), and copy only names it: {price:projectorScreen}.
		const tokens = [...stripComments(copyFiles.find(([p]) => p === path)?.[1] ?? '').matchAll(/\{price:([^}]*)\}/g)].map((m) => m[1]);
		expect(tokens.filter((key) => !isPricePoint(key)), `${path}: unknown or numeric price token`).toEqual([]);
	});

	it('would actually catch a violation', () => {
		for (const text of ["'(+50€)'", "'400 €'", "'€240'", "'400欧元'", "'400歐元'"]) expect(amount.test(text), text).toBe(true);
		expect(amount.test("'(+{price:projectorScreen})'")).toBe(false);
		expect(isPricePoint('50')).toBe(false);
		expect(isPricePoint('projectorScreen')).toBe(true);
	});
});
