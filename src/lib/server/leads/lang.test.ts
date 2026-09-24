import { describe, expect, it } from 'vitest';
import { emailLang, resolveLeadLang } from './lang';

describe('resolveLeadLang', () => {
	it('marks a lead as Spanish when the browser prefers Spanish, whatever page it came from', () => {
		// CLAUDE.md: emails go out in English, except to a lead whose browser is in Spanish.
		expect(resolveLeadLang('en', 'es-ES,es;q=0.9')).toBe('es');
		expect(resolveLeadLang('de', 'es-ES,es;q=0.9,de;q=0.8')).toBe('es');
		expect(resolveLeadLang(undefined, 'es')).toBe('es');
	});

	it('otherwise uses the locale of the page the form was submitted from', () => {
		expect(resolveLeadLang('de', 'de-DE,de;q=0.9')).toBe('de');
		expect(resolveLeadLang('zh-hans', null)).toBe('zh-hans');
		// Spanish as a second preference does not count: the reader chose English first.
		expect(resolveLeadLang('en', 'en-US,es;q=0.5')).toBe('en');
	});

	it('falls back to English when the locale is missing or unknown', () => {
		expect(resolveLeadLang('', 'en-GB')).toBe('en');
		expect(resolveLeadLang('klingon', 'fr-FR')).toBe('en');
		expect(resolveLeadLang(undefined, null)).toBe('en');
	});
});

describe('emailLang', () => {
	it('answers in Spanish only to Spanish readers and in English to everyone else', () => {
		expect(emailLang('es')).toBe('es');
		for (const lang of ['en', 'de', 'fr', 'zh-hans', 'pt-br']) expect(emailLang(lang)).toBe('en');
	});
});
