// English copy of /terms-of-service/ (source).
const copy = {
	seo: {
		title: 'Terms of Service - Malaga Event Gear (MEG)',
		description:
			'Read the official Terms of Service for Malaga Event Gear rentals. Understand our policies on booking, payments, and secure service.'
	},
	hero: {
		badge: 'Legal Framework',
		title: 'Terms of Service',
		effectiveDate: 'Effective Date: October 16, 2025'
	},
	intro: {
		title: 'Introduction and Acceptance of Terms',
		body: 'By accessing or using the services provided by Malaga Event Gear (MEG), you agree to be bound by these Terms of Service. Malaga Event Gear provides professional sound, lighting, and event equipment rentals for various occasions including weddings, private parties, corporate events, meetings, and MICE conferences.'
	},
	scope: {
		title: 'Scope of Service & Offerings',
		p1: 'We specialize in offering high fidelity active acoustic PA systems, professional lighting solutions (LED light bars, a zoom Fresnel spotlight and a wireless uplighting kit), high lumen projection units, microphones (wired, wireless, gooseneck), fog machines, and stage platforms.',
		p2: 'Many of our packages, such as the Wedding Pack and MICE Pack, include transport, professional installation, on site live technical support, and post event breakdown for a completely stress free experience.'
	},
	limits: {
		title: 'Geographical & Operational Limits',
		p1: 'Our services are primarily concentrated in Malaga province and the Costa del Sol (including Malaga capital, Marbella, Fuengirola, Torremolinos, Estepona, Sevilla, and adjacent areas). Service to Granada is available only for packages exceeding {price:outOfProvinceMinimum} due to out of province single day travel overhead.',
		p2: 'Malaga Event Gear operates 7 days a week, from 8:00 AM to 8:00 PM for commercial inquiries, and 24/7 for technical logistics and setup support.',
		p3: 'To guarantee absolute technical accuracy for our international audience, all communication, documentation, and interface bookings are conducted in English or Spanish.'
	},
	booking: {
		title: 'Booking, Pricing & Security',
		p1: "All service provisions must be contracted with a minimum of 24 hours' advance notice. To finalize a booking, the client must provide the precise location and time of the event.",
		p2: 'All prices listed on our website exclude VAT (+{vat}). We guarantee that all payment transactions are 100% secure and processed using trusted financial gateways.'
	},
	obligations: {
		title: 'Client Obligations & Equipment Responsibility',
		body: 'The client is responsible for ensuring venue access and necessary power outlets are available at the scheduled location and time. The client acknowledges that they are renting high quality, professional gear, and must ensure the safety and physical integrity of the equipment during the agreed rental timeline.'
	}
};

export default copy;
export type Copy = typeof copy;
