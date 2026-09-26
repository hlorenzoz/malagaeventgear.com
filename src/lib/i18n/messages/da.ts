import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Udstyr',
		packages: 'Pakker',
		blog: 'Blog',
		contact: 'Kontakt',
		bookNow: 'Book nu',
		blogInEnglish: 'Blog (på engelsk)',
		language: 'Sprog',
		breadcrumbs: 'Brødkrummesti',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Skift farvetema',
		openMenu: 'Åbn navigationsmenuen'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Vi svarer på engelsk eller spansk.',
		legalTranslation:
			'Dette er en oversættelse. Hvis den afviger fra den engelske version, er det den engelske version, der gælder.',
		readEnglish: 'Læs den engelske version'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Forside',
		packages: 'Pakker',
		blog: 'Blog',
		categories: 'Kategorier',
		category: 'Kategori',
		author: 'Forfatter',
		contact: 'Kontakt',
		'about-us': 'Om os',
		faq: 'FAQ',
		'privacy-policy': 'Privatlivspolitik',
		'terms-of-service': 'Vilkår og betingelser',
		'cookie-policy': 'Cookiepolitik',
		gdpr: 'GDPR',
		'meet-the-team': 'Mød teamet',
		equipment: 'Udstyr',
		sitemap: 'Sitemap',
		'thank-you': 'Tak'
	},
	// Hero
	hero: {
		span: 'Til alle typer events',
		titlePart1: 'Leje af',
		titleGradient: 'AV-udstyr',
		titlePart2: 'i Malaga',
		subtitle:
			'Oplev krystalklar lyd og imponerende belysning med vores AV-udstyr i topklasse. Perfekt til bryllupper, virksomhedsevents og eksklusive fester på Costa del Sol.',
		viewPricing: 'Se priser',
		contactUs: 'Kontakt os'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Fejlfri opsætning',
		card1Text:
			'Dedikeret teknisk support, så dit event forløber problemfrit fra start til slut, helt uden bekymringer.',
		card2Title: '#2 Skræddersyede pakker',
		card2Text: 'Fleksible udlejningspakker, der passer perfekt til ethvert event uanset størrelse, lokale og budget.',
		card3Title: '#3 Den nyeste teknologi',
		card3Text: 'Nyd topmoderne AV-udstyr, der løfter både billed- og lydkvaliteten i din produktion.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'Kort fortalt',
		sellQ: 'Hvad sælger vi?',
		sellA:
			'Vi udlejer AV-udstyr i topklasse, herunder professionelle lydsystemer, scenebelysning, projektorer og lærreder, til events i Malaga og på Costa del Sol, inklusive levering, opsætning og teknisk support på stedet.',
		whoQ: 'Hvem er det til?',
		whoA:
			'Par, der planlægger bryllup, virksomheder, der afholder konferencer og firmaevents, og alle, der holder en fest eller privat fejring og ønsker fejlfri lyd og lys uden selv at skulle købe udstyret.',
		costQ: 'Hvad koster det?',
		costA: 'Faste pakkepriser uden skjulte gebyrer, tilpasset dit events størrelse, samt skræddersyede tilbud til større produktioner.',
		costFrom: 'Fra',
		howQ: 'Hvordan foregår det?',
		howA:
			'Fire enkle trin: vælg din pakke, anmod om et tilbud, vi bekræfter og forbereder dit udstyr, og vores team leverer og sætter det hele op på selve eventdagen.'
	},
	// Impact
	impact: {
		title: 'Vores resultater i tal',
		years: 'Års erfaring',
		clients: 'Tilfredse kunder',
		satisfaction: 'Tilfredshedsgrad'
	},
	// Categories
	categories: {
		badge: 'Udstyr i topklasse',
		title: 'Tilgængelige kategorier',
		soundTitle: 'Lydsystemer',
		soundText:
			'Krystalklar lyd i høj kvalitet, ideel til intime bryllupper eller store virksomhedskonferencer. Vi samarbejder med førende mærker for at sikre den bedste akustiske gengivelse.',
		lightTitle: 'Belysning',
		lightText: 'Dynamiske belysningsløsninger, der skaber den perfekte stemning i dit lokale.',
		visualTitle: 'Projektorer og lærreder',
		visualText: 'Skarpe billeder i høj opløsning til præsentationer med stor visuel effekt.',
		fxTitle: 'Røgmaskine',
		fxText: 'Giv dansegulvet eller scenen ekstra stemning med vores professionelle røgmaskine Martin Magnum 650.',
		bookEquipment: 'Book pakker'
	},
	// Pricing
	pricing: {
		badge: 'Gennemsigtige priser',
		title: 'Skræddersyede pakker til ethvert event',
		subtitle:
			'Vælg mellem vores fleksible udlejningspakker, der passer perfekt til ethvert events størrelse og budget. Vi gør planlægningen enkel!',
		includes: 'Inkluderer:',
		includedServices: 'Inkluderede ydelser:',
		optional: 'Valgfrit:',
		check: 'Tjek ledighed',
		mostPopular: 'Mest populær',
		from: 'Fra',
		plusVat: '(+{vat} moms)',
		plusVatShort: '(+moms)',
		bookPack: 'Book'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtre',
		clearAll: 'Ryd alle',
		resetFilters: 'Nulstil filtre',
		showingResults: 'Viser {visible} af {total} pakker',
		noResults: 'Ingen pakker matcher dine filtre. Prøv at fjerne nogle valg!',
		openFilters: 'Filtre',
		done: 'Vis resultater',
		purpose: 'Eventtype',
		capacity: 'Eventstørrelse',
		price: 'Budget',
		equipment: 'Inkluderet udstyr',
		extras: 'Valgfrit tilbehør',
		sortBy: 'Sortér efter',
		party: 'Fester',
		wedding: 'Bryllupper',
		corporate: 'Erhverv',
		presentation: 'Præsentationer',
		meeting: 'Møder',
		small: 'Lille (op til 50 gæster)',
		medium: 'Mellem (51 til 80 gæster)',
		large: 'Stor (80+ gæster)',
		priceLow: 'Op til {price:budgetLow}',
		priceMid: '{price:budgetLow} til {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} og derover',
		transport: 'Transport og opsætning',
		screen: 'Lærred / skærm',
		sound: 'Lydsystem',
		microphone: 'Mikrofoner',
		lighting: 'Stemningsbelysning',
		technician: 'Tekniker på stedet',
		projector: 'Projektor',
		smokeMachine: 'Røgmaskine',
		technicalAssistant: 'Teknisk assistent',
		lectern: 'Talerstol',
		staging: 'Scenepodier',
		recommended: 'Anbefalet',
		priceAsc: 'Pris: lav til høj',
		priceDesc: 'Pris: høj til lav'
	},
	// Contact
	contact: {
		badge: 'Øjeblikkeligt svar, 24/7',
		title: 'Kom i kontakt',
		subtitle:
			'Klar til at løfte dit event? Kontakt vores tekniske team for at få et skræddersyet tilbud, tjekke udstyrets ledighed og få ekspertrådgivning.',
		detailsTitle: 'Kontaktoplysninger',
		phone: 'Telefon',
		whatsapp: 'WhatsApp',
		email: 'E-mail',
		location: 'Adresse',
		hours: 'Åbningstider',
		hoursText: 'Teknisk support og logistik 24 timer i døgnet, 7 dage om ugen.',
		reqTitle: 'Anmod om et tilbud',
		formName: 'Fulde navn *',
		formEmail: 'E-mailadresse *',
		formPhone: 'Kontakttelefon',
		formDate: 'Eventdato',
		formType: 'Eventtype',
		formTypeWedding: 'Bryllup / fejring',
		formTypeCorporate: 'Virksomhedsevent',
		formTypeParty: 'Privat fest',
		formTypeMice: 'Konference / MICE',
		formTypeOther: 'Anden type event',
		formMessage: 'Eventdetaljer og tekniske krav *',
		formSubmit: 'Send anmodning',
		formSubmitting: 'Sender...',
		formRequiredError: 'Udfyld venligst alle påkrævede felter.',
		formErrorSubmit: 'Noget gik galt under afsendelsen af din anmodning. Prøv igen, eller skriv til os direkte på e-mail.',
		formErrorTurnstile: 'Sikkerhedsbekræftelsen mislykkedes. Prøv venligst igen.',
		formErrorRateLimited: 'For mange anmodninger. Vent et par minutter, og prøv igen.',
		lockedFieldNote: 'Genereret automatisk på grund af en fejl. Feltet kan ikke redigeres.',
		errorPrefillMessage:
			'Hej, jeg har indsendt en pakkeanmodning på jeres hjemmeside, men bekræftelsesmailen blev ikke sendt. Kan I bekræfte, at I har modtaget min forespørgsel? Reference: {ref}',
		errorDetailsHeader: 'Indsendte oplysninger:',
		errorDetailSource: 'Formular-URL',
		errorDetailName: 'Navn',
		errorDetailEmail: 'E-mail',
		errorDetailPhone: 'Telefon',
		errorDetailDate: 'Eventdato',
		errorDetailPackage: 'Pakke',
		errorDetailComments: 'Kommentarer',
		successTitle: 'Anmodning om tilbud sendt!',
		successText1: 'Hej',
		successText2: 'vi har modtaget din anmodning. Vores tekniske team i Malaga gennemgår den og kontakter dig på e-mail (',
		successText3: ') hurtigst muligt.',
		successButton: 'Send en ny anmodning',
		faqTitle: 'Ofte stillede spørgsmål'
	},
	// Packages Showcase
	packages: {
		badge: 'Udvalgte pakker',
		title: 'Vælg din perfekte pakke',
		subtitle: 'Skræddersyet til enhver lejlighed. Alle pakker inkluderer transport, opsætning og teknisk support på stedet.',
		enquire: 'Få et tilbud'
	},
	// How It Works
	process: {
		badge: 'Sådan foregår det',
		title: 'Dit event på 4 enkle trin',
		s1Title: 'Vælg din pakke',
		s1Desc: 'Gennemse vores pakker, og vælg den, der passer til dit events størrelse og stil.',
		s2Title: 'Anmod om et tilbud',
		s2Desc: 'Udfyld vores hurtige formular. Vi svarer hurtigst muligt med fuld oversigt over ledighed.',
		s3Title: 'Bekræft og planlæg',
		s3Desc: 'Vores team bekræfter logistik, adgang til lokalet og alle tekniske detaljer.',
		s4Title: 'Nyd dit event',
		s4Desc: 'Vi leverer, sætter op og tester det hele, og henter det hele igen efter dit event. Nul stress for dig.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Gennemsigtige priser',
		title: 'Enkle priser, alt inklusive',
		subtitle: 'Ingen skjulte gebyrer. Transport, opsætning og teknisk support er altid inkluderet.',
		viewAll: 'Se alle pakker'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Ofte stillede spørgsmål'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Kundeanmeldelser',
		title: 'Ægte historier fra ægte events',
		subtitle: 'Verificerede Google-anmeldelser fra kunder på hele Costa del Sol.',
		ratingLabel: 'FREMRAGENDE',
		basedOn: 'Baseret på {n} anmeldelser',
		poweredBy: 'Vores seneste anmeldelser',
		readMore: 'Læs mere',
		readLess: 'Vis mindre',
		seeAll: 'Se alle anmeldelser',
		prevAria: 'Forrige anmeldelse',
		nextAria: 'Næste anmeldelse',
		outOfFiveStars: 'ud af 5 stjerner'
	},
	// Lead capture form
	leadForm: {
		title: 'Sikr dig din eventdato',
		subtitle: 'Udfyld formularen, så vender vi tilbage hurtigst muligt.',
		nameLabelInput: 'Fulde navn *',
		emailLabelInput: 'E-mailadresse *',
		phoneLabelInput: 'Telefon / WhatsApp *',
		eventDateLabel: 'Eventdato *',
		commentsLabel: 'Spørgsmål eller kommentarer',
		commentsPlaceholder: 'Fortæl os om dit event: lokale, antal gæster, særlige ønsker...',
		submitBtn: 'Tjek om datoen er ledig',
		submitting: 'Sender...',
		errorRequired: 'Dette felt er påkrævet.',
		errorEmail: 'Indtast venligst en gyldig e-mailadresse.',
		errorPhone: 'Indtast venligst et gyldigt telefonnummer.',
		errorDateFuture: 'Eventdatoen skal ligge i fremtiden.',
		errorMinLength: 'Skal indeholde mindst 2 tegn.',
		errorMaxLength: 'Højst 1000 tegn.',
		errorHoneypot: 'Spam registreret.',
		noCardRequired: 'Du behøver ikke betalingskort for at tjekke ledighed',
		quickResponseNote: 'Svar hurtigst muligt',
		errorSubmit: 'Noget gik galt. Prøv igen, eller kontakt os direkte.',
		errorTurnstile: 'Sikkerhedsbekræftelsen mislykkedes. Prøv venligst igen.',
		errorRateLimited: 'For mange anmodninger. Vent et par minutter, og prøv igen.',
		emailFailTitle: 'Vi kunne ikke sende din bekræftelse',
		emailFailBody:
			'Din anmodning er gemt, men vores e-mailsystem kunne ikke sende den. Kontakt venligst vores team direkte, så vi ikke mister din forespørgsel.',
		emailFailAction: 'Kontakt teamet',
		emailFailDismiss: 'Luk',
		countryCode: 'Landekode',
		responseTime: 'Vi svarer hurtigst muligt',
		trustBadge: 'Valgt af {clients} tilfredse kunder'
	},
	// Thank-you page
	thankYou: {
		headline: 'Tak! Din anmodning er på vej.',
		subheadline: 'Vi har modtaget din forespørgsel og vender tilbage hurtigst muligt.',
		responseTime: 'Forventet svartid: hurtigst muligt',
		backToPackages: 'Se alle pakker',
		whatsappCta: 'Eller kontakt os nu på WhatsApp',
		leadLabel: 'Reference'
	},
	// Gallery
	gallery: {
		titleHome: 'Eventrammer og ideer',
		titlePackage: '{pack}: rammer og ideer'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Placering og Google-profil',
		title: 'Find os på Google',
		subtitle: 'Besøg vores officielle Google Virksomhedsprofil, eller se vores placering i Malaga.',
		viewOnGoogle: 'Se på Google Maps',
		mapTitle: 'Malaga Event Gear | Google Virksomhedsprofil'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Udlejning af lyd, lys og skærme i topklasse til eksklusive events i Malaga og på Costa del Sol. Topmoderne udstyr og skræddersyet teknisk support.',
		usefulLinks: 'Nyttige links',
		home: 'Forside',
		packages: 'Pakker',
		blog: 'Blog',
		news: 'Nyheder',
		categories: 'Kategorier',
		aboutUs: 'Om os',
		meetTheTeam: 'Mød teamet',
		contactUs: 'Kontakt os',
		termsOfService: 'Vilkår og betingelser',
		privacyPolicy: 'Privatlivspolitik',
		cookiePolicy: 'Cookiepolitik',
		gdpr: 'GDPR',
		faq: 'FAQ',
		sitemap: 'Sitemap',
		servicePackages: 'Servicepakker',
		localAddress: 'Lokal adresse',
		listings: 'Fortegnelser',
		onlinePresence: 'Online tilstedeværelse',
		moreInformation: 'Mere information',
		moreInfoText: 'Har du brug for flere detaljer? Kontakt os for information om vores udlejning af eventudstyr, priser og ledighed.',
		tel: 'Tlf.',
		clickToChat: 'Klik for at chatte',
		emails: 'E-mails',
		forHire: 'Til udlejning',
		forContact: 'Til kontakt',
		forLegal: 'Til juridiske spørgsmål',
		allRightsReserved: 'Alle rettigheder forbeholdes.',
		developedBy: 'Udviklet af',
		lorenzozTitle: 'Lorenzoz Agency: webudviklingsbureau og forretningsløsninger',
		mailAriaLabel: 'Send e-mail',
		callAriaLabel: 'Ring til Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Nyheder',
		byAuthor: 'Af',
		updated: 'Opdateret',
		shareInlineLabel: 'Del dette:',
		shareSidebarLabel: 'DEL DETTE',
		shareDrawerTitle: 'Del dette indlæg',
		copiedShort: 'Kopieret!',
		copiedExclaim: 'Kopieret!',
		copyShort: 'Kopiér link',
		copyLink: 'Kopiér link',
		shareOnAria: 'Del på {network}',
		copyLinkAria: 'Kopiér linket til udklipsholderen',
		openSharingAria: 'Åbn delingsmuligheder',
		closeSharingAria: 'Luk delingsmuligheder',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweet den markerede tekst',
		packagesSidebarAria: 'Sidebjælke med eventpakker',
		tocSidebarAria: 'Sidebjælke med indholdsfortegnelse'
	},
	blogStructure: {
		faqHeadings: ['Ofte stillede spørgsmål', 'FAQ', 'FAQs'],
		overviewHeadings: ['Kort overblik', 'Overblik', 'Opsummering'],
		highlightsHeadings: ['Det vigtigste', 'Højdepunkter'],
		testimonialsHeadings: ['Kundeudtalelser', 'Anmeldelser'],
		tocHeadings: ['Indholdsfortegnelse', 'Indhold'],
		inThisArticle: 'I denne artikel',
		tocAria: 'Indholdsfortegnelse',
		faqAria: 'Ofte stillede spørgsmål'
	},
	postCta: {
		aria: 'Pakkeforslag til dit event',
		headline: {
			wedding: 'Planlægger du et bryllup i Malaga?',
			'basic-mice': 'Arrangerer du et firmaevent?',
			mice: 'Har du brug for førsteklasses AV-udstyr til MICE?',
			'product-presentation': 'Lancerer du et produkt eller holder du en præsentation?',
			eco: 'Planlægger du en privat fest?'
		},
		subline: {
			wedding: 'Vælg {name}: professionel lyd og romantisk belysning til jeres store dag.',
			'basic-mice': 'Vælg {name}: klar lyd og billede til ledelsesmøder og konferencer.',
			mice: 'Vælg {name}: førsteklasses LED-skærm, lyd og en tekniker på stedet.',
			'product-presentation': 'Vælg {name}: lysstærk projektor, lærred og lyd til præsentationer, der gør indtryk.',
			eco: 'Vælg {name}: god lyd og stemningsbelysning til op til {guests} gæster.'
		},
		priceFrom: 'Fra {price}',
		viewPackage: 'Se {name}',
		freeQuote: 'Få et gratis tilbud'
	},
	packagesRail: {
		title: 'Vores pakker',
		aria: 'Eventpakker',
		priceFrom: 'fra {price}'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chat med os'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Siden blev ikke fundet',
		genericHeading: 'Noget gik galt',
		notFoundBody: 'Siden, du leder efter, findes ikke eller er blevet flyttet. Start fra forsiden, eller kontakt os.',
		genericBody:
			'Vi stødte på et problem under behandlingen af din anmodning. Gå tilbage til forsiden, eller kontakt os, så løser vi det.',
		contactUs: 'Kontakt os',
		backHome: 'Tilbage til forsiden'
	}
} satisfies Messages;

export default t;
