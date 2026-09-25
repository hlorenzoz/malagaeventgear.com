/**
 * Images of a post body as the BUILD renders them (Fase 4 guard, translated-post-images.test.ts).
 * A translated post needs an alt on every image, in its language: the build never uses the
 * English manifest alt there (scripts/rehype-blog-images.mjs).
 *
 * The body is compiled with mdsvex and the build's own markdown options
 * (scripts/blog-markdown-options.mjs), never with another markdown parser. mdsvex ships its own,
 * older remark, which does NOT accept every CommonMark form: a parenthesized title
 * (`![alt](url (title))`) is printed as raw text there, while a current parser would read it as
 * an image and pass it. Reading the rendered output makes the audit agree with the page.
 * Test code only: it is not imported by the app or the build.
 */
import { compile } from 'mdsvex';
import { BLOG_MARKDOWN_OPTIONS } from '../../../scripts/blog-markdown-options.mjs';

export interface ImageAudit {
	/** Sources of the rendered images with an empty or missing alt, in document order. */
	withoutAlt: string[];
	/** Markdown images or links the build printed as raw text, as they appear in the page. */
	unrendered: string[];
}

/**
 * Markdown image or link syntax left as text: `![alt](url ...)` or `[text](url ...)`. Newlines
 * are allowed inside: mdsvex wraps a long line, and the autolinked URL tag, over several lines.
 */
const RAW_MARKDOWN = /!?\[[^[\]]*\]\((?:[^()]|\([^()]*\))*\)/g;

export async function auditPostImages(body: string): Promise<ImageAudit> {
	const compiled = await compile(body, { ...BLOG_MARKDOWN_OPTIONS });
	// Scripts carry no content, and code shows markdown on purpose.
	const html = (compiled?.code ?? '')
		.replace(/<script\b[\s\S]*?<\/script>/gi, '')
		.replace(/<pre\b[\s\S]*?<\/pre>/gi, '')
		.replace(/<code\b[\s\S]*?<\/code>/gi, '');

	const withoutAlt: string[] = [];
	for (const [img] of html.matchAll(/<img\b[^>]*>/gi)) {
		const alt = img.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|(\{[^}]*\}))/i);
		if (!alt || (alt[1] ?? alt[2] ?? alt[3] ?? '').trim() === '') {
			withoutAlt.push(img.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? img);
		}
	}
	const unrendered = [...html.matchAll(RAW_MARKDOWN)].map((m) => m[0]);
	return { withoutAlt, unrendered };
}
