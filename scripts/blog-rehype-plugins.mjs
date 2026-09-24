/**
 * The rehype plugins of every blog post body, in order. One list for svelte.config.js (the build)
 * and the tests that render a post body through mdsvex.
 *
 * Execution order matters:
 * 1. rehypeSlug assigns ids to all headings (must be first).
 *    rehypeInternalLinks then rehypeLocalizeLinks: legacy WordPress links become the English
 *    routes, then a TRANSLATED post's English routes become its locale's URLs (only what is
 *    published there, tables from scripts/vite-blog-meta.mjs).
 * 2. rehypeBlogImages enriches <img> with srcset/alt/dimensions (a translated post keeps its own
 *    alt and caption, never the English manifest's).
 * 3. rehypeImageGallery groups consecutive images into scroll-snap galleries (after
 *    rehypeBlogImages, so srcset is already set).
 * 4. rehypePostToc removes the old inline ToC and an empty testimonials section, and injects the
 *    mobile ToC after the highlights (needs ids from rehypeSlug, runs before rehypeFaqAccordion,
 *    which restructures h3 nodes).
 * 5. rehypeSectionCards wraps the overview and highlights sections in cards (after rehypePostToc).
 * 6. rehypeTableWrap wraps <table> in .table-wrap for responsive scroll.
 * 7. rehypeFaqAccordion MUST be last (restructures h3 nodes into <details>).
 *
 * Steps 4, 5 and 7 match the section headings in the post's own language
 * (scripts/blog-structure-words.mjs).
 */
import rehypeSlug from 'rehype-slug';
import { rehypeBlogImages } from './rehype-blog-images.mjs';
import { rehypeFaqAccordion } from './rehype-faq-accordion.mjs';
import { rehypePostToc } from './rehype-post-toc.mjs';
import { rehypeSectionCards } from './rehype-section-cards.mjs';
import { rehypeImageGallery } from './rehype-image-gallery.mjs';
import { rehypeInternalLinks } from './rehype-internal-links.mjs';
import { rehypeLocalizeLinks } from './rehype-localize-links.mjs';
import { rehypeTableWrap } from './rehype-table-wrap.mjs';

export const BLOG_REHYPE_PLUGINS = [
	rehypeSlug,
	rehypeInternalLinks,
	rehypeLocalizeLinks,
	rehypeBlogImages,
	rehypeImageGallery,
	rehypePostToc,
	rehypeSectionCards,
	rehypeTableWrap,
	rehypeFaqAccordion
];
