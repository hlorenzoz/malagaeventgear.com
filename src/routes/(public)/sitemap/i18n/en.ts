// English copy of /sitemap/ (source).
//
// The page used to render an English AND a Spanish section side by side on the same URL.
// Google requires one language per page, so it now renders a single section in the page
// language (CLAUDE.md, SEO section): the hero intro below reflects that ("bilingual...in
// both English and Spanish" no longer applies once the duplicate block is gone).
const copy = {
	seo: {
		title: 'Sitemap - Malaga Event Gear (MEG)',
		description:
			'Explore the sitemap for Malaga Event Gear. Find links to all our professional audiovisual and lighting rental services, packages, and contact information.'
	},
	hero: {
		badge: 'Website Directory',
		title: 'Sitemap',
		intro:
			'Explore our complete directory of static pages, specialized event packages, and blog content.'
	},
	portals: {
		heading: 'Primary Portals',
		home: 'Home Page',
		pricing: 'Pricing & Packages',
		equipment: 'Equipment Catalog',
		contact: 'Book Now / Contact'
	},
	packages: {
		heading: 'Event Packs'
	},
	legal: {
		heading: 'Information & Legal',
		about: 'About Our Agency',
		team: 'Our Expert Team',
		faq: 'Frequently Asked Questions',
		terms: 'Terms of Service',
		privacy: 'Privacy Policy',
		cookies: 'Cookie Policy',
		gdpr: 'GDPR Compliance'
	},
	blog: {
		heading: 'Blog',
		categoriesHeading: 'Categories',
		allPosts: 'All Posts',
		authorsHeading: 'Authors',
		recentHeading: 'Recent Posts',
		viewAll: 'View all posts →'
	}
};

export default copy;
export type Copy = typeof copy;
