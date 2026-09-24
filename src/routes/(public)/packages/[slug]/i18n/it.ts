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
			a: "Sì, per i pacchetti premium (come il {wedding} e il {mice}), sono inclusi la consegna professionale completa, il cablaggio e lo smontaggio a Malaga e nei comuni limitrofi. Per i pacchetti standard, potrebbe essere applicato un piccolo costo logistico a seconda della posizione esatta del tuo evento."
		},
		areas: {
			q: 'Quali zone coprite in Andalusia?',
			a: "Operiamo ogni giorno a Malaga capitale, a Marbella e in tutta la Costa del Sol. Serviamo anche Siviglia e Granada (per ordini superiori a {price:outOfProvinceMinimum}). Al momento non è previsto il ritiro in sede da parte del cliente, perché lavoriamo solo con consegna."
		},
		rain: {
			q: "Cosa succede se piove durante un evento all'aperto?",
			a: "Se il tuo evento è all'aperto, richiediamo un'area coperta (tende, pergole) per proteggere le attrezzature elettriche. In caso di pioggia senza copertura, valuteremo insieme a te come spostare le attrezzature al chiuso. La sicurezza degli ospiti e la protezione delle attrezzature ad alta tensione sono la nostra priorità assoluta."
		},
		technician: {
			q: 'Cosa succede se ho bisogno di un tecnico durante il mio evento?',
			a: "I nostri pacchetti premium (come il {wedding} e il {mice}) includono già il monitoraggio tecnico in loco. Per gli altri pacchetti, puoi richiedere un tecnico audio e luci dedicato, presente nella tua location, per un'esperienza senza stress."
		}
	},
	popularBadge: 'Il più richiesto',
	itemsIncludedSuffix: 'elementi inclusi',
	faqSectionTitle: 'Domande frequenti',
	stickyBarAriaLabel: "Barra di invito all'azione fissa"
} satisfies Copy;

export default copy;
