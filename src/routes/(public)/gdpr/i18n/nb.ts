import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Personvern og GDPR hos Malaga Event Gear (MEG)',
		description:
			'Se hvordan Malaga Event Gear sikrer personopplysningene dine under personvernforordningen (GDPR) ved utleie av lyd- og bildeutstyr.'
	},
	hero: {
		badge: 'Europeisk regelverk',
		title: 'GDPR-samsvar',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Gjeldende fra: 16. oktober 2025'
	},
	commitment: {
		title: 'Vårt GDPR-engasjement',
		body: 'Siden Malaga Event Gear (MEG) holder til i Málaga, Spania, følger vi strengt personvernforordningen (GDPR) (forordning (EU) 2016/679) ved innsamling, behandling og lagring av personopplysninger.'
	},
	processing: {
		title: 'Detaljer om behandling av personopplysninger',
		headers: {
			category: 'Datakategori',
			legalBasis: 'Rettslig grunnlag',
			purpose: 'Formål'
		},
		rows: [
			{
				category: 'Identitet og kontakt',
				legalBasis: 'Oppfyllelse av avtale',
				purpose:
					'For å kommunisere, fastsette bookingdetaljer og sende tilbud via e-post, telefon eller WhatsApp på engelsk eller spansk.'
			},
			{
				category: 'Sted og tidspunkt for arrangementet',
				legalBasis: 'Oppfyllelse av avtale',
				purpose: 'Nødvendig for å koordinere levering, skreddersydd profesjonell installasjon og nedrigging.'
			},
			{
				category: 'Betalingsdata',
				legalBasis: 'Oppfyllelse av avtale og sikkerhet',
				purpose: 'For å fullføre sikre transaksjoner. Vi garanterer at alle betalinger ved kjøp er 100 % sikre.'
			}
		]
	},
	rights: {
		title: 'Dine rettigheter som registrert under GDPR',
		intro: 'Under GDPR har du følgende rettigheter knyttet til personopplysningene vi behandler:',
		items: [
			{
				label: 'Rett til innsyn:',
				body: 'Du kan be om bekreftelse på og kopi av alle personopplysninger vi har lagret om deg.'
			},
			{
				label: 'Rett til retting:',
				body: 'Du kan be om at ufullstendige eller unøyaktige opplysninger oppdateres.'
			},
			{
				label: 'Rett til sletting:',
				body: 'Du kan be om at personopplysningene dine slettes.'
			},
			{
				label: 'Rett til begrensning:',
				body: 'Du kan be om at vi begrenser behandlingen under visse forhold.'
			}
		]
	},
	rightsPortal: {
		title: 'Utøv dine GDPR-rettigheter',
		body: 'Velg en handling nedenfor for å automatisk sende personvernforespørselen din til vårt team for regeletterlevelse.',
		buttons: {
			access: 'Be om innsyn i data',
			rectification: 'Be om retting av data',
			erasure: 'Be om sletting av data'
		},
		actions: {
			access: 'innsyn i data',
			rectification: 'retting av data',
			erasure: 'sletting av data'
		},
		status: {
			prefix: 'Forespørselen din om ',
			middle: ' er startet. Send oss en e-post på ',
			suffix: ' for å fullføre verifiseringen.'
		}
	}
} satisfies Copy;
