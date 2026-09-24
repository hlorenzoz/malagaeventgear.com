// English copy of /about-us/ (source). Equipment claims match .agents/context/Equipamiento.csv:
// no laser projectors, no moving heads, no hazers or low fog, and the only Sennheiser is a
// shotgun mic, so none of them is claimed here.
const copy = {
	seo: {
		title: 'About Us - Malaga Event Gear (MEG)',
		description:
			'Meet the experts at Malaga Event Gear! We are dedicated to making your weddings, corporate events, and parties unforgettable with top-tier gear.'
	},
	hero: {
		badge: 'Who We Are',
		title: 'About Us',
		intro:
			'Welcome to Malaga Event Gear (MEG), your go-to source for high-quality audio visual equipment rentals in Malaga, Spain. We specialize in providing top-notch gear for events of all sizes.'
	},
	story: {
		title: 'Our Mission & History',
		p1: 'Malaga Event Gear has been active in the audiovisual industry since 1996 and operating as independent freelancers since 2010. Over nearly three decades, we have developed a passion for flawless events and crystal-clear acoustics.',
		p2: 'We operate under a delivery-only model with direct setups, meaning we do not maintain a physical storefront. Instead, we bring our premium systems, cabling, and support directly to your villa, hotel, or venue across Malaga and the Costa del Sol.'
	},
	stats: {
		experienceTitle: 'Years of Experience',
		experienceBody: 'In professional AV industry',
		clientsTitle: 'Happy Clients',
		clientsBody: 'Across the Costa del Sol'
	},
	offer: {
		title: 'What We Offer',
		intro:
			'We provide a wide range of rental services tailored to meet the needs of various events, including weddings, corporate events, private parties, and MICE conferences.',
		sound: {
			title: 'Sound Systems',
			body: 'From small speaker setups for private parties to high-fidelity active acoustic PA systems for large venues.'
		},
		lighting: {
			title: 'Lighting',
			body: 'LED light bars with RGBW spotlights, a zoom Fresnel spotlight and a wireless battery uplighting kit to create the perfect ambiance.'
		},
		screens: {
			title: 'Screens and Projectors',
			body: 'Projectors of up to 5,000 lumens and projection screens, ideal for presentations, conferences, and outdoor cinema events.'
		},
		microphones: {
			title: 'Microphones',
			body: 'Professional Audix wired and wireless handheld microphones, plus wireless lavalier and headset sets.'
		},
		technicians: {
			title: 'Event Technicians',
			body: 'Experienced sound and lighting technicians available to oversee your setup, operation, and live monitoring.'
		},
		effects: {
			title: 'Special Effects',
			body: 'A professional Martin Magnum 650 smoke machine to add atmosphere to the dance floor and the stage.'
		}
	},
	cta: {
		title: 'Ready to Elevate Your Next Event?',
		body: 'Explore our pre-configured packages or request a completely custom quote from our technical team.',
		packages: 'View Pricing Packages',
		contact: 'Contact Us Directly'
	}
};

export default copy;
export type Copy = typeof copy;
