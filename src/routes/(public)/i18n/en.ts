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
	// Top Group Express (TGE), partner for group hotel bookings. An independent company: this
	// copy and its translations state no year, hotel count, minimum rooms or quote time.
	partner: {
		badge: 'Our partner for group hotel bookings',
		title: 'Hotel rooms for your group, with Top Group Express',
		body: 'An event that brings people to Malaga also needs rooms for them. Lodging is not our service: we supply the audio visual equipment. For the rooms we work with our partner Top Group Express, a booking hub for group hotel stays with years of experience, built for the professionals who organize the trip.',
		points: [
			'One request brings quotes from several hotels',
			'Confirm, pay and invoice in the same place',
			'For travel agencies, DMCs and tour operators'
		],
		note: 'Top Group Express is an independent company. Its service is for travel professionals.',
		cta: 'Visit Top Group Express',
		imageAlt:
			'The Top Group Express web app on a laptop screen, showing group hotel quotes and pending payments.'
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
