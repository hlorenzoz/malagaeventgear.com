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
 * user actually sees a button next to.
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
	const add = (url: string, updated?: string, publishDate?: string) =>
		nodes.set(`${siteConfig.url}${url}`, updated || publishDate);

	for (const p of [...view.corePages, ...view.legalPages, ...view.utilityPages]) add(p.url, p.updated);
	for (const pk of view.packages) add(pk.url, pk.updated);
	for (const s of view.silos) {
		add(s.url, s.updated, s.publishDate);
		for (const k of s.kids) add(k.url, k.updated, k.publishDate);
	}
	for (const p of [...view.standalone, ...view.news]) add(p.url, p.updated, p.publishDate);
	for (const c of view.categories) add(c.url, c.updated);
	for (const a of view.authors) add(a.url, a.updated);

	return nodes;
}

export const GET: RequestHandler = async ({ platform }) => {
	try {
		const db = platform?.env?.DB;
		if (!db) {
			return json({ ok: true, submissions: [] });
		}
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

export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
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

		const targetUrls =
			'urls' in parseResult.data ? parseResult.data.urls : [parseResult.data.url];

		// Abuse guard: /map has no auth, so refuse to submit anything that isn't a real,
		// currently-known URL on this site — caps the blast radius to a finite allow-list.
		const nodes = knownNodes();
		const items: Array<{ url: string; contentUpdatedAt: string }> = [];

		for (const targetUrl of targetUrls) {
			if (!nodes.has(targetUrl)) {
				return json({ ok: false, error: 'unknown-url', url: targetUrl }, { status: 422 });
			}
			const rawUpdatedAt = nodes.get(targetUrl);
			if (!rawUpdatedAt) {
				return json({ ok: false, error: 'no-freshness-date', url: targetUrl }, { status: 422 });
			}
			// Normalize away the YAML unquoted-date gotcha (see site-map.ts dateOnly) before
			// persisting, so every stored content_updated_at is a plain comparable YYYY-MM-DD.
			items.push({ url: targetUrl, contentUpdatedAt: dateOnly(rawUpdatedAt) });
		}

		const key = platform?.env?.INDEXNOW_KEY || 'a2960ddd-8074-4ad7-b26d-1b53d0051bea';
		const db = platform?.env?.DB ?? null;

		let ip = request.headers.get('CF-Connecting-IP');
		if (!ip) {
			try {
				ip = getClientAddress();
			} catch {
				ip = '127.0.0.1';
			}
		}

		const result = await submitIndexNowUrl({
			db,
			items,
			key,
			host: new URL(siteConfig.url).host,
			ip: ip || '127.0.0.1'
		});

		if (!result.ok) {
			if (result.error === 'rate_limited') {
				return json({ ok: false, error: 'rate_limited' }, { status: 429 });
			}
			console.error('[/api/indexnow] IndexNow rejected submission:', result.status, targetUrls);
			// Relay IndexNow's own status (e.g. 429 rate-limited, 403 invalid key) instead of a
			// blanket 502, so the Network tab shows the real upstream cause without digging into logs.
			return json(
				{ ok: false, error: 'indexnow-rejected', upstreamStatus: result.status },
				{ status: result.status }
			);
		}

		return json({ ok: true, count: result.submittedCount, rateLimited: result.rateLimited ?? false }, { status: 200 });
	} catch (err) {
		console.error('[/api/indexnow] POST error:', err);
		return json({ ok: false, error: 'internal' }, { status: 500 });
	}
};
