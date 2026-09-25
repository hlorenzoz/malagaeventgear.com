import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: 'Perfekt til leje af lyd og lys til en lille fest i Malaga eller andre private events med op til 50 gæster. Inkluderer et solidt basislydanlæg og stemningsbelysning.',
			includes: [
				'2 aktive højttalere af høj kvalitet med stativer',
				'1 kablet dynamisk mikrofon',
				'2 LED-lysbjælker med RGBW-spots',
				'Æstetisk kabelføring og professionel opsætning'
			],
			optional: ['Projektor og projektorlærred (+{price:projectorScreen})', 'Professionel røg-/tågemaskine (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack: leje af lyd og lys til lille fest i Malaga | MEG' },
			landing: {
				badge: 'Mindre events og fester',
				rateLabel: 'Overkommelig fast pris, alt inklusive',
				vatNote: '(+{vat} moms), opsætning og transport inkluderet',
				specTitle: 'Op til 50 gæster',
				specBody: 'Perfekt til villaer, haver og private lokaler.',
				highlightTitle: 'Stressfri service',
				highlightBody:
					'Vi arbejder udelukkende med levering og direkte opsætning. Vi medbringer udstyret, installerer det professionelt, tester lyd og lys, og henter det hele igen efter eventet.',
				includesLabel: 'Inkluderet i pakken',
				optionalLabel: 'Valgfrit tilbehør',
				ctaHeading: 'Sikr din booking i dag',
				ctaBody:
					'Udfyld vores hurtige formular til et teknisk tilbud, og tjek pakkens ledighed på din dato. Vi svarer hurtigst muligt!',
				ctaButton: 'Book denne pakke'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: 'Skabt til magiske og uforglemmelige bryllupsfejringer. Inkluderer et professionelt lydanlæg i topklasse, romantisk stemningsbelysning og trådløse mikrofoner til bevægende taler.',
			includes: [
				'Aktivt PA-lydanlæg i topklasse til op til 80 gæster',
				'Lyskæder med varmt LED-lys til romantisk stemningsbelysning',
				'Professionelle trådløse mikrofoner til taler og annonceringer',
				'Transport i Malaga og omegn',
				'Professionel æstetisk opsætning og kabelføring',
				'Teknisk styring og support på stedet under eventet',
				'Hurtig nedtagning og afhentning efter eventet'
			],
			optional: ['Professionel røg-/tågemaskine (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack: bryllupslyd og romantisk belysning | MEG' },
			landing: {
				badge: 'Vores mest populære fejringspakke',
				rateLabel: 'Premiumpris, alt inklusive',
				vatNote: '(+{vat} moms), opsætning og support på stedet inkluderet',
				specTitle: 'Op til 80 gæster',
				specBody: 'Perfekt til smukke villaer, fincaer og bryllupshoteller.',
				highlightTitle: 'Tekniker på stedet under hele eventet',
				highlightBody:
					'Du skal aldrig bekymre dig om feedback fra mikrofonen eller visuelle problemer. Denne pakke inkluderer fuld teknisk overvågning på stedet og akustiske justeringer under hele middagen og talerne.',
				includesLabel: 'Inkluderet i premiumpakken',
				ctaHeading: 'Gør din fejring magisk',
				ctaBody:
					'Bryllupsdatoerne bliver hurtigt booket. Sikr din dato med vores tekniske team i dag for at garantere den bedste lyd og den mest romantiske belysning på din store dag.',
				ctaButton: 'Book Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Designet til virksomhedspræsentationer, forhandlerfremvisninger og produktlanceringer med stor visuel effekt.',
			includes: [
				'1 lærred til frontprojektion med stabilt stativ',
				'1 projektor med høj lysstyrke (5000 lumen) til skarpe billeder',
				'Lydanlæg til lokalet med 2 højttalere og mixerpult',
				'1 trådløs håndmikrofon i premiumkvalitet til talere'
			],
			seo: { title: 'Product Presentation Pack: projektor og lyd | MEG' },
			landing: {
				badge: 'Virksomhedsløsninger med stor visuel effekt',
				rateLabel: 'Fast pris for præsentationspakken',
				vatNote: '(+{vat} moms), projektor og lærred inkluderet',
				specTitle: 'Projektor med høj lysstyrke',
				specBody: 'Projektor på 5000 lumen, ideel til oplyste lokaler.',
				highlightTitle: 'Fejlfri virksomhedsbranding',
				highlightBody:
					'Maksimer opmærksomheden ved din forhandlerlancering, dit pressemøde på hotellet eller din produktfremvisning. Vores professionelle opsætning kombinerer skarpe grafiske detaljer med kraftfuld taleforstærkning.',
				includesLabel: 'Inkluderet i pakken',
				note: {
					title: 'Support til opsætning og tilslutning',
					body: 'Vi leverer alle nødvendige adaptere (HDMI, USB-C) og lydgrænseflader, så du nemt kan tilslutte dine bærbare computere, tablets eller afspillere.'
				},
				ctaHeading: 'Løft din produktfremvisning',
				ctaBody:
					'Giv dit publikum den visuelle klarhed og professionelle lyd, de fortjener. Kontakt vores tekniske team i dag for at bekræfte ledighed.',
				ctaButton: 'Book præsentationspakken'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Grundlæggende, højtydende AV-opsætning til mindre ledermøder, konferencer og præsentationer med op til 40 gæster.',
			includes: [
				'2x2 m projektorlærred og projektor med høj lysstyrke (3000 lumen)',
				'Grundlæggende krystalklart lydanlæg til op til 40 personer',
				'1 professionel svanehalsmikrofon til podie/talerstol',
				'Transport, opsætning og æstetisk kabelføring'
			],
			optional: ['Dedikeret teknisk assistent på stedet (+{price:technicianDay}/dag)'],
			seo: { title: 'Basic MICE Pack: AV-udstyr til møder | MEG' },
			landing: {
				badge: 'Basispakker til ledermøder',
				rateLabel: 'Fast pris for virksomhedsmøder',
				vatNote: '(+{vat} moms), opsætning og transport inkluderet',
				specTitle: 'Op til 40 gæster',
				specBody: 'Designet til bestyrelseslokaler, private saloner og hotelsuiter.',
				highlightTitle: 'Klar taleforståelighed',
				highlightBody:
					'Vores professionelle svanehalsmikrofoner garanterer absolut klarhed til bestyrelsestaler, presseannonceringer eller investorpaneler uden ekko eller feedback.',
				includesLabel: 'Inkluderet i pakken',
				optionalLabel: 'Valgfri support',
				ctaHeading: 'Planlæg dit ledermøde',
				ctaBody:
					'Koordinér problemfri AV-logistik for din virksomhed med Malaga Event Gear. Kontakt vores eksperter for at sikre en professionel bestyrelsesoplevelse.',
				ctaButton: 'Book Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'Omfattende MICE-løsning til virksomheder med en storformatsskærm, aktivt lydanlæg i premiumkvalitet, trådløse podiemikrofoner og dedikeret teknikersupport på stedet.',
			includes: [
				'60-tommer HD-LED-skærm i premiumkvalitet med designstativ',
				'Professionelle aktive højttalere og højtydende lydanlæg',
				'1 svanehalsmikrofon + 1 trådløs håndmikrofon',
				'1 dedikeret AV-tekniker på stedet (op til 6 timers uafbrudt support)',
				'Levering, tilpasset kabelføring og nedtagning efter eventet'
			],
			optional: [
				'Ekstra time med teknisk assistent på stedet (+{price:technicianHour}/t)',
				'Moderne talerstol i metakrylat/akryl i premiumkvalitet (+{price:lectern})',
				'Modulære scenepodier (+{price:stagingPerSqm} pr. kvadratmeter)'
			],
			seo: { title: 'MICE Pack: AV til konferencer med LED-skærm | MEG' },
			landing: {
				badge: 'MICE-oplevelse i premiumklasse for virksomheder',
				rateLabel: 'Fast samlet virksomhedspris',
				vatNote: '(+{vat} moms), LED-skærm, lyd og tekniker på stedet inkluderet',
				specTitle: '60-tommer LED-skærm',
				specBody: 'HD-skærm i storformat til virkningsfulde visuelle virksomhedspræsentationer.',
				highlightTitle: 'Dedikeret tekniker på stedet',
				highlightBody:
					'En specialiseret AV-tekniker kører dit event i op til 6 sammenhængende timer og garanterer fejlfri lyd, billeder og mikrofonstyring gennem hele dit topmøde, din konference eller produktlancering.',
				includesLabel: 'Inkluderet i premiumpakken',
				optionalLabel: 'Valgfrit tilbehør',
				ctaHeading: 'Løft dit virksomhedsevent',
				ctaBody:
					'Lever en fejlfri virksomhedsoplevelse med AV-udstyr i premiumkvalitet og dedikeret teknisk support. Kontakt vores team i dag for at bekræfte ledighed på din dato.',
				ctaButton: 'Book MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Hvad er Malaga Event Gear (MEG), og hvilke services tilbyder de?',
			answer:
				'Malaga Event Gear (MEG) er en virksomhed med base i Malaga, Spanien, der er specialiseret i udlejning af professionelt AV-, lys- og eventudstyr. Vi leverer lydanlæg, projektorer, lærreder, scener, teknisk assistance, en røgmaskine, belysningsløsninger og mikrofoner, samt specialiserede services som lydforstærkning ved liveevents, simultantolkning og interaktive afstemningssystemer, hvor de to sidste arrangeres gennem en underleverandør.'
		},
		'event-types': {
			question: 'Hvilke typer events kan Malaga Event Gear (MEG) tage sig af?',
			answer:
				'Vi dækker personlige fejringer som bryllupper og private fester, professionelle sammenkomster som virksomhedsevents, møder, konferencer og produktpræsentationer, samt større events som kongresser, messer og udstillinger, altid med skræddersyede AV-løsninger.'
		},
		'service-areas': {
			question: 'Hvor tilbyder Malaga Event Gear (MEG) sine services?',
			answer:
				'Selvom "Malaga" indgår i vores navn, rækker vores services langt ud over selve byen. Vi opererer primært på hele Costa del Sol, herunder Malaga by, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena og Estepona. Vi betjener også Sevilla og Granada, selvom Granada typisk kræver bookinger over {price:outOfProvinceMinimum} på grund af den ekstra transportafstand uden for provinsen.'
		},
		'what-makes-unique': {
			question: 'Hvad gør Malaga Event Gear (MEG) unik sammenlignet med andre AV-udlejningsvirksomheder?',
			answer:
				'MEG adskiller sig med en kundefokuseret og strømlinet tilgang: levering og professionel opsætning ved vores eget team ved hver booking, en tekniker på stedet inkluderet i Wedding Pack og MICE Pack, udstyr fra premiummærker og gennemsigtige samlede priser. Vi bevæger os mod en 100% online bookingoplevelse med standardiserede faste priser og fuldt gennemsigtige transaktioner.'
		},
		'booking-process': {
			question: 'Hvordan foregår bookingprocessen hos Malaga Event Gear?',
			answer:
				'Vores strømlinede proces har fire trin: 1. Vælg din pakke. 2. Anmod om et tilbud via vores hurtige forespørgselsformular. 3. Vores team kontakter dig for at afklare detaljer og bekræfte bookingen. 4. Nyd et problemfrit event, mens vi står for levering, professionel opsætning, konfiguration og nedtagning. Bemærk, at services skal bestilles mindst 24 timer i forvejen.'
		},
		'popular-packages': {
			question: 'Hvad er nogle af de populære pakker, som Malaga Event Gear tilbyder?',
			answer:
				'Blandt vores mest populære, forudkonfigurerede pakker er {packagesWithPrices}, hver med forskelligt udstyr og forskellige funktioner. Besøg vores prisside for at se den fulde oversigt over, hvad hver pakke inkluderer.'
		},
		'language-hours': {
			question: 'Hvilke sprog kommunikerer de med kunder på, og hvad er deres åbningstider?',
			answer:
				'Malaga Event Gear (MEG) kommunikerer med kunder på engelsk og spansk. Vi er tilgængelige 24 timer i døgnet, 7 dage om ugen, til tekniske opsætninger og overvågning af events, mens de foregår.'
		},
		'contact-info': {
			question: 'Hvordan kan kunder kontakte Malaga Event Gear (MEG), og hvilke oplysninger bør de give?',
			answer:
				'Du kan kontakte os telefonisk på 666 346 911, via WhatsApp eller e-mail. For at få et præcist tilbud bedes du oplyse din eventdato, sted, forventet antal gæster og hvilken type udstyr eller pakke, du er interesseret i. Se vores kontaktside for flere detaljer.'
		},
		'delivery-setup': {
			question: 'Tilbyder I levering og opsætning af lyd- og lysudstyr?',
			answer:
				'Ja. MEG står for levering, professionel opsætning og nedtagning efter eventet for alle lyd- og lysudlejninger. Vores service omfatter transport, installation, skjult kabelføring, lyd-/lystjek og valgfri teknisk assistance på stedet i Málaga, Marbella, Fuengirola, Torremolinos, Estepona og omegn.'
		},
		'vat-pricing': {
			question: 'Er jeres pakkepriser inklusive moms?',
			answer:
				'Nej, de angivne priser er ikke inklusive moms. Som angivet med (+{vat} moms) ved siden af priserne lægges den spanske standardmoms på {vat} (IVA) oven i pakkeprisen. Dit endelige tilbud viser både nettoprisen og momsopgørelsen med 100% gennemsigtighed.'
		},
		'on-site-technician': {
			question: 'Stiller I med en tekniker på stedet under eventet?',
			answer:
				'Ja. Flere pakker, som Wedding Pack og den fulde MICE Pack, inkluderer en dedikeret tekniker på stedet, der står for teknisk styring og support gennem hele dit event. For pakker, hvor det ikke er inkluderet (for eksempel Basic MICE Pack), kan teknisk assistance på stedet tilføjes som tilvalg fra {price:technicianDay} pr. dag.'
		},
		'equipment-brands': {
			question: 'Hvilke udstyrsmærker arbejder I med?',
			answer:
				'Vi bruger anerkendte professionelle mærker fra eventbranchen, herunder Audix og HK Audio til lyd, Eurolite og ADJ til belysning, og Martin til vores røgmaskine. Det sikrer pålidelig lyd og belysning af høj kvalitet til hver booking.'
		},
		'delivery-only': {
			question: 'Tilbyder I selvafhentning, eller er det kun levering?',
			answer:
				'Vi arbejder udelukkende med levering. Der er ingen mulighed for selvafhentning. Det garanterer, at hvert system ankommer professionelt transporteret, installeret og kalibreret af vores team, så udstyret fungerer nøjagtigt som tiltænkt til dit event.'
		},
		'streaming-recording': {
			question: 'Tilbyder I livestreaming og multikameraoptagelse?',
			answer:
				'Nej. Vi tilbyder ikke kameraer, streamingencodere, videoproduktion med flere kameraer eller optagelsesservice. Vi leverer lyd, skærm og belysning til lokalet. Til et hybrid- eller virtuelt event medbringer du selv din bærbare computer, streamingsoftware og internetforbindelse.'
		},
		'translation-voting': {
			question: 'Tilbyder I simultantolkning eller interaktive afstemningssystemer?',
			answer:
				'Ja, til simultantolkning og interaktive afstemningssystemer, dog ikke med vores eget udstyr: begge dele arrangerer vi gennem en underleverandør til virksomheds- og kongresarrangementer. Fortæl os om dine behov, når du anmoder om et tilbud. Vi tilbyder ikke en LED-videovæg. Vores storformatsskærm er en enkelt fladskærm på 60 tommer.'
		},
		'large-scale-events': {
			question: 'Kan I håndtere store kongresser, messer og udstillinger?',
			answer:
				'Absolut. Ud over bryllupper og virksomhedsmøder udstyrer vi større events som kongresser, messer og udstillinger med skræddersyede AV-løsninger, der kombinerer lydforstærkning, storformatsskærme, scener og dedikeret teknisk personale efter behov.'
		},
		'notice-time': {
			question: 'Hvor lang tid i forvejen skal man booke?',
			answer:
				'Al udlejning af eventudstyr og alle tekniske services skal bestilles med mindst 24 timers varsel for at garantere planlægning og logistisk tilgængelighed. Til store eller komplekse events anbefaler vi, at du booker så tidligt som muligt for at sikre din dato.'
		},
		'minimum-order-granada': {
			question: 'Er der et minimumsbeløb for opgaver uden for Costa del Sol?',
			answer:
				'Inden for Costa del Sol er der intet særligt minimum. Til mere fjerntliggende destinationer uden for provinsen, som Granada, kræver vi en minimumsudlejningsværdi på over {price:outOfProvinceMinimum} for at dække den logistiske transport på én dag. Vi betjener også Sevilla. Kontakt os for at bekræfte betingelserne for din specifikke lokation.'
		},
		'customize-package': {
			question: 'Kan jeg tilpasse eller udvide en pakke til mine specifikke behov?',
			answer:
				'Ja. Enhver pakke kan udvides med tilvalg som projektorer og lærreder, en professionel røgmaskine af typen Martin Magnum 650, ekstra mikrofoner, akryltalerstole i premiumkvalitet, modulære scenepodier og ekstra teknikertimer. Fortæl os om dine behov, når du anmoder om et tilbud, så bygger vi den perfekte konfiguration til dit event.'
		}
	}
} satisfies DataCopy;
