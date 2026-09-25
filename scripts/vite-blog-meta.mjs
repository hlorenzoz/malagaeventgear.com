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
 *   `virtual:blog-translations/<locale>`: that locale's frontmatter (FAQ and ToC travel per post,
 *     see `virtual:blog-extras`).
 *   `virtual:blog-availability`: `{ <locale>: () => Promise<BlogAvailability> }`, what each
 *     locale publishes (English slugs), for routing and `i18n.href` on every page.
 *   `virtual:blog-availability/<locale>`: one locale's sets (a few hundred bytes).
 *   `virtual:blog-extras`: `{ <locale>: () => Promise<{ <en-slug>: () => Promise<extras> }> }`,
 *   `virtual:blog-extras/<locale>`: that locale's per post loaders (a few bytes per post), and
 *   `virtual:blog-extras/<locale>/<en-slug>`: ONE post's FAQ and ToC (English: post-faqs.json and
 *     post-toc.json, a translation: extracted from its body), so only that post's page downloads
 *     them, never a listing, another post or another locale.
 * Only locales with translation files get a loader, so no chunk exists until one is written.
 *
 * It also publishes the link tables of rehype-localize-links on `globalThis` (see there).
 *
 * Everything is computed fresh on every build/dev start (and again when a .svx changes in
 * dev), with the same pure pipeline the app runs (scripts/blog-sources.ts): no committed JSON,
 * no prebuild step.
 */
import { BLOG_DIR, computeBlogState, localizedLinkTables } from './blog-sources.ts';
import { readEnglishExtras } from './blog-files.mjs';

const META = 'virtual:blog-meta';
const TRANSLATIONS = 'virtual:blog-translations';
const AVAILABILITY = 'virtual:blog-availability';
const EXTRAS = 'virtual:blog-extras';
const IDS = [META, TRANSLATIONS, AVAILABILITY, EXTRAS];

const shared = globalThis;

/**
 * SvelteKit evaluates vite.config.ts (and so this plugin) again for the client build. The
 * build time is pinned on `globalThis` so both builds apply the same publish date cut.
 *
 * `vite build` (`onProblems` absent): a malformed post, English or translated, THROWS (named
 * file by file by computeBlogState), which fails `bun run build`, the Cloudflare build. Never
 * catch it into an empty blog: one bad translation would silently unpublish every locale's blog.
 * `vite dev` and `vite preview`: `onProblems` reports the same lines and only the bad files are
 * left out, so a broken draft never stops the server.
 */
function computeState(dir, maps, onProblems) {
	shared.__megBlogBuildTime ??= new Date().toISOString();
	const state = computeBlogState({ dir, now: new Date(shared.__megBlogBuildTime), ...(maps ? { maps } : {}), onProblems });
	shared.__megLocalizedLinks = maps ? localizedLinkTables(state, maps) : localizedLinkTables(state);
	return state;
}

const loaderMap = (keys, base) =>
	`{${keys.map((k) => `${JSON.stringify(k)}: () => import(${JSON.stringify(`${base}/${k}`)}).then((m) => m.default)`).join(',')}}`;

/** FAQ and ToC of each post, per locale: `{ en: { <slug>: extras }, de: { <slug>: extras } }`. */
function extrasOf(state) {
	const byLocale = { en: readEnglishExtras() };
	for (const [locale, localeState] of Object.entries(state.locales)) {
		const posts = {};
		for (const [path, module] of Object.entries(localeState.translations)) {
			const entry = {};
			if (module.faqs?.length) entry.faqs = module.faqs;
			if (module.toc?.length) entry.toc = module.toc;
			if (entry.faqs || entry.toc) posts[path.split('/').pop().replace(/\.svx$/, '')] = entry;
		}
		byLocale[locale] = posts;
	}
	return byLocale;
}

/** A locale's translations as the shared chunk ships them: frontmatter only. */
const frontmatterOnly = (translations) =>
	Object.fromEntries(Object.entries(translations ?? {}).map(([path, m]) => [path, { metadata: m.metadata }]));

/**
 * @param {{ dir?: string, maps?: Record<string, unknown> }} [options] `dir` replaces the blog
 *   folder and `maps` the content maps (tests).
 * @returns {import('vite').Plugin}
 */
export function blogMeta({ dir = BLOG_DIR, maps } = {}) {
	/** Computed once Vite knows the command (configResolved), never while it loads the config. */
	let state;
	/** FAQ and ToC per locale and slug, read once per state. */
	let extras;
	/** Problems of the dev or preview server, shown in the browser overlay. */
	let problems = [];
	let strict = true;
	let logger = console;

	const report = (lines) => {
		problems = lines;
		logger.error(`[blog-meta] Malformed blog posts, left out until fixed:\n${lines.map((l) => `  - ${l}`).join('\n')}`);
	};
	const compute = () => {
		problems = [];
		state = computeState(dir, maps, strict ? undefined : report);
		extras = undefined;
	};

	return {
		name: 'blog-meta-virtual',
		configResolved(config) {
			strict = config.command === 'build';
			logger = config.logger ?? console;
			compute();
		},
		resolveId(id) {
			if (IDS.some((base) => id === base || id.startsWith(`${base}/`))) return '\0' + id;
		},
		load(id) {
			if (!id.startsWith('\0virtual:blog-')) return;
			if (!state) compute();
			const virtual = id.slice(1);
			// JSON.stringify serializes YAML Date values to ISO strings, matching
			// mdsvex's own output, which the Zod schema already accepts.
			if (virtual === META) return `export default ${JSON.stringify(state.englishMeta)};`;

			const locales = Object.keys(state.locales);
			if (virtual === TRANSLATIONS) {
				return `export const builtAt = ${JSON.stringify(shared.__megBlogBuildTime)};\nexport default ${loaderMap(locales, TRANSLATIONS)};`;
			}
			if (virtual === AVAILABILITY) return `export default ${loaderMap(locales, AVAILABILITY)};`;

			if (virtual === EXTRAS || virtual.startsWith(`${EXTRAS}/`)) {
				extras ??= extrasOf(state);
				const [locale, slug] = virtual.slice(EXTRAS.length + 1).split('/');
				if (!locale) return `export default ${loaderMap(Object.keys(extras), EXTRAS)};`;
				if (!slug) return `export default ${loaderMap(Object.keys(extras[locale] ?? {}), `${EXTRAS}/${locale}`)};`;
				return `export default ${JSON.stringify(extras[locale]?.[slug] ?? {})};`;
			}

			const [base, locale] = [virtual.slice(0, virtual.lastIndexOf('/')), virtual.slice(virtual.lastIndexOf('/') + 1)];
			const localeState = state.locales[locale];
			if (base === TRANSLATIONS) return `export default ${JSON.stringify(frontmatterOnly(localeState?.translations))};`;
			if (base === AVAILABILITY) {
				return `export default ${JSON.stringify(localeState?.availability ?? { posts: [], categories: [], authors: [] })};`;
			}
		},
		configureServer(server) {
			// Show the current problems in the browser overlay of every client that connects.
			const showProblems = () => {
				if (problems.length === 0) return;
				server.ws.send({ type: 'error', err: { message: `[blog-meta] Malformed blog posts, left out until fixed:\n${problems.join('\n')}`, stack: '' } });
			};
			server.ws.on('connection', showProblems);

			// Recompute and reload when posts, translations or the English FAQ/ToC caches change.
			server.watcher.add(dir);
			const onChange = (file) => {
				if (!file.endsWith('.svx') && !/post-(faqs|toc)\.json$/.test(file)) return;
				shared.__megBlogBuildTime = new Date().toISOString();
				compute();
				for (const mod of [...server.moduleGraph.idToModuleMap.values()]) {
					if (mod.id?.startsWith('\0virtual:blog-')) server.moduleGraph.invalidateModule(mod);
				}
				server.ws.send({ type: 'full-reload' });
				showProblems();
			};
			server.watcher.on('add', onChange);
			server.watcher.on('change', onChange);
			server.watcher.on('unlink', onChange);
		}
	};
}
