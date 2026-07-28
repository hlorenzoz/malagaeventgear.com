/**
 * Thin IndexNow REST wrapper — Workers-safe, no SDK.
 * Uses fetch directly to POST https://api.indexnow.org/indexnow.
 *
 * IndexNow is honored by Bing and Yandex, NOT Google (Google keeps its own crawler +
 * Search Console, submitted manually — see /map). One submission to api.indexnow.org
 * propagates to every participating engine, so a single call is enough.
 *
 * The `fetchFn` parameter allows injecting a mock in tests.
 * In production, pass the global `fetch` (or omit — it defaults to globalThis.fetch).
 */

export interface IndexNowSubmitParams {
	url?: string;
	urls?: string[];
	key: string;
	host: string;
	fetchFn?: typeof fetch;
}

export class IndexNowError extends Error {
	constructor(public status: number) {
		super(`IndexNow error ${status}`);
		this.name = 'IndexNowError';
	}
}

export async function submitToIndexNow(params: IndexNowSubmitParams): Promise<void> {
	const { url, urls, key, host, fetchFn = globalThis.fetch } = params;
	const urlList = urls && urls.length > 0 ? urls : url ? [url] : [];
	if (urlList.length === 0) {
		throw new Error('No URLs provided for IndexNow submission');
	}

	const payload = JSON.stringify({
		host,
		key,
		keyLocation: `https://${host}/${key}.txt`,
		urlList
	});

	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
		'User-Agent': `MalagaEventGear/1.0 (+https://${host})`
	};

	const endpoints = [
		'https://api.indexnow.org/indexnow',
		'https://www.bing.com/indexnow'
	];

	let lastStatus = 500;
	for (const endpoint of endpoints) {
		try {
			const response = await fetchFn(endpoint, {
				method: 'POST',
				headers,
				body: payload
			});

			// IndexNow returns 200 or 202 on success.
			if (response.ok) {
				return;
			}
			lastStatus = response.status;
			// Retry next endpoint if rate limited (429) or temporary server error (5xx)
			if (response.status !== 429 && response.status < 500) {
				break;
			}
		} catch {
			// Network error trying endpoint — continue to fallback
		}
	}

	throw new IndexNowError(lastStatus);
}
