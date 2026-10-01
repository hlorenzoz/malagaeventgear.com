import { describe, it, expect } from 'vitest';
import { headingIdOf } from './heading-id';

describe('headingIdOf', () => {
	it('gives the id rehype-slug gives an English heading', () => {
		expect(headingIdOf("What We Don't Stock: LED Video Walls")).toBe(
			'what-we-dont-stock-led-video-walls'
		);
	});

	it('keeps accents and Chinese characters, and a trailing hyphen after a French question mark', () => {
		expect(headingIdOf('Où livrez-vous ?')).toBe('où-livrez-vous-');
		expect(headingIdOf('可以租用LED屏幕吗？')).toBe('可以租用led屏幕吗');
	});

	it('does not carry duplicate state between two calls', () => {
		expect(headingIdOf('FAQ')).toBe('faq');
		expect(headingIdOf('FAQ')).toBe('faq');
	});
});
