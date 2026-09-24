/**
 * Supported site locales (CLAUDE.md, "Idiomas soportados").
 *
 * English is the base locale and lives at the root with no prefix. Every other locale lives
 * under its own URL prefix, which is the locale code itself. Adding or removing a locale is an
 * explicit, dated user decision, never an agent's call.
 */
export const LOCALES = [
	'en',
	'fr',
	'it',
	'de',
	'nl',
	'pt-pt',
	'pt-br',
	'sv',
	'da',
	'nb',
	'zh-hans',
	'zh-tw',
	'zh-hk'
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Every locale except the base one: these are the URL prefixes. */
export const PREFIXED_LOCALES = LOCALES.filter((l): l is Exclude<Locale, 'en'> => l !== DEFAULT_LOCALE);

export type Script = 'latin' | 'hans' | 'hant';

export interface LocaleMeta {
	/** BCP 47 value for `<html lang>`. */
	htmlLang: string;
	/** Every hreflang value that points to this locale. The first one is the canonical tag. */
	hreflang: readonly string[];
	/** Open Graph locale (`og:locale`). */
	ogLocale: string;
	/** Locale passed to `Intl` formatters. */
	intl: string;
	/** The language's own name, used by the language switcher (no flags). */
	nativeName: string;
	/** Compact label for the language switcher button. */
	short: string;
	script: Script;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
	en: { htmlLang: 'en', hreflang: ['en', 'x-default'], ogLocale: 'en_US', intl: 'en-GB', nativeName: 'English', short: 'EN', script: 'latin' },
	fr: { htmlLang: 'fr', hreflang: ['fr'], ogLocale: 'fr_FR', intl: 'fr-FR', nativeName: 'Français', short: 'FR', script: 'latin' },
	it: { htmlLang: 'it', hreflang: ['it'], ogLocale: 'it_IT', intl: 'it-IT', nativeName: 'Italiano', short: 'IT', script: 'latin' },
	de: { htmlLang: 'de', hreflang: ['de'], ogLocale: 'de_DE', intl: 'de-DE', nativeName: 'Deutsch', short: 'DE', script: 'latin' },
	nl: { htmlLang: 'nl', hreflang: ['nl'], ogLocale: 'nl_NL', intl: 'nl-NL', nativeName: 'Nederlands', short: 'NL', script: 'latin' },
	'pt-pt': { htmlLang: 'pt-PT', hreflang: ['pt-PT'], ogLocale: 'pt_PT', intl: 'pt-PT', nativeName: 'Português (Portugal)', short: 'PT', script: 'latin' },
	'pt-br': { htmlLang: 'pt-BR', hreflang: ['pt-BR'], ogLocale: 'pt_BR', intl: 'pt-BR', nativeName: 'Português (Brasil)', short: 'BR', script: 'latin' },
	sv: { htmlLang: 'sv', hreflang: ['sv'], ogLocale: 'sv_SE', intl: 'sv-SE', nativeName: 'Svenska', short: 'SV', script: 'latin' },
	da: { htmlLang: 'da', hreflang: ['da'], ogLocale: 'da_DK', intl: 'da-DK', nativeName: 'Dansk', short: 'DA', script: 'latin' },
	nb: { htmlLang: 'nb', hreflang: ['nb', 'no'], ogLocale: 'nb_NO', intl: 'nb-NO', nativeName: 'Norsk (bokmål)', short: 'NO', script: 'latin' },
	'zh-hans': { htmlLang: 'zh-Hans', hreflang: ['zh-Hans', 'zh'], ogLocale: 'zh_CN', intl: 'zh-CN', nativeName: '简体中文', short: '简', script: 'hans' },
	'zh-tw': { htmlLang: 'zh-Hant-TW', hreflang: ['zh-Hant-TW', 'zh-Hant'], ogLocale: 'zh_TW', intl: 'zh-TW', nativeName: '繁體中文 (台灣)', short: '繁', script: 'hant' },
	'zh-hk': { htmlLang: 'zh-Hant-HK', hreflang: ['zh-Hant-HK'], ogLocale: 'zh_HK', intl: 'zh-HK', nativeName: '繁體中文 (香港)', short: '港', script: 'hant' }
};

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}
