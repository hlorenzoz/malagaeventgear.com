/**
 * Pure checks of a translated post against its English source (CLAUDE.md, "Posts traducidos",
 * "Reglas de traduccion", rules 11 and 12). No I/O: check.ts reads the files and prints. Every
 * function works on strings, so it runs on small fixtures.
 *
 * Ported from the scratchpad scripts of the first translation batches (orchestrator-check,
 * kwcount, parity, collide, anch), with the quote count fixed: a raw `<blockquote>` and a
 * markdown `>` block are both counted, on the English and on the translation alike.
 */
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import { LOCALE_META, type Locale } from '../../src/lib/i18n/locales';

export const TITLE_MAX = 65;
export const DESCRIPTION_MAX = 160;
/** Exactly these frontmatter keys, sorted (CLAUDE.md, "Posts traducidos", Frontmatter). */
export const TRANSLATION_KEYS = ['description', 'excerpt', 'publishDate', 'sourceUpdated', 'title'];
/** The only optional key: the last real change of the translation itself (CLAUDE.md, rule 11). */
export const OPTIONAL_KEYS = ['updatedDate'];

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

export interface ParsedPost {
	frontmatter: string;
	body: string;
	/** Top level keys in file order. */
	keys: string[];
	/** Single line values, unquoted. */
	values: Record<string, string>;
}

function unquote(raw: string): string {
	const v = raw.trim();
	if (v.length >= 2 && v.startsWith('"') && v.endsWith('"'))
		return v.slice(1, -1).replace(/\\(["\\])/g, '$1');
	if (v.length >= 2 && v.startsWith("'") && v.endsWith("'"))
		return v.slice(1, -1).replace(/''/g, "'");
	return v;
}

/** Splits a post into frontmatter and body. Null when there is no closed frontmatter block. */
export function parsePost(text: string): ParsedPost | null {
	const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text);
	if (!m) return null;
	const frontmatter = m[1];
	const keys: string[] = [];
	const values: Record<string, string> = {};
	for (const line of frontmatter.split(/\r?\n/)) {
		const k = /^([A-Za-z_][\w-]*):(.*)$/.exec(line);
		if (!k) continue;
		keys.push(k[1]);
		values[k[1]] = unquote(k[2]);
	}
	return { frontmatter, body: text.slice(m[0].length), keys, values };
}

/** The date a translation must record in `sourceUpdated`: `updatedDate ?? publishDate`, YYYY-MM-DD. */
export function sourceDateOf(values: Record<string, string>): string | null {
	const raw = values.updatedDate || values.publishDate;
	return raw ? raw.slice(0, 10) : null;
}

// ---------------------------------------------------------------------------
// Prose view of a text
// ---------------------------------------------------------------------------

const blank = (m: string) => m.replace(/[^\n]/g, ' ');

/** Blanks script, style and fenced code blocks, keeping every line break. */
export function blankBlocks(text: string): string {
	return text
		.replace(/<script[\s\S]*?<\/script>/g, blank)
		.replace(/<style[\s\S]*?<\/style>/g, blank)
		.replace(/^(```|~~~)[\s\S]*?^\1/gm, blank);
}

/** Prose only: also blanks inline code, HTML entities and `style` attributes. */
export function stripCode(text: string): string {
	return blankBlocks(text)
		.replace(/`[^`\n]*`/g, blank)
		.replace(/&#?\w+;/g, blank)
		.replace(/\sstyle="[^"]*"/g, blank);
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

const FORBIDDEN: [string, RegExp][] = [
	['em dash', /\u2014/g],
	['en dash', /\u2013/g],
	['curly single quote', /[\u2018\u2019\u201A\u201B]/g],
	['curly double quote', /[\u201C\u201D\u201E\u201F]/g],
	['ellipsis', /\u2026/g],
	['no break space', /[\u00A0\u202F\u2007]/g],
	['bullet', /\u2022/g],
	['guillemet', /[\u00AB\u00BB\u2039\u203A]/g]
];

export interface ForbiddenFinding {
	name: string;
	count: number;
	/** 1 based line of the first occurrence. */
	line: number;
}

/** The typographic characters of rule 12, over the whole text. Chinese full width punctuation is fine. */
export function findForbiddenChars(text: string): ForbiddenFinding[] {
	const lines = text.split('\n');
	const found: ForbiddenFinding[] = [];
	for (const [name, re] of FORBIDDEN) {
		let count = 0;
		let line = 0;
		lines.forEach((l, i) => {
			const n = (l.match(re) ?? []).length;
			if (n > 0) {
				count += n;
				if (line === 0) line = i + 1;
			}
		});
		if (count > 0) found.push({ name, count, line });
	}
	return found;
}

/** 1 based lines with an ASCII semicolon in prose (not in script, code, entities or style). */
export function findSemicolons(text: string): number[] {
	const lines: number[] = [];
	stripCode(text)
		.split('\n')
		.forEach((l, i) => {
			if (l.includes(';')) lines.push(i + 1);
		});
	return lines;
}

/** Cantonese colloquial characters, in this list's order. A standard compound (a stripped one) is fine. */
const CANTONESE = [...'嘅咗喺啲冇係慳唔佢嘢'];
const CANTONESE_STANDARD = ['關係'];

export function findCantonese(text: string): string[] {
	let t = text;
	for (const word of CANTONESE_STANDARD) t = t.replaceAll(word, '');
	return CANTONESE.filter((c) => t.includes(c));
}

/** Characters that exist only in simplified Chinese, which must not leak into zh-tw and zh-hk. */
const SIMPLIFIED = [
	...'这个们为对时发过还说无会务设备视频动区单专业应术线网络认请该买卖开关联门问题际现实种类样让组织规进运选择优预约确费税价银场灯麦风显间声乐机装级传输'
];

export function findSimplified(text: string): string[] {
	return SIMPLIFIED.filter((c) => text.includes(c));
}

// ---------------------------------------------------------------------------
// Structure parity with the English
// ---------------------------------------------------------------------------

/** Markdown `>` blocks plus raw `<blockquote>` elements, each counted once. */
export function countQuotes(body: string): number {
	const s = stripCode(body);
	const raw = (s.match(/<blockquote\b/g) ?? []).length;
	let blocks = 0;
	let inQuote = false;
	for (const line of s.split('\n')) {
		const isQuote = /^\s{0,3}>/.test(line);
		if (isQuote && !inQuote) blocks++;
		inQuote = isQuote;
	}
	return raw + blocks;
}

export interface Structure {
	/** Heading levels in order (h2 to h6). */
	headings: number[];
	/** Image URLs in order. */
	images: string[];
	cta: number;
	marquee: number;
	quotes: number;
	tableRows: number;
}

const IMAGE_RE = /!\[[^\]]*\]\(\s*<?([^)\s>"]+)|<img\b[^>]*?\ssrc=["']([^"']+)["']/g;

export function structureOf(body: string): Structure {
	const s = stripCode(body);
	const headings = [...s.matchAll(/^(#{2,6})\s+\S/gm)].map((m) => m[1].length);
	const images = [...s.matchAll(IMAGE_RE)].map((m) => m[1] ?? m[2]);
	return {
		headings,
		images,
		cta: (s.match(/<InlineCTA\b/g) ?? []).length,
		marquee: (s.match(/<ImageMarquee\b/g) ?? []).length,
		quotes: countQuotes(body),
		tableRows: (s.match(/^\|/gm) ?? []).length
	};
}

/** `h2/h3/images/InlineCTA/ImageMarquee/quotes/table rows`, for the report table. */
export function describeStructure(s: Structure): string {
	const h = (level: number) => s.headings.filter((x) => x === level).length;
	return [h(2), h(3), s.images.length, s.cta, s.marquee, s.quotes, s.tableRows].join('/');
}

export function compareStructure(en: Structure, loc: Structure): string[] {
	const issues: string[] = [];
	if (en.headings.join(',') !== loc.headings.join(',')) {
		issues.push(
			`headings differ: English levels ${en.headings.join(',')} (${en.headings.length}), translation ${loc.headings.join(',')} (${loc.headings.length})`
		);
	}
	if (en.images.length !== loc.images.length) {
		issues.push(`images: English ${en.images.length}, translation ${loc.images.length}`);
	} else if (en.images.join('|') !== loc.images.join('|')) {
		const same = [...en.images].sort().join('|') === [...loc.images].sort().join('|');
		issues.push(same ? 'images: same files in a different order' : 'images: different URLs');
	}
	if (en.cta !== loc.cta) issues.push(`InlineCTA: English ${en.cta}, translation ${loc.cta}`);
	if (en.marquee !== loc.marquee)
		issues.push(`ImageMarquee: English ${en.marquee}, translation ${loc.marquee}`);
	if (en.quotes !== loc.quotes)
		issues.push(`quotes: English ${en.quotes}, translation ${loc.quotes}`);
	if (en.tableRows !== loc.tableRows)
		issues.push(`table rows: English ${en.tableRows}, translation ${loc.tableRows}`);
	return issues;
}

// ---------------------------------------------------------------------------
// Links and numbers
// ---------------------------------------------------------------------------

/**
 * Link targets of a body without their fragment, sorted, duplicates kept. In-page anchors are
 * left out (they follow the translated headings). The Top Group Express link changes with the
 * language by design (CLAUDE.md lessons: fr, it, zh, others en), so it is one target.
 */
export function linksOf(body: string): string[] {
	const s = stripCode(body);
	const targets: string[] = [];
	for (const m of s.matchAll(/\]\(\s*<?([^)\s>"]+)/g)) targets.push(m[1]);
	for (const m of s.matchAll(/\bhref=["']([^"']+)["']/g)) targets.push(m[1]);
	return targets
		.map((t) => t.split('#')[0].split('?')[0])
		.filter((t) => /^(\/|https?:|mailto:|tel:)/.test(t))
		.map((t) => t.replace(/^(https:\/\/topgroupexpress\.com)\/[a-z-]+/, '$1/<lang>'))
		.sort();
}

// A Chinese afternoon or evening clock time, read in 24 hours like "11pm". The part of the day
// comes before the hour (xiawu, bangwan, wanshang) and dian or shi after it, then optional
// minutes ("30 fen", or ban for half past). A range names the part of the day once: its second
// hour ("8 dian dao 11 dian") is read the same way. Night words that also cover the small hours
// (yejian, yewan, wanjian) are left alone on purpose: "yejian 1 dian" is 1am.
const ZH_HOUR = String.raw`(\d{1,2})\s*(?:[\u70B9\u9EDE\u65F6\u6642]\s*(?:(\d{1,2})\s*\u5206?|(\u534A))?|:(\d{2}))`;
const ZH_PM_CLOCK = new RegExp(
	String.raw`(\u4E0B\u5348|\u508D\u665A|\u665A\u4E0A)\s*` +
		ZH_HOUR +
		String.raw`(?:(\s*[\u5230\u81F3~-]\s*)` +
		ZH_HOUR +
		')?',
	'g'
);
/** 12 at night (wanshang) is midnight, 0, like "12am". Any other afternoon hour adds 12. */
function zhPm(word: string, hour: string, min?: string, half?: string, colonMin?: string): string {
	const h = Number(hour);
	const hour24 = h === 12 ? (word === '晚上' ? 0 : 12) : h < 12 ? h + 12 : h;
	return `${hour24}:${(colonMin ?? (half ? '30' : (min ?? '00'))).padStart(2, '0')} `;
}
function zhPmClock(_m: string, word: string, ...g: (string | undefined)[]): string {
	const [h1, m1, half1, c1, sep, h2, m2, half2, c2] = g;
	const first = zhPm(word, h1!, m1, half1, c1);
	return h2 ? `${first}${sep}${zhPm(word, h2, m2, half2, c2)}` : first;
}

/**
 * The digit groups of a body, sorted: without link targets, URLs and the script block, with
 * thousand separators removed (1.000, 1,000 and 1 000 are 1000) and clock times read in 24 hours
 * (8:00 pm and 20:00 Uhr are 20). 1996 is skipped: the founding year boilerplate is allowed to move.
 */
export function numbersOf(body: string): string[] {
	const s = stripCode(body)
		.replace(/\]\([^)]*\)/g, ']')
		.replace(/\b(?:href|src|srcset)=("[^"]*"|'[^']*')/g, '')
		.replace(/https?:\/\/\S+/g, '')
		// A star rating is spelled out in some languages ("cinq etoiles") and a Chinese month is a
		// number where the others write the month name: neither is a fact that can drift.
		.replace(
			/\b[1-5][\s-]*(?:stars?|stern\w*|\u00E9toiles?|estrellas?|estrelas?|stelle|stjern\w*|stj\u00E4rn\w*|sterren)/gi,
			''
		)
		.replace(/[1-5]\s*\u661F/g, '')
		.replace(/\d{1,2}\s*\u6708/g, '')
		.replace(ZH_PM_CLOCK, zhPmClock)
		.replace(
			/(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\b\.?/gi,
			(_m, h: string, min: string | undefined, ap: string) => {
				const hour = (Number(h) % 12) + (ap.toLowerCase() === 'p' ? 12 : 0);
				return `${hour}:${min ?? '00'}`;
			}
		)
		.replace(/(\d)[.,\u00A0\u202F](\d{3})(?!\d)/g, '$1$2')
		.replace(/(?<![\d.,])(\d{1,3})[ \u00A0\u202F](\d{3})(?!\d)/g, '$1$2')
		.replace(/(?<!\d)(\d{1,2})[:.h]00(?!\d)/g, '$1');
	return (s.match(/\d+/g) ?? []).filter((n) => n !== '1996').sort();
}

/** Multiset difference: what `a` has that `b` lacks, and what `b` has that `a` lacks. */
export function diffMultiset(a: string[], b: string[]): { missing: string[]; extra: string[] } {
	const count = (xs: string[]) => {
		const m = new Map<string, number>();
		for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1);
		return m;
	};
	const ca = count(a);
	const cb = count(b);
	const missing: string[] = [];
	const extra: string[] = [];
	for (const [k, n] of ca) for (let i = 0; i < n - (cb.get(k) ?? 0); i++) missing.push(k);
	for (const [k, n] of cb) for (let i = 0; i < n - (ca.get(k) ?? 0); i++) extra.push(k);
	return { missing, extra };
}

// ---------------------------------------------------------------------------
// Keyword and slug
// ---------------------------------------------------------------------------

const hasCjk = (s: string) => /[\u3400-\u9fff]/.test(s);
const flat = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const squash = (s: string) => s.toLowerCase().replace(/\s+/g, '');

/** First prose paragraph of a body: skips script, components, headings, lists, tables and images. */
export function firstParagraph(body: string): string {
	for (const block of blankBlocks(body).split(/\n\s*\n/)) {
		const t = block.trim();
		if (!t) continue;
		if (/^(#|<|!\[|\||-\s|\*\s|\d+\.\s|>|import\b)/.test(t)) continue;
		return t;
	}
	return '';
}

export interface KeywordUsage {
	/** Exact (case insensitive) occurrences in the body. */
	count: number;
	inFirstParagraph: boolean;
	inTitle: boolean;
}

/** Counts the keyword as the EXACT string, never an inflected form. Chinese ignores spaces. */
export function keywordUsage(body: string, keyword: string, title: string): KeywordUsage {
	const kw = flat(keyword);
	const kw2 = kw.replace(/ /g, '');
	const cjk = hasCjk(kw);
	const has = (haystack: string) => {
		const h = flat(haystack);
		return h.includes(kw) || (cjk && h.includes(kw2));
	};
	const occurrences = (haystack: string, needle: string) =>
		needle ? haystack.split(needle).length - 1 : 0;
	const text = flat(blankBlocks(body));
	return {
		count: Math.max(occurrences(text, kw), cjk ? occurrences(text, kw2) : 0),
		inFirstParagraph: has(firstParagraph(body)),
		inTitle: has(title)
	};
}

/**
 * A post keyword must neither contain nor be contained in another keyword of the locale (pages,
 * packages, posts), ignoring case and spaces, so Chinese substrings are caught too. `related` are
 * the post slugs exempt from the comparison: the pillar of this post and its supporting posts,
 * which reuse the pillar head term by design (see "Pillar head term" in brief-base.md).
 */
export function keywordCollisions(
	slug: string,
	map: LocaleContentMap,
	related: readonly string[] = []
): string[] {
	const mine = map.posts[slug]?.keyword;
	if (!mine) return [];
	const k = squash(mine);
	const others: [string, string][] = [];
	for (const [key, v] of Object.entries(map.pages))
		if (v.keyword) others.push([`page ${key}`, v.keyword]);
	for (const [key, v] of Object.entries(map.packages)) others.push([`pkg ${key}`, v.keyword]);
	for (const [key, v] of Object.entries(map.posts))
		if (key !== slug && !related.includes(key)) others.push([`post ${key}`, v.keyword]);
	const issues: string[] = [];
	for (const [label, keyword] of others) {
		const o = squash(keyword);
		if (!o) continue;
		const relation =
			o === k
				? 'is equal to it'
				: o.includes(k)
					? 'contains it'
					: k.includes(o)
						? 'is contained in it'
						: null;
		if (relation)
			issues.push(`keyword "${mine}" collides with ${label} "${keyword}" (${relation})`);
	}
	return issues;
}

/**
 * The posts of the same silo as `slug`: its pillar (from its `targetPage`) and, when it is a
 * pillar, every post whose `targetPage` points to it. `targetPages` maps each English post slug
 * to its frontmatter `targetPage` ('' or '/' for none).
 */
export function siloRelatives(slug: string, targetPages: Record<string, string>): string[] {
	const relatives = new Set<string>();
	const own = /^\/blog\/([^/]+)\/$/.exec(targetPages[slug] ?? '');
	if (own) relatives.add(own[1]);
	for (const [other, target] of Object.entries(targetPages)) {
		if (other !== slug && target === `/blog/${slug}/`) relatives.add(other);
	}
	return [...relatives];
}

/** The post slug must be unique among the locale's pages, packages, categories, segments and posts. */
export function slugCollisions(slug: string, map: LocaleContentMap): string[] {
	const mine = map.posts[slug]?.slug;
	if (!mine) return [];
	const used: [string, string][] = [];
	for (const [key, v] of Object.entries(map.pages)) {
		used.push([`page ${key}`, v.path.split('/').filter(Boolean).pop() ?? '']);
	}
	for (const [key, v] of Object.entries(map.packages)) used.push([`package ${key}`, v.slug]);
	for (const [key, v] of Object.entries(map.categories)) used.push([`category ${key}`, v.slug]);
	for (const [key, v] of Object.entries(map.segments)) used.push([`segment ${key}`, v]);
	for (const [key, v] of Object.entries(map.posts))
		if (key !== slug) used.push([`post ${key}`, v.slug]);
	return used
		.filter(([, s]) => s === mine)
		.map(([label]) => `slug "${mine}" is already used by ${label}`);
}

// ---------------------------------------------------------------------------
// One locale
// ---------------------------------------------------------------------------

export interface CheckInput {
	locale: string;
	slug: string;
	/** Raw English post. */
	english: string;
	/** Raw translation, null when the file does not exist. */
	text: string | null;
	map: LocaleContentMap | undefined;
	/** UTC date, YYYY-MM-DD: a publishDate after it is skipped by the build. */
	today: string;
	/** Post slugs exempt from the keyword collision check (the silo of this post). */
	relatedSlugs?: readonly string[];
	/** Keyword usage and small number differences fail the check instead of only warning. */
	strict?: boolean;
}

export interface LocaleReport {
	locale: string;
	/** Problems: the check fails. */
	issues: string[];
	/** Keyword usage notes: they only fail the check in strict mode. */
	warnings: string[];
	titleLength: number | null;
	descriptionLength: number | null;
	keyword: string | null;
	keywordCount: number;
	keywordInFirstParagraph: boolean;
	keywordInTitle: boolean;
	structure: string;
}

const length = (s: string) => [...s].length;
const list = (xs: string[], max = 6) =>
	xs.length > max ? `${xs.slice(0, max).join(', ')} (+${xs.length - max})` : xs.join(', ');

export function checkLocale({
	locale,
	slug,
	english,
	text,
	map,
	today,
	relatedSlugs = [],
	strict = false
}: CheckInput): LocaleReport {
	const en = parsePost(english);
	if (!en) throw new Error(`the English post ${slug} has no frontmatter`);
	const enDate = sourceDateOf(en.values);
	const report: LocaleReport = {
		locale,
		issues: [],
		warnings: [],
		titleLength: null,
		descriptionLength: null,
		keyword: map?.posts[slug]?.keyword ?? null,
		keywordCount: 0,
		keywordInFirstParagraph: false,
		keywordInTitle: false,
		structure: ''
	};
	const issues = report.issues;
	if (text === null) {
		issues.push(`file is missing: src/content/blog/${locale}/${slug}.svx`);
		return report;
	}
	const post = parsePost(text);
	if (!post) {
		issues.push('no frontmatter block');
		return report;
	}
	const zh = locale.startsWith('zh');
	const { values } = post;

	// Frontmatter
	const keys = [...post.keys].sort();
	const required = keys.filter((k) => !OPTIONAL_KEYS.includes(k));
	if (required.join(',') !== TRANSLATION_KEYS.join(',')) {
		issues.push(
			`frontmatter keys are ${keys.join(',')} (expected ${TRANSLATION_KEYS.join(',')}, optionally ${OPTIONAL_KEYS.join(',')})`
		);
	}
	if (values.updatedDate !== undefined) {
		if (!/^\d{4}-\d{2}-\d{2}/.test(values.updatedDate))
			issues.push(`updatedDate "${values.updatedDate}" is not a date`);
		else if (values.updatedDate.slice(0, 10) > today)
			issues.push(`updatedDate ${values.updatedDate} is after today ${today} (UTC)`);
	}
	if ((values.sourceUpdated ?? '').slice(0, 10) !== enDate) {
		issues.push(
			`sourceUpdated is ${values.sourceUpdated ?? 'missing'} but the English post is ${enDate}`
		);
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(values.publishDate ?? '')) {
		issues.push(`publishDate "${values.publishDate ?? ''}" is not YYYY-MM-DD`);
	} else if (values.publishDate > today) {
		issues.push(
			`publishDate ${values.publishDate} is after today ${today} (UTC): the build skips the translation`
		);
	}
	for (const key of ['title', 'description', 'excerpt']) {
		if (!values[key]) issues.push(`${key} is empty`);
	}
	report.titleLength = length(values.title ?? '');
	report.descriptionLength = length(values.description ?? '');
	if (!zh && report.titleLength > TITLE_MAX)
		issues.push(`title is ${report.titleLength} characters (max ${TITLE_MAX})`);
	if (!zh && report.descriptionLength > DESCRIPTION_MAX) {
		issues.push(`description is ${report.descriptionLength} characters (max ${DESCRIPTION_MAX})`);
	}

	// Characters
	for (const f of findForbiddenChars(text))
		issues.push(`forbidden character: ${f.name} x${f.count} (first at line ${f.line})`);
	const semicolons = findSemicolons(text);
	if (semicolons.length > 0)
		issues.push(`semicolon in prose at line(s) ${list(semicolons.map(String))}`);
	if (locale === 'zh-hk') {
		const found = findCantonese(text);
		if (found.length > 0) issues.push(`Cantonese colloquial characters: ${found.join(' ')}`);
	}
	if (locale === 'zh-tw' || locale === 'zh-hk') {
		const found = findSimplified(text);
		if (found.length > 0)
			issues.push(`simplified characters in traditional text: ${found.join(' ')}`);
	}

	// Parity with the English
	const enStructure = structureOf(en.body);
	const locStructure = structureOf(post.body);
	report.structure = describeStructure(locStructure);
	issues.push(...compareStructure(enStructure, locStructure));
	const links = diffMultiset(linksOf(en.body), linksOf(post.body));
	if (links.missing.length + links.extra.length > 0) {
		issues.push(
			`links differ: missing ${list(links.missing) || '-'}, extra ${list(links.extra) || '-'}`
		);
	}
	const numbers = diffMultiset(numbersOf(en.body), numbersOf(post.body));
	const big = (xs: string[]) => xs.filter((n) => n.length > 1);
	const small = (xs: string[]) => xs.filter((n) => n.length === 1);
	if (big(numbers.missing).length + big(numbers.extra).length > 0) {
		issues.push(
			`numbers differ: missing ${list(big(numbers.missing)) || '-'}, extra ${list(big(numbers.extra)) || '-'}`
		);
	}
	// A single digit is often spelled out (un, eine, "cinq"), so it only warns unless strict.
	if (small(numbers.missing).length + small(numbers.extra).length > 0) {
		(strict ? issues : report.warnings).push(
			`small numbers differ (may be spelled out): missing ${list(small(numbers.missing)) || '-'}, extra ${list(small(numbers.extra)) || '-'}`
		);
	}

	// Content map entry, keyword and slug
	const entry = map?.posts[slug];
	if (!map || !entry) {
		issues.push(
			`missing from the content map (posts['${slug}'] in content-map/locales/${locale}.ts)`
		);
		return report;
	}
	issues.push(...keywordCollisions(slug, map, relatedSlugs), ...slugCollisions(slug, map));
	const usage = keywordUsage(post.body, entry.keyword, values.title ?? '');
	report.keywordCount = usage.count;
	report.keywordInFirstParagraph = usage.inFirstParagraph;
	report.keywordInTitle = usage.inTitle;
	const notes = strict ? issues : report.warnings;
	if (!usage.inFirstParagraph)
		notes.push(`keyword "${entry.keyword}" is not in the first paragraph`);
	if (usage.count < 2)
		notes.push(
			`keyword "${entry.keyword}" appears ${usage.count} time(s) in the body (need at least 2)`
		);
	if (!usage.inTitle) notes.push(`keyword "${entry.keyword}" is not verbatim in the title`);
	return report;
}

// ---------------------------------------------------------------------------
// Built page (anchor audit)
// ---------------------------------------------------------------------------

export interface PageAudit {
	lang: string | null;
	/** In-page links (`href="#..."`), main aside. */
	hrefs: number;
	/** In-page links whose target id does not exist. */
	missing: string[];
	h2: number;
	h3: number;
	images: number;
	/** Markdown that was printed as text (`![` or `](`). */
	rawMarkdown: boolean;
}

function decode(s: string): string {
	try {
		return decodeURIComponent(s);
	} catch {
		return s;
	}
}

export function auditBuiltPage(html: string): PageAudit {
	const visible = html
		.replace(/<script[\s\S]*?<\/script>/g, '')
		.replace(/<style[\s\S]*?<\/style>/g, '');
	const hrefs = [...visible.matchAll(/href="#([^"]+)"/g)].map((m) => decode(m[1]));
	const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decode(m[1])));
	const noCode = visible.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
	return {
		lang: /<html[^>]*\slang="([^"]+)"/.exec(html)?.[1] ?? null,
		hrefs: hrefs.length,
		missing: hrefs.filter((h) => h !== 'main' && !ids.has(h)),
		h2: (visible.match(/<h2[\s>]/g) ?? []).length,
		h3: (visible.match(/<h3[\s>]/g) ?? []).length,
		images: (visible.match(/<img\s/g) ?? []).length,
		rawMarkdown: /\]\(|!\[/.test(noCode)
	};
}

/** Problems of a built translated page, against the English page built from the same layout. */
export function pageAuditIssues(locale: string, loc: PageAudit, en: PageAudit): string[] {
	const issues: string[] = [];
	const expectedLang = LOCALE_META[locale as Locale]?.htmlLang;
	if (expectedLang && loc.lang !== expectedLang)
		issues.push(`built page lang is ${loc.lang} (expected ${expectedLang})`);
	if (loc.missing.length > 0)
		issues.push(
			`${loc.missing.length} broken in-page anchor(s): ${list(
				loc.missing.map((m) => `#${m}`),
				3
			)}`
		);
	if (loc.h2 !== en.h2) issues.push(`built page has ${loc.h2} h2 (English page ${en.h2})`);
	if (loc.h3 !== en.h3) issues.push(`built page has ${loc.h3} h3 (English page ${en.h3})`);
	if (loc.images !== en.images)
		issues.push(`built page has ${loc.images} images (English page ${en.images})`);
	if (loc.rawMarkdown) issues.push('markdown leaked into the built page as text');
	return issues;
}

/** True when the built page is older than any of the sources it was built from (or absent). */
export function isBuildStale(builtMtimeMs: number | null, sourceMtimesMs: number[]): boolean {
	return builtMtimeMs === null || sourceMtimesMs.some((s) => s > builtMtimeMs);
}
