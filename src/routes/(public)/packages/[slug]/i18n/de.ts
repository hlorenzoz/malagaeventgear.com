import type { Copy } from './en';

export const updated = '2026-10-07';

export default {
	benefits: {
		delivery:
			'Kostenlose Lieferung & Aufbau ({city:Malaga & Costa del Sol, Spanien|Malaga & Costa del Sol})',
		brands: 'Hochwertige Marken (HK Audio, Audix, Midas)',
		support: 'Technischer Support vor Ort verfügbar'
	},
	faqs: {
		delivery: {
			q: 'Sind Lieferung und Aufbau im Paketpreis enthalten?',
			a: 'Ja, bei Premiumpaketen (wie dem {wedding} und dem {mice}) sind die vollständige professionelle Lieferung, die Verkabelung und der Abbau in Malaga und den angrenzenden Vororten enthalten. Bei Standardpaketen kann je nach genauem Veranstaltungsort eine kleine Logistikgebühr anfallen.'
		},
		areas: {
			q: 'Welche Gebiete in Andalusien decken Sie ab?',
			a: 'Wir sind täglich in der Stadt Malaga, Marbella und an der gesamten Costa del Sol im Einsatz. Ebenso bedienen wir Sevilla ohne Mindestbestellwert und Granada bei Bestellungen über {price:outOfProvinceMinimum}. Derzeit bieten wir keine Abholoption an, da wir ausschließlich mit Lieferung arbeiten.'
		},
		rain: {
			q: 'Was passiert bei Regen während einer Veranstaltung im Freien?',
			a: 'Findet Ihre Veranstaltung im Freien statt, benötigen wir einen überdachten Bereich (Zelte, Pergolen), um die elektrische Technik zu schützen. Bei Regen ohne Überdachung stimmen wir uns mit Ihnen ab, um die Technik nach drinnen zu verlegen. Die Sicherheit der Gäste und der Schutz der stromführenden Technik haben für uns oberste Priorität.'
		},
		technician: {
			q: 'Was passiert, wenn ich während meiner Veranstaltung einen Techniker benötige?',
			a: 'Unsere Premiumpakete (wie das {wedding} und das {mice}) beinhalten bereits eine technische Betreuung vor Ort während der Veranstaltung. Bei anderen Paketen können Sie einen eigenen Techniker anfordern, der an Ihrem Veranstaltungsort bleibt, den Ton und die Mikrofone bedient und bei jeder Störung an Projektor, Bildschirm oder Licht eingreift, für ein stressfreies Erlebnis.'
		}
	},
	popularBadge: 'Am beliebtesten',
	itemsIncludedSuffix: 'Positionen enthalten',
	faqSectionTitle: 'Häufig gestellte Fragen',
	stickyBarAriaLabel: 'Fixierte Handlungsaufforderung'
} satisfies Copy;
