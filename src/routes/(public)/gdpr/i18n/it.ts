import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Protezione Dati GDPR - Malaga Event Gear (MEG)',
		description:
			'Scopri come Malaga Event Gear protegge i tuoi dati personali ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR) per il noleggio audiovisivo.'
	},
	hero: {
		badge: 'Normativa Europea',
		title: 'Conformità GDPR',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data di Entrata in Vigore: 16 ottobre 2025'
	},
	commitment: {
		title: 'Impegno GDPR',
		body: 'Poiché Malaga Event Gear (MEG) ha sede a Malaga, in Spagna, rispettiamo rigorosamente il Regolamento Generale sulla Protezione dei Dati (GDPR) (Regolamento (UE) 2016/679) relativamente alla raccolta, al trattamento e alla conservazione dei dati personali.'
	},
	processing: {
		title: 'Dettagli sul Trattamento dei Dati Personali',
		headers: {
			category: 'Categoria di Dati',
			legalBasis: 'Base Giuridica',
			purpose: 'Finalità di Utilizzo'
		},
		rows: [
			{
				category: 'Identità e Contatti',
				legalBasis: 'Esecuzione del Contratto',
				purpose:
					'Per comunicare, finalizzare le specifiche della prenotazione e inviare i dettagli del preventivo via email, telefono o WhatsApp in inglese o spagnolo.'
			},
			{
				category: "Luogo e Data dell'Evento",
				legalBasis: 'Esecuzione del Contratto',
				purpose: "Essenziale per coordinare la consegna, l'allestimento professionale personalizzato e la logistica di smontaggio."
			},
			{
				category: 'Dati di Pagamento',
				legalBasis: 'Esecuzione del Contratto e Sicurezza',
				purpose: 'Per finalizzare transazioni sicure. Garantiamo che tutti i pagamenti al checkout siano sicuri al 100%.'
			}
		]
	},
	rights: {
		title: "Diritti dell'Interessato ai sensi del GDPR",
		intro: 'Ai sensi del GDPR, hai i seguenti diritti riguardo ai dati personali che trattiamo:',
		items: [
			{
				label: 'Diritto di Accesso:',
				body: 'Puoi richiedere la conferma e una copia di tutti i dati personali che conserviamo.'
			},
			{
				label: 'Diritto di Rettifica:',
				body: "Puoi richiedere l'aggiornamento di dati incompleti o inesatti."
			},
			{
				label: 'Diritto alla Cancellazione:',
				body: 'Puoi richiedere la cancellazione dei tuoi dati personali.'
			},
			{
				label: 'Diritto di Limitazione:',
				body: 'Puoi richiedere che limitiamo il trattamento in determinate condizioni.'
			}
		]
	},
	rightsPortal: {
		title: 'Esercita i Tuoi Diritti GDPR',
		body: "Seleziona un'azione qui sotto per attivare automaticamente la tua richiesta sulla privacy al nostro team di conformità dei dati.",
		buttons: {
			access: 'Richiedi Accesso ai Dati',
			rectification: 'Richiedi Rettifica dei Dati',
			erasure: 'Richiedi Cancellazione dei Dati'
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
