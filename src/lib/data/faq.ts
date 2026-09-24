import { z } from 'zod';
import type { FaqPageSchema } from '$lib/types/seo';
import { packages, formatPrice } from '$lib/data/packages';
import { LOCALE_META, type Locale } from '$lib/i18n/locales';

/**
 * `Eco Pack (€290), Wedding Pack (€650), …` built from the catalog.
 *
 * Esta FAQ se publica también como JSON-LD `FAQPage`, así que un precio viejo acá
 * llega directo a los resultados enriquecidos de Google. Ver CLAUDE.md §7. Las traducciones
 * (`i18n/data/<locale>.ts`) escriben el token `{packagesWithPrices}` y el render lo reemplaza
 * con esta función en su idioma: nunca un precio literal.
 */
export function packagesWithPrices(lang: Locale): string {
	const list = packages.map((pkg) => `${pkg.name} (${formatPrice(pkg.price, lang)})`);
	if (lang !== 'en') {
		return new Intl.ListFormat(LOCALE_META[lang].intl, { type: 'conjunction' }).format(list);
	}
	const last = list.pop();
	return `${list.join(', ')}, and ${last}`;
}

// English source text. Translations live in `src/lib/i18n/data/<locale>.ts` (see packages.ts).
const LocalizedTextSchema = z.string();

// FAQ thematic categories used by the /faq page filter
export const FaqCategorySchema = z.enum(['services', 'logistics', 'booking', 'contact']);
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

// Single FAQ entry schema
export const FaqItemSchema = z.object({
	id: z.string(),
	category: FaqCategorySchema,
	onHomepage: z.boolean(), // surfaced in the homepage FAQ teaser (only the 5 highest-value ones)
	onContact: z.boolean().optional(), // surfaced on the /contact page (inquiry & quote-oriented)
	question: LocalizedTextSchema,
	answer: LocalizedTextSchema
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

// Single source of truth for all FAQ content.
// Base set mirrors the live malagaeventgear.com FAQ; extended set is authored
// strictly from existing business context (packages.ts, homepage copy, service list).
const faqData: FaqItem[] = [
	{
		id: 'what-is-meg',
		category: 'services',
		onHomepage: true,
		question: 'What is Malaga Event Gear (MEG), and what services do they offer?',
		answer: 'Malaga Event Gear (MEG) is a company based in Malaga, Spain, specializing in the rental of professional audiovisual, lighting, and event equipment. We provide sound systems, projectors, screens, stages, technical assistance, smoke machines, lighting solutions, and microphones, plus specialized services such as live sound reinforcement, and simultaneous translation and interactive voting systems arranged through a subcontracted partner.'
	},
	{
		id: 'event-types',
		category: 'services',
		onHomepage: true,
		question: 'What types of events can Malaga Event Gear (MEG) cater to?',
		answer: 'We cover personal celebrations such as weddings and private parties, professional gatherings such as corporate events, meetings, conferences, and product presentations, and larger scale events such as congresses, fairs, and exhibitions, always with tailored audiovisual solutions.'
	},
	{
		id: 'service-areas',
		category: 'logistics',
		onHomepage: true,
		onContact: true,
		question: 'Where does Malaga Event Gear (MEG) offer its services?',
		answer: 'While "Malaga" is in our name, our services extend well beyond the city. We primarily operate across the Costa del Sol, including Malaga capital, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena, and Estepona. We also serve Sevilla and Granada, though Granada typically requires bookings exceeding {price:outOfProvinceMinimum} due to the out of province travel distance.'
	},
	{
		id: 'what-makes-unique',
		category: 'services',
		onHomepage: false,
		question: 'What makes Malaga Event Gear (MEG) unique compared to other audiovisual rental companies?',
		answer: 'MEG differentiates itself through a customer centric and streamlined approach: delivery and professional setup by our own team on every booking, a live technician included in the Wedding Pack and the MICE Pack, premium brand equipment, and transparent all inclusive pricing. We are moving toward a 100% online booking experience with standardized fixed pricing and fully transparent transactions.'
	},
	{
		id: 'booking-process',
		category: 'booking',
		onHomepage: true,
		onContact: true,
		question: 'How does the booking process work with Malaga Event Gear?',
		answer: 'Our streamlined workflow has four steps: 1. Select your package. 2. Request your quote using our quick inquiry form. 3. Our team contacts you to finalize details and confirm the booking. 4. Enjoy a hassle free event while we handle delivery, professional setup, configuration, and teardown. Please note that services must be contracted at least 24 hours in advance.'
	},
	{
		id: 'popular-packages',
		category: 'booking',
		onHomepage: true,
		question: 'What are some of the popular packages offered by Malaga Event Gear?',
		answer: `Our most popular pre-designed packages include the ${packagesWithPrices('en')}, each with different equipment and features. Visit our Pricing page for the full breakdown of what each one includes.`
	},
	{
		id: 'language-hours',
		category: 'booking',
		onHomepage: false,
		onContact: true,
		question: 'In what language do they communicate with clients, and what are their operating hours?',
		answer: 'Malaga Event Gear (MEG) communicates with clients in English and Spanish. We are available 24 hours a day, 7 days a week for technical setups and live event monitoring.'
	},
	{
		id: 'contact-info',
		category: 'contact',
		onHomepage: false,
		onContact: true,
		question: 'How can customers contact Malaga Event Gear (MEG), and what information should they provide?',
		answer: 'You can reach us by phone at 666 346 911, via WhatsApp, or by email. To get an accurate quote, please share your event date, location, expected number of guests, and the type of equipment or package you are interested in. See our Contact Us page for more details.'
	},
	{
		id: 'delivery-setup',
		category: 'services',
		onHomepage: false,
		question: 'Do you offer delivery and setup for sound and lighting equipment?',
		answer: 'Yes. MEG provides full delivery, professional setup, and post event breakdown for all sound and lighting rentals. Our service includes transport, installation, cable concealment, sound/lighting checks, and optional on site technical assistance across Málaga, Marbella, Fuengirola, Torremolinos, Estepona, and surrounding regions.'
	},
	{
		id: 'vat-pricing',
		category: 'booking',
		onHomepage: false,
		question: 'Are your package prices inclusive of VAT?',
		answer: 'No, the listed prices do not include VAT. As indicated by (+{vat} VAT) next to the rates, the standard {vat} Spanish VAT (IVA) will be applied on top of the package price. Your final quote will show both the net price and the VAT breakdown with 100% transparency.'
	},
	{
		id: 'on-site-technician',
		category: 'services',
		onHomepage: false,
		question: 'Do you provide an on site technician during the event?',
		answer: 'Yes. Several packages (such as the Wedding Pack and the full MICE Pack) include a dedicated live technician who handles technical control and engineering support throughout your event. For packages where it is not included (for example the Basic MICE Pack), on site technical assistance can be added as an option from {price:technicianDay} per day.'
	},
	{
		id: 'equipment-brands',
		category: 'services',
		onHomepage: false,
		question: 'What equipment brands do you work with?',
		answer: 'We use premium professional brands trusted in the live event industry, including Audix and HK Audio for sound, Eurolite and ADJ for lighting, and Martin for smoke effects. This ensures reliable, high fidelity sound and lighting performance for every booking.'
	},
	{
		id: 'delivery-only',
		category: 'logistics',
		onHomepage: false,
		question: 'Do you offer a self pickup option, or is it delivery only?',
		answer: 'We operate under a delivery only model. There is no self pickup option. This guarantees that every system arrives professionally transported, installed, and calibrated by our team, so the equipment performs exactly as intended at your event.'
	},
	{
		id: 'streaming-recording',
		category: 'services',
		onHomepage: false,
		question: 'Do you offer live streaming and multi camera recording?',
		answer: 'No. We do not offer cameras, streaming encoders, multi camera video production, or a recording service. We supply the room sound, screen and lighting. For a hybrid or virtual event you bring your own laptop, streaming software and internet connection.'
	},
	{
		id: 'translation-voting',
		category: 'services',
		onHomepage: false,
		question: 'Do you provide simultaneous translation or interactive voting systems?',
		answer: 'Yes, for simultaneous translation and interactive voting systems, though not from our own equipment: we arrange both through a subcontracted partner for corporate and congress grade events. Let us know your requirements when requesting a quote. We do not offer an LED video wall. Our large format display is a single 60 inch flat panel.'
	},
	{
		id: 'large-scale-events',
		category: 'services',
		onHomepage: false,
		question: 'Can you handle large scale congresses, fairs, and exhibitions?',
		answer: 'Absolutely. Alongside weddings and corporate meetings, we equip larger scale events such as congresses, fairs, and exhibitions with tailored audiovisual solutions, combining sound reinforcement, large format screens, stages and dedicated technical staff as needed.'
	},
	{
		id: 'notice-time',
		category: 'booking',
		onHomepage: false,
		onContact: true,
		question: 'What is the minimum notice time to make a booking?',
		answer: 'All event gear rentals and technical services must be contracted with a minimum of 24 hours of advance notice to guarantee scheduling and logistical availability. For large or complex events, we recommend booking as early as possible to secure your date.'
	},
	{
		id: 'minimum-order-granada',
		category: 'logistics',
		onHomepage: false,
		onContact: true,
		question: 'Is there a minimum order for service outside the Costa del Sol?',
		answer: 'Within the Costa del Sol there is no special minimum. For more distant, out of province destinations such as Granada, we require a minimum rental value exceeding {price:outOfProvinceMinimum} to cover the single day logistical travel. Sevilla is also served. Contact us to confirm conditions for your specific location.'
	},
	{
		id: 'customize-package',
		category: 'booking',
		onHomepage: false,
		question: 'Can I customize or extend a package for my specific needs?',
		answer: 'Yes. Every package can be extended with extras such as projectors and screens, professional smoke machines, extra microphones, premium acrylic lecterns, modular stage platforms, and additional live technician hours. Tell us your requirements when requesting a quote and we will build the perfect configuration for your event.'
	}
];

// Validate all FAQ entries at runtime using Zod to ensure data integrity and full type safety
export const faqs: FaqItem[] = faqData.map((item) => {
	const result = FaqItemSchema.safeParse(item);
	if (!result.success) {
		console.error(`Invalid FAQ configuration for ID: ${item.id}`, result.error.format());
		throw new Error(`Invalid FAQ configuration: ${result.error.message}`);
	}
	return result.data;
});

// FAQs surfaced in the homepage teaser section (highest-value, conversion-oriented)
export const getHomepageFaqs = (): FaqItem[] => faqs.filter((item) => item.onHomepage);

// FAQs surfaced on the /contact page (inquiry & quote-oriented)
export const getContactFaqs = (): FaqItem[] => faqs.filter((item) => item.onContact === true);

// FAQs filtered by thematic category (used by the /faq page filter)
export const getFaqsByCategory = (category: FaqCategory): FaqItem[] =>
	faqs.filter((item) => item.category === category);

// Build a Schema.org FAQPage JSON-LD object from question/answer pairs ALREADY in the page's
// language (pass `items.map(faqCopy)` from `$lib/i18n/data-copy.svelte`). Generated from the
// same copy as the rendered content so the structured data can never drift out of sync.
export const buildFaqSchema = (items: { question: string; answer: string }[]): FaqPageSchema => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: items.map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer
		}
	}))
});
