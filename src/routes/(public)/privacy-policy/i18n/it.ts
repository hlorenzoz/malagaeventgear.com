import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Informativa sulla Privacy - Malaga Event Gear (MEG)',
		description:
			"Leggi l'Informativa sulla Privacy ufficiale di Malaga Event Gear. Scopri come raccogliamo, trattiamo e proteggiamo le tue informazioni personali."
	},
	hero: {
		badge: 'Informativa sulla Privacy',
		title: 'Informativa sulla Privacy',
		effectiveDate: 'Data di Entrata in Vigore: 16 ottobre 2025'
	},
	whoWeAre: {
		title: 'Chi Siamo',
		body: "Il nostro sito web è https://malagaeventgear.com. In Malaga Event Gear (MEG) ci impegniamo a proteggere le tue informazioni personali e a fornire informative trasparenti sull'utilizzo dei dati."
	},
	infoCollected: {
		title: 'Informazioni Raccolte e Finalità',
		intro:
			'Raccogliamo e trattiamo dati personali quando interagisci con il nostro flusso di lavoro aziendale consolidato (ad es. quando Richiedi il Tuo Preventivo tramite il nostro modulo di richiesta):',
		table: {
			headers: {
				category: 'Categoria di Dati',
				purpose: 'Finalità del Trattamento'
			},
			rows: [
				{
					category: 'Dati di Contatto',
					purpose:
						'Nome, Email, Telefono o ID WhatsApp per finalizzare i dettagli, coordinare la logistica e confermare la tua prenotazione. Condotto in inglese o spagnolo.'
				},
				{
					category: "Logistica dell'Evento",
					purpose: "Posizione precisa e orario dell'evento per coordinare la consegna, l'allestimento personalizzato delle attrezzature e il ritiro."
				},
				{
					category: 'Dati Finanziari',
					purpose: 'Informazioni di pagamento trattate durante le prenotazioni. Garantiamo che tutte le transazioni di pagamento siano sicure al 100%.'
				}
			]
		}
	},
	reviews: {
		title: 'Recensioni e Riprova Sociale',
		body: "Mostriamo una valutazione ECCELLENTE basata su recensioni verificate di Google My Business. La verifica delle recensioni è gestita dinamicamente tramite Trustindex, garantendo che la fonte originale di tutte le testimonianze dei clienti sia genuina e non alterata."
	},
	retention: {
		title: 'Conservazione dei Dati e Diritti',
		body: 'Conserviamo i tuoi dati personali solo per il tempo necessario a completare i servizi audiovisivi da te contrattati o a rispettare gli obblighi di legge. Hai pieno diritto, ai sensi del GDPR, di accedere, rettificare, opporti o richiedere la cancellazione dei tuoi dati personali in qualsiasi momento contattando il nostro Titolare del Trattamento.'
	}
} satisfies Copy;

export default copy;
