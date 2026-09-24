// English copy of /privacy-policy/ (source).
const copy = {
	seo: {
		title: 'Privacy Policy - Malaga Event Gear (MEG)',
		description:
			'Read the official Privacy Policy for Malaga Event Gear. Learn how we collect, process, and protect your personal information.'
	},
	hero: {
		badge: 'Privacy Disclosures',
		title: 'Privacy Policy',
		effectiveDate: 'Effective Date: October 16, 2025'
	},
	whoWeAre: {
		title: 'Who We Are',
		body: 'Our website address is https://malagaeventgear.com. At Malaga Event Gear (MEG), we are committed to protecting your personal information and providing transparent disclosures regarding data usage.'
	},
	infoCollected: {
		title: 'Information We Collect & Purpose',
		intro:
			'We collect and process personal data when you engage with our established business workflow (e.g., when you Request Your Quote via our inquiry form):',
		table: {
			headers: {
				category: 'Data Category',
				purpose: 'Processing Purpose'
			},
			rows: [
				{
					category: 'Contact Details',
					purpose:
						'Name, Email, Phone, or WhatsApp ID to finalize details, coordinate logistics, and confirm your booking. Conducted in English or Spanish.'
				},
				{
					category: 'Event Logistics',
					purpose:
						'Precise location and time of the event to coordinate delivery, custom equipment setup, and pickup.'
				},
				{
					category: 'Financial Data',
					purpose:
						'Payment information processed during bookings. We guarantee that all payment transactions are 100% secure.'
				}
			]
		}
	},
	reviews: {
		title: 'Reviews & Social Proof',
		body: 'We display an EXCELLENT rating based on verified Google My Business reviews. The review verification is handled dynamically via Trustindex, ensuring that the original source of all customer testimonials is genuine and unaltered.'
	},
	retention: {
		title: 'Data Retention & Rights',
		body: 'We retain your personal data only as long as necessary to complete your contracted audiovisual services or comply with legal mandates. You have full rights under GDPR to access, rectify, object to, or request the deletion of your personal records at any time by contacting our Data Controller.'
	}
};

export default copy;
export type Copy = typeof copy;
