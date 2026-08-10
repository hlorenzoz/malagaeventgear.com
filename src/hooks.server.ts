import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// 1. WordPress legacy URL mapping to the new SvelteKit dynamic routes (301 Permanent Redirect)
	const legacyRedirects: Record<string, string> = {
		'/wedding-pack': '/packages/wedding/',
		'/wedding-pack/': '/packages/wedding/',
		'/product-presentation-pack': '/packages/product-presentation/',
		'/product-presentation-pack/': '/packages/product-presentation/',
		'/eco-pack': '/packages/eco/',
		'/eco-pack/': '/packages/eco/',
		'/mice-pack': '/packages/mice/',
		'/mice-pack/': '/packages/mice/',
		'/basic-mice-pack': '/packages/basic-mice/',
		'/basic-mice-pack/': '/packages/basic-mice/',
		'/pricing': '/packages/',
		'/pricing/': '/packages/',
		'/contact-us': '/contact/',
		'/contact-us/': '/contact/',
		// WooCommerce legacy taxonomy: the store was retired in the WP migration and these
		// product archives never got a rule, so they were serving a hard 404. Detected via the
		// GSC "Referring page" field on the homepage inspection (2026-08-10).
		// /my-account/, /cart/, /checkout/ and /product/ are deliberately NOT here: they are store
		// functionality with no equivalent, so 404 is the correct answer and a 301 to the homepage
		// would read as a soft 404.
		'/product-category/mice-pack': '/packages/mice/',
		'/product-category/mice-pack/': '/packages/mice/',
		'/product-category/basic-mice-pack': '/packages/basic-mice/',
		'/product-category/basic-mice-pack/': '/packages/basic-mice/',
		'/product-category/wedding-pack': '/packages/wedding/',
		'/product-category/wedding-pack/': '/packages/wedding/',
		'/product-category/eco-pack': '/packages/eco/',
		'/product-category/eco-pack/': '/packages/eco/',
		'/product-category/product-presentation-pack': '/packages/product-presentation/',
		'/product-category/product-presentation-pack/': '/packages/product-presentation/',
		'/product-category': '/packages/',
		'/product-category/': '/packages/',
		'/shop': '/packages/',
		'/shop/': '/packages/'
	};

	if (legacyRedirects[pathname]) {
		return new Response(null, {
			status: 301,
			headers: {
				'Location': legacyRedirects[pathname],
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	}

	// 2. Trailing slash enforcement for HTML/public pages (as per SEO and project guidelines)
	// We exclude static asset assets, sitemaps, API routes, or paths already having slashes
	const isFile = pathname.includes('.') || pathname.endsWith('.xml');
	const isApi = pathname.startsWith('/api') || pathname.startsWith('/_');
	const hasTrailingSlash = pathname.endsWith('/');

	if (!isFile && !isApi && !hasTrailingSlash && pathname !== '/') {
		return new Response(null, {
			status: 301,
			headers: {
				'Location': `${pathname}/`,
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	}

	// Normal request handling
	const response = await resolve(event);

	// Security headers for SSR pages + /api/* (Worker-generated responses).
	// Prerendered pages and static assets are served from the ASSETS binding and
	// never reach this hook — those get the SAME headers via the `/*` block in
	// `_headers`. Keep both in sync.
	// CSP is intentionally NOT set here yet: a strict policy breaks Turnstile,
	// the R2 image CDN and SvelteKit's inline styles, so it needs a dedicated
	// Report-Only rollout (see prod-hardening plan, P1).
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload',
	);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

	return response;
};
