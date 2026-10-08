import type { Locale } from '$lib/i18n/locales';

/**
 * Top Group Express (TGE): MEG's partner for group hotel bookings (task #T0076). An
 * independent company, linked from the home page with a plain external link (no payment, so
 * neither `sponsored` nor `nofollow`).
 */
const TGE_BASE = 'https://topgroupexpress.com';

// TGE publishes English, French, Italian and Chinese. Every other site locale links to its
// English version. A Record over Locale, so a new locale does not compile without a decision.
const TGE_LANGUAGE: Record<Locale, 'en' | 'fr' | 'it' | 'zh'> = {
	en: 'en',
	fr: 'fr',
	it: 'it',
	de: 'en',
	nl: 'en',
	'pt-pt': 'en',
	'pt-br': 'en',
	sv: 'en',
	da: 'en',
	nb: 'en',
	'zh-hans': 'zh',
	'zh-tw': 'zh',
	'zh-hk': 'zh'
};

/** The TGE page a reader of this locale is sent to. */
export function tgeUrl(locale: Locale): string {
	return `${TGE_BASE}/${TGE_LANGUAGE[locale]}`;
}

// Screenshot of the TGE web app (blog/3107, uploaded with `just post-images`, transparent
// background). Every variant below is listed in scripts/migrate-wp/manifest.json, which
// partners.test.ts checks.
const TGE_APP_BASE = 'https://cdn.malagaeventgear.com/blog/3107/tge-app';
const TGE_APP_VARIANTS = [
	{ width: 400, height: 251 },
	{ width: 600, height: 376 },
	{ width: 768, height: 482 },
	{ width: 1024, height: 642 },
	{ width: 1536, height: 963 }
] as const;

function tgeAppSrcset(extension: 'webp' | 'avif'): string {
	return TGE_APP_VARIANTS.map(
		({ width, height }) => `${TGE_APP_BASE}-${width}x${height}.${extension} ${width}w`
	).join(', ');
}

export const TGE_APP_IMAGE = {
	src: `${TGE_APP_BASE}-1024x642.webp`,
	width: 1024,
	height: 642,
	webpSrcset: tgeAppSrcset('webp'),
	avifSrcset: tgeAppSrcset('avif'),
	// Two columns from lg (1024px): the image column is at most 560px wide. Below that the
	// image spans the viewport minus the section gutter.
	sizes: '(min-width: 1024px) 560px, calc(100vw - 2rem)'
} as const;
