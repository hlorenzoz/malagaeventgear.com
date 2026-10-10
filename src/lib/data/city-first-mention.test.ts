import { describe, expect, it } from 'vitest';
import type { DataCopy } from '$lib/i18n/data-copy';
import {
	CITY_TOKEN_LEFTOVER,
	PRICE_POINTS,
	formatPrice,
	packages,
	renderCityFirst,
	renderTokens,
	withPrices
} from './packages';

/**
 * The `{city:WITH|PLAIN}` token (CLAUDE.md section 5, "Malaga, Spain"). The first geographic
 * mention of Malaga on a page names the country, and later ones do not. Package copy is shared
 * by the home, /equipment/, /packages/ and the package detail page, so the country cannot be
 * written into it: it would repeat on every page that lists the packages. The copy carries both
 * wordings instead, and only the package detail page asks for the first one.
 */

describe('{city:WITH|PLAIN} token', () => {
	it('renders the plain wording by default, everywhere', () => {
		expect(withPrices('PA hire in {city:Malaga, Spain,|Malaga,} ideal for parties', 'en')).toBe(
			'PA hire in Malaga, ideal for parties'
		);
		expect(withPrices('{city:西班牙马拉加|马拉加}小型派对', 'zh-hans')).toBe('马拉加小型派对');
	});

	it('keeps the token for the caller that will pick the first mention, and still renders prices', () => {
		expect(
			withPrices('{city:Malaga, Spain|Malaga} (+{price:projectorScreen})', 'en', { city: 'keep' })
		).toBe(`{city:Malaga, Spain|Malaga} (+${formatPrice(PRICE_POINTS.projectorScreen, 'en')})`);
	});

	it('renderTokens passes the option down to every string', () => {
		const copy = { desc: 'in {city:Malaga, Spain|Malaga}', list: ['{city:A|B}'] };
		expect(renderTokens(copy, 'en')).toEqual({ desc: 'in Malaga', list: ['B'] });
		expect(renderTokens(copy, 'en', { city: 'keep' })).toEqual(copy);
	});

	it('throws on a near miss too: a space, a capital letter or full width punctuation', () => {
		for (const text of ['{ city:A|B}', '{City:A|B}', '\uff5bcity\uff1aA|B}', '{city :A|B}']) {
			expect(() => withPrices(text, 'en'), text).toThrow(/city token/);
			expect(() => renderCityFirst([text]), text).toThrow(/city token/);
		}
	});

	it('throws on a malformed token, so a typo fails the prerender', () => {
		expect(() => withPrices('in {city:Malaga, Spain}', 'en')).toThrow(/city token/);
		expect(() => withPrices('in {city:Malaga|}', 'en')).toThrow(/city token/);
	});
});

describe('renderCityFirst', () => {
	it('names the country on the first token of the ordered texts and nowhere else', () => {
		expect(
			renderCityFirst([
				'hire in {city:Malaga, Spain|Malaga}',
				'delivery ({city:Malaga, Spain|Malaga})'
			])
		).toEqual(['hire in Malaga, Spain', 'delivery (Malaga)']);
	});

	it('falls through to a later text when the first has no token', () => {
		expect(
			renderCityFirst(['Ideal for small parties', 'delivery ({city:Malaga, Spain|Malaga})'])
		).toEqual(['Ideal for small parties', 'delivery (Malaga, Spain)']);
	});

	it('only the first token of one text gets the country', () => {
		expect(renderCityFirst(['{city:A|a} then {city:B|b}'])).toEqual(['A then b']);
	});

	it('leaves texts without a token untouched', () => {
		expect(renderCityFirst(['one', 'two'])).toEqual(['one', 'two']);
	});
});

describe('where the token may be written', () => {
	const WELL_FORMED = /\{city:[^|{}]+\|[^|{}]+\}/g;
	// A global regex keeps `lastIndex` between `.test` calls: use a fresh, non global one to test a line.
	const WELL_FORMED_ONCE = new RegExp(WELL_FORMED.source);

	const dataFiles = import.meta.glob<DataCopy>('../i18n/data/*.ts', {
		eager: true,
		import: 'default'
	});
	// The route folder has parentheses, which a glob reads as a group: match it with `**`.
	const copyModules = import.meta.glob<unknown>(
		['../i18n/messages/*.ts', '/src/routes/**/i18n/*.ts'],
		{
			eager: true,
			import: 'default'
		}
	);
	const rawFaq = Object.values(
		import.meta.glob<string>('./faq.ts', { eager: true, query: '?raw', import: 'default' })
	)[0];

	/** Every string of a value with the path that leads to it. */
	function strings(value: unknown, path: string, out: [string, string][] = []): [string, string][] {
		if (typeof value === 'string') out.push([path, value]);
		else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out));
		else if (value && typeof value === 'object')
			for (const [k, v] of Object.entries(value)) strings(v, `${path}.${k}`, out);
		return out;
	}

	it('the English catalog source carries none: /llms.txt and the schema read it without rendering', () => {
		const offenders = packages.flatMap((pkg) =>
			strings(pkg, `packages.ts ${pkg.slug}`)
				.filter(([, text]) => text.includes('{city'))
				.map(([path]) => path)
		);
		expect(offenders).toEqual([]);
	});

	it('in the translated package catalog, only a package desc carries it', () => {
		const offenders: string[] = [];
		const check = (label: string, value: unknown) => {
			for (const [path, text] of strings(value, label)) {
				if (text.includes('{city') && !/\.desc$/.test(path)) offenders.push(path);
			}
		};
		for (const [file, copy] of Object.entries(dataFiles)) {
			for (const [slug, pkgCopy] of Object.entries(copy.packages))
				check(`${file} ${slug}`, pkgCopy);
			check(`${file} faqs`, copy.faqs);
			check(`${file} gallery`, copy.gallery);
		}
		expect(offenders).toEqual([]);
	});

	it('in page copy and dictionaries, only benefits.delivery of the package detail page carries it', () => {
		// By object path, not by source line: `delivery:` is also a key of the FAQ block of that
		// same file, and a formatter may wrap a value onto the next line.
		const offenders: string[] = [];
		for (const [file, copy] of Object.entries(copyModules)) {
			const detailPage = file.includes('/packages/[slug]/i18n/');
			for (const [path, text] of strings(copy, file)) {
				if (!CITY_TOKEN_LEFTOVER.test(text)) continue;
				if (detailPage && path === `${file}.benefits.delivery`) continue;
				offenders.push(path);
			}
		}
		expect(offenders).toEqual([]);
		expect(CITY_TOKEN_LEFTOVER.test(rawFaq)).toBe(false);
	});

	it('every token is well formed', () => {
		const malformed: string[] = [];
		const check = (label: string, text: string) => {
			if (CITY_TOKEN_LEFTOVER.test(text.replace(WELL_FORMED, ''))) malformed.push(label);
		};
		for (const [file, copy] of Object.entries(dataFiles)) {
			for (const [path, text] of strings(copy, file)) check(path, text);
		}
		for (const [file, copy] of Object.entries(copyModules)) {
			for (const [path, text] of strings(copy, file)) check(path, text);
		}
		expect(malformed).toEqual([]);
	});

	it('the package detail page has the token in benefits.delivery in every locale', () => {
		const detailPages = Object.entries(copyModules).filter(([file]) =>
			file.includes('/packages/[slug]/i18n/')
		);
		// 13 locales: a glob that matches nothing must not pass as "nothing is missing".
		expect(detailPages).toHaveLength(13);
		const missing = detailPages
			.filter(([, copy]) => {
				const delivery = (copy as { benefits: { delivery: string } }).benefits.delivery;
				return !WELL_FORMED_ONCE.test(delivery);
			})
			.map(([file]) => file);
		expect(missing).toEqual([]);
	});
});
