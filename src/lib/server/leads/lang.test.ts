import { describe, expect, it } from 'vitest';
import { emailLang, resolveLeadLang } from './lang';

describe('resolveLeadLang', () => {
	it('uses the locale of the page the form was submitted from', () => {
		expect(resolveLeadLang('de', 'es-ES,es;q=0.9')).toBe('de');
		expect(resolveLeadLang('zh-hans', null)).toBe('zh-hans');
		expect(resolveLeadLang('en', 'es-ES')).toBe('en');
	});

	it('falls back to Accept-Language when the locale is missing or unknown', () => {
		expect(resolveLeadLang(undefined, 'es-ES,es;q=0.9')).toBe('es');
		expect(resolveLeadLang('', 'en-GB')).toBe('en');
		expect(resolveLeadLang('klingon', 'fr-FR')).toBe('en');
		expect(resolveLeadLang(undefined, null)).toBe('es');
	});
});

describe('emailLang', () => {
	it('answers in Spanish only to Spanish readers and in English to everyone else', () => {
		expect(emailLang('es')).toBe('es');
		for (const lang of ['en', 'de', 'fr', 'zh-hans', 'pt-br']) expect(emailLang(lang)).toBe('en');
	});
});
