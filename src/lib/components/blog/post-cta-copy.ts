/**
 * Copy of the package CTA of a post (PostCTA, also rendered inside the body by InlineCTA) and of
 * the package rail, in the page language, from its dictionary (`postCta`, `packagesRail`,
 * `pricing.plusVat`). Package names are never translated. Prices go through formatPrice and the
 * VAT through the `{vat}` token (rendered when the dictionary loads), never literals (CLAUDE.md §7).
 */
import { formatPrice, type EventPackage } from '$lib/data/packages';
import type { Locale } from '$lib/i18n/locales';
import type { Messages } from '$lib/i18n/messages/en';

type CtaKey = keyof Messages['postCta']['headline'];

export interface PostCtaCopy {
	aria: string;
	headline: string;
	subline: string;
	/** `{before}<strong>{amount}</strong>{after}`: the word order of "From €290" differs per language. */
	price: { before: string; amount: string; after: string };
	vat: string;
	view: string;
	quote: string;
}

const fill = (text: string, pkg: EventPackage) =>
	text.replaceAll('{name}', pkg.name).replaceAll('{guests}', String(pkg.maxGuests ?? ''));

function splitPrice(template: string, amount: string): PostCtaCopy['price'] {
	const [before, after = ''] = template.split('{price}');
	return { before, amount, after };
}

export function postCtaCopy(pkg: EventPackage, t: Messages, locale: Locale): PostCtaCopy {
	const key: CtaKey = pkg.slug in t.postCta.headline ? (pkg.slug as CtaKey) : 'eco';
	return {
		aria: t.postCta.aria,
		headline: t.postCta.headline[key],
		subline: fill(t.postCta.subline[key], pkg),
		price: splitPrice(t.postCta.priceFrom, formatPrice(pkg.price, locale)),
		vat: t.pricing.plusVat,
		view: fill(t.postCta.viewPackage, pkg),
		quote: t.postCta.freeQuote
	};
}

/** "from €290" of the package rail, in the page language. */
export function railPrice(pkg: EventPackage, t: Messages, locale: Locale): string {
	return t.packagesRail.priceFrom.replace('{price}', formatPrice(pkg.price, locale));
}
