import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import remarkGfm from 'remark-gfm';
import { BLOG_REHYPE_PLUGINS } from './scripts/blog-rehype-plugins.mjs';

/**
 * mdsvex 0.12.7 inyecta el frontmatter como `<script context="module">`, sintaxis
 * deprecada en Svelte 5 (script_context_deprecated). Este preprocesador corre DESPUÉS
 * de mdsvex y reescribe su salida al atributo `module` moderno. Acotado a `.svx` para
 * no alterar los `.svelte` escritos a mano (que sí deberían migrarse explícitamente).
 */
const fixMdsvexModuleScript = {
	name: 'fix-mdsvex-module-script',
	markup: ({ content, filename }) => {
		if (!filename?.endsWith('.svx')) return;
		const code = content.replace(/<script\s+context="module"(\s*>|\s)/g, '<script module$1');
		return code === content ? undefined : { code };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Fuerza el modo runes en todo el proyecto excepto en librerías. Puede eliminarse en Svelte 6.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter(),
		prerender: {
			// Los posts migrados traen un "Table of Contents" de WP cuyo slugger no
			// siempre coincide con rehype-slug (p. ej. "FAQs" → #fa-qs vs #faqs). Esas
			// anclas no saltan, pero NO deben romper el build. handleHttpError queda por
			// defecto (falla) para seguir detectando links 404 reales.
			// Las URLs traducidas no necesitan `entries`: el crawler las descubre por los enlaces
			// del selector de idioma (LanguageSwitcher) de cada página inglesa. Un enlace a una URL
			// de idioma no publicada fallaría el build con 404, que es justo lo que queremos.
			handleMissingId: 'warn'
		},
		// Inlina el CSS en el <head> eliminando el <link> render-blocking que retrasaba FCP/LCP.
		// El umbral se compara contra el tamaño SIN comprimir: el CSS global (Tailwind) pesa ~83KB
		// sin comprimir (~12KB gzip), así que el umbral debe superarlo. Crítico para las páginas de
		// paquete (primera visita desde ads, sin caché → conversión).
		inlineStyleThreshold: 102400
	},
	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			// remarkGfm enables GFM pipe-tables (the migrated posts reconstruct their
			// tables as markdown tables), plus strikethrough/autolinks/task-lists.
			remarkPlugins: [remarkGfm],
			// mdsvex defaults smartypants to true, which rewrites straight quotes/dashes
			// into curly typography at build time even when the .svx source is clean
			// ASCII. Disabled: CLAUDE.md mandates ASCII-only punctuation sitewide.
			smartypants: false,
			// The post body plugins and their order: scripts/blog-rehype-plugins.mjs (shared with the tests).
			rehypePlugins: BLOG_REHYPE_PLUGINS
			// No layout option — mdsvex layout injection uses $$props which is
			// incompatible with runes mode. The [slug]/+page.svelte wraps post
			// components explicitly via BlogPost.svelte instead (ADR-009 approach).
		}),
		// Corre DESPUÉS de mdsvex: migra su `context="module"` deprecado a `module`.
		fixMdsvexModuleScript
	],
	extensions: ['.svelte', '.svx']
};

export default config;
