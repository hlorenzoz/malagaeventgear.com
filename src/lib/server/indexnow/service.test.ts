import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('$lib/server/db/queries', () => ({
	countRecentIndexNowRequestsByIP: vi.fn(),
	insertIndexNowRequest: vi.fn(),
	upsertIndexNowSubmission: vi.fn()
}));

vi.mock('./submit', () => ({
	submitToIndexNow: vi.fn(),
	IndexNowError: class IndexNowError extends Error {
		status: number;
		constructor(status: number) {
			super(`IndexNow error ${status}`);
			this.name = 'IndexNowError';
			this.status = status;
		}
	}
}));

import {
	countRecentIndexNowRequestsByIP,
	insertIndexNowRequest,
	upsertIndexNowSubmission
} from '$lib/server/db/queries';
import { submitToIndexNow, IndexNowError } from './submit';
import { submitIndexNowUrl } from './service';

const mockDB = {} as unknown as D1Database;

function baseParams(overrides: Partial<Parameters<typeof submitIndexNowUrl>[0]> = {}) {
	return {
		db: mockDB,
		url: 'https://malagaeventgear.com/blog/audio-visual-rental/',
		key: 'test-key',
		host: 'malagaeventgear.com',
		ip: '203.0.113.10',
		contentUpdatedAt: '2026-07-24',
		...overrides
	};
}

afterEach(() => {
	vi.clearAllMocks();
});

describe('submitIndexNowUrl — rate limiting', () => {
	it('rejects with rate_limited when the recent count is already at the max, without submitting or logging', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(10);

		const result = await submitIndexNowUrl(baseParams({ rateLimitMax: 10 }));

		expect(result).toEqual({ ok: false, error: 'rate_limited' });
		expect(insertIndexNowRequest).not.toHaveBeenCalled();
		expect(submitToIndexNow).not.toHaveBeenCalled();
		expect(upsertIndexNowSubmission).not.toHaveBeenCalled();
	});

	it('rejects when the recent count exceeds the max', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(15);

		const result = await submitIndexNowUrl(baseParams({ rateLimitMax: 10 }));

		expect(result).toEqual({ ok: false, error: 'rate_limited' });
	});

	it('allows the request through when under the max, and logs the attempt', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(9);
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		const result = await submitIndexNowUrl(baseParams({ rateLimitMax: 10 }));

		expect(result).toEqual({ ok: true });
		expect(insertIndexNowRequest).toHaveBeenCalledWith(mockDB, '203.0.113.10');
	});

	it('checks the count by the caller-provided IP and window', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		await submitIndexNowUrl(baseParams({ ip: '198.51.100.5', rateLimitWindowSecs: 900 }));

		expect(countRecentIndexNowRequestsByIP).toHaveBeenCalledWith(mockDB, '198.51.100.5', 900);
	});

	it('uses sane defaults when rateLimitMax/rateLimitWindowSecs are omitted', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		await submitIndexNowUrl(baseParams());

		expect(countRecentIndexNowRequestsByIP).toHaveBeenCalledWith(mockDB, '203.0.113.10', 15 * 60);
	});
});

describe('submitIndexNowUrl — happy path', () => {
	it('submits to IndexNow and upserts the submission with the given contentUpdatedAt', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		const result = await submitIndexNowUrl(baseParams());

		expect(result).toEqual({ ok: true });
		expect(submitToIndexNow).toHaveBeenCalledWith({
			url: 'https://malagaeventgear.com/blog/audio-visual-rental/',
			key: 'test-key',
			host: 'malagaeventgear.com'
		});
		expect(upsertIndexNowSubmission).toHaveBeenCalledWith(
			mockDB,
			'https://malagaeventgear.com/blog/audio-visual-rental/',
			expect.any(String),
			'2026-07-24'
		);
	});
});

describe('submitIndexNowUrl — IndexNow rejection', () => {
	it('returns indexnow-rejected with the upstream status, and does not upsert', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockRejectedValueOnce(new IndexNowError(422));

		const result = await submitIndexNowUrl(baseParams());

		expect(result).toEqual({ ok: false, error: 'indexnow-rejected', status: 422 });
		expect(upsertIndexNowSubmission).not.toHaveBeenCalled();
	});

	it('still counted the attempt (rate-limit log happens before the external call)', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockRejectedValueOnce(new IndexNowError(500));

		await submitIndexNowUrl(baseParams());

		expect(insertIndexNowRequest).toHaveBeenCalledOnce();
	});

	it('re-throws unexpected (non-IndexNowError) errors', async () => {
		vi.mocked(countRecentIndexNowRequestsByIP).mockResolvedValueOnce(0);
		vi.mocked(submitToIndexNow).mockRejectedValueOnce(new Error('network down'));

		await expect(submitIndexNowUrl(baseParams())).rejects.toThrow('network down');
	});
});
