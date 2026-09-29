import { describe, it, expect } from 'vitest';
import { buildInventory, parseCluster, type InventoryPostInput } from './content-inventory';

const pillar: InventoryPostInput = {
	slug: 'audio-visual-rental',
	keyword: 'audio visual rental',
	siloRole: 'pillar',
	targetPage: '/',
	draft: false,
	body: '## Overview\n\nText\n\n### What is AV\n\n## FAQs\n\n### Is it cheap?\n\nYes.\n\n## Table of Contents\n'
};
const supporting: InventoryPostInput = {
	slug: 'sound-system-rental',
	keyword: 'sound system rental',
	siloRole: 'supporting',
	targetPage: '/blog/audio-visual-rental/',
	draft: false,
	body: '## What Is Included\n\n### Speakers\n\n#### Deep\n'
};
const news: InventoryPostInput = {
	slug: 'news-a',
	keyword: 'news a',
	siloRole: 'news',
	targetPage: '/',
	draft: false,
	body: '## Story\n'
};
const draft: InventoryPostInput = { ...supporting, slug: 'draft-post', draft: true };

const faqs = { 'audio-visual-rental': [{ question: 'Is it cheap?', answer: 'Yes.' }] };

describe('buildInventory', () => {
	const posts = buildInventory([pillar, supporting, news, draft], faqs);

	it('excludes drafts', () => {
		expect(posts.map((p) => p.slug)).toEqual([
			'audio-visual-rental',
			'news-a',
			'sound-system-rental'
		]);
	});

	it('gives each post its url, silo role, target and cluster', () => {
		const s = posts.find((p) => p.slug === 'sound-system-rental')!;
		expect(s).toMatchObject({
			url: '/blog/sound-system-rental/',
			keyword: 'sound system rental',
			siloRole: 'supporting',
			targetPage: '/blog/audio-visual-rental/',
			cluster: 'audio visual rental'
		});
		expect(posts.find((p) => p.slug === 'news-a')!.cluster).toBe('news');
	});

	it('lists H2 and H3 headings in order, without the table of contents heading or H4', () => {
		const p = posts.find((x) => x.slug === 'audio-visual-rental')!;
		expect(p.headings).toEqual([
			{ level: 2, text: 'Overview' },
			{ level: 3, text: 'What is AV' },
			{ level: 2, text: 'FAQs' }
		]);
	});

	it('moves FAQ questions out of the headings into faqs', () => {
		const p = posts.find((x) => x.slug === 'audio-visual-rental')!;
		expect(p.faqs).toEqual(['Is it cheap?']);
		expect(p.headings.some((h) => h.text === 'Is it cheap?')).toBe(false);
	});

	it('filters by cluster', () => {
		const only = buildInventory([pillar, supporting, news], faqs, 'audio visual rental');
		expect(only.map((p) => p.slug)).toEqual(['audio-visual-rental', 'sound-system-rental']);
	});
});

describe('parseCluster', () => {
	it('accepts the flag, the flag with equals, split words and nothing', () => {
		expect(parseCluster(['--cluster', 'audio', 'visual', 'rental'])).toBe('audio visual rental');
		expect(parseCluster(['--cluster=audio visual rental'])).toBe('audio visual rental');
		expect(parseCluster(['news'])).toBe('news');
		expect(parseCluster([])).toBeUndefined();
	});
});
