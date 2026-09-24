import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'GDPR-overholdelse | Malaga Event Gear (MEG)',
		description:
			'Forstå, hvordan Malaga Event Gear beskytter dine personoplysninger i henhold til databeskyttelsesforordningen (GDPR) for AV-udlejning.'
	},
	hero: {
		badge: 'EU-regulering',
		title: 'GDPR-overholdelse',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Ikrafttrædelsesdato: 16. oktober 2025'
	},
	commitment: {
		title: 'Vores GDPR-forpligtelse',
		body: 'Da Malaga Event Gear (MEG) har base i Málaga, Spanien, overholder vi strengt databeskyttelsesforordningen (GDPR) (forordning (EU) 2016/679) vedrørende indsamling, behandling og opbevaring af personoplysninger.'
	},
	processing: {
		title: 'Detaljer om behandling af personoplysninger',
		headers: {
			category: 'Datakategori',
			legalBasis: 'Retsgrundlag',
			purpose: 'Formål'
		},
		rows: [
			{
				category: 'Identitet og kontakt',
				legalBasis: 'Opfyldelse af kontrakt',
				purpose:
					'For at kommunikere, afklare bookingdetaljer og sende tilbud via e-mail, telefon eller WhatsApp på engelsk eller spansk.'
			},
			{
				category: 'Eventsted og tidspunkt',
				legalBasis: 'Opfyldelse af kontrakt',
				purpose: 'Afgørende for at koordinere levering, skræddersyet opsætning af udstyr og afhentning.'
			},
			{
				category: 'Betalingsdata',
				legalBasis: 'Opfyldelse af kontrakt og sikkerhed',
				purpose: 'For at gennemføre sikre transaktioner. Vi garanterer, at alle betalinger ved kassen er 100% sikre.'
			}
		]
	},
	rights: {
		title: 'Den registreredes rettigheder under GDPR',
		intro: 'I henhold til GDPR har du følgende rettigheder vedrørende de personoplysninger, vi behandler:',
		items: [
			{
				label: 'Ret til indsigt:',
				body: 'Du kan anmode om bekræftelse og kopi af alle de personoplysninger, vi opbevarer om dig.'
			},
			{
				label: 'Ret til berigtigelse:',
				body: 'Du kan anmode om at få ufuldstændige eller unøjagtige data opdateret.'
			},
			{
				label: 'Ret til sletning:',
				body: 'Du kan anmode om, at dine personoplysninger slettes.'
			},
			{
				label: 'Ret til begrænsning:',
				body: 'Du kan anmode om, at vi begrænser behandlingen under visse betingelser.'
			}
		]
	},
	rightsPortal: {
		title: 'Gør brug af dine GDPR-rettigheder',
		body: 'Vælg en handling nedenfor for automatisk at sende din privatlivsanmodning til vores team for databeskyttelse.',
		buttons: {
			access: 'Anmod om indsigt i data',
			rectification: 'Anmod om berigtigelse af data',
			erasure: 'Anmod om sletning af data'
		},
		actions: {
			access: 'indsigt i data',
			rectification: 'berigtigelse af data',
			erasure: 'sletning af data'
		},
		status: {
			prefix: 'Din anmodning om ',
			middle: ' er blevet igangsat. Send os venligst en e-mail på ',
			suffix: ' for at gennemføre verificeringen.'
		}
	}
} satisfies Copy;

export default copy;
