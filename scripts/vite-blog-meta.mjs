// @ts-nocheck
/**
 * Vite plugin: the blog's build time data as virtual modules.
 *
 * `virtual:blog-meta`: frontmatter of every ENGLISH post.
 *   WHY: blog.ts needs every post's frontmatter SYNCHRONOUSLY at module evaluation time to
 *   build listing pages. The previous approach used an eager `import.meta.glob(..., {
 *   import: 'metadata' })`, which statically imports each compiled .svx, defeating the
 *   sibling lazy glob meant to code split post bodies per route. The result was a single
 *   ~3.4 MB chunk (all post bodies) loaded even on pages that only need frontmatter.
 *   This plugin parses the YAML frontmatter directly from the raw .svx files (build time,
 *   Node context) with gray-matter, the SAME js-yaml mdsvex uses, so the emitted metadata
 *   is identical (dates serialize to the same ISO strings).
 *
 * Fase 4, translated posts (`src/content/blog/<locale>/<en-slug>.svx`). Each locale is its
 * OWN chunk, so a page never downloads the other languages (CLAUDE.md, i18n architecture):
 *   `virtual:blog-translations`: `{ <locale>: () => Promise<translations> }` plus `builtAt`,
 *     the build time the publish rules use, so the app and these modules agree.
 *   `virtual:blog-translations/<locale>`: that locale's frontmatter, FAQ and ToC.
 *   `virtual:blog-availability`: `{ <locale>: () => Promise<BlogAvailability> }`, what each
 *     locale publishes (English slugs), for routing and `i18n.href` on every page.
 *   `virtual:blog-availability/<locale>`: one locale's sets (a few hundred bytes).
 * Only locales with translation files get a loader, so no chunk exists until one is written.
 *
 * It also publishes the link tables of rehype-localize-links on `globalThis` (see there).
 *
 * Everything is computed fresh on every build/dev start (and again when a .svx changes in
 * dev), with the same pure pipeline the app runs (scripts/blog-sources.ts): no committed JSON,
 * no prebuild step.
 */
import { BLOG_DIR, computeBlogState, localizedLinkTables, readEnglishMeta } from './blog-sources.ts';

const META = 'virtual:blog-meta';
const TRANSLATIONS = 'virtual:blog-translations';
const AVAILABILITY = 'virtual:blog-availability';
const IDS = [META, TRANSLATIONS, AVAILABILITY];

const shared = globalThis;

/**
 * SvelteKit evaluates vite.config.ts (and so this plugin) again for the client build. The
 * build time is pinned on `globalThis` so both builds apply the same publish date cut.
 */
function computeState() {
	shared.__megBlogBuildTime ??= new Date().toISOString();
	try {
		const state = computeBlogState({ now: new Date(shared.__megBlogBuildTime) });
		shared.__megLocalizedLinks = localizedLinkTables(state);
		return state;
	} catch (err) {
		// Invalid ENGLISH frontmatter: blog.ts fails the build with the Zod error itself.
		console.error('[blog-meta] could not compute the translated blog:', err?.message ?? err);
		shared.__megLocalizedLinks = undefined;
		return { english: [], locales: {} };
	}
}

const loaderMap = (locales, base) =>
	`{${locales.map((l) => `${JSON.stringify(l)}: () => import(${JSON.stringify(`${base}/${l}`)}).then((m) => m.default)`).join(',')}}`;

/** @returns {import('vite').Plugin} */
export function blogMeta() {
	let state = computeState();

	return {
		name: 'blog-meta-virtual',
		resolveId(id) {
			if (IDS.some((base) => id === base || id.startsWith(`${base}/`))) return '\0' + id;
		},
		load(id) {
			if (!id.startsWith('\0virtual:blog-')) return;
			const virtual = id.slice(1);
			// JSON.stringify serializes YAML Date values to ISO strings, matching
			// mdsvex's own output, which the Zod schema already accepts.
			if (virtual === META) return `export default ${JSON.stringify(readEnglishMeta())};`;

			const locales = Object.keys(state.locales);
			if (virtual === TRANSLATIONS) {
				return `export const builtAt = ${JSON.stringify(shared.__megBlogBuildTime)};\nexport default ${loaderMap(locales, TRANSLATIONS)};`;
			}
			if (virtual === AVAILABILITY) return `export default ${loaderMap(locales, AVAILABILITY)};`;

			const [base, locale] = [virtual.slice(0, virtual.lastIndexOf('/')), virtual.slice(virtual.lastIndexOf('/') + 1)];
			const localeState = state.locales[locale];
			if (base === TRANSLATIONS) return `export default ${JSON.stringify(localeState?.translations ?? {})};`;
			if (base === AVAILABILITY) {
				return `export default ${JSON.stringify(localeState?.availability ?? { posts: [], categories: [], authors: [] })};`;
			}
		},
		configureServer(server) {
			// Recompute and reload when posts or translations are added/edited/removed.
			server.watcher.add(BLOG_DIR);
			const onChange = (file) => {
				if (!file.endsWith('.svx')) return;
				shared.__megBlogBuildTime = new Date().toISOString();
				state = computeState();
				for (const mod of [...server.moduleGraph.idToModuleMap.values()]) {
					if (mod.id?.startsWith('\0virtual:blog-')) server.moduleGraph.invalidateModule(mod);
				}
				server.ws.send({ type: 'full-reload' });
			};
			server.watcher.on('add', onChange);
			server.watcher.on('change', onChange);
			server.watcher.on('unlink', onChange);
		}
	};
}
