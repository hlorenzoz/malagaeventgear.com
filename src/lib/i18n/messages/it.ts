import type { Messages } from './en';

/** Italian UI dictionary. Same shape as en.ts (`satisfies Messages`). */
const t = {
	// Navigation
	nav: {
		equipment: 'Attrezzature',
		packages: 'Pacchetti',
		blog: 'Blog',
		contact: 'Contatti',
		bookNow: 'Prenota ora',
		blogInEnglish: 'Blog (in inglese)',
		language: 'Lingua',
		breadcrumbs: 'Percorso di navigazione',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Cambia il tema dei colori',
		openMenu: 'Apri il menu di navigazione'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Rispondiamo in inglese o in spagnolo.',
		legalTranslation:
			'Questa è una traduzione. In caso di discrepanza, prevale la versione in inglese.',
		readEnglish: 'Leggi la versione in inglese'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Home',
		packages: 'Pacchetti',
		blog: 'Blog',
		categories: 'Categorie',
		category: 'Categoria',
		author: 'Autore',
		contact: 'Contatti',
		'about-us': 'Chi siamo',
		faq: 'FAQ',
		'privacy-policy': 'Informativa sulla privacy',
		'terms-of-service': 'Termini e condizioni',
		'cookie-policy': 'Informativa sui cookie',
		gdpr: 'GDPR',
		'meet-the-team': 'Il nostro team',
		equipment: 'Attrezzature',
		sitemap: 'Mappa del sito',
		'thank-you': 'Grazie'
	},
	// Hero
	hero: {
		span: 'Per ogni tipo di evento',
		titlePart1: 'Servizio di',
		titleGradient: 'noleggio attrezzature audiovisive',
		titlePart2: 'a Malaga',
		subtitle:
			"Vivi un suono cristallino e un'illuminazione spettacolare con le nostre attrezzature di alta gamma. Perfetto per matrimoni, eventi aziendali e feste esclusive sulla Costa del Sol.",
		viewPricing: 'Vedi i prezzi',
		contactUs: 'Contattaci'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Allestimento impeccabile',
		card1Text:
			"Assistenza tecnica dedicata per garantire che il tuo evento si svolga senza intoppi dall'inizio alla fine, senza alcuna preoccupazione.",
		card2Title: '#2 Pacchetti su misura',
		card2Text:
			'Pacchetti di noleggio flessibili, pensati per adattarsi perfettamente a qualsiasi dimensione di evento, location e budget.',
		card3Title: "#3 Tecnologia all'avanguardia",
		card3Text:
			"Goditi attrezzature audiovisive all'avanguardia che esaltano la qualità visiva e sonora della tua produzione."
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'In breve',
		sellQ: 'Cosa offriamo?',
		sellA:
			'Noleggiamo attrezzature audiovisive di alta gamma (impianti audio professionali, illuminazione scenica, proiettori e schermi) per eventi in tutta Malaga e sulla Costa del Sol, con consegna, allestimento e assistenza tecnica in loco inclusi.',
		whoQ: 'A chi è rivolto?',
		whoA:
			"Alle coppie che organizzano il matrimonio, alle aziende che gestiscono conferenze ed eventi aziendali e a chiunque organizzi una festa o una celebrazione privata e desideri un suono e un'illuminazione impeccabili senza dover acquistare le attrezzature.",
		costQ: 'Quanto costa?',
		costA:
			'pacchetti a prezzo fisso senza costi nascosti, calibrati sulla dimensione del tuo evento, oltre a preventivi su misura per produzioni più grandi.',
		costFrom: 'A partire da',
		howQ: 'Come funziona?',
		howA:
			'Quattro semplici passi: scegli il tuo pacchetto, richiedi un preventivo, noi confermiamo e prepariamo le attrezzature, e il giorno del tuo evento il nostro team consegna e allestisce tutto.'
	},
	// Impact
	impact: {
		title: 'I nostri numeri',
		years: 'Anni di esperienza',
		clients: 'Clienti soddisfatti',
		satisfaction: 'Tasso di soddisfazione'
	},
	// Categories
	categories: {
		badge: 'Attrezzature premium',
		title: 'Categorie disponibili',
		soundTitle: 'Impianti audio',
		soundText:
			'Un suono cristallino ad alta fedeltà, ideale per matrimoni intimi o grandi conferenze aziendali. Lavoriamo con marchi leader per garantire la massima fedeltà acustica.',
		lightTitle: 'Illuminazione',
		lightText:
			"Soluzioni di illuminazione dinamica per creare l'atmosfera perfetta nella tua location.",
		visualTitle: 'Proiettori e schermi',
		visualText: 'Immagini nitide e ad alta definizione per presentazioni dal forte impatto visivo.',
		fxTitle: 'Effetti speciali e macchine del fumo',
		fxText:
			"Crea un'atmosfera spettacolare al tuo evento con i nostri effetti speciali e macchine del fumo di livello professionale.",
		bookEquipment: 'Prenota un pacchetto'
	},
	// Pricing
	pricing: {
		badge: 'Prezzi trasparenti',
		title: 'Pacchetti su misura per ogni evento',
		subtitle:
			'Scegli tra i nostri pacchetti di noleggio flessibili, pensati per adattarsi perfettamente a qualsiasi dimensione di evento e budget. Organizzare diventa semplice!',
		includes: 'Include:',
		includedServices: 'Servizi inclusi:',
		optional: 'Opzionale:',
		check: 'Verifica la disponibilità',
		mostPopular: 'Il più richiesto',
		from: 'A partire da',
		plusVat: '(+21% IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Prenota'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtri',
		clearAll: 'Cancella tutto',
		resetFilters: 'Reimposta i filtri',
		showingResults: '{visible} pacchetti su {total}',
		noResults: 'Nessun pacchetto corrisponde ai tuoi filtri. Prova a rimuovere qualche selezione!',
		openFilters: 'Filtri',
		done: 'Mostra i risultati',
		purpose: 'Tipo di evento',
		capacity: "Dimensione dell'evento",
		price: 'Budget',
		equipment: 'Attrezzature incluse',
		extras: 'Extra opzionali',
		sortBy: 'Ordina per',
		party: 'Feste',
		wedding: 'Matrimoni',
		corporate: 'Aziendale',
		presentation: 'Presentazioni',
		meeting: 'Riunioni',
		small: 'Piccolo (fino a 50 ospiti)',
		medium: 'Medio (da 51 a 80 ospiti)',
		large: 'Grande (oltre 80 ospiti)',
		priceLow: 'Fino a {price:budgetLow}',
		priceMid: 'Da {price:budgetLow} a {price:budgetHigh}',
		priceHigh: 'Oltre {price:budgetHigh}',
		transport: 'Trasporto e allestimento',
		screen: 'Schermo / display',
		sound: 'Impianto audio',
		microphone: 'Microfoni',
		lighting: "Illuminazione d'ambiente",
		technician: 'Tecnico in loco',
		projector: 'Proiettore',
		smokeMachine: 'Macchina del fumo',
		technicalAssistant: 'Assistente tecnico',
		lectern: 'Leggio',
		staging: 'Pedane da palco',
		recommended: 'Consigliati',
		priceAsc: 'Prezzo: dal più basso al più alto',
		priceDesc: 'Prezzo: dal più alto al più basso'
	},
	// Contact
	contact: {
		badge: 'Risposta immediata 24/7',
		title: 'Mettiti in contatto',
		subtitle:
			'Pronto a valorizzare il tuo evento? Contatta il nostro team tecnico per ricevere preventivi su misura, verificare la disponibilità delle attrezzature e ottenere consigli da esperti.',
		detailsTitle: 'Recapiti',
		phone: 'Telefono',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Dove siamo',
		hours: 'Orari di servizio',
		hoursText: 'Assistenza tecnica e logistica 24 ore su 24, 7 giorni su 7.',
		reqTitle: 'Richiedi un preventivo',
		formName: 'Nome e cognome *',
		formEmail: 'Indirizzo email *',
		formPhone: 'Telefono di contatto',
		formDate: "Data dell'evento",
		formType: 'Tipo di evento',
		formTypeWedding: 'Matrimonio / celebrazione',
		formTypeCorporate: 'Evento aziendale',
		formTypeParty: 'Festa privata',
		formTypeMice: 'Conferenza / MICE',
		formTypeOther: 'Altro tipo di evento',
		formMessage: "Dettagli dell'evento e requisiti tecnici *",
		formSubmit: 'Invia la richiesta',
		formSubmitting: 'Invio in corso...',
		formRequiredError: 'Compila tutti i campi obbligatori.',
		formErrorSubmit:
			"Si è verificato un errore nell'invio della tua richiesta. Riprova oppure scrivici direttamente via email.",
		formErrorTurnstile: 'Verifica di sicurezza non riuscita. Riprova.',
		formErrorRateLimited: 'Troppe richieste. Attendi qualche minuto e riprova.',
		lockedFieldNote:
			'Generato automaticamente da un errore: questo campo non può essere modificato.',
		errorPrefillMessage:
			"Ciao, ho inviato una richiesta per un pacchetto sul vostro sito ma l'email di conferma non è partita. Potreste confermarmi di aver ricevuto la mia richiesta? Riferimento: {ref}",
		errorDetailsHeader: 'Dati inviati:',
		errorDetailSource: 'URL del modulo',
		errorDetailName: 'Nome',
		errorDetailEmail: 'Email',
		errorDetailPhone: 'Telefono',
		errorDetailDate: "Data dell'evento",
		errorDetailPackage: 'Pacchetto',
		errorDetailComments: 'Commenti',
		successTitle: 'Preventivo richiesto!',
		successText1: 'Ciao',
		successText2:
			'abbiamo ricevuto correttamente la tua richiesta. Il nostro team tecnico a Malaga la valuterà e ti contatterà via email (',
		successText3: ') il prima possibile.',
		successButton: "Invia un'altra richiesta",
		faqTitle: 'Domande frequenti'
	},
	// Packages Showcase.
	packages: {
		badge: 'Pacchetti in evidenza',
		title: 'Scegli il tuo pacchetto ideale',
		subtitle:
			'Su misura per ogni occasione. Tutti i pacchetti includono trasporto, allestimento e assistenza tecnica in loco.',
		enquire: 'Richiedi un preventivo'
	},
	// How It Works
	process: {
		badge: 'Come funziona',
		title: 'Il tuo evento in 4 semplici passi',
		s1Title: 'Scegli il tuo pacchetto',
		s1Desc:
			'Sfoglia i nostri pacchetti e scegli quello più adatto alla dimensione e allo stile del tuo evento.',
		s2Title: 'Richiedi un preventivo',
		s2Desc:
			'Compila il nostro modulo rapido. Ti risponderemo il prima possibile con la disponibilità completa.',
		s3Title: 'Conferma e pianifica',
		s3Desc: "Il nostro team conferma la logistica, l'accesso alla location e ogni dettaglio tecnico.",
		s4Title: 'Goditi il tuo evento',
		s4Desc: "Ci occupiamo dell'allestimento, della regia durante l'evento e dello smontaggio. Zero stress per te."
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Prezzi trasparenti',
		title: 'Prezzi semplici e tutto incluso',
		subtitle: 'Nessun costo nascosto. Trasporto, allestimento e assistenza tecnica sempre inclusi.',
		viewAll: 'Vedi tutti i pacchetti'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Domande comuni'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Recensioni dei clienti',
		title: 'Storie vere da eventi veri',
		subtitle: 'Recensioni Google verificate di clienti di tutta la Costa del Sol.',
		ratingLabel: 'ECCELLENTE',
		basedOn: 'Basato su {n} recensioni',
		poweredBy: 'Le nostre recensioni più recenti',
		readMore: 'Leggi tutto',
		readLess: 'Mostra meno',
		seeAll: 'Vedi tutte le recensioni',
		prevAria: 'Recensione precedente',
		nextAria: 'Recensione successiva',
		outOfFiveStars: 'su 5 stelle'
	},
	// Lead capture form
	leadForm: {
		title: 'Blocca la data del tuo evento',
		subtitle: 'Compila il modulo e ti risponderemo il prima possibile.',
		nameLabelInput: 'Nome e cognome *',
		emailLabelInput: 'Indirizzo email *',
		phoneLabelInput: 'Telefono / WhatsApp *',
		eventDateLabel: "Data dell'evento *",
		commentsLabel: 'Domande o commenti',
		commentsPlaceholder:
			'Raccontaci del tuo evento: location, numero di ospiti, esigenze particolari...',
		submitBtn: 'Verifica la disponibilità della data',
		submitting: 'Invio in corso...',
		errorRequired: 'Questo campo è obbligatorio.',
		errorEmail: 'Inserisci un indirizzo email valido.',
		errorPhone: 'Inserisci un numero di telefono valido.',
		errorDateFuture: "La data dell'evento deve essere una data futura.",
		errorMinLength: 'Deve contenere almeno 2 caratteri.',
		errorMaxLength: 'Massimo 1000 caratteri consentiti.',
		errorHoneypot: 'Spam rilevato.',
		noCardRequired: 'Nessuna carta di credito richiesta per verificare la disponibilità',
		quickResponseNote: 'Risposta il prima possibile',
		errorSubmit: 'Si è verificato un errore. Riprova oppure contattaci direttamente.',
		errorTurnstile: 'Verifica di sicurezza non riuscita. Riprova.',
		errorRateLimited: 'Troppe richieste. Attendi qualche minuto e riprova.',
		emailFailTitle: 'Non siamo riusciti a inviare la tua conferma',
		emailFailBody:
			"La tua richiesta è stata salvata, ma il nostro sistema di posta non è riuscito a inviarla. Contatta direttamente il nostro team, così la tua richiesta non andrà persa.",
		emailFailAction: 'Contatta il team',
		emailFailDismiss: 'Chiudi',
		countryCode: 'Prefisso internazionale',
		responseTime: 'Rispondiamo il prima possibile',
		trustBadge: 'Oltre 500 eventi realizzati a Malaga'
	},
	// Thank-you page
	thankYou: {
		headline: 'Grazie! La tua richiesta è stata inviata.',
		subheadline: 'Abbiamo ricevuto la tua richiesta e ti risponderemo il prima possibile.',
		responseTime: 'Tempo di risposta previsto: il prima possibile',
		backToPackages: 'Sfoglia tutti i pacchetti',
		whatsappCta: 'Oppure contattaci subito su WhatsApp',
		leadLabel: 'Riferimento'
	},
	// Gallery
	gallery: {
		titleHome: 'I nostri eventi in azione',
		titlePackage: 'Eventi realizzati con il {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Posizione e profilo Google',
		title: 'Trovaci su Google',
		subtitle: 'Visita il nostro profilo ufficiale Google Business o scopri dove ci troviamo a Malaga.',
		viewOnGoogle: 'Vedi su Google Maps',
		mapTitle: 'Malaga Event Gear - Profilo Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			"Noleggio di impianti audio, illuminazione e schermi di alta gamma per eventi esclusivi a Malaga e sulla Costa del Sol. Attrezzature all'avanguardia e assistenza tecnica su misura.",
		usefulLinks: 'Link utili',
		home: 'Home',
		packages: 'Pacchetti',
		blog: 'Blog',
		news: 'Notizie',
		categories: 'Categorie',
		aboutUs: 'Chi siamo',
		meetTheTeam: 'Il nostro team',
		contactUs: 'Contattaci',
		termsOfService: 'Termini e condizioni',
		privacyPolicy: 'Informativa sulla privacy',
		cookiePolicy: 'Informativa sui cookie',
		gdpr: 'GDPR',
		faq: 'FAQ',
		sitemap: 'Mappa del sito',
		servicePackages: 'I nostri pacchetti',
		localAddress: 'Indirizzo',
		listings: 'Schede e directory',
		onlinePresence: 'Presenza online',
		moreInformation: 'Maggiori informazioni',
		moreInfoText:
			'Hai bisogno di maggiori dettagli? Contattaci per informazioni sul noleggio delle nostre attrezzature per eventi, sui prezzi e sulla disponibilità.',
		tel: 'Tel',
		clickToChat: 'Scrivici in chat',
		emails: 'Email',
		forHire: 'Per noleggi',
		forContact: 'Per contatti',
		forLegal: 'Per questioni legali',
		allRightsReserved: 'Tutti i diritti riservati.',
		developedBy: 'Sviluppato da',
		lorenzozTitle: 'Lorenzoz Agency: agenzia di sviluppo web e soluzioni aziendali',
		mailAriaLabel: 'Invia email',
		callAriaLabel: 'Chiama Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Notizie',
		byAuthor: 'Di',
		updated: 'Aggiornato',
		shareInlineLabel: 'Condividi:',
		shareSidebarLabel: 'CONDIVIDI',
		shareDrawerTitle: 'Condividi questo articolo',
		copiedShort: 'Copiato!',
		copiedExclaim: 'Copiato!',
		copyShort: 'Copia link',
		copyLink: 'Copia link',
		shareOnAria: 'Condividi su {network}',
		copyLinkAria: 'Copia il link negli appunti',
		openSharingAria: 'Apri le opzioni di condivisione',
		closeSharingAria: 'Chiudi le opzioni di condivisione',
		tweetLabel: 'Tweet',
		tweetAria: 'Twitta questa selezione',
		packagesSidebarAria: 'Barra laterale dei pacchetti evento',
		tocSidebarAria: "Barra laterale dell'indice"
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chatta con noi'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Pagina non trovata',
		genericHeading: 'Si è verificato un errore',
		notFoundBody:
			'La pagina che stai cercando non esiste o è stata spostata. Riparti dalla homepage oppure contattaci.',
		genericBody:
			"Si è verificato un problema nell'elaborazione della tua richiesta. Torna alla homepage oppure contattaci: risolveremo tutto.",
		contactUs: 'Contattaci',
		backHome: 'Torna alla home'
	}
} satisfies Messages;

export default t;
