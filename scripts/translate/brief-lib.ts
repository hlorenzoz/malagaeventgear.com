/**
 * Pure part of mkbrief.ts: builds the translator brief of one post from the base brief, the
 * optional per post facts file (scripts/translate/special/<slug>.md) and a standard tail.
 * No I/O here, so it runs on fixtures.
 */

/** The UTC date (YYYY-MM-DD): the build gates `publishDate` in UTC, so the brief does too. */
export function todayUtc(now: Date = new Date()): string {
	return now.toISOString().slice(0, 10);
}

/** A post slug is a file name: lowercase letters, digits and hyphens, never a path. */
export function assertSlug(slug: string): void {
	if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
		throw new Error(`invalid slug "${slug}": expected lowercase letters, digits and hyphens`);
	}
}

/** Replaces every `{slug}` and `{today}`, and nothing else (the brief has other braces). */
export function fillPlaceholders(text: string, slug: string, today: string): string {
	return text.replaceAll('{slug}', slug).replaceAll('{today}', today);
}

/** What every brief ends with, after the post's own facts. */
export function standardTail(today: string): string {
	return [
		'- Structure guard: do not use a structural heading word (overview, highlights, FAQ words of the locale\'s `blogStructure` group) for any other heading, and check each locale\'s `blogStructure` synonyms before naming the conclusion heading (a sv "Sammanfattning" conclusion heading once broke `scripts/post-structure.test.ts`).',
		'- Other sessions work in this repo: do NOT touch CLAUDE.md, Justfile, `.agents/`, scripts/ or any English file. You may RUN the `just post-translate-*` recipes, never edit them. Put any temporary scripts in the scratchpad directory, never in the repo.',
		`- Today is ${today} UTC. \`publishDate\` of every translation is "${today}", \`sourceUpdated\` is the English \`updatedDate\` (read it from the English frontmatter, it may have been bumped today). Sitemap count expectation: read the current English published count and add the translations of this post: report the real numbers.`
	].join('\n');
}

export interface BriefInput {
	/** Contents of brief-base.md. */
	base: string;
	/** Contents of special/<slug>.md, or null when the post has none. */
	special: string | null;
	slug: string;
	today: string;
}

/**
 * base (placeholders filled), then the post's special facts, then the standard tail. Blocks are
 * joined by one newline and the brief ends with one newline.
 */
export function buildBrief({ base, special, slug, today }: BriefInput): string {
	if (base.includes('SPECIAL FOR THIS POST')) {
		throw new Error(
			'brief-base.md must not contain a SPECIAL FOR THIS POST section: it belongs in special/<slug>.md'
		);
	}
	const blocks = [base, special ?? '', standardTail(today)]
		.map((block) => fillPlaceholders(block, slug, today).replace(/\s+$/, ''))
		.filter((block) => block.length > 0);
	return blocks.join('\n') + '\n';
}
