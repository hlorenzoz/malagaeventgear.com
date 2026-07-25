import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitToIndexNow, IndexNowError } from './submit';

const mockFetch = vi.fn();

afterEach(() => {
	vi.clearAllMocks();
});

describe('submitToIndexNow', () => {
	it('POSTs to api.indexnow.org with host/key/keyLocation/urlList', async () => {
		mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

		await submitToIndexNow({
			url: 'https://malagaeventgear.com/blog/audio-visual-rental/',
			key: 'abc-123',
			host: 'malagaeventgear.com',
			fetchFn: mockFetch
		});

		expect(mockFetch).toHaveBeenCalledOnce();
		const [url, init] = mockFetch.mock.calls[0];
		expect(url).toBe('https://api.indexnow.org/indexnow');
		expect(init.method).toBe('POST');
		expect(init.headers['Content-Type']).toBe('application/json; charset=utf-8');

		const body = JSON.parse(init.body as string);
		expect(body.host).toBe('malagaeventgear.com');
		expect(body.key).toBe('abc-123');
		expect(body.keyLocation).toBe('https://malagaeventgear.com/abc-123.txt');
		expect(body.urlList).toEqual(['https://malagaeventgear.com/blog/audio-visual-rental/']);
	});

	it('accepts a 202 response as success', async () => {
		mockFetch.mockResolvedValueOnce({ ok: true, status: 202 });

		await expect(
			submitToIndexNow({
				url: 'https://malagaeventgear.com/',
				key: 'k',
				host: 'malagaeventgear.com',
				fetchFn: mockFetch
			})
		).resolves.toBeUndefined();
	});

	it('throws IndexNowError on a non-ok response', async () => {
		mockFetch.mockResolvedValueOnce({ ok: false, status: 422 });

		await expect(
			submitToIndexNow({
				url: 'https://malagaeventgear.com/',
				key: 'k',
				host: 'malagaeventgear.com',
				fetchFn: mockFetch
			})
		).rejects.toThrow(IndexNowError);
	});
});
