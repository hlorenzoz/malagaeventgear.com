/**
 * The blog Vite plugin. `vite build` (the Cloudflare build) FAILS on a malformed post, never
 * degrading to an empty blog. `vite dev` and `vite preview` report it and keep serving, leaving
 * out only the bad file, so one broken draft never stops the dev server.
 *
 * FAQ and ToC travel per post (`virtual:blog-extras/<locale>/<slug>`), never inside the shared
 * per locale frontmatter chunk.
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { blogMeta } from './vite-blog-meta.mjs';

const dirs: string[] = [];
afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })));

function fixture(files: Record<string, string>): string {
	const dir = mkdtempSync(join(tmpdir(), 'meg-blog-plugin-'));
	dirs.push(dir);
	for (const [path, content] of Object.entries(files)) {
		mkdirSync(join(dir, path, '..'), { recursive: true });
		writeFileSync(join(dir, path), content);
	}
	return dir;
}

const english = (title: string) =>
	`---\ntitle: "${title}"\ndescription: "An English description long enough."\nauthor: "Hector Luis Lorenzo"\npublishDate: 2026-01-10\nexcerpt: "An English excerpt long enough."\ncoverImage: "https://cdn.malagaeventgear.com/blog/x.webp"\nsiloRole: standalone\n---\n## FAQs\n\n### English question?\n\nAnswer.\n`;
const german = `---\ntitle: "Titel"\ndescription: "Eine Beschreibung, lang genug."\nexcerpt: "Ein Auszug, lang genug."\npublishDate: "2026-02-01"\nsourceUpdated: "2026-01-10"\n---\n## Häufige Fragen\n\n### Deutsche Frage?\n\nAntwort.\n`;
const broken = `---\ntitle: "Titel"\ndescription: "short"\ndraft: true\n---\nText.\n`;

type Hooked = ReturnType<typeof blogMeta> & {
	configResolved: (config: unknown) => void;
	load: (id: string) => string | undefined;
};

function plugin(dir: string, command: 'build' | 'serve', errors: string[] = []): Hooked {
	const p = blogMeta({ dir, maps: { de: { pages: { '/blog/': { path: '/blog/', keyword: 'blog', status: 'propuesta' } }, segments: { category: 'kategorie', author: 'autor' }, packages: {}, categories: {}, posts: { a: { slug: 'a-de', keyword: 'kw', status: 'propuesta' } } } } }) as Hooked;
	p.configResolved({ command, logger: { error: (m: string) => errors.push(m), warn: () => {}, info: () => {} } });
	return p;
}

describe('blogMeta: malformed posts', () => {
	it('never throws while Vite loads the config (dev and preview must start)', () => {
		const dir = fixture({ 'a.svx': english('A'), 'de/a.svx': german, 'de/b.svx': broken });
		expect(() => blogMeta({ dir })).not.toThrow();
	});

	it('fails `vite build`, naming the file', () => {
		const dir = fixture({ 'a.svx': english('A'), 'b.svx': english('B'), 'de/a.svx': german, 'de/b.svx': broken });
		expect(() => plugin(dir, 'build')).toThrow(/de\/b: invalid frontmatter/);
	});

	it('in dev and preview reports it and skips only the bad file', () => {
		const dir = fixture({ 'a.svx': english('A'), 'b.svx': english('B'), 'de/a.svx': german, 'de/b.svx': broken });
		const errors: string[] = [];
		const p = plugin(dir, 'serve', errors);
		expect(errors.join('\n')).toMatch(/de\/b: invalid frontmatter/);
		const de = p.load('\0virtual:blog-translations/de')!;
		expect(de).toContain('content/blog/de/a.svx');
		expect(de).not.toContain('content/blog/de/b.svx');
	});
});

describe('blogMeta: FAQ and ToC per post', () => {
	const dir = fixture({ 'a.svx': english('A'), 'de/a.svx': german });
	const p = plugin(dir, 'build');

	it('keeps them out of the shared per locale chunk', () => {
		const de = p.load('\0virtual:blog-translations/de')!;
		expect(de).toContain('Titel');
		expect(de).not.toContain('Deutsche Frage');
	});

	it('serves each post its own chunk, per locale', () => {
		expect(p.load('\0virtual:blog-extras')).toMatch(/"de": \(\) => import\("virtual:blog-extras\/de"\)/);
		expect(p.load('\0virtual:blog-extras/de')).toContain('"a": () => import("virtual:blog-extras/de/a")');
		expect(p.load('\0virtual:blog-extras/de/a')).toContain('Deutsche Frage?');
		expect(p.load('\0virtual:blog-extras/de/a')).not.toContain('English question');
	});
});

describe('blogMeta: tables of rehype-localize-links', () => {
	it('publishes the heading ids of each translated post, for links to its sections', () => {
		const shared = globalThis as typeof globalThis & { __megHeadingIds?: Record<string, Record<string, Record<string, string>>> };
		delete shared.__megHeadingIds;
		plugin(fixture({ 'a.svx': english('A'), 'de/a.svx': german }), 'build');
		expect(shared.__megHeadingIds?.de?.['/blog/a/']).toEqual({ faqs: 'häufige-fragen', 'english-question': 'deutsche-frage' });
	});
});
