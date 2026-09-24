import { getAvailability } from './availability';
import type { LocaleContentMap } from './content-map/schema';
import { withLocale } from './locale-path';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './locales';
import { buildRouteTable, localizePath } from './routing';

/**
 * Lazy access to the per locale content maps. Each locale's map is its own chunk, so the
 * client only downloads the map of the locale it is browsing (used by `reroute`).
 */
const loaders = import.meta.glob<LocaleContentMap>('./content-map/locales/*.ts', { import: 'default' });

const maps = new Map<Locale, Promise<LocaleContentMap | null>>();
const tables = new Map<Locale, Promise<Map<string, string>>>();

export function loadContentMap(locale: Locale): Promise<LocaleContentMap | null> {
	let cached = maps.get(locale);
	if (!cached) {
		const loader = loaders[`./content-map/locales/${locale}.ts`];
		cached = loader ? loader() : Promise.resolve(null);
		maps.set(locale, cached);
	}
	return cached;
}

async function getRouteTable(locale: Locale): Promise<Map<string, string>> {
	let cached = tables.get(locale);
	if (!cached) {
		cached = loadContentMap(locale).then((map) =>
			map ? buildRouteTable(map, getAvailability(locale)) : new Map()
		);
		tables.set(locale, cached);
	}
	return cached;
}

/** English route path for an unprefixed, decoded localized path, or undefined when unpublished. */
export async function resolveLocalizedPath(locale: Locale, rest: string): Promise<string | undefined> {
	return (await getRouteTable(locale)).get(rest);
}

/** Full site path of an English route in a locale, or null when it is not published there. */
export async function localizeTo(locale: Locale, enPath: string): Promise<string | null> {
	if (locale === DEFAULT_LOCALE) return enPath;
	const map = await loadContentMap(locale);
	if (!map) return null;
	const localized = localizePath(enPath, map, getAvailability(locale));
	return localized === null ? null : withLocale(locale, localized);
}

export interface Alternate {
	locale: Locale;
	/** Site path, decoded (encode it with `encodePath` before emitting a URL). */
	path: string;
}

/** Every published version of an English route, English included. Loads every map: server only. */
export async function getAlternates(enPath: string): Promise<Alternate[]> {
	const result: Alternate[] = [];
	for (const locale of LOCALES) {
		const path = await localizeTo(locale, enPath);
		if (path !== null) result.push({ locale, path });
	}
	return result;
}
