import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Apparatuur',
		packages: 'Pakketten',
		blog: 'Blog',
		contact: 'Contact',
		bookNow: 'Boek nu',
		blogInEnglish: 'Blog (in het Engels)',
		language: 'Taal',
		breadcrumbs: 'Kruimelpad',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Kleurthema wisselen',
		openMenu: 'Navigatiemenu openen'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'We antwoorden in het Engels of Spaans.',
		legalTranslation: 'Dit is een vertaling. Bij verschillen met de Engelse versie geldt de Engelse versie.',
		readEnglish: 'Lees de Engelse versie'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Home',
		packages: 'Pakketten',
		blog: 'Blog',
		categories: 'Categorieën',
		category: 'Categorie',
		author: 'Auteur',
		contact: 'Contact',
		'about-us': 'Over ons',
		faq: 'Veelgestelde vragen',
		'privacy-policy': 'Privacybeleid',
		'terms-of-service': 'Algemene voorwaarden',
		'cookie-policy': 'Cookiebeleid',
		gdpr: 'AVG',
		'meet-the-team': 'Ons team',
		equipment: 'Apparatuur',
		sitemap: 'Sitemap',
		'thank-you': 'Bedankt'
	},
	// Hero
	hero: {
		span: 'Voor alle soorten evenementen',
		titlePart1: 'Audiovisuele apparatuur',
		titleGradient: 'huren',
		titlePart2: 'in Malaga',
		subtitle: 'Ervaar kristalhelder geluid en verbluffende verlichting met onze premium apparatuur. Perfect voor bruiloften, bedrijfsevenementen en exclusieve feesten aan de Costa del Sol.',
		viewPricing: 'Bekijk prijzen',
		contactUs: 'Neem contact op'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Vlekkeloze opbouw',
		card1Text: 'Toegewijde technische ondersteuning, zodat je evenement van begin tot eind zonder zorgen verloopt.',
		card2Title: '#2 Pakketten op maat',
		card2Text: 'Flexibele huurpakketten, perfect afgestemd op elke evenementgrootte, locatie en elk budget.',
		card3Title: '#3 Geavanceerde technologie',
		card3Text: 'Geniet van hypermoderne audiovisuele apparatuur die de beeld- en geluidskwaliteit van je productie naar een hoger niveau tilt.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'In het kort',
		sellQ: 'Wat verkopen we?',
		sellA: 'We verhuren premium audiovisuele apparatuur, zoals professionele geluidssystemen, podiumverlichting, beamers en schermen, voor evenementen in Malaga en aan de Costa del Sol, inclusief levering, opbouw en technische ondersteuning ter plaatse.',
		whoQ: 'Voor wie is dit?',
		whoA: 'Stellen die een bruiloft plannen, bedrijven die conferenties en zakelijke evenementen organiseren, en iedereen die een feest of privéviering geeft en vlekkeloos geluid en licht wil zonder de apparatuur zelf te kopen.',
		costQ: 'Wat kost het?',
		costA: 'Pakketten met een vaste prijs zonder verborgen kosten, afgestemd op de grootte van je evenement, plus offertes op maat voor grotere producties.',
		costFrom: 'Vanaf',
		howQ: 'Hoe werkt het?',
		howA: 'Vier eenvoudige stappen: kies je pakket, vraag een offerte aan, wij bevestigen en bereiden je apparatuur voor, en ons team levert en installeert alles op de dag van je evenement.'
	},
	// Impact
	impact: {
		title: 'Onze impact in cijfers',
		years: 'Jaar ervaring',
		clients: 'Tevreden klanten',
		satisfaction: 'Tevredenheidsscore'
	},
	// Categories
	categories: {
		badge: 'Premium apparatuur',
		title: 'Beschikbare categorieën',
		soundTitle: 'Geluidssystemen',
		soundText: 'Kristalhelder hifigeluid, ideaal voor intieme bruiloften of grote zakelijke conferenties. We werken met toonaangevende merken voor de hoogste akoestische kwaliteit.',
		lightTitle: 'Verlichting',
		lightText: 'Dynamische verlichtingsoplossingen voor de perfecte sfeer op je locatie.',
		visualTitle: 'Beamers & schermen',
		visualText: 'Scherpe beelden in high definition voor presentaties met grote visuele impact.',
		fxTitle: 'Speciale effecten & rookmachines',
		fxText: 'Creëer een verbluffende sfeer op je evenement met onze professionele speciale effecten en rookmachines.',
		bookEquipment: 'Pakketten boeken'
	},
	// Pricing
	pricing: {
		badge: 'Transparante prijzen',
		title: 'Pakketten op maat voor elk evenement',
		subtitle: 'Kies uit onze flexibele huurpakketten, perfect afgestemd op elke evenementgrootte en elk budget. Wij maken plannen eenvoudig!',
		includes: 'Inclusief:',
		includedServices: 'Inbegrepen diensten:',
		optional: 'Optioneel:',
		check: 'Check beschikbaarheid',
		mostPopular: 'Meest gekozen',
		from: 'Vanaf',
		plusVat: '(+{vat} btw)',
		plusVatShort: '(+btw)',
		bookPack: 'Boeken'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filters',
		clearAll: 'Alles wissen',
		resetFilters: 'Filters resetten',
		showingResults: '{visible} van {total} pakketten weergegeven',
		noResults: 'Geen enkel pakket past bij je filters. Probeer een paar filters uit te zetten!',
		openFilters: 'Filters',
		done: 'Toon resultaten',
		purpose: 'Type evenement',
		capacity: 'Omvang evenement',
		price: 'Budget',
		equipment: 'Inbegrepen apparatuur',
		extras: 'Optionele extra\'s',
		sortBy: 'Sorteer op',
		party: 'Feesten',
		wedding: 'Bruiloften',
		corporate: 'Zakelijk',
		presentation: 'Presentaties',
		meeting: 'Vergaderingen',
		small: 'Klein (tot 50 gasten)',
		medium: 'Middelgroot (51 tot 80 gasten)',
		large: 'Groot (80+ gasten)',
		priceLow: 'Tot {price:budgetLow}',
		priceMid: '{price:budgetLow} tot {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} en meer',
		transport: 'Vervoer & opbouw',
		screen: 'Scherm / display',
		sound: 'Geluidssysteem',
		microphone: 'Microfoons',
		lighting: 'Sfeerverlichting',
		technician: 'Technicus ter plaatse',
		projector: 'Beamer',
		smokeMachine: 'Rookmachine',
		technicalAssistant: 'Technische assistent',
		lectern: 'Spreekgestoelte',
		staging: 'Podium',
		recommended: 'Aanbevolen',
		priceAsc: 'Prijs: laag naar hoog',
		priceDesc: 'Prijs: hoog naar laag'
	},
	// Contact
	contact: {
		badge: 'Direct bereikbaar 24/7',
		title: 'Neem contact op',
		subtitle: 'Klaar om je evenement naar een hoger niveau te tillen? Neem contact op met ons technisch team voor offertes op maat, beschikbaarheid van apparatuur en deskundig advies.',
		detailsTitle: 'Contactgegevens',
		phone: 'Telefoon',
		whatsapp: 'WhatsApp',
		email: 'E-mail',
		location: 'Locatie',
		hours: 'Openingstijden',
		hoursText: 'Technische ondersteuning en logistiek 24 uur per dag, 7 dagen per week.',
		reqTitle: 'Offerte aanvragen',
		formName: 'Volledige naam *',
		formEmail: 'E-mailadres *',
		formPhone: 'Telefoonnummer',
		formDate: 'Datum evenement',
		formType: 'Type evenement',
		formTypeWedding: 'Bruiloft / feest',
		formTypeCorporate: 'Bedrijfsevenement',
		formTypeParty: 'Privéfeest',
		formTypeMice: 'Conferentie / MICE',
		formTypeOther: 'Ander type evenement',
		formMessage: 'Evenementdetails & technische vereisten *',
		formSubmit: 'Verstuur aanvraag',
		formSubmitting: 'Versturen...',
		formRequiredError: 'Vul alle verplichte velden in.',
		formErrorSubmit: 'Er is iets misgegaan bij het versturen van je aanvraag. Probeer het opnieuw of mail ons rechtstreeks.',
		formErrorTurnstile: 'Beveiligingsverificatie mislukt. Probeer het opnieuw.',
		formErrorRateLimited: 'Te veel aanvragen. Wacht een paar minuten en probeer het opnieuw.',
		lockedFieldNote: 'Automatisch gegenereerd vanuit een foutmelding. Dit veld kan niet worden bewerkt.',
		errorPrefillMessage:
			'Hoi, ik heb via jullie website een pakketaanvraag ingediend, maar de bevestigingsmail is niet aangekomen. Kunnen jullie bevestigen dat jullie mijn aanvraag hebben ontvangen? Referentie: {ref}',
		errorDetailsHeader: 'Ingediende gegevens:',
		errorDetailSource: 'Formulier-URL',
		errorDetailName: 'Naam',
		errorDetailEmail: 'E-mail',
		errorDetailPhone: 'Telefoon',
		errorDetailDate: 'Evenementdatum',
		errorDetailPackage: 'Pakket',
		errorDetailComments: 'Opmerkingen',
		successTitle: 'Offerte aangevraagd!',
		successText1: 'Hoi',
		successText2: 'we hebben je aanvraag goed ontvangen. Ons technisch team in Malaga beoordeelt deze en neemt per e-mail contact met je op (',
		successText3: ') zodra dat mogelijk is.',
		successButton: 'Verstuur nog een aanvraag',
		faqTitle: 'Veelgestelde vragen'
	},
	// Packages Showcase
	packages: {
		badge: 'Uitgelichte pakketten',
		title: 'Kies jouw perfecte pakket',
		subtitle: 'Op maat voor elke gelegenheid. Alle pakketten zijn inclusief vervoer, opbouw en technische ondersteuning ter plaatse.',
		enquire: 'Offerte aanvragen'
	},
	// How It Works
	process: {
		badge: 'Hoe het werkt',
		title: 'Je evenement in 4 eenvoudige stappen',
		s1Title: 'Kies je pakket',
		s1Desc: 'Bekijk onze pakketten en kies het pakket dat past bij de grootte en stijl van je evenement.',
		s2Title: 'Vraag een offerte aan',
		s2Desc: 'Vul ons korte formulier in. We reageren zo snel mogelijk met alle informatie over de beschikbaarheid.',
		s3Title: 'Bevestig en plan',
		s3Desc: 'Ons team bevestigt de logistiek, de toegang tot de locatie en elk technisch detail.',
		s4Title: 'Geniet van je evenement',
		s4Desc: 'Wij verzorgen de opbouw, begeleiden de show en ruimen alles weer op. Voor jou volledig zorgeloos.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Transparante prijzen',
		title: 'Eenvoudige prijzen, alles inbegrepen',
		subtitle: 'Geen verborgen kosten. Vervoer, opbouw en technische ondersteuning altijd inbegrepen.',
		viewAll: 'Bekijk alle pakketten'
	},
	// FAQ
	faq: {
		badge: 'FAQ',
		title: 'Veelgestelde vragen'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Klantbeoordelingen',
		title: 'Echte verhalen van echte evenementen',
		subtitle: 'Geverifieerde Google-reviews van klanten langs de hele Costa del Sol.',
		ratingLabel: 'UITSTEKEND',
		basedOn: 'Gebaseerd op {n} reviews',
		poweredBy: 'Onze nieuwste reviews',
		readMore: 'Lees meer',
		readLess: 'Lees minder',
		seeAll: 'Bekijk alle reviews',
		prevAria: 'Vorige review',
		nextAria: 'Volgende review',
		outOfFiveStars: 'van de 5 sterren'
	},
	// Lead capture form
	leadForm: {
		title: 'Leg je evenementdatum vast',
		subtitle: 'Vul het formulier in en we nemen zo snel mogelijk contact met je op.',
		nameLabelInput: 'Volledige naam *',
		emailLabelInput: 'E-mailadres *',
		phoneLabelInput: 'Telefoon / WhatsApp *',
		eventDateLabel: 'Datum evenement *',
		commentsLabel: 'Vragen of opmerkingen',
		commentsPlaceholder: 'Vertel ons over je evenement: locatie, aantal gasten, speciale wensen...',
		submitBtn: 'Check beschikbaarheid',
		submitting: 'Versturen...',
		errorRequired: 'Dit veld is verplicht.',
		errorEmail: 'Voer een geldig e-mailadres in.',
		errorPhone: 'Voer een geldig telefoonnummer in.',
		errorDateFuture: 'De evenementdatum moet in de toekomst liggen.',
		errorMinLength: 'Moet minimaal 2 tekens bevatten.',
		errorMaxLength: 'Maximaal 1000 tekens toegestaan.',
		errorHoneypot: 'Spam gedetecteerd.',
		noCardRequired: 'Geen creditcard nodig om beschikbaarheid te checken',
		quickResponseNote: 'Reactie zo snel mogelijk',
		errorSubmit: 'Er is iets misgegaan. Probeer het opnieuw of neem rechtstreeks contact met ons op.',
		errorTurnstile: 'Beveiligingsverificatie mislukt. Probeer het opnieuw.',
		errorRateLimited: 'Te veel aanvragen. Wacht een paar minuten en probeer het opnieuw.',
		emailFailTitle: 'We konden je bevestiging niet versturen',
		emailFailBody: 'Je aanvraag is opgeslagen, maar ons e-mailsysteem kon deze niet versturen. Neem rechtstreeks contact op met ons team, zodat we je aanvraag niet missen.',
		emailFailAction: 'Neem contact op met het team',
		emailFailDismiss: 'Sluiten',
		countryCode: 'Landcode',
		responseTime: 'We reageren zo snel mogelijk',
		trustBadge: 'Al {clients} tevreden klanten'
	},
	// Thank-you page
	thankYou: {
		headline: 'Bedankt! Je aanvraag is onderweg.',
		subheadline: 'We hebben je aanvraag ontvangen en nemen zo snel mogelijk contact met je op.',
		responseTime: 'Verwachte reactietijd: zo snel mogelijk',
		backToPackages: 'Bekijk alle pakketten',
		whatsappCta: 'Of bereik ons nu via WhatsApp',
		leadLabel: 'Referentie'
	},
	// Gallery
	gallery: {
		titleHome: 'Onze evenementen in actie',
		titlePackage: 'Eerdere evenementen met het {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Locatie & Google-profiel',
		title: 'Vind ons op Google',
		subtitle: 'Bezoek ons officiële Google Bedrijfsprofiel of bekijk onze locatie in Malaga.',
		viewOnGoogle: 'Bekijk op Google Maps',
		mapTitle: 'Malaga Event Gear | Google Bedrijfsprofiel'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Verhuur van premium geluid, verlichting en schermen voor exclusieve evenementen in Malaga en aan de Costa del Sol. Geavanceerde apparatuur en technische ondersteuning op maat.',
		usefulLinks: 'Nuttige links',
		home: 'Home',
		packages: 'Pakketten',
		blog: 'Blog',
		news: 'Nieuws',
		categories: 'Categorieën',
		aboutUs: 'Over ons',
		meetTheTeam: 'Ons team',
		contactUs: 'Neem contact op',
		termsOfService: 'Algemene voorwaarden',
		privacyPolicy: 'Privacybeleid',
		cookiePolicy: 'Cookiebeleid',
		gdpr: 'AVG',
		faq: 'Veelgestelde vragen',
		sitemap: 'Sitemap',
		servicePackages: 'Servicepakketten',
		localAddress: 'Lokaal adres',
		listings: 'Vermeldingen',
		onlinePresence: 'Online aanwezigheid',
		moreInformation: 'Meer informatie',
		moreInfoText: 'Meer details nodig? Neem contact met ons op voor informatie over onze verhuur van evenementapparatuur, prijzen en beschikbaarheid.',
		tel: 'Tel',
		clickToChat: 'Klik om te chatten',
		emails: 'E-mails',
		forHire: 'Voor verhuur',
		forContact: 'Voor vragen',
		forLegal: 'Voor juridische zaken',
		allRightsReserved: 'Alle rechten voorbehouden.',
		developedBy: 'Ontwikkeld door',
		lorenzozTitle: 'Lorenzoz Agency: webontwikkelingsbureau en zakelijke oplossingen',
		mailAriaLabel: 'Verstuur e-mail',
		callAriaLabel: 'Bel Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Nieuws',
		byAuthor: 'Door',
		updated: 'Bijgewerkt',
		shareInlineLabel: 'Deel dit:',
		shareSidebarLabel: 'DEEL DIT',
		shareDrawerTitle: 'Deel dit bericht',
		copiedShort: 'Gekopieerd!',
		copiedExclaim: 'Gekopieerd!',
		copyShort: 'Kopieer link',
		copyLink: 'Kopieer link',
		shareOnAria: 'Deel op {network}',
		copyLinkAria: 'Kopieer link naar klembord',
		openSharingAria: 'Deelopties openen',
		closeSharingAria: 'Deelopties sluiten',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweet deze selectie',
		packagesSidebarAria: 'Zijbalk met evenementpakketten',
		tocSidebarAria: 'Zijbalk met inhoudsopgave'
	},
	blogStructure: {
		faqHeadings: ['Veelgestelde vragen', 'FAQ', 'FAQs'],
		overviewHeadings: ['In het kort', 'Overzicht', 'Samenvatting'],
		highlightsHeadings: ['Belangrijkste punten', 'Hoogtepunten'],
		testimonialsHeadings: ['Klantervaringen', 'Ervaringen', 'Reviews'],
		tocHeadings: ['Inhoudsopgave', 'Inhoud'],
		inThisArticle: 'In dit artikel',
		tocAria: 'Inhoudsopgave',
		faqAria: 'Veelgestelde vragen'
	},
	postCta: {
		aria: 'Pakketsuggestie voor je evenement',
		headline: {
			wedding: 'Ben je een bruiloft in Malaga aan het plannen?',
			'basic-mice': 'Organiseer je een bedrijfsevenement?',
			mice: 'Heb je eersteklas AV-ondersteuning voor MICE nodig?',
			'product-presentation': 'Lanceer je een product of geef je een presentatie?',
			eco: 'Plan je een privéfeest?'
		},
		subline: {
			wedding: 'Kies het {name}: professioneel geluid en romantische verlichting voor je grote dag.',
			'basic-mice': 'Kies het {name}: helder beeld en geluid voor directievergaderingen en congressen.',
			mice: 'Kies het {name}: eersteklas ledscherm, geluid en een technicus ter plaatse.',
			'product-presentation': 'Kies het {name}: een lichtsterke projector, scherm en geluid voor presentaties die indruk maken.',
			eco: 'Kies het {name}: goed geluid en sfeerverlichting voor maximaal {guests} gasten.'
		},
		priceFrom: 'Vanaf {price}',
		viewPackage: 'Bekijk het {name}',
		freeQuote: 'Vraag een gratis offerte aan'
	},
	packagesRail: {
		title: 'Onze pakketten',
		aria: 'Evenementpakketten',
		priceFrom: 'vanaf {price}'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Chat met ons'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Pagina niet gevonden',
		genericHeading: 'Er is iets misgegaan',
		notFoundBody: 'De pagina die je zoekt bestaat niet meer of is verplaatst. Ga naar de homepage of neem contact met ons op.',
		genericBody: 'Er ging iets mis bij het verwerken van je aanvraag. Ga terug naar home of neem contact met ons op, dan lossen we het op.',
		contactUs: 'Neem contact op',
		backHome: 'Terug naar home'
	}
} satisfies Messages;

export default t;
