import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: 'Eco Pack er den perfekte pakken for å leie lyd og lys til en liten fest i Malaga: ideell for private fester eller mindre arrangementer med opptil 50 gjester. Inkluderer et solid grunnleggende lydanlegg og stemningslys.',
			includes: [
				'2 aktive høyttalere av høy kvalitet med stativ',
				'1 kablet dynamisk mikrofon',
				'2 LED-lysbjelker med RGBW-spotlights',
				'Estetisk kabelføring og profesjonell installasjon'
			],
			optional: ['Prosjektor og lerret (+{price:projectorScreen})', 'Profesjonell røyk-/tåkemaskin (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack: leie lyd og lys til liten fest i Malaga' },
			landing: {
				badge: 'Mindre arrangementer og fester',
				rateLabel: 'Rimelig totalpris med alt inkludert',
				vatNote: '(+{vat} MVA), installasjon og transport inkludert',
				specTitle: 'Opptil 50 gjester',
				specBody: 'Perfekt for villaer, hager og private lokaler.',
				highlightTitle: 'Stressfri service',
				highlightBody:
					'Vi jobber utelukkende med levering og direkte installasjon. Vi tar med utstyret, installerer det profesjonelt, tester lyd og lys, og henter alt igjen etter arrangementet.',
				includesLabel: 'Dette er inkludert',
				optionalLabel: 'Valgfrie tillegg',
				ctaHeading: 'Sikre bookingen din i dag',
				ctaBody:
					'Fyll ut vår raske tilbudsforespørsel for å sjekke om pakken er ledig på datoen din. Vi svarer så snart som mulig!',
				ctaButton: 'Bestill denne pakken'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: 'Wedding Pack er skapt for magiske og uforglemmelige bryllupsfeiringer. Her kan du leie lyd og lys til bryllup i Malaga: et profesjonelt lydanlegg i toppklasse, romantisk stemningslys og trådløse mikrofoner til rørende taler.',
			includes: [
				'PA-lydanlegg i toppklasse for opptil 80 gjester',
				'Lysslynger med varmt LED-lys for romantisk stemningslys',
				'Profesjonelle trådløse mikrofoner til taler og kunngjøringer',
				'Transport i Malaga og omkringliggende områder',
				'Profesjonell installasjon og estetisk kabelføring',
				'Teknisk kontroll og support på stedet under hele arrangementet',
				'Rask nedrigging og henting etter arrangementet'
			],
			optional: ['Profesjonell røyk-/tåkemaskin (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack: leie lyd og lys til bryllup i Malaga' },
			landing: {
				badge: 'Vår mest populære pakke for feiringer',
				rateLabel: 'Totalpris i premiumklasse, alt inkludert',
				vatNote: '(+{vat} MVA), installasjon og support på stedet inkludert',
				specTitle: 'Opptil 80 gjester',
				specBody: 'Perfekt for vakre villaer, fincas og bryllupshoteller.',
				highlightTitle: 'Tekniker på stedet under hele arrangementet',
				highlightBody:
					'Du slipper å bekymre deg for mikrofonrundgang eller visuelle problemer. Denne pakken inkluderer full teknisk overvåking og akustiske justeringer på stedet gjennom hele festmiddagen og talene.',
				includesLabel: 'Dette er inkludert i premiumpakken',
				ctaHeading: 'Gjør feiringen din magisk',
				ctaBody:
					'Bryllupsdatoene blir raskt booket. Sikre datoen din med vårt tekniske team i dag, så garanterer vi den beste lyden og det mest romantiske lyset på din store dag.',
				ctaButton: 'Bestill Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Utformet for bedriftspresentasjoner, forhandlervisninger og produktlanseringer med stort visuelt inntrykk. Her kan du leie prosjektor til produktlansering i Malaga, med skarpe og tydelige bilder.',
			includes: [
				'1 frontprojeksjonslerret med stabilt stativ',
				'1 prosjektor med høy lysstyrke (5000 lumen) for skarpe bilder',
				'Lydanlegg for lokalet med 2 høyttalere og mikserpult',
				'1 trådløs håndmikrofon i premiumklasse til talere'
			],
			seo: { title: 'Product Presentation Pack: leie prosjektor i Malaga' },
			landing: {
				badge: 'Bedriftsløsninger med stort visuelt inntrykk',
				rateLabel: 'Fastpris for presentasjonspakken',
				vatNote: '(+{vat} MVA), prosjektor og lerret inkludert',
				specTitle: 'Prosjektor med høy lysstyrke',
				specBody: 'Prosjektor på 5000 lumen, ideell for lyse rom.',
				highlightTitle: 'Feilfri profilering for bedriften',
				highlightBody:
					'Maksimer oppmerksomheten rundt forhandlerlanseringen, pressekonferansen på hotellet eller produktvisningen din. Vår profesjonelle installasjon kombinerer krystallklare grafiske detaljer med kraftig taleforsterkning.',
				includesLabel: 'Dette er inkludert',
				note: {
					title: 'Support for installasjon og tilkobling',
					body: 'Vi tilbyr alle nødvendige adaptere (HDMI, USB-C) og lydgrensesnitt, slik at du enkelt kan koble til bedriftens bærbare datamaskiner, nettbrett eller avspillere.'
				},
				ctaHeading: 'Løft produktvisningen din',
				ctaBody:
					'Gi publikummet ditt den visuelle klarheten og det profesjonelle lydbildet de fortjener. Kontakt vårt tekniske team i dag for å bekrefte tilgjengelighet.',
				ctaButton: 'Bestill denne presentasjonspakken'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Grunnleggende, høytytende lyd- og bildeoppsett for mindre ledermøter, konferanser og presentasjoner med opptil 40 gjester. Perfekt AV-utstyr til mindre bedriftsmøter i Malaga.',
			includes: [
				'2x2 m projeksjonslerret og prosjektor med høy lysstyrke (3000 lumen)',
				'Grunnleggende krystallklart lydanlegg for opptil 40 personer',
				'1 profesjonell svanehalsmikrofon til podium/talerstol',
				'Transport, installasjon og estetisk kabelføring'
			],
			optional: ['Dedikert teknisk assistent på stedet (+{price:technicianDay}/dag)'],
			seo: { title: 'Basic MICE Pack: AV-utstyr til bedriftsmøter i Malaga' },
			landing: {
				badge: 'Grunnleggende pakke for ledermøter',
				rateLabel: 'Fastpris for bedriftsmøter',
				vatNote: '(+{vat} MVA), installasjon og transport inkludert',
				specTitle: 'Opptil 40 gjester',
				specBody: 'Utformet for styrerom, private saler og hotellsuiter.',
				highlightTitle: 'Tydelig taleforståelighet',
				highlightBody:
					'Den profesjonelle svanehalsmikrofonen garanterer helt klar tale ved styretaler, pressekonferanser eller investorpaneler, uten ekko eller rundgang.',
				includesLabel: 'Dette er inkludert',
				optionalLabel: 'Valgfri support',
				ctaHeading: 'Planlegg ledermøtet ditt',
				ctaBody:
					'Koordiner sømløs AV-logistikk for bedriften din med Malaga Event Gear. Ta kontakt med våre eksperter for å sikre en profesjonell møteopplevelse i styrerommet.',
				ctaButton: 'Bestill Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'Komplett MICE-løsning for bedrifter, med storformatsskjerm, aktivt lydanlegg i premiumklasse, trådløse podiemikrofoner og en dedikert tekniker på stedet. Her finner du AV-utstyr til konferanser i Malaga, tilpasset hver detalj i arrangementet ditt.',
			includes: [
				'LED-skjerm i premiumklasse på 60 tommer, med stilrent stativ',
				'Profesjonelle aktive høyttalere og høytytende lydanlegg',
				'1 svanehalsmikrofon + 1 trådløs håndmikrofon',
				'1 dedikert AV-tekniker på stedet (opptil 6 timer sammenhengende support)',
				'Levering, skreddersydd kabelføring og nedrigging etter arrangementet'
			],
			optional: [
				'Ekstra time med teknisk assistent på stedet (+{price:technicianHour}/t)',
				'Moderne talerstol i akryl i premiumklasse (+{price:lectern})',
				'Modulære sceneplattformer (+{price:stagingPerSqm} per kvadratmeter)'
			],
			seo: { title: 'MICE Pack: leie AV-utstyr til konferanser i Malaga' },
			landing: {
				badge: 'MICE-opplevelse i premiumklasse for bedrifter',
				rateLabel: 'Totalpris for bedrifter, alt inkludert',
				vatNote: '(+{vat} MVA), LED-skjerm, lyd og tekniker på stedet inkludert',
				specTitle: 'LED-skjerm på 60 tommer',
				specBody: 'Storformatsskjerm i høy oppløsning som gir bedriftens visuelle presentasjoner et solid løft.',
				highlightTitle: 'Dedikert tekniker på stedet',
				highlightBody:
					'En spesialisert AV-tekniker driver arrangementet ditt i opptil 6 sammenhengende timer, og garanterer feilfri lyd, bilde og mikrofonhåndtering gjennom hele toppmøtet, konferansen eller produktlanseringen.',
				includesLabel: 'Dette er inkludert i premiumpakken',
				optionalLabel: 'Valgfrie tillegg',
				ctaHeading: 'Gi bedriftsarrangementet ditt ekstra kraft',
				ctaBody:
					'Lever en feilfri opplevelse for bedriften med AV-utstyr i premiumklasse og dedikert teknisk support. Kontakt teamet vårt i dag for å bekrefte tilgjengelighet for datoen din.',
				ctaButton: 'Bestill MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Hva er Malaga Event Gear (MEG), og hvilke tjenester tilbyr de?',
			answer:
				'Malaga Event Gear (MEG) er et selskap med base i Malaga, Spania, som spesialiserer seg på utleie av profesjonelt lyd-, lys- og arrangementsutstyr. Vi tilbyr lydanlegg, prosjektorer, lerret, scener, teknisk assistanse, røykmaskiner, lysløsninger og mikrofoner, samt spesialiserte tjenester som lydforsterkning ved livearrangementer, simultantolkning og interaktive avstemningssystemer, der de to siste formidles gjennom en underleverandør.'
		},
		'event-types': {
			question: 'Hvilke typer arrangementer kan Malaga Event Gear (MEG) betjene?',
			answer:
				'Vi dekker personlige feiringer som bryllup og private fester, profesjonelle sammenkomster som bedriftsarrangementer, møter, konferanser og produktpresentasjoner, samt større arrangementer som kongresser, messer og utstillinger, alltid med skreddersydde lyd- og bildeløsninger.'
		},
		'service-areas': {
			question: 'Hvor tilbyr Malaga Event Gear (MEG) sine tjenester?',
			answer:
				'Selv om "Malaga" står i navnet vårt, strekker tjenestene våre seg langt utover selve byen. Vi opererer hovedsakelig langs Costa del Sol, inkludert Malaga by, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena og Estepona. Vi betjener også Sevilla og Granada, selv om Granada vanligvis krever bookinger over {price:outOfProvinceMinimum} på grunn av reiseavstanden utenfor provinsen.'
		},
		'what-makes-unique': {
			question: 'Hva gjør Malaga Event Gear (MEG) unikt sammenlignet med andre selskaper som leier ut lyd- og bildeutstyr?',
			answer:
				'MEG skiller seg ut med en kundefokusert og strømlinjeformet tilnærming: levering og profesjonell installasjon av vårt eget team ved hver booking, en tekniker på stedet inkludert i Wedding Pack og MICE Pack, utstyr fra førsteklasses merker og transparente totalpriser. Vi beveger oss mot en heldigital bookingopplevelse med standardiserte faste priser og fullt transparente transaksjoner.'
		},
		'booking-process': {
			question: 'Hvordan fungerer bookingprosessen hos Malaga Event Gear?',
			answer:
				'Vår strømlinjeformede arbeidsflyt har fire trinn: 1. Velg pakken din. 2. Be om et tilbud med vårt raske forespørselsskjema. 3. Teamet vårt kontakter deg for å avklare detaljer og bekrefte bookingen. 4. Nyt et problemfritt arrangement mens vi tar hånd om levering, profesjonell installasjon, konfigurasjon og nedrigging. Merk at tjenester må bestilles minst 24 timer i forveien.'
		},
		'popular-packages': {
			question: 'Hva er noen av de populære pakkene som Malaga Event Gear tilbyr?',
			answer:
				'Blant våre mest populære ferdigdesignede pakker finner du {packagesWithPrices}, hver med ulikt utstyr og ulike funksjoner. Besøk prissiden vår for en full oversikt over hva hver pakke inkluderer.'
		},
		'language-hours': {
			question: 'På hvilke språk kommuniserer de med kunder, og hva er åpningstidene deres?',
			answer:
				'Malaga Event Gear (MEG) kommuniserer med kunder på engelsk og spansk. Vi er tilgjengelige 24 timer i døgnet, 7 dager i uken, for teknisk installasjon og overvåking av arrangementer mens de pågår.'
		},
		'contact-info': {
			question: 'Hvordan kan kunder kontakte Malaga Event Gear (MEG), og hvilken informasjon bør de oppgi?',
			answer:
				'Du kan nå oss på telefon 666 346 911, via WhatsApp eller på e-post. For å få et nøyaktig tilbud kan du oppgi arrangementsdato, sted, forventet antall gjester og hvilken type utstyr eller pakke du er interessert i. Se kontaktsiden vår for mer informasjon.'
		},
		'delivery-setup': {
			question: 'Tilbyr dere levering og installasjon av lyd- og lysutstyr?',
			answer:
				'Ja. MEG tilbyr full levering, profesjonell installasjon og nedrigging etter arrangementet for all utleie av lyd og lys. Tjenesten vår inkluderer transport, installasjon, skjult kabelføring, lyd-/lyssjekk og valgfri teknisk assistanse på stedet i Malaga, Marbella, Fuengirola, Torremolinos, Estepona og omkringliggende områder.'
		},
		'vat-pricing': {
			question: 'Inkluderer pakkeprisene deres MVA?',
			answer:
				'Nei, de oppgitte prisene inkluderer ikke MVA. Som angitt med (+{vat} MVA) ved siden av prisene, kommer den spanske standardsatsen på {vat} MVA (IVA) i tillegg til pakkeprisen. Det endelige tilbudet ditt viser både nettopris og MVA-oppdeling med full åpenhet.'
		},
		'on-site-technician': {
			question: 'Tilbyr dere en tekniker på stedet under arrangementet?',
			answer:
				'Ja. Flere pakker, som Wedding Pack og det fullstendige MICE Pack, inkluderer en dedikert tekniker på stedet som tar hånd om teknisk kontroll og support gjennom hele arrangementet. For pakker der dette ikke er inkludert (for eksempel Basic MICE Pack), kan teknisk assistanse på stedet legges til som tillegg fra {price:technicianDay} per dag.'
		},
		'equipment-brands': {
			question: 'Hvilke utstyrsmerker jobber dere med?',
			answer:
				'Vi bruker anerkjente profesjonelle merker fra arrangementsbransjen, blant annet Audix og HK Audio for lyd, Eurolite og ADJ for lys, og Martin for røykeffekter. Dette sikrer pålitelig lyd og lys i høy kvalitet ved hver booking.'
		},
		'delivery-only': {
			question: 'Tilbyr dere selvhenting, eller er det kun levering?',
			answer:
				'Vi opererer utelukkende med levering: det finnes ikke noe alternativ for selvhenting. Dette garanterer at hvert system kommer profesjonelt transportert, installert og kalibrert av teamet vårt, slik at utstyret fungerer akkurat som det skal på arrangementet ditt.'
		},
		'streaming-recording': {
			question: 'Tilbyr dere livestrømming og opptak med flere kameraer?',
			answer:
				'Nei. Vi tilbyr ikke kameraer, strømmeenkodere, videoproduksjon med flere kameraer eller opptakstjenester. Vi leverer lyd, skjerm og lys til rommet. Til et hybrid- eller virtuelt arrangement tar du med din egen datamaskin, strømmeprogramvare og internettilkobling.'
		},
		'translation-voting': {
			question: 'Tilbyr dere simultantolkning eller interaktive avstemningssystemer?',
			answer:
				'Ja, for simultantolkning og interaktive avstemningssystemer, men ikke med vårt eget utstyr: begge deler formidler vi gjennom en underleverandør for bedrifts- og kongressarrangementer. Gi oss beskjed om behovene dine når du ber om et tilbud. Vi tilbyr ikke LED-videovegg. Vår storformatsskjerm er et enkelt flatpanel på 60 tommer.'
		},
		'large-scale-events': {
			question: 'Kan dere håndtere store kongresser, messer og utstillinger?',
			answer:
				'Absolutt. I tillegg til bryllup og bedriftsmøter utstyrer vi også større arrangementer som kongresser, messer og utstillinger med skreddersydde lyd- og bildeløsninger, og kombinerer lydforsterkning, storformatsskjermer, scener og dedikert teknisk personale etter behov.'
		},
		'notice-time': {
			question: 'Hvor lang varslingstid kreves for en booking?',
			answer:
				'All utleie av arrangementsutstyr og tekniske tjenester må bestilles med minst 24 timers varsel for å garantere planlegging og logistisk tilgjengelighet. For store eller komplekse arrangementer anbefaler vi at du booker så tidlig som mulig for å sikre datoen din.'
		},
		'minimum-order-granada': {
			question: 'Er det et minstebeløp for oppdrag utenfor Costa del Sol?',
			answer:
				'Innenfor Costa del Sol er det ikke noe spesielt minstebeløp. For mer fjerntliggende destinasjoner utenfor provinsen, som Granada, krever vi en minste leieverdi over {price:outOfProvinceMinimum} for å dekke den logistiske endagsreisen. Vi betjener også Sevilla. Kontakt oss for å bekrefte vilkårene for ditt spesifikke sted.'
		},
		'customize-package': {
			question: 'Kan jeg tilpasse eller utvide en pakke etter mine spesifikke behov?',
			answer:
				'Ja. Alle pakker kan utvides med tillegg som prosjektorer og lerret, profesjonelle røykmaskiner, ekstra mikrofoner, talerstoler i akryl i premiumklasse, modulære sceneplattformer og ekstra timer med tekniker på stedet. Fortell oss om behovene dine når du ber om et tilbud, så bygger vi den perfekte konfigurasjonen for arrangementet ditt.'
		}
	}
} satisfies DataCopy;
