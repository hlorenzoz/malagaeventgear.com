import { packages, getPriceRange, VAT_RATE } from '$lib/data/packages';
import { getCategories, getPosts } from '$lib/data/blog';
import { siteConfig } from '$lib/data/site';
import type { RequestHandler } from './$types';

/**
 * /llms.txt — llms.txt standard (llmstxt.org, Jeremy Howard 2024).
 *
 * Generated dynamically instead of shipped as a static file so that package
 * prices, guest limits and blog categories are NEVER duplicated (AGENTS.md §7:
 * "Ningún componente o página debe harcodear o duplicar datos de paquetes").
 * A stale price here is worse than a stale price on a page: AI assistants quote
 * it to customers as fact.
 */

const BASE_URL = siteConfig.url;

/** Absolute URL with the trailing slash the site canonicalises to. */
const abs = (path: string) => `${BASE_URL}${path}`;

/** `- [title](url): description` — the entry format required by the spec. */
const entry = (title: string, path: string, description: string) =>
	`- [${title}](${abs(path)}): ${description}`;

/** Human-readable descriptions per blog category slug; falls back to the name. */
const CATEGORY_BLURBS: Record<string, string> = {
	events: 'Articles on planning and equipping events of every type and size.',
	'audio-visual-rental':
		'How AV rental works, choosing a provider, comparing quotes and avoiding common rental mistakes.',
	weddings:
		'Wedding-specific guides on sound, lighting, microphones and coordinating rentals with venues.',
	'corporate-enterprise':
		'AV setups for conferences, seminars, training sessions, press conferences and product launches.',
	gadgets: 'Equipment deep-dives and hands-on notes on the gear MEG rents out.',
	news: 'Company announcements and project write-ups.'
};

function buildLlmsTxt(): string {
	const postCount = getPosts().length;
	const categories = getCategories();

	const packageEntries = packages
		.map((pkg) => {
			const capacity = pkg.maxGuests ? ` Up to ${pkg.maxGuests} guests.` : '';
			return entry(
				`${pkg.name} - ${pkg.price} EUR`,
				pkg.route,
				`${pkg.desc.en}${capacity} Includes: ${pkg.includes.en.join('; ')}.`
			);
		})
		.join('\n');

	const categoryEntries = categories
		.map((cat) =>
			entry(
				cat.name,
				`/blog/category/${cat.slug}/`,
				CATEGORY_BLURBS[cat.slug] ?? `Articles filed under ${cat.name}.`
			)
		)
		.join('\n');

	const { min, max } = getPriceRange();
	const priceRange = `${min} EUR to ${max} EUR`;
	const vatPercent = Math.round(VAT_RATE * 100);

	return `# ${siteConfig.brandName} (${siteConfig.brandShortName})

> Audiovisual equipment rental company in Málaga, Spain. Delivery-only all-inclusive packages (sound, lighting, projection, microphones) with transport and professional setup included, for weddings, private parties and corporate MICE events across Málaga, Marbella and the Costa del Sol.

## Docs

${entry('Home', '/', "Overview of MEG's audiovisual rental service, the all-inclusive event packages, service area and booking process.")}
${entry('Event Packages', '/packages/', `Comparison of every rental package with fixed prices in EUR (excluding ${vatPercent}% VAT), guest capacity and included equipment.`)}
${entry('Equipment Catalog', '/equipment/', 'Inventory of professional sound systems, RGBW LED lighting, HD projectors and screens, wireless microphones and special effects available for hire.')}
${entry('About Us', '/about-us/', `Company history in the audiovisual industry since ${siteConfig.foundingYear}, independent operation since 2010, and the delivery-and-setup service model.`)}
${entry('Meet the Team', '/meet-the-team/', 'The technicians who deliver, install and operate the equipment on site.')}
${entry('FAQ', '/faq/', 'Answers on booking, delivery and setup, coverage area, VAT, deposits, cancellations and what each package includes.')}
${entry('Contact', '/contact/', 'Contact form, phone, WhatsApp and email for quote requests and availability checks.')}

## Packages

All prices are per event, in EUR, excluding ${vatPercent}% VAT. Transport and professional setup are included in every package.

${packageEntries}

## Blog

${postCount} published articles on audiovisual rental for events, written from the company's own field experience in Málaga.

${entry('Blog', '/blog/', 'Index of all published articles on audiovisual rental, event planning and equipment selection.')}
${entry('All Categories', '/blog/categories/', 'Category index for browsing articles by topic.')}
${categoryEntries}

## Key Facts

- Business name: ${siteConfig.brandName} (${siteConfig.brandShortName})
- Active in the audiovisual industry since ${siteConfig.foundingYear}; operating as independent professionals since 2010
- Location: ${siteConfig.displayAddress}, Spain
- Business categories: ${siteConfig.categories.join(', ')}
- Service model: delivery-only. MEG transports the gear, installs it professionally, tests sound and lighting, and collects everything after the event.
- Pricing model: fixed all-inclusive package prices from ${priceRange} per event, excluding ${vatPercent}% VAT. Transport and setup included; optional extras priced separately.
- Opening hours: ${siteConfig.operatingHours.opens}-${siteConfig.operatingHours.closes}, Monday to Sunday
- Languages: English and Spanish (the website is bilingual)
- Service area: ${siteConfig.serviceAreas.join(', ')}.

## Contact

- Website: ${abs('/')}
- Bookings and quotes: ${siteConfig.emails.hire}
- General enquiries: ${siteConfig.emails.contact}
- Legal and data protection: ${siteConfig.emails.legal}
- Phone: ${siteConfig.contactPhone}
- WhatsApp: ${siteConfig.whatsappUrl}
- Address: ${siteConfig.displayAddress}, Spain

## Legal

${entry('Privacy Policy', '/privacy-policy/', 'How MEG collects, stores and processes personal data from quote requests and site usage.')}
${entry('Terms of Service', '/terms-of-service/', 'Rental conditions, booking terms and liability.')}
${entry('GDPR', '/gdpr/', "Data subject rights and MEG's GDPR compliance statement.")}
${entry('Cookie Policy', '/cookie-policy/', 'Cookies used on the site and how to manage consent.')}

## Optional

${entry('HTML Sitemap', '/sitemap/', 'Human-readable index of every public page on the site.')}
${entry('XML Sitemap Index', '/sitemap_index.xml', 'Machine-readable sitemap index covering pages, posts, categories and authors.')}
`;
}

export const prerender = true;

export const GET: RequestHandler = async () => {
	return new Response(buildLlmsTxt(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
