// English copy of /equipment/ (source). Most of the page already uses the global dictionary
// (`i18n.t.categories.*`) for the bento grid headings shared with the home page and the bottom
// banner. This file carries what was hardcoded as English literals or
// `i18n.lang === 'en' ? ... : ...` ternaries in +page.svelte.
//
// Equipment claims match .agents/context/Equipamiento.csv: projectors of up to 5,000 lumens (none
// laser), fabric projection screens plus one 60 inch panel, one Martin Magnum 650 smoke machine.
const copy = {
    seo: {
        title: 'Premium Audiovisual Equipment Rental Catalog | MEG',
        description:
            'Explore our high quality inventory of professional sound systems, dynamic lighting, high definition projectors, and a smoke machine. Premium equipment in Malaga.'
    },
    schema: {
        listName: 'Audiovisual Equipment Rental Catalog - Malaga Event Gear'
    },
    hero: {
        badge: 'Cutting Edge Tech',
        titlePart1: 'Elevate your Event with',
        titlePart2: 'Premium Equipment',
        subtitle:
            'Explore our catalog of high fidelity sound, spectacular lighting, and a smoke machine for atmosphere. We have the perfect tools to make your celebration unforgettable.'
    },
    featured: {
        imageAlt: 'MICE Audiovisual Pack Setup for Meetings',
        badge: 'Featured Pack',
        desc: 'Ideal for conferences and corporate events. The MICE Pack includes a 60 inch LED screen, premium audiovisual gear, tabletop and wireless microphones, and up to 6 hours of on site technical support to ensure your presentation runs flawlessly.',
        spec1: '60" LED Screen',
        spec2: 'Wireless Audio',
        spec3: 'Technical Support Included',
        spec4: 'Premium Sound',
        cta: 'Request Info'
    },
    catalog: {
        title: 'Technical Categories',
        subtitle: 'Browse through our inventory to meet the technical needs of your production.'
    },
    audio: {
        imageAlt: 'Professional sound rental equipment',
        desc: 'HK Audio active and passive speakers with subwoofers, digital mixing consoles and Audix wireless microphones for high acoustic fidelity.'
    },
    lighting: {
        imageAlt: 'Spectacular event lighting rental equipment',
        desc: 'LED light bars, a zoom Fresnel spotlight and a wireless uplighting kit to create romantic or energetic atmospheres.'
    },
    visuals: {
        imageAlt: 'HD projectors and screen rental equipment',
        desc: 'Projectors of up to 5,000 lumens, projection screens and a 60 inch display panel to give your audience a sharp visual experience.'
    },
    effects: {
        imageAlt: 'Professional smoke machine for events',
        title: 'Special Effects',
        desc: 'A professional Martin Magnum 650 smoke machine that adds atmosphere and makes the lighting beams visible on the dance floor.'
    }
};

export default copy;
export type Copy = typeof copy;
