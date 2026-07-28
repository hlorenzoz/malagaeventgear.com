/**
 * IndexNow submission orchestration — rate-limit check, external submit, D1 record.
 * Split out of the +server.ts HTTP layer so it's unit-testable with mocked D1 queries and a
 * mocked submitToIndexNow, mirroring src/lib/server/leads/service.ts.
 */
import {
	countRecentIndexNowRequestsByIP,
	insertIndexNowRequest,
	upsertIndexNowSubmission
} from '$lib/server/db/queries';
import { submitToIndexNow, IndexNowError } from './submit';

export interface IndexNowItem {
	url: string;
	contentUpdatedAt: string;
}

export interface SubmitIndexNowParams {
	db?: D1Database | null;
	url?: string;
	contentUpdatedAt?: string;
	items?: IndexNowItem[];
	key: string;
	host: string;
	ip: string;
	rateLimitMax?: number;
	rateLimitWindowSecs?: number;
}

export type SubmitIndexNowResult =
	| { ok: true; submittedCount: number; rateLimited?: boolean }
	| { ok: false; error: 'rate_limited' }
	| { ok: false; error: 'indexnow-rejected'; status: number };

export async function submitIndexNowUrl(params: SubmitIndexNowParams): Promise<SubmitIndexNowResult> {
	const {
		db,
		url,
		contentUpdatedAt,
		items,
		key,
		host
	} = params;

	const itemList: IndexNowItem[] =
		items && items.length > 0
			? items
			: url && contentUpdatedAt
				? [{ url, contentUpdatedAt }]
				: [];

	if (itemList.length === 0) {
		return { ok: true, submittedCount: 0 };
	}

	const urls = itemList.map((item) => item.url);
	let rateLimited = false;

	try {
		await submitToIndexNow({ urls, key, host });
	} catch (err) {
		if (err instanceof IndexNowError) {
			if (err.status === 429) {
				// IndexNow API returns 429 when URLs for this host were already submitted recently and are queued for crawling.
				// We treat this as queued/handled so D1 records the submission date and the map updates.
				rateLimited = true;
			} else {
				return { ok: false, error: 'indexnow-rejected', status: err.status };
			}
		} else {
			throw err;
		}
	}

	if (db) {
		const now = new Date().toISOString();
		for (const item of itemList) {
			await upsertIndexNowSubmission(db, item.url, now, item.contentUpdatedAt);
		}
	}

	return { ok: true, submittedCount: itemList.length, rateLimited };
}
