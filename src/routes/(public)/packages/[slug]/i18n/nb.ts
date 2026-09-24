import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: 'Gratis installasjon og levering (Malaga og Costa del Sol)',
		brands: 'Merker i premiumklasse (HK Audio, Audix, Midas)',
		support: 'Teknisk support på stedet tilgjengelig'
	},
	faqs: {
		delivery: {
			q: 'Er levering og installasjon inkludert i pakkeprisen?',
			a: 'Ja, for pakker i premiumklasse (som {wedding} og {mice}) er full profesjonell levering, kabelinstallasjon og nedrigging i Malaga og de nærmeste forstedene inkludert. For standardpakker kan et mindre logistikkgebyr komme til, avhengig av nøyaktig sted for arrangementet ditt.'
		},
		areas: {
			q: 'Hvilke områder dekker dere i Andalucía?',
			a: 'Vi betjener Malaga by, Marbella og hele Costa del Sol daglig. Vi betjener også Sevilla og Granada (for bestillinger over {price:outOfProvinceMinimum}). Vi tilbyr for tiden ikke selvhenting, siden vi kun jobber med levering.'
		},
		rain: {
			q: 'Hva skjer hvis det regner under et utendørs arrangement?',
			a: 'Hvis arrangementet ditt er utendørs, krever vi et overbygd område (telt, pergolaer) for å beskytte det elektriske utstyret. Ved regn uten overbygg vil vi samarbeide med deg om å flytte utstyret innendørs. Gjestenes sikkerhet og beskyttelse av høyspenningsutstyr er vår høyeste prioritet.'
		},
		technician: {
			q: 'Hva skjer hvis jeg trenger en tekniker under arrangementet mitt?',
			a: 'Våre pakker i premiumklasse (som {wedding} og {mice}) inkluderer allerede teknisk overvåking på stedet. For andre pakker kan du be om en dedikert lyd-/lysingeniør som blir på lokalet ditt for en stressfri opplevelse.'
		}
	},
	popularBadge: 'Mest populær',
	itemsIncludedSuffix: 'elementer inkludert',
	faqSectionTitle: 'Ofte stilte spørsmål',
	stickyBarAriaLabel: 'Fastsatt handlingsknapp'
} satisfies Copy;
