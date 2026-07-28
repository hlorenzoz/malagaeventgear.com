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

	const response = await fetchFn('https://api.indexnow.org/indexnow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			host,
			key,
			keyLocation: `https://${host}/${key}.txt`,
			urlList
		})
	});

	// IndexNow returns 200 or 202 on success.
	if (!response.ok) {
		throw new IndexNowError(response.status);
	}
}
