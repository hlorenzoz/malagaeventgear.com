import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Informativa sui Cookie - Malaga Event Gear (MEG)',
		description:
			"Scopri come Malaga Event Gear utilizza cookie e tecnologie di tracciamento per ottimizzare l'usabilità del sito web e analizzarne le prestazioni."
	},
	hero: {
		badge: 'Tracciamento e Usabilità',
		title: 'Informativa sui Cookie',
		effectiveDate: 'Data di Entrata in Vigore: 16 ottobre 2025'
	},
	whatAreCookies: {
		title: 'Cosa Sono i Cookie?',
		body: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti il nostro sito web. Aiutano il sito a funzionare in modo più efficiente, ci permettono di mantenere le tue preferenze linguistiche (ad es. EN/ES) e forniscono dati analitici anonimi al nostro team.'
	},
	categories: {
		title: 'Categorie di Cookie che Utilizziamo',
		items: [
			{
				title: 'Cookie Essenziali e Tecnici',
				body: 'Essenziali per la navigazione di base, la sicurezza e il funzionamento persistente della selezione delle preferenze linguistiche. Non possono essere disattivati.'
			},
			{
				title: 'Cookie Analitici e di Prestazione',
				body: 'Utilizziamo Google Analytics e Google Search Console per monitorare il traffico, individuare colli di bottiglia diagnostici, parametri delle query di ricerca e la velocità del sito. Tutti i dati raccolti sono rigorosamente aggregati e pseudonimizzati.'
			},
			{
				title: 'Cookie di Verifica di Terze Parti',
				body: 'Per mostrare recensioni autentiche dei clienti verificate direttamente da Google My Business, integriamo Trustindex. Trustindex può inserire cookie per tracciare e convalidare dinamicamente i widget delle recensioni.'
			}
		]
	},
	managing: {
		title: 'Gestisci le Tue Preferenze',
		body: "Puoi facilmente rifiutare o bloccare i cookie tramite le preferenze del tuo browser. Tieni presente, tuttavia, che limitare tutti i cookie potrebbe influire sull'accesso a funzionalità avanzate, come la compilazione automatica dei moduli o la selezione persistente della lingua."
	}
} satisfies Copy;

export default copy;
