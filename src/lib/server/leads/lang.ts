import { isLocale } from '$lib/i18n/locales';

/**
 * Language of a lead. The form sends the locale of the page it was submitted from, which is
 * what the visitor was reading. `Accept-Language` is only a fallback for clients that do not
 * send it (older cached pages). The site has no Spanish version, but a Spanish browser still
 * marks the lead as Spanish, because MEG does answer in Spanish.
 *
 * This is the lead's language, NOT the email language: MEG answers only in English and
 * Spanish, so `emailLang` narrows it to one of those two.
 */
export function resolveLeadLang(locale: string | undefined, acceptLanguage: string | null): string {
	if (locale && isLocale(locale)) return locale;
	return (acceptLanguage ?? 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
}

/** Transactional email language: Spanish for Spanish readers, English for everyone else. */
export function emailLang(lang: string): 'en' | 'es' {
	return lang === 'es' ? 'es' : 'en';
}
