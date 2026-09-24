import { page } from '$app/state';
import { renderTokens, withPrices, type EventPackage } from '$lib/data/packages';
import { packagesWithPrices, type FaqItem } from '$lib/data/faq';
import { i18n } from '$lib/i18n.svelte';
import type { DataCopy, FaqCopy, PackageCopy } from './data-copy';

/**
 * Package and FAQ copy in the language of the current page. English comes straight from the
 * catalog (the source). Any other language comes from its data file, loaded into `page.data`
 * by `(public)/+layout.ts`. A missing translation falls back to English, which the
 * completeness guard forbids for every PUBLISHED locale.
 */

function dataCopy(): DataCopy | null {
	return (page.data?.dataCopy as DataCopy | null | undefined) ?? null;
}

export function pkgCopy(pkg: EventPackage): PackageCopy {
	const copy = dataCopy()?.packages[pkg.slug] ?? {
		updated: pkg.updated,
		desc: pkg.desc,
		includes: pkg.includes,
		optional: pkg.optional,
		seo: { title: pkg.seo.title },
		landing: pkg.landing
	};
	return renderTokens(copy, i18n.lang);
}

export function faqCopy(item: FaqItem): FaqCopy {
	const copy = dataCopy()?.faqs[item.id] ?? item;
	const answer = copy.answer.replaceAll('{packagesWithPrices}', packagesWithPrices(i18n.lang));
	return { question: copy.question, answer: withPrices(answer, i18n.lang) };
}
