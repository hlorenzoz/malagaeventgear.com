import type { LocaleContentMap } from './schema';
import type { PREFIXED_LOCALES } from '../locales';
import es from './locales/es';
import fr from './locales/fr';
import it from './locales/it';
import de from './locales/de';
import nl from './locales/nl';
import ptPt from './locales/pt-pt';
import ptBr from './locales/pt-br';
import sv from './locales/sv';
import da from './locales/da';
import nb from './locales/nb';
import zhHans from './locales/zh-hans';
import zhTw from './locales/zh-tw';
import zhHk from './locales/zh-hk';

/**
 * Every locale's content map, statically imported. BUILD TOOLING ONLY (vite.config.ts): the app
 * must keep loading maps lazily through `router.ts`, one locale at a time.
 */
export const CONTENT_MAPS: Record<(typeof PREFIXED_LOCALES)[number], LocaleContentMap> = {
	es,
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
