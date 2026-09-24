import type { LocaleContentMap } from './schema.ts';
import type { PREFIXED_LOCALES } from '../locales.ts';
import fr from './locales/fr.ts';
import it from './locales/it.ts';
import de from './locales/de.ts';
import nl from './locales/nl.ts';
import ptPt from './locales/pt-pt.ts';
import ptBr from './locales/pt-br.ts';
import sv from './locales/sv.ts';
import da from './locales/da.ts';
import nb from './locales/nb.ts';
import zhHans from './locales/zh-hans.ts';
import zhTw from './locales/zh-tw.ts';
import zhHk from './locales/zh-hk.ts';

/**
 * Every locale's content map, statically imported. BUILD TOOLING ONLY (vite.config.ts): the app
 * must keep loading maps lazily through `router.ts`, one locale at a time.
 */
export const CONTENT_MAPS: Record<(typeof PREFIXED_LOCALES)[number], LocaleContentMap> = {
	fr,
	it,
	de,
	nl,
	'pt-pt': ptPt,
	'pt-br': ptBr,
	sv,
	da,
	nb,
	'zh-hans': zhHans,
	'zh-tw': zhTw,
	'zh-hk': zhHk
};
