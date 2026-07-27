import { describe, it, expect } from 'vitest';
import matter from 'gray-matter';

/**
 * Regression guard for a specific SEO audit finding (seo-audit/malagaeventgear.com):
 * `wedding-rentals.svx`'s frontmatter `description` was truncated mid-word
 * ("...an intimate beach cerem") and carried a curly apostrophe. Both break the
 * rendered <meta name="description">, og:description and Article JSON-LD
 * `description` (all sourced verbatim from this one field, no separate copy).
 *
 * Scoped to this one file (not a site-wide sweep): the WP-style excerpt
 * truncation marker ("[...]") is a deliberate, documented convention used
 * identically across 75+ other posts (see AGENTS.md content-authoring notes)
 * and is explicitly out of scope here.
 */

const raw = import.meta.glob('../../content/blog/wedding-rentals.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function loadFrontmatter() {
	const [, contents] = Object.entries(raw)[0] ?? [];
	if (!contents) throw new Error('wedding-rentals.svx not found via import.meta.glob');
	return matter(contents).data as { description?: string };
}

const ASCII_ONLY = /^[\x00-\x7F]*$/;
const SENTENCE_END = /[.!?]$/;

describe('wedding-rentals.svx frontmatter description', () => {
	it('exists and is not the known-truncated value', () => {
		const { description } = loadFrontmatter();
		expect(description).toBeDefined();
		expect(description).not.toMatch(/cerem$/);
	});

	it('is a complete sentence (ends with terminal punctuation)', () => {
		const { description } = loadFrontmatter();
		expect(description!.trim()).toMatch(SENTENCE_END);
	});

	it('contains only ASCII punctuation (AGENTS.md #12: no curly quotes/dashes)', () => {
		const { description } = loadFrontmatter();
		expect(ASCII_ONLY.test(description!)).toBe(true);
	});
});
