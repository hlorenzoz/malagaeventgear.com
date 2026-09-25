import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: 'Eco Pack är det perfekta billiga festpaketet att hyra i Malaga, för privata fester eller mindre evenemang med upp till 50 gäster. Inkluderar ett stabilt grundläggande ljudsystem och stämningsbelysning.',
			includes: [
				'2 högkvalitativa aktiva högtalare med stativ',
				'1 trådbunden dynamisk mikrofon',
				'2 LED-ljusbalkar med RGBW-spotlights',
				'Estetisk kabeldragning och professionell installation'
			],
			optional: ['Projektor och projektorduk (+{price:projectorScreen})', 'Professionell rök-/dimmaskin (+{price:smokeMachine})'],
			seo: { title: 'Eco Pack: hyr billigt festpaket med ljud och ljus i Malaga' },
			landing: {
				badge: 'Mindre evenemang och fester',
				rateLabel: 'Prisvärt fast totalpris',
				vatNote: '(+{vat} moms), installation och transport ingår',
				specTitle: 'Upp till 50 gäster',
				specBody: 'Perfekt för villor, trädgårdar och privata lokaler.',
				highlightTitle: 'Stressfri service',
				highlightBody:
					'Vi arbetar enbart med leverans och direkt installation. Vi tar med utrustningen, installerar den professionellt, testar ljud och ljus, och hämtar allt efter evenemanget.',
				includesLabel: 'Det här ingår',
				optionalLabel: 'Valfria tillägg',
				ctaHeading: 'Säkra din bokning idag',
				ctaBody:
					'Fyll i vår snabba offertförfrågan för att kontrollera paketets tillgänglighet för ditt datum. Vi återkommer så snart som möjligt!',
				ctaButton: 'Boka detta paket'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: 'Wedding Pack är skapat för magiska och oförglömliga bröllop. Hyr ljud och ljus till bröllop av högsta klass: ett professionellt ljudsystem i toppklass, romantisk stämningsbelysning och trådlösa mikrofoner för rörande tal.',
			includes: [
				'Förstklassigt aktivt PA-ljudsystem för upp till 80 gäster',
				'Ljusslingor/varma LED-slingor för romantisk stämningsbelysning',
				'Professionella trådlösa mikrofoner för tal och tillkännagivanden',
				'Transport i Malaga med omnejd',
				'Professionell estetisk installation och kabeldragning',
				'Teknisk kontroll och support på plats under evenemanget',
				'Snabb nedmontering och hämtning efter evenemanget'
			],
			optional: ['Professionell rök-/dimmaskin (+{price:smokeMachine})'],
			seo: { title: 'Wedding Pack: hyr ljud och ljus till bröllop i Malaga' },
			landing: {
				badge: 'Vårt mest populära firandepaket',
				rateLabel: 'Fast totalpris i premiumklass',
				vatNote: '(+{vat} moms), installation och support på plats ingår',
				specTitle: 'Upp till 80 gäster',
				specBody: 'Perfekt för vackra villor, fincas och bröllopshotell.',
				highlightTitle: 'Tekniker på plats under hela evenemanget',
				highlightBody:
					'Du behöver aldrig oroa dig för mikrofonrundgång eller visuella problem. Paketet inkluderar fullständig teknisk övervakning och akustiska justeringar på plats under hela middagen och alla tal.',
				includesLabel: 'Det här ingår i premiumpaketet',
				ctaHeading: 'Gör ditt firande magiskt',
				ctaBody:
					'Bröllopsdatumen bokas snabbt. Säkra ditt datum med vårt tekniska team idag för att garantera det bästa ljudet och den mest romantiska belysningen på din stora dag.',
				ctaButton: 'Boka Wedding Pack'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Utformat för företagspresentationer, återförsäljarvisningar och produktlanseringar med stort visuellt intryck. Hyr projektor och duk för din presentation, med skarpa och tydliga bilder.',
			includes: [
				'1 frontprojektionsduk med stabilt stativ',
				'1 projektor med hög ljusstyrka (5000 lumen) för skarpa bilder',
				'Ljudsystem för lokalen med 2 högtalare och mixerbord',
				'1 trådlös handmikrofon av premiumkvalitet för talare'
			],
			seo: { title: 'Product Presentation Pack: hyr projektor och duk i Malaga' },
			landing: {
				badge: 'Företagslösningar med stort visuellt intryck',
				rateLabel: 'Fast pris för presentationspaketet',
				vatNote: '(+{vat} moms), projektor och duk ingår',
				specTitle: 'Projektor med hög ljusstyrka',
				specBody: 'Projektor på 5000 lumen, perfekt för ljusa lokaler.',
				highlightTitle: 'Felfri företagsprofilering',
				highlightBody:
					'Maximera uppmärksamheten vid din återförsäljarlansering, presskonferens eller produktvisning. Vår professionella installation kombinerar skarpa grafiska detaljer med kraftfull ljudförstärkning för tal.',
				includesLabel: 'Det här ingår',
				note: {
					title: 'Support för installation och anslutning',
					body: 'Vi tillhandahåller alla nödvändiga adaptrar (HDMI, USB-C) och ljudgränssnitt så att du smidigt kan ansluta företagets bärbara datorer, surfplattor eller spelare.'
				},
				ctaHeading: 'Lyft din produktvisning',
				ctaBody:
					'Ge din publik den visuella tydlighet och det professionella ljud de förtjänar. Kontakta vårt tekniska team idag för att bekräfta tillgänglighet.',
				ctaButton: 'Boka presentationspaketet'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Grundläggande, högpresterande ljud- och bildutrustning för mindre chefsmöten, konferenser och presentationer med upp till 40 gäster. Perfekt när du vill hyra konferensutrustning i mindre skala.',
			includes: [
				'2x2 m projektionsduk och projektor med hög ljusstyrka (3000 lumen)',
				'Grundläggande kristallklart ljudsystem för upp till 40 personer',
				'1 professionell gåshalsmikrofon för podium/talarstol',
				'Transport, installation och estetisk kabeldragning'
			],
			optional: ['Dedikerad teknisk assistent på plats (+{price:technicianDay}/dag)'],
			seo: { title: 'Basic MICE Pack: hyr konferensutrustning i Malaga' },
			landing: {
				badge: 'Grundläggande paket för chefsmöten',
				rateLabel: 'Fast pris för företagsmöten',
				vatNote: '(+{vat} moms), installation och transport ingår',
				specTitle: 'Upp till 40 gäster',
				specBody: 'Utformat för styrelserum, privata salonger och hotellsviter.',
				highlightTitle: 'Hög taltydlighet',
				highlightBody:
					'Den professionella gåshalsmikrofonen garanterar absolut tydlighet vid styrelseanföranden, presskonferenser eller investerarpaneler, utan eko eller rundgång.',
				includesLabel: 'Det här ingår',
				optionalLabel: 'Valfri support',
				ctaHeading: 'Planera ditt chefsmöte',
				ctaBody:
					'Koordinera smidig teknisk logistik för ditt företagsevenemang med Malaga Event Gear. Kontakta våra experter för att säkra en professionell mötesupplevelse.',
				ctaButton: 'Boka Basic MICE Pack'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'Komplett MICE-lösning för företag med en storformatsskärm, förstklassig aktiv ljudförstärkning, trådlösa podiemikrofoner och en dedikerad livetekniker. Hyr kongressteknik i Malaga med allt som ditt evenemang behöver.',
			includes: [
				'60-tums LED-skärm i hög definition och premiumkvalitet, med designstativ',
				'Professionella aktiva högtalare och kraftfullt ljudsystem',
				'1 gåshalsmikrofon + 1 trådlös handmikrofon',
				'1 dedikerad AV-tekniker på plats (upp till 6 timmars sammanhängande support)',
				'Leverans, skräddarsydd kabeldragning och nedmontering efter evenemanget'
			],
			optional: [
				'Extra timme med teknisk support på plats (+{price:technicianHour}/h)',
				'Modern talarstol i metakrylat/akryl av premiumkvalitet (+{price:lectern})',
				'Modulära scenplattformar (+{price:stagingPerSqm} per kvadratmeter)'
			],
			seo: { title: 'MICE Pack: hyr kongressteknik i Malaga' },
			landing: {
				badge: 'MICE-upplevelse i premiumklass för företag',
				rateLabel: 'Fast totalpris för företag',
				vatNote: '(+{vat} moms), LED-skärm, ljud och livetekniker ingår',
				specTitle: '60-tums LED-skärm',
				specBody: 'Storformatsskärm i hög definition för slagkraftiga företagsbilder.',
				highlightTitle: 'Dedikerad livetekniker',
				highlightBody:
					'En specialiserad AV-tekniker sköter ditt evenemang i upp till 6 sammanhängande timmar och garanterar felfritt ljud, bild och mikrofonhantering under hela ditt toppmöte, din konferens eller produktlansering.',
				includesLabel: 'Det här ingår i premiumpaketet',
				optionalLabel: 'Valfria tillägg',
				ctaHeading: 'Gör ditt företagsevenemang slagkraftigt',
				ctaBody:
					'Erbjud en felfri företagsupplevelse med förstklassig AV-utrustning och dedikerad teknisk support. Kontakta vårt team idag för att bekräfta tillgänglighet för ditt datum.',
				ctaButton: 'Boka MICE Pack'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Vad är Malaga Event Gear (MEG), och vilka tjänster erbjuder de?',
			answer:
				'Malaga Event Gear (MEG) är ett företag baserat i Malaga, Spanien, som specialiserar sig på uthyrning av professionell ljud-, bild-, ljus- och eventutrustning. Vi tillhandahåller ljudsystem, projektorer, dukar, scener, teknisk assistans, en rökmaskin, belysningslösningar och mikrofoner, samt specialiserade tjänster som ljudförstärkning live, simultantolkning och interaktiva röstningssystem, där de två sistnämnda ordnas genom en underleverantör.'
		},
		'event-types': {
			question: 'Vilka typer av evenemang kan Malaga Event Gear (MEG) täcka?',
			answer:
				'Vi täcker personliga firanden som bröllop och privata fester, professionella sammankomster som företagsevenemang, möten, konferenser och produktpresentationer, samt större evenemang som kongresser, mässor och utställningar, alltid med skräddarsydda ljud- och bildlösningar.'
		},
		'service-areas': {
			question: 'Var erbjuder Malaga Event Gear (MEG) sina tjänster?',
			answer:
				'Även om "Malaga" ingår i vårt namn sträcker sig våra tjänster långt bortom staden. Vi verkar främst längs Costa del Sol, inklusive Malaga stad, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena och Estepona. Vi betjänar även Sevilla och Granada, även om Granada vanligtvis kräver bokningar över {price:outOfProvinceMinimum} på grund av reseavståndet utanför provinsen.'
		},
		'what-makes-unique': {
			question:
				'Vad gör Malaga Event Gear (MEG) unikt jämfört med andra företag för uthyrning av ljud- och bildutrustning?',
			answer:
				'MEG skiljer sig genom ett kundfokuserat och strömlinjeformat arbetssätt: leverans och professionell installation av vårt eget team vid varje bokning, en tekniker på plats som ingår i Wedding Pack och MICE Pack, förstklassiga varumärken och transparenta fasta totalpriser. Vi arbetar mot en bokningsupplevelse helt online, med standardiserade fasta priser och fullt transparenta transaktioner.'
		},
		'booking-process': {
			question: 'Hur fungerar bokningsprocessen hos Malaga Event Gear?',
			answer:
				'Vårt strömlinjeformade arbetsflöde har fyra steg: 1. Välj ditt paket. 2. Begär en offert med vårt snabba förfrågningsformulär. 3. Vårt team kontaktar dig för att fastställa detaljerna och bekräfta bokningen. 4. Njut av ett problemfritt evenemang medan vi sköter leverans, professionell installation, konfiguration och nedmontering. Observera att tjänster måste bokas minst 24 timmar i förväg.'
		},
		'popular-packages': {
			question: 'Vilka är några av de populära paketen som Malaga Event Gear erbjuder?',
			answer:
				'Bland våra mest populära färdiga paket finns {packagesWithPrices}, vart och ett med olika utrustning och funktioner. Besök vår prissida för en fullständig genomgång av vad varje paket innehåller.'
		},
		'language-hours': {
			question: 'På vilka språk kommunicerar de med kunder, och vilka är deras öppettider?',
			answer:
				'Malaga Event Gear (MEG) kommunicerar med kunder på engelska och spanska. Vi är tillgängliga dygnet runt, alla dagar i veckan, för teknisk installation och övervakning av evenemang medan de pågår.'
		},
		'contact-info': {
			question: 'Hur kan kunder kontakta Malaga Event Gear (MEG), och vilken information bör de uppge?',
			answer:
				'Du kan nå oss på telefon 666 346 911, via WhatsApp eller via e-post. För en korrekt offert, uppge gärna ditt evenemangsdatum, plats, förväntat antal gäster och vilken typ av utrustning eller paket du är intresserad av. Se vår kontaktsida för mer information.'
		},
		'delivery-setup': {
			question: 'Erbjuder ni leverans och installation för ljud- och belysningsutrustning?',
			answer:
				'Ja. MEG tillhandahåller komplett leverans, professionell installation och nedmontering efter evenemanget för all ljud- och belysningsuthyrning. Vår tjänst inkluderar transport, installation, dold kabeldragning, ljud-/ljuskontroller och valfri teknisk assistans på plats i Malaga, Marbella, Fuengirola, Torremolinos, Estepona och omgivande områden.'
		},
		'vat-pricing': {
			question: 'Är era paketpriser inklusive moms?',
			answer:
				'Nej, de angivna priserna inkluderar inte moms. Som anges med (+{vat} moms) bredvid priserna tillkommer den spanska standardmomsen på {vat} (IVA) ovanpå paketpriset. Din slutliga offert visar både nettopriset och momsuppdelningen med full transparens.'
		},
		'on-site-technician': {
			question: 'Tillhandahåller ni en tekniker på plats under evenemanget?',
			answer:
				'Ja. Flera paket, som Wedding Pack och det fullständiga MICE Pack, inkluderar en dedikerad livetekniker som sköter teknisk kontroll och support under hela ditt evenemang. För paket där det inte ingår (till exempel Basic MICE Pack) kan teknisk assistans på plats läggas till som tillval från {price:technicianDay} per dag.'
		},
		'equipment-brands': {
			question: 'Vilka utrustningsmärken arbetar ni med?',
			answer:
				'Vi använder förstklassiga professionella märken som är betrodda inom liveeventbranschen, bland annat Audix och HK Audio för ljud, Eurolite och ADJ för belysning och Martin för vår rökmaskin. Detta säkerställer pålitligt, högkvalitativt ljud och belysning vid varje bokning.'
		},
		'delivery-only': {
			question: 'Erbjuder ni ett alternativ för självhämtning, eller är det enbart leverans?',
			answer:
				'Vi arbetar enbart med leverans. Det finns inget alternativ för självhämtning. Detta garanterar att varje system anländer professionellt transporterat, installerat och kalibrerat av vårt team, så att utrustningen fungerar exakt som avsett vid ditt evenemang.'
		},
		'streaming-recording': {
			question: 'Erbjuder ni livestreaming och flerkamerainspelning?',
			answer:
				'Inte ur vårt eget lager. Kameror, filmning och livestreaming ingår inte i det, så vi gör ingen flerkameraproduktion själva. Vi står för ljud, duk och belysning i lokalen, och för ett hybrid- eller virtuellt evenemang tar du oftast med din egen dator, streamingprogramvara och internetanslutning. Behöver ditt evenemang ett filmteam eller en streaminglösning, säg till: vi kan kolla om någon av våra leverantörer kan ta hand om det, om det finns någon.'
		},
		'translation-voting': {
			question: 'Erbjuder ni simultantolkning eller interaktiva röstningssystem?',
			answer:
				'Ja, för simultantolkning och interaktiva röstningssystem, dock inte med vår egen utrustning: vi arrangerar båda genom en underleverantör för företagsevenemang och kongresser. Berätta vad du behöver när du begär en offert. Vi erbjuder ingen LED-videovägg. Vår storformatsskärm är en enda platt panel på 60 tum.'
		},
		'large-scale-events': {
			question: 'Kan ni hantera storskaliga kongresser, mässor och utställningar?',
			answer:
				'Absolut. Utöver bröllop och företagsmöten utrustar vi även större evenemang som kongresser, mässor och utställningar med skräddarsydda ljud- och bildlösningar, och kombinerar ljudförstärkning, storformatsskärmar, scener och dedikerad teknisk personal efter behov.'
		},
		'notice-time': {
			question: 'Hur lång framförhållning krävs för en bokning?',
			answer:
				'All uthyrning av eventutrustning och tekniska tjänster måste bokas med minst 24 timmars framförhållning för att garantera schemaläggning och logistisk tillgänglighet. För stora eller komplexa evenemang rekommenderar vi att du bokar så tidigt som möjligt för att säkra ditt datum.'
		},
		'minimum-order-granada': {
			question: 'Finns det ett minsta ordervärde för uppdrag utanför Costa del Sol?',
			answer:
				'Inom Costa del Sol finns inget särskilt minimum. För mer avlägsna resmål utanför provinsen, som Granada, kräver vi ett minsta hyresvärde över {price:outOfProvinceMinimum} för att täcka den logistiska endagsresan. Vi betjänar även Sevilla. Kontakta oss för att bekräfta villkoren för din specifika plats.'
		},
		'customize-package': {
			question: 'Kan jag anpassa eller utöka ett paket efter mina specifika behov?',
			answer:
				'Ja. Alla paket kan utökas med tillägg som projektorer och dukar, en professionell rökmaskin av typen Martin Magnum 650, extra mikrofoner, talarstolar i akryl av premiumkvalitet, modulära scenplattformar och extra timmar med livetekniker. Berätta dina önskemål när du begär en offert, så bygger vi den perfekta konfigurationen för ditt evenemang.'
		}
	}
} satisfies DataCopy;
