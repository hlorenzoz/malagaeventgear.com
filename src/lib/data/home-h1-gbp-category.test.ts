import { describe, it, expect } from 'vitest';
import { siteConfig } from './site';

/**
 * Guard: the home <title> and <h1> carry the Google Business Profile PRIMARY category.
 *
 * Core 30 / GBP methodology (CLAUDE.md, "SEO y Contenido"): the site hierarchy mirrors the
 * profile hierarchy, and the home page is the node for the primary category. That category
 * is `siteConfig.categories[0]`, verified against the live profile.
 *
 * The <h1> is assembled in +page.svelte from THREE separate i18n parts
 * (`titlePart1` + `titleGradient` + `titlePart2`) so the middle one can be highlighted in
 * brand blue. That split is exactly why this is easy to break: editing one part in isolation
 * silently drops the keyword and nothing else in the suite notices. This test joins the parts
 * back together and compares against site.ts.
 *
 * Sources are read as raw text with `import.meta.glob`, the same approach as
 * `no-hardcoded-prices.test.ts`. Importing `i18n.svelte.ts` directly is not an option: it is a
 * runes module (`$state`) and it imports `$app/environment`, neither of which resolves under
 * the plain Vite that Vitest runs.
 */

const sources = import.meta.glob('../../**/*.{ts,svelte}', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/**
 * Matched by path SUFFIX. Vite keys these relative to this module, so the i18n store comes
 * back as `../i18n.svelte.ts` and not `lib/i18n.svelte.ts`. Same trap the allowlist in
 * `no-hardcoded-prices.test.ts` documents. Keep the suffixes short enough to match, long
 * enough to stay unique.
 */
function sourceEndingWith(suffix: string): string {
	const hits = Object.entries(sources).filter(([path]) => path.endsWith(suffix));
	if (hits.length === 0) throw new Error(`source not found: ${suffix}`);
	if (hits.length > 1) {
		throw new Error(`suffix "${suffix}" is ambiguous: ${hits.map(([p]) => p).join(', ')}`);
	}
	return hits[0][1];
}

const I18N = sourceEndingWith('/i18n.svelte.ts');
const HOME = sourceEndingWith('routes/(public)/+page.svelte');

/** Pulls `key: 'value'` from the nth `hero: {` block (0 = en, 1 = es, in file order). */
function heroValue(nth: number, key: string): string {
	const blocks = [...I18N.matchAll(/hero:\s*\{/g)];
	if (blocks.length <= nth) throw new Error(`hero block ${nth} not found in i18n.svelte.ts`);
	const start = blocks[nth].index!;
	const chunk = I18N.slice(start, start + 800);
	const m = chunk.match(new RegExp(`${key}:\\s*'([^']*)'`));
	if (!m) throw new Error(`${key} not found in hero block ${nth}`);
	return m[1];
}

/** The <h1> as a reader sees it: the three parts joined by the spaces in the markup. */
function heroTitle(nth: number): string {
	return ['titlePart1', 'titleGradient', 'titlePart2']
		.map((k) => heroValue(nth, k))
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();
}

const PRIMARY_CATEGORY = siteConfig.categories[0];

describe('home title and h1 carry the GBP primary category', () => {
	it('site.ts still declares the profile primary category first', () => {
		expect(PRIMARY_CATEGORY).toBe('Audio Visual Equipment Hire Service');
	});

	it('the EN <h1> reads exactly "<primary category> in Malaga"', () => {
		expect(heroTitle(0)).toBe(`${PRIMARY_CATEGORY} in Malaga`);
	});

	it('the <title> is the same phrase plus the brand suffix', () => {
		expect(HOME).toContain(`title="${PRIMARY_CATEGORY} in Malaga | MEG"`);
	});

	it('the <title> stays within the ~60 character SERP budget', () => {
		const title = `${PRIMARY_CATEGORY} in Malaga | MEG`;
		expect(title.length).toBeLessThanOrEqual(60);
	});

	it('the ES <h1> renders the same service and keeps the location last', () => {
		const es = heroTitle(1);
		expect(es).toMatch(/Audiovisual/i);
		expect(es).toMatch(/Alquiler/i);
		expect(es).toMatch(/en Málaga$/);
	});

	it('no <h1> carries the brand suffix, which belongs to <title> only', () => {
		expect(heroTitle(0)).not.toContain('|');
		expect(heroTitle(1)).not.toContain('|');
	});
});
