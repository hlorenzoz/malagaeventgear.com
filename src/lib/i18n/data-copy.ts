import type { EventPackage } from '$lib/data/packages';
import type { Locale } from './locales';

/**
 * Translated copy of the package catalog and the FAQ, one lazy file per locale
 * (`./data/<locale>.ts`). English is the source and lives in packages.ts and faq.ts, so there
 * is no `./data/en.ts`. Keyed by package slug and FAQ id.
 */

type Landing = EventPackage['landing'];

export interface PackageCopy {
	/** Date of THIS translation (YYYY-MM-DD), for the locale sitemap. Never the English date. */
	updated: string;
	desc: string;
	includes: string[];
	optional?: string[];
	seo: { title: string };
	/** Every landing text. The icon names are data, not copy, and stay in packages.ts. */
	landing: Omit<Landing, 'specIcon' | 'highlightIcon'>;
}

export interface FaqCopy {
	question: string;
	/** May contain `{packagesWithPrices}`, filled in from the catalog at render time. */
	answer: string;
}

export interface DataCopy {
	packages: Record<string, PackageCopy>;
	faqs: Record<string, FaqCopy>;
	/** Alt text of each gallery image (src/lib/data/gallery.ts), keyed by the image src. */
	gallery: Record<string, string>;
}

const loaders = import.meta.glob<DataCopy>('./data/*.ts', { import: 'default' });

/** The locale's data copy as its own chunk, or null for English (the source) or a missing file. */
export async function loadDataCopy(locale: Locale): Promise<DataCopy | null> {
	if (locale === 'en') return null;
	const loader = loaders[`./data/${locale}.ts`];
	return loader ? loader() : null;
}
