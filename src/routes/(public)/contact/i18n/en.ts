// English copy of /contact/ (source). The page already uses the global dictionary
// (`i18n.t.contact.*`) for most labels. This file only carries what was hardcoded as English
// literals or `i18n.lang === 'en' ? ... : ...` ternaries in +page.svelte: the SEO fields, the
// ContactPage JSON-LD name/description, the WhatsApp link text, the two prefilled-message
// templates (pack/category query params), the past-date validation error, and the form
// placeholders.
const copy = {
    seo: {
        title: 'Contact Us & Audiovisual Quotes | MEG',
        description:
            'Get in touch with Malaga Event Gear to request quotes for sound, lighting, and screen rentals. 24/7 technical support.'
    },
    schema: {
        name: 'Contact Us - Malaga Event Gear',
        description:
            'Contact the technical team at Malaga Event Gear to request custom quotes for sound, lighting, and screen rentals.'
    },
    whatsappLinkText: 'Send us a message',
    messages: {
        // {pack} / {category} are replaced with the uppercased query-param value.
        packIntro: 'Hi, I am interested in booking the Pack: {pack}. Please let me know the availability and details.',
        categoryIntro:
            'Hi, I am interested in booking equipment from the category: {category}. I look forward to your quote.'
    },
    errors: {
        pastDate: 'Please choose an event date after today.'
    },
    form: {
        namePlaceholder: 'Full Name',
        emailPlaceholder: 'Email Address',
        phonePlaceholder: 'Phone',
        messagePlaceholder: 'Message'
    }
};

export default copy;
export type Copy = typeof copy;
