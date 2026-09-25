/**
 * Heading ids of a post body, computed without rendering, so the build can map an English
 * section anchor to the translated one (rehype-localize-links). They must be EXACTLY the ids
 * rehype-slug gives the rendered page: the corpus test below compiles every post on disk with
 * mdsvex and rehype-slug and compares.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { describe, expect, it } from 'vitest';
import { BLOG_MARKDOWN_OPTIONS } from './blog-markdown-options.mjs';
import { BLOG_DIR, listDirs, listSvx } from './blog-files.mjs';
import { headingIdMap, headingIds } from './heading-ids';

describe('headingIds', () => {
	it('slugs every heading in order, deduplicated like rehype-slug', () => {
		const body = '# Top\n\n## Event Lighting\n\nText.\n\n### What We Don\'t Offer\n\n## Event Lighting\n';
		expect(headingIds(body)).toEqual([
			{ id: 'top', level: 1 },
			{ id: 'event-lighting', level: 2 },
			{ id: 'what-we-dont-offer', level: 3 },
			{ id: 'event-lighting-1', level: 2 }
		]);
	});

	it('uses the visible text: no emphasis marks, no link URL, inline code kept', () => {
		const body = '## **Bold** and _emph_\n\n## A [link](/blog/x/) here\n\n## Use `code` now\n';
		expect(headingIds(body).map((h) => h.id)).toEqual(['bold-and-emph', 'a-link-here', 'use-code-now']);
	});

	it('reads setext headings and ignores code blocks and raw HTML', () => {
		const body = 'Setext title\n---\n\n```\n## not a heading\n```\n\n<h2>raw</h2>\n\n## Real\n';
		expect(headingIds(body).map((h) => h.id)).toEqual(['setext-title', 'real']);
	});

	it('keeps letters of every script, as rehype-slug does', () => {
		expect(headingIds('## Bühnengestaltung und Aufbau\n\n## 我们不提供的服务\n').map((h) => h.id)).toEqual([
			'bühnengestaltung-und-aufbau',
			'我们不提供的服务'
		]);
	});
});

describe('headingIdMap', () => {
	const english = '## Event Lighting\n\n### Spotlights\n\n## What We Don\'t Offer\n';

	it('maps each English h2 and h3 id to the translated one, by position', () => {
		const german = '## Eventbeleuchtung\n\n### Scheinwerfer\n\n## Was wir nicht anbieten\n';
		expect(headingIdMap(english, german)).toEqual({
			'event-lighting': 'eventbeleuchtung',
			spotlights: 'scheinwerfer',
			'what-we-dont-offer': 'was-wir-nicht-anbieten'
		});
	});

	it('returns null when the structures do not align (count or levels)', () => {
		expect(headingIdMap(english, '## Eventbeleuchtung\n\n## Was wir nicht anbieten\n')).toBeNull();
		expect(headingIdMap(english, '## Eventbeleuchtung\n\n## Scheinwerfer\n\n## Was wir nicht anbieten\n')).toBeNull();
	});

	it('ignores other heading levels when aligning', () => {
		expect(headingIdMap(`# Title\n\n${english}`, '## Eventbeleuchtung\n\n### Scheinwerfer\n\n#### Detail\n\n## Nicht\n')).toEqual({
			'event-lighting': 'eventbeleuchtung',
			spotlights: 'scheinwerfer',
			'what-we-dont-offer': 'nicht'
		});
	});
});

/** h2 and h3 ids of the page, as the build renders the body (mdsvex, build options, rehype-slug). */
async function renderedIds(body: string): Promise<string[]> {
	const compiled = await compile(body, { ...BLOG_MARKDOWN_OPTIONS, rehypePlugins: [rehypeSlug] });
	return [...(compiled?.code ?? '').matchAll(/<h[23]\s+id="([^"]*)"/g)].map((m) => m[1]);
}

const corpus = [
	...listSvx(BLOG_DIR).map((file: string) => file),
	...listDirs(BLOG_DIR).flatMap((dir: string) => listSvx(join(BLOG_DIR, dir)).map((file: string) => `${dir}/${file}`))
];

describe('every post on disk', () => {
	it.each(corpus)('%s: h2 and h3 ids match what rehype-slug renders', async (file) => {
		const body = matter(readFileSync(join(BLOG_DIR, file), 'utf8')).content;
		const computed = headingIds(body)
			.filter((h) => h.level === 2 || h.level === 3)
			.map((h) => h.id);
		expect(computed).toEqual(await renderedIds(body));
	});
});
