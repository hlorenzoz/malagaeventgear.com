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

export interface SubmitIndexNowParams {
	db: D1Database;
	url: string;
	key: string;
	host: string;
	ip: string;
	contentUpdatedAt: string;
	rateLimitMax?: number;
	rateLimitWindowSecs?: number;
}

export type SubmitIndexNowResult =
	| { ok: true }
	| { ok: false; error: 'rate_limited' }
	| { ok: false; error: 'indexnow-rejected'; status: number };

const DEFAULT_RATE_LIMIT_MAX = 10;
const DEFAULT_RATE_LIMIT_WINDOW_SECS = 15 * 60;

export async function submitIndexNowUrl(params: SubmitIndexNowParams): Promise<SubmitIndexNowResult> {
	const {
		db,
		url,
		key,
		host,
		ip,
		contentUpdatedAt,
		rateLimitMax = DEFAULT_RATE_LIMIT_MAX,
		rateLimitWindowSecs = DEFAULT_RATE_LIMIT_WINDOW_SECS
	} = params;

	const recentCount = await countRecentIndexNowRequestsByIP(db, ip, rateLimitWindowSecs);
	if (recentCount >= rateLimitMax) {
		return { ok: false, error: 'rate_limited' };
	}
	// Log the attempt BEFORE calling the external API, so every request that reaches this
	// point counts toward the limit regardless of what IndexNow itself does with it.
	await insertIndexNowRequest(db, ip);

	try {
		await submitToIndexNow({ url, key, host });
	} catch (err) {
		if (err instanceof IndexNowError) {
			return { ok: false, error: 'indexnow-rejected', status: err.status };
		}
		throw err;
	}

	const now = new Date().toISOString();
	await upsertIndexNowSubmission(db, url, now, contentUpdatedAt);

	return { ok: true };
}
