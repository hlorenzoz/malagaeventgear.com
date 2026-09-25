import type { Copy } from './en';

export const updated = '2026-09-25';

const copy = {
	seo: {
		title: 'Termini e condizioni - Malaga Event Gear (MEG)',
		description:
			'Leggi i termini e condizioni ufficiali dei noleggi di Malaga Event Gear. Scopri le nostre politiche su prenotazioni, pagamenti e servizio sicuro.'
	},
	hero: {
		badge: 'Quadro legale',
		title: 'Termini e condizioni',
		effectiveDate: 'Data di entrata in vigore: 16 ottobre 2025'
	},
	intro: {
		title: 'Introduzione e accettazione dei termini',
		body: 'Accedendo o utilizzando i servizi forniti da Malaga Event Gear (MEG), accetti di essere vincolato dai presenti Termini e condizioni. Malaga Event Gear fornisce noleggio professionale di audio, illuminazione e attrezzature per eventi, per diverse occasioni tra cui matrimoni, feste private, eventi aziendali, riunioni e conferenze MICE.'
	},
	scope: {
		title: 'Ambito del servizio e offerta',
		p1: "Siamo specializzati nella fornitura di sistemi acustici PA attivi ad alta fedeltà, soluzioni di illuminazione professionale (barre luminose LED, un faro Fresnel a zoom e un kit di uplighting wireless), proiettori ad alta luminosità, microfoni (cablati, wireless, a collo d'oca), una macchina del fumo e pedane da palco.",
		p2: "Molti dei nostri pacchetti, come il Wedding Pack e il MICE Pack, includono trasporto, installazione professionale, assistenza tecnica dal vivo in loco e smontaggio post evento per un'esperienza completamente senza stress."
	},
	limits: {
		title: 'Limiti geografici e operativi',
		p1: 'I nostri servizi sono concentrati principalmente nella provincia di Malaga e sulla Costa del Sol (tra cui Malaga capitale, Marbella, Fuengirola, Torremolinos, Estepona, Siviglia e zone limitrofe). Il servizio a Granada è disponibile solo per pacchetti superiori a {price:outOfProvinceMinimum} a causa dei costi di trasferta fuori provincia in giornata.',
		p2: "Malaga Event Gear opera 7 giorni su 7, dalle 8:00 alle 20:00 per richieste commerciali, e 24 ore su 24, 7 giorni su 7, per la logistica tecnica e l'assistenza per l'allestimento.",
		p3: "Per garantire l'assoluta precisione tecnica per il nostro pubblico internazionale, tutte le comunicazioni, la documentazione e le prenotazioni tramite il sito avvengono in inglese o in spagnolo."
	},
	booking: {
		title: 'Prenotazione, prezzi e sicurezza',
		p1: "Tutte le prestazioni di servizio devono essere contrattate con un preavviso minimo di 24 ore. Per finalizzare una prenotazione, il cliente deve fornire il luogo e l'orario precisi dell'evento.",
		p2: 'Tutti i prezzi indicati sul nostro sito web sono indicati IVA esclusa (+{vat}). Garantiamo che tutte le transazioni di pagamento siano sicure al 100% e vengano elaborate tramite gateway finanziari affidabili.'
	},
	obligations: {
		title: "Obblighi del cliente e responsabilità sull'attrezzatura",
		body: "Il cliente è responsabile di garantire l'accesso alla location e la disponibilità delle prese elettriche necessarie nel luogo e nell'orario programmati. Il cliente riconosce di noleggiare attrezzature professionali di alta qualità e deve garantire la sicurezza e l'integrità fisica delle attrezzature durante il periodo di noleggio concordato."
	}
} satisfies Copy;

export default copy;
