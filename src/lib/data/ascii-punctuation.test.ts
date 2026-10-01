import { describe, expect, it } from 'vitest';
import {
	findForbiddenChars,
	findSemicolons,
	stripCode
} from '../../../scripts/translate/check-lib';

/**
 * Guard for rule 12 of CLAUDE.md (no typographic characters of AI text) over every blog post, English
 * and the 12 translations. Chinese full width punctuation is fine, and `<script>`, code, entities and
 * style attributes are skipped. The fix for a failure is to correct the text, never to add an allowlist.
 */
const posts = import.meta.glob('/src/content/blog/**/*.svx', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

describe('rule 12: ASCII punctuation in every blog post', () => {
	it('scans every post', () => {
		expect(Object.keys(posts).length).toBeGreaterThan(900);
	});

	it('has no typographic characters (dashes, curly quotes, ellipsis, nbsp, bullets, guillemets)', () => {
		const offenders = Object.entries(posts).flatMap(([path, raw]) =>
			findForbiddenChars(stripCode(raw)).map((f) => `${path}:${f.line} ${f.name} x${f.count}`)
		);
		expect(offenders).toEqual([]);
	});

	it('has no ASCII semicolons in prose', () => {
		const offenders = Object.entries(posts).flatMap(([path, raw]) =>
			findSemicolons(raw).map((line) => `${path}:${line}`)
		);
		expect(offenders).toEqual([]);
	});
});
