import { describe, expect, it } from 'vitest';
import { buildPostsFromGlob, buildLocalizedPosts, getAuthorsFromPosts, getLocalizedCategoriesFromPosts } from '$lib/data/blog-pipeline';
import type { LocaleContentMap } from '$lib/i18n/content-map/schema';
import { localeBlogSitemapUrls } from './sitemap';

const NOW = new Date('2026-09-24T12:00:00Z');
const SITE = 'https://malagaeventgear.com';

const english = buildPostsFromGlob(
	{
		'../../content/blog/a.svx': {
			metadata: {
				title: 'A',
				description: 'An English description long enough.',
				author: 'Hector Luis Lorenzo',
				publishDate: '2026-01-10',
				excerpt: 'An English excerpt long enough.',
				coverImage: 'https://cdn.malagaeventgear.com/blog/a.webp',
				categories: ['Weddings']
			}
		}
	},
	NOW
);

const map: LocaleContentMap = {
	pages: { '/blog/': { path: '/博客/', keyword: 'k', status: 'propuesta' } },
	segments: { category: '分类', author: '作者' },
	packages: {},
	categories: { weddings: { slug: '婚礼', name: '婚礼' } },
	posts: { a: { slug: '文章', keyword: 'k', status: 'propuesta' } }
};

const posts = buildLocalizedPosts(
	'zh-hans',
	english,
	{
		'../../content/blog/zh-hans/a.svx': {
			metadata: {
				title: '标题',
				description: '一个足够长的描述文字内容。',
				excerpt: '一个足够长的摘要文字内容。',
				publishDate: '2026-09-01',
				updatedDate: '2026-09-12',
				sourceUpdated: '2026-01-10'
			}
		}
	},
	map,
	NOW
);
const blog = { posts, categories: getLocalizedCategoriesFromPosts(posts, map), authors: getAuthorsFromPosts(posts) };

describe('localeBlogSitemapUrls', () => {
	it('lists the published posts with the translation date and the shared cover', () => {
		expect(localeBlogSitemapUrls('post', 'zh-hans', blog, map)).toEqual([
			{
				loc: `${SITE}${encodeURI('/zh-hans/博客/文章/')}`,
				lastmod: '2026-09-12',
				image: 'https://cdn.malagaeventgear.com/blog/a.webp'
			}
		]);
	});

	it('lists categories and authors at their localized URL, dated by their newest post', () => {
		expect(localeBlogSitemapUrls('category', 'zh-hans', blog, map)).toEqual([
			{ loc: `${SITE}${encodeURI('/zh-hans/博客/分类/婚礼/')}`, lastmod: '2026-09-12' }
		]);
		expect(localeBlogSitemapUrls('author', 'zh-hans', blog, map)).toEqual([
			{ loc: `${SITE}${encodeURI('/zh-hans/博客/作者/hector-luis-lorenzo/')}`, lastmod: '2026-09-12' }
		]);
	});

	it('is empty when the locale publishes nothing', () => {
		const none = { posts: [], categories: [], authors: [] };
		for (const kind of ['post', 'category', 'author'] as const) {
			expect(localeBlogSitemapUrls(kind, 'zh-hans', none, map)).toEqual([]);
		}
	});
});
