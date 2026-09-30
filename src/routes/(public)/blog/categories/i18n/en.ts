// English copy of /blog/categories/ (source).
const copy = {
	seo: {
		title: 'Blog Categories | Malaga Event Gear',
		description:
			'Browse all Malaga Event Gear blog categories: weddings, audio visual rental, corporate events, gadgets and news.'
	},
	// JSON-LD names. Previously hardcoded in English regardless of locale; moved here so a
	// later locale can localize them without another hunt through the markup.
	intro:
		'The Malaga Event Gear blog groups its guides by topic: events, weddings, audio visual rental, corporate and enterprise, event planning, gadgets and news. Choose a category to see all of its posts.',
	descriptions: {
		events:
			'Guides to planning and running events in Malaga, Spain, from private parties to conferences, and the equipment behind them.',
		'audio-visual-rental':
			'How audio visual rental works, what to check before you book and how to match sound, screens and lighting to your event.',
		weddings:
			'Sound, lighting and equipment ideas for weddings in Malaga, Spain, with tips on choosing and planning your rental.',
		news: 'Updates from Malaga Event Gear: the events we have supplied equipment for and company announcements.',
		'corporate-enterprise':
			'Audio visual guides for corporate events, meetings and conferences, from microphones and screens to technician support.',
		gadgets:
			'Notes and lessons from renting sound, screens and lighting for events in Malaga, Spain.'
	},
	schemaName: 'Blog Categories | Malaga Event Gear',
	itemListLabel: 'Blog Categories',
	backLink: 'All Posts',
	heading: 'Categories',
	categoriesLabel: 'categories',
	allPosts: 'All Posts',
	post: { singular: 'post', plural: 'posts' }
};

export default copy;
export type Copy = typeof copy;
