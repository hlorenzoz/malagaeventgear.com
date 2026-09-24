/**
 * Build side table of the structural words of a post body, per locale (Fase 4): the
 * `blogStructure` group of each messages file (`src/lib/i18n/messages/<locale>.ts`), the single
 * source. BUILD ONLY: it imports all 13 dictionaries, so app code never imports it (a page
 * downloads its own language only).
 *
 * vite.config.ts publishes it on `globalThis` (`publishBlogStructure`), because the rehype
 * plugins run inside the Svelte preprocessor loaded by svelte.config.js, outside this import
 * graph. scripts/blog-sources.ts passes each locale's words to the FAQ and ToC parsers.
 */
import type { Locale } from '../src/lib/i18n/locales.ts';
import type { Messages } from '../src/lib/i18n/messages/en.ts';
import en from '../src/lib/i18n/messages/en.ts';
import fr from '../src/lib/i18n/messages/fr.ts';
import it from '../src/lib/i18n/messages/it.ts';
import de from '../src/lib/i18n/messages/de.ts';
import nl from '../src/lib/i18n/messages/nl.ts';
import ptPt from '../src/lib/i18n/messages/pt-pt.ts';
import ptBr from '../src/lib/i18n/messages/pt-br.ts';
import sv from '../src/lib/i18n/messages/sv.ts';
import da from '../src/lib/i18n/messages/da.ts';
import nb from '../src/lib/i18n/messages/nb.ts';
import zhHans from '../src/lib/i18n/messages/zh-hans.ts';
import zhTw from '../src/lib/i18n/messages/zh-tw.ts';
import zhHk from '../src/lib/i18n/messages/zh-hk.ts';

export type BlogStructure = Messages['blogStructure'];

const dictionaries: Record<Locale, Messages> = {
	en,
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

export const BLOG_STRUCTURE = Object.fromEntries(
	Object.entries(dictionaries).map(([locale, messages]) => [locale, messages.blogStructure])
) as Record<Locale, BlogStructure>;

/** Makes the table readable by the rehype plugins (scripts/blog-structure-words.mjs). */
export function publishBlogStructure(): void {
	(globalThis as { __megBlogStructure?: Record<Locale, BlogStructure> }).__megBlogStructure = BLOG_STRUCTURE;
}
