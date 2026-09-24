/**
 * The blog Vite plugin runs when vite.config.ts loads, so a throw there fails `bun run build`
 * (the Cloudflare build). A malformed post must stop it, never degrade to an empty blog.
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { blogMeta } from './vite-blog-meta.mjs';

const dir = mkdtempSync(join(tmpdir(), 'meg-blog-plugin-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

mkdirSync(join(dir, 'de'), { recursive: true });
writeFileSync(
	join(dir, 'a.svx'),
	`---\ntitle: "A"\ndescription: "An English description long enough."\nauthor: "Hector Luis Lorenzo"\npublishDate: 2026-01-10\nexcerpt: "An English excerpt long enough."\ncoverImage: "https://cdn.malagaeventgear.com/blog/x.webp"\n---\nBody.\n`
);
writeFileSync(join(dir, 'de', 'a.svx'), `---\ntitle: "Titel"\ndescription: "short"\n---\nText.\n`);

describe('blogMeta', () => {
	it('fails the build on a malformed translation, naming the file', () => {
		expect(() => blogMeta({ dir })).toThrow(/de\/a: invalid frontmatter/);
	});
});
