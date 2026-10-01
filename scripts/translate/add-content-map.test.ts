import { describe, expect, it } from 'vitest';
import type { LocaleContentMap } from '../../src/lib/i18n/content-map/schema';
import { insertPostEntry, parseMapInput, planInsert, quote, MapRefusal } from './add-content-map';

const FIXTURE = `import type { LocaleContentMap } from '../schema';

export default {
	pages: {
		'/': { path: '/', keyword: 'accueil', status: 'propuesta' }
	},
	segments: { category: 'categorie', author: 'auteur' },
	packages: {
		eco: { slug: 'pack-eco', keyword: 'pack eco', status: 'propuesta' }
	},
	categories: {
		events: { slug: 'evenements', name: 'Evenements' }
	},
	posts: {
		'first-post': {
			slug: 'premier-article',
			keyword: 'premier article',
			status: 'propuesta'
		},
		'second-post': {
			slug: 'second-article',
			keyword: "l'article numero deux",
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
`;

/** Evaluates a fixture module, proving the generated source is still valid TypeScript object syntax. */
function evaluate(source: string): LocaleContentMap {
	const code = source
		.replace(/^import .*$/gm, '')
		.replace('export default', 'return')
		.replace(' satisfies LocaleContentMap', '');
	return new Function(code)() as LocaleContentMap;
}

const map = () => evaluate(FIXTURE);
const entry = { slug: 'nouvel-article', keyword: 'nouvel article a Malaga' };

describe('quote', () => {
	it('uses single quotes, double quotes when the text has a single quote', () => {
		expect(quote('plain')).toBe("'plain'");
		expect(quote("l'article")).toBe('"l\'article"');
		expect(quote('a "b" \'c\'')).toBe("'a \"b\" \\'c\\''");
		expect(quote('back\\slash')).toBe("'back\\\\slash'");
	});
});

describe('parseMapInput', () => {
	it('accepts a subset of the 12 locales with slug and keyword', () => {
		const out = parseMapInput({
			fr: { slug: 'a-b', keyword: ' mot cle ' },
			'zh-hans': { slug: '中文', keyword: '中文 词' }
		});
		expect(out.fr).toEqual({ slug: 'a-b', keyword: 'mot cle' });
		expect(Object.keys(out)).toEqual(['fr', 'zh-hans']);
	});
	it('accepts the propuesta status and rejects anything else', () => {
		expect(() =>
			parseMapInput({ fr: { slug: 'a', keyword: 'b', status: 'propuesta' } })
		).not.toThrow();
		expect(() => parseMapInput({ fr: { slug: 'a', keyword: 'b', status: 'validada' } })).toThrow(
			/propuesta/
		);
	});
	it('rejects an unknown locale (including en), a bad slug and an empty keyword', () => {
		expect(() => parseMapInput({ en: { slug: 'a', keyword: 'b' } })).toThrow(/locale/);
		expect(() => parseMapInput({ es: { slug: 'a', keyword: 'b' } })).toThrow(/locale/);
		expect(() => parseMapInput({ fr: { slug: 'Has Space', keyword: 'b' } })).toThrow(/slug/);
		expect(() => parseMapInput({ fr: { slug: 'a/b', keyword: 'b' } })).toThrow(/slug/);
		expect(() => parseMapInput({ fr: { slug: 'a', keyword: '  ' } })).toThrow(/keyword/);
		expect(() => parseMapInput({ fr: { slug: 'a', keyword: 'b', extra: 1 } })).toThrow();
	});
	it('rejects an empty map and non objects', () => {
		expect(() => parseMapInput({})).toThrow(/empty/);
		expect(() => parseMapInput([])).toThrow();
		expect(() => parseMapInput('x')).toThrow();
	});
});

describe('insertPostEntry', () => {
	it('adds the entry as the last post, in the file style, and stays valid', () => {
		const out = insertPostEntry(FIXTURE, 'new-post', entry);
		expect(out).toContain(
			`		},\n		'new-post': {\n			slug: 'nouvel-article',\n			keyword: 'nouvel article a Malaga',\n			status: 'propuesta'\n		}\n	}\n} satisfies LocaleContentMap;`
		);
		const evaluated = evaluate(out);
		expect(Object.keys(evaluated.posts)).toEqual(['first-post', 'second-post', 'new-post']);
		expect(evaluated.posts['new-post']).toEqual({
			slug: 'nouvel-article',
			keyword: 'nouvel article a Malaga',
			status: 'propuesta'
		});
		expect(evaluated.posts['second-post'].keyword).toBe("l'article numero deux");
	});
	it('quotes a keyword with an apostrophe in double quotes', () => {
		const out = insertPostEntry(FIXTURE, 'new-post', { slug: 'x', keyword: "ce qu'on apprend" });
		expect(out).toContain(`keyword: "ce qu'on apprend",`);
		expect(evaluate(out).posts['new-post'].keyword).toBe("ce qu'on apprend");
	});
	it('fills an empty posts block', () => {
		const empty = FIXTURE.replace(/\tposts: \{[\s\S]*?\n\t\}\n\}/, '\tposts: {}\n}');
		const out = insertPostEntry(empty, 'new-post', entry);
		expect(Object.keys(evaluate(out).posts)).toEqual(['new-post']);
	});
	it('does not touch anything else in the file', () => {
		const out = insertPostEntry(FIXTURE, 'new-post', entry);
		expect(out.startsWith(FIXTURE.slice(0, FIXTURE.indexOf("\t\t'second-post'")))).toBe(true);
	});
	it('throws when the posts block cannot be found', () => {
		expect(() => insertPostEntry('export default {}', 'x', entry)).toThrow(/posts/);
	});
});

describe('planInsert', () => {
	it('inserts a new entry', () => {
		const plan = planInsert('fr', FIXTURE, map(), 'new-post', entry);
		expect(plan.kind).toBe('insert');
		if (plan.kind === 'insert') expect(plan.source).toContain("'new-post'");
	});

	it('is idempotent: the same entry again is a no-op', () => {
		const once = insertPostEntry(FIXTURE, 'new-post', entry);
		const plan = planInsert('fr', once, evaluate(once), 'new-post', entry);
		expect(plan.kind).toBe('present');
	});

	it('refuses a different entry under an existing key', () => {
		expect(() => planInsert('fr', FIXTURE, map(), 'first-post', entry)).toThrow(MapRefusal);
		expect(() => planInsert('fr', FIXTURE, map(), 'first-post', entry)).toThrow(/already has/);
	});

	it('refuses a slug already used by a post, page, package, category or segment', () => {
		for (const slug of ['premier-article', 'pack-eco', 'evenements', 'categorie', 'auteur']) {
			expect(() => planInsert('fr', FIXTURE, map(), 'new-post', { ...entry, slug }), slug).toThrow(
				/slug/
			);
		}
		const m = map();
		m.pages['/about/'] = { path: '/a-propos/' };
		expect(() => planInsert('fr', FIXTURE, m, 'new-post', { ...entry, slug: 'a-propos' })).toThrow(
			/slug/
		);
	});

	it('refuses a keyword already used, ignoring case and spaces', () => {
		expect(() =>
			planInsert('fr', FIXTURE, map(), 'new-post', { ...entry, keyword: 'Premier  Article' })
		).toThrow(/keyword/);
		expect(() =>
			planInsert('fr', FIXTURE, map(), 'new-post', { ...entry, keyword: 'pack eco' })
		).toThrow(/keyword/);
		expect(() =>
			planInsert('fr', FIXTURE, map(), 'new-post', { ...entry, keyword: 'accueil' })
		).toThrow(/keyword/);
	});

	it('names the locale in every refusal', () => {
		expect(() => planInsert('de', FIXTURE, map(), 'first-post', entry)).toThrow(/^de:/);
	});
});
