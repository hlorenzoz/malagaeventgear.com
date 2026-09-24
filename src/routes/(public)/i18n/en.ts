// English copy of the home page (source). Most of the page already reads from the global
// dictionary (`i18n.t.*`, see $lib/i18n/messages/en.ts) and is left untouched here: this file
// only carries the strings that were hardcoded English/Spanish literals in +page.svelte: the
// SEO fields, decorative image alt text, and the six `i18n.lang === 'en' ? ... : ...` ternaries.
const copy = {
    seo: {
        title: 'Audio Visual Equipment Hire Service in Malaga | MEG',
        description:
            'Malaga Event Gear (MEG) offers premium sound system, spectacular lighting, projector, and screen rentals for weddings, corporate events, and parties in Malaga.'
    },
    hero: {
        imageAlt: 'Premium event stage with professional audiovisual lighting on the Costa del Sol'
    },
    categories: {
        soundImageAlt: 'Professional sound system rental',
        lightImageAlt: 'Spectacular event lighting rental',
        visualImageAlt: 'HD event visuals and projectors rental'
    },
    faqSection: {
        moreQuestions: 'Have more questions?',
        seeAllFaqs: 'See all FAQs'
    },
    posts: {
        latestTitle: 'Latest Posts',
        latestViewAll: 'View all posts',
        newsTitle: 'Latest News',
        newsViewAll: 'View all news'
    }
};

export default copy;
export type Copy = typeof copy;
