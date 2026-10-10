import { describe, expect, it } from 'vitest';
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import {
	type CheckInput,
	auditBuiltPage,
	checkLocale,
	compareStructure,
	countQuotes,
	describeStructure,
	diffMultiset,
	findCantonese,
	findForbiddenChars,
	findSemicolons,
	findSimplified,
	firstParagraph,
	isBuildStale,
	keywordCollisions,
	keywordUsage,
	linksOf,
	numbersOf,
	pageAuditIssues,
	parsePost,
	siloRelatives,
	slugCollisions,
	sourceDateOf,
	stripCode,
	structureOf
} from './check-lib';

// Test inputs build the forbidden characters from code points so this file stays ASCII.
const EM = String.fromCodePoint(0x2014);
const EN = String.fromCodePoint(0x2013);
const LQ = String.fromCodePoint(0x201c);
const RQ = String.fromCodePoint(0x201d);
const RSQ = String.fromCodePoint(0x2019);
const ELL = String.fromCodePoint(0x2026);
const NBSP = String.fromCodePoint(0xa0);
const BULLET = String.fromCodePoint(0x2022);
const GUILL = String.fromCodePoint(0xab);

describe('parsePost', () => {
	it('splits frontmatter and body and reads keys and unquoted values', () => {
		const p = parsePost(
			'---\ntitle: "A \\"b\\" c"\ndescription: \'It\'\'s\'\nsourceUpdated: 2026-09-30\n---\n\nBody\n'
		)!;
		expect(p.keys).toEqual(['title', 'description', 'sourceUpdated']);
		expect(p.values.title).toBe('A "b" c');
		expect(p.values.description).toBe("It's");
		expect(p.values.sourceUpdated).toBe('2026-09-30');
		expect(p.body.trim()).toBe('Body');
	});
	it('returns null without frontmatter', () => {
		expect(parsePost('No frontmatter here')).toBeNull();
		expect(parsePost('---\ntitle: x\n')).toBeNull();
	});
});

describe('sourceDateOf', () => {
	it('prefers updatedDate over publishDate and keeps the day only', () => {
		expect(sourceDateOf({ publishDate: '2026-01-02', updatedDate: '2026-03-04' })).toBe(
			'2026-03-04'
		);
		expect(sourceDateOf({ publishDate: '2026-01-02T00:00:00.000Z' })).toBe('2026-01-02');
		expect(sourceDateOf({})).toBeNull();
	});
});

describe('stripCode', () => {
	it('blanks script, fenced code, inline code, entities and style attributes, keeping lines', () => {
		const src =
			'<script>\nlet a = 1;\n</script>\nText &amp; more `x;y`\n```\nz;\n```\n<div style="a:b;">k</div>\n';
		const out = stripCode(src);
		expect(out.split('\n').length).toBe(src.split('\n').length);
		expect(out).not.toContain(';');
		expect(out).toContain('Text');
		expect(out).toContain('more');
	});
});

describe('findForbiddenChars', () => {
	it('names each forbidden character with its count and first line', () => {
		const text = `one ${EM} two\nthree ${EN} four ${EN}\n${LQ}q${RQ} it${RSQ}s ${ELL} a${NBSP}b ${BULLET} ${GUILL}x`;
		const found = findForbiddenChars(text);
		const by = Object.fromEntries(found.map((f) => [f.name, f]));
		expect(by['em dash'].count).toBe(1);
		expect(by['en dash'].count).toBe(2);
		expect(by['en dash'].line).toBe(2);
		expect(by['curly double quote'].count).toBe(2);
		expect(by['curly single quote'].count).toBe(1);
		expect(by['ellipsis'].count).toBe(1);
		expect(by['no break space'].count).toBe(1);
		expect(by['bullet'].count).toBe(1);
		expect(by['guillemet'].count).toBe(1);
	});
	it('accepts plain ASCII and Chinese full width punctuation', () => {
		expect(findForbiddenChars('Plain "quotes" and it\'s fine... ok')).toEqual([]);
		expect(findForbiddenChars('你好，世界。「引用」；')).toEqual([]);
	});
});

describe('findSemicolons', () => {
	it('lists the lines with a semicolon in prose only', () => {
		const text =
			'---\ntitle: "a; b"\n---\n<script>\nlet x = 1;\n</script>\n\nGood.\nBad; here.\nEntity &nbsp; and `code;` fine.\n';
		expect(findSemicolons(text)).toEqual([2, 9]);
	});
});

describe('findCantonese', () => {
	it('flags colloquial characters but not the standard compound', () => {
		expect(findCantonese('\u4f5c\u70ba\u9019\u500b喺\u9019\u88e1')).toEqual(['喺']);
		expect(findCantonese('關係\u5f88\u91cd\u8981')).toEqual([]);
	});
	it('flags a lone colloquial copula and lists each character once, in list order', () => {
		expect(findCantonese('\u6211係\u4f60')).toEqual(['係']);
		expect(findCantonese('\u4f60係喺喺關係')).toEqual(['喺', '係']);
	});
});

describe('findSimplified', () => {
	it('flags simplified only characters and ignores traditional text', () => {
		expect(findSimplified('这个活动')).toEqual(expect.arrayContaining(['这', '个']));
		expect(findSimplified('這個活動視聳')).toEqual([]);
	});
});

describe('countQuotes', () => {
	it('counts a raw blockquote and a markdown quote block each once, on any side', () => {
		const raw = '<blockquote>\n<p>x</p>\n</blockquote>\n';
		const md = '> quote line one\n>\n> quote line two\n';
		expect(countQuotes(raw)).toBe(1);
		expect(countQuotes(md)).toBe(1);
		expect(countQuotes(raw + '\ntext\n\n' + md)).toBe(2);
		expect(countQuotes(md + '\ntext\n\n' + md)).toBe(2);
	});
	it('does not turn an English raw blockquote plus a markdown quote into a mismatch', () => {
		const english =
			'<blockquote>\n<p lang="es">"a"</p>\n</blockquote>\n\n> The founder quote\n> continues\n';
		const asMarkdown = '> a\n\n> The founder quote\n> continues\n';
		expect(countQuotes(english)).toBe(2);
		expect(countQuotes(asMarkdown)).toBe(2);
	});
	it('ignores quotes inside the script block and code', () => {
		expect(countQuotes('<script>\n// > not a quote\n</script>\n```\n> nope\n```\ntext')).toBe(0);
	});
});

describe('structureOf and compareStructure', () => {
	const en = [
		'<script>',
		"	import ImageMarquee from 'x';",
		'</script>',
		'',
		'Intro.',
		'',
		'## First',
		'![alt one](https://cdn.example/blog/1/a.webp "cap")',
		'### Sub',
		'| a | b |',
		'| - | - |',
		'| 1 | 2 |',
		'## Second',
		'<InlineCTA />',
		'<ImageMarquee />',
		''
	].join('\n');

	it('counts headings (with order), images, components, quotes and table rows', () => {
		const s = structureOf(en);
		expect(s.headings).toEqual([2, 3, 2]);
		expect(s.images).toEqual(['https://cdn.example/blog/1/a.webp']);
		expect(s.cta).toBe(1);
		expect(s.marquee).toBe(1);
		expect(s.tableRows).toBe(3);
		expect(describeStructure(s)).toBe('2/1/1/1/1/0/3');
	});

	it('is equal for a faithful translation', () => {
		const loc = en
			.replace('First', 'Primero')
			.replace('Second', 'Segundo')
			.replace('alt one', 'alt uno');
		expect(compareStructure(structureOf(en), structureOf(loc))).toEqual([]);
	});

	it('reports a changed heading order, a dropped image and a missing table row', () => {
		const loc = en
			.replace('### Sub', '## Sub')
			.replace('![alt one](https://cdn.example/blog/1/a.webp "cap")\n', '')
			.replace('| 1 | 2 |\n', '');
		const issues = compareStructure(structureOf(en), structureOf(loc));
		expect(issues.join('|')).toMatch(/headings/);
		expect(issues.join('|')).toMatch(/images/);
		expect(issues.join('|')).toMatch(/table rows/);
	});

	it('reports images in a different order', () => {
		const two = '![a](https://x/1.webp)\n\n![b](https://x/2.webp)\n';
		const swapped = '![b](https://x/2.webp)\n\n![a](https://x/1.webp)\n';
		expect(compareStructure(structureOf(two), structureOf(swapped)).join('|')).toMatch(/order/);
	});
});

describe('linksOf', () => {
	it('lists internal and external targets without fragments, sorted', () => {
		const body =
			'See [a](/blog/x/#intro) and [b](/packages/eco/) and ![i](https://cdn/x.webp "t") and <a href="/contact/">c</a> and [self](#local)';
		expect(linksOf(body)).toEqual([
			'/blog/x/',
			'/contact/',
			'/packages/eco/',
			'https://cdn/x.webp'
		]);
	});
	it('keeps duplicates so a dropped link is detected', () => {
		expect(linksOf('[a](/x/) [b](/x/)')).toEqual(['/x/', '/x/']);
	});
	it('treats the Top Group Express language variants as one link', () => {
		expect(linksOf('[a](https://topgroupexpress.com/fr)')).toEqual(
			linksOf('[a](https://topgroupexpress.com/zh)')
		);
	});
});

describe('numbersOf', () => {
	it('ignores link targets, URLs, 1996 and thousand separators', () => {
		const a = numbersOf(
			'Since 1996 we have 1000 clients, 490 euros, [x](/blog/a-2/) https://cdn/blog/1234/x.webp'
		);
		const b = numbersOf('Depuis 1996 nous avons 1.000 clients, 490 euros, [x](/blog/a-2/)');
		const c = numbersOf('Seit 1996 haben wir 1,000 Kunden, 490 Euro');
		expect(a).toEqual(b);
		expect(a).toEqual(c);
		expect(a).toEqual(['1000', '490']);
	});
	it('ignores star ratings and Chinese month numbers, which are written in words or dates elsewhere', () => {
		const en = numbersOf('A 5-star Google review (September 2025) and 14 days');
		expect(numbersOf('Un avis Google cinq \u00e9toiles (septembre 2025) et 14 jours')).toEqual(en);
		expect(numbersOf('Eine 5-Sterne-Bewertung (September 2025) und 14 Tage')).toEqual(en);
		expect(
			numbersOf('\u4e00\u6761\u4e94\u661f\u8bc4\u4ef7\uff082025\u5e749\u6708\uff09\u548c14\u5929')
		).toEqual(en);
		expect(en).toEqual(['14', '2025']);
	});
	it('reads 12 hour clock times and 24 hour clock times as the same number', () => {
		expect(numbersOf('Until 8:00 pm')).toEqual(['20']);
		expect(numbersOf('Bis 20:00 Uhr')).toEqual(['20']);
		expect(numbersOf("Jusqu'\u00e0 20h00")).toEqual(['20']);
		expect(numbersOf('Until 8 p.m. and from 11 AM')).toEqual(['11', '20']);
		expect(numbersOf('Until 8:30 pm')).toEqual(numbersOf('Bis 20:30 Uhr'));
	});
	it('reads a Chinese clock time with its part of the day as the same 24 hour number', () => {
		const en = numbersOf('often somewhere between 11pm and 1am');
		expect(en).toEqual(['1', '23']);
		// 晚上11点到凌晨1点 (simplified) and 晚上11點到凌晨1點 (traditional)
		expect(numbersOf('\u665a\u4e0a11\u70b9\u5230\u51cc\u66681\u70b9\u4e4b\u95f4')).toEqual(en);
		expect(numbersOf('\u665a\u4e0a11\u9ede\u5230\u51cc\u66681\u9ede\u4e4b\u9593')).toEqual(en);
		// 下午3点 is 15, 上午9点 stays 9, 中午12点 stays 12, and a bare 3点 is left alone.
		expect(numbersOf('\u4e0b\u53483\u70b9')).toEqual(['15']);
		expect(numbersOf('\u4e0a\u53489\u70b9')).toEqual(['9']);
		expect(numbersOf('\u4e2d\u534812\u70b9')).toEqual(['12']);
		expect(numbersOf('3\u70b9')).toEqual(['3']);
	});
	it('reads Chinese minutes, half past, midnight and the second hour of a range', () => {
		// 晚上8点30分, 晚上8点半 and 晚上8:30
		const half = numbersOf('Until 8:30 pm');
		expect(numbersOf('\u665a\u4e0a8\u70b930\u5206')).toEqual(half);
		expect(numbersOf('\u665a\u4e0a8\u70b9\u534a')).toEqual(half);
		expect(numbersOf('\u665a\u4e0a8:30')).toEqual(half);
		// 晚上12点 is midnight, like 12am. 下午12点 stays 12.
		expect(numbersOf('\u665a\u4e0a12\u70b9')).toEqual(numbersOf('until 12am'));
		expect(numbersOf('\u4e0b\u534812\u70b9')).toEqual(['12']);
		// 晚上8点到11点: the part of the day covers both hours. 下午3-5点 (no 点 after the first hour) is not read.
		expect(numbersOf('\u665a\u4e0a8\u70b9\u523011\u70b9')).toEqual(numbersOf('8pm to 11pm'));
		// 夜间1点 is 1am: a night word that also covers the small hours is not read as pm.
		expect(numbersOf('\u591c\u95f41\u70b9')).toEqual(numbersOf('1am'));
		// A number after the time is not swallowed: 晚上8点，50位宾客
		expect(numbersOf('\u665a\u4e0a8\u70b9\uff0c50\u4f4d\u5bbe\u5ba2')).toEqual(['20', '50']);
	});
	it('joins a thousand written with a space (French style)', () => {
		expect(numbersOf('plus de 1 000 clients et 3 000 lumens')).toEqual(['1000', '3000']);
		expect(numbersOf('50 guests and 120 seats')).toEqual(['120', '50']);
	});
	it('ignores the script block', () => {
		expect(numbersOf('<script>\nconst n = 42;\n</script>\n\n7 days')).toEqual(['7']);
	});
});

describe('diffMultiset', () => {
	it('reports missing and extra items respecting repeats', () => {
		expect(diffMultiset(['a', 'a', 'b'], ['a', 'b', 'c'])).toEqual({
			missing: ['a'],
			extra: ['c']
		});
		expect(diffMultiset(['a'], ['a'])).toEqual({ missing: [], extra: [] });
	});
});

describe('firstParagraph and keywordUsage', () => {
	const body =
		'<script>\n\timport X from "y";\n</script>\n\n<X />\n\n## Heading\n\nFirst prose paragraph with Sound System Rental here.\n\nSecond one with sound system rental again and sound\nsystem rental.\n';
	it('finds the first prose paragraph, skipping script, components and headings', () => {
		expect(firstParagraph(body)).toBe('First prose paragraph with Sound System Rental here.');
	});
	it('counts the exact keyword case insensitively, across line breaks, and checks the first paragraph and the title', () => {
		const u = keywordUsage(body, 'sound system rental', 'The Sound System Rental guide');
		expect(u.count).toBe(3);
		expect(u.inFirstParagraph).toBe(true);
		expect(u.inTitle).toBe(true);
	});
	it('matches Chinese keywords written with or without spaces', () => {
		const u = keywordUsage(
			'今天的音响系统租赁服务。音响系统租赁。',
			'音响 系统租赁',
			'音响系统租赁'
		);
		expect(u.count).toBe(2);
		expect(u.inFirstParagraph).toBe(true);
		expect(u.inTitle).toBe(true);
	});
});

function makeMap(): LocaleContentMap {
	return {
		pages: {
			'/': { path: '/', keyword: 'location audiovisuel malaga', status: 'propuesta' },
			'/about-us/': { path: '/a-propos/', keyword: 'a propos', status: 'propuesta' },
			'/thank-you/': { path: '/merci/' }
		},
		segments: { category: 'categorie', author: 'auteur' },
		packages: { eco: { slug: 'pack-eco', keyword: 'pack eco malaga', status: 'propuesta' } },
		categories: { events: { slug: 'evenements', name: 'Evenements' } },
		posts: {
			mine: { slug: 'mon-post', keyword: 'location de sonorisation', status: 'propuesta' },
			other: { slug: 'autre-post', keyword: 'location de projecteur', status: 'propuesta' }
		}
	} as LocaleContentMap;
}

describe('keywordCollisions', () => {
	it('passes for a keyword unrelated to every other one', () => {
		expect(keywordCollisions('mine', makeMap())).toEqual([]);
	});
	it('flags a keyword that contains or is contained in another, ignoring case and spaces', () => {
		const map = makeMap();
		map.posts.other.keyword = 'Location de sonorisation a Malaga';
		const issues = keywordCollisions('mine', map);
		expect(issues.length).toBe(1);
		expect(issues[0]).toContain('post other');
	});
	it('catches Chinese substrings once spaces are removed', () => {
		const map = makeMap();
		map.posts.mine.keyword = '会议 视听租赁';
		map.packages.eco.keyword = '会议视听租赁服务';
		expect(keywordCollisions('mine', map).join('|')).toContain('pkg eco');
	});
	it('exempts the posts of the same silo, which reuse the pillar head term by design', () => {
		const map = makeMap();
		map.posts.other.keyword = 'Location de sonorisation a Malaga';
		expect(keywordCollisions('mine', map, ['other'])).toEqual([]);
		expect(keywordCollisions('mine', map, ['unrelated']).length).toBe(1);
	});
	it('reports a keyword equal to another as a collision', () => {
		const map = makeMap();
		map.posts.other.keyword = 'location de sonorisation';
		expect(keywordCollisions('mine', map).length).toBe(1);
	});
});

describe('siloRelatives', () => {
	const targets = {
		pillar: '/',
		a: '/blog/pillar/',
		b: '/blog/pillar/',
		c: '/blog/other/',
		news: '/'
	};
	it('is the pillar of a supporting post', () => {
		expect(siloRelatives('a', targets)).toEqual(['pillar']);
	});
	it('is every supporting post of a pillar', () => {
		expect(siloRelatives('pillar', targets).sort()).toEqual(['a', 'b']);
	});
	it('is empty for a post outside any silo chain', () => {
		expect(siloRelatives('news', targets)).toEqual([]);
	});
});

describe('slugCollisions', () => {
	it('passes for a unique slug', () => {
		expect(slugCollisions('mine', makeMap())).toEqual([]);
	});
	it('flags a slug used by a page, package, category, segment or another post', () => {
		for (const [mutate, expected] of [
			[(m: LocaleContentMap) => (m.posts.other.slug = 'mon-post'), 'post other'],
			[(m: LocaleContentMap) => (m.packages.eco.slug = 'mon-post'), 'package eco'],
			[(m: LocaleContentMap) => (m.categories.events.slug = 'mon-post'), 'category events'],
			[(m: LocaleContentMap) => (m.segments.category = 'mon-post'), 'segment category'],
			[(m: LocaleContentMap) => (m.pages['/about-us/'].path = '/mon-post/'), 'page /about-us/']
		] as [(m: LocaleContentMap) => void, string][]) {
			const map = makeMap();
			mutate(map);
			expect(slugCollisions('mine', map).join('|'), expected).toContain(expected);
		}
	});
});

describe('checkLocale', () => {
	const english = [
		'---',
		'title: "Sound system rental"',
		'description: "English description long enough."',
		'author: "A"',
		'publishDate: "2026-01-02"',
		'updatedDate: "2026-09-30"',
		'excerpt: "English excerpt long enough."',
		'---',
		'',
		'<script>',
		"	import X from 'x';",
		'</script>',
		'',
		'Sound system rental for events, 290 euros. See [the pillar](/blog/audio-visual-rental/).',
		'',
		'## Why',
		'',
		'More text with 3 items.',
		''
	].join('\n');

	const good = [
		'---',
		'title: "Location de sonorisation a Malaga"',
		'description: "Une description assez longue."',
		'excerpt: "Un extrait assez long."',
		'publishDate: "2026-10-01"',
		'sourceUpdated: "2026-09-30"',
		'---',
		'',
		'<script>',
		"	import X from 'x';",
		'</script>',
		'',
		'La location de sonorisation a Malaga pour vos evenements, 290 euros. Voir [le pilier](/blog/audio-visual-rental/).',
		'',
		'## Pourquoi',
		'',
		'Plus de texte avec 3 elements, location de sonorisation a Malaga.',
		''
	].join('\n');

	const map = (): LocaleContentMap => {
		const m = makeMap();
		m.posts.mine.keyword = 'location de sonorisation a Malaga';
		return m;
	};

	const run = (
		text: string | null,
		locale = 'fr',
		m: LocaleContentMap | undefined = map(),
		extra: Partial<CheckInput> = {}
	) => checkLocale({ locale, slug: 'mine', english, text, map: m, today: '2026-10-01', ...extra });

	it('passes a faithful translation', () => {
		const r = run(good);
		expect(r.issues).toEqual([]);
		expect(r.titleLength).toBe('Location de sonorisation a Malaga'.length);
		expect(r.keyword).toBe('location de sonorisation a Malaga');
		expect(r.keywordCount).toBe(2);
	});

	it('reports a missing file and a missing content map entry', () => {
		expect(run(null).issues.join('|')).toMatch(/missing/);
		const m = map();
		delete m.posts.mine;
		expect(run(good, 'fr', m).issues.join('|')).toMatch(/content map/);
	});

	it('accepts the optional updatedDate of a translation that changed after publication', () => {
		expect(
			run(good.replace('publishDate:', 'updatedDate: "2026-10-01"\npublishDate:')).issues
		).toEqual([]);
		const future = good.replace('publishDate:', 'updatedDate: "2026-10-09"\npublishDate:');
		expect(run(future).issues.join('|')).toMatch(/updatedDate/);
	});

	it('flags extra frontmatter keys, a stale sourceUpdated and a future publishDate', () => {
		const withKeyword = good.replace('publishDate:', 'keyword: "x"\npublishDate:');
		expect(run(withKeyword).issues.join('|')).toMatch(/keys/);
		expect(
			run(good.replace('sourceUpdated: "2026-09-30"', 'sourceUpdated: "2026-09-01"')).issues.join(
				'|'
			)
		).toMatch(/sourceUpdated/);
		expect(
			run(good.replace('publishDate: "2026-10-01"', 'publishDate: "2026-10-05"')).issues.join('|')
		).toMatch(/publishDate/);
	});

	it('flags a title over 65 characters and a description over 160 for Latin locales only', () => {
		const longTitle = good.replace(
			/^title: .*$/m,
			`title: "${'a'.repeat(66)} location de sonorisation a Malaga"`
		);
		expect(run(longTitle).issues.join('|')).toMatch(/title/);
		const longDesc = good.replace(/^description: .*$/m, `description: "${'a'.repeat(161)}"`);
		expect(run(longDesc).issues.join('|')).toMatch(/description/);
		const zh = longTitle.replace(/location de sonorisation a Malaga/g, 'x');
		expect(run(zh, 'zh-hans').issues.join('|')).not.toMatch(/title is/);
	});

	it('flags forbidden characters and semicolons', () => {
		expect(run(good.replace('Plus de', `Plus ${EM} de`)).issues.join('|')).toMatch(/em dash/);
		expect(run(good.replace('Plus de', 'Plus; de')).issues.join('|')).toMatch(/semicolon/);
	});

	it('flags Cantonese in zh-hk and simplified leakage in zh-tw and zh-hk only', () => {
		const zh = good.replace('Plus de texte', '這個喺这个');
		expect(run(zh, 'zh-hk').issues.join('|')).toMatch(/Cantonese/);
		expect(run(zh, 'zh-hk').issues.join('|')).toMatch(/simplified/);
		expect(run(zh, 'zh-tw').issues.join('|')).toMatch(/simplified/);
		expect(run(zh, 'zh-tw').issues.join('|')).not.toMatch(/Cantonese/);
		expect(run(zh, 'zh-hans').issues.join('|')).not.toMatch(/simplified/);
	});

	it('flags structure, link and number differences against the English', () => {
		expect(run(good.replace('## Pourquoi', '### Pourquoi')).issues.join('|')).toMatch(/headings/);
		expect(
			run(good.replace('/blog/audio-visual-rental/', '/blog/other/')).issues.join('|')
		).toMatch(/links/);
		expect(run(good.replace('290 euros', '300 euros')).issues.join('|')).toMatch(/numbers/);
	});

	it('treats a changed single digit as a warning (often spelled out), a failure only when strict', () => {
		const spelled = good.replace('avec 3 elements', 'avec trois elements');
		expect(run(spelled).issues).toEqual([]);
		expect(run(spelled).warnings.join('|')).toMatch(/small numbers/);
		expect(run(spelled, 'fr', map(), { strict: true }).issues.join('|')).toMatch(/small numbers/);
	});

	it('warns about the keyword usage, and fails on it only in strict mode', () => {
		const once = good.replace(', location de sonorisation a Malaga.', '.');
		const loose = run(once);
		expect(loose.issues).toEqual([]);
		expect(loose.warnings.join('|')).toMatch(/keyword/);
		expect(run(once, 'fr', map(), { strict: true }).issues.join('|')).toMatch(/keyword/);
		const noTitle = good.replace(/^title: .*$/m, 'title: "Autre titre"');
		expect(run(noTitle).warnings.join('|')).toMatch(/title/);
	});

	it('does not count the pillar relatives as keyword collisions', () => {
		const m = map();
		m.posts.other.keyword = 'location de sonorisation a Malaga et plus';
		expect(run(good, 'fr', m).issues.join('|')).toMatch(/collides/);
		expect(run(good, 'fr', m, { relatedSlugs: ['other'] }).issues).toEqual([]);
	});
});

describe('auditBuiltPage and pageAuditIssues', () => {
	const page = (extra = '') =>
		`<html lang="fr"><body><main id="main"><h2 id="a">A</h2><h3 id="b">B</h3><a href="#a">x</a><a href="#b">y</a>${extra}<img src="/x.webp" alt="a"></main></body></html>`;

	it('counts headings, images and in-page links, and finds the broken ones', () => {
		const ok = auditBuiltPage(page());
		expect(ok).toMatchObject({
			lang: 'fr',
			hrefs: 2,
			missing: [],
			h2: 1,
			h3: 1,
			images: 1,
			rawMarkdown: false
		});
		const broken = auditBuiltPage(page('<a href="#nowhere">z</a><a href="#main">m</a>'));
		expect(broken.missing).toEqual(['nowhere']);
	});

	it('detects markdown that leaked into the page, ignoring scripts', () => {
		expect(auditBuiltPage(page('<p>![alt](x)</p>')).rawMarkdown).toBe(true);
		expect(auditBuiltPage(page('<script>const a = "](x)";</script>')).rawMarkdown).toBe(false);
	});

	it('compares a translated page with the English one', () => {
		const en = auditBuiltPage(page());
		expect(pageAuditIssues('fr', auditBuiltPage(page()), en)).toEqual([]);
		const issues = pageAuditIssues(
			'fr',
			auditBuiltPage(page('<a href="#nowhere">z</a><h2 id="c">C</h2>')),
			en
		).join('|');
		expect(issues).toMatch(/anchor/);
		expect(issues).toMatch(/h2/);
	});
});

describe('isBuildStale', () => {
	it('is stale when any source is newer than the built page', () => {
		expect(isBuildStale(1000, [900, 999])).toBe(false);
		expect(isBuildStale(1000, [900, 1001])).toBe(true);
		expect(isBuildStale(null, [1])).toBe(true);
	});
});
