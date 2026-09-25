/**
 * The markdown options of the blog's mdsvex preprocessor, shared by svelte.config.js and the
 * image audit of translated posts (src/lib/data/image-alt-audit.ts), so the audit reads a body
 * exactly as the build does. Reached from svelte.config.js: no `.ts` imports here
 * (svelte-config-imports.test.ts).
 */
import remarkGfm from 'remark-gfm';

export const BLOG_MARKDOWN_OPTIONS = Object.freeze({
	extensions: ['.svx'],
	// remarkGfm enables GFM pipe-tables (the migrated posts reconstruct their
	// tables as markdown tables), plus strikethrough/autolinks/task-lists.
	remarkPlugins: [remarkGfm],
	// mdsvex defaults smartypants to true, which rewrites straight quotes/dashes
	// into curly typography at build time even when the .svx source is clean
	// ASCII. Disabled: CLAUDE.md mandates ASCII-only punctuation sitewide.
	smartypants: false
});
