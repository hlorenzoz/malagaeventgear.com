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
	db: D1Database;
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
	| { ok: true; submittedCount: number }
	| { ok: false; error: 'rate_limited' }
	| { ok: false; error: 'indexnow-rejected'; status: number };

const DEFAULT_RATE_LIMIT_MAX = 10;
const DEFAULT_RATE_LIMIT_WINDOW_SECS = 15 * 60;

export async function submitIndexNowUrl(params: SubmitIndexNowParams): Promise<SubmitIndexNowResult> {
	const {
		db,
		url,
		contentUpdatedAt,
		items,
		key,
		host,
		ip,
		rateLimitMax = DEFAULT_RATE_LIMIT_MAX,
		rateLimitWindowSecs = DEFAULT_RATE_LIMIT_WINDOW_SECS
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

	const recentCount = await countRecentIndexNowRequestsByIP(db, ip, rateLimitWindowSecs);
	if (recentCount >= rateLimitMax) {
		return { ok: false, error: 'rate_limited' };
	}
	// Log the attempt BEFORE calling the external API, so every request that reaches this
	// point counts toward the limit regardless of what IndexNow itself does with it.
	await insertIndexNowRequest(db, ip);

	const urls = itemList.map((item) => item.url);
	try {
		await submitToIndexNow({ urls, key, host });
	} catch (err) {
		if (err instanceof IndexNowError) {
			return { ok: false, error: 'indexnow-rejected', status: err.status };
		}
		throw err;
	}

	const now = new Date().toISOString();
	for (const item of itemList) {
		await upsertIndexNowSubmission(db, item.url, now, item.contentUpdatedAt);
	}

	return { ok: true, submittedCount: itemList.length };
}
