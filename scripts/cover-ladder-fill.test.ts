/** Tests para la logica pura de cover-ladder-fill.ts (sin sharp, sin fs, sin R2). */
import { describe, it, expect } from 'vitest';
import { rungsToAdd, rungKey, rungHeight } from './cover-ladder-fill';

describe('rungsToAdd', () => {
	it('adds the target widths that are missing and smaller than the original', () => {
		expect(rungsToAdd([400, 2560], 2560)).toEqual([768, 1024, 1536]);
	});

	it('adds nothing when the ladder already has a usable rung between 600 and 1100', () => {
		expect(rungsToAdd([400, 768, 1024, 1536, 2560], 2560)).toEqual([]);
		expect(rungsToAdd([400, 600, 700, 2560], 2560)).toEqual([]);
		expect(rungsToAdd([400, 760, 2560], 2560)).toEqual([]);
	});

	it('never upscales: a small original gets nothing above its own width', () => {
		expect(rungsToAdd([150, 225, 400, 488], 488)).toEqual([]);
		expect(rungsToAdd([400, 1200], 1200)).toEqual([768, 1024]);
	});
});

describe('rungKey and rungHeight', () => {
	it('inserts -WxH before the extension of the original key', () => {
		expect(rungKey('blog/1288/foto-scaled.webp', 768, 574)).toBe(
			'blog/1288/foto-scaled-768x574.webp'
		);
	});

	it('keeps the aspect ratio, rounded', () => {
		expect(rungHeight(2560, 1912, 768)).toBe(574);
		expect(rungHeight(2560, 1912, 1024)).toBe(765);
	});
});
