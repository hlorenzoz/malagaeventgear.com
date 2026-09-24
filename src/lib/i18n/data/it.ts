import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: "Noleggio audio e luci economico a Malaga, ideale per feste private o piccoli eventi fino a 50 ospiti. Include un impianto audio di base affidabile e un'illuminazione d'ambiente.",
			includes: [
				'2 casse attive di alta qualità con stativi',
				'1 microfono dinamico cablato',
				'2 barre luminose con fari LED RGBW',
				'Cablaggio curato e installazione professionale'
			],
			optional: ['Proiettore e schermo di proiezione (+{price:projectorScreen})', 'Macchina del fumo professionale (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack: noleggio audio e luci economico a Malaga | MEG' },
			landing: {
				badge: 'Piccoli eventi e feste',
				rateLabel: 'Tariffa conveniente tutto incluso',
				vatNote: '(+21% IVA), allestimento e trasporto inclusi',
				specTitle: 'Fino a 50 ospiti',
				specBody: 'Perfetto per ville, giardini e sale private.',
				highlightTitle: 'Servizio senza pensieri',
				highlightBody:
					"Lavoriamo solo con consegna e installazione in loco. Portiamo l'attrezzatura, la installiamo in modo professionale, testiamo audio e luci e ritiriamo tutto dopo l'evento.",
				includesLabel: 'Cosa è incluso',
				optionalLabel: 'Extra opzionali',
				ctaHeading: 'Prenota oggi stesso',
				ctaBody:
					'Compila il nostro rapido modulo di richiesta di preventivo tecnico per verificare la disponibilità del pacchetto per la tua data. Ti rispondiamo il prima possibile!',
				ctaButton: 'Prenota questo pacchetto'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: "Noleggio audio e luci per matrimoni a Malaga, pensato nei minimi dettagli per celebrazioni magiche e indimenticabili. Include un impianto acustico professionale di alta gamma, un'illuminazione d'ambiente romantica e microfoni wireless per discorsi emozionanti.",
			includes: [
				'Impianto audio PA attivo di alta gamma per un massimo di 80 ospiti',
				"Lucine e strisce LED a luce calda per un'illuminazione d'ambiente romantica",
				'Microfoni wireless professionali per discorsi e annunci',
				'Trasporto a Malaga e dintorni',
				'Installazione e cablaggio professionali e curati',
				"Regia tecnica dal vivo e assistenza tecnica in loco durante l'evento",
				"Smontaggio rapido e ritiro dell'attrezzatura dopo l'evento"
			],
			optional: ['Macchina del fumo professionale (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack: noleggio audio e luci per matrimoni Malaga | MEG' },
			landing: {
				badge: 'Il nostro pacchetto più richiesto per le celebrazioni',
				rateLabel: 'Tariffa premium tutto incluso',
				vatNote: '(+21% IVA), allestimento e assistenza dal vivo inclusi',
				specTitle: 'Fino a 80 ospiti',
				specBody: 'Perfetto per splendide ville, fincas e hotel per matrimoni.',
				highlightTitle: 'Tecnico presente in loco',
				highlightBody:
					'Niente più fischi dei microfoni o problemi video. Questo pacchetto include il monitoraggio tecnico completo dal vivo e le regolazioni acustiche per tutta la durata del banchetto e dei discorsi.',
				includesLabel: 'Servizi premium inclusi',
				ctaHeading: 'Rendi magica la tua celebrazione',
				ctaBody:
					"Le date per i matrimoni vanno a ruba. Assicurati la tua data con il nostro team tecnico oggi stesso per garantire il miglior audio e un'illuminazione romantica nel tuo giorno speciale.",
				ctaButton: 'Prenota questo Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Noleggio di proiettore e schermo a Malaga, pensato per presentazioni aziendali, showroom di concessionarie e lanci di prodotto ad alto impatto visivo.',
			includes: [
				'1 schermo di proiezione frontale con stativo stabile',
				'1 proiettore ad alta luminosità (5000 lumen) per immagini nitide',
				'Impianto audio per la sala con 2 casse e mixer',
				'1 microfono palmare wireless premium per i relatori'
			],
			seo: { title: 'Product Presentation Pack: proiettore e schermo Malaga | MEG' },
			landing: {
				badge: 'Soluzioni aziendali ad alto impatto visivo',
				rateLabel: 'Tariffa fissa pacchetto presentazione',
				vatNote: '(+21% IVA), proiettore e schermo inclusi',
				specTitle: 'Proiettore ad alta luminosità',
				specBody: 'Proiettore da 5000 lumen, ideale per sale illuminate.',
				highlightTitle: 'Immagine aziendale impeccabile',
				highlightBody:
					"Cattura tutta l'attenzione durante il lancio nel tuo concessionario, la conferenza stampa in hotel o la presentazione del prodotto. La nostra installazione professionale unisce un dettaglio grafico impeccabile a un'amplificazione vocale ad alte prestazioni.",
				includesLabel: 'Cosa è incluso',
				note: {
					title: 'Assistenza per allestimento e collegamento',
					body: 'Forniamo tutti gli adattatori necessari (HDMI, USB-C) e le interfacce audio per collegare senza problemi i portatili, i tablet o i lettori della tua azienda.'
				},
				ctaHeading: 'Valorizza la presentazione del tuo prodotto',
				ctaBody:
					'Offri al tuo pubblico la chiarezza visiva e il suono professionale che merita. Contatta il nostro team tecnico oggi stesso per confermare la disponibilità.',
				ctaButton: 'Prenota questo Presentation Pack'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Noleggio audiovisivi per riunioni aziendali a Malaga: un allestimento essenziale e ad alte prestazioni per piccole riunioni dirigenziali, conferenze e presentazioni fino a 40 ospiti.',
			includes: [
				'Schermo di proiezione 2x2m con proiettore ad alta luminosità da 3000 lumen',
				'Impianto audio di base dal suono cristallino per un massimo di 40 persone',
				"1 microfono a collo d'oca professionale per podio/leggio",
				'Trasporto logistico, allestimento e cablaggio curato'
			],
			optional: ['Assistente tecnico dedicato in loco (+{price:technicianDay}/giorno)'],
			seo: { title: 'Basic MICE Pack: audiovisivi riunioni aziendali Malaga | MEG' },
			landing: {
				badge: 'Pacchetti essenziali per riunioni dirigenziali',
				rateLabel: 'Tariffa fissa riunione aziendale',
				vatNote: '(+21% IVA), allestimento e trasporto inclusi',
				specTitle: 'Fino a 40 ospiti',
				specBody: "Pensato per sale riunioni, saloni privati e suite d'hotel.",
				highlightTitle: 'Voce chiara e intelligibile',
				highlightBody:
					"La configurazione professionale del microfono a collo d'oca garantisce una chiarezza assoluta per interventi del consiglio, annunci alla stampa o panel di investitori, senza eco né feedback.",
				includesLabel: 'Cosa è incluso',
				optionalLabel: 'Assistenza opzionale',
				ctaHeading: 'Pianifica la tua riunione dirigenziale',
				ctaBody:
					"Coordina una logistica audiovisiva aziendale impeccabile con Malaga Event Gear. Contatta i nostri esperti per garantire un'esperienza professionale in sala riunioni.",
				ctaButton: 'Prenota il Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'La soluzione completa di noleggio audiovisivi per congressi e conferenze a Malaga, con schermo grande formato, impianto audio attivo premium, microfoni wireless per podio e assistenza tecnica dal vivo dedicata.',
			includes: [
				'Schermo LED premium ad alta definizione da 60 pollici con stativo di design',
				'Casse attive professionali e impianto audio ad alte prestazioni',
				"1 microfono a collo d'oca + 1 microfono palmare wireless",
				"1 tecnico audiovisivo specializzato dedicato, presente durante l'evento (fino a 6 ore di assistenza continuativa)",
				"Consegna logistica, cablaggio personalizzato e smontaggio dopo l'evento"
			],
			optional: [
				'Ora aggiuntiva di assistenza tecnica dal vivo (+{price:technicianHour}/h)',
				'Leggio moderno premium in metacrilato/acrilico (+{price:lectern})',
				'Pedane modulari da palco (+{price:stagingPerSqm} al metro quadro)'
			],
			seo: { title: 'MICE Pack: audiovisivi congressi e conferenze Malaga | MEG' },
			landing: {
				badge: 'Esperienza MICE aziendale premium',
				rateLabel: 'Tariffa aziendale tutto incluso',
				vatNote: '(+21% IVA), schermo LED, audio e tecnico dal vivo inclusi',
				specTitle: 'Schermo LED da 60 pollici',
				specBody: 'Schermo grande formato ad alta definizione per immagini aziendali di grande impatto.',
				highlightTitle: "Tecnico dedicato durante l'evento",
				highlightBody:
					'Un tecnico audiovisivo specializzato gestisce il tuo evento per un massimo di 6 ore continuative, garantendo audio, immagini e gestione dei microfoni impeccabili durante il tuo summit, conferenza o lancio di prodotto.',
				includesLabel: 'Servizi premium inclusi',
				optionalLabel: 'Extra opzionali',
				ctaHeading: 'Dai slancio al tuo evento aziendale',
				ctaBody:
					"Offri un'esperienza aziendale impeccabile con attrezzature audiovisive premium e assistenza tecnica dedicata. Contatta il nostro team oggi stesso per confermare la disponibilità per la tua data.",
				ctaButton: 'Prenota il MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: "Cos'è Malaga Event Gear (MEG) e quali servizi offre?",
			answer:
				"Malaga Event Gear (MEG) è un'azienda con sede a Malaga, in Spagna, specializzata nel noleggio di attrezzature professionali audiovisive, di illuminazione e per eventi. Forniamo impianti audio, proiettori, schermi, palchi, assistenza tecnica, macchine del fumo, soluzioni di illuminazione e microfoni, oltre a servizi specializzati come il rinforzo sonoro dal vivo, oltre alla traduzione simultanea e ai sistemi di voto interattivo, che organizziamo tramite un partner in subappalto."
		},
		'event-types': {
			question: 'Che tipi di eventi può gestire Malaga Event Gear (MEG)?',
			answer:
				'Ci occupiamo di celebrazioni personali come matrimoni e feste private, di incontri professionali come eventi aziendali, riunioni, conferenze e presentazioni di prodotto, e di eventi su larga scala come congressi, fiere ed esposizioni, sempre con soluzioni audiovisive su misura.'
		},
		'service-areas': {
			question: 'Dove offre i suoi servizi Malaga Event Gear (MEG)?',
			answer:
				"Anche se 'Malaga' compare nel nostro nome, i nostri servizi vanno ben oltre la città. Operiamo principalmente in tutta la Costa del Sol, tra cui Malaga capitale, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena ed Estepona. Serviamo anche Siviglia e Granada, anche se Granada richiede generalmente prenotazioni superiori a {price:outOfProvinceMinimum} per via della distanza fuori provincia."
		},
		'what-makes-unique': {
			question: 'Cosa rende unica Malaga Event Gear (MEG) rispetto ad altre aziende di noleggio audiovisivo?',
			answer:
				"MEG si distingue per un approccio centrato sul cliente e semplificato: un tecnico dedicato in loco per ogni prenotazione, attrezzature di marchi premium e prezzi trasparenti tutto incluso. Stiamo evolvendo verso un'esperienza di prenotazione 100% online con tariffe fisse standardizzate e transazioni completamente trasparenti."
		},
		'booking-process': {
			question: 'Come funziona il processo di prenotazione con Malaga Event Gear?',
			answer:
				'Il nostro processo semplificato prevede quattro passaggi: 1. Scegli il tuo pacchetto. 2. Richiedi il tuo preventivo tramite il nostro modulo rapido. 3. Il nostro team ti contatta per finalizzare i dettagli e confermare la prenotazione. 4. Goditi un evento senza pensieri mentre ci occupiamo di consegna, allestimento professionale, configurazione e smontaggio. I servizi devono essere prenotati con almeno 24 ore di anticipo.'
		},
		'popular-packages': {
			question: 'Quali sono alcuni dei pacchetti più richiesti offerti da Malaga Event Gear?',
			answer:
				'I nostri pacchetti preconfigurati più richiesti includono {packagesWithPrices}, ciascuno con attrezzature e caratteristiche diverse. Visita la nostra pagina Prezzi per il dettaglio completo di ogni pacchetto.'
		},
		'language-hours': {
			question: 'In quali lingue comunica MEG con i clienti e quali sono i suoi orari?',
			answer:
				'Malaga Event Gear (MEG) comunica con i clienti in inglese e spagnolo. Siamo disponibili 24 ore su 24, 7 giorni su 7, per allestimenti tecnici e monitoraggio dal vivo degli eventi.'
		},
		'contact-info': {
			question: 'Come possono i clienti contattare Malaga Event Gear (MEG) e quali informazioni devono fornire?',
			answer:
				'Puoi contattarci per telefono al 666 346 911, via WhatsApp o via email. Per ricevere un preventivo accurato, indicaci la data del tuo evento, il luogo, il numero previsto di ospiti e il tipo di attrezzatura o pacchetto che ti interessa. Consulta la nostra pagina Contatti per maggiori dettagli.'
		},
		'delivery-setup': {
			question: 'Offrite consegna e allestimento per attrezzature audio e di illuminazione?',
			answer:
				'Sì. MEG fornisce consegna completa, allestimento professionale e smontaggio post evento per tutti i noleggi di audio e illuminazione. Il nostro servizio include trasporto, installazione, occultamento dei cavi, controlli audio/luci e assistenza tecnica opzionale in loco a Malaga, Marbella, Fuengirola, Torremolinos, Estepona e nelle zone circostanti.'
		},
		'vat-pricing': {
			question: "I prezzi dei vostri pacchetti includono l'IVA?",
			answer:
				"No, i prezzi indicati non includono l'IVA. Come indicato dalla dicitura (+21% IVA) accanto alle tariffe, l'IVA spagnola standard del 21% viene applicata in aggiunta al prezzo del pacchetto. Il tuo preventivo finale mostrerà sia il prezzo netto sia il dettaglio dell'IVA con totale trasparenza."
		},
		'on-site-technician': {
			question: "Fornite un tecnico in loco durante l'evento?",
			answer:
				"Sì. Diversi pacchetti, come il Wedding Pack e il MICE Pack completo, includono un tecnico dedicato dal vivo che si occupa della regia e dell'assistenza tecnica durante tutto l'evento. Per i pacchetti in cui non è incluso (ad esempio il Basic MICE Pack), l'assistenza tecnica in loco può essere aggiunta come opzione a partire da {price:technicianDay} al giorno."
		},
		'equipment-brands': {
			question: 'Con quali marchi di attrezzature lavorate?',
			answer:
				"Utilizziamo marchi professionali di alta gamma apprezzati nel settore degli eventi dal vivo, tra cui Audix e HK Audio per l'audio, Eurolite e ADJ per l'illuminazione, e Martin per gli effetti fumo. Questo garantisce prestazioni audio e di illuminazione affidabili e ad alta fedeltà per ogni prenotazione."
		},
		'delivery-only': {
			question: 'Offrite il ritiro in sede da parte del cliente o solo la consegna?',
			answer:
				"Lavoriamo esclusivamente con consegna: non è previsto il ritiro in sede da parte del cliente. Questo garantisce che ogni sistema arrivi trasportato, installato e calibrato professionalmente dal nostro team, in modo che l'attrezzatura funzioni esattamente come previsto al tuo evento."
		},
		'streaming-recording': {
			question: 'Offrite streaming dal vivo e registrazione multicamera?',
			answer:
				"No. Non offriamo telecamere, encoder per lo streaming, produzione video multicamera o un servizio di registrazione. Forniamo l'audio della sala, lo schermo e l'illuminazione. Per un evento ibrido o virtuale, dovrai portare il tuo portatile, il software di streaming e la connessione internet."
		},
		'translation-voting': {
			question: 'Offrite traduzione simultanea o sistemi di voto interattivo?',
			answer:
				'Sì, per la traduzione simultanea e i sistemi di voto interattivo, anche se non con attrezzature nostre: organizziamo entrambi i servizi tramite un partner in subappalto per eventi aziendali e di livello congressuale. Facci sapere le tue esigenze al momento della richiesta di preventivo. Non offriamo videowall LED: il nostro schermo grande formato è un unico pannello piatto da 60 pollici.'
		},
		'large-scale-events': {
			question: 'Potete gestire congressi, fiere ed esposizioni su larga scala?',
			answer:
				'Assolutamente sì. Oltre a matrimoni e riunioni aziendali, allestiamo eventi su larga scala come congressi, fiere ed esposizioni con soluzioni audiovisive su misura, combinando rinforzo sonoro, schermi grande formato, palchi e personale tecnico dedicato secondo necessità.'
		},
		'notice-time': {
			question: 'Qual è il preavviso minimo per effettuare una prenotazione?',
			answer:
				'Tutti i noleggi di attrezzature per eventi e i servizi tecnici devono essere prenotati con un preavviso minimo di 24 ore per garantire la disponibilità di programmazione e logistica. Per eventi grandi o complessi, consigliamo di prenotare il prima possibile per assicurarti la data.'
		},
		'minimum-order-granada': {
			question: "C'è un ordine minimo per il servizio fuori dalla Costa del Sol?",
			answer:
				"All'interno della Costa del Sol non c'è un minimo particolare. Per destinazioni più lontane e fuori provincia come Granada, richiediamo un valore di noleggio minimo superiore a {price:outOfProvinceMinimum} per coprire lo spostamento logistico in giornata. Serviamo anche Siviglia: contattaci per confermare le condizioni per la tua località specifica."
		},
		'customize-package': {
			question: 'Posso personalizzare o estendere un pacchetto per le mie esigenze specifiche?',
			answer:
				'Sì. Ogni pacchetto può essere esteso con extra come proiettori e schermi, macchine del fumo professionali, microfoni aggiuntivi, leggii premium in acrilico, pedane modulari da palco e ore aggiuntive di tecnico dal vivo. Comunicaci le tue esigenze al momento della richiesta di preventivo e costruiremo la configurazione perfetta per il tuo evento.'
		}
	}
} satisfies DataCopy;
