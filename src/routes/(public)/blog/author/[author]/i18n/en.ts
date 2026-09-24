// English copy of /blog/author/[author]/ (source).
// The author display name comes from the author data itself; only the surrounding
// chrome is translated here.
const copy = {
	backLink: 'All Posts',
	headingPrefix: 'Posts by',
	// {name} is replaced with the author display name in the page.
	titleTemplate: 'Posts by {name} | Blog | Malaga Event Gear',
	descriptionTemplate: 'All blog posts by {name} at Malaga Event Gear.',
	newsBadge: 'News',
	readMore: 'Read More →',
	post: { singular: 'post', plural: 'posts' }
};

export default copy;
export type Copy = typeof copy;
