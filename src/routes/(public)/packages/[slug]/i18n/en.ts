// English copy of /packages/[slug]/ (source). Shared by all 5 package landing pages - the
// package-specific content (name, price, includes, highlight, CTA copy) already comes from
// pkgCopy(pkg) via the centralized data-copy layer (CLAUDE.md §7). This file only carries what
// was hardcoded as English literals or `i18n.lang === 'en' ? ... : ...` ternaries in
// +page.svelte: the hero benefits bullets, the four objection-handling FAQs, the "Most Popular"
// pill, the items-included suffix, the FAQ section heading, and the sticky bar's aria-label.
//
// Two of the FAQ answers name OTHER specific packages as examples ("like the Wedding Pack and
// MICE Pack"). Per CLAUDE.md §7 ("Prohibido duplicar datos") those names are never hardcoded
// here - `{wedding}` / `{mice}` are filled in +page.svelte from getPackageBySlug(...).name.
const copy = {
    benefits: {
        delivery: 'Free setup & delivery (Malaga & Costa del Sol)',
        brands: 'Premium brands (HK Audio, Audix, Midas)',
        support: 'On-site technical support available'
    },
    faqs: {
        delivery: {
            q: 'Is delivery and setup included in the package price?',
            a: "Yes, for premium packages (like the {wedding} and {mice}), full professional delivery, cabling setup, and teardown in Malaga and its direct suburbs are included. For standard packages, a small logistical fee may apply depending on your event's exact location."
        },
        areas: {
            q: 'What areas do you cover in Andalusia?',
            a: 'We serve Malaga capital, Marbella, and the entire Costa del Sol daily. We also service Seville and Granada (for orders over 400€). We currently do not offer pickup options since we operate on a delivery-only model.'
        },
        rain: {
            q: 'What happens if it rains for an outdoor event?',
            a: 'If your event is outdoors, we require a covered area (tents, pergolas) to protect the electrical equipment. In case of rain without cover, we will work with you to relocate the gear indoors. Safety of guests and protection of high-voltage gear is our top priority.'
        },
        technician: {
            q: 'What happens if I need a technician during my event?',
            a: 'Our premium packages (like the {wedding} and {mice}) already include on-site technical monitoring. For other packages, you can request a dedicated sound/light engineer to stay at your venue for a stress-free experience.'
        }
    },
    popularBadge: 'Most Popular',
    itemsIncludedSuffix: 'items included',
    faqSectionTitle: 'Frequently Asked Questions',
    stickyBarAriaLabel: 'Sticky call to action'
};

export default copy;
export type Copy = typeof copy;
