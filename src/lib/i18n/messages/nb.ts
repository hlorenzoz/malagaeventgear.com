import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Utstyr',
		packages: 'Pakker',
		blog: 'Blogg',
		contact: 'Kontakt',
		bookNow: 'Bestill nå',
		blogInEnglish: 'Blogg (på engelsk)',
		language: 'Språk',
		breadcrumbs: 'Brødsmulesti',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Bytt fargetema',
		openMenu: 'Åpne navigasjonsmenyen'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Vi svarer på engelsk eller spansk.',
		legalTranslation:
			'Dette er en oversettelse. Hvis den avviker fra den engelske versjonen, gjelder den engelske versjonen.',
		readEnglish: 'Les den engelske versjonen'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Hjem',
		packages: 'Pakker',
		blog: 'Blogg',
		categories: 'Kategorier',
		category: 'Kategori',
		author: 'Forfatter',
		contact: 'Kontakt',
		'about-us': 'Om oss',
		faq: 'Ofte stilte spørsmål',
		'privacy-policy': 'Personvernerklæring',
		'terms-of-service': 'Vilkår og betingelser',
		'cookie-policy': 'Cookieerklæring',
		gdpr: 'GDPR',
		'meet-the-team': 'Møt teamet',
		equipment: 'Utstyr',
		sitemap: 'Nettstedskart',
		'thank-you': 'Takk'
	},
	// Hero
	hero: {
		span: 'For alle typer arrangementer',
		titlePart1: 'Leie av',
		titleGradient: 'AV-utstyr',
		titlePart2: 'i Malaga',
		subtitle:
			'Opplev krystallklar lyd og imponerende lys med vårt førsteklasses utstyr. Perfekt for bryllup, bedriftsarrangementer og eksklusive fester på Costa del Sol.',
		viewPricing: 'Se priser',
		contactUs: 'Kontakt oss'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Feilfri installasjon',
		card1Text:
			'Dedikert teknisk support som sikrer at arrangementet ditt går knirkefritt fra start til slutt, helt uten bekymringer.',
		card2Title: '#2 Skreddersydde pakker',
		card2Text: 'Fleksible leiepakker tilpasset ethvert arrangement, uansett størrelse, lokale og budsjett.',
		card3Title: '#3 Toppmoderne teknologi',
		card3Text: 'Nyt lyd- og bildeutstyr i toppklasse som løfter både bilde- og lydkvaliteten på produksjonen din.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'Kort fortalt',
		sellQ: 'Hva selger vi?',
		sellA:
			'Vi leier ut profesjonelt lyd- og bildeutstyr, som lydanlegg, scenelys, prosjektorer og lerret, til arrangementer i Malaga og på Costa del Sol, inkludert levering, installasjon og teknisk support på stedet.',
		whoQ: 'Hvem er det for?',
		whoA:
			'Par som planlegger bryllup, bedrifter som arrangerer konferanser og bedriftsarrangementer, og alle som skal ha fest eller privat feiring og ønsker feilfri lyd og lys uten å kjøpe utstyret selv.',
		costQ: 'Hva koster det?',
		costA:
			'Faste pakkepriser uten skjulte gebyrer, tilpasset størrelsen på arrangementet ditt, i tillegg til skreddersydde tilbud for større produksjoner.',
		costFrom: 'Fra',
		howQ: 'Hvordan fungerer det?',
		howA:
			'Fire enkle trinn: velg pakken din, be om et tilbud, vi bekrefter og forbereder utstyret, og teamet vårt leverer og setter opp alt på selve arrangementsdagen.'
	},
	// Impact
	impact: {
		title: 'Våre resultater i tall',
		years: 'Års erfaring',
		clients: 'Fornøyde kunder',
		satisfaction: 'Kundetilfredshet'
	},
	// Categories
	categories: {
		badge: 'Utstyr i toppklasse',
		title: 'Tilgjengelige kategorier',
		soundTitle: 'Lydanlegg',
		soundText:
			'Krystallklar lyd i høy kvalitet, perfekt for intime bryllup eller store bedriftskonferanser. Vi samarbeider med ledende merker for å sikre høyeste akustiske kvalitet.',
		lightTitle: 'Lys',
		lightText: 'Dynamiske lysløsninger som skaper den perfekte stemningen i lokalet ditt.',
		visualTitle: 'Prosjektorer og lerret',
		visualText: 'Skarpe bilder i høy oppløsning til presentasjoner med stort visuelt inntrykk.',
		fxTitle: 'Spesialeffekter og røykmaskiner',
		fxText:
			'Skap en imponerende stemning på arrangementet ditt med våre profesjonelle spesialeffekter og røykmaskiner.',
		bookEquipment: 'Bestill pakker'
	},
	// Pricing
	pricing: {
		badge: 'Åpne priser',
		title: 'Skreddersydde pakker for alle arrangementer',
		subtitle:
			'Velg blant våre fleksible leiepakker, tilpasset ethvert arrangement og budsjett. Vi gjør planleggingen enkel!',
		includes: 'Inkluderer:',
		includedServices: 'Inkluderte tjenester:',
		optional: 'Valgfritt:',
		check: 'Sjekk tilgjengelighet',
		mostPopular: 'Mest populær',
		from: 'Fra',
		plusVat: '(+{vat} MVA)',
		plusVatShort: '(+MVA)',
		bookPack: 'Bestill'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filter',
		clearAll: 'Fjern alle',
		resetFilters: 'Tilbakestill filter',
		showingResults: 'Viser {visible} av {total} pakker',
		noResults: 'Ingen pakker samsvarer med filtrene dine. Prøv å fjerne noen valg!',
		openFilters: 'Filter',
		done: 'Vis resultater',
		purpose: 'Type arrangement',
		capacity: 'Arrangementets størrelse',
		price: 'Budsjett',
		equipment: 'Inkludert utstyr',
		extras: 'Valgfrie tillegg',
		sortBy: 'Sorter etter',
		party: 'Fester',
		wedding: 'Bryllup',
		corporate: 'Bedrift',
		presentation: 'Presentasjoner',
		meeting: 'Møter',
		small: 'Liten (opptil 50 gjester)',
		medium: 'Middels (51 til 80 gjester)',
		large: 'Stor (80+ gjester)',
		priceLow: 'Opptil {price:budgetLow}',
		priceMid: '{price:budgetLow} til {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} og oppover',
		transport: 'Transport og installasjon',
		screen: 'Lerret / skjerm',
		sound: 'Lydanlegg',
		microphone: 'Mikrofoner',
		lighting: 'Stemningslys',
		technician: 'Tekniker på stedet',
		projector: 'Prosjektor',
		smokeMachine: 'Røykmaskin',
		technicalAssistant: 'Teknisk assistent',
		lectern: 'Talerstol',
		staging: 'Scene',
		recommended: 'Anbefalt',
		priceAsc: 'Pris: lav til høy',
		priceDesc: 'Pris: høy til lav'
	},
	// Contact
	contact: {
		badge: 'Umiddelbar respons hele døgnet',
		title: 'Ta kontakt',
		subtitle:
			'Klar til å løfte arrangementet ditt? Kontakt vårt tekniske team for skreddersydde tilbud, sjekk av utstyrets tilgjengelighet og faglige råd.',
		detailsTitle: 'Kontaktinformasjon',
		phone: 'Telefon',
		whatsapp: 'WhatsApp',
		email: 'E-post',
		location: 'Beliggenhet',
		hours: 'Åpningstider',
		hoursText: 'Teknisk support og logistikk hele døgnet, alle ukens dager.',
		reqTitle: 'Be om et tilbud',
		formName: 'Fullt navn *',
		formEmail: 'E-postadresse *',
		formPhone: 'Kontakttelefon',
		formDate: 'Arrangementsdato',
		formType: 'Type arrangement',
		formTypeWedding: 'Bryllup / feiring',
		formTypeCorporate: 'Bedriftsarrangement',
		formTypeParty: 'Privat fest',
		formTypeMice: 'Konferanse / MICE',
		formTypeOther: 'Annen type arrangement',
		formMessage: 'Detaljer om arrangementet og tekniske krav *',
		formSubmit: 'Send forespørsel',
		formSubmitting: 'Sender...',
		formRequiredError: 'Fyll ut alle obligatoriske felt.',
		formErrorSubmit: 'Noe gikk galt da forespørselen din skulle sendes. Prøv igjen eller send oss en e-post direkte.',
		formErrorTurnstile: 'Sikkerhetsverifiseringen mislyktes. Prøv igjen.',
		formErrorRateLimited: 'For mange forespørsler. Vent noen minutter og prøv igjen.',
		lockedFieldNote: 'Automatisk generert fra en feil. Dette feltet kan ikke redigeres.',
		errorPrefillMessage:
			'Hei, jeg sendte inn en pakkeforespørsel på nettsiden deres, men bekreftelses-e-posten ble ikke sendt. Kan dere bekrefte at dere har mottatt henvendelsen min? Referanse: {ref}',
		errorDetailsHeader: 'Innsendte opplysninger:',
		errorDetailSource: 'Skjema-URL',
		errorDetailName: 'Navn',
		errorDetailEmail: 'E-post',
		errorDetailPhone: 'Telefon',
		errorDetailDate: 'Arrangementsdato',
		errorDetailPackage: 'Pakke',
		errorDetailComments: 'Kommentarer',
		successTitle: 'Forespørsel om tilbud sendt!',
		successText1: 'Hei',
		successText2:
			'vi har mottatt forespørselen din. Vårt tekniske team i Malaga vil vurdere den og kontakte deg på e-post (',
		successText3: ') så snart som mulig.',
		successButton: 'Send en ny forespørsel',
		faqTitle: 'Ofte stilte spørsmål'
	},
	// Packages Showcase.
	packages: {
		badge: 'Utvalgte pakker',
		title: 'Velg din perfekte pakke',
		subtitle: 'Skreddersydd for enhver anledning. Alle pakker inkluderer transport, installasjon og teknisk support på stedet.',
		enquire: 'Be om et tilbud'
	},
	// How It Works
	process: {
		badge: 'Slik fungerer det',
		title: 'Arrangementet ditt i 4 enkle trinn',
		s1Title: 'Velg pakken din',
		s1Desc: 'Bla gjennom pakkene våre og velg den som passer størrelsen og stilen til arrangementet ditt.',
		s2Title: 'Be om et tilbud',
		s2Desc: 'Fyll ut vårt raske skjema. Vi svarer så snart som mulig med full oversikt over tilgjengelighet.',
		s3Title: 'Bekreft og planlegg',
		s3Desc: 'Teamet vårt bekrefter logistikk, tilgang til lokalet og alle tekniske detaljer.',
		s4Title: 'Nyt arrangementet ditt',
		s4Desc: 'Vi tar hånd om installasjonen, kjører showet og pakker sammen alt igjen. Null stress for deg.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Åpne priser',
		title: 'Enkle priser, alt inkludert',
		subtitle: 'Ingen skjulte gebyrer. Transport, installasjon og teknisk support er alltid inkludert.',
		viewAll: 'Se alle pakker'
	},
	// FAQ
	faq: {
		badge: 'Ofte stilte spørsmål',
		title: 'Vanlige spørsmål'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Kundeanmeldelser',
		title: 'Ekte historier fra ekte arrangementer',
		subtitle: 'Verifiserte Google-anmeldelser fra kunder langs Costa del Sol.',
		ratingLabel: 'UTMERKET',
		basedOn: 'Basert på {n} anmeldelser',
		poweredBy: 'Viser våre nyeste anmeldelser',
		readMore: 'Les mer',
		readLess: 'Vis mindre',
		seeAll: 'Se alle anmeldelser',
		prevAria: 'Forrige anmeldelse',
		nextAria: 'Neste anmeldelse',
		outOfFiveStars: 'av 5 stjerner'
	},
	// Lead capture form
	leadForm: {
		title: 'Sikre datoen for arrangementet ditt',
		subtitle: 'Fyll ut skjemaet, så svarer vi så snart som mulig.',
		nameLabelInput: 'Fullt navn *',
		emailLabelInput: 'E-postadresse *',
		phoneLabelInput: 'Telefon / WhatsApp *',
		eventDateLabel: 'Arrangementsdato *',
		commentsLabel: 'Spørsmål eller kommentarer',
		commentsPlaceholder: 'Fortell oss om arrangementet ditt: lokale, antall gjester, spesielle ønsker...',
		submitBtn: 'Sjekk om datoen er ledig',
		submitting: 'Sender...',
		errorRequired: 'Dette feltet er obligatorisk.',
		errorEmail: 'Skriv inn en gyldig e-postadresse.',
		errorPhone: 'Skriv inn et gyldig telefonnummer.',
		errorDateFuture: 'Arrangementsdatoen må være i fremtiden.',
		errorMinLength: 'Må være minst 2 tegn.',
		errorMaxLength: 'Maks 1000 tegn tillatt.',
		errorHoneypot: 'Spam oppdaget.',
		noCardRequired: 'Du trenger ikke kredittkort for å sjekke tilgjengelighet',
		quickResponseNote: 'Svar så snart som mulig',
		errorSubmit: 'Noe gikk galt. Prøv igjen eller kontakt oss direkte.',
		errorTurnstile: 'Sikkerhetsverifiseringen mislyktes. Prøv igjen.',
		errorRateLimited: 'For mange forespørsler. Vent noen minutter og prøv igjen.',
		emailFailTitle: 'Vi kunne ikke sende bekreftelsen din',
		emailFailBody:
			'Forespørselen din ble lagret, men e-postsystemet vårt klarte ikke å sende den. Kontakt teamet vårt direkte, slik at vi ikke mister henvendelsen din.',
		emailFailAction: 'Kontakt teamet',
		emailFailDismiss: 'Lukk',
		countryCode: 'Landskode',
		responseTime: 'Vi svarer så snart som mulig',
		trustBadge: 'Valgt av {clients} fornøyde kunder'
	},
	// Thank-you page
	thankYou: {
		headline: 'Takk! Forespørselen din er på vei.',
		subheadline: 'Vi har mottatt henvendelsen din og svarer så snart som mulig.',
		responseTime: 'Forventet svar: så snart som mulig',
		backToPackages: 'Bla gjennom alle pakker',
		whatsappCta: 'Eller nå oss direkte på WhatsApp',
		leadLabel: 'Referanse'
	},
	// Gallery
	gallery: {
		titleHome: 'Våre arrangementer i aksjon',
		titlePackage: 'Tidligere {pack}-arrangementer'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Beliggenhet og Google-profil',
		title: 'Finn oss på Google',
		subtitle: 'Besøk vår offisielle Google Business-profil eller se hvor vi holder til i Malaga.',
		viewOnGoogle: 'Vis på Google Maps',
		mapTitle: 'Malaga Event Gear | Google Business-profil'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Utleie av lyd, lys og skjermer i toppklasse til eksklusive arrangementer i Malaga og på Costa del Sol. Moderne utstyr og skreddersydd teknisk support.',
		usefulLinks: 'Nyttige lenker',
		home: 'Hjem',
		packages: 'Pakker',
		blog: 'Blogg',
		news: 'Nyheter',
		categories: 'Kategorier',
		aboutUs: 'Om oss',
		meetTheTeam: 'Møt teamet',
		contactUs: 'Kontakt oss',
		termsOfService: 'Vilkår og betingelser',
		privacyPolicy: 'Personvernerklæring',
		cookiePolicy: 'Cookieerklæring',
		gdpr: 'GDPR',
		faq: 'Ofte stilte spørsmål',
		sitemap: 'Nettstedskart',
		servicePackages: 'Tjenestepakker',
		localAddress: 'Lokal adresse',
		listings: 'Oppføringer',
		onlinePresence: 'Nettilstedeværelse',
		moreInformation: 'Mer informasjon',
		moreInfoText: 'Trenger du flere detaljer? Kontakt oss for informasjon om utleie av utstyr, priser og tilgjengelighet.',
		tel: 'Tlf.',
		clickToChat: 'Klikk for å chatte',
		emails: 'E-postadresser',
		forHire: 'For utleie',
		forContact: 'For kontakt',
		forLegal: 'For juridiske henvendelser',
		allRightsReserved: 'Med enerett.',
		developedBy: 'Utviklet av',
		lorenzozTitle: 'Lorenzoz Agency: nettutviklingsbyrå og forretningsløsninger',
		mailAriaLabel: 'Send e-post',
		callAriaLabel: 'Ring Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Nyheter',
		byAuthor: 'Av',
		updated: 'Oppdatert',
		shareInlineLabel: 'Del dette:',
		shareSidebarLabel: 'DEL DETTE',
		shareDrawerTitle: 'Del dette innlegget',
		copiedShort: 'Kopiert!',
		copiedExclaim: 'Kopiert!',
		copyShort: 'Kopier lenke',
		copyLink: 'Kopier lenke',
		shareOnAria: 'Del på {network}',
		copyLinkAria: 'Kopier lenken til utklippstavlen',
		openSharingAria: 'Åpne delingsalternativer',
		closeSharingAria: 'Lukk delingsalternativer',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweet den markerte teksten',
		packagesSidebarAria: 'Sidefelt for arrangementspakker',
		tocSidebarAria: 'Sidefelt for innholdsfortegnelse'
	},
	blogStructure: {
		faqHeadings: ['Ofte stilte spørsmål'],
		overviewHeadings: ['Kort oversikt'],
		highlightsHeadings: ['Det viktigste'],
		testimonialsHeadings: ['Kundeomtaler'],
		tocHeadings: ['Innholdsfortegnelse'],
		inThisArticle: 'I denne artikkelen',
		tocAria: 'Innholdsfortegnelse',
		faqAria: 'Ofte stilte spørsmål'
	},
	postCta: {
		aria: 'Pakkeforslag til arrangementet ditt',
		headline: {
			wedding: 'Planlegger du et bryllup i Malaga?',
			'basic-mice': 'Arrangerer du et firmaarrangement?',
			mice: 'Trenger du førsteklasses AV-støtte til MICE?',
			'product-presentation': 'Lanserer du et produkt eller holder du en presentasjon?',
			eco: 'Planlegger du en privat fest?'
		},
		subline: {
			wedding: 'Velg {name}: profesjonell lyd og romantisk belysning til den store dagen.',
			'basic-mice': 'Velg {name}: tydelig lyd og bilde til ledermøter og konferanser.',
			mice: 'Velg {name}: førsteklasses LED-skjerm, lyd og en tekniker på stedet.',
			'product-presentation': 'Velg {name}: lyssterk projektor, lerret og lyd til presentasjoner som gjør inntrykk.',
			eco: 'Velg {name}: solid lyd og stemningsbelysning for opptil {guests} gjester.'
		},
		priceFrom: 'Fra {price}',
		viewPackage: 'Se {name}',
		freeQuote: 'Be om et gratis tilbud'
	},
	packagesRail: {
		title: 'Våre pakker',
		aria: 'Arrangementspakker',
		priceFrom: 'fra {price}'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chat med oss'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Siden ble ikke funnet',
		genericHeading: 'Noe gikk galt',
		notFoundBody: 'Siden du leter etter finnes ikke eller er flyttet. Start på forsiden eller ta kontakt med oss.',
		genericBody: 'Vi støtte på et problem da forespørselen din skulle behandles. Gå tilbake til forsiden eller kontakt oss, så ordner vi det.',
		contactUs: 'Kontakt oss',
		backHome: 'Til forsiden'
	}
} satisfies Messages;

export default t;
