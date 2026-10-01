#!/usr/bin/env bun
/**
 * heading-id.ts: the id a heading gets on the page (rehype-slug, github-slugger), for the in-page
 * anchors of a translated post: `just post-heading-id "Heading one" "Heading two"` prints one id
 * per line. Each heading is slugged on its own (no duplicate suffix, that only happens inside one
 * post when two headings read the same).
 */
import GithubSlugger from 'github-slugger';

/** Pure: the id of one heading text. */
export function headingIdOf(text: string): string {
	return new GithubSlugger().slug(text);
}

if (import.meta.main) {
	const headings = process.argv.slice(2);
	if (headings.length === 0) {
		console.error('usage: heading-id.ts "<heading>" ["<heading>" ...]');
		process.exit(2);
	}
	for (const h of headings) console.log(headingIdOf(h));
}
