import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: 'Met het Eco Pack huur je een voordelige geluidsset voor je feest in Malaga, ideaal voor privéfeesten of kleine evenementen tot 50 gasten. Inclusief degelijk basisgeluid en sfeerverlichting.',
			includes: [
				'2 hoogwaardige actieve speakers met standaards',
				'1 bekabelde dynamische microfoon',
				'2 lichtbalken met RGBW-LED-spots',
				'Esthetische bekabeling en professionele opbouw'
			],
			optional: ['Beamer & projectiescherm (+{price:projectorScreen})', 'Professionele rookmachine (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack: geluidsset huren voor je feest in Malaga | MEG' },
			landing: {
				badge: 'Kleine evenementen & feesten',
				rateLabel: 'Voordelig totaaltarief',
				vatNote: '(+{vat} btw), opbouw en vervoer inbegrepen',
				specTitle: 'Tot 50 gasten',
				specBody: 'Perfect voor villa\'s, tuinen en privézalen.',
				highlightTitle: 'Zorgeloze service',
				highlightBody:
					'We werken uitsluitend op basis van levering met rechtstreekse opbouw. We brengen de apparatuur, installeren deze professioneel, testen geluid en licht, en halen alles weer op na het evenement.',
				includesLabel: 'Wat is inbegrepen',
				optionalLabel: 'Optionele extra\'s',
				ctaHeading: 'Leg je boeking nu vast',
				ctaBody:
					'Vul ons snelle offerteformulier in om de beschikbaarheid van dit pakket voor jouw datum te checken. We reageren zo snel mogelijk!',
				ctaButton: 'Boek dit pakket'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: 'Het Wedding Pack is tot in de puntjes ontworpen voor magische, onvergetelijke bruiloften. Zo huur je geluid en licht voor je bruiloft op topniveau: een professioneel geluidssysteem van topkwaliteit, romantische sfeerverlichting en draadloze microfoons voor ontroerende speeches.',
			includes: [
				'Actief PA-systeem van topkwaliteit voor maximaal 80 gasten',
				'Lichtsnoeren / warme LED-strings voor romantische sfeerverlichting',
				'Professionele draadloze microfoons voor speeches en aankondigingen',
				'Vervoer in Malaga en omstreken',
				'Professionele, esthetische opbouw en bekabeling',
				'Live technische controle en ondersteuning ter plaatse tijdens het evenement',
				'Snelle afbraak en ophalen van de apparatuur na afloop'
			],
			optional: ['Professionele rookmachine (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack: geluid en licht voor je bruiloft in Malaga' },
			landing: {
				badge: 'Ons populairste feestpakket',
				rateLabel: 'Premium totaaltarief',
				vatNote: '(+{vat} btw), opbouw en live ondersteuning inbegrepen',
				specTitle: 'Tot 80 gasten',
				specBody: 'Perfect voor prachtige villa\'s, finca\'s en trouwhotels.',
				highlightTitle: 'Live technicus ter plaatse',
				highlightBody:
					'Geen zorgen meer over rondzingende microfoons of beeldproblemen. Dit pakket omvat volledige live technische monitoring en akoestische bijstellingen tijdens je diner en de speeches.',
				includesLabel: 'Inbegrepen premiumdiensten',
				ctaHeading: 'Maak van je viering iets magisch',
				ctaBody:
					'Bruiloftsdata raken snel volgeboekt. Leg je datum vandaag nog vast bij ons technisch team voor het beste geluid en de mooiste sfeerverlichting op je grote dag.',
				ctaButton: 'Boek dit Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Ontworpen voor zakelijke presentaties, showroomevenementen en productlanceringen met grote visuele impact. Zo huur je een beamer en scherm voor je presentatie, met haarscherpe beelden.',
			includes: [
				'1 frontprojectiescherm met stabiele standaard',
				'1 beamer met hoge lichtopbrengst (5000 lumen) voor haarscherpe beelden',
				'Geluidssysteem voor de locatie met 2 speakers & mengpaneel',
				'1 premium draadloze handmicrofoon voor sprekers'
			],
			seo: { title: 'Product Presentation Pack: beamer en scherm huren in Malaga' },
			landing: {
				badge: 'Zakelijke oplossingen met grote visuele impact',
				rateLabel: 'Vast tarief Presentation Pack',
				vatNote: '(+{vat} btw), beamer en scherm inbegrepen',
				specTitle: 'Beamer met hoge lichtopbrengst',
				specBody: '5000 lumen beamer, ideaal voor verlichte ruimtes.',
				highlightTitle: 'Vlekkeloze zakelijke uitstraling',
				highlightBody:
					'Maximaliseer de aandacht bij je showroomlancering, hotelperspresentatie of productshowcase. Onze professionele opbouw combineert haarscherpe beelden met krachtige spraakversterking.',
				includesLabel: 'Wat is inbegrepen',
				note: {
					title: 'Ondersteuning bij opbouw & aansluiting',
					body: 'We zorgen voor alle benodigde adapters (HDMI, USB-C) en audio-interfaces om je bedrijfslaptops, tablets of mediaspelers naadloos aan te sluiten.'
				},
				ctaHeading: 'Til je productpresentatie naar een hoger niveau',
				ctaBody:
					'Geef je publiek de visuele helderheid en het professionele geluid die het verdient. Neem vandaag nog contact op met ons technisch team om de beschikbaarheid te bevestigen.',
				ctaButton: 'Boek dit Presentation Pack'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Essentiële, krachtige audiovisuele opstelling voor kleine directievergaderingen, conferenties en presentaties tot 40 gasten. Ideaal als je vergaderapparatuur wilt huren voor een kleine bijeenkomst.',
			includes: [
				'2x2 m projectiescherm en een beamer met hoge lichtopbrengst (3000 lumen)',
				'Eenvoudig geluidsversterkingssysteem met kristalhelder geluid voor maximaal 40 personen',
				'1 professionele zwanenhalsmicrofoon voor podium/spreekgestoelte',
				'Logistiek vervoer, opbouw en esthetische bekabeling'
			],
			optional: ['Vaste technische assistent ter plaatse (+{price:technicianDay}/dag)'],
			seo: { title: 'Basic MICE Pack: vergaderapparatuur huren in Malaga | MEG' },
			landing: {
				badge: 'Essentiële pakketten voor directievergaderingen',
				rateLabel: 'Vast tarief zakelijke vergadering',
				vatNote: '(+{vat} btw), opbouw en vervoer inbegrepen',
				specTitle: 'Tot 40 gasten',
				specBody: 'Ontworpen voor boardrooms, privésalons en hotelsuites.',
				highlightTitle: 'Kristalheldere spraakverstaanbaarheid',
				highlightBody:
					'De professionele opstelling met zwanenhalsmicrofoon garandeert absolute helderheid bij directietoespraken, persaankondigingen of investeerderspanels, zonder echo of rondzingen.',
				includesLabel: 'Wat is inbegrepen',
				optionalLabel: 'Optionele ondersteuning',
				ctaHeading: 'Plan je directievergadering',
				ctaBody:
					'Coördineer naadloze zakelijke AV-logistiek met Malaga Event Gear. Neem contact op met onze experts voor een professionele boardroomervaring.',
				ctaButton: 'Boek Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'Complete zakelijke MICE-oplossing met een groot beeldscherm, premium actieve geluidsversterking, draadloze podiummicrofoons en een vaste technicus ter plaatse. Zo huur je congrestechniek in Malaga waarbij aan elk detail van je evenement is gedacht.',
			includes: [
				'Premium HD-LED-scherm van 60 inch met designstandaard',
				'Professionele actieve speakers en krachtig geluidssysteem',
				'1 zwanenhalsmicrofoon + 1 draadloze handmicrofoon',
				'1 vaste, gespecialiseerde AV-technicus ter plaatse (tot 6 uur onafgebroken ondersteuning)',
				'Logistieke levering, bekabeling op maat en afbraak na afloop'
			],
			optional: [
				'Extra uur live technische ondersteuning (+{price:technicianHour}/u)',
				'Modern premium spreekgestoelte van methacrylaat/acryl (+{price:lectern})',
				'Modulaire podiumplatforms (+{price:stagingPerSqm} per vierkante meter)'
			],
			seo: { title: 'MICE Pack: congrestechniek huren in Malaga | MEG' },
			landing: {
				badge: 'Premium zakelijke MICE-ervaring',
				rateLabel: 'Zakelijk totaaltarief',
				vatNote: '(+{vat} btw), LED-scherm, geluid en live technicus inbegrepen',
				specTitle: '60 inch LED-scherm',
				specBody: 'Groot HD-scherm voor indrukwekkende zakelijke beelden.',
				highlightTitle: 'Vaste technicus ter plaatse',
				highlightBody:
					'Een gespecialiseerde AV-technicus begeleidt je evenement tot 6 uur onafgebroken en garandeert vlekkeloos geluid, beeld en microfoonbeheer tijdens je top, conferentie of productlancering.',
				includesLabel: 'Inbegrepen premiumdiensten',
				optionalLabel: 'Optionele extra\'s',
				ctaHeading: 'Geef je zakelijke evenement extra slagkracht',
				ctaBody:
					'Bied een vlekkeloze zakelijke ervaring met premium AV-apparatuur en vaste technische ondersteuning. Neem vandaag nog contact op met ons team om de beschikbaarheid voor je datum te bevestigen.',
				ctaButton: 'Boek MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Wat is Malaga Event Gear (MEG) en welke diensten bieden zij aan?',
			answer:
				'Malaga Event Gear (MEG) is een bedrijf gevestigd in Malaga, Spanje, gespecialiseerd in de verhuur van professionele audiovisuele, verlichtings- en evenementapparatuur. We leveren geluidssystemen, beamers, schermen, podia, technische ondersteuning, een rookmachine, verlichtingsoplossingen en microfoons, plus gespecialiseerde diensten zoals live geluidsversterking. Simultaanvertaling en interactieve stemsystemen regelen we via een onderaannemer.'
		},
		'event-types': {
			question: 'Voor welke soorten evenementen kan Malaga Event Gear (MEG) zorgen?',
			answer:
				'We verzorgen persoonlijke vieringen zoals bruiloften en privéfeesten, zakelijke bijeenkomsten zoals bedrijfsevenementen, vergaderingen, conferenties en productpresentaties, en grootschalige evenementen zoals congressen, beurzen en exposities, altijd met audiovisuele oplossingen op maat.'
		},
		'service-areas': {
			question: 'Waar biedt Malaga Event Gear (MEG) haar diensten aan?',
			answer:
				'Hoewel "Malaga" in onze naam zit, reikt onze dienstverlening ver voorbij de stad. We zijn vooral actief aan de hele Costa del Sol, waaronder Malaga stad, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena en Estepona. We bedienen ook Sevilla en Granada, al is voor Granada doorgaans een boeking van meer dan {price:outOfProvinceMinimum} vereist vanwege de reisafstand buiten de provincie.'
		},
		'what-makes-unique': {
			question: 'Wat maakt Malaga Event Gear (MEG) uniek in vergelijking met andere verhuurbedrijven voor audiovisuele apparatuur?',
			answer:
				'MEG onderscheidt zich door een klantgerichte, gestroomlijnde aanpak: levering en professionele opbouw door ons eigen team bij elke boeking, een technicus ter plaatse bij het Wedding Pack en het MICE Pack, apparatuur van premium merken en transparante totaalprijzen. We werken toe naar een 100% online boekingservaring met vaste, gestandaardiseerde prijzen en volledig transparante transacties.'
		},
		'booking-process': {
			question: 'Hoe verloopt het boekingsproces bij Malaga Event Gear?',
			answer:
				'Ons gestroomlijnde proces bestaat uit vier stappen: 1. Kies je pakket. 2. Vraag een offerte aan via ons snelle contactformulier. 3. Ons team neemt contact met je op om de details af te ronden en de boeking te bevestigen. 4. Geniet van een zorgeloos evenement terwijl wij zorgen voor levering, professionele opbouw, configuratie en afbraak. Let op: diensten moeten minstens 24 uur van tevoren worden geboekt.'
		},
		'popular-packages': {
			question: 'Wat zijn enkele populaire pakketten van Malaga Event Gear?',
			answer:
				'Onze populairste vooraf samengestelde pakketten zijn onder meer {packagesWithPrices}, elk met andere apparatuur en kenmerken. Bekijk onze prijzenpagina voor het volledige overzicht van wat elk pakket bevat.'
		},
		'language-hours': {
			question: 'In welke taal communiceren zij met klanten en wat zijn hun openingstijden?',
			answer:
				'Malaga Event Gear (MEG) communiceert met klanten in het Engels en Spaans. We zijn 24 uur per dag, 7 dagen per week bereikbaar voor technische opbouw en live evenementmonitoring.'
		},
		'contact-info': {
			question: 'Hoe kunnen klanten contact opnemen met Malaga Event Gear (MEG), en welke informatie moeten zij verstrekken?',
			answer:
				'Je kunt ons telefonisch bereiken op 666 346 911, via WhatsApp of per e-mail. Voor een nauwkeurige offerte vragen we je om de datum van je evenement, de locatie, het verwachte aantal gasten en het type apparatuur of pakket waarin je interesse hebt door te geven. Bekijk onze contactpagina voor meer informatie.'
		},
		'delivery-setup': {
			question: 'Bieden jullie levering en opbouw voor geluids- en lichtapparatuur?',
			answer:
				'Ja. MEG verzorgt volledige levering, professionele opbouw en afbraak na afloop voor alle geluids- en lichtverhuur. Onze service omvat vervoer, installatie, wegwerken van kabels, geluids- en lichtcontroles, en optionele technische ondersteuning ter plaatse in Málaga, Marbella, Fuengirola, Torremolinos, Estepona en omliggende regio\'s.'
		},
		'vat-pricing': {
			question: 'Zijn jullie pakketprijzen inclusief btw?',
			answer:
				'Nee, de vermelde prijzen zijn exclusief btw. Zoals aangegeven met (+{vat} btw) naast de tarieven, wordt het standaard Spaanse btw-tarief (IVA) van {vat} bovenop de pakketprijs berekend. Je definitieve offerte toont zowel de nettoprijs als de btw-uitsplitsing, met volledige transparantie.'
		},
		'on-site-technician': {
			question: 'Bieden jullie een technicus ter plaatse tijdens het evenement?',
			answer:
				'Ja. Verschillende pakketten, zoals het Wedding Pack en het volledige MICE Pack, omvatten een vaste technicus die tijdens je hele evenement zorgt voor technische controle en ondersteuning. Bij pakketten waar dit niet is inbegrepen (bijvoorbeeld het Basic MICE Pack), kan technische ondersteuning ter plaatse optioneel worden toegevoegd vanaf {price:technicianDay} per dag.'
		},
		'equipment-brands': {
			question: 'Met welke apparatuurmerken werken jullie?',
			answer:
				'We gebruiken professionele topmerken waarop de evenementenbranche vertrouwt, waaronder Audix en HK Audio voor geluid, Eurolite en ADJ voor verlichting en Martin voor onze rookmachine. Zo garanderen we bij elke boeking betrouwbaar geluid en licht van hoge kwaliteit.'
		},
		'delivery-only': {
			question: 'Bieden jullie een zelfafhaaloptie, of werken jullie uitsluitend met levering?',
			answer:
				'We werken uitsluitend op basis van levering. Er is geen zelfafhaaloptie. Dit garandeert dat elk systeem professioneel wordt vervoerd, geïnstalleerd en gekalibreerd door ons team, zodat de apparatuur precies werkt zoals bedoeld tijdens je evenement.'
		},
		'streaming-recording': {
			question: 'Bieden jullie livestreaming en multicamera-opnames aan?',
			answer:
				'Niet uit onze eigen voorraad. Camera\'s, filmopnames en livestreaming horen daar niet bij, dus we verzorgen zelf geen productie met meerdere camera\'s. Wij leveren het geluid, het scherm en de verlichting in de zaal, en voor een hybride of virtueel evenement neem je meestal zelf je laptop, streamingsoftware en internetverbinding mee. Heeft je evenement een cameraploeg of een streamingopstelling nodig, laat het ons weten: we kunnen nagaan of een van onze leveranciers dat kan verzorgen, als die er is.'
		},
		'translation-voting': {
			question: 'Bieden jullie simultaanvertaling of interactieve stemsystemen aan?',
			answer:
				'Ja, we verzorgen simultaanvertaling en interactieve stemsystemen, zij het niet met eigen apparatuur: we regelen beide via een onderaannemer voor zakelijke evenementen en congressen. Laat ons je wensen weten bij het aanvragen van een offerte. We bieden geen LED-videowall aan. Ons grote beeldscherm is één flatscreen van 60 inch.'
		},
		'large-scale-events': {
			question: 'Kunnen jullie grootschalige congressen, beurzen en exposities aan?',
			answer:
				'Absoluut. Naast bruiloften en zakelijke vergaderingen verzorgen we ook grootschalige evenementen zoals congressen, beurzen en exposities met audiovisuele oplossingen op maat, waarbij we geluidsversterking, grote schermen, podia en vast technisch personeel combineren waar nodig.'
		},
		'notice-time': {
			question: 'Hoe ver van tevoren moet ik minimaal boeken?',
			answer:
				'Alle verhuur van evenementapparatuur en technische diensten moet minstens 24 uur van tevoren worden geboekt, om planning en logistieke beschikbaarheid te garanderen. Voor grote of complexe evenementen raden we aan zo vroeg mogelijk te boeken om je datum vast te leggen.'
		},
		'minimum-order-granada': {
			question: 'Is er een minimumbestelling voor service buiten de Costa del Sol?',
			answer:
				'Binnen de Costa del Sol geldt geen speciaal minimum. Voor verder gelegen bestemmingen buiten de provincie, zoals Granada, vragen we een minimale huurwaarde van meer dan {price:outOfProvinceMinimum} om de logistieke reis van een dag te dekken. Ook Sevilla wordt bediend. Neem contact op om de voorwaarden voor jouw specifieke locatie te bevestigen.'
		},
		'customize-package': {
			question: 'Kan ik een pakket aanpassen of uitbreiden voor mijn specifieke wensen?',
			answer:
				'Ja. Elk pakket kan worden uitgebreid met extra\'s zoals beamers en schermen, een professionele rookmachine (Martin Magnum 650), extra microfoons, premium spreekgestoelten van acryl, modulaire podiumplatforms en extra uren van een technicus ter plaatse. Vertel ons je wensen bij het aanvragen van een offerte en we stellen de perfecte configuratie samen voor je evenement.'
		}
	},
	gallery: {
		'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp': 'Details van een huwelijksceremonie',
		'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp': 'Elegante decoratie van een bruiloftsreceptie',
		'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp': 'Gedekte en versierde tafel voor een bruiloft op het strand',
		'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp': 'Romantisch gedekte bruiloftstafel',
		'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp': 'Dinertafel van een avondbruiloft met zacht licht',
		'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp': 'Prachtige opstelling voor een huwelijksceremonie op het strand',
		'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp': 'Ingerichte zaal voor een huwelijksceremonie binnen',
		'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp': 'Ceremonieboog van een tropische strandbruiloft',
		'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp': 'Gangpad met stoelen bij een tropische strandbruiloft',
		'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp': 'AV-installatie te huur voor een internationaal evenement in Malaga',
		'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp': 'Illustratieve foto van een congreszaal met projectieschermen en een camera op een statief',
		'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp': 'Geluid te huur voor de vergadering van een beroepsvereniging',
		'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp': 'Geluidsinstallatie voor een buurtvergadering',
		'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp': 'Geluid en licht op het podium bij een MICE-evenement',
		'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp': 'Geluidssysteem te huur voor een grootschalig congres',
		'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp': 'Podiumopstelling voor een congres in Hotel Alfonso XIII',
		'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp': 'AV-opstelling voor een zakelijk MICE-evenement van Volvo',
		'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp': 'Spreekgestoelte van methacrylaat bij een evenement buiten',
		'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp': 'Professioneel beeldscherm, projector en geluidssysteem te huur',
		'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp': 'Indrukwekkende installatie met licht en geluid voor een evenement',
		'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp': 'Licht en geluid voor een evenement met scherm',
		'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp': 'Geluidsinstallatie voor een tenniskampioenschap',
		'https://cdn.malagaeventgear.com/blog/1191/billie-jean-king-cup-2024-celebration-lights-sound-600x450.webp': 'Licht en geluid bij de viering van een sportbeker',
		'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp': 'Opstelling van DJ-geluid en microfoons',
		'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp': 'Professionele evenementverlichting en projectiescherm',
		'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp': 'Podium, geluid, beeld en opstelling op maat',
		'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp': 'Concertverlichting, microfoons en geluid te huur',
		'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp': 'Geluidssysteem te huur voor feesten en evenementen buiten',
		'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp': 'Geluid en licht te huur voor evenementen met een liveband',
		'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp': 'Vijf beeldschermen op een rij op een exposantenstand op ECOC 2026, Malaga',
		'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp': 'Drie standschermen geïnstalleerd voor een exposant op de beurs van ECOC 2026',
		'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp': 'Afgewerkte exposantenstand op ECOC 2026 met geïnstalleerd beeldscherm',
		'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp': 'Standscherm geïnstalleerd op de beurs van ECOC 2026 in Malaga',
		'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp': 'Scherm voor technologiedemonstraties op een exposantenstand van ECOC 2026',
		'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp': 'Standschermen met live productcontent op ECOC 2026, Malaga',
		'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp': 'Teams van exposanten nemen hun stands in gebruik op ECOC 2026, FYCMA Malaga',
		'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp': 'Exposanten sluiten laptops aan op hun standschermen op ECOC 2026',
		'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp': 'Beeldschermen op naburige exposantenstands op ECOC 2026',
		'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp': 'Opbouw op de beursvloer van ECOC 2026 in FYCMA, Malaga',
		'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp': 'Bezoekers naast een standscherm op de beurs van ECOC 2026'
	}
} satisfies DataCopy;
