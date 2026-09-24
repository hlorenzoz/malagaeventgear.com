import type { Messages } from './en';

/** Italian UI dictionary. Same shape as en.ts (`satisfies Messages`). */
const t = {
	// Navigation
	nav: {
		equipment: 'Attrezzature',
		packages: 'Pacchetti',
		blog: 'Blog',
		contact: 'Contatti',
		bookNow: 'Prenota Ora',
		blogInEnglish: 'Blog (in inglese)',
		language: 'Lingua',
		breadcrumbs: 'Percorso di navigazione',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Cambia il tema dei colori',
		openMenu: 'Apri il menu di navigazione'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Rispondiamo in inglese o spagnolo.',
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
		'about-us': 'Chi Siamo',
		faq: 'FAQ',
		'privacy-policy': 'Informativa sulla Privacy',
		'terms-of-service': 'Termini di Servizio',
		'cookie-policy': 'Informativa sui Cookie',
		gdpr: 'GDPR',
		'meet-the-team': 'Il Nostro Team',
		equipment: 'Attrezzature',
		sitemap: 'Mappa del Sito',
		'thank-you': 'Grazie'
	},
	// Hero
	hero: {
		span: 'Per Ogni Tipo di Evento',
		titlePart1: 'Servizio di',
		titleGradient: 'Noleggio Attrezzature Audiovisive',
		titlePart2: 'a Malaga',
		subtitle:
			"Vivi un suono cristallino e un'illuminazione spettacolare con le nostre attrezzature di alta gamma. Perfetto per matrimoni, eventi aziendali e feste esclusive sulla Costa del Sol.",
		viewPricing: 'Vedi i Prezzi',
		contactUs: 'Contattaci'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Allestimento Impeccabile',
		card1Text:
			"Assistenza tecnica dedicata per garantire che il tuo evento si svolga senza intoppi dall'inizio alla fine.",
		card2Title: '#2 Pacchetti su Misura',
		card2Text:
			'Pacchetti di noleggio flessibili, pensati per adattarsi perfettamente a qualsiasi dimensione di evento, location e budget.',
		card3Title: "#3 Tecnologia all'Avanguardia",
		card3Text:
			"Goditi attrezzature audiovisive all'avanguardia che elevano la qualità visiva e sonora della tua produzione."
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'In Breve',
		sellQ: 'Cosa offriamo?',
		sellA:
			'Noleggiamo attrezzature audiovisive di alta gamma, impianti audio professionali, illuminazione per palco, proiettori e schermi, per eventi in tutta Malaga e sulla Costa del Sol, inclusi consegna, allestimento e assistenza tecnica in loco.',
		whoQ: 'A chi è rivolto?',
		whoA:
			"Coppie che organizzano matrimoni, aziende che gestiscono conferenze ed eventi aziendali, e chiunque organizzi una festa o una celebrazione privata e desideri un suono e un'illuminazione impeccabili senza dover acquistare le attrezzature.",
		costQ: 'Quanto costa?',
		costA:
			'pacchetti a prezzo fisso senza costi nascosti, calibrati sulla dimensione del tuo evento, oltre a preventivi su misura per produzioni più grandi.',
		costFrom: 'A partire da',
		howQ: 'Come funziona?',
		howA:
			'Quattro semplici passi: scegli il tuo pacchetto, richiedi un preventivo, confermiamo e prepariamo le attrezzature, e il nostro team consegna e allestisce tutto il giorno del tuo evento.'
	},
	// Impact
	impact: {
		title: 'I Nostri Numeri',
		years: 'Anni di Esperienza',
		clients: 'Clienti Soddisfatti',
		satisfaction: 'Tasso di Soddisfazione'
	},
	// Categories
	categories: {
		badge: 'Attrezzature Premium',
		title: 'Categorie Disponibili',
		soundTitle: 'Impianti Audio',
		soundText:
			'Un suono cristallino ad alta fedeltà, ideale per matrimoni intimi o grandi conferenze aziendali. Lavoriamo con marchi leader per garantire la massima fedeltà acustica.',
		lightTitle: 'Illuminazione',
		lightText:
			"Soluzioni di illuminazione dinamica per creare l'atmosfera perfetta nella tua location.",
		visualTitle: 'Proiettori e Schermi',
		visualText: 'Immagini nitide e ad alta definizione per presentazioni dal forte impatto visivo.',
		fxTitle: 'Effetti Speciali e Macchine del Fumo',
		fxText:
			"Crea un'atmosfera spettacolare al tuo evento con i nostri effetti speciali e macchine del fumo di livello professionale.",
		bookEquipment: 'Prenota i Pacchetti'
	},
	// Pricing
	pricing: {
		badge: 'Prezzi Trasparenti',
		title: 'Pacchetti su Misura per Ogni Evento',
		subtitle:
			'Scegli tra i nostri pacchetti di noleggio flessibili, pensati per adattarsi perfettamente a qualsiasi dimensione di evento e budget. Semplifichiamo la pianificazione!',
		includes: 'Include:',
		includedServices: 'Servizi Inclusi:',
		optional: 'Opzionale:',
		check: 'Verifica Disponibilità',
		mostPopular: 'Il Più Richiesto',
		from: 'A partire da',
		plusVat: '(+21% IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Prenota'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtri',
		clearAll: 'Cancella tutto',
		resetFilters: 'Reimposta Filtri',
		showingResults: 'Mostrando {visible} di {total} pacchetti',
		noResults: 'Nessun pacchetto corrisponde ai tuoi filtri. Prova a rimuovere qualche selezione!',
		openFilters: 'Filtri',
		done: 'Mostra risultati',
		purpose: 'Tipo di Evento',
		capacity: 'Dimensione Evento',
		price: 'Budget',
		equipment: 'Attrezzature Incluse',
		extras: 'Extra Opzionali',
		sortBy: 'Ordina per',
		party: 'Feste',
		wedding: 'Matrimoni',
		corporate: 'Aziendale',
		presentation: 'Presentazioni',
		meeting: 'Riunioni',
		small: 'Piccolo (fino a 50 ospiti)',
		medium: 'Medio (51-80 ospiti)',
		large: 'Grande (80+ ospiti)',
		priceLow: 'Fino a 300€',
		priceMid: '300€ a 500€',
		priceHigh: 'Oltre 500€',
		transport: 'Trasporto e Allestimento',
		screen: 'Schermo / Display',
		sound: 'Impianto Audio',
		microphone: 'Microfoni',
		lighting: 'Illuminazione Ambientale',
		technician: 'Tecnico dal Vivo',
		projector: 'Proiettore',
		smokeMachine: 'Macchina del Fumo',
		technicalAssistant: 'Assistente Tecnico',
		lectern: 'Leggio',
		staging: 'Palco',
		recommended: 'Consigliato',
		priceAsc: 'Prezzo: dal più basso al più alto',
		priceDesc: 'Prezzo: dal più alto al più basso'
	},
	// Contact
	contact: {
		badge: 'Risposta Immediata 24/7',
		title: 'Mettiti in Contatto',
		subtitle:
			'Pronto a valorizzare il tuo evento? Contatta il nostro team tecnico per ricevere preventivi su misura, verificare la disponibilità delle attrezzature e ottenere consigli da esperti.',
		detailsTitle: 'Dettagli di Contatto',
		phone: 'Telefono',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Posizione',
		hours: 'Orari di Attività',
		hoursText: 'Assistenza tecnica e logistica 24 ore su 24, 7 giorni su 7.',
		reqTitle: 'Richiedi un Preventivo',
		formName: 'Nome Completo *',
		formEmail: 'Indirizzo Email *',
		formPhone: 'Telefono di Contatto',
		formDate: "Data dell'Evento",
		formType: 'Tipo di Evento',
		formTypeWedding: 'Matrimonio / Celebrazione',
		formTypeCorporate: 'Evento Aziendale',
		formTypeParty: 'Festa Privata',
		formTypeMice: 'Conferenza / MICE',
		formTypeOther: 'Altro tipo di evento',
		formMessage: "Dettagli dell'Evento e Requisiti Tecnici *",
		formSubmit: 'Invia Richiesta',
		formSubmitting: 'Invio in corso...',
		formRequiredError: 'Compila tutti i campi obbligatori.',
		formErrorSubmit:
			"Si è verificato un errore nell'invio della tua richiesta. Riprova oppure scrivici direttamente via email.",
		formErrorTurnstile: 'Verifica di sicurezza non riuscita. Riprova.',
		formErrorRateLimited: 'Troppe richieste. Attendi qualche minuto e riprova.',
		lockedFieldNote:
			'Generato automaticamente da un errore: questo campo non può essere modificato.',
		errorPrefillMessage:
			"Ciao, ho inviato una richiesta per un pacchetto sul vostro sito ma l'email di conferma non è arrivata. Potreste confermarmi di aver ricevuto la mia richiesta? Riferimento: {ref}",
		errorDetailsHeader: 'Dettagli inviati:',
		errorDetailSource: 'URL del Modulo',
		errorDetailName: 'Nome',
		errorDetailEmail: 'Email',
		errorDetailPhone: 'Telefono',
		errorDetailDate: "Data dell'evento",
		errorDetailPackage: 'Pacchetto',
		errorDetailComments: 'Commenti',
		successTitle: 'Preventivo Richiesto!',
		successText1: 'Ciao',
		successText2:
			'abbiamo ricevuto correttamente la tua richiesta. Il nostro team tecnico a Malaga la valuterà e ti contatterà via email (',
		successText3: ') il prima possibile.',
		successButton: "Invia un'altra richiesta",
		faqTitle: 'Domande Frequenti'
	},
	// Packages Showcase.
	packages: {
		badge: 'Pacchetti in Evidenza',
		title: 'Scegli il Tuo Pacchetto Ideale',
		subtitle:
			'Su misura per ogni occasione. Tutti i pacchetti includono trasporto, allestimento e assistenza tecnica in loco.',
		enquire: 'Richiedi un Preventivo'
	},
	// How It Works
	process: {
		badge: 'Come Funziona',
		title: 'Il Tuo Evento in 4 Semplici Passi',
		s1Title: 'Scegli il Tuo Pacchetto',
		s1Desc:
			'Sfoglia i nostri pacchetti e scegli quello più adatto alla dimensione e allo stile del tuo evento.',
		s2Title: 'Richiedi un Preventivo',
		s2Desc:
			'Compila il nostro modulo rapido. Ti risponderemo il prima possibile con la disponibilità completa.',
		s3Title: 'Conferma e Pianifica',
		s3Desc: "Il nostro team conferma la logistica, l'accesso alla location e ogni dettaglio tecnico.",
		s4Title: 'Goditi il Tuo Evento',
		s4Desc: "Ci occupiamo dell'allestimento, gestiamo lo show e rimontiamo tutto. Zero stress per te."
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Prezzi Trasparenti',
		title: 'Prezzi Semplici e Tutto Incluso',
		subtitle: 'Nessun costo nascosto. Trasporto, allestimento e assistenza tecnica sempre inclusi.',
		viewAll: 'Vedi Tutti i Pacchetti'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Domande Comuni'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Recensioni dei Clienti',
		title: 'Storie Vere da Eventi Veri',
		subtitle: 'Recensioni Google verificate da clienti di tutta la Costa del Sol.',
		ratingLabel: 'ECCELLENTE',
		basedOn: 'Basato su {n} recensioni',
		poweredBy: 'Le nostre recensioni più recenti',
		readMore: 'Leggi tutto',
		readLess: 'Leggi meno',
		seeAll: 'Vedi tutte le recensioni',
		prevAria: 'Recensione precedente',
		nextAria: 'Recensione successiva',
		outOfFiveStars: 'su 5 stelle'
	},
	// Lead capture form
	leadForm: {
		title: 'Blocca la Data del Tuo Evento',
		subtitle: 'Compila il modulo e ti risponderemo il prima possibile.',
		nameLabelInput: 'Nome Completo *',
		emailLabelInput: 'Indirizzo Email *',
		phoneLabelInput: 'Telefono / WhatsApp *',
		eventDateLabel: "Data dell'Evento *",
		commentsLabel: 'Domande o Commenti',
		commentsPlaceholder:
			'Raccontaci del tuo evento: location, numero di ospiti, esigenze particolari...',
		submitBtn: 'Verifica Disponibilità Data',
		submitting: 'Invio in corso...',
		errorRequired: 'Questo campo è obbligatorio.',
		errorEmail: 'Inserisci un indirizzo email valido.',
		errorPhone: 'Inserisci un numero di telefono valido.',
		errorDateFuture: "La data dell'evento deve essere futura.",
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
			"La tua richiesta è stata salvata, ma il nostro sistema di posta non è riuscito a inviarla. Contatta direttamente il nostro team per non perdere la tua richiesta.",
		emailFailAction: 'Contatta il team',
		emailFailDismiss: 'Chiudi',
		countryCode: 'Prefisso Internazionale',
		responseTime: 'Rispondiamo il prima possibile',
		trustBadge: 'La fiducia di oltre 500 eventi a Malaga'
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
		titleHome: 'I Nostri Eventi in Azione',
		titlePackage: 'Eventi Passati: {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Posizione e Profilo Google',
		title: 'Trovaci su Google',
		subtitle: 'Visita il nostro profilo ufficiale Google Business o guarda la nostra posizione a Malaga.',
		viewOnGoogle: 'Vedi su Google Maps',
		mapTitle: 'Malaga Event Gear - Google Business Profile'
	},
	// Footer
	footer: {
		brandSubtitle:
			"Noleggio di impianti audio, illuminazione e schermi di alta gamma per eventi esclusivi a Malaga e sulla Costa del Sol. Attrezzature all'avanguardia e assistenza tecnica su misura.",
		usefulLinks: 'Link Utili',
		home: 'Home',
		packages: 'Pacchetti',
		blog: 'Blog',
		news: 'Notizie',
		categories: 'Categorie',
		aboutUs: 'Chi Siamo',
		meetTheTeam: 'Il Nostro Team',
		contactUs: 'Contattaci',
		termsOfService: 'Termini di Servizio',
		privacyPolicy: 'Informativa sulla Privacy',
		cookiePolicy: 'Informativa sui Cookie',
		gdpr: 'GDPR',
		faq: 'FAQ',
		sitemap: 'Mappa del Sito',
		servicePackages: 'Pacchetti di Servizio',
		localAddress: 'Indirizzo Locale',
		listings: 'Elenchi',
		onlinePresence: 'Presenza Online',
		moreInformation: 'Maggiori Informazioni',
		moreInfoText:
			'Hai bisogno di maggiori dettagli? Contattaci per informazioni sul noleggio delle nostre attrezzature per eventi, sui prezzi e sulla disponibilità.',
		tel: 'Tel',
		clickToChat: 'Clicca per Chattare',
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
		copyLinkAria: 'Copia link negli appunti',
		openSharingAria: 'Apri opzioni di condivisione',
		closeSharingAria: 'Chiudi opzioni di condivisione',
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
			'La pagina che stai cercando non esiste o è stata spostata. Riprova dalla homepage oppure contattaci.',
		genericBody:
			"Si è verificato un problema nell'elaborazione della tua richiesta. Torna alla homepage oppure contattaci: risolveremo tutto.",
		contactUs: 'Contattaci',
		backHome: 'Torna alla home'
	}
} satisfies Messages;

export default t;
