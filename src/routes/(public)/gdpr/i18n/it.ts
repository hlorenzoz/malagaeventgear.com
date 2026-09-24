import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Protezione dati GDPR - Malaga Event Gear (MEG)',
		description:
			"Scopri come Malaga Event Gear protegge i tuoi dati personali ai sensi del Regolamento generale sulla protezione dei dati (GDPR) nell'ambito del noleggio audiovisivo."
	},
	hero: {
		badge: 'Normativa europea',
		title: 'Conformità GDPR',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data di entrata in vigore: 16 ottobre 2025'
	},
	commitment: {
		title: 'Il nostro impegno GDPR',
		body: 'Poiché Malaga Event Gear (MEG) ha sede a Malaga, in Spagna, rispettiamo rigorosamente il Regolamento generale sulla protezione dei dati (GDPR) (Regolamento (UE) 2016/679) relativamente alla raccolta, al trattamento e alla conservazione dei dati personali.'
	},
	processing: {
		title: 'Dettagli sul trattamento dei dati personali',
		headers: {
			category: 'Categoria di dati',
			legalBasis: 'Base giuridica',
			purpose: 'Finalità di utilizzo'
		},
		rows: [
			{
				category: 'Identità e contatti',
				legalBasis: 'Esecuzione del Contratto',
				purpose:
					'Per comunicare, definire i dettagli della prenotazione e inviare i dettagli del preventivo via email, telefono o WhatsApp in inglese o spagnolo.'
			},
			{
				category: "Luogo e orario dell'evento",
				legalBasis: 'Esecuzione del Contratto',
				purpose: "Essenziale per coordinare la consegna, l'allestimento professionale personalizzato e la logistica di smontaggio."
			},
			{
				category: 'Dati di pagamento',
				legalBasis: 'Esecuzione del contratto e sicurezza',
				purpose: 'Per finalizzare transazioni sicure. Garantiamo che tutti i pagamenti al checkout siano sicuri al 100%.'
			}
		]
	},
	rights: {
		title: "Diritti dell'interessato ai sensi del GDPR",
		intro: 'Ai sensi del GDPR, hai i seguenti diritti riguardo ai dati personali che trattiamo:',
		items: [
			{
				label: 'Diritto di accesso:',
				body: 'Puoi richiedere la conferma e una copia di tutti i dati personali che conserviamo.'
			},
			{
				label: 'Diritto di rettifica:',
				body: "Puoi richiedere l'aggiornamento di dati incompleti o inesatti."
			},
			{
				label: 'Diritto alla cancellazione:',
				body: 'Puoi richiedere la cancellazione dei tuoi dati personali.'
			},
			{
				label: 'Diritto di limitazione:',
				body: 'Puoi richiedere che limitiamo il trattamento in determinate condizioni.'
			}
		]
	},
	rightsPortal: {
		title: 'Esercita i tuoi diritti GDPR',
		body: "Seleziona un'azione qui sotto per inviare automaticamente la tua richiesta sulla privacy al nostro team per la protezione dei dati.",
		buttons: {
			access: "Richiedi l'accesso ai dati",
			rectification: 'Richiedi la rettifica dei dati',
			erasure: 'Richiedi la cancellazione dei dati'
		},
		actions: {
			access: 'accesso ai dati',
			rectification: 'rettifica dei dati',
			erasure: 'cancellazione dei dati'
		},
		status: {
			prefix: 'La tua richiesta di ',
			middle: ' è stata avviata. Scrivici a ',
			suffix: ' per completare la verifica.'
		}
	}
} satisfies Copy;

export default copy;
