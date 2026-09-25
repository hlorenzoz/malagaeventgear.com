/**
 * Guard (Fase 4): a translated post that links to a SECTION of another post published in the
 * same locale (`/blog/<en-slug>/#english-id` in the source) must land on an id that exists on
 * that translated page. The build maps the English fragment to the translated heading id
 * (rehype-localize-links with the heading id tables of scripts/heading-ids.ts). When the two
 * posts do not share the English heading structure the fragment stays English and misses: this
 * test fails then, naming the file and the link.
 *
 * Both sides are rendered as the build renders them: the linking post with mdsvex, the build's
 * markdown options and the link plugins fed with the build's own tables, the target post with
 * mdsvex and rehype-slug (the ids of the page).
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { afterAll, describe, expect, it } from 'vitest';
import { BLOG_MARKDOWN_OPTIONS } from './blog-markdown-options.mjs';
import { readPost } from './blog-files.mjs';
import { BLOG_DIR, computeBlogState, headingIdTables, localizedLinkTables } from './blog-sources';
import { rehypeInternalLinks } from './rehype-internal-links.mjs';
import { rehypeLocalizeLinks } from './rehype-localize-links.mjs';
import { CONTENT_MAPS } from '../src/lib/i18n/content-map/all';
import type { LocaleContentMap } from '../src/lib/i18n/content-map/schema';

type Shared = typeof globalThis & { __megLocalizedLinks?: unknown; __megHeadingIds?: unknown };

const decode = (value: string) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

async function render(body: string, filename: string, plugins: unknown[]): Promise<string> {
	return (await compile(body, { ...BLOG_MARKDOWN_OPTIONS, rehypePlugins: plugins as never, filename }))?.code ?? '';
}

/** Section links of the translated posts that miss an id of the target translated page. */
async function anchorProblems(dir: string, now: Date, maps: Partial<Record<string, LocaleContentMap>>): Promise<string[]> {
	const state = computeBlogState({ dir, now, maps: maps as never });
	const shared = globalThis as Shared;
	const saved = { links: shared.__megLocalizedLinks, ids: shared.__megHeadingIds };
	const links = localizedLinkTables(state, maps as never);
	shared.__megLocalizedLinks = links;
	shared.__megHeadingIds = headingIdTables(state, dir);
	const problems: string[] = [];
	try {
		for (const [locale, localeState] of Object.entries(state.locales)) {
			const table = (links as Record<string, Record<string, string>>)[locale] ?? {};
			const slugOf = new Map(localeState!.availability.posts.map((slug) => [table[`/blog/${slug}/`], slug]));
			const idsOf = new Map<string, Promise<Set<string>>>();
			const pageIds = (slug: string) => {
				if (!idsOf.has(slug)) {
					const body = readPost(join(dir, locale, `${slug}.svx`)).body;
					idsOf.set(slug, render(body, `/src/content/blog/${locale}/${slug}.svx`, [rehypeSlug]).then((html) => new Set([...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]))));
				}
				return idsOf.get(slug)!;
			};
			for (const slug of localeState!.availability.posts) {
				const filename = `/src/content/blog/${locale}/${slug}.svx`;
				const html = await render(readPost(join(dir, locale, `${slug}.svx`)).body, filename, [rehypeSlug, rehypeInternalLinks, rehypeLocalizeLinks]);
				for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
					const hash = href.indexOf('#');
					if (hash === -1) continue;
					const target = slugOf.get(href.slice(0, hash).replace(/\?.*$/, ''));
					if (!target) continue;
					const fragment = decode(href.slice(hash + 1));
					if (!(await pageIds(target)).has(fragment)) {
						problems.push(`${locale}/${slug}.svx: ${href} (no id "${fragment}" on the ${locale} page of ${target})`);
					}
				}
			}
		}
	} finally {
		shared.__megLocalizedLinks = saved.links;
		shared.__megHeadingIds = saved.ids;
	}
	return problems;
}

describe('anchorProblems (fixture)', () => {
	const dir = mkdtempSync(join(tmpdir(), 'meg-blog-anchors-'));
	afterAll(() => rmSync(dir, { recursive: true, force: true }));
	const put = (path: string, frontmatter: string, body: string) => {
		mkdirSync(join(dir, path, '..'), { recursive: true });
		writeFileSync(join(dir, path), `---\n${frontmatter}\n---\n${body}`);
	};
	const englishFm = (title: string) =>
		`title: "${title}"\ndescription: "An English description long enough."\nauthor: "Hector Luis Lorenzo"\npublishDate: 2026-01-10\nexcerpt: "An English excerpt long enough."\ncoverImage: "https://cdn.malagaeventgear.com/blog/x.webp"\nsiloRole: standalone`;
	const deFm = `title: "Titel"\ndescription: "Eine Beschreibung, lang genug."\nexcerpt: "Ein Auszug, lang genug."\npublishDate: "2026-09-01"\nsourceUpdated: "2026-01-10"`;
	const map: LocaleContentMap = {
		pages: { '/': { path: '/' }, '/blog/': { path: '/blog/', keyword: 'blog', status: 'propuesta' } },
		segments: { category: 'kategorie', author: 'autor' },
		packages: {},
		categories: {},
		posts: {
			a: { slug: 'a-de', keyword: 'kw a', status: 'propuesta' },
			b: { slug: 'b-de', keyword: 'kw b', status: 'propuesta' },
			c: { slug: 'c-de', keyword: 'kw c', status: 'propuesta' }
		}
	};
	const NOW = new Date('2026-09-24T12:00:00Z');

	put('a.svx', englishFm('A'), 'See [lighting](/blog/b/#event-lighting) and [staging](/blog/c/#staging).\n');
	put('b.svx', englishFm('B'), "## Event Lighting\n\n## What We Don't Offer\n");
	put('c.svx', englishFm('C'), '## Intro\n\n## Staging\n');
	put('de/a.svx', deFm, 'Siehe [Licht](/blog/b/#event-lighting) und [Buehne](/blog/c/#staging).\n');

	it('passes when the build maps the fragment to the translated heading (same structure)', async () => {
		put('de/b.svx', deFm, '## Eventbeleuchtung\n\n## Was wir nicht anbieten\n');
		expect(await anchorProblems(dir, NOW, { de: map })).toEqual([]);
	});

	it('fails when the target translation does not keep the English heading structure', async () => {
		put('de/b.svx', deFm, '## Eventbeleuchtung\n');
		expect(await anchorProblems(dir, NOW, { de: map })).toEqual([
			'de/a.svx: /de/blog/b-de/#event-lighting (no id "event-lighting" on the de page of b)'
		]);
	});

	it('ignores links to a post not published in the locale (they point to the English page)', async () => {
		put('de/b.svx', deFm, '## Eventbeleuchtung\n\n## Was wir nicht anbieten\n');
		const problems = await anchorProblems(dir, NOW, { de: map });
		expect(problems.some((p) => p.includes('/blog/c/'))).toBe(false);
	});
});

describe('translated posts on disk', () => {
	it('every section link to another post published in the locale lands on an id of that page', async () => {
		expect(await anchorProblems(BLOG_DIR, new Date(), CONTENT_MAPS as never)).toEqual([]);
	}, 60_000);
});
