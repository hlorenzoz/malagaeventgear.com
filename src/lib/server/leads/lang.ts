import { isLocale } from '$lib/i18n/locales';

/**
 * Language of a lead. MEG answers only in English and Spanish, and emails go out in English
 * except to a lead whose browser is in Spanish (CLAUDE.md, "Hechos del negocio sobre idiomas").
 * So a browser whose FIRST preference is Spanish marks the lead as Spanish, whatever page it
 * came from (the site has no Spanish version). Otherwise the lead keeps the locale of the page
 * it was submitted from, which is what the visitor was reading.
 *
 * This is the lead's language, NOT the email language: `emailLang` narrows it to en or es.
 */
export function resolveLeadLang(locale: string | undefined, acceptLanguage: string | null): string {
	const preferred = (acceptLanguage ?? '').split(',')[0].trim().toLowerCase();
	if (preferred === 'es' || preferred.startsWith('es-')) return 'es';
	return locale && isLocale(locale) ? locale : 'en';
}

/** Transactional email language: Spanish for Spanish readers, English for everyone else. */
export function emailLang(lang: string): 'en' | 'es' {
	return lang === 'es' ? 'es' : 'en';
}
