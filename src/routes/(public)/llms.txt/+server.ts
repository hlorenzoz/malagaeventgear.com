import { packages, getPriceRange, withPrices, VAT_RATE } from '$lib/data/packages';
import { faqs } from '$lib/data/faq';
import { getCategories, getPosts } from '$lib/data/blog';
import { siteConfig } from '$lib/data/site';
import { GMB_PROFILE_URL, getReviewsMeta } from '$lib/data/testimonials';
import { PAGE_LOCALES } from '$lib/i18n/availability';
import { withLocale } from '$lib/i18n/locale-path';
import { LOCALE_META } from '$lib/i18n/locales';
import type { RequestHandler } from './$types';

/**
 * /llms.txt, llms.txt standard (llmstxt.org, Jeremy Howard 2024).
 *
 * Generated at build time instead of shipped as a static file so that package prices, extras,
 * guest limits, FAQ answers, blog categories and review figures are NEVER duplicated (CLAUDE.md
 * §7: "Ningún componente o página debe harcodear o duplicar datos de paquetes"). A stale or
 * false fact here is worse than on a page: AI assistants quote it to customers as fact, so
 * every claim below comes from its single source (CLAUDE.md, "Honestidad").
 */

const BASE_URL = siteConfig.url;

/** Absolute URL with the trailing slash the site canonicalises to. */
const abs = (path: string) => `${BASE_URL}${path}`;

/** `- [title](url): description`, the entry format required by the spec. */
const entry = (title: string, path: string, description: string) => `- [${title}](${abs(path)}): ${description}`;

/** Human readable descriptions per blog category slug, falling back to the name. */
const CATEGORY_BLURBS: Record<string, string> = {
	events: 'Articles on planning and equipping events of every type and size.',
	'audio-visual-rental': 'How AV rental works, choosing a provider, comparing quotes and avoiding common rental mistakes.',
	weddings: 'Wedding guides on sound, lighting, microphones and coordinating rentals with venues.',
	'corporate-enterprise': 'AV setups for conferences, seminars, training sessions, press conferences and product launches.',
	gadgets: 'Close looks at the equipment MEG rents out.',
	news: 'Company announcements and reports on real events MEG equipped.'
};

/** English names of the customer service languages (siteConfig.serviceLanguages). */
const LANGUAGE_NAMES: Record<string, string> = { en: 'English', es: 'Spanish' };

/**
 * Published website locales with their URL root, derived from PAGE_LOCALES. Distinct from the
 * customer service languages on purpose: the site is read in more languages than MEG answers in.
 */
function websiteLanguages(): string {
	return PAGE_LOCALES.map((locale) => `${LOCALE_META[locale].nativeName} (${abs(withLocale(locale, '/'))})`).join(', ');
}

/** A list of items as one sentence: `a, b and c`. */
const listOf = (items: string[]) =>
	items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** A catalog item inside a sentence: `Aesthetic cabling` -> `aesthetic cabling`, `2 High quality` -> `2 high quality`, acronyms (`LED`, `PA`) kept. */
const inSentence = (item: string) => item.replace(/^((?:[\dx]+m?\s)?)([A-Z])(?=[a-z])/, (_, count: string, first: string) => count + first.toLowerCase());

/** Text as a sentence that ends in a period. */
const sentence = (text: string) => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`);

function buildLlmsTxt(): string {
	const posts = getPosts();
	const categories = getCategories();
	const reviews = getReviewsMeta();

	const packageEntries = packages
		.map((pkg) => {
			const capacity = pkg.maxGuests ? ` Up to ${pkg.maxGuests} guests.` : '';
			const extras = pkg.optional?.length
				? ` Optional extras: ${listOf(pkg.optional.map((extra) => inSentence(withPrices(extra, 'en'))))}.`
				: '';
			return entry(`${pkg.name} - ${pkg.price} EUR`, pkg.route, `${sentence(pkg.desc)}${capacity} Includes: ${listOf(pkg.includes.map(inSentence))}.${extras}`);
		})
		.join('\n');

	const guideEntries = posts
		.filter((post) => post.siloRole === 'pillar')
		.map((post) => entry(post.title, post.url, sentence(post.description)))
		.join('\n');

	const categoryEntries = categories
		.map((cat) => entry(cat.name, `/blog/category/${cat.slug}/`, CATEGORY_BLURBS[cat.slug] ?? `Articles filed under ${cat.name}.`))
		.join('\n');

	const faqEntries = faqs.map((item) => `- **${item.question}** ${withPrices(item.answer, 'en')}`).join('\n');

	const { min, max } = getPriceRange();
	const vatPercent = Math.round(VAT_RATE * 100);
	const reviewsAsOf = reviews.fetchedAt.slice(0, 10);

	return `# ${siteConfig.brandName} (${siteConfig.brandShortName})

> Audiovisual equipment rental company in Málaga, Spain. Fixed price packages (sound, lighting, projection, microphones) with delivery, professional setup and collection included, for weddings, private parties and corporate MICE events across Málaga, Marbella and the Costa del Sol. Delivery only: there is no self pickup.

## Docs

${entry('Home', '/', "Overview of MEG's audiovisual rental service, the event packages, service area and booking process.")}
${entry('Event Packages', '/packages/', `Every rental package with its fixed price in EUR (excluding ${vatPercent}% VAT), guest capacity, included equipment and optional extras.`)}
${entry('Equipment Catalog', '/equipment/', 'Professional sound systems, LED lighting, 3000 and 5000 lumen projectors with screens, a 60 inch LED display, wireless microphones and smoke machines available for hire.')}
${entry('About Us', '/about-us/', `Company history in the audiovisual industry since ${siteConfig.foundingYear}, independent operation since 2010, and the delivery and setup service model.`)}
${entry('Meet the Team', '/meet-the-team/', 'The technical personnel who set up and operate the equipment, the sales team who handle quotes and bookings, and the cofounder in charge of the website.')}
${entry('FAQ', '/faq/', 'Answers on services, delivery and setup, coverage area, booking, VAT, notice time and what each package includes. Every answer is also below, under Frequently Asked Questions.')}
${entry('Contact', '/contact/', 'Contact form, phone, WhatsApp and email for quote requests and availability checks.')}

## Packages

All prices are per event, in EUR, excluding ${vatPercent}% VAT. Delivery, professional setup and collection are included in every package.

${packageEntries}

## Guides

In depth guides from the company's own experience, one per main service.

${guideEntries}

## Blog

${posts.length} published articles on audiovisual rental for events, written from the company's own field experience in Málaga.

${entry('Blog', '/blog/', 'Index of all published articles on audiovisual rental, event planning and equipment selection.')}
${entry('All Categories', '/blog/categories/', 'Category index for browsing articles by topic.')}
${categoryEntries}

## Frequently Asked Questions

${faqEntries}

## Key Facts

- Business name: ${siteConfig.brandName} (${siteConfig.brandShortName})
- Active in the audiovisual industry since ${siteConfig.foundingYear}. Operating as independent professionals since 2010.
- Location: ${siteConfig.displayAddress}, Spain
- Business categories: ${siteConfig.categories.join(', ')}
- Service model: delivery only. MEG transports the equipment, installs it professionally, tests sound and lighting, and collects everything after the event.
- Pricing model: fixed package prices from ${min} EUR to ${max} EUR per event, excluding ${vatPercent}% VAT. Delivery and setup are included. Optional extras are priced per package, above.
- Opening hours: commercial enquiries ${siteConfig.operatingHours.opens}-${siteConfig.operatingHours.closes}, Monday to Sunday. Technical setup and live event support 24/7.
- Customer service languages: ${siteConfig.serviceLanguages.map((l) => LANGUAGE_NAMES[l]).join(' and ')} only
- Website languages: ${websiteLanguages()}
- Service area: ${siteConfig.serviceAreas.join(', ')}.
- Google reviews: ${reviews.averageRating} out of 5 from ${reviews.totalCount} Google reviews (as of ${reviewsAsOf}), on the Google Business Profile: ${GMB_PROFILE_URL}

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
${entry('Cookie Policy', '/cookie-policy/', 'What the site stores in the browser and how to manage it.')}

## Optional

${entry('HTML Sitemap', '/sitemap/', 'Index of every public page on the site, for people.')}
${entry('XML Sitemap Index', '/sitemap_index.xml', 'Sitemap index for crawlers, covering pages, posts, categories and authors in every published language.')}
`;
}

export const prerender = true;

export const GET: RequestHandler = async () => {
	return new Response(buildLlmsTxt(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			// Served as a build file. max-age=0 like the sitemaps: never let a cache keep an old fact.
			'Cache-Control': 'public, max-age=0, must-revalidate',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
