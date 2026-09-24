import type { DataCopy } from '../data-copy';

export default {
	packages: {
		eco: {
			updated: '2026-09-24',
			desc: 'Mit dem Eco Pack mieten Sie eine günstige Partyanlage in Malaga, ideal für private Feiern oder kleine Veranstaltungen mit bis zu 50 Gästen. Enthalten sind solide Basis-Beschallung und Ambientebeleuchtung.',
			includes: [
				'2 hochwertige Aktivlautsprecher mit Stativen',
				'1 kabelgebundenes dynamisches Mikrofon',
				'2 Lichtleisten mit RGBW-LED-Spots',
				'Ästhetische Verkabelung und professioneller Aufbau'
			],
			optional: ['Beamer & Projektionsleinwand (+50 €)', 'Professionelle Nebelmaschine (+20 €)'],
			seo: { title: 'Eco Pack: Günstiges Partyset mieten Malaga | MEG' },
			landing: {
				badge: 'Kleine Veranstaltungen & Feiern',
				rateLabel: 'Günstiger Komplettpreis',
				vatNote: '(zzgl. 21% MwSt.), Aufbau und Transport inbegriffen',
				specTitle: 'Bis zu 50 Gäste',
				specBody: 'Perfekt für Villen, Gärten und private Räumlichkeiten.',
				highlightTitle: 'Stressfreier Service',
				highlightBody:
					'Wir arbeiten ausschließlich mit Lieferung und direktem Aufbau. Wir bringen die Technik, installieren sie professionell, testen Ton und Licht und holen nach der Veranstaltung alles wieder ab.',
				includesLabel: 'Was ist enthalten',
				optionalLabel: 'Optionale Extras',
				ctaHeading: 'Sichern Sie sich noch heute Ihre Buchung',
				ctaBody:
					'Füllen Sie unsere kurze technische Anfrage aus, um die Verfügbarkeit des Pakets für Ihren Termin zu prüfen. Wir melden uns so schnell wie möglich bei Ihnen!',
				ctaButton: 'Dieses Paket buchen'
			}
		},
		wedding: {
			updated: '2026-09-24',
			desc: 'Mit dem Wedding Pack mieten Sie die perfekte Hochzeitstechnik in Malaga: eine professionelle High End Beschallungsanlage, romantische Ambientebeleuchtung und Funkmikrofone für bewegende Reden bei magischen, unvergesslichen Hochzeitsfeiern.',
			includes: [
				'High End aktive PA-Beschallungsanlage für bis zu 80 Gäste',
				'Lichterketten / warme LED-Lichterschläuche für romantische Ambientebeleuchtung',
				'Professionelle Funkmikrofone für Reden und Ansagen',
				'Transport in Malaga und Umgebung',
				'Professioneller, ästhetischer Aufbau und Verkabelung',
				'Technische Live-Betreuung und Support vor Ort während der Veranstaltung',
				'Schneller Abbau und logistische Abholung nach der Veranstaltung'
			],
			optional: ['Professionelle Nebelmaschine (+20 €)'],
			seo: { title: 'Wedding Pack: Hochzeitstechnik mieten in Malaga' },
			landing: {
				badge: 'Unser beliebtestes Feierpaket',
				rateLabel: 'Premium-Komplettpreis',
				vatNote: '(zzgl. 21% MwSt.), Aufbau und Live-Support inbegriffen',
				specTitle: 'Bis zu 80 Gäste',
				specBody: 'Perfekt für wunderschöne Villen, Fincas und Hochzeitshotels.',
				highlightTitle: 'Live-Techniker vor Ort',
				highlightBody:
					'Machen Sie sich keine Sorgen mehr über Mikrofon-Rückkopplungen oder Bildprobleme. Dieses Paket beinhaltet die vollständige technische Live-Überwachung vor Ort sowie akustische Anpassungen während Ihres Banketts und der Reden.',
				includesLabel: 'Premium-Leistungen',
				ctaHeading: 'Verwandeln Sie Ihre Feier in etwas Magisches',
				ctaBody:
					'Hochzeitstermine sind schnell ausgebucht. Sichern Sie sich Ihren Termin noch heute bei unserem technischen Team und garantieren Sie sich erstklassigen Klang und romantische Beleuchtung an Ihrem besonderen Tag.',
				ctaButton: 'Dieses Wedding Pack buchen'
			}
		},
		'product-presentation': {
			updated: '2026-09-24',
			desc: 'Beamer und Leinwand mieten für Ihre Produktpräsentation: entwickelt für Unternehmenspräsentationen, Showroom-Events und Produkteinführungen mit hoher visueller Wirkung.',
			includes: [
				'1 Frontprojektionsleinwand mit stabilem Stativ',
				'1 lichtstarker Beamer (5000 Lumen) für gestochen scharfe Bilder',
				'Beschallungsanlage vor Ort mit 2 Lautsprechern & Mischpult',
				'1 hochwertiges kabelloses Handmikrofon für Redner'
			],
			seo: { title: 'Product Presentation Pack: Beamer Leinwand mieten' },
			landing: {
				badge: 'Unternehmenslösungen mit hoher visueller Wirkung',
				rateLabel: 'Presentation Pack Pauschalpreis',
				vatNote: '(zzgl. 21% MwSt.), Beamer und Leinwand inbegriffen',
				specTitle: 'Lichtstarker Beamer',
				specBody: 'Beamer mit 5000 Lumen, ideal für helle Räume.',
				highlightTitle: 'Makelloses Corporate Branding',
				highlightBody:
					'Maximieren Sie die Aufmerksamkeit bei Ihrer Händlerpräsentation, Hotel-Pressekonferenz oder Produktschau. Unser professioneller Aufbau verbindet gestochen scharfe Grafikdetails mit leistungsstarker Sprachverstärkung.',
				includesLabel: 'Was ist enthalten',
				note: {
					title: 'Unterstützung bei Aufbau & Anschluss',
					body: 'Wir stellen alle notwendigen Adapter (HDMI, USB-C) und Audio-Schnittstellen bereit, um Ihre Firmenlaptops, Tablets oder Player nahtlos anzuschließen.'
				},
				ctaHeading: 'Bringen Sie Ihre Produktschau auf ein neues Niveau',
				ctaBody:
					'Bieten Sie Ihrem Publikum die visuelle Klarheit und den professionellen Klang, den es verdient. Kontaktieren Sie noch heute unser technisches Team, um die Verfügbarkeit zu bestätigen.',
				ctaButton: 'Dieses Presentation Pack buchen'
			}
		},
		'basic-mice': {
			updated: '2026-09-24',
			desc: 'Konferenztechnik mieten für kleine Meetings: eine leistungsstarke Grundausstattung für kleine Führungskräfte-Meetings, Konferenzen und Präsentationen mit bis zu 40 Gästen.',
			includes: [
				'2x2 m Projektionsleinwand mit lichtstarkem 3000-Lumen-Beamer',
				'Grundlegende, glasklare Beschallungsanlage für bis zu 40 Personen',
				'1 professionelles Schwanenhalsmikrofon für Podium/Rednerpult',
				'Logistiktransport, Aufbau und ästhetische Verkabelung'
			],
			optional: ['Fester technischer Assistent vor Ort (+240 €/Tag)'],
			seo: { title: 'Basic MICE Pack: Tagungstechnik mieten in Malaga' },
			landing: {
				badge: 'Grundausstattung für Führungskräfte-Meetings',
				rateLabel: 'Pauschalpreis für Firmenmeetings',
				vatNote: '(zzgl. 21% MwSt.), Aufbau und Transport inbegriffen',
				specTitle: 'Bis zu 40 Gäste',
				specBody: 'Konzipiert für Boardrooms, private Salons und Hotelsuiten.',
				highlightTitle: 'Klare Sprachverständlichkeit',
				highlightBody:
					'Die professionelle Schwanenhalsmikrofon-Konfiguration garantiert absolute Klarheit bei Vorstandsreden, Presseankündigungen oder Investorenrunden, ganz ohne Echo oder Rückkopplung.',
				includesLabel: 'Was ist enthalten',
				optionalLabel: 'Optionaler Support',
				ctaHeading: 'Planen Sie Ihr Führungskräfte-Meeting',
				ctaBody:
					'Koordinieren Sie eine nahtlose AV-Logistik für Ihr Unternehmen mit Malaga Event Gear. Sprechen Sie mit unseren Experten, um ein professionelles Boardroom-Erlebnis zu sichern.',
				ctaButton: 'Basic MICE Pack buchen'
			}
		},
		mice: {
			updated: '2026-09-24',
			desc: 'Kongresstechnik mieten in Malaga: eine umfassende MICE-Komplettlösung mit großformatigem Display, hochwertiger aktiver Beschallung, kabellosen Podiumsmikrofonen und fester Live-Techniker-Betreuung.',
			includes: [
				'Hochwertiges 60-Zoll-LED-Display in High Definition mit Design-Standfuß',
				'Professionelle Aktivlautsprecher und leistungsstarke Beschallungsanlage',
				'1 Schwanenhalsmikrofon + 1 kabelloses Handmikrofon',
				'1 fester, spezialisierter Live-AV-Techniker (bis zu 6 Stunden durchgehender Support)',
				'Logistiklieferung, maßgeschneiderte Verkabelung und Abbau nach der Veranstaltung'
			],
			optional: [
				'Zusätzliche Stunde Live-Techniksupport (+40 €/Std.)',
				'Modernes Premium-Rednerpult aus Methacrylat/Acryl (+50 €)',
				'Modulare Bühnenpodeste (+35 €/m²)'
			],
			seo: { title: 'MICE Pack: Kongresstechnik mieten in Malaga | MEG' },
			landing: {
				badge: 'Premium MICE-Erlebnis für Unternehmen',
				rateLabel: 'Unternehmens-Komplettpreis',
				vatNote: '(zzgl. 21% MwSt.), LED-Display, Beschallung und Live-Techniker inbegriffen',
				specTitle: '60-Zoll-LED-Display',
				specBody: 'Großformatiges Display in High Definition für eindrucksvolle Unternehmensvisuals.',
				highlightTitle: 'Fester Live-Techniker',
				highlightBody:
					'Ein spezialisierter AV-Techniker begleitet Ihre Veranstaltung bis zu 6 Stunden durchgehend und garantiert einwandfreien Klang, Bild und Mikrofonmanagement während Ihres Gipfeltreffens, Ihrer Konferenz oder Produkteinführung.',
				includesLabel: 'Premium-Leistungen',
				optionalLabel: 'Optionale Extras',
				ctaHeading: 'Geben Sie Ihrer Firmenveranstaltung mehr Kraft',
				ctaBody:
					'Bieten Sie ein makelloses Unternehmenserlebnis mit Premium-AV-Technik und fester technischer Betreuung. Kontaktieren Sie noch heute unser Team, um die Verfügbarkeit für Ihren Termin zu bestätigen.',
				ctaButton: 'MICE Pack buchen'
			}
		}
	},
	faqs: {
		'what-is-meg': {
			question: 'Was ist Malaga Event Gear (MEG), und welche Leistungen bieten sie an?',
			answer:
				'Malaga Event Gear (MEG) ist ein Unternehmen mit Sitz in Malaga, Spanien, spezialisiert auf die Vermietung von professioneller Audiovisuell-, Licht- und Veranstaltungstechnik. Wir bieten Beschallungsanlagen, Beamer, Leinwände, Bühnen, technischen Support, Nebelmaschinen, Beleuchtungslösungen und Mikrofone, sowie spezialisierte Leistungen wie Live-Beschallung sowie Simultanübersetzung und interaktive Abstimmungssysteme, die wir über einen beauftragten Partner organisieren.'
		},
		'event-types': {
			question: 'Für welche Arten von Veranstaltungen ist Malaga Event Gear (MEG) geeignet?',
			answer:
				'Wir betreuen private Feiern wie Hochzeiten und Privatpartys. Ebenso begleiten wir geschäftliche Veranstaltungen wie Firmenevents, Meetings, Konferenzen und Produktpräsentationen. Dazu kommen größere Veranstaltungen wie Kongresse, Messen und Ausstellungen, immer mit maßgeschneiderten audiovisuellen Lösungen.'
		},
		'service-areas': {
			question: 'Wo bietet Malaga Event Gear (MEG) seine Leistungen an?',
			answer:
				'Auch wenn "Malaga" in unserem Namen steht, reicht unser Service weit über die Stadt hinaus. Wir sind vor allem an der gesamten Costa del Sol tätig, darunter Malaga Stadt, Marbella, Coín, Ronda, Mijas, Nerja, Torremolinos, Fuengirola, Benalmadena und Estepona. Außerdem bedienen wir Sevilla und Granada, wobei für Granada aufgrund der Entfernung außerhalb der Provinz in der Regel Buchungen ab 400 € erforderlich sind.'
		},
		'what-makes-unique': {
			question:
				'Was macht Malaga Event Gear (MEG) im Vergleich zu anderen Verleihfirmen für Audiovisuell-Technik einzigartig?',
			answer:
				'MEG hebt sich durch einen kundenorientierten und unkomplizierten Ansatz ab: einen festen Techniker vor Ort für jede Buchung, hochwertige Markentechnik und transparente Komplettpreise. Wir arbeiten daran, den Buchungsprozess zu 100 % online mit standardisierten Festpreisen und vollständig transparenten Transaktionen anzubieten.'
		},
		'booking-process': {
			question: 'Wie läuft der Buchungsprozess bei Malaga Event Gear ab?',
			answer:
				'Unser unkomplizierter Ablauf besteht aus vier Schritten: 1. Wählen Sie Ihr Paket. 2. Fordern Sie über unser kurzes Kontaktformular ein Angebot an. 3. Unser Team meldet sich bei Ihnen, um die Details zu klären und die Buchung zu bestätigen. 4. Genießen Sie eine stressfreie Veranstaltung, während wir Lieferung, professionellen Aufbau, Einrichtung und Abbau übernehmen. Bitte beachten Sie, dass Leistungen mindestens 24 Stunden im Voraus gebucht werden müssen.'
		},
		'popular-packages': {
			question: 'Welche beliebten Pakete bietet Malaga Event Gear an?',
			answer:
				'Zu unseren beliebtesten vorkonfigurierten Paketen zählen {packagesWithPrices}, jedes mit eigener Ausstattung und eigenen Merkmalen. Auf unserer Preise-Seite finden Sie die vollständige Übersicht, was in jedem Paket enthalten ist.'
		},
		'language-hours': {
			question: 'In welcher Sprache kommunizieren sie mit Kunden, und wie sind ihre Öffnungszeiten?',
			answer:
				'Malaga Event Gear (MEG) kommuniziert mit Kunden auf Englisch und Spanisch. Wir sind 24 Stunden am Tag, 7 Tage die Woche für technischen Aufbau und Live-Betreuung der Veranstaltung erreichbar.'
		},
		'contact-info': {
			question: 'Wie können Kunden Malaga Event Gear (MEG) kontaktieren, und welche Informationen sollten sie angeben?',
			answer:
				'Sie erreichen uns telefonisch unter 666 346 911, über WhatsApp oder per E-Mail. Für ein genaues Angebot teilen Sie uns bitte das Datum Ihrer Veranstaltung, den Ort, die erwartete Gästezahl und die Art der Technik oder des Pakets mit, für das Sie sich interessieren. Weitere Details finden Sie auf unserer Kontaktseite.'
		},
		'delivery-setup': {
			question: 'Bieten Sie Lieferung und Aufbau für Beschallungs- und Lichttechnik an?',
			answer:
				'Ja. MEG übernimmt die vollständige Lieferung, den professionellen Aufbau und den Abbau nach der Veranstaltung für alle Beschallungs- und Lichtvermietungen. Unser Service umfasst Transport, Installation, Kabelverdeckung, Ton- und Lichtprüfungen sowie optionale technische Unterstützung vor Ort in Málaga, Marbella, Fuengirola, Torremolinos, Estepona und Umgebung.'
		},
		'vat-pricing': {
			question: 'Sind Ihre Paketpreise inklusive Mehrwertsteuer?',
			answer:
				'Nein, die angegebenen Preise verstehen sich ohne Mehrwertsteuer. Wie durch (zzgl. 21% MwSt.) neben den Preisen angegeben, wird die spanische Standard-Mehrwertsteuer (IVA) von 21 % auf den Paketpreis aufgeschlagen. Ihr endgültiges Angebot zeigt sowohl den Nettopreis als auch die MwSt.-Aufschlüsselung, vollständig transparent.'
		},
		'on-site-technician': {
			question: 'Stellen Sie während der Veranstaltung einen Techniker vor Ort?',
			answer:
				'Ja. Mehrere Pakete, wie das Wedding Pack und das vollständige MICE Pack, beinhalten einen festen Live-Techniker, der während Ihrer gesamten Veranstaltung die technische Kontrolle und Betreuung übernimmt. Bei Paketen, in denen dies nicht enthalten ist (zum Beispiel im Basic MICE Pack), kann technische Unterstützung vor Ort optional ab 240 € pro Tag hinzugebucht werden.'
		},
		'equipment-brands': {
			question: 'Mit welchen Technikmarken arbeiten Sie?',
			answer:
				'Wir setzen auf hochwertige professionelle Marken, denen die Live-Event-Branche vertraut: Audix und HK Audio für Beschallung, Eurolite und ADJ für Beleuchtung sowie Martin für Nebeleffekte. So garantieren wir bei jeder Buchung zuverlässigen, hochwertigen Klang und Licht.'
		},
		'delivery-only': {
			question: 'Bieten Sie eine Selbstabholung an, oder liefern Sie ausschließlich?',
			answer:
				'Wir arbeiten ausschließlich mit Lieferung. Eine Selbstabholung ist nicht möglich. So garantieren wir, dass jedes System professionell von unserem Team transportiert, installiert und kalibriert wird, damit die Technik bei Ihrer Veranstaltung genau wie vorgesehen funktioniert.'
		},
		'streaming-recording': {
			question: 'Bieten Sie Livestreaming und Multikamera-Aufnahmen an?',
			answer:
				'Nein. Wir bieten keine Kameras, Streaming-Encoder, Multikamera-Videoproduktion oder Aufnahmeservices an. Wir liefern Beschallung, Leinwand und Beleuchtung des Raums. Für ein hybrides oder virtuelles Event bringen Sie Ihren eigenen Laptop, Ihre Streaming-Software und Ihre Internetverbindung mit.'
		},
		'translation-voting': {
			question: 'Bieten Sie Simultanübersetzung oder interaktive Abstimmungssysteme an?',
			answer:
				'Ja, für Simultanübersetzung und interaktive Abstimmungssysteme, allerdings nicht mit eigener Technik: Wir organisieren beides über einen beauftragten Partner für Firmen- und Kongressveranstaltungen. Teilen Sie uns Ihre Anforderungen bei der Angebotsanfrage mit. Eine LED-Videowand bieten wir nicht an. Unser großformatiges Display ist ein einzelnes 60-Zoll-Flachbildpanel.'
		},
		'large-scale-events': {
			question: 'Können Sie große Kongresse, Messen und Ausstellungen betreuen?',
			answer:
				'Auf jeden Fall. Neben Hochzeiten und Firmenmeetings statten wir auch größere Veranstaltungen wie Kongresse, Messen und Ausstellungen mit maßgeschneiderten audiovisuellen Lösungen aus und kombinieren dabei bei Bedarf Beschallung, großformatige Leinwände, Bühnen und festes technisches Personal.'
		},
		'notice-time': {
			question: 'Wie viel Vorlaufzeit benötigen Sie mindestens für eine Buchung?',
			answer:
				'Alle Vermietungen von Veranstaltungstechnik und technischen Leistungen müssen mindestens 24 Stunden im Voraus gebucht werden, um Terminplanung und logistische Verfügbarkeit zu gewährleisten. Bei großen oder komplexen Veranstaltungen empfehlen wir, so früh wie möglich zu buchen, um sich den Termin zu sichern.'
		},
		'minimum-order-granada': {
			question: 'Gibt es eine Mindestbestellung für Leistungen außerhalb der Costa del Sol?',
			answer:
				'Innerhalb der Costa del Sol gibt es keine besondere Mindestgrenze. Für weiter entfernte Ziele außerhalb der Provinz, wie Granada, verlangen wir einen Mindestmietwert von über 400 €, um die eintägige logistische Anreise zu decken. Auch Sevilla wird bedient. Kontaktieren Sie uns, um die Bedingungen für Ihren genauen Standort zu bestätigen.'
		},
		'customize-package': {
			question: 'Kann ich ein Paket an meine individuellen Anforderungen anpassen oder erweitern?',
			answer:
				'Ja. Jedes Paket kann mit Extras wie Beamern und Leinwänden, professionellen Nebelmaschinen, zusätzlichen Mikrofonen, hochwertigen Acryl-Rednerpulten, modularen Bühnenpodesten und zusätzlichen Stunden Live-Technik erweitert werden. Teilen Sie uns Ihre Anforderungen bei der Angebotsanfrage mit, und wir stellen die perfekte Konfiguration für Ihre Veranstaltung zusammen.'
		}
	}
} satisfies DataCopy;
