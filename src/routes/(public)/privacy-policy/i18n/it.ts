import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Informativa sulla privacy - Malaga Event Gear (MEG)',
		description:
			"Leggi l'informativa sulla privacy ufficiale di Malaga Event Gear. Scopri come raccogliamo, trattiamo e proteggiamo le tue informazioni personali."
	},
	hero: {
		badge: 'Trasparenza sulla privacy',
		title: 'Informativa sulla privacy',
		effectiveDate: 'Data di entrata in vigore: 16 ottobre 2025'
	},
	whoWeAre: {
		title: 'Chi siamo',
		body: "Il nostro sito web è https://malagaeventgear.com. Noi di Malaga Event Gear (MEG) ci impegniamo a proteggere le tue informazioni personali e a fornire informative trasparenti sull'utilizzo dei dati."
	},
	infoCollected: {
		title: 'Informazioni raccolte e finalità',
		intro:
			'Raccogliamo e trattiamo dati personali quando interagisci con il nostro consueto processo commerciale (ad esempio quando richiedi un preventivo tramite il nostro modulo di contatto):',
		table: {
			headers: {
				category: 'Categoria di dati',
				purpose: 'Finalità del trattamento'
			},
			rows: [
				{
					category: 'Dati di contatto',
					purpose:
						'Nome, email, telefono o ID WhatsApp per definire i dettagli, coordinare la logistica e confermare la tua prenotazione. Le comunicazioni avvengono in inglese o in spagnolo.'
				},
				{
					category: "Logistica dell'evento",
					purpose: "Luogo preciso e orario dell'evento per coordinare la consegna, l'allestimento personalizzato delle attrezzature e il ritiro."
				},
				{
					category: 'Dati finanziari',
					purpose: 'Informazioni di pagamento trattate durante le prenotazioni. Garantiamo che tutte le transazioni di pagamento siano sicure al 100%.'
				}
			]
		}
	},
	reviews: {
		title: 'Recensioni e riprova sociale',
		body: "Mostriamo una valutazione ECCELLENTE basata su recensioni verificate di Google My Business. La verifica delle recensioni è gestita dinamicamente tramite Trustindex, garantendo che la fonte originale di tutte le testimonianze dei clienti sia genuina e non alterata."
	},
	retention: {
		title: 'Conservazione dei dati e diritti',
		body: 'Conserviamo i tuoi dati personali solo per il tempo necessario a completare i servizi audiovisivi da te contrattati o a rispettare gli obblighi di legge. Ai sensi del GDPR hai pieno diritto, in qualsiasi momento, di accedere ai tuoi dati personali, di rettificarli, di opporti al loro trattamento o di chiederne la cancellazione, contattando il nostro titolare del trattamento.'
	}
} satisfies Copy;

export default copy;
