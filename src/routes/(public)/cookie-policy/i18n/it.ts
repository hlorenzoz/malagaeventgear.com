import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Informativa sui cookie - Malaga Event Gear (MEG)',
		description:
			"Scopri come Malaga Event Gear utilizza cookie e tecnologie di tracciamento per ottimizzare l'usabilità del sito web e analizzarne le prestazioni."
	},
	hero: {
		badge: 'Tracciamento e usabilità',
		title: 'Informativa sui cookie',
		effectiveDate: 'Data di entrata in vigore: 16 ottobre 2025'
	},
	whatAreCookies: {
		title: 'Cosa sono i cookie?',
		body: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti il nostro sito web. Aiutano il sito a funzionare in modo più efficiente, ci permettono di ricordare il tema chiaro o scuro che hai scelto e forniscono dati analitici anonimi al nostro team.'
	},
	categories: {
		title: 'Categorie di cookie che utilizziamo',
		items: [
			{
				title: 'Cookie essenziali e tecnici',
				body: 'Indispensabili per la navigazione di base, la sicurezza e la memorizzazione del tema chiaro o scuro. Non possono essere disattivati.'
			},
			{
				title: 'Cookie analitici e di prestazione',
				body: 'Utilizziamo Google Analytics e Google Search Console per monitorare il traffico, diagnosticare i colli di bottiglia e analizzare i parametri delle query di ricerca e la velocità del sito. Tutti i dati raccolti sono rigorosamente aggregati e pseudonimizzati.'
			},
			{
				title: 'Cookie di verifica di terze parti',
				body: 'Per mostrare recensioni autentiche dei clienti verificate direttamente da Google My Business, integriamo Trustindex. Trustindex può inserire cookie per tracciare e convalidare dinamicamente i widget delle recensioni.'
			}
		]
	},
	managing: {
		title: 'Gestisci le tue preferenze',
		body: "Puoi facilmente rifiutare o bloccare i cookie tramite le preferenze del tuo browser. Tieni presente, tuttavia, che limitare tutti i cookie potrebbe influire sull'accesso a funzionalità avanzate, come la compilazione automatica dei moduli o la memorizzazione del tema chiaro o scuro."
	}
} satisfies Copy;

export default copy;
