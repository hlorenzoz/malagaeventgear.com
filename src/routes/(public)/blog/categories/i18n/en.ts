// English copy of /blog/categories/ (source).
const copy = {
	seo: {
		title: 'Blog Categories | Malaga Event Gear',
		description:
			'Browse all Malaga Event Gear blog categories: weddings, audio visual rental, corporate events, gadgets and news.'
	},
	// JSON-LD names. Previously hardcoded in English regardless of locale; moved here so a
	// later locale can localize them without another hunt through the markup.
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
