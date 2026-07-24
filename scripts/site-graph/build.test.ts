import { describe, it, expect } from 'vitest';
import { validateGraph, renderMap, postUrl, type PostRecord } from './build';

function rec(overrides: Partial<PostRecord> & { slug: string }): PostRecord {
	return {
		title: overrides.slug,
		draft: false,
		categories: [],
		...overrides
	};
}

describe('validateGraph', () => {
	it('passes a valid pillar + supporting + standalone graph', () => {
		const records = [
			rec({ slug: 'audio-visual-rental', siloRole: 'pillar', targetPage: '/' }),
			rec({
				slug: 'av-for-weddings',
				siloRole: 'supporting',
				targetPage: '/blog/audio-visual-rental/'
			}),
			rec({ slug: 'news-item', siloRole: 'standalone', targetPage: '' })
		];
		expect(validateGraph(records)).toEqual([]);
	});

	it('flags a post with no siloRole', () => {
		const errors = validateGraph([rec({ slug: 'orphan' })]);
		expect(errors).toHaveLength(1);
		expect(errors[0]).toContain('falta siloRole');
	});

	it('flags an invalid siloRole value', () => {
		const errors = validateGraph([rec({ slug: 'weird', siloRole: 'hub' })]);
		expect(errors[0]).toContain('siloRole invalido');
	});

	it('flags a supporting post with no targetPage', () => {
		const errors = validateGraph([rec({ slug: 's', siloRole: 'supporting', targetPage: '' })]);
		expect(errors[0]).toContain('sin targetPage');
	});

	it('flags a targetPage that does not resolve to an existing node', () => {
		const errors = validateGraph([
			rec({ slug: 's', siloRole: 'supporting', targetPage: '/blog/ghost/' })
		]);
		expect(errors[0]).toContain('no resuelve');
	});

	it('flags a supporting post that points at the homepage instead of a pillar', () => {
		const errors = validateGraph([rec({ slug: 's', siloRole: 'supporting', targetPage: '/' })]);
		expect(errors).toHaveLength(1);
		expect(errors[0]).toContain("apunta al home");
	});

	it('flags a "both" post that points at the homepage instead of a pillar', () => {
		const errors = validateGraph([rec({ slug: 'b', siloRole: 'both', targetPage: '/' })]);
		expect(errors[0]).toContain("apunta al home");
	});

	it('flags a pillar that points somewhere other than the homepage', () => {
		const errors = validateGraph([
			rec({ slug: 'p', siloRole: 'pillar', targetPage: '/blog/other/' }),
			rec({ slug: 'other', siloRole: 'pillar', targetPage: '/' })
		]);
		expect(errors.some((e) => e.includes('debe apuntar al home'))).toBe(true);
	});
});

describe('renderMap', () => {
	const records = [
		rec({ slug: 'audio-visual-rental', keyword: 'audio visual rental', siloRole: 'pillar', targetPage: '/' }),
		rec({
			slug: 'av-for-weddings',
			keyword: 'audio visual rental for weddings',
			siloRole: 'supporting',
			targetPage: '/blog/audio-visual-rental/'
		}),
		rec({ slug: 'news-item', keyword: 'news item', siloRole: 'standalone', targetPage: '' })
	];

	it('is deterministic (pure function of the records)', () => {
		expect(renderMap(records)).toBe(renderMap(records));
	});

	it('is order-independent (records sorted internally)', () => {
		const reversed = [...records].reverse();
		expect(renderMap(reversed)).toBe(renderMap(records));
	});

	it('contains a mermaid graph and the pillar tree', () => {
		const out = renderMap(records);
		expect(out).toContain('```mermaid');
		expect(out).toContain(postUrl('audio-visual-rental'));
		expect(out).toContain('Standalone');
	});

	it('never emits the literal "(undefined)" when a record lacks siloRole', () => {
		const out = renderMap([rec({ slug: 'no-role', keyword: 'no role' })]);
		expect(out).not.toContain('(undefined)');
		expect(out).toContain('(?)');
	});
});
