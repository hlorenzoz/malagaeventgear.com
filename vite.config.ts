import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';
import { blogMeta } from './scripts/vite-blog-meta.mjs';
import { CONTENT_MAPS } from './src/lib/i18n/content-map/all';

// Blog roots in every language (`/blog/`, `/de/blog/`, `/sv/blogg/`, `/zh-hans/%E5%8D%9A...`),
// as a RegExp literal: workbox serializes it into sw.js, a closure would lose its variables.
const blogRoots = [
	'/blog/',
	...Object.entries(CONTENT_MAPS).map(([locale, map]) => encodeURI(`/${locale}${map.pages['/blog/'].path}`))
];
const BLOG_URL_PATTERN = new RegExp(
	`^https?://[^/]+(?:${blogRoots.map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`
);

export default defineConfig({
	server: {
		port: 5173,
		strictPort: true
	},
	// @lucide/svelte ships uncompiled `.svelte` icon files. Vite must bundle it
	// through the Svelte plugin during SSR instead of externalizing it to Node,
	// which can't load a raw `.svelte` extension (ERR_UNKNOWN_FILE_EXTENSION).
	ssr: {
		noExternal: ['@lucide/svelte']
	},
	build: {
		// Las imagenes de src/lib/assets/ se importan para salir hasheadas bajo /_app/immutable/
		// (cache inmutable de 1 año). Por debajo de 4 KiB Vite las inlinearia como base64, y una
		// miniatura inlineada se repite en el HTML de CADA pagina que la usa (el rail de paquetes
		// aparece 2 veces por post: medido, 17 data URIs en un solo post). Nunca inlinear estas.
		// Para el resto, undefined deja la regla por defecto de Vite.
		assetsInlineLimit: (filePath) => (filePath.includes('/src/lib/assets/') ? false : undefined)
	},
	plugins: [
		blogMeta(),
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Malaga Event Gear',
				short_name: 'MEG',
				description: 'Malaga Event Gear - Blog & CRM Dashboard',
				theme_color: '#0f172a',
				background_color: '#0f172a',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: 'icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				// Precache only the app shell + main marketing pages. The blog (post pages,
				// listing, categories, authors) is intentionally EXCLUDED from precache, it's
				// large (~140 prerendered pages) and served from the network instead. This keeps
				// the SW install small instead of shipping the whole blog up front.
				// Prerendered pages: an EXPLICIT list. @vite-pwa/sveltekit precaches every
				// prerendered page (+ its __data.json) unless a `prerendered/` pattern is given,
				// and with every public page prerendered in 14 languages that would make each
				// visitor download the whole site in every language. Same set as before i18n:
				// the English home, the package pages (conversion funnel) and /map. Every other
				// page, every localized page and the blog in EVERY language stay out of precache.
				globPatterns: [
					'**/*.{js,css,png,svg,ico,webmanifest}',
					'prerendered/pages/index.html',
					'prerendered/pages/{packages/*,map}/index.html',
					'prerendered/dependencies/__data.json',
					'prerendered/dependencies/{packages/*,map}/__data.json'
				],
				globIgnores: ['**/blog/**'],
				maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
				// Cache blog pages/assets at runtime as the user visits them (not up front), in
				// every language: the localized blog roots come from the content maps.
				runtimeCaching: [
					{
						urlPattern: BLOG_URL_PATTERN,
						handler: 'StaleWhileRevalidate',
						options: { cacheName: 'blog-runtime', expiration: { maxEntries: 60 } }
					}
				]
			}
		})
	]
});
