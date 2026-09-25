/**
 * blog.ts with its build time virtual modules replaced by fixtures. The English posts must be
 * cut at the SAME build time as the translations and the availability sets (`builtAt`), never
 * at the runtime clock: otherwise a post whose date passes after the build is listed (hydrated
 * client, runtime SSR) without its URL having been built.
 */
import { describe, expect, it, vi } from 'vitest';

const englishPost = (publishDate: string) => ({
	metadata: {
		title: `Post ${publishDate}`,
		description: 'An English description long enough.',
		author: 'Hector Luis Lorenzo',
		publishDate,
		excerpt: 'An English excerpt long enough.',
		coverImage: 'https://cdn.malagaeventgear.com/blog/x.webp',
		categories: ['Weddings'],
		siloRole: 'standalone'
	}
});

vi.mock('virtual:blog-meta', () => ({
	default: {
		'../../content/blog/before-build.svx': englishPost('2026-01-10'),
		// After the build time, before today: not built, so never listed.
		'../../content/blog/after-build.svx': englishPost('2026-03-01')
	}
}));
vi.mock('virtual:blog-translations', () => ({ default: {}, builtAt: '2026-02-01T00:00:00.000Z' }));
vi.mock('virtual:blog-availability', () => ({ default: {} }));
// Per locale maps of per post loaders (scripts/vite-blog-meta.mjs).
const extra = (question: string) => () => Promise.resolve({ faqs: [{ question, answer: 'A.' }], toc: [{ id: 'q', text: question, level: 3 }] });
vi.mock('virtual:blog-extras', () => ({
	default: {
		en: () => Promise.resolve({ 'before-build': extra('Q?') }),
		de: () => Promise.resolve({ 'before-build': extra('Frage?') })
	}
}));

const blog = await import('./blog');

describe('blog.ts', () => {
	it('cuts English posts at the build time, like translations and availability', () => {
		expect(blog.getAllPosts().map((p) => p.slug)).toEqual(['before-build']);
	});

	it('does not carry the English FAQ and ToC on the posts every page imports', async () => {
		// blog.ts is imported by every localized listing: the ~390 KB English caches must stay out
		// of it and load per post (virtual:blog-extras) only where a post shows them.
		const source = (await import('./blog.ts?raw')).default as string;
		expect(source).not.toMatch(/import[^;]*post-(faqs|toc)\.json/);
		expect(blog.getAllPosts()[0].faqs).toBeUndefined();
		expect(blog.getAllPosts()[0].toc).toBeUndefined();
	});

	it('loads the English FAQ and ToC per post, where the post page loads', async () => {
		expect(await blog.getPostExtras('en', 'before-build')).toEqual({
			faqs: [{ question: 'Q?', answer: 'A.' }],
			toc: [{ id: 'q', text: 'Q?', level: 3 }]
		});
		expect(await blog.getPostExtras('en', 'after-build')).toEqual({});
	});

	it('loads a translation FAQ and ToC per post too, from its locale only', async () => {
		expect((await blog.getPostExtras('de', 'before-build')).faqs).toEqual([{ question: 'Frage?', answer: 'A.' }]);
		expect(await blog.getPostExtras('fr', 'before-build')).toEqual({});
	});
});
