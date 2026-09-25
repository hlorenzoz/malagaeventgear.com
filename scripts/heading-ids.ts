/**
 * Heading ids of a post body without rendering it (build side, Fase 4).
 *
 * A translated post links to a section of another post with the ENGLISH fragment
 * (`/blog/<en-slug>/#what-we-dont-offer`). Once that post is published in the locale, its
 * headings carry translated ids, so rehype-localize-links maps the fragment with the table built
 * here: translations keep the English heading structure, so the nth h2 or h3 of the English
 * body is the nth h2 or h3 of the translation.
 *
 * The ids are the ones rehype-slug gives the rendered page: every heading (any level, for the
 * slugger's dedup state) in document order, github-slugger over the heading's visible text.
 * scripts/heading-ids.test.ts compares them with mdsvex plus rehype-slug on every post on disk.
 *
 * Reached from vite.config.ts only (through scripts/blog-sources.ts), never from svelte.config.js.
 */
import GithubSlugger from 'github-slugger';
import { fromMarkdown } from 'mdast-util-from-markdown';

export interface HeadingId {
	id: string;
	level: number;
}

interface MdNode {
	type: string;
	depth?: number;
	value?: string;
	children?: MdNode[];
}

/** Visible text of a heading, as hast-util-to-string reads the rendered element. */
function visibleText(node: MdNode): string {
	if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
	// Raw HTML is not text, and an image renders as <img> (its alt is not text content).
	if (node.type === 'html' || node.type === 'image' || node.type === 'imageReference') return '';
	return (node.children ?? []).map(visibleText).join('');
}

/** Every heading of the body, in document order, with the id rehype-slug gives it. */
export function headingIds(body: string): HeadingId[] {
	const slugger = new GithubSlugger();
	const headings: HeadingId[] = [];
	const walk = (node: MdNode) => {
		if (node.type === 'heading') headings.push({ id: slugger.slug(visibleText(node)), level: node.depth ?? 0 });
		for (const child of node.children ?? []) walk(child);
	};
	walk(fromMarkdown(body) as MdNode);
	return headings;
}

const sections = (body: string) => headingIds(body).filter((h) => h.level === 2 || h.level === 3);

/**
 * English h2/h3 id to the translation's h2/h3 id, by position. Null when the two bodies do not
 * have the same h2/h3 structure (count and levels): a fragment is then left as it is rather than
 * pointed at the wrong section.
 */
export function headingIdMap(englishBody: string, translatedBody: string): Record<string, string> | null {
	const english = sections(englishBody);
	const translated = sections(translatedBody);
	if (english.length !== translated.length || english.some((h, i) => h.level !== translated[i].level)) return null;
	return Object.fromEntries(english.map((h, i) => [h.id, translated[i].id]));
}
