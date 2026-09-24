// English copy of /packages/ (source). The filter sidebar, package cards, and gallery already
// read from the global dictionary (`i18n.t.filters.*`, `i18n.t.pricing.*`, `i18n.t.gallery.*`)
// or from pkgCopy/faqCopy. This file only carries what was hardcoded as English literals or
// `i18n.lang === 'en' ? ... : ...` ternaries in +page.svelte: the SEO fields, the mobile
// drawer's close-button aria-label, and the standalone "pricing FAQ" accordion at the bottom
// of the page (the VAT question is separate from the centralized FAQ store on purpose - see
// faqSchema in +page.svelte, which only pulls the 'vat-pricing' entry for JSON-LD).
const copy = {
    seo: {
        title: 'Rates & Tailored Rental Packages | MEG',
        description:
            'Discover our transparent rates and tailored sound, lighting, and screen rental packages in Malaga. Perfect options for weddings, corporate events, and parties.'
    },
    closeFiltersAria: 'Close filters',
    faqSection: {
        badge: 'Pricing FAQ',
        title: 'Frequently Asked Questions',
        question: 'Are your package prices inclusive of VAT?',
        answer:
            'No, the listed prices do not include VAT. As indicated by (+{vat} VAT) next to the rates, the standard {vat} Spanish VAT (IVA) will be applied on top of the package price. Your final quote will show both the net price and the VAT breakdown with 100% transparency.'
    }
};

export default copy;
export type Copy = typeof copy;
