/**
 * English UI dictionary: the base locale and the shape every other locale must match.
 * Page specific copy lives next to its page, not here.
 */
const en = {
	// Navigation
	nav: {
		equipment: 'Equipment',
		packages: 'Packages',
		blog: 'Blog',
		contact: 'Contact',
		bookNow: 'Book Now',
		blogInEnglish: 'Blog (in English)',
		language: 'Language',
		breadcrumbs: 'Breadcrumbs',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Toggle color theme',
		openMenu: 'Open navigation menu'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		// Shown on pages in a language MEG does not answer in (every locale but en and es)
		serviceLanguages: 'We reply in English or Spanish.',
		// Top of every translated legal page
		legalTranslation: 'This is a translation. If it differs from the English version, the English version prevails.',
		readEnglish: 'Read the English version'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Home',
		packages: 'Packages',
		blog: 'Blog',
		categories: 'Categories',
		category: 'Category',
		author: 'Author',
		contact: 'Contact',
		'about-us': 'About Us',
		faq: 'FAQ',
		'privacy-policy': 'Privacy Policy',
		'terms-of-service': 'Terms of Service',
		'cookie-policy': 'Cookie Policy',
		gdpr: 'GDPR',
		'meet-the-team': 'Meet the Team',
		equipment: 'Equipment',
		sitemap: 'Sitemap',
		'thank-you': 'Thank You'
	},
	// Hero
	hero: {
		span: 'For All Types of Events',
		// The three parts join into the <h1>, which mirrors the GBP primary category
		// (siteConfig.categories[0]) exactly. Guarded by home-h1-gbp-category.test.ts.
		titlePart1: 'Audio Visual',
		titleGradient: 'Equipment Hire Service',
		titlePart2: 'in Malaga',
		subtitle: 'Experience crystal clear sound and stunning lighting with our premium equipment. Perfect for weddings, corporate events, and exclusive parties on the Costa del Sol.',
		viewPricing: 'View Pricing',
		contactUs: 'Contact Us'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Flawless Setup',
		card1Text: 'Dedicated technical support to ensure your event runs smoothly from start to finish without any worries.',
		card2Title: '#2 Tailored Packages',
		card2Text: 'Flexible rental packages designed to perfectly fit any event size, venue, and budget.',
		card3Title: '#3 Cutting Edge Tech',
		card3Text: 'Enjoy state of the art audiovisual gear that elevates the visual and sound quality of your production.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'At a Glance',
		sellQ: 'What do we sell?',
		sellA: 'We rent premium audiovisual equipment (professional sound systems, stage lighting, projectors and screens) for events across Malaga and the Costa del Sol, including delivery, setup and on site technical support.',
		whoQ: 'Who is it for?',
		whoA: 'Couples planning weddings, companies running conferences and corporate events, and anyone hosting a party or private celebration who wants flawless sound and lighting without buying the gear.',
		costQ: 'What does it cost?',
		costA: 'fixed price packages with no hidden fees, scaled to your event size, plus tailored quotes for larger productions.',
		costFrom: 'From',
		howQ: 'How does it work?',
		howA: 'Four simple steps: pick your package, request a quote, we confirm and prepare your gear, and our team delivers and sets everything up on the day of your event.'
	},
	// Impact
	impact: {
		title: 'Our Impact in Numbers',
		years: 'Years of Experience',
		clients: 'Happy Clients',
		satisfaction: 'Satisfaction Rate'
	},
	// Categories
	categories: {
		badge: 'Premium Gear',
		title: 'Available Categories',
		soundTitle: 'Sound Systems',
		soundText: 'Crystal clear high fidelity sound, ideal for intimate weddings or large corporate conferences. We work with leading brands to ensure the highest acoustic fidelity.',
		lightTitle: 'Lighting',
		lightText: 'Dynamic lighting solutions to create the perfect atmosphere in your venue space.',
		visualTitle: 'Projectors & Screens',
		visualText: 'Sharp, high definition visuals for presentations with high visual impact.',
		fxTitle: 'Special Effects & Fog Machines',
		fxText: 'Create a stunning atmosphere at your event with our professional grade special effects and fog machines.',
		bookEquipment: 'Book Packages'
	},
	// Pricing
	pricing: {
		badge: 'Transparent Pricing',
		title: 'Tailored Packages for Every Event',
		subtitle: 'Choose from our flexible rental packages designed to perfectly fit any event size and budget. We make planning simple!',
		includes: 'Includes:',
		includedServices: 'Included Services:',
		optional: 'Optional:',
		check: 'Check Availability',
		mostPopular: 'Most Popular',
		from: 'From',
		plusVat: '(+21% VAT)',
		plusVatShort: '(+VAT)',
		bookPack: 'Book'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filters',
		clearAll: 'Clear all',
		resetFilters: 'Reset Filters',
		showingResults: 'Showing {visible} of {total} packages',
		noResults: 'No packages match your filters. Try clearing some selections!',
		openFilters: 'Filters',
		done: 'Show results',
		purpose: 'Event Type',
		capacity: 'Event Scale',
		price: 'Budget',
		equipment: 'Equipment Included',
		extras: 'Optional Extras',
		sortBy: 'Sort By',
		party: 'Parties',
		wedding: 'Weddings',
		corporate: 'Corporate',
		presentation: 'Presentations',
		meeting: 'Meetings',
		small: 'Small (up to 50 guests)',
		medium: 'Medium (51 to 80 guests)',
		large: 'Large (80+ guests)',
		priceLow: 'Up to {price:budgetLow}',
		priceMid: '{price:budgetLow} to {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} and up',
		transport: 'Transport & Setup',
		screen: 'Screen / Display',
		sound: 'Sound System',
		microphone: 'Microphones',
		lighting: 'Ambient Lighting',
		technician: 'Live Technician',
		projector: 'Projector',
		smokeMachine: 'Smoke Machine',
		technicalAssistant: 'Technical Assistant',
		lectern: 'Lectern',
		staging: 'Staging',
		recommended: 'Recommended',
		priceAsc: 'Price: Low to High',
		priceDesc: 'Price: High to Low'
	},
	// Contact
	contact: {
		badge: 'Immediate Response 24/7',
		title: 'Get in Touch',
		subtitle: 'Ready to elevate your event? Contact our technical team to receive tailored quotes, check equipment availability, and get expert advice.',
		detailsTitle: 'Contact Details',
		phone: 'Phone',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Location',
		hours: 'Operating Hours',
		hoursText: 'Technical support and logistics 24 hours, 7 days a week.',
		reqTitle: 'Request a Quote',
		formName: 'Full Name *',
		formEmail: 'Email Address *',
		formPhone: 'Contact Phone',
		formDate: 'Event Date',
		formType: 'Event Type',
		formTypeWedding: 'Wedding / Celebration',
		formTypeCorporate: 'Corporate Event',
		formTypeParty: 'Private Party',
		formTypeMice: 'Conference / MICE',
		formTypeOther: 'Other type of event',
		formMessage: 'Event Details & Technical Requirements *',
		formSubmit: 'Send Request',
		formSubmitting: 'Sending...',
		formRequiredError: 'Please fill out all required fields.',
		formErrorSubmit: 'Something went wrong sending your request. Please try again or email us directly.',
		formErrorTurnstile: 'Security verification failed. Please try again.',
		formErrorRateLimited: 'Too many requests. Please wait a few minutes and try again.',
		lockedFieldNote: "Automatically generated from an error. This field can't be edited.",
		errorPrefillMessage:
			'Hi, I submitted a package request on your website but the confirmation email failed to send. Could you please confirm you received my enquiry? Reference: {ref}',
		errorDetailsHeader: 'Submitted details:',
		errorDetailSource: 'Form URL',
		errorDetailName: 'Name',
		errorDetailEmail: 'Email',
		errorDetailPhone: 'Phone',
		errorDetailDate: 'Event date',
		errorDetailPackage: 'Package',
		errorDetailComments: 'Comments',
		successTitle: 'Quote Requested!',
		successText1: 'Hi',
		successText2: 'we received your request successfully. Our technical team in Malaga will evaluate it and contact you by email (',
		successText3: ') as soon as possible.',
		successButton: 'Send another request',
		faqTitle: 'Frequently Asked Questions'
	},
	// Packages Showcase.
	// Solo copy genérico: nombres, precios, descripciones y features de cada pack
	// se derivan de packages.ts (CLAUDE.md §7). Este bloque llegó a tener
	// `ecoPrice: '€290'`, `weddingTitle`, `ecoF1`… duplicados en EN y ES; nadie los
	// consumía y ya divergían del catálogo (p. ej. no existían las claves de los
	// packs Product Presentation y Basic MICE).
	packages: {
		badge: 'Featured Packages',
		title: 'Choose Your Perfect Pack',
		subtitle: 'Tailored for every occasion. All packages include transport, setup, and on site technical support.',
		enquire: 'Get a Quote'
	},
	// How It Works
	process: {
		badge: 'How It Works',
		title: 'Your Event in 4 Simple Steps',
		s1Title: 'Select Your Pack',
		s1Desc: 'Browse our packages and pick the one that fits your event size and style.',
		s2Title: 'Request a Quote',
		s2Desc: 'Fill out our quick form. We respond as soon as possible with full availability.',
		s3Title: 'Confirm & Plan',
		s3Desc: 'Our team confirms logistics, venue access, and every technical detail.',
		s4Title: 'Enjoy Your Event',
		s4Desc: 'We handle setup, run the show, and pack everything up. Zero stress for you.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Transparent Pricing',
		title: 'Simple, All Inclusive Pricing',
		subtitle: 'No hidden fees. Transport, setup, and technical support always included.',
		viewAll: 'View All Packages'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Common Questions'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Client Reviews',
		title: 'Real Stories from Real Events',
		subtitle: 'Verified Google reviews from clients across the Costa del Sol.',
		ratingLabel: 'EXCELLENT',
		basedOn: 'Based on {n} reviews',
		poweredBy: 'Showing our latest reviews',
		readMore: 'Read more',
		readLess: 'Read less',
		seeAll: 'See all reviews',
		prevAria: 'Previous review',
		nextAria: 'Next review',
		outOfFiveStars: 'out of 5 stars'
	},
	// Lead capture form
	leadForm: {
		title: 'Secure Your Event Date',
		subtitle: "Fill in the form and we'll get back to you as soon as possible.",
		nameLabelInput: 'Full Name *',
		emailLabelInput: 'Email Address *',
		phoneLabelInput: 'Phone / WhatsApp *',
		eventDateLabel: 'Event Date *',
		commentsLabel: 'Questions or Comments',
		commentsPlaceholder: 'Tell us about your event: venue, number of guests, special requirements...',
		submitBtn: 'Check Date Availability',
		submitting: 'Sending...',
		errorRequired: 'This field is required.',
		errorEmail: 'Please enter a valid email address.',
		errorPhone: 'Please enter a valid phone number.',
		errorDateFuture: 'The event date must be in the future.',
		errorMinLength: 'Must be at least 2 characters.',
		errorMaxLength: 'Maximum 1000 characters allowed.',
		errorHoneypot: 'Spam detected.',
		noCardRequired: 'No credit card required to check availability',
		quickResponseNote: 'Response as soon as possible',
		errorSubmit: 'Something went wrong. Please try again or contact us directly.',
		errorTurnstile: 'Security verification failed. Please try again.',
		errorRateLimited: 'Too many requests. Please wait a few minutes and try again.',
		emailFailTitle: "We couldn't send your confirmation",
		emailFailBody: 'Your request was saved, but our email system failed to send it. Please contact our team directly so we don\'t lose your enquiry.',
		emailFailAction: 'Contact the team',
		emailFailDismiss: 'Close',
		countryCode: 'Country Code',
		responseTime: 'We respond as soon as possible',
		trustBadge: 'Trusted by 500+ events in Málaga'
	},
	// Thank-you page
	thankYou: {
		headline: 'Thank you! Your request is on its way.',
		subheadline: "We've received your enquiry and will get back to you as soon as possible.",
		responseTime: 'Expected response: as soon as possible',
		backToPackages: 'Browse all packages',
		whatsappCta: 'Or reach us now on WhatsApp',
		leadLabel: 'Reference'
	},
	// Gallery
	gallery: {
		titleHome: 'Our Events in Action',
		titlePackage: 'Past {pack} Events'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Location & Google Profile',
		title: 'Find Us on Google',
		subtitle: 'Visit our official Google Business Profile or view our location in Malaga.',
		viewOnGoogle: 'View on Google Maps',
		mapTitle: 'Malaga Event Gear - Google Business Profile'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Premium sound, lighting, and screen rentals for exclusive events in Malaga and the Costa del Sol. State of the art equipment and tailored technical support.',
		usefulLinks: 'Useful Links',
		home: 'Home',
		packages: 'Packages',
		blog: 'Blog',
		news: 'News',
		categories: 'Categories',
		aboutUs: 'About Us',
		meetTheTeam: 'Meet The Team',
		contactUs: 'Contact Us',
		termsOfService: 'Terms of Service',
		privacyPolicy: 'Privacy Policy',
		cookiePolicy: 'Cookie Policy',
		gdpr: 'GDPR',
		faq: 'FAQ',
		sitemap: 'Sitemap',
		servicePackages: 'Service Packages',
		localAddress: 'Local Address',
		listings: 'Listings',
		onlinePresence: 'Online Presence',
		moreInformation: 'More Information',
		moreInfoText: 'Need more details? Contact us for info on our event gear rentals, pricing, and availability.',
		tel: 'Tel',
		clickToChat: 'Click To Chat',
		emails: 'Emails',
		forHire: 'For hire',
		forContact: 'For contact',
		forLegal: 'For legal',
		allRightsReserved: 'All rights reserved.',
		developedBy: 'Developed by',
		lorenzozTitle: 'Lorenzoz Agency: web development agency and business solutions',
		mailAriaLabel: 'Send email',
		callAriaLabel: 'Call Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'News',
		byAuthor: 'By',
		updated: 'Updated',
		shareInlineLabel: 'Share This:',
		shareSidebarLabel: 'SHARE THIS',
		shareDrawerTitle: 'Share this post',
		copiedShort: 'Copied!',
		copiedExclaim: 'Copied!',
		copyShort: 'Copy link',
		copyLink: 'Copy link',
		shareOnAria: 'Share on {network}',
		copyLinkAria: 'Copy link to clipboard',
		openSharingAria: 'Open sharing options',
		closeSharingAria: 'Close sharing options',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweet this selection',
		packagesSidebarAria: 'Event packages sidebar',
		tocSidebarAria: 'Table of contents sidebar'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chat with us'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Page not found',
		genericHeading: 'Something went wrong',
		notFoundBody: "The page you're looking for doesn't exist or moved. Try from the homepage or get in touch.",
		genericBody: 'We hit a problem processing your request. Head back home or contact us and we will sort it out.',
		contactUs: 'Contact us',
		backHome: 'Back home'
	}
};

export default en;

/** The dictionary shape. Every other locale must match it exactly (`satisfies Messages`). */
export type Messages = typeof en;
