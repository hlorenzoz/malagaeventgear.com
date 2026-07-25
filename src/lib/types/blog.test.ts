import { describe, it, expect } from 'vitest';
import { BlogPostSchema } from './blog';

describe('BlogPostSchema', () => {
	const validPost = {
		title: 'My Post',
		description: 'A great post about events in Malaga.',
		author: 'Hector Lorenzo',
		slug: 'my-post',
		publishDate: '2025-01-15',
		categories: ['weddings'],
		tags: ['malaga'],
		excerpt: 'A short excerpt about the post content.',
		coverImage: 'https://cdn.malagaeventgear.com/blog/image.webp',
		draft: false
	};

	it('accepts valid data', () => {
		expect(() => BlogPostSchema.parse(validPost)).not.toThrow();
	});

	it('accepts ISO 8601 datetime with offset as publishDate', () => {
		const data = { ...validPost, publishDate: '2025-01-15T10:00:00+00:00' };
		expect(() => BlogPostSchema.parse(data)).not.toThrow();
	});

	it('throws when title is missing', () => {
		const { title: _title, ...rest } = validPost;
		expect(() => BlogPostSchema.parse(rest)).toThrow();
	});

	it('throws when title is empty string', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, title: '' })).toThrow();
	});

	it('throws when publishDate is invalid', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, publishDate: 'not-a-date' })).toThrow();
	});

	it('throws when description is too short (< 10 chars)', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, description: 'Short' })).toThrow();
	});

	it('draft defaults to false when omitted', () => {
		const { draft: _draft, ...rest } = validPost;
		const result = BlogPostSchema.parse(rest);
		expect(result.draft).toBe(false);
	});

	it('categories defaults to [] when omitted', () => {
		const { categories: _categories, ...rest } = validPost;
		const result = BlogPostSchema.parse(rest);
		expect(result.categories).toEqual([]);
	});

	it('tags defaults to [] when omitted', () => {
		const { tags: _tags, ...rest } = validPost;
		const result = BlogPostSchema.parse(rest);
		expect(result.tags).toEqual([]);
	});

	it('updatedDate is optional', () => {
		const result = BlogPostSchema.parse(validPost);
		expect(result.updatedDate).toBeUndefined();
	});

	it('accepts updatedDate as plain YYYY-MM-DD', () => {
		const result = BlogPostSchema.parse({ ...validPost, updatedDate: '2026-02-17' });
		expect(result.updatedDate).toBe('2026-02-17');
	});

	it('accepts updatedDate as ISO 8601 datetime with offset', () => {
		const data = { ...validPost, updatedDate: '2026-02-17T10:00:00+01:00' };
		expect(() => BlogPostSchema.parse(data)).not.toThrow();
	});

	it('throws when updatedDate is not a valid date', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, updatedDate: 'yesterday' })).toThrow();
	});

	it('coverImage is required — throws when absent', () => {
		const { coverImage: _ci, ...rest } = validPost;
		expect(() => BlogPostSchema.parse(rest)).toThrow();
	});

	it('excerpt is required — throws when absent', () => {
		const { excerpt: _ex, ...rest } = validPost;
		expect(() => BlogPostSchema.parse(rest)).toThrow();
	});

	it('excerpt must be at least 10 chars', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, excerpt: 'Too short' })).toThrow();
	});

	it('coverImage must be a valid URL when provided', () => {
		expect(() =>
			BlogPostSchema.parse({ ...validPost, coverImage: 'not-a-url' })
		).toThrow();
	});

	it('accepts coverImage as a valid URL', () => {
		const result = BlogPostSchema.parse({
			...validPost,
			coverImage: 'https://cdn.malagaeventgear.com/blog/image.webp'
		});
		expect(result.coverImage).toBe('https://cdn.malagaeventgear.com/blog/image.webp');
	});

	// Reverse silo metadata (keyword / siloRole / targetPage)
	it('accepts optional keyword, siloRole and targetPage', () => {
		const result = BlogPostSchema.parse({
			...validPost,
			keyword: 'wedding rentals',
			siloRole: 'supporting',
			targetPage: '/blog/wedding-rentals/'
		});
		expect(result.keyword).toBe('wedding rentals');
		expect(result.siloRole).toBe('supporting');
		expect(result.targetPage).toBe('/blog/wedding-rentals/');
	});

	it.each(['pillar', 'supporting', 'both', 'news', 'standalone'])(
		'accepts siloRole "%s"',
		(role) => {
			const result = BlogPostSchema.parse({ ...validPost, siloRole: role });
			expect(result.siloRole).toBe(role);
		}
	);

	it('throws when siloRole is not a known value', () => {
		expect(() => BlogPostSchema.parse({ ...validPost, siloRole: 'hub' })).toThrow();
	});

	it('silo metadata fields are optional — undefined when omitted', () => {
		const result = BlogPostSchema.parse(validPost);
		expect(result.keyword).toBeUndefined();
		expect(result.siloRole).toBeUndefined();
		expect(result.targetPage).toBeUndefined();
	});
});
