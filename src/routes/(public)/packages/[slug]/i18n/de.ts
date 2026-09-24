import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: 'Kostenlose Lieferung & Aufbau (Malaga & Costa del Sol)',
		brands: 'Premium-Marken (HK Audio, Audix, Midas)',
		support: 'Technischer Support vor Ort verfügbar'
	},
	faqs: {
		delivery: {
			q: 'Sind Lieferung und Aufbau im Paketpreis enthalten?',
			a: 'Ja, bei Premium-Paketen (wie dem {wedding} und dem {mice}) sind die vollständige professionelle Lieferung, der Verkabelungsaufbau und der Abbau in Malaga und den angrenzenden Vororten enthalten. Bei Standardpaketen kann je nach genauem Veranstaltungsort eine kleine Logistikgebühr anfallen.'
		},
		areas: {
			q: 'Welche Gebiete in Andalusien decken Sie ab?',
			a: 'Wir bedienen Malaga Stadt, Marbella und die gesamte Costa del Sol täglich. Ebenso bedienen wir Sevilla und Granada (ab {price:outOfProvinceMinimum} Bestellwert). Derzeit bieten wir keine Abholoption an, da wir ausschließlich mit Lieferung arbeiten.'
		},
		rain: {
			q: 'Was passiert bei Regen während einer Outdoor-Veranstaltung?',
			a: 'Findet Ihre Veranstaltung im Freien statt, benötigen wir einen überdachten Bereich (Zelte, Pergolen), um die elektrische Technik zu schützen. Bei Regen ohne Überdachung stimmen wir uns mit Ihnen ab, um die Technik nach drinnen zu verlegen. Die Sicherheit der Gäste und der Schutz der Hochspannungstechnik haben für uns oberste Priorität.'
		},
		technician: {
			q: 'Was passiert, wenn ich während meiner Veranstaltung einen Techniker benötige?',
			a: 'Unsere Premium-Pakete (wie das {wedding} und das {mice}) beinhalten bereits eine technische Live-Betreuung vor Ort. Bei anderen Paketen können Sie einen festen Ton-/Lichttechniker anfordern, der für ein stressfreies Erlebnis an Ihrem Veranstaltungsort bleibt.'
		}
	},
	popularBadge: 'Am beliebtesten',
	itemsIncludedSuffix: 'Positionen enthalten',
	faqSectionTitle: 'Häufig gestellte Fragen',
	stickyBarAriaLabel: 'Fixierte Handlungsaufforderung'
} satisfies Copy;
