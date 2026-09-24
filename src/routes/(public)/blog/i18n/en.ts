// English copy of /blog/ (source).
const copy = {
	seo: {
		title: 'Expert Audiovisual & Events Blog | Malaga Event Gear',
		description:
			'Read expert insights on high fidelity sound, romantic wedding lighting, conference projector setups, and professional event gear in Malaga.'
	},
	schema: {
		name: 'Audiovisual & Events Blog | MEG',
		description:
			'Expert technical guides, audiovisual rental advice, and wedding planning insights for Malaga and Costa del Sol.'
	},
	hero: {
		badge: 'Knowledge & Inspiration',
		titlePrefix: 'The Malaga Event Gear',
		titleHighlight: 'Technical Blog',
		intro:
			'We share professional insights, acoustic blueprints, and visual layout guides to make your corporate summit, wedding, or celebration on the Costa del Sol technically flawless.'
	},
	empty: 'No posts yet. Check back soon!',
	newsBadge: 'News',
	readMore: 'Read More →',
	// Decorative thematic clusters covered by the blog. Order matches the icon list in
	// +page.svelte (favorite, business, speaker, highlight, videocam, celebration).
	clustersHeading: 'Core Clusters We Cover',
	clusters: ['Weddings', 'Corporate AV', 'Sound Acoustics', 'Scenic Lights', 'Projection', 'Private Parties'],
	cta: {
		advice: 'Get Technical Advice',
		packages: 'Explore Packages'
	}
};

export default copy;
export type Copy = typeof copy;
