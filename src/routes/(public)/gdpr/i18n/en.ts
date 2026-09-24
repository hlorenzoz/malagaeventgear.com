// English copy of /gdpr/ (source).
const copy = {
	seo: {
		title: 'GDPR Compliance - Malaga Event Gear (MEG)',
		description:
			'Understand how Malaga Event Gear secures your personal data under the General Data Protection Regulation (GDPR) for audiovisual rentals.'
	},
	hero: {
		badge: 'European Regulation',
		title: 'GDPR Compliance',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Effective Date: October 16, 2025'
	},
	commitment: {
		title: 'GDPR Commitment',
		body: 'As Malaga Event Gear (MEG) is based in Málaga, Spain, we strictly adhere to the General Data Protection Regulation (GDPR) (Regulation (EU) 2016/679) regarding the collection, processing, and retention of personal data.'
	},
	processing: {
		title: 'Personal Data Processing Details',
		headers: {
			category: 'Data Category',
			legalBasis: 'Legal Basis',
			purpose: 'Usage Purpose'
		},
		rows: [
			{
				category: 'Identity & Contact',
				legalBasis: 'Contract Performance',
				purpose:
					'To communicate, finalize booking specifications, and send quote details via email, phone, or WhatsApp in English or Spanish.'
			},
			{
				category: 'Event Location & Schedule',
				legalBasis: 'Contract Performance',
				purpose: 'Essential to coordinate delivery, custom professional setup, and teardown logistics.'
			},
			{
				category: 'Payment Data',
				legalBasis: 'Contract Performance & Security',
				purpose:
					'To finalize secure transactions. We guarantee that all checkout payments are 100% Payment Secure.'
			}
		]
	},
	rights: {
		title: 'Data Subject Rights under GDPR',
		intro: 'Under the GDPR, you possess the following rights regarding the personal data we process:',
		items: [
			{
				label: 'Right of Access:',
				body: 'You can request confirmation and copy of all personal records we maintain.'
			},
			{
				label: 'Right to Rectification:',
				body: 'You may request updates to incomplete or inaccurate data.'
			},
			{
				label: 'Right to Erasure:',
				body: 'You can request the deletion of your personal records.'
			},
			{
				label: 'Right to Restriction:',
				body: 'You can request that we restrict processing under certain conditions.'
			}
		]
	},
	rightsPortal: {
		title: 'Exercise Your GDPR Rights',
		body: 'Select an action below to automatically trigger your privacy request to our data compliance team.',
		buttons: {
			access: 'Request Data Access',
			rectification: 'Request Data Rectification',
			erasure: 'Request Data Erasure'
		},
		/** The right being requested, as it reads inside `status`. */
		actions: {
			access: 'data access',
			rectification: 'data rectification',
			erasure: 'data erasure'
		},
		status: {
			prefix: 'Your request for ',
			middle: ' has been initiated. Please email us at ',
			suffix: ' to finalize verification.'
		}
	}
};

export default copy;
export type Copy = typeof copy;
