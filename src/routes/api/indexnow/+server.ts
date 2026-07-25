import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB } from '$lib/server/db/client';
import { getIndexNowSubmissions } from '$lib/server/db/queries';
import { IndexNowSubmitInputSchema } from '$lib/server/indexnow/schema';
import { submitIndexNowUrl } from '$lib/server/indexnow/service';
import { siteConfig } from '$lib/data/site';
import { buildSiteMap, dateOnly } from '$lib/data/site-map';
import { getAllPosts, getCategories, getAuthors } from '$lib/data/blog';
import { packages } from '$lib/data/packages';
import { STATIC_SITEMAP_PAGES, getStaticPageFreshness } from '$lib/utils/sitemap';

// This route handles dynamic GET/POST requests — must NOT be prerendered
export const prerender = false;

/**
 * Every real URL the site knows about, with its `updated` date if it has one. Built from the
 * SAME `buildSiteMap` view /map itself renders, so the allow-list can never drift from what a
 * user actually sees a button next to. Categories/authors are intentionally excluded: they
 * have no `updated` date and are not individually reindex-worthy targets.
 */
function knownNodes(): Map<string, string | undefined> {
	const view = buildSiteMap({
		posts: getAllPosts(),
		packages,
		categories: getCategories(),
		authors: getAuthors(),
		staticPages: STATIC_SITEMAP_PAGES,
		pageFreshness: getStaticPageFreshness()
	});

	const nodes = new Map<string, string | undefined>();
	const add = (url: string, updated?: string) => nodes.set(`${siteConfig.url}${url}`, updated);

	for (const p of [...view.corePages, ...view.legalPages, ...view.utilityPages]) add(p.url, p.updated);
	for (const pk of view.packages) add(pk.url, pk.updated);
	for (const s of view.silos) {
		add(s.url, s.updated);
		for (const k of s.kids) add(k.url, k.updated);
	}
	for (const p of view.standalone) add(p.url, p.updated);

	return nodes;
}

export const GET: RequestHandler = async ({ platform }) => {
	try {
		const db = getDB(platform);
		const submissions = await getIndexNowSubmissions(db);
		return json({
			ok: true,
			submissions: submissions.map((s) => ({
				url: s.url,
				submittedAt: s.submitted_at,
				contentUpdatedAt: s.content_updated_at
			}))
		});
	} catch (err) {
		console.error('[/api/indexnow] GET error:', err);
		return json({ ok: false, error: 'internal' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return json({ ok: false, error: 'invalid-json' }, { status: 400 });
		}

		const parseResult = IndexNowSubmitInputSchema.safeParse(body);
		if (!parseResult.success) {
			return json(
				{ ok: false, error: 'validation-failed', issues: parseResult.error.issues },
				{ status: 422 }
			);
		}

		const { url } = parseResult.data;

		// Abuse guard: /map has no auth, so refuse to submit anything that isn't a real,
		// currently-known URL on this site — caps the blast radius to a finite allow-list.
		const nodes = knownNodes();
		if (!nodes.has(url)) {
			return json({ ok: false, error: 'unknown-url' }, { status: 422 });
		}
		const rawUpdatedAt = nodes.get(url);
		if (!rawUpdatedAt) {
			return json({ ok: false, error: 'no-freshness-date' }, { status: 422 });
		}
		// Normalize away the YAML unquoted-date gotcha (see site-map.ts dateOnly) before
		// persisting, so every stored content_updated_at is a plain comparable YYYY-MM-DD.
		const contentUpdatedAt = dateOnly(rawUpdatedAt);

		const key = platform?.env?.INDEXNOW_KEY;
		if (!key) {
			console.error('[/api/indexnow] INDEXNOW_KEY is not configured');
			return json({ ok: false, error: 'not-configured' }, { status: 500 });
		}

		const db = getDB(platform);
		const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
		const result = await submitIndexNowUrl({
			db,
			url,
			key,
			host: new URL(siteConfig.url).host,
			ip,
			contentUpdatedAt
		});

		if (!result.ok) {
			if (result.error === 'rate_limited') {
				return json({ ok: false, error: 'rate_limited' }, { status: 429 });
			}
			console.error('[/api/indexnow] IndexNow rejected submission:', result.status, url);
			return json({ ok: false, error: 'indexnow-rejected' }, { status: 502 });
		}

		return json({ ok: true }, { status: 200 });
	} catch (err) {
		console.error('[/api/indexnow] POST error:', err);
		return json({ ok: false, error: 'internal' }, { status: 500 });
	}
};
