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

describe('submitIndexNowUrl — happy path', () => {
	it('submits to IndexNow and upserts the submission with the given contentUpdatedAt', async () => {
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		const result = await submitIndexNowUrl(baseParams());

		expect(result).toEqual({ ok: true, submittedCount: 1 });
		expect(submitToIndexNow).toHaveBeenCalledWith({
			urls: ['https://malagaeventgear.com/blog/audio-visual-rental/'],
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

	it('supports batch submissions via items array', async () => {
		vi.mocked(submitToIndexNow).mockResolvedValueOnce(undefined);

		const items = [
			{ url: 'https://malagaeventgear.com/blog/audio-visual-rental/', contentUpdatedAt: '2026-07-24' },
			{ url: 'https://malagaeventgear.com/packages/lighting/', contentUpdatedAt: '2026-07-25' }
		];

		const result = await submitIndexNowUrl({
			db: mockDB,
			items,
			key: 'test-key',
			host: 'malagaeventgear.com',
			ip: '203.0.113.10'
		});

		expect(result).toEqual({ ok: true, submittedCount: 2 });
		expect(submitToIndexNow).toHaveBeenCalledWith({
			urls: [
				'https://malagaeventgear.com/blog/audio-visual-rental/',
				'https://malagaeventgear.com/packages/lighting/'
			],
			key: 'test-key',
			host: 'malagaeventgear.com'
		});
		expect(upsertIndexNowSubmission).toHaveBeenCalledTimes(2);
	});
});

describe('submitIndexNowUrl — IndexNow rejection', () => {
	it('returns indexnow-rejected with the upstream status, and does not upsert', async () => {
		vi.mocked(submitToIndexNow).mockRejectedValueOnce(new IndexNowError(422));

		const result = await submitIndexNowUrl(baseParams());

		expect(result).toEqual({ ok: false, error: 'indexnow-rejected', status: 422 });
		expect(upsertIndexNowSubmission).not.toHaveBeenCalled();
	});

	it('re-throws unexpected (non-IndexNowError) errors', async () => {
		vi.mocked(submitToIndexNow).mockRejectedValueOnce(new Error('network down'));

		await expect(submitIndexNowUrl(baseParams())).rejects.toThrow('network down');
	});
});
