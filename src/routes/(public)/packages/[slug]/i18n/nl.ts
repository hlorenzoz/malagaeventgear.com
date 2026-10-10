import type { Copy } from './en';

export const updated = '2026-10-07';

const copy = {
	benefits: {
		delivery:
			'Gratis opbouw & levering ({city:Malaga & Costa del Sol, Spanje|Malaga & Costa del Sol})',
		brands: 'Premium merken (HK Audio, Audix, Midas)',
		support: 'Technische ondersteuning ter plaatse beschikbaar'
	},
	faqs: {
		delivery: {
			q: 'Zijn levering en opbouw inbegrepen in de pakketprijs?',
			a: 'Ja, voor premium pakketten (zoals het {wedding} en het {mice}) zijn volledige professionele levering, bekabeling en afbraak in Malaga en de directe omgeving inbegrepen. Voor standaardpakketten kan een kleine logistieke toeslag gelden, afhankelijk van de exacte locatie van je evenement.'
		},
		areas: {
			q: 'Welke gebieden bedienen jullie in Andalusië?',
			a: 'We bedienen dagelijks de stad Malaga, Marbella en de hele Costa del Sol. Daarnaast leveren we in Sevilla zonder minimumbestelling en in Granada bij bestellingen van meer dan {price:outOfProvinceMinimum}. Op dit moment bieden we geen ophaalmogelijkheid aan, omdat we uitsluitend op leveringsbasis werken.'
		},
		rain: {
			q: 'Wat gebeurt er als het regent tijdens een buitenevenement?',
			a: "Als je evenement buiten plaatsvindt, hebben we een overdekte ruimte nodig (tenten, pergola's) om de elektrische apparatuur te beschermen. Bij regen zonder overkapping zoeken we samen met je een oplossing om de apparatuur naar binnen te verplaatsen. De veiligheid van gasten en de bescherming van de elektrische apparatuur staan bij ons voorop."
		},
		technician: {
			q: 'Wat gebeurt er als ik tijdens mijn evenement een technicus nodig heb?',
			a: 'Onze premium pakketten (zoals het {wedding} en het {mice}) bevatten al technische monitoring ter plaatse. Voor andere pakketten kun je een eigen technicus aanvragen die op je locatie blijft, het geluid en de microfoons bedient en elke storing aan projector, scherm of verlichting verhelpt, voor een zorgeloze ervaring.'
		}
	},
	popularBadge: 'Meest gekozen',
	itemsIncludedSuffix: 'onderdelen inbegrepen',
	faqSectionTitle: 'Veelgestelde vragen',
	stickyBarAriaLabel: 'Vaste actiebalk'
} satisfies Copy;

export default copy;
