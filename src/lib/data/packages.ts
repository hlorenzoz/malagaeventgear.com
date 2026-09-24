import { z } from 'zod';
import { LOCALE_META, type Locale } from '$lib/i18n/locales';

// Copy is ENGLISH here: this file is the source. Every other language lives in
// `src/lib/i18n/data/<locale>.ts` and is loaded only on that language's pages, so the catalog
// does not ship 14 languages to every visitor. The package NAME is never translated.
const LocalizedTextSchema = z.string();
const LocalizedListSchema = z.array(z.string());

// Per-package landing page copy - every piece of bespoke, localized presentational
// content lives here so the single dynamic /packages/[slug] route stays data-driven
// while preserving full SEO/content parity with the original standalone pages.
const LandingSchema = z.object({
	badge: LocalizedTextSchema,
	rateLabel: LocalizedTextSchema,
	vatNote: LocalizedTextSchema,
	specIcon: z.string(),
	specTitle: LocalizedTextSchema,
	specBody: LocalizedTextSchema,
	highlightIcon: z.string().optional(),
	highlightTitle: LocalizedTextSchema,
	highlightBody: LocalizedTextSchema,
	includesLabel: LocalizedTextSchema,
	optionalLabel: LocalizedTextSchema.optional(),
	note: z
		.object({
			title: LocalizedTextSchema,
			body: LocalizedTextSchema
		})
		.optional(),
	ctaHeading: LocalizedTextSchema,
	ctaBody: LocalizedTextSchema,
	ctaButton: LocalizedTextSchema
});

// SEO metadata per package (page title + JSON-LD Service descriptors)
const SeoSchema = z.object({
	title: LocalizedTextSchema,
	serviceName: z.string(),
	serviceType: z.string()
});// Main package Zod schema
export const PackageSchema = z.object({
	id: z.string(),
	slug: z.string(),
	route: z.string(),
	/**
	 * Fecha del ultimo cambio de contenido del paquete (YYYY-MM-DD). Alimenta el
	 * <lastmod> de /packages/[slug]/ en page-sitemap.xml. Regla de frescura (CLAUDE.md):
	 * se bumpea solo ante un cambio real (precio, inclusiones, copy), nunca por build.
	 */
	updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'updated debe ser YYYY-MM-DD'),
	name: z.string(),
	price: z.number(), // in EUR (excluding VAT)
	desc: LocalizedTextSchema,
	includes: LocalizedListSchema,
	optional: LocalizedListSchema.optional(),
	maxGuests: z.number().optional(),
	popular: z.boolean().optional(),
	image: z.string().optional(),
	/** Icon name used wherever the package appears in a navigation list (HTML sitemap, menus). */
	navIcon: z.string(),
	seo: SeoSchema,
	landing: LandingSchema,
	category: z.enum(['social', 'corporate']),
	// Granular e-commerce filtering metadata (single source of truth for /packages/ filters)
	purpose: z.array(z.enum(['party', 'wedding', 'corporate', 'presentation', 'meeting'])),
	includeTags: z.array(
		z.enum(['transport', 'screen', 'sound', 'microphone', 'lighting', 'technician'])
	),
	optionalTags: z
		.array(z.enum(['projector', 'smoke-machine', 'technical-assistant', 'lectern', 'staging']))
		.optional()
});

export type EventPackage = z.infer<typeof PackageSchema>;

// Verified package inventory data matching live business catalog
const packagesData: EventPackage[] = [
	{
		id: 'eco',
		slug: 'eco',
		route: '/packages/eco/',
		updated: '2026-05-31',
		navIcon: 'eco',
		name: 'Eco Pack',
		price: 290,
		image: '/images/packages/eco.webp',
		desc: 'Ideal for private parties or small events of up to 50 guests. Includes basic solid sound and ambient lighting.',
		includes: [
				'2 High quality active speakers with stands',
				'1 Wired dynamic microphone',
				'2 Light bars with RGBW LED spotlights',
				'Aesthetic cabling and professional setup'
			],
		optional: ['Projector & projection screen (+{price:projectorScreen})', 'Professional smoke/fog machine (+{price:smokeMachine})'],
		maxGuests: 50,
		popular: false,
		category: 'social',
		purpose: ['party'],
		includeTags: ['sound', 'microphone', 'lighting', 'transport'],
		optionalTags: ['projector', 'smoke-machine'],
		seo: {
			title: 'Eco Pack Speaker & Lighting Rental | Malaga Event Gear',
			serviceName: 'Eco Pack Rental Malaga - Malaga Event Gear (MEG)',
			serviceType: 'Audio visual event rentals for private parties'
		},
		landing: {
			badge: 'Small Events & Parties',
			rateLabel: 'Affordable All Inclusive Rate',
			vatNote: '(+21% VAT) - Setup & transport included',
			specIcon: 'group',
			specTitle: 'Up to 50 Guests',
			specBody: 'Perfect for villas, gardens, and private rooms.',
			highlightTitle: 'Stress Free Service',
			highlightBody: 'We operate as a delivery only model with direct setups. We bring the gear, install it professionally, test the sound and lights, and retrieve everything after the event.',
			includesLabel: 'What is Included',
			optionalLabel: 'Optional Extras',
			ctaHeading: 'Secure Your Booking Today',
			ctaBody: 'Fill out our quick technical quote request to check package availability for your date. We get back to you as soon as possible!',
			ctaButton: 'Book This Package'
		}
	},
	{
		id: 'wedding',
		slug: 'wedding',
		route: '/packages/wedding/',
		updated: '2026-05-31',
		navIcon: 'favorite',
		name: 'Wedding Pack',
		price: 650,
		desc: 'Designed to perfection for magical and unforgettable wedding celebrations. Includes a professional high end acoustic system, romantic ambient lighting, and wireless microphones for moving speeches.',
		includes: [
				'High end active PA acoustic sound system for up to 80 guests',
				'Fairy lights / warm LED strings for romantic ambient lighting',
				'Professional wireless microphones for speeches and announcements',
				'Transport in Malaga and surrounding areas',
				'Professional aesthetic setup and cabling',
				'On site live technical control and engineering support during the event',
				'Post event rapid teardown and logistics pickup'
			],
		optional: ['Professional smoke/fog machine (+{price:smokeMachine})'],
		maxGuests: 80,
		popular: true,
		image: '/images/packages/wedding.webp',
		category: 'social',
		purpose: ['wedding', 'party'],
		includeTags: ['sound', 'microphone', 'lighting', 'transport', 'technician'],
		optionalTags: ['smoke-machine'],
		seo: {
			title: 'Wedding Pack Sound & Romantic Lighting | Malaga Event Gear',
			serviceName: 'Wedding Pack Audio & Lighting Rental Malaga - Malaga Event Gear (MEG)',
			serviceType: 'Audio visual wedding celebrations rentals'
		},
		landing: {
			badge: 'Our Most Popular Celebration Pack',
			rateLabel: 'Premium All Inclusive Rate',
			vatNote: '(+21% VAT) - Setup & live support included',
			specIcon: 'group',
			specTitle: 'Up to 80 Guests',
			specBody: 'Perfect for beautiful villas, fincas, and wedding hotels.',
			highlightIcon: 'engineering',
			highlightTitle: 'Live On Site Technician',
			highlightBody: 'Never worry about microphone feedback or visual issues. This package includes full live on site technical monitoring and acoustic adjustments throughout your banquet and speeches.',
			includesLabel: 'Premium Inclusions',
			ctaHeading: 'Make Your Celebration Magic',
			ctaBody: 'Bookings for weddings fill up quickly. Secure your date with our technical crew today to guarantee the finest sound and romantic lighting on your special day.',
			ctaButton: 'Book This Wedding Pack'
		}
	},
	{
		id: 'presentation',
		slug: 'product-presentation',
		route: '/packages/product-presentation/',
		updated: '2026-09-24',
		navIcon: 'co_present',
		name: 'Product Presentation Pack',
		price: 310,
		image: '/images/packages/product-presentation.webp',
		desc: 'Designed for corporate presentations, dealership showcases, and product launches with high visual impact.',
		includes: [
				'1 Front projection screen with stable stand',
				'1 High brightness projector (5000 lumens) for crisp visuals',
				'Venue sound system with 2 speakers & mixing console',
				'1 Premium wireless handheld microphone for speakers'
			],
		popular: false,
		category: 'corporate',
		purpose: ['presentation', 'corporate'],
		includeTags: ['sound', 'microphone', 'screen'],
		seo: {
			title: 'Product Presentation Pack Projection & Audio | Malaga Event Gear',
			serviceName: 'Product Presentation Pack Projection & Audio Malaga - Malaga Event Gear (MEG)',
			serviceType: 'Audio visual product showcase and launch rentals'
		},
		landing: {
			badge: 'High Visual Impact Corporate Solutions',
			rateLabel: 'Presentation Pack Flat Rate',
			vatNote: '(+21% VAT) - Projector & screen included',
			specIcon: 'videocam',
			specTitle: 'High Brightness Projector',
			specBody: '5000 lumen projector, ideal for lit rooms.',
			highlightTitle: 'Flawless Corporate Branding',
			highlightBody: 'Maximize the attention of your dealership launch, hotel press release, or product showcase. Our professional setup aligns pristine graphic detail with high performance speech amplification.',
			includesLabel: 'What is Included',
			note: {
				title: 'Setup & Connection Support',
				body: 'We provide all necessary adapters (HDMI, USB-C) and audio interfaces to connect your company laptops, tablets, or players seamlessly.'
			},
			ctaHeading: 'Elevate Your Product Showcase',
			ctaBody: 'Give your audience the visual clarity and professional sound they deserve. Contact our technical team today to confirm availability.',
			ctaButton: 'Book This Presentation Pack'
		}
	},
	{
		id: 'mice-basic',
		slug: 'basic-mice',
		route: '/packages/basic-mice/',
		updated: '2026-05-31',
		navIcon: 'groups',
		name: 'Basic MICE Pack',
		price: 295,
		image: '/images/packages/basic-mice.webp',
		desc: 'Essential, high performance audiovisual setup for small executive meetings, conferences, and presentations up to 40 guests.',
		includes: [
				'2x2m Projection screen with high brightness 3000 lumen projector',
				'Basic crystal clear sound reinforcement system for up to 40 people',
				'1 Professional gooseneck microphone for podium/lectern',
				'Logistics transport, setup, and aesthetic wiring'
			],
		optional: ['Dedicated on site live technical assistant (+{price:technicianDay}/day)'],
		maxGuests: 40,
		popular: false,
		category: 'corporate',
		purpose: ['corporate', 'meeting'],
		includeTags: ['sound', 'microphone', 'screen', 'transport'],
		optionalTags: ['technical-assistant'],
		seo: {
			title: 'Basic MICE Pack Corporate Meeting AV | Malaga Event Gear',
			serviceName: 'Basic MICE Pack Speaker & Projector Rental - Malaga Event Gear (MEG)',
			serviceType: 'Audio visual MICE corporate meeting rentals'
		},
		landing: {
			badge: 'Essential Executive Meeting Packages',
			rateLabel: 'Corporate Meeting Flat Rate',
			vatNote: '(+21% VAT) - Setup & transport included',
			specIcon: 'group',
			specTitle: 'Up to 40 Guests',
			specBody: 'Designed for boardrooms, private salons, and hotel suites.',
			highlightTitle: 'Clear Speech Intelligibility',
			highlightBody: 'Professional gooseneck microphone configuration guarantees absolute clarity for board addresses, press announcements, or investor panels without echo or feedback.',
			includesLabel: 'What is Included',
			optionalLabel: 'Optional Support',
			ctaHeading: 'Plan Your Executive Meeting',
			ctaBody: 'Coordinate seamless corporate AV logistics with Malaga Event Gear. Connect with our experts to secure a professional boardroom experience.',
			ctaButton: 'Book Basic MICE Pack'
		}
	},
	{
		id: 'mice-full',
		slug: 'mice',
		route: '/packages/mice/',
		updated: '2026-05-31',
		navIcon: 'corporate_fare',
		name: 'MICE Pack',
		price: 490,
		image: '/images/packages/mice.webp',
		desc: 'Comprehensive corporate MICE solution featuring a large format display screen, premium active sound reinforcement, wireless podium microphones, and dedicated live technician support.',
		includes: [
				'Premium 60 inch high definition LED display screen with designer stand',
				'Professional active speakers and high performance sound system',
				'1 Gooseneck microphone + 1 wireless handheld microphone',
				'1 Dedicated specialized live AV technician (up to 6 hours continuous support)',
				'Logistics delivery, custom wiring setup, and post event teardown'
			],
		optional: [
				'Additional live technical assistant support hour (+{price:technicianHour}/h)',
				'Premium methacrylate/acrylic modern lectern (+{price:lectern})',
				'Modular stage platforms / staging (+{price:stagingPerSqm} per square meter)'
			],
		maxGuests: 120,
		popular: false,
		category: 'corporate',
		purpose: ['corporate', 'meeting'],
		includeTags: ['sound', 'microphone', 'screen', 'transport', 'technician'],
		optionalTags: ['lectern', 'staging', 'technical-assistant'],
		seo: {
			title: 'MICE Pack Corporate AV with LED Display & Technician | Malaga Event Gear',
			serviceName: 'MICE Pack LED Display, Sound & Live Technician Rental - Malaga Event Gear (MEG)',
			serviceType: 'Audio visual MICE corporate event rentals with live technician'
		},
		landing: {
			badge: 'Premium Corporate MICE Experience',
			rateLabel: 'All Inclusive Corporate Rate',
			vatNote: '(+21% VAT) - LED display, sound & live technician included',
			specIcon: 'connected_tv',
			specTitle: '60 inch LED Display',
			specBody: 'High definition large format screen for impactful corporate visuals.',
			highlightIcon: 'engineering',
			highlightTitle: 'Dedicated Live Technician',
			highlightBody: 'A specialized AV technician runs your event for up to 6 continuous hours, guaranteeing flawless sound, visuals, and microphone management throughout your summit, conference, or product launch.',
			includesLabel: 'Premium Inclusions',
			optionalLabel: 'Optional Extras',
			ctaHeading: 'Power Your Corporate Event',
			ctaBody: 'Deliver a flawless corporate experience with premium AV and dedicated technical support. Contact our team today to confirm availability for your date.',
			ctaButton: 'Book MICE Pack'
		}
	}
];

// Validate all packages at runtime using Zod to ensure complete type safety and data integrity
export const packages: EventPackage[] = packagesData.map((pkg) => {
	const result = PackageSchema.safeParse(pkg);
	if (!result.success) {
		console.error(`Invalid package configuration for ID: ${pkg.id}`, result.error.format());
		throw new Error(`Invalid package configuration: ${result.error.message}`);
	}
	return result.data;
});

export const getPackageBySlug = (slug: string): EventPackage | undefined => {
	return packages.find((pkg) => pkg.slug === slug);
};

/* -------------------------------------------------------------------------- */
/* Pricing - Single Source of Truth (CLAUDE.md §7)                            */
/* -------------------------------------------------------------------------- */

/** ISO 4217 currency every package price is denominated in. */
export const CURRENCY = 'EUR' as const;

/** Currency symbol used across UI, JSON-LD and machine-readable outputs. */
export const CURRENCY_SYMBOL = '€' as const;

/** Spanish VAT rate applied on top of every listed price (prices are ex-VAT). */
export const VAT_RATE = 0.21;

/**
 * Formats a package price using the locale's own currency convention:
 * English puts the symbol first (`€290`) and every other locale follows `Intl` (`290 €` in
 * German, `€290` in Chinese).
 *
 * Every price string rendered anywhere on the site MUST come from here - a
 * literal like `'€290'` in a component silently outlives the next price change.
 */
export function formatPrice(amount: number, lang: Locale = 'en'): string {
	if (lang === 'en') return `${CURRENCY_SYMBOL}${amount}`;
	return new Intl.NumberFormat(LOCALE_META[lang].intl, {
		style: 'currency',
		currency: CURRENCY,
		maximumFractionDigits: 0
	})
		.format(amount)
		// Intl separates with a no break space, and CLAUDE.md §12 allows plain spaces only.
		.replace(/[  ]/g, ' ');
}

/**
 * Every amount that is not a package price: extras, business thresholds and the budget filter
 * brackets (EUR, excluding VAT). This is their single source of truth. Copy names them with a
 * `{price:key}` token and never writes the number, so changing one here changes it in all 13
 * languages at once.
 */
export const PRICE_POINTS = {
	/** Eco Pack extra: projector and projection screen. */
	projectorScreen: 50,
	/** Eco Pack and Wedding Pack extra: professional smoke or fog machine. */
	smokeMachine: 20,
	/** MICE Pack extra: premium acrylic lectern. */
	lectern: 50,
	/** Dedicated on site technician, per day. */
	technicianDay: 240,
	/** Additional technician support, per hour. */
	technicianHour: 40,
	/** Modular stage platforms, per square meter. */
	stagingPerSqm: 35,
	/** Minimum order for Granada and other out of province destinations. */
	outOfProvinceMinimum: 400,
	/** Budget filter on /packages/: "low" is up to this amount. */
	budgetLow: 300,
	/** Budget filter on /packages/: "mid" is up to this amount, "high" above it. */
	budgetHigh: 500
} as const satisfies Record<string, number>;

export type PricePoint = keyof typeof PRICE_POINTS;

export function isPricePoint(key: string): key is PricePoint {
	return Object.hasOwn(PRICE_POINTS, key);
}

/**
 * Renders the `{price:key}` tokens of a copy string (`'Projector (+{price:projectorScreen})'`)
 * with formatPrice in the page language. An unknown key throws, which fails the prerender
 * instead of publishing a broken token. Guarded by no-hardcoded-prices.test.ts.
 */
export function withPrices(text: string, lang: Locale = 'en'): string {
	return text.replace(/\{price:([A-Za-z0-9]+)\}/g, (token, key: string) => {
		if (!isPricePoint(key)) throw new Error(`Unknown price token ${token}: add it to PRICE_POINTS`);
		return formatPrice(PRICE_POINTS[key], lang);
	});
}

/** Cheapest and most expensive package prices, derived from the catalog. */
export function getPriceRange(): { min: number; max: number } {
	const prices = packages.map((pkg) => pkg.price);
	return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Human-facing price range, e.g. `€290 - €650` (en) / `290 € - 650 €` (de). */
export function formatPriceRange(lang: Locale = 'en'): string {
	const { min, max } = getPriceRange();
	return `${formatPrice(min, lang)} - ${formatPrice(max, lang)}`;
}

/**
 * `priceRange` value for schema.org LocalBusiness.
 *
 * Google accepts either a vague indicator (`€€`) or a concrete range; we publish
 * the concrete one because it is verifiable against the packages page, which is
 * what E-E-A-T rewards. Symbol-suffixed on both sides to match the es-ES
 * convention of the business's own locale.
 */
export function getSchemaPriceRange(): string {
	const { min, max } = getPriceRange();
	return `${min}${CURRENCY_SYMBOL} - ${max}${CURRENCY_SYMBOL}`;
}

/**
 * The packages featured in the homepage showcase, in display order.
 *
 * Kept here rather than in the i18n dictionary so the showcase can never list a
 * price, name or capacity that disagrees with the package's own landing page.
 */
export const HOMEPAGE_SHOWCASE_SLUGS = ['eco', 'wedding', 'mice'] as const;

/** Resolves {@link HOMEPAGE_SHOWCASE_SLUGS} to full package records. */
export function getHomepageShowcasePackages(): EventPackage[] {
	return HOMEPAGE_SHOWCASE_SLUGS.map((slug) => {
		const pkg = getPackageBySlug(slug);
		if (!pkg) throw new Error(`Homepage showcase references unknown package slug: ${slug}`);
		return pkg;
	});
}

/**
 * One-line `Name (price)` label per package, for compact listings such as the
 * HTML sitemap. Never hand-write these - see {@link formatPrice}.
 */
export function getPackageLabels(lang: Locale = 'en'): { pkg: EventPackage; label: string }[] {
	return packages.map((pkg) => ({
		pkg,
		label: `${pkg.name} (${formatPrice(pkg.price, lang)})`
	}));
}

/**
 * Category/keyword → package slug mapping table.
 * Rules are checked in order; first match wins.
 * Each rule has category keywords (matched against post.categories) and
 * title/tag keywords (matched against post.title and post.tags).
 */
const PACKAGE_RULES: {
	/** Patterns to match against category names (case-insensitive substring) */
	categoryPatterns?: RegExp[];
	/** Patterns to match against title and tags (case-insensitive substring) */
	keywordPatterns?: RegExp[];
	/** Patterns to match against the post slug (clean, single-topic signal) */
	slugPatterns?: RegExp[];
	/** Package slug to resolve when this rule matches */
	slug: string;
}[] = [
	// Weddings
	{
		categoryPatterns: [/\bwedding/i],
		keywordPatterns: [/\bwedding\b/i],
		slug: 'wedding'
	},
	// Product presentations / launches / seminars / training / virtual / remote.
	// El slug es la señal limpia (los títulos mezclan temas, p. ej. "Press Conferences
	// AND Corporate Events"), por eso va PRIMERO entre las reglas de eventos.
	{
		slugPatterns: [
			/seminar/,
			/training/,
			/virtual/,
			/remote/,
			/presentation/,
			/launch/,
			/webinar/
		],
		keywordPatterns: [
			/\bpresentation\b/i,
			/\bproduct\s+launch\b/i,
			/\blaunch\b/i,
			/\bseminar/i,
			/\bwebinar/i,
			/\btraining\b/i,
			/\bvirtual\b/i
		],
		slug: 'product-presentation'
	},
	// MICE de mayor porte: galas, eventos deportivos, eventos corporativos, fundraisers.
	{
		slugPatterns: [/gala/, /sports/, /corporate-event/, /charity/, /fundrais/],
		keywordPatterns: [/\bgala\b/i, /\bsports?\b/i, /\bcharity\b/i, /\bfundrais/i],
		slug: 'mice'
	},
	// Música / conciertos / performances → eco (social, centrado en sonido).
	{
		slugPatterns: [/music/, /performance/, /concert/],
		keywordPatterns: [/\bconcert\b/i],
		slug: 'eco'
	},
	// Corporate / MICE / Events / Conferences / Meetings - catch-all amplio para el
	// resto de eventos genéricos (el sitio viejo los mandaba a /pricing/).
	{
		categoryPatterns: [/\bcorporate\b/i, /\bmice\b/i, /\bevent/i, /\bconference/i, /\bmeeting/i],
		slug: 'basic-mice'
	}
	// Default: eco (handled separately below)
];

/**
 * Resolves the most relevant EventPackage for a given blog post.
 *
 * Matching strategy (in order):
 * 1. Check post.categories against categoryPatterns for each rule
 * 2. Check post.tags and post.title against keywordPatterns for each rule
 * 3. Fallback: 'eco' package
 *
 * @param post - A BlogPost (or minimal subset with categories, tags, title)
 * @returns The most relevant EventPackage
 */
export function resolvePackageForPost(post: {
	categories: string[];
	tags: string[];
	title: string;
	slug?: string;
	isNews?: boolean;
}): EventPackage {
	for (const rule of PACKAGE_RULES) {
		// Check slug first - it's the cleanest single-topic signal, so a specific
		// slug (e.g. ".../seminars") wins over the broad category catch-all below.
		if (rule.slugPatterns && post.slug) {
			const matched = rule.slugPatterns.some((pattern) => pattern.test(post.slug!));
			if (matched) {
				const pkg = packages.find((p) => p.slug === rule.slug);
				if (pkg) return pkg;
			}
		}

		// Check categories
		if (rule.categoryPatterns) {
			const matched = post.categories.some((cat) =>
				rule.categoryPatterns!.some((pattern) => pattern.test(cat))
			);
			if (matched) {
				const pkg = packages.find((p) => p.slug === rule.slug);
				if (pkg) return pkg;
			}
		}

		// Check title and tags for keyword patterns
		if (rule.keywordPatterns) {
			const searchStrings = [post.title, ...post.tags];
			const matched = searchStrings.some((str) =>
				rule.keywordPatterns!.some((pattern) => pattern.test(str))
			);
			if (matched) {
				const pkg = packages.find((p) => p.slug === rule.slug);
				if (pkg) return pkg;
			}
		}
	}

	// Default fallback: eco pack
	return packages.find((p) => p.slug === 'eco')!;
}

/**
 * Per-package relevance signals (mirror PACKAGE_RULES, but one entry per package so each
 * can be scored independently). Used by getPackagesForPost to rank the rail by relevance.
 * `slug` mirrors PACKAGE_RULES.slugPatterns - the cleanest single-topic signal, so it
 * carries the highest weight in scorePackage and keeps the rail consistent with the CTA.
 */
const PACKAGE_SIGNALS: Record<string, { slug: RegExp[]; category: RegExp[]; keyword: RegExp[] }> = {
	wedding: {
		slug: [/wedding/],
		category: [/\bwedding/i],
		keyword: [/\bwedding\b/i, /\bbride/i, /\bceremony\b/i, /\breception\b/i]
	},
	'basic-mice': {
		// No slug rule in PACKAGE_RULES - basic-mice is the broad category catch-all.
		slug: [],
		category: [/\bcorporate\b/i, /\bmice\b/i, /\bevent/i, /\bconference/i, /\bmeeting/i],
		keyword: [/\bcorporate\b/i, /\bconference/i, /\bmeeting/i, /\bseminar/i, /\bmice\b/i]
	},
	mice: {
		slug: [/gala/, /sports/, /corporate-event/, /charity/, /fundrais/],
		category: [/\bcorporate\b/i, /\bmice\b/i, /\bevent/i, /\bconference/i, /\bmeeting/i],
		keyword: [/\bgala\b/i, /\bsports?\b/i, /\bcorporate\b/i, /\bconference/i, /\bmice\b/i, /\bcharity\b/i, /\bfundrais/i]
	},
	'product-presentation': {
		slug: [/seminar/, /training/, /virtual/, /remote/, /presentation/, /launch/, /webinar/],
		category: [/\bcorporate\b/i, /\bpresentation\b/i, /\blaunch\b/i],
		keyword: [/\bpresentation\b/i, /\bproduct\s+launch\b/i, /\blaunch\b/i, /\bseminar/i, /\bwebinar/i, /\btraining\b/i, /\bvirtual\b/i, /\bshowcase\b/i, /\bdealership\b/i, /\bproduct\b/i]
	},
	eco: {
		slug: [/music/, /performance/, /concert/],
		category: [/\bparty\b/i, /\bprivate\b/i, /\bcelebration\b/i],
		keyword: [/\bparty\b/i, /\bbirthday\b/i, /\bcelebration\b/i, /\bbudget\b/i, /\bprivate\b/i, /\bmusic\b/i, /\bconcert\b/i]
	}
};

/**
 * Relevance score of a package for a post.
 * Weights: slug match = 4 (strongest, mirrors the resolver), category match = 3,
 * title keyword = 2, each tag keyword = 1.
 */
function scorePackage(
	slug: string,
	post: { categories: string[]; tags: string[]; title: string; slug?: string }
): number {
	const sig = PACKAGE_SIGNALS[slug];
	if (!sig) return 0;
	let score = 0;
	if (post.slug && sig.slug.some((re) => re.test(post.slug!))) score += 4;
	for (const cat of post.categories) {
		if (sig.category.some((re) => re.test(cat))) score += 3;
	}
	if (sig.keyword.some((re) => re.test(post.title))) score += 2;
	for (const tag of post.tags) {
		if (sig.keyword.some((re) => re.test(tag))) score += 1;
	}
	return score;
}

/**
 * Returns ALL packages ordered by relevance to the post:
 * the resolved (most relevant) package first - matching resolvePackageForPost so the rail
 * stays consistent with the PostCTA - then the rest sorted by relevance score (desc),
 * with catalog order as a stable tiebreaker.
 *
 * @param post - A BlogPost (or minimal subset with categories, tags, title)
 * @returns Every EventPackage exactly once, most relevant first.
 */
export function getPackagesForPost(post: {
	categories: string[];
	tags: string[];
	title: string;
	slug?: string;
	isNews?: boolean;
}): EventPackage[] {
	const resolved = resolvePackageForPost(post);
	const catalogIndex = new Map(packages.map((p, i) => [p.slug, i]));
	const others = packages
		.filter((p) => p.slug !== resolved.slug)
		.sort((a, b) => {
			const diff = scorePackage(b.slug, post) - scorePackage(a.slug, post);
			if (diff !== 0) return diff;
			return catalogIndex.get(a.slug)! - catalogIndex.get(b.slug)!;
		});
	return [resolved, ...others];
}
