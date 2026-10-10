import { test, expect } from '@playwright/test';
import { PUBLISHED_LOCALES, localized, type Locale } from './support/i18n';

/**
 * "Malaga, Spain" rule (CLAUDE.md section 5, user decision 2026-09-26): on every page the FIRST
 * geographic mention of Malaga in the body names the country, in each language's own form. After
 * that, plain "Malaga". The meta description names the country too, but only when it still fits in
 * 160 characters. Titles and headings are never forced, and "Malaga Event Gear" (the brand) and the
 * NAP address ("29009 Malaga") are not mentions.
 *
 * The country appears ONLY on the first mention of each page. Copy owned by one page carries it
 * directly. Shared catalog copy (package descriptions, the delivery bullet) renders PLAIN
 * everywhere (home, /equipment/, /packages/, meta descriptions, schema, llms.txt) through the
 * `{city:WITH|PLAIN}` token, and only the package detail page renders WITH on its first token
 * (src/lib/data/packages.ts, renderCityFirst). A raw `{city` in a served page is a leaked token.
 *
 * Checked on the served HTML (Playwright `request`, no page load), because that is what Google
 * reads. Reviews (any element with a `lang` attribute) are never part of the check.
 */

const MAIN_PAGES = [
	'/',
	'/about-us/',
	'/equipment/',
	'/packages/',
	'/contact/',
	'/faq/',
	'/meet-the-team/'
];
// The five package detail pages: hero shows the shared package desc, then the delivery bullet.
const PACKAGE_PAGES = [
	'/packages/eco/',
	'/packages/wedding/',
	'/packages/basic-mice/',
	'/packages/mice/',
	'/packages/product-presentation/'
];
const PAGES = [...MAIN_PAGES, ...PACKAGE_PAGES];
const LOCALES: Locale[] = ['en', ...PUBLISHED_LOCALES];

// Country forms (the ones the site already uses). Latin scripts: the country follows the city,
// after a comma. Chinese: the country goes BEFORE the city ("西班牙马拉加"), or right after it in
// full width parentheses ("马拉加（西班牙）", the form CLAUDE.md documents).
// The country directly after the city ("Malaga, Spain"), or closing the same short phrase
// ("Malaga & Costa del Sol, Spain"), with no sentence end in between.
const AFTER_CITY: Partial<Record<Locale, RegExp>> = {
	en: /^[^.!?:;()]{0,24}?,\s*Spain\b/,
	fr: /^[^.!?:;()]{0,24}?,\s*en Espagne\b/,
	it: /^[^.!?:;()]{0,24}?,\s*in Spagna\b/,
	de: /^[^.!?:;()]{0,24}?,\s*Spanien\b/,
	nl: /^[^.!?:;()]{0,24}?,\s*Spanje\b/,
	'pt-pt': /^[^.!?:;()]{0,24}?,\s*Espanha\b/,
	'pt-br': /^[^.!?:;()]{0,24}?,\s*na Espanha\b/,
	sv: /^[^.!?:;()]{0,24}?,\s*Spanien\b/,
	da: /^[^.!?:;()]{0,24}?,\s*Spanien\b/,
	nb: /^[^.!?:;()]{0,24}?,\s*Spania\b/
};
const BEFORE_CITY = /西班牙$/;
const AFTER_CITY_ZH = /^（西班牙）/;
const MIN_BODY_LENGTH = 100;
const FORM_LENGTH: Record<Locale, number> = {
	en: ', Spain'.length,
	fr: ', en Espagne'.length,
	it: ', in Spagna'.length,
	de: ', Spanien'.length,
	nl: ', Spanje'.length,
	'pt-pt': ', Espanha'.length,
	'pt-br': ', na Espanha'.length,
	sv: ', Spanien'.length,
	da: ', Spanien'.length,
	nb: ', Spania'.length,
	'zh-hans': '西班牙'.length,
	'zh-tw': '西班牙'.length,
	'zh-hk': '西班牙'.length
};

const CITY = /M[aá]laga|马拉加|馬拉加/g;
const VOID = new Set([
	'meta',
	'link',
	'br',
	'img',
	'input',
	'hr',
	'source',
	'wbr',
	'area',
	'base',
	'col',
	'embed',
	'param',
	'track'
]);
const SKIP = new Set([
	'script',
	'style',
	'noscript',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'address'
]);

function decode(text: string): string {
	return text
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&amp;/g, '&');
}

/** Visible text of <main>, without headings, <address>, script, style or any `lang` element. */
export function mainText(html: string): string {
	const token = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>|([^<]+|<)/g;
	const stack: { tag: string; excluded: boolean }[] = [];
	const out: string[] = [];
	// An explicit exec loop: `lastIndex` is only honoured here (matchAll iterates a clone).
	for (let m = token.exec(html); m !== null; m = token.exec(html)) {
		if (m[4] !== undefined) {
			if (stack.some((s) => s.excluded) || !stack.some((s) => s.tag === 'main')) continue;
			out.push(decode(m[4]));
			continue;
		}
		if (m[2] === undefined) continue; // comment
		const tag = m[2].toLowerCase();
		if (m[1]) {
			while (stack.length && stack.pop()!.tag !== tag);
			continue;
		}
		if (VOID.has(tag)) continue;
		const selfClosing = /\/\s*$/.test(m[3]);
		const excluded = SKIP.has(tag) || (tag !== 'html' && /\slang\s*=/.test(m[3]));
		if (selfClosing) continue;
		stack.push({ tag, excluded });
		// <script> and <style> bodies are raw text (they may contain "</div>"): jump to their close tag.
		if (tag === 'script' || tag === 'style') {
			const end = html.indexOf(`</${tag}`, token.lastIndex);
			if (end > -1) token.lastIndex = end;
		}
	}
	return out.join(' ').replace(/\s+/g, ' ').trim();
}

function metaDescription(html: string): string {
	const tag = html.match(/<meta\s[^>]*name="description"[^>]*>/)?.[0] ?? '';
	return decode(tag.match(/content="([^"]*)"/)?.[1] ?? '');
}

/** First mention of the city that is not the brand or the NAP address. */
function firstMention(text: string): { index: number; length: number } | null {
	for (const m of text.matchAll(CITY)) {
		const rest = text.slice(m.index);
		if (/^M[aá]laga Event Gear/.test(rest)) continue;
		if (
			text
				.slice(Math.max(0, m.index - 6), m.index)
				.trim()
				.endsWith('29009')
		)
			continue;
		return { index: m.index, length: m[0].length };
	}
	return null;
}

function hasCountry(locale: Locale, text: string, at: { index: number; length: number }): boolean {
	if (locale.startsWith('zh'))
		return (
			BEFORE_CITY.test(text.slice(Math.max(0, at.index - 3), at.index)) ||
			AFTER_CITY_ZH.test(text.slice(at.index + at.length, at.index + at.length + 6))
		);
	return AFTER_CITY[locale]!.test(text.slice(at.index + at.length, at.index + at.length + 44));
}

function excerpt(text: string, at: { index: number; length: number }): string {
	return text.slice(Math.max(0, at.index - 60), at.index + at.length + 60);
}

test.describe('First mention of Malaga names the country', () => {
	for (const locale of LOCALES) {
		for (const enPath of PAGES) {
			test(`${locale} ${enPath}`, async ({ request }) => {
				const path = await localized(locale, enPath);
				expect(path, `${enPath} must be published in ${locale}`).not.toBeNull();
				const res = await request.get(path!);
				expect(res.status()).toBe(200);
				const html = await res.text();

				expect(
					html,
					`${locale} ${path}: a {city:...} token leaked into the served HTML`
				).not.toMatch(/[{\uff5b]\s*city\s*[:\uff1a]/i);

				const body = mainText(html);
				// A parse failure must not pass as "no mention".
				expect(
					body.length,
					`${locale} ${path}: the text of <main> is empty or too short (parser failure?)`
				).toBeGreaterThanOrEqual(MIN_BODY_LENGTH);
				const first = firstMention(body);
				if (first) {
					expect(
						hasCountry(locale, body, first),
						`${locale} ${path}: first mention of Malaga in <main> has no country: "...${excerpt(body, first)}..."`
					).toBe(true);
				}

				const description = metaDescription(html);
				const inDescription = firstMention(description);
				// On a package detail page the description is the package desc with its token rendered
				// WITH when the result fits in 160 characters, so the same rule holds on all 12 pages.
				if (inDescription && description.length + FORM_LENGTH[locale] <= 160) {
					expect(
						hasCountry(locale, description, inDescription),
						`${locale} ${path}: the description mentions Malaga without the country and still fits in 160 characters: "${description}"`
					).toBe(true);
				}
			});
		}
	}

	// The listing pages render the shared package copy PLAIN: the WITH wording of the Eco Pack
	// desc (country inside the phrase) belongs to the package detail page only.
	const ECO_WITH: Partial<Record<Locale, string>> = {
		de: 'Partyanlage in Malaga, Spanien',
		'zh-hans': '西班牙马拉加小型派对'
	};
	for (const [locale, phrase] of Object.entries(ECO_WITH) as [Locale, string][]) {
		for (const enPath of ['/', '/packages/', '/equipment/']) {
			test(`${locale} ${enPath} does not show the package desc with the country`, async ({
				request
			}) => {
				const html = decode(await (await request.get((await localized(locale, enPath))!)).text());
				expect(html).not.toContain(phrase);
			});
		}
	}

	// Guard against a parser that silently sees nothing: the home overview always names the city.
	test('the body parser reads <main> of the home page', async ({ request }) => {
		const body = mainText(await (await request.get('/')).text());
		expect(body.length).toBeGreaterThan(500);
		expect(firstMention(body)).not.toBeNull();
	});
});

test.describe('mainText parser', () => {
	test('keeps the rest of <main> after a <script> that contains "</div>"', () => {
		const html = `<html lang="en"><body><header>Header Malaga</header><main>
			<h1>Title Malaga</h1><p>One.</p>
			<script>const t = "<div>x</div>"; const u = '</p>';</script>
			<style>.a > .b { color: red }</style>
			<p>Two <a href="/x" title="a > b">three</a>.</p>
			<address>Av. de Barcelona, 34, 29009 Málaga</address>
			<blockquote lang="es">Reseña en Málaga</blockquote>
			<img src="x.webp" alt="Málaga"><br>
			<svg><path d="M0 0" /></svg>
			<p>Four &amp; five.</p></main><footer>Footer Malaga</footer></body></html>`;
		expect(mainText(html)).toBe('One. Two three . Four & five.');
	});

	test('firstMention skips the brand and the NAP address', () => {
		const text = 'Malaga Event Gear, 29009 Málaga. We serve Malaga, Spain.';
		const at = firstMention(text)!;
		expect(text.slice(at.index)).toMatch(/^Malaga, Spain/);
		expect(hasCountry('en', text, at)).toBe(true);
		expect(
			hasCountry(
				'zh-hans',
				'我们在马拉加（西班牙）服务',
				firstMention('我们在马拉加（西班牙）服务')!
			)
		).toBe(true);
		expect(
			hasCountry('zh-hans', '我们在西班牙马拉加服务', firstMention('我们在西班牙马拉加服务')!)
		).toBe(true);
		expect(hasCountry('zh-hans', '我们在马拉加服务', firstMention('我们在马拉加服务')!)).toBe(
			false
		);
	});
});
