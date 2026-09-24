import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	benefits: {
		delivery: 'Consegna e allestimento gratuiti (Malaga e Costa del Sol)',
		brands: 'Marchi premium (HK Audio, Audix, Midas)',
		support: 'Assistenza tecnica in loco disponibile'
	},
	faqs: {
		delivery: {
			q: "La consegna e l'allestimento sono inclusi nel prezzo del pacchetto?",
			a: "Sì, per i pacchetti premium (come il {wedding} e il {mice}), sono inclusi consegna professionale completa, allestimento dei cavi e smontaggio a Malaga e nei suoi sobborghi diretti. Per i pacchetti standard, potrebbe essere applicato un piccolo costo logistico a seconda della posizione esatta del tuo evento."
		},
		areas: {
			q: 'Quali zone coprite in Andalusia?',
			a: "Serviamo quotidianamente Malaga capitale, Marbella e l'intera Costa del Sol. Serviamo anche Siviglia e Granada (per ordini superiori a 400€). Al momento non offriamo opzioni di ritiro poiché operiamo con un modello di sola consegna."
		},
		rain: {
			q: "Cosa succede se piove durante un evento all'aperto?",
			a: "Se il tuo evento è all'aperto, richiediamo un'area coperta (tende, pergole) per proteggere le attrezzature elettriche. In caso di pioggia senza copertura, lavoreremo con te per spostare le attrezzature al chiuso. La sicurezza degli ospiti e la protezione delle attrezzature ad alta tensione sono la nostra priorità assoluta."
		},
		technician: {
			q: 'Cosa succede se ho bisogno di un tecnico durante il mio evento?',
			a: "I nostri pacchetti premium (come il {wedding} e il {mice}) includono già il monitoraggio tecnico in loco. Per gli altri pacchetti, puoi richiedere un ingegnere del suono/luci dedicato che resti nella tua location per un'esperienza senza stress."
		}
	},
	popularBadge: 'Il Più Richiesto',
	itemsIncludedSuffix: 'elementi inclusi',
	faqSectionTitle: 'Domande Frequenti',
	stickyBarAriaLabel: "Barra di invito all'azione fissa"
} satisfies Copy;

export default copy;
