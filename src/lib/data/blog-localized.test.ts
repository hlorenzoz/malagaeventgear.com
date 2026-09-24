/**
 * Fase 4: the multilingual blog pipeline, proved on fixture data. No fixture .svx lives in the
 * real locale folders, so the production output does not change while no post is translated.
 */
import { describe, it, expect } from 'vitest';
import {
	buildPostsFromGlob,
	buildLocalizedPosts,
	getLocalizedCategoriesFromPosts,
	blogAvailabilityOf,
	findStaleTranslations,
	translationPathInfo,
	postTags,
	articleKeywords,
	type GlobResult,
	type TranslationGlob
} from './blog-pipeline';
import { TranslatedPostSchema } from '$lib/types/blog';
import { getAvailability } from '$lib/i18n/availability';
import type { LocaleContentMap } from '$lib/i18n/content-map/schema';

const NOW = new Date('2026-09-24T12:00:00Z');

function english(slug: string, overrides: Record<string, unknown> = {}) {
	return {
		[`../../content/blog/${slug}.svx`]: {
			metadata: {
				title: `English ${slug}`,
				description: 'An English description long enough.',
				author: 'Hector Luis Lorenzo',
				publishDate: '2026-01-10',
				excerpt: 'An English excerpt long enough.',
				coverImage: `https://cdn.malagaeventgear.com/blog/${slug}.webp`,
				categories: ['Weddings', 'Events'],
				tags: ['tag'],
				siloRole: 'supporting',
				targetPage: '/blog/wedding-rentals/',
				keyword: `english ${slug}`,
				...overrides
			}
		}
	};
}

function translation(locale: string, slug: string, overrides: Record<string, unknown> = {}, extra = {}) {
	return {
		[`../../content/blog/${locale}/${slug}.svx`]: {
			metadata: {
				title: `Titel ${slug}`,
				description: 'Eine Beschreibung, lang genug.',
				excerpt: 'Ein Auszug, lang genug.',
				publishDate: '2026-09-01',
				sourceUpdated: '2026-01-10',
				...overrides
			},
			...extra
		}
	};
}

function contentMap(blogPath: string, posts: Record<string, string>): LocaleContentMap {
	return {
		pages: {
			'/': { path: '/' },
			'/blog/': { path: blogPath, keyword: 'blog', status: 'propuesta' },
			'/blog/categories/': { path: `${blogPath}kategorien/`, keyword: 'kategorien', status: 'propuesta' },
			'/contact/': { path: '/kontakt/', keyword: 'kontakt', status: 'propuesta' }
		},
		segments: { category: 'kategorie', author: 'autor' },
		packages: {},
		categories: {
			weddings: { slug: 'hochzeiten', name: 'Hochzeiten' },
			events: { slug: 'veranstaltungen', name: 'Veranstaltungen' },
			news: { slug: 'neuigkeiten', name: 'Neuigkeiten' }
		},
		posts: Object.fromEntries(
			Object.entries(posts).map(([en, slug]) => [en, { slug, keyword: `kw ${slug}`, status: 'propuesta' as const }])
		)
	};
}

const englishGlob: GlobResult = {
	...english('wedding-sound'),
	...english('gala-lights', { publishDate: '2026-02-01', updatedDate: '2026-03-05', categories: ['News'] }),
	...english('draft-english', { draft: true })
};
const englishPosts = buildPostsFromGlob(englishGlob, NOW);
const deMap = contentMap('/blog/', {
	'wedding-sound': 'hochzeit-ton',
	'gala-lights': 'gala-licht',
	'draft-english': 'entwurf',
	'unmapped-later': 'x'
});

describe('TranslatedPostSchema', () => {
	const valid = translation('de', 'x')['../../content/blog/de/x.svx'].metadata;

	it('accepts the translated fields only', () => {
		expect(TranslatedPostSchema.parse(valid).draft).toBe(false);
	});

	it('rejects fields derived from the English post (they must not be repeated)', () => {
		for (const field of ['coverImage', 'categories', 'tags', 'author', 'siloRole', 'targetPage', 'keyword']) {
			expect(TranslatedPostSchema.safeParse({ ...valid, [field]: 'x' }).success, field).toBe(false);
		}
	});

	it('requires sourceUpdated as a date', () => {
		expect(TranslatedPostSchema.safeParse({ ...valid, sourceUpdated: undefined }).success).toBe(false);
		expect(TranslatedPostSchema.safeParse({ ...valid, sourceUpdated: 'yesterday' }).success).toBe(false);
		// A real time of day is not a YAML date: never silently cut to its day.
		expect(TranslatedPostSchema.safeParse({ ...valid, sourceUpdated: '2026-01-10T15:30:00+02:00' }).success).toBe(false);
	});

	it('accepts an unquoted YAML sourceUpdated and normalizes it to YYYY-MM-DD, like publishDate', () => {
		// gray-matter parses `sourceUpdated: 2026-01-10` (no quotes) to a Date, and the JSON round
		// trip of the virtual module turns it into this string.
		expect(TranslatedPostSchema.parse({ ...valid, sourceUpdated: '2026-01-10T00:00:00.000Z' }).sourceUpdated).toBe('2026-01-10');
		expect(TranslatedPostSchema.parse({ ...valid, sourceUpdated: '2026-01-10' }).sourceUpdated).toBe('2026-01-10');
	});

	it('validates the dates and lengths like the English schema', () => {
		expect(TranslatedPostSchema.safeParse({ ...valid, publishDate: 'yesterday' }).success).toBe(false);
		expect(TranslatedPostSchema.safeParse({ ...valid, description: 'short' }).success).toBe(false);
		expect(TranslatedPostSchema.safeParse({ ...valid, updatedDate: '2026-09-10' }).success).toBe(true);
	});
});

describe('translationPathInfo', () => {
	it('reads the locale folder and the English slug', () => {
		expect(translationPathInfo('../../content/blog/zh-hans/my-post.svx')).toEqual({ locale: 'zh-hans', enSlug: 'my-post' });
		expect(translationPathInfo('/abs/src/content/blog/de/a.svx')).toEqual({ locale: 'de', enSlug: 'a' });
	});

	it('ignores English root posts and unknown folders', () => {
		expect(translationPathInfo('../../content/blog/my-post.svx')).toBeNull();
		expect(translationPathInfo('../../content/blog/es/my-post.svx')).toBeNull();
	});
});

describe('buildLocalizedPosts', () => {
	const translations: TranslationGlob = {
		...translation('de', 'wedding-sound', {}, { faqs: [{ question: 'F?', answer: 'A.' }], toc: [{ id: 'a', text: 'A', level: 2 }] }),
		...translation('de', 'gala-lights', { publishDate: '2026-09-10', sourceUpdated: '2026-03-05', updatedDate: '2026-09-20' }),
		...translation('de', 'draft-english'), // English is a draft: never published in German
		...translation('de', 'missing-english'), // no English post at all
		...translation('fr', 'wedding-sound') // another locale: ignored for de
	};

	const posts = buildLocalizedPosts('de', englishPosts, translations, deMap, NOW);

	it('publishes only translations of published English posts, of this locale', () => {
		expect(posts.map((p) => p.slug)).toEqual(['gala-lights', 'wedding-sound']);
	});

	it('merges the translated fields over the English derived fields', () => {
		const post = posts.find((p) => p.slug === 'wedding-sound')!;
		expect(post.title).toBe('Titel wedding-sound');
		expect(post.description).toBe('Eine Beschreibung, lang genug.');
		expect(post.excerpt).toBe('Ein Auszug, lang genug.');
		expect(post.publishDate).toBe('2026-09-01');
		expect(post.updatedDate).toBeUndefined(); // never the English updatedDate
		expect(post.sourceUpdated).toBe('2026-01-10');
		expect(post.coverImage).toBe('https://cdn.malagaeventgear.com/blog/wedding-sound.webp');
		expect(post.categories).toEqual(['Weddings', 'Events']);
		expect(post.author).toBe('Hector Luis Lorenzo');
		expect(post.siloRole).toBe('supporting');
		expect(post.locale).toBe('de');
		expect(post.faqs).toEqual([{ question: 'F?', answer: 'A.' }]);
		expect(post.toc).toEqual([{ id: 'a', text: 'A', level: 2 }]);
	});

	it('keeps the ENGLISH slug as identity and takes the keyword from the content map', () => {
		const post = posts.find((p) => p.slug === 'gala-lights')!;
		expect(post.keyword).toBe('kw gala-licht');
		expect(post.isNews).toBe(true);
	});

	it('builds the localized url from the content map', () => {
		expect(posts.find((p) => p.slug === 'wedding-sound')!.url).toBe('/de/blog/hochzeit-ton/');
	});

	it('percent encodes a Chinese url', () => {
		const zhMap = contentMap('/博客/', { 'wedding-sound': '婚礼音响' });
		const [zh] = buildLocalizedPosts('zh-hans', englishPosts, translation('zh-hans', 'wedding-sound'), zhMap, NOW);
		expect(zh.url).toBe(encodeURI('/zh-hans/博客/婚礼音响/'));
	});

	it('sorts like English, newest translation first', () => {
		expect(posts[0].slug).toBe('gala-lights');
	});

	it('skips drafts, future dates and posts without a content map entry', () => {
		const skipped: TranslationGlob = {
			...translation('de', 'wedding-sound', { draft: true }),
			...translation('de', 'gala-lights', { publishDate: '2026-12-01' })
		};
		expect(buildLocalizedPosts('de', englishPosts, skipped, deMap, NOW)).toEqual([]);
		const unmapped = contentMap('/blog/', {});
		expect(buildLocalizedPosts('de', englishPosts, translation('de', 'wedding-sound'), unmapped, NOW)).toEqual([]);
		expect(buildLocalizedPosts('de', englishPosts, translation('de', 'wedding-sound'), null, NOW)).toEqual([]);
	});

	it('fails on invalid frontmatter, naming the file, instead of dropping the post', () => {
		const invalid = translation('de', 'wedding-sound', { coverImage: 'https://x.test/a.webp' });
		expect(() => buildLocalizedPosts('de', englishPosts, invalid, deMap, NOW)).toThrow(
			/src\/content\/blog\/de\/wedding-sound\.svx: invalid frontmatter/
		);
	});

	it('keeps the English title for package matching (same CTA as the English post)', () => {
		expect(posts.find((p) => p.slug === 'wedding-sound')!.enTitle).toBe('English wedding-sound');
	});

	it('returns nothing for English (English posts are not translations)', () => {
		expect(buildLocalizedPosts('en', englishPosts, translations, deMap, NOW)).toEqual([]);
	});
});

describe('localized taxonomy and availability', () => {
	const posts = buildLocalizedPosts(
		'de',
		englishPosts,
		{ ...translation('de', 'wedding-sound', { updatedDate: '2026-09-15' }) },
		deMap,
		NOW
	);

	it('lists only categories with a published post, localized name, English slug', () => {
		expect(getLocalizedCategoriesFromPosts(posts, deMap)).toEqual([
			{ name: 'Hochzeiten', slug: 'weddings', count: 1, lastmod: '2026-09-15' },
			{ name: 'Veranstaltungen', slug: 'events', count: 1, lastmod: '2026-09-15' }
		]);
	});

	it('falls back to the English name without a content map', () => {
		expect(getLocalizedCategoriesFromPosts(posts, null).map((c) => c.name)).toEqual(['Events', 'Weddings']);
	});

	it('derives the availability sets from the published posts', () => {
		expect(blogAvailabilityOf(posts)).toEqual({
			posts: ['wedding-sound'],
			categories: ['events', 'weddings'],
			authors: ['hector-luis-lorenzo']
		});
	});

	it('feeds getAvailability, which stays empty without blog data', () => {
		const available = getAvailability('de', blogAvailabilityOf(posts));
		expect([...available.posts]).toEqual(['wedding-sound']);
		expect(available.categories.has('weddings')).toBe(true);
		expect(available.authors.has('hector-luis-lorenzo')).toBe(true);
		expect(getAvailability('de').posts.size).toBe(0);
	});
});

describe('findStaleTranslations', () => {
	it('flags a translation older than its English post (updatedDate ?? publishDate)', () => {
		const posts = buildLocalizedPosts(
			'de',
			englishPosts,
			{
				...translation('de', 'wedding-sound', { sourceUpdated: '2026-01-10' }), // fresh: English publishDate
				...translation('de', 'gala-lights', { sourceUpdated: '2026-02-01' }) // stale: English updated 2026-03-05
			},
			deMap,
			NOW
		);
		expect(findStaleTranslations(posts, englishPosts)).toEqual(['de/gala-lights']);
	});
});

describe('tags and keywords of a post page', () => {
	const [de] = buildLocalizedPosts('de', englishPosts, translation('de', 'wedding-sound'), deMap, NOW);
	const en = englishPosts.find((p) => p.slug === 'wedding-sound')!;

	it('English shows its tags and uses them as article keywords, as before', () => {
		expect(postTags(en)).toEqual(['tag']);
		expect(articleKeywords(en)).toEqual(['tag']);
	});

	it('a translation shows no English tags, and its keywords are the locale keyword', () => {
		expect(postTags(de)).toEqual([]);
		expect(articleKeywords(de)).toEqual(['kw hochzeit-ton']);
	});

	it('no keywords at all rather than English ones', () => {
		expect(articleKeywords({ ...de, keyword: undefined })).toBeUndefined();
		expect(articleKeywords({ ...en, tags: [] })).toBeUndefined();
	});
});
