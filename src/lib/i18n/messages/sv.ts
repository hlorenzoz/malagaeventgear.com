import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Utrustning',
		packages: 'Paket',
		blog: 'Blogg',
		contact: 'Kontakt',
		bookNow: 'Boka nu',
		blogInEnglish: 'Blogg (på engelska)',
		language: 'Språk',
		breadcrumbs: 'Brödsmulor',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Byt färgtema',
		openMenu: 'Öppna navigeringsmenyn'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Vi svarar på engelska eller spanska.',
		legalTranslation: 'Detta är en översättning. Om den skiljer sig från den engelska versionen gäller den engelska versionen.',
		readEnglish: 'Läs den engelska versionen'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Hem',
		packages: 'Paket',
		blog: 'Blogg',
		categories: 'Kategorier',
		category: 'Kategori',
		author: 'Författare',
		contact: 'Kontakt',
		'about-us': 'Om oss',
		faq: 'Vanliga frågor',
		'privacy-policy': 'Integritetspolicy',
		'terms-of-service': 'Allmänna villkor',
		'cookie-policy': 'Cookiepolicy',
		gdpr: 'GDPR',
		'meet-the-team': 'Vårt team',
		equipment: 'Utrustning',
		sitemap: 'Webbplatskarta',
		'thank-you': 'Tack'
	},
	// Hero
	hero: {
		span: 'För alla typer av evenemang',
		titlePart1: 'Hyra',
		titleGradient: 'eventteknik',
		titlePart2: 'i Malaga',
		subtitle: 'Upplev kristallklart ljud och fantastisk belysning med vår förstklassiga utrustning. Perfekt för bröllop, företagsevenemang och exklusiva fester på Costa del Sol.',
		viewPricing: 'Se priser',
		contactUs: 'Kontakta oss'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Felfri installation',
		card1Text: 'Dedikerad teknisk support som säkerställer att ditt evenemang flyter på utan bekymmer från start till slut.',
		card2Title: '#2 Skräddarsydda paket',
		card2Text: 'Flexibla hyrespaket utformade för att passa alla evenemangsstorlekar, lokaler och budgetar perfekt.',
		card3Title: '#3 Toppmodern teknik',
		card3Text: 'Njut av toppmodern ljud- och bildutrustning som lyfter din produktions visuella och ljudmässiga kvalitet.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'I korthet',
		sellQ: 'Vad säljer vi?',
		sellA: 'Vi hyr ut professionell ljud- och bildutrustning, till exempel ljudsystem, scenbelysning, projektorer och dukar, för evenemang i Malaga och på Costa del Sol. Leverans, installation och teknisk support på plats ingår.',
		whoQ: 'Vem är det för?',
		whoA: 'Par som planerar bröllop, företag som arrangerar konferenser och företagsevenemang, och alla som ordnar en fest eller ett privat firande och vill ha felfritt ljud och ljus utan att köpa utrustningen.',
		costQ: 'Vad kostar det?',
		costA: 'Fasta paketpriser utan dolda avgifter, anpassade efter ditt evenemangs storlek, plus skräddarsydda offerter för större produktioner.',
		costFrom: 'Från',
		howQ: 'Hur går det till?',
		howA: 'Fyra enkla steg: välj ditt paket, begär en offert, vi bekräftar och förbereder din utrustning, och vårt team levererar och installerar allt på dagen för ditt evenemang.'
	},
	// Impact
	impact: {
		title: 'Våra resultat i siffror',
		years: 'Års erfarenhet',
		clients: 'Nöjda kunder',
		satisfaction: 'Nöjdhetsgrad'
	},
	// Categories
	categories: {
		badge: 'Förstklassig utrustning',
		title: 'Tillgängliga kategorier',
		soundTitle: 'Ljudsystem',
		soundText: 'Kristallklart ljud i hög kvalitet, perfekt för intima bröllop eller stora företagskonferenser. Vi arbetar med ledande varumärken för att säkerställa högsta akustiska kvalitet.',
		lightTitle: 'Belysning',
		lightText: 'Dynamiska belysningslösningar som skapar den perfekta stämningen i din lokal.',
		visualTitle: 'Projektorer och dukar',
		visualText: 'Skarpa bilder i hög definition för presentationer med stort visuellt intryck.',
		fxTitle: 'Specialeffekter och rökmaskiner',
		fxText: 'Skapa en fantastisk stämning på ditt evenemang med våra professionella specialeffekter och rökmaskiner.',
		bookEquipment: 'Boka paket'
	},
	// Pricing
	pricing: {
		badge: 'Transparenta priser',
		title: 'Skräddarsydda paket för alla evenemang',
		subtitle: 'Välj bland våra flexibla hyrespaket som passar alla evenemangsstorlekar och budgetar perfekt. Vi gör planeringen enkel!',
		includes: 'Inkluderar:',
		includedServices: 'Inkluderade tjänster:',
		optional: 'Tillval:',
		check: 'Kontrollera tillgänglighet',
		mostPopular: 'Mest populär',
		from: 'Från',
		plusVat: '(+{vat} moms)',
		plusVatShort: '(+moms)',
		bookPack: 'Boka'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filter',
		clearAll: 'Rensa alla',
		resetFilters: 'Återställ filter',
		showingResults: 'Visar {visible} av {total} paket',
		noResults: 'Inga paket matchar dina filter. Prova att rensa några val!',
		openFilters: 'Filter',
		done: 'Visa resultat',
		purpose: 'Typ av evenemang',
		capacity: 'Evenemangets storlek',
		price: 'Budget',
		equipment: 'Utrustning som ingår',
		extras: 'Tillval',
		sortBy: 'Sortera efter',
		party: 'Fester',
		wedding: 'Bröllop',
		corporate: 'Företag',
		presentation: 'Presentationer',
		meeting: 'Möten',
		small: 'Liten (upp till 50 gäster)',
		medium: 'Medel (51 till 80 gäster)',
		large: 'Stor (80+ gäster)',
		priceLow: 'Upp till {price:budgetLow}',
		priceMid: '{price:budgetLow} till {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} och uppåt',
		transport: 'Transport och installation',
		screen: 'Duk/skärm',
		sound: 'Ljudsystem',
		microphone: 'Mikrofoner',
		lighting: 'Stämningsbelysning',
		technician: 'Tekniker på plats',
		projector: 'Projektor',
		smokeMachine: 'Rökmaskin',
		technicalAssistant: 'Teknisk assistent',
		lectern: 'Talarstol',
		staging: 'Scen',
		recommended: 'Rekommenderad',
		priceAsc: 'Pris: lågt till högt',
		priceDesc: 'Pris: högt till lågt'
	},
	// Contact
	contact: {
		badge: 'Omedelbart svar dygnet runt',
		title: 'Kontakta oss',
		subtitle: 'Redo att lyfta ditt evenemang? Kontakta vårt tekniska team för skräddarsydda offerter, kontroll av utrustningens tillgänglighet och professionell rådgivning.',
		detailsTitle: 'Kontaktuppgifter',
		phone: 'Telefon',
		whatsapp: 'WhatsApp',
		email: 'E-post',
		location: 'Plats',
		hours: 'Öppettider',
		hoursText: 'Teknisk support och logistik dygnet runt, alla dagar i veckan.',
		reqTitle: 'Begär en offert',
		formName: 'Fullständigt namn *',
		formEmail: 'E-postadress *',
		formPhone: 'Kontakttelefon',
		formDate: 'Evenemangsdatum',
		formType: 'Typ av evenemang',
		formTypeWedding: 'Bröllop/firande',
		formTypeCorporate: 'Företagsevenemang',
		formTypeParty: 'Privat fest',
		formTypeMice: 'Konferens/MICE',
		formTypeOther: 'Annan typ av evenemang',
		formMessage: 'Evenemangsdetaljer och tekniska krav *',
		formSubmit: 'Skicka förfrågan',
		formSubmitting: 'Skickar...',
		formRequiredError: 'Fyll i alla obligatoriska fält.',
		formErrorSubmit: 'Något gick fel när din förfrågan skulle skickas. Försök igen eller mejla oss direkt.',
		formErrorTurnstile: 'Säkerhetsverifieringen misslyckades. Försök igen.',
		formErrorRateLimited: 'För många förfrågningar. Vänta några minuter och försök igen.',
		lockedFieldNote: 'Genererat automatiskt på grund av ett fel. Fältet kan inte redigeras.',
		errorPrefillMessage:
			'Hej, jag skickade en paketförfrågan på er webbplats men bekräftelsemejlet kunde inte skickas. Kan ni bekräfta att ni har fått min förfrågan? Referens: {ref}',
		errorDetailsHeader: 'Inskickade uppgifter:',
		errorDetailSource: 'Formulär-URL',
		errorDetailName: 'Namn',
		errorDetailEmail: 'E-post',
		errorDetailPhone: 'Telefon',
		errorDetailDate: 'Evenemangsdatum',
		errorDetailPackage: 'Paket',
		errorDetailComments: 'Kommentarer',
		successTitle: 'Offertförfrågan skickad!',
		successText1: 'Hej',
		successText2: 'vi har tagit emot din förfrågan. Vårt tekniska team i Malaga kommer att granska den och kontakta dig via e-post (',
		successText3: ') så snart som möjligt.',
		successButton: 'Skicka en ny förfrågan',
		faqTitle: 'Vanliga frågor'
	},
	// Packages Showcase.
	packages: {
		badge: 'Utvalda paket',
		title: 'Välj ditt perfekta paket',
		subtitle: 'Skräddarsytt för alla tillfällen. Alla paket inkluderar transport, installation och teknisk support på plats.',
		enquire: 'Begär en offert'
	},
	// How It Works
	process: {
		badge: 'Så går det till',
		title: 'Ditt evenemang i 4 enkla steg',
		s1Title: 'Välj ditt paket',
		s1Desc: 'Bläddra bland våra paket och välj det som passar ditt evenemangs storlek och stil.',
		s2Title: 'Begär en offert',
		s2Desc: 'Fyll i vårt snabba formulär. Vi svarar så snart som möjligt med fullständig tillgänglighet.',
		s3Title: 'Bekräfta och planera',
		s3Desc: 'Vårt team bekräftar logistik, tillgång till lokalen och alla tekniska detaljer.',
		s4Title: 'Njut av ditt evenemang',
		s4Desc: 'Vi sköter installationen, kör showen och packar ihop allt igen. Noll stress för dig.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Transparenta priser',
		title: 'Enkla priser, allt ingår',
		subtitle: 'Inga dolda avgifter. Transport, installation och teknisk support ingår alltid.',
		viewAll: 'Se alla paket'
	},
	// FAQ
	faq: {
		badge: 'Vanliga frågor',
		title: 'Vanliga frågor'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Kundrecensioner',
		title: 'Äkta berättelser från äkta evenemang',
		subtitle: 'Verifierade Google-recensioner från kunder längs Costa del Sol.',
		ratingLabel: 'UTMÄRKT',
		basedOn: 'Baserat på {n} recensioner',
		poweredBy: 'Visar våra senaste recensioner',
		readMore: 'Läs mer',
		readLess: 'Visa mindre',
		seeAll: 'Se alla recensioner',
		prevAria: 'Föregående recension',
		nextAria: 'Nästa recension',
		outOfFiveStars: 'av 5 stjärnor'
	},
	// Lead capture form
	leadForm: {
		title: 'Säkra ditt evenemangsdatum',
		subtitle: 'Fyll i formuläret så återkommer vi så snart som möjligt.',
		nameLabelInput: 'Fullständigt namn *',
		emailLabelInput: 'E-postadress *',
		phoneLabelInput: 'Telefon/WhatsApp *',
		eventDateLabel: 'Evenemangsdatum *',
		commentsLabel: 'Frågor eller kommentarer',
		commentsPlaceholder: 'Berätta om ditt evenemang: lokal, antal gäster, särskilda önskemål...',
		submitBtn: 'Kontrollera om datumet är ledigt',
		submitting: 'Skickar...',
		errorRequired: 'Detta fält är obligatoriskt.',
		errorEmail: 'Ange en giltig e-postadress.',
		errorPhone: 'Ange ett giltigt telefonnummer.',
		errorDateFuture: 'Evenemangsdatumet måste vara i framtiden.',
		errorMinLength: 'Måste innehålla minst 2 tecken.',
		errorMaxLength: 'Högst 1000 tecken.',
		errorHoneypot: 'Skräppost upptäckt.',
		noCardRequired: 'Inget kreditkort krävs för att kontrollera tillgänglighet',
		quickResponseNote: 'Svar så snart som möjligt',
		errorSubmit: 'Något gick fel. Försök igen eller kontakta oss direkt.',
		errorTurnstile: 'Säkerhetsverifieringen misslyckades. Försök igen.',
		errorRateLimited: 'För många förfrågningar. Vänta några minuter och försök igen.',
		emailFailTitle: 'Vi kunde inte skicka din bekräftelse',
		emailFailBody: 'Din förfrågan sparades, men vårt e-postsystem kunde inte skicka den. Kontakta vårt team direkt så att vi inte tappar bort din förfrågan.',
		emailFailAction: 'Kontakta teamet',
		emailFailDismiss: 'Stäng',
		countryCode: 'Landskod',
		responseTime: 'Vi svarar så snart som möjligt',
		trustBadge: 'Anlitade av {clients} nöjda kunder'
	},
	// Thank-you page
	thankYou: {
		headline: 'Tack! Din förfrågan är på väg.',
		subheadline: 'Vi har tagit emot din förfrågan och återkommer så snart som möjligt.',
		responseTime: 'Förväntat svar: så snart som möjligt',
		backToPackages: 'Bläddra bland alla paket',
		whatsappCta: 'Eller nå oss direkt på WhatsApp',
		leadLabel: 'Referens'
	},
	// Gallery
	gallery: {
		titleHome: 'Våra evenemang i action',
		titlePackage: 'Tidigare {pack}-evenemang'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Plats och Google-profil',
		title: 'Hitta oss på Google',
		subtitle: 'Besök vår officiella Google Business-profil eller se vår plats i Malaga.',
		viewOnGoogle: 'Visa på Google Maps',
		mapTitle: 'Malaga Event Gear | Google Business-profil'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Förstklassig uthyrning av ljud, ljus och dukar för exklusiva evenemang i Malaga och på Costa del Sol. Toppmodern utrustning och skräddarsydd teknisk support.',
		usefulLinks: 'Användbara länkar',
		home: 'Hem',
		packages: 'Paket',
		blog: 'Blogg',
		news: 'Nyheter',
		categories: 'Kategorier',
		aboutUs: 'Om oss',
		meetTheTeam: 'Vårt team',
		contactUs: 'Kontakta oss',
		termsOfService: 'Allmänna villkor',
		privacyPolicy: 'Integritetspolicy',
		cookiePolicy: 'Cookiepolicy',
		gdpr: 'GDPR',
		faq: 'Vanliga frågor',
		sitemap: 'Webbplatskarta',
		servicePackages: 'Tjänstepaket',
		localAddress: 'Lokal adress',
		listings: 'Kataloger',
		onlinePresence: 'Onlinenärvaro',
		moreInformation: 'Mer information',
		moreInfoText: 'Vill du veta mer? Kontakta oss för information om uthyrning av eventutrustning, priser och tillgänglighet.',
		tel: 'Tel',
		clickToChat: 'Klicka för att chatta',
		emails: 'E-postadresser',
		forHire: 'För uthyrning',
		forContact: 'För kontakt',
		forLegal: 'För juridiska frågor',
		allRightsReserved: 'Alla rättigheter förbehållna.',
		developedBy: 'Utvecklad av',
		lorenzozTitle: 'Lorenzoz Agency: webbutvecklingsbyrå och affärslösningar',
		mailAriaLabel: 'Skicka e-post',
		callAriaLabel: 'Ring Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Nyheter',
		byAuthor: 'Av',
		updated: 'Uppdaterad',
		shareInlineLabel: 'Dela detta:',
		shareSidebarLabel: 'DELA DETTA',
		shareDrawerTitle: 'Dela detta inlägg',
		copiedShort: 'Kopierat!',
		copiedExclaim: 'Kopierat!',
		copyShort: 'Kopiera länk',
		copyLink: 'Kopiera länk',
		shareOnAria: 'Dela på {network}',
		copyLinkAria: 'Kopiera länken till urklipp',
		openSharingAria: 'Öppna delningsalternativ',
		closeSharingAria: 'Stäng delningsalternativ',
		tweetLabel: 'Tweeta',
		tweetAria: 'Tweeta den markerade texten',
		packagesSidebarAria: 'Sidofält för evenemangspaket',
		tocSidebarAria: 'Sidofält för innehållsförteckning'
	},
	blogStructure: {
		faqHeadings: ['Vanliga frågor', 'FAQ', 'FAQs'],
		overviewHeadings: ['Kort översikt', 'Översikt', 'Sammanfattning'],
		highlightsHeadings: ['Det viktigaste', 'Höjdpunkter'],
		testimonialsHeadings: ['Kundomdömen', 'Omdömen', 'Recensioner'],
		tocHeadings: ['Innehållsförteckning', 'Innehåll'],
		inThisArticle: 'I den här artikeln',
		tocAria: 'Innehållsförteckning',
		faqAria: 'Vanliga frågor'
	},
	postCta: {
		aria: 'Paketförslag för ditt evenemang',
		headline: {
			wedding: 'Planerar du ett bröllop i Malaga?',
			'basic-mice': 'Ordnar du ett företagsevenemang?',
			mice: 'Behöver du förstklassig AV-teknik för MICE?',
			'product-presentation': 'Lanserar du en produkt eller håller du en presentation?',
			eco: 'Planerar du en privat fest?'
		},
		subline: {
			wedding: 'Välj {name}: professionellt ljud och romantisk belysning för din stora dag.',
			'basic-mice': 'Välj {name}: klart ljud och skarp bild för ledningsmöten och konferenser.',
			mice: 'Välj {name}: förstklassig LED-skärm, ljud och en tekniker på plats.',
			'product-presentation': 'Välj {name}: ljusstark projektor, duk och ljud för presentationer som gör intryck.',
			eco: 'Välj {name}: bra ljud och stämningsbelysning för upp till {guests} gäster.'
		},
		priceFrom: 'Från {price}',
		viewPackage: 'Se {name}',
		freeQuote: 'Begär en kostnadsfri offert'
	},
	packagesRail: {
		title: 'Våra paket',
		aria: 'Evenemangspaket',
		priceFrom: 'från {price}'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chatta med oss'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Sidan hittades inte',
		genericHeading: 'Något gick fel',
		notFoundBody: 'Sidan du letar efter finns inte eller har flyttats. Börja om från startsidan eller kontakta oss.',
		genericBody: 'Vi stötte på ett problem när din förfrågan skulle behandlas. Gå tillbaka till startsidan eller kontakta oss så löser vi det.',
		contactUs: 'Kontakta oss',
		backHome: 'Till startsidan'
	}
} satisfies Messages;

export default t;
