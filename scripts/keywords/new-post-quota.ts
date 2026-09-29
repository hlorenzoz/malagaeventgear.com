#!/usr/bin/env bun
/**
 * new-post-quota.ts: how many `new-post` items a content plan may carry on a given day (user
 * decision, 2026-09-29). While any published English post still lacks a translation in one of the
 * 12 site languages, the limit stays at 1: the translation backlog goes first. Once every post is
 * translated, the limit alternates 1 and 2 day by day (by the parity of the day number since the
 * epoch, so it keeps alternating across month ends). Each new post ships with its 12 translations
 * in the same change (CLAUDE.md, "Reglas mandatorias de idioma"), which the TODO task already says.
 *
 * `just content-candidates` prints the quota for the agent, and `plan-to-todo.ts --check` rejects a
 * plan above it, so the limit is enforced by code, not only by the prompt.
 */

import { join } from 'node:path';
import { BlogPostSchema } from '../../src/lib/types/blog';
import { PAGE_LOCALES } from '../../src/lib/i18n/availability';
// @ts-expect-error: blog-files.mjs is @ts-nocheck (Node-only helper), no type declarations.
import { BLOG_DIR, listSvx, readPost } from '../blog-files.mjs';
import type { ContentPlan } from './plan.schema';

export interface TranslationBacklog {
	englishPosts: number;
	locales: number;
	/** Missing (post, locale) pairs. */
	missing: number;
	complete: boolean;
}

export interface NewPostQuota {
	limit: 1 | 2;
	reason: string;
}

/** Pure: how many published English posts are still untranslated, pair by pair. */
export function translationBacklog(
	englishSlugs: string[],
	translatedByLocale: Record<string, string[]>,
	locales: readonly string[]
): TranslationBacklog {
	let missing = 0;
	for (const locale of locales) {
		const done = new Set(translatedByLocale[locale] ?? []);
		missing += englishSlugs.filter((slug) => !done.has(slug)).length;
	}
	return { englishPosts: englishSlugs.length, locales: locales.length, missing, complete: missing === 0 };
}

function dayNumber(date: string): number {
	const [y, m, d] = date.split('-').map(Number);
	return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

/** Pure: the new-post limit of `date` (YYYY-MM-DD) given the translation backlog. */
export function newPostQuota(date: string, backlog: TranslationBacklog): NewPostQuota {
	if (!backlog.complete) {
		return {
			limit: 1,
			reason: `${backlog.missing} translation(s) of published posts still missing: 1 new post per day until the backlog is done`
		};
	}
	const limit = dayNumber(date) % 2 === 0 ? 2 : 1;
	return {
		limit,
		reason: `every published post is translated: the limit alternates 1 and 2, today ${limit}`
	};
}

/** Pure: null when the plan respects the quota, otherwise the error message. */
export function checkNewPostQuota(plan: ContentPlan, quota: NewPostQuota): string | null {
	const count = plan.items.filter((i) => i.action === 'new-post').length;
	if (count <= quota.limit) return null;
	return `${count} new-post items, the limit for ${plan.date} is ${quota.limit} (${quota.reason})`;
}

const isFixture = (file: string) => file.replace(/\.svx$/, '').endsWith('-test-fixture');

function publishedSlugs(dir: string, parse: (data: unknown) => { draft?: boolean }): string[] {
	return listSvx(dir)
		.filter((f: string) => !isFixture(f))
		.filter((f: string) => !parse(readPost(join(dir, f)).data).draft)
		.map((f: string) => f.replace(/\.svx$/, ''));
}

/** Real read: the backlog from `src/content/blog` and its locale folders. */
export function readTranslationBacklog(): TranslationBacklog {
	const english = publishedSlugs(BLOG_DIR, (d) => BlogPostSchema.parse(d));
	const locales = PAGE_LOCALES.filter((l) => l !== 'en');
	const translated = Object.fromEntries(
		locales.map((l) => [
			l,
			publishedSlugs(join(BLOG_DIR, l), (d) => ({ draft: (d as { draft?: boolean }).draft === true }))
		])
	);
	return translationBacklog(english, translated, locales);
}

if (import.meta.main) {
	const date = process.argv[2] ?? new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' });
	const backlog = readTranslationBacklog();
	console.log(JSON.stringify({ date, ...newPostQuota(date, backlog), backlog }));
}
