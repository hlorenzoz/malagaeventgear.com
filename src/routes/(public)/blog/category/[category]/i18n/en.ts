// English copy of /blog/category/[category]/ (source).
// The category display name comes from the category data itself (English for now, see
// AGENTS.md "Blog chrome"); only the surrounding chrome is translated here.
const copy = {
	backLink: 'All Posts',
	// {name} is replaced with the category display name in the page.
	titleTemplate: '{name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'Read all posts about {name} from the Malaga Event Gear blog.',
	newsBadge: 'News',
	readMore: 'Read More →',
	// Short introduction per category (English slug). Only the thin listing pages have one.
	intros: {
		gadgets:
			'Notes and lessons from renting sound, screens and lighting for events in Malaga, Spain.'
	},
	post: { singular: 'post', plural: 'posts' }
};

export default copy;
export type Copy = typeof copy;
