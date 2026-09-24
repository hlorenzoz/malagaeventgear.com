import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Contatti: preventivo noleggio audiovisivi Malaga | MEG',
		description:
			'Contatta Malaga Event Gear per richiedere un preventivo per il noleggio di audio, luci e schermi. Assistenza tecnica 24 ore su 24, 7 giorni su 7.'
	},
	schema: {
		name: 'Contatti - Malaga Event Gear',
		description:
			'Contatta il team tecnico di Malaga Event Gear per richiedere preventivi personalizzati per il noleggio di audio, luci e schermi.'
	},
	whatsappLinkText: 'Inviaci un messaggio',
	messages: {
		packIntro: 'Ciao, sono interessato/a a prenotare il Pacchetto: {pack}. Fatemi sapere la disponibilità e i dettagli.',
		categoryIntro:
			'Ciao, sono interessato/a a prenotare attrezzature dalla categoria: {category}. Resto in attesa del vostro preventivo.'
	},
	errors: {
		pastDate: "Scegli una data dell'evento successiva a oggi."
	},
	form: {
		namePlaceholder: 'Nome Completo',
		emailPlaceholder: 'Indirizzo Email',
		phonePlaceholder: 'Telefono',
		messagePlaceholder: 'Messaggio'
	}
} satisfies Copy;

export default copy;
