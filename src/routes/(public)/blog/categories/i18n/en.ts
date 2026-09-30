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
